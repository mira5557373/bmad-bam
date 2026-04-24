# Step 10: Load Existing PRG Configuration

> **MANDATORY EXECUTION RULES:**
> 1. Read this ENTIRE file before acting
> 2. Follow steps in EXACT order
> 3. DO NOT skip verification

## Purpose

Load existing PRG gate specification for modification.

## Prerequisites

- Existing artifact at `{output_folder}/planning-artifacts/quality/prg-gate-spec.md`

## Actions

### 1. Load Existing Specification

Read: `{output_folder}/planning-artifacts/quality/prg-gate-spec.md`

### 2. Parse Current State

Extract and document:
- Current check definitions
- Automation configuration
- Threshold settings
- Escalation rules

### 3. Identify Change Scope

| Change Type | Impact Level | Requires Re-validation |
|-------------|--------------|------------------------|
| Add check | High | Yes - full PRG |
| Modify threshold | Medium | Yes - affected checks |
| Change owner | Low | No |
| Update timeout | Low | Yes - timing tests |

## Verification

- [ ] Existing specification loaded
- [ ] Current state documented
- [ ] Change scope identified

## Outputs

- Current state summary
- Change impact assessment

## Next Step

Proceed to `step-11-e-apply-changes.md` with loaded state.
