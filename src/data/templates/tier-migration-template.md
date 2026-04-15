---
name: tier-migration-template
description: Plan tenant tier upgrade and downgrade migrations for multi-tenant SaaS
category: tenant
version: 1.0.0
type: template
web_research_enabled: true
source_verification: true
---

## Purpose

Plan tenant tier upgrade and downgrade migrations for multi-tenant SaaS

# Tier Migration Plan: {{project_name}}

## Document Metadata

| Field | Value |
|-------|-------|
| Version | {{version}} |
| Date | {{date}} |
| Author | {{author}} |
| Tenant | {{tenant_name}} |
| Migration Type | {{migration_type}} |
| Status | {{status}} |

## Executive Summary

{{executive_summary}}

## Migration Overview

### Current State

| Attribute | Value |
|-----------|-------|
| Current Tier | {{current_tier}} |
| Tenant ID | {{tenant_id}} |
| Account Age | {{account_age}} |
| Current Usage | {{current_usage}} |
| Active Users | {{active_users}} |

### Target State

| Attribute | Value |
|-----------|-------|
| Target Tier | {{target_tier}} |
| Migration Window | {{migration_window}} |
| Expected Downtime | {{expected_downtime}} |
| Rollback Window | {{rollback_window}} |

### Tier Comparison

| Feature | {{current_tier}} | {{target_tier}} | Change |
|---------|------------------|-----------------|--------|
| User Limit | {{current_user_limit}} | {{target_user_limit}} | {{user_limit_change}} |
| API Rate Limit | {{current_api_limit}} | {{target_api_limit}} | {{api_limit_change}} |
| Storage Quota | {{current_storage}} | {{target_storage}} | {{storage_change}} |
| Agent Concurrency | {{current_agents}} | {{target_agents}} | {{agent_change}} |
| Data Retention | {{current_retention}} | {{target_retention}} | {{retention_change}} |
| SLA | {{current_sla}} | {{target_sla}} | {{sla_change}} |

## Upgrade Migration

### Feature Enablement

| Feature | Enablement Method | Timing | Verification |
|---------|-------------------|--------|--------------|
| {{feature_name}} | {{enablement_method}} | {{enablement_timing}} | {{enablement_verify}} |

### Resource Allocation

| Resource | Current | Target | Scaling Method |
|----------|---------|--------|----------------|
| Database Pool | {{db_current}} | {{db_target}} | {{db_scaling}} |
| Cache Allocation | {{cache_current}} | {{cache_target}} | {{cache_scaling}} |
| Agent Workers | {{agent_current}} | {{agent_target}} | {{agent_scaling}} |
| Storage | {{storage_current}} | {{storage_target}} | {{storage_scaling}} |

### Data Migration (Upgrade)

| Data Type | Migration Required | Method | Duration |
|-----------|-------------------|--------|----------|
| User Data | {{user_data_required}} | {{user_data_method}} | {{user_data_duration}} |
| Configuration | {{config_required}} | {{config_method}} | {{config_duration}} |
| Analytics | {{analytics_required}} | {{analytics_method}} | {{analytics_duration}} |
| Agent Memory | {{memory_required}} | {{memory_method}} | {{memory_duration}} |

## Downgrade Migration

### Feature Restriction

| Feature | Restriction Method | Grace Period | User Impact |
|---------|-------------------|--------------|-------------|
| {{restrict_feature}} | {{restrict_method}} | {{restrict_grace}} | {{restrict_impact}} |

### Data Handling (Downgrade)

| Data Type | Action | Export Option | Retention |
|-----------|--------|---------------|-----------|
| Excess Users | {{excess_users_action}} | {{users_export}} | {{users_retention}} |
| Over-Quota Storage | {{excess_storage_action}} | {{storage_export}} | {{storage_retention}} |
| Premium Features Data | {{premium_data_action}} | {{premium_export}} | {{premium_retention}} |
| Historical Analytics | {{analytics_action}} | {{analytics_export}} | {{analytics_retention}} |

### Quota Enforcement

| Quota | Current Usage | New Limit | Enforcement Strategy |
|-------|---------------|-----------|----------------------|
| Users | {{users_current}} | {{users_new_limit}} | {{users_enforce}} |
| API Calls | {{api_current}} | {{api_new_limit}} | {{api_enforce}} |
| Storage | {{storage_current_usage}} | {{storage_new_limit}} | {{storage_enforce}} |
| Agents | {{agents_current}} | {{agents_new_limit}} | {{agents_enforce}} |

## Migration Steps

### Pre-Migration

| Step | Action | Owner | Completion Criteria |
|------|--------|-------|---------------------|
| 1 | Tenant notification | {{notify_owner}} | {{notify_criteria}} |
| 2 | Usage snapshot | {{snapshot_owner}} | {{snapshot_criteria}} |
| 3 | Backup creation | {{backup_owner}} | {{backup_criteria}} |
| 4 | Validation checks | {{validation_owner}} | {{validation_criteria}} |

### Migration Execution

| Step | Action | Duration | Rollback Point |
|------|--------|----------|----------------|
| 1 | {{exec_step_1}} | {{exec_duration_1}} | {{rollback_1}} |
| 2 | {{exec_step_2}} | {{exec_duration_2}} | {{rollback_2}} |
| 3 | {{exec_step_3}} | {{exec_duration_3}} | {{rollback_3}} |
| 4 | {{exec_step_4}} | {{exec_duration_4}} | {{rollback_4}} |

