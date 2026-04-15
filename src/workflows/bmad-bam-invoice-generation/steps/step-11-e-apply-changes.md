# Step 11: Apply Changes

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Apply the identified modifications to the invoice generation design while maintaining consistency across all related sections.

---

## Prerequisites

- Step 10: Load Existing Artifact completed
- Modification scope confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: billing-integration

---

## Inputs

- Loaded artifact from step 10
- Confirmed modification list
- Pattern registry for validation

---

## Actions

### 1. Apply Schema Changes

If modifying invoice schema:
- Update field definitions
- Validate against existing data
- Document migration requirements

### 2. Apply Aggregation Changes

If modifying usage aggregation:
- Update source configurations
- Validate mapping consistency
- Test calculation accuracy

### 3. Apply Scheduling Changes

If modifying scheduling:
- Update cycle configurations
- Validate retry logic
- Confirm notification triggers

### 4. Apply PDF Changes

If modifying PDF generation:
- Update template configurations
- Validate rendering output
- Test localization handling

### 5. Validate Cross-Section Consistency

Ensure changes maintain consistency:
- Schema changes reflected in PDF templates
- Aggregation changes aligned with line items
- Scheduling changes compatible with delivery

---

## COLLABORATION MENUS (A/P/C):

After applying the changes above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change impact using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for change review
- **C (Continue)**: Accept changes and complete edit mode
- **[Specific refinements]**: Describe additional modifications needed

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass change context: modifications applied, impact analysis
- Process enhanced insights from deep questioning
- Ask user: "Accept these findings? (y/n)"
- If yes, integrate into change summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review applied changes for invoice generation: {summary of modifications}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save modified artifacts
- Update frontmatter `stepsCompleted: [10, 11]`
- Edit mode complete

---

## Verification

- [ ] All identified changes applied
- [ ] Cross-section consistency maintained
- [ ] No regression in existing functionality
- [ ] Documentation updated
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated invoice generation design
- Change log documenting modifications
- Migration notes (if applicable)

---

## Next Step

Edit mode complete. Recommend running Validate mode (`step-20-v-load-artifact.md`) to verify changes.
