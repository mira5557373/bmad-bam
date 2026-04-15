# Step 6: Dependencies

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

Declare and validate all module dependencies including consumed facades and subscribed events to ensure proper decoupling.

---

## Prerequisites

- Public facade designed (Step 5)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: local-dev

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. List Consumed Facades

- Module name and facade version
- Specific methods used from each facade
- Reason for dependency (what capability is needed)
- Fallback behavior if dependency unavailable

### 2. List Consumed Events

- Event type name and publisher module
- Event schema version subscribed to
- Handler behavior (idempotent, at-least-once)
- Error handling strategy for failed events

### 3. Verify Facade Contracts Exist

- Each dependency must have published facade interface
- Version compatibility check
- Breaking change impact assessment

### 4. Validate No Circular Dependencies

- Draw dependency graph
- Identify any cycles
- Resolve cycles via events or shared kernel

**Verify current best practices with web search:**
Search the web: "module dependency module patterns {date}"
Search the web: "circular dependency bounded context {date}"

_Source: [URL]_

---

## Questions to Consider

- Can any synchronous facade calls be replaced with events?
- What is the impact if a dependency is unavailable?
- Are you depending on stable or experimental facades?

**SIMPLE modules:** Skip if 0-1 dependencies

---

## COLLABORATION MENUS (A/P/C):

After completing the dependency analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into dependency risks and coupling analysis
- **P (Party Mode)**: Bring architect perspectives for dependency validation
- **C (Continue)**: Accept dependencies and proceed to events published
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: consumed facades, events, dependency graph
- Process enhanced insights on coupling and risk
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into dependency manifest
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review module dependencies: {facades, events, circular dependency analysis}"
- Process collaborative analysis from architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save dependency manifest to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6]`
- Proceed to next step: `step-07-c-events-published.md`

---

## Verification

- [ ] Consumed facades listed with versions
- [ ] Consumed events documented
- [ ] Facade contracts verified to exist
- [ ] No circular dependencies detected
- [ ] Fallback behaviors defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Dependency manifest
- Event subscription manifest
- Dependency graph diagram

---

## Next Step

Proceed to `step-07-c-events-published.md` to define published events.
