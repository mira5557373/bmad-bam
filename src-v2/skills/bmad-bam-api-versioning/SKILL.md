---
name: bmad-bam-api-versioning
description: 'Design API versioning strategy'
module: bam
tags: [workflow]
---

# API Versioning

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Overview



## Prerequisites


- [ ] Master architecture document exists with module inventory
- [ ] At least one facade contract exists with API operations
- [ ] Tenant model selected (RLS, schema, database, hybrid)
- [ ] API client ecosystem understood (web, mobile, third-party)

## Outputs


- **API Versioning Design:** `{output_folder}/planning-artifacts/api-versioning-design.md`
- Comprehensive design covering strategy, lifecycle, compatibility, migration
- Ready for QG-I1 validation

## Related Workflows

- `bmad-bam-api-release`
- `bmad-bam-convergence-verification`
- `bmad-bam-facade-contract`

## Domain References

- `{project-root}/_bmad/bam/data/agent-guides/bam/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
