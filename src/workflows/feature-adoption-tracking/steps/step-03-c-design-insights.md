# Step 3: Design Insights and Recommendations

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

Design automated insights and recommendations engine.

---

## Prerequisites

- Step 2 completed (Metrics designed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

### 1. Insight Types

| Insight | Detection | Action |
|---------|-----------|--------|
| Low Adoption | <20% after 30 days | In-app guidance |
| Funnel Drop | >50% drop at stage | UX investigation |
| Hidden Gem | High value, low awareness | Feature promotion |
| Underperformer | Low engagement despite exposure | Deprecation review |

### 2. Recommendation Engine

| Signal | Recommendation | Delivery |
|--------|---------------|----------|
| Feature underuse | "Try X feature" | In-app tooltip |
| Similar users | "Users like you use Y" | Dashboard card |
| Upgrade opportunity | "Z available in Pro" | Upsell prompt |
| New feature | "Check out new W" | Announcement |

### 3. A/B Test Integration

| Test Type | Purpose | Metrics |
|-----------|---------|---------|
| Feature Flag | Gradual rollout | Adoption, errors |
| UI Variant | Design optimization | Activation rate |
| Onboarding | Activation improvement | Time to value |
| Messaging | Communication | Click-through |

### 4. Reporting Dashboard

| Widget | Audience | Refresh |
|--------|----------|---------|
| Adoption Overview | Product | Real-time |
| Feature Leaderboard | All | Daily |
| Funnel Analysis | Product | Weekly |
| Trend Reports | Leadership | Monthly |

**Verify current best practices with web search:**
Search the web: "feature recommendation engine SaaS {date}"
Search the web: "product-led growth insights {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into insights design
- **P (Party Mode)**: Bring product and ML perspectives
- **C (Continue)**: Accept insights and complete Create mode
```

#### If 'C' (Continue):
- Save complete adoption tracking design
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Output to: `{output_folder}/planning-artifacts/analytics/feature-adoption-tracking-design.md`
- Create mode complete

---

## Verification

- [ ] Insight types defined
- [ ] Recommendations engine designed
- [ ] A/B testing integrated
- [ ] Dashboard specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete adoption tracking design document
- Insight specifications
- Recommendation rules
- Dashboard wireframes

---

## Next Step

Create mode complete. Based on outcome:
- **Success**: Proceed to implementation
- **Refinement needed**: Use Edit mode
- **Validation required**: Use Validate mode
