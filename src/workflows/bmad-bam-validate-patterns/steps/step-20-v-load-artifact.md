# Step 20: Load Validation Artifact (Validate Mode)

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

Load existing validation report for re-validation.

---

## Prerequisites

- Validation report exists at `{output_folder}/planning-artifacts/pattern-validation-report.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv`

---


## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Report

Load `{output_folder}/planning-artifacts/pattern-validation-report.md`.

### 2. Pre-Validation Check

Verify report exists and is readable.

### 3. Prepare Validation Context

Extract key metrics for re-validation.

---

## COLLABORATION MENUS (A/P/C):

After loading:

```
Your options:
- **C (Continue)**: Proceed to re-validation

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

- [ ] Report loaded successfully
- [ ] Pre-validation check passed
- [ ] Validation context prepared

---

## Outputs

- Loaded validation report
- Validation context summary

---

## Next Step

Proceed to `step-21-v-validate.md` for re-validation.
