---
name: bmad-bam-production-readiness
description: 'Validate production readiness'
module: bam
tags: [quality-gate, workflow]
---

# Production Readiness

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Quality Gate

**Gate:** QG-P1

## Overview

 Initialize the production readiness assessment by loading all quality gate artifacts from prior phases, verifying all prerequisite gates have passed, and establishing the scope for QG-P1 (Production Readiness) validation. This is the final quality gate before production deployment. 

## Prerequisites


- All foundation gates passed: QG-F1
- All module gates passed: QG-M1, QG-M2, QG-M3
- All convergence gates passed: QG-I1, QG-I2, QG-I3
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: production
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/production-readiness.md`

## Outputs


- Production readiness report: `{output_folder}/planning-artifacts/production-readiness-report.md`
- QG-P1 gate decision (GO / GO WITH CONDITIONS / NO-GO)
- Risk assessment matrix
- Rollback procedures
- Sign-off checklist

## Related Workflows

- `bmad-bam-convergence`
- `bmad-bam-master-architecture`
- `bmad-bam-observability`
- `bmad-bam-testing`

## Domain References

- `{project-root}/_bmad/bam/data/domains/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
