# Step 21: Execute Event Architecture Validation

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER skip CRITICAL checks** - All CRITICAL categories must be verified
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🚦 **HALT on CRITICAL failure** - Document and enter recovery protocol

## EXECUTION PROTOCOLS

- 🎯 Focus: Execute event architecture validation checks
- 💾 Track: `stepsCompleted: [20, 21]` when complete
- 📖 Context: Each check produces PASS, CONDITIONAL, FAIL, or WAIVED
- 🚫 Do NOT: Skip any CRITICAL check; CRITICAL failures block progress
- ⚠️ Gate: QG-M2 - Any CRITICAL failure triggers recovery protocol

---

## Purpose

Execute formal validation of the event architecture against QG-M2 (Tenant Isolation) and event architecture quality gate criteria. This step systematically checks each criterion and documents evidence.

---

## Prerequisites

- Step 20 completed: All artifacts loaded
- Validation scope confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: event-driven

---

## Inputs

- Loaded event architecture from Step 20
- Validation checklists (QG-M2, event architecture)
- Validation scope from user
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Execute validation checks against quality gate criteria.

---

## Validation Sequence

### 1. Event Envelope Validation

#### 1.1 CloudEvents Compliance (CRITICAL)

| Check | Architecture Claims | Evidence | Validated |
|-------|---------------------|----------|-----------|
| specversion = "1.0" | {{claim}} | {{evidence}} | YES/NO |
| id field is UUID | {{claim}} | {{evidence}} | YES/NO |
| source is URI format | {{claim}} | {{evidence}} | YES/NO |
| type is reverse-DNS | {{claim}} | {{evidence}} | YES/NO |
| time is RFC 3339 | {{claim}} | {{evidence}} | YES/NO |

**CloudEvents Status:** {{all_pass}} - All must pass

#### 1.2 Tenant Context (CRITICAL)

| Check | Architecture Claims | Evidence | Validated |
|-------|---------------------|----------|-----------|
| tenant_id extension defined | {{claim}} | {{evidence}} | YES/NO |
| tenant_id is mandatory | {{claim}} | {{evidence}} | YES/NO |
| correlation_id defined | {{claim}} | {{evidence}} | YES/NO |
| partitionkey includes tenant | {{claim}} | {{evidence}} | YES/NO |

**Tenant Context Status:** {{all_pass}} - All CRITICAL must pass

#### 1.3 Schema Versioning (STANDARD)

| Check | Architecture Claims | Evidence | Validated |
|-------|---------------------|----------|-----------|
| Version bump rules defined | {{claim}} | {{evidence}} | YES/NO |
| Backward compatibility documented | {{claim}} | {{evidence}} | YES/NO |
| Schema evolution patterns defined | {{claim}} | {{evidence}} | YES/NO |

**Schema Versioning Status:** {{pass_count}}/3

### 2. Event Routing Validation

#### 2.1 Topic Naming (STANDARD)

| Check | Architecture Claims | Evidence | Validated |
|-------|---------------------|----------|-----------|
| Naming convention documented | {{claim}} | {{evidence}} | YES/NO |
| Environment segmentation | {{claim}} | {{evidence}} | YES/NO |
| Version included in topic | {{claim}} | {{evidence}} | YES/NO |
| DLQ naming consistent | {{claim}} | {{evidence}} | YES/NO |

**Topic Naming Status:** {{pass_count}}/4

#### 2.2 Partition Strategy (CRITICAL)

| Check | Architecture Claims | Evidence | Validated |
|-------|---------------------|----------|-----------|
| Partition key uses tenant_id | {{claim}} | {{evidence}} | YES/NO |
| Hot partition mitigation | {{claim}} | {{evidence}} | YES/NO |
| Ordering guarantees documented | {{claim}} | {{evidence}} | YES/NO |

**Partition Strategy Status:** {{all_pass}} - CRITICAL checks must pass

#### 2.3 DLQ Configuration (CRITICAL)

| Check | Architecture Claims | Evidence | Validated |
|-------|---------------------|----------|-----------|
| DLQ preserves tenant_id | {{claim}} | {{evidence}} | YES/NO |
| DLQ access is tenant-scoped | {{claim}} | {{evidence}} | YES/NO |
| Retry configuration defined | {{claim}} | {{evidence}} | YES/NO |
| Alerting thresholds set | {{claim}} | {{evidence}} | YES/NO |

**DLQ Status:** {{all_pass}} - First two are CRITICAL

#### 2.4 Replay Capabilities (CRITICAL)

| Check | Architecture Claims | Evidence | Validated |
|-------|---------------------|----------|-----------|
| Replay is tenant-scoped | {{claim}} | {{evidence}} | YES/NO |
| Replay audit logging | {{claim}} | {{evidence}} | YES/NO |
| Rate limiting per tenant | {{claim}} | {{evidence}} | YES/NO |
| Replay window defined | {{claim}} | {{evidence}} | YES/NO |

**Replay Status:** {{all_pass}} - First two are CRITICAL

