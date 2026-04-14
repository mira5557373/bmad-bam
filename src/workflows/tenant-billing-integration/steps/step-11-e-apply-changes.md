# Step 11: Apply Targeted Modifications

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

This step applies the identified changes to the existing billing integration artifacts. Changes are applied incrementally while preserving billing consistency, pricing model integrity, payment processing correctness, and subscription lifecycle coherence.

---

## Prerequisites

- Step 10 completed with identified changes
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `billing-integration`

---


## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Based on the user's requested changes:

1. Identify the affected sections in the billing documents
2. Present the current content of each affected section
3. Apply the requested modifications while preserving:
   - Billing requirements consistency
   - Pricing model integrity
   - Payment processing correctness
   - Subscription lifecycle coherence
   - Reconciliation accuracy

4. If modifying billing requirements, verify:
   - Provider compatibility maintained
   - Compliance requirements updated
   - Currency support consistent

5. If modifying pricing models, verify:
   - Tier pricing consistent
   - Overage pricing updated
   - Proration rules aligned

6. If modifying payment processing, verify:
   - Retry logic consistent
   - Dunning workflow complete
   - Webhook handlers updated

7. If modifying subscription management, verify:
   - Lifecycle states consistent
   - Tier change rules aligned
   - Trial handling updated

8. If modifying reconciliation, verify:
   - All reconciliation types consistent
   - Discrepancy handling complete
   - Audit trail updated

9. Validate the modified documents against completeness criteria
10. Write updated documents back to their original locations

Present a diff summary of changes made and ask for confirmation.

---

## COLLABORATION MENUS (A/P/C):

After applying the changes above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change validation using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for change review
- **C (Continue)**: Accept changes and complete Edit mode
- **[Specific refinements]**: Describe additional changes needed

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass change context: modifications made, affected sections
- Process enhanced insights from deep questioning
- Ask user: "Accept these additional refinements? (y/n)"
- If yes, integrate additional changes
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review applied changes to billing integration: {summary of modifications}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save updated documents
- Update frontmatter `stepsCompleted: [10, 11]`
- Edit mode complete

---

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] Patterns align with pattern registry
- [ ] Pricing model integrity maintained
- [ ] Payment processing correctness verified
- [ ] Subscription lifecycle consistent

---

## Outputs

- Updated billing integration specification
- Updated reconciliation runbook (if affected)
- Updated subscription management doc (if affected)

---

## Next Step

Run billing integration validation to verify changes against completeness criteria.
