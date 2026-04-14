# Quality Metrics Dashboard

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Design new dashboard | `step-01-c-*` through `step-05-c-*` |
| **Edit** | Update dashboard | `step-10-e-*` through `step-11-e-*` |
| **Validate** | Verify dashboard | `step-20-v-*` through `step-22-v-*` |

Default: **Create** mode unless dashboard exists.

## Phase 5 - Quality Visibility

This workflow provides **quality visibility** for Phase 5 by designing dashboards that surface:
- Real-time quality gate status
- Test coverage trends
- Compliance scores
- Tenant-specific quality metrics

### Create Mode

1. `step-01-c-define-metrics` - Define quality metrics to track
2. `step-02-c-design-visualizations` - Design dashboard visualizations
3. `step-03-c-configure-alerts` - Configure quality alerts
4. `step-04-c-tenant-filtering` - Add tenant-specific filtering
5. `step-05-c-generate-spec` - Generate dashboard specification

### Edit Mode

1. `step-10-e-load-existing` - Load existing dashboard
2. `step-11-e-apply-changes` - Apply updates

### Validate Mode

1. `step-20-v-load-artifact` - Load dashboard spec
2. `step-21-v-validate` - Verify completeness
3. `step-22-v-generate-report` - Generate validation report
