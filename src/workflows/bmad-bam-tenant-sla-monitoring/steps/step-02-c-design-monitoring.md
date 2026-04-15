# Step 2: Design Monitoring

## Purpose

Design SLA compliance monitoring and measurement.

## MANDATORY EXECUTION RULES

**FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **COMPLETE EVERY STEP** - Execute all steps in sequence
2. **NO PARTIAL COMPLETIONS** - Finish what you start
3. **VERIFY OUTPUTS** - Confirm each step produces expected results
4. **DOCUMENT DECISIONS** - Record all choices made

---

## Prerequisites

- Step 1 completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: observability`

**Web Research (Required):**

Search the web: "SLA monitoring infrastructure best practices {date}"
Search the web: "service level measurement multi-tenant SaaS patterns {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Measurement Infrastructure

| Component | Tool | Collection |
|-----------|------|------------|
| Uptime | Synthetic monitors | 1-minute intervals |
| Latency | APM traces | Real-time |
| Error rate | Log aggregation | Real-time |
| Availability | Health checks | 30-second intervals |

### 2. SLA Dashboard

| Panel | Metric | Visualization |
|-------|--------|---------------|
| Current SLA | Real-time compliance | Gauge |
| Trend | 30-day rolling | Line chart |
| Budget remaining | Error budget | Progress bar |
| Incidents | Impact events | Timeline |

### 3. Error Budget Calculation

```
Error Budget = 100% - SLA Target
Monthly Budget = Error Budget * Total Minutes
Remaining = Monthly Budget - Downtime Minutes
```

**Soft Gate:** Steps 1-2 complete SLA definition and monitoring. Confirm before proceeding to breach handling.

---

## COLLABORATION MENUS (A/P/C):

```
- **C (Continue)**: Proceed to breach handling
```

#### If 'C' (Continue):
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to: `step-03-c-design-breach-handling.md`

---

## Verification

- [ ] Measurement infrastructure defined
- [ ] Dashboard panels specified
- [ ] Error budget calculation documented

---

## Outputs

- Measurement infrastructure specifications with tools and collection intervals
- SLA dashboard panel definitions with visualizations
- Error budget calculation formulas and methodology
- Design decisions documented in frontmatter

---

## Next Step

Proceed to `step-03-c-design-breach-handling.md`.
