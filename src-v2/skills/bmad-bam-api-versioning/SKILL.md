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

Design the API versioning strategy for multi-tenant SaaS with tenant-aware routing and tier-based rate limiting. This workflow covers versioning approach selection (URL path, header, query param), tenant-specific version pinning, deprecation policies, and migration strategies that maintain backward compatibility while enabling platform evolution.

**Your Role:** Guide decisions on API versioning approach, compatibility policies, and tenant-aware rate limiting. Ensure the strategy supports the multi-tenant architecture and respects tier-based quotas.

**Integration:** API versioning integrates with facade contracts (QG-I1) and production readiness (QG-P1).

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

- `bmad-bam-convergence`
- `bmad-bam-facade-contract`
- `bmad-bam-production-readiness`

## Domain References

- `{project-root}/_bmad/bam/data/domains/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
