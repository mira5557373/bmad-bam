# Step 11: Apply Targeted Modifications

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Apply requested modifications to AI eval safety design documents while maintaining safety integrity.

## Prerequisites

- Step 10 completed with identified modifications
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: testing-agent-safety


---

## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Based on the user's requested changes:

1. Identify the affected sections in the safety design documents
2. Present the current content of each affected section
3. Apply the requested modifications while preserving:
   - Document structure and cross-references
   - Unaffected safety criteria
   - Existing golden tasks (unless explicitly updating)
   - Guardrail hierarchy integrity
4. If modifying safety criteria:
   - Verify golden tasks still cover new criteria
   - Update guardrail thresholds if needed
   - Adjust monitoring alerts accordingly
5. If adding new golden tasks:
   - Ensure coverage matrix remains complete
   - Validate task structure matches template
   - Update eval pipeline if new task type
6. Validate the modified documents against quality gates
7. Write updated documents back to their original locations

Present a diff summary of changes made and ask for confirmation.

## COLLABORATION MENUS (A/P/C):

After completing the modifications above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into modification impacts and ripple effects
- **P (Party Mode)**: Bring Change Analyst, Safety Engineer, and Integration Architect perspectives
- **C (Continue)**: Accept modifications and complete Edit mode
- **Review changes**: Describe specific modifications to review or adjust

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: applied modifications, impact analysis, cross-document effects
- Process enhanced insights
- Ask user: "Accept these refined modifications? (y/n)"
- If yes, integrate into safety documents
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review applied modifications to AI eval safety design for completeness and safety"
- Process Change Analyst, Safety Engineer, Integration Architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save updated safety documents to output locations
- Update frontmatter `stepsCompleted: [10, 11]`
- Return to workflow for validation or completion

---

## Verification

- [ ] Changes applied correctly
- [ ] No unintended side effects
- [ ] Safety coverage maintained
- [ ] Patterns align with pattern registry

## Outputs

- Updated AI eval safety design documents

## Next Step

Return to workflow for validation or completion.
