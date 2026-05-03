# Architecture Governance

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Generate new ADR | `step-01-c-*` through `step-05-c-*` |
| **Edit** | Modify existing ADR | `step-10-e-*` through `step-11-e-*` |
| **Validate** | Check documentation | `step-20-v-*` through `step-22-v-*` |

Default: **Create** mode unless decision log exists.

## Create Mode

1. **step-01-c-start** - Gather decision context
2. **step-05-c-document** - Generate decision record

## Edit Mode

1. **step-10-e-load** - Load existing decision log
2. **step-11-e-apply** - Apply requested changes

## Validate Mode

1. **step-22-v-report** - Generate governance report
