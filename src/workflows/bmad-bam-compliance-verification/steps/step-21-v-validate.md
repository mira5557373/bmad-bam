# Step 21: Validate Compliance Verification

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

Validate the compliance verification artifacts against quality criteria and regulatory framework requirements for multi-tenant AI platforms.

---

## Prerequisites

- Previous step completed (step-20-v-load-artifact.md)
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **Load quality gate:** `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-CP1`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-cp1-compliance.md`

---

## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/` specified location
- Parse and validate structure

### 2. Validate Content

- Check all required sections are present
- Verify cross-references are valid
- Validate against quality gate checklist

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

## Validation Checklist

### Framework Coverage
- [ ] All applicable compliance frameworks identified (SOC2, GDPR, HIPAA, PCI-DSS, ISO 27001)
- [ ] Framework applicability justified based on tenant types and data handled
- [ ] No framework gaps for regulated tenants
- [ ] Framework version/edition specified where applicable

### Control Implementation
- [ ] All required controls mapped to platform components
- [ ] Control implementation evidence documented
- [ ] Control ownership assigned
- [ ] Control testing methodology defined
- [ ] No critical controls missing implementation

### Data Handling Compliance
- [ ] Data classification scheme applied
- [ ] Encryption requirements met (at rest and in transit)
- [ ] Data retention policies defined
- [ ] Data deletion procedures documented (right to be forgotten)
- [ ] Data residency requirements addressed

### Access Control Compliance
- [ ] RBAC/ABAC implementation documented
- [ ] MFA requirements met for all access levels
- [ ] Least privilege principle applied
- [ ] Access review procedures defined
- [ ] Privileged access management in place

### Audit Logging Compliance
- [ ] All security-relevant events logged
- [ ] Log retention meets framework requirements
- [ ] Log immutability guaranteed
- [ ] Log access controls implemented
- [ ] Audit trail completeness verified

### Tenant Isolation Compliance
- [ ] Tenant data isolation verified
- [ ] Cross-tenant data access prevented
- [ ] Tenant-specific compliance configurations supported
- [ ] Multi-tenant audit trail separation confirmed

### Remediation Plan Quality
- [ ] All gaps have remediation actions defined
- [ ] Remediation owners assigned
- [ ] Due dates are realistic and prioritized
- [ ] Acceptance criteria specified
- [ ] Progress tracking mechanism in place

### QG-CP1 Compliance Policy Gate Verification
**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-CP1`

- [ ] **all_controls_implemented** (REQUIRED): All required compliance controls have evidence of implementation
- [ ] **no_critical_gaps** (REQUIRED): Zero critical severity findings without remediation
- [ ] **audit_logging_verified** (REQUIRED): Audit logging meets all framework requirements
- [ ] **data_handling_compliant** (REQUIRED): Data handling practices comply with all applicable frameworks
- [ ] **remediation_plan_approved**: All gaps have approved remediation plans with owners

**QG-CP1 verification_tests (from CSV):** all_controls_implemented, no_critical_gaps, audit_logging_verified, data_handling_compliant

**QG-CP1 Required Patterns:**
| Pattern | Required | Status | Evidence |
|---------|----------|--------|----------|
| all_controls_implemented | **YES** | [ ] Pass / [ ] Fail | Control implementation matrix |
| no_critical_gaps | **YES** | [ ] Pass / [ ] Fail | Findings severity analysis |
| audit_logging_verified | **YES** | [ ] Pass / [ ] Fail | Logging coverage report |
| data_handling_compliant | **YES** | [ ] Pass / [ ] Fail | Data handling assessment |
| remediation_plan_approved | NO | [ ] Pass / [ ] Fail | Remediation plan sign-off |

**QG-CP1 Compliance Policy Gate:** [ ] SATISFIED / [ ] NOT SATISFIED

---

## Gate Decision

- **PASS**: All required controls implemented, no critical gaps, audit logging verified, data handling compliant
- **CONDITIONAL**: No critical gaps, high/medium gaps have approved remediation plans with deadlines
- **FAIL**: Critical gaps exist, required controls missing, or audit logging incomplete

### QG-CP1 Exit Criteria
This workflow validates QG-CP1 (Compliance Policy Gate). Upon PASS:
- Platform compliance posture is verified
- Compliance documentation ready for external audit
- Production deployment can proceed from compliance perspective

Present validation results with specific findings for each section.

---

## Error Handling

### FAIL Outcome Recovery Steps

#### Step 1: Categorize the Failure
Identify which category caused the FAIL:

| Failure Category | Severity | Recovery Path |
|------------------|----------|---------------|
| Missing required control | CRITICAL | Return to step-03-c-verify-access-controls.md |
| Critical compliance gap | CRITICAL | Security review required before retry |
| Audit logging incomplete | CRITICAL | Return to step-04-c-test-audit-logging.md |
| Data handling violation | CRITICAL | Data handling review required |
| Remediation plan incomplete | HIGH | Update remediation-plan.md |

#### Step 2: Critical Failure Remediation

**For Missing Required Control:**
1. Identify the missing control and framework requirement
2. Return to relevant Create mode step
3. Implement control with evidence documentation
4. Re-run validation

**For Critical Compliance Gap:**
1. STOP ALL DEPLOYMENT ACTIVITIES - This is a regulatory risk
2. Document exactly what compliance requirement is not met
3. Escalate to compliance officer immediately
4. Do not proceed until explicit approval received
5. Implement remediation with mandatory compliance review
6. Re-run validation

**For Audit Logging Incomplete:**
1. Identify missing log coverage
2. Return to `steps/step-04-c-test-audit-logging.md`
3. Add missing audit events
4. Verify log retention and immutability
5. Re-run validation

**For Data Handling Violation:**
1. Document the specific violation
2. Review data handling practices against framework requirements
3. Implement corrective measures
4. Update data handling documentation
5. Re-run validation

#### Step 3: Re-Validation Protocol
After remediation:
1. Document what was fixed and why
2. Return to `steps/step-20-v-load-artifact.md` to reload artifacts
3. Re-run this validation step
4. If FAIL persists after 2 attempts, escalate to mandatory course correction

### Recovery Attempt Tracking

| Attempt | Max Allowed | Action on Exceed |
|---------|-------------|------------------|
| 1 | - | Fix and retry |
| 2 | - | Fix and retry with peer review |
| 3+ | EXCEEDED | Mandatory course correction - escalate to project leadership |

### Escalation Contacts
When escalation is required:
1. Compliance Officer - for regulatory gap issues
2. Security Architect - for control implementation issues
3. Project Leadership - for mandatory course correction after 2 failed attempts

### Post-Recovery Documentation
After successful recovery:
1. Document root cause of the failure
2. Update compliance checklists if requirements were unclear
3. Consider adding automated compliance checks for the failure mode
4. Update this workflow's error handling if new patterns discovered

---

## COLLABORATION MENUS (A/P/C):

After completing validation checks, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings and compliance edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for validation review
- **C (Continue)**: Accept validation results and proceed to generate report
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass validation context: findings, gate decision, gaps identified
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into validation results
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review compliance validation: {summary of findings and gate decision}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

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
- Remediation recommendations (if CONDITIONAL or FAIL)

---

## Next Step

Proceed to `step-22-v-generate-report.md` for detailed validation report generation.
