# Circuit Breaker Patterns

**When to load:** When implementing fault tolerance, resilience patterns, or when user mentions circuit breakers, bulkheads, or failure handling in distributed systems.

**Integrates with:** Architect (Atlas persona), Dev agent, DevOps agent

---

## Core Concepts

### What is a Circuit Breaker?

A circuit breaker prevents cascading failures in distributed systems by monitoring for failures and stopping requests to failing services. In multi-tenant SaaS, circuit breakers must balance tenant isolation with shared resource protection.

### Circuit Breaker States

| State | Description | Behavior |
|-------|-------------|----------|
| Closed | Normal operation | Requests pass through |
| Open | Failure threshold exceeded | Requests fail fast |
| Half-Open | Testing recovery | Limited requests allowed |

### State Transitions

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
           └───────┬───────┘
                   │
        ┌──────────┼──────────┐
        │ success  │  failure │
        v          │          v
    Closed         │        Open
                   │
```

---

## Key Patterns

### Pattern 1: Service-Level Circuit Breaker

One circuit per downstream service.

| Parameter | Description | Typical Value |
|-----------|-------------|---------------|
| Failure Threshold | Failures to open | 5 failures |
| Failure Window | Time to count failures | 60 seconds |
| Open Duration | Time before half-open | 30 seconds |
| Half-Open Requests | Test requests allowed | 3 requests |

### Pattern 2: Tenant-Aware Circuit Breaker

Separate circuit state per tenant.

| Component | Purpose | Implementation |
|-----------|---------|----------------|
| Per-Tenant State | Isolate failures | Tenant-keyed state |
| Shared Monitoring | Detect global issues | Aggregate metrics |
| Tenant Override | Custom thresholds | Per-tier configuration |
| Global Override | System protection | Platform-level breaker |

### Tenant Circuit Architecture

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

### Pattern 3: Bulkhead Isolation

Isolate failures to prevent cascade.

| Component | Purpose | Tenant Consideration |
|-----------|---------|---------------------|
| Thread Pools | Isolate execution | Per-tenant pools |
| Connection Pools | Isolate connections | Tenant quotas |
| Semaphores | Limit concurrency | Per-tenant limits |
| Queues | Buffer requests | Tenant-scoped queues |

### Bulkhead Architecture

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

### Pattern 4: Fallback Strategies

Define behavior when circuit is open.

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Default Value | Return cached/default | Non-critical data |
| Graceful Degradation | Reduced functionality | Feature flags |
| Alternative Service | Backup provider | Redundant services |
| Queue for Retry | Store for later | Eventually consistent |
| Fail Fast | Return error immediately | Time-sensitive |

---

## Application Guidelines

When implementing circuit breakers:

1. **Start conservative** - Open quickly, recover slowly
2. **Monitor closely** - Alert on state changes
3. **Define fallbacks** - Every circuit needs a fallback
4. **Test failure modes** - Chaos engineering
5. **Document behavior** - Clear expectations for tenants

---

## Per-Tier Circuit Configuration

| Tier | Failure Threshold | Open Duration | Fallback |
|------|-------------------|---------------|----------|
| Free | 3 failures | 60 seconds | Default value |
| Pro | 5 failures | 30 seconds | Degraded mode |
| Enterprise | 10 failures | 15 seconds | Alternative service |

---

## Circuit Breaker Metrics

| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| State Changes | Open/Close transitions | >5 per hour |
| Failure Rate | % requests failing | >10% |
| Rejection Rate | % requests rejected | >5% |
| Recovery Time | Time in open state | >5 minutes |

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Global circuit | One tenant affects all | Tenant-aware circuits |
| No fallback | Users get errors | Define fallback behavior |
| Too sensitive | Opens on transient issues | Tune thresholds |
| No monitoring | Don't know circuit state | Metrics and alerts |
| Missing bulkhead | Cascade failures | Isolate resources |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| When to use circuit breaker? | External dependencies, unreliable services | Prevents cascade failures |
| Tenant-level or global? | Both - tenant for isolation, global for protection | Balance isolation with system safety |
| What fallback? | Based on data criticality and freshness requirements | Non-critical: default; critical: alternative service |
| How to test? | Chaos engineering, fault injection | Verify behavior before production |

---

## Related Workflows

- `bmad-bam-create-master-architecture` - Design resilience patterns
- `bmad-bam-convergence-verification` - Verify resilience
- `bmad-bam-disaster-recovery-design` - Failure handling

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Circuit breaker:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `circuit-breaker`
- **Agent resilience:** `{project-root}/_bmad/bam/data/agent-guides/bam/agent-resilience-patterns.md`
- **API gateway:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `api-gateway-patterns`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "circuit breaker patterns {date}"
- Search: "resilience patterns microservices {date}"
- Search: "bulkhead pattern multi-tenant {date}"
