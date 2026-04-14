---
name: smoke-test-report-template
description: Document smoke test execution results, critical path validation, and tenant impact verification for multi-tenant deployments
category: operations
version: 1.0.0
type: template
---

# Smoke Test Report: {{project_name}} - {{release_version}}

## Purpose

Use this template to document smoke test execution results for multi-tenant SaaS deployments. This report covers test suite execution, pass/fail results by component, critical path validation, tenant impact verification, and sign-off requirements to ensure deployment readiness and service quality across all tenant tiers.

## Document Metadata

| Field | Value |
|-------|-------|
| Project Name | {{project_name}} |
| Release Version | {{release_version}} |
| Test Execution Date | {{test_date}} |
| Test Environment | {{test_environment}} |
| Test Executor | {{test_executor}} |
| Report Generated | {{report_generated}} |
| Status | {{overall_status}} |
| Next Action | {{next_action}} |

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Test Suite Executed](#test-suite-executed)
3. [Pass/Fail by Component](#passfail-by-component)
4. [Critical Path Validation](#critical-path-validation)
5. [Tenant Impact Verification](#tenant-impact-verification)
6. [Performance Baseline](#performance-baseline)
7. [Test Failures Analysis](#test-failures-analysis)
8. [Environment Health](#environment-health)
9. [Sign-Off Checklist](#sign-off-checklist)
10. [Web Research Queries](#web-research-queries)
11. [Verification Checklist](#verification-checklist)
12. [Change Log](#change-log)

---

## Executive Summary

### Overall Test Results

| Metric | Value | Status |
|--------|-------|--------|
| Total Tests Executed | {{total_tests}} | - |
| Tests Passed | {{tests_passed}} | - |
| Tests Failed | {{tests_failed}} | {{fail_status}} |
| Tests Skipped | {{tests_skipped}} | - |
| Pass Rate | {{pass_rate}}% | {{rate_status}} |
| Execution Time | {{execution_time}} | - |
| Critical Path Status | {{critical_path_status}} | {{critical_status}} |

### Deployment Readiness

| Criteria | Status | Notes |
|----------|--------|-------|
| Critical tests passing | {{critical_tests_status}} | {{critical_notes}} |
| No P1 failures | {{p1_status}} | {{p1_notes}} |
| Performance within SLA | {{performance_status}} | {{performance_notes}} |
| All tenant tiers verified | {{tenant_status}} | {{tenant_notes}} |
| Security tests passing | {{security_status}} | {{security_notes}} |

### Recommendation

| Recommendation | {{recommendation}} |
|----------------|---------------------|
| Confidence Level | {{confidence_level}} |
| Risk Assessment | {{risk_assessment}} |
| Blocking Issues | {{blocking_issues}} |
| Proceed to Production | {{proceed_decision}} |

---

## Test Suite Executed

### Test Categories

| Category | Total | Passed | Failed | Skipped | Duration | Status |
|----------|-------|--------|--------|---------|----------|--------|
| Authentication | {{auth_total}} | {{auth_passed}} | {{auth_failed}} | {{auth_skipped}} | {{auth_duration}} | {{auth_status}} |
| Authorization | {{authz_total}} | {{authz_passed}} | {{authz_failed}} | {{authz_skipped}} | {{authz_duration}} | {{authz_status}} |
| API Endpoints | {{api_total}} | {{api_passed}} | {{api_failed}} | {{api_skipped}} | {{api_duration}} | {{api_status}} |
| Data Operations | {{data_total}} | {{data_passed}} | {{data_failed}} | {{data_skipped}} | {{data_duration}} | {{data_status}} |
| Integrations | {{int_total}} | {{int_passed}} | {{int_failed}} | {{int_skipped}} | {{int_duration}} | {{int_status}} |
| Background Jobs | {{job_total}} | {{job_passed}} | {{job_failed}} | {{job_skipped}} | {{job_duration}} | {{job_status}} |
| Webhooks | {{webhook_total}} | {{webhook_passed}} | {{webhook_failed}} | {{webhook_skipped}} | {{webhook_duration}} | {{webhook_status}} |
| Tenant Isolation | {{isolation_total}} | {{isolation_passed}} | {{isolation_failed}} | {{isolation_skipped}} | {{isolation_duration}} | {{isolation_status}} |

### Test Environment Configuration

| Setting | Value |
|---------|-------|
| Environment | {{environment}} |
| Kubernetes Cluster | {{cluster}} |
| Database | {{database}} |
| Cache | {{cache}} |
| Feature Flags | {{feature_flags}} |
| Test Data Set | {{test_data_set}} |
| Tenant Configuration | {{tenant_config}} |

### Test Execution Details

| Parameter | Value |
|-----------|-------|
| Test Runner | {{test_runner}} |
| Test Framework | {{test_framework}} |
| Parallel Execution | {{parallel_execution}} |
| Retry Count | {{retry_count}} |
| Timeout Settings | {{timeout_settings}} |
| Start Time | {{start_time}} |
| End Time | {{end_time}} |

---

## Pass/Fail by Component

### Service Components

| Service | Version | Total | Passed | Failed | Critical | Status |
|---------|---------|-------|--------|--------|----------|--------|
| API Gateway | {{api_gw_version}} | {{api_gw_total}} | {{api_gw_passed}} | {{api_gw_failed}} | {{api_gw_critical}} | {{api_gw_status}} |
| Auth Service | {{auth_svc_version}} | {{auth_svc_total}} | {{auth_svc_passed}} | {{auth_svc_failed}} | {{auth_svc_critical}} | {{auth_svc_status}} |
| Core Service | {{core_svc_version}} | {{core_svc_total}} | {{core_svc_passed}} | {{core_svc_failed}} | {{core_svc_critical}} | {{core_svc_status}} |
| Billing Service | {{bill_svc_version}} | {{bill_svc_total}} | {{bill_svc_passed}} | {{bill_svc_failed}} | {{bill_svc_critical}} | {{bill_svc_status}} |
| Worker Service | {{worker_svc_version}} | {{worker_svc_total}} | {{worker_svc_passed}} | {{worker_svc_failed}} | {{worker_svc_critical}} | {{worker_svc_status}} |
| AI Agent Service | {{agent_svc_version}} | {{agent_svc_total}} | {{agent_svc_passed}} | {{agent_svc_failed}} | {{agent_svc_critical}} | {{agent_svc_status}} |

### Infrastructure Components

| Component | Total | Passed | Failed | Status |
|-----------|-------|--------|--------|--------|
| PostgreSQL | {{pg_total}} | {{pg_passed}} | {{pg_failed}} | {{pg_status}} |
| Redis | {{redis_total}} | {{redis_passed}} | {{redis_failed}} | {{redis_status}} |
| Message Queue | {{mq_total}} | {{mq_passed}} | {{mq_failed}} | {{mq_status}} |
| Object Storage | {{s3_total}} | {{s3_passed}} | {{s3_failed}} | {{s3_status}} |
| CDN | {{cdn_total}} | {{cdn_passed}} | {{cdn_failed}} | {{cdn_status}} |

### External Integrations

| Integration | Total | Passed | Failed | Skip Reason | Status |
|-------------|-------|--------|--------|-------------|--------|
| {{integration_1}} | {{int1_total}} | {{int1_passed}} | {{int1_failed}} | {{int1_skip}} | {{int1_status}} |
| {{integration_2}} | {{int2_total}} | {{int2_passed}} | {{int2_failed}} | {{int2_skip}} | {{int2_status}} |
| {{integration_3}} | {{int3_total}} | {{int3_passed}} | {{int3_failed}} | {{int3_skip}} | {{int3_status}} |

---

## Critical Path Validation

### User Journey: Authentication and Access

| Step | Test ID | Description | Status | Duration |
|------|---------|-------------|--------|----------|
| 1 | CP-AUTH-001 | User login with valid credentials | {{cp_auth_001}} | {{cp_auth_001_dur}} |
| 2 | CP-AUTH-002 | MFA verification | {{cp_auth_002}} | {{cp_auth_002_dur}} |
| 3 | CP-AUTH-003 | Session token generation | {{cp_auth_003}} | {{cp_auth_003_dur}} |
| 4 | CP-AUTH-004 | Access tenant resources | {{cp_auth_004}} | {{cp_auth_004_dur}} |
| 5 | CP-AUTH-005 | Logout and session invalidation | {{cp_auth_005}} | {{cp_auth_005_dur}} |

### User Journey: Core Business Flow

| Step | Test ID | Description | Status | Duration |
|------|---------|-------------|--------|----------|
| 1 | CP-CORE-001 | Create resource | {{cp_core_001}} | {{cp_core_001_dur}} |
| 2 | CP-CORE-002 | Read resource | {{cp_core_002}} | {{cp_core_002_dur}} |
| 3 | CP-CORE-003 | Update resource | {{cp_core_003}} | {{cp_core_003_dur}} |
| 4 | CP-CORE-004 | Delete resource | {{cp_core_004}} | {{cp_core_004_dur}} |
| 5 | CP-CORE-005 | List resources with pagination | {{cp_core_005}} | {{cp_core_005_dur}} |
| 6 | CP-CORE-006 | Search with filters | {{cp_core_006}} | {{cp_core_006_dur}} |

### User Journey: AI Agent Interaction

| Step | Test ID | Description | Status | Duration |
|------|---------|-------------|--------|----------|
| 1 | CP-AI-001 | Initialize agent session | {{cp_ai_001}} | {{cp_ai_001_dur}} |
| 2 | CP-AI-002 | Submit agent task | {{cp_ai_002}} | {{cp_ai_002_dur}} |
| 3 | CP-AI-003 | Monitor task progress | {{cp_ai_003}} | {{cp_ai_003_dur}} |
| 4 | CP-AI-004 | Receive agent response | {{cp_ai_004}} | {{cp_ai_004_dur}} |
| 5 | CP-AI-005 | Tool execution validation | {{cp_ai_005}} | {{cp_ai_005_dur}} |
| 6 | CP-AI-006 | Agent session cleanup | {{cp_ai_006}} | {{cp_ai_006_dur}} |

### User Journey: Billing and Usage

| Step | Test ID | Description | Status | Duration |
|------|---------|-------------|--------|----------|
| 1 | CP-BILL-001 | Usage metering | {{cp_bill_001}} | {{cp_bill_001_dur}} |
| 2 | CP-BILL-002 | View usage dashboard | {{cp_bill_002}} | {{cp_bill_002_dur}} |
| 3 | CP-BILL-003 | Invoice generation | {{cp_bill_003}} | {{cp_bill_003_dur}} |
| 4 | CP-BILL-004 | Payment processing | {{cp_bill_004}} | {{cp_bill_004_dur}} |

### Critical Path Summary

| Journey | Total Steps | Passed | Failed | Status |
|---------|-------------|--------|--------|--------|
| Authentication | 5 | {{auth_journey_pass}} | {{auth_journey_fail}} | {{auth_journey_status}} |
| Core Business | 6 | {{core_journey_pass}} | {{core_journey_fail}} | {{core_journey_status}} |
| AI Agent | 6 | {{ai_journey_pass}} | {{ai_journey_fail}} | {{ai_journey_status}} |
| Billing | 4 | {{bill_journey_pass}} | {{bill_journey_fail}} | {{bill_journey_status}} |

---

## Tenant Impact Verification

### Tenant Isolation Tests

| Test ID | Description | Scope | Status | Severity |
|---------|-------------|-------|--------|----------|
| TI-001 | Cross-tenant data access blocked | All tiers | {{ti_001}} | Critical |
| TI-002 | RLS policies enforced | All tiers | {{ti_002}} | Critical |
| TI-003 | Tenant context propagation | All tiers | {{ti_003}} | Critical |
| TI-004 | API key tenant binding | All tiers | {{ti_004}} | Critical |
| TI-005 | Session tenant binding | All tiers | {{ti_005}} | Critical |
| TI-006 | File storage isolation | All tiers | {{ti_006}} | Critical |
| TI-007 | Cache key isolation | All tiers | {{ti_007}} | High |
| TI-008 | Queue message isolation | All tiers | {{ti_008}} | High |

### Per-Tier Functionality

| Test Category | Free Tier | Pro Tier | Enterprise Tier |
|---------------|-----------|----------|-----------------|
| Basic API access | {{free_api}} | {{pro_api}} | {{ent_api}} |
| Rate limit enforcement | {{free_rate}} | {{pro_rate}} | {{ent_rate}} |
| Feature flag gating | {{free_feature}} | {{pro_feature}} | {{ent_feature}} |
| Usage quota tracking | {{free_quota}} | {{pro_quota}} | {{ent_quota}} |
| Advanced features | N/A | {{pro_advanced}} | {{ent_advanced}} |
| Custom configuration | N/A | {{pro_custom}} | {{ent_custom}} |
| SSO integration | N/A | N/A | {{ent_sso}} |
| Dedicated resources | N/A | N/A | {{ent_dedicated}} |

### Sample Tenant Verification

| Tenant ID | Tier | Tests Run | Passed | Failed | Status |
|-----------|------|-----------|--------|--------|--------|
| {{tenant_1_id}} | {{tenant_1_tier}} | {{tenant_1_run}} | {{tenant_1_pass}} | {{tenant_1_fail}} | {{tenant_1_status}} |
| {{tenant_2_id}} | {{tenant_2_tier}} | {{tenant_2_run}} | {{tenant_2_pass}} | {{tenant_2_fail}} | {{tenant_2_status}} |
| {{tenant_3_id}} | {{tenant_3_tier}} | {{tenant_3_run}} | {{tenant_3_pass}} | {{tenant_3_fail}} | {{tenant_3_status}} |

---

## Performance Baseline

### Response Time Metrics

| Endpoint | p50 (ms) | p95 (ms) | p99 (ms) | SLA Target | Status |
|----------|----------|----------|----------|------------|--------|
| `GET /api/health` | {{health_p50}} | {{health_p95}} | {{health_p99}} | < 100ms | {{health_perf}} |
| `POST /api/auth/login` | {{login_p50}} | {{login_p95}} | {{login_p99}} | < 500ms | {{login_perf}} |
| `GET /api/resources` | {{list_p50}} | {{list_p95}} | {{list_p99}} | < 200ms | {{list_perf}} |
| `POST /api/resources` | {{create_p50}} | {{create_p95}} | {{create_p99}} | < 300ms | {{create_perf}} |
| `POST /api/agents/execute` | {{agent_p50}} | {{agent_p95}} | {{agent_p99}} | < 5000ms | {{agent_perf}} |

### Throughput Metrics

| Metric | Measured | Baseline | Variance | Status |
|--------|----------|----------|----------|--------|
| Requests/second | {{rps_measured}} | {{rps_baseline}} | {{rps_variance}} | {{rps_status}} |
| Concurrent users | {{users_measured}} | {{users_baseline}} | {{users_variance}} | {{users_status}} |
| Transaction rate | {{tps_measured}} | {{tps_baseline}} | {{tps_variance}} | {{tps_status}} |

### Resource Utilization

| Resource | Measured | Threshold | Status |
|----------|----------|-----------|--------|
| CPU utilization | {{cpu_util}} | < 70% | {{cpu_status}} |
| Memory utilization | {{mem_util}} | < 80% | {{mem_status}} |
| Database connections | {{db_conn}} | < 80% pool | {{db_conn_status}} |
| Cache hit rate | {{cache_hit}} | > 90% | {{cache_status}} |

---

## Test Failures Analysis

### Failed Tests Summary

| Test ID | Component | Description | Severity | Root Cause | Remediation |
|---------|-----------|-------------|----------|------------|-------------|
| {{fail_1_id}} | {{fail_1_comp}} | {{fail_1_desc}} | {{fail_1_sev}} | {{fail_1_cause}} | {{fail_1_fix}} |
| {{fail_2_id}} | {{fail_2_comp}} | {{fail_2_desc}} | {{fail_2_sev}} | {{fail_2_cause}} | {{fail_2_fix}} |
| {{fail_3_id}} | {{fail_3_comp}} | {{fail_3_desc}} | {{fail_3_sev}} | {{fail_3_cause}} | {{fail_3_fix}} |

### Failure Categorization

| Category | Count | Blocking | Action Required |
|----------|-------|----------|-----------------|
| Code defect | {{code_defect_count}} | {{code_defect_block}} | {{code_defect_action}} |
| Environment issue | {{env_issue_count}} | {{env_issue_block}} | {{env_issue_action}} |
| Test flakiness | {{flaky_count}} | {{flaky_block}} | {{flaky_action}} |
| Missing dependency | {{dep_count}} | {{dep_block}} | {{dep_action}} |
| Timeout | {{timeout_count}} | {{timeout_block}} | {{timeout_action}} |

### Skipped Tests

| Test ID | Reason | Expected Resolution | Impact Assessment |
|---------|--------|---------------------|-------------------|
| {{skip_1_id}} | {{skip_1_reason}} | {{skip_1_resolution}} | {{skip_1_impact}} |
| {{skip_2_id}} | {{skip_2_reason}} | {{skip_2_resolution}} | {{skip_2_impact}} |

---

## Environment Health

### Service Health Status

| Service | Status | Pods Ready | Restarts | Last Check |
|---------|--------|------------|----------|------------|
| {{service_1}} | {{svc1_status}} | {{svc1_pods}} | {{svc1_restarts}} | {{svc1_check}} |
| {{service_2}} | {{svc2_status}} | {{svc2_pods}} | {{svc2_restarts}} | {{svc2_check}} |
| {{service_3}} | {{svc3_status}} | {{svc3_pods}} | {{svc3_restarts}} | {{svc3_check}} |
| {{service_4}} | {{svc4_status}} | {{svc4_pods}} | {{svc4_restarts}} | {{svc4_check}} |

### Infrastructure Health

| Component | Status | Metric | Threshold | Actual |
|-----------|--------|--------|-----------|--------|
| Database | {{db_health}} | Connection count | < 80% | {{db_actual}} |
| Redis | {{redis_health}} | Memory usage | < 70% | {{redis_actual}} |
| Queue | {{queue_health}} | Queue depth | < 1000 | {{queue_actual}} |
| Storage | {{storage_health}} | Available space | > 20% | {{storage_actual}} |

### Active Alerts During Testing

| Alert ID | Severity | Description | Impact on Tests |
|----------|----------|-------------|-----------------|
| {{alert_1_id}} | {{alert_1_sev}} | {{alert_1_desc}} | {{alert_1_impact}} |
| {{alert_2_id}} | {{alert_2_sev}} | {{alert_2_desc}} | {{alert_2_impact}} |

---

## Sign-Off Checklist

### Technical Sign-Off

| Criteria | Required | Status | Signed By | Date |
|----------|----------|--------|-----------|------|
| All critical tests pass | Yes | {{crit_sign}} | {{crit_signer}} | {{crit_date}} |
| No P1/P2 failures | Yes | {{p1p2_sign}} | {{p1p2_signer}} | {{p1p2_date}} |
| Performance within SLA | Yes | {{perf_sign}} | {{perf_signer}} | {{perf_date}} |
| Tenant isolation verified | Yes | {{iso_sign}} | {{iso_signer}} | {{iso_date}} |
| Security tests passing | Yes | {{sec_sign}} | {{sec_signer}} | {{sec_date}} |

### Role-Based Sign-Off

| Role | Name | Approval | Date | Comments |
|------|------|----------|------|----------|
| QA Lead | {{qa_lead}} | {{qa_approval}} | {{qa_date}} | {{qa_comments}} |
| Engineering Lead | {{eng_lead}} | {{eng_approval}} | {{eng_date}} | {{eng_comments}} |
| Security Lead | {{sec_lead}} | {{sec_approval}} | {{sec_date}} | {{sec_comments}} |
| Product Owner | {{po}} | {{po_approval}} | {{po_date}} | {{po_comments}} |

### Deployment Authorization

| Attribute | Value |
|-----------|-------|
| Authorized to Deploy | {{deploy_authorized}} |
| Authorization Date | {{auth_date}} |
| Authorized By | {{authorized_by}} |
| Deployment Window | {{deploy_window}} |
| Rollback Plan Confirmed | {{rollback_confirmed}} |

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "smoke test automation best practices {date}"
- "multi-tenant SaaS deployment verification {date}"
- "production readiness checklist enterprise {date}"

Incorporate relevant findings into the document sections above.

---

## Verification Checklist

- [ ] All test categories have been executed and reported
- [ ] Test environment configuration is documented
- [ ] Pass/fail results are recorded for all service components
- [ ] Infrastructure component tests are complete
- [ ] Critical path tests cover authentication, core business, AI, and billing
- [ ] Tenant isolation tests all pass with critical severity
- [ ] Per-tier functionality is verified for Free, Pro, and Enterprise
- [ ] Sample tenants from each tier have been tested
- [ ] Performance metrics are within SLA thresholds
- [ ] All failed tests have root cause analysis
- [ ] Skipped tests have documented impact assessment
- [ ] Environment health is verified with no active critical alerts
- [ ] Technical sign-off criteria are all met
- [ ] All required role-based sign-offs are obtained
- [ ] Deployment authorization is documented

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial template creation |
