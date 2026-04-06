# QG-M3: Agent Runtime Readiness Checklist

> Agent runtime MUST pass before module development begins.
> Gate definition: verifies AI runtime infrastructure is operational before module development.
> Workflow integration: this checklist is the final step of the `bam-agent-runtime-architecture` workflow.
> Executing workflow: `bam-agent-runtime-architecture` (final step)

## Orchestration

- [ ] Orchestration pattern documented and justified
- [ ] Agent topology defined

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

- ALL items checked: PASS — Module development enabled
- ANY critical item unchecked: FAIL — Block module development, enter recovery protocol
- Only non-critical items unchecked: CONDITIONAL PASS — Proceed with documented mitigation plan

## Critical vs Non-Critical Classification

| Category                         | Classification                                   |
| -------------------------------- | ------------------------------------------------ |
| Tool Registry                    | CRITICAL                                         |
| Memory Tiers (scope enforcement) | CRITICAL                                         |
| Kill Switch                      | CRITICAL                                         |
| Orchestration                    | CRITICAL                                         |
| Approval Workflow                | Non-critical (can proceed with manual approvals) |
| Evaluation Foundation            | Non-critical (can proceed with basic metrics)    |

**PASS CRITERIA:** All checkboxes completed
**OWNER:** AI Runtime Architect
**REVIEWERS:** Platform Architect, Security
