# Step 05: Compile Production Readiness Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🚦 **CRITICAL: All CRITICAL checks must pass for GO decision**

## EXECUTION PROTOCOLS

- 🎯 Focus: Compile final production readiness report with GO/NO-GO decision
- 💾 Track: `stepsCompleted: [1, 2, 3, 4, 5]` when complete
- 📖 Context: Aggregate all findings, calculate gate decision, document rollback
- 🚫 Do NOT: Override CRITICAL failures - they block GO decision
- 🔍 Use web search: Verify deployment best practices against current patterns
- ⚠️ Gate: QG-P1 - Final gate before production deployment

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Executive summary with GO/NO-GO recommendation
- Gate decision with evidence
- Risk assessment and mitigation plans
- Runbook references
- Rollback procedures
- Recovery protocol if FAIL

**OUT OF SCOPE:**
- Re-analyzing infrastructure (Step 02)
- Re-verifying observability (Step 03)
- Re-validating security (Step 04)

---

## Purpose

Compile the comprehensive production readiness report aggregating all findings from prior steps, calculate the QG-P1 gate decision, and provide GO/NO-GO recommendation with evidence, risks, and rollback procedures.

---

## Prerequisites

- Step 01-04 completed: All assessments done
- **Load template:** `{project-root}/_bmad/bam/data/templates/production-readiness.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: production

---

## Inputs

- Infrastructure readiness findings (Step 02)
- Observability verification results (Step 03)
- Security/compliance validation (Step 04)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Compile production readiness report and determine GO/NO-GO decision.

---

## Main Sequence

### 1. Aggregate Findings Summary

#### 1.1 Category Summary

| Category | CRITICAL | HIGH | MEDIUM | LOW | Status |
|----------|----------|------|--------|-----|--------|
| Infrastructure | {{count}} | {{count}} | {{count}} | {{count}} | {{status}} |
| Observability | {{count}} | {{count}} | {{count}} | {{count}} | {{status}} |
| Security | {{count}} | {{count}} | {{count}} | {{count}} | {{status}} |
| Compliance | {{count}} | {{count}} | {{count}} | {{count}} | {{status}} |
| **Total** | {{sum}} | {{sum}} | {{sum}} | {{sum}} | **{{overall}}** |

#### 1.2 Prerequisite Gates Summary

| Gate | Status | Last Verified | Blocking Issues |
|------|--------|---------------|-----------------|
| QG-F1 (Foundation) | {{status}} | {{date}} | {{count}} |
| QG-M1 (Module Architecture) | {{status}} | {{date}} | {{count}} |
| QG-M2 (Tenant Isolation) | {{status}} | {{date}} | {{count}} |
| QG-M3 (Agent Runtime) | {{status}} | {{date}} | {{count}} |
| QG-I1 (Convergence) | {{status}} | {{date}} | {{count}} |
| QG-I2 (Tenant Safety) | {{status}} | {{date}} | {{count}} |
| QG-I3 (Agent Safety) | {{status}} | {{date}} | {{count}} |

### 2. QG-P1 Gate Decision

#### 2.1 CRITICAL Check Summary

All CRITICAL checks must pass for GO decision:

| Category | CRITICAL Checks | Passed | Failed |
|----------|-----------------|--------|--------|
| Infrastructure | Database rollback, IaC, DR | {{pass}}/{{total}} | {{list}} |
| Observability | Alerting, tracing, SLOs | {{pass}}/{{total}} | {{list}} |
| Security | Hardening, pen test, secrets | {{pass}}/{{total}} | {{list}} |
| Compliance | Data protection, audit | {{pass}}/{{total}} | {{list}} |

**CRITICAL Status:** {{ALL_PASS / BLOCKED}}

#### 2.2 Gate Decision Matrix

| Outcome | Criteria |
|---------|----------|
| **GO** | All CRITICAL pass + 80% standard checks |
| **GO WITH CONDITIONS** | All CRITICAL pass + <80% standard + mitigation plan |
| **NO-GO** | Any CRITICAL fails OR prerequisite gate FAIL |

#### 2.3 Calculate Gate Decision

Based on findings:

| Criterion | Value | Required | Status |
|-----------|-------|----------|--------|
| CRITICAL checks passing | {{count}}/{{total}} | 100% | {{status}} |
| Standard checks passing | {{percent}}% | 80% | {{status}} |
| Prerequisite gates | {{status}} | All PASS/CONDITIONAL | {{status}} |
| Open blocking issues | {{count}} | 0 | {{status}} |

**QG-P1 Decision:** {{GO / GO WITH CONDITIONS / NO-GO}}

### 3. Executive Summary

#### 3.1 Recommendation

```markdown
## Production Readiness Assessment

**Date:** {{date}}
**Assessor:** {{author}}
**Environment:** {{environment}}

### Recommendation: {{GO / GO WITH CONDITIONS / NO-GO}}

**Summary:**
{{Executive summary of readiness status, key findings, and rationale for decision}}

