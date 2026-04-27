---
name: qg-m3-agent-runtime
description: Agent Runtime Readiness quality gate validating AI runtime infrastructure and tool contracts
module: bam
tags: [module, quality-gate, multi-tenant, agent-runtime, ai, tools]
version: 2.0.0
---

# QG-M3: Agent Runtime Readiness Gate

> **Gate ID:** QG-M3 (Agent Runtime Readiness)
> **Secondary Gate:** QG-M3-T (Tool Contract Validation)
> **Workflow:** bmad-bam-agent-runtime-architecture
> **Prerequisites:** QG-M2 (Tenant Isolation)

Agent runtime MUST pass before module development begins. This gate verifies AI runtime infrastructure is operational and tool contracts are properly defined.

---

## Purpose

QG-M3 validates that the agent runtime architecture meets multi-tenant requirements:

1. **Agent execution boundaries** are properly configured
2. **Tool registry** is complete with schemas and governance
3. **Memory tiers** are scoped correctly to tenant boundaries
4. **Safety guardrails** including kill switches are operational
5. **Tool contracts** (QG-M3-T) define clear interfaces between agents and modules

---

## Agent Execution Boundaries

### Orchestration

- [ ] **CRITICAL:** Orchestration pattern documented and justified
- [ ] **CRITICAL:** Agent execution respects tenant boundaries
- [ ] Agent topology defined (single agent, crew, hierarchy)
- [ ] AI runtime patterns verified against current best practices

### Tenant Isolation in Agent Context

- [ ] **CRITICAL:** Tool calls include tenant context
- [ ] **CRITICAL:** Agent outputs cannot leak across tenants
- [ ] Agent execution timeout defined per tenant tier
- [ ] Token usage limits per tenant configured
- [ ] Error handling for agent failures documented

---

## Agent Topology

- [ ] Agent role definitions complete
- [ ] Inter-agent communication patterns documented
- [ ] Coordination mechanism defined (state machine, message passing, etc.)
- [ ] Human-in-the-loop patterns documented

---

## Memory Configuration

### Memory Tiers

- [ ] **CRITICAL:** Memory/state scoped to tenant
- [ ] Session memory store configured
- [ ] User memory store configured
- [ ] Tenant memory store configured
- [ ] Global memory store configured (if needed)
- [ ] **CRITICAL:** Scope enforcement implemented (no cross-tenant leaks)

---

## Safety Guardrails

### Approval Workflow

- [ ] Approval triggers defined for high-risk actions
- [ ] Queue implementation complete
- [ ] Timeout handling implemented
- [ ] Escalation rules configured

### Kill Switch

- [ ] **CRITICAL:** Feature flag integration complete
- [ ] **CRITICAL:** Circuit breaker configured
- [ ] Manual override mechanism available

### Evaluation Foundation

- [ ] Metric definitions complete
- [ ] Threshold configuration available
- [ ] Golden task template ready

---

## Observability

- [ ] Observability hooks in place (Langfuse or configured provider)
- [ ] Error codes mapped to domain errors
- [ ] Audit logging configured for compliance
- [ ] Agent versioning strategy defined

---

## Tool Contracts (QG-M3-T)

> **Secondary Gate:** Tool Contract Validation validates tool manifest, schemas, governance, and testing.

### Tool Registry

- [ ] **CRITICAL:** Tool catalog structure implemented
- [ ] **CRITICAL:** All tools registered with schemas
- [ ] Permission model implemented
- [ ] Policy engine operational

### Tool Manifest Completeness

- [ ] `tool_manifest.py` exists in module root
- [ ] All tools have unique `{module}_{action}` names
- [ ] All tools have LLM-optimized descriptions (< 200 chars, starts with verb)
- [ ] All input schemas have property descriptions
- [ ] All tools have semantic keywords (3-10 per tool)
- [ ] Tool count per module within limits (soft: 10, hard: 15)

### Tool Contract Documentation

