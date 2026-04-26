# Step 02: Design Metering Infrastructure

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Usage event collection, meter aggregation, rate limiting, quota tracking
- 💾 Track: `stepsCompleted: [1, 2]` when complete
- 📖 Context: Maintain pricing model and tier awareness from Step 01
- 🚫 Do NOT: Design subscription management or invoicing yet
- 🔍 Use web search: Verify metering patterns against SaaS best practices

---

## Purpose

Design the metering infrastructure that captures, aggregates, and tracks usage across tenants. This forms the foundation for usage-based billing, quota enforcement, and tier limit validation.

## Prerequisites

- Step 01 complete (billing context established)
- Pricing model identified
- Usage metrics defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter: `metering-*`

## Actions

### 1. Design Usage Event Collection

Define the event capture architecture:

| Component | Purpose | Multi-Tenant Consideration |
|-----------|---------|---------------------------|
| **Event Emitter** | Capture usage at source | Tenant ID in every event |
| **Event Bus** | Transport events to aggregator | Partition by tenant for isolation |
| **Event Store** | Persist raw events | Tenant-scoped retention policies |
| **Dead Letter Queue** | Handle failed events | Tenant-aware retry logic |

**Event Schema Pattern:**
```
{
  tenant_id: string (required),
  event_type: string,
  metric_name: string,
  value: number,
  timestamp: ISO8601,
  metadata: { resource_id, user_id, ... }
}
```

**Web Research Directive:**
```
Search the web: "SaaS usage metering event-driven architecture {date}"
Search the web: "multi-tenant usage tracking patterns {date}"
```

### 2. Design Meter Aggregation by Tenant

Define aggregation strategies:

| Aggregation Type | Description | Use Case |
|------------------|-------------|----------|
| **Real-time counters** | Increment immediately | API call counts, active sessions |
| **Time-window rollups** | Aggregate by period | Hourly/daily usage summaries |
| **Running totals** | Cumulative billing period | Monthly usage for invoicing |
| **Peak tracking** | Max concurrent/peak values | Concurrent user limits |

**Aggregation Isolation:**
- Per-tenant aggregation tables/keys
- RLS policies on aggregation views (if using RLS tenant model)
- Tenant-partitioned time-series data

### 3. Design Rate Limiting Enforcement

Define rate limit architecture:

| Limit Type | Implementation | Tenant Awareness |
|------------|----------------|------------------|
| **API Rate Limits** | Token bucket / sliding window | Per-tenant quotas from tier config |
| **Concurrent Limits** | Semaphore / connection pool | Tier-based connection limits |
| **Burst Allowance** | Credit system | Tier-based burst credits |
| **Throttling Response** | 429 + Retry-After | Tenant-specific cooldown |

**Rate Limit Decision Flow:**
```
Request → Check Tenant Tier → Load Tier Limits → Check Counters → Allow/Deny
```

### 4. Design Quota Tracking and Alerts

Define quota management:

| Quota Type | Tracking Method | Alert Triggers |
|------------|-----------------|----------------|
| **Hard Limits** | Block at threshold | 100% usage |
| **Soft Limits** | Warn but allow | 80%, 90%, 100% |
| **Overage Allowed** | Track beyond limit | 100%+ with overage charges |

**Alert Configuration:**
- 80% threshold: In-app notification
- 90% threshold: Email + in-app
- 100% threshold: Admin notification + action trigger

---

## A/P/C Menu

After reviewing metering design:

| Option | Action |
|--------|--------|
| **A** | Discuss/Amend - Modify metering approach |
| **P** | Proceed - Accept design, move to subscriptions |
| **C** | Continue - Auto-proceed to next step |

**Select A, P, or C:**

---

## Verification

- [ ] Usage event collection architecture defined
- [ ] Event schema includes tenant_id
- [ ] Meter aggregation strategy documented
- [ ] Aggregation respects tenant isolation
- [ ] Rate limiting approach designed
- [ ] Rate limits are tier-aware
- [ ] Quota tracking with alerts defined
- [ ] Web research completed for metering best practices

## Outputs

- Metering infrastructure design
- Event schema specification
- Rate limiting strategy
- Quota tracking configuration

## Next Step

Proceed to `step-03-c-design.md` to design subscription management.

---

**Navigation:** Enter 'A' to amend, 'P' to proceed, or 'C' to continue
