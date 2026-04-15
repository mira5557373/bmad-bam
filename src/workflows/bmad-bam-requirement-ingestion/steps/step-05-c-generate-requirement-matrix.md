# Step 5: Generate Requirement Matrix

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

Produce the final requirement traceability matrix for planning and implementation tracking.

## Prerequisites

- Cross-cutting concerns identified (Step 4)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-lifecycle`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: module-boundaries`


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Produce the final requirement traceability matrix:

**Matrix structure:**
| Requirement ID | Description | Domain | Module | Cross-Cutting | Dependencies | Priority |
|----------------|-------------|--------|--------|---------------|--------------|----------|

**Matrix contents:**
- All requirements with unique IDs
- Domain classification
- Module assignment
- Cross-cutting flag (Y/N)
- Inter-requirement dependencies
- Initial priority (derived from dependency depth and business value)

**Validation checks:**
- [ ] Every requirement has exactly one module assignment
- [ ] No orphan requirements (unassigned)
- [ ] Dependencies form acyclic graph
- [ ] Cross-cutting concerns properly isolated
- [ ] Priority order respects dependency constraints

**Output artifacts:**
- `{output_folder}/planning-artifacts/features/requirement-matrix.md` - Full traceability matrix
- `{output_folder}/planning-artifacts/features/index.md` - Navigable index by module
- `{output_folder}/planning-artifacts/features/dependency-graph.md` - Visual dependency representation
- Updated `sprint-status.yaml` with discovered modules registered

**Quality gate:** All requirements assigned, no circular dependencies, matrix complete.

**Verify current best practices with web search:**
Search the web: "generate requirement matrix best practices {date}"
Search the web: "generate requirement matrix enterprise SaaS {date}"

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

- [ ] Every requirement has module assignment
- [ ] No orphan requirements
- [ ] Dependency graph is acyclic
- [ ] Cross-cutting concerns isolated
- [ ] Priority order respects dependencies
- [ ] Patterns align with pattern registry

## Outputs

- Requirement traceability matrix
- Module index
- Dependency graph
- **Load template:** `{project-root}/_bmad/bam/data/templates/requirement-summary-template.md`

## Next Step

Proceed to `bmad-bam-triage-module-complexity` to assess module complexity.
