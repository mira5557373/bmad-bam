# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 💬 **Present validation results** before finalizing report

## EXECUTION PROTOCOLS

- 🎯 Focus: Generate validation report with compliance decisions
- 💾 Track: `stepsCompleted: [20, 21, 22]` when complete
- 📖 Context: Summarize findings and determine COMPLIANT/NON-COMPLIANT
- 🚫 Do NOT: Re-execute validation checks; use findings from Step 21
- ⚠️ Focus: GDPR, CCPA compliance status and remediation

---

## Purpose

Generate a comprehensive validation report summarizing findings from the offboarding validation steps and determining the final compliance status for GDPR Article 17, CCPA, and operational readiness.

---

## Prerequisites

- Step 20 completed: Artifacts loaded
- Step 21 completed: Validation executed
- **Load template:** `{project-root}/_bmad/bam/data/templates/validation-report-template.md`

---

## Inputs

- Validation results from Step 21
- Compliance decisions (PASS/CONDITIONAL/FAIL)
- Specific findings per check
- Evidence assessment
- Recommendations for remediation (if applicable)

---

## YOUR TASK:

Generate the final validation report with compliance decisions and recommendations.

---

## Validation Sequence

### 1. Compile Validation Results

Organize findings from Step 21:

| Category | Status | Issues Found | Evidence Quality |
|----------|--------|--------------|------------------|
| GDPR Critical Checks | {{status}} | {{count}} | {{quality}} |
| GDPR Standard Checks | {{status}} | {{count}} | {{quality}} |
| CCPA Critical Checks | {{status}} | {{count}} | {{quality}} |
| CCPA Standard Checks | {{status}} | {{count}} | {{quality}} |
| Operational Critical | {{status}} | {{count}} | {{quality}} |
| Operational Standard | {{status}} | {{count}} | {{quality}} |

### 2. Assign Severity to Findings

| ID | Finding | Severity | Compliance Impact | Required Action |
|----|---------|----------|-------------------|-----------------|
| F-001 | {{finding}} | CRITICAL | GDPR non-compliant | Must fix before launch |
| F-002 | {{finding}} | WARNING | Operational gap | Should address |
| F-003 | {{finding}} | INFO | Improvement | Consider for future |

**Severity Classification:**

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Compliance violation or data loss risk | Must fix before proceeding |
| WARNING | Operational gap or incomplete design | Should address |
| INFO | Suggested improvements | Consider for future |

### 3. Determine Compliance Outcomes

#### GDPR Article 17 Compliance

| Outcome | Criteria Met |
|---------|--------------|
| **COMPLIANT** | 5/5 CRITICAL + 3/4 Standard |
| **CONDITIONAL** | 5/5 CRITICAL + <3/4 Standard + mitigation plan |
| **NON-COMPLIANT** | Any CRITICAL fails |

**GDPR Outcome:** {{outcome}}

| If NON-COMPLIANT, document remediation: |
|-----------------------------------------|
| {{remediation_plan}} |

#### CCPA Compliance

| Outcome | Criteria Met |
|---------|--------------|
| **COMPLIANT** | 4/4 CRITICAL + 2/3 Standard |
| **CONDITIONAL** | 4/4 CRITICAL + <2/3 Standard + mitigation plan |
| **NON-COMPLIANT** | Any CRITICAL fails |

**CCPA Outcome:** {{outcome}}

| If NON-COMPLIANT, document remediation: |
|-----------------------------------------|
| {{remediation_plan}} |

#### Operational Readiness

| Outcome | Criteria Met |
|---------|--------------|
| **READY** | 16/16 CRITICAL + 16/20 Standard |
| **CONDITIONAL** | 16/16 CRITICAL + <16/20 Standard |
| **NOT READY** | Any CRITICAL fails |

**Operational Outcome:** {{outcome}}

### 4. Overall Offboarding Readiness

