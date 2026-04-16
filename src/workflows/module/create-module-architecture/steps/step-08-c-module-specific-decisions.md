# Step 8: Module-Specific Decisions

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

Document architectural decisions specific to this module that extend or adapt patterns from the master architecture.

---

## Prerequisites

- Events published defined (Step 7)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Identify Decision Points

- What patterns from master need adaptation?
- What new patterns are needed for this module?
- What technology choices are module-specific?

### 2. Document Module ADRs

- Follow ADR template (context, decision, consequences)
- Reference master architecture where applicable
- Include alternatives considered
- Document trade-offs explicitly

### 3. Track Pattern Variations

- Explain why standard pattern doesn't fit
- Document the variation clearly
- Note any risks or technical debt

### 4. Plan Pattern Promotion

- If pattern proves useful, flag for promotion
- After 2+ modules use same pattern, promote to master
- Follow formal ADR process for promotion

**Verify current best practices with web search:**
Search the web: "architecture decision records module patterns {date}"
Search the web: "ADR bounded context {date}"

_Source: [URL]_

---

## Questions to Consider

- Is this decision truly module-specific or broadly applicable?
- Does this decision create technical debt?
- How will this decision impact module maintainability?
- Should you consult with other module teams first?

**SIMPLE modules:** Skip if all decisions inherited from master

---

## COLLABORATION MENUS (A/P/C):

After completing the ADR documentation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into decision rationale and trade-offs
- **P (Party Mode)**: Bring architect perspectives for ADR validation
- **C (Continue)**: Accept module ADRs and proceed to AI behaviors
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: decision points, ADRs, pattern variations
- Process enhanced insights on decision impact
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into ADR documentation
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review module-specific ADRs: {decisions, variations, promotion candidates}"
- Process collaborative analysis from architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save ADR documentation to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]`
- Proceed to next step: `step-09-c-ai-behaviors.md`

---

## Verification

- [ ] Decision points identified
- [ ] Module ADRs documented
- [ ] Pattern variations tracked
- [ ] Promotion candidates flagged
- [ ] Technical debt logged (if applicable)
- [ ] Patterns align with pattern registry

---

## Outputs

- Module-specific ADR documents
- Pattern variation registry
- Technical debt log

---

## Next Step

Proceed to `step-09-c-ai-behaviors.md` to define AI interactions (if applicable).
