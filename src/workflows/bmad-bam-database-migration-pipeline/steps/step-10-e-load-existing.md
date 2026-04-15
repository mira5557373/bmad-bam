# Step 10: Load Existing Artifact

## Purpose

This step loads existing migration pipeline documents for modification.

---

## Prerequisites

- Existing migration artifacts to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `database`

---

## Actions

### 1. Load Artifacts

Load the existing migration documents:
- `{output_folder}/operations/migration-execution-report.md`
- `{output_folder}/operations/data-validation-results.md`
- `{output_folder}/operations/tenant-impact-assessment.md`

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
