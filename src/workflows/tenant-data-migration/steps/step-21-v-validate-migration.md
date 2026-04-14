# Step 21: Validate Migration Plan Completeness

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

Validate the completeness and quality of the migration plan, ensuring all aspects are covered for safe and successful tenant data migration.

---

## Prerequisites

- Step 20: Load Migration Plan completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-lifecycle`
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

### Migration Scope Validation
- [ ] Source tenant fully identified with all attributes
- [ ] Target environment requirements documented
- [ ] Data volume estimates provided with methodology
- [ ] All data categories listed with dependencies
- [ ] Constraints (downtime, compliance) documented
- [ ] Migration type clearly identified

### Strategy Validation
- [ ] Strategy selection justified with rationale
- [ ] Strategy aligns with constraints identified in scope
- [ ] Alternative strategies considered and documented
- [ ] Risk assessment for chosen strategy provided

### Phase Definition Validation
- [ ] All phases numbered and ordered
- [ ] Phase dependencies explicitly stated
- [ ] Duration estimates provided for each phase
- [ ] Pre-conditions documented for each phase
- [ ] Post-conditions documented for each phase
- [ ] No circular dependencies exist

### Execution Procedure Validation
- [ ] Pre-migration checklist complete with specific checks
- [ ] Each phase has step-by-step commands
- [ ] Commands are specific (not generic placeholders)
- [ ] Environment-specific values parameterized
- [ ] Error handling instructions provided
- [ ] Verification steps follow each action

### Data Integrity Validation
- [ ] Checksum/hash verification defined
- [ ] Record count validation defined
- [ ] Referential integrity checks defined
- [ ] Sample data verification procedure defined
- [ ] Data transformation rules documented

### Rollback Validation
- [ ] Every phase has a rollback procedure
- [ ] Rollback procedures are idempotent
- [ ] Rollback decision criteria defined
- [ ] Point-of-no-return clearly identified
- [ ] Backup restore procedure documented
- [ ] Rollback testing plan defined

### Communication Validation
- [ ] All stakeholders identified
- [ ] Notification triggers defined
- [ ] Communication templates referenced
- [ ] Escalation path documented
- [ ] Emergency contacts listed with availability

### Operational Readiness
- [ ] Monitoring requirements specified
- [ ] Alert thresholds defined
- [ ] Dashboard/visibility tools identified
- [ ] On-call schedule for migration window
- [ ] Post-migration verification checklist

### Cross-Cutting Validation
- [ ] Consistent with tenant model isolation design
- [ ] Consistent with master architecture
- [ ] No conflicting requirements between phases
- [ ] Timing estimates sum to realistic total
- [ ] Resource requirements (personnel, systems) identified
- [ ] Patterns align with pattern registry

---

## Gate Decision

| Decision | Criteria |
|----------|----------|
| **PASS** | All critical checks pass, migration can proceed |
| **CONDITIONAL** | Minor gaps (e.g., specific timing: phase durations estimated at 30min pre-check, 2-4hr data transfer, 1hr validation, 30min cutover) - document and proceed with caution |
| **FAIL** | Missing phases, undefined rollback, or incomplete procedures - return to Create/Edit mode |

### PASS Criteria (all must be true):
- All phases have procedures and rollback
- Data integrity checks defined
- Communication plan complete
- Emergency contacts listed

### CONDITIONAL Criteria:
- PASS criteria met
- Some non-critical timing/details pending (typical values: 30min pre-check, 2-4hr transfer, 1hr validation)
- Document gaps with remediation deadline

### FAIL Criteria (any triggers fail):
- Missing phase definitions
- Phase without rollback procedure
- No data integrity verification
- No emergency contacts

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
- Context: "Review migration plan validation: {summary of findings and gate decision}"
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

- Validation report with gate decision
- Gap analysis (if CONDITIONAL)
- Required fixes list (if FAIL)
- Sign-off recommendation

---

## Next Step

| Decision | Next Step |
|----------|-----------|
| PASS | Migration plan approved, schedule migration window |
| CONDITIONAL | Document gaps, obtain approval with limitations, schedule |
| FAIL | Return to Edit mode to address gaps |
