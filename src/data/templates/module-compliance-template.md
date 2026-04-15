---
name: module-compliance-template
description: Template for master-architect module compliance verification
category: compliance
version: 1.0.0
type: "compliance"
web_research_enabled: true
source_verification: true
---

## Purpose

Template for master-architect module compliance verification

# Module Compliance Report: {{module_name}}

> Project: {{project_name}}
> Module: {{module_name}}
> Version: {{version}}
> Date: {{date}}
> Assessor: {{assessor}}

---

## Compliance Overview

### 1.1 Assessment Context

| Field | Value |
|-------|-------|
| Module | {{module_name}} |
| Module Version | {{module_version}} |
| Assessment Type | {{assessment_type}} |
| Assessment Date | {{date}} |
| Previous Assessment | {{previous_assessment}} |
| Target Quality Gates | {{target_gates}} |

### 1.2 Compliance Summary

## Multi-Tenant Considerations

- Tenant isolation: {{isolation_approach}}
- Tier differentiation: {{tier_strategy}}
- Compliance scope: {{compliance_scope}}

| Category | Status | Score | Gap Count |
|----------|--------|-------|-----------|
| Architecture | {{arch_status}} | {{arch_score}}/100 | {{arch_gaps}} |
| Tenant Isolation | {{isolation_status}} | {{isolation_score}}/100 | {{isolation_gaps}} |
| Facade Contract | {{facade_status}} | {{facade_score}}/100 | {{facade_gaps}} |
| Security | {{security_status}} | {{security_score}}/100 | {{security_gaps}} |
| Observability | {{observability_status}} | {{observability_score}}/100 | {{observability_gaps}} |
| Documentation | {{docs_status}} | {{docs_score}}/100 | {{docs_gaps}} |
| **Overall** | {{overall_status}} | {{overall_score}}/100 | {{total_gaps}} |

---

## Architecture Compliance

### 2.1 Module Architecture Assessment

| Criterion | Required | Actual | Compliant |
|-----------|----------|--------|-----------|
| Bounded context defined | Yes | {{bounded_context}} | {{bc_compliant}} |
| Single responsibility | Yes | {{single_resp}} | {{sr_compliant}} |
| Facade-only external access | Yes | {{facade_only}} | {{fo_compliant}} |
| No direct database access from other modules | Yes | {{no_direct_db}} | {{db_compliant}} |
| Event-driven communication | Recommended | {{event_driven}} | {{ed_compliant}} |

### 2.2 Module Boundary Verification

