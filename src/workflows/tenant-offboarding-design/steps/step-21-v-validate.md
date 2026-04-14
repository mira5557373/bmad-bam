# Step 21: Validate Tenant Offboarding Design

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

This step validates the completeness and quality of the tenant offboarding design, ensuring compliance-aware data handling, proper resource cleanup, and safe deprovisioning procedures.

---

## Prerequisites

- Step 20: Load Artifact completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: event-driven`



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

---

## Verification

### Deprovisioning Stages
- [ ] All deprovisioning stages defined with clear timing
- [ ] Stage ordering respects dependencies
- [ ] Grace periods defined per trigger type
- [ ] Cancellation points clearly marked
- [ ] Authorization requirements per stage documented
- [ ] Notification sequence defined

### Data Retention
- [ ] Data classification complete (all data types covered)
- [ ] Retention periods defined per tier
- [ ] GDPR data export requirements documented
- [ ] Right to be forgotten procedure defined
- [ ] Anonymization rules specified
- [ ] Compliance data retention meets regulatory minimums
- [ ] Data export package structure defined

### Active Resource Handling
- [ ] All session types have handling strategy
- [ ] All job types have completion/termination strategy
- [ ] Agent shutdown sequence defined
- [ ] Integration disconnection procedures defined
- [ ] Resource lock mechanism documented
- [ ] Notification sequence defined

### Cleanup Isolation
- [ ] Database cleanup procedure defined
- [ ] Cache cleanup procedure defined
- [ ] Storage cleanup procedure defined
- [ ] Search index cleanup procedure defined
- [ ] Vector store cleanup procedure defined
- [ ] Analytics data cleanup procedure defined
- [ ] Verification checklist complete
- [ ] Cleanup audit log/certificate generated

### Runbook Completeness
- [ ] Automated offboarding flow documented
- [ ] All trigger types defined with policies
- [ ] Manual intervention scenarios listed
- [ ] Rollback procedure for reactivation defined
- [ ] Emergency offboarding procedure defined
- [ ] Monitoring and alerting defined
- [ ] Compliance reporting defined

### Cross-Cutting
- [ ] Consistent with tenant onboarding design (inverse operations)
- [ ] Consistent with tenant model isolation design
- [ ] GDPR/compliance requirements fully addressed
- [ ] No data orphaning possible
- [ ] Audit trail complete for all operations
- [ ] Patterns align with pattern registry

---

## Gate Decision

- **PASS**: All stages defined, retention compliant, cleanup complete, runbook operational
- **CONDITIONAL**: Minor gaps (e.g., specific retention values: 30 days grace period before deletion, 90 days archive for compliance data, 7 years for billing/audit records, immediate deletion for PII upon request) - document gaps and proceed
- **FAIL**: Missing deprovisioning stages, non-compliant retention, or incomplete cleanup - return to Create mode

Present validation results with specific findings for each section.

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
- Context: "Review offboarding validation: {summary of findings and gate decision}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation results
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-generate-report.md`

---

## Outputs

- Validated tenant offboarding design
- Validation gate decision (PASS/CONDITIONAL/FAIL)
- Compliance gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)

---

## Next Step

If PASS: Offboarding design complete, ready for implementation sprint planning.
If CONDITIONAL: Document gaps with remediation timeline and proceed to implementation with noted limitations.
If FAIL: Return to Create mode to address missing stages, compliance gaps, or cleanup procedures.
