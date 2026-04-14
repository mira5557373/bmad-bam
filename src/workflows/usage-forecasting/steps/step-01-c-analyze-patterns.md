# Step 1: Analyze Usage Patterns

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

Analyze usage patterns and identify seasonality for forecasting.

---

## Prerequisites

- Usage metering design exists
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

### 1. Usage Pattern Analysis

| Pattern Type | Detection Method | Significance |
|--------------|------------------|--------------|
| Daily Cycles | Hourly aggregation | Peak hours |
| Weekly Cycles | Day-of-week analysis | Business days |
| Monthly Cycles | Week-of-month analysis | Billing cycles |
| Seasonal | Quarter comparison | Annual trends |

### 2. Trend Identification

| Trend Type | Characteristics | Impact |
|------------|----------------|--------|
| Linear Growth | Steady increase | Predictable scaling |
| Exponential | Accelerating growth | Aggressive scaling |
| Plateau | Growth leveling | Stable capacity |
| Declining | Decreasing usage | Churn risk |

### 3. Anomaly Detection

| Anomaly Type | Detection | Action |
|--------------|-----------|--------|
| Usage Spike | >3 std dev | Investigate |
| Usage Drop | >2 std dev | Alert |
| Pattern Break | Trend change | Recalibrate |
| Outlier | Statistical test | Exclude/flag |

### 4. Tenant Segmentation

| Segment | Characteristics | Forecast Approach |
|---------|-----------------|-------------------|
| High Volume | Top 10% usage | Individual models |
| Growing | >20% MoM growth | Growth models |
| Stable | +/- 5% variance | Baseline models |
| Volatile | High variance | Ensemble models |

**Verify current best practices with web search:**
Search the web: "usage pattern analysis SaaS capacity planning {date}"
Search the web: "time series seasonality detection {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing pattern analysis, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into pattern analysis
- **P (Party Mode)**: Bring data science and ops perspectives
- **C (Continue)**: Accept patterns and proceed to model design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save pattern analysis to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-models.md`

---

## Verification

- [ ] Usage patterns identified
- [ ] Trends characterized
- [ ] Anomalies documented
- [ ] Segments defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Pattern analysis report
- Seasonality characteristics
- Tenant segmentation

---

## Next Step

Proceed to `step-02-c-design-models.md` to design forecasting models.
