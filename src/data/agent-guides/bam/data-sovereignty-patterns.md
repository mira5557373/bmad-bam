# Data Sovereignty Patterns

**When to load:** When designing data residency requirements, implementing regional data storage, or when user mentions GDPR, data localization, or cross-border data transfer.

**Integrates with:** Architect (Atlas persona), Security agent, Compliance/Legal teams

---

## Core Concepts

### What is Data Sovereignty?

Data sovereignty governs where tenant data is physically stored and processed, ensuring compliance with regional regulations (GDPR, data localization laws) while maintaining operational efficiency in a global multi-tenant SaaS platform.

### Regulatory Landscape

| Region | Regulation | Key Requirement |
|--------|------------|-----------------|
| EU | GDPR | Data processing controls, export restrictions |
| Germany | BDSG | Stricter than GDPR, local DPO |
| China | PIPL | Data localization mandatory |
| Russia | Data Localization Law | Russian citizen data in Russia |
| Brazil | LGPD | Similar to GDPR |
| India | DPDP | Consent-based, cross-border rules |

---

## Key Patterns

### Pattern 1: Region Pinning

| Component | Strategy | Implementation |
|-----------|----------|----------------|
| Tenant metadata | Region assignment | `tenant.data_region = 'eu-west'` |
| Database | Regional clusters | Dedicated DB per region |
| Object storage | Regional buckets | S3 bucket per region |
| Cache | Regional Redis | Cache cluster per region |
| Search | Regional indices | Elasticsearch per region |

### Pattern 2: Data Classification

| Classification | Description | Residency Requirement |
|---------------|-------------|----------------------|
| PII | Personal identifiable | Strict regional |
| Business | Non-personal tenant data | Flexible |
| Analytics | Aggregated metrics | Can be global |
| System | Platform operational | Platform discretion |

### Pattern 3: Cross-Border Transfer

| Mechanism | Use Case | Compliance Basis |
|-----------|----------|------------------|
| SCCs | EU to adequate country | Standard Contractual Clauses |
| BCRs | Intra-company transfer | Binding Corporate Rules |
| Consent | User-initiated | Explicit user consent |
| Anonymization | Analytics | No PII transferred |

---

## Application Guidelines

- Onboarding enterprise tenants with data residency requirements
- Expanding to new geographic markets
- Responding to regulatory audits
- Designing global multi-region architecture
- Processing requests involving PII

---

## Architecture Considerations

| Approach | Pros | Cons |
|----------|------|------|
| Single region | Simple, compliant | Latency for global users |
| Multi-region replicated | Low latency | Compliance complexity |
| Multi-region isolated | Full compliance | Operational overhead |
| Hybrid | Balanced | Design complexity |

---

## Per-Tier Data Residency

| Tier | Region Options | Data Export | Compliance Cert |
|------|----------------|-------------|-----------------|
| Free | Platform default | Self-service | N/A |
| Pro | 3 regions | API access | SOC 2 |
| Enterprise | Any region | Full control | SOC 2, ISO 27001 |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Data patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `data-residency`, `compliance`
- **Related guides:** `encryption-patterns` guide

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "GDPR data residency multi-tenant SaaS {date}"
- Search: "data sovereignty architecture patterns {date}"
- Search: "cross-border data transfer mechanisms {date}"

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Does your tenant base include EU customers? | Implement regional data pinning with EU-West as default | GDPR requires data processing controls and may require EU residency for PII |
| Do you need to support tenants in China or Russia? | Plan for data localization from the start with dedicated regional infrastructure | PIPL and Russian data localization laws mandate citizen data remain in-country |
| Are you serving enterprise tenants with strict compliance? | Offer database-per-tenant with region selection | Enterprise contracts often require certified data residency guarantees |
| Do you need cross-border data transfer for analytics? | Implement anonymization pipeline before transfer | Anonymized data can flow globally without triggering residency restrictions |
| How do you handle tenant expansion to new regions? | Design region migration workflow with data export/import | Tenants may need to relocate data as their business expands geographically |

## Related Workflows

- `bmad-bam-compliance-design` - Design compliance controls for data residency regulations
- `bmad-bam-multi-region-architecture` - Implement regional data storage and processing
- `bmad-bam-tenant-model-isolation` - Configure tenant-level data residency requirements
