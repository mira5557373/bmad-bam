# Step 2: Assess Technical Complexity

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

Evaluate technical complexity factors for each module.

## Prerequisites

- Requirements loaded (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: module-boundaries`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: agent-runtime`


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Evaluate technical complexity factors for each module:

## Assessment Questions (Technical)

### Q1: Entity Count
How many aggregate roots / entities does this module manage?
- **0 (Simple):** 1-3 entities
- **1 (Standard):** 4-7 entities
- **2 (Complex):** 8+ entities

### Q2: Business Rules
How complex are the domain invariants?
- **0 (Simple):** Basic CRUD operations, minimal validation
- **1 (Standard):** Moderate business logic, state machines, conditional rules
- **2 (Complex):** Complex domain rules, multi-step workflows, heavy invariant enforcement

### Q3: AI Involvement
Does this module have AI behaviors?
- **0 (Simple):** No AI components
- **1 (Standard):** Basic AI integration (single agent, standard prompts)
- **2 (Complex):** Multi-agent orchestration, custom evaluation, complex prompt chains

### Q4: Data Volume
What is the expected data scale?
- **0 (Simple):** Low volume, single-tenant scale
- **1 (Standard):** Moderate volume, basic multi-tenant
- **2 (Complex):** High volume, partitioning needs, time-series data

**Output:** Technical complexity scores (Q1-Q4) with justification for each.

Document specific evidence from requirements that supports each score.

## Soft Gate Checkpoint

**Steps 1-2 complete the technical complexity assessment phase.**

Present summary of:
- Technical complexity scores (Q1-Q4) for each module
- Key complexity drivers identified (entity count, business rules, AI involvement, data volume)
- High-complexity modules requiring special attention

Ask for confirmation before proceeding to integration complexity assessment.

---

## Verification

- [ ] Q1-Q4 scores assigned
- [ ] Justification documented for each score
- [ ] Evidence from requirements cited
- [ ] Patterns align with pattern registry

## Outputs

- Technical complexity scores (Q1-Q4)
- Score justifications

## Next Step

Proceed to `step-03-c-assess-integration-complexity.md` to evaluate integration factors.

**Verify current best practices with web search:**
Search the web: "assess technical complexity best practices {date}"
Search the web: "assess technical complexity enterprise SaaS {date}"

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
