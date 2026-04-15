# Step 22: Generate Validation Report

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

Generate migration validation report.

---

## Prerequisites

- Step 21 completed: Validation performed

---


## Inputs

- Validation results from previous steps
- Quality gate decision (PASS/CONDITIONAL/FAIL)
- Specific findings per component
- Recommendations for remediation (if applicable)

---

## Actions

### 1. Compile Results

Document validation findings by category:

| Category | Checks Passed | Checks Failed | Status |
|----------|---------------|---------------|--------|
| v1 Removal | {n} | {n} | {PASS/FAIL} |
| v2 Presence | {n} | {n} | {PASS/FAIL} |

### 2. Generate Report

Create validation report with:
- Executive summary
- Detailed findings by category
- Severity distribution
- Recommended actions

### 3. Determine Overall Status

| Status | Criteria |
|--------|----------|
| **PASS** | All categories pass |
| **CONDITIONAL** | Minor issues only |
| **FAIL** | Critical issues found |

---

## COLLABORATION MENUS (A/P/C):

After generating report:

```
Your options:
- **C (Continue)**: Complete validation

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

- [ ] Validation results compiled
- [ ] Report generated
- [ ] Overall status determined
- [ ] Recommendations documented

---

## Outputs

- Migration validation report at `{output_folder}/planning-artifacts/migration-validation-report.md`

---

## Next Step

Validate workflow complete. Proceed based on gate decision (PASS/CONDITIONAL/FAIL).

---

## Workflow Complete

Validation mode complete for bam-migrate-v2 workflow.
