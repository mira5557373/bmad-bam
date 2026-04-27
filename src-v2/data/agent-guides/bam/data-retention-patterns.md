# Data Retention Patterns

**When to load:** When designing data retention policies, implementing data lifecycle management, or when user mentions data retention, data archival, data deletion, or data lifecycle in multi-tenant SaaS.

**Integrates with:** Security agent, Architect (Atlas persona), DevOps agent, Analyst agent

---

## Core Concepts

### What is Data Retention?

Data retention encompasses policies and mechanisms for how long data is kept, when it is archived, and when it is permanently deleted. In multi-tenant SaaS, retention must balance regulatory requirements, tenant preferences, cost optimization, and the right to erasure.

### Data Lifecycle Stages

```
Active Data (hot storage)
        │
        ▼ (retention threshold)
Archive Data (cold storage)
        │
        ▼ (archive retention threshold)
Deletion Queue (pending deletion)
        │
        ▼ (deletion confirmation)
Permanent Deletion (cryptographic erasure)
        │
        ▼
Deletion Certificate (audit trail)
```

### Retention Policy Components

| Component | Description | Example |
|-----------|-------------|---------|
| Retention period | How long to keep active | 1 year |
| Archive period | How long in cold storage | 6 years |
| Legal hold | Suspend deletion | Litigation hold |
| Minimum retention | Regulatory minimum | HIPAA: 6 years |
| Maximum retention | Data minimization limit | GDPR: purpose-based |

---

## Key Patterns

### Pattern 1: Retention Policy Matrix

| Data Category | Active Retention | Archive Retention | Total | Regulatory Driver |
|---------------|------------------|-------------------|-------|-------------------|
| User activity logs | 90 days | 1 year | 15 months | SOC 2 |
| Transaction records | 1 year | 6 years | 7 years | PCI DSS |
| Health records | 2 years | 4 years | 6 years | HIPAA |
| Personal data | Purpose-based | N/A | Varies | GDPR |
| Audit trails | 1 year | 6 years | 7 years | Multiple |

### Pattern 2: Tenant Retention Profile

| Field | Description | Example |
|-------|-------------|---------|
| tenant_id | Tenant identifier | `tenant_xyz` |
| base_policy | Platform default | `standard` |
| regulatory_requirements | Applicable regulations | `["GDPR", "HIPAA"]` |
| custom_retention | Tenant overrides | `{"audit_logs": "3_years"}` |
| legal_holds | Active holds | `["hold_litigation_2026"]` |
| deletion_schedule | Scheduled deletions | `weekly` |

### Pattern 3: Multi-Tenant Retention Isolation

| Aspect | Implementation | Verification |
|--------|----------------|--------------|
| Policy isolation | Per-tenant retention configs | Config audit |
| Deletion isolation | Tenant-scoped deletion jobs | Job logs |
| Archive isolation | Tenant-partitioned archives | Access control |
| Hold isolation | Per-tenant legal holds | Hold registry |

---

## Application Guidelines

- Designing compliant data retention frameworks
- Implementing automated data lifecycle management
- Building tenant-configurable retention policies
- Creating deletion certification workflows
- Supporting right to erasure (GDPR Article 17)
- Managing legal holds and litigation preservation

---

## Multi-Tenant Considerations

### Per-Tier Retention Features

| Tier | Custom Policies | Archive Access | Deletion Certificates | Legal Hold |
|------|-----------------|----------------|----------------------|------------|
| Free | No | No | No | Platform only |
| Pro | Limited | Export on request | Summary only | Platform managed |
| Enterprise | Full custom | API access | Detailed certificates | Self-service |

### Retention Inheritance Rules

| Scenario | Behavior | Rationale |
|----------|----------|-----------|
| Regulation requires longer | Extend retention | Compliance requirement |
| Tenant requests shorter | Cannot reduce below regulatory minimum | Legal compliance |
| Tenant requests longer | Allow up to maximum limit | Tenant autonomy |
| Legal hold active | Suspend all deletion | Litigation preservation |

### Deletion Types

| Type | Use Case | Multi-Tenant Consideration |
|------|----------|---------------------------|
| Soft delete | Recoverable deletion | Tenant-visible vs hidden |
| Hard delete | Permanent removal | Backup handling |
| Cryptographic erasure | Key destruction | Per-tenant encryption keys |
| Cascade delete | Related data cleanup | Cross-tenant data check |

---

## Tenant Offboarding Retention

| Phase | Duration | Data State | Tenant Access |
|-------|----------|------------|---------------|
| Grace period | 30 days | Active, read-only | Yes |
| Archive period | 90 days | Archived | Export only |
| Deletion queue | 30 days | Pending deletion | None |
| Post-deletion | N/A | Deleted | Deletion certificate |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Should tenants control their retention periods? | Yes, within regulatory bounds, for Enterprise tier | Balances tenant needs with compliance |
| How to handle retention period conflicts? | Longest applicable period wins | Ensures no premature deletion |
| What triggers data archival? | Time-based + access frequency | Optimizes storage costs |
| How to verify deletion? | Cryptographic deletion certificates | Provides auditable proof |
| Should backups follow retention? | Yes, backup retention must align with data retention | Prevents data resurrection |
| How to handle legal holds? | Immediate suspension of deletion, isolated hold storage | Litigation protection |

---

## Related Workflows

- `bmad-bam-data-retention-policy-design` - Design data archival workflows
- `bmad-bam-tenant-offboarding-design` - Implement tenant data deletion
- `bmad-bam-compliance-design` - Align retention with compliance
- `bmad-bam-tenant-data-export` - Integrate retention into governance

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Data governance patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `data-governance`, `lifecycle`
- **Compliance patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "data retention policy SaaS best practices {date}"
- Search: "GDPR data retention multi-tenant {date}"
- Search: "automated data lifecycle management patterns {date}"
