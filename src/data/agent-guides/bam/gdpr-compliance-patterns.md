# BAM GDPR Compliance Patterns Guide

**When to load:** During GDPR compliance design, data subject rights implementation, consent management, or when implementing privacy controls for multi-tenant SaaS platforms serving EU users.

**Integrates with:** Winston (Architect), Legal teams, DPO, compliance-bam extension.

---

## Core Concepts

### GDPR Principles in Multi-Tenant Context

| Principle | Single-Tenant | Multi-Tenant Consideration |
|-----------|---------------|---------------------------|
| Lawfulness | Per-application consent | Per-tenant consent policies |
| Purpose Limitation | Application-wide | Tenant-specific purposes |
| Data Minimization | One set of rules | Per-tenant data retention |
| Storage Limitation | Global retention | Tenant + platform retention |
| Integrity/Confidentiality | Application security | Tenant isolation required |
| Accountability | One controller | Processor + controller relationships |

### Data Subject Rights Implementation

| Right | Description | Multi-Tenant Implementation |
|-------|-------------|----------------------------|
| Access (Art. 15) | Export personal data | Per-tenant data export scoped to user |
| Rectification (Art. 16) | Correct data | Tenant-scoped edit with audit log |
| Erasure (Art. 17) | Delete data | Cascade delete with tenant boundary |
| Portability (Art. 20) | Machine-readable export | Standardized export per tenant |
| Restriction (Art. 18) | Limit processing | Per-tenant processing flags |
| Objection (Art. 21) | Stop processing | Tenant-scoped opt-out mechanisms |

### Consent Management Architecture

```
┌─────────────────────────────────────────────────┐
│           Consent Management Service            │
│                                                  │
│  ┌──────────────┐  ┌──────────────┐            │
│  │   Tenant A   │  │   Tenant B   │            │
│  │   Consent    │  │   Consent    │            │
│  │   Policies   │  │   Policies   │            │
│  └──────┬───────┘  └──────┬───────┘            │
│         │                 │                     │
│         └────────┬────────┘                     │
│                  │                              │
│         ┌───────▼────────┐                     │
│         │ Consent Store  │                     │
│         │ (Audit Trail)  │                     │
│         └───────┬────────┘                     │
│                 │                              │
│         ┌───────▼────────┐                     │
│         │  Processing    │                     │
│         │  Enforcement   │                     │
│         └────────────────┘                     │
└─────────────────────────────────────────────────┘
```

### Data Processing Records (ROPA)

| Record Field | Platform Level | Tenant Level |
|--------------|----------------|--------------|
| Controller | Platform operator | Tenant organization |
| Processor | Platform operator | Platform + sub-processors |
| Categories | All data types | Tenant-specific subset |
| Recipients | All integrations | Tenant-enabled integrations |
| Transfers | All regions | Tenant data residency |
| Retention | Platform policy | Tenant + platform policy |

### Cross-Border Data Transfer

| Mechanism | Description | Multi-Tenant Use |
|-----------|-------------|------------------|
| Adequacy Decision | EU-approved countries | Default for approved regions |
| SCCs | Standard contractual clauses | Per-tenant agreements |
| BCRs | Binding corporate rules | Enterprise tier requirement |
| Data Residency | Keep data in-region | Tier-based regional isolation |

### Breach Notification Timeline

| Event | Action | Deadline |
|-------|--------|----------|
| Breach Detected | Incident response | Immediate |
| Risk Assessment | Determine severity | < 24 hours |
| DPA Notification | Notify regulator (if required) | 72 hours |
| Data Subject Notification | Notify affected users | Without undue delay |
| Tenant Notification | Notify affected tenants | Per DPA agreement |

---

## Application Guidelines

When implementing GDPR in a multi-tenant context:

1. **Implement tenant-scoped data subject requests** - DSR must only affect requesting tenant's data
2. **Separate consent per tenant** - Each tenant may have different consent requirements
3. **Enable data residency options** - Enterprise tenants may require EU-only data storage
4. **Automate ROPA generation** - Manual records don't scale with tenant count
5. **Design for cascade deletion** - Erasure must propagate across all tenant data stores
6. **Maintain processing agreements** - DPA per tenant with platform as processor

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Platform as controller or processor? | Processor for tenant data, controller for platform data | Clear legal responsibility |
| Consent per tenant or platform-wide? | Per-tenant with platform baseline | Tenants control their consent policies |
| Where to store EU tenant data? | EU region with residency option | GDPR compliance + customer trust |
| How to handle DSR across backups? | Mark for deletion, exclude from restore | Balance erasure with data integrity |
| Should AI training use tenant data? | Explicit opt-in only | Lawful basis requirement |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Privacy patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `privacy-*`
- **Compliance frameworks:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` → filter: GDPR

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "GDPR multi-tenant SaaS compliance {date}"
- Search: "data subject rights automation {date}"
- Search: "GDPR consent management patterns {date}"

---

## Related Workflows

- `bmad-bam-compliance-design` - Design GDPR compliance architecture
- `bmad-bam-data-protection` - Implement data protection and residency
- `bmad-bam-tenant-offboarding-design` - GDPR-compliant tenant data deletion
