# Step 1: Load Artifact

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

This step loads the Module Validation Report for meta-validation. The validation report documents the quality gate results (QG-M1, QG-M2, QG-M3), findings, and overall decision for a specific module's architecture and implementation readiness.

---

## Prerequisites

- Module validation has been executed (Create mode completed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries,tenant-isolation



---

## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/` specified location
- Parse and validate structure
- Verify document integrity

### 2. Validate Content

- Check all required sections are present
- Verify cross-references are valid
- Validate against quality gate checklist

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

---

## Artifact Locations

Load the validation report:
- `{output_folder}/planning-artifacts/modules/{module-name}/validation-report.md`

If the file does not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

## Also Load Context

- Module architecture: `{output_folder}/planning-artifacts/modules/{module-name}/architecture.md`
- Master architecture: `{output_folder}/planning-artifacts/architecture/master-architecture.md`
- Sprint status: `{output_folder}/sprint-status.yaml`

## Parse Report Structure

Extract for meta-validation:

1. **Report Metadata**
   - Validation date
   - Validator identity
   - Module name

2. **Gate Results**
   - QG-M1 status
   - QG-M2 status
   - QG-M3 status
   - Overall decision

3. **Findings**
   - Blocking issues count
   - Warnings count
   - Recommendations count

4. **Consistency Check Data**
   - Module architecture modification date
   - Validation report date
   - Sprint status module state

Prepare data for meta-validation in Step 2.

---

## COLLABORATION MENUS (A/P/C):

After loading artifact, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report structure or consistency check data
- **P (Party Mode)**: Bring QA and architect perspectives on validation report
- **C (Continue)**: Accept loaded artifact and proceed to meta-validation
- **[Specific refinements]**: Describe specific areas to examine

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: report metadata, gate results, findings summary
- Process enhanced insights on report completeness
- Ask user: "Accept this detailed report analysis? (y/n)"
- If yes, integrate into validation context
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review module validation report for meta-validation"
- Process QA and architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation context
- Update frontmatter `stepsCompleted: [20]`
- Proceed to next step: `step-21-v-validate.md`

---

## Verification

- [ ] Artifact loaded successfully
- [ ] All required sections present
- [ ] Document structure matches expected format
- [ ] No placeholder content remaining
- [ ] Patterns align with pattern registry

---

## Outputs

Confirm successful loading with:
- Report metadata (date, validator, module name)
- Gate results summary (QG-M1, QG-M2, QG-M3)
- Findings count by severity
- Staleness check status

---

## Next Step

Once the validation report is successfully loaded and structure is confirmed, proceed to Step 2: Validate Validation Report to perform meta-validation of report quality and consistency.
