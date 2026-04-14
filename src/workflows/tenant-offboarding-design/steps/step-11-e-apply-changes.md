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

This step applies the identified changes to the existing tenant offboarding artifacts. Changes are applied incrementally while preserving deprovisioning stage ordering, data retention compliance requirements, cleanup verification procedures, and audit trail completeness.

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

1. Identify the affected sections in the offboarding documents
2. Present the current content of each affected section
3. Apply the requested modifications while preserving:
   - Deprovisioning stage ordering and timing
   - Data retention compliance requirements
   - Cleanup verification procedures
   - Audit trail completeness
4. If modifying deprovisioning stages, verify:
   - Grace periods are still compliant with regulations
   - Cancellation points are clearly defined
   - Notification sequences are updated
5. If modifying data retention policies, verify:
   - GDPR compliance is maintained
   - Regulatory minimums are not violated
   - Anonymization rules are consistent
6. If modifying cleanup procedures, verify:
   - All isolation boundaries are still covered
   - Verification checks are updated
   - Audit certificates are still generated
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
- **C (Continue)**: Accept changes and finalize offboarding update
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
- Context: "Review offboarding changes: {summary of modifications and impact}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save updated offboarding documents
- Update frontmatter `stepsCompleted: [10, 11]`
- Suggest validation mode if significant changes

---

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] Patterns align with pattern registry
- [ ] GDPR compliance maintained
- [ ] Audit trail completeness preserved

---

## Outputs

- Updated tenant offboarding runbook
- Updated deprovisioning flow (if affected)
- Updated data retention policy (if affected)

---

## Next Step

Run offboarding validation to verify changes against compliance and completeness criteria.
