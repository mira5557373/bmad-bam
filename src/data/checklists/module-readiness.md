# QG-S1: Module Readiness Checklist: {module_name}

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

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Prerequisites (foundation gate, dependency facades) | CRITICAL | Foundation partial | Foundation gate failed |
| Architecture (facade, dependencies) | CRITICAL | Minor facade gaps | No facade designed |
| Epics & Stories completeness | Non-critical | Stories incomplete | N/A |
| Module Status registration | Non-critical | Status not updated | N/A |

## Web Research Verification

- [ ] Search the web: "module readiness sprint planning best practices {date}" - Verify sprint readiness criteria
- [ ] Search the web: "multi-tenant module dependency management patterns {date}" - Confirm dependency patterns are current
- [ ] _Source: [URL]_ citations documented for key readiness decisions

## Recovery Protocol

**If QG-S1/QG-S2 fails:**

1. **Attempt 1:** Immediate readiness remediation (target: 1-2 days)
   - Verify foundation gate has passed
   - Check all dependency modules have facade contracts
   - Update module architecture document if incomplete
   - Ensure entities have tenant_id defined
   - Register module in sprint-status.yaml
   - Re-run QG-S1/QG-S2 validation after fixes
   - **Lock passed categories** — do not re-test locked items

2. **Attempt 2:** Deep readiness investigation (target: 2-3 days)
   - Engage Platform Architect for architecture review
   - Validate facade dependencies are satisfied
   - Review epic and story scoping for cross-module issues
   - Verify no forbidden dependencies exist
   - Confirm dependency status shows 'satisfied'
   - Re-run validation after remediation
   - **Preserve locked categories** from Attempt 1

3. **Mandatory Course Correction:**
   - Escalate to Tech Lead and project leadership
   - Document readiness blockers in ADR
   - Conduct sprint planning review session
   - Consider story rescoping or dependency renegotiation
   - Create remediation plan with stakeholder sign-off
   - Schedule follow-up validation within 1 week

**Category-Specific Recovery:**

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Prerequisites | Re-validate foundation gate, check facades | Foundation gate failed |
| Architecture | Complete module architecture document | No facade designed |
| Epics & Stories | Scope stories to module boundary | Cross-module implementation |
| Module Status | Register module, update dependencies | Status not 'in-progress' |

## Related Workflows

- `validate-foundation` - Foundation gate validation
- `create-module-architecture` - Module architecture creation
- `create-module-epics` - Epic and story creation
- `define-facade-contract` - Facade contract definition

**PASS CRITERIA:** All CRITICAL checkboxes completed, module ready for sprint
**OWNER:** BAM
**REVIEWERS:** Tech Lead, Product Owner
