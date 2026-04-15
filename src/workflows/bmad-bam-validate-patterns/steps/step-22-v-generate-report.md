# Step 22: Generate Comparison Report

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

Generate report comparing previous and current validation results.

---

## Prerequisites

- Step 21 completed: Re-validation performed

---


## Inputs

- Validation results from previous steps
- Quality gate decision (PASS/CONDITIONAL/FAIL)
- Specific findings per component
- Recommendations for remediation (if applicable)

---

## Actions

### 1. Generate Comparison

| Category | Previous | Current | Change |
|----------|----------|---------|--------|
| Structure | {status} | {status} | {change} |
| Dependencies | {status} | {status} | {change} |
| Queries | {status} | {status} | {change} |
| Cross-refs | {status} | {status} | {change} |

### 2. Document Changes

- Resolved issues
- New issues
- Unchanged issues

### 3. Update Status

Determine if overall status improved, degraded, or unchanged.

---

## COLLABORATION MENUS (A/P/C):

After generating report:

```
Your options:
- **C (Continue)**: Complete validation workflow

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

- [ ] Comparison generated
- [ ] Changes documented
- [ ] Status determined

---

## Outputs

- Comparison validation report at `{output_folder}/planning-artifacts/pattern-validation-report.md`

---

## Next Step

Validate workflow complete. Proceed based on validation findings.

---

## Workflow Complete

Validation mode complete for bam-validate-patterns workflow.
