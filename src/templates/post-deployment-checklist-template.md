---
name: post-deployment-checklist-template
description: Define post-deployment health checks, monitoring verification, and rollback readiness for multi-tenant SaaS releases
category: operations
version: 1.0.0
type: template
---

# Post-Deployment Checklist: {{project_name}} - {{release_version}}

## Purpose

Use this template to verify deployment success for multi-tenant SaaS platforms. This checklist covers health checks, monitoring verification, performance baseline validation, tenant-specific verification, and rollback readiness assessment to ensure service stability and quality across all tenant tiers after deployment.

## Document Metadata

| Field | Value |
|-------|-------|
| Project Name | {{project_name}} |
| Release Version | {{release_version}} |
| Deployment Date | {{deployment_date}} |
| Deployment Time | {{deployment_time}} |
| Environment | {{environment}} |
| Deployed By | {{deployed_by}} |
| Verification By | {{verified_by}} |
| Status | {{overall_status}} |

## Table of Contents

1. [Deployment Summary](#deployment-summary)
2. [Health Checks](#health-checks)
3. [Monitoring Verification](#monitoring-verification)
4. [Performance Baseline](#performance-baseline)
5. [Tenant Validation](#tenant-validation)
6. [Rollback Readiness](#rollback-readiness)
7. [Security Verification](#security-verification)
8. [Integration Verification](#integration-verification)
9. [Documentation Updates](#documentation-updates)
10. [Sign-Off](#sign-off)
11. [Web Research Queries](#web-research-queries)
12. [Verification Checklist](#verification-checklist)
13. [Change Log](#change-log)

---

## Deployment Summary

### Release Information

| Attribute | Value |
|-----------|-------|
| Release Version | {{release_version}} |
| Previous Version | {{previous_version}} |
| Release Type | {{release_type}} |
| Change Scope | {{change_scope}} |
| Database Migrations | {{migrations_applied}} |
| Feature Flags Changed | {{flags_changed}} |
| Config Updates | {{config_updates}} |

### Deployment Timeline

| Milestone | Planned Time | Actual Time | Status |
|-----------|--------------|-------------|--------|
| Deployment started | {{deploy_start_planned}} | {{deploy_start_actual}} | {{deploy_start_status}} |
| Traffic cutover | {{cutover_planned}} | {{cutover_actual}} | {{cutover_status}} |
| Health checks passed | {{health_planned}} | {{health_actual}} | {{health_status}} |
| Deployment completed | {{deploy_end_planned}} | {{deploy_end_actual}} | {{deploy_end_status}} |

### Affected Components

| Component | Previous Version | New Version | Status |
|-----------|------------------|-------------|--------|
| {{component_1}} | {{prev_ver_1}} | {{new_ver_1}} | {{comp_status_1}} |
| {{component_2}} | {{prev_ver_2}} | {{new_ver_2}} | {{comp_status_2}} |
| {{component_3}} | {{prev_ver_3}} | {{new_ver_3}} | {{comp_status_3}} |
| {{component_4}} | {{prev_ver_4}} | {{new_ver_4}} | {{comp_status_4}} |

---

## Health Checks

### Service Health Endpoints

| Service | Endpoint | Expected | Actual | Status | Checked At |
|---------|----------|----------|--------|--------|------------|
| API Gateway | `/health` | 200 OK | {{api_gw_response}} | {{api_gw_status}} | {{api_gw_time}} |
| Auth Service | `/health` | 200 OK | {{auth_response}} | {{auth_status}} | {{auth_time}} |
| Core Service | `/health` | 200 OK | {{core_response}} | {{core_status}} | {{core_time}} |
| Billing Service | `/health` | 200 OK | {{billing_response}} | {{billing_status}} | {{billing_time}} |
| Worker Service | `/health` | 200 OK | {{worker_response}} | {{worker_status}} | {{worker_time}} |
| Agent Service | `/health` | 200 OK | {{agent_response}} | {{agent_status}} | {{agent_time}} |

### Deep Health Checks

| Check | Command | Expected | Actual | Status |
|-------|---------|----------|--------|--------|
| Database connectivity | `./health-check --db` | Connected | {{db_conn_actual}} | {{db_conn_status}} |
| Cache connectivity | `./health-check --cache` | Connected | {{cache_conn_actual}} | {{cache_conn_status}} |
| Queue connectivity | `./health-check --queue` | Connected | {{queue_conn_actual}} | {{queue_conn_status}} |
| Storage accessibility | `./health-check --storage` | Accessible | {{storage_actual}} | {{storage_status}} |
| External API reachability | `./health-check --external` | Reachable | {{external_actual}} | {{external_status}} |

### Kubernetes Health

| Resource | Namespace | Expected | Actual | Status |
|----------|-----------|----------|--------|--------|
| Deployments ready | {{namespace}} | All ready | {{deploy_actual}} | {{deploy_status}} |
| Pods running | {{namespace}} | All running | {{pods_actual}} | {{pods_status}} |
| Services available | {{namespace}} | All available | {{svc_actual}} | {{svc_status}} |
| Ingress configured | {{namespace}} | Configured | {{ingress_actual}} | {{ingress_status}} |
| ConfigMaps applied | {{namespace}} | Applied | {{config_actual}} | {{config_status}} |
| Secrets mounted | {{namespace}} | Mounted | {{secrets_actual}} | {{secrets_status}} |

### Health Check Summary

| Category | Total Checks | Passed | Failed | Status |
|----------|--------------|--------|--------|--------|
| Service endpoints | {{svc_total}} | {{svc_passed}} | {{svc_failed}} | {{svc_summary}} |
| Deep health | {{deep_total}} | {{deep_passed}} | {{deep_failed}} | {{deep_summary}} |
| Kubernetes | {{k8s_total}} | {{k8s_passed}} | {{k8s_failed}} | {{k8s_summary}} |
| **Overall** | {{health_total}} | {{health_passed}} | {{health_failed}} | **{{health_overall}}** |

---

## Monitoring Verification

### Dashboard Availability

| Dashboard | URL | Status | Last Data Point |
|-----------|-----|--------|-----------------|
| Service Overview | {{dashboard_1_url}} | {{dash_1_status}} | {{dash_1_data}} |
| API Metrics | {{dashboard_2_url}} | {{dash_2_status}} | {{dash_2_data}} |
| Error Tracking | {{dashboard_3_url}} | {{dash_3_status}} | {{dash_3_data}} |
| Tenant Metrics | {{dashboard_4_url}} | {{dash_4_status}} | {{dash_4_data}} |
| AI Agent Metrics | {{dashboard_5_url}} | {{dash_5_status}} | {{dash_5_data}} |

### Alert Configuration

| Alert | Threshold | Status | Last Triggered | Test Result |
|-------|-----------|--------|----------------|-------------|
| High error rate | > 5% | {{alert_1_status}} | {{alert_1_last}} | {{alert_1_test}} |
| High latency | p99 > 2s | {{alert_2_status}} | {{alert_2_last}} | {{alert_2_test}} |
| Service down | Any service | {{alert_3_status}} | {{alert_3_last}} | {{alert_3_test}} |
| Database connection pool | > 90% | {{alert_4_status}} | {{alert_4_last}} | {{alert_4_test}} |
| Memory pressure | > 85% | {{alert_5_status}} | {{alert_5_last}} | {{alert_5_test}} |
| Cross-tenant access | Any attempt | {{alert_6_status}} | {{alert_6_last}} | {{alert_6_test}} |

### Log Aggregation

| Log Source | Status | Recent Errors | Error Pattern |
|------------|--------|---------------|---------------|
| Application logs | {{app_log_status}} | {{app_log_errors}} | {{app_log_pattern}} |
| Access logs | {{access_log_status}} | {{access_log_errors}} | {{access_log_pattern}} |
| Security logs | {{sec_log_status}} | {{sec_log_errors}} | {{sec_log_pattern}} |
| Audit logs | {{audit_log_status}} | {{audit_log_errors}} | {{audit_log_pattern}} |

### Metrics Pipeline

| Component | Status | Lag | Data Quality |
|-----------|--------|-----|--------------|
| Prometheus | {{prom_status}} | {{prom_lag}} | {{prom_quality}} |
| Alertmanager | {{am_status}} | {{am_lag}} | {{am_quality}} |
| Grafana | {{grafana_status}} | {{grafana_lag}} | {{grafana_quality}} |
| Log aggregator | {{log_agg_status}} | {{log_agg_lag}} | {{log_agg_quality}} |
| Tracing | {{tracing_status}} | {{tracing_lag}} | {{tracing_quality}} |

---

## Performance Baseline

### Response Time Comparison

| Endpoint | Pre-Deploy p50 | Post-Deploy p50 | Change | Pre-Deploy p99 | Post-Deploy p99 | Change | Status |
|----------|----------------|-----------------|--------|----------------|-----------------|--------|--------|
| Auth endpoints | {{auth_pre_p50}} | {{auth_post_p50}} | {{auth_change_p50}} | {{auth_pre_p99}} | {{auth_post_p99}} | {{auth_change_p99}} | {{auth_perf_status}} |
| CRUD operations | {{crud_pre_p50}} | {{crud_post_p50}} | {{crud_change_p50}} | {{crud_pre_p99}} | {{crud_post_p99}} | {{crud_change_p99}} | {{crud_perf_status}} |
| List/search | {{list_pre_p50}} | {{list_post_p50}} | {{list_change_p50}} | {{list_pre_p99}} | {{list_post_p99}} | {{list_change_p99}} | {{list_perf_status}} |
| Agent execution | {{agent_pre_p50}} | {{agent_post_p50}} | {{agent_change_p50}} | {{agent_pre_p99}} | {{agent_post_p99}} | {{agent_change_p99}} | {{agent_perf_status}} |

### Throughput Metrics

| Metric | Baseline | Current | Variance | Threshold | Status |
|--------|----------|---------|----------|-----------|--------|
| Requests/second | {{rps_baseline}} | {{rps_current}} | {{rps_variance}} | +/- 10% | {{rps_status}} |
| Concurrent connections | {{conn_baseline}} | {{conn_current}} | {{conn_variance}} | +/- 15% | {{conn_status}} |
| Transactions/minute | {{tpm_baseline}} | {{tpm_current}} | {{tpm_variance}} | +/- 10% | {{tpm_status}} |

### Resource Utilization

| Resource | Pre-Deploy | Post-Deploy | Change | Threshold | Status |
|----------|------------|-------------|--------|-----------|--------|
| CPU average | {{cpu_pre}} | {{cpu_post}} | {{cpu_change}} | < 70% | {{cpu_status}} |
| Memory average | {{mem_pre}} | {{mem_post}} | {{mem_change}} | < 80% | {{mem_status}} |
| Database CPU | {{db_cpu_pre}} | {{db_cpu_post}} | {{db_cpu_change}} | < 60% | {{db_cpu_status}} |
| Database connections | {{db_conn_pre}} | {{db_conn_post}} | {{db_conn_change}} | < 80% | {{db_conn_status}} |
| Cache memory | {{cache_pre}} | {{cache_post}} | {{cache_change}} | < 70% | {{cache_status}} |

### SLA Compliance

| SLA Metric | Target | Current | Status |
|------------|--------|---------|--------|
| Availability | 99.9% | {{avail_current}} | {{avail_status}} |
| Response time p99 | < 2s | {{resp_current}} | {{resp_status}} |
| Error rate | < 0.1% | {{error_current}} | {{error_status}} |
| Throughput | > baseline | {{throughput_current}} | {{throughput_status}} |

---

## Tenant Validation

### Tenant Access Verification

| Tenant Tier | Sample Size | Login Success | API Access | Data Isolation | Status |
|-------------|-------------|---------------|------------|----------------|--------|
| Enterprise | {{ent_sample}} | {{ent_login}} | {{ent_api}} | {{ent_isolation}} | {{ent_status}} |
| Pro | {{pro_sample}} | {{pro_login}} | {{pro_api}} | {{pro_isolation}} | {{pro_status}} |
| Free | {{free_sample}} | {{free_login}} | {{free_api}} | {{free_isolation}} | {{free_status}} |

### Feature Availability by Tier

| Feature | Free | Pro | Enterprise | Verified |
|---------|------|-----|------------|----------|
| Core API access | {{free_core}} | {{pro_core}} | {{ent_core}} | {{core_verified}} |
| Advanced features | N/A | {{pro_advanced}} | {{ent_advanced}} | {{advanced_verified}} |
| AI agent execution | {{free_agent}} | {{pro_agent}} | {{ent_agent}} | {{agent_verified}} |
| Custom integrations | N/A | {{pro_integ}} | {{ent_integ}} | {{integ_verified}} |
| SSO | N/A | N/A | {{ent_sso}} | {{sso_verified}} |

### Tenant-Specific Checks

| Check | Method | Result | Status |
|-------|--------|--------|--------|
| RLS policies active | Query pg_policies | {{rls_result}} | {{rls_status}} |
| Tenant context propagation | Trace sampling | {{context_result}} | {{context_status}} |
| Cross-tenant query blocked | Isolation test | {{cross_result}} | {{cross_status}} |
| Per-tenant rate limits | Load test | {{rate_result}} | {{rate_status}} |
| Tenant data encryption | Key verification | {{encrypt_result}} | {{encrypt_status}} |

### Critical Tenant Communication

| Tenant | Tier | Specific Impact | Notified | Confirmation |
|--------|------|-----------------|----------|--------------|
| {{critical_tenant_1}} | {{ct1_tier}} | {{ct1_impact}} | {{ct1_notified}} | {{ct1_confirm}} |
| {{critical_tenant_2}} | {{ct2_tier}} | {{ct2_impact}} | {{ct2_notified}} | {{ct2_confirm}} |
| {{critical_tenant_3}} | {{ct3_tier}} | {{ct3_impact}} | {{ct3_notified}} | {{ct3_confirm}} |

---

## Rollback Readiness

### Rollback Artifacts

| Artifact | Location | Version | Verified | Status |
|----------|----------|---------|----------|--------|
| Previous container images | {{image_registry}} | {{prev_image_ver}} | {{image_verified}} | {{image_status}} |
| Database rollback script | {{db_script_loc}} | {{db_script_ver}} | {{db_verified}} | {{db_status}} |
| Configuration backup | {{config_backup_loc}} | {{config_ver}} | {{config_verified}} | {{config_status}} |
| Feature flag snapshot | {{flag_snapshot_loc}} | {{flag_ver}} | {{flag_verified}} | {{flag_status}} |

### Rollback Procedure Verification

| Step | Description | Command Available | Tested | Status |
|------|-------------|-------------------|--------|--------|
| 1 | Enable maintenance mode | {{maint_cmd}} | {{maint_tested}} | {{maint_status}} |
| 2 | Drain traffic | {{drain_cmd}} | {{drain_tested}} | {{drain_status}} |
| 3 | Rollback deployment | {{rollback_cmd}} | {{rollback_tested}} | {{rollback_status}} |
| 4 | Rollback database | {{db_roll_cmd}} | {{db_roll_tested}} | {{db_roll_status}} |
| 5 | Restore config | {{restore_cmd}} | {{restore_tested}} | {{restore_status}} |
| 6 | Disable maintenance | {{disable_cmd}} | {{disable_tested}} | {{disable_status}} |

### Rollback Decision Criteria

| Trigger | Threshold | Current Value | Status |
|---------|-----------|---------------|--------|
| Error rate | > 5% | {{error_rate_current}} | {{error_trigger}} |
| Latency p99 | > 2x baseline | {{latency_current}} | {{latency_trigger}} |
| Critical feature failure | Any | {{crit_feature_current}} | {{crit_trigger}} |
| Data integrity issue | Any | {{data_integrity_current}} | {{data_trigger}} |
| Security incident | Any | {{security_current}} | {{security_trigger}} |

### Rollback Authorization

| Role | Name | Contact | Available |
|------|------|---------|-----------|
| On-call engineer | {{oncall_eng}} | {{oncall_eng_contact}} | {{oncall_eng_avail}} |
| Team lead | {{team_lead}} | {{team_lead_contact}} | {{team_lead_avail}} |
| Engineering manager | {{eng_mgr}} | {{eng_mgr_contact}} | {{eng_mgr_avail}} |

---

## Security Verification

### Security Checks

| Check | Method | Expected | Actual | Status |
|-------|--------|----------|--------|--------|
| TLS/SSL certificates | Certificate inspection | Valid | {{ssl_actual}} | {{ssl_status}} |
| Security headers | Header scan | All present | {{headers_actual}} | {{headers_status}} |
| Authentication flow | Auth test | Working | {{auth_flow_actual}} | {{auth_flow_status}} |
| Authorization rules | RBAC test | Enforced | {{authz_actual}} | {{authz_status}} |
| API rate limiting | Rate test | Active | {{rate_actual}} | {{rate_status}} |
| Input validation | Injection test | Blocked | {{input_actual}} | {{input_status}} |

### Compliance Verification

| Control | Requirement | Status | Evidence |
|---------|-------------|--------|----------|
| Audit logging | All mutations logged | {{audit_status}} | {{audit_evidence}} |
| Data encryption | At-rest encryption | {{encrypt_status}} | {{encrypt_evidence}} |
| Access controls | Least privilege | {{access_status}} | {{access_evidence}} |
| Session management | Secure sessions | {{session_status}} | {{session_evidence}} |

---

## Integration Verification

### External Integration Status

| Integration | Endpoint | Status | Last Success | Error Rate |
|-------------|----------|--------|--------------|------------|
| {{integration_1}} | {{int_1_endpoint}} | {{int_1_status}} | {{int_1_success}} | {{int_1_error}} |
| {{integration_2}} | {{int_2_endpoint}} | {{int_2_status}} | {{int_2_success}} | {{int_2_error}} |
| {{integration_3}} | {{int_3_endpoint}} | {{int_3_status}} | {{int_3_success}} | {{int_3_error}} |

### Webhook Delivery

| Webhook Type | Target | Success Rate | Average Latency | Status |
|--------------|--------|--------------|-----------------|--------|
| {{webhook_1}} | {{wh_1_target}} | {{wh_1_success}} | {{wh_1_latency}} | {{wh_1_status}} |
| {{webhook_2}} | {{wh_2_target}} | {{wh_2_success}} | {{wh_2_latency}} | {{wh_2_status}} |

### API Partner Verification

| Partner | Integration Type | Verified | Notes |
|---------|------------------|----------|-------|
| {{partner_1}} | {{p1_type}} | {{p1_verified}} | {{p1_notes}} |
| {{partner_2}} | {{p2_type}} | {{p2_verified}} | {{p2_notes}} |

---

## Documentation Updates

### Documentation Checklist

| Document | Update Required | Updated | Location |
|----------|-----------------|---------|----------|
| Release notes | {{rn_required}} | {{rn_updated}} | {{rn_location}} |
| API documentation | {{api_doc_required}} | {{api_doc_updated}} | {{api_doc_location}} |
| Runbooks | {{runbook_required}} | {{runbook_updated}} | {{runbook_location}} |
| Architecture diagrams | {{arch_required}} | {{arch_updated}} | {{arch_location}} |
| Configuration reference | {{config_doc_required}} | {{config_doc_updated}} | {{config_doc_location}} |

### Change Communication

| Audience | Method | Sent | Confirmed |
|----------|--------|------|-----------|
| Internal team | Slack | {{internal_sent}} | {{internal_confirmed}} |
| Support team | Email | {{support_sent}} | {{support_confirmed}} |
| Customers (if needed) | Email/In-app | {{customer_sent}} | {{customer_confirmed}} |

---

## Sign-Off

### Technical Sign-Off

| Criteria | Required | Met | Signed By | Date |
|----------|----------|-----|-----------|------|
| Health checks passing | Yes | {{health_met}} | {{health_signer}} | {{health_sign_date}} |
| Monitoring verified | Yes | {{monitor_met}} | {{monitor_signer}} | {{monitor_sign_date}} |
| Performance acceptable | Yes | {{perf_met}} | {{perf_signer}} | {{perf_sign_date}} |
| Tenant access verified | Yes | {{tenant_met}} | {{tenant_signer}} | {{tenant_sign_date}} |
| Rollback ready | Yes | {{rollback_met}} | {{rollback_signer}} | {{rollback_sign_date}} |
| Security verified | Yes | {{security_met}} | {{security_signer}} | {{security_sign_date}} |

### Final Approval

| Role | Name | Approval | Date | Comments |
|------|------|----------|------|----------|
| Deployment Lead | {{deploy_lead}} | {{deploy_approval}} | {{deploy_date}} | {{deploy_comments}} |
| On-Call Lead | {{oncall_lead}} | {{oncall_approval}} | {{oncall_date}} | {{oncall_comments}} |
| Engineering Manager | {{eng_manager}} | {{eng_approval}} | {{eng_date}} | {{eng_comments}} |

### Deployment Declared Successful

| Attribute | Value |
|-----------|-------|
| Success Declared | {{success_declared}} |
| Declaration Time | {{declaration_time}} |
| Declared By | {{declared_by}} |
| Monitoring Period | {{monitoring_period}} |
| Next Review | {{next_review}} |

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "post-deployment verification checklist SaaS {date}"
- "production monitoring best practices multi-tenant {date}"
- "deployment health checks kubernetes {date}"

Incorporate relevant findings into the document sections above.

---

## Verification Checklist

- [ ] All service health endpoints return 200 OK
- [ ] Deep health checks verify all dependencies
- [ ] Kubernetes resources are all in ready state
- [ ] All monitoring dashboards show data
- [ ] Alert configuration is verified and tested
- [ ] Log aggregation is capturing all sources
- [ ] Performance metrics are within baseline tolerances
- [ ] SLA metrics meet targets
- [ ] Tenant access verified across all tiers
- [ ] Feature availability matches tier expectations
- [ ] RLS policies are active and enforced
- [ ] Rollback artifacts are verified and accessible
- [ ] Rollback procedures have been tested
- [ ] Security checks all pass
- [ ] External integrations are functioning
- [ ] Documentation is updated
- [ ] All technical sign-offs are obtained
- [ ] Final approval is documented

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial template creation |
