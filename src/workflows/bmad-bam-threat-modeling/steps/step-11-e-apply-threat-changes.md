# Step 2: Apply Threat Model Changes

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

Apply the confirmed modifications to the threat model, preserving unchanged sections.

## Prerequisites

- Threat model loaded in Step 10
- Modification scope confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

---

## Actions

### 1. Apply Section Modifications

### 2. Preserve Unchanged Sections

### 3. Update Document Metadata

### 4. Validate Cross-References

---

## COLLABORATION MENUS (A/P/C)

### Menu Options

### [A]nalyze Options
- **A1**: Review applied changes
- **A2**: Analyze impact on related sections

### [P]ropose Changes
- **P1**: Propose additional modifications
- **P2**: Suggest consistency improvements

### [C]ontinue
- **C1**: Accept changes and save
- **C2**: Mark edit complete

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] All modifications applied
- [ ] Unchanged sections preserved
- [ ] Metadata updated
- [ ] Cross-references validated

## Outputs

- Updated `{output_folder}/planning-artifacts/threat-model.md`

## Next Step

Edit workflow complete.
