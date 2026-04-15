# Step 3: Quota Enforcement

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Design per-tenant quota enforcement mechanisms to ensure resource limits are respected and violations are handled appropriately.

---

## Prerequisites

- Scheduling strategy completed (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `rate-limiting`
- **Load guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/tenant-isolation.md`

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Quota Types

Establish quota categories for enforcement:

| Quota Type | Scope | Enforcement Point | Reset Period |
|------------|-------|-------------------|--------------|
| Hard Quota | Tenant | Resource manager | N/A (absolute limit) |
| Soft Quota | Tenant | Monitoring layer | Monthly/billing cycle |
| Burst Quota | Request | API gateway | Per-minute/hourly |
| Reserved Quota | Tenant | Scheduler | N/A (guaranteed) |
| Shared Quota | Pool | Load balancer | Real-time |

### 2. Configure Quota Limits per Tier

Define quota limits for each tenant tier:

| Resource | Free | Starter | Pro | Enterprise |
|----------|------|---------|-----|------------|
| vCPU cores | 0.5 | 2 | 8 | 32+ |
| Memory (GB) | 1 | 4 | 16 | 64+ |
| Storage (GB) | 5 | 50 | 200 | 1000+ |
| API calls/month | 10K | 100K | 1M | Unlimited |
| Concurrent requests | 10 | 50 | 200 | 1000+ |
| Webhook endpoints | 1 | 5 | 20 | Unlimited |
| Agent executions/day | 100 | 1000 | 10K | Unlimited |

### 3. Design Enforcement Actions

Define actions when quotas are exceeded:

| Violation Level | Action | Notification | Recovery |
|-----------------|--------|--------------|----------|
| Warning (80%) | Log, notify | Email + in-app | N/A |
| Soft Limit (100%) | Throttle, notify | Email + SMS | Credit purchase |
| Hard Limit (110%) | Block, notify | Email + call | Upgrade tier |
| Abuse (>150%) | Suspend, investigate | Admin alert | Manual review |

### 4. Implement Quota Tracking

Design quota tracking and accounting:

| Tracking Method | Granularity | Latency | Storage |
|-----------------|-------------|---------|---------|
| Real-time counters | Per-request | < 10ms | Redis |
| Aggregated metrics | Per-minute | < 1s | TimescaleDB |
| Usage reports | Hourly/daily | Minutes | PostgreSQL |
| Billing records | Monthly | Hours | Data warehouse |

### 5. Design Quota Management API

Define API for quota management:

| Operation | Endpoint | Access | Description |
|-----------|----------|--------|-------------|
| Get Quota | GET /tenants/{id}/quotas | Tenant | View current quotas |
| Get Usage | GET /tenants/{id}/usage | Tenant | View current usage |
| Request Increase | POST /tenants/{id}/quota-requests | Tenant | Request quota increase |
| Set Quota | PUT /tenants/{id}/quotas | Admin | Modify tenant quotas |
| Reset Usage | POST /tenants/{id}/usage/reset | Admin | Reset usage counters |

### 6. Define Quota Inheritance

For hierarchical tenant structures:

| Level | Quota Source | Override Allowed | Pooling |
|-------|--------------|------------------|---------|
| Organization | Subscription tier | Yes (higher only) | Yes |
| Department | Org allocation | Yes (within org limit) | Optional |
| Project | Dept allocation | No | No |
| User | Project allocation | No | No |

**Verify current best practices with web search:**
Search the web: "per-tenant quota enforcement multi-tenant SaaS {date}"
Search the web: "resource quota management Kubernetes {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Step 3 completes the quota enforcement design.**

Present summary of:
- Quota types defined
- Limits per tier
- Enforcement actions
- Tracking mechanisms
- Management API

Ask for confirmation before proceeding to isolation mechanisms.

---

## COLLABORATION MENUS (A/P/C):

After completing the quota enforcement above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into quota enforcement edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for quota review
- **C (Continue)**: Accept quota design and proceed to isolation mechanisms
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass quota context: types, limits, enforcement actions
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into quota design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review quota enforcement: {summary of limits and actions}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save quota enforcement to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-isolation-mechanisms.md`

---

## Verification

- [ ] Quota types defined
- [ ] Limits configured per tier
- [ ] Enforcement actions specified
- [ ] Tracking mechanisms designed
- [ ] Management API documented
- [ ] Quota inheritance rules defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Quota type definitions
- Tier-based quota limits
- Enforcement action matrix
- Tracking architecture
- Quota management API specification

---

## Next Step

Proceed to `step-04-c-isolation-mechanisms.md` to configure cgroups, namespaces, and resource limits.
