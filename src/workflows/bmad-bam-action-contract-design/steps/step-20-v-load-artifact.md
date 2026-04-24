# Step 20: Load Artifact for Validation

> **MANDATORY EXECUTION RULES:**
> 1. Read this ENTIRE file before acting
> 2. Follow steps in EXACT order
> 3. DO NOT skip verification

## Purpose

Load action contract specification for validation against QG-AI3.

## Prerequisites

- Artifact exists at `{output_folder}/planning-artifacts/ai/action-contract-spec.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-ai3-agent-contracts.md`

## Actions

### 1. Load Specification

Read: `{output_folder}/planning-artifacts/ai/action-contract-spec.md`

### 2. Extract Validation Targets

| Component | Location in Spec | Validation Gate |
|-----------|------------------|-----------------|
| Schema definition | Section 2 | QG-AI2.1 |
| Confidence thresholds | Section 3 | QG-AI2.2 |
| Proof certificate | Section 4 | QG-AI2.3 |
| Loop bindings | Section 5 | QG-AI2.4 |

### 3. Load Validation Criteria

Load QG-AI2 checklist for validation criteria.

## Verification

- [ ] Specification loaded successfully
- [ ] All sections present
- [ ] Validation criteria loaded

## Outputs

- Parsed specification
- Validation target list

## Next Step

Proceed to `step-21-v-validate-contract.md` for validation.
