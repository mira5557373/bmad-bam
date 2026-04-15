# Step 1: Tenant Model Definition

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

Define the core tenant entity structure, tier model, and lifecycle states that govern multi-tenant behavior across the platform.

---

## Prerequisites

- Master architecture approved or in progress
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: event-driven`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: experimentation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: performance-isolation`

---


## Inputs

- User requirements and constraints for tenant model isolation
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

- Define tenant entity structure:
  - `id`: Unique tenant identifier (UUID)
  - `name`: Display name for the tenant
  - `slug`: URL-safe unique identifier
  - `tier`: Subscription tier (determines features/limits)
  - `status`: Current lifecycle state
  - `settings`: Tenant-specific configuration JSON
  - `created_at`, `updated_at`: Timestamps

- Design plan/tier model:
  - FREE: Basic features, strict resource limits
  - PRO: Extended features, higher limits, priority support
  - ENTERPRISE: Full features, custom limits, dedicated resources
  - Define feature flags per tier
  - Define resource quotas per tier (API calls, storage, agents)

- Document lifecycle states:
  - Provisioning: Resources being allocated, not yet usable
  - Active: Fully operational, normal usage
  - Suspended: Access restricted (billing, policy violation)
  - Archived: Read-only mode, reduced storage costs
  - Deleted: Scheduled for permanent data removal

- Define state transitions:
  - Valid transitions (e.g., active → suspended, not deleted → active)
  - Transition triggers (manual, automated, scheduled)
  - Notification requirements per transition

**Verify current best practices with web search:**
Search the web: "tenant model definition best practices {date}"
Search the web: "tenant model definition enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tenant model definition above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into tier features and state transition edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for model review
- **C (Continue)**: Accept tenant model and proceed to isolation matrix creation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass model context: entity structure, tier definitions, lifecycle states
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into tenant model
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant model definition: {summary of entity, tiers, and states}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tenant model to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-isolation-matrix-creation.md`

---

## Verification

- [ ] Tenant entity schema complete
- [ ] All tiers have feature and quota definitions
- [ ] All lifecycle states documented
- [ ] State transitions defined with triggers
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant entity schema definition
- Tier feature matrix
- Lifecycle state machine diagram
- Transition rules documentation
- **Load template:** `{project-root}/_bmad/bam/data/templates/tenant-tier-matrix.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/tenant-model-doc-template.md`

---

## Next Step

Proceed to `step-02-c-isolation-matrix-creation.md` to define isolation strategies per asset type.
