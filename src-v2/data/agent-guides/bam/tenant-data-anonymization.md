# Tenant Data Anonymization Guide

**When to load:** When designing data anonymization for multi-tenant systems, implementing GDPR data erasure, building compliant data export, or when user mentions anonymization, pseudonymization, PII removal, right to be forgotten, or data portability in multi-tenant SaaS.

**Integrates with:** Security agent, Architect (Atlas persona), Compliance agent, DevOps agent

---

## Core Concepts

### What is Tenant Data Anonymization?

Tenant data anonymization is the process of transforming personally identifiable information (PII) into non-identifiable data while maintaining the utility of that data for analytics, testing, or archival purposes. In multi-tenant SaaS, anonymization must respect tenant boundaries and comply with regulations like GDPR, CCPA, and HIPAA.

### Anonymization vs Pseudonymization

| Aspect | Anonymization | Pseudonymization |
|--------|---------------|------------------|
| Reversibility | Irreversible | Reversible with key |
| GDPR status | Not personal data | Still personal data |
| Use case | Analytics, public datasets | Internal processing |
| Tenant isolation | Full separation | Key-based separation |
| Performance impact | One-time transformation | Ongoing key management |

### Anonymization Technique Hierarchy

```
Data Classification (identify PII types)
        |
        v
Tenant Context (tenant-specific rules)
        |
        v
Technique Selection (based on data type)
        |
        v
Anonymization Execution (apply transforms)
        |
        v
Verification (validate anonymization quality)
        |
        v
Audit Trail (log compliance actions)
```

---

## Key Patterns

### Pattern 1: K-Anonymity Implementation

| Field | Original | K-Anonymity (k=3) |
|-------|----------|-------------------|
| Age | 25 | 20-30 |
| ZIP Code | 12345 | 123** |
| Gender | Male | Male |
| Income | $75,000 | $50K-$100K |

Ensures each record is indistinguishable from at least k-1 other records.

### Pattern 2: L-Diversity Extension

| Quasi-Identifier Group | Sensitive Attribute Distribution |
|------------------------|----------------------------------|
| Age 20-30, ZIP 123** | Disease: {Flu, Cold, Allergy} |
| Age 30-40, ZIP 456** | Disease: {Diabetes, Flu, Cold} |

Ensures diversity in sensitive attributes within each anonymization group.

### Pattern 3: Tenant-Scoped Anonymization

| Scope | Implementation | GDPR Compliance |
|-------|----------------|-----------------|
| Tenant deletion | Full anonymization of tenant data | Right to erasure |
| User deletion | Per-user anonymization within tenant | Individual rights |
| Analytics export | Cross-tenant aggregated anonymization | Legitimate interest |
| Backup retention | Cryptographic erasure via key deletion | Retention limits |

---

## Application Guidelines

### When to Apply Anonymization

- Tenant offboarding with data retention requirements
- User deletion requests (right to be forgotten)
- Data export for external analytics
- Non-production environment data seeding
- Cross-tenant benchmarking reports
- Long-term data archival beyond retention period

### Anonymization Workflow

1. **Classify data** - Identify PII fields and sensitivity levels
2. **Map dependencies** - Find related records across tables
3. **Select techniques** - Choose appropriate anonymization method per field
4. **Execute transformation** - Apply anonymization with transaction safety
5. **Verify quality** - Validate k-anonymity/l-diversity metrics
6. **Generate audit** - Create compliance evidence trail

---

## Multi-Tenant Considerations

### Per-Tier Anonymization Features

| Tier | Self-Service Deletion | Custom Retention | Anonymization Export | Compliance Reports |
|------|----------------------|------------------|---------------------|-------------------|
| Free | 30-day queue | No | No | No |
| Pro | 7-day queue | Basic | CSV | Summary |
| Enterprise | Immediate | Full custom | API + formats | Detailed audit |

### Tenant Isolation in Anonymization

| Isolation Aspect | Implementation | Verification |
|------------------|----------------|--------------|
| Anonymization keys | Per-tenant key management | Key isolation audit |
| Processing queues | Tenant-partitioned job queues | Queue isolation test |
| Audit logs | Tenant-scoped compliance logs | Log segregation check |
| Verification data | Tenant-specific quality metrics | Metric isolation |

### Cross-Tenant Analytics After Anonymization

| Data Type | Anonymization Method | Preserves |
|-----------|---------------------|-----------|
| User counts | Differential privacy noise | Aggregate trends |
| Usage patterns | Time bucketing + aggregation | Behavior patterns |
| Geographic data | Region-level generalization | Regional insights |
| Revenue data | Range bucketing | Financial trends |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Anonymize or delete? | Anonymize for analytics value, delete for simplicity | Balance data utility with compliance |
| K value for k-anonymity? | k >= 5 for public data, k >= 3 for internal | Higher k = better privacy, lower utility |
| When to use differential privacy? | For aggregate statistics with strong guarantees | Mathematical privacy bounds |
| How to handle related records? | Cascade anonymization through foreign keys | Prevent re-identification via joins |
| Pseudonymization or anonymization? | Pseudonymization if reversibility ever needed | Future-proof legitimate use cases |
| How to verify completeness? | Automated PII scanning post-anonymization | Prevent accidental data leakage |

---

## GDPR-Specific Requirements

### Right to Erasure (Article 17)

| Requirement | Implementation | Verification |
|-------------|----------------|--------------|
| Complete deletion | Remove or anonymize all PII | PII scan report |
| Backup handling | Cryptographic erasure or exclusion | Backup audit |
| Processor notification | API calls to sub-processors | Notification log |
| Response timeline | Within 30 days | Timestamp tracking |

### Data Portability (Article 20)

| Requirement | Implementation | Format |
|-------------|----------------|--------|
| Machine-readable export | JSON/CSV export API | Structured data |
| Commonly used format | Standard schema | Interoperable |
| Direct transfer | API-to-API capability | Secure channel |

---

## Related Workflows

- `bmad-bam-tenant-data-export` - Export data before anonymization
- `bmad-bam-compliance-design` - Align anonymization with GDPR/HIPAA
- `bmad-bam-tenant-offboarding-design` - Integrate into offboarding process
- `bmad-bam-security-review` - Validate anonymization effectiveness

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Data anonymization patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `data-anonymization`, `data-masking`
- **Compliance patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **Tenant lifecycle patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-lifecycle`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "data anonymization GDPR patterns {date}"
- Search: "k-anonymity l-diversity implementation {date}"
- Search: "PII detection machine learning {date}"
- Search: "multi-tenant data anonymization patterns {date}"
- Search: "right to be forgotten implementation SaaS {date}"
