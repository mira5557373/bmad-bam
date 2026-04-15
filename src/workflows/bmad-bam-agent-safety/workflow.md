# Agent Safety Validation

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Generate new safety validation report | `step-01-c-*` through `step-05-c-*` |
| **Edit** | Update existing validation | `step-10-e-*` through `step-12-e-*` |
| **Validate** | Verify safety controls against criteria | `step-20-v-*` through `step-23-v-*` |

Default: **Create** mode unless validation report exists.

## Create Mode

Follow Create steps sequentially:
1. `step-01-c-assess-guardrails.md` - Assess input/output guardrails
2. `step-02-c-test-budget-enforcement.md` - Test budget and quota enforcement
3. `step-03-c-validate-kill-switch.md` - Validate kill switch functionality
4. `step-04-c-run-adversarial-tests.md` - Run adversarial/red team tests
5. `step-05-c-generate-report.md` - Generate safety validation report

## Edit Mode

Follow Edit steps:
1. `step-10-e-load-artifact.md` - Load existing validation report
2. `step-11-e-apply-changes.md` - Apply updates to test results
3. `step-12-e-regenerate-report.md` - Regenerate report

## Validate Mode

Follow Validate steps:
1. `step-20-v-load-artifact.md` - Load safety report
2. `step-21-v-validate.md` - Run agent safety validation checks
3. `step-22-v-generate-report.md` - Generate validation report
4. `step-23-v-generate-gate-decision.md` - Generate QG-I3 gate decision
