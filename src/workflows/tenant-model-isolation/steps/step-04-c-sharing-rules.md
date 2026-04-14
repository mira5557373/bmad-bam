# Step 4: Sharing Rules

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

Define explicit rules for what data and resources can be shared across tenant boundaries. This step establishes the architecture for cross-tenant data (control plane only), shared reference data, and tenant-agnostic resources while maintaining strict isolation for tenant-specific data.

---

## Prerequisites

- Context propagation design complete (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

1. **Define Cross-Tenant Data (Admin/Control-Plane Only)**
   - Identify platform-level administrative data that spans tenants
   - Document control plane resources (billing aggregates, usage metrics)
   - Specify access controls for platform administrators
   - Define audit requirements for cross-tenant data access

2. **Define Shared Reference Data**
   - Catalog reference data types: subscription plans, feature flags, system configurations
   - Determine caching strategies for shared reference data
   - Document versioning approach for reference data changes
   - Specify invalidation patterns when reference data updates

3. **Define Tenant-Agnostic Resources**
   - List public assets (documentation, marketing content, public APIs)
   - Identify shared infrastructure components (CDN assets, public endpoints)
   - Document static resources that require no tenant context

4. **Establish Sharing Boundaries**
   - Create decision matrix: "Can this data be shared? Under what conditions?"
   - Define explicit deny-list for data that must never be shared
   - Document escalation path for sharing rule exceptions

**Verify current best practices with web search:**
Search the web: "sharing rules best practices {date}"
Search the web: "sharing rules enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the sharing rules above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into sharing boundaries and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for sharing rules review
- **C (Continue)**: Accept sharing rules and proceed to compliance mapping
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass sharing context: cross-tenant data, reference data, boundaries
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into sharing rules
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review sharing rules: {summary of cross-tenant, reference, and boundaries}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save sharing rules to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-compliance-mapping.md`

---

## Soft Gate Checkpoint

**Steps 1-4 complete the core isolation and sharing design.**

Present summary of:
- Cross-tenant data boundaries and control plane access rules
- Sharing rules with classification matrix
- Reference data catalog with caching and invalidation policies

Ask for confirmation before proceeding to compliance mapping.

---

## Verification

- [ ] Every data entity is classified as shared or tenant-isolated
- [ ] Cross-tenant access requires explicit authorization
- [ ] Reference data has defined update and invalidation procedures
- [ ] No tenant-specific data appears in shared categories
- [ ] Patterns align with pattern registry

---

## Outputs

- Sharing rules specification document
- Data classification matrix (shared vs. isolated)
- Reference data catalog with caching policies
- Cross-tenant access control policies

---

## Next Step

Proceed to `step-05-c-compliance-mapping.md` to map regulatory requirements.
