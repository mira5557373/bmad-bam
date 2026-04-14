# Step 21: Validate Production Readiness

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

Validate the production readiness artifacts against QG-OC (Operational Checklist Gate) criteria and multi-tenant platform go-live standards.

---

## Prerequisites

- Previous step completed (step-20-v-load-artifact.md)
- **Load checklist:** `{project-root}/_bmad/bam/checklists/production-checklist.md`
- **Load checklist:** `{project-root}/_bmad/bam/checklists/qg-operations-continuous.md`

---

## Inputs

- Loaded artifacts from validation step 20
- Quality gate criteria and checklist
- Previous validation findings (if re-validating)

---

## Actions

### 1. Load Artifact

- Read the artifacts from `{output_folder}/operations/` location
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

### Gate Verification
- [ ] All security gates verified (QG-S4, QG-I3)
- [ ] Data protection gates verified (QG-DR1)
- [ ] Compliance gates verified (QG-CP1)
- [ ] Code quality gates verified (QG-CC, QG-F1, QG-M2, QG-P1)
- [ ] No blocking dependencies remain
- [ ] All CONDITIONAL gates have mitigation plans with deadlines

### Infrastructure Readiness
- [ ] Capacity planning documented and verified
- [ ] High availability configuration verified
- [ ] Scaling policies defined and tested
- [ ] Network connectivity verified
- [ ] Resource provisioning automated
- [ ] Infrastructure monitoring active

### Observability Validation
- [ ] Monitoring coverage for all components (100%)
- [ ] Alerting rules defined for critical paths
- [ ] Notification channels configured and tested
- [ ] Logging infrastructure operational
- [ ] Log retention policies defined
- [ ] Distributed tracing enabled
- [ ] Dashboards created for key metrics

### Disaster Recovery
- [ ] RTO requirements defined and achievable
- [ ] RPO requirements defined and achievable
- [ ] Backup procedures documented and tested
- [ ] Restore procedures documented and tested
- [ ] Failover mechanisms verified
- [ ] DR runbook complete
- [ ] DR test results documented with date

### Operational Readiness
- [ ] Runbooks complete for all critical operations
- [ ] On-call schedules defined
- [ ] Escalation paths documented
- [ ] Incident response procedures defined
- [ ] Communication templates prepared
- [ ] Rollback procedures documented and tested
- [ ] Post-incident review process defined

### Risk Assessment
- [ ] All identified risks have likelihood assessment
- [ ] All identified risks have impact assessment
- [ ] Mitigation strategies defined for each risk
- [ ] Risk owners assigned
- [ ] Risk acceptance documented where applicable

### Cross-Cutting Validation
- [ ] Go-live checklist complete
- [ ] All checklist items assigned owners
- [ ] Launch timeline defined
- [ ] Communication plan prepared
- [ ] Success criteria defined

### QG-OC Operational Checklist Gate Verification

**Gate Reference:** Load from `{project-root}/_bmad/bam/checklists/qg-operations-continuous.md`

| QG-OC Pattern | Required | Status | Evidence |
|---------------|----------|--------|----------|
| gates_passed | **YES** | [ ] Pass / [ ] Fail | Gate verification section |
| infrastructure_verified | **YES** | [ ] Pass / [ ] Fail | Infrastructure assessment |
| observability_complete | **YES** | [ ] Pass / [ ] Fail | Observability validation |
| dr_tested | **YES** | [ ] Pass / [ ] Fail | DR test results |
| procedures_documented | **YES** | [ ] Pass / [ ] Fail | Operational readiness |
| risks_assessed | NO | [ ] Pass / [ ] Fail | Risk assessment |

**QG-OC verification_tests:** gates_passed, infrastructure_verified, observability_complete, dr_tested, procedures_documented

**QG-OC Operational Checklist Gate:** [ ] SATISFIED / [ ] NOT SATISFIED

---

## Gate Decision

- **PASS**: All required items verified, all QG-OC patterns satisfied
- **CONDITIONAL**: Minor gaps (e.g., non-critical alerts missing) - document gaps, proceed with mitigation plan
- **FAIL**: Any critical item missing or QG-OC critical patterns failing - address issues before proceeding

### QG-OC Exit Criteria
This workflow validates the QG-OC gate. Upon PASS:
- Production readiness is confirmed
- Go-live may proceed with documented recommendation

Present validation results with specific findings for each section.

---

## Error Handling

### FAIL Outcome Recovery Steps

#### Step 1: Categorize the Failure
Identify which category caused the FAIL:

| Failure Category | Severity | Recovery Path |
|------------------|----------|---------------|
| Gate not passed | CRITICAL | Address gate failure, re-run gate |
| Infrastructure not verified | CRITICAL | Return to step-02-c-assess-infrastructure |
| Observability incomplete | HIGH | Return to step-03-c-validate-observability |
| DR not tested | CRITICAL | Return to step-04-c-test-disaster-recovery |
| Procedures not documented | HIGH | Return to step-05-c-review-procedures |

#### Step 2: Critical Failure Remediation

**For Gate Not Passed:**
1. Identify which gate(s) failed
2. Run the appropriate gate verification workflow
3. Address gate failures
4. Re-run production readiness validation

**For Infrastructure Not Verified:**
1. Review infrastructure assessment findings
2. Address capacity, HA, or scaling gaps
3. Document verification results
4. Re-run validation

**For DR Not Tested:**
1. Schedule and execute DR test
2. Document RTO/RPO results
3. Update DR runbook if needed
4. Re-run validation

#### Step 3: Re-Validation Protocol
After remediation:
1. Document what was fixed and why
2. Return to `step-20-v-load-artifact.md` to reload artifacts
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
1. Platform Architect - for infrastructure or DR issues
2. Security Architect - for gate or compliance issues
3. Project Leadership - for mandatory course correction after 2 failed attempts

---

## COLLABORATION MENUS (A/P/C):

After completing validation checks, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings and edge cases
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
- Context: "Review production readiness validation: {summary of findings and gate decision}"
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

Proceed to `step-22-v-generate-report.md` to generate the validation report.
