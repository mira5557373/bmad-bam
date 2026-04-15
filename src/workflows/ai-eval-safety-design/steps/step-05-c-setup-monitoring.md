# Step 5: Setup Monitoring

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

Configure real-time monitoring for safety in production.

## Prerequisites

- Eval pipeline created (Step 4)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: observability
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: observability


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Configure real-time monitoring for safety in production:

## Monitoring Dimensions

**Safety Metrics:**
- Guardrail activation rate by type
- Content filter trigger frequency
- Prompt injection detection rate
- Kill switch activation events

**Quality Metrics:**
- Task success rate by agent type
- User satisfaction scores
- Hallucination reports
- Escalation frequency

**Operational Metrics:**
- Response latency percentiles
- Token usage by tenant
- Cost per task
- Error rates by category

## Alerting Configuration

Define alert thresholds and escalation:

| Metric | Warning | Critical | Escalation |
|--------|---------|----------|------------|
| Safety test failure rate | >5% | >10% | Oncall + Engineering Lead |
| Guardrail bypass attempts | >10/hour | >50/hour | Security Team |
| Kill switch activations | >1/day | >5/day | Platform Team |
| Tenant isolation violations | Any | - | Immediate page |

## Dashboards

Create dashboards for:
- Real-time safety status
- Trend analysis (hourly, daily, weekly)
- Per-tenant safety metrics
- Agent performance comparison
- Incident investigation

## Audit Logging

Configure comprehensive audit trails:
- All guardrail decisions
- Tool execution with inputs/outputs
- Memory access patterns
- Admin configuration changes
- Safety incident investigations

Output: Monitoring and alerting configuration with dashboard specifications.

**Verify current best practices with web search:**
Search the web: "AI safety monitoring AI agent patterns {date}"
Search the web: "AI safety monitoring LLM orchestration {date}"

_Source: [URL]_

## COLLABORATION MENUS (A/P/C):

After completing the monitoring setup above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into alerting thresholds, dashboard design, and audit requirements
- **P (Party Mode)**: Bring SRE Lead, Security Operations, and Compliance Officer perspectives
- **C (Continue)**: Accept monitoring configuration and complete Create mode
- **Adjust alerts**: Describe specific alerting or threshold concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: monitoring dimensions, alerting configuration, dashboard specs, audit logging
- Process enhanced insights
- Ask user: "Accept these refined monitoring configurations? (y/n)"
- If yes, integrate into monitoring document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review monitoring and alerting configuration for production AI safety"
- Process SRE Lead, Security Operations, Compliance Officer perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save monitoring configuration to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Submit for validation via quality gate QG-I3 (Agent Safety)

---

## Verification

- [ ] Safety metrics defined
- [ ] Quality metrics specified
- [ ] Operational metrics configured
- [ ] Alerting thresholds set
- [ ] Dashboards designed
- [ ] Audit logging configured
- [ ] Patterns align with pattern registry

## Outputs

- Monitoring configuration
- Alerting rules
- Dashboard specifications
- Audit logging configuration
- **Load template:** `{project-root}/_bmad/bam/data/templates/ai-eval-report-template.md`

## Next Step

Submit for validation via quality gate QG-I3 (Agent Safety).
