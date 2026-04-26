# Step 22: Generate Compliance Validation Report (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Generate complete validation report
- 📖 Document outcome objectively
- :white_check_mark: Provide clear next steps based on outcome

---

## Purpose

Generate the compliance design validation report with outcome determination (PASS, CONDITIONAL, FAIL) and actionable recommendations.

---

## Prerequisites

- Step 21 completed: Validation checks executed
- Validation summary compiled
- All findings documented

---

## Actions

### 1. Calculate Validation Score

Compute overall compliance design score:

| Category | Weight | Score | Weighted Score |
|----------|--------|-------|----------------|
| Framework Coverage | 20% | {0-100} | {score} |
| Data Governance | 25% | {0-100} | {score} |
| Audit Controls | 20% | {0-100} | {score} |
| Compliance Monitoring | 20% | {0-100} | {score} |
| Tenant Isolation | 10% | {0-100} | {score} |
| Risk Assessment | 5% | {0-100} | {score} |
| **TOTAL** | 100% | - | **{total}** |

### 2. Determine Validation Outcome

Apply outcome determination rules:

| Outcome | Criteria |
|---------|----------|
| **PASS** | Total >= 90% AND 0 critical failures |
| **CONDITIONAL** | Total >= 75% AND 0 critical failures AND non-critical gaps have mitigation plan |
| **FAIL** | Total < 75% OR any critical failure |

**Current Outcome:** `{PASS/CONDITIONAL/FAIL}`

### 3. Document Critical Findings

List all critical findings requiring resolution:

| Finding ID | Category | Description | Severity | Resolution Required |
|------------|----------|-------------|----------|---------------------|
| CF-001 | {category} | {description} | CRITICAL | {resolution} |
| CF-002 | {category} | {description} | CRITICAL | {resolution} |

### 4. Document Non-Critical Gaps

List gaps that don't block approval:

| Gap ID | Category | Description | Severity | Mitigation | Deadline |
|--------|----------|-------------|----------|------------|----------|
| GAP-001 | {category} | {description} | HIGH/MEDIUM | {mitigation} | {date} |
| GAP-002 | {category} | {description} | HIGH/MEDIUM | {mitigation} | {date} |

### 5. Generate Recommendations

Provide prioritized recommendations:

**Immediate Actions (if FAIL):**
1. {Critical finding resolution steps}
2. {Critical finding resolution steps}

**Short-term Improvements (if CONDITIONAL):**
1. {Gap mitigation steps}
2. {Gap mitigation steps}

**Long-term Enhancements (all outcomes):**
1. {Continuous improvement recommendations}
2. {Best practice enhancements}

### 6. Compile Validation Report

Generate the complete validation report:

```markdown
# Compliance Design Validation Report

## Summary

| Field | Value |
|-------|-------|
| Document | Compliance Design |
| Version | {version} |
| Validation Date | {{date}} |
| Validator | {agent/user} |
| **Outcome** | **{PASS/CONDITIONAL/FAIL}** |
| Overall Score | {score}% |

## Outcome Justification

{Explanation of outcome based on validation results}

## Validation Results by Category

### Framework Coverage
- Score: {score}%
- Status: PASS/FAIL
- Findings: {summary}

### Data Governance
- Score: {score}%
- Status: PASS/FAIL
- Findings: {summary}

### Audit Controls
- Score: {score}%
- Status: PASS/FAIL
- Findings: {summary}

### Compliance Monitoring
- Score: {score}%
- Status: PASS/FAIL
- Findings: {summary}

### Tenant Isolation
- Score: {score}%
- Status: PASS/FAIL
- Findings: {summary}

### Risk Assessment
- Score: {score}%
- Status: PASS/FAIL
- Findings: {summary}

## Critical Findings

{Table of critical findings}

## Non-Critical Gaps

{Table of gaps with mitigation plans}

## Recommendations

### Immediate Actions
{List if FAIL}

### Short-term Improvements
{List if CONDITIONAL}

### Long-term Enhancements
{List for all}

## Next Steps

{Based on outcome}

## Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Compliance Officer | | | |
| Security Architect | | | |
| CTO | | | |
```

### 7. Determine Next Steps

Based on outcome:

**If PASS:**
- Compliance design approved for implementation
- Proceed to implementation phase
- Schedule periodic review (quarterly)

**If CONDITIONAL:**
- Address non-critical gaps per mitigation plan
- Proceed with implementation with monitoring
- Required re-validation: {deadline}
- Stakeholder sign-off required on gaps

**If FAIL:**
- Address all critical findings
- Re-run validation after fixes
- Do not proceed to implementation
- Escalate to compliance leadership

---

## COLLABORATION MENUS (A/P/C):

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific findings or recommendations
- **P (Party Mode)**: Bring compliance leadership perspective on outcome
- **C (Continue)**: Accept report and proceed based on outcome
- **[Specific finding]**: Discuss resolution approach for specific finding

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation outcome, findings, recommendations
- Process enhanced understanding of next steps
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review compliance validation outcome and recommendations"
- Present compliance leadership perspective
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation report
- Mark Validate mode complete

---

## Verification

- [ ] Validation score calculated correctly
- [ ] Outcome determined per criteria
- [ ] Critical findings documented
- [ ] Non-critical gaps documented with mitigations
- [ ] Recommendations prioritized
- [ ] Validation report generated
- [ ] Next steps clearly defined

---

## Outputs

- Compliance design validation report
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings and gap documentation
- Prioritized recommendations
- Next steps based on outcome

---

## Validation Complete

The compliance design validation is complete.

**Outcome: {PASS/CONDITIONAL/FAIL}**

Based on the outcome:
- **PASS**: The compliance design meets all quality gate requirements. Proceed to implementation.
- **CONDITIONAL**: The compliance design meets core requirements with documented gaps. Proceed with mitigation plan and re-validation deadline.
- **FAIL**: The compliance design has critical gaps. Return to Edit mode to address findings, then re-validate.

---

## Recovery Protocol (if FAIL)

If validation fails, follow the 3-attempt recovery protocol:

1. **Attempt 1**: Fix critical findings, re-run validation
2. **Attempt 2**: If still failing, fix remaining issues, re-run validation
3. **Attempt 3**: If still failing, escalate to compliance leadership for course correction

Categories that passed remain "locked" and don't require re-validation.
