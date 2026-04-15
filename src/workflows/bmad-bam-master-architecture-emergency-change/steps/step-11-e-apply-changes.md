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

This step applies the identified changes to the existing emergency change artifacts. Changes are applied incrementally while preserving emergency ID tracking, approval chain integrity, audit trail completeness, and ensuring rollback procedures remain valid.

---

## Prerequisites

- Step 10 (Load Existing Artifact) completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries

---


## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Based on the user's requested changes:

### 1. Identify Affected Phase

Identify the affected phase in the emergency change process.

### 2. Present Current Content

Present the current content of each affected document.

### 3. Apply Modifications

Apply the requested modifications while preserving:
- Emergency ID and tracking
- Approval chain integrity
- Audit trail

### 4. Scope Change Handling

If modifying emergency scope:
- Re-assess impact
- May require re-approval
- Update all dependent documents

### 5. Implementation Plan Changes

If modifying implementation plan:
- Verify approval still valid
- Update rollback procedures if needed
- Notify affected teams

### 6. Post-Implementation Updates

If adding new information post-implementation:
- Update implementation log
- Add to lessons learned
- Create additional tech debt items if needed

### 7. Validate and Write

- Validate the modified documents against quality gates
- Write updated documents back to their original locations

**CRITICAL:** Changes to approval status require re-running approval process.

Present a diff summary of changes made and ask for confirmation.

---

## COLLABORATION MENUS (A/P/C):

After applying modifications, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change validation and impact analysis
- **P (Party Mode)**: Bring architect and QA perspectives on modifications
- **C (Continue)**: Accept modifications and complete edit mode
- **[Specific refinements]**: Describe additional changes needed

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: modifications applied, validation status, side effects identified
- Process enhanced insights on modification quality
- Ask user: "Accept this validation of modifications? (y/n)"
- If yes, document validation results
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review modifications to emergency change documents"
- Process architect and QA perspectives on changes
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save modified documents
- Edit mode complete - return to workflow selection or proceed to validation

---

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] Approval chain integrity maintained
- [ ] Audit trail preserved
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated emergency change documents
- Updated implementation plan (if applicable)
- Updated rollback procedures (if applicable)

---

## Next Step

Edit mode complete. Return to workflow selection or proceed to validation.
