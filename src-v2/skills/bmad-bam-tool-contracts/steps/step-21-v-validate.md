# Step 21: Execute Tool Contract Validation

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER skip CRITICAL checks** - All CRITICAL categories must be verified
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🚦 **HALT on CRITICAL failure** - Document and enter recovery protocol

## EXECUTION PROTOCOLS

- 🎯 Focus: Execute QG-M3 tool contract validation checks
- 💾 Track: `stepsCompleted: [20, 21]` when complete
- 📖 Context: Each check produces PASS, CONDITIONAL, FAIL, or WAIVED
- 🚫 Do NOT: Skip any CRITICAL check; CRITICAL failures block progress
- ⚠️ Gate: QG-M3 - Any CRITICAL failure triggers recovery protocol

---

## Purpose

Execute formal validation of the tool contract design against QG-M3 (Agent Runtime) quality gate criteria. This step systematically checks each criterion and documents evidence for tool contract compliance.

---

## Prerequisites

- Step 20 completed: All artifacts loaded
- Validation scope confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tool-contract

---

## Inputs

- Loaded tool contract design from Step 20
- Quality gate checklist (QG-M3)
- Validation scope from user
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Execute validation checks against QG-M3 tool contract criteria.

---

## Validation Sequence

### 1. Tool Schema Validation

#### 1.1 Input Schema Checks (CRITICAL)

| Tool | Has Input Schema | JSON Schema Valid | Validation |
|------|------------------|-------------------|------------|
| {{tool}} | YES/NO | YES/NO | PASS/FAIL |

**CRITICAL Criteria:**
- [ ] **CRITICAL:** Every tool has input schema defined
- [ ] **CRITICAL:** All schemas are valid JSON Schema format
- [ ] **CRITICAL:** Required fields properly marked

#### 1.2 Output Schema Checks (CRITICAL)

| Tool | Has Output Schema | Success Schema | Error Schema |
|------|-------------------|----------------|--------------|
| {{tool}} | YES/NO | YES/NO | YES/NO |

**CRITICAL Criteria:**
- [ ] **CRITICAL:** Every tool has output schema defined
- [ ] **CRITICAL:** Success response structure documented
- [ ] **CRITICAL:** Error response structure documented

### 2. TenantContext Compliance (CRITICAL)

#### 2.1 Parameter Position Check

| Tool | TenantContext First | All Fields Present | Validated |
|------|---------------------|-------------------|-----------|
| {{tool}} | YES/NO | YES/NO | PASS/FAIL |

**CRITICAL Criteria:**
- [ ] **CRITICAL:** TenantContext is FIRST parameter for ALL tools
- [ ] **CRITICAL:** tenant_id field present
- [ ] **CRITICAL:** user_id field present
- [ ] **CRITICAL:** permissions field present
- [ ] **CRITICAL:** trace_id field present

#### 2.2 Context Propagation

| Tool | Context Passed Downstream | Validation |
|------|---------------------------|------------|
| {{tool}} | YES/NO | PASS/FAIL |

**Standard Criteria:**
- [ ] TenantContext propagates to all internal calls
- [ ] Context isolation maintained

### 3. Permission Validation

#### 3.1 Permission Requirements (CRITICAL)

| Tool | Permissions Defined | Valid Format | Validated |
|------|---------------------|--------------|-----------|
| {{tool}} | YES/NO | YES/NO | PASS/FAIL |

**CRITICAL Criteria:**
- [ ] **CRITICAL:** Every tool has permission requirements documented
- [ ] **CRITICAL:** Permissions use standard format (scope:action)

#### 3.2 Permission Consistency

| Tool | Permissions | Capability Mapping | Tier Access |
|------|-------------|-------------------|-------------|
| {{tool}} | {{perms}} | YES/NO | Defined |

**Standard Criteria:**
- [ ] Permissions align with capability definitions
- [ ] Tier access restrictions consistent

### 4. Rate Limit Validation

#### 4.1 Rate Limit Configuration

| Tool | Free Defined | Pro Defined | Enterprise Defined |
|------|--------------|-------------|-------------------|
| {{tool}} | YES/NO | YES/NO | YES/NO |

**Standard Criteria:**
- [ ] Rate limits defined for all tiers
- [ ] Limits are reasonable and consistent
- [ ] Rate limit response format documented

#### 4.2 Rate Limit Response

