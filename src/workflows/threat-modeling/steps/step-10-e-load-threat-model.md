# Step 1: Load Existing Threat Model

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

This step loads the existing threat model for modification. Edit mode allows updates to attack surface, threats, mitigations, or risk register.

## Prerequisites

- Existing threat model document to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

---

## Actions

### 1. Load Threat Model Document

Load: `{output_folder}/planning-artifacts/threat-model.md`

### 2. Parse Document Structure

**Document Sections:** Executive Summary, System Overview, Attack Surface, STRIDE Analysis, Mitigations, Risk Register, Review Schedule

### 3. Identify Modification Areas

| Section | Common Updates |
|---------|---------------|
| Attack Surface | Add components, update flows |
| STRIDE | Add threats, update ratings |
| Mitigations | Add controls, update status |
| Risk Register | Update status, add entries |

### 4. Confirm Modification Scope

---

## COLLABORATION MENUS (A/P/C)

### Menu Options

### [A]nalyze Options
- **A1**: Review current threat model
- **A2**: Analyze attack surface changes
- **A3**: Evaluate STRIDE coverage
- **A4**: Assess mitigation status

### [P]ropose Changes
- **P1**: Propose attack surface updates
- **P2**: Suggest new threats
- **P3**: Recommend mitigation changes
- **P4**: Propose risk register updates

### [C]ontinue
- **C1**: Accept modification scope
- **C2**: Mark step complete and load `step-11-e-apply-threat-changes.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Existing threat model loaded successfully
- [ ] Document structure parsed correctly
- [ ] Modification scope confirmed

## Outputs

- Summary of current threat model
- Confirmed sections to modify

## Next Step

Proceed to `step-11-e-apply-threat-changes.md`.
