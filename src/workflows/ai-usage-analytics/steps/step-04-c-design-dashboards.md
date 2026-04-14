# Step 4: Design AI Analytics Dashboards

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

Design AI analytics dashboards for tenants and operators.

---

## Prerequisites

- Step 3 completed (Cost model defined)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

### 1. Tenant Dashboard Components

| Widget | Metrics | Visualization |
|--------|---------|---------------|
| Token Usage | Daily/Weekly tokens | Area chart |
| Cost Summary | Current period spend | KPI card |
| Latency | P50/P95/P99 | Line chart |
| Model Breakdown | Usage by model | Pie chart |

### 2. Operator Dashboard Components

| Widget | Metrics | Visualization |
|--------|---------|---------------|
| Platform Usage | Total tokens/day | Time series |
| Top Consumers | By tenant | Leaderboard |
| Error Rates | By model/tenant | Heatmap |
| Cost Analysis | By model/feature | Stacked bar |

### 3. Alerting Configuration

| Alert | Condition | Severity | Action |
|-------|-----------|----------|--------|
| Quota 80% | Usage > 80% quota | Warning | Notify tenant |
| Quota 100% | Usage = quota | Critical | Enforce limit |
| Latency Spike | P99 > 5x normal | Warning | Investigate |
| Error Spike | Error rate > 5% | Critical | Escalate |

### 4. Report Generation

| Report | Audience | Frequency | Content |
|--------|----------|-----------|---------|
| Usage Summary | Tenant | Weekly | Tokens, cost, trends |
| Cost Report | Tenant | Monthly | Detailed billing |
| Platform Health | Ops | Daily | System metrics |
| Executive | Leadership | Monthly | Business metrics |

**Verify current best practices with web search:**
Search the web: "AI usage dashboard design {date}"
Search the web: "LLM analytics visualization best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into dashboard design
- **P (Party Mode)**: Bring UX and analytics perspectives
- **C (Continue)**: Accept dashboards and complete Create mode
```

#### If 'C' (Continue):
- Save complete AI analytics design
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Output to: `{output_folder}/planning-artifacts/analytics/ai-usage-analytics-design.md`
- Create mode complete

---

## Verification

- [ ] Tenant dashboards defined
- [ ] Operator dashboards defined
- [ ] Alerting configured
- [ ] Reports scheduled
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete AI analytics design document
- Dashboard specifications
- Alerting configuration
- Report templates

---

## Next Step

Create mode complete. Based on outcome:
- **Success**: Proceed to implementation
- **Refinement needed**: Use Edit mode
- **Validation required**: Use Validate mode
