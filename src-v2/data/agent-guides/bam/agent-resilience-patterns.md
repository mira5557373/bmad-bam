# Agent Resilience Patterns

**When to load:** When designing fault-tolerant agent systems, implementing retry logic, circuit breakers, or when user mentions agent failures, timeouts, or graceful degradation.

**Integrates with:** Architect (Nova persona), DevOps agent, Dev agent

---

## Core Concepts

### What is Agent Resilience?

Agent resilience encompasses patterns that ensure AI agents can handle failures gracefully, recover from errors, and maintain service quality under adverse conditions. This includes LLM API failures, tool execution errors, and resource exhaustion.

### Failure Categories

| Category | Examples | Typical Response |
|----------|----------|------------------|
| Transient | API timeout, rate limit | Retry with backoff |
| Persistent | Invalid API key, model deprecation | Failover to alternate |
| Resource | Token budget exceeded, memory full | Graceful degradation |
| Logic | Infinite loop, hallucination | Circuit breaker |

### Agent-Specific Failure Modes

| Failure Mode | Detection | Impact | Recovery Strategy |
|--------------|-----------|--------|-------------------|
| Token exhaustion | Budget tracking | Task incomplete | Checkpoint and resume |
| Tool timeout | Execution timer | Blocked progress | Cancel and retry with shorter timeout |
| Hallucination loop | Output validation | Wrong results | Context reset, alternative prompt |
| Memory overflow | Context length check | Agent crash | Summarize and continue |

### Resilience Architecture Overview

```
Agent Request
    │
    ├── Rate Limiter (per-tenant quota)
    │
    ├── Circuit Breaker Check
    │   ├── CLOSED ──► Proceed to LLM
    │   ├── OPEN ────► Return cached/fallback
    │   └── HALF-OPEN ► Test with probe request
    │
    ├── LLM Call with Retry
    │   ├── Success ──► Process response
    │   └── Failure ──► Exponential backoff
    │       ├── Retry 1 (1s wait)
    │       ├── Retry 2 (2s wait)
    │       ├── Retry 3 (4s wait)
    │       └── Max retries ──► Fallback model
    │
    ├── Fallback Hierarchy
    │   ├── Primary model unavailable ──► Secondary model
    │   ├── Secondary unavailable ────── ► Cached response
    │   └── No cache ─────────────────── ► Graceful error
    │
    └── Response with metrics logged
```

---

## Key Patterns

### Pattern 1: Retry with Exponential Backoff

| Retry Attempt | Wait Time | Max Retries | Jitter |
|---------------|-----------|-------------|--------|
| 1 | 1s | - | +/- 10% |
| 2 | 2s | - | +/- 10% |
| 3 | 4s | - | +/- 10% |
| 4 | 8s | 5 default | +/- 10% |

### Pattern 2: Circuit Breaker States

| State | Behavior | Transition Trigger |
|-------|----------|-------------------|
| Closed | Normal operation | N failures in window → Open |
| Open | Fast-fail all requests | Timeout → Half-Open |
| Half-Open | Allow probe requests | Success → Closed, Fail → Open |

### Circuit Breaker Configuration by Provider

| Provider | Failure Threshold | Open Duration | Half-Open Probes |
|----------|-------------------|---------------|------------------|
| OpenAI | 5 failures / 60s | 30 seconds | 1 request |
| Anthropic | 5 failures / 60s | 30 seconds | 1 request |
| Azure OpenAI | 3 failures / 30s | 60 seconds | 2 requests |
| Self-hosted | 10 failures / 60s | 15 seconds | 3 requests |

### Pattern 3: Fallback Hierarchy

| Level | Fallback Action | Use When |
|-------|-----------------|----------|
| 1 | Retry same model | Transient error |
| 2 | Fallback model | Primary unavailable |
| 3 | Cached response | All models fail |
| 4 | Graceful error | No cached fallback |

### Pattern 4: Tenant-Aware Bulkhead

| Isolation Level | Scope | Purpose |
|-----------------|-------|---------|
| Per-tenant | Dedicated thread pool | Noisy neighbor isolation |
| Per-tier | Shared within tier | Resource pooling |
| Per-agent-type | Agent classification | Critical vs non-critical |