| Check | Documented | Standard Format |
|-------|------------|-----------------|
| RATE_LIMITED error code | YES/NO | YES/NO |
| retry_after field | YES/NO | YES/NO |
| Limit details | YES/NO | YES/NO |

### 5. Execution Environment Validation

#### 5.1 Sandbox Configuration (CRITICAL)

| Check | Documented | Complete | Validated |
|-------|------------|----------|-----------|
| Process isolation | YES/NO | YES/NO | PASS/FAIL |
| Memory limits | YES/NO | YES/NO | PASS/FAIL |
| Network policy | YES/NO | YES/NO | PASS/FAIL |
| Storage isolation | YES/NO | YES/NO | PASS/FAIL |

**CRITICAL Criteria:**
- [ ] **CRITICAL:** Sandbox execution environment documented
- [ ] **CRITICAL:** Tenant isolation enforced in sandbox

#### 5.2 Resource Limits

| Resource | Free | Pro | Enterprise | Documented |
|----------|------|-----|------------|------------|
| Memory | {{val}} | {{val}} | {{val}} | YES/NO |
| CPU Time | {{val}} | {{val}} | {{val}} | YES/NO |
| File Size | {{val}} | {{val}} | {{val}} | YES/NO |

**Standard Criteria:**
- [ ] Resource limits defined per tier
- [ ] Limits are enforceable

### 6. Error Response Validation

#### 6.1 Error Code Standards

| Error Code | Defined | HTTP Status | Retryable Flag |
|------------|---------|-------------|----------------|
| VALIDATION_ERROR | YES/NO | 400 | NO |
| PERMISSION_DENIED | YES/NO | 403 | NO |
| RATE_LIMITED | YES/NO | 429 | YES |
| TIMEOUT_ERROR | YES/NO | 408 | YES |
| INTERNAL_ERROR | YES/NO | 500 | YES |

**Standard Criteria:**
- [ ] Standard error codes defined
- [ ] HTTP status codes appropriate
- [ ] Retryable flag documented

#### 6.2 Error Response Schema

| Field | Required | Type | Present |
|-------|----------|------|---------|
| success | YES | boolean | YES/NO |
| error.code | YES | string | YES/NO |
| error.message | YES | string | YES/NO |
| error.trace_id | YES | string | YES/NO |

### 7. Monitoring Validation

#### 7.1 Metrics Configuration

| Metric | Defined | Labels | Alert Threshold |
|--------|---------|--------|-----------------|
| tool_execution_duration | YES/NO | {{labels}} | Documented |
| tool_execution_errors | YES/NO | {{labels}} | Documented |
| tool_resource_usage | YES/NO | {{labels}} | Documented |

**Standard Criteria:**
- [ ] Execution metrics defined
- [ ] Error metrics defined
- [ ] Alert thresholds documented

#### 7.2 Trace Context

| Field | Required | Documented |
|-------|----------|------------|
| trace_id | YES | YES/NO |
| span_id | YES | YES/NO |
| tenant_id | YES | YES/NO |
| tool_id | YES | YES/NO |

### 8. Cross-Reference Validation

Verify consistency with other documents:

| Comparison | Consistent | Discrepancy |
|------------|------------|-------------|
| Tools vs. Agent Runtime | YES/NO | {{details}} |
| Permissions vs. Module Design | YES/NO | {{details}} |
| Rate Limits vs. Tier Config | YES/NO | {{details}} |

---

## QG-M3 Tool Contract Assessment

| Category | Status | Issues |
|----------|--------|--------|
| Tool Schemas | {{status}} | {{count}} |
| TenantContext | {{status}} | {{count}} |
| Permissions | {{status}} | {{count}} |
| Rate Limits | {{status}} | {{count}} |
| Sandbox | {{status}} | {{count}} |
| Error Responses | {{status}} | {{count}} |
| Monitoring | {{status}} | {{count}} |

---

## SUCCESS METRICS:

- [ ] All CRITICAL checks validated
- [ ] Standard checks validated
- [ ] Evidence verified for each check
- [ ] Cross-references validated
- [ ] Gate decision ready

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
- [ ] Gate decision justified
- [ ] Patterns align with pattern registry

---

## Outputs

- Tool schema validation results
- TenantContext compliance results
- Permission validation results
- Rate limit validation results
- Execution environment assessment
- Validation findings list

---

## NEXT STEP:

Proceed to `step-22-v-report.md` to generate the final validation report.
