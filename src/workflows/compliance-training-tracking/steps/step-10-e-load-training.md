# Step 10: Load Existing Training Tracking Spec

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- ⏸️ **ALWAYS pause after presenting findings** and await user direction

---

## Purpose

This step loads the existing training tracking specification document for modification.

## Artifact Location

- `{output_folder}/planning-artifacts/compliance-training-tracking-spec.md`


## Prerequisites

- Previous step requirements met
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: compliance-training-tracking
---

## Actions

1. Load the specified artifact from the artifact location
2. Parse document structure
3. Verify all sections are present

---

## Outputs

- Loaded training tracking specification
- Parsed document structure
- Modification targets identified

---

## Verification

- [ ] Documents loaded successfully
- [ ] Structure parsed correctly
- [ ] Modification targets identified
- [ ] No errors or warnings

---

## COLLABORATION MENUS (A/P/C)

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 11 (Apply Changes) - load `step-11-e-apply-training-changes.md`
- **C2**: Switch to Create Mode - load `step-01-c-identify-requirements.md`
- **C3**: Switch to Validate Mode - load `step-20-v-load-training.md`

---

## Next Step

Proceed to `step-11-e-apply-training-changes.md` with identified modification targets.
