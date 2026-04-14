# Step 20: Load Artifact

## Purpose

This step loads the model validation artifacts for validation against QG-AI1 criteria.

---

## Prerequisites

- **Load quality gate:** `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-AI1`

---

## Actions

Load existing model validation documents:
- `{output_folder}/ai/model-validation-report.md`
- `{output_folder}/ai/tenant-rollout-plan.md`
- `{output_folder}/ai/model-monitoring-config.md`

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
