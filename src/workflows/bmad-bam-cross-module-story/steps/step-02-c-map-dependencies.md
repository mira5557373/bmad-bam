# Step 2: Map Dependencies

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

Document the dependencies between modules for this feature.

## Prerequisites

- Modules identified (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

## Dependency Types

**Data Dependencies:**
- Module A needs data owned by Module B
- Data flow direction (push/pull/event)
- Data freshness requirements

**Functional Dependencies:**
- Module A calls Module B's facade
- Synchronous vs. asynchronous
- Failure handling requirements

**Temporal Dependencies:**
- Module A must complete before Module B starts
- Parallel execution possible
- Ordering constraints

## Dependency Matrix

| From Module | To Module | Type | Contract | Critical Path |
|-------------|-----------|------|----------|---------------|
| ... | ... | Data/Func/Temporal | facade/event/direct | Yes/No |

## Critical Path Analysis

- Identify the longest dependency chain
- Determine minimum time to completion
- Find parallelization opportunities
- Identify risk points (single module blockers)

## New Contracts Required

For each dependency without existing contract:
- Define required interface
- Specify data schema
- Document SLA requirements
- Plan contract creation story

**Verify current best practices with web search:**
Search the web: "map dependencies best practices {date}"
Search the web: "map dependencies enterprise SaaS {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-2 complete the module identification and dependency mapping phase.**

Present summary of:
- Modules identified and their roles
- Dependency matrix with types
- Critical path analysis findings

Ask for confirmation before proceeding to integration point definition.

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

### Menu Options

**[A]nalyze** - Cross-Module Dependency Analysis:
- A1: Analyze dependency chain completeness
- A2: Review critical path for bottlenecks
- A3: Assess circular dependency risks
- A4: Evaluate contract gaps between modules

**[P]ropose** - Dependency Coordination Proposals:
- P1: Propose dependency prioritization order
- P2: Suggest contract definitions for missing interfaces
- P3: Recommend parallelization opportunities
- P4: Propose risk mitigation for single-module blockers

**[C]ontinue** - Proceed to next step:
- C1: Continue to Step 3 (Define Integration Points) with mapped dependencies
- C2: Save current dependency mapping and pause

Select an option or provide feedback:

---

## Verification

- [ ] All dependency types mapped (data/functional/temporal)
- [ ] Dependency matrix complete
- [ ] Critical path identified
- [ ] New contracts required documented
- [ ] Patterns align with pattern registry

## Outputs

- Dependency graph
- Critical path analysis
- Contract requirements
- **Load template:** `{project-root}/_bmad/bam/data/templates/cross-module-story-template.md`

## Next Step

Proceed to `step-03-c-define-integration-points.md` to specify interaction details.
