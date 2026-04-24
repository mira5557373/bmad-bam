# Step 10: Load Existing Artifact (Edit Mode)

## Purpose

Load and review existing security configuration to identify sections requiring modification.

## Prerequisites

- Existing security configuration at `{output_folder}/planning-artifacts/security-config.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `security-*`

## Actions

### 1. Load Existing Documents

Load the existing security configuration documents.

### 2. Parse Document Structure

| Component | Status | Key Information |
|-----------|--------|-----------------|
| Compliance automation | Complete/Incomplete | {summary} |
| Threat monitoring | Complete/Incomplete | {summary} |
| DLP controls | Complete/Incomplete | {summary} |
| Anomaly detection | Complete/Incomplete | {summary} |
| Incident automation | Complete/Incomplete | {summary} |

### 3. Identify Modification Targets

Confirm which sections need modification.

## COLLABORATION MENUS (A/P/C):

#### If 'C' (Continue):
- Proceed to next step: `step-11-e-apply-changes.md`

## Verification

- [ ] Step actions completed successfully
- [ ] Output artifacts generated
- [ ] Quality criteria met
- [ ] Patterns align with pattern registry

## Outputs

- Updated configuration or artifact

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modifications.
