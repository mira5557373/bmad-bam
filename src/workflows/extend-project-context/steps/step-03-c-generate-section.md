# Step 03: Generate BAM Section

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

Generate the BAM configuration section content based on gathered configuration choices.

---

## Prerequisites

- Step 02 completed: Configuration gathered
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation,agent-runtime

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Generate Section Header

```markdown
## BAM Configuration (Multi-Tenant AI SaaS)

This section documents the BAM (BMAD Agentic Multi-tenant) architecture decisions for this project.
```

### 2. Generate Tenant Model Subsection

Based on selected tenant model, generate:
- Model name and rationale
- Isolation boundaries
- Data access patterns
- Relevant pattern registry references

### 3. Generate AI Runtime Subsection

Based on selected AI runtime, generate:
- Runtime name and rationale
- Agent orchestration approach
- Memory tier configuration
- Tool execution boundaries

### 4. Generate Tier Structure Subsection

Document the tier structure:
- Tier names and descriptions
- Feature gates per tier
- Resource limits per tier
- Upgrade paths

### 5. Generate Pattern References

Include references to pattern registry:
- Relevant pattern IDs
- Web research queries for implementation details

**Verify current best practices with web search:**
Search the web: "generate bam section best practices {date}"
Search the web: "generate bam section enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After generating the section, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into section content
- **P (Party Mode)**: Bring tech writer and architect perspectives on content
- **C (Continue)**: Accept generated section and proceed to insert
- **[Specific refinements]**: Describe changes needed to the section

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: generated BAM section content
- Process enhanced insights on content completeness
- Ask user: "Accept this content analysis? (y/n)"
- If yes, incorporate refinements
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review generated BAM configuration section for clarity and completeness"
- Process tech writer and architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm section content
- Prepare for insertion
- Proceed to next step: `step-04-c-insert-validate.md`

---

## Verification

- [ ] Section header generated
- [ ] Tenant model subsection complete
- [ ] AI runtime subsection complete
- [ ] Tier structure subsection complete
- [ ] Pattern references included

---

## Outputs

- Complete BAM configuration section content
- Ready for insertion into project-context.md

---

## Next Step

Proceed to `step-04-c-insert-validate.md` to insert the section and validate.
