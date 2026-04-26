# Step 21: Validate Tracing Design

> **MANDATORY EXECUTION RULES:**
> 1. Read this ENTIRE file before acting
> 2. Follow steps in EXACT order
> 3. DO NOT skip verification

## Purpose

Validate agent tracing design specification against quality gate criteria.

---

## Prerequisites

- Step 20 completed (artifact loaded)
- Quality gate checklists available

---

## Actions

### 1. Validate Trace Schema (QG-M3.1)

- [ ] **CRITICAL:** All agent operations have defined spans
- [ ] **CRITICAL:** Span naming follows conventions
- [ ] **CRITICAL:** Token metrics defined for LLM spans
- [ ] Event types documented
- [ ] Attribute schema complete

### 2. Validate Tenant Isolation (QG-I2)

- [ ] **CRITICAL:** `tenant_id` required on ALL spans
- [ ] **CRITICAL:** Tenant isolation in query layer
- [ ] **CRITICAL:** No cross-tenant data leakage possible
- [ ] Tenant tier affects retention/limits
- [ ] Tenant context propagation defined

### 3. Validate Context Propagation (QG-M3.2)

- [ ] **CRITICAL:** Cross-agent context defined
- [ ] **CRITICAL:** Tool execution captures context
- [ ] Context preserved across async boundaries
- [ ] External API calls include context
- [ ] Baggage contents specified

### 4. Validate Analysis Capabilities (QG-P1)

- [ ] **CRITICAL:** Tenant-scoped queries defined
- [ ] **CRITICAL:** Error tracking designed
- [ ] Latency dashboards specified
- [ ] Alert rules documented
- [ ] Performance comparison supported

### 5. Validate Cost Integration

- [ ] Token usage tracked per span
- [ ] Cost attributes defined
- [ ] Cost aggregation by tenant
- [ ] Budget alert integration

### 6. Validate Implementation Plan

- [ ] Phases defined with dependencies
- [ ] Effort estimates provided
- [ ] Risk assessment included
- [ ] Quality gate alignment documented

---

## Validation Results

| Check | Status | Notes |
|-------|--------|-------|
| QG-M3.1 Trace Schema | PASS/FAIL | |
| QG-I2 Tenant Isolation | PASS/FAIL | |
| QG-M3.2 Context Propagation | PASS/FAIL | |
| QG-P1 Analysis Capabilities | PASS/FAIL | |
| Cost Integration | PASS/FAIL | |
| Implementation Plan | PASS/FAIL | |

---

## Verification

- [ ] All QG-M3 checks performed
- [ ] All QG-I2 checks performed
- [ ] All QG-P1 checks performed
- [ ] Results documented

---

## Outputs

- Validation results per check
- List of failures (if any)
- Remediation recommendations

---

## Next Step

Proceed to `step-22-v-report.md` to generate validation report.
