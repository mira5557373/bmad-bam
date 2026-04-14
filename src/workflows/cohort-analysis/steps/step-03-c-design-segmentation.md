# Step 3: Design Behavior Segmentation

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

Design behavioral segmentation for actionable insights.

---

## Prerequisites

- Step 2 completed (Retention designed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

### 1. Behavioral Segments

| Segment | Criteria | Size Target |
|---------|----------|-------------|
| Champions | High usage, high value | 10-15% |
| Loyalists | Consistent, engaged | 20-25% |
| Potential | Growing engagement | 15-20% |
| New | Recent, learning | 10-15% |
| At Risk | Declining engagement | 10-15% |
| Hibernating | Low recent activity | 15-20% |

### 2. Segment Scoring

| Factor | Weight | Calculation |
|--------|--------|-------------|
| Recency | 30% | Days since last activity |
| Frequency | 30% | Sessions per period |
| Monetary | 20% | Revenue contribution |
| Engagement | 20% | Feature depth |

### 3. Segment Actions

| Segment | Goal | Primary Action |
|---------|------|----------------|
| Champions | Retain | VIP program, advocacy |
| Loyalists | Maintain | Feature education |
| Potential | Grow | Upsell, expand |
| New | Activate | Onboarding |
| At Risk | Recover | Re-engagement |
| Hibernating | Reactivate | Win-back campaign |

### 4. Segment Reporting

| Report | Audience | Frequency |
|--------|----------|-----------|
| Segment Distribution | Product | Weekly |
| Movement Analysis | Growth | Monthly |
| Cohort x Segment | Analytics | Quarterly |
| Executive Summary | Leadership | Monthly |

**Verify current best practices with web search:**
Search the web: "customer segmentation strategies SaaS {date}"
Search the web: "RFM analysis B2B {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into segmentation
- **P (Party Mode)**: Bring marketing and CS perspectives
- **C (Continue)**: Accept segmentation and complete Create mode
```

#### If 'C' (Continue):
- Save complete cohort analysis design
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Output to: `{output_folder}/planning-artifacts/analytics/cohort-analysis-design.md`
- Create mode complete

---

## Verification

- [ ] Segments defined with criteria
- [ ] Scoring model documented
- [ ] Actions per segment
- [ ] Reporting scheduled
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete cohort analysis design document
- Segmentation model
- Action playbooks
- Reporting schedule
- **Load template:** `{project-root}/_bmad/bam/templates/revenue-analytics-template.md`

---

## Next Step

Create mode complete. Based on outcome:
- **Success**: Proceed to implementation
- **Refinement needed**: Use Edit mode
- **Validation required**: Use Validate mode
