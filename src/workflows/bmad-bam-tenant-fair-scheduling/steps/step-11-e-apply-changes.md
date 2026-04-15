# Step 11: Apply Targeted Modifications

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

This step applies the identified changes to the existing tenant fair scheduling artifacts. Changes are applied incrementally while preserving consistency across resource analysis, scheduling strategy, quotas, isolation mechanisms, and monitoring configurations.

---

## Prerequisites

- Step 10 completed with identified changes
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `scaling`

---

## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Based on the user's requested changes:

1. Identify the affected sections in the fair scheduling documents
2. Present the current content of each affected section
3. Apply the requested modifications while preserving:
   - Resource analysis consistency
   - Scheduling weight ratios
   - Quota tier relationships
   - Isolation mechanism dependencies
   - Alert threshold alignment
4. If modifying resource analysis, verify:
   - Consumption patterns remain valid
   - Noisy neighbor scenarios updated
5. If modifying scheduling strategy, verify:
   - Weight distribution sums correctly
   - Token bucket parameters are consistent
   - Priority classes don't conflict
6. If modifying quotas, verify:
   - Tier progression makes sense
   - Enforcement actions align with limits
7. If modifying isolation mechanisms, verify:
   - cgroups, namespaces, and limits are consistent
   - Security controls remain in place
8. If modifying monitoring, verify:
   - Thresholds align with quotas
   - Alert severity matches impact
9. Validate the modified documents against completeness criteria
10. Write updated documents back to their original locations

Present a diff summary of changes made and ask for confirmation.

---

## COLLABORATION MENUS (A/P/C):

After applying changes, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change impact and validation
- **P (Party Mode)**: Bring analyst and architect perspectives for change review
- **C (Continue)**: Accept changes and finalize fair scheduling update
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
- Context: "Review fair scheduling changes: {summary of modifications and impact}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save updated fair scheduling documents
- Update frontmatter `stepsCompleted: [10, 11]`
- Suggest validation mode if significant changes

---

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] Patterns align with pattern registry
- [ ] Scheduling weights remain balanced
- [ ] Quotas align with tier progression
- [ ] Isolation mechanisms consistent
- [ ] Alert thresholds aligned with quotas

---

## Outputs

- Updated tenant fair scheduling document
- Updated fair scheduling runbook (if affected)

---

## Next Step

Run fair scheduling validation to verify changes against completeness criteria.
