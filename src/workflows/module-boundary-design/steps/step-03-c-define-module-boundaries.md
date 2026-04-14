# Step 3: Define Module Boundaries

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

Map bounded contexts to implementable modules with clear ownership.

---

## Prerequisites

- Bounded contexts identified (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Context-to-Module Mapping

#### Mapping Rules

1. **1:1 mapping** (preferred): One bounded context = one module
2. **1:N mapping** (rare): One context split into multiple modules only for:
   - Team scaling (>5 developers need separate modules)
   - Deployment independence requirements
   - Significantly different scaling characteristics

3. **N:1 mapping** (avoid): Multiple contexts in one module indicates:
   - Contexts should be merged (they're not truly separate)
   - Module is too large and needs splitting

### 2. Module Definition Template

For each module:

```markdown
## Module: {ModuleName}

**Bounded Context:** {context name}
**Business Capability:** {capability owned}
**Owner Team:** {team name}

### Data Ownership

| Entity | Owned By | tenant_id Required |
|--------|----------|-------------------|
| {Entity1} | This module | YES |
| {Entity2} | This module | YES |

### Module Boundaries

**IN Scope:**
- {responsibility 1}
- {responsibility 2}

**OUT of Scope:**
- {explicitly excluded responsibility}

### Complexity Classification

- [ ] SIMPLE: Single aggregate, CRUD operations, 0-1 dependencies
- [ ] STANDARD: Multiple aggregates, business logic, 2-4 dependencies
- [ ] COMPLEX: Multiple subdomains, AI behaviors, 5+ dependencies
```

### 3. Data Ownership Verification

For every entity in the system:

- [ ] Entity is owned by exactly one module
- [ ] No entity is orphaned (unowned)
- [ ] No entity has dual ownership
- [ ] All entities have `tenant_id`

### 4. Extraction Readiness Score

Rate each module's extraction readiness (ability to become a separate service):

| Score | Criteria |
|-------|----------|
| HIGH | Clear boundaries, few sync dependencies, event-driven integration |
| MEDIUM | Some sync dependencies, but facade abstracts internals |
| LOW | Many sync dependencies, shared database tables, complex transactions |

### 5. Document Output

Document:
- Complete module list with boundaries
- Data ownership matrix
- Complexity classification per module
- Extraction readiness scores

Present module boundary definitions for confirmation.

**Verify current best practices with web search:**
Search the web: "define module boundaries best practices {date}"
Search the web: "define module boundaries enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the module boundary definitions above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into ownership rules and extraction readiness
- **P (Party Mode)**: Bring architect and DevOps perspectives for boundary review
- **C (Continue)**: Accept module boundaries and proceed to facade design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: module definitions, ownership matrix, extraction scores
- Process enhanced insights on boundary quality
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into module definitions
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review module boundary definitions: {summary of modules and ownership}"
- Process collaborative analysis from architect and DevOps personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save module boundary definitions to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-design-facade-interfaces.md`

---

## Verification

- [ ] Context-to-module mapping follows rules
- [ ] Module definitions complete
- [ ] Data ownership verified (no orphans, no dual ownership)
- [ ] All entities have tenant_id
- [ ] Complexity classification assigned
- [ ] Extraction readiness scored
- [ ] Patterns align with pattern registry

---

## Outputs

- Module list with boundaries
- Data ownership matrix
- Complexity classifications
- Extraction readiness scores

---

## Next Step

Proceed to `step-04-c-design-facade-interfaces.md` to define public contracts.
