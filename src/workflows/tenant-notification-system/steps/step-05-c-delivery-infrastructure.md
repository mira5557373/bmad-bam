# Step 5: Delivery Infrastructure

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Design the notification delivery infrastructure including queue processing, retry policies, rate limiting, and scheduling.

---

## Prerequisites

- Step 4 completed with tenant preferences
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `event-driven`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-isolation`

---


## Inputs

- Tenant preferences from Step 4
- Channel design from Step 2
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Design the notification delivery system:

### Queue Architecture

| Queue | Purpose | Priority | Tenant Isolation |
|-------|---------|----------|------------------|
| notifications-critical | Security, MFA, password reset | Highest | Fair queuing |
| notifications-high | Transactional, billing | High | Fair queuing |
| notifications-standard | System, AI agent | Standard | Fair queuing |
| notifications-bulk | Marketing, batch | Low | Rate limited |
| notifications-scheduled | Delayed/scheduled | Deferred | Per-tenant quota |

**Queue Implementation Options:**

| Technology | Pros | Cons | Tenant Isolation |
|------------|------|------|------------------|
| Redis + BullMQ | Simple, fast | Single node limits | Queue per priority |
| AWS SQS | Managed, scalable | Cost per message | Queue per tenant tier |
| RabbitMQ | Feature-rich | Operational overhead | Virtual hosts |
| Kafka | High throughput | Complex | Partition per tenant |

**Recommended:** Redis + BullMQ for most cases, SQS for serverless architectures.

### Retry and Failure Handling

| Failure Type | Retry Strategy | Max Retries | Backoff |
|--------------|---------------|-------------|---------|
| Transient (5xx, timeout) | Exponential backoff | 5 | 1s, 2s, 4s, 8s, 16s |
| Rate limited (429) | Fixed delay | 3 | 60s |
| Invalid recipient | No retry | 0 | N/A |
| Provider down | Circuit breaker | 10 | 5m circuit open |

**Dead Letter Queue (DLQ):**
- Store failed notifications after max retries
- Alert operations team on DLQ growth
- Provide manual retry mechanism
- Tenant-scoped DLQ visibility

### Rate Limiting

| Tenant Tier | Email/hour | SMS/hour | Push/hour | Burst |
|-------------|-----------|----------|-----------|-------|
| Free | 100 | 0 | 500 | 10/min |
| Pro | 1,000 | 100 | 5,000 | 50/min |
| Enterprise | 10,000 | 1,000 | 50,000 | 500/min |
| Custom | Configurable | Configurable | Configurable | Configurable |

**Rate Limit Implementation:**
- Token bucket per tenant per channel
- Sliding window for burst control
- Graceful degradation (queue instead of reject)
- Real-time quota visibility in tenant portal

### Scheduling System

| Feature | Description | Implementation |
|---------|-------------|----------------|
| Delayed Send | Send at specific time | Scheduled job queue |
| Recurring | Periodic notifications (digests) | Cron-based scheduler |
| Timezone-aware | Send in recipient timezone | Store with target timezone |
| Batch Send | Group marketing sends | Batch processor |

**Scheduling Considerations:**
- Store scheduled notifications in database with send_at timestamp
- Background worker polls for ready notifications
- Respect tenant quiet hours
- Allow cancellation before send

### Delivery Pipeline

```
Event Trigger
    │
    ▼
┌──────────────┐
│  Notification │
│   Service     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Preference  │ → Check user/tenant preferences
│   Check      │ → Apply opt-out rules
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Template    │ → Render with variables
│   Render     │ → Apply tenant branding
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Rate Limit  │ → Check tenant quota
│   Check      │ → Queue if over limit
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Delivery    │ → Route to channel provider
│   Queue      │ → Track delivery status
└──────────────┘
```

**Verify current best practices with web search:**
Search the web: "notification delivery infrastructure patterns {date}"
Search the web: "message queue rate limiting multi-tenant {date}"
Search the web: "notification retry strategies best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the delivery infrastructure design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into queue architecture and failure handling
- **P (Party Mode)**: Bring analyst and architect perspectives for delivery review
- **C (Continue)**: Accept delivery infrastructure and proceed to tracking/analytics
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass delivery context: queues, retry policies, rate limiting
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into delivery design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review delivery infrastructure: {summary of queues and rate limiting}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save delivery infrastructure to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Proceed to next step: `step-06-c-tracking-analytics.md`

---

## Verification

- [ ] Queue architecture defined
- [ ] Retry policies documented
- [ ] Rate limiting per tenant tier
- [ ] Scheduling system designed
- [ ] Delivery pipeline documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Queue architecture specification
- Retry and failure handling policies
- Rate limiting configuration

---

## Next Step

Proceed to `step-06-c-tracking-analytics.md` to design notification tracking and analytics.
