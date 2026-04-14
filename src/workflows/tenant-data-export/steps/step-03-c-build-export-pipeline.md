# Step 3: Build Export Pipeline

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
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Design the export pipeline from request initiation through delivery notification.

---

## Prerequisites

- Export formats designed (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `event-driven`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Design the export pipeline:

---

## Request Initiation

| Channel | Initiator | Authorization |
|---------|-----------|---------------|
| UI Portal | Tenant Admin | MFA required |
| API | API Key | Scope: `data:export` |
| Support | Platform Admin | Ticket reference |

Request payload:
```yaml
export_request:
  tenant_id: required
  requested_by: required
  categories: ["user", "content", "configuration", "activity"]
  encryption:
    enabled: boolean
    password_hint: optional
  delivery:
    method: "download" | "email" | "webhook"
    email: optional
    webhook_url: optional
```

---

## Pipeline Stages

| Stage | Description | Duration | Retries |
|-------|-------------|----------|---------|
| 1. Validate | Verify request and authorization | < 1s | N/A |
| 2. Queue | Add to export job queue | < 1s | N/A |
| 3. Collect User Data | Extract user tables | 5-30s | 3 |
| 4. Collect Content | Extract conversations, files | 30s-5m | 3 |
| 5. Collect Config | Extract settings | 5-30s | 3 |
| 6. Collect Activity | Generate CSVs from logs | 30s-2m | 3 |
| 7. Package | Create ZIP with manifest | 10s-1m | 2 |
| 8. Encrypt | Apply encryption if requested | 5-30s | 2 |
| 9. Upload | Store in secure temp location | 10s-1m | 3 |
| 10. Notify | Send download notification | < 5s | 5 |

---

## Queue Processing

Use message queue for background processing:

| Aspect | Configuration |
|--------|---------------|
| Queue | SQS/RabbitMQ dedicated queue |
| Visibility Timeout | 30 minutes |
| Dead Letter Queue | After 3 failures |
| Priority | Normal (not urgent) |
| Concurrency | 2 per tenant (prevent resource abuse) |

---

## Data Collection Strategy

For each data source:

| Source | Collection Method | Batch Size |
|--------|-------------------|------------|
| PostgreSQL | Cursor-based pagination | 1000 rows |
| S3/Storage | Streaming download | 10 files parallel |
| Vector Store | Metadata only (no vectors) | 10000 records |
| Redis | Skip (transient data) | N/A |

---

## Delivery Options

| Method | Implementation | Expiry |
|--------|----------------|--------|
| Download | Pre-signed S3 URL | 7 days |
| Email | Secure link in email | 7 days |
| Webhook | POST to tenant URL | Immediate |

Download link characteristics:
- Single-use or multi-use (configurable)
- IP restriction optional
- Download count tracked

---

## Error Handling

| Error Type | Handling | User Communication |
|------------|----------|-------------------|
| Data source unavailable | Retry with backoff | Include partial data, note gaps |
| Encryption failure | Fail entire export | Request retry |
| Storage full | Pause, alert ops | Delay notification |
| Timeout | Checkpoint and resume | Progress update |

**Verify current best practices with web search:**
Search the web: "data export pipeline tenant lifecycle {date}"
Search the web: "bulk export architecture multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the export pipeline design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into pipeline edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for pipeline review
- **C (Continue)**: Accept pipeline and proceed to audit trail
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass pipeline context: stages, queue, collection, delivery
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into export pipeline
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review export pipeline: {summary of stages and delivery}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save export pipeline to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-implement-audit-trail.md`

---

## Verification

- [ ] Request initiation defined
- [ ] Pipeline stages documented
- [ ] Queue processing configured
- [ ] Data collection strategy specified
- [ ] Delivery options defined
- [ ] Error handling complete
- [ ] Patterns align with pattern registry

---

## Outputs

- Export pipeline architecture
- Stage definitions with SLAs

---

## Next Step

Proceed to `step-04-c-implement-audit-trail.md` to implement audit trail.
