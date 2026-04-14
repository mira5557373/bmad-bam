---
name: tenant-story-template
description: Template for dev tenant user stories in multi-tenant SaaS development
category: development
version: 1.0.0
type: "documentation"
---

## Purpose

Template for dev tenant user stories in multi-tenant SaaS development

# Tenant User Story: {{story_id}}

> Project: {{project_name}}
> Module: {{module_name}}
> Sprint: {{sprint}}
> Date: {{date}}
> Author: {{author}}

---

## Story Overview

### 1.1 Story Identity

| Field | Value |
|-------|-------|
| Story ID | {{story_id}} |
| Epic | {{epic_id}} |
| Module | {{module_name}} |
| Priority | {{priority}} |
| Story Points | {{story_points}} |
| Status | {{status}} |

### 1.2 User Story Statement

As a **{{persona}}** in a **{{tenant_tier}}** tenant,
I want to **{{action}}**,
So that **{{benefit}}**.

### 1.3 Story Context

**Tenant Context:**
{{tenant_context_description}}

**AI Context (if applicable):**
{{ai_context_description}}

## Multi-Tenant Considerations

- Tenant isolation: {{isolation_approach}}
- Tier differentiation: {{tier_strategy}}
- Story scope: {{story_scope}}

---

## Acceptance Criteria

### 2.1 Functional Criteria

| # | Given | When | Then | Tenant Scope |
|---|-------|------|------|--------------|
| AC-1 | {{given_1}} | {{when_1}} | {{then_1}} | {{scope_1}} |
| AC-2 | {{given_2}} | {{when_2}} | {{then_2}} | {{scope_2}} |
| AC-3 | {{given_3}} | {{when_3}} | {{then_3}} | {{scope_3}} |
| AC-4 | {{given_4}} | {{when_4}} | {{then_4}} | {{scope_4}} |

### 2.2 Tenant Isolation Criteria

- [ ] All data operations are scoped to the current tenant_id
- [ ] No cross-tenant data access is possible
- [ ] Tenant context is validated at entry points
- [ ] Cache keys include tenant prefix
- [ ] Background jobs propagate tenant context
- [ ] Audit logs include tenant identifier

### 2.3 Tier-Specific Criteria

| Tier | Criteria | Behavior |
|------|----------|----------|
| Free | {{free_criteria}} | {{free_behavior}} |
| Pro | {{pro_criteria}} | {{pro_behavior}} |
| Enterprise | {{enterprise_criteria}} | {{enterprise_behavior}} |

### 2.4 AI/Agent Criteria (if applicable)

- [ ] Agent tools validate tenant context before execution
- [ ] Memory operations respect tenant boundaries
- [ ] AI outputs do not leak tenant information
- [ ] Rate limits applied per-tenant
- [ ] Kill switch accessible for tenant

---

## Technical Specification

### 3.1 API Endpoints

| Method | Endpoint | Description | Tenant Context |
|--------|----------|-------------|----------------|
| {{method_1}} | {{endpoint_1}} | {{desc_1}} | {{context_1}} |
| {{method_2}} | {{endpoint_2}} | {{desc_2}} | {{context_2}} |

### 3.2 Request/Response Schemas

**Request Schema:**
```yaml
{{request_schema}}
```

**Response Schema:**
```yaml
{{response_schema}}
```

### 3.3 Database Changes

| Table | Change Type | Description | Tenant Column |
|-------|-------------|-------------|---------------|
| {{table_1}} | {{change_1}} | {{table_desc_1}} | {{tenant_col_1}} |
| {{table_2}} | {{change_2}} | {{table_desc_2}} | {{tenant_col_2}} |

**RLS Policy Requirements:**
| Table | Policy Type | Policy Expression |
|-------|-------------|-------------------|
| {{table_1}} | {{policy_type_1}} | {{policy_expr_1}} |
| {{table_2}} | {{policy_type_2}} | {{policy_expr_2}} |

### 3.4 Service Layer

**Service Operations:**
| Operation | Input | Output | Tenant Handling |
|-----------|-------|--------|-----------------|
| {{operation_1}} | {{input_1}} | {{output_1}} | {{handling_1}} |
| {{operation_2}} | {{input_2}} | {{output_2}} | {{handling_2}} |

**Facade Updates:**
| Facade | Operation | Change |
|--------|-----------|--------|
| {{facade_1}} | {{facade_op_1}} | {{facade_change_1}} |

### 3.5 AI/Agent Changes (if applicable)

| Component | Change | Tenant Impact |
|-----------|--------|---------------|
| {{ai_component_1}} | {{ai_change_1}} | {{ai_impact_1}} |
| {{ai_component_2}} | {{ai_change_2}} | {{ai_impact_2}} |

