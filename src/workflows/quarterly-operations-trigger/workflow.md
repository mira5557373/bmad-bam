# Quarterly Operations Trigger

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Initialize quarterly review cycle | `step-01-c-*` |
| **Edit** | Modify existing quarterly schedule | `step-10-e-*` |
| **Validate** | Validate quarterly review setup | `step-20-v-*` |

Default: **Create** mode for scheduled execution.

### Create Mode
Follow Create steps: step-01-c-initiate-quarterly-review

### Edit Mode
Used to modify the quarterly schedule: step-10-e-modify-schedule

### Validate Mode
Used to validate the review configuration: step-20-v-validate-setup

## Trigger Schedule

This workflow is triggered:
- Automatically every quarter (Q1: Jan, Q2: Apr, Q3: Jul, Q4: Oct)
- Manually when off-cycle reviews are needed
- As entry point for operational quality gates
