# Step 11: Resume Migration (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

### EXECUTION PROTOCOLS

- 🎯 **Output Delivery:** Present outputs clearly with headers
- 💾 **State Persistence:** Update document frontmatter after changes
- 📝 **Documentation:** Record decisions with rationale
- ✅ **Verification:** Confirm completion before proceeding

---

## Purpose

Resume migration from the identified checkpoint.

---

## Prerequisites

- Step 10 completed: Migration state loaded

---


## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Resume from Checkpoint

Based on migration state, resume from the appropriate Create mode step:
- If directives not complete: `step-02-c-transform-directives.md`
- If step files not complete: `step-03-c-update-steps.md`
- If variables not complete: `step-04-c-fix-variables.md`
- If validation not complete: `step-05-c-validate-migration.md`

### 2. Continue Migration

Execute remaining migration steps.

---

## COLLABORATION MENUS (A/P/C):

Present the user with:

```
Your options:
- **C (Continue)**: Resume migration from checkpoint

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Resume from identified checkpoint
- Complete migration workflow

---

## Verification

- [ ] Migration state loaded from Step 10
- [ ] Checkpoint identified correctly
- [ ] Remaining steps determined
- [ ] Migration resumed successfully

---

## Outputs

- Resumed migration workflow
- Updated migration state

---

## Next Step

Edit workflow complete. Run Validate mode (`step-20-v-*`) to verify migration.

---

## Workflow Complete

Edit mode complete when migration resumes and completes.
