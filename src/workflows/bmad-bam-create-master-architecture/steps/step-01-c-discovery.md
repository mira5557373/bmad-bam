# Step 1: Discovery

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

Gather all existing inputs and context before making architecture decisions. This step ensures the architecture is built on a complete understanding of product requirements, existing technology decisions, and organizational constraints. Discovery prevents rework by identifying gaps early.

---

## Prerequisites

- Product Brief or PRD available (or stakeholder access for discovery)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation,agent-runtime,module-boundaries
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries

**Verify current best practices with web search:**
Search the web: "multi-tenant SaaS architecture discovery best practices {date}"
Search the web: "architecture requirements gathering multi-tenant SaaS {date}"

Reference web research findings in your analysis.
_Source: [URL]_ for key findings.

---


## Inputs

- User requirements and constraints for foundation - create master architecture
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Load Available Inputs

- Locate and review Product Brief or PRD if available
- Search for `**/project-context.md` for existing technology decisions
- Gather any existing architecture documents or diagrams
- Review domain model documentation if present
- Collect non-functional requirements (scale, latency, compliance)

### 2. Analyze Input Quality

- Assess completeness of product requirements
- Identify missing stakeholder input
- Flag conflicting requirements
- Note areas requiring clarification
- Evaluate existing architecture decisions for relevance

### 3. Identify Gaps

- Document missing requirements critical for architecture
- List technology decisions not yet made
- Identify integration points without documentation
- Note compliance requirements not addressed
- Flag performance targets not defined

### 4. Confirm Scope (Interactive Mode)

- If not running headless, present discovery findings to user
- Review identified gaps and confirm priority
- Agree on assumptions for missing information
- Confirm scope boundaries for architecture work
- Establish decision-making authority for unresolved items

---

## COLLABORATION MENUS (A/P/C):

After completing the discovery analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into requirements gaps using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for gap analysis
- **C (Continue)**: Accept discovery findings and proceed to tenant model decisions
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass discovery context: gaps identified, assumptions made
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into discovery summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review discovery findings for master architecture: {summary of gaps and assumptions}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save discovery summary to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-tenant-model-decisions.md`

---

## Verification

- [ ] All available input documents inventoried
- [ ] Gap analysis completed with priorities
- [ ] Scope boundaries confirmed
- [ ] Assumptions documented with rationale
- [ ] Stakeholders identified for unresolved decisions

---

## Outputs

- Discovery summary document
- Gap analysis with prioritized items
- Confirmed scope statement
- Assumptions log with rationale
- Input document inventory
- **Load template:** `{project-root}/_bmad/bam/data/templates/requirement-summary-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/platform-strategy-template.md`

---

## Next Step

Proceed to `step-02-c-tenant-model-decisions.md` to establish the foundational tenant model.
