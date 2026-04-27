---
name: bmad-bam-tenant-isolation
description: 'Design tenant isolation implementation'
module: bam
tags: [quality-gate, workflow]
---

# Tenant Isolation

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Quality Gate

**Gate:** QG-M2

## Overview



## Prerequisites


- [ ] Master architecture document exists with tenant model selected
- [ ] User has access to compliance requirements
- [ ] Tenant tier definitions available (Free, Pro, Enterprise)

## Outputs


- Complete tenant isolation design document
- **Output to:** `{output_folder}/planning-artifacts/tenant-isolation.md`

## Related Workflows

- `bmad-bam-agent-runtime-architecture`
- `bmad-bam-convergence-verification`
- `bmad-bam-create-module-architecture`
- `bmad-bam-validate-foundation`

## Domain References

- `{project-root}/_bmad/bam/data/agent-guides/bam/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
