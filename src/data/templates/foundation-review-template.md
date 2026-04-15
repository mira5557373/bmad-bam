---
name: foundation-review-template
description: Template for master-architect foundation architecture reviews
category: architecture
version: 1.0.0
type: "architecture"
---

## Purpose

Template for master-architect foundation architecture reviews

# Foundation Architecture Review: {{project_name}}

> Project: {{project_name}}
> Review Date: {{date}}
> Version: {{version}}
> Reviewer: {{reviewer}}
> Status: {{review_status}}

---

## Review Overview

### 1.1 Review Context

| Field | Value |
|-------|-------|
| Review Type | {{review_type}} |
| Architecture Version | {{architecture_version}} |
| Target Release | {{target_release}} |
| Review Scope | {{review_scope}} |
| Previous Review Date | {{previous_review_date}} |

### 1.2 Review Objectives

- Validate foundation architecture against QG-F1 requirements
- Assess multi-tenant isolation strategy completeness
- Verify modular monolith boundary definitions
- Evaluate AI runtime architecture decisions
- Identify technical debt and risk factors

## Multi-Tenant Considerations

- Tenant isolation: {{isolation_approach}}
- Tier differentiation: {{tier_strategy}}
- Review scope: {{review_scope_details}}

### 1.3 Review Summary

| Category | Status | Score | Notes |
|----------|--------|-------|-------|
| Tenant Isolation | {{isolation_status}} | {{isolation_score}}/10 | {{isolation_notes}} |
| Module Boundaries | {{boundary_status}} | {{boundary_score}}/10 | {{boundary_notes}} |
| AI Runtime | {{runtime_status}} | {{runtime_score}}/10 | {{runtime_notes}} |
| Security | {{security_status}} | {{security_score}}/10 | {{security_notes}} |
| Scalability | {{scalability_status}} | {{scalability_score}}/10 | {{scalability_notes}} |
| **Overall** | {{overall_status}} | {{overall_score}}/10 | {{overall_notes}} |

---

## Architecture Assessment

### 2.1 Master Architecture Review

