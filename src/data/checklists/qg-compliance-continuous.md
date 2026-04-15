# QG-CC: Continuous Compliance Checklist

> Gate ID: QG-CC (Compliance Continuous)
> Compliance posture MUST be verified continuously in production.
> Gate definition: verifies automated compliance monitoring, evidence collection, and audit readiness.
> Workflow integration: BAM compliance workflows feed into this gate.
> Executing workflow: `compliance-verification`
>
> **Operational Gate:** Unlike pre-release gates, QG-CC is evaluated continuously
> during production operations. Failures trigger compliance remediation reviews.

## Framework Coverage Verification

### GDPR Compliance

- [ ] Consent management system operational
- [ ] Data subject access request (DSAR) queue monitored
- [ ] Right to erasure (RTBF) procedures tested
- [ ] Data retention policies enforced automatically
- [ ] Cross-border data transfer controls verified
- [ ] Privacy impact assessments current
- [ ] Data protection officer contact accessible
- [ ] Breach notification procedures tested (<72 hours)

### SOC 2 Compliance

- [ ] Access control effectiveness verified
- [ ] Change management procedures followed
- [ ] Security incident response documented
- [ ] Vendor management controls active
- [ ] Business continuity plans tested
- [ ] System monitoring evidence collected
- [ ] Risk assessment completed annually
- [ ] Penetration testing scheduled and completed

### HIPAA Compliance (if applicable)

- [ ] PHI access logging verified
- [ ] Business Associate Agreements (BAA) current
- [ ] Encryption at rest and in transit verified
- [ ] Minimum necessary access enforced
- [ ] Administrative safeguards documented
- [ ] Physical safeguards verified
- [ ] Technical safeguards operational
- [ ] Training records current

### ISO 27001 Compliance (if applicable)

- [ ] Information Security Management System (ISMS) operational
- [ ] Risk register updated quarterly
- [ ] Control effectiveness measured
- [ ] Internal audit scheduled
- [ ] Management review completed
- [ ] Corrective actions tracked
- [ ] Documentation current
- [ ] Continuous improvement demonstrated

### EU AI Act Compliance (if applicable)

- [ ] AI system risk classification documented
- [ ] High-risk AI transparency requirements met
- [ ] Human oversight mechanisms verified
- [ ] AI system documentation complete
- [ ] Conformity assessment completed (if required)
- [ ] AI registry submission current
- [ ] Bias monitoring active
- [ ] Incident reporting procedures defined

## Evidence Collection Automation

### Automated Evidence Gathering

- [ ] Access control logs collected automatically
- [ ] Change management records captured
- [ ] Security event logs aggregated
- [ ] Configuration drift detection active
- [ ] Policy compliance scans scheduled
- [ ] Vulnerability scan results archived
- [ ] Training completion records tracked
- [ ] Vendor assessment records maintained

### Evidence Repository Management

- [ ] Evidence repository accessible to auditors
- [ ] Evidence retention periods enforced
- [ ] Evidence integrity verified (hash validation)
- [ ] Evidence chain of custody documented
- [ ] Evidence search and retrieval functional
- [ ] Evidence export capability tested

## Compliance Dashboard

### Real-Time Compliance Metrics

- [ ] Compliance score displayed per framework
- [ ] Non-compliance items highlighted with severity
- [ ] Remediation deadlines tracked
- [ ] Compliance trend analysis (30/60/90 day)
- [ ] Executive summary dashboard available
- [ ] Auditor view access configured

### Tenant-Specific Compliance

- [ ] Per-tenant compliance status visible
- [ ] Tenant data residency compliance verified
- [ ] Tenant-specific framework requirements tracked
- [ ] Enterprise tenant SLA compliance monitored
- [ ] Tenant compliance certification status tracked

## Audit Readiness

### Audit Preparation

- [ ] Audit scope documentation current
- [ ] Evidence packages pre-generated
- [ ] Auditor access procedures documented
- [ ] Audit timeline and milestones defined
- [ ] Key personnel availability confirmed
- [ ] Previous audit findings addressed

### Audit Support

- [ ] Auditor inquiry response process defined
- [ ] Evidence request fulfillment SLA: <24 hours
- [ ] Supplemental evidence generation capability
- [ ] Audit finding tracking system ready
- [ ] Remediation workflow documented

---

## Required Templates

