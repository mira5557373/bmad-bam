# Step 20: Load Audit Spec for Validation

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction

---

## Purpose

This step loads the audit readiness specification artifact for validation against readiness criteria.

## Prerequisites

- Audit readiness specification artifact exists to validate
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
- Pre-validation status report

---

## Verification

- [ ] Documents loaded for validation
- [ ] Pre-validation check completed
- [ ] Ready for validation step
- [ ] No errors or warnings

---

## COLLABORATION MENUS (A/P/C)

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 21 (Validate Audit) - load `step-21-v-validate-audit.md`
- **C2**: Switch to Create Mode - load `step-01-c-inventory-evidence.md`
- **C3**: Switch to Edit Mode - load `step-10-e-load-audit.md`

---

## Next Step

Proceed to `step-21-v-validate-audit.md` to run validation checks.
