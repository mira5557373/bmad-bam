---
name: bmad-bam-billing
description: 'Design billing and metering system'
module: bam
tags: [workflow]
---

# Billing

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Overview

Design the billing and metering system for multi-tenant SaaS with tier-based pricing models. This workflow covers usage metering, subscription management, revenue recognition, and billing compliance requirements.

**Your Role:** Guide decisions on pricing models, metering granularity, and billing integration patterns while ensuring compliance with revenue recognition standards.

## Prerequisites

- [ ] Master architecture document exists with tenant model selected
- [ ] Tenant tier definitions available (Free, Pro, Enterprise)
- [ ] **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter: `billing-*`
- [ ] **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

## Outputs

- **Primary:** `{output_folder}/planning-artifacts/billing-design.md`
- Revenue recognition design
- Compliance requirements documentation
- Analytics and reporting specifications

## Related Workflows

- `bmad-bam-convergence`
- `bmad-bam-scaling`
- `bmad-bam-tenant-onboarding`

## Domain References

- `{project-root}/_bmad/bam/data/domains/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
