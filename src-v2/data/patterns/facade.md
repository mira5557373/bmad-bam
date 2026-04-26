# Facade Pattern - BAM Pattern

**Loaded by:** ZIF  
**Applies to:** Module integration

---

## When to Use

- Module boundary definition
- API contract enforcement
- Dependency isolation
- Incremental modernization

## When NOT to Use

- Simple internal services
- No module boundaries needed
- Direct coupling acceptable

## Architecture

```
┌─────────────────────────────────────┐
│            Consumer Module          │
│                 │                   │
│                 ▼                   │
│  ┌────────────────────────────┐    │
│  │      Facade Interface       │    │
│  │  (Contract Definition)      │    │
│  └────────────┬───────────────┘    │
│               │                     │
└───────────────┼─────────────────────┘
                │
┌───────────────┼─────────────────────┐
│               ▼                     │
│  ┌────────────────────────────┐    │
│  │    Provider Implementation  │    │
│  └────────────────────────────┘    │
│            Provider Module          │
└─────────────────────────────────────┘
```

## Trade-offs

| Benefit | Cost |
|---------|------|
| Clean contracts | Indirection overhead |
| Independent evolution | More code |
| Testability | Sync required |

## Web Research Queries

- "facade pattern microservices {date}"
- "module boundary patterns {date}"
