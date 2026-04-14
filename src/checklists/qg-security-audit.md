# QG-SA1: Security Audit Checklist

> Gate ID: QG-SA1 (Security Audit)
> Periodic security audit MUST be completed per audit frequency requirements.
> Gate definition: comprehensive security assessment across all platform components.
> Workflow integration: Scheduled quarterly (minimum) or triggered by significant changes.
> Executing workflow: `security-audit-procedure` (security team led)
>
> **Audit Scope:** This gate covers access control, vulnerability management,
> penetration testing, compliance verification, tenant isolation, and incident
> history. Evidence collection is mandatory for compliance certifications.
> Frequency: Quarterly for standard, monthly for high-risk components.

## Audit Frequency Requirements

| Component Category | Minimum Frequency | Trigger Events |
|--------------------|-------------------|----------------|
| Access Controls | Quarterly | Role changes, offboarding |
| Vulnerability Scanning | Weekly (automated), Monthly (review) | CVE announcements |
| Penetration Testing | Annually | Major architecture changes |
| Compliance Verification | Per framework schedule | Certification renewals |
| Tenant Isolation | Quarterly | New tenant models, isolation changes |
| Incident History | Monthly | Post any security incident |

## Access Control Review

### RBAC Verification

- [ ] **CRITICAL:** All user roles documented and current
- [ ] **CRITICAL:** Principle of least privilege verified
- [ ] Orphaned accounts removed (no active user)
- [ ] Service account permissions minimized
- [ ] Admin access limited and justified
- [ ] Role assignments reviewed by managers

### API Key Management

- [ ] **CRITICAL:** API keys inventoried
- [ ] **CRITICAL:** Expired/unused keys revoked
- [ ] Key rotation policy enforced
- [ ] Per-tenant API keys isolated
- [ ] Rate limiting applied to all keys

### Secrets Management

- [ ] **CRITICAL:** No secrets in code repositories
- [ ] **CRITICAL:** Secrets stored in approved vault
- [ ] Secret rotation automated where possible
- [ ] Access to secrets audited
- [ ] Emergency secret rotation procedure tested

### Evidence Collection

| Item | Evidence Required | Storage Location |
|------|-------------------|------------------|
| RBAC Matrix | Current role assignments | Compliance/RBAC/ |
| API Key Inventory | Key list with expiration | Compliance/API-Keys/ |
| Secret Audit Log | Access logs for audit period | Compliance/Secrets/ |

## Vulnerability Assessment

### CVE Scanning

- [ ] **CRITICAL:** All production systems scanned
- [ ] **CRITICAL:** Critical/High CVEs remediated or mitigated
- [ ] Medium CVEs tracked with remediation timeline
- [ ] Low CVEs documented and prioritized
- [ ] False positives documented and justified

### Dependency Audit

- [ ] **CRITICAL:** Software bill of materials (SBOM) current
- [ ] **CRITICAL:** No dependencies with known critical vulnerabilities
- [ ] Deprecated dependencies identified with upgrade plan
- [ ] License compliance verified
- [ ] Supply chain security verified (signed packages)

### Infrastructure Scanning

- [ ] Cloud configuration reviewed (misconfigurations)
- [ ] Network security groups audited
- [ ] Container images scanned
- [ ] IaC templates security-validated

### Evidence Collection

| Item | Evidence Required | Storage Location |
|------|-------------------|------------------|
| CVE Scan Report | Full scan results with remediation status | Compliance/Vulnerabilities/ |
| SBOM | Complete dependency list | Compliance/SBOM/ |
| Infrastructure Scan | Cloud security posture report | Compliance/Infrastructure/ |

## Penetration Test Results

### Testing Scope

- [ ] External penetration testing completed
- [ ] Internal penetration testing completed
- [ ] Web application testing completed
- [ ] API security testing completed
- [ ] AI/ML-specific testing completed (prompt injection, etc.)

### Findings Management

- [ ] **CRITICAL:** Critical findings remediated
- [ ] **CRITICAL:** High findings remediated or mitigated
- [ ] Medium findings tracked with timeline
- [ ] Remediation verified through retest
- [ ] Findings documented in tracking system

### Evidence Collection

| Item | Evidence Required | Storage Location |
|------|-------------------|------------------|
| Pentest Report | Full report from testing firm | Compliance/Pentest/ |
| Remediation Evidence | Fix verification for each finding | Compliance/Pentest/Remediation/ |
| Retest Results | Verification testing report | Compliance/Pentest/ |

## Compliance Verification

### Framework-Specific Checklists

#### SOC 2

- [ ] Trust Services Criteria mapped
- [ ] Control evidence collected
- [ ] Control testing completed
- [ ] Exceptions documented and addressed

#### GDPR

- [ ] Data processing activities documented
- [ ] Privacy impact assessments current
- [ ] Data subject rights procedures verified
- [ ] Cross-border transfer mechanisms valid
- [ ] **CRITICAL:** Tenant data deletion verified (right to erasure)

#### HIPAA (if applicable)

- [ ] PHI handling procedures documented
- [ ] BAAs in place with covered entities
- [ ] Security rule requirements verified
- [ ] Breach notification procedures ready

### Compliance Status

| Framework | Status | Last Audit | Next Audit |
|-----------|--------|------------|------------|
| SOC 2 Type II | | | |
| GDPR | | | |
| HIPAA | | | |
| ISO 27001 | | | |

