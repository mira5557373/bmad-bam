# Tenant Fair Scheduling

Design fair resource scheduling to prevent noisy neighbor issues. Use when the user requests to 'design fair scheduling' or 'prevent noisy neighbors' or 'design resource quotas'.

## Quick Reference

- **Owner:** Platform Architect (Atlas)
- **Domain:** tenant
- **Complexity:** moderate
- **Headless:** Yes

## Purpose

Prevent noisy neighbor issues by designing fair resource scheduling mechanisms that ensure no single tenant can monopolize shared resources (compute, memory, I/O) at the expense of other tenants.

## Mode Detection

| Condition | Mode |
|-----------|------|
| No existing fair-scheduling artifact | Create |
| User says "update" or "modify" scheduling | Edit |
| User says "check" or "validate" scheduling | Validate |

## Execution Flow

### Create Mode (Steps 01-05)

1. **Resource Analysis** - Analyze compute/memory/IO resource patterns
2. **Scheduling Strategy** - Define fair scheduling algorithms (weighted fair queue, token bucket)
3. **Quota Enforcement** - Design per-tenant quota enforcement
4. **Isolation Mechanisms** - Configure cgroups, namespaces, resource limits
5. **Monitoring Alerts** - Set up noisy neighbor detection and alerting

### Edit Mode (Steps 10-11)

1. **Load Config** - Load existing fair scheduling configuration
2. **Apply Changes** - Apply targeted modifications

### Validate Mode (Steps 20-22)

1. **Load Config** - Load existing fair scheduling configuration
2. **Validate** - Check against quality criteria
3. **Report** - Generate validation report

## Quality Gates

- **Entry:** QG-M2 (Tenant Isolation) - Tenant model must be defined
- **Exit:** QG-I2 (Tenant Safety) - Scheduling must prevent tenant interference

## Output Artifacts

- `{output_folder}/planning-artifacts/tenant-fair-scheduling.md`
