# Step 10: Load Existing Artifacts

## Purpose

Load existing resilience artifacts for modification, preserving prior decisions while enabling targeted updates.

## Prerequisites

- Existing resilience artifacts present:
  - `{output_folder}/resilience/disaster-recovery-plan.md` (if DR)
  - `{output_folder}/resilience/chaos-engineering-strategy.md` (if Chaos)
- Modification requirements identified

## Execution Protocols

```
📋 Load existing artifacts without modification
🔍 Identify sections requiring updates
🎯 Preserve tenant-aware design decisions
```

## Actions

### 1. Load Existing Artifacts

Read current resilience documentation:

| Artifact | Location | Status |
|----------|----------|--------|
| DR Plan | `{output_folder}/resilience/disaster-recovery-plan.md` | Load if exists |
| Chaos Strategy | `{output_folder}/resilience/chaos-engineering-strategy.md` | Load if exists |
| Validation Report | `{output_folder}/resilience/resilience-validation-report.md` | Load if exists |

### 2. Analyze Modification Scope

Identify what needs to change:

| Section | Current State | Requested Change | Impact |
|---------|---------------|------------------|--------|
| RTO/RPO targets | Document current | Identify delta | Low/Medium/High |
| Failover procedures | Document current | Identify delta | Low/Medium/High |
| Blast radius controls | Document current | Identify delta | Low/Medium/High |
| Chaos experiments | Document current | Identify delta | Low/Medium/High |

### 3. Validate Change Compatibility

Ensure changes don't break existing guarantees:

| Guarantee | Current | After Change | Compatible |
|-----------|---------|--------------|------------|
| Tenant isolation | Yes | Must remain | Check |
| RTO commitments | X hours | New target | Check |
| RPO commitments | X hours | New target | Check |
| Blast radius | X% | New limit | Check |

### 4. Document Edit Context

Record modification context for traceability:

- Reason for modification
- Requested by (stakeholder)
- Impact assessment
- Rollback considerations

## Verification

- [ ] All relevant artifacts loaded
- [ ] Modification scope identified
- [ ] Compatibility validated
- [ ] Edit context documented

## Outputs

- Loaded artifact content
- Modification scope document
- Compatibility assessment

## Next Step

Proceed to `step-11-e-apply.md` to apply modifications.
