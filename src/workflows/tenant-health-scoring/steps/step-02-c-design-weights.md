# Step 2: Design Metric Weights

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

Design metric weights and normalization for composite health score.

---

## Prerequisites

- Step 1 completed (Health metrics defined)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

### 1. Category Weights

| Category | Weight | Rationale |
|----------|--------|-----------|
| Engagement | 35% | Strongest predictor of retention |
| Usage | 25% | Indicates value realization |
| Business | 25% | Revenue and growth signals |
| Support | 15% | Satisfaction indicator |

### 2. Metric Normalization

| Normalization | Formula | Use Case |
|---------------|---------|----------|
| Min-Max | (x - min) / (max - min) | Bounded metrics |
| Z-Score | (x - mean) / stddev | Unbounded metrics |
| Percentile | rank(x) / count | Comparative metrics |
| Log Scale | log(x + 1) / log(max + 1) | Skewed distributions |

### 3. Weight Adjustment Rules

| Condition | Adjustment | Impact |
|-----------|------------|--------|
| New tenant (<90 days) | Reduce business weight | Fair assessment |
| Enterprise tier | Increase support weight | SLA importance |
| Trial period | Focus on engagement | Conversion signal |
| At-risk flag | Double support weight | Retention focus |

### 4. Tier-Specific Weights

| Tier | Engagement | Usage | Business | Support |
|------|------------|-------|----------|---------|
| Free | 50% | 30% | 10% | 10% |
| Pro | 35% | 30% | 20% | 15% |
| Enterprise | 25% | 25% | 30% | 20% |

**Verify current best practices with web search:**
Search the web: "customer health score weighting best practices {date}"
Search the web: "SaaS health score normalization techniques {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into weight optimization
- **P (Party Mode)**: Bring product and data science perspectives
- **C (Continue)**: Accept weights and proceed to algorithm design
```

#### If 'C' (Continue):
- Save weights configuration to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design-algorithm.md`

---

## Verification

- [ ] Category weights sum to 100%
- [ ] Normalization methods assigned
- [ ] Adjustment rules defined
- [ ] Tier variations documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Weight configuration
- Normalization strategy
- Tier-specific variations

---

## Next Step

Proceed to `step-03-c-design-algorithm.md` to design scoring algorithm.
