# Step 20: Load Artifact

## Purpose

This step loads the security operations artifacts for validation against QG-S8 criteria.

---

## Prerequisites

- **Load quality gate:** `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-S8`

---

## Actions

Load existing security operations documents:
- `{output_folder}/security/threat-detection-config.md`
- `{output_folder}/security/correlation-rules.md`
- `{output_folder}/security/hunting-playbooks.md`

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
