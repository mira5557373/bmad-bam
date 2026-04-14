# Step 2: Design Forecasting Models

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

Design forecasting models for usage prediction.

---

## Prerequisites

- Step 1 completed (Patterns analyzed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

### 1. Model Selection

| Model | Use Case | Pros | Cons |
|-------|----------|------|------|
| ARIMA | Short-term, stable | Interpretable | No seasonality |
| Prophet | Seasonal, growth | Auto seasonality | Requires history |
| LSTM | Complex patterns | Non-linear | Black box |
| Ensemble | Production | Robust | Complex |

### 2. Forecast Horizons

| Horizon | Duration | Use Case | Update Frequency |
|---------|----------|----------|------------------|
| Short-term | 1-7 days | Auto-scaling | Hourly |
| Medium-term | 1-4 weeks | Capacity planning | Daily |
| Long-term | 1-12 months | Budgeting | Weekly |

### 3. Model Architecture

| Component | Purpose | Technology |
|-----------|---------|------------|
| Data Pipeline | Feature engineering | Spark/Beam |
| Training | Model fitting | MLflow |
| Serving | Real-time inference | Seldon/KServe |
| Monitoring | Drift detection | Evidently |

### 4. Confidence Intervals

| Confidence | Use Case | Interpretation |
|------------|----------|----------------|
| 50% | Expected range | Normal planning |
| 80% | Likely range | Buffer planning |
| 95% | Conservative | Risk planning |
| 99% | Worst case | Emergency planning |

**Verify current best practices with web search:**
Search the web: "usage forecasting models SaaS {date}"
Search the web: "capacity planning prediction techniques {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into model selection
- **P (Party Mode)**: Bring ML engineering and ops perspectives
- **C (Continue)**: Accept models and proceed to scaling design
```

#### If 'C' (Continue):
- Save model architecture to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design-scaling.md`

---

## Verification

- [ ] Model types selected
- [ ] Forecast horizons defined
- [ ] Architecture documented
- [ ] Confidence intervals specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Forecasting model specifications
- Architecture design
- Horizon definitions

---

## Next Step

Proceed to `step-03-c-design-scaling.md` to design scaling recommendations.
