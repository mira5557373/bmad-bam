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

This step applies the identified changes to the existing runbook artifacts. Changes are applied incrementally while preserving document structure, unaffected procedures, and maintaining consistency across related runbooks.

---

## Prerequisites

- Step 10 completed with identified changes
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: operations`

---

## Inputs

- Loaded runbooks from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Based on the user's requested changes:

### 1. Identify Affected Sections

Identify the affected sections in the runbook documents:
- Specific procedure steps
- Contact information
- Escalation paths
- Recovery procedures

### 2. Present Current Content

Present the current content of each affected section to the user for review.

### 3. Apply Modifications

Apply the requested modifications while preserving:
- Document structure and formatting
- Unaffected procedures and sections
- Cross-references between runbooks
- Version history and changelog

### 4. Update Cross-References

If modifying procedures that are referenced elsewhere:
- Update the runbook collection index
- Verify cross-references remain valid
- Update last-modified timestamps

### 5. Validate Consistency

Verify the modified runbooks:
- Contact information is consistent across runbooks
- Escalation paths are complete
- Procedures reference current systems/tools
- No orphaned references

### 6. Write Updated Documents

Write updated documents back to their original locations:
- `{output_folder}/planning-artifacts/runbook-collection.md`
- Affected individual runbooks

Present a diff summary of changes made and ask for confirmation.

---

## COLLABORATION MENUS (A/P/C):

After applying changes, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change impact and validation
- **P (Party Mode)**: Bring analyst and architect perspectives for change review
- **C (Continue)**: Accept changes and finalize runbook update
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
- Context: "Review runbook changes: {summary of modifications and impact}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save updated runbooks
- Update frontmatter `stepsCompleted: [10, 11]`
- Suggest validation mode if significant changes

---

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] Patterns align with pattern registry
- [ ] Cross-references remain valid
- [ ] Contact information consistent

---

## Outputs

- Updated runbook collection
- Updated individual runbooks (as affected)

---

## Next Step

Run runbook validation (QG-OC) to verify changes against operational checklist requirements.
