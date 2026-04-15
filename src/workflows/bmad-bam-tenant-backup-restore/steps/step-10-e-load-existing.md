# Step 10: Load Existing Artifact

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Load existing backup/restore design documents for modification.

---

## Prerequisites

- Existing backup/restore documents to modify

---

## Actions

### 1. Load Artifacts

Load: `{output_folder}/planning-artifacts/operations/tenant-backup-restore.md`

If the file does not exist, suggest switching to Create mode.

### 2. Parse Document Structure

Display summary of current configuration.

### 3. Confirm Modification Targets

Confirm which sections need modification.

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into modification requirements
- **P (Party Mode)**: Bring perspectives for change review
- **C (Continue)**: Proceed to apply modifications
```

#### If 'C' (Continue):
- Update frontmatter `stepsCompleted: [10]`
- Proceed to: `step-11-e-apply-changes.md`

---

## Verification

- [ ] Artifacts loaded successfully
- [ ] Modification scope confirmed

---

## Outputs

- Loaded document content
- Parsed document structure
- Modification/validation targets identified

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modification targets.
