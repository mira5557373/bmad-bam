# Step 1: Define Alert Thresholds

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

Define the usage threshold configurations that trigger alerts.

---

## Prerequisites

- Usage metering design completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: usage-metering
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-isolation

---

## Actions

### 1. Define Percentage-Based Thresholds

| Threshold | Alert Level | Use Case |
|-----------|-------------|----------|
| 50% | Informational | Early awareness |
| 75% | Warning | Planning time |
| 90% | Critical | Urgent action |
| 100% | Overage | Limit reached |

### 2. Configure Absolute Thresholds

| Resource | Threshold | Alert |
|----------|-----------|-------|
| Cost | $100, $500, $1000 | Budget alerts |
| API calls | 10K, 50K, 100K | Volume alerts |
| Storage | 1GB, 10GB, 50GB | Capacity alerts |

### 3. Define Rate-of-Change Alerts

| Metric | Threshold | Window |
|--------|-----------|--------|
| Usage spike | 200% increase | 1 hour |
| Cost acceleration | 150% increase | 1 day |
| Anomaly detection | 3 std deviations | Rolling |

### 4. Configure Forecast Alerts

| Forecast Type | Alert Trigger |
|---------------|---------------|
| End-of-month projection | Will exceed limit |
| Cost projection | Will exceed budget |
| Usage trend | Unsustainable growth |

**Verify current best practices with web search:**
Search the web: "usage threshold alerting SaaS best practices {date}"
Search the web: "cost alerting cloud billing patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into threshold design
- **P (Party Mode)**: Bring analyst and architect perspectives
- **C (Continue)**: Accept thresholds and proceed to notification channels

Select an option:
```

---

## Verification

- [ ] Percentage thresholds defined
- [ ] Absolute thresholds configured
- [ ] Rate-of-change alerts designed
- [ ] Forecast alerts specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Alert threshold specification
- Threshold configuration matrix

---

## Next Step

Proceed to `step-02-c-configure-notification-channels.md` to design notification delivery.
