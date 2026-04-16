# Quality Gate Automation

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Design gate automation | `step-01-c-*` through `step-05-c-*` |
| **Edit** | Update automation | `step-10-e-*` through `step-11-e-*` |
| **Validate** | Verify automation | `step-20-v-*` through `step-22-v-*` |

Default: **Create** mode unless automation exists.

## Phase 5 - Quality Automation

This workflow provides **automated quality enforcement** for Phase 5 by integrating quality gates into CI/CD pipelines.

### Create Mode

1. `step-01-c-map-gates-to-pipeline` - Map gates to pipeline stages
2. `step-02-c-design-automated-checks` - Design automated gate checks
3. `step-03-c-configure-thresholds` - Configure pass/fail thresholds
4. `step-04-c-define-bypass-policy` - Define bypass policies
5. `step-05-c-generate-pipeline-config` - Generate CI/CD configuration

### Edit Mode

1. `step-10-e-load-existing` - Load existing configuration
2. `step-11-e-apply-changes` - Apply updates

### Validate Mode

1. `step-20-v-load-artifact` - Load configuration
2. `step-21-v-validate` - Verify automation
3. `step-22-v-generate-report` - Generate report
