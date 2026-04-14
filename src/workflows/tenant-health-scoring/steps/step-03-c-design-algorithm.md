# Step 3: Design Scoring Algorithm

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

Design composite health scoring algorithm with trend analysis.

---

## Prerequisites

- Step 2 completed (Weights defined)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

### 1. Composite Score Calculation

```
Health Score = 
  (Engagement_Score * 0.35) +
  (Usage_Score * 0.25) +
  (Business_Score * 0.25) +
  (Support_Score * 0.15)

Where each category score = Sum(metric_i * weight_i) normalized to 0-100
```

### 2. Score Components

| Component | Calculation | Output Range |
|-----------|-------------|--------------|
| Raw Score | Weighted sum | 0-100 |
| Trend Score | 7-day moving average delta | -10 to +10 |
| Velocity | Rate of change | -5 to +5 |
| Final Score | Raw + (Trend * 0.5) | 0-100 |

### 3. Trend Analysis

| Trend | Detection | Weight Modifier |
|-------|-----------|-----------------|
| Improving | +5 pts/week sustained | +5% boost |
| Stable | +/- 3 pts/week | No change |
| Declining | -5 pts/week sustained | -5% penalty |
| Critical Drop | -15 pts/week | Alert trigger |

### 4. Predictive Indicators

| Indicator | Signal | Lead Time |
|-----------|--------|-----------|
| Churn Risk | Score < 40 + declining | 30-60 days |
| Expansion Ready | Score > 80 + growing | 14-30 days |
| Support Need | Score 40-60 + support spike | Immediate |
| Adoption Stall | Usage flat + low engagement | 7-14 days |

**Soft Gate:** Steps 1-3 complete core algorithm. Present summary and confirm before proceeding to thresholds.

**Verify current best practices with web search:**
Search the web: "composite health score algorithm SaaS {date}"
Search the web: "predictive customer health indicators {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into algorithm tuning
- **P (Party Mode)**: Bring ML and analytics perspectives
- **C (Continue)**: Accept algorithm and proceed to thresholds
```

#### If 'C' (Continue):
- Save algorithm to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-design-thresholds.md`

---

## Verification

- [ ] Composite formula documented
- [ ] Trend analysis defined
- [ ] Predictive indicators established
- [ ] Score ranges validated
- [ ] Patterns align with pattern registry

---

## Outputs

- Scoring algorithm specification
- Trend analysis rules
- Predictive indicator definitions

---

## Next Step

Proceed to `step-04-c-design-thresholds.md` to design action thresholds.
