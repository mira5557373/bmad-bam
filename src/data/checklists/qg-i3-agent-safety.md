# QG-I3: Agent Safety Verification Checklist

> Gate ID: QG-I3 (Agent Safety Verification)
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

## AI Security Testing

### Prompt Injection Testing Verification

- [ ] Direct prompt injection attacks tested (role override, instruction bypass)
- [ ] Indirect prompt injection tested (malicious content in retrieved documents)
- [ ] Jailbreak resistance verified (DAN, roleplay attacks, encoding tricks)
- [ ] System prompt extraction attempts blocked
- [ ] Multi-turn conversation manipulation tested
- [ ] Context window poisoning attacks verified
- [ ] Prompt delimiter bypass attempts blocked
- [ ] Nested instruction attacks tested

### Adversarial Input Detection

- [ ] Input anomaly detection active (statistical deviation from normal inputs)
- [ ] Suspicious pattern recognition enabled (base64, unicode tricks, obfuscation)
- [ ] Rate limiting on unusual input patterns
- [ ] Input complexity bounds enforced (max tokens, nesting depth)
- [ ] Character encoding normalization applied
- [ ] Homoglyph attack detection active
- [ ] Invisible character detection enabled
- [ ] Input source verification (prevents forged context injection)

### Model Extraction Prevention

- [ ] Response rate limiting prevents model probing
- [ ] Confidence score exposure minimized
- [ ] Logprob access restricted or disabled
- [ ] Token-by-token streaming monitored for extraction patterns
- [ ] Query pattern analysis detects systematic probing
- [ ] Model fingerprinting attempts logged and blocked
- [ ] Embedding extraction prevented
- [ ] Training data membership inference attacks mitigated

### Output Filtering Validation

- [ ] PII detection and redaction in outputs verified
- [ ] Harmful content filtering active (violence, illegal, self-harm)
- [ ] Copyright/licensed content detection enabled
- [ ] Hallucination confidence scoring implemented
- [ ] Citation and source attribution verified where applicable
- [ ] Output format validation prevents injection into downstream systems
- [ ] Code output sandboxing verified (no arbitrary execution)
- [ ] Sensitive business logic not exposed in explanations
- [ ] Competitor information disclosure prevented
- [ ] Financial/legal advice disclaimers enforced

### Kill Switch Testing

- [ ] Emergency agent shutdown completes in <100ms
- [ ] In-flight requests terminate gracefully on kill
- [ ] Agent memory cleared on emergency shutdown
- [ ] Active tool executions cancelled on kill
- [ ] Downstream systems notified of agent termination
- [ ] Kill switch works without network connectivity
- [ ] Kill switch cannot be overridden by agent
- [ ] Audit log captures kill switch activation
- [ ] Recovery from kill state requires human authorization
- [ ] Kill switch tested under load conditions

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All items checked — Release candidate approved for agent safety |
| **CONDITIONAL** | Only non-critical items unchecked — Proceed with documented mitigation plan |
| **FAIL** | Any critical item unchecked — Block release, enter recovery protocol |
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

| Category                      | Classification | CONDITIONAL Threshold | FAIL Threshold |
| ----------------------------- | -------------- | --------------------- | -------------- |
| Tool Restrictions             | CRITICAL       | Partial enforcement | Unauthorized tool access |
| Guardrails Verification       | CRITICAL       | Guardrails partial | Guardrail bypass detected |
| Kill Switch                   | CRITICAL       | Response >100ms | Kill switch non-functional |
| Data Privacy                  | CRITICAL       | PII masking partial | PII exposure detected |
| EU AI Act Compliance          | CRITICAL       | Documentation gaps | Classification missing |
| Prompt Injection Testing      | CRITICAL       | Test coverage <80% | Injection attack succeeds |
| Adversarial Input Detection   | CRITICAL       | Detection partial | No anomaly detection |
| Model Extraction Prevention   | Non-critical   | Rate limiting partial | N/A |
| Output Filtering Validation   | CRITICAL       | Filter coverage partial | Harmful content passes |
| Kill Switch Testing           | CRITICAL       | Tests incomplete | Kill switch fails under load |
| Evaluation Results            | Non-critical   | Below threshold | N/A |
| Fallback/Refusal Behavior     | Non-critical   | Refusals inconsistent | N/A |
| Approval Flow                 | Non-critical   | Timeout handling partial | N/A |

## Required Templates

The following templates must be completed before this gate can pass:

