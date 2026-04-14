# Step 21: Validate Security Audit

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Validate the security audit artifacts against QG-SA1 quality criteria.

---

## Prerequisites

- Previous step completed (step-20-v-load-artifact.md)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `security`
- **Load quality gate:** `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-SA1`

---

## Validation Checklist

### Audit Scope
- [ ] Audit objectives documented
- [ ] Systems in scope enumerated
- [ ] Compliance frameworks identified
- [ ] Audit timeline established

### Access Control Review
- [ ] RBAC/ABAC policies reviewed
- [ ] Service accounts audited
- [ ] Privileged access verified
- [ ] Tenant isolation confirmed

### Vulnerability Assessment
- [ ] All scan types executed
- [ ] Vulnerabilities prioritized
- [ ] Remediation plans documented
- [ ] Tenant impact assessed

### Compliance Verification
- [ ] SOC 2 criteria verified
- [ ] GDPR requirements checked
- [ ] Tenant-specific compliance confirmed
- [ ] Gaps documented with remediation

### QG-SA1 Security Audit Gate Verification

| Pattern | Required | Status | Evidence |
|---------|----------|--------|----------|
| audit_scope_defined | **YES** | [ ] Pass / [ ] Fail | Scope document |
| access_review_complete | **YES** | [ ] Pass / [ ] Fail | Access review report |
| vulnerabilities_assessed | **YES** | [ ] Pass / [ ] Fail | Vulnerability report |
| compliance_verified | **YES** | [ ] Pass / [ ] Fail | Compliance report |
| findings_documented | **YES** | [ ] Pass / [ ] Fail | Findings with remediation |

**QG-SA1 Security Audit Gate:** [ ] SATISFIED / [ ] NOT SATISFIED

---

## Gate Decision

- **PASS**: All required patterns verified, audit complete
- **CONDITIONAL**: Minor gaps documented, proceed with remediation tracking
- **FAIL**: Critical pattern failing - audit not complete

---

## COLLABORATION MENUS (A/P/C):

After completing validation checks, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings
- **P (Party Mode)**: Bring security and compliance perspectives
- **C (Continue)**: Accept validation results and proceed to generate report
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

#### If 'C' (Continue):
- Save validation results
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All validation checklist items evaluated
- [ ] Gate decision determined (PASS/CONDITIONAL/FAIL)
- [ ] Findings documented with specific details

---

## Outputs

- Validation report with findings
- Gate decision with rationale
- Remediation recommendations (if needed)

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate final validation report.
