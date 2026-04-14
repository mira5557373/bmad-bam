# Step 3: Map to Modules

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

Assign each categorized requirement to a specific module following module boundary rules.

## Prerequisites

- Domain categorization complete (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: module-boundaries`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Assign each categorized requirement to a specific module:

- Match requirements to existing modules defined in project context
- Create new module definitions for uncovered domains
- Apply single-responsibility principle (each requirement maps to exactly one module)
- Document the mapping rationale

**Mapping rules:**
1. **Primary owner:** Module that owns the core entity affected
2. **Dependency direction:** Requirements flow from dependent to dependency
3. **Facade boundary:** External modules access via facade contracts only
4. **No dual ownership:** If a requirement touches two modules, split it or assign to coordinator

**Module assignment attributes:**
- Module name and ID
- Requirement IDs assigned
- Justification for assignment
- Alternative modules considered (if ambiguous)

**Output:** Requirement-to-module mapping stored in `{output_folder}/planning-artifacts/features/module-mapping.md`.

**Verify current best practices with web search:**
Search the web: "map to modules best practices {date}"
Search the web: "map to modules enterprise SaaS {date}"

_Source: [URL]_

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

## Verification

- [ ] Each requirement assigned to exactly one module
- [ ] Mapping rationale documented
- [ ] Facade boundaries respected
- [ ] No dual ownership conflicts
- [ ] Patterns align with pattern registry

## Outputs

- Module mapping document
- Mapping rationale

## Next Step

Proceed to `step-04-c-identify-cross-cutting.md` to detect shared concerns.
