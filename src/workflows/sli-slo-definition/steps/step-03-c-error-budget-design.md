# Step 3: Error Budget Design

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

Design error budget policies that balance reliability investments with feature velocity, including consumption tracking, exhaustion procedures, and reporting mechanisms.

---

## Prerequisites

- Step 2 completed (SLO targets set)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: sre`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: error-budget`

---


## Inputs

- SLO targets from Step 2
- Development velocity requirements
- Risk tolerance per service
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

- Calculate error budgets from SLO targets:
  | SLO | Target | Error Budget (30d) | Minutes/Month |
  |-----|--------|-------------------|---------------|
  | api_availability | 99.9% | 0.1% | 43.2 minutes |
  | api_availability | 99.95% | 0.05% | 21.6 minutes |
  | api_availability | 99.99% | 0.01% | 4.32 minutes |
  | auth_availability | 99.95% | 0.05% | 21.6 minutes |
  | agent_success_rate | 99% | 1% | 432 minutes |

- Design error budget consumption policies:
  | Budget Level | Status | Development Policy | Reliability Policy |
  |--------------|--------|-------------------|-------------------|
  | > 50% remaining | Healthy | Normal feature releases | Standard maintenance |
  | 25-50% remaining | Caution | Risk assessment required | Reliability focus |
  | 10-25% remaining | Warning | Reduced releases, stability focus | Incident reviews |
  | < 10% remaining | Critical | Feature freeze | All hands on reliability |
  | 0% (exhausted) | Emergency | Complete freeze | Emergency remediation |

- Define error budget exhaustion procedures:
  1. **Notification:** Alert leadership and engineering
  2. **Feature freeze:** No new deployments except hotfixes
  3. **Root cause analysis:** Mandatory incident review
  4. **Remediation plan:** Document and prioritize fixes
  5. **Recovery criteria:** Define what restores budget

- Create error budget reporting:
  | Report | Frequency | Audience | Content |
  |--------|-----------|----------|---------|
  | Daily SLO status | Daily | Engineering | Current budget, burn rate |
  | Weekly SLO report | Weekly | Leadership | Budget trends, incidents |
  | Monthly SLO review | Monthly | Executive | SLA compliance, budget history |
  | Incident impact | Per incident | SRE + Eng | Budget consumption per incident |

- Design error budget dashboard:
  - Current error budget remaining (%)
  - Budget consumption rate (burn rate)
  - Historical budget trend (30-day)
  - Projected exhaustion date
  - Top budget consumers (services/incidents)

**Soft Gate:** Steps 1-3 complete the SLI/SLO foundation. Present a summary of SLIs, SLO targets, and error budget policies. Ask for confirmation before proceeding to tenant-tier SLAs.

**Verify current best practices with web search:**
Search the web: "error budget policy design {date}"
Search the web: "SRE error budget exhaustion procedures {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the error budget design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into consumption policies and exhaustion procedures
- **P (Party Mode)**: Bring analyst and architect perspectives for error budget review
- **C (Continue)**: Accept error budget design and proceed to tenant-tier SLAs
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: error budgets, consumption policies, exhaustion procedures
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into error budget design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review error budget design: {summary of budgets, policies, and reporting}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save error budget design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-tenant-tier-slas.md`

---

## Verification

- [ ] Error budgets calculated for all SLOs
- [ ] Consumption policies defined per budget level
- [ ] Exhaustion procedures documented
- [ ] Reporting cadence established
- [ ] Dashboard design complete
- [ ] Patterns align with pattern registry

---

## Outputs

- Error budget calculations
- Consumption policy matrix
- Exhaustion procedure document
- Reporting schedule
- Dashboard specification

---

## Next Step

Proceed to `step-04-c-tenant-tier-slas.md` to define tenant-tier-specific SLAs.
