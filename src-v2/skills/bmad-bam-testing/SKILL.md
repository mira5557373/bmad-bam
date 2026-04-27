---
name: bmad-bam-testing
description: 'Design testing strategy'
module: bam
tags: [workflow]
---

# Testing

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Overview



## Prerequisites


- [ ] Master architecture document exists with tenant model selected
- [ ] Tenant isolation design document exists (preferred but not required)
- [ ] TEA integration status known from config

## Outputs


- **Primary:** `{output_folder}/planning-artifacts/testing-strategy.md`
- **Frontmatter:** Version, tenant model, TEA status, gate statuses
- **Sections:** All 11 sections as documented above

## Related Workflows



## Domain References

- `{project-root}/_bmad/bam/data/agent-guides/bam/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
