# Step 4: Design Proof Integration

> **MANDATORY EXECUTION RULES:**
> 1. Read this ENTIRE file before acting
> 2. Follow steps in EXACT order
> 3. Use web search when directed
> 4. DO NOT skip verification

## Purpose

Design proof_certificate generation and validation for auditable AI decisions.

## Prerequisites

- Step 3 completed (tenant mapping)
- **Load guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/8-field-action-contract-guide.md`

## Actions

### 1. Define Proof Certificate Schema

```yaml
proof_certificate:
  certificate_id:
    type: string
    format: uuid
  
  generated_at:
    type: timestamp
    format: ISO8601
  
  decision_chain:
    type: array
    items:
      step_id: string
      reasoning: string
      confidence: float
      evidence: array
  
  verification:
    algorithm: "SHA-256"
    signature: string
    public_key_id: string
  
  audit_refs:
    trace_id: string
    span_id: string
    tenant_id: string
```

### 2. Design Generation Flow

**Verify current best practices with web search:**
Search the web: "AI decision audit trail cryptographic proof {date}"

| Stage | Action | Output |
|-------|--------|--------|
| Pre-execution | Capture inputs | decision_chain[0] |
| Each tool call | Log reasoning | decision_chain[n] |
| Post-execution | Compute hash | verification.signature |
| Storage | Persist certificate | audit_refs |

### 3. Define Verification Requirements

| Action Type | Proof Required | Verification Level |
|-------------|----------------|-------------------|
| READ_ONLY | Optional | None |
| WRITE_INTERNAL | Recommended | Async audit |
| WRITE_EXTERNAL | Required | Pre-execution |
| FINANCIAL | Required + MFA | Synchronous + human |
| PRIVILEGED | Required + MFA | Real-time + approval |

## Verification

- [ ] Proof certificate schema defined
- [ ] Generation flow documented
- [ ] Verification levels specified per action type

## Outputs

- Proof certificate schema
- Generation workflow diagram
- Verification requirements matrix

## Next Step

Proceed to `step-05-c-configure-loop-bindings.md` with proof design.
