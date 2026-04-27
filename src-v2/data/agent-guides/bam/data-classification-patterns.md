# Data Classification Patterns

**When to load:** When designing data classification schemes, implementing data labeling systems, or when user mentions data classification, data sensitivity, data labeling, or information categorization in multi-tenant SaaS.

**Integrates with:** Security agent, Architect (Atlas persona), Analyst agent, DevOps agent

---

## Core Concepts

### What is Data Classification?

Data classification is the process of categorizing data based on sensitivity, regulatory requirements, and business value. In multi-tenant SaaS, classification must account for tenant-specific requirements while maintaining platform-wide consistency for security controls.

### Classification Dimensions

| Dimension | Description | Example Values |
|-----------|-------------|----------------|
| Sensitivity | Data confidentiality level | Public, Internal, Confidential, Restricted |
| Regulatory | Applicable regulations | GDPR, HIPAA, PCI, None |
| Retention | How long to keep | 30 days, 1 year, 7 years, Indefinite |
| Residency | Where data can be stored | US, EU, Any, Tenant-specified |
| Processing | How data can be used | Analytics, ML Training, Operations Only |

### Multi-Tenant Classification Hierarchy

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

---

## Key Patterns

### Pattern 1: Classification Schema

| Level | Description | Security Controls | Tenant Override |
|-------|-------------|-------------------|-----------------|
| Public | No restrictions | Basic integrity | No |
| Internal | Organization access | Authentication required | No |
| Confidential | Need-to-know basis | Encryption + access logging | Upgrade only |
| Restricted | Highly sensitive | Encryption + DLP + approval | Upgrade only |

### Pattern 2: Classification Metadata

| Field | Description | Example |
|-------|-------------|---------|
| classification_id | Unique identifier | `cls_abc123` |
| data_type | Entity/field identifier | `user.ssn` |
| tenant_id | Tenant context (null for platform) | `tenant_xyz` |
| sensitivity_level | Classification level | `restricted` |
| regulatory_tags | Applicable regulations | `["HIPAA", "GDPR"]` |
| retention_policy | Retention rule | `7_years` |
| residency_requirement | Data location | `us_only` |
| classification_source | How classified | `automatic`, `manual`, `inherited` |
| last_reviewed | Review timestamp | `2026-04-11T10:30:00Z` |

### Pattern 3: Automatic Classification Rules

| Rule Type | Implementation | Multi-Tenant Consideration |
|-----------|----------------|---------------------------|
| Pattern matching | Regex for PII (SSN, email) | Platform-wide + tenant custom |
| ML-based | NLP classification models | Tenant-isolated training data |
| Schema-based | Field metadata | Tenant schema extensions |
| Content inspection | DLP scanning | Tenant data isolation |

---

## Application Guidelines

- Designing data classification frameworks for multi-tenant SaaS
- Implementing automated data labeling pipelines
- Building tenant-configurable classification policies
- Creating classification-driven security controls
- Establishing data handling procedures by classification
- Supporting compliance reporting by data category

---

## Multi-Tenant Considerations

### Per-Tier Classification Features

| Tier | Custom Classifications | Auto-classification | Classification Reports | DLP Integration |
|------|------------------------|---------------------|------------------------|-----------------|
| Free | No | Basic patterns only | N/A | No |
| Pro | Limited (3 custom) | Standard patterns | Monthly summary | Basic |
| Enterprise | Unlimited | Full ML + custom | Real-time dashboard | Advanced |

### Tenant Classification Profiles

| Profile Component | Description | Default |
|-------------------|-------------|---------|
| Base sensitivity | Minimum classification level | Platform default |
| Regulatory set | Applicable regulations | Tenant jurisdiction |
| Custom levels | Tenant-specific classifications | None |
| Override rules | Tenant-specific patterns | None |
| Review cadence | Classification review schedule | Annual |

### Classification Inheritance

| Scenario | Behavior | Example |
|----------|----------|---------|
| Platform classifies as Restricted | Tenant cannot downgrade | PII always Restricted |
| Tenant classifies as Confidential | Applies to tenant only | Custom business data |
| No classification | Inherit from data type default | Standard entities |
| Conflict | Higher classification wins | Compliance safety |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Should tenants define custom classification levels? | Yes for Enterprise tier, with platform approval | Supports diverse compliance needs while maintaining security |
| How to handle unclassified data? | Default to Internal, flag for review | Prevents accidental exposure, enables remediation |
| Automatic vs manual classification? | Automatic with manual override and review | Scales with data volume while allowing expert judgment |
| How often to reclassify data? | Event-driven (data change) + periodic review (annual) | Balances accuracy with performance |
| Should classification drive encryption? | Yes, Confidential and above require encryption at rest | Automatic security enforcement |
| How to handle classification disputes? | Escalation workflow with compliance team review | Clear resolution process |

---

## Related Workflows

- `bmad-bam-tenant-data-export` - Design data governance framework
- `bmad-bam-compliance-design` - Integrate classification with compliance
- `bmad-bam-security-review` - Validate classification controls
- `bmad-bam-pii-detection-redaction` - Apply masking by classification

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Data governance patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `data-governance`, `security`
- **Compliance patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "data classification framework SaaS best practices {date}"
- Search: "multi-tenant data labeling automation {date}"
- Search: "automated PII classification patterns {date}"
