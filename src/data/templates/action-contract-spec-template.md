---
name: action-contract-spec-template
description: Template for 8-field action contract specification
category: ai-safety
version: 1.0.0
---

# Action Contract Specification

| Metadata           | Value                 |
|--------------------|-----------------------|
| Project            | {{project_name}}      |
| Version            | {{version}}           |
| Date               | {{date}}              |
| Author             | {{author}}            |

## Overview

This document defines the 8-field action contract for AI agent decisions in the {{project_name}} platform.

## 1. Action Inventory

| Action | Description | Risk Level | Action Type |
|--------|-------------|------------|-------------|
| {{action_1}} | {{description}} | {{risk_level}} | {{action_type}} |

## 2. Contract Schema

```yaml
action_contract:
  tenant_id:
    type: string
    required: true
    format: uuid
  
  action_type:
    type: enum
    values: [READ_ONLY, WRITE_INTERNAL, WRITE_EXTERNAL, FINANCIAL, PRIVILEGED]
  
  confidence:
    type: float
    min: 0.0
    max: 1.0
  
  proof_certificate:
    type: object
    required_for: [WRITE_EXTERNAL, FINANCIAL, PRIVILEGED]
  
  resource_budget:
    type: object
  
  rollback_plan:
    type: object
    required_for: [WRITE_INTERNAL, WRITE_EXTERNAL, FINANCIAL]
  
  audit_metadata:
    type: object
  
  loop_binding:
    type: enum
    values: [REQUEST, CONTROL, LEARNING, ECONOMIC, RECOVERY]
```

## 3. Confidence Thresholds

| Threshold | Action | Tenant Override |
|-----------|--------|-----------------|
| >= 0.95 | Auto-execute | {{enterprise_override}} |
| 0.80-0.94 | Soft review | {{standard_override}} |
| 0.50-0.79 | Hard review | Not overridable |
| < 0.50 | Reject | Not overridable |

## 4. Proof Certificate Schema

```yaml
proof_certificate:
  certificate_id: uuid
  generated_at: timestamp
  decision_chain: array
  verification:
    algorithm: SHA-256
    signature: string
  audit_refs:
    trace_id: string
    tenant_id: string
```

## 5. Loop Bindings

| Action Type | Primary Loop | Fallback Loop |
|-------------|--------------|---------------|
| READ_ONLY | REQUEST | - |
| WRITE_INTERNAL | CONTROL | RECOVERY |
| WRITE_EXTERNAL | CONTROL | RECOVERY |
| FINANCIAL | CONTROL | ECONOMIC |
| PRIVILEGED | CONTROL | RECOVERY |

## 6. Integration Points

| Integration | Protocol | Contract Field |
|-------------|----------|----------------|
| Guardrails | gRPC | action_type, confidence |
| Observability | OpenTelemetry | audit_metadata |
| Metering | Event stream | resource_budget |

## Web Research Queries

- Search: "AI agent action contract patterns {{date}}"
- Search: "multi-tenant agent safety contracts {{date}}"

## Verification Checklist

- [ ] All 8 fields documented
- [ ] Confidence thresholds specified
- [ ] Integration points mapped
- [ ] All placeholders replaced

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | {{date}} | {{author}} | Initial creation |
