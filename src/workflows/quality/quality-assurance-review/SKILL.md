---
name: quality-assurance-review
displayName: Quality Assurance Review
description: 'Comprehensive quality assurance review for multi-tenant SaaS platforms'
module: bam
web_bundle: false
tags: [quality, phase-5, qa, review]
---

# Quality Assurance Review

## Overview

This workflow performs comprehensive quality assurance review for multi-tenant SaaS platforms. It consolidates quality verification activities that span tenant isolation, integration testing, and compliance requirements.

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new QA review report | `step-01-c-*` to `step-06-c-*` |
| Edit | Update existing QA review | `step-10-e-*` to `step-11-e-*` |
| Validate | Verify QA coverage | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Master architecture document exists
- Module architecture completed
- Quality gates defined (QG-F1 through QG-P1)
- **Config required:** `test_architecture`

## Phase 5 Quality Focus

This workflow is part of Phase 5-Quality and provides:
- Consolidated quality assessment across all gates
- Tenant isolation verification summary
- Integration test coverage analysis
- Compliance verification status
- Quality metrics aggregation

## Outputs

- `qa-review-report.md` in `{output_folder}/quality-artifacts/`
- Quality metrics dashboard data
- Gate compliance matrix

## Related Workflows

- `validate-foundation` - Foundation validation
- `validate-module` - Module validation
- `bmad-bam-convergence-verification` - Integration verification
