---
name: compliance-test-report-template
description: Template for compliance verification test reporting
category: compliance
version: 1.0.0
type: "report"
---

# Compliance Test Report: {{title}}

## Document Information

| Field | Value |
|-------|-------|
| Report ID | CTR-{{version}} |
| Project | {{project_name}} |
| Test Type | Compliance Verification |
| Date | {{date}} |
| Author | {{author}} |
| Quality Gate | QG-S6, QG-CC |

---

## Executive Summary

Overview of compliance test results across applicable regulatory frameworks.

| Framework | Tests | Passed | Failed | Compliance Score |
|-----------|-------|--------|--------|------------------|
| SOC2 | | | | |
| GDPR | | | | |
| HIPAA | | | | |
| PCI-DSS | | | | |
| **Overall** | | | | |

**Overall Compliance Status:** [ ] Compliant / [ ] Gaps Identified / [ ] Non-Compliant

---

## 1. Framework Coverage

### 1.1 Applicable Frameworks

| Framework | Applicable | Tenant Tiers | Test Coverage |
|-----------|------------|--------------|---------------|
| SOC2 Type II | [ ] | All | % |
| GDPR | [ ] | EU tenants | % |
| HIPAA | [ ] | Healthcare | % |
| PCI-DSS | [ ] | Payment processing | % |
| ISO 27001 | [ ] | Enterprise | % |

### 1.2 Tenant Compliance Matrix

| Tenant Tier | Frameworks Required | Frameworks Tested | Status |
|-------------|---------------------|-------------------|--------|
| Free | Basic | | |
| Pro | SOC2, GDPR | | |
| Enterprise | All applicable | | |

---

## 2. SOC2 Test Results

### 2.1 Trust Service Criteria

| Control | Description | Test | Result | Evidence |
|---------|-------------|------|--------|----------|
| CC6.1 | Logical access controls | RBAC enforcement | | |
| CC6.6 | System boundaries | Tenant isolation | | |
| CC6.7 | Data transmission | Encryption | | |
| CC7.2 | Vulnerability management | Scanning active | | |
| CC8.1 | Change management | Approval workflow | | |

### 2.2 SOC2 Compliance Score

| Category | Controls | Passed | Failed | Score |
|----------|----------|--------|--------|-------|
| Security | | | | |
| Availability | | | | |
| Processing Integrity | | | | |
| Confidentiality | | | | |
| Privacy | | | | |

---

## 3. GDPR Test Results

### 3.1 Data Subject Rights

| Right | Test Scenario | Result | Evidence |
|-------|---------------|--------|----------|
| Access (Art. 15) | Export user data | | |
| Rectification (Art. 16) | Update user data | | |
| Erasure (Art. 17) | Delete user data | | |
| Portability (Art. 20) | Export in standard format | | |
| Object (Art. 21) | Opt-out processing | | |

### 3.2 Processing Verification

| Requirement | Test | Result | Evidence |
|-------------|------|--------|----------|
| Lawful basis documented | Audit check | | |
| Purpose limitation | Data flow analysis | | |
| Data minimization | Collection review | | |
| Consent management | Withdraw consent | | |
| Breach notification | 72-hour process | | |

### 3.3 GDPR Compliance Score

| Category | Requirements | Passed | Failed | Score |
|----------|--------------|--------|--------|-------|
| Data subject rights | 7 | | | |
| Processing principles | 6 | | | |
| Security measures | 5 | | | |
| Accountability | 4 | | | |

---

## 4. HIPAA Test Results (If Applicable)

### 4.1 Administrative Safeguards

| Safeguard | Test | Result | Evidence |
|-----------|------|--------|----------|
| Security management | Risk assessment | | |
| Workforce security | Access controls | | |
| Information access | Minimum necessary | | |
| Security awareness | Training records | | |
| Incident procedures | Response test | | |

### 4.2 Technical Safeguards

| Safeguard | Test | Result | Evidence |
|-----------|------|--------|----------|
| Access control | Unique ID enforcement | | |
| Audit controls | Logging verification | | |
| Integrity controls | Data validation | | |
| Transmission security | Encryption test | | |

### 4.3 HIPAA Compliance Score

| Category | Requirements | Passed | Failed | Score |
|----------|--------------|--------|--------|-------|
| Administrative | 9 | | | |
| Physical | 4 | | | |
| Technical | 5 | | | |

---

## 5. PCI-DSS Test Results (If Applicable)

### 5.1 Requirement Verification

| Requirement | Description | Test | Result | Evidence |
|-------------|-------------|------|--------|----------|
| Req 3 | Protect stored data | Encryption test | | |
| Req 4 | Encrypt transmission | TLS verification | | |
| Req 7 | Restrict access | RBAC test | | |
| Req 8 | Identify users | Auth test | | |
| Req 10 | Track access | Audit log test | | |

### 5.2 PCI-DSS Compliance Score

| Category | Requirements | Passed | Failed | Score |
|----------|--------------|--------|--------|-------|
| Network security | 2 | | | |
| Data protection | 2 | | | |
| Access control | 2 | | | |
| Monitoring | 2 | | | |

