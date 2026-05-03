# MCP Server Configuration

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Generate new config | `step-01-c-*` through `step-05-c-*` |
| **Edit** | Modify existing config | `step-10-e-*` through `step-11-e-*` |
| **Validate** | Check configuration | `step-20-v-*` through `step-22-v-*` |

Default: **Create** mode unless config exists.

## Create Mode

1. **step-01-c-start** - Gather requirements
2. **step-02-c-server** - Design server architecture
3. **step-03-c-isolation** - Configure tenant isolation
4. **step-04-c-tools** - Define tool discovery
5. **step-05-c-document** - Generate configuration

## Edit Mode

1. **step-10-e-load** - Load existing configuration
2. **step-11-e-apply** - Apply requested changes

## Validate Mode

1. **step-20-v-load** - Load configuration
2. **step-21-v-check** - Validate against patterns
3. **step-22-v-report** - Generate report
