# Step 2: SLO Target Setting

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

Set Service Level Objective (SLO) targets for each SLI, define measurement windows, establish burn rate thresholds, and create alerting rules for SLO breaches.

---

## Prerequisites

- Step 1 completed (SLI identification)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: sre`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: alerting`

---


## Inputs

- SLI definitions from Step 1
- Historical performance data (if available)
- Business requirements for reliability
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

- Set SLO targets per SLI:
  | SLI | SLO Target | Measurement Window | Rationale |
  |-----|------------|-------------------|-----------|
  | api_availability | 99.9% | 30-day rolling | Business-critical availability |
  | api_latency_p99 | < 500ms | 30-day rolling | User experience threshold |
  | auth_availability | 99.95% | 30-day rolling | Security-critical service |
  | auth_latency_p95 | < 200ms | 30-day rolling | Login experience |
  | agent_success_rate | 99% | 30-day rolling | AI service reliability |
  | agent_latency_p99 | < 30s | 30-day rolling | Long-running AI operations |
  | db_availability | 99.99% | 30-day rolling | Data layer criticality |
  | queue_throughput | > 1000/s | 1-hour average | Message processing capacity |

- Define measurement windows:
  | Window Type | Duration | Use Case |
  |-------------|----------|----------|
  | Rolling | 30 days | Standard SLO measurement |
  | Calendar | Monthly | Billing/SLA alignment |
  | Short-term | 1 hour | Burn rate alerting |

- Establish burn rate thresholds:
  | Burn Rate | Severity | Alert Threshold | Action |
  |-----------|----------|-----------------|--------|
  | 14.4x | Critical | 2% budget in 1h | Page on-call immediately |
  | 6x | High | 5% budget in 6h | Alert with auto-escalation |
  | 3x | Medium | 10% budget in 24h | Alert during business hours |
  | 1x | Low | Normal consumption | No alert |

- Create alerting rules:
  | Alert Name | Condition | Severity | Notification |
  |------------|-----------|----------|--------------|
  | `slo_api_availability_critical` | burn_rate > 14.4x for 5m | Critical | PagerDuty + Slack |
  | `slo_api_availability_high` | burn_rate > 6x for 30m | High | Slack + Email |
  | `slo_api_latency_p99_breach` | p99 > target for 15m | Warning | Slack |
  | `error_budget_exhausted` | budget <= 0 | Critical | PagerDuty + Leadership |

**Verify current best practices with web search:**
Search the web: "SLO target setting best practices {date}"
Search the web: "burn rate alerting SRE {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the SLO target setting above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into target selection and alerting thresholds
- **P (Party Mode)**: Bring analyst and architect perspectives for SLO review
- **C (Continue)**: Accept SLO targets and proceed to error budget design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: SLO targets, burn rates, alerting rules
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into SLO targets
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review SLO targets: {summary of targets, windows, and alerting}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save SLO targets to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-error-budget-design.md`

---

## Verification

- [ ] SLO targets set for all SLIs
- [ ] Measurement windows defined
- [ ] Burn rate thresholds established
- [ ] Alerting rules created
- [ ] Patterns align with pattern registry

---

## Outputs

- SLO target matrix
- Measurement window configuration
- Burn rate threshold definitions
- Alerting rule specifications

---

## Next Step

Proceed to `step-03-c-error-budget-design.md` to design error budget policies.
