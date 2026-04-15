# Step 9: AI Behaviors (if applicable)

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

Define AI agent interactions, tool permissions, and memory scope rules for this module. Skip this step if the module has no AI involvement.

---

## Prerequisites

- Module-specific decisions documented (Step 8)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: agent-runtime,tool-execution
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: memory-tiers,testing-agent-safety

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Identify AI Use Cases

For each AI-powered feature in this module:
- What is the agent's purpose?
- What data does it access?
- What actions can it take?
- What tier restrictions apply?

### 2. Define Tool Permissions

Document each tool the module exposes to agents:
- **Tool name:** Clear identifier
- **Description:** What the tool does
- **Parameters:** Input schema
- **Permissions:** Which tiers can use it
- **Approval required:** Yes/No for sensitive actions

### 3. Configure Memory Scope

Define what data agents can remember:
- **Ephemeral:** Current conversation only
- **Working:** Session-scoped (tenant-isolated)
- **Long-term:** Persistent (tenant-isolated)

### 4. Establish Safety Boundaries

- Actions that require human approval
- Rate limits per tenant/tier
- Data that cannot be exposed to agents
- Fallback behavior on agent failures

**Verify current best practices with web search:**
Search the web: "AI agent safety module patterns {date}"
Search the web: "AI memory isolation bounded context {date}"

_Source: [URL]_

---

## Questions to Consider

- Does this module's AI need access to other module facades?
- What happens if the AI agent fails mid-operation?
- Are there compliance implications for AI memory retention?

---

## COLLABORATION MENUS (A/P/C):

After completing the AI behaviors definition above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into AI safety and permission boundaries
- **P (Party Mode)**: Bring architect and security perspectives for AI validation
- **C (Continue)**: Accept AI behaviors and proceed to assembly
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: AI use cases, tool permissions, memory scope, safety boundaries
- Process enhanced insights on AI design
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into AI behaviors
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review AI behaviors: {use cases, permissions, safety boundaries}"
- Process collaborative analysis from architect and security personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save AI behaviors to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9]`
- Proceed to next step: `step-09b-c-assembly.md`

---

## Soft Gate Checkpoint

**Steps 1-9 complete the analysis and design phases.**

Present summary of:
- Module identity and domain model
- Public facade and dependencies
- Events and module-specific decisions
- AI behaviors and tool permissions

Ask for confirmation before proceeding to assembly.

---

## Verification

- [ ] AI use cases identified
- [ ] Tool permissions defined
- [ ] Memory scope configured
- [ ] Safety boundaries established
- [ ] Tier restrictions documented
- [ ] Patterns align with pattern registry

---

## Outputs

- AI use cases table
- Tool permission matrix
- Memory scope configuration
- Safety boundary rules

---

## Next Step

Proceed to `step-10-c-assembly.md` to combine all sections into the final architecture document.
