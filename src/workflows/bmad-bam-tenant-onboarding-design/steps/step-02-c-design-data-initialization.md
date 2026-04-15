# Step 2: Design Data Initialization

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

Define the initial data that must be seeded for each new tenant.

---

## Prerequisites

- Provisioning stages defined (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-lifecycle`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Define the initial data that must be seeded for each new tenant:

---

## System Configuration Data
- Default feature flags for tenant tier
- Rate limit configurations
- Quota allocations per tier
- Default notification preferences

---

## Reference Data
- Available agent templates for tier
- Tool catalog visibility based on tier
- Integration connectors enabled by default
- Default workflow templates

---

## User Data
- Admin user with tenant_admin role
- Default team structure (if applicable)
- Initial API key generation rules

---

## AI Runtime Data
- Default agent configurations
- Initial system prompt templates
- Memory tier initialization (empty tenant memory bucket)
- Default safety guardrails

---

## Initialization Script Pattern

```
initialization_manifest:
  tier_overrides:
    FREE:
      agents_limit: 2
      tools_enabled: [basic_tools]
      memory_retention_days: 7
    PRO:
      agents_limit: 10
      tools_enabled: [basic_tools, advanced_tools]
      memory_retention_days: 30
    ENTERPRISE:
      agents_limit: unlimited
      tools_enabled: [all]
      memory_retention_days: 365
```

Ensure all initialization is idempotent and can be re-run without creating duplicates.

**Verify current best practices with web search:**
Search the web: "tenant data initialization tenant lifecycle {date}"
Search the web: "tenant data seeding multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the data initialization design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into initialization requirements and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for initialization review
- **C (Continue)**: Accept data initialization and proceed to tier defaults configuration
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass initialization context: system config, reference data, user data, AI runtime
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into data initialization design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review data initialization design: {summary of seeding requirements}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save data initialization design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-configure-tier-defaults.md`

---

## Soft Gate Checkpoint

**Steps 1-2 complete the provisioning foundation design.**

Present summary of:
- Provisioning stages and workflow definitions
- Data initialization requirements by category
- Tier-specific initialization manifests

Ask for confirmation before proceeding to tier defaults configuration.

---

## Verification

- [ ] System configuration data defined
- [ ] Reference data specified
- [ ] User data requirements documented
- [ ] AI runtime data initialized
- [ ] Tier overrides configured
- [ ] Idempotency ensured
- [ ] Patterns align with pattern registry

---

## Outputs

- Data initialization manifest
- Tier override configuration

---

## Next Step

Proceed to `step-03-c-configure-tier-defaults.md` to define tier-specific configurations.
