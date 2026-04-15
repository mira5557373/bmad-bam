# Step 11: Apply Changes

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

Apply targeted modifications to the existing AI bias monitoring document.

## Prerequisites

- Existing artifact loaded (Step 10)
- Modification targets identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-safety, ai-testing

---

## Inputs

- Loaded artifact from Step 10
- Modification targets from user
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Apply the identified modifications:

1. **For each modification target:**
   - Load the relevant section
   - Apply user-specified changes
   - Validate against pattern registry
   - Preserve unchanged sections

2. **Update metadata:**
   - Increment version number
   - Update modification timestamp
   - Record change summary

3. **Validate changes:**
   - Ensure consistency across sections
   - Check for broken references
   - Verify quality gate alignment

Present the modified sections for user review.

## COLLABORATION MENUS (A/P/C):

After completing the modifications above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into modification impacts and dependencies
- **P (Party Mode)**: Bring AI Ethics Lead, Data Scientist, and QA perspectives
- **C (Continue)**: Accept modifications and save updated document
- **Revise changes**: Describe additional modifications needed

Select an option:
```

#### If 'C' (Continue):
- Save modified document to output location
- Update frontmatter `stepsCompleted: [10, 11]`
- Present change summary

---

## Verification

- [ ] All identified modifications applied
- [ ] Document consistency maintained
- [ ] Version metadata updated
- [ ] No broken references
- [ ] Patterns align with pattern registry

## Outputs

- Updated `{output_folder}/planning-artifacts/quality/bias-monitoring.md`
- Change summary

## Edit Mode Complete

AI bias monitoring document updated. Consider running Validate mode to verify against quality gates.
