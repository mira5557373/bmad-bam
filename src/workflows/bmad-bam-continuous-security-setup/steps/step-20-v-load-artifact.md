# Step 20: Load Artifact (Validate Mode)

## Purpose

Load the security configuration for validation against QG-S5 criteria.

## Prerequisites

- Security configuration exists at `{output_folder}/planning-artifacts/security-config.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `security-*`

## Actions

### 1. Load Existing Documents

Load security configuration documents.

### 2. Pre-Validation Check

| Component | Present | Status |
|-----------|---------|--------|
| Compliance automation | Yes/No | {ready/incomplete} |
| Threat monitoring | Yes/No | {ready/incomplete} |
| DLP controls | Yes/No | {ready/incomplete} |
| Anomaly detection | Yes/No | {ready/incomplete} |
| Incident automation | Yes/No | {ready/incomplete} |

## COLLABORATION MENUS (A/P/C):

#### If 'C' (Continue):
- Proceed to next step: `step-21-v-validate.md`

## Verification

- [ ] Step actions completed successfully
- [ ] Output artifacts generated
- [ ] Quality criteria met
- [ ] Patterns align with pattern registry

## Outputs

- Updated configuration or artifact

## Next Step

Proceed to `step-21-v-validate.md` to run validation checks.
