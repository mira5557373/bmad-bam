# Step 3: Design Enforcement

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

Design the enforcement mechanisms for rate limiting including API gateway integration, distributed limiting, and graceful degradation.

---

## Prerequisites

- Tier limits configured (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `rate-limiting`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `api-gateway`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Design enforcement mechanisms for each system layer:

---

## API Gateway Enforcement

| Component | Enforcement Action | Timing |
|-----------|-------------------|--------|
| Ingress Controller | Initial rate check | < 1ms |
| API Gateway | Full rate limit evaluation | < 5ms |
| Rate Limiter | Token bucket check | < 2ms |
| Quota Service | Daily quota validation | < 10ms |

---

## Distributed Rate Limiting Architecture

| Component | Role | Data Store |
|-----------|------|------------|
| Edge Rate Limiter | First line of defense, coarse limits | In-memory |
| Central Rate Limiter | Authoritative limits | Redis Cluster |
| Quota Manager | Daily/monthly quota tracking | PostgreSQL |
| Sync Worker | Counter synchronization | Redis -> PostgreSQL |

---

## Rate Limit Response Headers

| Header | Description | Example |
|--------|-------------|---------|
| X-RateLimit-Limit | Maximum requests allowed | 600 |
| X-RateLimit-Remaining | Requests remaining in window | 423 |
| X-RateLimit-Reset | Unix timestamp when limit resets | 1712534400 |
| X-RateLimit-Retry-After | Seconds until retry allowed | 30 |
| X-Quota-Limit | Daily quota limit | 100000 |
| X-Quota-Remaining | Daily quota remaining | 87234 |

---

## 429 Response Structure

Design the rate limit exceeded response:

| Field | Description | Value |
|-------|-------------|-------|
| status | HTTP status code | 429 |
| error | Error type | rate_limit_exceeded |
| message | User-friendly message | "Rate limit exceeded. Please retry after 30 seconds." |
| retry_after | Seconds to wait | 30 |
| limit | Current limit | 60 |
| remaining | Requests remaining | 0 |
| reset_at | Reset timestamp | "2026-04-10T12:00:00Z" |

---

## Graceful Degradation

When approaching limits, degrade gracefully:

| Threshold | Action | User Experience |
|-----------|--------|-----------------|
| 80% quota | Warning header | X-Quota-Warning: approaching |
| 90% quota | Notification trigger | Email/webhook alert |
| 95% quota | Feature throttling | Non-essential features slow |
| 100% quota | Block or overage | 429 or overage billing |

---

## Bypass and Allowlisting

| Bypass Type | Use Case | Implementation |
|-------------|----------|----------------|
| Admin Bypass | Internal testing | API key flag |
| Partner Bypass | Strategic partners | Tenant flag |
| Emergency Bypass | Incident response | Time-limited token |
| Webhook Bypass | Incoming webhooks | Source IP allowlist |

---

## Circuit Breaker Integration

| Condition | Action | Recovery |
|-----------|--------|----------|
| Rate limiter down | Allow with logging | Auto-recover on health |
| Redis cluster down | Local rate limiting | Switch back on recovery |
| Quota service slow | Cache last known | Update on recovery |

**Verify current best practices with web search:**
Search the web: "API gateway rate limiting patterns {date}"
Search the web: "distributed rate limiting Redis {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the enforcement design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into enforcement edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for enforcement review
- **C (Continue)**: Accept enforcement design and proceed to monitoring
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass enforcement context: architecture, headers, degradation
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into enforcement design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review enforcement: {summary of architecture and degradation}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save enforcement design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-design-monitoring.md`

---

## Soft Gate Checkpoint

**Steps 1-3 complete the rate limiting mechanics design.**

Present summary of:
- API gateway enforcement architecture
- Distributed rate limiting components
- Response headers and 429 structure
- Graceful degradation thresholds

Ask for confirmation before proceeding to monitoring design.

---

## Verification

- [ ] API gateway enforcement defined
- [ ] Distributed architecture documented
- [ ] Response headers specified
- [ ] 429 response structure designed
- [ ] Graceful degradation configured
- [ ] Bypass mechanisms documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Enforcement architecture
- Response header specification
- Graceful degradation rules

---

## Next Step

Proceed to `step-04-c-design-monitoring.md` to design monitoring and alerting.
