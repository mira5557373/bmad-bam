# Step 3: Check Permissions

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

Validate the tool's permission model and access controls.

## Prerequisites

- Schema verified (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: testing-agent-safety`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: agent-runtime`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

**Verify current best practices with web search:**
Search the web: "tool permissions API integration patterns {date}"
Search the web: "AI tool access control design {date}"

_Source: [URL]_

1. **Verify Required Permissions Declared**
   - Check tool declares all permissions it needs
   - Verify permission names match the permission model
   - Confirm no over-requesting of permissions

2. **Validate Permission Levels**
   - Read permissions for query operations
   - Write permissions for data modification
   - Admin permissions for sensitive operations
   - External permissions for third-party access

3. **Check Approval Requirements**
   - High-risk operations require human approval
   - Cost-impacting operations have thresholds
   - Sensitive data access triggers approval flow
   - Approval workflow integration is correct

4. **Verify Role Mapping**
   - Tool permissions map to defined roles
   - Role requirements are documented
   - No implicit permission assumptions

5. **Check Sandbox Configuration**
   - Untrusted tool inputs are sandboxed
   - External tool calls have appropriate isolation
   - Resource limits are configured
   - Network access is restricted appropriately

#### Checkpoint: Permission Validation Complete

Before proceeding, confirm:
- [ ] All required permissions declared
- [ ] Permission levels validated
- [ ] Approval requirements reviewed
- [ ] Role mapping verified
- [ ] Sandbox configuration checked

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

Permission validation report:
- Declared permissions list
- Permission appropriateness assessment
- Approval requirements status
- Sandbox configuration status
- Security recommendations

## Verification

- [ ] All required permissions declared
- [ ] Permission levels appropriate
- [ ] Approval requirements configured
- [ ] Role mapping verified
- [ ] Sandbox configuration validated
- [ ] Patterns align with pattern registry

## Outputs

- Permission validation report
- Security recommendations

## Next Step

Proceed to `step-04-c-validate-tenant-context.md` to verify multi-tenant handling.
