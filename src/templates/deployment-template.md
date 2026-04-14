---
name: Deployment Template
description: Template for documenting SaaS deployment strategy with multi-tenant considerations
category: architecture
version: 1.0.0
type: "operations"
---

## Purpose

Template for documenting SaaS deployment strategy with multi-tenant considerations

# SaaS Deployment Strategy Specification

> Project: {{project_name}}
> Version: {{version}}
> Date: {{date}}
> Author: {{author}}

## Deployment Strategy

### 1.1 Purpose

This document specifies the deployment strategy for {{project_name}}, defining how application releases are managed across environments while maintaining tenant isolation, minimizing downtime, and ensuring rollback capabilities.

### 1.2 Scope

- Deployment methodology and patterns
- Blue-green and canary configurations
- Feature flag management
- Rollback procedures
- Tenant-scoped deployments
- Monitoring and alerting during deployments

### 1.3 Deployment Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    Deployment Pipeline                           │
│                                                                  │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐         │
│  │  Build  │──►│  Test   │──►│ Stage   │──►│ Deploy  │         │
│  └─────────┘   └─────────┘   └─────────┘   └─────────┘         │
│       │             │             │             │                │
│       ▼             ▼             ▼             ▼                │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐         │
│  │Container│   │ Unit +  │   │Staging  │   │Production│         │
│  │  Image  │   │  E2E    │   │  Env    │   │   Env   │         │
│  └─────────┘   └─────────┘   └─────────┘   └─────────┘         │
│                                                  │                │
│                         ┌────────────────────────┤                │
│                         │                        │                │
│                         ▼                        ▼                │
│                   ┌──────────┐            ┌──────────┐           │
│                   │  Blue    │            │  Green   │           │
│                   │Environment│            │Environment│           │
│                   └──────────┘            └──────────┘           │
└─────────────────────────────────────────────────────────────────┘
```

### 1.4 Deployment Methodology

**Selected Methodology:** {{deployment_methodology}}

| Methodology | Description | Use Case |
|-------------|-------------|----------|
| Blue-Green | Two identical environments, instant cutover | Zero-downtime releases |
| Canary | Gradual rollout to subset of traffic | Risk mitigation |
| Rolling | Sequential pod replacement | Kubernetes-native |
| Feature Flags | Code deployed, features toggled | Per-tenant enablement |

### 1.5 Environment Matrix

| Environment | Purpose | Tenant Model | Data | Traffic Source |
|-------------|---------|--------------|------|----------------|
| Development | Feature development | Single | Synthetic | Developers |
| Testing | Automated testing | Multi (mocked) | Test fixtures | CI pipeline |
| Staging | Pre-prod validation | Multi (real) | Anonymized prod | QA team |
| Production | Live service | Full {{tenant_model}} | Live | End users |

---

## Blue-Green/Canary Configuration

### 2.1 Blue-Green Deployment

```
┌─────────────────────────────────────────────────────────────────┐
│                    Load Balancer / Ingress                       │
│                              │                                   │
│               ┌──────────────┴──────────────┐                   │
│               │                             │                    │
│        ┌──────▼──────┐              ┌──────▼──────┐             │
│        │             │              │             │              │
│        │    BLUE     │              │   GREEN     │              │
│        │  (v{{current_version}})  │              │  (v{{target_version}})   │              │
│        │   ACTIVE    │              │   STANDBY   │              │
│        │             │              │             │              │
│        └──────┬──────┘              └──────┬──────┘             │
│               │                             │                    │
│        ┌──────▼──────┐              ┌──────▼──────┐             │
│        │  Database   │              │  Database   │              │
│        │  (Shared)   │◄────────────►│  (Shared)   │              │
│        └─────────────┘              └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Blue-Green Configuration

```yaml
blue_green:
  enabled: {{blue_green_enabled}}
  
  blue:
    name: {{project_name}}-blue
    replicas: {{blue_replicas}}
    version: {{current_version}}
    active: true
    
  green:
    name: {{project_name}}-green
    replicas: {{green_replicas}}
    version: {{target_version}}
    active: false
    
  cutover:
    method: {{cutover_method}}  # instant, gradual, scheduled
    verification_timeout_seconds: {{verification_timeout}}
    auto_rollback_on_failure: {{auto_rollback}}
    
  health_checks:
    endpoint: {{health_endpoint}}
    interval_seconds: {{health_interval}}
    success_threshold: {{success_threshold}}
    failure_threshold: {{failure_threshold}}
```

