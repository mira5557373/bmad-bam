# Step 2: Categorize by Domain

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

Apply domain-driven design principles to categorize requirements into bounded contexts.

## Prerequisites

- Requirements gathered (Step 1)
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

Apply domain-driven design principles to categorize requirements:

- Identify bounded contexts from requirement clusters
- Group related features by domain area (e.g., tenant management, AI runtime, billing)
- Detect ubiquitous language patterns within each domain
- Mark ambiguous requirements that span multiple domains

**Categorization criteria:**
1. **Data ownership:** Which entity types does this requirement affect?
2. **Business capability:** What business function does this enable?
3. **User persona:** Which user role is the primary beneficiary?
4. **Technical domain:** Infrastructure, application, or cross-cutting?

**Output:** Requirements organized by domain categories with initial boundary markers.

Store categorized requirements in `{output_folder}/planning-artifacts/features/by-domain/`.

**Verify current best practices with web search:**
Search the web: "categorize by domain best practices {date}"
Search the web: "categorize by domain enterprise SaaS {date}"

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

## Soft Gate Checkpoint

**Steps 1-2 complete the requirements categorization phase.**

Present summary of:
- Bounded contexts identified from requirement clusters
- Domain groupings (tenant management, AI runtime, billing, etc.)
- Ambiguous requirements flagged for clarification

Ask for confirmation before proceeding to module mapping.

---

## Verification

- [ ] Bounded contexts identified
- [ ] Requirements grouped by domain area
- [ ] Ubiquitous language patterns detected
- [ ] Ambiguous requirements flagged
- [ ] Patterns align with pattern registry

## Outputs

- Domain-categorized requirements
- Boundary markers document

## Next Step

Proceed to `step-03-c-map-to-modules.md` to assign requirements to modules.
