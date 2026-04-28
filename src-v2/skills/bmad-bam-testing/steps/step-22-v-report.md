# Step 22: Generate Testing Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate report without Step 21 validation complete**
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting report** and await user direction
- 🎯 **Focus ONLY on current step scope** - report generation only
- ✅ **INCLUDE all gate outcomes** with evidence summaries
- 📋 **PROVIDE remediation guidance** for any failed checks
- 🌐 **DOCUMENT web research findings** for pattern alignment

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Generate formal validation report from Step 21 findings
- 💾 Track: `stepsCompleted: [20, 21, 22]` when complete
- 📖 Context: Compile all validation results into structured report
- 🚫 Do NOT: Re-evaluate checks; use Step 21 findings
- 🔍 Use web search: N/A - use Step 21 research results
- ⚠️ Gate: Report documents final QG-TC1/TC2/TC3/QG-I2 outcomes

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

Generate the formal validation report documenting all quality gate outcomes, evidence summaries, remediation guidance, and approval status. This report becomes the official record of testing strategy validation.

---

## Prerequisites

- Step 21 complete (all checks evaluated)
- Gate outcomes determined
- Evidence documented per check

---

## YOUR TASK

Compile the formal validation report from Step 21 findings. Include executive summary, detailed findings per gate, remediation plan for failures, and final approval status. Output to planning-artifacts folder.

---

## Report Generation Sequence

### Section 1: Executive Summary

**Generate executive summary:**

```markdown
# Testing Strategy Validation Report

## Executive Summary

| Attribute | Value |
|-----------|-------|
| Artifact | testing-strategy.md |
| Version | {version} |
| Validation Date | {current_date} |
| Tenant Model | {tenant_model} |
| TEA Integration | {enabled/disabled} |

### Gate Outcomes

| Gate | Status | CRITICAL Checks | Non-Critical Checks |
|------|--------|-----------------|---------------------|
| QG-TC1 | {PASS/CONDITIONAL/FAIL} | {passed}/{total} | {passed}/{total} |
| QG-TC2 | {PASS/CONDITIONAL/FAIL} | {passed}/{total} | {passed}/{total} |
| QG-TC3 | {PASS/CONDITIONAL/FAIL} | {passed}/{total} | {passed}/{total} |
| QG-I2 | {PASS/FAIL} | {passed}/{total} | {passed}/{total} |

### Overall Verdict

**TESTING STRATEGY: {APPROVED | CONDITIONAL | BLOCKED}**

{Brief explanation of overall status}
```

### Section 2: QG-TC1 Detailed Findings (Unit Test Coverage)

**Generate QG-TC1 section:**

```markdown
## QG-TC1: Unit Test Coverage

**Gate Status:** {PASS | CONDITIONAL | FAIL}

### CRITICAL Checks

| Check | Status | Evidence |
|-------|--------|----------|
| Overall line coverage ≥80% | {PASS/FAIL} | {brief evidence} |
| Domain logic coverage ≥90% | {PASS/FAIL} | {brief evidence} |
| TenantContext mocking documented | {PASS/FAIL} | {brief evidence} |

### Non-Critical Checks

| Check | Status | Evidence |
|-------|--------|----------|
| Branch coverage ≥75% | {PASS/FAIL} | {brief evidence} |
| Mutation score ≥70% | {PASS/FAIL} | {brief evidence} |
| Isolation strategy defined | {PASS/FAIL} | {brief evidence} |

### Remediation Required

{If any checks failed, list specific remediation actions}

- **{check_name}:** {remediation_action}
```

### Section 3: QG-TC2 Detailed Findings (Integration Test Coverage)

**Generate QG-TC2 section:**

```markdown
## QG-TC2: Integration Test Coverage

**Gate Status:** {PASS | CONDITIONAL | FAIL}

### CRITICAL Checks

| Check | Status | Evidence |
|-------|--------|----------|
| Module facade coverage 100% | {PASS/FAIL} | {brief evidence} |
| Database operations ≥90% | {PASS/FAIL} | {brief evidence} |
| Tenant isolation in DB tests | {PASS/FAIL} | {brief evidence} |
| Contract tests for facades | {PASS/FAIL} | {brief evidence} |

### Non-Critical Checks

| Check | Status | Evidence |
|-------|--------|----------|
| Event handler coverage ≥90% | {PASS/FAIL} | {brief evidence} |
| Tenant fixtures defined | {PASS/FAIL} | {brief evidence} |
| Event flow testing | {PASS/FAIL} | {brief evidence} |

### Remediation Required

{If any checks failed, list specific remediation actions}
```

