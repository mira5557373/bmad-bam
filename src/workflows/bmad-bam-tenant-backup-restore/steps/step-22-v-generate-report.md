# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

---

## Purpose

Generate comprehensive validation report for backup/restore design.

---

## Prerequisites

- Step 21: Validate completed with gate decision

---

## Actions

### 1. Compile Report

**Executive Summary**
- Gate decision (PASS/CONDITIONAL/FAIL)
- Key findings summary

**Detailed Findings**
- Per-section validation results
- Severity classification

**Remediation Plan** (if needed)
- Required fixes prioritized
- Estimated effort

### 2. Quality Gate Contribution

- QG-P1 (Production): Backup/restore readiness

### 3. Save Report

Output to: `{output_folder}/planning-artifacts/validation/backup-restore-validation-report.md`

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **C (Continue)**: Accept report and complete Validate mode
```

#### If 'C' (Continue):
- Save validation report
- Update frontmatter `stepsCompleted: [20, 21, 22]`
- Validate mode complete

---

## Verification

- [ ] Executive summary complete
- [ ] All findings documented
- [ ] Report saved successfully

---

## Outputs

- Validation report
- Gap analysis (if any)
- Recommendations

---

## Next Step

Validate workflow complete. Proceed based on gate decision (PASS/CONDITIONAL/FAIL).

---

## Validate Mode Complete

Based on gate decision:
- **PASS**: Proceed to implementation
- **CONDITIONAL**: Proceed with documented limitations
- **FAIL**: Return to Create/Edit mode
