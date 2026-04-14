# Step 1: Define Health Metrics

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

Define comprehensive input metrics for tenant health scoring algorithm.

---

## Prerequisites

- Tenant health monitoring design exists
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

### 1. Engagement Metrics

| Metric | Definition | Range | Collection |
|--------|------------|-------|------------|
| DAU/MAU Ratio | Daily/Monthly active users | 0-1 | Daily |
| Session Duration | Average session length | Minutes | Real-time |
| Feature Breadth | Unique features used | Count | Weekly |
| Login Frequency | Logins per period | Count | Daily |

### 2. Usage Metrics

| Metric | Definition | Range | Collection |
|--------|------------|-------|------------|
| API Utilization | Calls vs quota | 0-100% | Real-time |
| Storage Usage | GB used vs allocated | 0-100% | Hourly |
| Compute Usage | CPU/memory consumption | 0-100% | Real-time |
| Agent Executions | Successful AI runs | Count | Real-time |

### 3. Business Metrics

| Metric | Definition | Range | Collection |
|--------|------------|-------|------------|
| Revenue Growth | MoM revenue change | Percent | Monthly |
| Expansion Revenue | Upsell/cross-sell | Currency | Monthly |
| Contract Value | ACV/TCV | Currency | Monthly |
| Payment Health | On-time payments | 0-100% | Monthly |

### 4. Support Metrics

| Metric | Definition | Range | Collection |
|--------|------------|-------|------------|
| Ticket Volume | Open tickets | Count | Daily |
| Resolution Time | Avg ticket resolution | Hours | Daily |
| Escalation Rate | Escalated vs total | 0-100% | Weekly |
| NPS Score | Net promoter score | -100-100 | Quarterly |

**Verify current best practices with web search:**
Search the web: "customer health score metrics SaaS {date}"
Search the web: "tenant health indicators multi-tenant {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing metrics definition, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into metric selection and definitions
- **P (Party Mode)**: Bring data science and customer success perspectives
- **C (Continue)**: Accept metrics and proceed to weight design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save metrics catalog to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-weights.md`

---

## Verification

- [ ] Engagement metrics defined
- [ ] Usage metrics identified
- [ ] Business metrics established
- [ ] Support metrics included
- [ ] Patterns align with pattern registry

---

## Outputs

- Health metrics catalog
- Metric definitions with ranges
- Collection strategy per metric

---

## Next Step

Proceed to `step-02-c-design-weights.md` to design metric weights.