---

## Dependencies

### 4.1 Upstream Dependencies

| Dependency | Type | Module | Status | Blocker |
|------------|------|--------|--------|---------|
| {{dep_1}} | {{dep_type_1}} | {{dep_module_1}} | {{dep_status_1}} | {{dep_blocker_1}} |
| {{dep_2}} | {{dep_type_2}} | {{dep_module_2}} | {{dep_status_2}} | {{dep_blocker_2}} |

### 4.2 Downstream Impact

| Affected | Type | Impact | Coordination |
|----------|------|--------|--------------|
| {{affected_1}} | {{affect_type_1}} | {{impact_1}} | {{coord_1}} |
| {{affected_2}} | {{affect_type_2}} | {{impact_2}} | {{coord_2}} |

### 4.3 Cross-Module Coordination

| Module | Facade Method | Contract Version | Notes |
|--------|---------------|------------------|-------|
| {{coord_module_1}} | {{coord_method_1}} | {{coord_version_1}} | {{coord_notes_1}} |

---

## Testing Requirements

### 5.1 Unit Tests

| Test Case | Description | Tenant Coverage |
|-----------|-------------|-----------------|
| {{unit_1}} | {{unit_desc_1}} | {{unit_tenant_1}} |
| {{unit_2}} | {{unit_desc_2}} | {{unit_tenant_2}} |
| {{unit_3}} | {{unit_desc_3}} | {{unit_tenant_3}} |

### 5.2 Integration Tests

| Test Case | Description | Tenants Used |
|-----------|-------------|--------------|
| {{int_1}} | {{int_desc_1}} | {{int_tenants_1}} |
| {{int_2}} | {{int_desc_2}} | {{int_tenants_2}} |

### 5.3 Isolation Tests

| Test Case | Attack Vector | Expected Result |
|-----------|---------------|-----------------|
| {{iso_1}} | Cross-tenant read | 404 Not Found |
| {{iso_2}} | Cross-tenant write | 403 Forbidden |
| {{iso_3}} | Tenant ID tampering | Rejected |

### 5.4 Tier-Specific Tests

| Tier | Test Case | Expected Behavior |
|------|-----------|-------------------|
| Free | {{free_test}} | {{free_expected}} |
| Pro | {{pro_test}} | {{pro_expected}} |
| Enterprise | {{enterprise_test}} | {{enterprise_expected}} |

---

## Implementation Tasks

### 6.1 Task Breakdown

| Task | Description | Estimate | Owner | Status |
|------|-------------|----------|-------|--------|
| {{task_1}} | {{task_desc_1}} | {{est_1}} | {{owner_1}} | {{task_status_1}} |
| {{task_2}} | {{task_desc_2}} | {{est_2}} | {{owner_2}} | {{task_status_2}} |
| {{task_3}} | {{task_desc_3}} | {{est_3}} | {{owner_3}} | {{task_status_3}} |
| {{task_4}} | {{task_desc_4}} | {{est_4}} | {{owner_4}} | {{task_status_4}} |
| {{task_5}} | {{task_desc_5}} | {{est_5}} | {{owner_5}} | {{task_status_5}} |

### 6.2 Implementation Checklist

**Pre-Implementation:**
- [ ] Design reviewed
- [ ] Dependencies available
- [ ] Test data prepared

**Implementation:**
- [ ] API endpoint implemented
- [ ] Service layer implemented
- [ ] Database migrations created
- [ ] RLS policies added
- [ ] Facade updated

**Post-Implementation:**
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] Isolation tests passing
- [ ] Code reviewed
- [ ] Documentation updated

---

## Observability

### 7.1 Logging Requirements

| Log Event | Level | Fields | Example |
|-----------|-------|--------|---------|
| {{log_event_1}} | {{log_level_1}} | {{log_fields_1}} | {{log_example_1}} |
| {{log_event_2}} | {{log_level_2}} | {{log_fields_2}} | {{log_example_2}} |

### 7.2 Metrics Requirements

| Metric | Type | Labels | Purpose |
|--------|------|--------|---------|
| {{metric_1}} | {{metric_type_1}} | {{metric_labels_1}} | {{metric_purpose_1}} |
| {{metric_2}} | {{metric_type_2}} | {{metric_labels_2}} | {{metric_purpose_2}} |

### 7.3 Alerts

| Alert | Condition | Severity | Runbook |
|-------|-----------|----------|---------|
| {{alert_1}} | {{alert_condition_1}} | {{alert_severity_1}} | {{alert_runbook_1}} |

