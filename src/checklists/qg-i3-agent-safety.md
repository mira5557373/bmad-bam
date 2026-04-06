# QG-I3: Agent Safety Verification Checklist

> Agent safety MUST pass before release candidate.
> Gate definition: verifies all AI agent safety controls are operational and tested.
> Workflow integration: BAM `convergence-verification` feeds into this gate; TEA `tea-trace` executes formal sign-off.
> Executing workflow: `tea-trace` (extended with agent checks)
>
> **TEA Handoff:** BAM `convergence-verification` workflow (Steps 2-3) performs
> the cross-module agent safety checks that feed into this gate. Once convergence
> passes, TEA `tea-trace` executes this checklist for formal gate sign-off.
> Sequence: convergence-verification → tea-trace (QG-I3) → release decision.

## EU AI Act Compliance

- [ ] All AI features classified by risk level (minimal/limited/high/unacceptable)
- [ ] High-risk features have required documentation
- [ ] Transparency requirements met (AI-generated content labeled)
- [ ] Human oversight mechanisms in place for high-risk features

## Tool Restrictions

- [ ] Unauthorized tool access blocked
- [ ] Tenant-scoped tool access enforced
- [ ] Approval-required tools trigger approval
- [ ] Tool sandbox (E2B) prevents escape

## Guardrails Verification

- [ ] Input guardrails tested with adversarial prompts (prompt injection, jailbreak)
- [ ] Output guardrails tested (PII leakage, harmful content, hallucination)
- [ ] Tool guardrails tested (sandbox escape, permission escalation)
- [ ] Cost guardrails tested (budget exceeded → graceful denial)

## Fallback/Refusal Behavior

- [ ] Graceful degradation works
- [ ] Refusal messages appropriate
- [ ] Escalation to human works

## Approval Flow

- [ ] High-risk actions trigger approval
- [ ] Timeout handling works
- [ ] Approval audit logged

## Evaluation Results

- [ ] Golden tasks pass thresholds (relevance ≥0.8, faithfulness ≥0.9)
- [ ] No regression from baseline
- [ ] Safety tests pass (injection, PII, harmful content)
- [ ] Latency SLOs met (agent response p95 < target)

## Data Privacy

- [ ] PII masking verified in Langfuse traces
- [ ] No PII in application logs
- [ ] Tenant data not used to train models (unless explicit consent)
- [ ] Memory (Mem0) respects tenant isolation and GDPR deletion

## Kill Switch

- [ ] Feature flag disables agent
- [ ] Circuit breaker triggers on failure rate
- [ ] Manual override works

## Gate Decision

- ALL items checked: PASS — Release candidate approved for agent safety
- ANY critical item unchecked: FAIL — Block release, enter recovery protocol
- Only non-critical items unchecked: CONDITIONAL PASS — Proceed with documented mitigation plan

## Critical vs Non-Critical Classification

| Category                  | Classification                                        |
| ------------------------- | ----------------------------------------------------- |
| Tool Restrictions         | CRITICAL                                              |
| Guardrails Verification   | CRITICAL                                              |
| Kill Switch               | CRITICAL                                              |
| Data Privacy              | CRITICAL                                              |
| EU AI Act Compliance      | CRITICAL (for EU deployments)                         |
| Evaluation Results        | Non-critical (can proceed with documented exceptions) |
| Fallback/Refusal Behavior | Non-critical                                          |
| Approval Flow             | Non-critical (can proceed with manual approvals)      |

**PASS CRITERIA:** All checkboxes completed
**OWNER:** TEA (+ AI Quality & Safety)
**REVIEWERS:** AI Runtime Architect, Security
