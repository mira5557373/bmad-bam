# Step 12: Regenerate Agent Safety Report

## Purpose

Regenerate the agent safety validation report after applying changes to incorporate updated test results, mitigations, and findings.

## Prerequisites

- Step 10 complete (existing document loaded)
- Step 11 complete (changes applied)
- **Load template:** `{project-root}/_bmad/bam/data/templates/agent-safety-report-template.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `ai-safety`

## Actions

### 1. Consolidate Updated Sections

Merge all updated sections into the regenerated report:

| Section | Update Source | Status |
|---------|---------------|--------|
| Guardrails Assessment | Step 11 changes | |
| Budget Enforcement | Step 11 changes | |
| Kill Switch Validation | Step 11 changes | |
| Adversarial Test Results | Step 11 changes | |
| Overall Findings | Recalculated | |

### 2. Recalculate Aggregate Metrics

Update summary metrics based on changes:

| Metric | Previous Value | Updated Value | Delta |
|--------|----------------|---------------|-------|
| Overall test pass rate | | | |
| Critical test pass rate | | | |
| Open high-severity findings | | | |
| Mitigation coverage | | | |

### 3. Update Executive Summary

Revise executive summary to reflect:
- Changes made since last version
- Impact on overall safety posture
- New or resolved findings
- Updated recommendations

### 4. Update Report Metadata

| Field | Value |
|-------|-------|
| Version | Increment from previous |
| Last Modified | {{date}} |
| Modified By | |
| Change Summary | |

### 5. Regenerate Artifact

Produce updated report artifact:

**Output location:** `{output_folder}/planning-artifacts/agent-safety-report.md`

Include sections:
1. Executive Summary (updated)
2. Guardrails Assessment
3. Budget Enforcement Tests
4. Kill Switch Validation
5. Adversarial Test Results
6. Summary of Changes
7. Updated Recommendations
8. Version History

## Verification

- [ ] All updated sections consolidated
- [ ] Aggregate metrics recalculated
- [ ] Executive summary reflects changes
- [ ] Report metadata updated
- [ ] Version incremented
- [ ] Change summary included
- [ ] Report artifact regenerated

## Outputs

- Regenerated agent safety report
- Version history with change log entry

## Next Step

Edit mode complete. Run Validate mode (`step-20-v-load-artifact.md`) to verify the updated report meets QG-I3 criteria.
