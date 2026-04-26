# Step 21: Execute QG-P1 Validation

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER skip CRITICAL checks** - All CRITICAL categories must be verified
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🚦 **HALT on CRITICAL failure** - Document and enter recovery protocol

## EXECUTION PROTOCOLS

- 🎯 Focus: Execute QG-P1 validation checks
- 💾 Track: `stepsCompleted: [20, 21]` when complete
- 📖 Context: Each check produces PASS, CONDITIONAL, FAIL, or WAIVED
- 🚫 Do NOT: Skip any CRITICAL check; CRITICAL failures block GO decision
- ⚠️ Gate: QG-P1 - Any CRITICAL failure triggers NO-GO

---

## Purpose

Execute formal validation of the production readiness report against QG-P1 quality gate criteria. This step systematically validates each category (Infrastructure, Observability, Security, Operations) and verifies the GO/NO-GO decision is justified by evidence.

---

## Prerequisites

- Step 20 completed: All artifacts loaded
- Validation scope confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: production

---

## Inputs

- Loaded production readiness report from Step 20
- QG-P1 checklist
- Validation scope from user
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Execute validation checks against QG-P1 criteria.

---

## Validation Sequence

### 1. Infrastructure Validation

#### 1.1 CRITICAL Checks

| Check | Report Claims | Evidence | Validated |
|-------|---------------|----------|-----------|
| Database migration strategy documented | {{claim}} | {{evidence}} | YES/NO |
| Rollback procedures tested | {{claim}} | {{evidence}} | YES/NO |
| IaC coverage >= 90% | {{claim}} | {{evidence}} | YES/NO |
| DR tested within 6 months | {{claim}} | {{evidence}} | YES/NO |
| Backup restoration tested | {{claim}} | {{evidence}} | YES/NO |

**CRITICAL Status:** {{all_pass}} - All must pass for category to pass

#### 1.2 Standard Checks

| Check | Report Claims | Evidence | Validated |
|-------|---------------|----------|-----------|
| Environment parity verified | {{claim}} | {{evidence}} | YES/NO |
| Auto-scaling configured | {{claim}} | {{evidence}} | YES/NO |
| Load balancer health checks | {{claim}} | {{evidence}} | YES/NO |
| Connection draining configured | {{claim}} | {{evidence}} | YES/NO |
| Capacity planning documented | {{claim}} | {{evidence}} | YES/NO |
| Zero-downtime deployment | {{claim}} | {{evidence}} | YES/NO |

**Standard Status:** {{pass_count}}/6 (80% = 5/6 required)

#### 1.3 Infrastructure Validation Result

| Outcome | Criteria |
|---------|----------|
| PASS | All CRITICAL pass + 80% standard |
| CONDITIONAL | All CRITICAL pass + <80% standard + mitigation plan |
| FAIL | Any CRITICAL fails |

**Infrastructure Result:** {{outcome}}

---

### 2. Observability Validation

#### 2.1 CRITICAL Checks

| Check | Report Claims | Evidence | Validated |
|-------|---------------|----------|-----------|
| SLOs defined with alerting | {{claim}} | {{evidence}} | YES/NO |
| Distributed tracing configured | {{claim}} | {{evidence}} | YES/NO |
| Tenant attribution in traces | {{claim}} | {{evidence}} | YES/NO |
| Incident escalation documented | {{claim}} | {{evidence}} | YES/NO |
| Log aggregation operational | {{claim}} | {{evidence}} | YES/NO |

**CRITICAL Status:** {{all_pass}} - All must pass for category to pass

#### 2.2 Standard Checks

| Check | Report Claims | Evidence | Validated |
|-------|---------------|----------|-----------|
| Executive dashboard exists | {{claim}} | {{evidence}} | YES/NO |
| Operations dashboard exists | {{claim}} | {{evidence}} | YES/NO |
| Synthetic monitoring configured | {{claim}} | {{evidence}} | YES/NO |
| Health check endpoints | {{claim}} | {{evidence}} | YES/NO |
| Alert runbooks documented | {{claim}} | {{evidence}} | YES/NO |
| On-call rotation configured | {{claim}} | {{evidence}} | YES/NO |

