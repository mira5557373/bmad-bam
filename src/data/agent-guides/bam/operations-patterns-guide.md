# BAM Operations Patterns Guide

**When to load:** During Phase 6 (Operations) when designing deployment, SRE practices, incident response, backup/recovery, SLA management, or CI/CD pipelines. Load when user mentions deployment, operations, SRE, incident, backup, recovery, CI/CD, runbook, SLA, DevOps, canary, blue-green, rollback, error budget.
**Integrates with:** DevOps agent, SRE roles, Platform Operators, Security Operations

---

## Core Concepts

### Multi-Tenant Operations Philosophy

Operations for multi-tenant SaaS requires balancing per-tenant reliability against shared infrastructure efficiency. Core principles:

| Principle | Description | Implementation |
|-----------|-------------|----------------|
| Tenant Isolation | Single tenant failures must not cascade | Blast radius containment |
| Tier-Based SLAs | Different tiers have different guarantees | SLO/SLA per tier |
| Automated Recovery | Minimize human intervention | Self-healing + runbooks |
| Observable Operations | Per-tenant visibility | Tenant-scoped dashboards |
| Zero-Downtime | Deployments without tenant disruption | Blue-green, canary |

### Tier-Based Operational Matrix

| Capability | Free | Pro | Enterprise |
|------------|------|-----|------------|
| Availability SLA | 99% | 99.9% | 99.99% |
| RPO (Data Loss) | 24 hours | 1 hour | 15 minutes |
| RTO (Downtime) | 48 hours | 4 hours | 1 hour |
| Support Response | Community | 24h business | 1h 24/7 |
| Incident Priority | P4 | P3 | P1-P2 |
| Deployment Control | Auto-update | Scheduled | Manual approval |

---

## BAM Conventions

> **CRITICAL:** These conventions are BAM-specific and must be followed for multi-tenant operations.

### Runbook Naming Convention

| Category | Pattern | Example |
|----------|---------|---------|
| Incident | `IR-{severity}-{component}` | `IR-P1-platform-outage` |
| Deployment | `DEP-{type}-{scope}` | `DEP-canary-api` |
| Recovery | `DR-{scenario}` | `DR-database-failover` |
| Tenant Ops | `TEN-{operation}` | `TEN-tier-upgrade` |
| AI Operations | `AI-{operation}` | `AI-model-rollback` |

### Deployment Artifact Format

| Artifact | Naming | Storage | Retention |
|----------|--------|---------|-----------|
| Container Image | `{service}:{semver}-{sha}` | Registry | 90 days |
| Config Bundle | `{tenant}-{env}-{version}.yaml` | GitOps repo | Indefinite |
| Migration | `{timestamp}_{description}.sql` | Version control | Indefinite |
| Backup | `{tenant}_{timestamp}_{type}.enc` | Object storage | Per tier |

### Error Budget Policy

| Budget Status | Engineering Response | Release Policy |
|--------------|---------------------|----------------|
| > 50% remaining | Normal velocity | All releases allowed |
| 25-50% remaining | Increased testing | Feature freeze optional |
| 10-25% remaining | Focus on reliability | Feature freeze |
| < 10% remaining | Emergency reliability mode | Bug fixes only |
| Exhausted | All hands on deck | No changes without approval |

---

## Decision Framework

| Scenario | Pattern | Rationale |
|----------|---------|-----------|
| Zero-downtime required | Blue-green deployment | Instant rollback capability |
| High-risk change | Canary with 1% traffic | Progressive risk reduction |
| Database schema change | Expand-contract migration | No tenant disruption |
| Enterprise tenant deployment | Scheduled maintenance window | Contractual obligations |
| Security patch | Immediate rollout | Security overrides gradual rollout |
| Single tenant fix | Tenant-scoped deployment | Minimize blast radius |
| Platform-wide SLO breach | Pause deployments, incident response | Protect all tenants |
| Noisy neighbor detected | Apply rate limiting | Protect other tenants |

---

## §deployment

### Pattern: Deployment

Multi-tenant deployment strategies ensuring zero-downtime and tenant isolation.

