# Step 22: Generate LLM Versioning Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Generate validation report with outcome determination
- 💾 Track: `stepsCompleted: [20, 21, 22]` when complete
- 📖 Context: Validation results from Step 21
- 🚫 Do NOT: Make modifications - report generation only
- 🔍 Use web search: Not applicable for report generation
- ⚠️ Gate: QG-AI1, QG-AI2 - Final outcome determination

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Compiling validation report
- Determining gate outcome (PASS/CONDITIONAL/FAIL)
- Documenting remediation actions if needed
- Generating report artifact

**OUT OF SCOPE:**
- Applying remediation
- Modifying original document
- Implementation steps

---

## Purpose

Generate the final validation report for the LLM versioning design with gate outcome determination. Document findings, recommendations, and required remediation actions.

---

## Prerequisites

- Step 21 completed: All validation results available
- Validation summary statistics compiled

---

## Inputs

- QG-AI1 validation results from Step 21
- QG-AI2 validation results from Step 21
- Cross-reference and pattern compliance results

---

## YOUR TASK:

Generate validation report and determine gate outcome.

---

## Main Sequence

### 1. Compile Executive Summary

Generate executive summary based on validation results:

```markdown
## Executive Summary

**Document:** LLM Versioning Design
**Validation Date:** {{date}}
**Validator:** AI Runtime Architect (Nova)

### Gate Outcomes

| Quality Gate | Outcome | Critical Failures |
|--------------|---------|-------------------|
| QG-AI1 (Runtime Config) | {{PASS/CONDITIONAL/FAIL}} | {{count}} |
| QG-AI2 (Monitoring) | {{PASS/CONDITIONAL/FAIL}} | {{count}} |

### Overall Outcome: {{PASS/CONDITIONAL/FAIL}}

{{Summary statement based on outcome}}
```

### 2. Determine Gate Outcomes

Apply outcome determination logic:

**QG-AI1 Outcome Determination:**

| Condition | Outcome |
|-----------|---------|
| 0 critical failures, all checks pass | PASS |
| 0 critical failures, some non-critical fail | CONDITIONAL |
| Any critical failure | FAIL |

**QG-AI2 Outcome Determination:**

| Condition | Outcome |
|-----------|---------|
| 0 critical failures, all checks pass | PASS |
| 0 critical failures, some non-critical fail | CONDITIONAL |
| Any critical failure | FAIL |

**Overall Outcome:**

| QG-AI1 | QG-AI2 | Overall |
|--------|--------|---------|
| PASS | PASS | **PASS** |
| PASS | CONDITIONAL | CONDITIONAL |
| CONDITIONAL | PASS | CONDITIONAL |
| CONDITIONAL | CONDITIONAL | CONDITIONAL |
| FAIL | Any | **FAIL** |
| Any | FAIL | **FAIL** |

### 3. Generate Detailed Findings

#### 3.1 QG-AI1 Findings

```markdown
## QG-AI1: AI Runtime Configuration

### Passed Checks ({{count}})
{{List of passed checks}}

### Failed Checks ({{count}})

| Check | Criteria | Finding | Severity | Remediation |
|-------|----------|---------|----------|-------------|
| {{id}} | {{criteria}} | {{finding}} | Critical/Non-Critical | {{action}} |

### Critical Failures ({{count}})

| Check | Finding | Required Action | Deadline |
|-------|---------|-----------------|----------|
| {{id}} | {{finding}} | {{action}} | Immediate/Before Release |
```

#### 3.2 QG-AI2 Findings

```markdown
## QG-AI2: AI Operational Monitoring

### Passed Checks ({{count}})
{{List of passed checks}}

### Failed Checks ({{count}})

| Check | Criteria | Finding | Severity | Remediation |
|-------|----------|---------|----------|-------------|
| {{id}} | {{criteria}} | {{finding}} | Critical/Non-Critical | {{action}} |

### Critical Failures ({{count}})

| Check | Finding | Required Action | Deadline |
|-------|---------|-----------------|----------|
| {{id}} | {{finding}} | {{action}} | Immediate/Before Release |
```

### 4. Generate Remediation Plan

If outcome is CONDITIONAL or FAIL:

