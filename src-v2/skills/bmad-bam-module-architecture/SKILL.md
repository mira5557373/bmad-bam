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

Design the internal architecture for an individual module within the modular monolith. This workflow covers domain model design, aggregate boundaries, repository patterns, service layer structure, and tenant context enforcement at the module level.

**Your Role:** Guide decisions on module internal structure while ensuring the design respects bounded context boundaries, supports tenant isolation, and enables independent development and testing.

**Quality Gate:** QG-M1 (Module Architecture Gate) validates module boundaries, API contracts, dependencies, and tenant context implementation.

## Prerequisites


- [ ] Master architecture document exists with module inventory
- [ ] Bounded contexts defined for each module
- [ ] Tenant model selected (RLS, schema, database, hybrid)
- [ ] Integration patterns identified at master architecture level

## Outputs

- **Module Architecture Document:** `{output_folder}/planning-artifacts/module-architecture-{module}.md`
- Contains: Domain model, aggregate boundaries, repository patterns, service layer, tenant context integration
- **Load template:** `{project-root}/_bmad/bam/data/templates/module-architecture.md`

## Related Workflows

- `bmad-bam-convergence-verification`
- `bmad-bam-define-facade-contract`
- `bmad-bam-module-epics`

## Domain References

- `{project-root}/_bmad/bam/data/domains/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