**Standard Status:** {{pass_count}}/6 (80% = 5/6 required)

#### 2.3 Observability Validation Result

| Outcome | Criteria |
|---------|----------|
| PASS | All CRITICAL pass + 80% standard |
| CONDITIONAL | All CRITICAL pass + <80% standard + mitigation plan |
| FAIL | Any CRITICAL fails |

**Observability Result:** {{outcome}}

---

### 3. Security/Compliance Validation

#### 3.1 CRITICAL Checks

| Check | Report Claims | Evidence | Validated |
|-------|---------------|----------|-----------|
| Zero open critical pen test findings | {{claim}} | {{evidence}} | YES/NO |
| Zero open high pen test findings | {{claim}} | {{evidence}} | YES/NO |
| Secrets in approved vault | {{claim}} | {{evidence}} | YES/NO |
| MFA for all admin access | {{claim}} | {{evidence}} | YES/NO |
| Encryption at rest verified | {{claim}} | {{evidence}} | YES/NO |
| Encryption in transit (TLS 1.2+) | {{claim}} | {{evidence}} | YES/NO |
| Tenant data isolation verified | {{claim}} | {{evidence}} | YES/NO |

**CRITICAL Status:** {{all_pass}} - All must pass for category to pass

#### 3.2 Standard Checks

| Check | Report Claims | Evidence | Validated |
|-------|---------------|----------|-----------|
| SAST scan passed | {{claim}} | {{evidence}} | YES/NO |
| Dependency scan passed | {{claim}} | {{evidence}} | YES/NO |
| Secret rotation policy | {{claim}} | {{evidence}} | YES/NO |
| Network segmentation | {{claim}} | {{evidence}} | YES/NO |
| DDoS protection | {{claim}} | {{evidence}} | YES/NO |
| Compliance requirements met | {{claim}} | {{evidence}} | YES/NO |

**Standard Status:** {{pass_count}}/6 (80% = 5/6 required)

#### 3.3 Security Validation Result

| Outcome | Criteria |
|---------|----------|
| PASS | All CRITICAL pass + 80% standard |
| CONDITIONAL | All CRITICAL pass + <80% standard + mitigation plan |
| FAIL | Any CRITICAL fails |

**Security Result:** {{outcome}}

---

### 4. Operations Validation

#### 4.1 CRITICAL Checks

| Check | Report Claims | Evidence | Validated |
|-------|---------------|----------|-----------|
| Deployment runbook documented | {{claim}} | {{evidence}} | YES/NO |
| Rollback runbook tested | {{claim}} | {{evidence}} | YES/NO |
| Incident response plan | {{claim}} | {{evidence}} | YES/NO |
| On-call coverage 24/7 | {{claim}} | {{evidence}} | YES/NO |

**CRITICAL Status:** {{all_pass}} - All must pass for category to pass

#### 4.2 Standard Checks

| Check | Report Claims | Evidence | Validated |
|-------|---------------|----------|-----------|
| Communication plan documented | {{claim}} | {{evidence}} | YES/NO |
| Status page configured | {{claim}} | {{evidence}} | YES/NO |
| Support team trained | {{claim}} | {{evidence}} | YES/NO |
| Tenant onboarding tested | {{claim}} | {{evidence}} | YES/NO |
| Monitoring team trained | {{claim}} | {{evidence}} | YES/NO |

**Standard Status:** {{pass_count}}/5 (80% = 4/5 required)

#### 4.3 Operations Validation Result

| Outcome | Criteria |
|---------|----------|
| PASS | All CRITICAL pass + 80% standard |
| CONDITIONAL | All CRITICAL pass + <80% standard + mitigation plan |
| FAIL | Any CRITICAL fails |

