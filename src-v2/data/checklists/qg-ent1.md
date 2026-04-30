---
name: qg-ent1-enterprise-compliance
description: Enterprise compliance validation gate for regulatory requirements
module: bam
version: 1.0.0
tags: [compliance, quality-gate, enterprise, regulatory]
---

# QG-ENT1: Enterprise Compliance Gate

> **Gate ID:** QG-ENT1 (Enterprise Compliance)
> **Definition:** Enterprise compliance gate validates regulatory requirements across frameworks.
> **Scope:** Covers data residency, privacy rights, encryption, and framework-specific controls.
> **Recovery:** Gate failure recovery requires implementing missing compliance controls before enterprise deployment.

**Workflow:** bmad-bam-compliance-audit
**Prerequisites:** QG-F1 (Foundation), QG-S3 (Security Baseline)

---

## Purpose

The Enterprise Compliance Gate (QG-ENT1) validates that the platform meets regulatory and compliance requirements for enterprise deployment. This gate ensures:

1. **Data residency** - Tenant data stored in required geographic regions
2. **Privacy rights** - GDPR and privacy regulations implemented
3. **Security controls** - Encryption, access controls, and audit trails
4. **Framework compliance** - SOC 2, HIPAA, PCI DSS, GDPR controls verified

Passing QG-ENT1 enables enterprise-tier deployment with regulatory compliance assurance.

---

## Critical Checks (All Must Pass)

- [ ] **CRITICAL:** Data residency requirements enforced per tenant
- [ ] **CRITICAL:** Consent management implemented where required
- [ ] **CRITICAL:** Right to deletion (GDPR Art. 17) operational
- [ ] **CRITICAL:** Access controls auditable and reviewable
- [ ] **CRITICAL:** Encryption at rest and in transit verified

---

## Data Residency

- [ ] **CRITICAL:** Regional deployment strategy documented
- [ ] **CRITICAL:** Data storage location configurable per tenant
- [ ] **CRITICAL:** Cross-border data transfer controls in place
- [ ] Data residency requirements documented per tenant
- [ ] Regional failover respects residency constraints
- [ ] Backup storage complies with residency rules

---

## Privacy and Consent

- [ ] **CRITICAL:** Consent collection mechanism operational
- [ ] **CRITICAL:** Consent records stored with audit trail
- [ ] **CRITICAL:** Right to access (GDPR Art. 15) implemented
- [ ] **CRITICAL:** Right to rectification (GDPR Art. 16) implemented
- [ ] **CRITICAL:** Right to deletion (GDPR Art. 17) operational
- [ ] **CRITICAL:** Data portability (GDPR Art. 20) supported
- [ ] Consent withdrawal mechanism functional
- [ ] Privacy policy versioning implemented
- [ ] Legitimate interest assessments documented

---

## Encryption and Security

- [ ] **CRITICAL:** Encryption at rest using AES-256 or equivalent
- [ ] **CRITICAL:** Encryption in transit using TLS 1.2+
- [ ] **CRITICAL:** Key management system operational
- [ ] Key rotation automated and documented
- [ ] Tenant-specific encryption keys supported
- [ ] HSM integration for enterprise tier

---

## Access Control and Audit

- [ ] **CRITICAL:** Role-based access control (RBAC) implemented
- [ ] **CRITICAL:** Access logs retained per compliance requirements
- [ ] **CRITICAL:** Privileged access monitoring active
- [ ] Access reviews schedulable and documented
- [ ] Separation of duties enforced
- [ ] Just-in-time access available for enterprise tier

---

## Data Lifecycle

- [ ] Data retention policies automated
- [ ] Anonymization pipelines tested
- [ ] Data classification scheme applied
- [ ] Retention periods configurable per tenant
- [ ] Data disposal procedures documented
- [ ] Archive storage compliant with regulations

---

## Framework-Specific Checks

### SOC 2 Type II

- [ ] Trust Service Criteria (TSC) mapped
- [ ] Control evidence collection automated
- [ ] Exception tracking operational
- [ ] Annual audit preparation documented
- [ ] Continuous monitoring dashboards available

### HIPAA

- [ ] PHI handling documented and enforced
- [ ] Business Associate Agreements (BAA) in place
- [ ] Minimum necessary access enforced
- [ ] Breach notification procedures documented
- [ ] Training records maintained

### PCI DSS

- [ ] Cardholder data scope defined
- [ ] Network segmentation verified
- [ ] Penetration testing scheduled
- [ ] Vulnerability management active
- [ ] Compensating controls documented

### GDPR

- [ ] Data processing agreements signed
- [ ] Data subject rights implemented
- [ ] Data Protection Officer (DPO) designated
- [ ] Privacy impact assessments completed
- [ ] Cross-border transfer mechanisms in place

---

## Vendor and Third-Party

