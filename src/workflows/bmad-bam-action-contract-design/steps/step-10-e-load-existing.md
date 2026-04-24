# Step 10: Load Existing Contract

> **MANDATORY EXECUTION RULES:**
> 1. Read this ENTIRE file before acting
> 2. Follow steps in EXACT order
> 3. DO NOT skip verification

## Purpose

Load existing action contract specification for modification.

## Prerequisites

- Existing artifact at `{output_folder}/planning-artifacts/ai/action-contract-spec.md`

## Actions

### 1. Load Existing Specification

Read: `{output_folder}/planning-artifacts/ai/action-contract-spec.md`

### 2. Parse Current State

Extract and document:
- Current action inventory
- Existing schema definition
- Configured confidence thresholds
- Loop bindings

### 3. Identify Change Scope

| Change Type | Impact Level | Requires Re-validation |
|-------------|--------------|------------------------|
| Add action type | Medium | Yes - schema update |
| Modify threshold | Low | Yes - QG-AI2 |
| Change loop binding | Medium | Yes - runtime config |
| Update proof schema | High | Yes - audit trail |

## Verification

- [ ] Existing specification loaded
- [ ] Current state documented
- [ ] Change scope identified

## Outputs

- Current state summary
- Change impact assessment

## Next Step

Proceed to `step-11-e-apply-changes.md` with loaded state.
