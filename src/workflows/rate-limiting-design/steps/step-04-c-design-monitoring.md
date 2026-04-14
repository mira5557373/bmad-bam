# Step 4: Design Monitoring

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

Design the monitoring, alerting, and observability for rate limiting infrastructure.

---

## Prerequisites

- Enforcement design completed (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `observability`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `usage-metering`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Design monitoring for rate limiting infrastructure:

---

## Rate Limit Metrics

| Metric | Type | Labels | Description |
|--------|------|--------|-------------|
| rate_limit_requests_total | Counter | tenant_id, endpoint, status | Total requests evaluated |
| rate_limit_exceeded_total | Counter | tenant_id, endpoint, tier | Rate limit exceeded count |
| rate_limit_remaining | Gauge | tenant_id, window | Remaining requests in window |
| rate_limit_latency_ms | Histogram | component | Rate limiting evaluation latency |
| quota_usage_percent | Gauge | tenant_id, dimension | Current quota usage percentage |
| quota_exceeded_total | Counter | tenant_id, dimension | Quota exceeded count |

---

## Quota Tracking Metrics

| Metric | Type | Labels | Description |
|--------|------|--------|-------------|
| quota_daily_used | Gauge | tenant_id | Daily API requests used |
| quota_daily_limit | Gauge | tenant_id, tier | Daily API request limit |
| quota_storage_used_bytes | Gauge | tenant_id | Storage quota consumed |
| quota_agents_active | Gauge | tenant_id | Active agents count |
| quota_agent_runs_daily | Counter | tenant_id | Agent runs today |

---

## Alerting Rules

| Alert | Condition | Severity | Action |
|-------|-----------|----------|--------|
| HighRateLimitHits | > 100 429s in 5 min for single tenant | Warning | Notify tenant admin |
| QuotaApproaching90 | Quota usage > 90% | Warning | Email notification |
| QuotaExceeded | Quota usage = 100% | Critical | Block + notify |
| RateLimiterDown | Health check failed | Critical | Page on-call |
| HighLatencyRateLimiter | P99 > 50ms | Warning | Investigate |
| AbusePatternDetected | Unusual request patterns | Warning | Security review |

---

## Dashboard Panels

### Operator Dashboard

| Panel | Visualization | Data |
|-------|---------------|------|
| Rate Limit Overview | Time series | Requests/429s by tier |
| Top Rate-Limited Tenants | Table | Tenant ID, 429 count, tier |
| Quota Usage Distribution | Heatmap | Tenant x Quota dimension |
| Rate Limiter Latency | Histogram | P50, P90, P99 latencies |
| Active Bypasses | Counter | Active bypass tokens |

### Tenant Dashboard

| Panel | Visualization | Data |
|-------|---------------|------|
| My Rate Limit Status | Gauge | Current usage vs limit |
| Request History | Time series | Requests over time |
| Quota Consumption | Progress bars | Each quota dimension |
| Rate Limit Events | Table | Recent 429 responses |
| Upgrade Suggestion | Call-to-action | When approaching limits |

---

## Abuse Detection

| Pattern | Detection | Response |
|---------|-----------|----------|
| Scraping | Rapid sequential requests | Temporary block |
| Credential Stuffing | Many auth failures | Captcha + notify |
| API Key Sharing | Multiple IPs same key | Warning + monitor |
| Quota Gaming | Near-limit bursts | Flag for review |
| DoS Attempt | Massive request volume | IP block + escalate |

---

## Documentation Deliverables

Output files to generate:
- `{output_folder}/planning-artifacts/operations/rate-limiting-runbook.md`
- `{output_folder}/planning-artifacts/architecture/rate-limiting-architecture.md`

**Verify current best practices with web search:**
Search the web: "rate limiting monitoring observability {date}"
Search the web: "API quota monitoring SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the monitoring design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into monitoring and alerting edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for monitoring review
- **C (Continue)**: Accept monitoring and finalize rate limiting design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass monitoring context: metrics, alerts, dashboards
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into monitoring design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review monitoring: {summary of metrics and alerts}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save monitoring design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Generate final rate limiting design documentation

---

## Verification

- [ ] Rate limit metrics defined
- [ ] Quota tracking metrics specified
- [ ] Alerting rules documented
- [ ] Operator dashboard designed
- [ ] Tenant dashboard designed
- [ ] Abuse detection patterns defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Monitoring configuration
- Alerting rules
- Dashboard specifications
- **Load template:** `{project-root}/_bmad/bam/templates/rate-limiting-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/operational-runbook-template.md`

---

## Next Step

Proceed to validation mode to verify rate limiting design, or continue to implementation planning.
