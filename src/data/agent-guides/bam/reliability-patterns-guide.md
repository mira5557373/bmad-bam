# BAM Reliability Patterns Guide

**When to load:** During resilience design, fault tolerance implementation, disaster recovery planning, or when user mentions circuit breakers, retries, failover, RTO/RPO, bulkheads, or graceful degradation.
**Integrates with:** Architect (Winston/Atlas/Nova), Dev (James), DevOps, SRE agents

---

## Core Concepts

Reliability patterns ensure multi-tenant SaaS platforms can handle failures gracefully, recover from errors, and maintain service quality under adverse conditions. In multi-tenant systems, reliability patterns must balance tenant isolation with shared resource protection.

### Key Principles

| Principle | Description |
|-----------|-------------|
| Fail-Safe Defaults | System should fail to a safe state, not an open/permissive one |
| Tenant Isolation Under Failure | One tenant's failures should not cascade to others |
| Graceful Degradation | Reduce functionality rather than complete failure |
| Fast Recovery | Minimize time to restore normal operation |

### Failure Categories

| Category | Examples | Typical Response |
|----------|----------|------------------|
| Transient | API timeout, rate limit, network blip | Retry with backoff |
| Persistent | Invalid API key, model deprecation | Failover to alternate |
| Resource | Token budget exceeded, memory full | Graceful degradation |
| Catastrophic | Region outage, data corruption | Disaster recovery |

---

## BAM Conventions

> **CRITICAL:** These conventions are BAM-specific and MUST be followed exactly.

### Circuit Breaker State Storage

| Scope | Key Pattern | Purpose |
|-------|-------------|---------|
| Per-tenant | `cb:tenant:{tenant_id}:{service}` | Tenant isolation |
| Global | `cb:global:{service}` | Platform protection |
| Per-tier | `cb:tier:{tier}:{service}` | Tier-level thresholds |

### Retry Context Headers

| Header | Description |
|--------|-------------|
| `X-Tenant-ID` | Tenant context for retry |
| `X-Retry-Count` | Current retry attempt |
| `X-Idempotency-Key` | Ensure retry safety |
| `X-Correlation-ID` | Request tracing |

### Backup Key Format

```
Pattern: backup:{tenant_id}:{timestamp}:{component}

Examples:
- backup:abc123:20260425T120000Z:database
- backup:abc123:20260425T120000Z:vectors
- backup:abc123:20260425T120000Z:config
```

---

## Decision Framework

### Quick Decision Matrix

| Situation | Pattern | Confidence |
|-----------|---------|------------|
| Sporadic API errors | Retry with backoff | High |
| Sustained service failure | Circuit breaker | High |
| Token/resource exhaustion | Graceful degradation | High |
| Concurrent request storms | Bulkhead isolation | High |
| Region outage | Disaster recovery failover | High |
| Long-running task failure | Checkpoint and resume | Medium |

### Pattern Selection Tree

```
Error Detected
│
├─► Is it transient?
│   ├─► YES → Retry with exponential backoff + jitter
│   └─► NO → Is service degraded?
│           ├─► YES → Circuit breaker (open)
│           └─► NO → Is it resource exhaustion?
│                   ├─► YES → Graceful degradation
│                   └─► NO → Fail with clear error
│
├─► Is it affecting one tenant?
│   ├─► YES → Per-tenant circuit breaker
│   └─► NO → Global circuit breaker
│
└─► Is it regional/catastrophic?
    └─► YES → Invoke DR failover
```

---

## §circuit-breaker

### Pattern: Tenant-Aware Circuit Breaker

**When to use:** External dependencies, LLM APIs, third-party services
**Phase:** solutioning
**QG:** QG-R1 (Resilience patterns implemented)

#### Circuit Breaker States

| State | Description | Behavior |
|-------|-------------|----------|
| Closed | Normal operation | Requests pass through |
| Open | Failure threshold exceeded | Requests fail fast |
| Half-Open | Testing recovery | Limited requests allowed |

#### State Transition Diagram

```
     ┌─────────────────────────────────────┐
     │                                     │
     v                                     │
┌─────────┐  failure threshold  ┌─────────┐
│ Closed  │ ─────────────────> │  Open   │
└────┬────┘                    └────┬────┘
     │                              │
     │ success                      │ timeout
     │                              │
     │     ┌───────────────┐        │
     └──── │  Half-Open    │ <──────┘
           └───────────────┘
```

#### Tenant Circuit Architecture