### 2.3 Canary Deployment

```
┌─────────────────────────────────────────────────────────────────┐
│                    Traffic Distribution                          │
│                                                                  │
│    100% ─────────────────────────────────────────────────────   │
│     │                                                            │
│     │  ┌──────────────────────────────────────────────────┐     │
│     │  │              Stable (v{{current_version}})                       │     │
│     │  │                    {{stable_percentage}}%                            │     │
│     │  └──────────────────────────────────────────────────┘     │
│     │                                                            │
│     │  ┌──────────────────┐                                     │
│     │  │ Canary (v{{target_version}}) │                                     │
│     │  │    {{canary_percentage}}%       │                                     │
│     │  └──────────────────┘                                     │
│     │                                                            │
│    0% ──────────────────────────────────────────────────────    │
│                                                                  │
│        Stage 1 ──► Stage 2 ──► Stage 3 ──► Stage 4 ──► Full    │
│          {{stage_1_percent}}%       {{stage_2_percent}}%       {{stage_3_percent}}%       {{stage_4_percent}}%      100%             │
└─────────────────────────────────────────────────────────────────┘
```

### 2.4 Canary Configuration

```yaml
canary:
  enabled: {{canary_enabled}}
  
  stages:
    - name: initial
      percentage: {{stage_1_percent}}
      duration_minutes: {{stage_1_duration}}
      metrics_threshold:
        error_rate: < {{stage_1_error_threshold}}%
        latency_p99: < {{stage_1_latency_threshold}}ms
        
    - name: expansion
      percentage: {{stage_2_percent}}
      duration_minutes: {{stage_2_duration}}
      metrics_threshold:
        error_rate: < {{stage_2_error_threshold}}%
        latency_p99: < {{stage_2_latency_threshold}}ms
        
    - name: majority
      percentage: {{stage_3_percent}}
      duration_minutes: {{stage_3_duration}}
      metrics_threshold:
        error_rate: < {{stage_3_error_threshold}}%
        latency_p99: < {{stage_3_latency_threshold}}ms
        
    - name: full
      percentage: 100
      duration_minutes: {{stage_4_duration}}
      
  analysis:
    provider: {{canary_analysis_provider}}
    metrics:
      - name: error_rate
        threshold: {{error_rate_threshold}}
        comparison: less_than
      - name: latency_p99
        threshold: {{latency_threshold_ms}}
        comparison: less_than
      - name: success_rate
        threshold: {{success_rate_threshold}}
        comparison: greater_than
```

### 2.5 Traffic Routing Rules

| Rule Type | Description | Configuration |
|-----------|-------------|---------------|
| Percentage-based | Split traffic by weight | `weight: {{canary_weight}}` |
| Header-based | Route by request header | `header: X-Canary: true` |
| Cookie-based | Route by session cookie | `cookie: canary_enabled` |
| Tenant-based | Route specific tenants | `tenant_ids: [{{canary_tenant_ids}}]` |
| Geographic | Route by region | `regions: [{{canary_regions}}]` |

---

## Feature Flags

### 3.1 Feature Flag Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Feature Flag System                           │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                   Flag Management UI                     │    │
│  │  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌─────────┐ │    │
│  │  │  Create   │ │  Toggle   │ │ Schedule  │ │ Archive │ │    │
│  │  └───────────┘ └───────────┘ └───────────┘ └─────────┘ │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                   Flag Configuration Store               │    │
│  │  ┌─────────────────────────────────────────────────────┐│    │
│  │  │ flag_id | name | enabled | rules | created | updated ││    │
│  │  └─────────────────────────────────────────────────────┘│    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                   │
│               ┌──────────────┼──────────────┐                   │
│               │              │              │                    │
│               ▼              ▼              ▼                    │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐         │
│  │   Service A   │ │   Service B   │ │   Service C   │         │
│  │   SDK Client  │ │   SDK Client  │ │   SDK Client  │         │
│  └───────────────┘ └───────────────┘ └───────────────┘         │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Flag Types

