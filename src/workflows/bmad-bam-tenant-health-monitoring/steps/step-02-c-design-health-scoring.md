# Step 2: Design Health Scoring

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

Design composite health score algorithm for tenant assessment.

---

## Prerequisites

- Step 1 completed (Health metrics defined)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: observability`

---

## Actions

### 1. Define Scoring Components

| Component | Weight | Score Range | Calculation |
|-----------|--------|-------------|-------------|
| Availability | 40% | 0-100 | (Uptime% - 99) * 100, capped |
| Performance | 30% | 0-100 | Based on latency percentiles |
| Usage Health | 20% | 0-100 | Engagement + growth trend |
| Support Health | 10% | 0-100 | Ticket volume inverse |

### 2. Score Calculation Algorithm

```
Health Score = 
  (Availability * 0.40) +
  (Performance * 0.30) +
  (Usage * 0.20) +
  (Support * 0.10)
```

### 3. Health Status Mapping

| Score Range | Status | Color | Action |
|-------------|--------|-------|--------|
| 90-100 | Excellent | Green | Monitor |
| 75-89 | Good | Blue | Monitor |
| 60-74 | Fair | Yellow | Investigate |
| 40-59 | Poor | Orange | Intervene |
| 0-39 | Critical | Red | Urgent action |

### 4. Trend Analysis

| Trend | Condition | Significance |
|-------|-----------|--------------|
| Improving | +5 points/week | Positive |
| Stable | +/- 5 points | Neutral |
| Declining | -5 points/week | Concern |
| Rapid decline | -10 points/week | Urgent |

**Soft Gate:** Steps 1-2 complete metrics and scoring. Present summary and confirm before proceeding to alerting design.

**Verify current best practices with web search:**
Search the web: "customer health score algorithms SaaS {date}"
Search the web: "tenant health scoring best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into scoring weights and thresholds
- **P (Party Mode)**: Bring product and customer success perspectives
- **C (Continue)**: Accept scoring algorithm and proceed to alerting
```

#### If 'C' (Continue):
- Save scoring algorithm to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design-alerting.md`

---

## Verification

- [ ] Scoring components defined
- [ ] Algorithm documented
- [ ] Status mapping established
- [ ] Trend analysis included
- [ ] Patterns align with pattern registry

---

## Outputs

- Scoring algorithm
- Status definitions
- Trend thresholds

---

## Next Step

Proceed to `step-03-c-design-alerting.md` to design alerting strategy.
