# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 💬 **Present validation results** before finalizing report

## EXECUTION PROTOCOLS

- 🎯 Focus: Generate validation report with QG-P1 gate decision
- 💾 Track: `stepsCompleted: [20, 21, 22]` when complete
- 📖 Context: Summarize findings and determine GO/NO-GO recommendation
- 🚫 Do NOT: Re-execute validation checks; use findings from Step 21
- ⚠️ Gate: QG-P1 - Final gate decision documented

---

## Purpose

Generate a comprehensive validation report summarizing findings from the QG-P1 validation steps and determining the final gate outcome for production readiness. This report provides the official GO/NO-GO decision with full evidence and justification.

---

## Prerequisites

- Step 20 completed: Artifacts loaded
- Step 21 completed: Validation executed
- **Load template:** `{project-root}/_bmad/bam/data/templates/production-readiness-template.md`

---

## Inputs

- Validation results from Step 21
- Quality gate decisions (PASS/CONDITIONAL/FAIL)
- Specific findings per check
- Evidence assessment
- Recommendations for remediation (if applicable)

---

## YOUR TASK:

Generate the final validation report with QG-P1 gate decision and recommendations.

---

## Validation Sequence

### 1. Compile Validation Results

Organize findings from Step 21:

| Category | CRITICAL Status | Standard Status | Overall |
|----------|-----------------|-----------------|---------|
| Infrastructure | {{pass}}/{{total}} | {{percent}}% | {{outcome}} |
| Observability | {{pass}}/{{total}} | {{percent}}% | {{outcome}} |
| Security | {{pass}}/{{total}} | {{percent}}% | {{outcome}} |
| Operations | {{pass}}/{{total}} | {{percent}}% | {{outcome}} |
| Prerequisites | {{valid}}/{{total}} | N/A | {{outcome}} |

### 2. Assign Severity to Findings

| ID | Finding | Severity | Category | Required Action |
|----|---------|----------|----------|-----------------|
| P-001 | {{finding}} | CRITICAL | {{category}} | Must fix before production |
| P-002 | {{finding}} | HIGH | {{category}} | Should address before production |
| P-003 | {{finding}} | MEDIUM | {{category}} | Address within 30 days |
| P-004 | {{finding}} | LOW | {{category}} | Consider for future |

**Severity Classification:**

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Any CRITICAL check failure | Must fix before production (blocking) |
| HIGH | Standard check failure with impact | Should address before production |
| MEDIUM | Standard check failure | Address within 30 days post-launch |
| LOW | Improvement opportunity | Consider for future iteration |

### 3. Determine QG-P1 Outcome

#### QG-P1 Decision Matrix

| Outcome | Criteria Met |
|---------|--------------|
| **GO** | All CRITICAL pass + 80% Standard + All prerequisites valid |
| **GO WITH CONDITIONS** | All CRITICAL pass + <80% Standard + Mitigation documented |
| **NO-GO** | Any CRITICAL fails OR any prerequisite invalid |

#### Final Calculation

| Criterion | Value | Required | Status |
|-----------|-------|----------|--------|
| Infrastructure CRITICAL | {{pass}}/{{total}} | 100% | {{status}} |
| Observability CRITICAL | {{pass}}/{{total}} | 100% | {{status}} |
| Security CRITICAL | {{pass}}/{{total}} | 100% | {{status}} |
| Operations CRITICAL | {{pass}}/{{total}} | 100% | {{status}} |
| Prerequisites | {{valid}}/{{total}} | 100% | {{status}} |
| Overall Standard | {{percent}}% | 80% | {{status}} |

**QG-P1 Outcome:** {{GO / GO WITH CONDITIONS / NO-GO}}

### 4. Document Conditions (if GO WITH CONDITIONS)

| Condition | Deadline | Owner | Consequence if Missed |
|-----------|----------|-------|----------------------|
| {{condition_1}} | {{date}} | {{owner}} | Halt deployment |
| {{condition_2}} | {{date}} | {{owner}} | Trigger incident |
| {{condition_3}} | {{date}} | {{owner}} | Re-assess gate |

**Condition Monitoring:**
- Daily standup check on condition progress
- Escalation if deadline at risk
- Automatic NO-GO if deadline missed

### 5. Generate Validation Report

Create validation report with sections:

#### 5.1 Executive Summary

```markdown
## QG-P1 Production Readiness Validation

**Validation Date:** {{date}}
**Validator:** {{author}}
**Environment:** {{environment}}

### Decision: {{GO / GO WITH CONDITIONS / NO-GO}}

| Category | Result | Issues |
|----------|--------|--------|
| Infrastructure | {{result}} | {{count}} |
| Observability | {{result}} | {{count}} |
| Security | {{result}} | {{count}} |
| Operations | {{result}} | {{count}} |
| Prerequisites | {{result}} | {{count}} |

**Overall:** {{status}}
**Deployment Authorized:** {{YES/NO}}
```

