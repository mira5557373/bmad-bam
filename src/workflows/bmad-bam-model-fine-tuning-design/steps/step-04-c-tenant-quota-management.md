# Step 4: Tenant Quota Management

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Design quota and limit systems to ensure fair resource allocation across tenants while preventing abuse and controlling costs for fine-tuning operations.

---

## Prerequisites

- Training configuration complete (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-isolation,metering

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Fine-tuning Job Limits

Establish job limits per tier:

| Tier | Jobs/Month | Concurrent Jobs | Max Duration | Queue Depth |
|------|------------|-----------------|--------------|-------------|
| Free | 0 | 0 | N/A | N/A |
| Starter | 5 | 1 | 2 hours | 3 |
| Pro | 20 | 3 | 8 hours | 10 |
| Enterprise | Unlimited | 10 | 24 hours | 50 |
| Dedicated | Unlimited | Custom | Custom | Custom |

### 2. Design Compute Budget Allocation

Define GPU hour budgets:

| Tier | GPU Hours/Month | Burst Allowance | Overage Rate |
|------|-----------------|-----------------|--------------|
| Free | 0 | N/A | N/A |
| Starter | 10 | +5 (one-time) | $5/hour |
| Pro | 100 | +50 | $3/hour |
| Enterprise | 500 | +200 | $2/hour |
| Dedicated | Reserved | N/A | Included |

Budget enforcement:
- Real-time tracking via metering service
- Soft limit warnings at 80%, 90%
- Hard limit enforcement at 100%
- Grace period for in-flight jobs

### 3. Configure Dataset Size Limits

Establish data limits:

| Tier | Max Dataset Size | Max Samples | Max Token Count |
|------|-----------------|-------------|-----------------|
| Starter | 10MB | 10,000 | 1M tokens |
| Pro | 100MB | 100,000 | 10M tokens |
| Enterprise | 1GB | 1,000,000 | 100M tokens |
| Dedicated | Custom | Custom | Custom |

Validation:
- Pre-upload size check
- Post-processing token count validation
- Rejection with clear error messages

### 4. Design Concurrent Training Limits

Configure concurrency controls:

| Resource | Starter | Pro | Enterprise |
|----------|---------|-----|------------|
| Active training jobs | 1 | 3 | 10 |
| Active fine-tuned models | 3 | 10 | 50 |
| API rate limit (requests/min) | 10 | 60 | 300 |
| Queued jobs | 3 | 10 | 50 |

Queue management:
- FIFO within tier priority
- Priority elevation for Enterprise
- Job cancellation for stale queue entries

### 5. Implement Quota Tracking and Alerts

Design quota monitoring:

| Event | Notification | Action |
|-------|--------------|--------|
| 80% quota used | Email + Dashboard | Warning |
| 90% quota used | Email + Webhook | Urgent warning |
| 100% quota used | All channels | Block new jobs |
| Overage enabled | Admin notification | Track charges |
| Quota reset | Dashboard update | Reset counters |

**Soft Gate:** Steps 1-4 complete the core fine-tuning design. Present a summary of requirements, data isolation, training config, and quotas. Ask for confirmation before proceeding to model registry and versioning.

**Verify current best practices with web search:**
Search the web: "SaaS quota management best practices {date}"
Search the web: "GPU compute quota multi-tenant ML {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the quota management design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into budget enforcement or concurrency strategies
- **P (Party Mode)**: Bring product and finance perspectives on quota design
- **C (Continue)**: Accept quota design and proceed to model registry
- **[Specific refinements]**: Describe quota management concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: job limits, compute budgets, concurrency controls
- Process enhanced insights on quota strategies
- Ask user: "Accept these refined quota management decisions? (y/n)"
- If yes, integrate into quota specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review quota management for fine-tuning in multi-tenant platform"
- Process product and finance perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save quota management design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-model-registry-design.md`

---

## Verification

- [ ] Fine-tuning job limits defined per tier
- [ ] Compute budget allocation documented
- [ ] Dataset size limits configured
- [ ] Concurrent training limits established
- [ ] Quota tracking and alerts designed
- [ ] Patterns align with pattern registry

---

## Outputs

- Job limits specification
- Compute budget allocation
- Dataset size limits
- Concurrency configuration
- Quota tracking design
- **Load template:** `{project-root}/_bmad/bam/data/templates/metering-event-spec.md`

---

## Next Step

Proceed to `step-05-c-model-registry-design.md` to design the model registry.