| Type | Description | Use Case |
|------|-------------|----------|
| Release Flag | Enable/disable features | New feature rollout |
| Experiment Flag | A/B testing | UI experiments |
| Operational Flag | Runtime behavior | Circuit breakers |
| Permission Flag | Access control | Tier-based features |

### 3.3 Feature Flag Schema

```yaml
feature_flags:
  - flag_id: {{flag_id}}
    name: {{flag_name}}
    description: {{flag_description}}
    type: release  # release, experiment, operational, permission
    
    default_value: false
    
    targeting_rules:
      - rule_id: tenant_tier_rule
        conditions:
          - attribute: tenant.tier
            operator: in
            values: [enterprise, pro]
        percentage: 100
        
      - rule_id: beta_users_rule
        conditions:
          - attribute: user.beta_enabled
            operator: equals
            values: [true]
        percentage: 100
        
      - rule_id: gradual_rollout
        conditions:
          - attribute: tenant.id
            operator: percentage
            values: [{{rollout_percentage}}]
        percentage: {{rollout_percentage}}
        
    tenant_overrides:
      - tenant_id: {{override_tenant_id}}
        value: true
        
    schedule:
      enable_at: {{flag_enable_date}}
      disable_at: {{flag_disable_date}}
      
    metadata:
      owner: {{flag_owner}}
      created_at: {{flag_created}}
      jira_ticket: {{flag_ticket}}
```

### 3.4 Flag Evaluation Flow

```
┌─────────────────┐
│   Request with  │
│ Tenant Context  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Load Tenant     │
│ Configuration   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Check Tenant    │────► Override found ──► Return override value
│ Override        │
└────────┬────────┘
         │
         │ No override
         ▼
┌─────────────────┐
│ Evaluate        │
│ Targeting Rules │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌───────┐ ┌───────┐
│ Match │ │No Match│
└───┬───┘ └───┬───┘
    │         │
    ▼         ▼
┌───────┐ ┌───────┐
│ Rule  │ │Default│
│ Value │ │ Value │
└───────┘ └───────┘
```

### 3.5 Feature Flag by Tenant Tier

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| {{feature_1}} | {{free_feature_1}} | {{pro_feature_1}} | {{enterprise_feature_1}} |
| {{feature_2}} | {{free_feature_2}} | {{pro_feature_2}} | {{enterprise_feature_2}} |
| {{feature_3}} | {{free_feature_3}} | {{pro_feature_3}} | {{enterprise_feature_3}} |
| {{feature_4}} | {{free_feature_4}} | {{pro_feature_4}} | {{enterprise_feature_4}} |
| {{feature_5}} | {{free_feature_5}} | {{pro_feature_5}} | {{enterprise_feature_5}} |
| AI Agent Access | Limited | Standard | Unlimited |
| Custom Integrations | No | Limited | Full |
| SLA | Best effort | {{pro_sla}} | {{enterprise_sla}} |

---

## Rollback Plan

### 4.1 Rollback Decision Matrix

| Condition | Severity | Automatic Rollback | Manual Approval |
|-----------|----------|-------------------|-----------------|
| Error rate > {{critical_error_threshold}}% | Critical | Yes | Not required |
| Latency p99 > {{critical_latency_threshold}}ms | Critical | Yes | Not required |
| Error rate > {{warning_error_threshold}}% | Warning | No | Required |
| Failed health checks | Critical | Yes | Not required |
| Customer-reported issue | Variable | No | Required |
| Security vulnerability | Critical | Immediate | Post-hoc |

### 4.2 Rollback Procedure

```
┌─────────────────┐
│ Rollback        │
│ Triggered       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 1. Alert Team   │◄── Slack/PagerDuty notification
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 2. Freeze       │◄── Stop all deployments
│    Pipeline     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 3. Switch       │◄── Route traffic to previous version
│    Traffic      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 4. Verify       │◄── Health checks, metrics
│    Stability    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 5. Notify       │◄── Stakeholder communication
│    Stakeholders │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 6. Post-mortem  │◄── Root cause analysis
│    Analysis     │
└─────────────────┘
```

