# Step 10: Load Existing Audit Readiness Spec

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction

---

## Purpose

This step loads the existing audit readiness specification document for modification.

## Prerequisites

- Existing audit readiness specification to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance

## Artifact Location

- `{output_folder}/planning-artifacts/audit-readiness-spec.md`

---

## Actions

1. Load the specified artifact from the artifact location
2. Parse document structure
3. Verify all sections are present

---

## Outputs

- Loaded audit readiness specification
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
- **C1**: Continue to Step 11 (Apply Changes) - load `step-11-e-apply-audit-changes.md`
- **C2**: Switch to Create Mode - load `step-01-c-inventory-evidence.md`
- **C3**: Switch to Validate Mode - load `step-20-v-load-audit.md`

---

## Next Step

Proceed to `step-11-e-apply-audit-changes.md` with identified modification targets.
