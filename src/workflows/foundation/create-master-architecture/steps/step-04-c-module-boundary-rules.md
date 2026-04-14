# Step 4: Module Boundary Rules

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

Establish strict module boundary rules that enforce encapsulation, prevent coupling, and enable independent module evolution.

---

## Prerequisites

- AI runtime decisions complete (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries,facade-contracts

**Verify current best practices with web search:**
Search the web: "module boundary best practices {date}"
Search the web: "module boundary multi-tenant SaaS {date}"

Reference web research findings in your analysis.
_Source: [URL]_ for key findings.

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Facade Requirements

- All public interfaces via facade pattern only
- Every facade method must accept TenantContext
- Facade methods return DTOs, never internal entities
- Version facade interfaces for backward compatibility

### 2. Document Forbidden Dependency Patterns

| Pattern | Why Forbidden | Detection |
|---------|---------------|-----------|
| Circular dependencies | Prevents independent deployment | Linter rule |
| Direct internal imports | Bypasses encapsulation | Import analysis |
| Shared mutable state | Coupling and race conditions | Code review |
| Cross-module DB joins | Violates ownership | Query analysis |

### 3. Establish Event Ownership Rules

- One publisher per event type (single source of truth)
- Event schemas versioned and documented
- Publishers responsible for event schema evolution
- Consumers must handle unknown fields gracefully

### 4. Define Database Ownership Rules

- Each table owned by exactly one module
- Foreign keys only within module boundaries
- Cross-module references via ID only (no joins)
- Shared lookup tables owned by shared-kernel

---

## COLLABORATION MENUS (A/P/C):

After completing the module boundary analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific boundary concerns
- **P (Party Mode)**: Bring architect and dev perspectives on module design
- **C (Continue)**: Accept boundary rules and proceed to shared kernel
- **[Specific refinements]**: Describe boundary concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: boundary rules defined, potential edge cases
- Process enhanced insights on module coupling concerns
- Ask user: "Accept these refined rules? (y/n)"
- If yes, integrate into boundary specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review module boundary rules for modular monolith design"
- Process architect and developer perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save module boundary rules to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-shared-kernel-definition.md`

---

## Verification

- [ ] Facade requirements documented
- [ ] Forbidden dependency patterns listed
- [ ] Event ownership rules established
- [ ] Database ownership rules defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Module boundary enforcement checklist
- Dependency validation script/linter rules
- Event ownership registry
- Database ownership matrix
- **Load template:** `{project-root}/_bmad/bam/templates/module-architecture-template.md`

---

## Next Step

Proceed to `step-05-c-shared-kernel-definition.md` to define common infrastructure components.
