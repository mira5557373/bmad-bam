# Step 04: Fix Template Variables

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

Transform all uppercase template variables to lowercase BMM-compatible format.

---

## Prerequisites

- Step 03 completed: Step files updated
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Variable Mapping

| Uppercase | Lowercase |
|-----------|-----------|
| `{{PROJECT_NAME}}` | `{{project_name}}` |
| `{{DATE}}` | `{{date}}` |
| `{{VERSION}}` | `{{version}}` |
| `{{AUTHOR}}` | `{{user_name}}` |
| `{{MODULE_NAME}}` | `{{module_name}}` |
| `{{TENANT_ID}}` | `{{tenant_id}}` |
| `{{TIER}}` | `{{tier}}` |
| `{{STATUS}}` | `{{status}}` |

### 2. Transform Template Files

Apply transformations to all files in `src/templates/`.

### 3. Transform Step Files

Apply transformations to step files if they contain template variables.

### 4. Track Transformation Progress

| File | Variables Found | Transformed | Status |
|------|----------------|-------------|--------|
| | | | |

**Verify current best practices with web search:**
Search the web: "fix template variables best practices {date}"
Search the web: "fix template variables enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After fixing variables, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into variable transformations
- **P (Party Mode)**: Bring tech writer perspectives on naming conventions
- **C (Continue)**: Accept transformations and proceed to validation
- **[Specific concerns]**: Describe concerns about variable names

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: variable transformations, naming conventions
- Process enhanced insights on consistency
- Ask user: "Accept these naming conventions? (y/n)"
- If yes, document conventions
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review template variable naming conventions"
- Process tech writer perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm variables fixed
- Proceed to next step: `step-05-c-validate-migration.md`

---

## Verification

- [ ] All uppercase variables identified
- [ ] Transformations applied correctly
- [ ] No orphaned uppercase variables

---

## Outputs

- Transformed template files
- Transformation log

---

## Next Step

Proceed to `step-05-c-validate-migration.md` to validate the migration.
