# Database-per-Tenant - BAM Pattern

**Loaded by:** ZPD  
**Applies to:** Multi-tenant data isolation

---

## When to Use

- Enterprise tier customers
- Maximum isolation required
- PCI-DSS, HIPAA compliance
- Dedicated resource requirements

## When NOT to Use

- Cost constraints
- High tenant volume
- Shared infrastructure acceptable

## Architecture

```
┌──────────┐  ┌──────────┐  ┌──────────┐
│Database A│  │Database B│  │Database C│
│ Tenant A │  │ Tenant B │  │ Tenant C │
└──────────┘  └──────────┘  └──────────┘
       │             │             │
       └─────────────┴─────────────┘
                     │
              Connection Router
```

## Trade-offs

| Benefit | Cost |
|---------|------|
| Maximum isolation | High infrastructure cost |
| Independent scaling | Complex management |
| Compliance ready | Connection overhead |

## Web Research Queries

- "database per tenant architecture {date}"
- "multi-tenant dedicated database patterns {date}"