### 4.3 Rollback Configuration

```yaml
rollback:
  automatic:
    enabled: {{auto_rollback_enabled}}
    triggers:
      - metric: error_rate
        threshold: {{rollback_error_threshold}}
        duration_seconds: {{rollback_duration}}
      - metric: latency_p99
        threshold: {{rollback_latency_threshold}}
        duration_seconds: {{rollback_duration}}
      - metric: health_check_failures
        threshold: {{rollback_health_threshold}}
        duration_seconds: {{rollback_duration}}
        
  manual:
    approval_required_from:
      - role: {{rollback_approver_role}}
      - on_call: true
    timeout_minutes: {{rollback_approval_timeout}}
    
  execution:
    strategy: {{rollback_strategy}}  # instant, gradual
    blue_green_switch_seconds: {{switch_duration}}
    canary_rollback_stages: {{rollback_stages}}
    
  notification:
    channels:
      - type: slack
        channel: {{slack_channel}}
      - type: pagerduty
        service: {{pagerduty_service}}
    include:
      - deployment_version
      - rollback_reason
      - affected_tenants
      - next_steps
```

### 4.4 Rollback Time Targets

| Rollback Type | Target Time | Maximum Time |
|---------------|-------------|--------------|
| Blue-Green switch | < {{bg_rollback_target}}s | {{bg_rollback_max}}s |
| Canary abort | < {{canary_rollback_target}}s | {{canary_rollback_max}}s |
| Database migration | < {{db_rollback_target}}m | {{db_rollback_max}}m |
| Feature flag disable | < {{flag_rollback_target}}s | {{flag_rollback_max}}s |

---

## Tenant-Scoped Deployments

### 5.1 Tenant Deployment Strategy

**Tenant Model:** {{tenant_model}}

```
┌─────────────────────────────────────────────────────────────────┐
│                 Tenant-Scoped Deployment Options                 │
│                                                                  │
│  Option A: Shared Infrastructure                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Single Deployment ◄── All Tenants                       │    │
│  │  Feature flags control tenant-specific behavior          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Option B: Tenant-Specific Deployments                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │Tenant A  │ │Tenant B  │ │Tenant C  │ │Tenant D  │           │
│  │v{{version_a}}       │ │v{{version_b}}       │ │v{{version_c}}       │ │v{{version_d}}       │           │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
│                                                                  │
│  Option C: Ring-Based Deployment                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Ring 0    │  │   Ring 1    │  │   Ring 2    │             │
│  │ Internal +  │─►│ Early       │─►│ All         │             │
│  │ Beta        │  │ Adopters    │  │ Tenants     │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Deployment Ring Configuration

| Ring | Tenants | Percentage | Wait Time Before Next |
|------|---------|------------|----------------------|
| Ring 0 | Internal, Beta | {{ring_0_percentage}}% | {{ring_0_wait}} hours |
| Ring 1 | Early Adopters | {{ring_1_percentage}}% | {{ring_1_wait}} hours |
| Ring 2 | Standard Tenants | {{ring_2_percentage}}% | {{ring_2_wait}} hours |
| Ring 3 | Enterprise Tenants | {{ring_3_percentage}}% | N/A |

### 5.3 Tenant Override Configuration

```yaml
tenant_deployments:
  override_enabled: {{tenant_override_enabled}}
  
  tenant_specific:
    - tenant_id: {{enterprise_tenant_1}}
      deployment_ring: 3
      version_pin: {{pinned_version}}
      maintenance_window: {{maintenance_window_1}}
      
    - tenant_id: {{enterprise_tenant_2}}
      deployment_ring: 3
      version_pin: null  # Follow standard rollout
      maintenance_window: {{maintenance_window_2}}
      
  tier_defaults:
    free:
      deployment_ring: 2
      auto_update: true
    pro:
      deployment_ring: 2
      auto_update: true
    enterprise:
      deployment_ring: 3
      auto_update: false
      require_approval: true
