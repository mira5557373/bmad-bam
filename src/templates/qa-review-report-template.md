---
name: qa-review-report-template
description: Quality assurance review report template for multi-tenant SaaS platforms
module: bam
category: quality
version: 1.0.0
---

# Quality Assurance Review Report

**Project:** {{project_name}}
**Date:** {{date}}
**Version:** {{version}}
**Reviewer:** {{author}}

---

## Executive Summary

| Metric | Value | Status |
|--------|-------|--------|
| **Overall Quality Score** | {{overall_score}}% | {{status_rag}} |
| **Gate Pass Rate** | {{gate_pass}}/{{gate_total}} | {{gate_rag}} |
| **Critical Issues** | {{critical_count}} | {{critical_rag}} |
| **Production Readiness** | {{readiness_verdict}} | {{readiness_rag}} |

### Quick Assessment

{{executive_summary_text}}

---

## Quality Score Dashboard

### Component Scores

| Assessment | Score | Weight | Weighted Score | Status |
|------------|-------|--------|----------------|--------|
| Gate Compliance | {{gate_score}}% | 25% | {{gate_weighted}}% | |
| Tenant Isolation | {{isolation_score}}% | 25% | {{isolation_weighted}}% | |
| Integration Coverage | {{integration_score}}% | 25% | {{integration_weighted}}% | |
| Compliance Status | {{compliance_score}}% | 25% | {{compliance_weighted}}% | |
| **Total** | | 100% | {{overall_score}}% | |

### Score Trend

| Period | Score | Change |
|--------|-------|--------|
| Current | {{current_score}}% | |
| Previous | {{previous_score}}% | {{score_delta}} |
| Baseline | {{baseline_score}}% | |

---

## Gate Compliance Matrix

### Gate Status Summary

| Gate | Status | Critical Pass | Non-Critical Pass | Evidence |
|------|--------|---------------|-------------------|----------|
| QG-F1 (Foundation) | | / | / | |
| QG-M1 (Module Architecture) | | / | / | |
| QG-M2 (Tenant Isolation) | | / | / | |
| QG-M3 (Agent Runtime) | | / | / | |
| QG-I1 (Convergence) | | / | / | |
| QG-I2 (Tenant Safety) | | / | / | |
| QG-I3 (Agent Safety) | | / | / | |
| QG-P1 (Production) | | / | / | |

### Gate Details

#### QG-F1: Foundation Gate

**Status:** {{qg_f1_status}}
**Validation Date:** {{qg_f1_date}}

| Check | Status | Evidence |
|-------|--------|----------|
| Master architecture exists | | |
| Tenant model defined | | |
| Module boundaries established | | |

#### QG-M2: Tenant Isolation Gate

**Status:** {{qg_m2_status}}
**Validation Date:** {{qg_m2_date}}

| Check | Status | Evidence |
|-------|--------|----------|
| RLS policies verified | | |
| Cache isolation tested | | |
| Memory isolation tested | | |
| API isolation tested | | |

---

## Tenant Isolation Assessment

### Coverage by Layer

| Layer | Test Coverage | Pass Rate | Status |
|-------|---------------|-----------|--------|
| Database (RLS) | {{rls_coverage}}% | {{rls_pass}}% | |
| Cache | {{cache_coverage}}% | {{cache_pass}}% | |
| Memory/AI | {{memory_coverage}}% | {{memory_pass}}% | |
| API | {{api_coverage}}% | {{api_pass}}% | |
| Background Jobs | {{job_coverage}}% | {{job_pass}}% | |
| Events | {{event_coverage}}% | {{event_pass}}% | |

### Isolation Test Summary

**Total Tests:** {{isolation_total}}
**Passed:** {{isolation_passed}}
**Failed:** {{isolation_failed}}
**Skipped:** {{isolation_skipped}}

### Noisy Neighbor Protection

| Test | Status | Metrics |
|------|--------|---------|
| CPU isolation | | |
| Memory isolation | | |
| Connection pool limits | | |
| Rate limiting | | |

---

## Integration Test Coverage

### Cross-Module Coverage

| Module A | Module B | Facade | Coverage |
|----------|----------|--------|----------|
{{cross_module_table}}

### Workflow Chain Coverage

| Chain | Tests | Pass Rate |
|-------|-------|-----------|
| Tenant Onboarding | | |
| Request Processing | | |
| AI Agent Workflow | | |
| Event Processing | | |

---

## Compliance Status

### Framework Compliance

| Framework | Applicable | Score | Status |
|-----------|------------|-------|--------|
| GDPR | | {{gdpr_score}}% | |
| SOC 2 | | {{soc2_score}}% | |
| HIPAA | | {{hipaa_score}}% | |
| EU AI Act | | {{euai_score}}% | |

### Control Summary

| Control Category | Total | Passing | Failing |
|------------------|-------|---------|---------|
| Data Protection | | | |
| Access Control | | | |
| Audit Logging | | | |
| Encryption | | | |

---

## Critical Findings

### Summary

| Severity | Count |
|----------|-------|
| Critical | {{critical_count}} |
| High | {{high_count}} |
| Medium | {{medium_count}} |

### Critical Issues

{{#each critical_findings}}
#### {{finding_id}}: {{finding_title}}

**Severity:** Critical
**Category:** {{finding_category}}
**Impact:** {{finding_impact}}

**Description:**
{{finding_description}}

**Root Cause:**
{{finding_root_cause}}

**Remediation:**
{{finding_remediation}}

**Owner:** {{finding_owner}}
**Due Date:** {{finding_due_date}}

---
{{/each}}

---

## Recommendations

### Priority Actions

| Priority | Recommendation | Impact | Effort | Owner |
|----------|----------------|--------|--------|-------|
{{recommendations_table}}

---

## Production Readiness Verdict

### Criteria Assessment

| Criterion | Required | Actual | Met |
|-----------|----------|--------|-----|
| Overall Quality Score | >= 80% | {{overall_score}}% | {{score_met}} |
| Critical Gate Pass | 100% | {{critical_gate_pct}}% | {{critical_met}} |
| Tenant Isolation Score | >= 90% | {{isolation_score}}% | {{isolation_met}} |
| Compliance Score | >= 95% | {{compliance_score}}% | {{compliance_met}} |
| Critical Issues | 0 | {{critical_count}} | {{issues_met}} |

### Verdict

**{{readiness_verdict}}**

{{readiness_rationale}}

---

## Action Plan

| Action | Priority | Due Date | Owner | Status |
|--------|----------|----------|-------|--------|
{{action_plan_table}}

---

## Verification Checklist

- [ ] All gate statuses verified against latest checklist execution
- [ ] Quality score calculation cross-checked
- [ ] Tenant isolation test results match QG-I2 evidence
- [ ] Integration coverage data matches CI/CD reports
- [ ] Compliance scores aligned with framework requirements
- [ ] Critical findings have root cause identified
- [ ] All critical findings have remediation owners assigned
- [ ] Recommendations prioritized by impact/effort matrix
- [ ] Production readiness verdict criteria all evaluated
- [ ] Action plan items have realistic due dates
- [ ] Evidence references accessible and current
- [ ] Report reviewed by all designated reviewers

## Web Research Queries

Before finalizing this report, verify current best practices:

Search the web: "quality assurance SaaS best practices {date}"
Search the web: "multi-tenant quality metrics {date}"

---

## Appendix

### Evidence References

| Evidence | Location | Last Updated |
|----------|----------|--------------|
{{evidence_table}}

### Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial report |

---

*Generated by BAM Quality Assurance Review Workflow*

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | {{date}} | {{author}} | Initial template creation |