**Operations Result:** {{outcome}}

---

### 5. Prerequisite Gate Validation

Verify all prerequisite gates remain valid:

| Gate | Required Status | Current Status | Still Valid |
|------|-----------------|----------------|-------------|
| QG-F1 | PASS | {{status}} | YES/NO |
| QG-M1 | PASS | {{status}} | YES/NO |
| QG-M2 | PASS/CONDITIONAL | {{status}} | YES/NO |
| QG-M3 | PASS/CONDITIONAL | {{status}} | YES/NO |
| QG-I1 | PASS | {{status}} | YES/NO |
| QG-I2 | PASS/CONDITIONAL | {{status}} | YES/NO |
| QG-I3 | PASS/CONDITIONAL | {{status}} | YES/NO |

**Prerequisite Status:** {{all_valid}}

---

### 6. Evidence Verification

For each check, verify evidence quality:

| Criterion | Evidence Type | Acceptable |
|-----------|---------------|------------|
| Test results | Automated test report | YES |
| Pen test report | Third-party assessment | YES |
| Manual verification | Signed checklist | YES |
| Configuration file | Screenshot/export | Conditional |
| Verbal claim | None | NO |

Document evidence gaps:

| Check | Missing Evidence | Impact |
|-------|------------------|--------|
| {{check}} | {{missing}} | CRITICAL/STANDARD |

---

### 7. Cross-Reference Verification

Verify consistency between:

| Comparison | Consistent | Discrepancy |
|------------|------------|-------------|
| Report claims vs. evidence | YES/NO | {{details}} |
| Gate decision vs. check results | YES/NO | {{details}} |
| Risk assessment vs. findings | YES/NO | {{details}} |
| Conditions vs. open issues | YES/NO | {{details}} |

---

### 8. QG-P1 Gate Integration

#### Category Summary

| Category | CRITICAL | Standard | Overall |
|----------|----------|----------|---------|
| Infrastructure | {{pass}}/{{total}} | {{percent}}% | {{outcome}} |
| Observability | {{pass}}/{{total}} | {{percent}}% | {{outcome}} |
| Security | {{pass}}/{{total}} | {{percent}}% | {{outcome}} |
| Operations | {{pass}}/{{total}} | {{percent}}% | {{outcome}} |
| Prerequisites | {{all_valid}} | N/A | {{outcome}} |

#### Overall QG-P1 Assessment

| Criterion | Value | Required | Status |
|-----------|-------|----------|--------|
| CRITICAL checks passing | {{count}}/{{total}} | 100% | {{status}} |
| Standard checks passing | {{percent}}% | 80% | {{status}} |
| Prerequisite gates valid | {{status}} | All valid | {{status}} |
| Evidence quality | {{quality}} | Acceptable | {{status}} |

**QG-P1 Validation Result:** {{PASS / CONDITIONAL / FAIL}}

---

## SUCCESS METRICS:

- [ ] All Infrastructure checks validated
- [ ] All Observability checks validated
- [ ] All Security checks validated
- [ ] All Operations checks validated
- [ ] Evidence verified for each check
- [ ] Cross-references validated
- [ ] Gate decision calculated

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| CRITICAL check fails | Document blocker, trigger recovery |
| Missing evidence | Request evidence, mark CONDITIONAL |
| Inconsistent claims | Flag for review, require clarification |
| Prerequisite gate invalid | Re-run prerequisite gate validation |

---

## Verification

- [ ] All CRITICAL checks validated
- [ ] Standard checks validated
- [ ] Evidence quality assessed
- [ ] Gate decision justified
- [ ] Patterns align with pattern registry

---

## Outputs

- Infrastructure validation results
- Observability validation results
- Security validation results
- Operations validation results
- Evidence assessment
- Validation findings list

---

## NEXT STEP:

Proceed to `step-22-v-report.md` to generate the final validation report with QG-P1 gate decision.