### Blue-Green Deployment

| Component | Description | Tenant Impact |
|-----------|-------------|---------------|
| Blue (Active) | Current production version | Serving 100% traffic |
| Green (Standby) | New version for validation | No traffic until cutover |
| Cutover | Switch load balancer target | Sub-second transition |
| Rollback | Switch back to Blue | Instant recovery |

**Blue-Green Checklist:**

| Phase | Action | Verification |
|-------|--------|--------------|
| Pre-deploy | Deploy to standby | Health checks pass |
| Validation | Run smoke tests | All tests green |
| Cutover | Switch traffic | Monitor errors |
| Monitor | Watch metrics | Error rate < 0.1% |
| Cleanup | Decommission old | Remove after 24h |

### Canary Release

| Stage | Traffic | Duration | Promotion Criteria |
|-------|---------|----------|-------------------|
| Initial | 1% | 30 min | Error rate < 0.1% |
| Early Adopters | 10% | 2 hours | No critical alerts |
| Rolling | 25% -> 50% -> 100% | 4 hours | SLO maintained |

**Auto-Rollback Triggers:**

| Metric | Threshold | Action |
|--------|-----------|--------|
| Error rate | > 1% | Immediate rollback |
| Latency p99 | > 2x baseline | Investigate, rollback |
| Health checks | < 80% healthy | Immediate rollback |

### Tenant-Scoped Deployment

| Policy | Behavior | Tenant Type |
|--------|----------|-------------|
| Auto-update | Immediate rollout | Standard |
| Scheduled | Maintenance window | Enterprise |
| Opt-out | Manual trigger | Regulated |
| Early-access | First in canary | Beta partners |

### Database Migration Strategy

| Change Type | Strategy | Downtime |
|-------------|----------|----------|
| Add column | Online | None |
| Add index | Background | None |
| Rename column | Expand-contract | None |
| Drop column | Multi-phase | None |
| Schema change | Blue-green DB | Brief |

#### Kubernetes Deployment Example

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-server
  labels:
    app: api-server
    tenant-aware: "true"
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: api-server
  template:
    metadata:
      labels:
        app: api-server
    spec:
      containers:
      - name: api
        image: registry.example.com/api:v1.2.3-abc123
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        env:
        - name: TENANT_ISOLATION_MODE
          value: "rls"
        readinessProbe:
          httpGet:
            path: /health/ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
        livenessProbe:
          httpGet:
            path: /health/live
            port: 8080
          initialDelaySeconds: 15
          periodSeconds: 10