---

## Non-Functional Requirements

### 8.1 Performance

| Metric | Target | Measurement |
|--------|--------|-------------|
| Response time P95 | {{p95_target}} | {{p95_measurement}} |
| Throughput | {{throughput_target}} | {{throughput_measurement}} |
| Database queries | {{query_target}} | {{query_measurement}} |

### 8.2 Security

| Requirement | Implementation |
|-------------|----------------|
| Authentication | {{auth_impl}} |
| Authorization | {{authz_impl}} |
| Data protection | {{data_protection}} |
| Audit trail | {{audit_trail}} |

### 8.3 Scalability

| Scenario | Behavior | Notes |
|----------|----------|-------|
| High tenant count | {{high_tenant_behavior}} | {{high_tenant_notes}} |
| High concurrent users | {{high_user_behavior}} | {{high_user_notes}} |
| Large data volume | {{large_data_behavior}} | {{large_data_notes}} |

---

## Rollout Plan

### 9.1 Feature Flag

| Flag Name | Default | Tenant Override |
|-----------|---------|-----------------|
| {{flag_name}} | {{flag_default}} | {{flag_override}} |

### 9.2 Rollout Phases

| Phase | Scope | Duration | Success Criteria |
|-------|-------|----------|------------------|
| 1 | {{phase_1_scope}} | {{phase_1_duration}} | {{phase_1_criteria}} |
| 2 | {{phase_2_scope}} | {{phase_2_duration}} | {{phase_2_criteria}} |
| 3 | {{phase_3_scope}} | {{phase_3_duration}} | {{phase_3_criteria}} |

### 9.3 Rollback Plan

**Trigger Conditions:**
- {{rollback_trigger_1}}
- {{rollback_trigger_2}}

**Rollback Steps:**
1. {{rollback_step_1}}
2. {{rollback_step_2}}
3. {{rollback_step_3}}

---

## Documentation

### 10.1 User Documentation

| Document | Update Type | Owner |
|----------|-------------|-------|
| {{user_doc_1}} | {{doc_update_1}} | {{doc_owner_1}} |
| {{user_doc_2}} | {{doc_update_2}} | {{doc_owner_2}} |

### 10.2 Technical Documentation

| Document | Update Type | Owner |
|----------|-------------|-------|
| API docs | {{api_doc_update}} | {{api_doc_owner}} |
| Architecture | {{arch_doc_update}} | {{arch_doc_owner}} |
| Runbook | {{runbook_update}} | {{runbook_owner}} |

---

## Definition of Done

### 11.1 Code Complete

- [ ] All acceptance criteria met
- [ ] All tasks completed
- [ ] Code reviewed and approved
- [ ] No critical code smells

### 11.2 Quality Complete

- [ ] Unit test coverage >= {{coverage_target}}%
- [ ] Integration tests passing
- [ ] Isolation tests passing
- [ ] No security vulnerabilities
- [ ] Performance targets met

### 11.3 Documentation Complete

- [ ] API documentation updated
- [ ] Runbook updated
- [ ] User documentation updated
- [ ] Release notes drafted

### 11.4 Tenant Isolation Verified

- [ ] Cross-tenant access tests pass
- [ ] RLS policies verified
- [ ] Cache isolation verified
- [ ] Audit logging verified

---

## Notes and Context

### 12.1 Technical Notes

{{technical_notes}}

### 12.2 Business Context

{{business_context}}

### 12.3 Open Questions

| Question | Status | Answer |
|----------|--------|--------|
| {{question_1}} | {{q_status_1}} | {{answer_1}} |
| {{question_2}} | {{q_status_2}} | {{answer_2}} |

### 12.4 Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| {{risk_1}} | {{likelihood_1}} | {{impact_1}} | {{mitigation_1}} |
| {{risk_2}} | {{likelihood_2}} | {{impact_2}} | {{mitigation_2}} |

---

## Appendix A: Related Documents

- Epic: `{{epic_link}}`
- Module Architecture: `{{module_arch_link}}`
- Facade Contract: `{{facade_link}}`
- Template: `story-template.md`
- Pattern: `tenant-story` in `bam-patterns.csv`

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "tenant lifecycle SaaS patterns {date}"
- "multi-tenant user story patterns {date}"
- "tenant-aware acceptance criteria best practices {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Verification Checklist

- [ ] Tenant context validated in story
- [ ] Tier-specific behavior confirmed
- [ ] All acceptance criteria complete
- [ ] Isolation criteria included
- [ ] Testing requirements defined
- [ ] Implementation tasks documented
- [ ] Definition of done met

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial story |
