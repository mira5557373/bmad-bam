# BAM SOX Compliance Patterns Guide

**When to load:** During SOX compliance design, financial controls implementation, audit trail setup, or when implementing Sarbanes-Oxley controls for multi-tenant SaaS platforms handling financial data.

**Integrates with:** Winston (Architect), Finance teams, Auditors, compliance-bam extension.

---

## Core Concepts

### SOX Requirements in Multi-Tenant Context

| SOX Section | Requirement | Multi-Tenant Consideration |
|-------------|-------------|---------------------------|
| Section 302 | CEO/CFO certification | Per-tenant financial accuracy |
| Section 404 | Internal controls | Controls across tenant boundaries |
| Section 409 | Real-time disclosure | Tenant-scoped event reporting |
| Section 802 | Record retention | 7-year retention per tenant |
| Section 906 | Criminal penalties | Strict access controls per tenant |

### Internal Control Categories

| Control Type | Examples | Multi-Tenant Implementation |
|--------------|----------|----------------------------|
| Preventive | Approval workflows, segregation of duties | Per-tenant role configurations |
| Detective | Anomaly detection, reconciliation | Cross-tenant pattern detection |
| Corrective | Audit findings remediation | Tenant-specific remediation plans |
| IT General Controls | Access management, change control | Platform-wide with tenant scoping |

### Segregation of Duties Matrix

```
┌─────────────────────────────────────────────────┐
│         Segregation of Duties (SoD)             │
│                                                  │
│  Function        │ Authorize │ Record │ Custody │
│  ────────────────┼───────────┼────────┼─────────│
│  Transactions    │    R1     │   R2   │   R3    │
│  Reconciliation  │    R4     │   R5   │   R3    │
│  Administration  │    R6     │   R7   │   R8    │
│                                                  │
│  Rule: Same role cannot span columns            │
│  Per-tenant enforcement with platform audit     │
└─────────────────────────────────────────────────┘
```

### Audit Trail Requirements

| Element | Description | Retention |
|---------|-------------|-----------|
| User Actions | Who did what, when | 7 years |
| System Changes | Configuration modifications | 7 years |
| Data Modifications | Before/after values | 7 years |
| Access Attempts | Successful and failed logins | 7 years |
| Approval Workflows | Approval chains and decisions | 7 years |

### Financial Data Integrity Controls

| Control | Description | Multi-Tenant Scope |
|---------|-------------|-------------------|
| Input Validation | Verify data accuracy at entry | Per-tenant validation rules |
| Processing Controls | Ensure accurate calculations | Tenant-isolated processing |
| Output Controls | Verify report accuracy | Tenant-scoped reports |
| Data Reconciliation | Cross-system verification | Per-tenant reconciliation |

### Change Management for SOX

| Change Type | Approval Required | Documentation |
|-------------|-------------------|---------------|
| Emergency | Post-hoc approval | Full audit trail |
| Standard | Pre-approval | Change request |
| Tenant Config | Tenant admin | Audit log entry |
| Platform | Change board | Full RFC process |

---

## Application Guidelines

When implementing SOX in a multi-tenant context:

1. **Enforce segregation of duties per tenant** - Prevent single-user control over financial processes
2. **Implement immutable audit trails** - 7-year retention with tamper-evident storage
3. **Automate control testing** - Continuous control monitoring across tenants
4. **Scope access reviews to tenants** - Quarterly access reviews per tenant
5. **Document control inheritance** - Clear mapping of platform vs tenant controls
6. **Enable auditor access** - Read-only auditor role with tenant scoping

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Platform controls vs tenant controls? | Platform provides, tenant configures | Shared responsibility model |
| How to handle cross-tenant transactions? | Explicit approval + full audit | Prevent fraud across boundaries |
| Auditor access scope? | Per-tenant with NDA | Audit efficiency with privacy |
| Control testing frequency? | Continuous + quarterly formal | Balance efficiency with compliance |
| How to handle SOX for free tier? | Basic controls, upgrade for full compliance | Tier-appropriate control depth |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Compliance patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `compliance-*`
- **Compliance frameworks:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` → filter: SOX

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "SOX compliance multi-tenant SaaS {date}"
- Search: "IT general controls SaaS platforms {date}"
- Search: "SOX 404 automation best practices {date}"

---

## Related Workflows

- `bmad-bam-compliance-design` - Design SOX compliance architecture
- `bmad-bam-tenant-audit-log-design` - Configure SOX-compliant audit trails
- `bmad-bam-rbac-abac-design` - Design segregation of duties
