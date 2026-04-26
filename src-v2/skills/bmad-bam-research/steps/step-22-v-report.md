# Step 22: Generate Validation Report (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER finalize report without completing ALL validation checks from step-21
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: Compile ALL check results - do not skip any category
- ⏸️ ALWAYS pause after presenting report and await user direction
- 🎯 Determine outcome using EXACT criteria (90% = PASS, 75% = CONDITIONAL)
- ✅ Include specific remediation steps for each critical issue
- 📋 Generate structured report following template exactly
- 💾 Save report to designated output location
- ⚠️ NEEDS REVISION outcomes must include specific Edit mode step references

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## YOUR TASK

Compile all validation results from step-21 into a structured research validation report. Calculate final pass rates for all 4 categories (Completeness, Quality, Multi-Tenant, Consistency). Determine the official outcome (PASS/CONDITIONAL/NEEDS REVISION) using exact criteria. Generate the formal validation report with findings, severity assignments, and clear next steps. Save the report to the designated output location.

---

## Purpose

Generate a comprehensive validation report summarizing findings from the research report validation and determining the workflow completion status.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Research report validation performed

---

## Inputs

- Validation results from Step 21
- Quality gate decision criteria
- Specific findings per category
- Critical issues list

---

## Actions

### 1. Compile Validation Results

Organize findings from Step 21:

| Category | Score | Pass Rate | Status |
|----------|-------|-----------|--------|
| Completeness | {n}/{total} | {percent}% | Pass/Fail |
| Quality | {n}/{total} | {percent}% | Pass/Fail |
| Multi-Tenant | {n}/{total} | {percent}% | Pass/Fail |
| Consistency | {n}/{total} | {percent}% | Pass/Fail |
| **Overall** | {total}/{total} | {percent}% | **{status}** |

### 2. Assign Severity to Findings

| Severity | Count | Description | Action Required |
|----------|-------|-------------|-----------------|
| CRITICAL | {n} | Blocking issues | Must fix before acceptance |
| WARNING | {n} | Non-blocking gaps | Should address |
| INFO | {n} | Improvement suggestions | Consider for future |

### 3. Critical Issues Summary

List all critical issues requiring resolution:

| # | Issue | Category | Impact | Remediation |
|---|-------|----------|--------|-------------|
| 1 | {issue description} | {category} | {impact} | {fix required} |
| 2 | {issue description} | {category} | {impact} | {fix required} |

### 4. Warning Issues Summary

| # | Issue | Category | Recommended Action |
|---|-------|----------|-------------------|
| 1 | {issue description} | {category} | {suggested fix} |
| 2 | {issue description} | {category} | {suggested fix} |

### 5. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **PASS** | All categories pass, no critical issues, overall >= 90% |
| **CONDITIONAL** | Minor gaps (warnings only), overall >= 75%, document gaps and proceed |
| **NEEDS REVISION** | Any critical issues, or overall < 75% |

**Current Status:** {PASS/CONDITIONAL/NEEDS REVISION}

### 6. Generate Validation Report

```markdown
# Research Report Validation Report

## Document Information

| Field | Value |
|-------|-------|
| Validated Document | research-report.md |
| Validation Date | {date} |
| Validator | {role} |
| Validation Status | {PASS/CONDITIONAL/NEEDS REVISION} |

---

## Executive Summary

**Validation Outcome:** {status}

**Overall Score:** {total pass}/{total checks} ({percent}%)

**Key Findings:**
- {Finding 1}
- {Finding 2}
- {Finding 3}

---

## Detailed Results

### Completeness ({score}/{total})
{Table of completeness findings}

### Quality ({score}/{total})
{Table of quality findings}

### Multi-Tenant ({score}/{total})
{Table of multi-tenant findings}

### Consistency ({score}/{total})
{Table of consistency findings}

---

## Issues Requiring Action

### Critical Issues
{Critical issues table or "None"}

### Warnings
{Warning issues table or "None"}

### Suggestions
{Info items or "None"}

---

## Recommended Next Steps

**If PASS:**
1. Research report approved for stakeholder review
2. Proceed with recommendation approval process
3. Execute POC if defined

**If CONDITIONAL:**
1. Document gaps acknowledged: {list gaps}
2. Proceed with noted limitations
3. Schedule remediation for {items}

**If NEEDS REVISION:**
1. Address critical issues: {list issues}
2. Re-run Create or Edit mode
3. Re-validate after fixes

---

## Validation Checklist Summary

- [x] Artifact loaded and parsed
- [x] Completeness criteria checked
- [x] Quality criteria validated
- [x] Multi-tenant requirements verified
- [x] Consistency checks completed
- [x] Validation report generated

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | {date} | {role} | Initial validation |
```

### 7. Output Validation Report

Save the validation report to:
- `{output_folder}/planning-artifacts/research-report-validation.md`

Or append validation summary to the research report itself.

---

## SUCCESS METRICS

- ✅ All validation results from step-21 compiled into report structure
- ✅ Completeness results table complete (X/9 with status for each)
- ✅ Quality results table complete (Y/8 with source credibility findings)
- ✅ Multi-Tenant results table complete (Z/8 with BAM-specific findings)
- ✅ Consistency results table complete (W/7 with cross-reference findings)
- ✅ Pass rates calculated correctly for each category
- ✅ Overall pass rate calculated (total pass / 32 checks as percentage)
- ✅ Outcome determined using exact criteria (>=90% PASS, >=75% CONDITIONAL, <75% NEEDS REVISION)
- ✅ Critical issues table complete with severity and remediation steps
- ✅ Warning issues table complete with recommended actions
- ✅ Next steps clearly mapped to outcome status
- ✅ Report saved to `{output_folder}/planning-artifacts/research-report-validation.md`
- ✅ Report presented to user with confirmation prompt

---

## FAILURE MODES

- ❌ **Incomplete results from step-21:** Flag missing category results, require step-21 re-run before report generation
- ❌ **Incorrect outcome calculation:** Double-check percentage thresholds (90% PASS, 75% CONDITIONAL), recalculate if discrepancy
- ❌ **CRITICAL issues without remediation:** Block PASS status until remediation steps documented for all critical issues
- ❌ **Save failure:** Attempt alternate location, report error with path details
- ❌ **CONDITIONAL without mitigation plan:** CONDITIONAL status requires documented gaps and timeline - block until provided

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Completion status determined correctly
- [ ] Report generated with all required sections
- [ ] Next steps clearly defined
- [ ] Report saved to correct location
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation report: `{output_folder}/planning-artifacts/research-report-validation.md`
- Gate decision: PASS / CONDITIONAL / NEEDS REVISION
- Remediation list (if applicable)

---

## Next Step

Based on completion status:

- **PASS:** Research report validated and approved. Proceed with:
  - Stakeholder presentation
  - Recommendation approval
  - POC execution (if defined)

- **CONDITIONAL:** Document gaps and proceed with noted limitations:
  - Acknowledge gaps in project documentation
  - Schedule remediation for non-critical items
  - Monitor identified risks

- **NEEDS REVISION:** Return to Create/Edit mode:
  - Address critical issues identified
  - Re-run `step-01-c-start.md` or `step-10-e-load.md`
  - Re-validate after corrections

## Workflow Complete

Validation mode complete for research workflow.
