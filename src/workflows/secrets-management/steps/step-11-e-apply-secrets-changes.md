# Step 2: Apply Secrets Management Changes

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

Apply the confirmed modifications to the secrets management plan, preserving unchanged sections while updating targeted areas.

## Prerequisites

- Secrets management plan loaded in Step 10
- Modification scope confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security


---

## Inputs

- Loaded secrets management plan from Step 10
- Confirmed modification scope
- User-provided change details

---

## Actions

### 1. Apply Section Modifications

For each section in the modification scope, apply changes.

### 2. Preserve Unchanged Sections

Ensure document metadata, unchanged sections, and cross-references remain intact.

### 3. Update Document Metadata

Update version, last modified date, modifier, and change summary.

### 4. Validate Cross-References

Check all internal references remain valid.

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### Menu Options

### [A]nalyze Options
- **A1**: Review applied changes for consistency
- **A2**: Analyze impact on related sections
- **A3**: Evaluate cross-reference integrity

### [P]ropose Changes
- **P1**: Propose additional modifications
- **P2**: Suggest consistency improvements

### [C]ontinue
- **C1**: Accept changes and save updated document
- **C2**: Mark edit complete and output

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] All specified modifications applied
- [ ] Unchanged sections preserved
- [ ] Document metadata updated
- [ ] Cross-references validated

## Outputs

- Updated `{output_folder}/planning-artifacts/secrets-management-plan.md`

## Next Step

Edit workflow complete. Save updated secrets management plan.
