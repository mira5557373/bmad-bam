# Monthly Operations Trigger

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Initialize monthly review | `step-01-c-*` |
| **Edit** | Modify monthly schedule | `step-10-e-*` |
| **Validate** | Validate monthly setup | `step-20-v-*` |

Default: **Create** mode for scheduled execution.

### Create Mode
Follow Create steps: step-01-c-initiate-monthly-review

### Edit Mode
Used to modify the monthly schedule: step-10-e-modify-schedule

### Validate Mode
Used to validate the review configuration: step-20-v-validate-setup

## Trigger Schedule

This workflow is triggered:
- Automatically on the 1st of each month
- Manually when off-cycle reviews are needed
