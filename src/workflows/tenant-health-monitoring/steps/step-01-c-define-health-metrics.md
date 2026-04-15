# Step 1: Define Health Metrics

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Define comprehensive tenant health indicators and SLIs.

---

## Prerequisites

- Master architecture defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: observability`

---

## Actions

### 1. Availability Metrics

| Metric | Definition | Target | Collection |
|--------|------------|--------|------------|
| Uptime | Successful requests / Total | 99.9% | Real-time |
| Error rate | 5xx errors / Total | < 0.1% | Real-time |
| Partial degradation | Degraded features | < 1% | Real-time |

### 2. Performance Metrics

| Metric | Definition | Target | Collection |
|--------|------------|--------|------------|
| P50 latency | 50th percentile response | < 100ms | Real-time |
| P95 latency | 95th percentile response | < 200ms | Real-time |
| P99 latency | 99th percentile response | < 500ms | Real-time |
| Throughput | Requests per second | Per tier | Real-time |

### 3. Usage Metrics

| Metric | Definition | Significance | Collection |
|--------|------------|--------------|------------|
| DAU/MAU | Active users ratio | Engagement | Daily |
| Feature adoption | Features used / Available | Stickiness | Weekly |
| API utilization | API calls / Quota | Capacity | Real-time |
| Growth rate | MoM user growth | Health trend | Monthly |

### 4. Operational Metrics

| Metric | Definition | Threshold | Collection |
|--------|------------|-----------|------------|
| Quota usage | Used / Allocated | > 80% warning | Real-time |
| Storage consumption | Storage used / Limit | > 90% alert | Hourly |
| Agent execution | Successful / Total | > 95% | Real-time |
| Support tickets | Open tickets | < 3 healthy | Daily |

**Verify current best practices with web search:**
Search the web: "SaaS tenant health metrics best practices {date}"
Search the web: "multi-tenant SLI definitions {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing health metrics definition, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into metric definitions and thresholds
- **P (Party Mode)**: Bring SRE and product perspectives for metrics review
- **C (Continue)**: Accept health metrics and proceed to scoring algorithm
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save health metrics to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-health-scoring.md`

---

## Verification

- [ ] Availability metrics defined
- [ ] Performance metrics with targets
- [ ] Usage metrics identified
- [ ] Operational metrics established
- [ ] Patterns align with pattern registry

---

## Outputs

- Health metrics catalog
- SLI definitions
- Collection strategy
- **Load template:** `{project-root}/_bmad/bam/data/templates/tenant-health-monitoring-template.md`

---

## Next Step

Proceed to `step-02-c-design-health-scoring.md` to design composite health score.
