# Convergence Verification

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Generate new convergence report | `step-01-c-*` through `step-05-c-*` |
| **Edit** | Modify existing convergence report | `step-10-e-*` through `step-11-e-*` |
| **Validate** | Check convergence against QG-I2/I3 criteria | `step-20-v-*` through `step-22-v-*` |

Default: **Create** mode unless convergence report exists.

## Create Mode

Generate a new convergence verification report. Follow steps sequentially:

1. **step-01-c-start** - Load all module architectures and facades
2. **step-02-c-analyze** - Analyze cross-module integration points (QG-I1)
3. **step-03-c-design** - Verify tenant isolation across boundaries (QG-I2)
4. **step-04-c-document** - Verify agent safety across boundaries (QG-I3)
5. **step-05-c-complete** - Compile convergence report with gate decisions

## Edit Mode

Modify an existing convergence report. Follow steps sequentially:

1. **step-10-e-load** - Load existing convergence report
2. **step-11-e-apply** - Apply updates to gate decisions or findings

## Validate Mode

Validate an existing convergence report against quality gate criteria:

1. **step-20-v-load** - Load report and QG-I2/I3 checklists
2. **step-21-v-validate** - Execute convergence validation checks
3. **step-22-v-report** - Generate final validation report

## Quality Gate Outcomes

| Outcome | Description | Next Step |
|---------|-------------|-----------|
| PASS | All gates pass | Proceed to production readiness (QG-P1) |
| CONDITIONAL | All critical pass, some standard gaps | Document mitigations, proceed with monitoring |
| FAIL | Any critical check fails | Enter recovery protocol, address blockers |

## Recovery Protocol

On FAIL outcome:
1. **Attempt 1:** Fix issues, re-run validation (1-2 days)
2. **Attempt 2:** Deep investigation with architect review (1 week)
3. **Mandatory Course Correction:** Escalate to leadership
