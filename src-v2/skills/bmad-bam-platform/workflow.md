# Platform Architecture

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Generate new architecture | `step-01-c-*` through `step-05-c-*` |
| **Edit** | Modify existing architecture | `step-10-e-*` through `step-11-e-*` |
| **Validate** | Check architecture | `step-20-v-*` through `step-22-v-*` |

Default: **Create** mode unless architecture exists.

## Create Mode

1. **step-01-c-start** - Gather platform extensibility requirements
2. **step-05-c-document** - Generate platform architecture using template

## Edit Mode

1. **step-10-e-load** - Load existing architecture
2. **step-11-e-apply** - Apply requested changes

## Validate Mode

1. **step-22-v-report** - Generate validation report
