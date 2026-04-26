# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 💬 **Present validation results** before finalizing report

## EXECUTION PROTOCOLS

- 🎯 Focus: Generate validation report with gate decisions
- 💾 Track: `stepsCompleted: [20, 21, 22]` when complete
- 📖 Context: Summarize findings and determine GO/NO-GO recommendation
- 🚫 Do NOT: Re-execute validation checks; use findings from Step 21
- ⚠️ Gate: QG-I2, QG-I3 - Final gate decisions documented

---

## Purpose

Generate a comprehensive validation report summarizing findings from the convergence validation steps and determining the final gate outcomes for QG-I2 (Tenant Safety) and QG-I3 (Agent Safety).

---

## Prerequisites

- Step 20 completed: Artifacts loaded
- Step 21 completed: Validation executed
- **Load template:** `{project-root}/_bmad/bam/data/templates/convergence-report.md`

---

## Inputs

- Validation results from Step 21
- Quality gate decisions (PASS/CONDITIONAL/FAIL)
- Specific findings per check
- Evidence assessment
- Recommendations for remediation (if applicable)

---

## YOUR TASK:

Generate the final validation report with gate decisions and recommendations.

---

## Validation Sequence

### 1. Compile Validation Results

Organize findings from Step 21:

| Category | Status | Issues Found | Evidence Quality |
|----------|--------|--------------|------------------|
| QG-I2 Critical Checks | {{status}} | {{count}} | {{quality}} |
| QG-I2 Standard Checks | {{status}} | {{count}} | {{quality}} |
| QG-I3 Critical Checks | {{status}} | {{count}} | {{quality}} |
| QG-I3 Standard Checks | {{status}} | {{count}} | {{quality}} |

### 2. Assign Severity to Findings

| ID | Finding | Severity | Gate Impact | Required Action |
|----|---------|----------|-------------|-----------------|
| F-001 | {{finding}} | CRITICAL | QG-I2/I3 FAIL | Must fix before release |
| F-002 | {{finding}} | WARNING | Standard gap | Should address |
| F-003 | {{finding}} | INFO | Improvement | Consider for future |

**Severity Classification:**

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Any CRITICAL check failure | Must fix before proceeding |
| WARNING | Standard check failure or evidence gap | Should address |
| INFO | Suggested improvements | Consider for future |

### 3. Determine Gate Outcomes

#### QG-I2 (Tenant Safety) Final Decision

| Outcome | Criteria Met |
|---------|--------------|
| **PASS** | 4/4 CRITICAL + 5/6 Standard |
| **CONDITIONAL** | 4/4 CRITICAL + <5/6 Standard + mitigation documented |
| **FAIL** | Any CRITICAL fails |

**QG-I2 Outcome:** {{outcome}}

| If CONDITIONAL, document mitigation plan: |
|-------------------------------------------|
| {{mitigation_plan}} |

#### QG-I3 (Agent Safety) Final Decision

| Outcome | Criteria Met |
|---------|--------------|
| **PASS** | 4/4 CRITICAL + 5/6 Standard |
| **CONDITIONAL** | 4/4 CRITICAL + <5/6 Standard + mitigation documented |
| **FAIL** | Any CRITICAL fails |

**QG-I3 Outcome:** {{outcome}}

| If CONDITIONAL, document mitigation plan: |
|-------------------------------------------|
| {{mitigation_plan}} |

### 4. Overall Convergence Decision

| Gate | Outcome |
|------|---------|
| QG-I1 (if validated) | {{outcome}} |
| QG-I2 | {{outcome}} |
| QG-I3 | {{outcome}} |

**Overall Status:** {{status}}

| Overall | Criteria |
|---------|----------|
| **PASS** | All gates PASS |
| **CONDITIONAL** | All gates PASS or CONDITIONAL |
| **FAIL** | Any gate FAIL |

### 5. Generate Validation Report

Create validation report with sections:

#### 5.1 Executive Summary

```markdown
## Convergence Validation Summary

**Validation Date:** {{date}}
**Validator:** {{author}}

| Gate | Result | Issues |
|------|--------|--------|
| QG-I2 (Tenant Safety) | {{result}} | {{count}} |
| QG-I3 (Agent Safety) | {{result}} | {{count}} |

**Overall:** {{status}}
**Release Recommendation:** {{recommendation}}
```

#### 5.2 Detailed Findings

For each finding, document:
- Check that failed
- Expected vs. actual
- Evidence reviewed
- Impact assessment
- Recommended fix

#### 5.3 Gate Decision Justification

Document the rationale for each gate decision with evidence references.

#### 5.4 Recommendations

| Priority | Recommendation | Target Gate | Effort |
|----------|----------------|-------------|--------|
| HIGH | {{recommendation}} | QG-I2/I3 | {{effort}} |
| MEDIUM | {{recommendation}} | QG-I2/I3 | {{effort}} |
| LOW | {{recommendation}} | Future | {{effort}} |

### 6. Recovery Protocol (If Any Gate FAIL)

If validation triggers FAIL status:

#### Attempt 1: Targeted Fix (1-2 days)
1. Review failed CRITICAL checks
2. Identify root cause
3. Apply targeted fix
4. Re-run validation for failed checks only
5. Lock passed checks

#### Attempt 2: Deep Investigation (1 week)
1. Engage relevant architect
2. Review architectural decisions
3. Apply corrective measures
4. Re-run full validation

#### Mandatory Course Correction
1. Escalate to project leadership
2. Document blockers in ADR
3. Consider staged rollout
4. Reassess release timeline

### 7. Output Report

Write validation report to:
```
{output_folder}/planning-artifacts/architecture/convergence-validation-report.md
```

Include:
- Validation outcome
- Gate decisions with justification
- Findings by severity
- Required fixes (if FAIL)
- Recommended improvements
- Recovery protocol status (if applicable)

---

## SUCCESS METRICS:

- [ ] All findings documented with severity
- [ ] Gate decisions justified with evidence
- [ ] Recommendations prioritized
- [ ] Validation report generated
- [ ] Next steps clearly defined

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Gate FAIL with CRITICAL issues | Document blockers, enter recovery protocol |
| Missing evidence | Request evidence, document gap |
| Conflicting findings | Escalate for architect review |

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Gate outcomes determined
- [ ] Report generated with all required sections
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation report document
- Gate decisions (QG-I2, QG-I3)
- Required fixes list (if applicable)
- Improvement recommendations

---

## NEXT STEP:

Based on validation outcome:

| Outcome | Next Step |
|---------|-----------|
| **PASS** | Convergence validated. Proceed to production readiness (QG-P1) |
| **CONDITIONAL** | Document gaps and proceed with noted limitations. Monitor post-release |
| **FAIL** | Enter recovery protocol. Address CRITICAL issues before re-validation |

## Workflow Complete

Validation mode complete for convergence workflow.

If FAIL outcome:
- Return to Create/Edit mode to address issues
- Re-run validation after fixes applied

If PASS/CONDITIONAL:
- Convergence verified
- Ready for production readiness assessment (QG-P1)