```

---

## §cicd

### Pattern: CI/CD Pipeline

Tenant-aware continuous integration and delivery patterns.

### Pipeline Architecture

| Stage | Purpose | Multi-Tenant Consideration |
|-------|---------|---------------------------|
| Build | Compile, package | Single artifact, tenant-agnostic |
| Test | Validate functionality | Test against tenant config matrix |
| Security | Scan vulnerabilities | Tenant isolation verification |
| Stage | Deploy to staging | Multi-tenant staging environment |
| Canary | Limited production | Percentage or tenant-based |
| Production | Full rollout | Tenant-aware progressive deployment |

### Tenant-Aware Testing Strategy

| Test Type | Scope | Tenant Variation |
|-----------|-------|------------------|
| Unit tests | Component logic | None (tenant-agnostic) |
| Integration tests | Service interaction | Multiple tenant configs |
| Contract tests | API compatibility | Tenant-specific features |
| E2E tests | Full workflows | Run per tier (free, pro, enterprise) |
| Isolation tests | Tenant boundary | Cross-tenant access attempts |

### Tenant-Based Rollout Priority

| Tenant Tier | Rollout Order | Notification |
|-------------|---------------|--------------|
| Internal test | First | None required |
| Beta | After internal | None required |
| Standard | After canary success | In-app notice |
| Enterprise | Scheduled window | 48h advance notice |
| Regulated | Manual approval | Compliance review |

### Security Gates

| Security Gate | Stage | Blocking |
|---------------|-------|----------|
| SAST (code scan) | PR | Yes |
| Dependency scan | Build | Yes (critical) |
| Container scan | Build | Yes (critical) |
| DAST (runtime scan) | Staging | No (report only) |
| Secrets detection | Commit | Yes |
| RLS policy test | Integration | Yes |

#### GitHub Actions Pipeline Example

```yaml
name: Multi-Tenant Deploy Pipeline
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Build container
      run: |
        docker build -t ${{ env.REGISTRY }}/api:${{ github.sha }} .
    
    - name: Run tenant isolation tests
      run: |
        npm run test:tenant-isolation
        npm run test:rls-policies
    
    - name: Security scans
      run: |
        trivy image ${{ env.REGISTRY }}/api:${{ github.sha }}
        npm audit --audit-level=critical

  deploy-canary:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
    - name: Deploy to 5% traffic
      run: |
        kubectl set image deployment/api api=${{ env.REGISTRY }}/api:${{ github.sha }}
        kubectl patch deployment api -p '{"spec":{"replicas":1}}'
    
    - name: Monitor canary metrics
      run: |
        sleep 300  # 5 minute observation
        ERROR_RATE=$(curl -s $PROMETHEUS_URL/api/v1/query \
          --data-urlencode 'query=rate(http_errors_total{version="${{ github.sha }}"}[5m])' \
          | jq '.data.result[0].value[1]')
        if (( $(echo "$ERROR_RATE > 0.01" | bc -l) )); then
          echo "Canary failed - rolling back"
          kubectl rollout undo deployment/api
          exit 1
        fi

  deploy-production:
    needs: deploy-canary
    runs-on: ubuntu-latest
    steps:
    - name: Progressive rollout
      run: |
        for pct in 25 50 75 100; do
          kubectl scale deployment/api --replicas=$((pct * MAX_REPLICAS / 100))
          sleep 120
        done
```

---

## §sre-practices

### Pattern: SRE Practices

Site Reliability Engineering for multi-tenant platforms.

### Tenant-Aware SLOs

| Tier | Availability SLO | Latency SLO (p99) | Error Rate SLO | Error Budget (monthly) |
|------|------------------|-------------------|----------------|------------------------|
| Free | 99% | 1000ms | 5% | 7.2 hours downtime |
| Pro | 99.9% | 500ms | 1% | 43.8 minutes downtime |
| Enterprise | 99.99% | 200ms | 0.1% | 4.38 minutes downtime |

### SLI Categories

| Category | SLI | Measurement | Tenant Scope |
|----------|-----|-------------|--------------|
| Availability | Request success rate | Successful / Total | Per tenant |
| Latency | Response time distribution | p50, p95, p99 | Per tenant |
| AI Quality | Agent completion rate | Successful / Total | Per tenant |
| AI Latency | Time to first token | p50, p95, p99 | Per tenant |
| Throughput | Requests per second | Peak sustainable RPS | Per tier |

### Error Budget Burn Rate Alerting

| Burn Rate | Window | Action |
|-----------|--------|--------|
| 14.4x | 1 hour | Page on-call immediately |
| 6x | 6 hours | Page on-call |
| 3x | 24 hours | Create ticket, investigate |
| 1x | 72 hours | Review in weekly meeting |

### Blast Radius Containment

| Component | Isolation Method | Blast Radius |
|-----------|------------------|--------------|
| Compute | Namespace quotas, pod limits | Single tenant |
| Database | Connection pools per tenant | Single tenant |
| Cache | Memory limits per tenant | Single tenant |
| Queue | Dedicated queues by tier | Tier-based |
| AI Runtime | Token limits, timeout enforcement | Single tenant |

### Toil Reduction Targets

| Metric | Current | Target | Automation Method |
|--------|---------|--------|-------------------|
| Tenant onboarding | 24 hours | < 5 minutes | Self-service + automation |
| Manual incident triage | 30 min/incident | < 5 min | Auto-diagnosis dashboards |
| Config change deployment | 2 hours | < 5 minutes | GitOps pipeline |
| Capacity scaling | 4 hours | Automatic | Auto-scaling policies |

#### PromQL Error Budget Queries

```promql
# Error budget remaining (monthly) for specific tenant
1 - (
  sum(rate(http_requests_total{tenant_id="$tenant", status=~"5.."}[30d]))
  /
  sum(rate(http_requests_total{tenant_id="$tenant"}[30d]))
) / (1 - 0.999)  # 99.9% SLO