```
┌─────────────────────────────────────────────────────────────────┐
│               Module Boundary Compliance Check                   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    {{module_name}}                       │    │
│  │  ┌───────────────────────────────────────────────────┐  │    │
│  │  │  Bounded Context: {{bounded_context}}             │  │    │
│  │  │  Status: {{boundary_status}}                      │  │    │
│  │  └───────────────────────────────────────────────────┘  │    │
│  │                                                          │    │
│  │  Inbound Dependencies     Outbound Dependencies         │    │
│  │  ───────────────────     ────────────────────           │    │
│  │  {{inbound_deps}}         {{outbound_deps}}              │    │
│  │  Status: {{inbound_status}}  Status: {{outbound_status}}│    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 Dependency Compliance

| Dependency Type | Allowed | Found | Violations |
|-----------------|---------|-------|------------|
| Facade imports | Yes | {{facade_imports}} | {{facade_violations}} |
| Direct module imports | No | {{direct_imports}} | {{direct_violations}} |
| Shared library imports | Yes | {{shared_imports}} | {{shared_violations}} |
| External library imports | Reviewed | {{external_imports}} | {{external_violations}} |

### 2.4 Architecture Violations

| Violation | Location | Severity | Remediation |
|-----------|----------|----------|-------------|
| {{arch_violation_1}} | {{arch_location_1}} | {{arch_severity_1}} | {{arch_fix_1}} |
| {{arch_violation_2}} | {{arch_location_2}} | {{arch_severity_2}} | {{arch_fix_2}} |

---

## Tenant Isolation Compliance

### 3.1 Isolation Model Adherence

| Criterion | Master Architecture | Module Implementation | Compliant |
|-----------|--------------------|-----------------------|-----------|
| Tenant model | {{master_tenant_model}} | {{module_tenant_model}} | {{tm_compliant}} |
| Context propagation | {{master_context}} | {{module_context}} | {{cp_compliant}} |
| Data isolation | {{master_data_iso}} | {{module_data_iso}} | {{di_compliant}} |
| Cache isolation | {{master_cache_iso}} | {{module_cache_iso}} | {{ci_compliant}} |

### 3.2 Database Compliance

| Table/Entity | tenant_id Column | RLS Policy | Indexed | Compliant |
|--------------|------------------|------------|---------|-----------|
| {{table_1}} | {{col_1}} | {{rls_1}} | {{idx_1}} | {{t1_compliant}} |
| {{table_2}} | {{col_2}} | {{rls_2}} | {{idx_2}} | {{t2_compliant}} |
| {{table_3}} | {{col_3}} | {{rls_3}} | {{idx_3}} | {{t3_compliant}} |

### 3.3 API Endpoint Compliance

| Endpoint | Tenant Context Required | Implemented | Verified |
|----------|------------------------|-------------|----------|
| {{endpoint_1}} | {{required_1}} | {{implemented_1}} | {{verified_1}} |
| {{endpoint_2}} | {{required_2}} | {{implemented_2}} | {{verified_2}} |
| {{endpoint_3}} | {{required_3}} | {{implemented_3}} | {{verified_3}} |

### 3.4 Isolation Test Results

| Test Category | Tests Run | Passed | Failed | Coverage |
|---------------|-----------|--------|--------|----------|
| Context propagation | {{ctx_tests}} | {{ctx_passed}} | {{ctx_failed}} | {{ctx_coverage}} |
| Data isolation | {{data_tests}} | {{data_passed}} | {{data_failed}} | {{data_coverage}} |
| Cross-tenant prevention | {{cross_tests}} | {{cross_passed}} | {{cross_failed}} | {{cross_coverage}} |
| Cache isolation | {{cache_tests}} | {{cache_passed}} | {{cache_failed}} | {{cache_coverage}} |

---

## Facade Contract Compliance

### 4.1 Contract Definition Assessment

| Criterion | Required | Actual | Compliant |
|-----------|----------|--------|-----------|
| Facade interface defined | Yes | {{facade_defined}} | {{fd_compliant}} |
| Types exported | Yes | {{types_exported}} | {{te_compliant}} |
| Version specified | Yes | {{version_specified}} | {{vs_compliant}} |
| Deprecation policy | Yes | {{deprecation_policy}} | {{dp_compliant}} |

### 4.2 Operation Compliance

| Operation | Documented | Typed | Tenant-Aware | Tested |
|-----------|------------|-------|--------------|--------|
| {{operation_1}} | {{doc_1}} | {{typed_1}} | {{tenant_1}} | {{tested_1}} |
| {{operation_2}} | {{doc_2}} | {{typed_2}} | {{tenant_2}} | {{tested_2}} |
| {{operation_3}} | {{doc_3}} | {{typed_3}} | {{tenant_3}} | {{tested_3}} |

### 4.3 Contract Versioning

| Version | Status | Breaking Changes | Migration Path |
|---------|--------|------------------|----------------|
| {{contract_v1}} | {{v1_status}} | {{v1_breaking}} | {{v1_migration}} |
| {{contract_v2}} | {{v2_status}} | {{v2_breaking}} | {{v2_migration}} |

### 4.4 Contract Violations

| Violation | Description | Consumer Impact | Fix |
|-----------|-------------|-----------------|-----|
| {{contract_violation_1}} | {{cv_desc_1}} | {{cv_impact_1}} | {{cv_fix_1}} |
| {{contract_violation_2}} | {{cv_desc_2}} | {{cv_impact_2}} | {{cv_fix_2}} |

---

## Security Compliance

### 5.1 Authentication/Authorization

| Control | Required | Implemented | Verified |
|---------|----------|-------------|----------|
| JWT validation | Yes | {{jwt_impl}} | {{jwt_verified}} |
| Tenant claim check | Yes | {{tenant_claim}} | {{tc_verified}} |
| Role-based access | Yes | {{rbac_impl}} | {{rbac_verified}} |
| Permission checks | Yes | {{perm_impl}} | {{perm_verified}} |

### 5.2 Data Protection

| Control | Required | Implemented | Verified |
|---------|----------|-------------|----------|
| Encryption at rest | Yes | {{ear_impl}} | {{ear_verified}} |
| Encryption in transit | Yes | {{eit_impl}} | {{eit_verified}} |
| PII handling | Yes | {{pii_impl}} | {{pii_verified}} |
| Data masking | If applicable | {{mask_impl}} | {{mask_verified}} |

### 5.3 Security Testing

| Test Type | Performed | Date | Result | Issues |
|-----------|-----------|------|--------|--------|
| SAST scan | {{sast_performed}} | {{sast_date}} | {{sast_result}} | {{sast_issues}} |
| DAST scan | {{dast_performed}} | {{dast_date}} | {{dast_result}} | {{dast_issues}} |
| Dependency scan | {{dep_performed}} | {{dep_date}} | {{dep_result}} | {{dep_issues}} |
| Penetration test | {{pen_performed}} | {{pen_date}} | {{pen_result}} | {{pen_issues}} |

### 5.4 Security Findings

| Finding | Severity | CVSS | Status | Remediation |
|---------|----------|------|--------|-------------|
| {{sec_finding_1}} | {{sec_severity_1}} | {{sec_cvss_1}} | {{sec_status_1}} | {{sec_fix_1}} |
| {{sec_finding_2}} | {{sec_severity_2}} | {{sec_cvss_2}} | {{sec_status_2}} | {{sec_fix_2}} |

---

## Observability Compliance

### 6.1 Logging Standards

| Criterion | Required | Implemented | Compliant |
|-----------|----------|-------------|-----------|
| Structured logging | Yes | {{struct_log}} | {{sl_compliant}} |
| Tenant ID in logs | Yes | {{tenant_log}} | {{tl_compliant}} |
| Request correlation | Yes | {{correlation}} | {{corr_compliant}} |
| No PII in logs | Yes | {{no_pii}} | {{np_compliant}} |
| Log levels appropriate | Yes | {{log_levels}} | {{ll_compliant}} |

### 6.2 Metrics Standards

| Metric Type | Required | Implemented | Labels |
|-------------|----------|-------------|--------|
| Request rate | Yes | {{req_rate}} | {{req_labels}} |
| Error rate | Yes | {{err_rate}} | {{err_labels}} |
| Latency | Yes | {{latency}} | {{lat_labels}} |
| Tenant-specific | Yes | {{tenant_metrics}} | {{tm_labels}} |

### 6.3 Tracing Standards

| Criterion | Required | Implemented | Compliant |
|-----------|----------|-------------|-----------|
| Trace propagation | Yes | {{trace_prop}} | {{tp_compliant}} |
| Span creation | Yes | {{span_create}} | {{sc_compliant}} |
| Tenant context in spans | Yes | {{span_tenant}} | {{st_compliant}} |
| Cross-service tracing | Yes | {{cross_trace}} | {{ct_compliant}} |

---

## Documentation Compliance

### 7.1 Required Documentation

| Document | Required | Exists | Complete | Current |
|----------|----------|--------|----------|---------|
| Module architecture | Yes | {{arch_doc}} | {{arch_complete}} | {{arch_current}} |
| API documentation | Yes | {{api_doc}} | {{api_complete}} | {{api_current}} |
| Facade contract | Yes | {{facade_doc}} | {{facade_complete}} | {{facade_current}} |
| Data model | Yes | {{data_doc}} | {{data_complete}} | {{data_current}} |
| Runbook | Yes | {{runbook_doc}} | {{runbook_complete}} | {{runbook_current}} |

### 7.2 Documentation Quality

| Aspect | Score | Notes |
|--------|-------|-------|
| Accuracy | {{accuracy_score}}/10 | {{accuracy_notes}} |
| Completeness | {{completeness_score}}/10 | {{completeness_notes}} |
| Clarity | {{clarity_score}}/10 | {{clarity_notes}} |
| Maintainability | {{maintainability_score}}/10 | {{maintainability_notes}} |

---

## Quality Gate Assessment

### 8.1 QG-M1 Module Architecture

| Check | Status | Evidence |
|-------|--------|----------|
| Module architecture document exists | {{m1_doc}} | {{m1_doc_evidence}} |
| Bounded context clearly defined | {{m1_context}} | {{m1_context_evidence}} |
| Dependencies documented | {{m1_deps}} | {{m1_deps_evidence}} |
| No prohibited dependencies | {{m1_no_prohibited}} | {{m1_prohibited_evidence}} |

### 8.2 QG-M2 Tenant Isolation

| Check | Status | Evidence |
|-------|--------|----------|
| Tenant context in all operations | {{m2_context}} | {{m2_context_evidence}} |
| Data isolation verified | {{m2_data}} | {{m2_data_evidence}} |
| Cache isolation verified | {{m2_cache}} | {{m2_cache_evidence}} |
| Cross-tenant tests pass | {{m2_tests}} | {{m2_tests_evidence}} |

### 8.3 QG-M3 (if AI module)

| Check | Status | Evidence |
|-------|--------|----------|
| Agent runtime documented | {{m3_runtime}} | {{m3_runtime_evidence}} |
| Tool registry complete | {{m3_tools}} | {{m3_tools_evidence}} |
| Memory tiers defined | {{m3_memory}} | {{m3_memory_evidence}} |
| Kill switch implemented | {{m3_killswitch}} | {{m3_killswitch_evidence}} |

### 8.4 Gate Outcome

**QG-M1 Outcome:** {{m1_outcome}}
**QG-M2 Outcome:** {{m2_outcome}}
**QG-M3 Outcome:** {{m3_outcome}}

**Overall Module Compliance:** {{overall_outcome}}

---

## Gap Analysis

### 9.1 Critical Gaps

| Gap | Category | Impact | Remediation | Due Date |
|-----|----------|--------|-------------|----------|
| {{critical_gap_1}} | {{cg_category_1}} | {{cg_impact_1}} | {{cg_fix_1}} | {{cg_due_1}} |
| {{critical_gap_2}} | {{cg_category_2}} | {{cg_impact_2}} | {{cg_fix_2}} | {{cg_due_2}} |

### 9.2 High Priority Gaps

| Gap | Category | Impact | Remediation | Due Date |
|-----|----------|--------|-------------|----------|
| {{high_gap_1}} | {{hg_category_1}} | {{hg_impact_1}} | {{hg_fix_1}} | {{hg_due_1}} |

### 9.3 Medium/Low Priority Gaps

| Gap | Priority | Category | Remediation |
|-----|----------|----------|-------------|
| {{gap_1}} | {{g_priority_1}} | {{g_category_1}} | {{g_fix_1}} |
| {{gap_2}} | {{g_priority_2}} | {{g_category_2}} | {{g_fix_2}} |

---

## Remediation Plan

### 10.1 Immediate Actions

| Action | Owner | Due Date | Status |
|--------|-------|----------|--------|
| {{immediate_1}} | {{imm_owner_1}} | {{imm_due_1}} | {{imm_status_1}} |
| {{immediate_2}} | {{imm_owner_2}} | {{imm_due_2}} | {{imm_status_2}} |

### 10.2 Short-term Actions (1-2 Sprints)

| Action | Owner | Sprint | Status |
|--------|-------|--------|--------|
| {{short_1}} | {{short_owner_1}} | {{short_sprint_1}} | {{short_status_1}} |
| {{short_2}} | {{short_owner_2}} | {{short_sprint_2}} | {{short_status_2}} |

### 10.3 Long-term Actions

| Action | Owner | Quarter | Priority |
|--------|-------|---------|----------|
| {{long_1}} | {{long_owner_1}} | {{long_quarter_1}} | {{long_priority_1}} |

---

## Sign-off

| Role | Name | Date | Approval |
|------|------|------|----------|
| Module Owner | {{module_owner}} | {{mo_date}} | {{mo_approval}} |
| Platform Architect | {{platform_arch}} | {{pa_date}} | {{pa_approval}} |
| Security Lead | {{security_lead}} | {{sl_date}} | {{sl_approval}} |
| Engineering Lead | {{eng_lead}} | {{el_date}} | {{el_approval}} |

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "module compliance assessment best practices {date}"
- "SaaS compliance verification patterns {date}"
- "multi-tenant compliance audit enterprise {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Verification Checklist

- [ ] Tenant context validated in all module operations
- [ ] Tier-specific behavior confirmed
- [ ] All compliance checks documented
- [ ] Gap analysis complete
- [ ] Remediation plan created with owners
- [ ] Sign-off obtained from required stakeholders
- [ ] Quality gate criteria met or exceptions documented

---

## Appendix A: Related Documents

- Master Architecture: `{{master_architecture_link}}`
- Module Architecture: `{{module_architecture_link}}`
- Facade Contract: `{{facade_contract_link}}`
- Quality Gates: `module-architecture.md`, `tenant-isolation.md`
- Pattern: `module-compliance` in `bam-patterns.csv`

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{assessor}} | Initial compliance assessment |
