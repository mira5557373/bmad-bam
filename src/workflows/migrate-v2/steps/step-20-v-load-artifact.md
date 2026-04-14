# Step 20: Load Migration Artifact (Validate Mode)

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

Load migration artifacts for validation.

---

## Prerequisites

- Migration completed or in progress
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv`

---


## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/checklists/`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Migration Report

Load `{output_folder}/planning-artifacts/migration-report.md`.

### 2. Pre-Validation Checks

| Check | Status |
|-------|--------|
| Report exists | {yes/no} |
| Pattern files present | {yes/no} |
| Step files updated | {yes/no} |

### 3. Validate Artifact Structure

- Verify migration report format
- Check for required sections
- Validate referenced files exist

---

## COLLABORATION MENUS (A/P/C):

After loading, present the user with:

```
Your options:
- **C (Continue)**: Proceed to validation

Select an option:
```

---

## PROTOCOL INTEGRATION

### A/P/C Handler
- **[A] Response:** Deep-dive into requested topic, then return to current step
- **[P] Response:** Acknowledge party mode, continue with enhanced engagement
- **[C] Response:** Proceed to next logical step in workflow

---

## Verification

- [ ] Migration report loaded
- [ ] Pre-validation checks passed
- [ ] Artifact structure validated
- [ ] Ready for detailed validation

---

## Outputs

- Loaded migration artifact
- Pre-validation check results
- Artifact inventory

---

## Next Step

Proceed to `step-21-v-validate.md` for detailed validation.
