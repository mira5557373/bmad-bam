# Step 1: Select Resilience Focus

## Purpose

Determine whether to focus on Disaster Recovery (DR) or Chaos Engineering, or both, based on project maturity and requirements.

## Prerequisites

- Master architecture completed (QG-F1 passed)
- Tenant model documented
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `disaster-recovery`, `chaos-engineering`

## Execution Protocols

```
🔍 Use web search to verify current best practices
📋 Reference pattern registry for decision criteria
🎯 Focus on tenant-aware resilience
```

## Actions

### 1. Assess Project Maturity

Evaluate readiness for each resilience domain:

| Domain | Readiness Indicators | Priority |
|--------|---------------------|----------|
| Disaster Recovery | Production deployment imminent, SLAs defined | High for production |
| Chaos Engineering | Stable production, observability in place | High for mature systems |

### 2. Select Sub-Workflow

Present options to user:

| Code | Sub-Workflow | When to Select |
|------|--------------|----------------|
| ZDR | Disaster Recovery | RTO/RPO requirements exist, compliance needs |
| ZCH | Chaos Engineering | System stability testing, failure mode discovery |
| BOTH | Full Resilience | Comprehensive resilience strategy needed |

### 3. Document Selection

Record the selected focus and rationale:

- Selected focus: {ZDR | ZCH | BOTH}
- Business drivers
- Timeline requirements
- Tenant tier considerations

## Verification

- [ ] Project maturity assessed
- [ ] Sub-workflow selected with rationale
- [ ] Tenant tier impact identified
- [ ] Timeline documented

## Outputs

- Resilience focus selection documented

## Next Step

- If ZDR selected: Proceed to `step-02-c-dr-rto-rpo.md`
- If ZCH selected: Proceed to `step-04-c-chaos-blast-radius.md`
- If BOTH selected: Proceed to `step-02-c-dr-rto-rpo.md` (then continue to Chaos steps)
