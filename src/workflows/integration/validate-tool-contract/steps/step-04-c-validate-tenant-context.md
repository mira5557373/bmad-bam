# Step 4: Validate Tenant Context

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


## Purpose

Verify the tool correctly handles multi-tenant context.

## Prerequisites

- Permissions checked (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-context-propagation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

**Verify current best practices with web search:**
Search the web: "tenant context API integration patterns {date}"
Search the web: "multi-tenant tool contract design {date}"

_Source: [URL]_

1. **Check Tenant Context Requirement**
   - Tool declares tenant context as required input
   - Tenant ID is validated before execution
   - Missing tenant context fails safely

2. **Verify Tenant Isolation**
   - Tool only accesses data for the provided tenant
   - Cross-tenant data access is impossible
   - Tenant context is propagated to all downstream calls

3. **Check RLS Integration**
   - Tool queries use tenant-scoped connections
   - Row-Level Security is active for data access
   - No direct database access bypassing RLS

4. **Validate Tenant-Scoped Logging**
   - Tool logs include tenant context
   - No cross-tenant log leakage
   - Audit trail maintains tenant attribution

5. **Check Resource Quotas**
   - Tool respects tenant resource limits
   - Rate limiting is tenant-aware
   - Resource exhaustion is isolated per tenant

6. **Verify Error Handling**
   - Errors don't leak cross-tenant information
   - Tenant context preserved in error responses
   - Failed operations logged with tenant context

#### Checkpoint: Tenant Context Validation Complete

Before proceeding, confirm:
- [ ] Tenant context requirement validated
- [ ] Tenant isolation verified
- [ ] RLS integration confirmed
- [ ] Logging and quotas checked
- [ ] Error handling verified

**STOP: Present the A/P/C menu to the user**

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file

---

## Output

Tenant context validation report:
- Tenant context handling status
- Isolation verification results
- RLS integration status
- Resource quota compliance
- Cross-tenant leakage risks (if any)

## Verification

- [ ] Tenant context requirement validated
- [ ] Tenant isolation verified
- [ ] RLS integration confirmed
- [ ] Tenant-scoped logging implemented
- [ ] Resource quotas respected
- [ ] Error handling verified
- [ ] Patterns align with pattern registry

## Outputs

- Tenant context validation report
- Cross-tenant leakage risk assessment
- **Load template:** `{project-root}/_bmad/bam/templates/mcp-server-isolation-template.md`

## Next Step

Proceed to `step-05-c-run-contract-tests.md` to execute contract tests.