#### 5.2 Detailed Findings

For each finding, document:
- Check that failed
- Expected vs. actual
- Evidence reviewed
- Impact assessment
- Recommended fix
- Timeline for resolution

#### 5.3 Gate Decision Justification

Document the rationale for the gate decision with evidence references:

```markdown
### Decision Justification

**Decision:** {{decision}}

**Rationale:**
{{Detailed explanation of why this decision was made, referencing specific checks and evidence}}

**Key Evidence:**
1. {{Evidence 1 with reference}}
2. {{Evidence 2 with reference}}
3. {{Evidence 3 with reference}}

**Stakeholder Acknowledgment:**
- {{Stakeholder 1}}: {{date}}
- {{Stakeholder 2}}: {{date}}
```

#### 5.4 Risk Summary (if GO WITH CONDITIONS or NO-GO)

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| {{risk_1}} | High/Med/Low | High/Med/Low | {{mitigation}} |
| {{risk_2}} | High/Med/Low | High/Med/Low | {{mitigation}} |

#### 5.5 Recommendations

| Priority | Recommendation | Target | Effort | Owner |
|----------|----------------|--------|--------|-------|
| P0 | {{recommendation}} | Immediate | {{effort}} | {{owner}} |
| P1 | {{recommendation}} | 7 days | {{effort}} | {{owner}} |
| P2 | {{recommendation}} | 30 days | {{effort}} | {{owner}} |
| P3 | {{recommendation}} | Future | {{effort}} | {{owner}} |

### 6. Recovery Protocol (If NO-GO)

If validation results in NO-GO:

#### Attempt 1: Targeted Fix (1-3 days)

1. Review specific CRITICAL failures
2. Assign owner for each failure
3. Implement targeted fixes
4. Re-run validation for failed checks only
5. Lock categories that passed

#### Attempt 2: Deep Investigation (1 week)

1. Engage relevant architects and specialists
2. Review root causes
3. Apply comprehensive fixes
4. Re-run full QG-P1 validation

#### Mandatory Course Correction (Escalation)

1. Escalate to project leadership
2. Document blockers in ADR
3. Consider phased rollout
4. Reassess deployment timeline
5. Evaluate business impact

### 7. Sign-Off Section

```markdown
## Sign-Off

| Role | Name | Decision | Date | Signature |
|------|------|----------|------|-----------|
| Technical Lead | {{name}} | {{approve/reject}} | {{date}} | _________ |
| Security Lead | {{name}} | {{approve/reject}} | {{date}} | _________ |
| Operations Lead | {{name}} | {{approve/reject}} | {{date}} | _________ |
| Product Owner | {{name}} | {{approve/reject}} | {{date}} | _________ |
| Engineering Manager | {{name}} | {{approve/reject}} | {{date}} | _________ |

**Final Authorization:**
☐ All required sign-offs obtained
☐ Conditions acknowledged (if applicable)
☐ Deployment window confirmed
☐ Rollback plan reviewed
☐ On-call team notified
```

### 8. Output Report

Write validation report to:

```
{output_folder}/planning-artifacts/production-readiness-validation-report.md
```

Include:
- Executive summary with decision
- Category-by-category validation results
- Findings by severity
- Gate decision with justification
- Conditions (if applicable)
- Recommendations
- Sign-off section
- Recovery protocol (if NO-GO)

---

## SUCCESS METRICS:

- [ ] All findings documented with severity
- [ ] Gate decision justified with evidence
- [ ] Conditions documented (if applicable)
- [ ] Recommendations prioritized
- [ ] Validation report generated
- [ ] Next steps clearly defined

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| NO-GO with CRITICAL issues | Document blockers, enter recovery protocol |
| Missing evidence | Request evidence, document gap |
| Conflicting findings | Escalate for architect review |
| Sign-off unavailable | Document pending, proceed conditionally |

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Gate outcome determined
- [ ] Report generated with all required sections
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation report document
- QG-P1 gate decision (GO / GO WITH CONDITIONS / NO-GO)
- Findings list with severity
- Recommendations with priorities
- Sign-off checklist

---

## NEXT STEP:

Based on validation outcome:

| Outcome | Next Step |
|---------|-----------|
| **GO** | Production deployment authorized. Execute deployment runbook |
| **GO WITH CONDITIONS** | Deploy with monitoring. Track conditions. Daily check-ins |
| **NO-GO** | Enter recovery protocol. Address blockers. Re-run validation |

## Workflow Complete

Validation mode complete for production readiness workflow.

If NO-GO outcome:
- Return to Create/Edit mode to address issues
- Re-run validation after fixes applied
- Track recovery attempts

If GO/GO WITH CONDITIONS:
- Production deployment authorized
- Execute deployment runbook
- Monitor post-deployment metrics
- Schedule post-deployment review (1 week)