```
┌─────────────────────────────────────────┐
│        Circuit Breaker Manager           │
│                                          │
│  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │Tenant A  │  │Tenant B  │  │ Global │ │
│  │ Circuit  │  │ Circuit  │  │Circuit │ │
│  │ [Closed] │  │ [Open]   │  │[Closed]│ │
│  └──────────┘  └──────────┘  └────────┘ │
│                                          │
│  Tenant B failures don't affect A        │
└─────────────────────────────────────────┘
```

#### Per-Tier Configuration

| Tier | Failure Threshold | Open Duration | Half-Open Probes |
|------|-------------------|---------------|------------------|
| Free | 3 failures/60s | 60 seconds | 1 request |
| Pro | 5 failures/60s | 30 seconds | 2 requests |
| Enterprise | 10 failures/60s | 15 seconds | 3 requests |

#### Metrics to Monitor

| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| State Changes | Open/Close transitions | >5 per hour |
| Failure Rate | % requests failing | >10% |
| Rejection Rate | % requests rejected (open) | >5% |
| Recovery Time | Time in open state | >5 minutes |

---

## §retry-policies

### Pattern: Exponential Backoff with Jitter

**When to use:** Transient failures, network errors, rate limits
**Phase:** implementation
**QG:** QG-R1

#### Backoff Strategies

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Immediate | No delay | Very transient, fast recovery |
| Linear | Fixed interval increase | Moderate failures |
| Exponential | Doubling interval | Service recovery |
| With Jitter | Random variation added | Prevent thundering herd |

#### Exponential Backoff Formula

```
delay = min(initial_delay * (multiplier ^ attempt), max_delay)
jitter = random(-jitter_factor, +jitter_factor) * delay

Example (with 10% jitter):
  Attempt 1: 100ms +/- 10ms
  Attempt 2: 200ms +/- 20ms
  Attempt 3: 400ms +/- 40ms
  Attempt 4: 800ms +/- 80ms
  Attempt 5: 1600ms +/- 160ms
```

#### Retry Classification

| Error Type | Retryable | Example |
|------------|-----------|---------|
| Network timeout | Yes | Connection timeout |
| Rate limit (429) | Yes | Too Many Requests |
| Server error (5xx) | Maybe | 500, 503 |
| Client error (4xx) | No | 400, 401, 403, 404 |
| Validation | No | Invalid input |

#### Per-Tier Retry Configuration

| Tier | Max Retries | Max Delay | Initial Delay | Jitter |
|------|-------------|-----------|---------------|--------|
| Free | 3 | 10 seconds | 100ms | Full |
| Pro | 5 | 30 seconds | 100ms | Equal |
| Enterprise | 10 | 60 seconds | 50ms | Decorrelated |

#### Retry Budget

Limit total retry impact per tenant to prevent resource exhaustion:

| Budget Type | Description | Per-Tier Limit |
|-------------|-------------|----------------|
| Retry Count | Total retries per window | Free: 100/min, Pro: 500/min |
| Retry Ratio | % of requests that retry | Max 20% |
| Backoff Time | Total delay time | Max 60s cumulative |

---

## §fallback

### Pattern: Graceful Degradation

**When to use:** Circuit open, resource exhaustion, partial failures
**Phase:** solutioning
**QG:** QG-R2

#### Fallback Hierarchy

| Level | Strategy | When to Use |
|-------|----------|-------------|
| 1 | Retry same service | Transient error |
| 2 | Fallback service | Primary unavailable |
| 3 | Cached response | All services fail |
| 4 | Default value | Non-critical data |
| 5 | Graceful error | Critical failure |

#### Per-Data-Criticality Fallback

| Data Type | Fallback Strategy | Freshness Tolerance |
|-----------|-------------------|---------------------|
| User preferences | Cached value | 1 hour |
| Dashboard metrics | Stale data + warning | 5 minutes |
| Transaction data | Queue for retry | 0 (must complete) |
| AI responses | Alternative model | N/A |

#### Model Fallback Chain (AI Agents)

| Primary Model | Fallback 1 | Fallback 2 | Trade-offs |
|---------------|------------|------------|------------|
| GPT-4o | Claude 3.5 | GPT-4-turbo | Quality vs cost |
| Claude 3 Opus | GPT-4 | Claude 3 Sonnet | Capability match |
| Self-hosted | Cloud API | Cached response | Latency vs privacy |

---

## §bulkhead

### Pattern: Tenant Isolation Under Failure

**When to use:** Prevent noisy neighbor, protect shared resources
**Phase:** foundation
**QG:** QG-M2, QG-I2

#### Bulkhead Architecture

