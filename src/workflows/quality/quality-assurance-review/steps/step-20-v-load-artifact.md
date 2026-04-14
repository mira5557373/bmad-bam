# Step 20: Load QA Review Artifact

## Purpose

Load the QA review report artifact for validation.

## Prerequisites

- QA review report exists

## Actions

### 1. Load QA Review Report

Read artifact from:
`{output_folder}/quality-artifacts/qa-review-report.md`

### 2. Parse Report Structure

Verify all required sections exist:

| Section | Present | Valid |
|---------|---------|-------|
| Executive Summary | | |
| Quality Score Dashboard | | |
| Gate Compliance Matrix | | |
| Tenant Isolation Assessment | | |
| Integration Test Coverage | | |
| Compliance Status | | |
| Critical Findings | | |
| Recommendations | | |
| Production Readiness Verdict | | |

### 3. Extract Validation Targets

| Target | Location | Value |
|--------|----------|-------|
| Overall Quality Score | | |
| Gate Pass Rate | | |
| Critical Issues Count | | |
| Production Readiness | | |

## Verification

- [ ] Report loaded successfully
- [ ] All sections present
- [ ] Validation targets extracted

## Outputs

- Loaded QA review content
- Validation target list

## Next Step

Proceed to `step-21-v-validate.md` with loaded artifact.
