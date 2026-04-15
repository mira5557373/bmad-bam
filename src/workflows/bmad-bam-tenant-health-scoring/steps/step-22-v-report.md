# Step 22: Generate Validation Report

## Purpose

Generate validation report for health scoring design.

## MANDATORY EXECUTION RULES

**FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **COMPLETE EVERY STEP** - Execute all actions in sequence
2. **NO PARTIAL COMPLETIONS** - Finish what you start
3. **VERIFY OUTPUTS** - Confirm each action produces expected results
4. **DOCUMENT DECISIONS** - Record all choices made

---

## Prerequisites

- Step 21 completed successfully
- Validation checklist results available
- Gate decision determined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

### 1. Compile Report

- Executive Summary with gate decision
- Detailed findings by section
- Remediation plan if needed

### 2. Quality Gate Contribution

- QG-P1 (Production): Health scoring readiness

### 3. Save Report

Output to: `{output_folder}/planning-artifacts/validation/health-scoring-validation-report.md`

---

## Verification

- [ ] Executive summary compiled
- [ ] Detailed findings documented
- [ ] Remediation plan included if needed
- [ ] Quality gate contribution recorded
- [ ] Report saved to output location

---

## Outputs

- Validation report at `{output_folder}/planning-artifacts/validation/health-scoring-validation-report.md`
- Updated frontmatter with completed steps

---

## COLLABORATION MENUS (A/P/C):

```
- **C (Continue)**: Complete Validate mode
```

#### If 'C' (Continue):
- Save validation report
- Update frontmatter `stepsCompleted: [20, 21, 22]`
- Validate mode complete

---

## Next Step

Based on gate decision:
- **PASS**: Proceed to implementation
- **CONDITIONAL**: Proceed with documented limitations
- **FAIL**: Return to Create/Edit mode
