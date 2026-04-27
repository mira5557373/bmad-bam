---
name: bmad-bam-billing
description: 'Design billing and metering system'
module: bam
tags: [workflow]
---

# Billing

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Overview

 Initialize the billing design workflow by loading tier configurations, referencing billing patterns, and identifying the appropriate pricing models for the multi-tenant SaaS platform. - Master architecture document exists at `{output_folder}/planning-artifacts/master-architecture.md` 

## Prerequisites


- Master architecture document exists at `{output_folder}/planning-artifacts/master-architecture.md`
- Tenant model selection complete (`{tenant_model}` configured)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter: `billing-*`
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`



Load the standard tier definitions for multi-tenant SaaS:

## Outputs


- **Primary:** `{output_folder}/planning-artifacts/billing-design.md`
- Revenue recognition design
- Compliance requirements documentation
- Analytics and reporting specifications


**Create mode complete.**

To validate the billing design, run validation mode:

## Related Workflows



## Domain References

- `{project-root}/_bmad/bam/data/domains/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
