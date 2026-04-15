# Step 1: Analyze Traffic Patterns

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

Analyze API traffic patterns to establish baselines and inform throttling rule design.

---

## Prerequisites

- Tenant model defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `api-throttling`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `rate-limiting`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-routing`

---

## Inputs

- User requirements and constraints for API throttling design
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Identify API Endpoint Categories

Categorize API endpoints by traffic characteristics:

| Category | Examples | Characteristics |
|----------|----------|-----------------|
| Public APIs | REST endpoints, GraphQL | High volume, external traffic |
| Internal APIs | Service-to-service | Predictable, authenticated |
| Webhook Endpoints | Event callbacks | Burst-prone, async |
| Agent APIs | LLM/tool calls | Token-budget aware |
| Admin APIs | Management endpoints | Low volume, privileged |

### 2. Map Traffic Patterns by Tenant Tier

Analyze expected traffic patterns per tier:

| Tier | Peak RPS | Daily Volume | Burst Factor |
|------|----------|--------------|--------------|
| Free | 1-5 | 1K-10K | 2x |
| Pro | 10-50 | 10K-100K | 3x |
| Enterprise | 100-1000 | 100K-1M+ | 5x |

### 3. Detect Burst Characteristics

Define burst detection parameters:

| Metric | Threshold | Detection Window |
|--------|-----------|------------------|
| Request spike | 3x baseline | 10 seconds |
| Sustained high load | 1.5x baseline | 5 minutes |
| Anomalous pattern | Statistical outlier | 1 minute |

### 4. Establish Baseline Request Rates

Document baseline rates for each endpoint category:

| Endpoint | Baseline RPS | P95 Latency | Error Rate |
|----------|--------------|-------------|------------|
| `/api/v1/resources` | {to be filled} | {to be filled} | {to be filled} |
| `/api/v1/agents` | {to be filled} | {to be filled} | {to be filled} |
| `/api/v1/webhooks` | {to be filled} | {to be filled} | {to be filled} |

**Verify current best practices with web search:**
Search the web: "API throttling multi-tenant {date}"
Search the web: "sliding window rate limiting {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the traffic analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into traffic patterns and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for pattern review
- **C (Continue)**: Accept traffic analysis and proceed to throttling rules design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass traffic context: endpoint categories, tier patterns, burst characteristics
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into traffic analysis
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review traffic patterns: {summary of categories and baselines}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save traffic analysis to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-throttling-rules.md`

---

## Verification

- [ ] All endpoint categories identified
- [ ] Traffic patterns mapped by tier
- [ ] Burst characteristics defined
- [ ] Baseline request rates established
- [ ] Patterns align with pattern registry

---

## Outputs

- API endpoint categorization
- Traffic pattern analysis by tier
- Burst detection parameters
- Baseline metrics table

---

## Next Step

Proceed to `step-02-c-design-throttling-rules.md` to design throttling rules.
