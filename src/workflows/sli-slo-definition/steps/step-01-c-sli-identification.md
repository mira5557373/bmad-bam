# Step 1: SLI Identification

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

Identify and define Service Level Indicators (SLIs) that measure the reliability and performance of critical user-facing services in the multi-tenant platform.

---

## Prerequisites

- Master architecture approved
- Observability infrastructure designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: observability`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: sre`

---


## Inputs

- User requirements and service criticality
- Master architecture document
- Observability design document
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

- Identify SLI categories per service:
  | Category | Description | Example Metric |
  |----------|-------------|----------------|
  | Availability | Service is operational | Successful requests / Total requests |
  | Latency | Response time | P50, P95, P99 response time |
  | Throughput | Request volume | Requests per second |
  | Error rate | Failure frequency | Errors / Total requests |
  | Correctness | Data accuracy | Valid responses / Total responses |

- Define SLI specification for each service:
  | Service | SLI Name | Type | Measurement |
  |---------|----------|------|-------------|
  | API Gateway | `api_availability` | Availability | HTTP 2xx,3xx / Total HTTP |
  | API Gateway | `api_latency_p99` | Latency | P99(response_time) |
  | Auth Service | `auth_availability` | Availability | Successful auth / Total auth |
  | Auth Service | `auth_latency_p95` | Latency | P95(auth_time) |
  | AI Agent | `agent_success_rate` | Correctness | Successful runs / Total runs |
  | AI Agent | `agent_latency_p99` | Latency | P99(run_time) |
  | Database | `db_availability` | Availability | Successful queries / Total queries |
  | Message Queue | `queue_throughput` | Throughput | Messages processed / second |

- Map SLIs to user journeys:
  | User Journey | Critical SLIs | Impact on User |
  |--------------|---------------|----------------|
  | Login flow | auth_availability, auth_latency_p95 | User cannot access platform |
  | API request | api_availability, api_latency_p99 | Application slowness |
  | Agent execution | agent_success_rate, agent_latency_p99 | AI features unavailable |
  | Data retrieval | db_availability | Data access failures |

- Define SLI measurement methodology:
  - **Ratio-based SLIs:** good_events / total_events (availability, error rate)
  - **Histogram-based SLIs:** percentile of distribution (latency)
  - **Count-based SLIs:** events per time window (throughput)

**Verify current best practices with web search:**
Search the web: "SLI identification best practices {date}"
Search the web: "service level indicators multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the SLI identification above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into SLI selection and measurement methodology
- **P (Party Mode)**: Bring analyst and architect perspectives for SLI review
- **C (Continue)**: Accept SLI definitions and proceed to SLO target setting
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass model context: SLI categories, service mappings, measurement methods
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into SLI definitions
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review SLI identification: {summary of SLIs and user journey mappings}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save SLI definitions to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-slo-target-setting.md`

---

## Verification

- [ ] SLI categories defined for all critical services
- [ ] SLI specifications complete with measurement methodology
- [ ] User journey to SLI mapping documented
- [ ] Measurement methodology defined (ratio, histogram, count)
- [ ] Patterns align with pattern registry

---

## Outputs

- SLI catalog per service
- User journey SLI mapping
- Measurement methodology documentation
- **Load template:** `{project-root}/_bmad/bam/templates/sli-slo-template.md`

---

## Next Step

Proceed to `step-02-c-slo-target-setting.md` to set SLO targets and measurement windows.