- `{project-root}/_bmad/bam/data/templates/compliance-test-report-template.md` - Compliance verification test reporting
- `{project-root}/_bmad/bam/data/templates/compliance-framework-template.md` - Compliance framework documentation
- `{project-root}/_bmad/bam/data/templates/audit-evidence-collection-template.md` - Audit evidence collection

---

## Web Research Verification

- [ ] Search the web: "quality gate best practices enterprise SaaS {date}" - Verify gate criteria
- [ ] Search the web: "multi-tenant platform validation patterns {date}" - Confirm validation approach
- [ ] _Source: [URL]_ citations documented for key decisions

## Related Patterns

Load decision criteria from pattern registry:

- **Compliance patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **Security patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `security-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "compliance automation SaaS platforms {date}"
- Search: "continuous compliance monitoring best practices {date}"
- Search: "audit readiness automation {date}"
- Search: "multi-tenant compliance verification {date}"

## Gate Decision

| Outcome | Criteria |
|---------|----------|
| **PASS** | All categories GREEN - Continue monitoring |
| **CONDITIONAL** | Any CRITICAL category YELLOW - Remediate within 30 days, proceed with mitigation plan |
| **FAIL** | Any CRITICAL category RED - Immediate remediation required, block release |
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

| Category                    | Classification | CONDITIONAL Threshold | FAIL Threshold |
| --------------------------- | -------------- | ----------------- | ----------------------- |
| GDPR Compliance             | CRITICAL       | Score <90%        | Score <70%              |
| SOC 2 Compliance            | CRITICAL       | Score <90%        | Score <70%              |
| HIPAA Compliance            | CRITICAL       | Any control gap   | PHI exposure risk       |
| ISO 27001 Compliance        | Non-critical   | Score <85%        | Score <70%              |
| EU AI Act Compliance        | CRITICAL       | Missing docs      | High-risk unclassified  |
| Evidence Collection         | CRITICAL       | Gaps in evidence  | Evidence unavailable    |
| Compliance Dashboard        | Non-critical   | Metrics delayed   | Dashboard unavailable   |
| Audit Readiness             | CRITICAL       | Prep incomplete   | Audit at risk           |

## Recovery Protocol

**If QG-CC triggers CONDITIONAL or FAIL status:**

1. **Attempt 1:** Immediate remediation (target: 7 days)
   - Identify failed compliance controls per framework
   - Review evidence gaps and collection failures
   - Execute compliance scans for affected frameworks
   - Update control documentation where missing
   - Verify automated evidence collection is operational
   - Re-evaluate gate status after fixes
   - **Lock compliant categories** — focus on gaps

2. **Attempt 2:** Deep remediation sprint (target: 2 weeks)
   - Engage Compliance Officer and Legal team
   - Analyze root cause of compliance gaps
   - Review framework requirement interpretations
   - Implement missing controls with evidence collection
   - Update compliance automation rules
   - Conduct internal compliance audit
   - Re-evaluate gate status after remediation
   - **Preserve locked categories** from Attempt 1

3. **Mandatory Course Correction:**
   - Escalate to CISO, Legal, and Executive team
   - Document compliance gaps with risk assessment
   - Engage external compliance consultants if needed
   - Create remediation plan with regulatory deadlines
   - Consider service limitations for affected tenants
   - Prepare regulatory notification if required
   - Define compensating controls timeline
   - Schedule follow-up assessment within 30 days

**Category-Specific Recovery:**

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| GDPR Compliance | Review consent, DSAR queue | Breach notification risk |
| SOC 2 Compliance | Fix control gaps, collect evidence | Audit finding unresolved |
| HIPAA Compliance | Verify PHI controls, BAA status | PHI exposure detected |
| ISO 27001 Compliance | Update risk register, controls | ISMS gaps identified |
| EU AI Act Compliance | Classify AI systems, document | High-risk AI unclassified |
| Evidence Collection | Fix automation, verify repository | Evidence unavailable |
| Audit Readiness | Complete prep, assign personnel | Audit timeline at risk |

## Related Workflows

- `bmad-bam-compliance-verification` - Compliance validation
- `bmad-bam-tenant-aware-observability` - Audit logging setup
- `bmad-bam-security-operations-verification` - Security controls

**PASS CRITERIA:** All compliance scores >= 90%, evidence collection operational
**OWNER:** Compliance Officer
**REVIEWERS:** CISO, Legal, External Auditors
