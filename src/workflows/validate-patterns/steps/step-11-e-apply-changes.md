# Step 11: Apply Updates (Edit Mode)

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

Apply updates to validation report based on user requests.

---

## Prerequisites

- Step 10 completed: Existing report loaded
- Update scope identified

---


## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Re-run Requested Validations

Based on user input, re-run specific validation steps.

### 2. Update Findings

Merge new findings with existing report.

### 3. Update Status

Recalculate overall validation status.

---

## COLLABORATION MENUS (A/P/C):

After applying updates:

```
Your options:
- **C (Continue)**: Complete Edit mode

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

- [ ] Requested validations re-run
- [ ] Findings updated
- [ ] Status recalculated

---

## Outputs

- Updated validation report

---

## Next Step

Edit workflow complete. Run Validate mode (`step-20-v-*`) to verify changes.

---

## Workflow Complete

Edit mode complete for bam-validate-patterns workflow.
