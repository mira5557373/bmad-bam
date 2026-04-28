# Step 5: Design Chaos Experiments

## Purpose

Design structured chaos experiments that validate system resilience while respecting tenant isolation and blast radius controls.

## Prerequisites

- Blast radius controls defined (Step 4 complete)
- Observability and monitoring in place
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `chaos-engineering`

## Execution Protocols

```
🔍 Use web search to verify current best practices
Search the web: "chaos engineering experiment design patterns {date}"
Search the web: "multi-tenant fault injection patterns {date}"
📋 Reference pattern registry for decision criteria
🎯 Focus on tenant-aware resilience
```

## Actions

### 1. Define Experiment Categories

Categorize experiments by failure domain:

| Category | Examples | Tenant Impact | Priority |
|----------|----------|---------------|----------|
| Network | Latency injection, partition | Per-tenant testing | High |
| Resource | CPU stress, memory pressure | Isolated containers | High |
| Dependency | Database timeout, API failure | Graceful degradation | High |
| State | Data corruption simulation | Read-only tests | Medium |
| AI Runtime | Model timeout, inference failure | Fallback validation | Medium |

### 2. Design Tenant-Specific Experiments

Create experiments that validate tenant isolation:

| Experiment | Hypothesis | Steady State | Injection | Expected Outcome |
|------------|------------|--------------|-----------|------------------|
| Tenant A latency | Other tenants unaffected | All < 100ms | Add 500ms to A | Only A sees latency |
| Tenant B failure | A continues normal | A healthy | Fail B's requests | A unaffected |
| RLS bypass attempt | Isolation holds | No cross-access | Inject bad context | Access denied |

### 3. Define Steady-State Metrics

Establish baseline measurements:

| Metric | Baseline | Acceptable Variance | Alert Threshold |
|--------|----------|---------------------|-----------------|
| Request latency (p95) | 100ms | +50% | +100% |
| Error rate | 0.1% | +0.5% | +1% |
| Tenant isolation | 100% | 0% | Any violation |
| AI response time | 500ms | +100% | +200% |

### 4. Design Experiment Runbooks

Create structured experiment procedures:

| Phase | Duration | Actions | Verification |
|-------|----------|---------|--------------|
| Pre-flight | 5 min | Baseline capture, approvals | Metrics stable |
| Injection | 10-30 min | Apply fault, monitor | Alerts within bounds |
| Observation | 5-15 min | Validate behavior | Hypothesis verified |
| Recovery | 5 min | Remove fault, verify | Baseline restored |
| Post-mortem | 30 min | Document findings | Report generated |

### 5. Plan Experiment Progression

Define maturity-based rollout:

| Phase | Environment | Experiments | Timeline |
|-------|-------------|-------------|----------|
| Foundation | Development | All categories | Week 1-2 |
| Validation | Staging | Network, resource | Week 3-4 |
| Shadow | Production (read-only) | Dependency | Week 5-6 |
| Controlled | Production (5%) | Validated set | Week 7+ |
| Mature | Production (25%) | Full suite | Ongoing |

### 6. Document AI Runtime Experiments

Design agent-specific chaos:

| Experiment | Target | Injection | Validation |
|------------|--------|-----------|------------|
| Model timeout | LLM API | Delay response | Fallback activates |
| Tool failure | Agent tools | Return errors | Graceful degradation |
| State corruption | Agent memory | Invalid state | Recovery mechanism |
| Rate limiting | API quota | Exceed limits | Backoff works |

## Verification

- [ ] Experiment categories defined
- [ ] Tenant isolation experiments designed
- [ ] Steady-state metrics established
- [ ] Runbooks created for each experiment
- [ ] Progression plan documented
- [ ] AI runtime experiments included
- [ ] QG-CE1 criteria addressed

## Outputs

- Chaos experiment catalog
- Experiment runbooks
- Progression timeline
- **Load template:** `{project-root}/_bmad/bam/data/templates/chaos-engineering-template.md`

## Next Step

Chaos engineering design complete. Run validation mode to verify QG-DR (if DR completed) and QG-CE1 compliance.
