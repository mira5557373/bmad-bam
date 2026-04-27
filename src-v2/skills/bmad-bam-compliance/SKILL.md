---
name: bmad-bam-compliance
description: 'Map compliance requirements'
module: bam
tags: [workflow]
---

# Compliance

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Overview

 Initialize compliance design by loading compliance frameworks and identifying applicable regulatory requirements for the multi-tenant SaaS platform. 

## Prerequisites


- Master architecture defined (QG-F1 passed)
- Tenant model selected: `{tenant_model}`
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` (all frameworks)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`

**Web Research (Required):**

Search the web: "multi-tenant SaaS compliance requirements {date}"
Search the web: "GDPR SOC2 HIPAA PCI-DSS SaaS architecture {date}"

## Outputs


- Complete compliance design document at `{output_folder}/planning-artifacts/compliance-design.md`
- Implementation roadmap with milestones
- Compliance risk matrix
- Control-to-framework mapping

## Related Workflows

- `bmad-bam-convergence`
- `bmad-bam-data-residency`
- `bmad-bam-security`
- `bmad-bam-tenant-isolation`

## Domain References

- `{project-root}/_bmad/bam/data/domains/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
