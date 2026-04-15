# Step 1: Identify Modules

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

Determine which modules are involved in the cross-module story.

## Prerequisites

- Feature request available
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: local-dev


---

## Inputs

- User requirements and constraints for cross module story
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

## Feature Analysis

- Break down the feature request into distinct capabilities
- Map each capability to the responsible module
- Identify any capabilities that don't map to existing modules

## Module Identification

For each module involved:
- Module name and owner
- Module's responsibility boundary
- Current state (stable, under development, frozen)
- Team contact and availability

## Module Categories

Classify involvement by type:

**Primary Modules:**
- Own significant new functionality
- Require substantial code changes
- Will have dedicated stories

**Supporting Modules:**
- Provide existing capabilities to be consumed
- May need minor changes or new endpoints
- Will have integration tasks

**Observing Modules:**
- Need awareness of changes
- May be affected indirectly
- No code changes required

## Scope Confirmation

- [ ] All necessary modules identified
- [ ] No module boundaries violated by feature design
- [ ] Module owners aware and available
- [ ] Feature fits within master architecture constraints

**Verify current best practices with web search:**
Search the web: "identify modules best practices {date}"
Search the web: "identify modules enterprise SaaS {date}"

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

### Menu Options

**[A]nalyze** - Cross-Module Integration Analysis:
- A1: Analyze module boundary alignment for this feature
- A2: Review module ownership and responsibility matrix
- A3: Assess module coupling risks across identified modules
- A4: Evaluate feature scope against module capabilities

**[P]ropose** - Module Coordination Proposals:
- P1: Propose module involvement classification adjustments
- P2: Suggest module boundary clarifications
- P3: Recommend coordination approach for identified modules
- P4: Propose communication plan for module owners

**[C]ontinue** - Proceed to next step:
- C1: Continue to Step 2 (Map Dependencies) with identified modules
- C2: Save current module identification and pause

Select an option or provide feedback:

---

## Verification

- [ ] Feature analyzed and broken into capabilities
- [ ] All modules identified
- [ ] Module categories assigned (primary/supporting/observing)
- [ ] Scope confirmed
- [ ] Patterns align with pattern registry

## Outputs

- Module involvement matrix
- Roles and contacts
- Scope confirmation

## Next Step

Proceed to `step-02-c-map-dependencies.md` to document inter-module dependencies.
