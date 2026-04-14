# BAM Testing Agent Safety Guide

**When to load:** During Phase 4 (Implementation) or Phase 5 (Quality) when designing test strategies for AI agents, validating guardrails, or conducting adversarial testing.

**Integrates with:** QA agent, Dev agent, Security agent

---

## Core Concepts

### Safety Testing Dimensions

| Dimension | Test Type | Purpose |
|-----------|-----------|---------|
| Behavioral | Deterministic | Verify predictable agent responses |
| Robustness | Stochastic | Validate consistency under variation |
| Security | Adversarial | Detect prompt injection vulnerabilities |
| Compliance | Guardrail | Ensure policy enforcement |
| Boundary | Edge case | Test limits and unusual inputs |
| Recovery | Failure mode | Validate graceful degradation |

### Safety Testing Philosophy

Testing AI agents requires a fundamentally different approach than traditional software testing. Agents exhibit non-deterministic behavior, make autonomous decisions, and interact with external tools in ways that can have real-world consequences. Safety testing must address both the correctness of agent outputs and the prevention of harmful or unauthorized actions.

The multi-tenant context adds additional complexity. Tests must verify that agents cannot access data belonging to other tenants, that tenant-specific configurations are correctly applied, and that resource limits are enforced across tenant boundaries.

### Safety Testing Pipeline

```
+------------------------------------------------------------------+
|  +----------+   +----------+   +----------+   +----------+       |
|  |Determin- |-->|Stochastic|-->|Adversar- |-->|Guardrail |       |
|  |istic     |   |Tests     |   |ial Tests |   |Verify    |       |
|  +----------+   +----------+   +----------+   +----------+       |
|                       |                                           |
|                       v                                           |
|  +----------+   +----------+   +----------+                      |
|  |Regression|-->| Chaos    |-->| Audit    |                      |
|  |Suite     |   | Testing  |   | Logging  |                      |
|  +----------+   +----------+   +----------+                      |
+------------------------------------------------------------------+
```

### Test Environment Isolation

Each safety test environment must be fully isolated to prevent test contamination and ensure reproducible results. This includes separate database instances, isolated message queues, and dedicated mock services for external dependencies.

---

## Application Guidelines

When implementing agent safety testing:

1. **Test deterministic behavior first**: Verify agents select correct tools and parse parameters before testing stochastic behavior
2. **Include adversarial testing**: Attempt prompt injection and jailbreak attacks as part of the test suite
3. **Verify tenant isolation**: Test that agents cannot access data from other tenants
4. **Validate guardrail enforcement**: Confirm run contracts and safety policies are applied
5. **Run regression tests on every change**: Agent behavior should not degrade with updates

---

## Deterministic Testing

| Category | Description | Validation |
|----------|-------------|------------|
| Tool invocation | Correct tool selection | Exact match |
| Parameter extraction | Accurate parsing | Input/output pairs |
| Response format | Structure compliance | Schema validation |
| Tenant context | Proper isolation | No cross-tenant data |
| Permission enforcement | Authorization checks | Role-based access |
| State transitions | Valid workflow steps | State machine verification |
| Error handling | Graceful failures | Exception coverage |

### Implementation Guidelines

Deterministic tests should use fixed seeds for any randomization, mock all external services, and validate exact outputs against golden files. Test fixtures must include both positive cases and expected failure scenarios.

---

## Stochastic Testing

| Metric | Acceptable Range | Sample Size |
|--------|------------------|-------------|
| Task success rate | > 95% | 100+ runs |
| Response consistency | > 90% semantic match | 50+ runs |
| Tool selection accuracy | > 98% correct | 100+ runs |
| Recovery rate | > 99% | 100+ runs |
| Hallucination rate | < 2% | 200+ runs |
| Latency variance | < 20% std dev | 100+ runs |

### Variance Analysis

Track statistical distributions of agent behavior over multiple runs. Unexpected variance may indicate unstable prompts, model drift, or environmental factors affecting reliability.

---

## Adversarial Red Teaming

| Category | Technique | Detection Method |
|----------|-----------|------------------|
| Prompt injection | Malicious instructions | Output scanning |
| Jailbreaking | Bypass constraints | Policy violation checks |
| Data exfiltration | Extract tenant data | Cross-tenant detection |
| Tool abuse | Unauthorized invocation | Permission audit |
| Context manipulation | Misleading history | Session integrity checks |
| Resource exhaustion | Infinite loops | Timeout enforcement |
| Privilege escalation | Role confusion | Authorization logging |

### Red Team Process

Conduct regular red team exercises with documented attack scenarios. Maintain a catalog of known attack patterns and verify defenses against each. New vulnerabilities discovered should be added to the regression test suite immediately.

---

## Guardrail Verification

| Guardrail Type | Verification Method |
|----------------|---------------------|
| Input validation | Schema + content filter |
| Output filtering | Pattern matching + LLM judge |
| Tool restrictions | Permission check audit |
| Rate limiting | Counter validation |

---

## Related Patterns

- `safety-testing` pattern in `bam-patterns.csv`
- `ai-runtime.md` guide for AI runtime architecture
- `tenant-testing.md` guide for tenant isolation testing
- `qg-i3-agent-safety.md` checklist for agent safety verification
- `agent-test-report-template.md` for output documentation

Load from pattern registry:
- `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `testing-agent-safety`
- `{project-root}/_bmad/bam/data/ai-runtimes.csv` → runtime configurations

### Web Research

For current best practices, use the `web_queries` column from the pattern registry:

| Pattern | Web Search Query |
|---------|------------------|
| `testing-agent-safety` | `AI agent safety testing multi-tenant SaaS {date}` |
| `testing-agent-safety` | `LLM testing patterns multi-tenant SaaS {date}` |

**Note:** Replace `{date}` with the current year for up-to-date results.

---

## Decision Framework

| Question | Recommendation |
|----------|----------------|
| New agent capability? | Full deterministic + stochastic coverage |
| Security-sensitive feature? | Mandatory red team before release |
| Cross-tenant interaction? | Isolation tests at every layer |
| Production incident? | Add regression test to adversarial suite |
| Model update planned? | Re-run full safety suite |
| Prompt modification? | Verify guardrails still effective |
| Tool permission change? | Audit all affected workflows |

---

## Related Workflows

- `bmad-bam-ai-eval-safety-design` - Design comprehensive agent safety evaluation framework
- `bmad-bam-convergence-verification` - Verify agent behavior meets safety requirements
- `bmad-bam-ai-agent-debug` - Debug agent safety failures and violations

---

## Testing Cadence

| Test Type | Frequency | Trigger |
|-----------|-----------|---------|
| Deterministic | Every commit | CI/CD pipeline |
| Stochastic | Daily | Scheduled job |
| Adversarial | Weekly | Security review |
| Full safety suite | Before release | Release gate |
