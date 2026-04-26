# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Compile validation results into formal report with outcome determination
- 💾 Track: `stepsCompleted: [20, 21, 22]` when complete
- 📖 Context: Use BMM four-outcome model (PASS, CONDITIONAL, FAIL, WAIVED)
- 🚫 Do NOT: Make changes to artifact - report only
- 🔍 Use web search: Not required for report generation

---

## YOUR TASK

Compile all billing validation results into a formal report. Document the validation decision with rationale, list all findings with evidence for metering, subscriptions, invoicing, and compliance categories, and provide recommendations based on the outcome. Save the report to the validation folder.

---

## Purpose

Generate a formal validation report for the billing design, determine the quality gate outcome, and provide actionable next steps based on findings.

## Prerequisites

- Step 21 complete (validation performed)
- Validation results compiled
- Findings documented per category

## Actions

### 1. Determine Overall Outcome

Apply BMM four-outcome model:

| Outcome | Criteria | Action |
|---------|----------|--------|
| **PASS** | All CRITICAL pass, all Required pass | Proceed to implementation |
| **CONDITIONAL** | All CRITICAL pass, some Required fail | Proceed with mitigation plan + deadline |
| **FAIL** | Any CRITICAL check fails | Enter recovery protocol |
| **WAIVED** | Non-critical items waived by stakeholder | Proceed with documented justification |

**Outcome Determination:**
```
IF any CRITICAL check = FAIL:
    outcome = FAIL
ELSE IF all Required checks = PASS:
    outcome = PASS
ELSE IF non-critical failures exist:
    outcome = CONDITIONAL
```

### 2. Generate Validation Report

**Report Template:**

```markdown
# Billing Design Validation Report

**Date:** {{date}}
**Artifact:** {output_folder}/planning-artifacts/billing-design.md
**Validator:** [Agent/User]

## Executive Summary

**Overall Outcome:** [PASS | CONDITIONAL | FAIL | WAIVED]

[1-2 sentence summary of validation results]

## Validation Results

### CRITICAL Checks (Tenant Isolation)
| Check | Status | Finding |
|-------|--------|---------|
| Usage events tenant-scoped | [PASS/FAIL] | [Detail] |
| Subscriptions tenant-isolated | [PASS/FAIL] | [Detail] |
| Invoices tenant-isolated | [PASS/FAIL] | [Detail] |
| ... | ... | ... |

**CRITICAL Status:** [ALL PASS / FAILURES PRESENT]

### Required Checks
| Category | Passed | Failed | Status |
|----------|--------|--------|--------|
| Metering | [N] | [N] | [PASS/FAIL] |
| Subscription Management | [N] | [N] | [PASS/FAIL] |
| Invoicing and Payments | [N] | [N] | [PASS/FAIL] |
| Compliance | [N] | [N] | [PASS/FAIL] |

### Recommended Checks
| Category | Passed | Failed | Status |
|----------|--------|--------|--------|
| Analytics | [N] | [N] | [PASS/FAIL] |

## Findings Detail

### Critical Issues (Blocking)
[List any critical issues or "None"]

### Required Fixes
[List required fixes or "None"]

### Recommendations
[List improvement recommendations]

## Next Steps

Based on outcome **[OUTCOME]**:

### If PASS:
- Proceed to implementation phase
- Schedule billing module development
- Integrate with payment provider

### If CONDITIONAL:
- Address required fixes by [deadline]
- Proceed with mitigation plan
- Re-validate after fixes applied

### If FAIL:
- Enter recovery protocol
- Fix CRITICAL issues immediately
- Re-run validation (attempt 2 of 3)

## Quality Gate Signature

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Architect | [Name] | {{date}} | [Approved/Rejected] |
| PM | [Name] | {{date}} | [Approved/Rejected] |
```

### 3. Document Recovery Protocol (If FAIL)

If outcome is FAIL, document recovery path:

```markdown
## Recovery Protocol

**Attempt:** [1 | 2 | 3] of 3

### CRITICAL Failures to Address:
1. [Failure] - [Required fix] - [Owner]
2. [Failure] - [Required fix] - [Owner]

### Recovery Steps:
1. Fix identified CRITICAL issues
2. Update billing design artifact
3. Re-run validation (step-20-v-load.md)
4. If FAIL again after 3 attempts: Escalate to project leadership

### Locked Categories:
Categories that passed are locked and do not need re-validation:
- [x] [Category 1]
- [x] [Category 2]
```

### 4. Output Report

Write validation report to:
```
{output_folder}/validation-reports/billing-design-validation.md
```

---

## SUCCESS METRICS

- ✅ Executive summary generated with validation decision
- ✅ All tenant isolation results documented with evidence
- ✅ Metering completeness verified
- ✅ Subscription management compliance documented
- ✅ Invoicing and payment integration validated
- ✅ ASC 606/IFRS 15 compliance status documented
- ✅ Recommendations provided based on outcome
- ✅ Report saved to validation folder

---

## FAILURE MODES

- ❌ **Report generation failed:** Verify all Step 21 results available
- ❌ **Save failed:** Check output folder permissions
- ❌ **Missing evidence:** Cannot generate complete report
- ❌ **Compliance documentation incomplete:** Revenue recognition gaps

---

## Verification

- [ ] Overall outcome determined using BMM model
- [ ] Validation report generated with all sections
- [ ] All findings documented
- [ ] Next steps appropriate to outcome
- [ ] Recovery protocol documented (if FAIL)
- [ ] Report written to validation-reports folder
- [ ] Quality gate signature section included

## Outputs

- **Primary:** `{output_folder}/validation-reports/billing-design-validation.md`
- Outcome determination
- Findings summary
- Next steps based on outcome
- Recovery protocol (if applicable)

## Outcome Actions

| Outcome | Next Action |
|---------|-------------|
| **PASS** | Proceed to billing implementation |
| **CONDITIONAL** | Proceed with mitigation, re-validate by deadline |
| **FAIL** | Fix CRITICAL issues, re-run validation |
| **WAIVED** | Document justification, proceed |

---

**Validation workflow complete.**

If outcome is FAIL, return to Edit mode:
- `step-10-e-load.md` - Load for editing
- `step-11-e-apply.md` - Apply required fixes
- Then re-run validation

---

**Navigation:** Validation complete. Report generated at `{output_folder}/validation-reports/billing-design-validation.md`
