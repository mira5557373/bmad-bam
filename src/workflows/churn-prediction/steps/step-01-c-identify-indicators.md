# Step 1: Identify Churn Indicators

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

Identify leading indicators that predict tenant churn.

---

## Prerequisites

- Tenant health scoring design exists
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

### 1. Engagement Indicators

| Indicator | Signal | Lead Time | Weight |
|-----------|--------|-----------|--------|
| Login Decline | -50% logins over 2 weeks | 45 days | High |
| Session Drop | -30% session duration | 30 days | High |
| Feature Abandonment | Key features unused 14d | 60 days | Medium |
| API Silence | No API calls 7 days | 21 days | Critical |

### 2. Usage Indicators

| Indicator | Signal | Lead Time | Weight |
|-----------|--------|-----------|--------|
| Quota Underuse | <20% quota utilized | 90 days | Medium |
| Storage Stagnant | No growth 30 days | 60 days | Low |
| Agent Decline | -40% AI executions | 30 days | High |
| Export Spike | Data export > 2x normal | 14 days | Critical |

### 3. Financial Indicators

| Indicator | Signal | Lead Time | Weight |
|-----------|--------|-----------|--------|
| Payment Failure | 2+ consecutive failures | 7 days | Critical |
| Downgrade Request | Tier downgrade initiated | 30 days | High |
| Contract Renewal Risk | <60 days to renewal, no engagement | 60 days | High |
| Expansion Reversal | Remove add-ons/seats | 14 days | Medium |

### 4. Support Indicators

| Indicator | Signal | Lead Time | Weight |
|-----------|--------|-----------|--------|
| Complaint Spike | 3+ complaints in 7 days | 14 days | High |
| NPS Drop | -20 pts NPS decline | 90 days | Medium |
| Escalation Rate | >2 escalations/month | 30 days | High |
| Competitor Mention | Competitor in support tickets | 7 days | Critical |

**Verify current best practices with web search:**
Search the web: "SaaS churn leading indicators {date}"
Search the web: "customer churn prediction signals {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing indicator identification, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into indicator selection and validation
- **P (Party Mode)**: Bring data science and customer success perspectives
- **C (Continue)**: Accept indicators and proceed to model design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save indicators catalog to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-model.md`

---

## Verification

- [ ] Engagement indicators defined
- [ ] Usage indicators identified
- [ ] Financial indicators established
- [ ] Support indicators included
- [ ] Patterns align with pattern registry

---

## Outputs

- Churn indicators catalog
- Lead time estimates
- Weight assignments

---

## Next Step

Proceed to `step-02-c-design-model.md` to design prediction model.
