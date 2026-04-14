# Step 2: Configure Tier Limits

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

Configure rate limits and quotas for each tenant tier with appropriate burst handling and daily limits.

---

## Prerequisites

- Rate limiting strategy defined (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `quota-management`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `usage-metering`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Configure tier-based rate limits:

---

## Tier Rate Limit Matrix

| Tier | Requests/sec | Requests/min | Burst Size | Daily Quota | Concurrent |
|------|--------------|--------------|------------|-------------|------------|
| Free | 1 | 60 | 10 | 10,000 | 5 |
| Starter | 5 | 300 | 30 | 50,000 | 20 |
| Pro | 10 | 600 | 100 | 100,000 | 50 |
| Business | 50 | 3,000 | 500 | 500,000 | 200 |
| Enterprise | 100 | 6,000 | 1,000 | Unlimited | Unlimited |

---

## Per-Endpoint Rate Limits

Different endpoints may have different costs:

| Endpoint Category | Free Multiplier | Pro Multiplier | Enterprise Multiplier |
|-------------------|-----------------|----------------|----------------------|
| Read Operations | 1.0x | 1.0x | 1.0x |
| Write Operations | 0.5x | 0.5x | 1.0x |
| Search/Query | 0.25x | 0.5x | 1.0x |
| Agent Execution | 0.1x | 0.25x | 0.5x |
| Bulk Operations | 0.05x | 0.1x | 0.25x |

---

## Burst Handling Configuration

| Tier | Burst Tokens | Refill Rate | Max Burst Duration |
|------|--------------|-------------|-------------------|
| Free | 10 | 1/sec | 10 seconds |
| Starter | 30 | 5/sec | 6 seconds |
| Pro | 100 | 10/sec | 10 seconds |
| Business | 500 | 50/sec | 10 seconds |
| Enterprise | 1,000 | 100/sec | 10 seconds |

---

## Quota Dimensions

Track quotas across multiple dimensions:

| Dimension | Free | Pro | Enterprise |
|-----------|------|-----|------------|
| API Requests | 10,000/day | 100,000/day | Unlimited |
| Storage (GB) | 1 | 10 | 100 |
| Agents | 3 | 10 | Unlimited |
| Agent Runs | 100/day | 1,000/day | Unlimited |
| Webhooks | 5 | 50 | Unlimited |
| Team Members | 3 | 20 | Unlimited |

---

## Overage Handling

| Tier | Overage Policy | Action |
|------|----------------|--------|
| Free | Hard Limit | Block requests, 429 response |
| Starter | Hard Limit | Block requests, 429 response |
| Pro | Soft Limit + Grace | 10% grace, then block |
| Business | Soft Limit + Overage | Allow overage, bill at 1.5x rate |
| Enterprise | No Limit | Usage-based billing |

**Verify current best practices with web search:**
Search the web: "SaaS tier rate limits best practices {date}"
Search the web: "API quota management multi-tenant {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tier configuration above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into tier limits and business alignment
- **P (Party Mode)**: Bring analyst and architect perspectives for tier review
- **C (Continue)**: Accept tier limits and proceed to enforcement design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass tier context: limits, burst handling, overage
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into tier configuration
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tier limits: {summary of tiers and quotas}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tier configuration to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design-enforcement.md`

---

## Soft Gate Checkpoint

**Steps 1-2 complete the rate limiting strategy and tier design.**

Present summary of:
- Rate limiting algorithm and scope
- All tier limits with burst handling
- Quota dimensions and overage policies

Ask for confirmation before proceeding to enforcement design.

---

## Verification

- [ ] All tiers defined with rate limits
- [ ] Burst handling configured per tier
- [ ] Quota dimensions specified
- [ ] Overage policies documented
- [ ] Per-endpoint multipliers defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Tier rate limit matrix
- Burst handling configuration
- Quota dimension catalog
- **Load template:** `{project-root}/_bmad/bam/templates/quota-management-template.md`

---

## Next Step

Proceed to `step-03-c-design-enforcement.md` to design enforcement mechanisms.
