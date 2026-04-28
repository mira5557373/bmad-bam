# Step 4: Define Blast Radius Controls

## Purpose

Establish safety controls and blast radius limitations for chaos engineering experiments to prevent tenant impact and system-wide failures.

## Prerequisites

- If BOTH focus: DR design complete (Steps 2-3)
- If ZCH focus: Resilience focus selected (Step 1)
- Production observability in place
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `chaos-engineering`

## Execution Protocols

```
🔍 Use web search to verify current best practices
Search the web: "chaos engineering blast radius controls {date}"
Search the web: "multi-tenant chaos engineering safety {date}"
📋 Reference pattern registry for decision criteria
🎯 Focus on tenant-aware resilience
```

## Actions

### 1. Define Safety Boundaries

Establish non-negotiable constraints:

| Boundary | Constraint | Rationale |
|----------|------------|-----------|
| Tenant isolation | Never cross tenant boundaries | Data protection |
| Production scope | Max 5% of traffic initially | Minimize impact |
| Time limits | Max 30 minutes per experiment | Recovery window |
| Critical paths | Exclude auth/billing initially | Business continuity |

### 2. Create Environment Tiers

Define experiment environments:

| Environment | Scope | Risk Level | Approval |
|-------------|-------|------------|----------|
| Development | Full chaos | Low | Team lead |
| Staging | Realistic chaos | Medium | Engineering manager |
| Production (shadow) | Read-only chaos | Low | Architect |
| Production (live) | Controlled chaos | High | VP Engineering |

### 3. Design Tenant Protection

Ensure tenant safety during experiments:

| Protection | Implementation | Verification |
|------------|----------------|--------------|
| Opt-out mechanism | Tenant flag in config | Pre-experiment check |
| Tier exclusions | Enterprise always excluded | Routing rules |
| Isolation verification | Post-experiment audit | Automated |
| Rollback triggers | Error rate > 5% | Auto-terminate |

### 4. Define Abort Criteria

Establish automatic termination conditions:

| Metric | Threshold | Action | Recovery |
|--------|-----------|--------|----------|
| Error rate | > 5% baseline | Abort | Rollback |
| Latency | > 200% baseline | Abort | Rollback |
| Tenant complaints | Any | Pause | Investigate |
| Resource exhaustion | > 90% | Abort | Scale up |

### 5. Document Approval Workflow

Create experiment approval process:

| Stage | Approver | Requirements |
|-------|----------|--------------|
| Design | Tech lead | Hypothesis, blast radius |
| Pre-production | Engineering manager | Test results |
| Production | VP Engineering | Risk assessment, rollback plan |

## Verification

- [ ] Safety boundaries defined
- [ ] Environment tiers established
- [ ] Tenant protection mechanisms in place
- [ ] Abort criteria with thresholds
- [ ] Approval workflow documented
- [ ] Rollback procedures ready

## Outputs

- Blast radius control specification
- Tenant protection rules
- Approval workflow documentation

## Next Step

Proceed to `step-05-c-chaos-experiments.md` to design chaos experiments.
