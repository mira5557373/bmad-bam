# Step 10: Load Existing Artifact

## Purpose

This step loads existing security operations documents for modification.

---

## Prerequisites

- Existing security operations artifacts to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `security`

---

## Actions

### 1. Load Artifacts

Load the existing security operations documents:
- `{output_folder}/security/threat-detection-config.md`
- `{output_folder}/security/correlation-rules.md`
- `{output_folder}/security/hunting-playbooks.md`

### 2. Parse and Confirm Modifications

Parse document structure and confirm modification targets with user.

---

## Verification

- [ ] Step actions completed successfully
- [ ] Output artifacts generated
- [ ] Quality criteria met
- [ ] Patterns align with pattern registry

## Outputs

- Updated configuration or artifact

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modification targets.
