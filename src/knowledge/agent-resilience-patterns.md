# Agent Resilience Patterns

## Principle

Agent runs must survive infrastructure failures, model outages, and partial worker failures without losing completed work or semantic consistency. Resilience is a first-class concern at the orchestration layer.

## Rationale

Unlike stateless HTTP requests, agent runs are long-lived, stateful, and expensive. A failure at step 47 of 50 should not require re-running from step 1. The 2026 architecture treats resilience as a first-class concern — checkpoint-based recovery, semantic alignment on failover, and graceful scope reduction.

## Failure Response Decision Matrix

| Failure Mode            | Detection                            | Automatic Response                                                            | Escalation                                           | Module Boundary                      |
| ----------------------- | ------------------------------------ | ----------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------ |
| Mid-run model failover  | LLM gateway timeout/5xx              | Failover to secondary provider; context compiler re-compiles for target model | HITL if semantic alignment score <0.85               | `ai-runtime` → `llm-gateway`         |
| Partial fan-out failure | Worker timeout or error              | Retry failed worker; if retry fails, check `min_success_ratio`                | HITL if <50% workers succeed                         | `orchestration` module               |
| Semantic crash recovery | Pod OOM/node failure                 | Restore from LangGraph checkpoint + context compilation log                   | HITL if checkpoint >5min stale                       | `orchestration` → `checkpoint-store` |
| Scope reduction trigger | Budget 80% consumed at <50% progress | Drop optional steps (priority < `required`)                                   | Notify user if >30% steps dropped                    | `orchestration` → `billing`          |
| DR for in-flight runs   | Region/AZ failure                    | Resume from replicated checkpoint in surviving region                         | Manual if cross-region replication lag >1 checkpoint | `infrastructure` → `orchestration`   |

## Recovery Strategy by Severity

| Failure Type              | Severity | Automatic Recovery                             | HITL Escalation Trigger     |
| ------------------------- | -------- | ---------------------------------------------- | --------------------------- |
| Single model timeout      | Low      | Retry once, then failover                      | Never (automatic)           |
| Provider outage           | Medium   | Failover to secondary                          | If no secondary available   |
| Worker failure in fan-out | Medium   | Retry worker; partial results if threshold met | If <50% workers succeed     |
| OOM crash                 | High     | Checkpoint restore + context re-compilation    | If checkpoint >5min stale   |
| Region failure            | Critical | Cross-region checkpoint resume                 | If replication lag detected |

## Checkpoint and Recovery Architecture

- Mid-run failover requires semantic alignment — the replacement model must understand where the previous model left off
- Fan-out partial failure uses `min_success_ratio` from the run contract to decide accept vs retry
- Crash recovery restores from LangGraph checkpoint + context compilation log (not just checkpoint)
- Scope reduction is the preferred degradation strategy over hard failure

## Scope Reduction Strategy

When budget is consumed faster than progress:

1. Identify optional steps (priority < `required` in run contract)
2. Drop optional steps in reverse priority order
3. Notify user if >30% of steps are dropped
4. Complete remaining required steps within budget
5. Report partial completion with dropped step list

## Anti-Patterns

| Anti-Pattern                            | Problem                                            | Correct Approach                                  |
| --------------------------------------- | -------------------------------------------------- | ------------------------------------------------- |
| Restarting entire run on any failure    | Wastes budget, time, produces inconsistent results | Resume from latest checkpoint                     |
| No semantic alignment check on failover | Replacement model may misinterpret context         | Check alignment score; HITL if <0.85              |
| Ignoring partial fan-out results        | All-or-nothing wastes successful worker output     | Use `min_success_ratio` to accept partial results |
| Hard failure instead of scope reduction | User gets nothing instead of partial results       | Drop optional steps, complete required ones       |

## Cross-Reference

- S4.6.1: Agent resilience decision matrix
- S28.17: run-contract-patterns (budget propagation, scope bounds)

See also: run-contract-patterns.md, agent-lifecycle-versioning-patterns.md, context-compiler-patterns.md
