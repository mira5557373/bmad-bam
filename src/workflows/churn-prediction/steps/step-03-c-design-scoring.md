# Step 3: Design Risk Scoring

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

Design churn risk scoring system with probability outputs.

---

## Prerequisites

- Step 2 completed (Model designed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

### 1. Risk Score Definition

| Score Range | Risk Level | Probability | Action Priority |
|-------------|------------|-------------|-----------------|
| 0-20 | Minimal | <10% | Monitor |
| 21-40 | Low | 10-25% | Track |
| 41-60 | Moderate | 25-50% | Engage |
| 61-80 | High | 50-75% | Intervene |
| 81-100 | Critical | >75% | Urgent |

### 2. Score Components

| Component | Weight | Calculation | Update Frequency |
|-----------|--------|-------------|------------------|
| Health Score | 30% | From health scoring | Daily |
| Behavior Score | 25% | Engagement patterns | Real-time |
| Financial Score | 25% | Payment + contract | Weekly |
| Sentiment Score | 20% | Support + NPS | Weekly |

### 3. Confidence Scoring

| Confidence | Conditions | Display |
|------------|------------|---------|
| High | >6 months data, stable | Show score |
| Medium | 3-6 months data | Show with caveat |
| Low | <3 months data | Flag as uncertain |
| Insufficient | <30 days data | No score |

### 4. Score Explanations

| Risk Driver | Explanation Template | Actionability |
|-------------|---------------------|---------------|
| Engagement | "Login frequency down 45% vs 30-day avg" | High |
| Usage | "Only using 2 of 8 core features" | High |
| Financial | "Payment failed, retry pending" | Medium |
| Support | "3 escalations in last 14 days" | High |

**Soft Gate:** Steps 1-3 complete model and scoring. Present summary and confirm before proceeding to interventions.

**Verify current best practices with web search:**
Search the web: "churn risk scoring methodology {date}"
Search the web: "explainable churn predictions {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into scoring calibration
- **P (Party Mode)**: Bring product and CS perspectives
- **C (Continue)**: Accept scoring and proceed to interventions
```

#### If 'C' (Continue):
- Save scoring system to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-design-interventions.md`

---

## Verification

- [ ] Risk levels defined
- [ ] Score components weighted
- [ ] Confidence scoring established
- [ ] Explanations documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Risk scoring specification
- Confidence framework
- Explanation templates

---

## Next Step

Proceed to `step-04-c-design-interventions.md` to design intervention strategies.
