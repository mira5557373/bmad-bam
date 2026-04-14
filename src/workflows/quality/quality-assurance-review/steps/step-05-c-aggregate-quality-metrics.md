# Step 5: Aggregate Quality Metrics

## Purpose

Calculate aggregated quality metrics across all assessment dimensions to produce an overall quality score.

## Prerequisites

- Compliance status checked
- All assessment dimensions completed
- **Load patterns:** `{project-root}/_bmad/bam/data/quality-gates.csv`

## Actions

### 1. Consolidate Assessment Scores

| Assessment | Score | Weight | Weighted Score |
|------------|-------|--------|----------------|
| Gate Compliance | | 25% | |
| Tenant Isolation | | 25% | |
| Integration Coverage | | 25% | |
| Compliance Status | | 25% | |
| **Overall Quality Score** | | 100% | |

### 2. Calculate Gate Pass Rate

| Gate | Status | Critical Items | Non-Critical Items |
|------|--------|----------------|-------------------|
| QG-F1 | | / total | / total |
| QG-M1 | | / total | / total |
| QG-M2 | | / total | / total |
| QG-M3 | | / total | / total |
| QG-I1 | | / total | / total |
| QG-I2 | | / total | / total |
| QG-I3 | | / total | / total |
| **Gate Pass Rate** | | {pass}/{total} | {pass}/{total} |

### 3. Identify Critical Quality Gaps

| Gap ID | Category | Severity | Impact | Remediation Status |
|--------|----------|----------|--------|-------------------|
| | | CRITICAL | | |
| | | HIGH | | |
| | | MEDIUM | | |

### 4. Calculate Trend Metrics

| Metric | Current | Previous | Trend |
|--------|---------|----------|-------|
| Overall Quality Score | | | |
| Gate Pass Rate | | | |
| Test Coverage | | | |
| Compliance Score | | | |

### 5. Determine Production Readiness

| Criterion | Required | Actual | Met? |
|-----------|----------|--------|------|
| Overall Quality Score | >= 80% | | |
| Critical Gate Pass | 100% | | |
| Tenant Isolation Score | >= 90% | | |
| Compliance Score | >= 95% | | |
| Critical Gaps | 0 | | |

**Production Readiness Verdict:** READY / NOT READY / CONDITIONAL

## Web Research Verification

Search the web: "quality metrics aggregation best practices SaaS {date}"
Search the web: "production readiness criteria multi-tenant {date}"

## Verification

- [ ] All scores consolidated
- [ ] Gate pass rate calculated
- [ ] Critical gaps identified
- [ ] Trend metrics computed
- [ ] Production readiness determined

## Outputs

- Aggregated quality metrics
- Critical gaps list
- Production readiness verdict

## Next Step

Proceed to `step-06-c-generate-qa-report.md` with aggregated metrics.
