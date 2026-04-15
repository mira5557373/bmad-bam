# Step 1: Scan Module

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

Discover all registered AI tools in the BAM module.

---

## Prerequisites

- Access to BAM module files
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: run-contracts`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tool-execution`

---


## Inputs

- User requirements and constraints for utility - list tools
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

## Scan Locations

Search for tool definitions in:
- `bmad-bam/src/tools/` - Core tool implementations
- `bmad-bam/src/workflows/*/` - Workflow-specific tools
- `bmad-bam/src/knowledge/tool-*.md` - Tool pattern documentation

## Tool Discovery

For each tool found, extract:
- Tool name (unique identifier)
- Tool description
- Tool category (search, write, analyze, execute, etc.)
- Input parameters with types
- Output schema
- Required permissions
- Module owner

## Tool Registration Check

Verify each tool is properly registered:
- [ ] Tool has SKILL.md file
- [ ] Tool has instructions.md file
- [ ] Tool is listed in module manifest
- [ ] Tool permissions documented

## Filter Options

Support filtering by:
- Category (search, write, analyze, execute, utility)
- Module (which module owns the tool)
- Permission level (safe, approval-required, restricted)
- Status (active, deprecated, experimental)

## Tool Metadata

Collect additional metadata:
- Version
- Last updated date
- Usage statistics (if available)
- Related tools
- Dependencies on other tools

**Verify current best practices with web search:**
Search the web: "scan module best practices {date}"
Search the web: "scan module enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the module scan above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into tool discovery using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for tool analysis
- **C (Continue)**: Accept scan results and proceed to output formatting
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass scan context: tools discovered, categories identified
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into tool inventory
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tool discovery results for BAM module: {summary of tools found}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tool inventory to working state
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-format-output.md`

---

## Verification

- [ ] All scan locations checked
- [ ] Tool definitions extracted
- [ ] Registration verified
- [ ] Metadata collected
- [ ] Patterns align with pattern registry

---

## Outputs

- Raw tool inventory
- Tool metadata

---

## Next Step

Proceed to `step-02-c-format-output.md` to format the results.
