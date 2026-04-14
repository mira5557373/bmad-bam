# Step 4: Tenant-Tier SLAs

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

Define Service Level Agreements (SLAs) for each tenant tier that align with SLO targets, including availability commitments, latency guarantees, support response times, and breach remediation.

---

## Prerequisites

- Step 3 completed (error budget design)
- Tenant tier model from `tenant-model-isolation` workflow
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: tenant-tier`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: sla`

---


## Inputs

- Error budget design from Step 3
- Tenant tier definitions
- Business/commercial requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

- Define SLA commitments per tenant tier:
  | Metric | Enterprise | Pro | Free |
  |--------|------------|-----|------|
  | Availability | 99.99% | 99.9% | 99% |
  | API Latency P99 | 100ms | 200ms | Best effort |
  | Agent Latency P99 | 10s | 30s | 60s |
  | Support Response | 15 minutes | 4 hours | 24 hours |
  | Incident Resolution | 4 hours | 24 hours | Best effort |
  | Scheduled Downtime | 2h/month | 4h/month | 8h/month |
  | Data Durability | 99.999999% | 99.9999% | 99.99% |

- Map SLAs to SLOs:
  | SLA Commitment | Backing SLO | Buffer |
  |----------------|-------------|--------|
  | Enterprise 99.99% availability | api_availability 99.995% | 0.005% |
  | Pro 99.9% availability | api_availability 99.95% | 0.05% |
  | Free 99% availability | api_availability 99.5% | 0.5% |
  | Enterprise 100ms P99 latency | api_latency_p99 < 80ms | 20ms |

- Define SLA breach remediation:
  | Breach Type | Detection | Notification | Remediation |
  |-------------|-----------|--------------|-------------|
  | Availability < target | Automated SLO monitoring | Within 15 min | Service credit + RCA |
  | Latency > target | P99 threshold alert | Within 1 hour | Investigation + fix |
  | Support SLA breach | Ticket age monitoring | Immediate | Escalation + resolution |
  | Scheduled downtime exceeded | Maintenance window tracking | Post-incident | Service credit |

- Design tier-specific monitoring:
  | Tier | Monitoring | Alerting | Dashboard |
  |------|------------|----------|-----------|
  | Enterprise | Real-time, 1s resolution | Immediate PagerDuty | Dedicated per-tenant |
  | Pro | Near real-time, 1m resolution | 5-minute threshold | Shared with filtering |
  | Free | Standard, 5m resolution | Best effort | Self-service portal |

- Create SLA reporting:
  | Report | Enterprise | Pro | Free |
  |--------|------------|-----|------|
  | Uptime report | Monthly detailed | Monthly summary | Self-service |
  | Latency report | Weekly detailed | Monthly | None |
  | Incident report | Per incident | Aggregated monthly | None |
  | Service credits | Automatic | On request | None |

- Define service credit structure:
  | Availability | Enterprise Credit | Pro Credit |
  |--------------|-------------------|------------|
  | 99.99% - 99.9% | 10% of monthly | 5% of monthly |
  | 99.9% - 99.0% | 25% of monthly | 10% of monthly |
  | < 99.0% | 50% of monthly | 25% of monthly |

**Verify current best practices with web search:**
Search the web: "tenant-tier SLA patterns SaaS {date}"
Search the web: "SLA service credit structure {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tenant-tier SLAs design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into SLA commitments and service credits
- **P (Party Mode)**: Bring analyst and architect perspectives for SLA review
- **C (Continue)**: Accept tenant-tier SLAs and complete Create mode
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: SLA commitments, SLO mapping, service credits
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into SLA design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant-tier SLAs: {summary of commitments and remediation}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tenant-tier SLAs to output document
- Generate final sli-slo-definition.md
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Complete Create mode

---

## Verification

- [ ] SLA commitments defined per tier
- [ ] SLA to SLO mapping documented with buffer
- [ ] Breach remediation procedures defined
- [ ] Tier-specific monitoring configured
- [ ] SLA reporting cadence established
- [ ] Service credit structure documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant-tier SLA matrix
- SLA to SLO mapping
- Breach remediation procedures
- Monitoring configuration per tier
- Service credit structure
- **Save to:** `{output_folder}/planning-artifacts/architecture/sli-slo-definition.md`

---

## Workflow Complete

Create mode complete. The SLI/SLO definition is now available at:
`{output_folder}/planning-artifacts/architecture/sli-slo-definition.md`

Proceed to Edit mode to modify or Validate mode to check against QG-P1.
