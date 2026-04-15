# Step 11: Apply Changes (Edit Mode)

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

Apply targeted modifications to the AI security testing design, documenting changes with ADR rationale.

---

## Prerequisites

- Step 10 completed: Existing documents loaded
- Modification targets identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-security

---

## Actions

### 1. Review Proposed Changes

Present each proposed change:

| Section | Current State | Proposed Change | Impact |
|---------|---------------|-----------------|--------|
| {section} | {current} | {proposed} | {impact} |

### 2. Create ADR for Changes

Document architectural decision:

| Field | Value |
|-------|-------|
| ADR ID | ADR-SEC-{number} |
| Title | {Change description} |
| Status | PROPOSED |
| Context | {Why change is needed} |
| Decision | {What we're changing} |
| Consequences | {Impact of change} |

### 3. Apply Modifications

For each approved change:
1. Update the relevant section
2. Maintain version history
3. Update cross-references
4. Validate consistency

### 4. Verify Changes

Run verification checks:
- [ ] Changes applied correctly
- [ ] No broken references
- [ ] ADR documented
- [ ] Version incremented

---

## COLLABORATION MENUS (A/P/C):

After applying changes, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change impact
- **P (Party Mode)**: Bring review perspectives on changes
- **C (Continue)**: Accept changes and complete edit
- **[Specific concerns]**: Describe concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: applied changes, ADR, impact assessment
- Process enhanced insights
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review applied changes to AI security testing design"
- Present synthesized recommendations
- Return to A/P/C menu

#### If 'C' (Continue):
- Save updated documents
- Mark Edit mode complete

---

## Verification

- [ ] All changes applied correctly
- [ ] ADR created and linked
- [ ] Version history updated
- [ ] Document consistency verified

---

## Outputs

- Updated AI security testing design
- ADR for changes
- Change log entry

---

## Next Step

Edit workflow complete. Run Validate mode (`step-20-v-*`) to verify changes meet quality criteria.

---

## Workflow Complete

Edit mode is complete. Run Validate mode to verify changes meet quality criteria.
