---
name: bmad-bam-data-residency
description: 'Design data residency patterns'
module: bam
tags: [workflow]
---

# Data Residency

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Overview

 Initialize the data residency design by loading tenant model configuration, compliance requirements, and identifying target geographic regions for data storage and processing. 

## Prerequisites


- Master architecture document completed
- Tenant model isolation document exists
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: data-residency
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` → filter: GDPR, CCPA, LGPD

## Outputs


- Complete data residency design document
- **Output to:** `{output_folder}/planning-artifacts/data-residency-design.md`

## Related Workflows



## Domain References

- `{project-root}/_bmad/bam/data/agent-guides/bam/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
