# BAM Chaos Engineering Guide

**When to load:** During resilience testing design, failure mode analysis, or when user mentions chaos testing, fault injection, resilience, game days.

**Integrates with:** DevOps (devops-bam), TEA (testing), Architect (infrastructure)

---

## Core Concepts

### Chaos Engineering Principles

Chaos engineering proactively discovers weaknesses by injecting controlled failures into production-like systems.

| Principle | Description | Multi-Tenant Consideration |
|-----------|-------------|---------------------------|
| Build hypothesis | Define expected behavior | Tenant SLA expectations |
| Minimize blast radius | Limit failure scope | Tenant isolation must hold |
| Run in production | Test real conditions | Use canary tenants first |
| Automate experiments | Repeatable, measurable | Per-tier experiments |
| Learn and improve | Strengthen system | Document per-tenant impact |

### Failure Categories

| Category | Examples | Tenant Impact |
|----------|----------|---------------|
| Infrastructure | Node failure, disk full, network partition | Service degradation |
| Application | Memory leak, deadlock, exception cascade | Feature unavailability |
| Data | Database failure, cache corruption | Data access issues |
| AI/Agent | Model timeout, tool failure, guardrail false positive | Agent unavailability |
| Third-party | Payment gateway down, LLM provider outage | Feature degradation |

---

## Application Guidelines

When implementing chaos engineering for multi-tenant AI platforms:

1. **Verify tenant isolation during chaos**: Failure in Tenant A must not expose Tenant B data
2. **Test per-tier SLA compliance**: Enterprise tenants have stricter requirements
3. **Include AI agent resilience**: Test LLM timeouts, tool failures, memory corruption
4. **Start with low blast radius**: Single tenant, single service, short duration
5. **Have rollback mechanisms**: Ability to immediately stop experiment

---

## Experiment Categories

### Infrastructure Experiments

| Experiment | Injection | Expected Behavior |
|------------|-----------|-------------------|
| Node termination | Kill random node | Auto-scale, no tenant impact |
| CPU stress | 100% CPU utilization | Graceful degradation |
| Memory pressure | Fill memory to limit | OOM handling, pod restart |
| Disk full | Fill disk to 100% | Alerts, no data loss |
| Network latency | Add 500ms latency | Timeout handling |
| Network partition | Split availability zones | Failover activates |
| DNS failure | Block DNS resolution | Cached responses, alerts |

### Application Experiments

| Experiment | Injection | Expected Behavior |
|------------|-----------|-------------------|
| Service crash | Kill service process | Restart, request retry |
| Dependency timeout | Delay downstream calls | Circuit breaker opens |
| Exception injection | Throw random exceptions | Error handling, logging |
| Queue backup | Pause queue consumers | Backpressure, alerts |
| Cache failure | Disable cache layer | Direct DB queries, degradation |

### AI/Agent Experiments

| Experiment | Injection | Expected Behavior |
|------------|-----------|-------------------|
| LLM provider timeout | Block LLM API calls | Fallback model, graceful error |
| Tool execution failure | Fail tool calls | Retry, alternative tool, error |
| Memory corruption | Corrupt agent memory | Memory reconstruction |
| Token budget exhaustion | Set budget to 0 | Graceful termination |
| Guardrail false positive | Block all outputs | Manual review queue |
| Vector DB unavailable | Block embedding queries | Cached results, degradation |

### Multi-Tenant Experiments

| Experiment | Injection | Expected Behavior |
|------------|-----------|-------------------|
| Noisy neighbor | Flood single tenant | Rate limiting, isolation |
| Tenant isolation breach | Attempt cross-tenant access | Block, alert, audit |
| Quota exhaustion | Exhaust tenant quota | Graceful denial, upgrade prompt |
| Tier degradation | Downgrade tenant tier | Feature gating activates |

---

## Experiment Design

### Experiment Template

```
Experiment: {Name}
Category: {Infrastructure|Application|AI|Multi-Tenant}
Hypothesis: When {failure condition}, the system should {expected behavior}

Target:
- Service: {service name}
- Scope: {tenant|region|service|global}
- Duration: {seconds/minutes}

Injection:
- Method: {how to inject failure}
- Parameters: {specific settings}
- Kill switch: {how to stop immediately}

Steady State:
- Metrics: {baseline metrics to monitor}
- Thresholds: {acceptable deviation}

Success Criteria:
- [ ] Tenant isolation maintained
- [ ] SLA compliance per tier
- [ ] No data loss or corruption
- [ ] Recovery within RTO
- [ ] Alerts fired correctly

Rollback:
- Procedure: {how to restore}
- Estimated time: {duration}
```

### Blast Radius Control

