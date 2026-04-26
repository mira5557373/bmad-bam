---
name: bmad-bam-convergence
description: 'Verify module convergence and integration safety for production readiness'
module: bam
tags: [quality-gate, integration, workflow]
---

# Convergence Verification

## Overview

This workflow verifies cross-module integration safety before production release. It validates that all modules can work together safely, tenant isolation is maintained across boundaries, and AI agents operate within proper constraints.

Convergence verification is the final integration checkpoint governed by:
- **QG-I1:** Cross-Module Convergence (integration stability)
- **QG-I2:** Tenant Safety (isolation across boundaries)
- **QG-I3:** Agent Safety (AI operation constraints)

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new convergence report | step-01-c to step-05-c |
| Edit | Modify existing report | step-10-e to step-11-e |
| Validate | Check against QG-I2/I3 criteria | step-20-v to step-22-v |

## Prerequisites

- All modules have passed QG-M1, QG-M2, QG-M3 gates
- Facade contracts defined for all cross-module interfaces
- Master architecture document exists
- **Config required:** `tenant_model`, `ai_runtime`

## Quality Gates

This workflow governs three integration quality gates:

| Gate | Focus | Critical Checks |
|------|-------|-----------------|
| QG-I1 | Cross-Module Integration | Facade stability, dependency graph, event compatibility |
| QG-I2 | Tenant Safety | Cross-tenant access, cache/storage isolation |
| QG-I3 | Agent Safety | Agent tenant isolation, tool boundaries, memory isolation |

## Outputs

- `{output_folder}/planning-artifacts/architecture/convergence-report.md`
- Gate decisions: QG-I1, QG-I2, QG-I3 (PASS/CONDITIONAL/FAIL)
- Release recommendation: GO / GO with Conditions / NO-GO

## Related Workflows

- `bmad-bam-facade-contract` - Define facade contracts (prerequisite)
- `bmad-bam-module-architecture` - Module architecture design (prerequisite)
- `bmad-bam-tenant-isolation` - Tenant model isolation patterns
- `bmad-bam-production-readiness` - Production readiness assessment (successor)

## Domain References

- `{project-root}/_bmad/bam/data/checklists/qg-i1.md`
- `{project-root}/_bmad/bam/data/checklists/qg-i2.md`
- `{project-root}/_bmad/bam/data/checklists/qg-i3.md`
- `{project-root}/_bmad/bam/data/domains/integration.md`
