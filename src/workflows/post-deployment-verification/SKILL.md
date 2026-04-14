---
name: post-deployment-verification
displayName: Post-Deployment Verification
description: 'Verify deployment success with smoke tests, monitoring activation, tenant health checks, and rollback readiness for multi-tenant AI platforms'
module: bam
tags: [operations, deployment, verification, monitoring]
---

# Post-Deployment Verification

## Overview

This workflow provides comprehensive post-deployment verification for multi-tenant AI platforms. It covers smoke test execution, monitoring activation verification, per-tenant health checks, and rollback readiness validation. Run immediately after any production or staging deployment.

Act as a DevOps Engineer specializing in multi-tenant SaaS deployment validation and observability.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- After deploying to production or staging environments
- Validating deployment success before traffic switch
- Verifying monitoring and alerting activation
- Ensuring rollback capability is ready

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Execute new post-deployment verification | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing verification checklist | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against QG-PD1 criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Deployment completed successfully
- Access to monitoring systems
- **Config required:** `{tenant_model}`, `{ai_runtime}`

## Outputs

- `{output_folder}/operations/post-deployment-verification-report.md`
- `{output_folder}/operations/tenant-health-status.md`
- `{output_folder}/operations/rollback-readiness-checklist.md`

## Quality Gates

This workflow contributes to:
- **QG-PD1** (Post-Deployment Gate) - Primary gate for deployment verification
- **QG-P1** (Production Readiness) - Post-deployment verification required for production sign-off

### Entry Gate
- Deployment pipeline completed successfully
- Infrastructure provisioning complete

### Exit Gate
- QG-PD1 checklist items verified:
  - [ ] Smoke tests passing for all critical paths
  - [ ] Monitoring dashboards active
  - [ ] Alerting rules verified
  - [ ] Tenant health checks passing
  - [ ] Rollback procedure tested

## Related Workflows

- `bmad-bam-tenant-health-monitoring` - Ongoing health monitoring
- `bmad-bam-tenant-aware-observability` - Observability setup
- `bmad-bam-disaster-recovery-drill` - DR testing including rollback
