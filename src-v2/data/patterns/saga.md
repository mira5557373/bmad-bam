# Saga Pattern - BAM Pattern

**Loaded by:** ZSG  
**Applies to:** Distributed transactions

---

## When to Use

- Cross-module transactions
- Eventual consistency acceptable
- Long-running processes
- Compensation logic needed

## When NOT to Use

- ACID required
- Single module scope
- Simple operations

## Architecture

```
┌─────────────────────────────────────┐
│            Saga Orchestrator        │
│                                     │
│  Step 1 ──► Step 2 ──► Step 3      │
│    │          │          │         │
│    ▼          ▼          ▼         │
│  Comp 1 ◄── Comp 2 ◄── Comp 3     │
│  (rollback) (rollback) (rollback) │
└─────────────────────────────────────┘
```

## Trade-offs

| Benefit | Cost |
|---------|------|
| Distributed transactions | Complexity |
| Eventual consistency | Compensation logic |
| Resilient | Debugging difficulty |

## Web Research Queries

- "saga pattern implementation {date}"
- "distributed transactions multi-tenant {date}"
