# Step 7: Monitoring

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

Design monitoring and alerting for memory optimization including utilization metrics, eviction tracking, quota alerts, and performance regression detection.

---

## Prerequisites

- Steps 1-6 completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: monitoring
- **Web research (if available):** Search for memory monitoring best practices

---

## Inputs

- Cost controls from Step 6
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Core Metrics

| Metric | Type | Dimensions | Alert Threshold |
|--------|------|------------|-----------------|
| memory_utilization_pct | Gauge | tier, tenant | >80% |
| memory_evictions_total | Counter | tier, reason | >1000/min |
| memory_latency_ms | Histogram | tier, operation | p99 > SLA |
| memory_quota_usage_pct | Gauge | tenant, tier | >90% |

### 2. Configure Tenant-Scoped Metrics

| Metric | Purpose | Visibility |
|--------|---------|------------|
| tenant_memory_bytes | Usage tracking | Admin + tenant |
| tenant_eviction_rate | Health indicator | Admin |
| tenant_hit_rate | Efficiency | Admin |
| tenant_growth_rate | Capacity planning | Admin |

### 3. Design Alerting Rules

| Alert | Severity | Condition | Response |
|-------|----------|-----------|----------|
| Memory pressure | P2 | >85% utilization 5m | Scale or evict |
| Eviction storm | P1 | >5000/min | Investigate |
| Latency regression | P2 | p99 > 2x baseline | Investigate |
| Quota breach | P3 | >100% quota | Notify tenant |

### 4. Configure Dashboards

| Dashboard | Audience | Key Panels |
|-----------|----------|------------|
| Memory Overview | SRE | Utilization, evictions, latency |
| Tenant Health | Support | Per-tenant usage, quotas |
| Performance | Engineering | Latency percentiles, hit rates |
| Cost | Finance | Storage costs, tiering efficiency |

### 5. Design Anomaly Detection

| Signal | Baseline | Anomaly Threshold | Action |
|--------|----------|-------------------|--------|
| Memory growth | Rolling 7-day avg | >3 std dev | Alert |
| Eviction rate | Rolling 24h avg | >2 std dev | Investigate |
| Latency | Rolling 1h avg | >50% increase | Alert |

**Verify current best practices with web search:**
Search the web: "Redis memory monitoring metrics {date}"
Search the web: "distributed cache observability {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the monitoring analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into alerting thresholds and anomaly detection
- **P (Party Mode)**: Bring SRE and observability perspectives
- **C (Continue)**: Accept monitoring design and proceed to testing
- **[Specific refinements]**: Describe monitoring concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: metrics, alerting rules, dashboards, anomaly detection
- Process enhanced insights on observability
- Ask user: "Accept these refined monitoring decisions? (y/n)"
- If yes, integrate into monitoring specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review memory monitoring and alerting strategy"
- Process SRE and observability perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save monitoring design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7]`
- Proceed to next step: `step-08-c-testing.md`

---

## Verification

- [ ] Core metrics defined
- [ ] Tenant-scoped metrics configured
- [ ] Alerting rules designed
- [ ] Dashboards planned
- [ ] Anomaly detection configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Monitoring specification
- Metrics catalog
- Alerting configuration
- Dashboard specifications

---

## Next Step

Proceed to `step-08-c-testing.md` to plan testing strategy.
