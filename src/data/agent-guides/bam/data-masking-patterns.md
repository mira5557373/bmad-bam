# Data Masking Patterns

**When to load:** When designing data masking strategies, implementing anonymization, or when user mentions data masking, anonymization, pseudonymization, data obfuscation, or PII protection in multi-tenant SaaS.

**Integrates with:** Security agent, Architect (Atlas persona), DevOps agent, Analyst agent

---

## Core Concepts

### What is Data Masking?

Data masking transforms sensitive data to protect it while preserving its utility for specific purposes. In multi-tenant SaaS, masking must be tenant-aware, maintaining isolation while enabling cross-tenant analytics and development workflows.

### Masking Techniques

| Technique | Description | Reversible | Use Case |
|-----------|-------------|------------|----------|
| Substitution | Replace with fake data | No | Test environments |
| Shuffling | Randomize within column | No | Analytics preservation |
| Encryption | Cryptographic transformation | Yes (with key) | Production protection |
| Tokenization | Replace with token | Yes (with vault) | Payment data |
| Redaction | Remove/blank data | No | Display masking |
| Pseudonymization | Replace with identifier | Yes (with mapping) | Research data |

### Masking Context Hierarchy

```
Platform Masking Rules (required protections)
        │
        ▼
Tenant Masking Profile (tenant-specific rules)
        │
        ▼
Data Classification (sensitivity-driven)
        │
        ▼
Access Context (role-based masking)
        │
        ▼
Masked Output (context-appropriate view)
```

---

## Key Patterns

### Pattern 1: Context-Aware Masking

| Context | SSN | Email | Phone | Name |
|---------|-----|-------|-------|------|
| Admin view | `***-**-1234` | Full | Full | Full |
| Support view | `***-**-****` | `j***@***.com` | `***-***-1234` | Full |
| Analytics | Hashed | Domain only | Area code | Tokenized |
| External API | Null | Null | Null | Initials |

### Pattern 2: Masking Policy Schema

| Field | Description | Example |
|-------|-------------|---------|
| policy_id | Unique identifier | `msk_abc123` |
| tenant_id | Tenant context (null for platform) | `tenant_xyz` |
| data_type | Target field/entity | `user.ssn` |
| masking_technique | Transformation method | `partial_redaction` |
| access_contexts | Role/context rules | `{"admin": "partial", "support": "full"}` |
| preserve_format | Keep data format | `true` |
| deterministic | Same input = same output | `true` |

### Pattern 3: Multi-Tenant Masking Isolation

| Scenario | Implementation | Consideration |
|----------|----------------|---------------|
| Tenant A data in Tenant B view | Full masking | Cross-tenant protection |
| Platform analytics | Tenant-blind aggregation | No individual identification |
| Development environments | Full anonymization | No production data exposure |
| Tenant admin view | Tenant-configured masking | Tenant autonomy |

---

## Application Guidelines

- Designing production data masking for non-production environments
- Implementing dynamic data masking for role-based access
- Building GDPR-compliant pseudonymization systems
- Creating tenant-configurable masking policies
- Supporting secure analytics on sensitive data
- Enabling cross-tenant insights without data exposure

---

## Multi-Tenant Considerations

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

### Cross-Tenant Analytics Masking

| Data Type | Masking for Analytics | Preserves |
|-----------|----------------------|-----------|
| User identifiers | Consistent hash | Cardinality |
| Timestamps | Time bucket | Trends |
| Geographic data | Region aggregation | Patterns |
| Amounts | Binning | Distribution |
| Free text | Redaction/NER removal | Structure |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Static vs dynamic masking? | Dynamic for production, static for non-production | Balances security with performance |
| Should masking be deterministic? | Yes for analytics, no for maximum security | Enables consistent joins while protecting |
| How to handle masking failures? | Fail closed (full masking), log for investigation | Prevents accidental data exposure |
| Should tenants see masked data? | Only own data, with tenant-configured masking | Tenant autonomy within platform rules |
| How to mask historical data? | Batch masking with verification | Ensures retroactive protection |
| Pseudonymization vs anonymization? | Pseudonymization for internal use, anonymization for external | Reversibility when needed for legitimate purposes |

---

## Related Workflows

- `bmad-bam-tenant-data-anonymization` - Integrate masking into governance
- `bmad-bam-compliance-design` - Align masking with GDPR/HIPAA
- `bmad-bam-security-review` - Validate masking effectiveness
- `bmad-bam-pii-detection-redaction` - Drive masking from classification

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Data governance patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `data-governance`, `security`
- **Compliance patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "data masking patterns SaaS multi-tenant {date}"
- Search: "GDPR pseudonymization best practices {date}"
- Search: "dynamic data masking implementation patterns {date}"
