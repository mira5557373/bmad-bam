# Step 10: Load Existing Agent Safety Document

## Purpose

Load an existing agent safety assessment document for modification and updates.

## Prerequisites

- Existing agent safety report in `{output_folder}/planning-artifacts/`
- Knowledge of specific changes to apply

## Actions

### 1. Locate Existing Document

Search for existing agent safety documents:
- `{output_folder}/planning-artifacts/agent-safety-report.md`
- `{output_folder}/planning-artifacts/agent-safety-assessment.md`

### 2. Parse Document Structure

| Section | Status | Notes |
|---------|--------|-------|
| Guardrails Assessment | | |
| Budget Enforcement | | |
| Kill Switch Validation | | |
| Adversarial Test Results | | |
| Overall Findings | | |

### 3. Identify Modification Scope

| Change Type | Sections Affected | Impact Level |
|-------------|-------------------|--------------|
| New guardrail added | Guardrails Assessment | Low |
| Test results update | Adversarial Test Results | Medium |
| Kill switch changes | Kill Switch Validation | High |
| Budget policy change | Budget Enforcement | Medium |

### 4. Document Current State

Record baseline metrics before modifications:

| Metric | Current Value | Date Recorded |
|--------|---------------|---------------|
| Overall pass rate | | |
| Critical failures | | |
| Open mitigations | | |

## Verification

- [ ] Existing document located and loaded
- [ ] Document structure parsed correctly
- [ ] Modification scope identified
- [ ] Baseline metrics recorded

## Outputs

- Loaded agent safety document ready for editing
- Change scope documentation

## Next Step

Proceed to `step-11-e-apply-changes.md`.
