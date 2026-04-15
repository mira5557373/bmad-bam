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

Apply targeted modifications to the White-Labeling Design based on user requirements.

---

## Prerequisites

- Step 10 completed (Load Existing)
- Modification targets identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`

---


## Inputs

- Loaded artifact from Step 10
- Confirmed modification targets
- User change requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Apply the identified modifications:

### For Branding Asset Changes:
- Update logo specifications
- Modify color palette
- Adjust font configurations
- Update CDN settings

### For Theme Customization Changes:
- Update CSS variables
- Modify component mapping
- Adjust dark/light mode settings
- Update preview system

### For Domain Mapping Changes:
- Modify verification process
- Update SSL configuration
- Adjust DNS requirements
- Update multi-region settings

### For Portal Theming Changes:
- Update admin portal customization
- Modify end-user theming
- Adjust email templates
- Update mobile/widget theming

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
- Context: "Review applied changes to White-Labeling Design: {summary of changes}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save updated document
- Update frontmatter `stepsCompleted: [10, 11]`
- Output to `{output_folder}/planning-artifacts/tenant/white-labeling-design.md`

---

## Verification

- [ ] All requested changes applied
- [ ] Document consistency maintained
- [ ] Tenant isolation preserved
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated White-Labeling Design document
- Change summary log

---

## Edit Mode Complete

The White-Labeling Design document has been updated and saved.
