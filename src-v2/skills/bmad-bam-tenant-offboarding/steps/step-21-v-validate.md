# Step 21: Execute Offboarding Validation

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER skip CRITICAL checks** - All CRITICAL compliance checks must be verified
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🚦 **HALT on CRITICAL failure** - Document and enter recovery protocol

## EXECUTION PROTOCOLS

- 🎯 Focus: Execute compliance and operational validation checks
- 💾 Track: `stepsCompleted: [20, 21]` when complete
- 📖 Context: Each check produces PASS, CONDITIONAL, FAIL, or WAIVED
- 🚫 Do NOT: Skip any CRITICAL check; CRITICAL failures block progress
- ⚠️ Focus: GDPR Article 17, CCPA, and operational safety

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading artifact and checklist
- Evaluating against criteria
- Documenting evidence

**OUT OF SCOPE:**
- Modifying the artifact
- Creating new content
## Purpose

Execute formal validation of the offboarding design against compliance requirements (GDPR, CCPA) and operational best practices. This step systematically checks each criterion and documents evidence.

---

## Prerequisites

- Step 20 completed: All artifacts loaded
- Validation scope confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-lifecycle

---

## Inputs

- Loaded offboarding design from Step 20
- Compliance frameworks
- Validation scope from user
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Execute validation checks against compliance and operational criteria.

---

## Validation Sequence

### 1. GDPR Article 17 (Right to Erasure) Validation

#### 1.1 CRITICAL Checks

| Check | Design Claims | Evidence | Validated |
|-------|---------------|----------|-----------|
| Data subject can request deletion | {{claim}} | {{evidence}} | YES/NO |
| Deletion within 30 days | {{claim}} | {{evidence}} | YES/NO |
| Third-party notification | {{claim}} | {{evidence}} | YES/NO |
| Verifiable deletion proof | {{claim}} | {{evidence}} | YES/NO |
| Exception handling documented | {{claim}} | {{evidence}} | YES/NO |

**CRITICAL Status:** {{all_pass}} - All must pass for compliance

#### 1.2 GDPR Standard Checks

| Check | Design Claims | Evidence | Validated |
|-------|---------------|----------|-----------|
| Data portability before deletion | {{claim}} | {{evidence}} | YES/NO |
| Confirmation notification sent | {{claim}} | {{evidence}} | YES/NO |
| Automated processing possible | {{claim}} | {{evidence}} | YES/NO |
| Legal hold exceptions documented | {{claim}} | {{evidence}} | YES/NO |

**Standard Status:** {{pass_count}}/4

---

### 2. CCPA Compliance Validation

#### 2.1 CRITICAL Checks

| Check | Design Claims | Evidence | Validated |
|-------|---------------|----------|-----------|
| 45-day response window supported | {{claim}} | {{evidence}} | YES/NO |
| Consumer identity verification | {{claim}} | {{evidence}} | YES/NO |
| Deletion confirmation provided | {{claim}} | {{evidence}} | YES/NO |
| Service provider notification | {{claim}} | {{evidence}} | YES/NO |

**CRITICAL Status:** {{all_pass}}

#### 2.2 CCPA Standard Checks

| Check | Design Claims | Evidence | Validated |
|-------|---------------|----------|-----------|
| 12-month extension option | {{claim}} | {{evidence}} | YES/NO |
| Household data handling | {{claim}} | {{evidence}} | YES/NO |
| Authorized agent support | {{claim}} | {{evidence}} | YES/NO |

**Standard Status:** {{pass_count}}/3

---

### 3. Data Export Validation

#### 3.1 CRITICAL Checks

| Check | Design Claims | Evidence | Validated |
|-------|---------------|----------|-----------|
| All tenant data included | {{claim}} | {{evidence}} | YES/NO |
| Machine-readable format | {{claim}} | {{evidence}} | YES/NO |
| Export verification checksum | {{claim}} | {{evidence}} | YES/NO |
| Secure delivery mechanism | {{claim}} | {{evidence}} | YES/NO |

**CRITICAL Status:** {{all_pass}}

#### 3.2 Export Standard Checks

| Check | Design Claims | Evidence | Validated |
|-------|---------------|----------|-----------|
| Cross-module data collection | {{claim}} | {{evidence}} | YES/NO |
| Large export handling | {{claim}} | {{evidence}} | YES/NO |
| Export expiry documented | {{claim}} | {{evidence}} | YES/NO |
| Progress tracking available | {{claim}} | {{evidence}} | YES/NO |

**Standard Status:** {{pass_count}}/4

---

### 4. Grace Period Validation

#### 4.1 CRITICAL Checks

| Check | Design Claims | Evidence | Validated |
|-------|---------------|----------|-----------|
| Grace period by tier defined | {{claim}} | {{evidence}} | YES/NO |
| Reactivation possible | {{claim}} | {{evidence}} | YES/NO |
| Notification schedule defined | {{claim}} | {{evidence}} | YES/NO |
| Access restrictions documented | {{claim}} | {{evidence}} | YES/NO |

