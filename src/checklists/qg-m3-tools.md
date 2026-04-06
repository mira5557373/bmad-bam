# QG-M3-TOOLS: Tool Registration Validation

# Extension of Module Quality Gate (QG-M3) — validates tool manifest, contracts, governance, and testing

## Checklist

### Tool Manifest Completeness

- [ ] `tool_manifest.py` exists in module root
- [ ] All tools have unique `{module}_{action}` names
- [ ] All tools have LLM-optimized descriptions (< 200 chars, starts with verb)
- [ ] All input schemas have property descriptions
- [ ] All tools have semantic keywords (3-10 per tool)
- [ ] Tool count ≤ 10 per module (soft limit; hard limit 15)

### Tool Contract Documentation

- [ ] `docs/contracts/{module}-tool-contract.md` exists
- [ ] Tool contract version matches facade contract version
- [ ] All tools documented with full properties
- [ ] Breaking change policy documented
- [ ] Example usage provided for each tool

### Tool Governance

- [ ] All DANGEROUS category tools have `approval_required=True`
- [ ] Rate limits defined for all tools
- [ ] Timeout values set appropriately (READ: 10s, WRITE: 30s default)
- [ ] Sandbox requirements documented for code execution tools
- [ ] Cost estimates provided for metering

### Tool Testing

- [ ] Unit tests for tool definition validation (100% coverage)
- [ ] Contract tests for tool → facade routing
- [ ] At least 3 semantic test cases per tool
- [ ] Rate limit tests verify enforcement

### Observability

- [ ] Tools traced via Langfuse (or configured observability)
- [ ] Error codes mapped to domain errors
- [ ] Audit logging configured for compliance

## Automated Validation Script

```bash
# Run as part of QG-M3 gate
./scripts/validate-module-tools.sh {module-name}

# Validates:
# - Tool manifest schema compliance
# - Tool contract exists and is current
# - Test coverage meets threshold
# - No duplicate tool names across modules
```

## Gate Decision

| Classification | Criteria |
|---------------|----------|
| **PASS** | All thresholds met: manifest valid (100%), descriptions compliant (100%), contract exists, test coverage ≥90%, rate limits defined (100%), DANGEROUS tools have approval (100%) |
| **CONDITIONAL** | All CRITICAL thresholds met, semantic test pass ≥80% — remediation plan required for remaining items |
| **FAIL** | Any CRITICAL threshold not met — block until resolved |

### Threshold Details

| Criterion                     | Threshold |
| ----------------------------- | --------- |
| Tool manifest schema valid    | 100%      |
| Tool descriptions < 200 chars | 100%      |
| Input schema descriptions     | 100%      |
| Tool contract exists          | Required  |
| Unit test coverage            | ≥ 90%     |
| Contract test pass            | 100%      |
| Semantic test pass            | ≥ 80%     |
| Rate limits defined           | 100%      |
| DANGEROUS tools have approval | 100%      |

> Gate failure recovery: resolve blocking items before approving tool registration.

## Recovery Protocol

If this gate fails, refer to the relevant recovery workflow or escalation procedure.
