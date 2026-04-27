# BAM Compliance Patterns Guide

**When to load:** During compliance architecture design, audit preparation, regulatory requirement analysis, or when implementing compliance controls for multi-tenant SaaS platforms.

**Integrates with:** Winston (Architect), compliance-bam extension, Legal/Compliance teams.

---

## Core Concepts

### Compliance Framework Landscape

Multi-tenant SaaS platforms must navigate multiple compliance frameworks, often simultaneously for different tenants.

| Framework | Focus | Multi-Tenant Impact |
|-----------|-------|---------------------|
| SOC 2 | Security, availability, confidentiality | Platform-wide + tenant-specific controls |
| ISO 27001 | Information security management | Shared ISMS with tenant scoping |
| GDPR | EU data protection | Per-tenant data residency, consent |
| HIPAA | Healthcare data | BAA per tenant, PHI isolation |
| PCI DSS | Payment card data | Cardholder data isolation |
| SOX | Financial reporting | Audit trails, change controls |

### Shared vs Dedicated Compliance

| Aspect | Shared Model | Dedicated Model |
|--------|--------------|-----------------|
| Certification | Platform-wide SOC 2 | Per-tenant attestation |
| Audit Scope | Single audit covers all | Individual tenant audits |
| Cost | Amortized across tenants | Higher, tenant-specific |
| Use Case | SMB tenants | Enterprise, regulated |
| BAM Tier | Free, Pro | Enterprise |

### Control Implementation Categories

| Control Type | Description | Examples |
|--------------|-------------|----------|
| Technical | Automated enforcement | Encryption, access controls |
| Administrative | Policies and procedures | Security training, background checks |
| Physical | Facility security | Data center access, hardware disposal |

### Multi-Tenant Control Mapping

| Control Requirement | Platform Responsibility | Tenant Responsibility |
|--------------------|-------------------------|----------------------|
| Data encryption at rest | Implement and manage | Enable/configure |
| Access control | Provide RBAC framework | Configure roles |
| Audit logging | Capture and store | Review and respond |
| Incident response | Platform-level response | Tenant notification |
| Data retention | Provide policies | Set tenant preferences |

### Evidence Collection Automation

Compliance requires continuous evidence collection, not point-in-time audits.

| Evidence Type | Collection Method | Tenant Scoping |
|---------------|-------------------|----------------|
| Access logs | Automated from IdP | Per-tenant filtering |
| Config changes | Infrastructure as Code | Tenant-affecting changes |
| Security scans | Scheduled, per-tenant | Isolated scan results |
| Training records | LMS integration | Platform staff only |

---

## Application Guidelines

When implementing compliance in a multi-tenant context:

1. **Design for the most restrictive framework** - Build controls that satisfy HIPAA/PCI; easier to relax than tighten
2. **Automate evidence collection** - Manual evidence gathering doesn't scale across tenants
3. **Implement tenant-scoped audit trails** - Each tenant should access only their compliance data
4. **Enable self-service compliance reports** - Enterprise tenants need compliance dashboards
5. **Plan for data residency** - GDPR and data sovereignty require region-specific deployment options
6. **Separate platform audit from tenant audit** - Platform changes vs tenant-specific compliance

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Which frameworks should we certify against? | SOC 2 Type II as baseline, add HIPAA/PCI as market demands | SOC 2 is table stakes for B2B SaaS |
| How to handle tenant-specific compliance? | Tiered approach: shared SOC 2, dedicated for Enterprise | Balance cost with enterprise requirements |
| Where should compliance data be stored? | Same region as tenant data, with retention policies | Data residency requirements |
| How often should compliance be verified? | Continuous for technical controls, annual for certifications | Continuous compliance is the goal |
| How to handle compliance during offboarding? | Documented data deletion with certificate | Tenant needs proof of data removal |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Compliance patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `compliance-*`
- **Compliance frameworks:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant SaaS compliance architecture {date}"
- Search: "SOC 2 multi-tenant best practices {date}"
- Search: "automated compliance evidence collection {date}"

---

## Related Workflows

- `bmad-bam-compliance-design` - Design compliance architecture
- `bmad-bam-compliance-verification` - Verify compliance controls
- `bmad-bam-compliance-continuous-verification` - Continuous compliance monitoring
- `bmad-bam-audit-readiness-preparation` - Prepare for compliance audits
- `bmad-bam-data-protection` - Design data protection and residency controls
