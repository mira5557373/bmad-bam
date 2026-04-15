# Step 2: Test Resource Boundaries

## Purpose

Test resource boundaries ensuring tenant resource limits are enforced and cannot affect other tenants.

## Prerequisites

- Step 1 complete
- Resource limits configured
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-isolation`

## Actions

### 1. API Rate Limiting

| Limit Type | Tenant Tier | Limit | Test | Result | Status |
|------------|-------------|-------|------|--------|--------|
| Requests/min | Free | 60 | Exceed limit | Throttled | |
| Requests/min | Pro | 300 | Exceed limit | Throttled | |
| Requests/min | Enterprise | Custom | Exceed limit | Throttled | |
| Concurrent | All | Per-tier | Burst test | Limited | |

### 2. AI Token Limits

| Resource | Tier | Limit | Test | Result | Status |
|----------|------|-------|------|--------|--------|
| Tokens/request | Free | 4K | Exceed | Truncated | |
| Tokens/day | Free | 100K | Exceed | Blocked | |
| Tokens/request | Pro | 16K | Exceed | Truncated | |
| Tokens/day | Pro | 1M | Exceed | Blocked | |

### 3. Compute Resource Limits

| Resource | Isolation | Limit Enforcement | Test | Status |
|----------|-----------|-------------------|------|--------|
| CPU | Containerized | Cgroups | Spike test | |
| Memory | Containerized | Cgroups | OOM test | |
| Storage | Quota | Per-tenant quota | Fill test | |
| Network | Bandwidth | Rate limiting | Flood test | |

### 4. Noisy Neighbor Prevention

| Scenario | Protection | Test Method | Result | Status |
|----------|------------|-------------|--------|--------|
| CPU hog | Fair scheduling | High CPU tenant | Others unaffected | |
| Memory hog | OOM isolation | Memory leak | Others unaffected | |
| I/O intensive | I/O limits | High I/O tenant | Others unaffected | |
| Network flood | Rate limiting | Traffic spike | Others unaffected | |

### 5. Budget Enforcement

| Budget Type | Enforcement | Test | Result | Status |
|-------------|-------------|------|--------|--------|
| Daily spend | Real-time | Exceed budget | Blocked | |
| Monthly spend | Real-time | Approach limit | Warning | |
| Per-request | Pre-check | Expensive request | Denied | |

**Verify resource boundary testing with web search:**
Search the web: "noisy neighbor prevention testing {date}"
Search the web: "tenant resource limit verification {date}"

## Verification

- [ ] API rate limits enforced
- [ ] AI token limits enforced
- [ ] Compute limits enforced
- [ ] Noisy neighbor prevented
- [ ] Budgets enforced

## Outputs

- Resource boundary test results

## Next Step

Proceed to `step-03-c-verify-ai-context.md`
