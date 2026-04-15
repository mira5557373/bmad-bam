# Step 21: Validate Runbooks

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Validate the runbook collection against QG-OC (Operational Checklist Gate) criteria and operational documentation standards.

---

## Prerequisites

- Previous step completed (step-20-v-load-artifact.md)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `operations`
- **Load quality gate:** `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-OC`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-operations-continuous.md`

---

## Inputs

- Loaded runbooks from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### 1. Load Artifact

- Confirm runbooks from Step 20 are loaded
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

### Runbook Collection Completeness
- [ ] Runbook collection index exists
- [ ] All referenced runbooks exist
- [ ] Ownership assigned for each runbook
- [ ] Review cadence established

### Incident Response Runbook
- [ ] Incident classification levels defined (SEV1-SEV4)
- [ ] Response procedures for each severity level
- [ ] Communication templates provided
- [ ] Escalation paths defined with contacts
- [ ] Post-incident review process documented

### AI Operations Runbook
- [ ] Model deployment procedures documented
- [ ] Model rollback procedures documented
- [ ] Kill switch procedure documented
- [ ] LLM provider failover documented
- [ ] Tenant-aware AI operations covered

### Routine Operations
- [ ] Maintenance procedures documented
- [ ] Scaling procedures documented
- [ ] Backup/restore procedures documented
- [ ] Monitoring and alerting procedures documented

### Contact Information
- [ ] On-call escalation matrix present
- [ ] Contact information verified current
- [ ] Alternative contacts provided
- [ ] External vendor contacts included (LLM providers)

### Accessibility
- [ ] Runbooks accessible to on-call engineers
- [ ] Runbooks available during incident (not dependent on failing services)
- [ ] Quick reference guides for common scenarios
- [ ] Search/navigation aids present

### Testing
- [ ] Critical procedures tested via dry-run
- [ ] Test results documented
- [ ] Known gaps documented with mitigation

---

## QG-OC Operational Checklist Gate Verification

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-OC`

| QG-OC Pattern | Required | Status | Evidence |
|---------------|----------|--------|----------|
| `critical_runbooks_documented` | **YES** | [ ] Pass / [ ] Fail | All critical runbooks exist |
| `procedures_tested` | **YES** | [ ] Pass / [ ] Fail | Dry-run results documented |
| `runbooks_accessible` | **YES** | [ ] Pass / [ ] Fail | Accessibility verification |
| `review_cadence_established` | **YES** | [ ] Pass / [ ] Fail | Review schedule documented |

**QG-OC Operational Checklist Gate:** [ ] SATISFIED / [ ] NOT SATISFIED

---

## Gate Decision

- **PASS**: All critical runbooks documented, procedures tested, runbooks accessible, review cadence established
- **CONDITIONAL**: Minor gaps (e.g., some non-critical procedures untested) - document gaps, proceed with mitigation plan
- **FAIL**: Missing critical runbooks, untested critical procedures, runbooks inaccessible - return to Create mode

---

## Error Handling

### FAIL Outcome Recovery Steps

#### Step 1: Categorize the Failure

Identify which category caused the FAIL:

| Failure Category | Severity | Recovery Path |
|------------------|----------|---------------|
| Missing critical runbook | CRITICAL | Return to step-02-c or step-03-c |
| Untested critical procedure | CRITICAL | Run dry-run, document results |
| Runbooks inaccessible | CRITICAL | Fix accessibility, verify access |
| Missing escalation contacts | HIGH | Update contacts, verify current |
| Incomplete procedures | HIGH | Document gaps, may proceed as CONDITIONAL |

#### Step 2: Critical Failure Remediation

**For Missing Critical Runbook:**
1. Identify the missing runbook type
2. Return to appropriate Create mode step
3. Create the missing runbook following templates
4. Re-run validation

**For Untested Critical Procedure:**
1. Schedule dry-run for the procedure
2. Execute dry-run with documented results
3. Update runbook with test results
4. Re-run validation

**For Runbooks Inaccessible:**
1. Verify hosting location is reliable
2. Test access from incident response context
3. Add backup access method
4. Re-run validation

#### Step 3: Re-Validation Protocol

After remediation:
1. Document what was fixed and why
2. Return to `steps/step-20-v-load-artifact.md` to reload artifacts
3. Re-run this validation step
4. If FAIL persists after 2 attempts, escalate to mandatory course correction

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
- Context: "Review runbook validation: {summary of findings and gate decision}"
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

Proceed to `step-22-v-generate-report.md` for final report generation.
