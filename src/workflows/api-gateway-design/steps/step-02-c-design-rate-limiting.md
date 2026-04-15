# Step 2: Design Rate Limiting

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics


---

## Purpose

Configure tier-based quotas, design burst handling, plan quota enforcement, and set up tenant isolation for rate limiting.

## Prerequisites

- Step 1 completed: Gateway requirements defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: rate-limiting
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-tiers

---

## Inputs

- Output from Step 1 (Gateway requirements)
- Tenant tier definitions
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`

---

## Actions

**Verify current best practices with web search:**
Search the web: "API rate limiting sliding window vs token bucket {date}"
Search the web: "multi-tenant rate limiting best practices {date}"

_Source: [URL]_

### 1. Configure Tier-Based Quotas

| Tier | Requests/Min | Requests/Hour | Requests/Day | Burst |
|------|--------------|---------------|--------------|-------|
| Free | 60 | 1,000 | 10,000 | 10 |
| Pro | 600 | 10,000 | 100,000 | 100 |
| Enterprise | 6,000 | 100,000 | 1,000,000 | 1,000 |

### 2. Design Burst Handling

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Token Bucket | Allows burst up to bucket size | Spiky traffic |
| Sliding Window | Smooth rate over time | Consistent traffic |
| Fixed Window | Reset at interval | Simple implementation |
| Leaky Bucket | Constant outflow rate | Traffic shaping |

### 3. Plan Quota Enforcement

| Level | Scope | Response |
|-------|-------|----------|
| Gateway | Global across all tenants | 429 + Retry-After |
| Tenant | Per-tenant isolation | 429 + quota headers |
| User | Per-user within tenant | 429 + user quota |
| Endpoint | Per-endpoint limits | 429 + endpoint info |

### 4. Set Up Tenant Isolation

| Isolation Type | Implementation | Fairness |
|----------------|----------------|----------|
| Dedicated pools | Separate rate limiters | Guaranteed capacity |
| Shared with quotas | Common pool, tenant limits | Fair share |
| Hierarchical | Tenant > User > Endpoint | Granular control |

---

## Soft Gate Checkpoint

**Steps 1-2 complete the requirements and rate limiting phase.**

Present summary of:
- Gateway requirements
- Rate limiting strategy by tier
- Burst handling approach

Ask for confirmation before proceeding to authentication configuration.

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After completing the rate limiting design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into quota strategies and enforcement
- **P (Party Mode)**: Bring DevOps and architect perspectives for rate limit review
- **C (Continue)**: Accept rate limiting design and proceed to authentication
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass rate limiting context: quotas, burst handling, enforcement
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review rate limiting design: {summary of quotas and strategies}"
- Process collaborative analysis from DevOps and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save rate limiting design
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-configure-authentication.md`

---

## Verification

- [ ] Tier-based quotas configured
- [ ] Burst handling strategy selected
- [ ] Quota enforcement levels defined
- [ ] Tenant isolation designed
- [ ] Patterns align with pattern registry

## Outputs

- Rate limiting policy document
- Quota configuration by tier
- Enforcement strategy

## Next Step

Proceed to `step-03-c-configure-authentication.md` to configure authentication flows.
