# Step 1: Load Module Architecture

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

Load the module architecture document that will serve as the foundation for epic generation.

---

## Prerequisites

- Module architecture created and validated
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries

---


## Inputs

- User requirements and constraints for module - create module epics
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Load Required Inputs

1. Load the target module architecture: `{output_folder}/planning-artifacts/modules/{module-name}/architecture.md`
2. Load the master architecture for context: `{output_folder}/planning-artifacts/architecture/master-architecture.md` (sections 1-6)
3. If dependencies declared, load facade contracts for each dependent module

### 2. Validate Module Architecture

Before proceeding, verify:
- Module architecture document exists
- Module has passed foundation gate (QG-M1)
- Bounded context is clearly defined
- Domain model section is complete (aggregate roots, entities, value objects)
- Public facade design is documented

If the module architecture is missing or incomplete, inform the user and suggest running `create-module-architecture` first.

### 3. Extract Key Information

Parse and capture from the module architecture:

- **Module identity**: name, bounded context, business capability
- **Complexity classification**: SIMPLE, STANDARD, or COMPLEX
- **Domain model**: aggregate roots, entities, relationships
- **Public facade**: methods, DTOs, error types
- **Dependencies**: consumed facades, consumed events
- **AI behaviors**: agents, tools, memory scope (if applicable)

Present a summary of the module architecture to confirm correct target before proceeding.

**Verify current best practices with web search:**
Search the web: "module architecture extraction module patterns {date}"
Search the web: "epic planning bounded context {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After loading and extracting module architecture information, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into module architecture understanding
- **P (Party Mode)**: Bring analyst and architect perspectives for architecture review
- **C (Continue)**: Accept module architecture summary and proceed to epic boundaries
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: module architecture summary, extracted key information
- Process enhanced insights on architecture interpretation
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into module summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review module architecture for epic generation: {module summary}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save module architecture summary to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-identify-epic-boundaries.md`

---

## Verification

- [ ] Module architecture document loaded
- [ ] Module has passed QG-M1
- [ ] Bounded context clearly defined
- [ ] Domain model complete
- [ ] Key information extracted
- [ ] Patterns align with pattern registry

---

## Outputs

- Module architecture summary
- Extracted key information document

---

## Next Step

Proceed to `step-02-c-identify-epic-boundaries.md` to define epic boundaries.
