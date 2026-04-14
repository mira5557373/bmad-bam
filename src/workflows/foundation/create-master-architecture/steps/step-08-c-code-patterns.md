# Step 8: Code Patterns

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

Select and document the canonical code patterns that all module implementations must follow. These patterns ensure consistency across the codebase.

---

## Prerequisites

- Tenant model and isolation strategy defined
- Module boundaries identified
- Shared kernel designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries

**Verify current best practices with web search:**
Search the web: "code patterns best practices {date}"
Search the web: "code patterns multi-tenant SaaS {date}"

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

### 1. Select Required Patterns

From the pattern registry, select patterns for each category:

| Category | Pattern | Description |
|----------|---------|-------------|
| Data Access | Repository (Tenant-Scoped) | Auto-filters by tenant via RLS |
| Module Boundary | Facade Pattern | DTOs at boundary, never entities |
| Events | Domain Event Pattern | Tenant metadata in envelope |
| Business Logic | Service Pattern | Coordinates cross-module calls |

### 2. Document Pattern Selection

For each selected pattern, document:
- Pattern name and source
- Why this pattern was selected
- How TenantContext integrates with the pattern
- Any project-specific adaptations

### 3. Define Pattern Compliance Rules

| Rule | Description | Enforcement |
|------|-------------|-------------|
| TenantContext first | First parameter in public methods | Code review |
| DTOs at boundary | Facades return DTOs, not entities | Linter rule |
| Event metadata | Events include tenant info | Schema validation |
| RLS filtering | Repositories use RLS, not WHERE | Query analysis |

---

## Soft Gate Checkpoint

**Steps 1-8 complete the analysis and design phases.**

Present summary of all decisions:
1. Tenant model and hierarchy
2. Isolation strategy matrix
3. Module boundaries and ownership
4. Shared kernel components
5. Technology stack
6. Core contracts
7. Code patterns established

Ask for confirmation before proceeding to assembly (Step 9).

---

## COLLABORATION MENUS (A/P/C):

After completing the code patterns analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific pattern concerns
- **P (Party Mode)**: Bring architect and senior dev perspectives on patterns
- **C (Continue)**: Accept patterns and proceed to assembly (soft gate)
- **[Specific refinements]**: Describe patterns to refine

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: pattern selection, compliance rules
- Process enhanced insights on pattern applicability
- Ask user: "Accept these refined patterns? (y/n)"
- If yes, integrate into pattern specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review code pattern selection for modular monolith"
- Process architect and senior developer perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save code patterns to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]`
- Present soft gate summary for approval
- After approval, proceed to: `step-09-c-assembly.md`

---

## Verification

- [ ] All required pattern categories covered
- [ ] Patterns reference pattern registry
- [ ] TenantContext integration documented for each
- [ ] Compliance rules defined
- [ ] Web research integrated for current best practices

---

## Outputs

- Code pattern selection document
- Pattern compliance checklist
- References to pattern examples
- **Load template:** `{project-root}/_bmad/bam/templates/code-pattern-spec.md`

---

## Next Step

After soft gate approval, proceed to `step-09-c-assembly.md`.
