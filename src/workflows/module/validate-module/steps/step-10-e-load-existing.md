# Step 1: Load Existing Artifact

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

This step loads the existing validation report for modification. Edit mode allows re-running specific quality gates, updating findings based on architecture changes, or marking issues as resolved without performing a complete validation from scratch.

Load the existing validation report for modification.

---

## Prerequisites

- Existing validation report to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts



---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Existing Artifact

- Locate artifact at `{output_folder}/`
- Parse document structure
- Extract modification scope

### 2. Verify Artifact State

- Check document is valid and complete
- Identify sections requiring updates
- Document current state

### 3. Prepare Edit Context

- Load relevant patterns and templates
- Identify dependencies
- Prepare modification workflow

---

---

## Load Artifacts

Load the existing validation report:
- `{output_folder}/planning-artifacts/modules/{module-name}/validation-report.md`

If the file does not exist, inform the user and suggest running validation in Create mode first.

## Also Load Context

- Module architecture: `{output_folder}/planning-artifacts/modules/{module-name}/architecture.md`
- Master architecture: `{output_folder}/planning-artifacts/architecture/master-architecture.md`
- Sprint status: `{output_folder}/sprint-status.yaml`

## Parse and Display Summary

Extract and present:

1. **Previous Validation Result**
   - Overall status (PASS/CONDITIONAL/FAIL)
   - Date of validation
   - Gate results (QG-M1, QG-M2, QG-M3)

2. **Previous Findings**
   - Blocking issues identified
   - Warnings documented
   - Recommendations made

3. **Current Module State**
   - Sprint-status.yaml module status
   - Any changes since last validation

## Confirm Modification Scope

Ask the user what modifications are needed:

- [ ] Re-run specific quality gate(s)
- [ ] Update findings based on architecture changes
- [ ] Mark issues as resolved
- [ ] Add new findings discovered manually
- [ ] Update recommendations
- [ ] Change overall gate decision

Capture the specific changes requested before proceeding.

---

## COLLABORATION MENUS (A/P/C):

After loading existing artifact, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into previous findings or validation history
- **P (Party Mode)**: Bring architect and QA perspectives on modification scope
- **C (Continue)**: Accept loaded artifact and proceed to apply changes
- **[Specific refinements]**: Describe specific areas to focus on

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: previous validation results, findings, module state changes
- Process enhanced insights on what has changed since last validation
- Ask user: "Accept this detailed analysis? (y/n)"
- If yes, integrate into modification scope
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review existing validation report for modification"
- Process architect and QA perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save modification scope to context
- Update frontmatter `stepsCompleted: [10]`
- Proceed to next step: `step-11-e-apply-changes.md`

---

## Verification

- [ ] Existing artifact loaded successfully
- [ ] Document structure parsed correctly
- [ ] Modification scope confirmed with user
- [ ] Patterns align with pattern registry

---

## Outputs

- Summary of previous validation results
- Confirmed list of modifications requested

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modification targets.
