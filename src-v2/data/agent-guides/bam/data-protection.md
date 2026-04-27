# BAM Data Protection Guide

**When to load:** During Phase 5 (Quality) when verifying data protection controls,
or when user mentions encryption, PII protection, data isolation, or privacy controls.

**Integrates with:** Security Architect, Compliance Officer, DevOps Engineer

---

## Core Concepts

### Multi-Layer Data Protection

Data protection in multi-tenant AI platforms requires defense-in-depth:

1. **Encryption at Rest** - All data stores encrypted with tenant-aware keys
2. **Encryption in Transit** - TLS 1.3 minimum for all connections
3. **Tenant Isolation** - RLS, cache namespacing, vector store separation
4. **PII Protection** - Detection, redaction, and handling controls
5. **Data Lifecycle** - Retention, archival, and secure deletion

### Tenant Data Boundaries

| Layer | Isolation Method | Verification |
|-------|------------------|--------------|
| Database | Row-Level Security | Cross-tenant query test |
| Cache | Namespace prefix | Key enumeration test |
| Object Storage | Bucket/path isolation | Path traversal test |
| Vector Store | Tenant namespace | Semantic search isolation |
| AI Memory | Context scoping | Memory extraction test |

### PII in AI Context

Special considerations for PII in AI workloads:

- **Input PII** - Detect and optionally redact before processing
- **Output PII** - Filter responses for PII leakage
- **Context PII** - Scrub from RAG documents and embeddings
- **Log PII** - Sanitize all logs and traces
- **Training PII** - Remove from fine-tuning datasets

## Application Guidelines

When verifying data protection:

1. **Start with encryption audit** - Verify all data stores and connections
2. **Test isolation boundaries** - Attempt cross-tenant access at each layer
3. **Validate PII controls** - Test detection and redaction effectiveness
4. **Verify lifecycle** - Confirm retention and deletion procedures work

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| Multi-region deployment | Per-region encryption keys | Data residency compliance |
| Healthcare tenants | Customer-managed keys | HIPAA requires key control |
| High-value AI models | Encrypted model artifacts | IP protection |
| Shared inference | Per-tenant context isolation | Prevent cross-contamination |

## Related Workflows

- `bmad-bam-data-protection` - Data protection verification
- `bmad-bam-tenant-model-isolation` - Tenant isolation design
- `bmad-bam-compliance-verification` - Compliance framework verification

## Related Patterns

Load decision criteria and `web_queries` column from pattern registry:

- **Data protection patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `data-protection`
- **Encryption patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `encryption`

Use the `web_queries` column from pattern registry for current best practices.

### Web Research

Use these queries for current best practices:

- Search: "multi-tenant data protection patterns {date}"
- Search: "encryption key management SaaS {date}"
- Search: "PII protection AI systems {date}"
- Search: "GDPR data protection AI platforms {date}"
