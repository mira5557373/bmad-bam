# Retry and Backoff Policies

**When to load:** When implementing retry logic, handling transient failures, or when user mentions exponential backoff, retry policies, or fault tolerance.

**Integrates with:** Architect (Atlas persona), Dev agent, DevOps agent

---

## Core Concepts

### What are Retry Policies?

Retry policies define how systems handle transient failures by automatically retrying failed operations. In multi-tenant SaaS, retry policies must consider per-tenant resource usage and avoid amplifying failures.

### Backoff Strategy Comparison

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Immediate | Retry instantly | Very transient failures |
| Linear | Fixed interval increase | Moderate failures |
| Exponential | Doubling interval | Service recovery |
| With Jitter | Random variation | Avoid thundering herd |

---

## Key Patterns

### Pattern 1: Exponential Backoff

Double wait time between retries.

| Parameter | Description | Typical Value |
|-----------|-------------|---------------|
| Initial Delay | First retry wait | 100ms |
| Max Delay | Cap on delay | 30 seconds |
| Multiplier | Delay increase factor | 2 |
| Max Retries | Retry limit | 5 |

### Exponential Backoff Formula

```
delay = min(initial_delay * (multiplier ^ attempt), max_delay)

Example:
  Attempt 1: 100ms
  Attempt 2: 200ms
  Attempt 3: 400ms
  Attempt 4: 800ms
  Attempt 5: 1600ms
```

### Pattern 2: Jitter

Add randomness to prevent synchronized retries.

| Jitter Type | Description | Implementation |
|-------------|-------------|----------------|
| Full Jitter | Random 0 to delay | `random(0, delay)` |
| Equal Jitter | Half base + half random | `delay/2 + random(0, delay/2)` |
| Decorrelated | Random from previous | `min(max_delay, random(base, delay * 3))` |

### Jitter Benefits

```
Without Jitter:          With Jitter:
    │ │ │ │                 │   │ │   │
    v v v v                 v   v v   v
  ──┴─┴─┴─┴──             ──┴───┴─┴───┴──
  All at once            Spread out
  (thundering herd)      (smooth load)
```

### Pattern 3: Retry Classification

Determine which errors are retryable.

| Error Type | Retryable | Example |
|------------|-----------|---------|
| Network | Yes | Connection timeout |
| Rate limit | Yes | 429 Too Many Requests |
| Server error | Maybe | 500, 503 |
| Client error | No | 400, 401, 403 |
| Validation | No | Invalid input |

### Classification Flow

```
Error Occurred
      │
      v
┌─────────────────┐
│ Is Retryable?   │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    v         v
   Yes        No
    │         │
    v         v
  Retry    Fail Fast
```

### Pattern 4: Circuit Breaker Integration

Combine retry with circuit breaker.

| State | Retry Behavior |
|-------|----------------|
| Closed | Normal retries |
| Open | Fail immediately |
| Half-Open | Limited retries |

### Integration Flow

```
Request
   │
   v
┌──────────────────┐
│  Circuit Breaker │
│    [Closed]      │
└────────┬─────────┘
         │
         v
┌──────────────────┐
│   Retry Policy   │
│  (if retryable)  │
└────────┬─────────┘
         │
    Success/Failure
         │
         v
   Update Circuit State
```

---

## Application Guidelines

When implementing retry policies:

1. **Only retry transient failures** - Don't retry validation errors
2. **Always use backoff** - Prevent overwhelming failing service
3. **Add jitter** - Prevent thundering herd
4. **Set max retries** - Limit total attempts
5. **Ensure idempotency** - Retried operations must be safe

---

## Per-Tier Retry Configuration

| Tier | Max Retries | Max Delay | Jitter |
|------|-------------|-----------|--------|
| Free | 3 | 10 seconds | Full |
| Pro | 5 | 30 seconds | Equal |
| Enterprise | 10 | 60 seconds | Decorrelated |

---

## Retry Budget

Limit total retry impact per tenant.

| Budget Type | Description | Enforcement |
|-------------|-------------|-------------|
| Retry Count | Total retries per window | Counter |
| Retry Ratio | % of requests that retry | Metric |
| Backoff Time | Total delay time | Accumulator |

---

## Error Response Headers

| Header | Description | Example |
|--------|-------------|---------|
| Retry-After | Suggested wait time | 30 |
| X-RateLimit-Reset | When limit resets | 1712678400 |
| X-Retry-Count | Current retry number | 2 |

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| No backoff | Overwhelms service | Always use backoff |
| No jitter | Thundering herd | Add randomness |
| Retry non-idempotent | Duplicate effects | Ensure idempotency |
| Unlimited retries | Never fails | Set max retries |
| Same delay | No adaptation | Exponential increase |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Which backoff strategy? | Exponential with jitter | Balances retry speed and server protection |
| How many retries? | 3-5 for most cases | Enough for transient failures, not too many |
| Immediate retry ever? | Only for very fast idempotent operations | Risk of amplification |
| Circuit breaker integration? | Yes, for external services | Prevents retry storms |

---

## Related Workflows

- `create-master-architecture` - Design resilience patterns
- `bmad-bam-convergence-verification` - Verify retry behavior
- `bmad-bam-agent-runtime-architecture` - Agent retry policies

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Retry policies:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `retry-policies`
- **Circuit breaker:** `{project-root}/_bmad/bam/data/agent-guides/bam/circuit-breaker.md`
- **Event-driven:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `event-driven`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "retry patterns distributed systems {date}"
- Search: "exponential backoff best practices {date}"
- Search: "jitter retry strategy {date}"
