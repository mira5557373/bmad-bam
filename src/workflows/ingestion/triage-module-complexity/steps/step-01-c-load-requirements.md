# Step 1: Load Requirements

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

Load the module requirements and context for complexity assessment.

## Prerequisites

- Requirement ingestion complete
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-lifecycle`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: module-boundaries`


---

## Inputs

- User requirements and constraints for ingestion - triage module complexity
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

Load the module requirements and context for complexity assessment:

**Required inputs:**
- Module name (or "all" for batch assessment)
- `{output_folder}/planning-artifacts/features/requirement-matrix.md`
- `{output_folder}/planning-artifacts/features/module-mapping.md`
- `{project-root}/**/project-context.md`

**For each module to assess, extract:**
- Assigned requirements (from requirement matrix)
- Module boundaries and responsibilities
- Dependencies on other modules
- Cross-cutting concerns that apply

**Validation:**
- Module exists in project context or requirement matrix
- Module has at least one assigned requirement
- Dependency information available

**Output:** Module context loaded into working memory, ready for complexity assessment.

If module not found, list available modules and ask user to select.

## Verification

- [ ] Module exists in project context
- [ ] Requirements assigned to module
- [ ] Dependencies identified
- [ ] Cross-cutting concerns loaded
- [ ] Patterns align with pattern registry

## Outputs

- Module context in working memory
- Extracted requirements summary

## Next Step

Proceed to `step-02-c-assess-technical-complexity.md` to evaluate technical factors.

**Verify current best practices with web search:**
Search the web: "load requirements best practices {date}"
Search the web: "load requirements enterprise SaaS {date}"

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