```

### 5.4 Tenant Communication

| Event | Free Tier | Pro Tier | Enterprise Tier |
|-------|-----------|----------|-----------------|
| Scheduled maintenance | In-app banner | Email (24h) | Email + Call (72h) |
| Emergency deployment | In-app banner | Email | Dedicated contact |
| Feature release | Release notes | Email summary | Dedicated briefing |
| Deprecation | In-app warning | Email (30d) | Migration support |

### 5.5 Tenant Isolation During Deployment

| Isolation Aspect | Implementation | Verification |
|------------------|----------------|--------------|
| Database migrations | Per-tenant or RLS-aware | Migration tests |
| Cache invalidation | Tenant-prefixed keys | Cache verification |
| Session handling | Graceful session migration | Session continuity tests |
| Background jobs | Tenant-aware queues | Job isolation tests |

---

## Monitoring

### 6.1 Deployment Monitoring Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│                 Deployment Monitoring Dashboard                  │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Deployment Status: {{deployment_status}}                          │    │
│  │ Current Version: {{current_version}} → Target: {{target_version}}             │    │
│  │ Progress: {{deployment_progress}}%                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌───────────────────────┐  ┌───────────────────────┐          │
│  │ Error Rate            │  │ Latency (p99)         │          │
│  │ ┌─────────────────┐   │  │ ┌─────────────────┐   │          │
│  │ │    __/\__       │   │  │ │   _____         │   │          │
│  │ │   /    \_____   │   │  │ │  /     \___     │   │          │
│  │ │  /              │   │  │ │ /              │   │          │
│  │ └─────────────────┘   │  │ └─────────────────┘   │          │
│  │ Current: {{current_error_rate}}%         │  │ Current: {{current_latency}}ms       │          │
│  │ Threshold: {{error_threshold}}%     │  │ Threshold: {{latency_threshold}}ms   │          │
│  └───────────────────────┘  └───────────────────────┘          │
│                                                                  │
│  ┌───────────────────────┐  ┌───────────────────────┐          │
│  │ Tenant Health         │  │ Resource Utilization  │          │
│  │ Healthy: {{healthy_tenants}}        │  │ CPU: {{cpu_utilization}}%              │          │
│  │ Degraded: {{degraded_tenants}}       │  │ Memory: {{memory_utilization}}%         │          │
│  │ Unhealthy: {{unhealthy_tenants}}      │  │ Network: {{network_utilization}}%        │          │
│  └───────────────────────┘  └───────────────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 Key Metrics

| Metric | Type | Labels | Alert Threshold |
|--------|------|--------|-----------------|
| `deployment_duration_seconds` | Histogram | environment, version | > {{deployment_duration_alert}}s |
| `deployment_status` | Gauge | environment, version | != 1 (success) |
| `deployment_rollbacks_total` | Counter | environment, reason | > {{rollback_alert_threshold}} |
| `canary_traffic_percentage` | Gauge | version | N/A |
| `feature_flag_evaluations_total` | Counter | flag_id, result | N/A |
| `tenant_deployment_ring` | Gauge | tenant_id, version | N/A |

### 6.3 Deployment Alerts

| Alert | Condition | Severity | Action |
|-------|-----------|----------|--------|
| DeploymentFailed | status != success for > {{failed_duration}}m | Critical | Page on-call |
| HighErrorRateDuringDeploy | error_rate > {{deploy_error_threshold}}% | Critical | Auto-rollback |
| HighLatencyDuringDeploy | latency_p99 > {{deploy_latency_threshold}}ms | Warning | Notify team |
| TenantHealthDegraded | unhealthy_tenants > {{unhealthy_threshold}} | Warning | Investigate |
| RollbackTriggered | rollback initiated | Critical | Notify all |
| CanaryStalled | canary progress stalled > {{stall_duration}}m | Warning | Manual review |

### 6.4 Logging During Deployment

| Event | Log Level | Required Fields |
|-------|-----------|-----------------|
| Deployment started | INFO | version, environment, initiator |
| Stage progression | INFO | stage, percentage, metrics_snapshot |
| Health check result | DEBUG | check_name, result, duration |
| Rollback initiated | WARN | reason, metrics_snapshot, affected_tenants |
| Deployment completed | INFO | version, duration, final_metrics |
| Feature flag change | INFO | flag_id, old_value, new_value, changed_by |

### 6.5 Post-Deployment Verification

| Check | Method | Success Criteria |
|-------|--------|------------------|
| Health endpoint | HTTP GET | 200 OK |
| Database connectivity | Query test | < {{db_check_latency}}ms |
| Cache connectivity | Ping + Get | < {{cache_check_latency}}ms |
| External dependencies | HTTP/gRPC check | All healthy |
| Smoke tests | Automated suite | 100% pass |
| Tenant isolation | Cross-tenant query test | No leakage |

---

## Configuration

### 7.1 Deployment Configuration

```yaml
deployment:
  project: {{project_name}}
  ai_runtime: {{ai_runtime}}
  tenant_model: {{tenant_model}}
  
  methodology: {{deployment_methodology}}
  
  blue_green:
    enabled: {{blue_green_enabled}}
    switch_timeout_seconds: {{switch_timeout}}
    verification_checks: {{verification_checks}}
    
  canary:
    enabled: {{canary_enabled}}
    initial_percentage: {{initial_canary_percent}}
    increment_percentage: {{canary_increment}}
    analysis_interval_minutes: {{analysis_interval}}
    
  feature_flags:
    provider: {{feature_flag_provider}}
    cache_ttl_seconds: {{flag_cache_ttl}}
    evaluation_timeout_ms: {{flag_eval_timeout}}
    
  rollback:
    auto_enabled: {{auto_rollback_enabled}}
    error_threshold_percentage: {{rollback_error_threshold}}
    latency_threshold_ms: {{rollback_latency_threshold}}
    
  tenant_scoped:
    ring_deployment_enabled: {{ring_deployment_enabled}}
    tenant_override_enabled: {{tenant_override_enabled}}
    enterprise_approval_required: {{enterprise_approval}}
    
  monitoring:
    dashboard_url: {{dashboard_url}}
    alert_channels: {{alert_channels}}
    log_retention_days: {{log_retention}}