**CRITICAL Status:** {{all_pass}}

#### 4.2 Grace Period Standard Checks

| Check | Design Claims | Evidence | Validated |
|-------|---------------|----------|-----------|
| Soft delete fields defined | {{claim}} | {{evidence}} | YES/NO |
| State transitions documented | {{claim}} | {{evidence}} | YES/NO |
| Edge cases handled | {{claim}} | {{evidence}} | YES/NO |
| Reminder channels configured | {{claim}} | {{evidence}} | YES/NO |

**Standard Status:** {{pass_count}}/4

---

### 5. Hard Deletion Validation

#### 5.1 CRITICAL Checks

| Check | Design Claims | Evidence | Validated |
|-------|---------------|----------|-----------|
| Deletion sequence defined | {{claim}} | {{evidence}} | YES/NO |
| Foreign key handling | {{claim}} | {{evidence}} | YES/NO |
| All storage layers covered | {{claim}} | {{evidence}} | YES/NO |
| Audit logs preserved | {{claim}} | {{evidence}} | YES/NO |

**CRITICAL Status:** {{all_pass}}

#### 5.2 Deletion Standard Checks

| Check | Design Claims | Evidence | Validated |
|-------|---------------|----------|-----------|
| Cache invalidation | {{claim}} | {{evidence}} | YES/NO |
| Event subscription cleanup | {{claim}} | {{evidence}} | YES/NO |
| Backup cleanup scheduled | {{claim}} | {{evidence}} | YES/NO |
| Job checkpoint system | {{claim}} | {{evidence}} | YES/NO |

**Standard Status:** {{pass_count}}/4

---

### 6. Audit Trail Validation

#### 6.1 CRITICAL Checks

| Check | Design Claims | Evidence | Validated |
|-------|---------------|----------|-----------|
| Audit logs anonymized (not deleted) | {{claim}} | {{evidence}} | YES/NO |
| Retention period compliant | {{claim}} | {{evidence}} | YES/NO |
| Deletion certificate generated | {{claim}} | {{evidence}} | YES/NO |
| PII properly redacted | {{claim}} | {{evidence}} | YES/NO |

**CRITICAL Status:** {{all_pass}}

---

### 7. Rollback Validation

#### 7.1 Standard Checks

| Check | Design Claims | Evidence | Validated |
|-------|---------------|----------|-----------|
| Recovery scenarios documented | {{claim}} | {{evidence}} | YES/NO |
| Backup restoration procedure | {{claim}} | {{evidence}} | YES/NO |
| Time windows defined | {{claim}} | {{evidence}} | YES/NO |
| Partial recovery supported | {{claim}} | {{evidence}} | YES/NO |

**Standard Status:** {{pass_count}}/4

---

### 8. State Machine Validation

#### 8.1 Standard Checks

| Check | Design Claims | Evidence | Validated |
|-------|---------------|----------|-----------|
| All states defined | {{claim}} | {{evidence}} | YES/NO |
| Transitions complete | {{claim}} | {{evidence}} | YES/NO |
| Reversible states marked | {{claim}} | {{evidence}} | YES/NO |
| Final states identified | {{claim}} | {{evidence}} | YES/NO |

**Standard Status:** {{pass_count}}/4

---

### 9. Evidence Verification

For each check, verify evidence quality:

| Criterion | Evidence Type | Acceptable |
|-----------|---------------|------------|
| Design specification | Section reference | YES |
| Process flow diagram | State machine | YES |
| Code reference | Implementation link | Conditional |
| Verbal claim | None | NO |

Document evidence gaps:

| Check | Missing Evidence | Impact |
|-------|------------------|--------|
| {{check}} | {{missing}} | CRITICAL/STANDARD |

---

### 10. Compliance Gate Summary

| Framework | Critical | Standard | Overall |
|-----------|----------|----------|---------|
| GDPR | {{pass}}/5 | {{pass}}/4 | {{status}} |
| CCPA | {{pass}}/4 | {{pass}}/3 | {{status}} |
| Operational | {{pass}}/16 | {{pass}}/20 | {{status}} |

---

## SUCCESS METRICS:

- [ ] All GDPR critical checks validated
- [ ] All CCPA critical checks validated
- [ ] All operational critical checks validated
- [ ] Evidence verified for each check
- [ ] Gate decisions calculated

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| CRITICAL check fails | Document blocker, trigger recovery |
| Missing evidence | Request evidence, mark CONDITIONAL |
| Inconsistent design | Flag for review, require clarification |

---

## Verification

- [ ] All CRITICAL checks validated
- [ ] Standard checks validated
- [ ] Evidence quality assessed
- [ ] Gate decisions justified
- [ ] Patterns align with pattern registry

---

## Outputs

- Compliance validation results
- Operational validation results
- Evidence assessment
- Validation findings list

---

## NEXT STEP:

Proceed to `step-22-v-report.md` to generate the final validation report.
