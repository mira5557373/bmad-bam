# Development Trigger

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Handle development event | `step-01-c-*` |
| **Edit** | Modify trigger configuration | `step-10-e-*` |
| **Validate** | Validate trigger setup | `step-20-v-*` |

Default: **Create** mode for event handling.

### Create Mode
Follow Create steps: step-01-c-handle-dev-event

### Edit Mode
Used to modify the trigger configuration: step-10-e-modify-config

### Validate Mode
Used to validate the trigger setup: step-20-v-validate-setup

## Trigger Events

This workflow is triggered by:
- Code commit (pre-commit hooks)
- Pull request creation
- Code review completion