# Error budget burn rate (last 1 hour)
sum(rate(http_requests_total{status=~"5.."}[1h])) by (tenant_id)
/
sum(rate(http_requests_total[1h])) by (tenant_id)
/ (1 - 0.999) * 720  # 720 = hours in month

# Per-tenant latency SLO compliance
histogram_quantile(0.99,
  sum(rate(http_request_duration_seconds_bucket{tenant_id="$tenant"}[5m])) by (le)
) < 0.5  # 500ms threshold

# AI agent completion rate by tenant
sum(rate(agent_runs_total{status="completed", tenant_id="$tenant"}[1h]))
/
sum(rate(agent_runs_total{tenant_id="$tenant"}[1h]))
```

---

## §incident-response

### Pattern: Incident Response

Multi-tenant incident handling with blast radius management.

### Incident Classification

| Severity | Definition | Response Time | Notification |
|----------|------------|---------------|--------------|
| P1 (Critical) | Platform-wide outage or breach | < 15 min | All hands, executive, tenants |
| P2 (High) | Major feature unavailable | 1 hour | On-call team, tenant admin |
| P3 (Medium) | Degraded performance | 4 hours | Assigned engineer |
| P4 (Low) | Minor issue, workaround exists | 24 hours | Ticket queue |

### Multi-Tenant Incident Isolation

| Containment Strategy | Description | When to Use |
|---------------------|-------------|-------------|
| Tenant quarantine | Isolate affected tenant workloads | Single tenant breach |
| Evidence preservation | Capture forensic data per-tenant | Investigation required |
| Communication isolation | Notify only affected tenants | Prevent unnecessary alarm |
| Recovery sequencing | Restore by impact and SLA tier | Multi-tenant incident |

### Escalation by Tenant Tier

| Alert Type | Free Tier | Pro Tier | Enterprise Tier |
|------------|-----------|----------|-----------------|
| Single tenant issue | Queue for business hours | Page if SLA risk | Page immediately |
| Platform degradation | Page if widespread | Page immediately | Page immediately |
| Data integrity | Page immediately | Page immediately | Page + executive |
| Security incident | Page immediately | Page immediately | Page + executive + tenant |

### Post-Incident Review Focus

For multi-tenant incidents, always analyze:
- Which tenants were affected and for how long
- Error budget impact per affected tenant
- Whether blast radius containment worked
- Tenant communication effectiveness
- Tenant-specific recovery actions needed

---

## §backup-recovery

### Pattern: Backup and Recovery

Per-tenant backup strategies and disaster recovery.

### Tier-Based Recovery Objectives

| Tier | RPO | RTO | Retention | Granularity |
|------|-----|-----|-----------|-------------|
| Free | 24 hours | 48 hours | 7 days | Full tenant |
| Pro | 1 hour | 4 hours | 30 days | Table level |
| Enterprise | 15 minutes | 1 hour | 90 days | Record level |
| Enterprise+ | Near-zero | 15 minutes | 1 year | Point-in-time |

### Backup Strategy by Data Type

| Category | Backup Frequency | Method | Tenant Isolation |
|----------|------------------|--------|------------------|
| Transactional | Continuous | WAL/CDC | Per-tenant export |
| User content | Continuous | Incremental | Encrypted per-tenant |
| AI/ML data | Daily | Snapshot | Manifest + versioning |
| Configuration | On change | Snapshot | Git-like history |
| Audit logs | Continuous | Append-only | Tenant-partitioned |

### Backup by Tenant Model

| Tenant Model | Backup Strategy | Isolation Method |
|--------------|-----------------|------------------|
| RLS (shared) | Full DB + tenant export | Logical isolation |
| Schema-per-tenant | Schema-level backup | Schema isolation |
| Database-per-tenant | Database-level backup | Physical isolation |

### Restore Types

| Restore Type | Scope | Complexity | Use Case |
|--------------|-------|------------|----------|
| Full platform | Entire system | Very High | Disaster recovery |
| Single tenant | All tenant data | Medium | Tenant recovery |
| Point-in-time | Specific timestamp | High | Data corruption |
| Table/collection | Specific data set | Medium | Accidental deletion |
| Record-level | Individual records | Low | User request |

### Tenant Self-Service Restore

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| View restore points | Last 3 | Last 30 | All available |
| Request restore | No | Via support | Self-service |
| Point-in-time restore | No | No | Yes |
| Download backup | No | Yes (monthly) | Yes (anytime) |

---

## §feature-toggles

### Pattern: Feature Toggles

Tier-based feature flags and experimentation.

### Toggle Categories

| Category | Lifespan | Purpose | Example |
|----------|----------|---------|---------|
| Release | Days-weeks | Gradual rollout | New UI |
| Experiment | Weeks | A/B testing | Pricing page |
| Ops | Permanent | Kill switch | Rate limiter |
| Permission | Permanent | Tier gating | Advanced analytics |

### Toggle Evaluation Hierarchy

| Priority | Level | Example |
|----------|-------|---------|
| 1 | User override | Beta tester access |
| 2 | Tenant override | Enterprise feature |
| 3 | Tier default | Pro features |
| 4 | Percentage rollout | 10% of free users |
| 5 | Global default | Feature off |

### Per-Tier Feature Access

| Toggle Type | Free | Pro | Enterprise |
|-------------|------|-----|------------|
| Core features | All | All | All |
| Advanced features | None | All | All |
| Beta features | None | Opt-in | Opt-in |
| Custom features | None | None | Configurable |

### Toggle Lifecycle

| Phase | Actions | Duration |
|-------|---------|----------|
| Create | Define flag, default off | - |
| Rollout | Gradual enable | Days-weeks |
| Stabilize | Monitor metrics | 1-2 weeks |
| Cleanup | Remove flag, hardcode | Sprint end |

---

## §runbooks

### Pattern: Runbooks

Operational runbooks for multi-tenant platforms.

### Runbook Categories

| Category | Examples | Priority |
|----------|----------|----------|
| Incident Response | Outage, degradation, security | Critical |
| AI Operations | Model rollback, LLM failover, kill switch | Critical |
| Routine Operations | Deployment, scaling, maintenance | High |
| Tenant Operations | Onboarding, offboarding, tier changes | Medium |
| Security Operations | Key rotation, access review, patching | High |

### Runbook Structure

| Section | Purpose |
|---------|---------|
| Overview | What the runbook covers |
| Severity Levels | Criteria and response times |
| Detection | How to identify the issue |
| Triage | Initial assessment steps |
| Resolution | Step-by-step fixes |
| Escalation | When and how to escalate |
| Communication | Who to notify |
| Post-Incident | Follow-up actions |

### AI-Specific Critical Runbooks

| Runbook | Purpose | When to Execute |
|---------|---------|-----------------|
| AI Kill Switch | Emergency AI shutdown | Guardrail violation, safety issue |
| Model Rollback | Revert to previous version | Quality degradation |
| LLM Provider Failover | Switch providers | Provider outage |
| Budget Enforcement | Cost limit response | Budget exceeded |

#### Example Runbook: AI Kill Switch

```bash
#!/bin/bash
# Runbook: AI-KILL-SWITCH
# Purpose: Emergency shutdown of AI agent system
# Severity: P1 - Execute immediately on safety violation

