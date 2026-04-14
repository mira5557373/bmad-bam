# BAM PII Handling Patterns Guide

**When to load:** During Phase 3 (Solutioning) when designing data privacy controls,
or when user mentions PII, personal data, GDPR, data masking, anonymization, pseudonymization, privacy.

**Integrates with:** Architect (Atlas persona), Security agent, Dev agent, Compliance workflows

---

## Core Concepts

### PII Classification

Personal Identifiable Information (PII) requires special handling in multi-tenant systems. Classification determines protection level.

| Category | Examples | Protection Level |
|----------|----------|------------------|
| Direct identifiers | SSN, passport, driver license | Critical |
| Contact info | Email, phone, address | High |
| Financial | Credit card, bank account | Critical |
| Health | Medical records, conditions | Critical (PHI) |
| Behavioral | IP address, device ID, location | Medium |
| Preferences | Settings, choices | Low |

### Multi-Tenant PII Isolation

In multi-tenant systems, PII must be isolated at multiple layers:

| Layer | Isolation Method | Verification |
|-------|------------------|--------------|
| Database | RLS policies on PII tables | Cross-tenant query test |
| Application | Tenant context in all PII access | Context validation |
| Logs | PII redaction before logging | Log audit |
| Analytics | Aggregation + k-anonymity | Re-identification test |
| Backups | Per-tenant encryption keys | Key isolation audit |

### PII Lifecycle States

| State | Description | Access Control |
|-------|-------------|----------------|
| Active | In use for business operations | Role-based access |
| Archived | Retained for compliance | Restricted access |
| Pseudonymized | Identifiers replaced | Analytics access |
| Anonymized | Irreversibly de-identified | Unrestricted |
| Deleted | Cryptographically erased | None |

## Application Guidelines

When implementing PII handling in multi-tenant systems:

1. **Classify all data fields**: Tag each field with PII category during schema design
2. **Apply encryption at rest and in transit**: Use tenant-specific keys for sensitive PII
3. **Implement field-level access control**: Not all users need access to all PII fields
4. **Design for data subject rights**: Support access, rectification, portability, erasure
5. **Log PII access, not PII content**: Audit who accessed what, never log actual values

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| Storing SSN or government IDs | Encrypt with tenant-specific keys, mask in UI | Highest risk PII requires strongest protection |
| Email for authentication | Hash for lookup, encrypt for display | Balance security with functionality |
| Analytics on user behavior | Pseudonymize before aggregation | Enable insights without exposing individuals |
| GDPR data export request | Automated export with PII inventory | Compliance within 30-day deadline |
| Right to erasure request | Cryptographic deletion + verification | Prove deletion for compliance |
| Cross-tenant PII sharing | Never share directly, use consent-based federation | Maintain tenant boundary integrity |

## Implementation Patterns

### Pattern 1: PII Detection Pipeline

| Stage | Action | Output |
|-------|--------|--------|
| Ingestion | Scan incoming data for PII patterns | Classification tags |
| Validation | Verify PII format (email, phone, SSN) | Validation status |
| Classification | Apply data category label | Sensitivity level |
| Routing | Direct to appropriate storage tier | Storage location |
| Encryption | Apply field-level encryption | Encrypted value |

### Pattern 2: Data Masking Strategies

| Strategy | Use Case | Example |
|----------|----------|---------|
| Full mask | Display to unauthorized users | `***-**-****` |
| Partial mask | Support troubleshooting | `***-**-1234` |
| Tokenization | Cross-system references | `tok_abc123xyz` |
| Pseudonymization | Analytics workloads | `user_hash_7f3a` |
| Redaction | Logs and exports | `[REDACTED]` |

### Pattern 3: Right to Erasure Implementation

| Step | Action | Verification |
|------|--------|--------------|
| 1 | Identify all PII locations | Data inventory check |
| 2 | Validate erasure eligibility | Legal hold check |
| 3 | Execute soft delete | Mark records deleted |
| 4 | Propagate to backups | Backup systems notified |
| 5 | Execute hard delete | Physical removal |
| 6 | Generate compliance proof | Erasure certificate |

## Multi-Tenant PII Considerations

### Tenant-Specific PII Requirements

| Tenant Type | PII Requirements | Implementation |
|-------------|------------------|----------------|
| Standard | Platform-default classification | Shared policies |
| Healthcare (HIPAA) | PHI protection rules | Enhanced encryption |
| Financial (PCI) | Cardholder data scope | Dedicated storage |
| EU (GDPR) | Data residency + consent | Regional storage |
| Enterprise | Custom classification | Configurable policies |

### PII Access Control Matrix

| Role | Direct PII | Masked PII | Aggregated |
|------|------------|------------|------------|
| TenantAdmin | Full access | Full access | Full access |
| Support (tenant) | Read-only | Read-only | Full access |
| Support (platform) | None | Partial mask | Full access |
| Analytics | None | None | Full access |
| Auditor | Read-only | Read-only | Full access |

## Compliance Mapping

| Regulation | Requirement | Implementation |
|------------|-------------|----------------|
| GDPR Art. 15 | Right of access | PII export API |
| GDPR Art. 17 | Right to erasure | Deletion workflow |
| GDPR Art. 20 | Data portability | Standard format export |
| HIPAA | PHI minimum necessary | Field-level access control |
| CCPA | Disclosure of collection | Privacy notice + consent |
| SOC2 | Access logging | Audit trail on PII access |

## Related Workflows

- `bmad-bam-tenant-offboarding-design` - PII deletion during tenant deletion
- `bmad-bam-compliance-design` - Comprehensive compliance controls
- `bmad-bam-security-review` - PII protection verification

## Related Patterns

Load decision criteria from pattern registry:
- **Patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `security`, `compliance`
- **Compliance:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` → GDPR, HIPAA, CCPA

### Web Research

Use `web_queries` from pattern registry:
- Search: "PII detection classification patterns {date}"
- Search: "GDPR data subject rights implementation {date}"
- Search: "multi-tenant PII isolation best practices {date}"
