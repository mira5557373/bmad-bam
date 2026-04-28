# Step 21: Execute Convergence Validation

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER skip CRITICAL checks** - All CRITICAL categories must be verified
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🚦 **HALT on CRITICAL failure** - Document and enter recovery protocol

## EXECUTION PROTOCOLS

- 🎯 Focus: Execute QG-I2/QG-I3 validation checks
- 💾 Track: `stepsCompleted: [20, 21]` when complete
- 📖 Context: Each check produces PASS, CONDITIONAL, FAIL, or WAIVED
- 🚫 Do NOT: Skip any CRITICAL check; CRITICAL failures block progress
- ⚠️ Gate: QG-I2, QG-I3 - Any CRITICAL failure triggers recovery protocol

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

Execute formal validation of the convergence report against QG-I2 (Tenant Safety) and QG-I3 (Agent Safety) quality gate criteria. This step systematically checks each criterion and documents evidence.

---

## Prerequisites

- Step 20 completed: All artifacts loaded
- Validation scope confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: convergence

---

## Inputs

- Loaded convergence report from Step 20
- Quality gate checklists (QG-I1, QG-I2, QG-I3)
- Validation scope from user
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Execute validation checks against quality gate criteria.

---

## Validation Sequence

### 1. QG-I2 Tenant Safety Validation

#### 1.1 CRITICAL Checks

| Check | Report Claims | Evidence | Validated |
|-------|---------------|----------|-----------|
| Cross-tenant access tests pass | {{claim}} | {{evidence}} | YES/NO |
| Data isolation verified end-to-end | {{claim}} | {{evidence}} | YES/NO |
| Cache isolation verified | {{claim}} | {{evidence}} | YES/NO |
| Storage isolation verified | {{claim}} | {{evidence}} | YES/NO |

**CRITICAL Status:** {{all_pass}} - All must pass for gate to pass

#### 1.2 Standard Checks

| Check | Report Claims | Evidence | Validated |
|-------|---------------|----------|-----------|
| Tenant deletion tested | {{claim}} | {{evidence}} | YES/NO |
| Tenant migration tested | {{claim}} | {{evidence}} | YES/NO |
| Quota enforcement verified | {{claim}} | {{evidence}} | YES/NO |
| Audit logging complete | {{claim}} | {{evidence}} | YES/NO |
| Tenant export functional | {{claim}} | {{evidence}} | YES/NO |
| Isolation monitoring in place | {{claim}} | {{evidence}} | YES/NO |

**Standard Status:** {{pass_count}}/6 (80% = 5/6 required)

#### 1.3 QG-I2 Validation Result

| Outcome | Criteria |
|---------|----------|
| PASS | All CRITICAL pass + 80% standard |
| CONDITIONAL | All CRITICAL pass + <80% standard + mitigation plan |
| FAIL | Any CRITICAL fails |

**QG-I2 Result:** {{outcome}}

---

### 2. QG-I3 Agent Safety Validation

#### 2.1 CRITICAL Checks

| Check | Report Claims | Evidence | Validated |
|-------|---------------|----------|-----------|
| Agent tenant isolation verified | {{claim}} | {{evidence}} | YES/NO |
| Tool execution boundaries enforced | {{claim}} | {{evidence}} | YES/NO |
| Memory isolation between tenants | {{claim}} | {{evidence}} | YES/NO |
| Output sanitization in place | {{claim}} | {{evidence}} | YES/NO |

**CRITICAL Status:** {{all_pass}} - All must pass for gate to pass

#### 2.2 Standard Checks

| Check | Report Claims | Evidence | Validated |
|-------|---------------|----------|-----------|
| Agent timeout handling tested | {{claim}} | {{evidence}} | YES/NO |
| Token limits enforced | {{claim}} | {{evidence}} | YES/NO |
| Error recovery tested | {{claim}} | {{evidence}} | YES/NO |
| Agent tracing functional | {{claim}} | {{evidence}} | YES/NO |
| Cost attribution accurate | {{claim}} | {{evidence}} | YES/NO |
| Agent versioning working | {{claim}} | {{evidence}} | YES/NO |

**Standard Status:** {{pass_count}}/6 (80% = 5/6 required)

#### 2.3 QG-I3 Validation Result

| Outcome | Criteria |
|---------|----------|
| PASS | All CRITICAL pass + 80% standard |
| CONDITIONAL | All CRITICAL pass + <80% standard + mitigation plan |
| FAIL | Any CRITICAL fails |

**QG-I3 Result:** {{outcome}}

---

### 3. QG-I1 Cross-Module Validation (if in scope)

#### 3.1 Key Checks

| Check | Report Claims | Evidence | Validated |
|-------|---------------|----------|-----------|
| Facade contracts stable | {{claim}} | {{evidence}} | YES/NO |
| No circular dependencies | {{claim}} | {{evidence}} | YES/NO |
| Event schemas compatible | {{claim}} | {{evidence}} | YES/NO |
| Integration tests pass | {{claim}} | {{evidence}} | YES/NO |

**QG-I1 Result:** {{outcome}}

---

### 4. Evidence Verification

For each check, verify evidence quality:

| Criterion | Evidence Type | Acceptable |
|-----------|---------------|------------|
| Test results | Automated test report | YES |
| Manual verification | Signed checklist | YES |
| Architecture document | Section reference | Conditional |
| Verbal claim | None | NO |

Document evidence gaps:

| Check | Missing Evidence | Impact |
|-------|------------------|--------|
| {{check}} | {{missing}} | CRITICAL/STANDARD |

---

### 5. Cross-Reference Verification

Verify consistency between:

| Comparison | Consistent | Discrepancy |
|------------|------------|-------------|
| Report claims vs. architecture docs | YES/NO | {{details}} |
| Gate decisions vs. check results | YES/NO | {{details}} |
| Risk assessment vs. findings | YES/NO | {{details}} |
| Release recommendation vs. gates | YES/NO | {{details}} |

---

### 6. Quality Gate Integration

#### QG-I2 (Tenant Safety) Final Assessment

| Category | Status | Notes |
|----------|--------|-------|
| Critical Checks | {{pass_count}}/4 | Must be 4/4 |
| Standard Checks | {{pass_count}}/6 | Target: 5/6 |
| Evidence Quality | {{quality}} | Acceptable/Needs Work |
| Overall | {{outcome}} | PASS/CONDITIONAL/FAIL |

#### QG-I3 (Agent Safety) Final Assessment

| Category | Status | Notes |
|----------|--------|-------|
| Critical Checks | {{pass_count}}/4 | Must be 4/4 |
| Standard Checks | {{pass_count}}/6 | Target: 5/6 |
| Evidence Quality | {{quality}} | Acceptable/Needs Work |
| Overall | {{outcome}} | PASS/CONDITIONAL/FAIL |

---

## SUCCESS METRICS:

- [ ] All QG-I2 checks validated
- [ ] All QG-I3 checks validated
- [ ] Evidence verified for each check
- [ ] Cross-references validated
- [ ] Gate decisions calculated

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| CRITICAL check fails | Document blocker, trigger recovery |
| Missing evidence | Request evidence, mark CONDITIONAL |
| Inconsistent claims | Flag for review, require clarification |

---

## Verification

- [ ] All CRITICAL checks validated
- [ ] Standard checks validated
- [ ] Evidence quality assessed
- [ ] Gate decisions justified
- [ ] Patterns align with pattern registry

---

## Outputs

- QG-I2 validation results
- QG-I3 validation results
- Evidence assessment
- Validation findings list

---

## NEXT STEP:

Proceed to `step-22-v-report.md` to generate the final validation report.
