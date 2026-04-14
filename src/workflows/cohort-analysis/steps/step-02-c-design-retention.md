# Step 2: Design Retention Analysis

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions

---

## Purpose

Design retention curve analysis and tracking methodology.

---

## Prerequisites

- Step 1 completed (Cohorts defined)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

### 1. Retention Metrics

| Metric | Definition | Calculation |
|--------|------------|-------------|
| Day 1 Retention | Return on day after signup | Active D1 / Signups D0 |
| Day 7 Retention | Return within first week | Active D7 / Signups D0 |
| Day 30 Retention | Return within first month | Active D30 / Signups D0 |
| Rolling Retention | Active in any period | Any active / Total cohort |

### 2. Retention Curve Design

| Time Period | Measurement Points | Target |
|-------------|-------------------|--------|
| Week 1 | D1, D3, D7 | 70%, 50%, 40% |
| Month 1 | W1, W2, W3, W4 | 40%, 35%, 32%, 30% |
| Quarter 1 | M1, M2, M3 | 30%, 25%, 22% |
| Year 1 | Q1, Q2, Q3, Q4 | 22%, 20%, 18%, 15% |

### 3. Cohort Comparison

| Analysis Type | Purpose | Visualization |
|---------------|---------|---------------|
| Cohort Table | Period-over-period | Heatmap matrix |
| Trend Line | Pattern identification | Line chart |
| Benchmark | Performance vs target | Gauge/bar |
| Funnel | Drop-off analysis | Funnel chart |

### 4. Retention Alerts

| Alert | Condition | Action |
|-------|-----------|--------|
| Cohort Underperform | >10% below benchmark | Investigate |
| Retention Spike | >15% above benchmark | Study success |
| Trend Break | Significant change | Analyze cause |
| Early Warning | D7 below threshold | Intervene |

**Verify current best practices with web search:**
Search the web: "SaaS retention curve analysis {date}"
Search the web: "cohort retention benchmarks {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into retention analysis
- **P (Party Mode)**: Bring product and growth perspectives
- **C (Continue)**: Accept retention design and proceed to segmentation
```

#### If 'C' (Continue):
- Save retention analysis to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design-segmentation.md`

---

## Verification

- [ ] Retention metrics defined
- [ ] Curve design documented
- [ ] Comparison methods established
- [ ] Alerts configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Retention analysis specification
- Curve design
- Benchmarks and targets

---

## Next Step

Proceed to `step-03-c-design-segmentation.md` to design behavior segmentation.
