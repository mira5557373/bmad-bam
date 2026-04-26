# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER finalize report without completing all validation checks from step-21
- 📖 CRITICAL: Read the complete step file before generating any report
- 🔄 CRITICAL: Compile ALL check results - do not skip any category
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

Compile validation results from step-21, determine the QG-F1 outcome (PASS/CONDITIONAL/FAIL), generate a structured validation report, and save it to the output location.

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

- All validation results compiled from step-21
- Outcome determined using exact QG-F1 criteria
- Pass rates calculated correctly
- Report saved to designated location
- Next steps are clear and actionable
- CONDITIONAL/FAIL outcomes include remediation guidance

---

## NEXT STEP

**Validation workflow complete.** Action based on outcome:

| Outcome | Next Workflow | Prerequisite |
|---------|---------------|--------------|
| PASS | `bmad-bam-create-module-architecture` | None |
| CONDITIONAL | `bmad-bam-create-module-architecture` | Mitigation documented |
| FAIL | `bmad-bam-master-architecture` Create | Failures addressed |

Present the report and confirm next steps.
