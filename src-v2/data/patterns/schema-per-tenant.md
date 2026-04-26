# Schema-per-Tenant - BAM Pattern

**Loaded by:** ZPS  
**Applies to:** Multi-tenant data isolation

---

## When to Use

- Regulated industries requiring schema isolation
- Moderate tenant count (<500)
- Per-tenant schema customization needed
- Compliance requires logical separation

## When NOT to Use

- High tenant volume (>1000)
- Cost is primary constraint
- No regulatory requirements

## Architecture

```
┌─────────────────────────────────────────┐
│           Single Database               │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │Schema A │ │Schema B │ │Schema C │   │
│  │ tables  │ │ tables  │ │ tables  │   │
│  └─────────┘ └─────────┘ └─────────┘   │
└─────────────────────────────────────────┘
```

## Trade-offs

| Benefit | Cost |
|---------|------|
| Schema isolation | Connection management |
| Per-tenant migrations | Backup complexity |
| Compliance friendly | Higher resource usage |

## Web Research Queries

- "schema per tenant PostgreSQL {date}"
- "multi-tenant schema isolation patterns {date}"
