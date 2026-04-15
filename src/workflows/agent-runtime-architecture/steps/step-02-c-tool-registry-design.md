# Step 2: Tool Registry Design

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

Design a centralized registry that catalogs all available tools, manages permissions, and enforces safety policies before tool execution.

---

## Prerequisites

- Orchestration model selected (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: agent-runtime,tool-execution

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Tool Catalog Structure

- Tool identifier (unique name, version)
- Description and usage documentation
- Module owner and maintenance contact
- Required permissions and approval flags
- Risk classification (low/medium/high/critical)

### 2. Design Permission Model

- Role-based access control per tool
- Tenant-scoped availability (which tenants can use which tools)
- Approval-required flags for sensitive operations
- Rate limits per tool per tenant

### 3. Configure Sandbox Environments

- E2B integration for untrusted or user-provided tools
- Resource limits (CPU, memory, network, time)
- Isolation boundaries between tool executions

### 4. Integrate Policy Engine

- Cerbos rules for tool access authorization
- NeMo Guardrails for pre-tool safety validation
- Input sanitization requirements per tool

**Verify current best practices with web search:**
Search the web: "tool registry design AI agent patterns {date}"
Search the web: "tool registry design LLM orchestration {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tool registry design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into permission model or sandbox configuration
- **P (Party Mode)**: Bring security and DevOps perspectives on tool safety
- **C (Continue)**: Accept tool registry design and proceed to memory tiers
- **[Specific refinements]**: Describe tool registry concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: tool catalog structure, permission model, sandbox configuration
- Process enhanced insights on tool security
- Ask user: "Accept these refined tool registry decisions? (y/n)"
- If yes, integrate into tool registry specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tool registry and permission model for multi-tenant AI platform"
- Process security and DevOps perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tool registry design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-memory-tier-design.md`

---

## Verification

- [ ] Tool catalog schema complete
- [ ] Permission model covers all access scenarios
- [ ] Sandbox configuration defined
- [ ] Policy rules integrated
- [ ] Patterns align with pattern registry

---

## Outputs

- Tool catalog schema definition
- Permission matrix (roles x tools x tenants)
- Sandbox configuration templates
- Policy rule definitions
- **Load template:** `{project-root}/_bmad/bam/data/templates/tool-contract-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/prompt-template-catalog.md`

---

## Next Step

Proceed to `step-03-c-memory-tier-design.md` to design the memory architecture.
