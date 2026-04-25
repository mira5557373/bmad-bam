# BAM Data Patterns Guide

**When to load:** During Phase 3 (Solutioning) when designing data storage, PII handling, retention, or data residency. Load when user mentions data patterns, PII, data classification, data residency, file storage, search indexing, data pipeline, data masking, data archival, data integrity, data sovereignty.

**Integrates with:** Architect (Atlas persona), Data Engineer roles, Security agents, Compliance workflows

---

## Core Concepts

### Data Domains in Multi-Tenant SaaS

| Domain | Description | Key Concern |
|--------|-------------|-------------|
| Classification | Categorizing data by sensitivity | Appropriate handling controls |
| PII Handling | Personal data protection | Privacy compliance |
| Storage | File and object storage | Tenant isolation |
| Pipelines | ETL/streaming processing | Tenant-aware processing |
| Residency | Geographic constraints | Regulatory compliance |
| Retention | Lifecycle management | Data minimization |
| Masking | Data obfuscation | Privacy preservation |
| Integrity | Data accuracy and consistency | Trust and reliability |

### Multi-Tenant Data Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  Data Governance Layer                   │
│  - Classification policies  - Retention policies        │
│  - Residency rules         - Masking rules              │
└─────────────────────────────────────────────────────────┘
                           │
┌─────────────────────────────────────────────────────────┐
│                  Tenant Isolation Layer                  │
│  - RLS policies  - Schema separation  - Storage prefix  │
└─────────────────────────────────────────────────────────┘
                           │
┌─────────────────────────────────────────────────────────┐
│                   Data Storage Layer                     │
│  - Databases  - Object storage  - Search indices        │
└─────────────────────────────────────────────────────────┘
```

### Data Lifecycle States

| State | Description | Access Control |
|-------|-------------|----------------|
| Active | In use for operations | Role-based access |
| Archived | Retained for compliance | Restricted access |
| Pseudonymized | Identifiers replaced | Analytics access |
| Anonymized | Irreversibly de-identified | Unrestricted |
| Deleted | Cryptographically erased | None |

---

## BAM Conventions

> **CRITICAL:** These conventions are BAM-specific and must be followed for all data operations.

### File Path Format

All tenant-scoped file storage MUST follow this pattern:

```
tenants/{tenant_id}/{category}/{filename}
```

**Examples:**
- `tenants/tenant_abc123/documents/report.pdf`
- `tenants/tenant_xyz789/images/logo.png`
- `tenants/tenant_def456/exports/data-2026-04.csv`

### Data Classification Levels

| Level | Description | Security Controls | Tenant Override |
|-------|-------------|-------------------|-----------------|
| Public | No restrictions | Basic integrity | No |
| Internal | Organization access | Authentication required | No |
| Confidential | Need-to-know basis | Encryption + access logging | Upgrade only |
| Restricted | Highly sensitive (PII, PHI) | Encryption + DLP + approval | Upgrade only |

### Tenant Data Ownership

| Data Type | Ownership | Pipeline Handling |
|-----------|-----------|-------------------|
| Tenant-generated | Tenant | Full isolation |
| Platform-generated | Platform | Aggregation allowed |
| Derived/enriched | Source-inherited | Inherit source isolation |

---

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| Storing PII | Classify as Restricted, encrypt with tenant keys | Highest risk requires strongest protection |
| Cross-tenant analytics | Anonymize/aggregate before processing | Protect individual tenant data |
| File storage strategy | Prefix-based for most; bucket-per-tenant for compliance | Balance simplicity vs isolation |
| Search indexing | Shared index with tenant filter; per-tenant for compliance | Simpler ops vs stronger isolation |
| Data pipeline design | Tenant-partitioned processing | Maintain isolation in ETL/streaming |
| Retention policies | Enterprise: tenant-configurable; other tiers: platform default | Balance autonomy with compliance |
| Data residency | Pin tenant data at signup, separate control from data plane | Compliance from day one |

---

## §data-classification

### Pattern: Data Classification

Data classification categorizes data based on sensitivity, regulatory requirements, and business value. In multi-tenant SaaS, classification must account for tenant-specific requirements while maintaining platform-wide consistency for security controls.

### Classification Dimensions

| Dimension | Description | Example Values |
|-----------|-------------|----------------|
| Sensitivity | Data confidentiality level | Public, Internal, Confidential, Restricted |
| Regulatory | Applicable regulations | GDPR, HIPAA, PCI, None |
| Retention | How long to keep | 30 days, 1 year, 7 years, Indefinite |
| Residency | Where data can be stored | US, EU, Any, Tenant-specified |
| Processing | How data can be used | Analytics, ML Training, Operations Only |

### Classification Hierarchy

```
Platform Classification (baseline)
        │
        ▼
