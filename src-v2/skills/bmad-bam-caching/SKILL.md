---
name: bmad-bam-caching
description: 'Design multi-tenant caching strategy'
module: bam
tags: [workflow]
---

# Caching

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Overview

Design tenant-aware caching strategy that ensures data isolation while maximizing performance. This workflow covers cache key namespacing with tenant prefixes, tier-based cache quotas, invalidation patterns, multi-layer caching (L1 local, L2 distributed), and shared vs. tenant-specific cache policies.

**Your Role:** Guide decisions on cache architecture, isolation enforcement, and tier-based resource allocation. Ensure caching improves performance without compromising tenant data isolation.

**Key Pattern:** All cache keys follow `tenant:{tenant_id}:{resource}:{id}` namespace convention.

## Prerequisites


- [ ] Master architecture document exists with tenant model selected
- [ ] User has access to performance requirements
- [ ] Tenant tier definitions available (Free, Pro, Enterprise)

## Outputs


- **Caching Design Document:** `{output_folder}/planning-artifacts/caching-design.md`
- Workflow completion status
- Next step recommendations

## Related Workflows

- `bmad-bam-convergence-verification`
- `bmad-bam-observability`
- `bmad-bam-rate-limiting`
- `bmad-bam-tenant-isolation`

## Domain References

- `{project-root}/_bmad/bam/data/domains/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
