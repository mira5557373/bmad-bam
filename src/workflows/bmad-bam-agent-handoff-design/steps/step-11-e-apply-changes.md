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

Apply targeted modifications to the agent handoff architecture with ADR documentation.

---

## Prerequisites

- Step 10 completed: Existing documents loaded
- Modification targets identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: agent-orchestration

---

## Inputs

- Modification targets from Step 10
- User-specified changes
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Review Proposed Changes

| Section | Current State | Proposed Change | Impact |
|---------|---------------|-----------------|--------|
| {section} | {current} | {proposed} | {impact} |

### 2. Create ADR for Changes

| Field | Value |
|-------|-------|
| ADR ID | ADR-AHD-{number} |
| Title | {Change description} |
| Status | PROPOSED |

### 3. Apply Modifications

Update relevant sections, maintain version history, validate consistency.

---

## COLLABORATION MENUS (A/P/C):

After presenting the change summary, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change implications
- **P (Party Mode)**: Bring architect perspectives on change impact
- **C (Continue)**: Accept changes and complete edit
- **[Specific refinements]**: Describe additional changes needed

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save updated documents
- Mark Edit mode complete

---

## Verification

- [ ] All modifications applied correctly
- [ ] ADR created for significant changes
- [ ] Version history maintained
- [ ] Document consistency validated
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated agent handoff architecture document
- ADR documenting changes
- Change summary report

---

---

## Next Step

Edit workflow complete. Run Validate mode (`step-20-v-*`) to verify changes.

---

## Workflow Complete

Edit mode is complete. Run Validate mode to verify changes.
