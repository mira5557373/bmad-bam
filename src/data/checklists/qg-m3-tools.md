# QG-M3-TOOLS: Tool Registration Validation

> Gate ID: QG-M3-TOOLS (Tool Registration Validation)
> Extension of Module Quality Gate (QG-M3) - validates tool manifest, contracts, governance, and testing

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
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

## Waiver Process

For non-critical items that cannot be addressed:
1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (Product Owner or Technical Lead)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

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

## Web Research Verification

- [ ] Search the web: "AI tool registry design patterns {date}" - Verify tool registry best practices
- [ ] Search the web: "LLM tool calling rate limiting patterns {date}" - Confirm governance patterns are current
- [ ] _Source: [URL]_ citations documented for key tool registration decisions

**PASS CRITERIA:** All CRITICAL checkboxes completed, tool manifest valid, contract documented
**OWNER:** BAM
**REVIEWERS:** Platform Architect, Security Lead

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Tool Manifest Completeness | CRITICAL | Minor schema gaps | No manifest |
| Tool Contract Documentation | CRITICAL | Incomplete examples | No contract |
| Tool Governance (DANGEROUS tools) | CRITICAL | Rate limits missing | No approval flow |
| Tool Testing (unit, contract) | CRITICAL | Coverage 80-90% | Coverage <80% |
| Semantic Testing | Non-critical | Pass rate 70-80% | Pass rate <70% |
| Observability | Non-critical | Partial tracing | No tracing |

## Recovery Protocol

**If QG-M3-TOOLS fails:**

1. **Attempt 1:** Immediate tool registration remediation (target: 1-2 days)
   - Run tool manifest validation script
   - Fix schema validation errors
   - Add missing tool descriptions (< 200 chars, verb-first)
   - Update tool contract documentation
   - Verify DANGEROUS tools have approval_required=True
   - Re-run QG-M3-TOOLS validation
   - **Lock passed categories** — do not re-test locked items

2. **Attempt 2:** Deep tool configuration review (target: 2-3 days)
   - Engage Platform Architect and Security for tool audit
   - Review all tool permissions and rate limits
   - Add missing semantic test cases (target: 3 per tool)
   - Verify observability integration (Langfuse tracing)
   - Update audit logging configuration
   - Re-run validation after remediation
   - **Preserve locked categories** from Attempt 1

3. **Mandatory Course Correction:**
   - Escalate to Tech Lead and Platform Architect
   - Document tool registration blockers in ADR
   - Conduct tool design review session
   - Consider splitting complex tools into smaller units
   - Create remediation plan with stakeholder sign-off
   - Schedule follow-up validation within 1 week

**Category-Specific Recovery:**

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Tool Manifest Completeness | Validate tool_manifest.py exists; ensure unique naming; add LLM-optimized descriptions | No manifest file or schema validation fails |
| Tool Contract Documentation | Create docs/contracts/{module}-tool-contract.md; document all tools with examples | No contract documentation or version mismatch |
| Tool Governance | Set approval_required=True for DANGEROUS tools; define rate limits and timeouts | DANGEROUS tools lack approval flow or no rate limits |
| Tool Testing | Achieve 90%+ unit test coverage; implement contract tests; add semantic test cases | Test coverage below 80% or contract tests fail |
| Observability | Configure Langfuse tracing; map error codes; enable audit logging | No tracing configured or audit logging disabled |

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Tool registry design
- `validate-tool-contract` - Tool contract validation
- `define-facade-contract` - Facade to tool mapping
- `tea-trace` - Tool execution verification