```
┌─────────────────────────────────────────┐
│            Bulkhead Pattern              │
│                                          │
│  ┌──────────┐  ┌──────────┐             │
│  │ Tenant A │  │ Tenant B │             │
│  │ ┌──────┐ │  │ ┌──────┐ │             │
│  │ │Pool  │ │  │ │Pool  │ │             │
│  │ │(10)  │ │  │ │(10)  │ │             │
│  │ └──────┘ │  │ └──────┘ │             │
│  └──────────┘  └──────────┘             │
│                                          │
│  Tenant A exhaustion doesn't affect B    │
└─────────────────────────────────────────┘
```

#### Isolation Components

| Component | Purpose | Tenant Strategy |
|-----------|---------|-----------------|
| Thread Pools | Isolate execution | Per-tenant pools (Enterprise) |
| Connection Pools | Isolate DB connections | Per-tier quotas |
| Semaphores | Limit concurrency | Per-tenant limits |
| Queues | Buffer requests | Tenant-scoped queues |
| Rate Limiters | Limit request rate | Per-tenant + per-tier |

#### Per-Tier Resource Allocation

| Resource | Free | Pro | Enterprise |
|----------|------|-----|------------|
| DB Connections | 2 | 10 | 50 (dedicated) |
| Worker Threads | 1 | 5 | 20 |
| Queue Depth | 10 | 100 | 1000 |
| Concurrent Requests | 5 | 50 | 500 |

---

## §disaster-recovery

### Pattern: Multi-Tenant Disaster Recovery

**When to use:** Regional outages, data corruption, catastrophic failure
**Phase:** operations
**QG:** QG-DR1

#### RTO/RPO Per Tier

| Tier | RPO (Data Loss) | RTO (Downtime) | DR Strategy |
|------|-----------------|----------------|-------------|
| Free | 24 hours | 48 hours | Backup restore |
| Pro | 1 hour | 4 hours | Warm standby |
| Enterprise | 15 minutes | 1 hour | Hot standby |
| Enterprise+ | 0 (sync replication) | 15 minutes | Active-active |

#### DR Strategy Classification

| Strategy | Description | Cost Factor | Failover Time |
|----------|-------------|-------------|---------------|
| Backup/Restore | Restore from backups | 1x | Hours |
| Pilot Light | Minimal standby infra | 1.5x | 30min-1hr |
| Warm Standby | Scaled-down active copy | 2-3x | 15-30min |
| Hot Standby | Full active-passive | 3-5x | <5min |
| Active-Active | Multi-region active | 5-10x | Automatic |

#### Cross-Region Architecture

```
Primary Region                    Secondary Region
┌─────────────────┐               ┌─────────────────┐
│  Load Balancer  │───DNS───────►│  Load Balancer  │
│  App Servers    │               │  App Servers    │ (standby)
│  Database       │──Replication─►│  Database       │ (replica)
│  Object Storage │──Replication─►│  Object Storage │
└─────────────────┘               └─────────────────┘
```

#### Tenant-Isolated Backup Components

| Component | Backup Frequency | Retention | Isolation |
|-----------|------------------|-----------|-----------|
| Database | Continuous + Daily | Per-tier | Per-tenant restore |
| Vector embeddings | Daily | 30 days | Namespace export |
| File storage | Hourly incremental | Per-tier | Tenant-prefixed |
| Agent memory | Daily | 90 days | Scope-filtered |
| Configuration | On change | Indefinite | Version controlled |
| Secrets/Keys | On change | 7 versions | Encrypted |

#### Failover Decision Matrix

| Scenario | Primary Action | Failover Trigger |
|----------|---------------|------------------|
| Region outage (>5min) | Automatic failover | Health check failure |
| Database failure | Promote replica | Connection errors |
| Data corruption | Point-in-time restore | Integrity check |
| Security breach | Isolate + assess | Incident detection |

#### Recovery Procedures

| Phase | Actions | Duration Target |
|-------|---------|-----------------|
| Detection | Monitoring alerts, health checks | < 1 minute |
| Assessment | Determine scope, impact | < 5 minutes |
| Decision | Failover or fix in place | < 5 minutes |
| Execution | Run failover playbook | 5-30 minutes |
| Verification | Tenant health checks | 5-15 minutes |
| Communication | Notify affected tenants | Ongoing |

#### Restore Priority Matrix

| Priority | Criteria | Restore Order |
|----------|----------|---------------|
| P1 | Enterprise+ tier, active incident | First |
| P2 | Enterprise tier, degraded service | Second |
| P3 | Pro tier, data loss reported | Third |
| P4 | Free tier, routine restore | Queue-based |

---

## §agent-resilience

### Pattern: Agent-Specific Reliability

**When to use:** LLM API failures, tool execution errors, agent loops
**Phase:** solutioning
**QG:** QG-M3, QG-I3

