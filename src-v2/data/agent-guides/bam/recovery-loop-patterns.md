# BAM Recovery Loop Patterns Guide

**When to load:** During Phase 3 (Solutioning) when designing fault tolerance,
or when user mentions rollback, recovery, or failure handling.

**Integrates with:** Atlas (Platform), disaster-recovery workflow

---

## Core Concepts

### Recovery Loop Overview

The Recovery Loop enables safe rollback and self-healing for tenant-scoped failures.

```
Detect → Isolate → Diagnose → Recover → Verify
   │        │          │          │        │
   └────────┴──────────┴──────────┴────────┘
                 Recovery Loop
            (Tenant-scoped resilience)
```

### Recovery Strategies

| Strategy | Scope | Use When |
|----------|-------|----------|
| Retry | Single request | Transient failure |
| Rollback | Single action | Action failed mid-execution |
| Failover | Tenant session | Service degradation |
| Quarantine | Tenant account | Suspected abuse |

### Tenant-Scoped Rollback

```yaml
rollback_config:
  action_level:
    strategy: compensating_action
    timeout_ms: 5000
    max_retries: 3
  
  session_level:
    strategy: checkpoint_restore
    checkpoint_interval: 5_actions
  
  tenant_level:
    strategy: point_in_time_recovery
    retention_hours: 72
```

### Failure Classification

| Failure Type | Blast Radius | Recovery Path |
|--------------|--------------|---------------|
| Transient | Single request | Auto-retry |
| Partial | Single action | Compensating action |
| Session | User session | Checkpoint restore |
| Tenant | Entire tenant | Point-in-time recovery |
| Platform | All tenants | Disaster recovery |

## Application Guidelines

1. **Design rollback with the action** - Not as afterthought
2. **Test rollback in staging** - PRG check #3
3. **Isolate failure blast radius** - One tenant, not all
4. **Log recovery attempts** - Audit requirement

### Compensating Actions

Every write operation should define its compensating action upfront. Compensating actions reverse the effect of a failed operation and must be idempotent to handle partial failures. Complex workflows may require saga orchestration with multiple compensating steps executed in reverse order.

```yaml
compensating_actions:
  create_resource:
    compensate: delete_resource
    timeout_ms: 5000
  
  update_balance:
    compensate: reverse_transaction
    timeout_ms: 10000
  
  send_notification:
    compensate: send_correction_notice
    timeout_ms: 30000
```

### Circuit Breaker Patterns

Circuit breakers prevent cascade failures by stopping requests to failing services. Each tenant should have independent circuit breaker state to prevent cross-tenant impact. Circuit breakers should track failure rates and automatically reset after a cooldown period.

| Circuit State | Behavior | Transition Trigger |
|---------------|----------|-------------------|
| Closed | Normal operation | - |
| Open | Fail fast | 5 failures in 10s |
| Half-Open | Test requests | 30s cooldown |

### Blast Radius Containment

Failures should be isolated to the smallest possible scope. Tenant-level isolation ensures one tenant's issues don't affect others. Session-level isolation contains failures to a single user session. Action-level isolation limits impact to a single operation.

### Recovery Metrics

Track recovery performance to identify improvement opportunities. Key metrics include mean time to detect (MTTD), mean time to recover (MTTR), and recovery success rate. Set SLOs for each metric and alert when thresholds are breached.

## Decision Framework

| Scenario | Recovery Strategy | SLA Target |
|----------|------------------|------------|
| API timeout | Retry with backoff | < 5s |
| Write failure | Compensating action | < 30s |
| Session corruption | Checkpoint restore | < 1 min |
| Data inconsistency | Point-in-time recovery | < 1 hour |

## Related Workflows

- `bmad-bam-disaster-recovery-design` - DR planning
- `bmad-bam-tenant-incident-response` - Incident handling
- `bmad-bam-action-contract-design` - Rollback plans

## Related Patterns

Load from pattern registry:

- **Recovery patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `recovery-loop-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "AI agent rollback patterns {date}"
- Search: "multi-tenant failure isolation {date}"
