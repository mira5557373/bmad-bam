# Step 3: Configure Tier Quotas

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

Configure tier-based quota allocations with appropriate limits and overage handling.

---

## Prerequisites

- Step 2: Design Throttling Rules completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `quota-management`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `usage-metering`

---

## Inputs

- Throttling rules from Step 2
- Tier definitions from tenant model
- Business requirements for quota limits
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Tier Quota Allocations

Configure quotas for each tenant tier:

| Tier | Requests/min | Requests/hour | Daily Limit | Monthly Limit |
|------|--------------|---------------|-------------|---------------|
| Free | 60 | 1,000 | 10,000 | 100,000 |
| Pro | 300 | 10,000 | 100,000 | 1,000,000 |
| Enterprise | 1,000 | 50,000 | Unlimited | Unlimited |
| Custom | Negotiated | Negotiated | Negotiated | Negotiated |

### 2. Configure Burst Allowances per Tier

Define burst tolerance for each tier:

| Tier | Burst Multiplier | Burst Duration | Cooldown Period |
|------|------------------|----------------|-----------------|
| Free | 1.5x | 10 seconds | 5 minutes |
| Pro | 2x | 30 seconds | 2 minutes |
| Enterprise | 3x | 60 seconds | 1 minute |
| Custom | Configurable | Configurable | Configurable |

### 3. Design Quota Enforcement Strategy

Define enforcement behavior:

| Quota Type | Enforcement | On Exceed | Notification |
|------------|-------------|-----------|--------------|
| Per-minute | Hard limit | 429 response | Real-time header |
| Hourly | Soft warning at 80% | Throttle to base | Email at 80% |
| Daily | Hard limit | Block until reset | Dashboard + email |
| Monthly | Soft limit with overage | Overage billing | Invoice warning |

### 4. Configure Overage Handling

Define overage policies per tier:

| Tier | Overage Allowed | Overage Rate | Grace Period |
|------|-----------------|--------------|--------------|
| Free | No | N/A | N/A |
| Pro | Yes | $0.001/request | 24 hours |
| Enterprise | Yes | Negotiated | 72 hours |

**Soft Gate Checkpoint**

**Steps 1-3 complete the throttling rules and tier quota design.**

Present a summary of:
- Throttling algorithms selected
- Per-category limits
- Tier quota allocations
- Burst allowances
- Overage policies

Ask for confirmation before proceeding to burst handling design.

**Verify current best practices with web search:**
Search the web: "SaaS tier quota management {date}"
Search the web: "API quota enforcement patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tier quotas above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into quota limits and overage strategies
- **P (Party Mode)**: Bring analyst and architect perspectives for quota review
- **C (Continue)**: Accept tier quotas and proceed to burst handling design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass quota context: tier allocations, burst allowances, overage policies
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into tier quotas
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tier quotas: {summary of allocations and policies}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tier quotas to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-design-burst-handling.md`

---

## Verification

- [ ] Tier quota allocations defined
- [ ] Burst allowances configured per tier
- [ ] Quota enforcement strategy documented
- [ ] Overage handling policies specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Tier quota allocation table
- Burst allowance configuration
- Enforcement strategy document
- Overage handling policies

---

## Next Step

Proceed to `step-04-c-design-burst-handling.md` to design burst handling mechanisms.
