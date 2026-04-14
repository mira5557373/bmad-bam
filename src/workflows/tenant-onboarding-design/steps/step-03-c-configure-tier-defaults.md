# Step 3: Configure Tier Defaults

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

Define the default configurations for each tenant tier that are applied during provisioning.

---

## Prerequisites

- Data initialization designed (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: customization`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Define the default configurations for each tenant tier that are applied during provisioning:

---

## Tier Configuration Matrix

| Configuration | FREE | PRO | ENTERPRISE |
|---------------|------|-----|------------|
| Max Users | 5 | 50 | Unlimited |
| Max Agents | 2 | 10 | Unlimited |
| Max Concurrent Sessions | 3 | 20 | Custom |
| API Rate Limit (req/min) | 60 | 600 | Custom |
| Storage Quota | 1 GB | 50 GB | Custom |
| Memory Retention | 7 days | 30 days | 365 days |
| Vector Storage Limit | 100k embeddings | 1M embeddings | Custom |
| Support SLA | Community | 24h response | 4h response |

---

## Feature Flags by Tier

```yaml
tier_features:
  FREE:
    - basic_agents
    - standard_tools
    - community_support
  PRO:
    - basic_agents
    - advanced_agents
    - standard_tools
    - premium_tools
    - email_support
    - analytics_dashboard
  ENTERPRISE:
    - all_agent_types
    - all_tools
    - custom_integrations
    - dedicated_support
    - sso_integration
    - audit_logs
    - data_residency_selection
```

---

## Custom Configuration Overrides

For ENTERPRISE tier, define the override mechanism:
- Custom quota negotiation stored in tenant settings
- Override validation (cannot exceed platform limits)
- Override audit trail

**Soft Gate:** Present tier configuration matrix for confirmation before proceeding to isolation boundaries.

**Verify current best practices with web search:**
Search the web: "SaaS tier configuration tenant lifecycle {date}"
Search the web: "pricing tier defaults multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tier defaults above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into tier features and quota requirements
- **P (Party Mode)**: Bring analyst and architect perspectives for tier review
- **C (Continue)**: Accept tier defaults and proceed to isolation boundaries setup
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass tier context: configuration matrix, feature flags, overrides
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into tier defaults
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tier defaults: {summary of quotas and features}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tier defaults to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-setup-isolation-boundaries.md`

---

## Verification

- [ ] Tier configuration matrix complete
- [ ] Feature flags by tier defined
- [ ] Enterprise override mechanism specified
- [ ] Quotas and limits documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Tier configuration matrix
- Feature flags configuration

---

## Next Step

Proceed to `step-04-c-setup-isolation-boundaries.md` to establish tenant isolation.
