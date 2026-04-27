---
name: bmad-bam-tenant-offboarding
description: 'Design tenant offboarding workflow'
module: bam
tags: [workflow]
---

# Tenant Offboarding

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Overview

 Initialize the tenant offboarding design by loading the tenant model configuration, identifying compliance requirements, and cataloging all offboarding triggers. This step establishes the foundation for designing a compliant, safe tenant deprovisioning process. 

## Prerequisites


- Master architecture with tenant model defined
- Tenant isolation strategy documented
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-lifecycle
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **Load template:** `{project-root}/_bmad/bam/data/templates/tenant-offboarding.md`

## Outputs


- `{output_folder}/planning-artifacts/tenant-offboarding-design.md`
- Executive summary
- Complete state machine diagram
- Compliance verification checklist
- Rollback procedures
- **Load template:** `{project-root}/_bmad/bam/data/templates/tenant-offboarding.md`

## Related Workflows

- `bmad-bam-convergence`
- `bmad-bam-tenant-isolation`
- `bmad-bam-tenant-onboarding`

## Domain References

- `{project-root}/_bmad/bam/data/domains/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
