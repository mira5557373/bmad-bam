# Step 2: Verify Schema

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

Validate the tool definition against the ToolDefinition schema.

## Prerequisites

- Tool definition loaded (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: run-contracts`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

**Verify current best practices with web search:**
Search the web: "JSON Schema validation API integration patterns {date}"
Search the web: "tool schema contract design {date}"

_Source: [URL]_

1. **Validate Against JSON Schema**
   - Verify tool definition matches ToolDefinition schema
   - Check all required fields are present
   - Validate field types and formats
   - Report any schema violations

2. **Check Input Parameter Schema**
   - Verify all parameters have type definitions
   - Check required vs optional parameters
   - Validate parameter descriptions are clear
   - Verify default values are appropriate
   - Check for parameter naming consistency

3. **Validate Output Schema**
   - Verify output structure is defined
   - Check for nullable/optional output fields
   - Validate error response format
   - Verify output matches what implementation returns

4. **Check Description Quality**
   - Tool description is clear and actionable
   - Parameter descriptions explain purpose
   - Examples provided for complex parameters
   - Description suitable for LLM consumption

5. **Verify Idempotency Declaration**
   - Tool correctly declares if idempotent
   - Idempotent tools are safe to retry
   - Non-idempotent tools have appropriate safeguards

#### Checkpoint: Schema Verification Complete

Before proceeding, confirm:
- [ ] JSON Schema validation executed
- [ ] Input parameters verified
- [ ] Output schema validated
- [ ] Description quality assessed
- [ ] Idempotency declaration verified

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

Schema validation report:
- Schema compliance status (pass/fail)
- Specific violations found
- Description quality assessment
- Recommendations for improvement

## Soft Gate Checkpoint

**Steps 1-2 complete the schema verification phase.**

Present summary of:
- Schema compliance status for tool definition
- Input/output parameter validation results
- Description quality and idempotency findings

Ask for confirmation before proceeding to permission checks.

---

## Verification

- [ ] JSON schema validation passed
- [ ] Input parameter schema verified
- [ ] Output schema validated
- [ ] Description quality assessed
- [ ] Idempotency declaration verified
- [ ] Patterns align with pattern registry

## Outputs

- Schema validation report
- Description quality assessment
- **Load template:** `{project-root}/_bmad/bam/data/templates/mcp-client-patterns-template.md`

## Next Step

Proceed to `step-03-c-check-permissions.md` to validate access controls.
