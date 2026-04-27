---
name: bmad-bam-tenant-onboarding
description: 'Design tenant onboarding workflow'
module: bam
tags: [workflow]
---

# Tenant Onboarding

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Overview

 Initialize the tenant onboarding design workflow by loading tenant model configuration, referencing the pattern registry, and identifying provisioning requirements per tier. 

## Prerequisites


- Master Architecture document exists with tenant model decision
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-lifecycle
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`
- **Load guide:** `{project-root}/_bmad/bam/data/domains/onboarding.md`

## Outputs


- Complete tenant onboarding design document
- Output location: `{output_folder}/planning-artifacts/tenant-onboarding-design.md`

## Related Workflows

- `bmad-bam-convergence-verification`
- `bmad-bam-production-readiness`
- `bmad-bam-tenant-billing-integration`
- `bmad-bam-tenant-model-isolation`
- `bmad-bam-tenant-offboarding-design`

## Domain References

- `{project-root}/_bmad/bam/data/domains/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
