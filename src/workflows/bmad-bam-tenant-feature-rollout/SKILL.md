---
name: bmad-bam-tenant-feature-rollout
displayName: Tenant Feature Rollout
description: 'Design tenant-specific feature rollout strategies including canary releases, feature flags, and tier-based access'
module: bam
tags: [operations, tenant, feature-flags]
---

# Tenant Feature Rollout

## Overview

This workflow designs feature rollout strategies for multi-tenant platforms. It covers canary deployments, tenant-specific feature flags, tier-based feature access, and rollback procedures.

Act as a Platform Engineer specializing in feature management and progressive delivery for multi-tenant SaaS.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Designing canary deployment strategies for tenant features
- Creating tenant-specific feature flag systems
- Building tier-based feature access controls
- Planning rollback procedures for feature releases

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new feature rollout design | `step-01-c-*` to `step-05-c-*` |
| Edit | Modify existing design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Tenant tier model
- Tenant isolation matrix
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/operations/feature-rollout-design.md`
- `{output_folder}/planning-artifacts/operations/feature-flag-spec.md`

## Quality Gates

This workflow contributes to:
- **QG-M2** (Tenant Isolation) - Validates feature flags respect tenant boundaries
- **QG-P1** (Production) - Feature rollout required for safe deployments

### Entry Gate
- QG-F1 (Foundation) must pass
- Tenant tier model exists

### Exit Gate
- Feature rollout strategy documented
- Rollback procedures defined

## Related Workflows

- `bmad-bam-tenant-tier-migration` - Tier-based feature access
- `bmad-bam-api-version-release` - API version rollout
- `bmad-bam-tenant-health-monitoring` - Rollout impact monitoring
