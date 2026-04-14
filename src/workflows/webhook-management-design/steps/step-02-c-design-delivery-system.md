# Step 2: Design Delivery System

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

Design the webhook delivery infrastructure including queue-based delivery, tenant endpoint management, and delivery tracking.

---

## Prerequisites

- Event catalog defined (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `webhook-delivery`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `event-driven`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Design the webhook delivery system:

---

## Delivery Architecture

| Component | Purpose | Technology Options |
|-----------|---------|-------------------|
| Event Publisher | Emit events from source services | Domain events, Change Data Capture |
| Message Queue | Buffer events for reliable delivery | Redis Streams, RabbitMQ, SQS |
| Delivery Worker | Process queue and deliver webhooks | Background jobs, Lambda functions |
| Endpoint Registry | Store tenant webhook configurations | PostgreSQL, Redis |
| Delivery Log | Track delivery attempts and status | Time-series DB, PostgreSQL |

---

## Tenant Webhook Configuration

Per-tenant webhook configuration model:

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Webhook configuration ID |
| `tenant_id` | UUID | Owning tenant |
| `url` | string | Delivery endpoint URL |
| `events` | array | Subscribed event types |
| `secret` | encrypted | HMAC signing secret |
| `enabled` | boolean | Active status |
| `headers` | object | Custom headers to include |
| `created_at` | timestamp | Configuration creation time |
| `updated_at` | timestamp | Last modification time |

---

## Delivery Flow

| Step | Action | Failure Handling |
|------|--------|------------------|
| 1 | Event emitted to message queue | Queue persistence ensures durability |
| 2 | Worker dequeues event | At-least-once semantics |
| 3 | Lookup tenant webhook configs | Skip if no active webhooks |
| 4 | Sign payload with HMAC | Use tenant-specific secret |
| 5 | HTTP POST to endpoint | Timeout: 30 seconds |
| 6 | Record delivery attempt | Log success/failure with details |
| 7 | Handle response | 2xx = success, else retry |

---

## Delivery Guarantees

| Guarantee | Implementation |
|-----------|----------------|
| At-least-once delivery | Queue acknowledgment after successful delivery |
| Ordering | Events ordered by timestamp within tenant scope |
| Durability | Persistent queue, delivery log retained |
| Tenant isolation | Separate delivery queues per tenant (optional for enterprise) |

---

## Endpoint Health Tracking

| Metric | Tracking | Action |
|--------|----------|--------|
| Success rate | Rolling 24-hour window | Disable if < 10% success |
| Average latency | Per-endpoint | Alert if > 10s average |
| Consecutive failures | Counter | Auto-disable after 100 failures |
| Error codes | Distribution | Alert on 4xx patterns |

---

## Batching Options

| Mode | Use Case | Configuration |
|------|----------|---------------|
| Immediate | Real-time requirements | Default, one event per request |
| Batched | High-volume events | Max 100 events, 5-second window |
| Aggregated | Summary events | Hourly digest, configurable |

---

## Tier-Based Configuration

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Max webhooks | 3 | 10 | Unlimited |
| Events per day | 1,000 | 100,000 | Unlimited |
| Retry attempts | 3 | 5 | 10 |
| Dedicated queue | No | No | Yes |
| Custom headers | No | Yes | Yes |
| IP allowlisting | No | No | Yes |

**Verify current best practices with web search:**
Search the web: "webhook delivery architecture patterns {date}"
Search the web: "reliable webhook delivery queue design {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the delivery system design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into delivery architecture and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for delivery review
- **C (Continue)**: Accept delivery design and proceed to retry logic
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass delivery context: architecture, flow, guarantees
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into delivery design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review delivery system: {summary of architecture and guarantees}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save delivery system design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-configure-retry-logic.md`

---

## Verification

- [ ] Delivery architecture defined
- [ ] Tenant configuration model complete
- [ ] Delivery flow documented
- [ ] Guarantees specified
- [ ] Tier-based limits defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Delivery system architecture
- Tenant webhook configuration model
- Tier-based feature matrix

---

## Next Step

Proceed to `step-03-c-configure-retry-logic.md` to design retry and failure handling.
