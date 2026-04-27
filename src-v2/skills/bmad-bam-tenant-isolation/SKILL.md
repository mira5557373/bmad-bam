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

Design the tenant isolation implementation strategy for multi-tenant SaaS architecture. This workflow covers isolation model selection (RLS, schema-per-tenant, database-per-tenant), data boundary enforcement, cross-tenant protection mechanisms, and tier-based isolation levels.

**Your Role:** Guide decisions on tenant data isolation while balancing security requirements, compliance needs, and operational complexity. Ensure the selected model provides appropriate isolation guarantees for the platform's risk profile.

**Quality Gate:** QG-M2 (Tenant Isolation Gate) validates data boundary enforcement, cross-tenant protection, and compliance alignment.

## Prerequisites


- [ ] Master architecture document exists with tenant model selected
- [ ] User has access to compliance requirements
- [ ] Tenant tier definitions available (Free, Pro, Enterprise)

## Outputs


- Complete tenant isolation design document
- **Output to:** `{output_folder}/planning-artifacts/tenant-isolation.md`

## Related Workflows

- `bmad-bam-agent-runtime`
- `bmad-bam-convergence`
- `bmad-bam-master-architecture`
- `bmad-bam-module-architecture`

## Domain References

- `{project-root}/_bmad/bam/data/domains/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
