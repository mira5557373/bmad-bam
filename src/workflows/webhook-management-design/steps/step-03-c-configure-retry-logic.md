# Step 3: Configure Retry Logic

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

Design retry logic, exponential backoff, dead letter handling, and manual retry capabilities for failed webhook deliveries.

---

## Prerequisites

- Delivery system designed (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `retry-policies`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `webhook-delivery`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Design retry and failure handling:

---

## Retry Strategy

| Aspect | Configuration |
|--------|---------------|
| Strategy | Exponential backoff with jitter |
| Initial delay | 1 second |
| Maximum delay | 1 hour |
| Backoff multiplier | 2x |
| Jitter | Random 0-30% |
| Maximum attempts | Tier-based (3/5/10) |

---

## Retry Schedule

| Attempt | Delay (Base) | Delay with Jitter Range |
|---------|--------------|-------------------------|
| 1 | Immediate | 0s |
| 2 | 1s | 1s - 1.3s |
| 3 | 2s | 2s - 2.6s |
| 4 | 4s | 4s - 5.2s |
| 5 | 8s | 8s - 10.4s |
| 6 | 16s | 16s - 20.8s |
| 7 | 32s | 32s - 41.6s |
| 8 | 1m 4s | 1m 4s - 1m 23s |
| 9 | 2m 8s | 2m 8s - 2m 46s |
| 10 | 4m 16s | 4m 16s - 5m 33s |

---

## Failure Classification

| HTTP Status | Classification | Retry Behavior |
|-------------|---------------|----------------|
| 2xx | Success | No retry needed |
| 408, 429 | Temporary | Retry with backoff |
| 500-599 | Server error | Retry with backoff |
| 400 | Bad request | No retry (log error) |
| 401, 403 | Auth failure | No retry (alert tenant) |
| 404 | Not found | No retry (disable endpoint) |
| Timeout | Connection issue | Retry with backoff |
| Network error | Connectivity | Retry with backoff |

---

## Dead Letter Queue

| Aspect | Configuration |
|--------|---------------|
| Trigger | All retry attempts exhausted |
| Retention | 7 days (configurable per tier) |
| Storage | Separate DLQ per tenant |
| Visibility | Tenant dashboard access |
| Manual retry | Available via API and dashboard |
| Notifications | Email alert to tenant admin |

---

## Dead Letter Entry Schema

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Dead letter entry ID |
| `event_id` | UUID | Original event ID |
| `webhook_id` | UUID | Target webhook configuration |
| `tenant_id` | UUID | Owning tenant |
| `payload` | JSON | Original event payload |
| `last_error` | string | Final error message |
| `last_status_code` | integer | Final HTTP status code |
| `attempt_count` | integer | Total delivery attempts |
| `first_attempt_at` | timestamp | Initial delivery attempt |
| `last_attempt_at` | timestamp | Final delivery attempt |
| `expires_at` | timestamp | DLQ retention expiry |

---

## Manual Retry Operations

| Operation | Scope | Access |
|-----------|-------|--------|
| Retry single event | One DLQ entry | Tenant admin |
| Retry by webhook | All DLQ entries for webhook | Tenant admin |
| Retry by time range | DLQ entries in range | Tenant admin |
| Bulk retry | All DLQ entries | Platform admin |

---

## Circuit Breaker

| Aspect | Configuration |
|--------|---------------|
| Failure threshold | 10 consecutive failures |
| Half-open after | 5 minutes |
| Success threshold | 3 consecutive successes to close |
| Open state behavior | Skip delivery, queue to DLQ |
| Notifications | Alert tenant when circuit opens |

**Verify current best practices with web search:**
Search the web: "webhook retry exponential backoff {date}"
Search the web: "dead letter queue patterns webhooks {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-3 complete the core webhook delivery design.**

Present summary of:
- Event catalog with categories and schemas
- Delivery architecture with guarantees
- Retry logic with dead letter handling

Ask for confirmation before proceeding to security design.

---

## COLLABORATION MENUS (A/P/C):

After completing the retry logic above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into retry strategies and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for retry review
- **C (Continue)**: Accept retry design and proceed to security design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass retry context: backoff strategy, DLQ design, circuit breaker
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into retry logic
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review retry logic: {summary of backoff, DLQ, circuit breaker}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save retry logic to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-design-security.md`

---

## Verification

- [ ] Retry strategy defined with backoff
- [ ] Failure classification complete
- [ ] Dead letter queue designed
- [ ] Manual retry operations specified
- [ ] Circuit breaker configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Retry strategy specification
- Dead letter queue design
- Circuit breaker configuration

---

## Next Step

Proceed to `step-04-c-design-security.md` to design webhook security measures.