### Post-Migration

| Step | Action | Verification | Sign-off |
|------|--------|--------------|----------|
| 1 | Feature verification | {{feature_verify}} | {{feature_signoff}} |
| 2 | Performance validation | {{perf_verify}} | {{perf_signoff}} |
| 3 | Billing update | {{billing_verify}} | {{billing_signoff}} |
| 4 | Tenant confirmation | {{tenant_verify}} | {{tenant_signoff}} |

## Communication Plan

### Tenant Communications

| Timing | Channel | Template | Owner |
|--------|---------|----------|-------|
| Pre-Migration (7 days) | {{pre7_channel}} | {{pre7_template}} | {{pre7_owner}} |
| Pre-Migration (24 hours) | {{pre24_channel}} | {{pre24_template}} | {{pre24_owner}} |
| Migration Start | {{start_channel}} | {{start_template}} | {{start_owner}} |
| Migration Complete | {{complete_channel}} | {{complete_template}} | {{complete_owner}} |

### Internal Communications

| Team | Notification | Timing |
|------|--------------|--------|
| Support | {{support_notification}} | {{support_timing}} |
| Operations | {{ops_notification}} | {{ops_timing}} |
| Billing | {{billing_notification}} | {{billing_timing}} |

## Billing Impact

### Pricing Change

| Item | Current | New | Effective Date |
|------|---------|-----|----------------|
| Base Price | {{current_base}} | {{new_base}} | {{base_effective}} |
| Usage Rates | {{current_usage_rates}} | {{new_usage_rates}} | {{usage_effective}} |
| Overages | {{current_overages}} | {{new_overages}} | {{overage_effective}} |

### Proration

| Period | Days Remaining | Current Tier Amount | New Tier Amount | Credit/Charge |
|--------|----------------|---------------------|-----------------|---------------|
| {{billing_period}} | {{days_remaining}} | {{current_amount}} | {{new_amount}} | {{proration_amount}} |

## Rollback Plan

### Rollback Triggers

| Trigger | Severity | Decision Owner | Time Limit |
|---------|----------|----------------|------------|
| {{trigger_1}} | {{trigger_1_severity}} | {{trigger_1_owner}} | {{trigger_1_limit}} |
| {{trigger_2}} | {{trigger_2_severity}} | {{trigger_2_owner}} | {{trigger_2_limit}} |

### Rollback Procedure

| Step | Action | Duration | Dependencies |
|------|--------|----------|--------------|
| 1 | {{rollback_step_1}} | {{rollback_duration_1}} | {{rollback_deps_1}} |
| 2 | {{rollback_step_2}} | {{rollback_duration_2}} | {{rollback_deps_2}} |
| 3 | {{rollback_step_3}} | {{rollback_duration_3}} | {{rollback_deps_3}} |

### Post-Rollback

| Action | Owner | Timeline |
|--------|-------|----------|
| Root cause analysis | {{rca_owner}} | {{rca_timeline}} |
| Tenant communication | {{comm_owner}} | {{comm_timeline}} |
| Retry planning | {{retry_owner}} | {{retry_timeline}} |

## Risk Assessment

### Migration Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Data loss | {{data_loss_likelihood}} | {{data_loss_impact}} | {{data_loss_mitigation}} |
| Extended downtime | {{downtime_likelihood}} | {{downtime_impact}} | {{downtime_mitigation}} |
| Feature incompatibility | {{incompatibility_likelihood}} | {{incompatibility_impact}} | {{incompatibility_mitigation}} |
| Billing errors | {{billing_error_likelihood}} | {{billing_error_impact}} | {{billing_error_mitigation}} |

### Downgrade Specific Risks

| Risk | Impact | User Communication | Grace Period |
|------|--------|-------------------|--------------|
| Data loss (over quota) | {{quota_data_impact}} | {{quota_comm}} | {{quota_grace}} |
| Feature disruption | {{feature_disruption_impact}} | {{feature_comm}} | {{feature_grace}} |
| User lockout | {{lockout_impact}} | {{lockout_comm}} | {{lockout_grace}} |

---

## Verification Checklist

### Pre-Migration

- [ ] Tenant notified per communication plan
- [ ] Usage snapshot captured
- [ ] Backup verified
- [ ] Migration window confirmed
- [ ] Rollback plan reviewed

### Migration

- [ ] All migration steps completed
- [ ] No errors during migration
- [ ] Rollback points confirmed
- [ ] Timing within expectations

### Post-Migration

- [ ] All features functional
- [ ] Performance metrics normal
- [ ] Billing updated correctly
- [ ] Tenant confirmation received
- [ ] Documentation updated

### Downgrade Specific

- [ ] Grace period notifications sent
- [ ] Excess data exported/archived
- [ ] Quota enforcement active
- [ ] Feature restrictions applied
- [ ] User impact minimized

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "SaaS tier migration best practices {date}"
- "tenant upgrade downgrade patterns multi-tenant {date}"
- "feature flag tier migration strategies {date}"
- "subscription tier change billing proration {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Appendix

### Migration Scripts

{{migration_scripts_reference}}

### Tenant Communication Templates

{{communication_templates_reference}}

### Related Documents

- Tier Definitions: `{{tier_definitions_link}}`
- Billing Configuration: `{{billing_config_link}}`
- Tenant Onboarding: `{{onboarding_link}}`

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial tier migration plan |
