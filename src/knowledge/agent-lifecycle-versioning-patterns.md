# Agent Lifecycle Versioning Patterns

## Principle

Agent versions are bundles, not individual components. A version bundle pins agent definition, model, prompts, tools, and eval thresholds as a single atomic unit.

## Rationale

Changing a model version without updating eval thresholds leads to silent quality degradation. Changing prompts without re-running regression tests leads to behavioral drift. Bundle versioning ensures all components are validated together before promotion.

## Deployment Strategy Matrix

| Deployment Strategy | Use Case                             | Rollback Time              | Module Boundary                 |
| ------------------- | ------------------------------------ | -------------------------- | ------------------------------- |
| Blue-green          | Major version (new model, new graph) | Instant (traffic switch)   | agent-registry to orchestration |
| Canary              | Minor version (prompt tweaks)        | Under 30s (traffic weight) | agent-registry                  |
| Shadow              | Pre-release validation               | N/A (never serves)         | agent-registry to evaluation    |
| Pinned              | Enterprise tenant version lock       | N/A (tenant controls)      | tenant-config to agent-registry |

## Version Change Impact Matrix

| Change Type                      | Backward Compatible | Regression Suite              | Promotion Path                        |
| -------------------------------- | ------------------- | ----------------------------- | ------------------------------------- |
| Prompt template update           | Yes                 | Golden dataset only           | testing, canary, active               |
| Model version bump (same family) | Usually             | Full suite                    | testing, shadow, canary, active       |
| Model family change              | No                  | Full suite plus manual review | testing, shadow, HITL, canary, active |
| Tool version bump (minor)        | Yes                 | Tool-specific tests           | testing, active                       |
| Graph topology change            | No                  | Full suite                    | testing, shadow, canary, active       |

## Behavioral Regression Gate

Bundle promotion requires passing all five categories:

| Test Category           | Threshold                        | Failure Action  |
| ----------------------- | -------------------------------- | --------------- |
| Golden dataset          | 95 percent or higher similarity  | Block promotion |
| Edge case corpus        | 0 regressions                    | Block promotion |
| Safety suite            | 100 percent pass                 | Block promotion |
| Performance benchmark   | Within 10 percent of baseline    | Block promotion |
| Cross-model consistency | Cosine similarity 0.90 or higher | Block promotion |

## Version Bundle Lifecycle

- Semantic versioning: major (breaking), minor (behavioral), patch (config)
- In-flight runs are never version-switched; they complete on their original bundle
- Tenants can pin to a specific bundle version (enterprise feature)
- Promotion gates require passing 5 test categories before active status

## Anti-Patterns

| Anti-Pattern                                       | Problem                              | Correct Approach                            |
| -------------------------------------------------- | ------------------------------------ | ------------------------------------------- |
| Deploying model updates without regression testing | Silent quality degradation           | Full regression suite before any promotion  |
| Switching in-flight runs to new version            | Semantic inconsistency mid-execution | In-flight runs complete on original bundle  |
| Updating components independently                  | Untested combinations in production  | Bundle all components and validate together |
| No shadow deployment for model family changes      | Unknown behavioral impact            | Shadow, HITL review, canary, active         |

## Cross-Reference

- S4.6.1: Agent lifecycle versioning, behavioral regression gate
- S28.17: run-contract-patterns (budget, capabilities per version)

See also: run-contract-patterns.md, agent-resilience-patterns.md, agent-data-governance-patterns.md