set -e

TENANT_ID="${1:-all}"  # Optional: specific tenant or "all"
REASON="$2"

echo "[$(date)] AI Kill Switch activated by $(whoami)"
echo "Target: $TENANT_ID, Reason: $REASON"

# Step 1: Disable feature flag immediately
if [ "$TENANT_ID" = "all" ]; then
  curl -X PATCH "$FEATURE_FLAG_URL/ai-agents-enabled" \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -d '{"enabled": false}'
else
  curl -X PATCH "$FEATURE_FLAG_URL/ai-agents-enabled" \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -d "{\"enabled\": false, \"tenant_id\": \"$TENANT_ID\"}"
fi

# Step 2: Drain active agent runs
kubectl scale deployment agent-runtime --replicas=0 -n ai-runtime

# Step 3: Clear pending job queue
redis-cli -h $REDIS_HOST KEYS "agent:queue:*" | xargs redis-cli DEL

# Step 4: Log incident
curl -X POST "$INCIDENT_API/incidents" \
  -H "Content-Type: application/json" \
  -d "{
    \"severity\": \"P1\",
    \"type\": \"AI_KILL_SWITCH\",
    \"tenant_id\": \"$TENANT_ID\",
    \"reason\": \"$REASON\",
    \"timestamp\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"
  }"