```markdown
## Remediation Plan

### Critical Items (Must Fix)

| Priority | Check | Finding | Action | Owner | Deadline |
|----------|-------|---------|--------|-------|----------|
| 1 | {{id}} | {{finding}} | {{action}} | {{owner}} | {{date}} |
| 2 | {{id}} | {{finding}} | {{action}} | {{owner}} | {{date}} |

### Non-Critical Items (Should Fix)

| Priority | Check | Finding | Action | Owner | Deadline |
|----------|-------|---------|--------|-------|----------|
| 1 | {{id}} | {{finding}} | {{action}} | {{owner}} | {{date}} |

### Conditional Approval Requirements

If outcome is CONDITIONAL:
- [ ] {{Condition 1 that must be met}}
- [ ] {{Condition 2 that must be met}}
- [ ] Re-validation required by: {{date}}
```

### 5. Generate Recommendations

```markdown
## Recommendations

### Immediate Actions
1. {{Recommendation 1}}
2. {{Recommendation 2}}

### Future Improvements
1. {{Enhancement 1}}
2. {{Enhancement 2}}

### Pattern Compliance Notes
- {{Pattern note 1}}
- {{Pattern note 2}}
```

### 6. Write Report Artifact

Output the complete report to:

```
{output_folder}/planning-artifacts/ai/llm-versioning-validation-report.md
```

**Report Structure:**

```markdown
# LLM Versioning Design Validation Report

**Generated:** {{date}}
**Document Version:** {{version}}
**Validator:** AI Runtime Architect (Nova)

---

## Executive Summary
{{From step 1}}

## Gate Outcomes
{{From step 2}}

## QG-AI1: AI Runtime Configuration
{{From step 3.1}}

## QG-AI2: AI Operational Monitoring
{{From step 3.2}}

## Cross-Reference Consistency
{{From Step 21 results}}

## Pattern Compliance
{{From Step 21 results}}

## Remediation Plan
{{From step 4}}

## Recommendations
{{From step 5}}

---

## Appendix: Full Check Results

### QG-AI1 Detailed Results
{{Full table from Step 21}}

### QG-AI2 Detailed Results
{{Full table from Step 21}}
```

### 7. Present Outcome to User

Based on outcome, present appropriate message:

**If PASS:**
```
VALIDATION OUTCOME: PASS

The LLM Versioning Design passes all quality gate criteria.
- QG-AI1 (Runtime Configuration): PASS
- QG-AI2 (Monitoring): PASS

The design is approved for implementation.

Report saved to: {output_folder}/planning-artifacts/ai/llm-versioning-validation-report.md
```

**If CONDITIONAL:**
```
VALIDATION OUTCOME: CONDITIONAL

The LLM Versioning Design passes with conditions.
- QG-AI1 (Runtime Configuration): {{outcome}}
- QG-AI2 (Monitoring): {{outcome}}

{{count}} non-critical issues require remediation.
See Remediation Plan for required actions.

The design may proceed with documented conditions.
Re-validation required after remediation.

Report saved to: {output_folder}/planning-artifacts/ai/llm-versioning-validation-report.md
```

**If FAIL:**
```
VALIDATION OUTCOME: FAIL

The LLM Versioning Design does not pass quality gate criteria.
- QG-AI1 (Runtime Configuration): {{outcome}}
- QG-AI2 (Monitoring): {{outcome}}

{{count}} critical issues require immediate remediation.
See Remediation Plan for required actions.

The design must be revised before proceeding.
Use Edit mode to apply remediations, then re-validate.

Report saved to: {output_folder}/planning-artifacts/ai/llm-versioning-validation-report.md
```

---

## SUCCESS METRICS:

- [ ] Executive summary generated
- [ ] Gate outcomes determined correctly
- [ ] All findings documented
- [ ] Remediation plan created (if needed)
- [ ] Report artifact saved

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Incomplete validation data | Return to Step 21 |
| Cannot write report | Check permissions |
| Outcome logic error | Manual override with justification |

---

## Verification

- [ ] Report contains all required sections
- [ ] Outcome determination follows rules
- [ ] Remediation plan actionable
- [ ] Report saved successfully

---

## Outputs

- Validation report: `{output_folder}/planning-artifacts/ai/llm-versioning-validation-report.md`
- Gate outcome determination
- Remediation plan (if applicable)

---

## VALIDATION WORKFLOW COMPLETE:

The LLM Versioning Design validation is complete.

**Report Location:** `{output_folder}/planning-artifacts/ai/llm-versioning-validation-report.md`

**Next Steps Based on Outcome:**

| Outcome | Next Steps |
|---------|------------|
| PASS | Proceed to implementation |
| CONDITIONAL | Address non-critical items, optional re-validation |
| FAIL | Use Edit mode to remediate, then re-validate |
