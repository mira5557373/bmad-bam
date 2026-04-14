# BAM Run Contracts Guide

**When to load:** During Phase 3 (Solutioning) when defining agent execution scope, or when implementing resource limits, cost controls, or circuit breakers for AI agent runs.

**Integrates with:** Architect (Nova persona), Dev agent, DevOps agent

---

## Core Concepts

### What is a Run Contract?

A run contract defines the boundaries and constraints for an AI agent execution session. It specifies resource limits, cost budgets, action quotas, and termination conditions to ensure predictable, controllable agent behavior.

### Contract Components

| Component | Purpose | Example |
|-----------|---------|---------|
| Time Limit | Maximum execution duration | 300 seconds |
| Token Limit | Maximum LLM tokens consumed | 50,000 tokens |
| Cost Budget | Maximum monetary spend | $0.50 per run |
| Action Limit | Maximum tool invocations | 25 actions |
| Circuit Breaker | Failure threshold trigger | 3 consecutive errors |

---

## Application Guidelines

When implementing run contracts for AI agents:

1. **Define contracts per tier**: Higher tiers get more generous limits
2. **Monitor resource consumption in real-time**: Stop agents before they exceed limits
3. **Implement circuit breakers**: Repeated failures should trigger early termination
4. **Provide visibility to tenants**: Show remaining budget during agent execution
5. **Design graceful termination**: Agents should save state and explain why they stopped

---

## Implementation Patterns

### Pattern 1: Tiered Run Contracts

```
┌─────────────────────────────────────────────────────────┐
│              Tier-Based Contract Limits                  │
│                                                          │
│   ┌────────────────────────────────────────────────┐    │
│   │ Enterprise │ 600s │ 100K tokens │ $5.00 │ 100 │    │
│   ├────────────────────────────────────────────────┤    │
│   │ Pro        │ 300s │  50K tokens │ $1.00 │  50 │    │
│   ├────────────────────────────────────────────────┤    │
│   │ Free       │  60s │  10K tokens │ $0.10 │  10 │    │
│   └────────────────────────────────────────────────┘    │
│                                                          │
│   Columns: Tier | Time | Tokens | Cost | Actions        │
└─────────────────────────────────────────────────────────┘
```

**Contract Selection Logic:**

| Factor | Priority | Resolution |
|--------|----------|------------|
| Tenant tier | 1 | Base contract from tier |
| Task complexity | 2 | Adjust within tier bounds |
| Historical usage | 3 | Dynamic adjustment |
| Override request | 4 | Admin approval required |

### Pattern 2: Resource Monitoring

```
┌─────────────────────────────────────────────────────────┐
│              Run Contract Enforcement                    │
│                                                          │
│   Agent Run Start                                        │
│        │                                                 │
│        ▼                                                 │
│   ┌─────────────────────────────────────────────┐       │
│   │            Contract Monitor                  │       │
│   │                                              │       │
│   │   Time:    [=====>        ] 45%             │       │
│   │   Tokens:  [======>       ] 52%             │       │
│   │   Cost:    [===>          ] 28%             │       │
│   │   Actions: [========>     ] 64%             │       │
│   │                                              │       │
│   └─────────────────────────────────────────────┘       │
│        │                                                 │
│        ├── 80% threshold ──► Warning to agent           │
│        ├── 95% threshold ──► Graceful shutdown          │
│        └── 100% limit ────► Forced termination          │
└─────────────────────────────────────────────────────────┘
```

### Pattern 3: Circuit Breaker

```
┌─────────────────────────────────────────────────────────┐
│              Circuit Breaker States                      │
│                                                          │
│   ┌────────┐     errors >= 3    ┌────────┐              │
│   │ Closed │────────────────────►│  Open  │              │
│   │(normal)│                     │(blocked)│              │
│   └────┬───┘                     └────┬───┘              │
│        │                              │                  │
│        │     success              timeout               │
│        │        │                    │                   │
│        │        ▼                    ▼                   │
│        │   ┌─────────────────────────┐                  │
│        └───│     Half-Open          │                   │
│            │   (test single req)    │                   │
│            └─────────────────────────┘                  │
└─────────────────────────────────────────────────────────┘
```

**Circuit Breaker Configuration:**

| Parameter | Default | Description |
|-----------|---------|-------------|
| failure_threshold | 3 | Errors before open |
| recovery_timeout | 30s | Time before half-open |
| success_threshold | 1 | Successes to close |
| monitored_errors | timeout, rate_limit | Error types to track |

### Pattern 4: Cost Attribution

```
┌─────────────────────────────────────────────────────────┐
│               Cost Attribution Model                     │
│                                                          │
│   Agent Run                                              │
│      │                                                   │
│      ├── LLM Inference ────── $0.002/1K tokens          │
│      │                                                   │
│      ├── Tool Execution ───── $0.001/call               │
│      │                                                   │
│      ├── Vector Search ────── $0.0001/query             │
│      │                                                   │
│      └── External API ─────── Pass-through cost         │
│                                                          │
│   Total Cost = Sum(component costs) + overhead (10%)    │
└─────────────────────────────────────────────────────────┘
```

---

## Enforcement Strategies

### Soft vs Hard Limits

| Limit Type | Behavior | Use Case |
|------------|----------|----------|
| Soft limit | Warning, allow overage | Development, exploration |
| Hard limit | Block at threshold | Production, cost control |
| Burst limit | Allow temporary overage | Peak handling |

### Graceful Degradation

| Resource State | Agent Behavior |
|----------------|----------------|
| 80% consumed | Reduce tool calls, shorter responses |
| 95% consumed | Complete current task only |
| 100% consumed | Return partial results, terminate |

---

## Contract Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| run_id | UUID | Yes | Unique run identifier |
| tenant_id | UUID | Yes | Owning tenant |
| max_duration_seconds | int | Yes | Time limit |
| max_tokens | int | Yes | Token budget |
| max_cost_cents | int | Yes | Cost cap in cents |
| max_actions | int | Yes | Tool call limit |
| circuit_breaker | object | No | Breaker config |
| soft_limits | boolean | No | Allow overage |

---

## Monitoring Metrics

| Metric | Type | Alert Condition |
|--------|------|-----------------|
| run_duration_seconds | Histogram | p99 > 80% limit |
| run_tokens_consumed | Counter | > 90% budget |
| run_cost_cents | Counter | > 95% budget |
| circuit_breaker_state | Gauge | state = open |
| run_termination_reason | Counter | forced > 10% |

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Design agent execution framework with contracts
- `bmad-bam-usage-metering-design` - Integrate contract consumption with billing
- `bmad-bam-ai-agent-debug` - Troubleshoot contract enforcement issues

---

## Decision Framework

| Question | Recommendation |
|----------|----------------|
| User-facing task? | Strict time limits, graceful degradation |
| Background processing? | Relaxed time, strict cost |
| Exploratory agent? | Soft limits with monitoring |
| Production critical? | Hard limits + circuit breaker |
| Multi-step workflow? | Checkpoint-based budgets |

---

## Related Patterns

- `action-gateway-patterns` guide for request handling
- `usage-metering` guide for billing integration
- `run-contract` pattern in `bam-patterns.csv`
- `ai-runtime` guide for orchestration context

### Web Research

For current best practices, use the `web_queries` column from the pattern registry:

| Pattern | Web Search Query |
|---------|------------------|
| `run-contracts` | `AI agent run contracts multi-tenant SaaS {date}` |
| `run-contracts` | `agent budget enforcement multi-tenant SaaS {date}` |

**Note:** Replace `{date}` with the current year for up-to-date results.
