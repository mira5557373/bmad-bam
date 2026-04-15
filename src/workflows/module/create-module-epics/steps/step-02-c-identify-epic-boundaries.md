# Step 2: Identify Epic Boundaries

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

Define the epic boundaries based on module complexity and domain model structure.

---

## Prerequisites

- Module architecture loaded (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: local-dev
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: event-driven

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Complexity-Aware Epic Planning

Apply epic count based on module complexity classification:

| Complexity | Epic Count | Rationale |
|------------|------------|-----------|
| SIMPLE     | 1-2 epics  | Single bounded context, CRUD operations grouped |
| STANDARD   | 3-5 epics  | Multiple aggregate roots, feature-based grouping |
| COMPLEX    | 5+ epics   | Multiple subdomains, risk-based splitting required |

### 2. Epic Boundary Identification

For each potential epic, identify:

1. **Aggregate alignment**: Which aggregate roots are covered?
2. **Feature cohesion**: What business capability is delivered?
3. **Dependency isolation**: What external facades are required?
4. **Risk profile**: Are there unknowns requiring spike stories?

### 3. Boundary Rules

- Each epic should own complete operations for one or more aggregate roots
- Cross-aggregate operations span multiple epics only when necessary
- Facade dependencies should be minimal per epic (prefer 0-2)
- AI-enabled epics should group related agent behaviors

### 4. Spike Story Triggers (COMPLEX modules only)

Flag for spike stories when:

- [ ] Domain model has entities with unclear boundaries
- [ ] Integration pattern not previously used in project
- [ ] AI behavior requires novel tool or memory pattern
- [ ] External system integration with unknown API characteristics
- [ ] Performance requirements need benchmarking

### 5. Document Epic Boundary Plan

```
Epic 1: {name}
  - Aggregates: [list]
  - Business capability: {description}
  - Dependencies: [facades required]
  - Risk: LOW/MEDIUM/HIGH
  - Spike required: YES/NO

Epic 2: {name}
  ...
```

Present epic boundary plan for confirmation before proceeding to story generation.

**Verify current best practices with web search:**
Search the web: "epic boundaries module patterns {date}"
Search the web: "aggregate epic mapping bounded context {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the epic boundary identification, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into epic boundaries and risk assessment
- **P (Party Mode)**: Bring analyst and architect perspectives for boundary validation
- **C (Continue)**: Accept epic boundaries and proceed to story generation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: epic boundaries, risk profiles, spike triggers
- Process enhanced insights on boundary definition
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into epic boundary plan
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review epic boundaries: {epic boundary plan summary}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save epic boundary plan to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-generate-epic-stories.md`

---

## Soft Gate Checkpoint

**Steps 1-2 complete the epic planning phase.**

Present summary of:
- Epic boundaries and aggregate alignment
- Risk profiles per epic
- Spike story candidates

Ask for confirmation before proceeding to story generation.

---

## Verification

- [ ] Epic count aligns with complexity classification
- [ ] Aggregate alignment documented per epic
- [ ] Feature cohesion verified
- [ ] Dependency isolation assessed
- [ ] Spike triggers flagged (COMPLEX only)
- [ ] Patterns align with pattern registry

---

## Outputs

- Epic boundary plan
- Spike story candidates list

---

## Next Step

Proceed to `step-03-c-generate-epic-stories.md` to create user stories.
