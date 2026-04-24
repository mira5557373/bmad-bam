# Step 4: Configure Thresholds

> **MANDATORY EXECUTION RULES:**
> 1. Read this ENTIRE file before acting
> 2. Follow steps in EXACT order
> 3. Use web search when directed
> 4. DO NOT skip verification

## Purpose

Configure pass/fail thresholds for each PRG check.

## Prerequisites

- Step 3 completed (automation design)

## Actions

### 1. Define Pass Criteria

| Check | Pass Criteria | Conditional Criteria |
|-------|--------------|---------------------|
| 1. Tenant isolation | 100% tests pass | N/A (critical) |
| 2. Action contracts | 100% valid | N/A (critical) |
| 3. Rollback | Recovery < 5min | Recovery < 15min |
| 4. Audit trail | 100% coverage | N/A (critical) |
| 5. Resource budgets | All configured | 90% configured |
| 6. Confidence | Reviewed + approved | N/A (critical) |
| 7. Loop bindings | All valid | 95% valid |
| 8. Observability | All metrics exist | 80% metrics |
| 9. Chaos test | No data loss | Graceful degradation |
| 10. Human sign-off | Approved | N/A (critical) |

### 2. Configure Timeout Values

**Verify current best practices with web search:**
Search the web: "deployment gate timeout best practices {date}"

| Check | Timeout | Retry Policy |
|-------|---------|--------------|
| Automated | 5 minutes | 2 retries |
| Semi-auto | 30 minutes | 1 retry |
| Manual | 4 hours | Escalate |

### 3. Define Escalation Rules

| Condition | Action | Escalate To |
|-----------|--------|-------------|
| Critical fail | Block + alert | Release manager |
| Timeout | Retry once | On-call SRE |
| Manual SLA breach | Escalate | Engineering lead |

## Verification

- [ ] Pass criteria defined for all checks
- [ ] Conditional criteria documented
- [ ] Timeouts configured
- [ ] Escalation rules set

## Outputs

- Threshold configuration
- Timeout settings
- Escalation matrix

## Next Step

Proceed to `step-05-c-generate-prg-spec.md` to finalize specification.
