# Step 21: Validate QA Review

## Purpose

Validate that the QA review report meets quality standards and completeness requirements.

## Prerequisites

- QA review artifact loaded
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/production-readiness.md`

## Actions

### 1. Validate Report Completeness

| Section | Required Fields | Present | Valid |
|---------|-----------------|---------|-------|
| Executive Summary | Score, Status, Verdict | | |
| Gate Matrix | All gates, Evidence | | |
| Isolation Assessment | Coverage %, Gaps | | |
| Integration Coverage | Facade %, Chain % | | |
| Compliance Status | Frameworks, Score | | |
| Critical Findings | ID, Severity, Owner | | |
| Recommendations | Priority, Action | | |
| Production Readiness | Criteria, Verdict | | |

### 2. Validate Score Calculations

| Metric | Calculated | Expected | Match |
|--------|------------|----------|-------|
| Overall Quality Score | | | |
| Gate Pass Rate | | | |
| Isolation Score | | | |
| Integration Score | | | |
| Compliance Score | | | |

### 3. Validate Finding Documentation

For each critical finding:
- [ ] Has unique ID
- [ ] Has severity classification
- [ ] Has impact assessment
- [ ] Has remediation plan
- [ ] Has owner assigned
- [ ] Has timeline

### 4. Validate Production Readiness Logic

| Criterion | Threshold | Actual | Logic Valid |
|-----------|-----------|--------|-------------|
| Quality Score | >= 80% | | |
| Critical Gates | 100% | | |
| Critical Issues | 0 | | |

## Verification

- [ ] Report completeness validated
- [ ] Scores verified
- [ ] Findings documented correctly
- [ ] Production readiness logic valid

## Outputs

- Validation results
- Issues found

## Next Step

Proceed to `step-22-v-generate-report.md` with validation results.
