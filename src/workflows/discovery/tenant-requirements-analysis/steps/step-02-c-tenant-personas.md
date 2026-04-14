# Step 2: Tenant Personas

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

Define detailed tenant personas with multi-tenancy specific attributes.

## Prerequisites

- Step 1 complete (tenant segments identified)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: customization


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Extend BMM Personas with Tenant Attributes

For each BMM persona, add:
- Tenant tier expectation (Free, Pro, Enterprise)
- Data residency requirements
- Customization needs (branding, workflows)
- Integration requirements (SSO, API access)

### 2. Define Tenant Admin Persona

Specific persona for tenant administrators:
- User management responsibilities
- Billing and subscription management
- Custom configuration needs
- Audit and compliance access

### 3. Document Cross-Tenant Scenarios

Identify scenarios involving multiple tenants:
- Reseller/partner relationships
- White-label deployments
- Data sharing between tenants (if any)

**Verify current best practices with web search:**
Search the web: "tenant personas best practices {date}"
Search the web: "tenant personas enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After completing the tenant personas above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into persona attributes and cross-tenant scenarios
- **P (Party Mode)**: Bring analyst and UX perspectives for persona review
- **C (Continue)**: Accept tenant personas and proceed to compliance requirements
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass persona context: extended personas, admin persona, cross-tenant scenarios
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into persona definitions
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant personas for requirements analysis: {summary of personas and scenarios}"
- Process collaborative analysis from analyst and UX personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tenant personas to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-compliance-requirements.md`

---

## Soft Gate Checkpoint

**Steps 1-2 complete the tenant discovery and persona design.**

Present summary of:
- Extended BMM personas with tenant tier expectations
- Tenant admin persona definition
- Cross-tenant scenarios identified

Ask for confirmation before proceeding to compliance requirements.

---

## Verification

- [ ] Each BMM persona extended with tenant attributes
- [ ] Tenant admin persona defined
- [ ] Cross-tenant scenarios documented
- [ ] Patterns align with pattern registry

## Outputs

- Extended persona definitions
- Tenant admin persona
- Cross-tenant scenario matrix
- **Load template:** `{project-root}/_bmad/bam/templates/empathy-map-template.md`

## Next Step

Proceed to `step-03-c-compliance-requirements.md` with personas.
