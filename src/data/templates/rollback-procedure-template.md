---
name: rollback-procedure-template
description: Define step-by-step rollback procedures with tenant notification and data preservation for multi-tenant deployments
category: operations
version: 1.0.0
type: template
---

# Rollback Procedure: {{project_name}} - {{release_name}}

## Purpose

Use this template to document detailed rollback procedures for multi-tenant SaaS deployments. This document defines rollback triggers, step-by-step procedures, data preservation strategies, tenant notification protocols, and verification steps to ensure safe and rapid recovery from failed deployments while maintaining tenant data integrity and service continuity.

## Document Metadata

| Field | Value |
|-------|-------|
| Project Name | {{project_name}} |
| Release Name | {{release_name}} |
| Release Version | {{release_version}} |
| Rollback Target Version | {{rollback_target_version}} |
| Created Date | {{date}} |
| Last Updated | {{last_updated}} |
| Author | {{author}} |
| Approved By | {{approved_by}} |
| Status | {{status}} |

## Table of Contents

1. [Rollback Overview](#rollback-overview)
2. [Rollback Triggers](#rollback-triggers)
3. [Pre-Rollback Assessment](#pre-rollback-assessment)
4. [Step-by-Step Rollback Procedures](#step-by-step-rollback-procedures)
5. [Data Preservation](#data-preservation)
6. [Tenant Notification](#tenant-notification)
7. [Verification Steps](#verification-steps)
8. [Post-Rollback Actions](#post-rollback-actions)
9. [Escalation Procedures](#escalation-procedures)
10. [Web Research Queries](#web-research-queries)
11. [Verification Checklist](#verification-checklist)
12. [Change Log](#change-log)

---

## Rollback Overview

### Release Context

| Attribute | Current Release | Rollback Target |
|-----------|-----------------|-----------------|
| Version | {{release_version}} | {{rollback_target_version}} |
| Deploy Date | {{deploy_date}} | {{target_deploy_date}} |
| Database Migration | {{current_migration}} | {{target_migration}} |
| Feature Flags | {{current_flags}} | {{target_flags}} |
| Config Version | {{current_config}} | {{target_config}} |
| Affected Services | {{affected_services}} | Same |

### Rollback Type Classification

| Type | Description | RTO Target | Data Impact | Approval Level |
|------|-------------|------------|-------------|----------------|
| Instant | Feature flag disable | < 1 min | None | On-call engineer |
| Quick | Traffic switch (blue-green) | < 5 min | None | On-call lead |
| Standard | Rolling deployment revert | < 15 min | Minimal | Team lead |
| Complex | Database migration rollback | < 60 min | Possible | Engineering director |
| Critical | Full restore from backup | < 4 hours | Significant | CTO/VP Engineering |

### This Rollback Classification

| Attribute | Value |
|-----------|-------|
| Rollback Type | {{rollback_type}} |
| Estimated Duration | {{estimated_duration}} |
| Required Approval | {{required_approval}} |
| Tenant Impact | {{tenant_impact}} |
| Data Risk Level | {{data_risk_level}} |

---

## Rollback Triggers

### Automatic Triggers

| Trigger ID | Condition | Threshold | Detection Method | Auto-Action |
|------------|-----------|-----------|------------------|-------------|
| AT-001 | Error rate spike | > 5% for 5 min | Prometheus alert | Feature flag disable |
| AT-002 | Latency degradation | p99 > 2x baseline for 10 min | APM alert | Traffic reduction |
| AT-003 | Health check failures | > 50% pods unhealthy | Kubernetes probe | Rolling revert |
| AT-004 | Database connection errors | > 10% failure rate | Connection pool monitor | Alert + pause |
| AT-005 | Memory/CPU exhaustion | > 90% sustained 5 min | Resource monitor | Scale + alert |

### Manual Triggers

| Trigger ID | Scenario | Detection Method | Decision Maker | Response Time |
|------------|----------|------------------|----------------|---------------|
| MT-001 | Customer-reported critical bug | Support escalation | On-call lead | 15 min assessment |
| MT-002 | Data corruption detected | Data validation job | Engineering lead | Immediate |
| MT-003 | Security vulnerability found | Security team | Security lead | Immediate |
| MT-004 | Compliance violation | Audit/monitoring | Compliance officer | 1 hour |
| MT-005 | Business-critical feature broken | Product escalation | Product + Engineering | 30 min assessment |

### Trigger Decision Matrix

| Impact Level | Error Rate | Latency Impact | Tenant Scope | Recommended Action |
|--------------|------------|----------------|--------------|-------------------|
| Critical | > 10% | > 3x baseline | All tenants | Immediate rollback |
| High | > 5% | > 2x baseline | Enterprise tier | Rapid rollback (< 15 min) |
| Medium | > 2% | > 1.5x baseline | Multiple tenants | Assessed rollback |
| Low | > 1% | > 1.2x baseline | Single tenant | Hotfix preferred |

---

## Pre-Rollback Assessment

### Impact Assessment Checklist

| Assessment Area | Current Status | Rollback Impact | Mitigation |
|-----------------|----------------|-----------------|------------|
| Active transactions | {{active_transactions}} | {{transaction_impact}} | {{transaction_mitigation}} |
| In-flight requests | {{inflight_requests}} | {{request_impact}} | {{request_mitigation}} |
| Queued jobs | {{queued_jobs}} | {{job_impact}} | {{job_mitigation}} |
| Active integrations | {{active_integrations}} | {{integration_impact}} | {{integration_mitigation}} |
| Scheduled tasks | {{scheduled_tasks}} | {{task_impact}} | {{task_mitigation}} |

### Tenant Impact Matrix

| Tenant Tier | Tenant Count | Active Users | Impact Level | Priority Notification |
|-------------|--------------|--------------|--------------|----------------------|
| Enterprise | {{enterprise_count}} | {{enterprise_users}} | {{enterprise_impact}} | Immediate |
| Pro | {{pro_count}} | {{pro_users}} | {{pro_impact}} | High |
| Free | {{free_count}} | {{free_users}} | {{free_impact}} | Standard |

### Resource Availability Check

| Resource | Required | Available | Status |
|----------|----------|-----------|--------|
| Rollback artifacts | {{artifact_version}} | {{artifact_available}} | {{artifact_status}} |
| Database snapshots | {{snapshot_required}} | {{snapshot_available}} | {{snapshot_status}} |
| Configuration backup | {{config_version}} | {{config_available}} | {{config_status}} |
| Rollback scripts | {{script_version}} | {{script_available}} | {{script_status}} |
| Personnel on-call | {{personnel_required}} | {{personnel_available}} | {{personnel_status}} |

---

## Step-by-Step Rollback Procedures

### Phase 1: Preparation (Estimated: {{phase1_duration}})

| Step | Action | Command/Procedure | Verification | Owner |
|------|--------|-------------------|--------------|-------|
| 1.1 | Announce rollback initiation | Post to #incidents channel | Team acknowledgment | {{owner_1}} |
| 1.2 | Enable maintenance mode | `./maintenance-mode enable` | Status page updated | {{owner_2}} |
| 1.3 | Pause async job processors | `kubectl scale deployment/workers --replicas=0` | Zero worker pods | {{owner_3}} |
| 1.4 | Disable webhook deliveries | `./webhooks disable` | Webhook queue paused | {{owner_4}} |
| 1.5 | Create state snapshot | `./snapshot create pre-rollback-{{timestamp}}` | Snapshot confirmed | {{owner_5}} |

### Phase 2: Traffic Management (Estimated: {{phase2_duration}})

| Step | Action | Command/Procedure | Verification | Owner |
|------|--------|-------------------|--------------|-------|
| 2.1 | Drain active connections | `kubectl drain --grace-period=30` | Connection count = 0 | {{owner_1}} |
| 2.2 | Switch load balancer | `./lb switch --target={{target_version}}` | Traffic routed to target | {{owner_2}} |
| 2.3 | Verify traffic flow | Check dashboard | Request flow confirmed | {{owner_3}} |
| 2.4 | Monitor error rates | Watch metrics | Error rate stable | {{owner_4}} |

### Phase 3: Application Rollback (Estimated: {{phase3_duration}})

| Step | Action | Command/Procedure | Verification | Owner |
|------|--------|-------------------|--------------|-------|
| 3.1 | Rollback deployment | `kubectl rollout undo deployment/{{service}}` | Pods running target version | {{owner_1}} |
| 3.2 | Verify container health | `kubectl get pods -l app={{service}}` | All pods ready | {{owner_2}} |
| 3.3 | Run health checks | `./health-check --service={{service}}` | All checks pass | {{owner_3}} |
| 3.4 | Verify API responses | `./smoke-test --quick` | Endpoints responding | {{owner_4}} |

### Phase 4: Database Rollback (If Required) (Estimated: {{phase4_duration}})

| Step | Action | Command/Procedure | Verification | Owner |
|------|--------|-------------------|--------------|-------|
| 4.1 | Confirm migration reversibility | Review migration files | Down migration exists | {{owner_1}} |
| 4.2 | Run down migration | `./migrate down --to={{target_migration}}` | Migration successful | {{owner_2}} |
| 4.3 | Verify schema state | `./verify-schema --expected={{target_schema}}` | Schema matches | {{owner_3}} |
| 4.4 | Run integrity checks | `./integrity-check --full` | All checks pass | {{owner_4}} |
| 4.5 | Validate tenant data | `./validate-tenant-data` | No violations | {{owner_5}} |

### Phase 5: Configuration Rollback (Estimated: {{phase5_duration}})

| Step | Action | Command/Procedure | Verification | Owner |
|------|--------|-------------------|--------------|-------|
| 5.1 | Revert feature flags | `./flags revert --to={{target_config}}` | Flags match target | {{owner_1}} |
| 5.2 | Update config maps | `kubectl apply -f config/{{target_version}}` | Config applied | {{owner_2}} |
| 5.3 | Restart affected services | `kubectl rollout restart` | Services restarted | {{owner_3}} |
| 5.4 | Verify configuration | `./config-verify` | Config consistent | {{owner_4}} |

### Phase 6: Service Restoration (Estimated: {{phase6_duration}})

| Step | Action | Command/Procedure | Verification | Owner |
|------|--------|-------------------|--------------|-------|
| 6.1 | Resume worker processes | `kubectl scale deployment/workers --replicas={{worker_count}}` | Workers running | {{owner_1}} |
| 6.2 | Re-enable webhooks | `./webhooks enable` | Webhooks processing | {{owner_2}} |
| 6.3 | Process queued jobs | Monitor job queue | Queue draining | {{owner_3}} |
| 6.4 | Disable maintenance mode | `./maintenance-mode disable` | Status page updated | {{owner_4}} |
| 6.5 | Announce service restored | Post to #incidents channel | Team acknowledged | {{owner_5}} |

---

## Data Preservation

### Pre-Rollback Data Snapshot

| Data Type | Snapshot Method | Storage Location | Retention | Encryption |
|-----------|-----------------|------------------|-----------|------------|
| Database | pg_dump / mongodump | {{snapshot_storage}} | 30 days | AES-256 |
| Cache state | Redis BGSAVE | {{cache_backup}} | 7 days | At-rest |
| Queue state | Queue export | {{queue_backup}} | 7 days | At-rest |
| File storage | S3 versioning | Already versioned | 90 days | S3 SSE |
| Configuration | Git commit | Git history | Permanent | N/A |

### Data at Risk Assessment

| Data Category | Risk Level | Preservation Action | Recovery Method |
|---------------|------------|---------------------|-----------------|
| New records since deploy | Medium | Export before rollback | Re-import if needed |
| Modified records | High | Create diff snapshot | Apply diff forward |
| Transaction logs | Critical | Preserve all logs | Replay transactions |
| Tenant configurations | Low | Export current state | Manual restore |
| Session data | Low | Accept loss | Users re-authenticate |

### Tenant Data Isolation During Rollback

| Consideration | Implementation | Verification |
|---------------|----------------|--------------|
| RLS policies remain active | Policies are version-independent | Run RLS audit |
| Tenant context preserved | Context in transaction logs | Log inspection |
| Cross-tenant leak prevention | Extra validation during rollback | Security check |
| Tenant-specific rollback | Supported for schema-per-tenant | Validate scope |

---

## Tenant Notification

### Notification Timeline

| Time | Action | Audience | Channel | Message Template |
|------|--------|----------|---------|------------------|
| T-0 | Rollback initiated | Internal | Slack #incidents | "Rollback initiated for {{release_name}}" |
| T+1 min | Enterprise notification | Enterprise tenants | Email + In-app | {{enterprise_template}} |
| T+5 min | Status page update | Public | Status page | "Investigating service issues" |
| T+10 min | Pro notification | Pro tenants | Email | {{pro_template}} |
| T+15 min | Progress update | All | Status page | "Remediation in progress" |
| Completion | Service restored | All | All channels | "Service restored" |

### Notification Templates

| Template ID | Audience | Subject | Key Points |
|-------------|----------|---------|------------|
| ROLL-ENT-01 | Enterprise | Service Update: Immediate Attention Required | Impact, ETA, Support contact |
| ROLL-PRO-01 | Pro | Service Update | Brief impact, ETA |
| ROLL-FREE-01 | Free | Service Update | Brief impact |
| ROLL-STATUS-01 | Status page | Investigating | Initial acknowledgment |
| ROLL-RESOLVED-01 | All | Resolved | Resolution summary |

### Per-Tenant Impact Communication

| Tenant Name | Tier | Specific Impact | Custom Message | Contact Method |
|-------------|------|-----------------|----------------|----------------|
| {{tenant_1}} | {{tier_1}} | {{impact_1}} | {{message_1}} | {{contact_1}} |
| {{tenant_2}} | {{tier_2}} | {{impact_2}} | {{message_2}} | {{contact_2}} |
| {{tenant_3}} | {{tier_3}} | {{impact_3}} | {{message_3}} | {{contact_3}} |

---

## Verification Steps

### Immediate Verification (Within 5 minutes)

| Check | Command/Method | Expected Result | Actual Result | Status |
|-------|----------------|-----------------|---------------|--------|
| Service health | `./health-check --all` | All services healthy | | |
| Error rate | Grafana dashboard | < 1% | | |
| Latency p99 | APM dashboard | < baseline | | |
| Database connectivity | `./db-check` | All connections OK | | |
| Cache connectivity | `./cache-check` | Cache responding | | |

### Functional Verification (Within 15 minutes)

| Test Suite | Command | Scope | Expected | Actual | Status |
|------------|---------|-------|----------|--------|--------|
| Smoke tests | `./smoke-test` | Critical paths | All pass | | |
| Auth flow | `./test auth` | Login/logout | Pass | | |
| API endpoints | `./test api --quick` | Key endpoints | All pass | | |
| Webhook delivery | `./test webhooks` | Delivery test | Delivered | | |
| Job processing | `./test jobs` | Test job | Processed | | |

### Tenant-Specific Verification

| Tenant Tier | Sample Size | Tests | Expected | Status |
|-------------|-------------|-------|----------|--------|
| Enterprise | All | Full suite | All pass | |
| Pro | 10% sample | Critical paths | All pass | |
| Free | 1% sample | Basic functionality | All pass | |

### Data Integrity Verification

| Check | Scope | Method | Tolerance | Status |
|-------|-------|--------|-----------|--------|
| Row counts | All tables | Compare pre/post | 0 variance | |
| Tenant boundaries | All tenants | RLS audit | 0 violations | |
| Referential integrity | FK constraints | Constraint check | 0 violations | |
| Recent transactions | Last 24h | Reconciliation | 100% match | |

---

## Post-Rollback Actions

### Immediate Actions (Within 1 hour)

| Action | Owner | Deadline | Status |
|--------|-------|----------|--------|
| Complete incident timeline | {{owner_1}} | T+30 min | |
| Gather relevant logs | {{owner_2}} | T+30 min | |
| Initial customer communication | {{owner_3}} | T+1 hour | |
| Schedule postmortem | {{owner_4}} | T+1 hour | |

### Short-term Actions (Within 24 hours)

| Action | Owner | Deadline | Status |
|--------|-------|----------|--------|
| Complete postmortem analysis | {{owner_1}} | T+24 hours | |
| Identify root cause | {{owner_2}} | T+24 hours | |
| Document lessons learned | {{owner_3}} | T+24 hours | |
| Create fix action items | {{owner_4}} | T+24 hours | |
| SLA impact assessment | {{owner_5}} | T+24 hours | |

### Follow-up Actions (Within 1 week)

| Action | Owner | Deadline | Status |
|--------|-------|----------|--------|
| Implement preventive measures | {{owner_1}} | T+1 week | |
| Update rollback procedures | {{owner_2}} | T+1 week | |
| Customer follow-up calls (Enterprise) | {{owner_3}} | T+1 week | |
| Process improvement review | {{owner_4}} | T+1 week | |

---

## Escalation Procedures

### Escalation Matrix

| Situation | First Escalation | Second Escalation | Third Escalation |
|-----------|------------------|-------------------|------------------|
| Rollback taking longer than estimated | On-call lead | Engineering manager | VP Engineering |
| New issues discovered during rollback | On-call lead | Engineering manager | CTO |
| Data loss detected | Engineering director | VP Engineering | CTO |
| Customer escalation | Customer Success | VP Customer Success | CEO |
| Security concern | Security lead | CISO | CTO |

### Contact Information

| Role | Name | Phone | Slack | Availability |
|------|------|-------|-------|--------------|
| On-call Engineer | {{oncall_engineer}} | {{phone_1}} | {{slack_1}} | 24/7 |
| On-call Lead | {{oncall_lead}} | {{phone_2}} | {{slack_2}} | 24/7 |
| Engineering Manager | {{eng_manager}} | {{phone_3}} | {{slack_3}} | Business hours + escalation |
| VP Engineering | {{vp_eng}} | {{phone_4}} | {{slack_4}} | Escalation only |

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "kubernetes rollback best practices {date}"
- "multi-tenant SaaS deployment rollback patterns {date}"
- "database migration rollback strategies enterprise {date}"

Incorporate relevant findings into the document sections above.

---

## Verification Checklist

- [ ] Rollback triggers are defined with specific thresholds and actions
- [ ] Automatic triggers have corresponding monitoring and alerting
- [ ] Manual trigger decision matrix covers all severity levels
- [ ] Pre-rollback assessment includes tenant impact analysis
- [ ] Resource availability is verified before starting rollback
- [ ] Step-by-step procedures are complete with verification steps
- [ ] Database rollback procedures account for tenant data integrity
- [ ] Data preservation snapshots are created before rollback
- [ ] At-risk data categories are identified with recovery methods
- [ ] Tenant notification timeline covers all tiers appropriately
- [ ] Notification templates are prepared for each audience
- [ ] Immediate verification checks cover all critical services
- [ ] Functional verification includes tenant-specific tests
- [ ] Data integrity verification includes tenant boundary checks
- [ ] Post-rollback actions have clear owners and deadlines
- [ ] Escalation matrix covers all failure scenarios
- [ ] Contact information is current and verified

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial template creation |
