# Step 2: Design Metering Events

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

Define the metering event structure and collection strategy for usage-based billing.

---

## Prerequisites

- Billable resources identified (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: usage-metering`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: event-driven`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Metering Event Schema

Using patterns from knowledge, define the event structure:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| event_id | string | Yes | Unique event identifier |
| event_type | string | Yes | Event classification |
| timestamp | ISO8601 | Yes | When event occurred |
| tenant_id | string | Yes | Tenant attribution |
| resource.type | string | Yes | Type of resource consumed |
| resource.quantity | number | Yes | Amount consumed |
| resource.unit | string | Yes | Unit of measurement |
| context | object | No | Additional context (agent_id, user_id, etc.) |
| idempotency_key | string | Yes | Deduplication key |

### 2. Categorize Event Types

**Instant Events (Real-time):**
- API request completed
- Agent invocation completed
- Tool execution completed
- Webhook delivered
- LLM call completed
- Embedding generated

**Periodic Events (Sampled):**
- Storage usage snapshot (hourly)
- Active connections count (5-minute intervals)
- Cache usage snapshot (hourly)
- Vector count snapshot (daily)

### 3. Design Event Collection Pipeline

Reference pipeline pattern from `event-driven-patterns.md`:
- Application code emits events
- Event queue (Redis/Kafka) for buffering
- Event processor for validation and enrichment
- Usage aggregation store (ClickHouse)
- Billing system integration

### 4. Define Event Emission Patterns

Reference patterns from knowledge for:
- Synchronous emission for billing-critical events
- Asynchronous batching for high-volume events
- Dead letter queue for failed emissions
- Retry strategies and error handling

### 5. Configure Idempotency Handling

| Setting | Value |
|---------|-------|
| Key format | `{tenant_id}:{request_id}:{resource_type}:{subtype}` |
| Deduplication window | 24 hours |
| Storage | Redis SET with TTL |
| On duplicate | Skip and log |

### 6. Define Validation Rules

| Rule | Specification |
|------|---------------|
| Required fields | event_id, event_type, timestamp, tenant_id, resource.* |
| Quantity bounds | Per resource type (from knowledge) |
| Timestamp drift | Max 5 min future, 24 hours past |

### 7. Configure Event Enrichment

Events should be enriched with:
- Billing period (derived from timestamp)
- Tenant tier at time of event
- Current pricing version

**Verify current best practices with web search:**
Search the web: "design metering events best practices {date}"
Search the web: "design metering events enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the metering event design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into event schema design using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for event pipeline analysis
- **C (Continue)**: Accept event design and proceed to aggregation configuration
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass event context: schema defined, pipeline architecture
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into event design summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review metering event design for usage metering: {summary of event schema and pipeline}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save event design summary to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-configure-aggregation.md`

---

## Soft Gate Checkpoint

**Steps 1-2 complete the metering foundation design.**

Present summary of:
- Billable resource catalog from Step 1
- Metering event schema and type classifications
- Event collection pipeline architecture

Ask for confirmation before proceeding to aggregation configuration.

---

## Verification

- [ ] Event schema follows pattern registry
- [ ] All event types categorized (instant vs periodic)
- [ ] Collection pipeline architecture defined
- [ ] Idempotency strategy specified
- [ ] Validation rules documented
- [ ] Enrichment requirements defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Metering event schema document
- Event type catalog
- Collection pipeline diagram
- **Load template:** `{project-root}/_bmad/bam/data/templates/metering-event-spec.md`

---

## Next Step

Proceed to `step-03-c-configure-aggregation.md` to design usage aggregation.
