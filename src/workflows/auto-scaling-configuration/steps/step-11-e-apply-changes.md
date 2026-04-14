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

Apply the identified modifications to the existing auto-scaling configuration document. Changes are applied incrementally while preserving document structure and ensuring tenant fairness is maintained.

---

## Prerequisites

- Step 10: Load Existing Artifact completed
- Modification targets confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `auto-scaling`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `infrastructure`

---

## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Apply Modifications

For each confirmed modification target:
- Present proposed changes
- Get user confirmation
- Apply changes maintaining document consistency

### 2. Validate Consistency

After applying changes:
- Check metric-to-policy alignment
- Verify tenant fairness consistency
- Confirm cost control alignment

### 3. Document Changes

Record all modifications with reasons and impact.

---

## COLLABORATION MENUS (A/P/C):

After applying changes, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change impact and validation
- **P (Party Mode)**: Bring analyst and architect perspectives for change review
- **C (Continue)**: Accept changes and finalize auto-scaling configuration update
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
- Context: "Review auto-scaling changes: {summary of modifications and impact}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save updated auto-scaling configuration document
- Update frontmatter `stepsCompleted: [10, 11]`
- Suggest validation mode if significant changes

---

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] Metric-to-policy alignment verified
- [ ] Tenant fairness consistency maintained
- [ ] Cost control alignment confirmed
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated auto-scaling configuration document
- Change summary with reasons and impact

---

## Next Step

Run auto-scaling configuration validation to verify changes against infrastructure requirements.

---

## Workflow Complete

Edit mode complete for auto-scaling-configuration workflow.
