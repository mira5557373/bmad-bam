# Step 4: Design Burst Handling

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

Design burst handling mechanisms and graceful degradation strategies for traffic spikes.

---

## Prerequisites

- Step 3: Configure Tier Quotas completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `performance-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `circuit-breaker`

---

## Inputs

- Tier quota configuration from Step 3
- Burst allowance definitions
- Traffic pattern analysis from Step 1
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Design Burst Detection Algorithms

Define burst detection parameters:

| Detection Method | Trigger Condition | Detection Window | Action |
|------------------|-------------------|------------------|--------|
| Rate Spike | 3x baseline RPS | 5 seconds | Alert + monitor |
| Sustained Load | 1.5x baseline | 1 minute | Activate burst mode |
| Anomaly Detection | Statistical outlier | Rolling 5 min | Investigate + optional throttle |
| DDoS Pattern | 10x baseline | 10 seconds | Emergency throttle |

### 2. Configure Graceful Degradation Levels

Define degradation tiers:

| Level | Trigger | Actions | Recovery |
|-------|---------|---------|----------|
| Normal | Below threshold | Full service | N/A |
| Warning | 80% capacity | Alert ops, prepare scaling | Auto when <70% |
| Throttle | 90% capacity | Enforce stricter limits | Auto when <80% |
| Degrade | 100% capacity | Disable non-essential APIs | Manual review |
| Emergency | System overload | Critical paths only | Manual recovery |

### 3. Design Client Notification Strategy

Configure 429 Too Many Requests responses:

| Scenario | Status Code | Headers | Body |
|----------|-------------|---------|------|
| Rate limit exceeded | 429 | `Retry-After: {seconds}` | Error with reset time |
| Quota exhausted | 429 | `X-Quota-Reset: {timestamp}` | Upgrade prompt |
| Burst limit hit | 429 | `Retry-After: {seconds}` | Burst cooldown notice |
| Emergency throttle | 503 | `Retry-After: 300` | Service degraded message |

### 4. Design Queue-Based Request Buffering (Optional)

For critical requests during bursts:

| Queue Type | Use Case | Max Depth | Timeout |
|------------|----------|-----------|---------|
| Priority Queue | Enterprise tenants | 1000 | 30 seconds |
| Standard Queue | Pro tenants | 500 | 15 seconds |
| Overflow Queue | Retry buffer | 100 | 5 seconds |

### 5. Define Monitoring and Alerting

Configure throttling observability:

| Metric | Alert Threshold | Escalation |
|--------|-----------------|------------|
| 429 response rate | >5% of requests | PagerDuty - Warning |
| Throttled tenants | >10 tenants | Slack - Ops channel |
| Burst mode activations | >3/hour | Email - Platform team |
| Emergency throttle | Any | PagerDuty - Critical |

**Verify current best practices with web search:**
Search the web: "API burst handling patterns {date}"
Search the web: "graceful degradation microservices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the burst handling design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into burst scenarios and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for final review
- **C (Continue)**: Accept burst handling design and finalize API throttling design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass burst context: detection algorithms, degradation levels, client notifications
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into burst handling design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review burst handling: {summary of detection and degradation strategies}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save burst handling design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Generate final API throttling design document
- Complete Create workflow

---

## Verification

- [ ] Burst detection algorithms defined
- [ ] Graceful degradation levels configured
- [ ] Client notification strategy complete
- [ ] Queue-based buffering designed (if applicable)
- [ ] Monitoring and alerting configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Burst detection configuration
- Graceful degradation strategy
- Client notification templates
- Queue configuration (optional)
- Monitoring and alerting rules
- Complete API throttling design document

---

## Next Step

Create workflow complete. API throttling design ready for validation using Validate mode (`step-20-v-*`).

---

## Workflow Complete

Create mode complete. The API throttling design document is ready at:
`{output_folder}/planning-artifacts/operations/api-throttling-design.md`

Suggest running Validate mode to verify completeness against quality criteria.
