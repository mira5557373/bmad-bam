# Step 20: Load Artifact

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Load the Data Retention Policy artifacts for validation.

---

## Prerequisites

- Data retention policy design has been executed (Create mode completed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `data-archival`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`

---

## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/planning-artifacts/compliance/data-retention-policy.md`
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

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into document structure
- **P (Party Mode)**: Bring analyst and architect perspectives
- **C (Continue)**: Proceed to detailed validation checks

Select an option:
```

#### If 'C' (Continue):
- Confirm documents loaded successfully
- Update frontmatter `stepsCompleted: [20]`
- Proceed to next step: `step-21-v-validate.md`

---

## Verification

- [ ] Artifact loaded successfully
- [ ] All required sections present
- [ ] Document structure matches expected format
- [ ] Patterns align with pattern registry

---

## Outputs

- Loaded artifact ready for validation

---

## Next Step

Proceed to `step-21-v-validate.md` to perform detailed quality criteria checks.
