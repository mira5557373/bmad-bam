# Step 11: Apply Changes

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Apply the identified modifications to the existing custom domain design document while maintaining consistency with unchanged sections.

---

## Prerequisites

- Step 10: Load Existing Artifact completed
- Modification targets confirmed

---

## Inputs

- Loaded artifact from step 10
- Confirmed modification targets
- User requirements for changes

---

## Actions

### 1. Apply Modifications

For each confirmed modification target:
- Present proposed changes
- Get user confirmation
- Apply changes maintaining document consistency
- Update related sections if dependencies exist

### 2. Validate Consistency

After applying changes:
- Check cross-references between sections
- Verify domain hierarchy consistency
- Confirm SSL/TLS alignment with domain changes
- Validate routing rules match updated domains

### 3. Document Changes

Record all modifications:
- Changed sections
- Reason for changes
- Impact on dependent configurations
- Version history update

---

## COLLABORATION MENUS (A/P/C):

After applying the changes, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change implications
- **P (Party Mode)**: Bring analyst and architect perspectives for change validation
- **C (Continue)**: Finalize changes and save document
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass change context: applied changes, consistency validation
- Process enhanced insights
- Ask user: "Accept these enhanced findings? (y/n)"
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review applied changes: {summary of modifications}"
- Process collaborative analysis
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save updated document
- Update frontmatter `stepsCompleted: [10, 11]`
- Complete Edit mode

---

## Verification

- [ ] All modifications applied
- [ ] Document consistency verified
- [ ] Cross-references updated
- [ ] Change log documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated custom domain design document
- Change log with modifications

---

## Workflow Complete

Edit mode complete for tenant-custom-domain-design workflow.
