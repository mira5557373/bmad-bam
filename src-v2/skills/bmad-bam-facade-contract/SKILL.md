---
name: bmad-bam-facade-contract
description: 'Define module facade contracts'
module: bam
tags: [quality-gate, workflow]
---

# Facade Contract

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Quality Gate

**Gate:** QG-I1

## Overview



## Prerequisites


- [ ] Master architecture document exists with module inventory
- [ ] Source module architecture exists with public API defined
- [ ] Target module architecture exists with dependencies documented
- [ ] Tenant model selected (RLS, schema, database, hybrid)
- [ ] Integration style identified (sync, async, mixed)

## Outputs



## Related Workflows

- `bmad-bam-convergence-verification`
- `bmad-bam-evolve-facade-contract`
- `bmad-bam-facade-mismatch-recovery`
- `bmad-bam-module-architecture`
- `bmad-bam-module-epics`

## Domain References

- `{project-root}/_bmad/bam/data/domains/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
