# Step 22: Generate Validation Report

## Purpose

Generate validation report for maintenance window design.

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
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: operations

---

## Actions

### 1. Compile Report

| Section | Content |
|---------|---------|
| Executive Summary | Gate decision with rationale |
| Detailed findings | Results by section |
| Remediation plan | If needed |

### 2. Quality Gate Contribution

| Gate | Contribution |
|------|--------------|
| QG-P1 (Production) | Maintenance planning readiness |

### 3. Save Report

| Action | Path |
|--------|------|
| Output to | `{output_folder}/planning-artifacts/validation/maintenance-window-validation-report.md` |

---

## Verification

- [ ] Executive summary compiled
- [ ] Detailed findings documented
- [ ] Remediation plan included if needed
- [ ] Quality gate contribution recorded
- [ ] Report saved to output location

---

## Outputs

- Validation report at `{output_folder}/planning-artifacts/validation/maintenance-window-validation-report.md`
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