- [ ] `docs/contracts/{module}-tool-contract.md` exists
- [ ] Tool contract version matches facade contract version
- [ ] All tools documented with full properties
- [ ] Breaking change policy documented
- [ ] Example usage provided for each tool

### Tool Governance

- [ ] **CRITICAL:** All DANGEROUS category tools have `approval_required=True`
- [ ] **CRITICAL:** Rate limits defined for all tools
- [ ] Timeout values set appropriately (READ: 10s, WRITE: 30s default)
- [ ] Sandbox requirements documented for code execution tools
- [ ] Cost estimates provided for metering

### Tool Testing

- [ ] **CRITICAL:** Unit tests for tool definition validation (>=90% coverage)
- [ ] **CRITICAL:** Contract tests for tool to facade routing (100% pass)
- [ ] At least 3 semantic test cases per tool
- [ ] Rate limit tests verify enforcement

---

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All CRITICAL items checked, >=80% standard items complete |
| **CONDITIONAL** | All CRITICAL items checked, <80% standard items + documented mitigation plan |
| **FAIL** | Any CRITICAL item unchecked - block module development, enter recovery protocol |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

---

## Critical vs Non-Critical Classification

### Agent Runtime Categories

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Orchestration | CRITICAL | Pattern undocumented | No orchestration defined |
| Tenant Isolation in Agents | CRITICAL | Partial context passing | Agent leaks across tenants |
| Memory Tiers (scope enforcement) | CRITICAL | Scope enforcement partial | Memory scope leak |
| Kill Switch | CRITICAL | Circuit breaker partial | No kill switch |
| Approval Workflow | Non-critical | Timeout handling missing | N/A |
| Evaluation Foundation | Non-critical | Thresholds undefined | N/A |
| Agent Topology | Non-critical | Roles undefined | N/A |
| Observability | Non-critical | Partial tracing | N/A |

### Tool Contract Categories (QG-M3-T)

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Tool Registry | CRITICAL | Schema validation partial | No tool registry |
| Tool Manifest Completeness | CRITICAL | Minor schema gaps | No manifest |
| Tool Contract Documentation | CRITICAL | Incomplete examples | No contract |
| Tool Governance (DANGEROUS tools) | CRITICAL | Rate limits missing | No approval flow |
| Tool Testing (unit, contract) | CRITICAL | Coverage 80-90% | Coverage <80% |
| Semantic Testing | Non-critical | Pass rate 70-80% | Pass rate <70% |
| Tool Observability | Non-critical | Partial tracing | No tracing |

---

## Waiver Process

For non-critical items that cannot be addressed:

1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (Product Owner or Technical Lead)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

---

## Recovery Protocol

**If gate triggers CONDITIONAL or FAIL status:**

### Attempt 1: Address Identified Gaps (target: 1-2 days)

**Agent Runtime Issues:**
- Review failed checks and identify root cause (orchestration, memory scope, kill switch)
- Run `bmad-bam-agent-runtime-architecture` workflow to audit runtime configuration
- Test memory tier scope enforcement with isolation tests
- Verify circuit breaker and feature flag integration
- Re-run QG-M3 validation
- **Lock passed categories**

**Tool Contract Issues:**
- Run tool manifest validation script
- Fix schema validation errors
- Add missing tool descriptions (< 200 chars, verb-first)
- Update tool contract documentation
- Verify DANGEROUS tools have `approval_required=True`
- Re-run QG-M3-T validation

### Attempt 2: Deeper Investigation (target: 3-5 days)

**Agent Runtime Issues:**
- Engage AI Runtime Architect (Nova) for architecture review
- Review orchestration pattern against runtime requirements
- Audit memory store configurations for all tiers (session, user, tenant, global)
- Test approval workflow escalation paths
- Apply corrective measures and re-run validation
- **Preserve locked categories**

