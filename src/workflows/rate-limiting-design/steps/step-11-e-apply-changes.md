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

This step applies the identified changes to the existing rate limiting artifacts. Changes are applied incrementally while preserving algorithm-to-enforcement alignment, tier-to-quota consistency, and monitoring coverage.

---

## Prerequisites

- Step 10 completed with identified changes
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `rate-limiting`

---


## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Based on the user's requested changes:

1. Identify the affected sections in the rate limiting documents
2. Present the current content of each affected section
3. Apply the requested modifications while preserving:
   - Algorithm-to-enforcement alignment
   - Tier-to-quota consistency
   - Header-to-monitoring alignment
   - Graceful degradation sequencing
4. If modifying algorithm, verify:
   - Enforcement mechanisms are updated accordingly
   - Monitoring metrics align with new algorithm
5. If modifying tier limits, verify:
   - Burst handling is consistent
   - Quota dimensions align
   - Response headers reflect new limits
6. If modifying monitoring, verify:
   - All rate limit events are tracked
   - Alerts cover new scenarios
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
- **C (Continue)**: Accept changes and finalize rate limiting update
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
- Context: "Review rate limiting changes: {summary of modifications and impact}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save updated rate limiting documents
- Update frontmatter `stepsCompleted: [10, 11]`
- Suggest validation mode if significant changes

---

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] Patterns align with pattern registry
- [ ] Algorithm-enforcement alignment maintained
- [ ] Tier-quota consistency preserved

---

## Outputs

- Updated rate limiting runbook
- Updated architecture document (if affected)

---

## Next Step

Run rate limiting validation to verify changes against completeness criteria.
