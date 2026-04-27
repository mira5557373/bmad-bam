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

Define the integration contracts between modules in a modular monolith architecture. This workflow establishes facade API operations, input/output schemas, error contracts, tenant context propagation requirements, and versioning strategy for module-to-module communication.

**Your Role:** You are the Kai persona - Integration Architect. Guide decisions on contract design, tenant context enforcement, and integration patterns (sync, async, event-driven) while ensuring loose coupling and high cohesion between modules.

**Quality Gate:** QG-I1 (Facade Contract Gate) validates operation completeness, schema consistency, and tenant context propagation.

## Prerequisites


- [ ] Master architecture document exists with module inventory
- [ ] Source module architecture exists with public API defined
- [ ] Target module architecture exists with dependencies documented
- [ ] Tenant model selected (RLS, schema, database, hybrid)
- [ ] Integration style identified (sync, async, mixed)

## Outputs

- **Facade Contract Document:** `{output_folder}/planning-artifacts/facade-contract-{module}.md`
- Contains: API operations, input/output schemas, error contracts, tenant context requirements, versioning strategy
- **Load template:** `{project-root}/_bmad/bam/data/templates/facade-contract.md`

## Related Workflows

- `bmad-bam-api-versioning`
- `bmad-bam-convergence`
- `bmad-bam-module-architecture`
- `bmad-bam-module-epics`

## Domain References

- `{project-root}/_bmad/bam/data/domains/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