### Key Metrics

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| CRITICAL Issues | 0 | {{count}} | {{status}} |
| High Issues | 0-2 | {{count}} | {{status}} |
| Gate Compliance | 100% | {{percent}}% | {{status}} |
| Test Coverage | 80% | {{percent}}% | {{status}} |
```

#### 3.2 Conditions (if GO WITH CONDITIONS)

| Condition | Deadline | Owner | Risk if Missed |
|-----------|----------|-------|----------------|
| {{condition_1}} | {{date}} | {{owner}} | {{risk}} |
| {{condition_2}} | {{date}} | {{owner}} | {{risk}} |
| {{condition_3}} | {{date}} | {{owner}} | {{risk}} |

### 4. Risk Assessment

#### 4.1 Risk Matrix

| Risk ID | Description | Likelihood | Impact | Score | Mitigation |
|---------|-------------|------------|--------|-------|------------|
| R-001 | {{risk}} | High/Med/Low | High/Med/Low | {{score}} | {{mitigation}} |
| R-002 | {{risk}} | High/Med/Low | High/Med/Low | {{score}} | {{mitigation}} |
| R-003 | {{risk}} | High/Med/Low | High/Med/Low | {{score}} | {{mitigation}} |

#### 4.2 Accepted Risks

| Risk ID | Risk | Accepted By | Date | Expiry |
|---------|------|-------------|------|--------|
| R-XXX | {{risk}} | {{stakeholder}} | {{date}} | {{date}} |

### 5. Runbook References

| Runbook | Purpose | Location | Last Updated |
|---------|---------|----------|--------------|
| Deployment Runbook | Step-by-step deployment | {{path}} | {{date}} |
| Rollback Runbook | Emergency rollback | {{path}} | {{date}} |
| Incident Response | Incident handling | {{path}} | {{date}} |
| Disaster Recovery | DR procedures | {{path}} | {{date}} |
| Tenant Onboarding | New tenant setup | {{path}} | {{date}} |

**Criteria:**
- [ ] All runbooks documented
- [ ] Runbooks tested
- [ ] On-call team trained

### 6. Rollback Procedures

#### 6.1 Rollback Decision Criteria

| Trigger | Threshold | Action |
|---------|-----------|--------|
| Error rate spike | > 5% for 5 min | Initiate rollback |
| P50 latency degradation | > 200% baseline | Evaluate rollback |
| Tenant isolation breach | Any | Immediate rollback |
| Data corruption detected | Any | Immediate rollback |
| Agent safety violation | Any | Immediate rollback |

#### 6.2 Rollback Steps

```markdown
1. **Decision** - Incident commander authorizes rollback
2. **Traffic drain** - Stop new requests to deployment
3. **Connection drain** - Wait for in-flight requests (max 30s)
4. **Database rollback** - Execute rollback migrations (if needed)
5. **Deployment rollback** - Revert to previous version
6. **Health verification** - Verify system health
7. **Traffic restore** - Resume traffic to rolled-back version
8. **Incident documentation** - Document rollback reason
```

#### 6.3 Rollback Time Estimates

| Component | Estimated Time | Dependencies |
|-----------|----------------|--------------|
| Application rollback | {{time}} | Container registry |
| Database rollback | {{time}} | Backup availability |
| Configuration rollback | {{time}} | Version control |
| Full environment | {{time}} | All components |

**Target:** Complete rollback within {{time}} minutes

### 7. Recovery Protocol (If NO-GO)

If QG-P1 results in NO-GO:

#### Attempt 1: Targeted Remediation (1-3 days)

1. Identify specific CRITICAL failures
2. Assign owners for each failure
3. Implement targeted fixes
4. Re-run affected validation checks only
5. Lock categories that passed

#### Attempt 2: Comprehensive Review (1 week)

1. Review architectural decisions
2. Engage security/compliance teams
3. Address systemic issues
4. Re-run full QG-P1 assessment

#### Mandatory Course Correction (Escalation)

1. Escalate to project leadership
2. Document blockers in ADR
3. Consider phased rollout approach
4. Reassess deployment timeline
5. Evaluate risk acceptance options

### 8. Output Report

Generate production readiness report:

```
{output_folder}/planning-artifacts/production-readiness-report.md
```

Include sections:
- Executive summary with decision
- Category-by-category findings
- Risk assessment
- Rollback procedures
- Runbook references
- Sign-off section

---

## COLLABORATION MENUS (A/P/C)

After completing the production readiness report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific concerns or risks
- **P (Party Mode)**: Multi-persona review of production readiness decision
- **C (Continue)**: Accept report and finalize GO/NO-GO decision
- **[Specific concerns]**: Describe concerns to investigate further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: GO/NO-GO decision, risk concerns, deployment strategy
- Process enhanced insights on production deployment
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review production readiness decision: {decision} - {summary}"
- Process Platform Architect, Security Architect, SRE perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Finalize production readiness report
- Write to output location
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Present final decision to user

---

## SUCCESS METRICS:

- [ ] All findings aggregated
- [ ] Gate decision calculated with evidence
- [ ] Risk assessment complete
- [ ] Rollback procedures documented
- [ ] Report generated successfully
- [ ] Decision justified and documented

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| NO-GO due to CRITICAL issues | Enter recovery protocol |
| Missing runbooks | Create runbooks before deployment |
| Incomplete risk assessment | Complete risk matrix |
| Stakeholder sign-off missing | Obtain required approvals |

---

## Verification

- [ ] Executive summary accurate
- [ ] Gate decision justified
- [ ] All risks documented
- [ ] Rollback tested and documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Production readiness report: `{output_folder}/planning-artifacts/production-readiness-report.md`
- QG-P1 gate decision (GO / GO WITH CONDITIONS / NO-GO)
- Risk assessment matrix
- Rollback procedures
- Sign-off checklist

---

## NEXT STEP:

Based on QG-P1 outcome:

| Outcome | Next Step |
|---------|-----------|
| **GO** | Proceed to production deployment |
| **GO WITH CONDITIONS** | Deploy with monitoring, address conditions by deadline |
| **NO-GO** | Enter recovery protocol, address blockers, re-run assessment |

## Workflow Complete

Create mode complete for production readiness workflow.

If NO-GO outcome:
- Return to address CRITICAL issues
- Re-run affected validation steps
- Re-run this step after remediation

If GO/GO WITH CONDITIONS:
- Production deployment authorized
- Monitor conditions and deadlines
- Schedule post-deployment review
