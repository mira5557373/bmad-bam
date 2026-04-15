# Step 21: Validate Tool Contract Validation

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

## Purpose

This step performs meta-validation of the tool contract validation report, ensuring that all required validation areas were covered, results are consistent, and tenant isolation is properly verified.

## Prerequisites

- Step 20: Load Artifact completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`



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

### Tool Definition Loaded
- [ ] Tool definition was successfully located
- [ ] All required fields present in definition
- [ ] Tool category correctly identified
- [ ] Module owner identified

### Schema Validation
- [ ] JSON Schema validation was performed
- [ ] Input parameter schema validated
- [ ] Output schema validated
- [ ] Description quality assessed
- [ ] Idempotency correctly declared

### Permission Validation
- [ ] Required permissions declared
- [ ] Permission levels appropriate for operations
- [ ] Approval requirements checked
- [ ] Role mapping verified
- [ ] Sandbox configuration reviewed

### Tenant Context Validation
- [ ] Tenant context requirement verified
- [ ] Tenant isolation checked
- [ ] RLS integration confirmed
- [ ] Tenant-scoped logging verified
- [ ] Resource quotas respected

### Contract Tests
- [ ] Schema compliance tests executed
- [ ] Permission tests executed
- [ ] Tenant isolation tests executed
- [ ] Integration tests executed
- [ ] Test results documented

### Report Quality
- [ ] All validation areas have results
- [ ] Failures have specific details
- [ ] Recommendations are actionable
- [ ] Overall status reflects test results

### Cross-Cutting
- [ ] Validation is current (tool definition not changed since)
- [ ] All critical issues have recommendations
- [ ] No security gaps in permission model
- [ ] Tenant isolation is comprehensive
- [ ] Patterns align with pattern registry

#### Checkpoint: Meta-Validation Complete

Before proceeding, confirm:
- [ ] All verification sections reviewed
- [ ] Gate decision determined
- [ ] Gaps documented (if any)

**STOP: Present the A/P/C menu to the user**

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file

---

## Gate Decision

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-M3-T`

**Load Checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m3-tools.md`

- **PASS**: All validation areas covered, no critical failures, recommendations documented
- **CONDITIONAL**: Minor gaps in validation coverage - note gaps
- **FAIL**: Critical validation areas missing, security issues unaddressed, or tenant isolation failures - return to Create mode

Present validation results with specific findings for each category.

## Outputs

- Meta-validated tool contract report
- Validation gate decision (PASS/CONDITIONAL/FAIL)
- Coverage gaps documented (if CONDITIONAL)
- Re-validation requirements (if FAIL)

## Next Step

If PASS: Tool contract validated, proceed to integration testing.
If CONDITIONAL: Document coverage gaps, proceed with noted limitations.
If FAIL: Return to Create mode to complete missing validation areas.
