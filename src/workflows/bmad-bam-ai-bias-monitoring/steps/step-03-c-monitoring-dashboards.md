# Step 3: Monitoring Dashboards

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Design fairness monitoring dashboards and alerting systems.

## Prerequisites

- Detection methods designed (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: observability, tenant-analytics
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: llm-observability

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Design fairness monitoring dashboards:

## Real-Time Bias Metrics Dashboard

**Overview Panel:**
- Overall fairness score (composite metric)
- Bias incident count (last 24h/7d/30d)
- Protected group distribution
- System health indicators

**Per-Metric Visualization:**
| Metric | Visualization | Update Frequency |
|--------|---------------|------------------|
| Demographic Parity | Bar chart by group | 15 minutes |
| Equal Opportunity | Heatmap | 15 minutes |
| Calibration | Line chart | Hourly |
| Counterfactual | Scatter plot | Daily |

**Drill-Down Capabilities:**
- By protected attribute
- By model/agent
- By tenant (enterprise tier)
- By time period

## Trend Analysis Dashboard

**Historical Views:**
- 7-day rolling fairness metrics
- 30-day trend lines
- Month-over-month comparisons
- Before/after model updates

**Regression Detection:**
- Automatic baseline comparison
- Statistical significance testing
- Model version correlation

## Per-Tenant Fairness Reports

**Tenant Dashboard Access:**
| Tier | Dashboard Access | Export | Custom Metrics |
|------|------------------|--------|----------------|
| FREE | Basic summary | No | No |
| PRO | Full dashboard | PDF | Limited |
| ENTERPRISE | Full + custom | All formats | Yes |

**Report Contents:**
- Fairness summary for tenant's usage
- Comparison to platform baseline
- Trend analysis
- Recommendations

## Alert Configuration

**Threshold Alerts:**
| Severity | Trigger | Response Time | Notification |
|----------|---------|---------------|--------------|
| Critical | Metric < 0.7 | Immediate | PagerDuty + SMS |
| High | Metric < 0.8 | 15 minutes | Slack + Email |
| Medium | Metric < 0.9 | 1 hour | Email |
| Low | Metric declining | Daily | Dashboard flag |

**Alert Routing:**
- AI Ethics team for critical
- ML Engineering for high
- Product team for medium/low
- Tenant notification (enterprise) optional

Output: Monitoring dashboard specifications with alert configurations.

**Verify current best practices with web search:**
Search the web: "AI fairness monitoring dashboard design {date}"
Search the web: "ML model bias alerting best practices {date}"

_Source: [URL]_

## COLLABORATION MENUS (A/P/C):

After completing the monitoring dashboards design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into dashboard UX and alert tuning
- **P (Party Mode)**: Bring UX Designer, SRE Engineer, and AI Ethics Lead perspectives
- **C (Continue)**: Accept monitoring design and proceed to Step 4: Remediation Workflows
- **Refine dashboards**: Describe specific visualization concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: dashboard panels, alert thresholds, tenant access
- Process enhanced insights
- Ask user: "Accept these refined dashboard specifications? (y/n)"
- If yes, integrate into dashboard document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review fairness monitoring dashboard design for AI bias detection"
- Process UX Designer, SRE Engineer, AI Ethics Lead perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save monitoring dashboards to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-remediation-workflows.md`

---

## Verification

- [ ] Real-time dashboard designed
- [ ] Trend analysis specified
- [ ] Per-tenant reports documented
- [ ] Alert thresholds configured
- [ ] Alert routing established
- [ ] Patterns align with pattern registry

## Outputs

- Monitoring dashboard specifications
- Alert configurations
- **Load template:** `{project-root}/_bmad/bam/data/templates/fairness-dashboard-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/ai-transparency-report-template.md`

## Next Step

Proceed to `step-04-c-remediation-workflows.md` to design bias incident response.
