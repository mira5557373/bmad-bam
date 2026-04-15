# Step 11: Apply Targeted Modifications

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

This step applies the identified changes to the existing tenant onboarding artifacts. Changes are applied incrementally while preserving provisioning stage ordering and dependencies, rollback strategy consistency, tier configuration compatibility, and isolation boundary completeness.

---

## Prerequisites

- Step 10 completed with identified changes
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: event-driven`

---


## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Based on the user's requested changes:

1. Identify the affected sections in the onboarding documents
2. Present the current content of each affected section
3. Apply the requested modifications while preserving:
   - Provisioning stage ordering and dependencies
   - Rollback strategy consistency
   - Tier configuration compatibility
   - Isolation boundary completeness
4. If modifying provisioning stages, verify:
   - Stage dependencies are still valid
   - Rollback strategies are updated accordingly
   - Timeouts and retry configurations are appropriate
5. If modifying tier configurations, verify:
   - Changes are consistent across all tier references
   - Feature flags align with quota changes
   - No downgrade of existing tenant capabilities
6. Validate the modified documents against completeness criteria
7. Write updated documents back to their original locations

Present a diff summary of changes made and ask for confirmation.

---

## COLLABORATION MENUS (A/P/C):

After applying changes, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change impact and validation
- **P (Party Mode)**: Bring analyst and architect perspectives for change review
- **C (Continue)**: Accept changes and finalize onboarding update
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
- Context: "Review onboarding changes: {summary of modifications and impact}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save updated onboarding documents
- Update frontmatter `stepsCompleted: [10, 11]`
- Suggest validation mode if significant changes

---

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] Patterns align with pattern registry
- [ ] Stage dependencies remain valid
- [ ] Rollback strategies updated accordingly

---

## Outputs

- Updated tenant onboarding runbook
- Updated provisioning flow (if affected)

---

## Next Step

Run onboarding validation to verify changes against completeness criteria.