Tenant Classification Profile (overrides/additions)
        │
        ▼
Data Type Classification (per entity/field)
        │
        ▼
Instance Classification (runtime determination)
```

### Automatic Classification Rules

| Rule Type | Implementation | Multi-Tenant Consideration |
|-----------|----------------|---------------------------|
| Pattern matching | Regex for PII (SSN, email) | Platform-wide + tenant custom |
| ML-based | NLP classification models | Tenant-isolated training data |
| Schema-based | Field metadata | Tenant schema extensions |
| Content inspection | DLP scanning | Tenant data isolation |

---

## §pii-handling

### Pattern: PII Handling

Personal Identifiable Information (PII) requires special handling with classification determining protection level.

### PII Categories

| Category | Examples | Protection Level |
|----------|----------|------------------|
| Direct identifiers | SSN, passport, driver license | Critical |
| Contact info | Email, phone, address | High |
| Financial | Credit card, bank account | Critical |
| Health | Medical records, conditions | Critical (PHI) |
| Behavioral | IP address, device ID, location | Medium |

### Multi-Tenant PII Isolation

| Layer | Isolation Method | Verification |
|-------|------------------|--------------|
| Database | RLS policies on PII tables | Cross-tenant query test |
| Application | Tenant context in all PII access | Context validation |
| Logs | PII redaction before logging | Log audit |
| Analytics | Aggregation + k-anonymity | Re-identification test |
| Backups | Per-tenant encryption keys | Key isolation audit |

### Data Masking Strategies

| Strategy | Use Case | Example |
|----------|----------|---------|
| Full mask | Unauthorized users | `***-**-****` |
| Partial mask | Support troubleshooting | `***-**-1234` |
| Tokenization | Cross-system references | `tok_abc123xyz` |
| Pseudonymization | Analytics workloads | `user_hash_7f3a` |
| Redaction | Logs and exports | `[REDACTED]` |

### PII Access Control Matrix

| Role | Direct PII | Masked PII | Aggregated |
|------|------------|------------|------------|
| TenantAdmin | Full access | Full access | Full access |
| Support (tenant) | Read-only | Read-only | Full access |
| Support (platform) | None | Partial mask | Full access |
| Analytics | None | None | Full access |

### Compliance Mapping

| Regulation | Requirement | Implementation |
|------------|-------------|----------------|
| GDPR Art. 15 | Right of access | PII export API |
| GDPR Art. 17 | Right to erasure | Deletion workflow |
| GDPR Art. 20 | Data portability | Standard format export |
| HIPAA | PHI minimum necessary | Field-level access control |
| SOC2 | Access logging | Audit trail on PII access |

---

## §data-storage

### Pattern: File Storage

Tenant-scoped file storage ensures isolation through proper access controls and storage organization.

### Storage Strategy Comparison

| Strategy | Isolation | Complexity | Use Case |
|----------|-----------|------------|----------|
| Prefix-based | Logical | Low | Most SaaS |
| Bucket-per-tenant | Physical | Medium | Compliance |
| Account-per-tenant | Complete | High | Enterprise |

### File Metadata Structure

| Field | Required | Description |
|-------|----------|-------------|
| file_id | Yes | Unique identifier |
| tenant_id | Yes | Tenant context |
| storage_key | Yes | Storage location (BAM path format) |
| filename | Yes | Original name |
| content_type | Yes | MIME type |
| size_bytes | Yes | File size |
| checksum | Yes | Integrity hash |

### Pattern: Search Indexing

Tenant search indexing enables full-text search while maintaining strict data isolation.

### Indexing Strategy Comparison

| Strategy | Isolation | Complexity | Use Case |
|----------|-----------|------------|----------|
| Shared Index | Logical (filter) | Low | Most SaaS |
| Index-Per-Tenant | Physical | Medium | Compliance |
| Cluster-Per-Tenant | Complete | High | Enterprise |

### Indexing Requirements

- Every document MUST include `tenant_id` field (indexed)
- All queries MUST include mandatory tenant filter
- Cross-tenant search isolation MUST be verified via testing

### Per-Tier Storage and Search Configuration

| Tier | Storage Quota | Upload Limit | Max Documents | Custom Analyzers |
|------|---------------|--------------|---------------|------------------|
| Free | 1 GB | 10 MB | 10,000 | No |
| Pro | 100 GB | 100 MB | 1,000,000 | Limited |
| Enterprise | 1 TB+ | 1 GB | Unlimited | Yes |

---

## §data-pipeline

### Pattern: Data Pipeline

Data pipelines must handle tenant isolation while enabling efficient processing.

### Pipeline Architecture Types

| Type | Latency | Use Case | Tenant Isolation |
|------|---------|----------|------------------|
| Batch ETL | Hours | Reports, aggregations | Job-level isolation |
| Micro-batch | Minutes | Near-real-time analytics | Partition-level isolation |
| Streaming | Seconds | Real-time events | Topic/partition isolation |
| CDC | Subsecond | Database sync | Row-level isolation |

### Tenant-Partitioned ETL Stages

| Stage | Implementation | Tenant Isolation |
|-------|----------------|------------------|
| Extract | Query with tenant_id filter | Source-level isolation |
| Stage | Per-tenant directories | Storage isolation |
| Transform | Tenant-specific configs | Logic isolation |
| Load | Per-tenant tables or RLS | Destination isolation |
| Audit | Per-tenant lineage | Audit isolation |

### Pipeline Failure Handling

| Failure Scope | Response | Impact Containment |
|---------------|----------|-------------------|
| Single record | Dead letter queue | Tenant-specific DLQ |
| Batch failure | Retry with backoff | Per-tenant retry |
| Source failure | Pause tenant pipeline | Other tenants continue |

### Per-Tenant Quality Gates

| Gate | Check | Action on Failure |
|------|-------|-------------------|
| Schema validation | Match expected schema | Reject batch |
| Completeness | Required fields present | Flag records |
| Consistency | Cross-field validation | Flag records |
| Freshness | Data not stale | Alert on delay |
| Volume | Within expected range | Alert on anomaly |

### Resource Quota Management

| Resource | Quota Type | Enforcement |
|----------|------------|-------------|
| Compute slots | Per-tenant limit | Scheduler-enforced |
| Memory | Per-job limit | OOM protection |
| Storage staging | Per-tenant quota | Write rejection |
| Throughput | Records/second | Rate limiting |

---

## §data-residency

### Pattern: Data Residency

Data residency governs where tenant data is physically stored and processed for regulatory compliance.

### Compliance Framework Matrix

| Regulation | Region | Requirement |
|------------|--------|-------------|
| GDPR | EU/EEA | Data protection, transfer rules |
| LGPD | Brazil | Local processing preferred |
| PIPL | China | Strict localization |
| BDSG | Germany | Stricter than GDPR, local DPO |
| DPDP | India | Consent-based, cross-border rules |

### Region Pinning Rules

| Data Type | Pinning | Storage |
|-----------|---------|---------|
| Tenant PII | Required | Regional DB only |
| Usage logs | Required | Regional storage |
| Aggregated metrics | Optional | Global allowed |
| Backups | Required | Same region |

### Cross-Border Transfer Mechanisms

| Mechanism | Use Case | Compliance Basis |
|-----------|----------|------------------|
| SCCs | EU to adequate country | Standard Contractual Clauses |
| BCRs | Intra-company transfer | Binding Corporate Rules |
| Consent | User-initiated | Explicit user consent |
| Anonymization | Analytics | No PII transferred |

### Per-Tier Data Residency

| Tier | Region Options | Data Export | Compliance Cert |
|------|----------------|-------------|-----------------|
| Free | Platform default | Self-service | N/A |
| Pro | 3 regions | API access | SOC 2 |
| Enterprise | Any region | Full control | SOC 2, ISO 27001 |

### Localization Enforcement Layers

| Layer | Enforcement | Implementation |
|-------|-------------|----------------|
| DNS | GeoDNS routing | Route53/CloudFlare |
| API | Region validation | Middleware |
| Database | Connection routing | Regional strings |
| Storage | Bucket location | Region-locked |

---

## §data-retention

### Pattern: Data Retention

Data retention policies govern how long data is kept, when it is archived, and when permanently deleted.

### Retention Policy Matrix

| Data Category | Active | Archive | Total | Regulatory Driver |
|---------------|--------|---------|-------|-------------------|
| User activity logs | 90 days | 1 year | 15 months | SOC 2 |
| Transaction records | 1 year | 6 years | 7 years | PCI DSS |
| Health records | 2 years | 4 years | 6 years | HIPAA |
| Personal data | Purpose-based | N/A | Varies | GDPR |
| Audit trails | 1 year | 6 years | 7 years | Multiple |

### Archival Timeline

| Stage | Duration | Storage | Access |
|-------|----------|---------|--------|
| Hot | 0-30 days | Primary DB | Instant |
| Warm | 30-90 days | Secondary DB | Seconds |
| Cold | 90-365 days | Object storage | Minutes |
| Glacier | 1+ years | Archive storage | Hours |

### Deletion Types

| Type | Use Case | Multi-Tenant Consideration |
|------|----------|---------------------------|
| Soft delete | Recoverable deletion | Tenant-visible vs hidden |
| Hard delete | Permanent removal | Backup handling |
| Cryptographic erasure | Key destruction | Per-tenant encryption keys |
| Cascade delete | Related data cleanup | Cross-tenant data check |

### Tenant Offboarding Retention

| Phase | Duration | Data State | Tenant Access |
|-------|----------|------------|---------------|
| Grace period | 30 days | Active, read-only | Yes |
| Archive period | 90 days | Archived | Export only |
| Deletion queue | 30 days | Pending deletion | None |
| Post-deletion | N/A | Deleted | Deletion certificate |

---

## §data-masking

### Pattern: Data Masking

Data masking transforms sensitive data to protect it while preserving utility for specific purposes.

### Masking Techniques

| Technique | Description | Reversible | Use Case |
|-----------|-------------|------------|----------|
| Substitution | Replace with fake data | No | Test environments |
| Encryption | Cryptographic transformation | Yes (with key) | Production protection |
| Tokenization | Replace with token | Yes (with vault) | Payment data |
| Pseudonymization | Replace with identifier | Yes (with mapping) | Research data |
| Redaction | Remove/blank data | No | Display masking |

### Context-Aware Masking

| Context | SSN | Email | Phone |
|---------|-----|-------|-------|
| Admin view | `***-**-1234` | Full | Full |
| Support view | `***-**-****` | `j***@***.com` | `***-***-1234` |
| Analytics | Hashed | Domain only | Area code |
| External API | Null | Null | Null |

### Per-Tier Masking Features

| Tier | Custom Policies | Dynamic Masking | Anonymization Export | Masking Audit |
|------|-----------------|-----------------|---------------------|---------------|
| Free | No | Platform default | No | No |
| Pro | Limited | Role-based | Basic | Summary |
| Enterprise | Full custom | Context-aware | Advanced | Detailed |

### Tenant Isolation in Masking

| Isolation Aspect | Implementation | Verification |
|------------------|----------------|--------------|
| Masking keys | Per-tenant encryption keys | Key isolation audit |
| Token vaults | Tenant-partitioned vaults | Access control |
| Masking rules | Tenant-scoped configurations | Policy audit |
| Audit trails | Tenant-isolated masking logs | Log segregation |

---

## §data-integrity

### Pattern: Data Integrity

Data integrity ensures accuracy, consistency, and reliability throughout the data lifecycle.

### Data Integrity Dimensions

| Dimension | Definition | Multi-Tenant Challenge |
|-----------|------------|------------------------|
| Accuracy | Data reflects reality | Validation per tenant schema |
| Consistency | Data uniform across systems | Cross-tenant data sync |
| Completeness | All required data present | Tenant-specific required fields |
| Timeliness | Data is current | Tenant timezone handling |
| Validity | Data conforms to rules | Tenant-configurable validation |

### Consistency Models

| Model | Guarantee | Use Case |
|-------|-----------|----------|
| Strong | Immediate consistency | Financial transactions |
| Eventual | Eventually consistent | Cross-region replication |
| Causal | Preserves causality | Collaboration features |

### Data Quality Metrics

| Metric | Formula | Target |
|--------|---------|--------|
| Completeness | Non-null / Total x 100 | > 98% |
| Accuracy | Valid / Total x 100 | > 99.9% |
| Uniqueness | Distinct / Total x 100 | = 100% for keys |
| Consistency | Matching / Total x 100 | > 99% |

### Error Handling Strategies

| Strategy | Description | When to Use |
|----------|-------------|-------------|
| Reject | Fail immediately | Critical validation |
| Quarantine | Isolate for review | Uncertain validity |
| Default | Apply default value | Non-critical missing data |
| Transform | Correct automatically | Known correction patterns |
| Escalate | Human review required | Business-critical decisions |

---

## Quality Gates

### Data Verification Checklist

| Category | Check | Critical |
|----------|-------|----------|
| Classification | All data types have sensitivity labels | Yes |
| PII | PII fields identified and documented | Yes |
| PII | Encryption at rest and in transit verified | Yes |
| Storage | File path follows `tenants/{tenant_id}/{category}/{filename}` | Yes |
| Storage | Tenant isolation verified (no cross-tenant access) | Yes |
| Indexing | tenant_id indexed and filter mandatory | Yes |
| Pipeline | Tenant partitioning in all pipeline stages | Yes |
| Residency | Tenant region pinning enforced | Yes |
| Retention | Retention policies defined per data type | Yes |
| Masking | Context-aware masking verified | Yes |
| Integrity | Validation at all layers (DB, app, API) | Yes |

---

## Web Research

| Topic | Query |
|-------|-------|
| Data classification | multi-tenant data classification framework SaaS best practices {date} |
| PII handling | PII detection classification patterns multi-tenant {date} |
| GDPR compliance | GDPR data subject rights implementation multi-tenant {date} |
| File storage | tenant isolated file storage multi-tenant {date} |
| Search indexing | multi-tenant search indexing Elasticsearch patterns {date} |
| Data pipelines | multi-tenant data pipeline ETL streaming patterns {date} |
| Data residency | data residency multi-tenant SaaS GDPR {date} |
| Data retention | data retention policy SaaS best practices GDPR {date} |
| Data masking | data masking patterns SaaS multi-tenant GDPR {date} |
| Data integrity | multi-tenant data integrity validation patterns {date} |

---

## Related Patterns

> **Note:** Use the `web_queries` column from pattern registry CSVs for current best practices searches.

Load decision criteria from pattern registry:

- **Data patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter by category: `data-*`
- **Classification patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `data-classification`
- **PII patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `pii-handling`
- **Storage patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `file-storage`, `search-indexing`
- **Pipeline patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `data-pipeline`
- **Residency patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `data-residency`, `compliance`
- **Compliance frameworks:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Configure data isolation at tenant level
- `bmad-bam-tenant-onboarding-design` - Provision storage, indices, regional placement
- `bmad-bam-tenant-offboarding-design` - Archive and deletion during offboarding
- `bmad-bam-compliance-design` - Align data patterns with compliance requirements
- `bmad-bam-security-review` - Validate data protection controls
- `bmad-bam-event-streaming-design` - Event-driven pipeline design
- `bmad-bam-tenant-aware-observability` - Data pipeline monitoring
- `bmad-bam-pii-detection-redaction` - Apply masking from classification
- `bmad-bam-tenant-data-export` - Data portability and export workflows

---

## Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-25 | Initial consolidated guide from 11 source files: search-indexing.md, file-storage.md, data-pipeline-patterns.md, data-archival.md, data-retention-patterns.md, data-masking-patterns.md, data-classification-patterns.md, pii-handling-patterns.md, data-residency.md, data-integrity-patterns.md, data-sovereignty-patterns.md |
