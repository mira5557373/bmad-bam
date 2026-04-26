# CQRS Pattern - BAM Pattern

**Loaded by:** ZCQ  
**Applies to:** Read/write separation

---

## When to Use

- Read/write load asymmetry
- Complex read models
- Event sourcing companion
- Scaling requirements differ

## When NOT to Use

- Simple CRUD operations
- Consistent read-after-write needed
- Low complexity systems

## Architecture

```
┌─────────────────────────────────────┐
│              CQRS                   │
│                                     │
│  ┌─────────┐      ┌─────────┐      │
│  │ Command │      │  Query  │      │
│  │  Model  │      │  Model  │      │
│  └────┬────┘      └────┬────┘      │
│       │                │           │
│       ▼                ▼           │
│  ┌─────────┐      ┌─────────┐      │
│  │  Write  │─────►│  Read   │      │
│  │   DB    │ sync │   DB    │      │
│  └─────────┘      └─────────┘      │
└─────────────────────────────────────┘
```

## Trade-offs

| Benefit | Cost |
|---------|------|
| Optimized models | Eventual consistency |
| Independent scaling | Sync complexity |
| Query flexibility | More infrastructure |

## Web Research Queries

- "CQRS implementation patterns {date}"
- "CQRS multi-tenant SaaS {date}"