### 3. Event Processing Validation

#### 3.1 Consumer Configuration (STANDARD)

| Check | Architecture Claims | Evidence | Validated |
|-------|---------------------|----------|-----------|
| Consumer naming convention | {{claim}} | {{evidence}} | YES/NO |
| Auto-commit disabled | {{claim}} | {{evidence}} | YES/NO |
| Session timeout configured | {{claim}} | {{evidence}} | YES/NO |

**Consumer Status:** {{pass_count}}/3

#### 3.2 Tenant Context Propagation (CRITICAL)

| Check | Architecture Claims | Evidence | Validated |
|-------|---------------------|----------|-----------|
| Tenant context extraction | {{claim}} | {{evidence}} | YES/NO |
| Tenant context propagation | {{claim}} | {{evidence}} | YES/NO |
| Tenant-scoped transactions | {{claim}} | {{evidence}} | YES/NO |
| Tenant logging | {{claim}} | {{evidence}} | YES/NO |

**Tenant Propagation Status:** {{all_pass}} - All are CRITICAL

#### 3.3 Idempotency Design (CRITICAL)

| Check | Architecture Claims | Evidence | Validated |
|-------|---------------------|----------|-----------|
| Idempotency key strategy | {{claim}} | {{evidence}} | YES/NO |
| Deduplication store defined | {{claim}} | {{evidence}} | YES/NO |
| TTL configured | {{claim}} | {{evidence}} | YES/NO |

**Idempotency Status:** {{all_pass}} - First two are CRITICAL

#### 3.4 Ordering Guarantees (STANDARD)

| Check | Architecture Claims | Evidence | Validated |
|-------|---------------------|----------|-----------|
| Ordering requirements matrix | {{claim}} | {{evidence}} | YES/NO |
| Out-of-order handling | {{claim}} | {{evidence}} | YES/NO |
| Sequence number management | {{claim}} | {{evidence}} | YES/NO |

**Ordering Status:** {{pass_count}}/3

### 4. Saga Orchestration Validation

#### 4.1 Saga Pattern (CRITICAL)

| Check | Architecture Claims | Evidence | Validated |
|-------|---------------------|----------|-----------|
| Pattern selected (choreography/orchestration) | {{claim}} | {{evidence}} | YES/NO |
| State machine defined | {{claim}} | {{evidence}} | YES/NO |
| Compensation logic documented | {{claim}} | {{evidence}} | YES/NO |

**Saga Pattern Status:** {{pass_count}}/3

#### 4.2 Tenant Isolation in Sagas (CRITICAL)

| Check | Architecture Claims | Evidence | Validated |
|-------|---------------------|----------|-----------|
| Saga scoped to tenant | {{claim}} | {{evidence}} | YES/NO |
| Cross-tenant saga forbidden | {{claim}} | {{evidence}} | YES/NO |
| Tenant validation at each step | {{claim}} | {{evidence}} | YES/NO |
| Compensation isolation | {{claim}} | {{evidence}} | YES/NO |

**Saga Isolation Status:** {{all_pass}} - All are CRITICAL

### 5. AI Runtime Events Validation

#### 5.1 Agent Events (STANDARD)

| Check | Architecture Claims | Evidence | Validated |
|-------|---------------------|----------|-----------|
| Agent event types defined | {{claim}} | {{evidence}} | YES/NO |
| Tenant context in agent events | {{claim}} | {{evidence}} | YES/NO |
| Run correlation tracking | {{claim}} | {{evidence}} | YES/NO |
| Tool execution events | {{claim}} | {{evidence}} | YES/NO |

**Agent Events Status:** {{pass_count}}/4

#### 5.2 Agent Saga Integration (CONDITIONAL)

| Check | Architecture Claims | Evidence | Validated |
|-------|---------------------|----------|-----------|
| Agent saga patterns defined | {{claim}} | {{evidence}} | YES/NO |
| Token reservation saga | {{claim}} | {{evidence}} | YES/NO |
| Billing integration | {{claim}} | {{evidence}} | YES/NO |

**Agent Saga Status:** {{pass_count}}/3 (if AI runtime configured)

### 6. Evidence Verification

For each check, verify evidence quality:

| Criterion | Evidence Type | Acceptable |
|-----------|---------------|------------|
| Architecture document section | Direct reference | YES |
| Schema definition | JSON/YAML schema | YES |
| Configuration example | Template/sample | YES |
| Verbal claim only | None | NO |

Document evidence gaps:

| Check | Missing Evidence | Impact |
|-------|------------------|--------|
| {{check}} | {{missing}} | CRITICAL/STANDARD |

---

## SUCCESS METRICS:

- [ ] All CRITICAL checks validated
- [ ] All STANDARD checks validated
- [ ] Evidence verified for each check
- [ ] Validation results documented

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
- [ ] Findings documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation results by category
- Evidence assessment
- Findings list
- CRITICAL issues (if any)

---

## NEXT STEP:

Proceed to `step-22-v-report.md` to generate the final validation report.
