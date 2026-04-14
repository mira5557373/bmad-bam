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

Apply the identified modifications to the payment processing design while maintaining consistency across all related sections.

---

## Prerequisites

- Step 10: Load Existing Artifact completed
- Modification scope confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: payment-processing

---

## Inputs

- Loaded artifact from step 10
- Confirmed modification list
- Pattern registry for validation

---

## Actions

### 1. Apply Gateway Changes

If modifying gateway configuration:
- Update gateway selection
- Validate API compatibility
- Document migration requirements

### 2. Apply Payment Method Changes

If modifying payment methods:
- Update method configurations
- Validate regional availability
- Test validation rules

### 3. Apply Transaction Changes

If modifying transaction processing:
- Update flow configurations
- Validate retry logic
- Confirm idempotency handling

### 4. Apply Webhook Changes

If modifying webhook handling:
- Update event subscriptions
- Validate security configuration
- Test event processing

### 5. Validate Cross-Section Consistency

Ensure changes maintain consistency:
- Gateway changes reflected in webhooks
- Payment method changes aligned with transactions
- Security configurations consistent

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
- Context: "Review applied changes for payment processing: {summary of modifications}"
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

- Updated payment processing design
- Change log documenting modifications
- Migration notes (if applicable)

---

## Next Step

Edit mode complete. Recommend running Validate mode (`step-20-v-load-artifact.md`) to verify changes.
