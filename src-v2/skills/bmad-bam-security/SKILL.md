---
name: bmad-bam-security
description: 'Design security architecture'
module: bam
tags: [workflow]
---

# Security

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Overview

 Initialize the security architecture design process by loading compliance requirements, threat model baseline, and identifying security domains for multi-tenant SaaS. 

## Prerequisites


- Master architecture document available (QG-F1 passed)
- Tenant model selected (`{tenant_model}` configured)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: security-*
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

## Outputs


- **Primary:** `{output_folder}/planning-artifacts/security-design.md`
- Security architecture diagram
- Threat mitigation matrix
- Penetration test requirements

## Related Workflows



## Domain References

- `{project-root}/_bmad/bam/data/domains/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