#### Agent Failure Modes

| Failure Mode | Detection | Impact | Recovery Strategy |
|--------------|-----------|--------|-------------------|
| Token exhaustion | Budget tracking | Task incomplete | Checkpoint and resume |
| Tool timeout | Execution timer | Blocked progress | Cancel + retry shorter |
| Hallucination loop | Output validation | Wrong results | Context reset |
| Memory overflow | Context length check | Agent crash | Summarize and continue |
| API rate limit | 429 response | Degraded throughput | Backoff + fallback model |

#### Agent Resilience Architecture

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
    │       └── Max retries ──► Fallback model
    │
    └── Response with metrics logged
```

#### Circuit Breaker Per LLM Provider

| Provider | Failure Threshold | Open Duration | Half-Open Probes |
|----------|-------------------|---------------|------------------|
| OpenAI | 5 failures/60s | 30 seconds | 1 request |
| Anthropic | 5 failures/60s | 30 seconds | 1 request |
| Azure OpenAI | 3 failures/30s | 60 seconds | 2 requests |
| Self-hosted | 10 failures/60s | 15 seconds | 3 requests |

#### Per-Tier Agent Resilience

| Tier | Retry Budget | Fallback Models | SLA Target |
|------|--------------|-----------------|------------|
| Free | 3 retries | 1 (shared) | Best effort |
| Pro | 5 retries | 2 | 99.5% |
| Enterprise | 10 retries | 3+ dedicated | 99.9% |

---

## Quality Gates

| Gate | Key Checks | Related Patterns |
|------|------------|------------------|
| QG-R1 | Circuit breakers implemented, retry policies defined | §circuit-breaker, §retry-policies |
| QG-R2 | Fallback strategies defined, graceful degradation tested | §fallback |
| QG-M2 | Bulkhead isolation verified | §bulkhead |
| QG-M3 | Agent resilience patterns implemented | §agent-resilience |
| QG-DR1 | DR runbooks documented, RTO/RPO validated | §disaster-recovery |
| QG-I2 | Tenant isolation under failure verified | §bulkhead |
| QG-I3 | Agent safety under failure verified | §agent-resilience |

### Gate Verification Checklist

- [ ] Circuit breakers configured for all external services
- [ ] **CRITICAL:** Per-tenant circuit breaker state isolation
- [ ] Retry policies with exponential backoff and jitter
- [ ] Fallback strategies defined for critical paths
- [ ] Bulkhead isolation for tenant resources
- [ ] DR runbooks documented and tested
- [ ] RTO/RPO targets defined per tier
- [ ] Agent fallback model chain configured
- [ ] Chaos testing performed for failure scenarios

---

## Web Research

| Topic | Query |
|-------|-------|
| Circuit breaker patterns | "circuit breaker patterns multi-tenant SaaS {date}" |
| Retry best practices | "exponential backoff jitter distributed systems {date}" |
| Bulkhead isolation | "bulkhead pattern multi-tenant {date}" |
| Disaster recovery | "multi-tenant SaaS disaster recovery {date}" |
| Agent resilience | "LLM API resilience patterns {date}" |
| Graceful degradation | "graceful degradation patterns {date}" |

---

## Related Patterns

Cross-references to other domain guides:

- `tenant-patterns-guide.md` §tenant-rls - Tenant isolation foundation
- `ai-runtime-patterns-guide.md` §run-contracts - Agent execution boundaries
- `observability-patterns-guide.md` §health-checks - Failure detection
- `security-patterns-guide.md` §rate-limiting - Request protection

Load from pattern registry:
- `bam-patterns.csv` -> filter: `circuit-breaker`, `retry-policies`, `disaster-recovery`
- `quality-gates.csv` -> filter: `QG-R*`, `QG-DR*`

Use the `web_queries` column from pattern registry for current best practices.

---

## Related Workflows

| Workflow | When to Use |
|----------|-------------|
| `bmad-bam-disaster-recovery-design` | Design DR architecture and runbooks |
| `bmad-bam-chaos-engineering-design` | Test resilience under failure |
| `bmad-bam-performance-baseline` | Validate circuit breaker behavior |
| `bmad-bam-agent-runtime-architecture` | Design agent resilience |
| `validate-foundation` | Verify resilience patterns (QG-F1) |
| `convergence-verification` | Verify tenant safety (QG-I2, QG-I3) |

---

## Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-25 | Initial consolidated guide from 5 source files: circuit-breaker.md, retry-policies.md, disaster-recovery.md, disaster-recovery-patterns.md, agent-resilience-patterns.md |
