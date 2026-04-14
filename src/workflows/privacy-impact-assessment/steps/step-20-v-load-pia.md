# Step 20: Load PIA Spec for Validation

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- ⏸️ **ALWAYS pause after presenting findings** and await user direction

---

## Purpose

This step loads the PIA/DPIA specification artifact for validation against GDPR Article 35 requirements.

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
- **C1**: Continue to Step 21 (Validate PIA) - load `step-21-v-validate-pia.md`
- **C2**: Switch to Create Mode - load `step-01-c-threshold-analysis.md`
- **C3**: Switch to Edit Mode - load `step-10-e-load-pia.md`

---

## Next Step

Proceed to `step-21-v-validate-pia.md` to run validation checks.