**Tool Contract Issues:**
- Engage Platform Architect and Security for tool audit
- Review all tool permissions and rate limits
- Add missing semantic test cases (target: 3 per tool)
- Verify observability integration (Langfuse tracing)
- Update audit logging configuration
- Re-run validation after remediation

### Attempt 3: Mandatory Course Correction

- Escalate to project leadership and Platform Architect
- Document runtime and tool blockers in ADR (Architecture Decision Record)
- Reassess AI runtime selection if pattern fundamentally incompatible
- Consider phased module development with reduced agent capabilities
- Conduct tool design review session
- Consider splitting complex tools into smaller units
- Create remediation plan with stakeholder sign-off
- Schedule follow-up validation within 1 week

### Category-Specific Recovery

#### Agent Runtime Recovery

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Orchestration | Document and justify orchestration pattern; verify agent topology | No orchestration pattern defined |
| Tenant Isolation | Ensure all tool calls include tenant context; verify no output leaks | Agent outputs leak across tenants |
| Memory Tiers | Configure all memory stores; implement scope enforcement | Memory scope leak detected |
| Approval Workflow | Define approval triggers; implement queue and timeout handling | High-risk actions bypass approval |
| Kill Switch | Integrate feature flags; configure circuit breaker; implement manual override | Kill switch non-functional |

#### Tool Contract Recovery (QG-M3-T)

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Tool Registry | Implement tool catalog structure; register all tools with schemas | No tool registry or schema validation fails |
| Tool Manifest | Validate tool_manifest.py exists; ensure unique naming; add descriptions | No manifest file or schema validation fails |
| Tool Contract Documentation | Create docs/contracts/{module}-tool-contract.md; document all tools | No contract documentation or version mismatch |
| Tool Governance | Set approval_required=True for DANGEROUS tools; define rate limits | DANGEROUS tools lack approval flow |
| Tool Testing | Achieve 90%+ unit test coverage; implement contract tests | Test coverage below 80% |

---

## Automated Validation Script

```bash
# Run as part of QG-M3 gate
./scripts/validate-agent-runtime.sh
./scripts/validate-module-tools.sh {module-name}

# Validates:
# - Agent runtime configuration
# - Tenant isolation in agent context
# - Memory tier scope enforcement
# - Tool manifest schema compliance
# - Tool contract exists and is current
# - Test coverage meets threshold
# - No duplicate tool names across modules
```

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Runtime configuration
- `validate-tool-contract` - Tool contract validation
- `define-facade-contract` - Facade to tool mapping
- `bmad-bam-ai-agent-debug` - Runtime debugging
- `tea-trace` - Tool execution verification

## Related Templates

- `agent-runtime-template.md` - Agent runtime architecture
- `tool-contract-template.md` - Tool contract documentation
- `memory-tier-template.md` - Memory configuration

## Related Patterns

- `ai-runtime.md` - AI runtime selection guidance
- `agent-execution-patterns.md` - Agent execution boundaries
- `memory-tiers.md` - Multi-tenant memory isolation

---

## Web Research Verification

- [ ] Search the web: "AI agent orchestration patterns {date}" - Verify orchestration best practices
- [ ] Search the web: "multi-tenant agent memory isolation patterns {date}" - Confirm memory tier patterns are current
- [ ] Search the web: "AI tool registry design patterns {date}" - Verify tool registry best practices
- [ ] Search the web: "LLM tool calling rate limiting patterns {date}" - Confirm governance patterns are current
- [ ] _Source: [URL]_ citations documented for key runtime and tool decisions

---

**PASS CRITERIA:** All CRITICAL checkboxes completed, tool manifest valid, contracts documented
**OWNER:** AI Runtime Architect (Nova persona)
**REVIEWERS:** Platform Architect (Atlas persona), Security Lead

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-04-27 | BAM | Merged qg-m3-agent-runtime.md + qg-m3-tools.md; added YAML frontmatter; unified recovery protocol |
| 1.0.0 | - | BAM | Initial V2 placeholder |
