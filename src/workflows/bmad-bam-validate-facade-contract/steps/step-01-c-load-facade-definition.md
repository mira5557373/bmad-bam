# Step 1: Load Facade Definition

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

Load the facade contract definition to begin validation process in Create mode.

## Prerequisites

- Facade contract exists from `define-facade-contract` or `evolve-facade-contract`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `facade-contracts`

---

## Actions

**Verify current best practices with web search:**
Search the web: "facade contract validation patterns {date}"
Search the web: "API contract testing best practices {date}"

_Source: [URL]_

1. **Locate Facade Contract**
   - Find contract in `{output_folder}/planning-artifacts/architecture/`
   - Identify by module name

2. **Parse Contract Structure**
   - Load operations definitions
   - Extract tenant context rules
   - Read error handling specifications

3. **Prepare Validation Context**
   - Load quality gate checklist
   - Identify validation criteria

#### Checkpoint: Definition Loaded

Before proceeding, confirm:
- [ ] Facade contract located
- [ ] Contract structure parsed
- [ ] Validation context prepared

**STOP: Present the A/P/C menu to the user**

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements
- **[P] Party Mode**: Collaborative brainstorming
- **[C] Continue**: Proceed to next step

---

## Verification

- [ ] Contract loaded successfully
- [ ] Structure matches expected format
- [ ] Patterns align with pattern registry

## Outputs

- Loaded facade contract
- Validation context established

## Next Step

Proceed to Step 2: Verify Contract Schema to validate contract structure compliance.
