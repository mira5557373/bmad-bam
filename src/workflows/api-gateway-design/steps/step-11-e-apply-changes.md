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

Apply requested modifications to gateway design while maintaining configuration integrity.

## Prerequisites

- Step 10 completed with identified modifications
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: api-gateway

---

## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Based on the user's requested changes:

1. Identify the affected sections in the gateway design
2. Present the current content of each affected section
3. Apply the requested modifications while preserving:
   - Document structure and formatting
   - Existing route configurations
   - Cross-references between documents
4. If modifying rate limiting:
   - Update tier quotas
   - Recalculate burst limits
   - Update enforcement configuration
5. If modifying authentication:
   - Update auth flow configurations
   - Verify tenant context extraction
   - Update security policies
6. Validate the modified documents against quality gates
7. Write updated documents back to their original locations

Present a diff summary of changes made and ask for confirmation.

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After applying modifications, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into modification impact and dependencies
- **P (Party Mode)**: Bring analyst and architect perspectives for change review
- **C (Continue)**: Complete Edit mode - return to workflow
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass modification context: changes applied, impact analysis
- Process enhanced insights from deep questioning
- Ask user: "Accept this analysis? (y/n)"
- If yes, finalize modifications
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review applied modifications to gateway design: {summary of changes}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save updated documents
- Edit mode complete

---

## Verification

- [ ] Changes applied correctly
- [ ] No unintended side effects
- [ ] Configuration consistency maintained
- [ ] Patterns align with pattern registry

## Outputs

- Updated gateway design documents

## Next Step

Return to workflow for validation or completion.
