# Step 1: Load Tool Definition

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

Load the AI agent tool definition to be validated.

## Prerequisites

- Tool definition exists
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: run-contracts`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tool-execution`

---


## Inputs

- User requirements and constraints for integration - validate tool contract
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

**Verify current best practices with web search:**
Search the web: "tool definition API integration patterns {date}"
Search the web: "AI tool contract design {date}"

_Source: [URL]_

1. **Locate Tool Definition**
   - Find tool definition in `{output_folder}/planning-artifacts/ai-runtime/tools/`
   - Or load from module's tool registry if already implemented
   - Identify tool by name or module owner

2. **Parse Tool Definition**
   Extract key components:
   - Tool name and description
   - Input parameters schema
   - Output schema
   - Module owner
   - Permission requirements
   - Tenant context requirements

3. **Load Related Artifacts**
   - Load the ToolDefinition schema from shared kernel
   - Load module's tool registry configuration
   - Load any existing tool tests

4. **Identify Tool Category**
   Classify the tool:
   - Query tool (read-only, safe to retry)
   - Action tool (side effects, may need approval)
   - Sensitive tool (PII access, elevated permissions)
   - External tool (calls external services)

#### Checkpoint: Tool Definition Loaded

Before proceeding, confirm:
- [ ] Tool definition file located
- [ ] Key components parsed and documented
- [ ] Related artifacts identified
- [ ] Tool category classified

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

Document the loaded tool definition:
- Tool identifier and description
- Category classification
- Module owner
- Input/output schema summary
- Permission requirements summary

## Verification

- [ ] Tool definition located and loaded
- [ ] Key components parsed
- [ ] Related artifacts loaded
- [ ] Tool category identified
- [ ] Patterns align with pattern registry

## Outputs

- Tool definition document
- Category classification
- **Load template:** `{project-root}/_bmad/bam/data/templates/mcp-client-integration-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/mcp-server-config-template.md`

## Next Step

Proceed to `step-02-c-verify-schema.md` to validate against ToolDefinition schema.
