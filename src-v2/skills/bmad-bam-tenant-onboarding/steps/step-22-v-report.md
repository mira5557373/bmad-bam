# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 📄 **Generate comprehensive validation report**

## EXECUTION PROTOCOLS

- 🎯 Focus: Compile validation report with recommendations
- 💾 Track: `stepsCompleted: [20, 21, 22]` when complete
- 📖 Context: Validation results from Step 21
- 🚫 Do NOT: Change gate decision without user approval
- 🔍 Use web search: Not required for report generation
- ⚠️ Gate: Tenant lifecycle patterns

---

## Purpose

Generate a comprehensive validation report documenting all findings, gate decision, and recommended next steps.

---

## Prerequisites

- Step 21 completed: Validation checks executed
- Gate decision calculated

---

## Inputs

- Output from Step 21: Validation results and gate decision

---

## Actions

### 1. Compile Executive Summary

Generate validation executive summary:

| Field | Value |
|-------|-------|
| Document | Tenant Onboarding Design |
| Version Validated | `{version}` |
| Validation Date | `{date}` |
| Gate ID | QG-ONBOARD |
| **Gate Decision** | **{PASS/CONDITIONAL/FAIL}** |

### 2. Generate Results Summary

| Category | Total | Passed | Failed | Critical Failed |
|----------|-------|--------|--------|-----------------|
| Registration Flow | {n} | {n} | {n} | {n} |
| Provisioning Saga | {n} | {n} | {n} | {n} |
| Resource Initialization | {n} | {n} | {n} | {n} |
| Validation Design | {n} | {n} | {n} | {n} |
| Rollback Procedures | {n} | {n} | {n} | {n} |
| Monitoring & Alerting | {n} | {n} | {n} | {n} |
| Security Controls | {n} | {n} | {n} | {n} |
| **TOTAL** | **{n}** | **{n}** | **{n}** | **{n}** |

**Pass Rate:** {pass_rate}%
**Critical Pass Rate:** {critical_pass_rate}%

### 3. Document Failed Checks

#### Critical Failures (Blocking)

| Check | Category | Finding | Remediation |
|-------|----------|---------|-------------|
| {check} | {category} | {finding} | {remediation} |

#### Non-Critical Failures

| Check | Category | Finding | Priority | Remediation |
|-------|----------|---------|----------|-------------|
| {check} | {category} | {finding} | {P1/P2/P3} | {remediation} |

### 4. Generate Recommendations

Based on gate decision, provide specific recommendations:

#### If PASS

```markdown
## Recommendations

1. **Proceed to Implementation**
   - Design is complete and meets all quality criteria
   - Begin implementation planning

2. **Consider Enhancements** (Optional)
   - {Enhancement suggestion 1}
   - {Enhancement suggestion 2}

3. **Schedule Review**
   - Re-validate after implementation
   - Add to QG-I1 integration gate checklist
```

#### If CONDITIONAL

```markdown
## Recommendations

1. **Proceed with Remediation Plan**
   - Address non-critical gaps before production
   - Deadline: {suggested_deadline}

2. **Required Remediations**
   | Item | Owner | Deadline |
   |------|-------|----------|
   | {item} | {owner} | {deadline} |

3. **Re-validation**
   - Run Validate mode after remediation
   - Target: Full PASS before integration gate
```

#### If FAIL

```markdown
## Recommendations

1. **Return to Design**
   - Critical gaps must be addressed
   - Use Edit mode for targeted fixes

2. **Critical Remediations**
   | Item | Impact | Required Action |
   |------|--------|-----------------|
   | {item} | {impact} | {action} |

3. **Recovery Path**
   - Fix critical items first
   - Re-run full validation
   - Target: PASS or CONDITIONAL
```

### 5. Save Report

Save validation report to:
```
{output_folder}/planning-artifacts/validation/tenant-onboarding-validation-report.md
```

### 6. Present Final Summary

Display gate outcome with clear next steps:

| Gate | Decision | Confidence | Next Action |
|------|----------|------------|-------------|
| QG-ONBOARD | {PASS/CONDITIONAL/FAIL} | {High/Medium/Low} | {action} |

---

## SUCCESS METRICS

- ✅ Executive summary generated with gate decision
- ✅ All validation results documented by category
- ✅ Failed checks listed with remediation guidance
- ✅ Recommendations aligned to gate decision
- ✅ Report saved to validation folder
- ✅ Next steps clearly communicated

---

## FAILURE MODES

- ❌ **Report generation failed:** Verify Step 21 results available
- ❌ **Save failed:** Check output folder permissions
- ❌ **Incomplete results:** Cannot compile report without all categories
- ❌ **Recommendations misaligned:** Verify gate decision matches remediation plan

---

## Verification

- [ ] Executive summary complete
- [ ] All validation results documented
- [ ] Failed checks listed with remediation
- [ ] Gate decision clearly stated
- [ ] Recommendations appropriate for outcome
- [ ] Report saved to correct location

---

## Outputs

- Validation report: `{output_folder}/planning-artifacts/validation/tenant-onboarding-validation-report.md`
- Gate decision summary
- Remediation plan (if CONDITIONAL or FAIL)

---

## Workflow Complete

Validate mode is complete.

**Based on gate decision:**

| Decision | Next Step |
|----------|-----------|
| **PASS** | Proceed to implementation or next workflow |
| **CONDITIONAL** | Implement remediation plan, then re-validate |
| **FAIL** | Return to Create/Edit mode to address critical issues |

**Related workflows:**
- `bmad-bam-tenant-offboarding-design` - Design tenant deprovisioning
- `bmad-bam-convergence-verification` - Integration gate (QG-I1)
- `bmad-bam-production-readiness` - Production gate (QG-P1)
