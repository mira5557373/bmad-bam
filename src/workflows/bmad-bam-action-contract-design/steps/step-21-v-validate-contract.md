# Step 21: Validate Contract

> **MANDATORY EXECUTION RULES:**
> 1. Read this ENTIRE file before acting
> 2. Follow steps in EXACT order
> 3. DO NOT skip verification

## Purpose

Validate action contract specification against QG-AI3 criteria.

## Prerequisites

- Step 20 completed (artifact loaded)
- QG-AI3 checklist available

## Actions

### 1. Validate Schema Completeness (QG-AI3.1)

- [ ] **CRITICAL:** All 8 fields defined
- [ ] **CRITICAL:** tenant_id is required and UUID format
- [ ] **CRITICAL:** action_type uses defined enum values
- [ ] confidence has min/max bounds
- [ ] Conditional requirements documented

### 2. Validate Confidence Thresholds (QG-AI3.2)

- [ ] **CRITICAL:** Thresholds defined for all levels
- [ ] **CRITICAL:** FINANCIAL actions require >= 0.95 or human review
- [ ] Tenant override rules documented
- [ ] Threshold logging configured

### 3. Validate Proof Certificates (QG-AI3.3)

- [ ] **CRITICAL:** Proof required for WRITE_EXTERNAL, FINANCIAL, PRIVILEGED
- [ ] Certificate schema includes signature verification
- [ ] Audit references link to trace system
- [ ] Retention policy defined

### 4. Validate Loop Bindings (QG-AI3.4)

- [ ] **CRITICAL:** All action types bound to loops
- [ ] Timeout values are reasonable
- [ ] Fallback loops configured
- [ ] Transition rules defined

## Verification

| Check | Status | Notes |
|-------|--------|-------|
| QG-AI3.1 Schema | PASS/FAIL | |
| QG-AI3.2 Thresholds | PASS/FAIL | |
| QG-AI3.3 Proofs | PASS/FAIL | |
| QG-AI3.4 Loops | PASS/FAIL | |

## Outputs

- Validation results per check
- List of failures (if any)

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