### Evidence Collection

| Item | Evidence Required | Storage Location |
|------|-------------------|------------------|
| Compliance Matrix | Control mapping per framework | Compliance/{Framework}/ |
| Audit Reports | External auditor reports | Compliance/External-Audits/ |
| Policy Documents | Current security policies | Compliance/Policies/ |

## Tenant Isolation Verification

### Cross-Tenant Testing

- [ ] **CRITICAL:** Cross-tenant data access attempted and blocked
- [ ] **CRITICAL:** Tenant context spoofing attempted and blocked
- [ ] API authorization enforces tenant boundaries
- [ ] Database queries respect tenant isolation (RLS/schema)
- [ ] File storage isolation verified

### Tenant Boundary Tests

| Test Case | Expected Result | Verified |
|-----------|-----------------|----------|
| Tenant A accesses Tenant B data via API | Blocked (403/404) | [ ] |
| Tenant A queries Tenant B rows (direct DB) | Blocked (RLS) | [ ] |
| Tenant A accesses Tenant B files | Blocked (storage ACL) | [ ] |
| Tenant A impersonates Tenant B token | Blocked (token validation) | [ ] |
| Tenant A reads Tenant B agent memory | Blocked (memory isolation) | [ ] |

### Evidence Collection

| Item | Evidence Required | Storage Location |
|------|-------------------|------------------|
| Isolation Test Results | Detailed test execution logs | Compliance/Tenant-Isolation/ |
| RLS Policy Audit | Current RLS policies with coverage | Compliance/Tenant-Isolation/ |

## Incident History Review

### Pattern Analysis

- [ ] Security incidents from audit period reviewed
- [ ] Common patterns identified
- [ ] Root causes categorized
- [ ] Recurring issues flagged for architectural review
- [ ] Lessons learned documented

### Incident Categories

| Category | Count | Trend | Action Required |
|----------|-------|-------|-----------------|
| Authentication failures | | | |
| Authorization violations | | | |
| Data exposure | | | |
| Availability incidents | | | |
| AI-specific incidents | | | |

### Evidence Collection

| Item | Evidence Required | Storage Location |
|------|-------------------|------------------|
| Incident Summary | Anonymized incident list | Compliance/Incidents/ |
| Trend Analysis | Pattern report with recommendations | Compliance/Incidents/ |
| Postmortem Archive | Completed postmortems | Compliance/Incidents/Postmortems/ |

## Audit Summary

- [ ] All sections completed
- [ ] Evidence collected and organized
- [ ] Findings documented with severity
- [ ] Remediation plan created for open items
- [ ] Executive summary prepared
- [ ] Next audit scheduled

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All CRITICAL items pass, no critical/high findings open, evidence complete |
| **CONDITIONAL** | All CRITICAL items pass, medium findings open with remediation plan < 30 days |
| **FAIL** | Any CRITICAL item fails OR critical/high findings open — block until resolved |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

## Waiver Process

For non-critical items that cannot be addressed:
1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (Product Owner or Technical Lead)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Access Control Review | CRITICAL | Minor RBAC gaps | Secrets exposed or orphaned admin accounts |
| Vulnerability Assessment | CRITICAL | Medium CVEs with plan | Critical/High CVEs unpatched |
| Penetration Test Results | CRITICAL | Medium findings open | Critical/High findings open |
| Compliance Verification | CRITICAL | Minor evidence gaps | Framework compliance failure |
| Tenant Isolation Verification | CRITICAL | Minor isolation gaps | Cross-tenant access possible |
| Incident History Review | Non-critical | Incomplete analysis | N/A |

## Recovery Protocol

**If gate triggers CONDITIONAL or FAIL status:**

1. **Attempt 1:** Immediate security remediation (target: 1-3 days)
   - Prioritize critical/high findings for remediation
   - Apply compensating controls where immediate fix not possible
   - Execute fixes with security team review
   - Re-run security validation
   - **Lock passed categories**

2. **Attempt 2:** Deep security investigation (target: 1 week)
   - Engage external security consultants if needed
   - Conduct focused penetration testing on failed areas
   - Retest to confirm findings resolved
   - Update evidence repository
   - Re-evaluate gate status
   - **Preserve locked categories**

3. **Mandatory Course Correction:**
   - Escalate to CISO and Engineering Leadership
   - Document security blockers with risk assessment
   - Conduct security architecture review
   - Consider feature removal if security cannot be assured
   - Schedule security audit within 30 days

## Web Research Verification

- [ ] Search the web: "SaaS security audit checklist best practices {date}" - Verify audit coverage
- [ ] Search the web: "multi-tenant penetration testing patterns {date}" - Confirm pentest approaches are current
- [ ] Search the web: "SOC 2 GDPR compliance multi-tenant {date}" - Verify compliance framework requirements
- [ ] _Source: [URL]_ citations documented for key security audit decisions

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Security isolation design
- `bmad-bam-tenant-aware-observability` - Security monitoring setup
- `bmad-bam-incident-response-operations` - Security incident handling
- `bmad-bam-disaster-recovery-design` - Security recovery procedures

**PASS CRITERIA:** All CRITICAL items completed, no open critical/high findings, evidence collected
**OWNER:** Security Team Lead
**REVIEWERS:** CISO, Compliance Officer, External Auditor (if applicable)
