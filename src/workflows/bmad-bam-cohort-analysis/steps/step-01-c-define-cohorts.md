# Step 1: Define Cohort Dimensions

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

Define cohort dimensions and grouping criteria for analysis.

---

## Prerequisites

- Tenant health scoring design exists
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

### 1. Time-Based Cohorts

| Cohort Type | Definition | Granularity |
|-------------|------------|-------------|
| Signup Month | Month of first signup | Monthly |
| Signup Week | Week of first signup | Weekly |
| Activation Date | First meaningful action | Daily |
| First Purchase | First paid conversion | Monthly |

### 2. Acquisition Cohorts

| Cohort Type | Definition | Example |
|-------------|------------|---------|
| Channel | Acquisition source | Organic, Paid, Referral |
| Campaign | Marketing campaign | Q1 Launch, Summer Promo |
| Region | Geographic region | NA, EMEA, APAC |
| Industry | Customer industry | Tech, Finance, Healthcare |

### 3. Behavior Cohorts

| Cohort Type | Definition | Segments |
|-------------|------------|----------|
| Usage Tier | Usage intensity | Heavy, Medium, Light |
| Feature Set | Features adopted | Core, Advanced, Power |
| Engagement | Activity level | Daily, Weekly, Monthly |
| Growth Rate | Expansion velocity | Growing, Stable, Declining |

### 4. Value Cohorts

| Cohort Type | Definition | Segments |
|-------------|------------|----------|
| Revenue Tier | ARR/MRR band | Enterprise, Mid, SMB |
| LTV Potential | Predicted lifetime value | High, Medium, Low |
| Contract Type | Agreement type | Annual, Monthly, Trial |
| Expansion | Upsell status | Expanded, Flat, Contracted |

**Verify current best practices with web search:**
Search the web: "SaaS cohort analysis dimensions {date}"
Search the web: "customer segmentation cohorts {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing cohort definition, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into cohort definitions
- **P (Party Mode)**: Bring product and analytics perspectives
- **C (Continue)**: Accept cohorts and proceed to retention design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save cohort definitions to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-retention.md`

---

## Verification

- [ ] Time-based cohorts defined
- [ ] Acquisition cohorts identified
- [ ] Behavior cohorts established
- [ ] Value cohorts included
- [ ] Patterns align with pattern registry

---

## Outputs

- Cohort dimension catalog
- Grouping criteria
- Segmentation strategy

---

## Next Step

Proceed to `step-02-c-design-retention.md` to design retention analysis.
