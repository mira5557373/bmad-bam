# Step 4: Domain Model

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

Design the module's domain model including aggregate roots, entities, value objects, and business invariants that enforce domain rules.

---

## Prerequisites

- Master architecture loaded (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation,tenant-context-propagation

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Identify Aggregate Roots

- What are the main transactional boundaries?
- Each aggregate has one root entity
- Aggregates are loaded/saved as a unit

### 2. Define Entities

- ALL entities must include `tenant_id` field
- ALL entities must extend `BaseEntity` from master architecture
- Include standard fields: id, created_at, updated_at
- Define entity-specific fields and types

### 3. Design Value Objects

- Immutable objects representing domain concepts
- Examples: EmailAddress, Money, DateRange
- Validation rules embedded in value object

### 4. Document Invariants

- Business rules that must always be true
- Cross-entity constraints within aggregate
- State transition rules

### 5. Map Entity Relationships

- One-to-many, many-to-many relationships
- Ownership vs. reference relationships
- Cascade delete rules

**Verify current best practices with web search:**
Search the web: "domain model module patterns {date}"
Search the web: "aggregate root bounded context {date}"

_Source: [URL]_

---

## Questions to Consider

- Is the aggregate boundary too large or too small?
- Are there entities that should be value objects?
- How do you handle cross-aggregate references?

---

## COLLABORATION MENUS (A/P/C):

After completing the domain model design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into aggregate boundaries and entity design
- **P (Party Mode)**: Bring architect and analyst perspectives for domain modeling
- **C (Continue)**: Accept domain model and proceed to public facade design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: aggregate roots, entities, value objects, invariants
- Process enhanced insights on domain design
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into domain model
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review domain model design: {aggregates, entities, relationships summary}"
- Process collaborative analysis from architect and analyst personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save domain model to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-public-facade-design.md`

---

## Soft Gate Checkpoint

**Steps 1-4 complete the core identity and domain model design.**

Present summary of:
- Module identity and scope
- Aggregate roots and entities
- Value objects and invariants
- Entity relationships

Ask for confirmation before proceeding to public facade design.

---

## Verification

- [ ] Aggregate roots identified
- [ ] All entities include tenant_id and extend BaseEntity
- [ ] Value objects designed (immutable)
- [ ] Invariants documented
- [ ] Entity relationships mapped
- [ ] Patterns align with pattern registry

---

## Outputs

- Entity class diagrams with fields and types
- Aggregate boundary documentation
- Invariant rule specifications
- Entity lifecycle state machines
- **Load template:** `{project-root}/_bmad/bam/data/templates/data-model-template.md`

---

## Next Step

Proceed to `step-05-c-public-facade-design.md` to design the public interface.
