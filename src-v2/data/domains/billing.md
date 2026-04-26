# Billing - BAM Domain Context

**Loaded by:** ZBM, ZBU  
**Related Workflows:** bmad-bam-billing-metering, bmad-bam-usage-tracking

---

## Overview

Billing and metering systems track per-tenant resource consumption and translate usage into invoices.

## Core Concepts

### Metering Pipeline

```
Usage Event → Aggregator → Ledger → Invoice
     │            │          │         │
     └── tenant_id included at every stage
```

### Billing Models

| Model | Description | Tenant Isolation |
|-------|-------------|------------------|
| Seat-based | Per-user pricing | User count per tenant |
| Usage-based | Pay-per-use | Metered by tenant_id |
| Tiered | Feature tiers | Tier stored on tenant |
| Hybrid | Seats + usage | Combined tracking |

### Credit System

| Component | Purpose |
|-----------|---------|
| Credit Pool | Pre-paid balance per tenant |
| Usage Debit | Real-time deduction |
| Overage | Post-paid overflow |
| Alerts | Threshold notifications |

## Decision Matrix

| Scenario | Billing Model | Implementation |
|----------|---------------|----------------|
| Predictable workloads | Seat-based | Simple user counts |
| Variable AI usage | Usage-based | Event streaming |
| Enterprise customers | Tiered | Feature flags |
| Mixed workloads | Hybrid | Combined metering |

## Quality Checks

- [ ] Usage events captured for all billable resources
- [ ] Metering pipeline is fault-tolerant
- [ ] Invoice generation is auditable
- [ ] **CRITICAL:** No cross-tenant billing attribution errors

## Web Research Queries

- "SaaS billing metering patterns {date}"
- "usage-based pricing implementation {date}"
