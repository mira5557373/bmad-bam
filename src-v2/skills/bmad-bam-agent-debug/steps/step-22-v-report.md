# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

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

Generate a comprehensive validation report documenting all findings, the gate decision, and recommended next steps for the agent debug report.

---

## Prerequisites

- Step 21 completed: Validation checks run
- Gate decision calculated

---

## Actions

### 1. Compile Executive Summary

Generate validation report summary:

| Field | Value |
|-------|-------|
| Report Validated | agent-debug-report.md |
| Validation Date | {date} |
| Validator | {author} |
| Gate | QG-AI1 (Agent Safety) |
| Decision | PASS / CONDITIONAL / FAIL |

### 2. Document Validation Results

**Issue Documentation Validation:**

| Check | Result | Notes |
|-------|--------|-------|
| Problem statement defined | PASS/FAIL | {notes} |
| Reproduction steps documented | PASS/FAIL | {notes} |
| Expected vs actual behavior | PASS/FAIL | {notes} |
| Severity assigned | PASS/FAIL | {notes} |

**Root Cause Validation:**

| Check | Result | Notes |
|-------|--------|-------|
| Root cause identified | PASS/FAIL | {notes} |
| Evidence documented | PASS/FAIL | {notes} |
| Failure mode classified | PASS/FAIL | {notes} |
| Impact assessed | PASS/FAIL | {notes} |

**Remediation Validation:**

| Check | Result | Notes |
|-------|--------|-------|
| Immediate fix documented | PASS/FAIL | {notes} |
| Long-term solution defined | PASS/FAIL | {notes} |
| Implementation prioritized | PASS/FAIL | {notes} |
| Owners assigned | PASS/FAIL | {notes} |

**Prevention Validation:**

| Check | Result | Notes |
|-------|--------|-------|
| Guard rails specified | PASS/FAIL | {notes} |
| Monitoring improvements | PASS/FAIL | {notes} |
| Alerting defined | PASS/FAIL | {notes} |

**Tenant Isolation Validation:**

| Check | Result | Notes |
|-------|--------|-------|
| No cross-tenant exposure | PASS/FAIL | {notes} |
| Tenant context scoped | PASS/FAIL | {notes} |
| RLS implications addressed | PASS/FAIL | {notes} |

### 3. Calculate Final Gate Decision

Present gate outcome:

| Gate | Decision | Rationale |
|------|----------|-----------|
| QG-AI1 | {PASS/CONDITIONAL/FAIL} | {summary_rationale} |

**Decision Breakdown:**

| Category | Critical Checks | Non-Critical Checks | Status |
|----------|-----------------|---------------------|--------|
| Issue Documentation | {passed}/{total} | {passed}/{total} | {status} |
| Root Cause Analysis | {passed}/{total} | {passed}/{total} | {status} |
| Remediation Plan | {passed}/{total} | {passed}/{total} | {status} |
| Prevention Measures | {passed}/{total} | {passed}/{total} | {status} |
| Tenant Isolation | {passed}/{total} | {passed}/{total} | {status} |

### 4. Document Remediation Guidance

For any gaps found:

| Gap | Severity | Remediation | Owner | Timeline |
|-----|----------|-------------|-------|----------|
| {gap_1} | Critical/Non-Critical | {action} | {owner} | {timeline} |
| {gap_2} | Critical/Non-Critical | {action} | {owner} | {timeline} |

### 5. Save Validation Report

Save to: `{output_folder}/planning-artifacts/validation/agent-debug-validation-report.md`

---

## SUCCESS METRICS

- ✅ Executive summary generated with gate decision
- ✅ All validation results documented with evidence
- ✅ Remediation guidance provided for gaps
- ✅ Report saved to validation folder
- ✅ Recovery protocol status documented (if applicable)
- ✅ Next steps clearly communicated

---

## FAILURE MODES

- ❌ **Report generation failed:** Verify Step 21 results available
- ❌ **Save failed:** Check output folder permissions
- ❌ **Missing validation results:** Cannot compile incomplete report
- ❌ **Gate decision unclear:** Re-calculate from Step 21 results

---

## Verification

- [ ] Validation report generated successfully
- [ ] Report saved to correct location
- [ ] Gate decision documented with rationale
- [ ] Remediation guidance provided for gaps
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation report: `{output_folder}/planning-artifacts/validation/agent-debug-validation-report.md`
- Gate decision summary with rationale
- Remediation guidance for any gaps found

---

## Next Step

Validate workflow complete. Proceed based on gate decision:

---

## Workflow Complete

Validate mode is complete. Based on gate decision:

| Decision | Next Action |
|----------|-------------|
| **PASS** | Debug report approved. Proceed with remediation implementation. |
| **CONDITIONAL** | Address documented gaps within timeline, then proceed with remediation. |
| **FAIL** | Return to Create/Edit mode to address critical issues before remediation. |

**Recovery Protocol (if FAIL):**
1. Review critical gaps identified in validation report
2. Return to Edit mode (`step-10-e-*`) to update debug report
3. Address all critical findings with evidence
4. Re-run Validate mode
5. If second FAIL, escalate to mandatory course correction
