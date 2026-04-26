# Step 20: Load Tracing Design for Validation

> **MANDATORY EXECUTION RULES:**
> 1. Read this ENTIRE file before acting
> 2. Follow steps in EXACT order
> 3. DO NOT skip verification

## Purpose

Load agent tracing design specification for validation against quality gate criteria.

---

## Prerequisites

- Artifact exists at `{output_folder}/planning-artifacts/agent-tracing-design.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m3-agent-runtime.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-i2-tenant-safety.md`

---

## Actions

### 1. Load Specification

Read: `{output_folder}/planning-artifacts/agent-tracing-design.md`

### 2. Extract Validation Targets

| Component | Location in Spec | Validation Gate |
|-----------|------------------|-----------------|
| Trace dimensions | Section 1 | QG-M3 |
| Span naming | Section 2.1 | QG-M3 |
| Tenant attributes | Section 2.2 | QG-I2 |
| Token metrics | Section 2.3 | QG-M3 |
| Propagation design | Section 3 | QG-M3 |
| Analysis design | Section 4 | QG-P1 |

### 3. Load Validation Criteria

Load applicable quality gate checklists:

| Gate | Checklist | Scope |
|------|-----------|-------|
| QG-M3 | Agent Runtime | Tracing implementation |
| QG-I2 | Tenant Safety | Tenant isolation |
| QG-P1 | Production | Observability readiness |

### 4. Identify Critical Checks

| Check Category | Critical Items | Gate |
|----------------|----------------|------|
| Tenant isolation | tenant_id on all spans | QG-I2 |
| Token tracking | LLM token metrics defined | QG-M3 |
| Error handling | Error spans and events | QG-M3 |
| Context propagation | Cross-agent context | QG-M3 |
| Dashboard readiness | Tenant-scoped queries | QG-P1 |

---

## Verification

- [ ] Specification loaded successfully
- [ ] All sections present
- [ ] Validation criteria loaded
- [ ] Critical checks identified

---

## Outputs

- Parsed specification
- Validation target list
- Applicable quality gates

---

## Next Step

Proceed to `step-21-v-validate.md` for detailed validation.