echo "[$(date)] AI agents disabled. Manual restart required."
echo "To restart: kubectl scale deployment agent-runtime --replicas=3 -n ai-runtime"
```

#### Example Runbook: Tenant Isolation Breach

```bash
#!/bin/bash
# Runbook: IR-P1-TENANT-ISOLATION-BREACH
# Purpose: Respond to detected cross-tenant data access
# Severity: P1 - Execute immediately

AFFECTED_TENANT="$1"
SOURCE_TENANT="$2"

echo "[$(date)] CRITICAL: Tenant isolation breach detected"
echo "Affected: $AFFECTED_TENANT, Source: $SOURCE_TENANT"

# Step 1: Quarantine affected tenant
kubectl annotate tenant $AFFECTED_TENANT quarantine=true --overwrite
kubectl annotate tenant $SOURCE_TENANT quarantine=true --overwrite

# Step 2: Revoke active sessions
psql $DATABASE_URL -c "
  UPDATE sessions 
  SET revoked_at = NOW(), revoke_reason = 'security_incident'
  WHERE tenant_id IN ('$AFFECTED_TENANT', '$SOURCE_TENANT');
"

# Step 3: Preserve evidence (audit logs)
pg_dump $DATABASE_URL -t audit_logs \
  --data-only \
  -f "incident_$(date +%Y%m%d_%H%M%S)_audit.sql" \
  -c "tenant_id IN ('$AFFECTED_TENANT', '$SOURCE_TENANT')"

# Step 4: Page security team
curl -X POST "$PAGERDUTY_URL/incidents" \
  -H "Authorization: Token $PAGERDUTY_TOKEN" \
  -d "{
    \"incident\": {
      \"type\": \"incident\",
      \"title\": \"P1: Tenant Isolation Breach\",
      \"service\": {\"id\": \"$SECURITY_SERVICE_ID\"},
      \"urgency\": \"high\"
    }
  }"

