# Step 1: Define Rate Limit Strategy

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

Define the rate limiting algorithm and overall strategy for per-tenant API throttling.

---

## Prerequisites

- Tenant model defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `rate-limiting`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `quota-management`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `api-throttling`

---


## Inputs

- User requirements and constraints for rate limiting design
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

Define the rate limiting algorithm selection:

| Algorithm | Description | Use Case | Pros | Cons |
|-----------|-------------|----------|------|------|
| Token Bucket | Tokens refill at fixed rate, consumed per request | Burst handling with sustained limits | Allows bursts, smooth refill | More complex state |
| Sliding Window | Tracks requests in rolling time window | Smooth rate limiting | Even distribution | Higher memory |
| Fixed Window | Counts requests in fixed time intervals | Simple implementation | Easy to implement | Boundary bursts |
| Adaptive | Dynamically adjusts based on system load | Variable traffic | Responsive | Harder to predict |

---

## Algorithm Selection Criteria

For each algorithm, evaluate:

| Criteria | Token Bucket | Sliding Window | Fixed Window | Adaptive |
|----------|--------------|----------------|--------------|----------|
| Burst Tolerance | High | Low | Medium | Variable |
| Memory Usage | Low | Medium | Low | Medium |
| Implementation | Medium | High | Low | High |
| Predictability | High | High | High | Low |
| Multi-Tenant | Excellent | Good | Good | Good |

---

## Rate Limit Scope

Define rate limiting scope:

| Scope | Description | When to Use |
|-------|-------------|-------------|
| Global | Per-tenant across all endpoints | Simple enforcement |
| Per-Endpoint | Different limits per API endpoint | Varied resource costs |
| Per-Operation | Limits based on operation type | Read vs Write differences |
| Per-Resource | Limits based on resource being accessed | Resource-specific throttling |

---

## Distributed Rate Limiting

For multi-instance deployments:

| Strategy | Description | Tradeoffs |
|----------|-------------|-----------|
| Centralized (Redis) | Single Redis instance for counters | Consistent, single point of failure |
| Distributed (Redis Cluster) | Redis cluster for HA | More complex, eventually consistent |
| Local with Sync | Local counters with periodic sync | Fast, may over-allow briefly |
| Sticky Sessions | Route tenant to same instance | Simple, limits scaling |

**Verify current best practices with web search:**
Search the web: "rate limiting multi-tenant SaaS {date}"
Search the web: "token bucket per-tenant {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the strategy selection above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into algorithm selection and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for strategy review
- **C (Continue)**: Accept strategy and proceed to tier limit configuration
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass strategy context: algorithm, scope, distribution
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into strategy design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review rate limiting strategy: {summary of algorithm and scope}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save strategy to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-configure-tier-limits.md`

---

## Verification

- [ ] Rate limiting algorithm selected
- [ ] Algorithm rationale documented
- [ ] Rate limit scope defined
- [ ] Distributed strategy chosen
- [ ] Patterns align with pattern registry

---

## Outputs

- Rate limiting algorithm selection
- Scope configuration
- Distribution strategy

---

## Next Step

Proceed to `step-02-c-configure-tier-limits.md` to configure tier-based rate limits.
