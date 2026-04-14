# Step 4: Check Compliance Status

## Purpose

Verify compliance requirements are met for regulatory frameworks relevant to the multi-tenant SaaS platform.

## Prerequisites

- Integration tests verified
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **Load checklist:** `{project-root}/_bmad/bam/checklists/qg-i2-tenant-safety.md`

## Actions

### 1. Review Applicable Compliance Frameworks

| Framework | Applicable | Status | Evidence Location |
|-----------|------------|--------|-------------------|
| GDPR | | | |
| SOC 2 Type II | | | |
| HIPAA | | | |
| ISO 27001 | | | |
| EU AI Act | | | |
| PCI DSS | | | |

### 2. Assess Data Protection Controls

| Control | GDPR | SOC 2 | HIPAA | Status |
|---------|------|-------|-------|--------|
| Data encryption at rest | Art. 32 | CC6.1 | 164.312(a)(1) | |
| Data encryption in transit | Art. 32 | CC6.1 | 164.312(e)(1) | |
| Access controls | Art. 32 | CC6.3 | 164.312(a)(1) | |
| Audit logging | Art. 30 | CC7.2 | 164.312(b) | |
| Data retention | Art. 5 | CC6.5 | 164.530(j) | |
| Right to erasure | Art. 17 | - | - | |

### 3. Verify Tenant-Specific Compliance

| Requirement | Implementation | Verification |
|-------------|----------------|--------------|
| Data residency | Regional deployment | Region config check |
| Tenant data export | Export API | DSAR test |
| Tenant data deletion | Deletion workflow | Erasure test |
| Audit trail access | Audit API | Log review |
| Consent management | Consent service | Consent flow test |

### 4. AI-Specific Compliance (EU AI Act)

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Risk classification | | |
| Transparency documentation | | |
| Human oversight | | |
| Accuracy/robustness | | |
| Data governance | | |

### 5. Calculate Compliance Score

| Framework | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| GDPR | {weight}% | | |
| SOC 2 | {weight}% | | |
| Other | {weight}% | | |
| **Total** | 100% | | |

## Web Research Verification

Search the web: "SaaS compliance requirements {date}"
Search the web: "EU AI Act compliance multi-tenant {date}"

## Verification

- [ ] Applicable frameworks identified
- [ ] Data protection controls verified
- [ ] Tenant-specific compliance checked
- [ ] AI compliance assessed
- [ ] Compliance score calculated

## Outputs

- Compliance status matrix
- Control verification results
- Compliance score

## Next Step

Proceed to `step-05-c-aggregate-quality-metrics.md` with compliance assessment.
