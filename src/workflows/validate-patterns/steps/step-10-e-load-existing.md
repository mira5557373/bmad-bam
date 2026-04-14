# Step 10: Load Existing Report (Edit Mode)

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

Load existing validation report for updates.

---

## Prerequisites

- Existing validation report at `{output_folder}/planning-artifacts/pattern-validation-report.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv`

---


## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Existing Report

Load `{output_folder}/planning-artifacts/pattern-validation-report.md`.

### 2. Present Current Findings

Display existing validation results and findings.

### 3. Identify Update Scope

Ask user what aspects to update or re-validate.

---

## COLLABORATION MENUS (A/P/C):

After loading:

```
Your options:
- **C (Continue)**: Apply updates to validation report

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

- [ ] Existing report loaded
- [ ] Current findings presented
- [ ] Update scope identified

---

## Outputs

- Loaded validation report
- Update scope document

---

## Next Step

Proceed to `step-11-e-apply-changes.md` to apply updates.
