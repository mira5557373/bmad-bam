# QG-I1: Cross-Module Convergence Checklist

> Cross-module convergence MUST pass before full regression testing.
> Gate definition: verifies all cross-module interfaces are stable and integration-tested.
> Workflow integration: this checklist is the final step of the `bam-convergence-verification` workflow.
> Executing workflow: `bam-convergence-verification`
>
> **Sequence:** Module sprints complete → convergence-verification (QG-I1) →
> tea-trace (QG-I2, QG-I3) → release decision (QG-R1).
> QG-I1 is a prerequisite for QG-I2 and QG-I3.

## Facade Contract Stability

- [ ] All facade contracts at stable version (no draft/RC versions)
- [ ] No breaking changes pending without migration path
- [ ] Contract tests pass for all published facades
- [ ] All facade methods accept TenantContext as first parameter
- [ ] Return types are DTOs (no domain entity leakage)

## Cross-Module Journey Integration

- [ ] All shared user journeys decomposed into module-scoped tasks
- [ ] Cross-module stories tested end-to-end
- [ ] No module depends on another module's internals (facade-only)
- [ ] Dependency graph has zero circular dependencies
- [ ] Forbidden dependency rules enforced (no violations)

## Event Flow Verification

- [ ] All cross-module events follow backward-compatibility rules (S28.5)
- [ ] Event schemas validated (no breaking changes without major version)
- [ ] Event consumers handle unknown fields gracefully
- [ ] Event ordering guarantees documented and tested
- [ ] Dead-letter handling configured for failed events

## Data Consistency

- [ ] Cross-module data references use IDs (not embedded entities)
- [ ] Saga compensations tested for all cross-module transactions
- [ ] Eventual consistency windows documented and acceptable
- [ ] No shared database tables between modules (shared kernel excepted)

## Integration Test Coverage

- [ ] Contract tests exist for every published facade
- [ ] Integration tests cover all cross-module journeys
- [ ] Regression test suite passes (tea-automate)
- [ ] Test quality audit passed (tea-test-review)

## Gate Decision

- ALL items checked: PASS — Proceed to QG-I2 and QG-I3
- ANY critical item unchecked: FAIL — Block regression, resolve integration issues
- Only non-critical items unchecked: CONDITIONAL PASS — Proceed with documented mitigation plan

## Critical vs Non-Critical Classification

| Category                         | Classification                                        |
| -------------------------------- | ----------------------------------------------------- |
| Facade Contract Stability        | CRITICAL                                              |
| Cross-Module Journey Integration | CRITICAL                                              |
| Event Flow Verification          | CRITICAL                                              |
| Data Consistency                 | Non-critical (can proceed with documented exceptions) |
| Integration Test Coverage        | Non-critical                                          |

**PASS CRITERIA:** All checkboxes completed
**OWNER:** Integration Architect (Kai)
**REVIEWERS:** Platform Architect, AI Runtime Architect
