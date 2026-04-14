# Tenant Offboarding Patterns

**When to load:** When implementing GDPR data deletion requirements, tenant offboarding procedures, or data retention compliance for multi-tenant SaaS

**Integrates with:** Architect (Atlas persona), Security agent, Dev agent

---

## Core Concepts

### Data Portability Requirements

Data portability allows tenants to receive their data in machine-readable formats before departure. GDPR Article 20 establishes this as a data subject right that extends to tenant organizations.

| Export Format | Use Case | Includes |
|---------------|----------|----------|
| JSON | API integration, data migration | Structured data, metadata, relationships |
| CSV | Spreadsheet analysis, simple import | Tabular data, denormalized views |
| Native backup | Platform migration, disaster recovery | Complete data state, configurations |

### Cascading Data Deletion

Complete tenant data deletion must cascade across all storage systems including backups, replicas, logs, and derived data. Verification ensures no tenant data persists after offboarding.

- **Primary storage**: Database records, file storage, object storage
- **Replicas and caches**: Read replicas, CDN caches, search indices
- **Backups**: Point-in-time backups, disaster recovery copies
- **Logs and analytics**: Application logs, audit trails (after retention)
- **AI artifacts**: Vector embeddings, model training data, conversation memories

### Retention Holds and Compliance

Legal, regulatory, or contractual obligations may require retaining certain data beyond standard deletion timelines. Hold management prevents premature deletion while tracking hold expiration.

| Hold Type | Triggered By | Duration | Data Scope |
|-----------|--------------|----------|------------|
| Legal/Litigation | Legal counsel | Until case resolution | Relevant custodians |
| Regulatory | Audit notice | Audit completion + buffer | Compliance records |
| Contractual | Agreement terms | Per contract specification | Specified data types |
| Tax/Financial | Fiscal period | 7+ years typically | Financial records |

## Overview

Tenant offboarding patterns establish systematic approaches to tenant departure from multi-tenant SaaS platforms while ensuring compliance with data protection regulations. These patterns address data export (portability), data retention, secure deletion, and audit requirements that apply when tenants leave the platform.

## Compliance Requirements

- **Data Portability**: Ability to export tenant data in portable formats (GDPR Art. 20)
- **Right to Erasure**: Complete deletion of tenant data upon request (GDPR Art. 17)
- **Retention Compliance**: Maintaining required data for legal/regulatory obligations before deletion
- **Deletion Verification**: Verified and documented data deletion across all storage systems
- **Audit Trail**: Records of offboarding activities and data deletion

## Implementation Patterns

| Pattern | Description | Frameworks |
|---------|-------------|------------|
| Data Export Pipeline | Automated generation of portable data exports (JSON, CSV) | GDPR |
| Retention Hold Management | Legal/compliance holds preventing premature deletion | SOX, HIPAA, Legal |
| Cascading Data Deletion | Systematic deletion across all data stores including backups | GDPR, All frameworks |
| Deletion Verification | Cryptographic or audit verification of complete data removal | GDPR |
| Offboarding Workflow | Automated workflow managing the complete offboarding process | Multi-tenant |
| Post-Deletion Audit | Documentation and evidence of completed offboarding | GDPR, SOC2 |

## Validation Checklist

- [ ] Data export includes all tenant data in portable format
- [ ] Retention requirements are checked before deletion
- [ ] Data deletion covers all storage locations (primary, backup, logs)
- [ ] Deletion is verified and documented
- [ ] AI/ML model training data considerations are addressed
- [ ] Third-party data sharing is terminated
- [ ] Access credentials are revoked
- [ ] Offboarding audit trail is complete

## Application Guidelines

When implementing tenant offboarding:

1. **Design offboarding workflow**: Create systematic process for tenant departure including approvals
2. **Implement data export**: Provide machine-readable export formats (JSON, CSV) for data portability
3. **Check retention holds**: Verify no legal or compliance holds prevent data deletion
4. **Execute cascading deletion**: Remove data from all storage systems including backups and replicas
5. **Verify and document**: Confirm deletion completion and maintain audit records

When offboarding in multi-tenant platforms:

1. **Handle cross-tenant references**: Ensure no dangling references remain after tenant deletion
2. **Delete AI artifacts**: Remove tenant-specific model training data, memories, and embeddings
3. **Revoke all access**: Terminate SSO connections, API keys, and service accounts
4. **Support compliance timelines**: Meet GDPR 30-day, CCPA, and other regulatory deletion deadlines

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Tenant patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `tenant-*`
- **Compliance patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "GDPR right to erasure SaaS implementation {date}"
- Search: "tenant offboarding data deletion patterns {date}"
- Search: "data portability multi-tenant {date}"

---

## Related Workflows

- `bmad-bam-tenant-offboarding-design` - Design complete tenant departure workflow
- `bmad-bam-security-review` - Verify data deletion meets compliance requirements
- `bmad-bam-tenant-onboarding-design` - Understand lifecycle from onboarding to offboarding

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| How do you meet GDPR 30-day deletion deadline? | Implement automated offboarding workflow with deletion verification | GDPR requires complete data erasure within 30 days of valid request |
| What about data in backups? | Design backup rotation to ensure tenant data ages out within retention period | Backups must also be addressed; cryptographic erasure via key deletion is most practical |
| Do you have legal hold requirements? | Implement hold flags that pause deletion workflow until cleared | SOX, litigation, and regulatory holds override deletion requests |
| How do you handle AI/ML artifacts? | Include vector embeddings, model training data, and memories in deletion scope | GDPR right to erasure extends to derived data including AI artifacts |
| Should tenants receive data export before deletion? | Provide automated export in portable format (JSON/CSV) before deletion | GDPR data portability requires providing tenant data in machine-readable format |

---

## References

- `tenant-lifecycle` - Complete tenant lifecycle from bam-patterns.csv
- `compliance` - General compliance pattern from bam-patterns.csv
- `data-sovereignty-patterns` - Data location considerations for deletion
- `audit-logging-patterns` - Offboarding event logging
- `encryption-patterns` - Key deletion for cryptographic erasure
