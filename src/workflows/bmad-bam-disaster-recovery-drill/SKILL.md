---
name: bmad-bam-disaster-recovery-drill
displayName: Disaster Recovery Drill
description: 'Execute disaster recovery drills including DR plan execution, failover testing, recovery validation, and RTO/RPO verification for multi-tenant AI platforms'
module: bam
tags: [operations, disaster-recovery, resilience, testing]
---

# Disaster Recovery Drill

## Overview

This workflow provides comprehensive disaster recovery drill execution for multi-tenant AI platforms. It covers DR plan execution, failover testing, recovery validation, and RTO/RPO measurement. Run on a regular schedule (quarterly recommended) or before major releases.

Act as an SRE Engineer specializing in multi-tenant SaaS disaster recovery and business continuity.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Executing scheduled disaster recovery drills
- Testing failover procedures
- Validating recovery time objectives (RTO/RPO)
- Preparing for compliance audits requiring DR evidence

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Execute new DR drill | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing drill results | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against QG-DR1 criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- DR plan documentation
- DR environment access
- **Config required:** `{tenant_model}`, `{ai_runtime}`

## Outputs

- `{output_folder}/operations/dr-drill-report.md`
- `{output_folder}/operations/failover-test-results.md`
- `{output_folder}/operations/rto-rpo-measurements.md`

## Quality Gates

This workflow contributes to:
- **QG-DR1** (Disaster Recovery Gate) - Primary gate for DR verification
- **QG-P1** (Production Readiness) - DR capability required for production

### Entry Gate
- DR plan documentation exists
- DR environment available for testing

### Exit Gate
- QG-DR1 checklist items verified:
  - [ ] DR plan executed successfully
  - [ ] Failover tested and validated
  - [ ] Recovery validated with data integrity
  - [ ] RTO/RPO within targets

## Related Workflows

- `bmad-bam-disaster-recovery-design` - DR architecture design
- `bmad-bam-tenant-backup-restore` - Tenant backup/restore operations
- `bmad-bam-post-deployment-verification` - Includes rollback testing