| Template | Purpose | Location |
|----------|---------|----------|
| `agent-runtime-template.md` | AI agent runtime configuration | `{output_folder}/planning-artifacts/` |
| `ai-eval-safety-template.md` | Safety evaluation criteria | `{output_folder}/planning-artifacts/` |
| `guardrail-config-template.md` | Guardrail configuration | `{output_folder}/planning-artifacts/` |
| `kill-switch-template.md` | Kill switch procedures | `{output_folder}/operations/` |
| `tool-permissions-template.md` | Tool permission matrix | `{output_folder}/planning-artifacts/` |
| `golden-tasks-template.md` | Evaluation golden tasks | `{output_folder}/testing/` |

## Recovery Protocol

**If gate triggers CONDITIONAL or FAIL status:**

1. **Attempt 1:** Address identified agent safety gaps (target: 1-2 days)
   - Review failed checks and identify root cause (guardrail bypass, tool permission leak, kill switch failure)
   - Run `bmad-bam-ai-agent-debug` workflow to trace safety violations
   - Execute adversarial prompt injection tests for failed guardrail checks
   - Verify kill switch functionality in isolated environment
   - Re-run QG-I3 validation
   - **Lock passed categories**

2. **Attempt 2:** Deeper agent safety investigation (target: 1 week)
   - Engage AI Runtime Architect (Nova) and Security team
   - Review tool permission matrix for unauthorized access patterns
   - Audit agent memory scopes for cross-tenant leakage
   - Test EU AI Act compliance for high-risk feature classifications
   - Update guardrail configurations based on adversarial findings
   - Apply corrective measures and re-run validation
   - **Preserve locked categories**

3. **Mandatory Course Correction:**
   - Escalate to project leadership, CISO, and AI Ethics review board
   - Document agent safety blockers in ADR (Architecture Decision Record)
   - Reassess agent capabilities if safety repeatedly fails
   - Implement kill switch activation for problematic agent features until remediated
   - Consider rollback to previous agent version if critical safety gaps persist

**Category-Specific Recovery:**

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| EU AI Act Compliance | Review risk classifications; ensure high-risk documentation complete | High-risk features lack required documentation or human oversight |
| Tool Restrictions | Audit tool permission matrix; verify tenant-scoped access enforcement | Unauthorized tool access or sandbox escape detected |
| Guardrails Verification | Test with adversarial prompts; verify input/output/tool guardrails | Guardrail bypass allows harmful content or PII leakage |
| Data Privacy | Verify PII masking in Langfuse; audit memory isolation | PII detected in logs or cross-tenant memory access |
| Kill Switch | Test feature flag disables agent; verify circuit breaker thresholds | Kill switch fails to disable agent within 100ms |
| Prompt Injection Testing | Execute full injection test suite; verify delimiter handling | Any prompt injection attack succeeds |
| Adversarial Input Detection | Enable anomaly detection; configure pattern recognition | Suspicious patterns bypass detection |
| Output Filtering Validation | Verify PII redaction; test harmful content filtering | PII or harmful content passes through filters |
| Kill Switch Testing | Test emergency shutdown under load; verify memory clearing | Kill switch fails under load conditions |

## Required Templates

- `{project-root}/_bmad/bam/data/templates/agent-safety-report-template.md` - Agent safety verification report
- `{project-root}/_bmad/bam/data/templates/ai-eval-safety-template.md` - AI evaluation safety framework
- `{project-root}/_bmad/bam/data/templates/guardrail-config-template.md` - Guardrail configuration
- `{project-root}/_bmad/bam/data/templates/kill-switch-template.md` - Kill switch design
- `{project-root}/_bmad/bam/data/templates/tool-permissions-template.md` - Tool permission matrix

## Related Workflows

- `bmad-bam-ai-agent-debug` - Agent safety debugging
- `bmad-bam-agent-runtime-architecture` - Runtime safety configuration
- `validate-tool-contract` - Tool permission validation
- `tea-trace` - Formal agent safety verification

## Web Research Verification

- [ ] Search the web: "AI agent safety guardrails best practices {date}" - Verify guardrail patterns
- [ ] Search the web: "prompt injection prevention techniques {date}" - Confirm security measures are current
- [ ] Search the web: "EU AI Act compliance agentic AI {date}" - Verify regulatory compliance requirements
- [ ] _Source: [URL]_ citations documented for key agent safety decisions

**PASS CRITERIA:** All checkboxes completed
**OWNER:** TEA (+ AI Quality & Safety)
**REVIEWERS:** AI Runtime Architect, Security
