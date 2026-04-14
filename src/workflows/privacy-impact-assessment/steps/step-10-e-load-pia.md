# Step 10: Load Existing PIA/DPIA Spec

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- ⏸️ **ALWAYS pause after presenting findings** and await user direction

---

## Purpose

This step loads the existing PIA/DPIA specification document for modification.

## Artifact Location

- `{output_folder}/planning-artifacts/privacy-impact-assessment-spec.md`


## Prerequisites

- Previous step requirements met
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: privacy-impact-assessment
---

## Actions

1. Load the specified artifact from the artifact location
2. Parse document structure
3. Verify all sections are present

---

## Outputs

- Loaded PIA/DPIA specification
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
- **C1**: Continue to Step 11 (Apply Changes) - load `step-11-e-apply-pia-changes.md`
- **C2**: Switch to Create Mode - load `step-01-c-threshold-analysis.md`
- **C3**: Switch to Validate Mode - load `step-20-v-load-pia.md`

---

## Next Step

Proceed to `step-11-e-apply-pia-changes.md` with identified modification targets.
