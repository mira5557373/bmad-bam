# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER finalize report without completing all validation checks from step-21
- 📖 CRITICAL: Read the complete step file before generating any report
- 🔄 CRITICAL: Compile ALL check results - do not skip any category
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ Determine outcome using EXACT criteria from QG-F1 checklist
- 📋 Generate structured report following the template exactly
- 💾 Save report to `{output_folder}/validation/qg-f1-report.md`
- ⚠️ FAIL outcomes must include recovery protocol
- 🎯 Report must be actionable - include specific next steps

---

## EXECUTION PROTOCOLS

- 🎯 Compile results systematically from step-21 validation
- 📊 Calculate pass rates for critical (4) and standard (6) checks
- 💬 Use clear, unambiguous outcome determination
- 🔍 Document findings with evidence references
- 📋 Include recommendations for CONDITIONAL/FAIL outcomes

---

## YOUR TASK

Compile all validation results from step-21 into a structured QG-F1 validation report. Calculate final pass rates for CRITICAL (4 checks) and STANDARD (6 checks) categories. Determine the official QG-F1 outcome (PASS/CONDITIONAL/FAIL) using exact criteria. Generate the formal validation report with evidence references, recommendations, and clear next steps. Save the report to the designated output location.

---

## Report Generation

### 1. Compile Check Results

**Critical Checks (all must pass):**

| Check | Status | Evidence |
|-------|--------|----------|
| Tenant isolation model selected | PASS/FAIL | Section ref |
| Module boundaries defined | PASS/FAIL | Section ref |
| AI runtime framework selected | PASS/FAIL | Section ref |
| Master architecture frozen | PASS/FAIL | Document state |

**Standard Checks (80% threshold):**

| Check | Status |
|-------|--------|
| Quality attributes defined | PASS/FAIL |
| Cross-cutting concerns documented | PASS/FAIL |
| Technology stack decisions | PASS/FAIL |
| Deployment topology specified | PASS/FAIL |
| Data architecture outlined | PASS/FAIL |
| Integration patterns selected | PASS/FAIL |

### 2. Generate Report

```markdown
# QG-F1 Validation Report

**Document:** master-architecture.md
**Date:** {{date}}
**Outcome:** PASS | CONDITIONAL | FAIL

## Summary
- **Critical:** {passed}/4 PASS
- **Standard:** {passed}/6 PASS ({percentage}%)

## Critical Check Results
| # | Check | Status | Evidence |
|---|-------|--------|----------|
| 1 | Tenant isolation model | {status} | {ref} |
| 2 | Module boundaries | {status} | {ref} |
| 3 | AI runtime framework | {status} | {ref} |
| 4 | Architecture frozen | {status} | {state} |

## Standard Check Results
| # | Check | Status |
|---|-------|--------|
| 1 | Quality attributes | {status} |
| 2 | Cross-cutting concerns | {status} |
| 3 | Technology stack | {status} |
| 4 | Deployment topology | {status} |
| 5 | Data architecture | {status} |
| 6 | Integration patterns | {status} |

## Recommendations
{For CONDITIONAL: Mitigation plan with owner/deadline}
{For FAIL: Recovery steps}

## Next Steps
- PASS: Proceed to module architecture
- CONDITIONAL: Execute mitigation, then proceed
- FAIL: Return to Create mode, re-validate
```

Save to: `{output_folder}/validation/qg-f1-report.md`

---

## Quality Gate Integration

### Outcome Determination

| Outcome | Criteria |
|---------|----------|
| **PASS** | All 4 critical pass AND >= 80% standard (5/6) |
| **CONDITIONAL** | All 4 critical pass AND < 80% standard |
| **FAIL** | Any critical check fails |

### Recovery Protocol (FAIL)

1. Fix critical failures, re-run validation
2. If still failing, fix and re-run
3. Third failure: MANDATORY escalation

### CONDITIONAL Requirements

- Mitigation plan with owner and deadline
- Maximum timeline: 2 sprints
- Non-critical gaps must not block module work

---

## SUCCESS METRICS

- ✅ All validation results from step-21 compiled into report structure
- ✅ CRITICAL check results table complete with status and evidence for all 4 checks
- ✅ STANDARD check results table complete with status for all 6 checks
- ✅ Pass rates calculated correctly (X/4 CRITICAL, Y/6 STANDARD, Z% overall)
- ✅ Outcome determined using exact QG-F1 criteria (ALL critical + 80% standard = PASS)
- ✅ Report includes recommendations section with specific guidance
- ✅ CONDITIONAL outcomes include mitigation plan with owner and deadline
- ✅ FAIL outcomes include recovery protocol with specific step references
- ✅ Next steps clearly mapped to outcome (PASS → module arch, FAIL → create mode)
- ✅ Report saved to `{output_folder}/validation/qg-f1-report.md`
- ✅ Report presented to user with confirmation prompt

---

## FAILURE MODES

- ❌ **Incomplete results from step-21:** Flag missing check results, require step-21 re-run before report generation
- ❌ **Incorrect outcome calculation:** Double-check criteria (4/4 critical AND 5/6 standard = PASS), recalculate if discrepancy found
- ❌ **Missing evidence references:** Report is not actionable without evidence - require evidence before finalizing
- ❌ **Save failure:** Attempt alternate location, report error with path details
- ❌ **CONDITIONAL without mitigation:** CONDITIONAL status requires documented mitigation plan - block finalization until provided

---

## NEXT STEP

**Validation workflow complete.** Action based on outcome:

| Outcome | Next Workflow | Prerequisite |
|---------|---------------|--------------|
| PASS | `bmad-bam-module-architecture` | None |
| CONDITIONAL | `bmad-bam-module-architecture` | Mitigation documented |
| FAIL | `bmad-bam-master-architecture` Create | Failures addressed |

Present the report and confirm next steps.
