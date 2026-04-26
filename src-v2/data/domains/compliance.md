# Compliance - BAM Domain Context

**Loaded by:** ZCF, ZCA  
**Related Workflows:** bmad-bam-compliance-mapping, bmad-bam-audit-logging

---

## Overview

Compliance ensures multi-tenant systems meet regulatory requirements while maintaining operational efficiency.

## Core Concepts

### Compliance Matrix

| Framework | Data Residency | Encryption | Audit | Isolation |
|-----------|----------------|------------|-------|-----------|
| SOC 2 | Recommended | Required | Required | Logical OK |
| HIPAA | Required | Required | Required | Schema+ |
| GDPR | Required | Required | Required | Logical OK |
| PCI-DSS | Required | Required | Required | Database |
| FedRAMP | Required | Required | Required | Database |

### Tenant Compliance Mapping

```
Tenant → Tier → Compliance Requirements
  │       │
  │       ├── Free: SOC 2 only
  │       ├── Pro: SOC 2 + GDPR
  │       └── Enterprise: All frameworks
  │
  └── compliance_level stored on tenant record
```

## Decision Matrix

| Compliance Need | Tenant Model | Additional Controls |
|-----------------|--------------|---------------------|
| Basic (SOC 2) | RLS | Audit logging |
| Healthcare (HIPAA) | Schema | BAA, encryption |
| Financial (PCI) | Database | Network isolation |
| Government (FedRAMP) | Database | Dedicated infra |

## Quality Checks

- [ ] Audit logs capture all data access
- [ ] Data retention policies enforced per tenant
- [ ] Compliance controls mapped to frameworks
- [ ] **CRITICAL:** Regulatory evidence available on demand

## Web Research Queries

- "SaaS compliance multi-tenant {date}"
- "SOC2 GDPR multi-tenant patterns {date}"
