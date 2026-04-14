# AI Security Audit

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Generate new AI security audit | `step-01-c-*` through `step-06-c-*` |
| **Edit** | Update existing audit | `step-10-e-*` through `step-12-e-*` |
| **Validate** | Verify security controls | `step-20-v-*` through `step-23-v-*` |

Default: **Create** mode unless audit report exists.

## Create Mode

Follow Create steps sequentially:
1. `step-01-c-audit-model-security.md` - Audit model security controls
2. `step-02-c-audit-inference-endpoints.md` - Audit inference endpoint protection
3. `step-03-c-test-prompt-injection.md` - Test prompt injection defenses
4. `step-04-c-audit-data-leakage.md` - Audit data leakage prevention
5. `step-05-c-review-access-controls.md` - Review AI access controls
6. `step-06-c-generate-report.md` - Generate security audit report

## Edit Mode

Follow Edit steps:
1. `step-10-e-load-artifact.md` - Load existing audit
2. `step-11-e-apply-changes.md` - Apply changes and update findings
3. `step-12-e-regenerate-report.md` - Regenerate report

## Validate Mode

Follow Validate steps:
1. `step-20-v-load-artifact.md` - Load audit report
2. `step-21-v-validate.md` - Run validation checks
3. `step-22-v-generate-report.md` - Generate validation report
4. `step-23-v-generate-gate-decision.md` - Generate QG-S4 gate decision