```
┌─────────────────────────────────────────────────────────────────┐
│                  Foundation Architecture Assessment              │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                   Master Architecture                      │  │
│  │  Status: {{master_arch_status}}                           │  │
│  │  Last Updated: {{master_arch_date}}                       │  │
│  │  Frozen: {{master_arch_frozen}}                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│          ┌───────────────────┼───────────────────┐              │
│          ▼                   ▼                   ▼              │
│   ┌────────────┐      ┌────────────┐      ┌────────────┐       │
│   │  Tenant    │      │  Module    │      │    AI      │       │
│   │  Model     │      │  Boundary  │      │  Runtime   │       │
│   │ {{tm_ok}}  │      │ {{mb_ok}}  │      │ {{ai_ok}}  │       │
│   └────────────┘      └────────────┘      └────────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Document Completeness

| Document | Required | Present | Complete | Issues |
|----------|----------|---------|----------|--------|
| Master Architecture | Yes | {{ma_present}} | {{ma_complete}} | {{ma_issues}} |
| Tenant Model Design | Yes | {{tm_present}} | {{tm_complete}} | {{tm_issues}} |
| Module Boundary Spec | Yes | {{mb_present}} | {{mb_complete}} | {{mb_issues}} |
| Facade Contracts | Yes | {{fc_present}} | {{fc_complete}} | {{fc_issues}} |
| Security Architecture | Yes | {{sa_present}} | {{sa_complete}} | {{sa_issues}} |
| AI Runtime Architecture | If using AI | {{ar_present}} | {{ar_complete}} | {{ar_issues}} |

---

## Tenant Isolation Review

### 3.1 Isolation Model Assessment

| Criterion | Expected | Actual | Gap | Risk |
|-----------|----------|--------|-----|------|
| Model Selection | Documented | {{isolation_model}} | {{isolation_gap}} | {{isolation_risk}} |
| Data Isolation | {{expected_data_iso}} | {{actual_data_iso}} | {{data_iso_gap}} | {{data_iso_risk}} |
| Compute Isolation | {{expected_compute_iso}} | {{actual_compute_iso}} | {{compute_iso_gap}} | {{compute_iso_risk}} |
| Network Isolation | {{expected_network_iso}} | {{actual_network_iso}} | {{network_iso_gap}} | {{network_iso_risk}} |

### 3.2 Tenant Context Propagation

| Layer | Implementation | Verified | Notes |
|-------|----------------|----------|-------|
| API Gateway | {{api_context}} | {{api_verified}} | {{api_notes}} |
| Service Layer | {{service_context}} | {{service_verified}} | {{service_notes}} |
| Database Layer | {{db_context}} | {{db_verified}} | {{db_notes}} |
| Cache Layer | {{cache_context}} | {{cache_verified}} | {{cache_notes}} |
| Message Queue | {{mq_context}} | {{mq_verified}} | {{mq_notes}} |
| Background Jobs | {{job_context}} | {{job_verified}} | {{job_notes}} |

### 3.3 Tier Differentiation

| Tier | Isolation Level | Resources | Verified |
|------|-----------------|-----------|----------|
| Free | {{free_isolation}} | {{free_resources}} | {{free_verified}} |
| Pro | {{pro_isolation}} | {{pro_resources}} | {{pro_verified}} |
| Enterprise | {{enterprise_isolation}} | {{enterprise_resources}} | {{enterprise_verified}} |

---

## Module Boundary Review

### 4.1 Module Inventory

| Module | Bounded Context | Facade Defined | Dependencies | Status |
|--------|-----------------|----------------|--------------|--------|
| {{module_1}} | {{context_1}} | {{facade_1}} | {{deps_1}} | {{status_1}} |
| {{module_2}} | {{context_2}} | {{facade_2}} | {{deps_2}} | {{status_2}} |
| {{module_3}} | {{context_3}} | {{facade_3}} | {{deps_3}} | {{status_3}} |
| {{module_4}} | {{context_4}} | {{facade_4}} | {{deps_4}} | {{status_4}} |

### 4.2 Dependency Analysis

```
┌─────────────────────────────────────────────────────────────────┐
│                    Module Dependency Graph                       │
│                                                                  │
│  {{dependency_graph}}                                           │
│                                                                  │
│  Legend:                                                         │
│  ──► Allowed dependency                                         │
│  ─ ─► Questionable dependency (review needed)                   │
│  ═══► Prohibited dependency (violation)                         │
└─────────────────────────────────────────────────────────────────┘
```

### 4.3 Facade Contract Assessment

| Module | Operations | Types Defined | Versioning | Compliance |
|--------|------------|---------------|------------|------------|
| {{module_1}} | {{ops_1}} | {{types_1}} | {{version_1}} | {{compliance_1}} |
| {{module_2}} | {{ops_2}} | {{types_2}} | {{version_2}} | {{compliance_2}} |
| {{module_3}} | {{ops_3}} | {{types_3}} | {{version_3}} | {{compliance_3}} |

### 4.4 Boundary Violations

| Violation | Modules | Description | Severity | Remediation |
|-----------|---------|-------------|----------|-------------|
| {{violation_1}} | {{violation_1_modules}} | {{violation_1_desc}} | {{violation_1_severity}} | {{violation_1_fix}} |
| {{violation_2}} | {{violation_2_modules}} | {{violation_2_desc}} | {{violation_2_severity}} | {{violation_2_fix}} |

---

## AI Runtime Review

### 5.1 Runtime Architecture Assessment

| Component | Expected | Actual | Status |
|-----------|----------|--------|--------|
| Framework | {{expected_framework}} | {{actual_framework}} | {{framework_status}} |
| State Management | {{expected_state}} | {{actual_state}} | {{state_status}} |
| Tool Registry | {{expected_tools}} | {{actual_tools}} | {{tools_status}} |
| Memory Tiers | {{expected_memory}} | {{actual_memory}} | {{memory_status}} |
| Kill Switch | Required | {{killswitch_present}} | {{killswitch_status}} |

### 5.2 Agent Safety Review

| Safety Mechanism | Required | Implemented | Verified |
|------------------|----------|-------------|----------|
| Tenant context in runs | Yes | {{run_context}} | {{run_verified}} |
| Tool access control | Yes | {{tool_access}} | {{tool_verified}} |
| Output sanitization | Yes | {{output_sanitize}} | {{output_verified}} |
| Rate limiting | Yes | {{rate_limit}} | {{rate_verified}} |
| Kill switch | Yes | {{killswitch}} | {{killswitch_verified}} |
| Memory isolation | Yes | {{memory_iso}} | {{memory_verified}} |

### 5.3 AI Risk Assessment

| Risk | Likelihood | Impact | Mitigation | Status |
|------|------------|--------|------------|--------|
| Cross-tenant data leak | {{leak_likelihood}} | High | {{leak_mitigation}} | {{leak_status}} |
| Prompt injection | {{injection_likelihood}} | {{injection_impact}} | {{injection_mitigation}} | {{injection_status}} |
| Runaway costs | {{cost_likelihood}} | {{cost_impact}} | {{cost_mitigation}} | {{cost_status}} |
| Model availability | {{availability_likelihood}} | {{availability_impact}} | {{availability_mitigation}} | {{availability_status}} |

---

## Security Review

### 6.1 Security Architecture Assessment

| Control | Expected | Implemented | Gap |
|---------|----------|-------------|-----|
| Authentication | {{expected_auth}} | {{actual_auth}} | {{auth_gap}} |
| Authorization | {{expected_authz}} | {{actual_authz}} | {{authz_gap}} |
| Encryption at Rest | {{expected_ear}} | {{actual_ear}} | {{ear_gap}} |
| Encryption in Transit | {{expected_eit}} | {{actual_eit}} | {{eit_gap}} |
| Audit Logging | {{expected_audit}} | {{actual_audit}} | {{audit_gap}} |
| Secret Management | {{expected_secrets}} | {{actual_secrets}} | {{secrets_gap}} |

### 6.2 Compliance Alignment

| Framework | Applicable | Assessment | Status |
|-----------|------------|------------|--------|
| SOC 2 | {{soc2_applicable}} | {{soc2_assessment}} | {{soc2_status}} |
| GDPR | {{gdpr_applicable}} | {{gdpr_assessment}} | {{gdpr_status}} |
| HIPAA | {{hipaa_applicable}} | {{hipaa_assessment}} | {{hipaa_status}} |
| PCI-DSS | {{pci_applicable}} | {{pci_assessment}} | {{pci_status}} |

---

## Scalability Review

### 7.1 Scalability Assessment

| Dimension | Target | Current Capacity | Gap |
|-----------|--------|------------------|-----|
| Tenant Count | {{target_tenants}} | {{current_tenants}} | {{tenant_gap}} |
| Users per Tenant | {{target_users}} | {{current_users}} | {{user_gap}} |
| Requests/Second | {{target_rps}} | {{current_rps}} | {{rps_gap}} |
| Data Volume | {{target_data}} | {{current_data}} | {{data_gap}} |
| Concurrent AI Runs | {{target_runs}} | {{current_runs}} | {{runs_gap}} |

### 7.2 Horizontal Scaling Readiness

| Component | Stateless | Scale Strategy | Bottleneck |
|-----------|-----------|----------------|------------|
| API Layer | {{api_stateless}} | {{api_scale}} | {{api_bottleneck}} |
| Service Layer | {{service_stateless}} | {{service_scale}} | {{service_bottleneck}} |
| Database | {{db_stateless}} | {{db_scale}} | {{db_bottleneck}} |
| Cache | {{cache_stateless}} | {{cache_scale}} | {{cache_bottleneck}} |
| AI Runtime | {{ai_stateless}} | {{ai_scale}} | {{ai_bottleneck}} |

---

## Technical Debt Assessment

### 8.1 Identified Technical Debt

| Item | Category | Impact | Effort | Priority |
|------|----------|--------|--------|----------|
| {{debt_1}} | {{debt_1_category}} | {{debt_1_impact}} | {{debt_1_effort}} | {{debt_1_priority}} |
| {{debt_2}} | {{debt_2_category}} | {{debt_2_impact}} | {{debt_2_effort}} | {{debt_2_priority}} |
| {{debt_3}} | {{debt_3_category}} | {{debt_3_impact}} | {{debt_3_effort}} | {{debt_3_priority}} |

### 8.2 Debt Remediation Plan

| Item | Target Date | Owner | Dependencies |
|------|-------------|-------|--------------|
| {{debt_1}} | {{debt_1_target}} | {{debt_1_owner}} | {{debt_1_deps}} |
| {{debt_2}} | {{debt_2_target}} | {{debt_2_owner}} | {{debt_2_deps}} |

---

## Findings and Recommendations

### 9.1 Critical Findings

| Finding | Impact | Recommendation | Priority |
|---------|--------|----------------|----------|
| {{critical_1}} | {{critical_1_impact}} | {{critical_1_rec}} | Critical |
| {{critical_2}} | {{critical_2_impact}} | {{critical_2_rec}} | Critical |

### 9.2 High Priority Findings

| Finding | Impact | Recommendation | Priority |
|---------|--------|----------------|----------|
| {{high_1}} | {{high_1_impact}} | {{high_1_rec}} | High |
| {{high_2}} | {{high_2_impact}} | {{high_2_rec}} | High |

### 9.3 Medium Priority Findings

| Finding | Impact | Recommendation | Priority |
|---------|--------|----------------|----------|
| {{medium_1}} | {{medium_1_impact}} | {{medium_1_rec}} | Medium |

### 9.4 Observations

| Observation | Category | Potential Impact |
|-------------|----------|------------------|
| {{observation_1}} | {{obs_1_category}} | {{obs_1_impact}} |
| {{observation_2}} | {{obs_2_category}} | {{obs_2_impact}} |

---

## Quality Gate Assessment

### 10.1 QG-F1 Checklist

| Check | Status | Evidence | Notes |
|-------|--------|----------|-------|
| Master architecture document exists | {{qgf1_doc}} | {{qgf1_doc_evidence}} | |
| Tenant model selected and documented | {{qgf1_tenant}} | {{qgf1_tenant_evidence}} | |
| Module boundaries defined | {{qgf1_modules}} | {{qgf1_modules_evidence}} | |
| Facade contracts specified | {{qgf1_facades}} | {{qgf1_facades_evidence}} | |
| AI runtime architecture (if applicable) | {{qgf1_ai}} | {{qgf1_ai_evidence}} | |
| Security architecture documented | {{qgf1_security}} | {{qgf1_security_evidence}} | |
| No critical gaps identified | {{qgf1_gaps}} | {{qgf1_gaps_evidence}} | |

### 10.2 Gate Outcome

| Outcome | Criteria |
|---------|----------|
| **PASS** | All critical checks pass, no critical findings |
| **CONDITIONAL** | Minor gaps with mitigation plan |
| **FAIL** | Critical findings require resolution |

**Review Outcome: {{gate_outcome}}**

**Conditions (if CONDITIONAL):**
{{gate_conditions}}

---

## Action Items

### 11.1 Immediate Actions (Before Next Phase)

| Action | Owner | Due Date | Status |
|--------|-------|----------|--------|
| {{action_1}} | {{action_1_owner}} | {{action_1_due}} | {{action_1_status}} |
| {{action_2}} | {{action_2_owner}} | {{action_2_due}} | {{action_2_status}} |

### 11.2 Follow-up Actions

| Action | Owner | Due Date | Status |
|--------|-------|----------|--------|
| {{followup_1}} | {{followup_1_owner}} | {{followup_1_due}} | {{followup_1_status}} |
| {{followup_2}} | {{followup_2_owner}} | {{followup_2_due}} | {{followup_2_status}} |

---

## Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Lead Architect | {{lead_architect}} | {{lead_date}} | {{lead_signature}} |
| Security Architect | {{security_architect}} | {{security_date}} | {{security_signature}} |
| Platform Architect | {{platform_architect}} | {{platform_date}} | {{platform_signature}} |
| Engineering Lead | {{eng_lead}} | {{eng_date}} | {{eng_signature}} |

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "foundation architecture review checklist {date}"
- "multi-tenant architecture assessment best practices {date}"
- "modular monolith boundary validation {date}"
- "AI runtime safety audit patterns {date}"

Incorporate relevant findings into the document sections above.
_Source: [URL]_ for key findings.

---

## Verification Checklist

- [ ] Tenant context validated across all modules
- [ ] Tier-specific behavior confirmed
- [ ] All findings categorized by severity
- [ ] Quality gate criteria documented
- [ ] Action items assigned with due dates
- [ ] Sign-off obtained from required stakeholders
- [ ] Remediation plan documented
- [ ] Web research findings incorporated

---

## Appendix A: Related Documents

- Master Architecture: `{{master_architecture_link}}`
- Tenant Model: `{{tenant_model_link}}`
- Quality Gate: `foundation-gate.md`
- Pattern: `foundation-architecture` in `bam-patterns.csv`

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{reviewer}} | Initial review |
