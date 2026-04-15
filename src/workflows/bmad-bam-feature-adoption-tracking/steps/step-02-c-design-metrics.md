# Step 2: Design Adoption Metrics

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

Design adoption metrics and activation funnels.

---

## Prerequisites

- Step 1 completed (Catalog defined)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

### 1. Adoption Metrics

| Metric | Definition | Calculation |
|--------|------------|-------------|
| Adoption Rate | % tenants using feature | Users w/ feature / Total |
| Activation Rate | % completing setup | Activated / Exposed |
| Depth | Usage intensity | Actions per user |
| Breadth | Feature spread | Features used / Available |

### 2. Activation Funnel

| Stage | Definition | Target |
|-------|------------|--------|
| Exposed | Saw feature | 100% |
| Interested | Clicked/explored | 50% |
| Activated | Completed setup | 30% |
| Adopted | Regular use | 20% |
| Power User | Advanced use | 5% |

### 3. Time-to-Value Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| Time to First Use | Days to first action | < 1 day |
| Time to Activation | Days to complete setup | < 7 days |
| Time to Value | Days to meaningful use | < 14 days |
| Time to Habit | Days to regular use | < 30 days |

### 4. Feature Success Metrics

| Metric | Purpose | Threshold |
|--------|---------|-----------|
| Stickiness | Daily/Monthly active | > 30% |
| Retention Impact | Correlation w/ retention | Positive |
| Revenue Impact | ARPU contribution | > $X |
| NPS Impact | Satisfaction driver | > 50 NPS |

**Verify current best practices with web search:**
Search the web: "feature adoption metrics SaaS {date}"
Search the web: "product activation funnel best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into metrics design
- **P (Party Mode)**: Bring product and growth perspectives
- **C (Continue)**: Accept metrics and proceed to insights design
```

#### If 'C' (Continue):
- Save adoption metrics to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design-insights.md`

---

## Verification

- [ ] Adoption metrics defined
- [ ] Funnel designed
- [ ] Time-to-value tracked
- [ ] Success criteria established
- [ ] Patterns align with pattern registry

---

## Outputs

- Adoption metrics specification
- Activation funnel design
- Success criteria

---

## Next Step

Proceed to `step-03-c-design-insights.md` to design insights and recommendations.
