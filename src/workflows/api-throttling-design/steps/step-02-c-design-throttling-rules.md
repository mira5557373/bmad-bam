# Step 2: Design Throttling Rules

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

Design throttling rules for each endpoint category with appropriate algorithms and limits.

---

## Prerequisites

- Step 1: Analyze Traffic Patterns completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `api-throttling`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `rate-limiting`

---

## Inputs

- Traffic pattern analysis from Step 1
- Endpoint categorization
- Tier traffic expectations
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Select Throttling Algorithm per Category

Choose appropriate algorithm for each endpoint category:

| Algorithm | Description | Best For |
|-----------|-------------|----------|
| Fixed Window | Simple count per time window | Low-volume, predictable traffic |
| Sliding Window | Rolling window with weighted counts | Most REST APIs |
| Token Bucket | Accumulate tokens over time | Burst-tolerant endpoints |
| Leaky Bucket | Smooth request rate | Steady-state processing |
| Adaptive | Dynamic limits based on load | Variable traffic patterns |

### 2. Design Throttling Rules Matrix

Define rules for each endpoint category:

| Endpoint Category | Algorithm | Window | Global Limit | Per-Tenant Limit |
|-------------------|-----------|--------|--------------|------------------|
| Public APIs | Sliding Window | 1 minute | 10,000 | Tier-based |
| Internal APIs | Token Bucket | Per-second | 50,000 | Service-based |
| Webhook Endpoints | Fixed Window | 1 hour | 100,000 | Per-tenant |
| Agent APIs | Adaptive | Session | Budget-based | Token-limited |
| Admin APIs | Sliding Window | 1 minute | 1,000 | Role-based |

### 3. Define Per-Endpoint Limits

Specify limits for critical endpoints:

| Endpoint | Limit | Window | Scope |
|----------|-------|--------|-------|
| `POST /api/v1/agents/run` | 100 | 1 minute | Per-tenant |
| `GET /api/v1/resources` | 1000 | 1 minute | Per-tenant |
| `POST /api/v1/webhooks` | 500 | 1 hour | Per-tenant |
| `* /api/v1/admin/*` | 60 | 1 minute | Per-user |

### 4. Configure Response Headers

Define rate limit response headers:

| Header | Purpose | Example Value |
|--------|---------|---------------|
| `X-RateLimit-Limit` | Maximum requests allowed | `1000` |
| `X-RateLimit-Remaining` | Requests remaining | `876` |
| `X-RateLimit-Reset` | Timestamp when limit resets | `1704067200` |
| `Retry-After` | Seconds until retry (on 429) | `60` |

**Verify current best practices with web search:**
Search the web: "API rate limiting algorithms comparison {date}"
Search the web: "sliding window vs token bucket rate limiting {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the throttling rules above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into algorithm selection and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for rules review
- **C (Continue)**: Accept throttling rules and proceed to tier quotas configuration
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass rules context: algorithms, limits, per-endpoint configuration
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into throttling rules
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review throttling rules: {summary of algorithms and limits}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save throttling rules to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-configure-tier-quotas.md`

---

## Verification

- [ ] Algorithm selected for each category
- [ ] Throttling rules matrix complete
- [ ] Per-endpoint limits defined
- [ ] Response headers configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Algorithm selection rationale
- Throttling rules matrix
- Per-endpoint limit configuration
- Response header specification
- **Load template:** `{project-root}/_bmad/bam/templates/api-throttling-template.md`

---

## Next Step

Proceed to `step-03-c-configure-tier-quotas.md` to configure tier-based quotas.
