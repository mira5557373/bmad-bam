# Step 22: Generate Validation Report (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 📄 **GENERATE complete report** with actionable recommendations

## EXECUTION PROTOCOLS

- 🎯 Focus: Generate QG-PL1 validation report
- 💾 Track: `stepsCompleted: [20, 21, 22]` when complete
- 📖 Context: Compile validation results into report
- 🚫 Do NOT: Re-run validation (use Step 21 results)

---

## Purpose

Generate the final QG-PL1 validation report with gate decision, findings, and recommendations. This report provides actionable guidance for addressing any identified gaps.

---

## Prerequisites

- Step 21 completed: Validation checks executed
- All validation results available
- **Load template:** `{project-root}/_bmad/bam/data/templates/validation-report.md`

---

## Inputs

- Validation results from Step 21
- Preliminary gate decision
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK

Generate the final QG-PL1 validation report with the gate decision (PASS/CONDITIONAL/FAIL), executive summary, detailed check results with evidence, issue register for failed checks, actionable recommendations, and recovery protocol if applicable. Write the report to the output location and present the final decision to the user.

---

## Report Generation

### 1. Report Header

```markdown
# QG-PL1 Validation Report

**Artifact:** Triage Report
**Gate:** QG-PL1 (Planning)
**Date:** {{date}}
**Validator:** {{validator}}
**Status:** {{PASS/CONDITIONAL/FAIL}}
```

### 2. Executive Summary

**Gate Decision:** {{PASS / CONDITIONAL / FAIL}}

| Category | Result | Details |
|----------|--------|---------|
| Critical Checks | {{passed}}/4 | {{summary}} |
| Standard Checks | {{passed}}/4 | {{summary}} |
| Overall | {{passed}}/8 | {{summary}} |

**Key Findings:**
1. {{finding_1}}
2. {{finding_2}}
3. {{finding_3}}

### 3. Detailed Results

#### Critical Checks

| Check | Status | Evidence | Recommendation |
|-------|--------|----------|----------------|
| PL1-01 Module Coverage | PASS/FAIL | {{evidence}} | {{rec}} |
| PL1-02 Complexity Scoring | PASS/FAIL | {{evidence}} | {{rec}} |
| PL1-03 Prioritization | PASS/FAIL | {{evidence}} | {{rec}} |
| PL1-04 Dependency Mapping | PASS/FAIL | {{evidence}} | {{rec}} |

#### Standard Checks

| Check | Status | Evidence | Recommendation |
|-------|--------|----------|----------------|
| PL1-05 Phase Definition | PASS/FAIL | {{evidence}} | {{rec}} |
| PL1-06 Timeline Estimation | PASS/FAIL | {{evidence}} | {{rec}} |
| PL1-07 Resource Estimation | PASS/FAIL | {{evidence}} | {{rec}} |
| PL1-08 Risk Documentation | PASS/FAIL | {{evidence}} | {{rec}} |

### 4. Issue Register

| Issue ID | Check | Severity | Description | Remediation |
|----------|-------|----------|-------------|-------------|
| ISS-001 | {{check}} | CRITICAL/STANDARD | {{desc}} | {{remediation}} |

### 5. Recommendations

#### If PASS:
- Proceed to `create-master-architecture` workflow
- Use triage priorities to guide module sequencing
- Schedule periodic triage refresh (recommend: monthly)

#### If CONDITIONAL:
- Address standard check gaps within {{deadline}}
- Document accepted limitations in decision log
- Proceed with acknowledged gaps

#### If FAIL:
- **HALT:** Do not proceed to architecture phase
- Address critical check failures
- Re-run triage workflow for affected sections
- Re-validate after remediation

### 6. Recovery Protocol (If FAIL)

If any CRITICAL checks failed:

**Attempt 1:**
1. Identify failed checks from Issue Register
2. Return to relevant Create mode step
3. Address specific gaps
4. Re-run validation

**Attempt 2 (if Attempt 1 fails):**
1. Review underlying requirements
2. Engage stakeholders for clarification
3. Address root cause issues
4. Re-run full triage workflow

**Attempt 3 (if Attempt 2 fails):**
1. **MANDATORY COURSE CORRECTION**
2. Escalate to project leadership
3. Review scope and constraints
4. Consider scope reduction

### 7. Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Validator | {{name}} | {{date}} | __________ |
| Reviewer | {{name}} | {{date}} | __________ |
| Approver | {{name}} | {{date}} | __________ |

---

## Write Validation Report

Write the validation report:

```
{output_folder}/planning-artifacts/triage-validation-report.md
```

---

## Present Final Decision

Present gate decision to user:

```
QG-PL1 VALIDATION COMPLETE

Decision: {{PASS / CONDITIONAL / FAIL}}

Critical Checks: {{passed}}/4 passed
Standard Checks: {{passed}}/4 passed

{{Outcome-specific message}}

Report written to: {output_folder}/planning-artifacts/triage-validation-report.md
```

---

## SUCCESS METRICS

- ✅ Executive summary clearly states gate decision
- ✅ All 8 check results documented with evidence
- ✅ Issue register populated for any failed checks
- ✅ Actionable recommendations provided for each outcome
- ✅ Recovery protocol included if FAIL decision
- ✅ Sign-off section ready for stakeholder approval
- ✅ Report written to correct output location
- ✅ Final decision presented to user with next steps

---

## FAILURE MODES

- ❌ **Missing check results:** Cannot generate complete report, return to Step 21
- ❌ **Write failure:** Retry write, attempt backup location
- ❌ **Incomplete recommendations:** Each outcome must have clear next steps
- ❌ **Missing recovery protocol:** Required when decision is FAIL

---

## Verification

- [ ] Validation report generated
- [ ] All sections populated
- [ ] Gate decision documented
- [ ] Recommendations provided
- [ ] Report written to file

---

## Outputs

- Validation report: `{output_folder}/planning-artifacts/triage-validation-report.md`
- Gate decision: PASS / CONDITIONAL / FAIL
- Issue register (if applicable)
- Recommendations

---

## Next Step

Validation complete.

**Based on outcome:**

| Outcome | Next Action |
|---------|-------------|
| **PASS** | Proceed to `create-master-architecture` workflow |
| **CONDITIONAL** | Address gaps, proceed with caution |
| **FAIL** | Enter recovery protocol, re-run triage |

**Related Workflows:**
- `bmad-bam-create-master-architecture` - Design system architecture
- `bmad-bam-requirement-ingestion` - If requirements need refinement
- `bmad-bam-triage` (Create mode) - If major rework needed
