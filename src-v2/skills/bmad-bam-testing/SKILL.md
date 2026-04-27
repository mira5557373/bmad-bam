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

Design comprehensive testing strategy for multi-tenant SaaS architecture. This workflow covers tenant-aware test design, isolation verification testing, cross-tenant boundary tests, tier-based test scenarios, and integration with TEA (Test Engineering Agent) quality gates QG-TC1, QG-TC2, and QG-TC3.

**Your Role:** Guide decisions on test architecture, isolation verification approaches, and coverage requirements. Ensure the testing strategy validates tenant boundaries and prevents cross-tenant data leakage at all layers.

**Key Pattern:** All test fixtures include tenant context, enabling RLS policy verification and boundary enforcement testing.

## Prerequisites


- [ ] Master architecture document exists with tenant model selected
- [ ] Tenant isolation design document exists (preferred but not required)
- [ ] TEA integration status known from config

## Outputs


- **Primary:** `{output_folder}/planning-artifacts/testing-strategy.md`
- **Frontmatter:** Version, tenant model, TEA status, gate statuses
- **Sections:** All 11 sections as documented above

## Related Workflows

- `bmad-bam-convergence-verification`
- `bmad-bam-tenant-isolation`
- `bmad-bam-validate-foundation`
- `bmad-bam-validate-module`

## Domain References

- `{project-root}/_bmad/bam/data/domains/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
