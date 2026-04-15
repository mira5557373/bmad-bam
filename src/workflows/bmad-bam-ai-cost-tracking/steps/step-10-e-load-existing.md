# Step 10: Load Existing Artifact (Edit Mode)

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

Load and review existing AI cost tracking architecture documents to identify sections requiring modification.

---

## Prerequisites

- Existing AI cost tracking architecture documents to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-operations

---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Existing Documents

Load the existing AI cost tracking documents:
- `{output_folder}/planning-artifacts/architecture/ai-cost-tracking-design.md`

If the files do not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current documents:

| Component | Status | Key Configuration |
|-----------|--------|-------------------|
| Token Metering | Yes/No | {counting strategy, pricing} |
| Compute Attribution | Yes/No | {categories, rules} |
| Aggregation Pipeline | Yes/No | {streaming, windows} |
| Billing Integration | Yes/No | {export, alerts} |

### 3. Identify Modification Targets

Confirm with the user which sections need modification.

---

## COLLABORATION MENUS (A/P/C):

After loading and presenting the existing documents, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific components before editing
- **P (Party Mode)**: Bring architect perspectives on proposed changes
- **C (Continue)**: Proceed to apply modifications
- **[Specific components]**: Describe which components to modify

Select an option:
```

#### If 'C' (Continue):
- Document identified modification targets
- Proceed to next step: `step-11-e-apply-changes.md`

---

## Verification

- [ ] All existing documents loaded successfully
- [ ] Document structure understood
- [ ] Sections for modification identified
- [ ] Patterns align with pattern registry

---

## Outputs

- Summary of current cost tracking architecture state
- List of sections to modify

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modifications.
