# Step 20: Load Artifact

## Purpose

This step loads the migration pipeline artifacts for validation against QG-MG1 criteria.

---

## Prerequisites

- **Load quality gate:** `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-MG1`

---

## Actions

Load existing migration documents:
- `{output_folder}/operations/migration-execution-report.md`
- `{output_folder}/operations/data-validation-results.md`
- `{output_folder}/operations/tenant-impact-assessment.md`

---

## Verification

- [ ] Step actions completed successfully
- [ ] Output artifacts generated
- [ ] Quality criteria met
- [ ] Patterns align with pattern registry

## Outputs

- Updated configuration or artifact

## Next Step

Proceed to `step-21-v-validate.md` for detailed validation checks.
