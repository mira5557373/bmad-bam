# Step 6: Generate QA Report

## Purpose

Generate the comprehensive QA review report consolidating all quality assessment findings.

## Prerequisites

- All quality metrics aggregated
- Production readiness determined
- **Load template:** `{project-root}/_bmad/bam/templates/qa-review-report-template.md`

## Actions

### 1. Assemble Report Sections

| Section | Content Source | Status |
|---------|----------------|--------|
| Executive Summary | Aggregated metrics | |
| Quality Score Dashboard | Step 5 metrics | |
| Gate Compliance Matrix | Step 1 evidence | |
| Tenant Isolation Assessment | Step 2 assessment | |
| Integration Test Coverage | Step 3 analysis | |
| Compliance Status | Step 4 verification | |
| Critical Findings | All steps | |
| Recommendations | Analysis synthesis | |
| Production Readiness Verdict | Step 5 determination | |

### 2. Create Executive Summary

| Metric | Value | Status |
|--------|-------|--------|
| Overall Quality Score | {score}% | {RAG} |
| Gate Pass Rate | {pass}/{total} | {RAG} |
| Critical Issues | {count} | {RAG} |
| Production Readiness | {verdict} | {RAG} |

### 3. Document Critical Findings

For each critical finding:
1. Finding ID and description
2. Impact assessment
3. Root cause analysis
4. Recommended remediation
5. Timeline for resolution
6. Owner assignment

### 4. Generate Recommendations

| Priority | Recommendation | Impact | Effort | Owner |
|----------|----------------|--------|--------|-------|
| P1 | | | | |
| P2 | | | | |
| P3 | | | | |

### 5. Create Action Plan

| Action | Priority | Due Date | Owner | Dependencies |
|--------|----------|----------|-------|--------------|
| | | | | |

## Report Generation

Generate QA review report to:
`{output_folder}/quality-artifacts/qa-review-report.md`

## Web Research Verification

Search the web: "QA review report structure best practices {date}"
Search the web: "executive summary quality report SaaS {date}"

## Verification

- [ ] All sections assembled
- [ ] Executive summary created
- [ ] Critical findings documented
- [ ] Recommendations prioritized
- [ ] Action plan defined
- [ ] Report generated

## Outputs

- `qa-review-report.md` - Complete QA review report
- Quality metrics data for dashboard
- Action plan with ownership
