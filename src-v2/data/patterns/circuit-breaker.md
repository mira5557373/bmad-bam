# Circuit Breaker - BAM Pattern

**Loaded by:** ZCB  
**Applies to:** Resilience and fault tolerance

---

## When to Use

- External service dependencies
- Failure isolation needed
- Cascading failure prevention
- Graceful degradation required

## When NOT to Use

- In-process calls only
- Failures must propagate
- Simple retry sufficient

## Architecture

```
┌─────────────────────────────────────┐
│         Circuit Breaker             │
│  ┌─────────┐  ┌─────────┐          │
│  │ CLOSED  │──│  OPEN   │          │
│  │ (pass)  │  │ (fail)  │          │
│  └────┬────┘  └────┬────┘          │
│       │            │               │
│       └─────┬──────┘               │
│             ▼                      │
│       ┌──────────┐                 │
│       │HALF-OPEN │                 │
│       │ (probe)  │                 │
│       └──────────┘                 │
└─────────────────────────────────────┘
```

## Trade-offs

| Benefit | Cost |
|---------|------|
| Failure isolation | Added complexity |
| Fast failure | State management |
| Recovery time | Configuration tuning |

## Web Research Queries

- "circuit breaker pattern {date}"
- "resilience patterns multi-tenant {date}"
