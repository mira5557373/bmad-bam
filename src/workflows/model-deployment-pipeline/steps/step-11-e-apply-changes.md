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

This step applies the identified changes to the existing model deployment pipeline artifacts. Changes are applied incrementally while preserving deployment strategy coherence, canary configuration consistency, rollback procedure completeness, and tenant notification alignment.

---

## Prerequisites

- Step 10 completed with identified changes
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `model-deployment`

---

## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Based on the user's requested changes:

1. Identify the affected sections in the deployment pipeline documents
2. Present the current content of each affected section
3. Apply the requested modifications while preserving:
   - Deployment strategy coherence across all components
   - Canary configuration alignment with rollback triggers
   - Validation gate consistency with quality requirements
   - Rollback procedure completeness
   - A/B testing framework integrity
   - Monitoring metric coverage
   - Tenant notification timing and content
   - Documentation accuracy

4. If modifying deployment strategy, verify:
   - Tenant rollout sequence still valid
   - Canary stages aligned with new strategy
   - Rollback procedures updated accordingly
   - Monitoring dashboards reflect changes

5. If modifying canary configuration, verify:
   - Traffic progression is monotonic
   - Rollback triggers are consistent
   - Metrics collection covers new stages
   - Manual gates appropriately placed

6. If modifying rollback procedures, verify:
   - All automatic triggers still valid
   - Manual procedures are complete
   - Data consistency maintained
   - Tenant notifications aligned

7. Validate the modified documents against completeness criteria
8. Write updated documents back to their original locations

Present a diff summary of changes made and ask for confirmation.

---

## COLLABORATION MENUS (A/P/C):

After applying changes, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change impact and validation
- **P (Party Mode)**: Bring analyst and architect perspectives for change review
- **C (Continue)**: Accept changes and finalize deployment pipeline update
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass change context: modifications applied, impact analysis
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into change validation
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review deployment changes: {summary of modifications and impact}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save updated deployment pipeline documents
- Update frontmatter `stepsCompleted: [10, 11]`
- Suggest validation mode if significant changes

---

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] Patterns align with pattern registry
- [ ] Deployment strategy remains coherent
- [ ] Canary configuration aligned
- [ ] Rollback procedures complete

---

## Outputs

- Updated model deployment specification
- Updated runbook (if affected)
- Updated rollback procedures (if affected)

---

## Next Step

Run deployment pipeline validation to verify changes against completeness criteria.
