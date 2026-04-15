# Step 10: Assembly

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

Combine all design outputs into the final module architecture document.

---

## Prerequisites

- AI behaviors defined (Step 9) or skipped for non-AI modules
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Combine All Sections

Assemble into `modules/{module-name}/architecture.md`:
- Module identity and bounded context
- Domain model with aggregates and entities
- Public facade design
- Dependencies and events
- Module-specific ADRs
- AI behaviors (if applicable)

### 2. Add Inheritance Reference

- Reference to master architecture version
- Document any approved deviations
- Link to shared kernel version

### 3. Validate Against Master Constraints

- Verify tenant isolation patterns applied
- Confirm entity tenant_id requirements
- Check facade contract compliance
- Validate error handling patterns

### 4. Generate Module Context

- Create `module-context.md` (compact summary for story creation)
- Extract key interfaces and contracts
- Document integration points

### 5. Register Module

- Update `sprint-status.yaml` as 'architecture-complete'
- Record complexity classification
- Note any outstanding items

**Verify current best practices with web search:**
Search the web: "module architecture assembly module patterns {date}"
Search the web: "architecture document bounded context {date}"

_Source: [URL]_

---

## COMPLEX Module Extensions

| Extension                  | Trigger                                     |
| -------------------------- | ------------------------------------------- |
| Pattern Gap Research       | Novel pattern needed not in master arch     |
| Spike Story                | High uncertainty in domain model            |
| Integration Design Session | 4+ facade dependencies                      |
| Risk Analysis              | Revenue-critical or compliance-heavy module |

---

## COLLABORATION MENUS (A/P/C):

After completing the assembly above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into assembly quality and completeness
- **P (Party Mode)**: Bring architect perspectives for final review
- **C (Continue)**: Accept assembled architecture and complete workflow
- **[Specific refinements]**: Describe what you'd like to refine

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: assembled architecture, constraint validation results
- Process enhanced insights on completeness
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate any refinements
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review assembled module architecture: {summary of all sections}"
- Process collaborative analysis from architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save final architecture document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`
- Mark workflow as complete

---

## Verification

- [ ] All sections combined into architecture.md
- [ ] Inheritance reference to master architecture added
- [ ] Master constraints validated
- [ ] Module-context.md generated
- [ ] Module registered in sprint-status.yaml
- [ ] Patterns align with pattern registry

---

## Outputs

- Module architecture document
- Module context summary
- Updated sprint-status.yaml
- **Load template:** `{project-root}/_bmad/bam/data/templates/module-architecture-template.md`

---

## Next Step

Run `validate-module` to verify architecture completeness before sprint planning.
