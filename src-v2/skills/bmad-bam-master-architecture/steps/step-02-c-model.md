# Step 02: Select Tenant Model

## Purpose

Choose the appropriate tenant isolation model based on requirements.

## Prerequisites

- Step 01 complete with requirements

## Actions

### 1. Evaluate Models

| Model | When to Use | Fit |
|-------|-------------|-----|
| RLS | <1000 tenants, cost-efficient | |
| Schema | Regulated, moderate isolation | |
| Database | Enterprise, maximum isolation | |

### 2. Apply Decision Criteria

Based on requirements from Step 01:
- Tenant count: determines RLS vs Schema
- Compliance: may require Database isolation
- Cost: RLS most efficient

### 3. Document Selection

Record:
- Selected model
- Rationale
- Trade-offs accepted

## Verification

- [ ] Model selected
- [ ] Rationale documented
- [ ] Trade-offs acknowledged

## Next Step

Proceed to `step-03-c-boundaries.md` with model selection.
