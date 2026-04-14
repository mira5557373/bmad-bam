# QG-M3: Agent Runtime Readiness Checklist

> Gate ID: QG-M3 (Agent Runtime Readiness)
> Agent runtime MUST pass before module development begins.
> Gate definition: verifies AI runtime infrastructure is operational before module development.
> Workflow integration: this checklist is the final step of the `bam-agent-runtime-architecture` workflow.
> Executing workflow: `bam-agent-runtime-architecture` (final step)

## Orchestration

- [ ] Orchestration pattern documented and justified
- [ ] Agent topology defined
- [ ] AI runtime patterns verified against current best practices

## Tool Registry

- [ ] Tool catalog structure implemented
- [ ] All tools registered with schemas
- [ ] Permission model implemented
- [ ] Policy engine operational

## Memory Tiers

- [ ] Session memory store configured
- [ ] User memory store configured
- [ ] Tenant memory store configured
- [ ] Global memory store configured (if needed)
- [ ] Scope enforcement implemented

## Approval Workflow

- [ ] Approval triggers defined
- [ ] Queue implementation complete
- [ ] Timeout handling implemented
- [ ] Escalation rules configured

## Evaluation Foundation

- [ ] Metric definitions complete
- [ ] Threshold configuration available
- [ ] Golden task template ready

## Kill Switch

- [ ] Feature flag integration complete
- [ ] Circuit breaker configured
- [ ] Manual override mechanism available

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All items checked — Module development enabled |
| **CONDITIONAL** | Only non-critical items unchecked — Proceed with documented mitigation plan |
| **FAIL** | Any critical item unchecked — Block module development, enter recovery protocol |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

## Waiver Process

For non-critical items that cannot be addressed:
1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (Product Owner or Technical Lead)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

## Critical vs Non-Critical Classification

| Category                         | Classification | CONDITIONAL Threshold | FAIL Threshold |
| -------------------------------- | -------------- | --------------------- | -------------- |
| Tool Registry                    | CRITICAL       | Schema validation partial | No tool registry |
| Memory Tiers (scope enforcement) | CRITICAL       | Scope enforcement partial | Memory scope leak |
| Kill Switch                      | CRITICAL       | Circuit breaker partial | No kill switch |
| Orchestration                    | CRITICAL       | Pattern undocumented | No orchestration defined |
| Approval Workflow                | Non-critical   | Timeout handling missing | N/A |
| Evaluation Foundation            | Non-critical   | Thresholds undefined | N/A |

## Recovery Protocol

**If gate triggers CONDITIONAL or FAIL status:**

1. **Attempt 1:** Address identified runtime gaps (target: 1-2 days)
   - Review failed checks and identify root cause (tool registry misconfiguration, memory scope violation, kill switch wiring issue)
   - Run `bmad-bam-agent-runtime-architecture` workflow to audit runtime configuration
   - Verify tool registration schemas and permission policies
   - Test memory tier scope enforcement with isolation tests
   - Re-run QG-M3 validation
   - **Lock passed categories**

2. **Attempt 2:** Deeper runtime investigation (target: 1 week)
   - Engage AI Runtime Architect (Nova) for architecture review
   - Review orchestration pattern against runtime requirements
   - Audit memory store configurations for all tiers (session, user, tenant, global)
   - Verify circuit breaker and feature flag integration
   - Test approval workflow escalation paths
   - Apply corrective measures and re-run validation
   - **Preserve locked categories**

3. **Mandatory Course Correction:**
   - Escalate to project leadership and Platform Architect
   - Document runtime blockers in ADR (Architecture Decision Record)
   - Reassess AI runtime selection if pattern fundamentally incompatible
   - Consider phased module development with reduced agent capabilities

**Category-Specific Recovery:**

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Orchestration | Document and justify orchestration pattern; verify agent topology definition | No orchestration pattern defined or pattern undocumented |
| Tool Registry | Implement tool catalog structure; register all tools with schemas | No tool registry or schema validation fails |
| Memory Tiers | Configure all memory stores (session, user, tenant, global); implement scope enforcement | Memory scope leak detected or tier misconfigured |
| Approval Workflow | Define approval triggers; implement queue and timeout handling | High-risk actions bypass approval or timeout handling missing |
| Evaluation Foundation | Complete metric definitions; configure thresholds; prepare golden task template | Thresholds undefined blocking quality measurement |
| Kill Switch | Integrate feature flags; configure circuit breaker; implement manual override | Kill switch non-functional or circuit breaker misconfigured |

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Runtime configuration
- `bmad-bam-validate-tool-contract` - Tool registry validation
- `bmad-bam-ai-agent-debug` - Runtime debugging

## Web Research Verification

- [ ] Search the web: "AI agent orchestration patterns {date}" - Verify orchestration best practices
- [ ] Search the web: "multi-tenant agent memory isolation patterns {date}" - Confirm memory tier patterns are current
- [ ] _Source: [URL]_ citations documented for key runtime decisions

**PASS CRITERIA:** All checkboxes completed
**OWNER:** AI Runtime Architect
**REVIEWERS:** Platform Architect, Security