### Section 4: QG-TC3 Detailed Findings (E2E Test Coverage)

**Generate QG-TC3 section:**

```markdown
## QG-TC3: E2E Test Coverage

**Gate Status:** {PASS | CONDITIONAL | FAIL}

### CRITICAL Checks

| Check | Status | Evidence |
|-------|--------|----------|
| Critical user journeys covered | {PASS/FAIL} | {brief evidence} |

### Non-Critical Checks

| Check | Status | Evidence |
|-------|--------|----------|
| Journey coverage ≥80% | {PASS/FAIL} | {brief evidence} |
| Cross-tier flows tested | {PASS/FAIL} | {brief evidence} |
| Admin flows covered | {PASS/FAIL} | {brief evidence} |
| API journeys covered | {PASS/FAIL} | {brief evidence} |
| Performance testing defined | {PASS/FAIL} | {brief evidence} |

### Remediation Required

{If any checks failed, list specific remediation actions}
```

### Section 5: QG-I2 Detailed Findings (Tenant Safety - CRITICAL)

**Generate QG-I2 section:**

```markdown
## QG-I2: Tenant Safety (CRITICAL GATE)

**Gate Status:** {PASS | FAIL}

⚠️ This is a CRITICAL security gate. ALL checks must PASS for approval.

### CRITICAL Checks (ALL REQUIRED)

| Check | Status | Evidence |
|-------|--------|----------|
| Cross-tenant data access blocked | {PASS/FAIL} | {brief evidence} |
| Cross-tenant API returns 403/404 | {PASS/FAIL} | {brief evidence} |
| Cross-tenant events not received | {PASS/FAIL} | {brief evidence} |
| Cross-tenant cache blocked | {PASS/FAIL} | {brief evidence} |
| Cross-tenant files blocked | {PASS/FAIL} | {brief evidence} |
| RLS bypass attempts fail | {PASS/FAIL} | {brief evidence} |
| Tenant ID spoofing rejected | {PASS/FAIL} | {brief evidence} |

### Non-Critical Checks

| Check | Status | Evidence |
|-------|--------|----------|
| Noisy neighbor test defined | {PASS/FAIL} | {brief evidence} |
| Security tests tenant-aware | {PASS/FAIL} | {brief evidence} |

### Remediation Required

{If any checks failed:}

🛑 **BLOCKING:** The following CRITICAL checks failed and MUST be remediated before approval:

- **{check_name}:** {remediation_action}

**No deployment is permitted until QG-I2 passes.**
```

### Section 6: Pattern Alignment Analysis

**Generate pattern alignment section:**

```markdown
## Pattern Alignment Analysis

Web research verified testing patterns against current best practices.

| Pattern | Artifact Approach | Current Best Practice | Aligned |
|---------|-------------------|----------------------|---------|
| TenantContext mocking | {from artifact} | {from research} | {Yes/No} |
| Database isolation testing | {from artifact} | {from research} | {Yes/No} |
| Cross-tenant verification | {from artifact} | {from research} | {Yes/No} |
| E2E tenant journeys | {from artifact} | {from research} | {Yes/No} |

### Sources

{List web research sources from Step 21}
```

### Section 7: Remediation Plan

**Generate remediation plan if any failures:**

```markdown
## Remediation Plan

### High Priority (CRITICAL Failures)

| Gate | Check | Remediation | Owner | Deadline |
|------|-------|-------------|-------|----------|
| {gate} | {check} | {action} | {TBD} | {TBD} |

### Medium Priority (CONDITIONAL Items)

| Gate | Check | Remediation | Owner | Deadline |
|------|-------|-------------|-------|----------|
| {gate} | {check} | {action} | {TBD} | {TBD} |

### Low Priority (Non-Critical Failures)

| Gate | Check | Remediation | Owner | Deadline |
|------|-------|-------------|-------|----------|
| {gate} | {check} | {action} | {TBD} | {TBD} |

### Re-Validation Requirements

After remediation, re-run validation mode to verify:

1. Run `bmad-bam-testing` Validate mode (step-20-v-*)
2. Verify all CRITICAL checks pass
3. Update gate statuses in artifact frontmatter
4. Obtain stakeholder sign-off for CONDITIONAL items
```

### Section 8: Approval Status

**Generate final approval section:**