| Framework | Outcome |
|-----------|---------|
| GDPR Article 17 | {{outcome}} |
| CCPA | {{outcome}} |
| Operational | {{outcome}} |

**Overall Status:** {{status}}

| Overall | Criteria |
|---------|----------|
| **APPROVED** | All frameworks COMPLIANT/READY |
| **CONDITIONAL** | All frameworks at least CONDITIONAL |
| **NOT APPROVED** | Any framework NON-COMPLIANT/NOT READY |

### 5. Generate Validation Report

Create validation report with sections:

#### 5.1 Executive Summary

```markdown
## Offboarding Validation Summary

**Validation Date:** {{date}}
**Validator:** {{author}}

| Framework | Result | Issues |
|-----------|--------|--------|
| GDPR Article 17 | {{result}} | {{count}} |
| CCPA | {{result}} | {{count}} |
| Operational | {{result}} | {{count}} |

**Overall:** {{status}}
**Implementation Recommendation:** {{recommendation}}
```

#### 5.2 Detailed Findings

For each finding, document:
- Check that failed
- Expected vs. actual
- Evidence reviewed
- Compliance impact
- Recommended fix

#### 5.3 Compliance Decision Justification

Document the rationale for each compliance decision with evidence references.

#### 5.4 Remediation Roadmap

| Priority | Remediation | Framework | Effort | Deadline |
|----------|-------------|-----------|--------|----------|
| HIGH | {{remediation}} | GDPR | {{effort}} | {{date}} |
| MEDIUM | {{remediation}} | Operational | {{effort}} | {{date}} |
| LOW | {{remediation}} | Future | {{effort}} | {{date}} |

### 6. Recovery Protocol (If Non-Compliant)

If validation triggers NON-COMPLIANT status:

#### Attempt 1: Targeted Fix (1-2 days)
1. Review failed CRITICAL checks
2. Identify compliance gap
3. Update design to address gap
4. Re-run validation for failed checks only
5. Lock passed checks

#### Attempt 2: Design Review (1 week)
1. Engage legal/compliance team
2. Review with security architect
3. Update affected sections
4. Re-run full validation

#### Mandatory Course Correction
1. Escalate to project leadership
2. Engage external compliance consultant
3. Document blockers and risks
4. Reassess launch timeline

### 7. Output Report

Write validation report to:
```
{output_folder}/planning-artifacts/tenant-offboarding-validation-report.md
```

Include:
- Validation outcome
- Compliance decisions with justification
- Findings by severity
- Required fixes (if non-compliant)
- Recommended improvements
- Recovery protocol status (if applicable)

---

## SUCCESS METRICS:

- [ ] All findings documented with severity
- [ ] Compliance decisions justified with evidence
- [ ] Remediation roadmap prioritized
- [ ] Validation report generated
- [ ] Next steps clearly defined

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| NON-COMPLIANT with CRITICAL issues | Document blockers, enter recovery protocol |
| Missing evidence | Request evidence, document gap |
| Conflicting findings | Escalate for legal/compliance review |

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Compliance outcomes determined
- [ ] Report generated with all required sections
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation report document
- Compliance decisions (GDPR, CCPA, Operational)
- Required fixes list (if applicable)
- Improvement recommendations

---

## NEXT STEP:

Based on validation outcome:

| Outcome | Next Step |
|---------|-----------|
| **APPROVED** | Offboarding design validated. Proceed to implementation |
| **CONDITIONAL** | Document gaps and proceed with noted limitations |
| **NOT APPROVED** | Enter recovery protocol. Address CRITICAL issues before re-validation |

## Workflow Complete

Validation mode complete for offboarding workflow.

If NOT APPROVED outcome:
- Return to Create/Edit mode to address issues
- Re-run validation after fixes applied

If APPROVED/CONDITIONAL:
- Offboarding design validated
- Ready for implementation
- Document any CONDITIONAL items for post-launch review