---

## Application Guidelines

- Building production-grade agent orchestration
- Integrating multiple LLM providers
- Designing for high availability requirements
- Implementing cost-aware agent systems
- Multi-tenant platforms with SLA commitments

---

## Decision Criteria

### When to Use Each Pattern

| Scenario | Recommended Pattern | Rationale |
|----------|---------------------|-----------|
| Sporadic API errors | Retry with backoff | Usually transient |
| Provider outage | Circuit breaker + fallback | Prevent cascade failure |
| Token budget limits | Graceful degradation | Maintain partial functionality |
| Concurrent agent storms | Bulkhead isolation | Protect other tenants |
| Long-running tasks | Checkpoint/resume | Avoid losing progress |

### Model Fallback Selection

| Primary Model | Fallback 1 | Fallback 2 | Trade-offs |
|---------------|------------|------------|------------|
| GPT-4 | Claude 3 | GPT-3.5-turbo | Quality vs cost |
| Claude 3 Opus | GPT-4 | Claude 3 Sonnet | Capability match |
| GPT-4-turbo | GPT-4 | Claude 3 Sonnet | Latency vs cost |

---

## Per-Tier Resilience

| Tier | Retry Budget | Fallback Models | SLA Target |
|------|--------------|-----------------|------------|
| Free | 3 retries | 1 (shared) | Best effort |
| Pro | 5 retries | 2 | 99.5% |
| Enterprise | 10 retries | 3+ dedicated | 99.9% |

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Unlimited retries | Resource exhaustion, cost explosion | Set max retries and budget caps |
| No jitter | Thundering herd on recovery | Add random jitter to backoff |
| Same fallback model | Single point of failure | Use models from different providers |
| Ignoring partial success | Lost progress on retry | Implement checkpointing |
| No tenant isolation | One tenant affects all | Bulkhead per tenant/tier |
| Silent failures | Undetected degradation | Comprehensive monitoring |

### Resilience Testing Checklist

- [ ] Chaos testing for LLM API failures
- [ ] Load testing with burst traffic
- [ ] Verify circuit breaker triggers correctly
- [ ] Test fallback model quality
- [ ] Validate tenant isolation under stress
- [ ] Monitor recovery time objectives

---

## Integration with BAM Patterns

| Pattern | Integration Point | Purpose |
|---------|-------------------|---------|
| Run Contracts | Budget and timeout enforcement | Resource protection |
| Agent Runtime | Orchestration-level resilience | Workflow recovery |
| Observability | Failure tracking and alerting | Visibility |
| Context Propagation | Tenant context in retries | Isolation maintenance |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| When to use retry vs circuit breaker? | Retry for transient errors, circuit breaker for sustained failures | Retries handle temporary issues; circuit breakers prevent cascade failures during outages |
| Should fallback models be from same or different provider? | Different providers for true redundancy | Same-provider fallback fails together during provider outages |
| How aggressive should timeout limits be? | Match user experience expectations per tier | Free tier can tolerate longer waits; enterprise expects sub-second responses |
| When to checkpoint vs restart agent execution? | Checkpoint for long-running tasks (>30s), restart for short tasks | Checkpointing overhead is worthwhile only for substantial work |
| Per-tenant or per-tier bulkhead isolation? | Per-tier for most, per-tenant for noisy or enterprise tenants | Per-tier balances isolation with resource efficiency |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Agent patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `run-contracts`, `agent-runtime`
- **circuit-breaker:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `circuit-breaker`
- **retry-policies:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `retry-policies`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "AI agent resilience patterns {date}"
- Search: "LLM API circuit breaker implementation {date}"
- Search: "graceful degradation AI systems {date}"
- Search: "multi-model fallback strategies {date}"

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Design agent runtime with resilience patterns built-in
- `bmad-bam-ai-eval-safety-design` - Review agent implementations for safety and resilience compliance
- `bmad-bam-chaos-engineering-design` - Test resilience patterns under failure conditions
- `bmad-bam-performance-baseline` - Validate circuit breaker and retry behavior under load
