---
name: bmad-bam-module-architecture
description: 'Design individual module architecture'
module: bam
tags: [quality-gate, workflow]
---

# Module Architecture

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Quality Gate

**Gate:** QG-M1

## Overview



## Prerequisites


- [ ] Master architecture document exists with module inventory
- [ ] Bounded contexts defined for each module
- [ ] Tenant model selected (RLS, schema, database, hybrid)
- [ ] Integration patterns identified at master architecture level

## Outputs



## Related Workflows

- `bmad-bam-convergence-verification`
- `bmad-bam-define-facade-contract`
- `bmad-bam-module-epics`

## Domain References

- `{project-root}/_bmad/bam/data/domains/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