- [ ] Vendor risk assessment completed
- [ ] Third-party data processing agreements signed
- [ ] Subprocessor list maintained
- [ ] Vendor security questionnaires on file
- [ ] Vendor breach notification requirements documented

---

## Documentation and Reporting

- [ ] Compliance reporting automated
- [ ] Privacy by design principles documented
- [ ] Control mapping spreadsheets maintained
- [ ] Evidence repository organized
- [ ] Audit trail exports available
- [ ] Compliance dashboard operational

---

## Tests Passing

- [ ] **CRITICAL:** Data residency enforcement test passes
- [ ] **CRITICAL:** Right to deletion end-to-end test passes
- [ ] **CRITICAL:** Encryption verification test passes
- [ ] **CRITICAL:** Access control audit test passes
- [ ] Consent flow integration test passes
- [ ] Data portability export test passes

---

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All CRITICAL items pass, >=80% of non-critical items pass |
| **CONDITIONAL** | All CRITICAL items pass, <80% of non-critical items pass - remediation plan required |
| **FAIL** | Any CRITICAL item fails - block enterprise deployment until resolved |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off |

---

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Data Residency | CRITICAL | Partial enforcement | No residency controls |
| Privacy Rights | CRITICAL | Rights partially implemented | Deletion not operational |
| Encryption | CRITICAL | Key rotation manual | No encryption at rest |
| Access Control | CRITICAL | Partial RBAC | No audit logging |
| Tests (compliance) | CRITICAL | <80% tests pass | Any critical test failure |
| Framework-Specific | Non-critical | Partial controls | N/A (unless required) |
| Documentation | Non-critical | Incomplete docs | N/A |
| Vendor Management | Non-critical | Assessments incomplete | N/A |

---

## Recovery Protocol

**If QG-ENT1 fails:**

### Attempt 1: Immediate Remediation (target: 3-5 days)

1. Identify failed CRITICAL categories from checklist
2. Review compliance gap analysis
3. Implement missing critical controls
4. Document remediation actions
5. Re-run QG-ENT1 validation after fixes
6. **Lock passed categories** - do not re-test locked items

### Attempt 2: Deep Investigation (target: 5-7 days)

1. Engage compliance and legal teams
2. Review regulatory requirements interpretation
3. Implement framework-specific controls
4. Update documentation and evidence
5. Re-run QG-ENT1 validation after remediation
6. **Preserve locked categories** from Attempt 1

### Attempt 3: Mandatory Course Correction

1. Escalate to executive leadership
2. Document compliance gaps and business risk
3. Engage external compliance consultants if needed
4. Consider phased compliance approach by framework
5. Create remediation plan with executive sign-off
6. Schedule follow-up validation within 2 weeks

### Category-Specific Recovery

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Data Residency | Configure regional storage; verify deployment | Cross-border transfer violation |
| Privacy Rights | Implement missing data subject rights | Right to deletion fails |
| Encryption | Deploy encryption; configure key management | Data at rest unencrypted |
| Access Control | Implement RBAC; enable audit logging | Privileged access unmonitored |
| Framework-Specific | Map controls; collect evidence | External audit imminent |

---

## Related Workflows

- `bmad-bam-compliance-audit` - Compliance audit workflow (primary)
- `bmad-bam-privacy-compliance` - Privacy compliance workflow
- `bmad-bam-security-baseline` - Security baseline workflow
- `bmad-bam-tenant-model-isolation` - Tenant isolation patterns

---

## Required Templates

- `compliance-audit-template.md` - Compliance audit report
- `privacy-impact-template.md` - Privacy impact assessment
- `control-mapping-template.md` - Control framework mapping
- `data-residency-template.md` - Data residency documentation

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Compliance patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **Security patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter: `security-*`
- **Privacy patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter: `privacy-*`

### Web Research

- Search: "enterprise SaaS compliance requirements {date}"
- Search: "multi-tenant GDPR implementation patterns {date}"
- Search: "SOC 2 Type II continuous compliance {date}"

---

## Web Research Verification

- [ ] Search the web: "enterprise compliance quality gates {date}" - Verify gate criteria
- [ ] Search the web: "multi-tenant data residency patterns {date}" - Confirm residency approach
- [ ] Search the web: "GDPR right to deletion implementation {date}" - Validate deletion implementation
- [ ] Search the web: "SOC 2 multi-tenant evidence collection {date}" - Confirm evidence requirements
- [ ] _Source: [URL]_ citations documented for key decisions

---

**PASS CRITERIA:** All CRITICAL checkboxes completed, platform ready for enterprise deployment
**OWNER:** BAM (Security & Compliance persona)
**REVIEWERS:** Compliance Lead, Security Lead, Legal Counsel, DPO

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-04-30 | BAM V2 NEXUS | Initial enterprise compliance gate for NEXUS patterns |