```

---

## Appendix A: Deployment Checklist

### Pre-Deployment

- [ ] All tests pass in CI
- [ ] Database migrations tested in staging
- [ ] Feature flags configured
- [ ] Rollback plan documented
- [ ] On-call engineer notified
- [ ] Monitoring dashboards ready
- [ ] Tenant communication sent (if required)

### During Deployment

- [ ] Monitor error rate and latency
- [ ] Verify health checks passing
- [ ] Check tenant health status
- [ ] Validate feature flag behavior
- [ ] Monitor resource utilization

### Post-Deployment

- [ ] Smoke tests pass
- [ ] Metrics within normal range
- [ ] No customer-reported issues
- [ ] Update deployment log
- [ ] Archive previous version artifacts

---

## Appendix B: Related Documents

- Pattern: `deployment-patterns` in `bam-patterns.csv`
- Tenant Model: `tenant-model-template.md`
- Observability: `tenant-aware-observability` workflow

---

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "SaaS deployment strategy best practices {date}"
- "blue-green canary deployment multi-tenant patterns {date}"
- "tenant-scoped deployment enterprise implementation {date}"

Incorporate relevant findings into the document sections above.

---

## Verification Checklist

- [ ] Deployment methodology is selected (blue-green, canary, rolling, feature flags)
- [ ] Blue-green configuration includes health checks and verification timeout
- [ ] Canary stages are defined with percentage progression and metrics thresholds
- [ ] Traffic routing rules support tenant-based routing for controlled rollouts
- [ ] Feature flags are configured by tenant tier (Free, Pro, Enterprise)
- [ ] Rollback triggers are defined with automatic and manual thresholds
- [ ] Rollback procedure includes notification, traffic switch, and verification
- [ ] Tenant deployment rings are configured with appropriate wait times
- [ ] Enterprise tenant override configuration supports version pinning
- [ ] Monitoring dashboard tracks error rate, latency, and tenant health
- [ ] Tenant communication plan covers scheduled and emergency deployments
- [ ] Tenant isolation is verified during deployment (migrations, cache, sessions)

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial specification |
