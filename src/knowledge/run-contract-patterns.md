# Run Contract Patterns

## Principle

Every agent execution is governed by a run contract that defines objective, budget, capabilities, and success criteria. No agent runs without a contract — even simple single-step tasks get one for audit trail and budget ceiling.

## Rationale

Without run contracts, agents operate with unbounded scope — consuming unlimited tokens, accessing any tool, and running indefinitely. Run contracts make agent execution auditable, budgetable, and governable. They are the primary mechanism for cost control, scope enforcement, and delegation chains in multi-agent systems.

## Run Contract Field Reference

| Field                  | Type           | Required | Description                      | Module Boundary                |
| ---------------------- | -------------- | -------- | -------------------------------- | ------------------------------ |
| `id`                   | UUID           | Yes      | Unique run identifier            | AI runtime shared-kernel       |
| `tenant_id`            | UUID           | Yes      | Owning tenant                    | Shared-kernel tenant context   |
| `objective`            | string         | Yes      | What the agent must accomplish   | AI runtime facade input        |
| `success_criteria`     | list[string]   | Yes      | Measurable completion conditions | AI runtime facade input        |
| `budget`               | RunBudget      | Yes      | Token, cost, time limits         | Billing module facade          |
| `risk_class`           | enum           | Yes      | low/medium/high/critical         | AI runtime policy engine       |
| `allowed_capabilities` | list[string]   | No       | Tool whitelist                   | Tool registry (S22.6)          |
| `orchestration_mode`   | enum           | No       | Override mode selection          | AI runtime orchestration layer |
| `parent_run_id`        | UUID           | No       | For nested delegation            | AI runtime shared-kernel       |
| `approval_policy`      | ApprovalPolicy | No       | HITL escalation rules            | Approval queue (S4.6)          |

**Module boundary rule:** Run contracts are created through the AI runtime facade. Other modules interact with run contracts only through facade methods — never by direct DB access.

## Orchestration Mode Selection Matrix

| Signal           | Direct | Manager-Workers    | Evaluator-Optimizer   | Federated       |
| ---------------- | ------ | ------------------ | --------------------- | --------------- |
| Risk class       | low    | medium             | high/critical         | any             |
| Estimated steps  | 1-3    | 4-15               | 2-10 (iterative)      | any             |
| Tool diversity   | ≤3     | >3, parallelizable | ≤5, quality-sensitive | External agents |
| Success criteria | Simple | Composite          | Quality threshold     | Cross-org       |

## Budget Propagation Rules

Child runs inherit proportional budget from parent:

- One owner per run — exactly one supervisor agent is responsible
- Budget propagation — child runs inherit proportional budget from parent
- Scope bounds — max orchestration depth, max workers, capability whitelist
- Success criteria — measurable conditions evaluated post-run

## Cost Metering Integration

| Cost Granularity | Metering Source                     | Billing Event          | Module Boundary             |
| ---------------- | ----------------------------------- | ---------------------- | --------------------------- |
| Run level        | Aggregated from steps               | `agent.run.cost.final` | `billing` → `orchestration` |
| Step level       | LLM gateway token count + tool cost | `agent.step.cost`      | `llm-gateway` → `billing`   |
| Worker level     | Per-worker in fan-out               | `agent.worker.cost`    | `orchestration` → `billing` |

**Orchestration Mode Multipliers:** `single_agent` 1.0x, `chain` 1.0x, `fan_out` 1.1x, `evaluator_optimizer` 1.0x/iteration, `hierarchical` 1.15x.

## Decision Matrix — Run Contract vs Ad-Hoc Execution

| Factor           | Run Contract                    | Ad-Hoc              |
| ---------------- | ------------------------------- | ------------------- |
| Budget control   | Enforced per-step               | None                |
| Audit trail      | Complete lineage                | Partial logs        |
| Scope control    | Whitelist capabilities          | All available       |
| HITL integration | Built-in pause/resume           | Manual intervention |
| Multi-agent      | Delegation with child contracts | Uncoordinated       |
| Cost attribution | Per-run, per-step, per-worker   | Aggregate only      |

## HITL Integration

| HITL Trigger            | Approval Queue Behavior                     | Resume Behavior                                       |
| ----------------------- | ------------------------------------------- | ----------------------------------------------------- |
| High-risk action        | Queue with action details + risk assessment | Approved → execute; Rejected → scope reduction        |
| Budget threshold        | Queue with cost projection                  | Approved → extend budget; Rejected → complete partial |
| Consent required        | Queue with data scope description           | Granted → proceed; Denied → skip operation            |
| Quality below threshold | Queue with output + quality score           | Approved → accept; Rejected → re-run                  |

## Verification Criteria (Foundation Gate)

- [ ] Run contract enforcement operational — every agent execution creates a contract
- [ ] Budget ceiling enforced — runs terminate when budget exhausted
- [ ] Capability whitelist enforced — tools outside whitelist are blocked
- [ ] Parent-child delegation chain tracked — nested runs link to parent
- [ ] Audit trail complete — every contract decision logged regardless of outcome

## Anti-Patterns

| Anti-Pattern                                | Problem                                             | Correct Approach                                          |
| ------------------------------------------- | --------------------------------------------------- | --------------------------------------------------------- |
| Executing agents without run contracts      | No budget ceiling, no audit trail, no scope control | Always create a contract, even for single-step tasks      |
| Sharing run contracts across tenants        | Tenant isolation violation                          | One contract per tenant per execution                     |
| Allowing child runs to exceed parent budget | Budget leak through delegation                      | Child budget ≤ remaining parent budget                    |
| Hardcoding orchestration mode               | Ignores task characteristics                        | Use selection matrix based on risk, steps, tool diversity |

## Cross-Reference

- S4.6.1: Run contract field reference, orchestration mode selection matrix
- S28.9: agent-runtime-patterns (orchestration, memory, error handling)

See also: agent-runtime-patterns.md, agent-resilience-patterns.md, action-gateway-patterns.md, context-compiler-patterns.md
