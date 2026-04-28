# Step 21: Run Validation Checks

## Purpose

Execute QG-DR and QG-CE1 quality gate checks against resilience artifacts, identifying any gaps or compliance issues.

## Prerequisites

- Artifacts and checklists loaded (Step 20 complete)
- Validation scope determined

## Execution Protocols

```
📋 Execute each checklist item systematically
🎯 Document pass/fail for each check
⚠️ Flag critical failures immediately
```

## Actions

### 1. Execute QG-DR Checks (if in scope)

Validate disaster recovery requirements:

| Category | Check | Pass/Fail | Notes |
|----------|-------|-----------|-------|
| **RTO/RPO** | Targets defined per tier | | |
| | Targets align with SLAs | | |
| | Data categories mapped | | |
| **Failover** | Procedures documented | | |
| | Tenant isolation maintained | | |
| | Rollback procedures exist | | |
| **Testing** | DR test schedule defined | | |
| | Test procedures documented | | |
| **Communication** | Notification templates exist | | |
| | Escalation paths defined | | |

### 2. Execute QG-CE1 Checks (if in scope)

Validate chaos engineering requirements:

| Category | Check | Pass/Fail | Notes |
|----------|-------|-----------|-------|
| **Blast Radius** | Safety boundaries defined | | |
| | Environment tiers established | | |
| | Abort criteria documented | | |
| **Tenant Safety** | Opt-out mechanism exists | | |
| | Tier exclusions enforced | | |
| | Isolation verification planned | | |
| **Experiments** | Categories defined | | |
| | Hypotheses documented | | |
| | Steady-state metrics identified | | |
| | Runbooks created | | |
| **Approval** | Workflow documented | | |
| | Progression plan exists | | |

### 3. Cross-Validation Checks

Validate consistency across artifacts:

| Check | Pass/Fail | Notes |
|-------|-----------|-------|
| RTO/RPO consistent with master architecture | | |
| Tenant isolation consistent across DR and Chaos | | |
| Recovery priorities align with criticality | | |
| Chaos experiments respect DR constraints | | |

### 4. Critical Failure Identification

Flag any critical failures:

| Critical Check | Status | Remediation Required |
|----------------|--------|---------------------|
| Tenant isolation maintained | | |
| SLA commitments achievable | | |
| Blast radius controls enforced | | |
| Abort criteria defined | | |

### 5. Calculate Gate Scores

Summarize validation results:

| Gate | Total Checks | Passed | Failed | Score |
|------|--------------|--------|--------|-------|
| QG-DR | X | Y | Z | Y/X |
| QG-CE1 | X | Y | Z | Y/X |

## Verification

- [ ] All QG-DR checks executed (if in scope)
- [ ] All QG-CE1 checks executed (if in scope)
- [ ] Cross-validation completed
- [ ] Critical failures identified
- [ ] Gate scores calculated

## Outputs

- Validation check results
- Critical failure list
- Gate scores

## Next Step

Proceed to `step-22-v-report.md` to generate validation report.
