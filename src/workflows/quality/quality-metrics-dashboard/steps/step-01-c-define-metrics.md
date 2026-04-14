# Step 1: Define Quality Metrics

## Purpose

Define the quality metrics to be tracked and displayed on the dashboard.

## Prerequisites

- Quality gates defined
- **Load patterns:** `{project-root}/_bmad/bam/data/quality-gates.csv`

## Actions

### 1. Define Gate Metrics

| Metric | Gate | Type | Calculation | Refresh |
|--------|------|------|-------------|---------|
| Gate Pass Rate | All | Gauge | pass/total | Hourly |
| Gate Status | All | Status | PASS/FAIL/CONDITIONAL | Real-time |
| Critical Items | All | Counter | Count critical failures | Real-time |
| Gate Trend | All | Trend | Pass rate over time | Daily |

### 2. Define Test Coverage Metrics

| Metric | Scope | Type | Calculation | Refresh |
|--------|-------|------|-------------|---------|
| Unit Test Coverage | Codebase | Percentage | lines covered/total | Per build |
| Integration Coverage | Cross-module | Percentage | facades tested/total | Per build |
| Isolation Test Coverage | Tenant | Percentage | layers tested/total | Per build |
| E2E Test Coverage | Workflows | Percentage | flows tested/total | Daily |

### 3. Define Compliance Metrics

| Metric | Framework | Type | Calculation | Refresh |
|--------|-----------|------|-------------|---------|
| Compliance Score | All | Percentage | controls pass/total | Daily |
| Control Status | Per framework | Matrix | Per control status | Real-time |
| Evidence Age | All | Gauge | Days since update | Daily |

### 4. Define Tenant-Specific Metrics

| Metric | Scope | Type | Tenant Filter | Refresh |
|--------|-------|------|---------------|---------|
| Tenant Isolation Score | Per tenant | Percentage | Yes | Daily |
| Tenant Test Coverage | Per tenant | Percentage | Yes | Daily |
| Tenant Compliance | Per tenant | Status | Yes (Enterprise) | Daily |

## Web Research Verification

Search the web: "quality metrics dashboard SaaS best practices {date}"
Search the web: "multi-tenant quality metrics patterns {date}"

## Verification

- [ ] Gate metrics defined
- [ ] Test coverage metrics defined
- [ ] Compliance metrics defined
- [ ] Tenant-specific metrics defined

## Outputs

- Metrics definition document

## Next Step

Proceed to `step-02-c-design-visualizations.md` with metrics definitions.
