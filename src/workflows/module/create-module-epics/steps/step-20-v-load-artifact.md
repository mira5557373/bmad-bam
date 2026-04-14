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

This step loads the Module Epics artifact for validation along with the module architecture for alignment checking. The epics document defines the implementation work breakdown, story structure, and acceptance criteria for building the module.

---

## Prerequisites

- Module epics have been created (Create mode completed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts



---

## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/checklists/`
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

Load the epics document:
- `{output_folder}/planning-artifacts/modules/{module-name}/epics.md`

If the file does not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

---

## Also Load Context for Validation

- Module architecture: `{output_folder}/planning-artifacts/modules/{module-name}/architecture.md`
- Master architecture: `{output_folder}/planning-artifacts/architecture/master-architecture.md`
- Sprint status: `{output_folder}/sprint-status.yaml`

---

## Parse Document Structure

Extract for validation:

### Epics
- Epic count and names
- Epic boundaries (aggregates covered)
- Dependencies per epic

### Stories
- Story count per epic
- Story structure completeness
- Acceptance criteria presence

### Module Alignment
- Aggregates referenced vs architecture
- Facade methods planned vs defined
- Events referenced vs published

Prepare document structure for validation against quality criteria in Step 21.

---

## COLLABORATION MENUS (A/P/C):

After loading the artifact, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into artifact structure concerns
- **P (Party Mode)**: Bring QA and analyst perspectives on validation approach
- **C (Continue)**: Proceed to detailed validation against epic criteria
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
- Context: "Review module epics artifact readiness for validation"
- Process QA and analyst perspectives
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

Confirm successful loading with:
- Epic count and names
- Story count per epic
- Architecture alignment status (aggregates/facades covered)
- Acceptance criteria presence

---

## Next Step

Once all artifacts are successfully loaded and structure is confirmed, proceed to `step-21-v-validate.md` to perform detailed quality criteria checks.
