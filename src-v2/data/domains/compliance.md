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

---

## GDPR Compliance

### Data Subject Rights (GDPR Articles 15-22)

| Right | Article | Implementation | Automation Level |
|-------|---------|----------------|------------------|
| Access | Art. 15 | Export API per tenant | Full |
| Rectification | Art. 16 | Edit API + audit | Partial |
| Erasure | Art. 17 | Soft delete + purge job | Full |
| Portability | Art. 20 | JSON/CSV export | Full |
| Objection | Art. 21 | Processing flag | Partial |
| No profiling | Art. 22 | AI opt-out flag | Partial |

### Lawful Basis Tracking

```yaml
lawful_basis:
  consent:
    granular: true
    withdrawable: true
    recorded_at: timestamp
    purpose: string[]
    
  legitimate_interest:
    assessment_documented: bool
    opt_out_available: true
    
  contract:
    service_agreement_signed: bool
    necessary_processing_only: true
```

### Cross-Border Transfer

| Mechanism | When to Use | Documentation |
|-----------|-------------|---------------|
| Adequacy decision | EU-approved countries | None required |
| SCCs | US, other countries | Signed agreement |
| BCR | Intra-group transfers | Regulatory approval |
| Consent | Individual transfers | Explicit consent |

### DPO Integration

- Data Protection Officer contact in tenant portal
- DPIA required for high-risk processing
- Annual compliance audit per tenant

---

## CCPA Compliance

### Consumer Rights (California)

| Right | Implementation | Timeline |
|-------|----------------|----------|
| Right to Know | Disclosure API | 45 days |
| Right to Delete | Erasure workflow | 45 days |
| Right to Opt-Out | "Do Not Sell" toggle | Immediate |
| Non-Discrimination | Pricing parity | Ongoing |

### Do Not Sell Implementation

```yaml
ccpa_preferences:
  tenant_id: uuid
  do_not_sell: bool
  opt_out_date: timestamp
  data_categories_disclosed: string[]
  third_party_sharing: bool
```

### 12-Month Lookback

- Maintain data collection records for 12 months
- Disclosure must include categories collected
- Track all third-party data sharing

---

## SOC 2 Type II

### Trust Service Criteria

| Category | Criteria | BAM Implementation |
|----------|----------|-------------------|
| Security | CC1-CC9 | Tenant isolation, encryption, access control |
| Availability | A1 | SLA monitoring, DR plans, uptime tracking |
| Confidentiality | C1 | Data classification, encryption, access logs |
| Processing Integrity | PI1 | Input validation, audit trails, error handling |
| Privacy | P1-P8 | Consent management, data retention, disclosure |

### Evidence Collection Automation

```yaml
soc2_evidence:
  automated_collection:
    - access_logs
    - encryption_status
    - vulnerability_scans
    - uptime_metrics
    
  manual_review:
    - policy_documents
    - training_records
    - vendor_assessments
    
  collection_frequency:
    continuous: ["access_logs", "uptime_metrics"]
    weekly: ["vulnerability_scans"]
    quarterly: ["policy_review", "access_review"]
```

### Continuous Compliance Monitoring

- Real-time control monitoring dashboard
- Automated evidence collection
- Gap alerts with remediation guidance
- Audit-ready report generation

---

## HIPAA Compliance (If Applicable)

### PHI Handling Requirements

| Requirement | Implementation | Verification |
|-------------|----------------|--------------|
| BAA required | Agreement before PHI access | Legal review |
| Minimum necessary | Role-based data access | Access audit |
| Audit controls | All PHI access logged | Log review |
| Encryption | At rest and in transit | Scan verification |

### Breach Notification

- 60-day notification requirement
- Tenant notification within 24 hours of discovery
- HHS notification for breaches >500 records
- Media notification for state-wide breaches

---

## PCI-DSS Compliance (If Applicable)

### Cardholder Data Scope

