# Step 4: Configure Webhooks

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

Design the webhook integration for payment event processing and synchronization.

---

## Prerequisites

- Transaction processing designed (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: event-driven
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: payment-processing

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Event Subscription Configuration

| Event Type | Priority | Action |
|------------|----------|--------|
| payment_intent.succeeded | Critical | Mark invoice paid |
| payment_intent.payment_failed | Critical | Trigger dunning |
| invoice.paid | High | Update subscription |
| customer.subscription.updated | High | Sync subscription state |
| charge.dispute.created | Critical | Alert + freeze |
| customer.source.expiring | Medium | Notify customer |

### 2. Webhook Security

| Security Layer | Implementation |
|----------------|----------------|
| Signature verification | Stripe webhook secret |
| IP allowlist | Stripe IP ranges |
| HTTPS only | TLS 1.2+ required |
| Replay protection | Event ID deduplication |

### 3. Event Processing Architecture

| Component | Purpose | Configuration |
|-----------|---------|---------------|
| Endpoint | Receive webhooks | /webhooks/stripe |
| Queue | Buffer events | Redis/SQS |
| Processor | Handle events | Worker pool |
| DLQ | Failed events | Manual review |

### 4. Failure Handling

| Failure Type | Response | Retry |
|--------------|----------|-------|
| Signature invalid | 401 | No |
| Processing error | 500 | Yes (Stripe retries) |
| Duplicate event | 200 | No |
| Unknown event | 200 | No |

### 5. Event Deduplication

| Strategy | Implementation |
|----------|----------------|
| Event ID tracking | Store processed event IDs |
| Idempotent handlers | Same result on replay |
| TTL cleanup | Remove IDs after 7 days |

### 6. Monitoring and Alerting

| Metric | Threshold | Alert |
|--------|-----------|-------|
| Processing latency | >5s | Warning |
| Failure rate | >1% | Critical |
| DLQ depth | >100 | Critical |
| Event backlog | >1000 | Warning |

**Verify current best practices with web search:**
Search the web: "Stripe webhook best practices {date}"
Search the web: "payment webhook security patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the webhook configuration above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into webhook architecture using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for webhook analysis
- **C (Continue)**: Accept webhook configuration and proceed to Edit/Validate modes
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass webhook context: events, security, processing
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into webhook summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review webhook integration for payment processing: {summary of events and security}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save webhook configuration to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Create mode complete

---

## Soft Gate Checkpoint

**Steps 1-4 complete the payment processing design.**

Present summary of:
- Gateway selection and payment methods
- Transaction processing flows
- Webhook integration architecture

Ask for confirmation before proceeding to Edit or Validate modes.

---

## Verification

- [ ] Event subscriptions cover all critical events
- [ ] Webhook security with signature verification
- [ ] Event processing architecture handles scale
- [ ] Failure handling prevents data loss
- [ ] Event deduplication prevents duplicate processing
- [ ] Monitoring and alerting configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Webhook integration specification
- Event processing architecture
- Security configuration
- **Load template:** `{project-root}/_bmad/bam/data/templates/payment-processing-template.md`

---

## Next Step

Create mode complete. Proceed to Edit mode (`step-10-e-load-existing.md`) for modifications or Validate mode (`step-20-v-load-artifact.md`) for quality checks.
