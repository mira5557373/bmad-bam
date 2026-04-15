# Step 11: Apply Changes

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

---

## Purpose

Apply targeted modifications to the OpenAPI Spec Management design based on user requirements.

---

## Prerequisites

- Step 10 completed (Load Existing)
- Modification targets identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `api-design`

---


## Inputs

- Loaded artifact from Step 10
- Confirmed modification targets
- User change requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Apply the identified modifications:

### For Structure Standards Changes:
- Update OpenAPI version selection
- Modify file organization
- Adjust naming conventions
- Update security schemes

### For Version Control Changes:
- Modify versioning strategy
- Update change classification
- Adjust deprecation policy

### For Validation Rule Changes:
- Add/remove linting rules
- Update security validation
- Modify tenant isolation checks

### For Publishing Pipeline Changes:
- Update documentation tools
- Modify SDK generation config
- Adjust environment settings

Present the changes in diff format for user review before applying.

---

## COLLABORATION MENUS (A/P/C):

After applying changes above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into additional changes using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for change review
- **C (Continue)**: Accept changes and save updated document
- **[Specific refinements]**: Describe additional modifications needed

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass change context: modifications made, potential impact areas
- Process enhanced insights from deep questioning
- Ask user: "Accept these additional changes? (y/n)"
- If yes, apply additional modifications
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review applied changes to OpenAPI Spec Management: {summary of changes}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save updated document
- Update frontmatter `stepsCompleted: [10, 11]`
- Output to `{output_folder}/planning-artifacts/api/openapi-spec-management.md`

---

## Verification

- [ ] All requested changes applied
- [ ] Document consistency maintained
- [ ] No breaking conflicts introduced
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated OpenAPI Spec Management document
- Change summary log

---

## Edit Mode Complete

The OpenAPI Spec Management document has been updated and saved.
