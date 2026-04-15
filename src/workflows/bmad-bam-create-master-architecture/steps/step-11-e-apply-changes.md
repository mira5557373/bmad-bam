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

Apply requested modifications to master architecture document while respecting freeze policies.

---

## Prerequisites

- Step 10 completed with identified modifications
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation,module-boundaries

---


## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Identify Affected Sections

Based on the user's requested changes, identify all affected sections in the master architecture document.

### 2. Present Current Content

Display the current content of each affected section before modification.

### 3. Apply Modifications

Apply the requested modifications while preserving:
- Document structure and table of contents
- Unaffected sections (no unnecessary changes)
- Cross-references between sections

### 4. Enforce Freeze Policy

If the master architecture is frozen (post foundation-gate), require:

| Requirement | Action |
|-------------|--------|
| Formal ADR justification | Document reason for change |
| Impact analysis | Assess dependent modules |
| Emergency workflow | Reference `bmad-bam-master-architecture-emergency-change` for significant changes |

### 5. Validate Modified Document

Validate the modified document against completeness criteria from Step 9.

### 6. Write Updated Document

Write the updated document back to `{output_folder}/planning-artifacts/master-architecture.md`.

### 7. Present Diff Summary

Present a diff summary of changes made and ask for confirmation.

---

## COLLABORATION MENUS (A/P/C):

After applying modifications, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific modification concerns
- **P (Party Mode)**: Bring architect and security perspectives on changes
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
- Context: "Review modifications to master architecture for safety and consistency"
- Process architect and security perspectives
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
- [ ] Freeze policy respected (ADR if frozen)
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated master architecture document
- Diff summary of changes

---

## Next Step

Return to workflow for validation or completion. If document was frozen, recommend re-running validation mode.