| Level | Scope | Use Case | Approval |
|-------|-------|----------|----------|
| 1 - Minimal | Single test tenant | Initial validation | Team lead |
| 2 - Limited | Single production tenant (volunteered) | Realistic testing | Engineering manager |
| 3 - Moderate | 1% of tenants | Canary validation | Director |
| 4 - Broad | 10% of tenants | Pre-release validation | VP Engineering |
| 5 - Full | All tenants | Major release validation | CTO |

### Scheduling Strategy

| Experiment Type | Frequency | Window | Notification |
|-----------------|-----------|--------|--------------|
| Automated regression | Daily | Off-peak hours | Automated |
| Service-level chaos | Weekly | Maintenance window | 24h advance |
| Cross-service chaos | Monthly | Scheduled game day | 1 week advance |
| Full DR exercise | Quarterly | Planned event | 1 month advance |

---

## Tenant Isolation Validation

### Isolation During Chaos

| Scenario | Validation | Pass Criteria |
|----------|------------|---------------|
| Service failure | Query cross-tenant | Zero results |
| Database partition | Test RLS | All policies enforced |
| Cache corruption | Check key isolation | No cross-tenant keys |
| Agent memory failure | Test memory isolation | No shared state |

### Tenant Communication

| Experiment Scope | Communication | Timing |
|------------------|---------------|--------|
| Internal test tenant | None required | - |
| Canary production tenant | Opt-in consent | Pre-registration |
| Broader production | Status page notice | 24h advance |
| All production | Email + status page | 1 week advance |

---

## Tool Integration

### Chaos Engineering Platforms

| Tool | Use Case | Multi-Tenant Support |
|------|----------|---------------------|
| Chaos Monkey | Instance termination | Tenant tag filtering |
| Gremlin | Comprehensive chaos | Tenant scope targeting |
| Litmus | Kubernetes chaos | Namespace isolation |
| Chaos Mesh | K8s-native chaos | Pod selector + tenant labels |
| AWS FIS | AWS service chaos | Account/resource scoping |

### Integration Points

| Integration | Purpose | Implementation |
|-------------|---------|----------------|
| CI/CD | Automated chaos in pipeline | Pre-deployment validation |
| Monitoring | Real-time impact tracking | Tenant-labeled dashboards |
| Alerting | Experiment-aware alerts | Suppress expected alerts |
| Incident management | Automatic rollback | PagerDuty/Opsgenie integration |

---

## Decision Framework

### When to Run Chaos

| Trigger | Experiment Type | Scope |
|---------|-----------------|-------|
| New service deployment | Service chaos | New service only |
| Infrastructure change | Infrastructure chaos | Affected components |
| New tenant tier | Tier-specific chaos | New tier |
| Quarterly review | Comprehensive | All categories |
| Post-incident | Targeted | Failure scenario |

### When to Abort

| Condition | Action | Recovery |
|-----------|--------|----------|
| Tenant isolation breach | Immediate stop | Incident response |
| Data loss detected | Immediate stop | Restore from backup |
| Cascading failures | Stop + assess | Component isolation |
| SLA breach > threshold | Stop experiment | Monitor recovery |
| Customer complaint | Pause + investigate | Communication |

---

## Metrics and Reporting

### Key Metrics

| Metric | Description | Target |
|--------|-------------|--------|
| Mean Time to Detection (MTTD) | Time to detect injected failure | < 1 minute |
| Mean Time to Recovery (MTTR) | Time to recover from failure | Per-tier SLA |
| Blast radius containment | % of unaffected tenants | > 99% |
| Isolation maintenance | Cross-tenant breaches | 0 |
| SLA compliance | % of tenants within SLA | 100% for Enterprise |

### Experiment Report Template

```
Experiment Report: {Name}
Date: {date}
Duration: {duration}
Scope: {affected tenants/services}

Results:
- Hypothesis validated: Yes/No
- Tenant isolation: Maintained/Breached
- SLA compliance: {percentage}
- Recovery time: {duration}

Findings:
1. {Finding with severity}
2. {Finding with severity}

Improvements Identified:
1. {Action item}
2. {Action item}

Next Steps:
- {Follow-up experiment or fix}
```

---

## Related Patterns

**Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `resilience`
**Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `disaster-recovery`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "chaos engineering multi-tenant SaaS {date}"
- Search: "AI agent resilience testing {date}"
- Search: "fault injection distributed systems {date}"

---

## Related Workflows

- `bmad-bam-disaster-recovery-design` - DR strategy and testing
- `bmad-bam-chaos-engineering-design` - Chaos engineering workflow
- `bmad-bam-tenant-incident-response` - Incident response procedures