| Data Element | Can Store | Encryption Required |
|--------------|-----------|---------------------|
| PAN | Yes (encrypted) | Yes |
| Cardholder name | Yes | Recommended |
| Service code | Yes | Yes |
| Expiration | Yes | Yes |
| CVV/CVC | No | N/A |
| Full track data | No | N/A |

### Scope Reduction

- Tokenization with PCI-compliant provider
- No CHD in logs or backups
- Segment cardholder data environment
- Quarterly ASV scans

---

## Compliance Automation

### Continuous Monitoring Dashboard

```
Compliance Score: 94%

SOC 2: ████████████░░ 92%
GDPR:  █████████████░ 96%
HIPAA: ████████████░░ 91%

Outstanding Items: 3
- Access review overdue (2 days)
- Vulnerability scan pending
- Policy update required
```

### Pattern References

- **Security:** `{project-root}/_bmad/bam/data/patterns/zero-trust.md`
- **Frameworks:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

## NEXUS Phase 3 Patterns

**Regulatory Tracking:**
- `{project-root}/_bmad/bam/data/patterns/regulatory-clock-engine.md` - Deadline management

### Web Research

- "EU AI Act compliance timeline {date}"
- "regulatory compliance tracking SaaS {date}"

## NEXUS Phase 4 Enterprise Compliance Patterns

**Data Governance:**
- `{project-root}/_bmad/bam/data/patterns/data-residency.md` - Data location and sovereignty
- `{project-root}/_bmad/bam/data/patterns/consent-management.md` - User consent tracking
- `{project-root}/_bmad/bam/data/patterns/data-retention.md` - Retention policy automation
- `{project-root}/_bmad/bam/data/patterns/anonymization.md` - Data anonymization pipelines
- `{project-root}/_bmad/bam/data/patterns/data-classification.md` - Data classification schemas

**Data Subject Rights:**
- `{project-root}/_bmad/bam/data/patterns/right-to-deletion.md` - GDPR Article 17 erasure
- `{project-root}/_bmad/bam/data/patterns/export-portability.md` - Data portability (Art. 20)

**Compliance Operations:**
- `{project-root}/_bmad/bam/data/patterns/compliance-reporting.md` - Automated compliance reports
- `{project-root}/_bmad/bam/data/patterns/access-reviews.md` - Periodic access certification
- `{project-root}/_bmad/bam/data/patterns/privacy-by-design.md` - Privacy-first architecture
- `{project-root}/_bmad/bam/data/patterns/vendor-management.md` - Third-party risk management

**Framework-Specific:**
- `{project-root}/_bmad/bam/data/patterns/soc2-compliance.md` - SOC 2 Type I/II controls
- `{project-root}/_bmad/bam/data/patterns/hipaa-compliance.md` - HIPAA safeguards
- `{project-root}/_bmad/bam/data/patterns/pci-dss-compliance.md` - PCI DSS v4.0 controls
- `{project-root}/_bmad/bam/data/patterns/gdpr-compliance.md` - GDPR implementation

### Data Residency (ZDY)

Multi-region deployment model:
- Global control plane with regional data planes
- Tenant-to-region assignment
- Cross-border transfer rules with legal basis
- Data classification by residency level

### Consent Management (ZCM)

Granular consent platform:
- Purpose-based consent tracking
- Consent versioning and audit trail
- Downstream system synchronization
- AI training data consent handling

### Framework Compliance

| Framework | Pattern | Key Controls |
|-----------|---------|--------------|
| SOC 2 | ZS2 | CC1-CC9, A1, C1, PI1 |
| HIPAA | ZHC | Admin, Physical, Technical safeguards |
| PCI DSS | ZPX | Requirements 1-12 |
| GDPR | ZGD | Articles 6, 15-22, 25, 30, 33-35 |

### Web Research

- "data residency SaaS architecture patterns {date}"
- "GDPR consent management platform patterns {date}"
- "SOC 2 Type II multi-tenant SaaS {date}"
- "HIPAA SaaS multi-tenant architecture {date}"
- "PCI DSS v4.0 SaaS requirements {date}"
