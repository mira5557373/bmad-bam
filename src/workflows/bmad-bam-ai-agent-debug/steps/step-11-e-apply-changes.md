# Step 11: Apply Targeted Modifications (Edit Mode)

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

Apply requested modifications to the debug report while maintaining consistency and evidence integrity.

---

## Prerequisites

- Step 10 completed with identified modifications
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: agent-runtime

---


## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Identify Affected Sections

Based on the user's requested changes, identify the affected sections in the debug report.

### 2. Present Current Content

Display the current content of each affected section.

### 3. Apply Modifications

Apply the requested modifications while preserving:
- Execution context details
- Evidence from logs and traces
- Unaffected analysis sections

### 4. Additional Analysis (if needed)

If adding new failure analysis:
- Gather additional execution context if needed
- Re-run state history analysis for new scope
- Update failure classification

### 5. Update Recommendations

Update recommendations based on new findings.

### 6. Write Updated Report

Write updated report back to original location.

### 7. Present Diff Summary

Present a diff summary of changes made and ask for confirmation.

---

## COLLABORATION MENUS (A/P/C):

After applying modifications, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific modification concerns
- **P (Party Mode)**: Bring AI engineer and QA perspectives on changes
- **C (Continue)**: Accept modifications and complete Edit mode
- **[Specific refinements]**: Describe additional changes needed

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: original content, modifications applied, diff summary
- Process enhanced insights on modification impact
- Ask user: "Accept these insights on the modifications? (y/n)"
- If yes, document impact assessment
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review modifications to AI agent debug report for consistency"
- Process AI engineer and QA perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm changes are saved
- Update document version and modification date
- Return to workflow for validation or completion

---

## Verification

- [ ] Changes applied correctly
- [ ] No unintended side effects
- [ ] Evidence chain preserved
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated debug report

---

## Next Step

Return to workflow for validation or completion.
