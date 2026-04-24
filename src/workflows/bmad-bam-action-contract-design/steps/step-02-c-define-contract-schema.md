# Step 2: Define Contract Schema

> **MANDATORY EXECUTION RULES:**
> 1. Read this ENTIRE file before acting
> 2. Follow steps in EXACT order
> 3. Use web search when directed
> 4. DO NOT skip verification

## Purpose

Define the complete 8-field action contract schema with validation rules.

## Prerequisites

- Step 1 completed (action inventory)
- **Load guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/8-field-action-contract-guide.md`

## Actions

### 1. Define Base Schema

Create the action contract schema:

```yaml
action_contract:
  tenant_id:
    type: string
    required: true
    format: uuid
    description: "Tenant scope identifier"
  
  action_type:
    type: enum
    required: true
    values: [READ_ONLY, WRITE_INTERNAL, WRITE_EXTERNAL, FINANCIAL, PRIVILEGED]
  
  confidence:
    type: float
    required: true
    min: 0.0
    max: 1.0
  
  proof_certificate:
    type: object
    required_for: [WRITE_EXTERNAL, FINANCIAL, PRIVILEGED]
  
  resource_budget:
    type: object
    required: true
  
  rollback_plan:
    type: object
    required_for: [WRITE_INTERNAL, WRITE_EXTERNAL, FINANCIAL]
  
  audit_metadata:
    type: object
    required: true
  
  loop_binding:
    type: enum
    required: true
    values: [REQUEST, CONTROL, LEARNING, ECONOMIC, RECOVERY]
```

### 2. Define Validation Rules

**Verify current best practices with web search:**
Search the web: "JSON schema validation AI agent contracts {date}"

| Field | Validation Rule | Error Message |
|-------|-----------------|---------------|
| tenant_id | UUID format | "Invalid tenant identifier" |
| confidence | 0.0 <= value <= 1.0 | "Confidence out of range" |
| action_type | In enum values | "Unknown action type" |

### 3. Define Conditional Requirements

| Action Type | Required Fields | Optional Fields |
|-------------|-----------------|-----------------|
| READ_ONLY | tenant_id, audit_metadata | proof_certificate |
| WRITE_INTERNAL | All except proof_certificate | - |
| WRITE_EXTERNAL | All 8 fields | - |
| FINANCIAL | All 8 fields (strict) | - |
| PRIVILEGED | All 8 fields + MFA | - |

## Verification

- [ ] All 8 fields defined with types
- [ ] Validation rules specified
- [ ] Conditional requirements documented

## Outputs

- Action contract schema (YAML)
- Validation rules specification

## Next Step

Proceed to `step-03-c-map-tenant-context.md` with schema definition.
