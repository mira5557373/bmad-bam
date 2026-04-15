# Step 2: Test Budget Enforcement

## Purpose

Validate that token budgets, cost limits, and execution quotas are properly enforced per tenant.

## Prerequisites

- Step 1 complete
- Run contracts defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `run-contracts`

## Actions

### 1. Verify Token Budget Limits

Test budget enforcement per tier:

| Tier | Token Limit | Test Approach | Expected Behavior |
|------|-------------|---------------|-------------------|
| Free | Per run contract | Exceed limit | Graceful termination |
| Pro | Per run contract | Exceed limit | Warning + soft limit |
| Enterprise | Per run contract | Exceed limit | Alert + continue |

### 2. Verify Cost Limits

Test cost enforcement:

| Limit Type | Configuration | Test | Expected |
|------------|---------------|------|----------|
| Per-request | Max cost/request | Exceed | Request blocked |
| Per-session | Max cost/session | Exceed | Session limited |
| Per-day | Daily budget | Exceed | Throttle/block |

### 3. Verify Execution Quotas

Test quota enforcement:

| Quota | Scope | Test | Expected |
|-------|-------|------|----------|
| Max tool calls | Per run | Exceed | Run terminated |
| Max duration | Per run | Exceed | Timeout triggered |
| Max concurrent | Per tenant | Exceed | Queue/reject |

### 4. Test Overage Handling

| Scenario | Tier | Expected Behavior |
|----------|------|-------------------|
| Budget exhausted | Free | Block with message |
| Budget exhausted | Pro | Allow overage at 1.2x rate |
| Budget exhausted | Enterprise | Alert, continue |

**Verify current best practices with web search:**
Search the web: "test budget enforcement best practices {date}"
Search the web: "test budget enforcement multi-tenant SaaS {date}"

## Verification

- [ ] Token limits enforced per tier
- [ ] Cost limits enforced per tier
- [ ] Execution quotas enforced
- [ ] Overage handling correct per tier

## Outputs

- Budget enforcement test results

## Next Step

Proceed to `step-03-c-validate-kill-switch.md`
