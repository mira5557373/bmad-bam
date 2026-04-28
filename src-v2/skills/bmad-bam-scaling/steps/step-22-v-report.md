# Step 22: Generate Validation Report (Validate Mode)

## MANDATORY EXECUTION RULES

- 🛑 NEVER generate report without complete validation results from Step 21
- 📖 ALWAYS include all category summaries with pass/fail counts
- 🔄 ALWAYS determine gate outcome using decision matrix criteria
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ DOCUMENT all failed checks with remediation guidance
- 📋 SPECIFY recovery protocol if outcome is FAIL
- 🎯 LOCK passed categories to prevent unnecessary re-validation

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Compile results, determine outcome, generate report
- 💾 Track: Final validation status in document metadata
- 📖 Context: Reference all validation results from Step 21
- 🚫 Do NOT: Re-validate items - only compile and report
- 🔍 Use web search: Not required for report generation

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading artifact and checklist
- Evaluating against criteria
- Documenting evidence

**OUT OF SCOPE:**
- Modifying the artifact
- Creating new content
## Purpose

Compile the validation results into a comprehensive report, determine the overall validation outcome (PASS, CONDITIONAL, FAIL, or WAIVED), and provide actionable recommendations.

---

## Prerequisites

- Step 21 complete with all validation results documented
- Validation scope and results available

---

## Actions

### 1. Compile Validation Summary

**Overall Statistics:**

| Metric | Count |
|--------|-------|
| Total Checks | {total} |
| Passed | {passed} |
| Failed | {failed} |
| Critical Passed | {critical_passed} |
| Critical Failed | {critical_failed} |
| Pass Rate | {percentage}% |

**By Category:**

| Category | Passed | Failed | Critical Failed |
|----------|--------|--------|-----------------|
| Horizontal Scaling | {count} | {count} | {count} |
| Database Scaling | {count} | {count} | {count} |
| Tenant-Aware Scaling | {count} | {count} | {count} |
| Capacity Planning | {count} | {count} | {count} |
| Cost Optimization | {count} | {count} | {count} |
| Runbooks | {count} | {count} | {count} |
| Cross-Cutting | {count} | {count} | {count} |

### 2. Determine Validation Outcome

**Outcome Decision Matrix:**

| Condition | Outcome |
|-----------|---------|
| All checks pass | **PASS** |
| Critical checks pass, non-critical fail | **CONDITIONAL** |
| Any critical check fails | **FAIL** |
| Non-critical waived by stakeholder | **WAIVED** |

**Final Outcome: {PASS | CONDITIONAL | FAIL | WAIVED}**

### 3. Document Failed Checks

**Critical Failures (if any):**

| Check | Category | Issue | Impact |
|-------|----------|-------|--------|
| {check name} | {category} | {description} | {severity} |

**Non-Critical Failures (if any):**

| Check | Category | Issue | Priority |
|-------|----------|-------|----------|
| {check name} | {category} | {description} | {high/medium/low} |

### 4. Generate Recommendations

**For PASS Outcome:**

| Recommendation | Priority | Timeline |
|----------------|----------|----------|
| Proceed to implementation | Required | Immediate |
| Schedule capacity review | Recommended | Within 30 days |
| Update runbooks post-implementation | Required | Post-deploy |

**For CONDITIONAL Outcome:**

| Gap | Mitigation | Owner | Deadline |
|-----|------------|-------|----------|
| {gap description} | {mitigation plan} | {owner} | {date} |

**For FAIL Outcome:**

| Critical Gap | Remediation Required | Owner | Priority |
|--------------|---------------------|-------|----------|
| {gap description} | {remediation steps} | {owner} | {priority} |

### 5. Recovery Protocol (if FAIL)

**3-Step Recovery Process:**

| Attempt | Action | Verification |
|---------|--------|--------------|
| 1 | Fix identified issues | Re-run validation |
| 2 | Fix remaining issues | Re-run validation |
| 3 | Mandatory course correction | Escalate to leadership |

**Locked Categories:** Categories that passed are locked and do not require re-validation.

| Category | Status | Re-validation Required |
|----------|--------|------------------------|
| Horizontal Scaling | {PASS/FAIL} | {Yes/No} |
| Database Scaling | {PASS/FAIL} | {Yes/No} |
| Tenant-Aware Scaling | {PASS/FAIL} | {Yes/No} |
| Capacity Planning | {PASS/FAIL} | {Yes/No} |
| Cost Optimization | {PASS/FAIL} | {Yes/No} |
| Runbooks | {PASS/FAIL} | {Yes/No} |

### 6. Generate Final Report

**Report Structure:**

| Section | Content |
|---------|---------|
| Executive Summary | Outcome, key findings |
| Validation Scope | Full/Partial/Regression |
| Results by Category | Pass/fail per category |
| Critical Issues | List with remediation |
| Recommendations | Prioritized actions |
| Next Steps | Based on outcome |
| Appendix | Detailed check results |

---

## SUCCESS METRICS

- ✅ All validation results compiled accurately
- ✅ Gate outcome determined using decision matrix
- ✅ Failed checks documented with remediation steps
- ✅ Recommendations prioritized by impact
- ✅ Recovery protocol defined (if FAIL outcome)
- ✅ Locked categories identified for re-validation efficiency
- ✅ Report saved to correct location
- ✅ Next steps clearly communicated

---

## FAILURE MODES

- ❌ **Incomplete validation data:** Return to Step 21, do not generate partial report
- ❌ **Outcome criteria unclear:** Default to FAIL, escalate for clarification
- ❌ **Report save failure:** Retry, present report in console if persistent
- ❌ **Missing critical remediation:** Block CONDITIONAL outcome without remediation plan
- ❌ **Recovery protocol undefined:** Block FAIL outcome without recovery steps

---

## Verification

- [ ] All validation results compiled
- [ ] Outcome correctly determined
- [ ] Failed checks documented with remediation
- [ ] Recommendations prioritized
- [ ] Recovery protocol defined (if FAIL)
- [ ] Report generated

---

## Outputs

- Validation report: `{output_folder}/planning-artifacts/scaling-design-validation-report.md`
- Validation outcome: {PASS | CONDITIONAL | FAIL | WAIVED}
- Recommendations with owners and timelines
- Recovery protocol (if applicable)

---

## Next Step

Validate mode complete.

**Based on Outcome:**

| Outcome | Next Step |
|---------|-----------|
| **PASS** | Proceed to implementation |
| **CONDITIONAL** | Implement mitigations, proceed cautiously |
| **FAIL** | Enter recovery protocol, re-run after fixes |
| **WAIVED** | Document justification, proceed with risk |

---

## Validate Mode Complete

The scaling design validation has been completed. See the validation report for detailed findings and recommendations.
