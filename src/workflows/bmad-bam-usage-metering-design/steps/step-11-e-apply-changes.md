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

This step applies the identified changes to the existing usage metering design artifacts. Changes are applied incrementally while preserving billable resource consistency, metering event schema compatibility, aggregation pipeline integrity, and billing integration correctness.

---

## Prerequisites

- Step 10 completed with identified changes
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: usage-metering`

---


## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Based on the user's requested changes:

1. Identify the affected sections in the metering documents
2. Present the current content of each affected section
3. Apply the requested modifications while preserving:
   - Billable resource consistency
   - Metering event schema compatibility
   - Aggregation pipeline integrity
   - Billing integration correctness
4. If modifying billable resources, verify:
   - Tier inclusions are updated
   - Overage pricing is updated
   - Attribution rules are consistent
5. If modifying metering events, verify:
   - Schema backward compatibility
   - Idempotency handling preserved
   - Event validation rules updated
6. If modifying aggregation, verify:
   - All aggregation levels are consistent
   - Retention policies are appropriate
   - Quota tracking is updated
7. If modifying billing integration, verify:
   - API contracts are maintained
   - Reconciliation checks are updated
   - Error handling is comprehensive
8. Validate the modified documents against completeness criteria
9. Write updated documents back to their original locations

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
- Context: "Review applied changes to metering design: {summary of modifications}"
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
- [ ] Schema backward compatibility maintained
- [ ] Billing integration correctness verified

---

## Outputs

- Updated usage metering design
- Updated billing integration spec (if affected)
- Updated metering runbook (if affected)

---

## Next Step

Run metering validation to verify changes against completeness criteria.
