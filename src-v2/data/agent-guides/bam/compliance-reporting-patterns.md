# BAM Compliance Reporting Patterns Guide

**When to load:** During compliance report design, audit preparation, evidence collection automation, or when implementing compliance reporting for multi-tenant SaaS platforms.

**Integrates with:** Winston (Architect), Compliance teams, Auditors, compliance-bam extension.

---

## Core Concepts

### Compliance Report Types

| Report Type | Audience | Frequency | Content |
|-------------|----------|-----------|---------|
| SOC 2 Type II | Customers, auditors | Annual | Control effectiveness over time |
| GDPR ROPA | Regulators | On-demand | Processing activities record |
| Tenant Compliance Summary | Tenant admins | Monthly | Tenant-specific compliance status |
| Incident Report | Regulators, customers | Per incident | Breach notification details |
| Access Audit Report | Internal, auditors | Weekly/Monthly | Who accessed what, when |

### Multi-Tenant Report Scoping

| Scope | Description | Use Case |
|-------|-------------|----------|
| Platform-wide | All tenants aggregated | SOC 2 attestation |
| Tier-specific | All tenants in a tier | Tier compliance comparison |
| Tenant-specific | Single tenant data | Customer audit support |
| Cross-tenant | Comparative analysis | Platform health metrics |

### Evidence Collection Architecture

```
┌─────────────────────────────────────────────────┐
│              Evidence Collection                 │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ Audit    │  │ Config   │  │ Access   │      │
│  │ Logs     │  │ Snapshots│  │ Reviews  │      │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘      │
│       │             │             │             │
│       └──────┬──────┴──────┬──────┘             │
│              │             │                    │
│       ┌──────▼──────┐ ┌────▼─────┐             │
│       │  Evidence   │ │ Automated │             │
│       │  Repository │ │ Collection│             │
│       └──────┬──────┘ └──────────┘             │
│              │                                  │
│       ┌──────▼──────┐                          │
│       │   Report    │                          │
│       │  Generator  │                          │
│       └─────────────┘                          │
└─────────────────────────────────────────────────┘
```

### Report Generation Pipeline

| Stage | Actions | Output |
|-------|---------|--------|
| Data Collection | Query logs, configs, evidence | Raw data files |
| Tenant Filtering | Apply RLS/scope to data | Tenant-scoped data |
| Aggregation | Summarize by control/period | Aggregated metrics |
| Formatting | Apply report template | Draft report |
| Review | Human review, approval | Final report |

### Automated Evidence Collection

| Evidence Type | Collection Method | Storage | Retention |
|---------------|-------------------|---------|-----------|
| Audit logs | Real-time streaming | Immutable store | 7 years |
| Config changes | Git + change tracking | Version control | 5 years |
| Access reviews | Scheduled jobs | Audit database | 3 years |
| Penetration tests | Manual upload | Document store | 3 years |
| Compliance attestations | Vendor portal | Document store | Contract term |

---

## Application Guidelines

When implementing compliance reporting in a multi-tenant context:

1. **Automate evidence collection** - Manual collection doesn't scale with tenant count
2. **Scope reports to tenant boundaries** - Prevent cross-tenant data leakage in reports
3. **Use immutable storage** - Evidence must be tamper-proof for audit validity
4. **Version report templates** - Track changes to report formats over time
5. **Enable self-service tenant reports** - Reduce support burden for compliance inquiries
6. **Maintain chain of custody** - Document who generated/approved each report

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Should tenants generate own reports? | Yes for tier-appropriate data | Self-service reduces support load |
| How long to retain evidence? | 7 years minimum for financial | SOX/regulatory requirements |
| Real-time or batch reporting? | Batch for audits, real-time for alerts | Balance accuracy with responsiveness |
| Should reports be tenant-branded? | Yes for enterprise tier | White-label compliance reporting |
| How to handle report errors? | Fail-safe with human review | Compliance reports must be accurate |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Compliance patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `compliance-*`
- **Audit patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `audit-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant compliance reporting patterns {date}"
- Search: "automated evidence collection SaaS {date}"
- Search: "SOC 2 report generation automation {date}"

---

## Related Workflows

- `bmad-bam-compliance-design` - Design compliance architecture
- `bmad-bam-tenant-audit-log-design` - Configure audit logging
- `bmad-bam-tenant-aware-observability` - Monitor compliance metrics
