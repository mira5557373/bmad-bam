# QG-AI3: Agent Contract Validation Checklist

**Gate ID:** QG-AI3
**Purpose:** Validate 8-field action contracts for AI agent safety
**Trigger:** After action-contract-design workflow completion

---

## QG-AI3.1: Contract Schema Validation

- [ ] **CRITICAL:** All 8 fields present in schema
- [ ] **CRITICAL:** tenant_id field is required and validated
- [ ] action_type uses defined enum values
- [ ] Field types match specification

## QG-AI3.2: Confidence Thresholds

- [ ] **CRITICAL:** Thresholds defined for all levels
- [ ] **CRITICAL:** Auto-execute threshold >= 0.95
- [ ] Soft review range: 0.80-0.94
- [ ] Hard review range: 0.50-0.79
- [ ] Reject threshold < 0.50
- [ ] FINANCIAL actions require human review below 0.95

## QG-AI3.3: Proof Certificate Integration

- [ ] **CRITICAL:** Proof certificates generated for high-risk actions
- [ ] Certificate schema includes required fields
- [ ] Verification algorithm specified (SHA-256)
- [ ] Audit references populated

## QG-AI3.4: Loop Bindings

- [ ] All action types bound to primary loops
- [ ] Fallback loops defined for write operations
- [ ] Timeout values configured
- [ ] State isolation namespace defined

## QG-AI3.5: Tenant Context

- [ ] **CRITICAL:** tenant_id propagated through all contracts
- [ ] Tenant tier affects confidence overrides
- [ ] Enterprise override rules documented
- [ ] Cross-tenant validation impossible

## QG-AI3.6: Rollback Configuration

- [ ] Compensating actions defined for WRITE operations
- [ ] Rollback timeout configured
- [ ] Recovery loop binding set

---

## Validation Outcomes

| Outcome | Criteria | Action |
|---------|----------|--------|
| **PASS** | All critical checks pass, all non-critical pass | Proceed to PRG |
| **CONDITIONAL** | All critical pass, non-critical issues documented | Proceed with remediation plan |
| **FAIL** | Any critical check fails | Return to action-contract-design |

## Critical Checks Summary

| Check # | Name | Critical |
|---------|------|----------|
| AI3.1 | Schema validation | **Yes** |
| AI3.2 | Confidence thresholds | **Yes** |
| AI3.3 | Proof certificates | **Yes** |
| AI3.4 | Loop bindings | No |
| AI3.5 | Tenant context | **Yes** |
| AI3.6 | Rollback configuration | No |

## Related Workflows

- `bmad-bam-action-contract-design` - Creates contracts
- `bmad-bam-prg-gate-setup` - Production readiness
- `bmad-bam-agent-runtime-architecture` - Runtime design
