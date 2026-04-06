# Module Readiness Checklist: {module_name}

> Gate ID: QG-S1/QG-S2 (Module Architecture & Implementation Readiness)
> Each module must pass readiness checks before stories can be implemented.
> Covers module architecture completeness, epic/story scoping, and dependency satisfaction.
> Gate failure recovery: resolve blocking items before enabling module sprint.

## Prerequisites

- [ ] Foundation gate passed
- [ ] All dependency modules have facade contracts

## Architecture

- [ ] Module architecture document created
- [ ] Module architecture inherits master-architecture
- [ ] Entities defined with tenant_id
- [ ] Public facade designed
- [ ] Dependencies explicitly declared
- [ ] No forbidden dependencies

## Epics & Stories

- [ ] Module epics created
- [ ] Stories are module-scoped (no cross-module implementation)
- [ ] Stories reference facade contracts for dependencies

## Module Status

- [ ] Module registered in sprint-status.yaml
- [ ] Module status set to 'in-progress'
- [ ] Dependency status shows all 'satisfied'

## Gate Decision

| Classification | Criteria |
|---------------|----------|
| **PASS** | All CRITICAL items pass, ≥80% of non-critical items pass |
| **CONDITIONAL** | All CRITICAL items pass, <80% of non-critical items pass — remediation plan required |
| **FAIL** | Any CRITICAL item fails — block until resolved |

## Critical vs Non-Critical Classification

| Category                                            | Classification |
| --------------------------------------------------- | -------------- |
| Prerequisites (foundation gate, dependency facades) | CRITICAL       |
| Architecture (facade, dependencies)                 | CRITICAL       |
| Epics & Stories completeness                        | Non-critical   |
| Module Status registration                          | Non-critical   |

## Recovery Protocol

If this gate fails, refer to the relevant recovery workflow or escalation procedure.
