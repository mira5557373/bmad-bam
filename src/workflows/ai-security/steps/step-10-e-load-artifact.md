# Step 10: Load Existing AI Security Document

## Purpose

Load an existing AI security assessment document for modification and updates.

## Prerequisites

- Existing AI security report in `{output_folder}/planning-artifacts/`
- Knowledge of specific changes to apply

## Actions

### 1. Locate Existing Document

Search for existing AI security documents:
- `{output_folder}/planning-artifacts/ai-security-assessment.md`
- `{output_folder}/planning-artifacts/ai-security-report.md`

### 2. Parse Document Structure

| Section | Status | Notes |
|---------|--------|-------|
| Model Security Audit | | |
| Inference Endpoint Security | | |
| Prompt Injection Defenses | | |
| Data Leakage Prevention | | |
| Access Control Review | | |
| Overall Findings | | |

### 3. Identify Modification Scope

| Change Type | Sections Affected | Impact Level |
|-------------|-------------------|--------------|
| New model added | Model Security Audit | Medium |
| Endpoint changes | Inference Endpoint Security | High |
| Defense updates | Prompt Injection Defenses | Medium |
| Policy changes | Access Control Review | High |

### 4. Document Current State

Record baseline metrics before modifications:

| Metric | Current Value | Date Recorded |
|--------|---------------|---------------|
| Overall security score | | |
| Critical vulnerabilities | | |
| Open findings | | |
| Compliance status | | |

## Verification

- [ ] Existing document located and loaded
- [ ] Document structure parsed correctly
- [ ] Modification scope identified
- [ ] Baseline metrics recorded

## Outputs

- Loaded AI security document ready for editing
- Change scope documentation

## Next Step

Proceed to `step-11-e-apply-changes.md`.