echo "[$(date)] Containment complete. Await security team."
```

---

## §multi-region

### Pattern: Multi-Region Deployment

Global deployment with data residency and failover.

### Tenant Region Assignment

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Affinity | Assign to nearest region | Performance optimization |
| Pinning | Lock to specific region | Data residency compliance |
| Following | Move with user activity | Global workforce |
| Multi-home | Replicate across regions | Enterprise HA |

### Routing Decision Matrix

| Factor | Weight | Implementation |
|--------|--------|----------------|
| Tenant pinning | Highest | Override all other rules |
| Compliance | High | Route to compliant regions only |
| Latency | Medium | GeoDNS + anycast |
| Cost | Low | Prefer cheaper regions when equal |

### Failover Types

| Type | Trigger | RTO | Data Loss Risk |
|------|---------|-----|----------------|
| Automatic | Health check failure | 1-5 min | Minimal (sync lag) |
| Manual | Ops decision | 15-30 min | None (controlled) |
| Planned | Maintenance window | 0 (warm) | None |

---

## §background-jobs

### Pattern: Background Jobs

Tenant-aware asynchronous processing.

### Job Type Comparison

| Type | Trigger | Use Case | Tenant Consideration |
|------|---------|----------|---------------------|
| Queue-based | Event/request | Async processing | Per-tenant queues |
| Scheduled | Cron/timer | Recurring tasks | Tenant schedule isolation |
| Event-triggered | Domain events | Reactive processing | Event tenant context |
| Batch | Bulk data | Data processing | Tenant data partitioning |

### Per-Tier Job Limits

| Tier | Concurrent Jobs | Queue Size | Priority | Retention |
|------|-----------------|------------|----------|-----------|
| Free | 2 | 100 | Normal | 24 hours |
| Pro | 10 | 1000 | High | 7 days |
| Enterprise | 50 | 10000 | Critical | 30 days |

### Priority Queue Strategy

| Priority | Tier | Processing Order |
|----------|------|------------------|
| Critical | Enterprise | Immediate |
| High | Pro | Next available |
| Normal | Pro/Free | FIFO |
| Low | Free | When capacity available |

---

## Quality Gates

Operations-related quality gates for production readiness.

### QG-P1: Production Readiness

| Check | Verification | Criticality |
|-------|--------------|-------------|
| Runbooks complete | All critical scenarios documented | Critical |
| Monitoring enabled | Per-tenant dashboards active | Critical |
| Alerting configured | Tier-appropriate escalation | Critical |
| Backup verified | Recent restore test passed | Critical |
| Rollback tested | Can revert in < 5 minutes | Critical |

### QG-IR1: Incident Response Readiness

| Check | Verification | Criticality |
|-------|--------------|-------------|
| Incident classification defined | Severity levels documented | Critical |
| Escalation paths configured | On-call rotation active | Critical |
| Communication templates ready | Tenant notification prepared | High |
| Post-incident process defined | RCA workflow documented | High |

### QG-DR1: Disaster Recovery Readiness

| Check | Verification | Criticality |
|-------|--------------|-------------|
| RPO/RTO documented per tier | Objectives in SLA contracts | Critical |
| Backup automation verified | All tiers backed up | Critical |
| Restore procedure tested | Last DR drill < 90 days | Critical |
| Failover procedure documented | Regional failover runbook | High |

---

## Web Research

| Topic | Query |
|-------|-------|
| SRE Practices | `multi-tenant SaaS SRE best practices {date}` |
| Error Budgets | `error budget management B2B SaaS {date}` |
| Tenant Isolation | `tenant isolation reliability engineering {date}` |
| Deployment | `SaaS deployment strategies multi-tenant {date}` |
| Feature Flags | `feature flag patterns multi-tenant SaaS {date}` |
| CI/CD | `multi-tenant CI/CD pipeline patterns {date}` |
| GitOps | `GitOps multi-tenant Kubernetes {date}` |
| Incident Response | `multi-tenant incident management {date}` |
| Disaster Recovery | `multi-tenant backup strategies SaaS {date}` |
| Multi-Region | `multi-region SaaS deployment patterns {date}` |
| Runbooks | `SRE runbook best practices {date}` |

---

## Related Patterns

> **Note:** Use the `web_queries` column from pattern registry CSVs for current best practices searches.

Load decision criteria and web search queries from pattern registry:

- **DevOps patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter by category: `devops-*`
- **Deployment patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter by category: `deploy-*`
- **Reliability patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter by category: `reliability-*`
- **Observability patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter by category: `observability-*`

---

## Related Workflows

- `bmad-bam-tenant-onboarding-design` - Provisioning automation
- `bmad-bam-tenant-offboarding-design` - Cleanup automation
- `bmad-bam-tenant-aware-observability` - Monitoring design
- `bmad-bam-disaster-recovery-design` - DR planning
- `bmad-bam-runbook-creation` - Operational runbooks
- `bmad-bam-incident-response-operations` - Execute incident response
- `bmad-bam-on-call-rotation` - Design on-call rotation
- `bmad-bam-tenant-sla-monitoring` - Monitor tenant SLA compliance
- `bmad-bam-convergence-verification` - Verify deployment convergence
- `bmad-bam-api-version-release` - API versioning in CI/CD

---

## Change Log

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2026-04-25 | Initial consolidated guide from 26 source files |
