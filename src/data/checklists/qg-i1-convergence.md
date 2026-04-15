# QG-I1: Cross-Module Convergence Checklist

> Gate ID: QG-I1 (Cross-Module Convergence)
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
- [ ] Integration patterns validated with recent sources

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

| Classification | Criteria |
|----------------|----------|
| **PASS** | All items checked — Proceed to QG-I2 and QG-I3 |
| **CONDITIONAL** | Only non-critical items unchecked — Proceed with documented mitigation plan |
| **FAIL** | Any critical item unchecked — Block regression, resolve integration issues |
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

| Category                         | Classification | CONDITIONAL Threshold | FAIL Threshold |
| -------------------------------- | -------------- | --------------------- | -------------- |
| Facade Contract Stability        | CRITICAL       | RC versions present | Breaking changes |
| Cross-Module Journey Integration | CRITICAL       | Journey partial | Dependency violation |
| Event Flow Verification          | CRITICAL       | Event schema drift | Breaking event change |
| Data Consistency                 | Non-critical   | Eventual consistency slow | N/A |
| Integration Test Coverage        | Non-critical   | Coverage <80% | N/A |

## Recovery Protocol

**If gate triggers CONDITIONAL or FAIL status:**

1. **Attempt 1:** Address identified integration gaps (target: 1-2 days)
   - Review failed checks and identify root cause (facade mismatch, event schema drift, dependency violation)
   - Run `bmad-bam-facade-mismatch-recovery` workflow for contract issues
   - Re-validate affected cross-module journeys
   - Re-run QG-I1 validation
   - **Lock passed categories**

2. **Attempt 2:** Deeper integration investigation (target: 1 week)
   - Engage Integration Architect (Kai) for cross-module analysis
   - Review dependency graph for hidden circular dependencies
   - Audit event flow traces using observability tools
   - Verify facade contract versioning and migration paths
   - Apply corrective measures and re-run validation
   - **Preserve locked categories**

3. **Mandatory Course Correction:**
   - Escalate to project leadership and Platform Architect
   - Document integration blockers in ADR (Architecture Decision Record)
   - Reassess module boundaries if convergence repeatedly fails
   - Consider staged rollout with feature flags for problematic integrations

**Category-Specific Recovery:**

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Facade Contract Stability | Run `bmad-bam-facade-mismatch-recovery` workflow; verify contract versioning and migration paths | Breaking changes detected without migration path |
| Cross-Module Journey Integration | Review dependency graph for circular dependencies; verify facade-only communication | Module depends on another module's internals |
| Event Flow Verification | Audit event schemas for backward compatibility; configure dead-letter handling | Breaking event schema change without major version |
| Data Consistency | Test saga compensations; document eventual consistency windows | Cross-module transaction failures or data corruption |
| Integration Test Coverage | Execute contract tests for all facades; run full regression suite with tea-automate | Coverage falls below 80% or contract tests fail |

## Related Workflows

- `bmad-bam-facade-mismatch-recovery` - Contract alignment issues
- `bmad-bam-convergence-verification` - Full re-validation
- `bmad-bam-define-facade-contract` - Contract redesign if needed

## Required Templates

- `{project-root}/_bmad/bam/data/templates/contract-test-plan-template.md` - Module contract verification testing
- `{project-root}/_bmad/bam/data/templates/convergence-report-template.md` - Convergence verification report

## Web Research Verification

- [ ] Search the web: "cross-module integration testing patterns {date}" - Verify integration test strategies
- [ ] Search the web: "event-driven architecture convergence verification {date}" - Confirm event flow patterns are current
- [ ] _Source: [URL]_ citations documented for key integration decisions

**PASS CRITERIA:** All checkboxes completed
**OWNER:** Integration Architect (Kai)
**REVIEWERS:** Platform Architect, AI Runtime Architect
