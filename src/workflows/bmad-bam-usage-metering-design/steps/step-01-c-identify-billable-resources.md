# Step 1: Identify Billable Resources

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

Define all resources that contribute to tenant billing.

---

## Prerequisites

- Tenant model defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: usage-metering`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`

---


## Inputs

- User requirements and constraints for usage metering design
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

Define all resources that contribute to tenant billing:

## Resource Categories

### Compute Resources
| Resource | Unit | Measurement Method | Billing Frequency |
|----------|------|-------------------|-------------------|
| API Requests | count | Request counter | Monthly |
| Agent Invocations | count | Invocation counter | Monthly |
| Background Job Execution | seconds | Job duration | Monthly |
| WebSocket Connections | connection-hours | Connection time | Monthly |

### AI/ML Resources
| Resource | Unit | Measurement Method | Billing Frequency |
|----------|------|-------------------|-------------------|
| LLM Input Tokens | tokens | Token counter | Monthly |
| LLM Output Tokens | tokens | Token counter | Monthly |
| Vector Operations | count | Operation counter | Monthly |
| Embedding Generation | count | Embedding counter | Monthly |

### Storage Resources
| Resource | Unit | Measurement Method | Billing Frequency |
|----------|------|-------------------|-------------------|
| File Storage | GB-months | Daily snapshot average | Monthly |
| Vector Storage | vectors | Vector count | Monthly |
| Database Storage | GB-months | Daily snapshot average | Monthly |
| Cache Usage | GB-hours | Hourly sampling | Monthly |

### Network Resources
| Resource | Unit | Measurement Method | Billing Frequency |
|----------|------|-------------------|-------------------|
| Data Egress | GB | Transfer counter | Monthly |
| Webhook Calls | count | Call counter | Monthly |

## Tier-Based Inclusions

```yaml
tier_inclusions:
  FREE:
    api_requests: 10000/month
    agent_invocations: 100/month
    llm_tokens: 100000/month
    file_storage_gb: 1
    vector_storage: 100000
    
  PRO:
    api_requests: 100000/month
    agent_invocations: 1000/month
    llm_tokens: 1000000/month
    file_storage_gb: 50
    vector_storage: 1000000
    
  ENTERPRISE:
    # Custom negotiated limits
    api_requests: custom
    agent_invocations: custom
    llm_tokens: custom
    file_storage_gb: custom
    vector_storage: custom
```

## Overage Pricing (PRO Tier)

```yaml
overage_pricing:
  api_requests: $0.001/1000 requests
  agent_invocations: $0.01/invocation
  llm_input_tokens: $0.002/1000 tokens
  llm_output_tokens: $0.008/1000 tokens
  file_storage_gb: $0.10/GB-month
  vector_storage: $0.01/10000 vectors
  data_egress_gb: $0.05/GB
```

## Resource Attribution Rules

```yaml
attribution:
  # Primary attribution by tenant_id
  primary_key: tenant_id
  
  # Secondary attribution for cost allocation
  secondary_keys:
    - agent_id (for agent-level billing)
    - user_id (for user-level reporting)
    - project_id (if multi-project)
    
  # Shared resource allocation
  shared_resources:
    - platform_overhead: distributed by usage ratio
    - infrastructure_base: flat per-tenant fee
```

## Non-Billable Resources

Resources tracked but not billed:
- Platform health checks
- Admin API calls
- System-initiated background jobs
- Metrics/logs/traces collection
- Internal service-to-service calls

**Verify current best practices with web search:**
Search the web: "identify billable resources best practices {date}"
Search the web: "identify billable resources enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the billable resource identification above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into resource identification using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for resource analysis
- **C (Continue)**: Accept resource definitions and proceed to metering event design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass resource context: categories identified, attribution rules
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into resource summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review billable resource identification for usage metering: {summary of resources and tiers}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save resource summary to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-metering-events.md`

---

## Verification

- [ ] Resource categories identified
- [ ] Measurement methods defined
- [ ] Tier inclusions specified
- [ ] Overage pricing documented
- [ ] Attribution rules established
- [ ] Patterns align with pattern registry

---

## Outputs

- Billable resources catalog
- Tier inclusion matrix
- Overage pricing table
- **Load template:** `{project-root}/_bmad/bam/data/templates/usage-metering-design-template.md`

---

## Next Step

Proceed to `step-02-c-design-metering-events.md` to design the event schema.
