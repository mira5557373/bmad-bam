# Step 1: Load Secrets Management Plan for Validation

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- BOOK **CRITICAL: ALWAYS read the complete step file** before taking any action
- CYCLE **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- TARGET **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- MEMO Maintain append-only document building
- CHECK Track progress in `stepsCompleted` array

---

## Purpose

This step loads the secrets management plan for validation against security best practices and compliance requirements.

## Prerequisites

- Previous step completed (workflow selection)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

## Artifact Locations

Load the existing plan:
- `{output_folder}/planning-artifacts/secrets-management-plan.md`

## Pre-Validation Checks

| Check | Expected |
|-------|----------|
| File exists | Plan at specified path |
| File readable | Valid markdown content |
| Document complete | All major sections present |
| Metadata present | Version, date, author, status |

---

## Inputs

- Artifact file path for validation
- Quality gate checklist
- Pattern registry

---

## Actions

### 1. Load Artifact

- Read the artifact from specified location
- Parse and validate structure

### 2. Validate Content

- Check all required sections are present
- Verify cross-references are valid

### 3. Generate Findings

- Document any issues found
- Categorize by severity

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### Menu Options

### [A]nalyze Options
- **A1**: Review plan file existence
- **A2**: Analyze document structure
- **A3**: Evaluate metadata currency

### [P]ropose Changes
- **P1**: Propose switching to Create mode if missing
- **P2**: Suggest Edit mode for incomplete sections

### [C]ontinue
- **C1**: Accept loaded plan and proceed to validation
- **C2**: Mark step complete and load `step-21-v-validate-secrets-plan.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Secrets management plan loaded successfully
- [ ] All required sections present
- [ ] Document structure matches expected format

## Outputs

- Loaded secrets management plan for validation
- Section completeness checklist

## Next Step

Proceed to `step-21-v-validate-secrets-plan.md` for detailed validation.
