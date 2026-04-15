# Step 11: Apply Targeted Modifications (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Apply requested modifications to model fine-tuning design documents while maintaining consistency and integrity across all components.

---

## Prerequisites

- Step 10 completed with identified modifications
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: ai-runtime

---

## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Identify Affected Components

Based on the user's requested changes, identify all affected components:

| Change Request | Affected Components | Impact Level |
|----------------|---------------------|--------------|
| {user change} | {components} | High/Medium/Low |

### 2. Present Current Content

Display the current content of each affected section before modification.

### 3. Apply Modifications

Apply the requested modifications while preserving:
- Document structure
- Unaffected components
- Cross-references between sections
- Consistency with existing design decisions

### 4. Validate Design Consistency

After modifications, verify:
- Data isolation still enforces tenant boundaries
- Quotas align with tier definitions
- Versioning supports rollback requirements
- Monitoring covers modified components

### 5. Write Updated Documents

Write updated documents back to their original locations.

### 6. Present Diff Summary

Present a diff summary of changes made and ask for confirmation.

---

## COLLABORATION MENUS (A/P/C):

After applying modifications, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific modification concerns
- **P (Party Mode)**: Bring ML architect and platform perspectives on changes
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
- Context: "Review modifications to fine-tuning design for consistency and safety"
- Process ML architect and platform perspectives
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
- [ ] Cross-references remain valid
- [ ] Design consistency verified
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated model fine-tuning design documents
- Diff summary of changes

---

## Next Step

Return to workflow for validation or completion.
