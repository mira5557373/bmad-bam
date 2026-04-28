# Step 11: Apply Modifications

## Purpose

Apply targeted modifications to resilience artifacts while maintaining consistency and tenant isolation guarantees.

## Prerequisites

- Existing artifacts loaded (Step 10 complete)
- Modification scope identified
- Compatibility validated

## Execution Protocols

```
🔍 Use web search for updated best practices if patterns changed
📋 Preserve unchanged sections
🎯 Maintain tenant isolation in all modifications
✅ Re-validate after changes
```

## Actions

### 1. Apply RTO/RPO Changes (if applicable)

Update recovery targets:

| Tier | Previous RTO | New RTO | Previous RPO | New RPO |
|------|--------------|---------|--------------|---------|
| Free | X hours | Y hours | X hours | Y hours |
| Pro | X hours | Y hours | X hours | Y hours |
| Enterprise | X min | Y min | X min | Y min |

Ensure SLA alignment is maintained.

### 2. Apply Failover Changes (if applicable)

Update failover procedures:

| Procedure | Previous | New | Testing Required |
|-----------|----------|-----|------------------|
| Database failover | Document | Update | Yes |
| Regional failover | Document | Update | Yes |
| Service failover | Document | Update | Yes |

### 3. Apply Blast Radius Changes (if applicable)

Update chaos controls:

| Control | Previous | New | Justification |
|---------|----------|-----|---------------|
| Traffic scope | X% | Y% | Document |
| Time limits | X min | Y min | Document |
| Environment | Tier | New tier | Document |

### 4. Apply Experiment Changes (if applicable)

Update chaos experiments:

| Experiment | Previous | New | Validation |
|------------|----------|-----|------------|
| Category | Document | Update | Required |
| Hypothesis | Document | Update | Required |
| Steady state | Document | Update | Required |

### 5. Update Version and Changelog

Document the modification:

```markdown
## Changelog

### vX.Y.Z - {date}
- Changed: {summary of changes}
- Reason: {justification}
- Approved by: {stakeholder}
```

### 6. Regenerate Affected Artifacts

Update output files:

| Artifact | Action | Location |
|----------|--------|----------|
| DR Plan | Update | `{output_folder}/resilience/disaster-recovery-plan.md` |
| Chaos Strategy | Update | `{output_folder}/resilience/chaos-engineering-strategy.md` |

## Verification

- [ ] All modifications applied
- [ ] Tenant isolation maintained
- [ ] SLA commitments still met
- [ ] Version and changelog updated
- [ ] Artifacts regenerated

## Outputs

- Updated resilience artifacts
- Modification changelog

## Next Step

Run validation mode to verify QG-DR and QG-CE1 compliance after modifications.