```markdown
## Approval Status

### Final Determination

**Overall Status:** {APPROVED | CONDITIONAL | BLOCKED}

{If APPROVED:}
The testing strategy meets all quality gate requirements and is approved for implementation.

{If CONDITIONAL:}
The testing strategy meets CRITICAL requirements but has non-critical gaps.
Implementation may proceed with the following conditions:
- {condition_1}
- {condition_2}

Stakeholder Sign-off Required: _________________ Date: _________

{If BLOCKED:}
The testing strategy FAILS one or more CRITICAL requirements.
Implementation is BLOCKED until remediation is complete.

Blocking Issues:
- {blocking_issue_1}
- {blocking_issue_2}

### TEA Handoff

{If TEA enabled:}
Handoff to TEA for formal verification:
- [ ] `tea-verify-strategy` - Validate coverage targets
- [ ] `tea-unit-coverage` - Verify QG-TC1
- [ ] `tea-integration-coverage` - Verify QG-TC2
- [ ] `tea-e2e-coverage` - Verify QG-TC3
- [ ] `tea-isolation-verify` - Verify QG-I2

### Document History

| Version | Date | Validator | Status |
|---------|------|-----------|--------|
| {version} | {date} | {agent/user} | {status} |
```

### Section 9: Write Report to Output Folder

**Output location:**

```
{output_folder}/planning-artifacts/testing-strategy-validation-report.md
```

**Update artifact frontmatter:**

Update `testing-strategy.md` frontmatter with validation results:

```yaml
---
qg_tc1_status: {PASS|CONDITIONAL|FAIL}
qg_tc2_status: {PASS|CONDITIONAL|FAIL}
qg_tc3_status: {PASS|CONDITIONAL|FAIL}
qg_i2_status: {PASS|FAIL}
last_validated: {current_date}
validation_version: {validation_report_version}
---
```

---

## Present Final Report

**Display completion summary:**

```
================================================================================
TESTING STRATEGY VALIDATION REPORT COMPLETE
================================================================================

Report: {output_folder}/planning-artifacts/testing-strategy-validation-report.md

GATE OUTCOMES:
- QG-TC1 (Unit): {status}
- QG-TC2 (Integration): {status}
- QG-TC3 (E2E): {status}
- QG-I2 (Isolation): {status}

OVERALL: {APPROVED | CONDITIONAL | BLOCKED}

{If BLOCKED:}
⚠️ CRITICAL failures require remediation before proceeding.
See Remediation Plan in report.

{If CONDITIONAL:}
Stakeholder sign-off required for non-critical waivers.

{If APPROVED:}
✅ Testing strategy approved for implementation.
Proceed with test development per strategy.

================================================================================
Next Steps:
1. {next_step_based_on_outcome}
2. {additional_step}
================================================================================
```

---

## SUCCESS METRICS

- ✅ Executive summary generated with all gate outcomes
- ✅ Detailed findings per gate documented
- ✅ Evidence summaries included per check
- ✅ Remediation plan provided for failures
- ✅ Pattern alignment analysis included
- ✅ Approval status determined and documented
- ✅ Report written to output folder
- ✅ Artifact frontmatter updated with gate statuses

---

## FAILURE MODES

- ❌ **Missing Step 21 data:** Cannot generate report without validation results
- ❌ **Incomplete sections:** All sections must have content
- ❌ **No remediation plan:** Failed checks require remediation guidance
- ❌ **Write failure:** Report must be persisted to output folder

---

## Verification

- [ ] All report sections generated
- [ ] Gate outcomes correctly reflected
- [ ] Evidence citations included
- [ ] Remediation plan complete (if needed)
- [ ] Approval status determined
- [ ] Report written to output folder
- [ ] Artifact frontmatter updated

---

## Outputs

- **Primary:** `{output_folder}/planning-artifacts/testing-strategy-validation-report.md`
- **Updated:** `{output_folder}/planning-artifacts/testing-strategy.md` (frontmatter)

---

## Validation Mode Complete

The testing strategy validation is now complete. Based on the outcome:

**If APPROVED:**
1. Proceed with test implementation per strategy
2. TEA verification recommended for formal sign-off
3. Monitor coverage during implementation

**If CONDITIONAL:**
1. Obtain stakeholder sign-off for waivers
2. Track remediation items
3. Re-validate after remediation complete

**If BLOCKED:**
1. Execute remediation plan immediately
2. Re-run validation mode after fixes
3. Do NOT proceed to implementation until PASS

---

## NEXT STEP

**Validation mode is complete.** Options based on outcome:

| Outcome | Next Action |
|---------|-------------|
| APPROVED | Implement tests, TEA handoff |
| CONDITIONAL | Stakeholder sign-off, track waivers |
| BLOCKED | Remediate, re-validate |

**No automatic next step - user direction required based on outcome.**
