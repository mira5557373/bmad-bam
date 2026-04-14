# Step 1: Load Threat Model for Validation

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

This step loads the threat model for validation against security best practices.

## Prerequisites

- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

## Artifact Locations

Load: `{output_folder}/planning-artifacts/threat-model.md`

---

## Actions

### 1. Load Artifact

### 2. Validate Content

### 3. Generate Findings

---

## COLLABORATION MENUS (A/P/C)

### Menu Options

### [A]nalyze Options
- **A1**: Review file existence
- **A2**: Analyze document structure

### [P]ropose Changes
- **P1**: Propose Create mode if missing
- **P2**: Suggest Edit mode for incomplete sections

### [C]ontinue
- **C1**: Accept loaded model and proceed
- **C2**: Mark step complete and load `step-21-v-validate-threat-model.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Threat model loaded successfully
- [ ] All required sections present

## Outputs

- Loaded threat model for validation

## Next Step

Proceed to `step-21-v-validate-threat-model.md`.
