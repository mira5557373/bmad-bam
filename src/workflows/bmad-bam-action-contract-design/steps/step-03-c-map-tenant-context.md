# Step 3: Map Tenant Context

> **MANDATORY EXECUTION RULES:**
> 1. Read this ENTIRE file before acting
> 2. Follow steps in EXACT order
> 3. Use web search when directed
> 4. DO NOT skip verification

## Purpose

Map tenant_id injection points throughout the action execution flow.

## Prerequisites

- Step 2 completed (schema definition)
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv` → filter: `{tenant_model}`

## Actions

### 1. Identify Injection Points

Map where tenant_id enters the system:

| Injection Point | Source | Validation |
|-----------------|--------|------------|
| API Gateway | JWT claim | Token signature |
| Message Queue | Message header | Producer auth |
| Scheduled Job | Job metadata | Job definition |
| Agent-to-Agent | Federation token | mTLS + JWT |

### 2. Design Propagation Flow

```
API Request
    │
    ▼
┌──────────────┐
│ Extract      │ ← JWT: tenant_id claim
│ tenant_id    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Set Context  │ ← Thread-local or AsyncLocal
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Action       │ ← Contract.tenant_id = context.tenant_id
│ Contract     │
└──────────────┘
```

### 3. Define Enforcement Rules

**Verify current best practices with web search:**
Search the web: "tenant context propagation microservices {date}"

| Rule | Enforcement | Failure Action |
|------|-------------|----------------|
| tenant_id required | Contract validation | Reject request |
| tenant_id immutable | After extraction | Log + alert |
| tenant_id matches | DB query scope | Block + audit |

## Verification

- [ ] All injection points identified
- [ ] Propagation flow documented
- [ ] Enforcement rules specified

## Outputs

- Tenant context mapping diagram
- Enforcement rules specification

## Next Step

Proceed to `step-04-c-design-proof-integration.md` with tenant mapping.
