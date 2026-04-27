# Background Jobs Patterns

**When to load:** When designing async processing, scheduled tasks, or when user mentions background workers, job queues, or async job processing.

**Integrates with:** Architect (Atlas persona), Dev agent, DevOps agent

---

## Core Concepts

### What are Tenant-Aware Background Jobs?

Background jobs enable asynchronous processing of long-running tasks, scheduled work, and event-driven operations in a multi-tenant SaaS context. Tenant context must be preserved and isolated throughout job execution.

### Job Type Comparison

| Type | Trigger | Use Case | Tenant Consideration |
|------|---------|----------|---------------------|
| Queue-based | Event/request | Async processing | Per-tenant queues |
| Scheduled | Cron/timer | Recurring tasks | Tenant schedule isolation |
| Event-triggered | Domain events | Reactive processing | Event tenant context |
| Batch | Bulk data | Data processing | Tenant data partitioning |

---

## Key Patterns

### Pattern 1: Queue-Based Jobs

Process jobs from tenant-aware queues.

| Component | Purpose | Tenant Consideration |
|-----------|---------|---------------------|
| Job Producer | Enqueue jobs | Include tenant_id |
| Job Queue | Store pending jobs | Tenant-partitioned |
| Job Consumer | Process jobs | Restore tenant context |
| Job Result | Store outcomes | Tenant-scoped storage |

### Queue Architecture

```
┌─────────────────────────────────────────┐
│            Job Queue System              │
│  ┌─────────────┐    ┌────────────────┐  │
│  │  Producer   │───>│  Job Queue     │  │
│  │  (tenant A) │    │  ┌──────────┐  │  │
│  └─────────────┘    │  │ Job      │  │  │
│                     │  │ tenant_id│  │  │
│  ┌─────────────┐    │  │ payload  │  │  │
│  │  Consumer   │<───│  └──────────┘  │  │
│  │  (restore)  │    └────────────────┘  │
│  └─────────────┘                        │
└─────────────────────────────────────────┘
```

### Pattern 2: Scheduled Jobs

Execute jobs on a schedule with tenant isolation.

| Component | Purpose | Tenant Consideration |
|-----------|---------|---------------------|
| Scheduler | Trigger jobs | Tenant schedule registry |
| Schedule Definition | Cron expressions | Per-tenant schedules |
| Job Execution | Run scheduled work | Tenant context injection |
| Skip Logic | Handle overlaps | Per-tenant skip rules |

### Schedule Management

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Global Schedule | Same time for all tenants | System maintenance |
| Tenant Schedule | Per-tenant timing | Tenant preferences |
| Timezone-aware | Respect tenant timezone | User-facing schedules |
| Staggered | Distribute load | Resource management |

### Pattern 3: Priority Queues

Differentiate job priority by tenant tier.

| Priority | Tier | Processing Order |
|----------|------|------------------|
| Critical | Enterprise | Immediate |
| High | Pro | Next available |
| Normal | Pro/Free | FIFO |
| Low | Free | When capacity available |

### Priority Architecture

```
                 Job Router
                     │
        ┌────────────┼────────────┐
        v            v            v
   ┌─────────┐  ┌─────────┐  ┌─────────┐
   │Critical │  │  High   │  │ Normal  │
   │ Queue   │  │ Queue   │  │ Queue   │
   └────┬────┘  └────┬────┘  └────┬────┘
        │            │            │
        └────────────┴────────────┘
                     │
                 Workers
```

### Pattern 4: Dead Letter Handling

Manage failed jobs with tenant context.

| Component | Purpose | Tenant Consideration |
|-----------|---------|---------------------|
| Retry Logic | Automatic retries | Per-tenant retry limits |
| Dead Letter Queue | Failed jobs | Tenant-partitioned DLQ |
| Alert System | Notify failures | Tenant notification |
| Manual Review | Human intervention | Tenant admin access |

---

## Application Guidelines

When implementing background jobs:

1. **Always include tenant_id** - In job payload and metadata
2. **Restore context** - Set tenant context before processing
3. **Implement retries** - With exponential backoff
4. **Handle failures** - Dead letter queues for debugging
5. **Monitor jobs** - Per-tenant job metrics

---

## Per-Tier Job Limits

| Tier | Concurrent Jobs | Queue Size | Priority | Retention |
|------|-----------------|------------|----------|-----------|
| Free | 2 | 100 | Normal | 24 hours |
| Pro | 10 | 1000 | High | 7 days |
| Enterprise | 50 | 10000 | Critical | 30 days |

---

## Job Payload Structure

| Field | Required | Description |
|-------|----------|-------------|
| job_id | Yes | Unique identifier |
| tenant_id | Yes | Tenant context |
| job_type | Yes | Job classification |
| payload | Yes | Job-specific data |
| priority | No | Execution priority |
| scheduled_at | No | Delayed execution |
| retry_count | Auto | Current retry attempt |
| correlation_id | No | Request tracing |

---

## Retry Strategies

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Immediate | Retry right away | Transient failures |
| Linear Backoff | Fixed delay increase | Moderate failures |
| Exponential Backoff | Doubling delay | Service recovery |
| With Jitter | Random variation | Avoid thundering herd |

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Missing tenant_id | Jobs process wrong tenant | Always include in payload |
| No retry limits | Infinite retry loops | Set max retry count |
| Shared queues | Priority conflicts | Tenant-aware queues |
| No monitoring | Silent failures | Job metrics and alerts |
| Missing idempotency | Duplicate processing | Idempotency keys |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Queue per tenant or shared? | Shared with tenant partition key | Simpler ops while maintaining isolation |
| How to handle long jobs? | Heartbeat and checkpoint | Prevents timeout and enables recovery |
| Priority queue strategy? | Separate queues per priority level | Clear SLA guarantees |
| Retry policy? | Exponential backoff with jitter | Prevents thundering herd |

---

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Configure job tenant context
- `bmad-bam-tenant-aware-observability` - Monitor job execution
- `bmad-bam-convergence-verification` - Verify job tenant isolation

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Background jobs:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `background-jobs`
- **Event-driven:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `event-driven`
- **Tenant routing:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-routing`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "tenant-aware background jobs {date}"
- Search: "async job processing multi-tenant {date}"
- Search: "job queue tenant isolation {date}"
