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

Apply requested modifications to security assessment documents while maintaining consistency and audit trail.

---

## Prerequisites

- Step 10 completed with identified modifications
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance

---


## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Identify Affected Components

Based on the user's requested changes, identify all affected components in the security assessment documents.

### 2. Present Current Content

Display the current content of each affected section before modification.

### 3. Apply Modifications

Apply the requested modifications while preserving:
- Document structure
- Audit trail for changes
- Finding IDs (no renumbering)
- Cross-references between documents

### 4. Update Finding Status

If updating findings, maintain proper status transitions:

| Current Status | Valid Transitions |
|----------------|-------------------|
| Open | In Progress, Closed (Fixed), Closed (Accepted Risk), Closed (False Positive) |
| In Progress | Closed (Fixed), Closed (Accepted Risk), Open (Reopened) |
| Closed | Open (Reopened) |

### 5. Update Remediation Roadmap

If findings changed, update remediation roadmap:
- Recalculate counts per priority
- Update timelines if needed
- Note any risk acceptance changes

### 6. Write Updated Documents

Write updated documents back to their original locations.

### 7. Present Diff Summary

Present a diff summary of changes made and ask for confirmation.

---

## COLLABORATION MENUS (A/P/C):

After applying modifications, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific modification concerns
- **P (Party Mode)**: Bring security and compliance perspectives on changes
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
- Context: "Review modifications to security assessment for completeness"
- Process security and compliance perspectives
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
- [ ] Audit trail maintained
- [ ] Finding IDs preserved
- [ ] Remediation roadmap updated
- [ ] Cross-references remain valid
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated security assessment documents
- Diff summary of changes
- Change audit log

---

## Next Step

Return to workflow for validation or completion.