---

## 5.3 ISO 27001 Test Results (If Applicable)

### Information Security Management System (ISMS)

| Control | Description | Test | Result | Evidence |
|---------|-------------|------|--------|----------|
| A.5 | Information security policies | Policy review | | |
| A.6 | Organization of security | Role assignment | | |
| A.7 | Human resource security | Training verification | | |
| A.8 | Asset management | Inventory check | | |
| A.9 | Access control | RBAC verification | | |
| A.10 | Cryptography | Encryption test | | |
| A.12 | Operations security | Change management | | |
| A.13 | Communications security | Network isolation | | |

### ISO 27001 Compliance Score

| Category | Controls | Passed | Failed | Score |
|----------|----------|--------|--------|-------|
| Organizational | 10 | | | |
| Technical | 15 | | | |
| Physical | 5 | | | |
| Operational | 12 | | | |

---

## 5.4 EU AI Act Compliance (If Applicable)

### AI System Risk Classification

| AI Feature | Risk Level | Classification Basis | Documentation |
|------------|------------|---------------------|---------------|
| | Minimal / Limited / High | | [ ] Complete |
| | Minimal / Limited / High | | [ ] Complete |

### High-Risk AI Requirements

| Requirement | Test | Result | Evidence |
|-------------|------|--------|----------|
| Transparency | AI disclosure visible | | |
| Human oversight | Override mechanism | | |
| Data governance | Training data audit | | |
| Technical documentation | System docs review | | |
| Conformity assessment | Assessment complete | | |
| Incident reporting | Process verified | | |

### EU AI Act Compliance Score

| Category | Requirements | Passed | Failed | Score |
|----------|--------------|--------|--------|-------|
| Risk classification | 3 | | | |
| Transparency | 4 | | | |
| Human oversight | 3 | | | |
| Documentation | 5 | | | |
| Conformity | 2 | | | |

---

## 6. Tenant-Specific Compliance

### 6.1 Per-Tenant Results

| Tenant ID | Tier | Frameworks | Pass | Fail | Score |
|-----------|------|------------|------|------|-------|
| | | | | | |

### 6.2 Compliance Inheritance

| Setting | Source | Inherited By | Verified |
|---------|--------|--------------|----------|
| Encryption | Platform | All tenants | [ ] |
| Audit logging | Platform | All tenants | [ ] |
| Access controls | Tenant config | Tenant only | [ ] |

---

## 7. Evidence Collection

### 7.1 Automated Evidence

| Evidence Type | Collection Method | Storage | Retention |
|---------------|-------------------|---------|-----------|
| Audit logs | Automated export | S3 | 7 years |
| Config snapshots | Daily backup | S3 | 1 year |
| Test results | CI/CD pipeline | Database | 3 years |
| Access logs | Real-time | SIEM | 1 year |

### 7.2 Manual Evidence

| Evidence Type | Collection Method | Owner | Last Updated |
|---------------|-------------------|-------|--------------|
| Policy documents | Manual review | Compliance | |
| Training records | HR system export | HR | |
| Risk assessments | Quarterly review | Security | |

---

## 8. Findings and Remediation

### 8.1 Open Findings

| Finding ID | Framework | Severity | Description | Owner | Due Date |
|------------|-----------|----------|-------------|-------|----------|
| | | | | | |

### 8.2 Remediation Status

| Finding ID | Status | Progress | ETA |
|------------|--------|----------|-----|
| | Open / In Progress / Closed | % | |

---

## 9. Gate Decision

### 9.1 QG-S6 / QG-CC Criteria

| Criteria | Requirement | Status |
|----------|-------------|--------|
| Framework requirements mapped | All applicable | [ ] |
| Evidence collection automated | > 80% | [ ] |
| Compliance score threshold | >= 90% | [ ] |
| Audit readiness | Verified | [ ] |

### 9.2 Gate Outcome

| Outcome | Criteria |
|---------|----------|
| **PASS** | All frameworks >= 90%, no critical findings |
| **CONDITIONAL** | >= 85% with remediation plan |
| **FAIL** | < 85% or critical findings open |

**Decision:** [ ] PASS / [ ] CONDITIONAL / [ ] FAIL

**Justification:**


---

## Web Research Queries

Before finalizing this report, verify current best practices:

- "compliance testing automation SaaS {date}"
- "SOC2 Type II evidence collection {date}"
- "GDPR compliance verification {date}"
- "multi-tenant compliance reporting {date}"

_Source: [URL]_ citations for key findings.

---

## Verification Checklist

- [ ] All applicable frameworks identified
- [ ] Tenant compliance matrix complete
- [ ] SOC2 controls tested
- [ ] GDPR requirements verified
- [ ] HIPAA safeguards tested (if applicable)
- [ ] PCI-DSS requirements verified (if applicable)
- [ ] Evidence collection documented
- [ ] Open findings tracked
- [ ] Gate decision recorded

---

## Approvals

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Compliance Officer | | | |
| Security Lead | | | |
| CISO | | | |

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial document |
