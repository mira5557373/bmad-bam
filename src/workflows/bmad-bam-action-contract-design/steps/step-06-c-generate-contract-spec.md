# Step 6: Generate Contract Specification

> **MANDATORY EXECUTION RULES:**
> 1. Read this ENTIRE file before acting
> 2. Follow steps in EXACT order
> 3. Use web search when directed
> 4. DO NOT skip verification

## Purpose

Generate the complete action contract specification document.

## Prerequisites

- Steps 1-5 completed
- **Load template:** `{project-root}/_bmad/bam/data/templates/action-contract-spec-template.md`

## Actions

### 1. Assemble Specification

Combine all previous outputs into the final specification:

1. **Action Inventory** (from Step 1)
2. **Contract Schema** (from Step 2)
3. **Tenant Context Mapping** (from Step 3)
4. **Proof Certificate Design** (from Step 4)
5. **Loop Bindings** (from Step 5)

### 2. Add Confidence Thresholds

| Threshold | Action | Tenant Override |
|-----------|--------|-----------------|
| >= 0.95 | Auto-execute | Enterprise can lower to 0.90 |
| 0.80-0.94 | Soft review | Configurable per tenant |
| 0.50-0.79 | Hard review | Not overridable |
| < 0.50 | Reject | Not overridable |

### 3. Document Integration Points

| Integration | Protocol | Contract Field |
|-------------|----------|----------------|
| Guardrails (L3) | gRPC | action_type, confidence |
| Observability (L12) | OpenTelemetry | audit_metadata |
| Metering (L11) | Event stream | resource_budget |
| Memory (L23) | Vector API | proof_certificate |

### 4. Generate Output Document

Write to: `{output_folder}/planning-artifacts/ai/action-contract-spec.md`

## Verification

- [ ] All 8 fields documented
- [ ] Confidence thresholds specified
- [ ] Integration points mapped
- [ ] Output document generated

## Outputs

- `action-contract-spec.md` - Complete specification
- Ready for QG-AI3 validation

## Next Step

Workflow complete. Run `bmad-bam-prg-gate-setup` for production readiness.
