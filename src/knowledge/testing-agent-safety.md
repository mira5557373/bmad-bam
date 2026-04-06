# Testing Agent Safety Patterns

## Principle

Agent safety tests verify that AI agents operate within their defined boundaries:
budget limits, tool restrictions, memory isolation, guardrail enforcement, and
kill switch responsiveness.

## Rationale

Agents are autonomous actors that can consume resources, access tools, and produce
outputs without direct human oversight per action. Safety testing ensures that
governance controls actually work under adversarial and edge-case conditions.

## Safety Test Categories

| Category                     | What It Tests                                   | Quality Gate |
| ---------------------------- | ----------------------------------------------- | ------------ |
| Tool restriction enforcement | Agent cannot use tools outside whitelist        | QG-I3        |
| Budget ceiling enforcement   | Agent stops when budget exhausted               | QG-I3        |
| Memory isolation             | Agent cannot access other tenants' memory       | QG-I2        |
| Guardrail enforcement        | NeMo guardrails block prohibited content        | QG-I3        |
| Kill switch responsiveness   | Agent stops within SLA when killed              | QG-I3        |
| Data privacy compliance      | No PII leakage across tenant boundaries         | QG-I3        |
| Approval workflow            | High-risk actions route to approval queue       | QG-I3        |
| Fallback behavior            | Agent degrades gracefully on dependency failure | QG-I3        |

## Tool Restriction Test Matrix

| Test Case             | Setup                               | Action                       | Expected Result           |
| --------------------- | ----------------------------------- | ---------------------------- | ------------------------- |
| Whitelist enforcement | Run contract with 3 allowed tools   | Agent attempts tool #4       | Action gateway blocks     |
| Tier-based filtering  | FREE tenant                         | Agent requests PRO-only tool | Tool not in filtered list |
| Sandbox routing       | Tool with `sandbox_required: true`  | Agent invokes tool           | Execution routed to E2B   |
| Approval routing      | Tool with `approval_required: true` | Agent invokes tool           | Routed to approval queue  |

## Budget Enforcement Tests

| Test Case                | Setup                                     | Action                                    | Expected Result                |
| ------------------------ | ----------------------------------------- | ----------------------------------------- | ------------------------------ |
| Token budget exhaustion  | Run with 1000 token budget                | Agent consumes 1000 tokens                | Run terminates gracefully      |
| Cost budget exhaustion   | Run with $0.10 budget                     | Agent reaches cost limit                  | Run terminates with cost event |
| Time budget exhaustion   | Run with 60s timeout                      | Agent exceeds timeout                     | Run terminates with timeout    |
| Child budget propagation | Parent with 5000 tokens, child delegation | Child attempts to exceed parent remaining | Child blocked at parent limit  |

## Guardrail Test Patterns

| Test Case                     | Input                                      | Expected Guardrail Action    |
| ----------------------------- | ------------------------------------------ | ---------------------------- |
| Prohibited content generation | Prompt engineering attack                  | Output blocked by NeMo       |
| PII in output                 | Agent generates response with PII          | Presidio detects and redacts |
| Injection attempt             | Malicious tool input                       | Input guardrail blocks       |
| Trust tier violation          | Unverified content in instruction position | Context compiler rejects     |

## Kill Switch Tests

| Test Case         | Trigger                               | Expected Behavior                    | SLA                 |
| ----------------- | ------------------------------------- | ------------------------------------ | ------------------- |
| Manual kill       | Admin disables agent via feature flag | Agent stops accepting new runs       | Immediate           |
| Automatic kill    | Repeated failures exceed threshold    | Circuit breaker activates            | Within 3 failures   |
| Graceful shutdown | Kill during active run                | Current step completes, no new steps | Within step timeout |

## Anti-Patterns

| Anti-Pattern                      | Problem                         | Correct Approach                                |
| --------------------------------- | ------------------------------- | ----------------------------------------------- |
| Testing safety only in unit tests | Misses integration-level bypass | Integration tests with real action gateway      |
| No adversarial testing            | Only tests happy path           | Include prompt injection, boundary violations   |
| Skipping kill switch tests        | Unknown recovery time           | Test kill switch SLA in every release           |
| No budget exhaustion tests        | Runaway agent costs             | Test all three budget types (token, cost, time) |

## Integration Points

- Section 9.6: AI Quality and Safety
- Section 13.1: Quality Gates (QG-I3)
- Section 12.2.1: AI Output Validation Criteria

See also: agent-runtime-patterns.md, run-contract-patterns.md, action-gateway-patterns.md, tool-execution-middleware.md
