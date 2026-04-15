# Step 3: Design Invoice Scheduling

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

Design the automated invoice generation scheduling system including billing cycles, retry logic, and manual triggers.

---

## Prerequisites

- Usage aggregation configured (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: billing-integration
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: saga-orchestration

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Billing Cycle Configurations

| Cycle Type | Anchor | Description |
|------------|--------|-------------|
| Monthly | 1st of month | Standard monthly billing |
| Quarterly | 1st of quarter | Quarterly billing for annual contracts |
| Annual | Contract anniversary | Annual prepaid billing |
| Usage-based | End of period | Pure consumption billing |

### 2. Configure Generation Schedule

| Phase | Timing | Actions |
|-------|--------|---------|
| Period close | Day 1, 00:00 UTC | Lock billing period |
| Aggregation | Day 1, 01:00 UTC | Finalize usage totals |
| Draft generation | Day 1, 02:00 UTC | Create draft invoices |
| Review window | Day 1-3 | Manual review period |
| Finalization | Day 4, 00:00 UTC | Finalize and deliver |

### 3. Design Retry Logic

| Failure Type | Retry Strategy | Max Attempts |
|--------------|----------------|--------------|
| Usage aggregation | Exponential backoff | 5 |
| PDF generation | Immediate retry | 3 |
| Delivery failure | Delayed retry (1h, 4h, 24h) | 3 |
| Payment failure | Daily retry for 7 days | 7 |

### 4. Configure Manual Triggers

| Trigger | Authorization | Use Case |
|---------|---------------|----------|
| Regenerate draft | Support | Correction needed |
| Force finalization | Finance | Skip review window |
| Generate ad-hoc | Admin | Off-cycle invoice |
| Void and recreate | Finance manager | Major correction |

### 5. Define Error Handling

| Error Category | Handling | Notification |
|----------------|----------|--------------|
| Missing usage data | Block generation | Alert ops team |
| Tax calculation error | Use fallback rate | Alert finance |
| Template rendering | Use default template | Alert support |
| Delivery failure | Queue for retry | Alert tenant |

### 6. Configure Concurrency Controls

| Control | Value | Purpose |
|---------|-------|---------|
| Max parallel generations | 100 | Resource limits |
| Tenant isolation | Strict | No cross-tenant impact |
| Priority queue | Enterprise first | SLA compliance |
| Rate limiting | 10/second | External API limits |

**Verify current best practices with web search:**
Search the web: "invoice generation scheduling distributed systems {date}"
Search the web: "billing automation retry patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the scheduling design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into scheduling architecture using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for scheduling analysis
- **C (Continue)**: Accept scheduling design and proceed to PDF generation pipeline
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass scheduling context: cycles, retry logic, error handling
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into scheduling summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review invoice scheduling for invoice generation: {summary of cycles and retry logic}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save scheduling summary to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-configure-pdf-generation.md`

---

## Verification

- [ ] Billing cycle configurations support all contract types
- [ ] Generation schedule with clear phase timing
- [ ] Retry logic handles all failure scenarios
- [ ] Manual triggers with proper authorization
- [ ] Error handling prevents data corruption
- [ ] Concurrency controls ensure system stability
- [ ] Patterns align with pattern registry

---

## Outputs

- Invoice scheduling specification
- Retry and error handling procedures
- Manual trigger documentation

---

## Next Step

Proceed to `step-04-c-configure-pdf-generation.md` to design the PDF generation pipeline.
