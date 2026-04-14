# Step 10: Load Existing Artifact

## Purpose

This step loads existing model validation documents for modification.

---

## Prerequisites

- Existing model validation artifacts to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `ai-runtime`

---

## Actions

### 1. Load Artifacts

Load the existing model validation documents:
- `{output_folder}/ai/model-validation-report.md`
- `{output_folder}/ai/tenant-rollout-plan.md`
- `{output_folder}/ai/model-monitoring-config.md`

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
