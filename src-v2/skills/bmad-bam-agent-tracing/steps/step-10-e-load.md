# Step 10: Load Existing Tracing Design

> **MANDATORY EXECUTION RULES:**
> 1. Read this ENTIRE file before acting
> 2. Follow steps in EXACT order
> 3. DO NOT skip verification

## Purpose

Load existing agent tracing design document for modification.

---

## Prerequisites

- Existing artifact at `{output_folder}/planning-artifacts/agent-tracing-design.md`

---

## Actions

### 1. Load Existing Specification

Read: `{output_folder}/planning-artifacts/agent-tracing-design.md`

### 2. Parse Current State

Extract and document current design elements:

| Section | Current State | Last Modified |
|---------|---------------|---------------|
| Trace Dimensions | | |
| Span Naming | | |
| Tenant Attributes | | |
| Token Metrics | | |
| Propagation Design | | |
| Analysis Design | | |

### 3. Identify Change Scope

Determine what modifications are requested:

| Change Type | Impact Level | Requires Re-validation |
|-------------|--------------|------------------------|
| Add span type | Low | No |
| Modify attribute | Medium | Yes - schema update |
| Change propagation | High | Yes - integration test |
| Add dashboard | Low | No |
| Modify alert rule | Medium | Yes - threshold review |
| Change tenant scope | High | Yes - QG-I2 |

### 4. Document Change Request

| Change | Section | Rationale | Impact |
|--------|---------|-----------|--------|
| | | | |

---

## Verification

- [ ] Existing specification loaded
- [ ] Current state documented
- [ ] Change scope identified
- [ ] Impact assessment complete

---

## Outputs

- Current state summary
- Change impact assessment
- Modification plan

---

## Next Step

Proceed to `step-11-e-apply.md` with loaded state and change request.
