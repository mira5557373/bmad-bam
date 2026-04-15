# Step 20: Load Artifact (Validate Mode)

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

This step loads the Module Architecture artifact for validation along with the Master Architecture for constraint checking. The module architecture defines a specific functional component of the platform, and must align with the overarching system design established in the master architecture.

---

## Prerequisites

- Module architecture has been created (Create mode completed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts



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

Load the existing module architecture document from:
- `{output_folder}/planning-artifacts/modules/{module-name}/architecture.md`

Also load the master architecture from:
- `{output_folder}/planning-artifacts/master-architecture.md` for constraint validation

---

## Pre-Validation Checks

Before proceeding, verify the following conditions:
- The module architecture file exists at the specified path
- The master architecture file exists for cross-reference validation
- Both files are readable and contain valid markdown
- Module name placeholder is resolved to actual module identifier

---

## Expected Artifact Structure

The module architecture should contain these required sections:
- Module Overview with purpose and scope
- Interface Definitions for module boundaries
- Internal Component Design and responsibilities
- Data Model specific to the module
- Integration Points with other modules
- Dependency Declarations on shared services
- Conformance Statement to master architecture constraints

---

## Error Handling Guidance

If the module architecture file does not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

If the master architecture is missing, warn that constraint validation cannot be performed but offer to proceed with structural validation only.

If the module name cannot be resolved, prompt the user to specify which module should be validated.

---

## COLLABORATION MENUS (A/P/C):

After loading the artifact, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into artifact structure concerns
- **P (Party Mode)**: Bring QA and architect perspectives on validation approach
- **C (Continue)**: Proceed to detailed validation against QG-M1 criteria
- **[Specific concerns]**: Describe pre-validation concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: loaded artifact structure, missing sections, pre-validation status
- Process enhanced insights on validation readiness
- Ask user: "Accept this validation readiness assessment? (y/n)"
- If yes, document any caveats for validation
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review module architecture artifact readiness for QG-M1 validation"
- Process QA and architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm artifact loaded successfully
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

- Loaded artifact ready for validation

---

## Next Step

Once both artifacts are successfully loaded and initial structure is confirmed, proceed to `step-21-v-validate.md` to perform detailed quality criteria checks including master architecture conformance.
