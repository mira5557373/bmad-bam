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


## On Activation

### Step 1: Resolve the Workflow Block

Run: `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow`

**If the script fails**, resolve the `workflow` block yourself by reading these files in base → team → user order:

1. `{skill-root}/customize.toml` — defaults
2. `{project-root}/_bmad/custom/{skill-name}.toml` — team overrides
3. `{project-root}/_bmad/custom/{skill-name}.user.toml` — personal overrides

Apply merge rules: scalars override, tables deep-merge, arrays of tables keyed by `code`/`id` replace matching and append new, other arrays append.

### Step 2: Execute Prepend Steps

Execute each entry in `{workflow.activation_steps_prepend}` in order.

### Step 3: Load Persistent Facts

Treat every entry in `{workflow.persistent_facts}` as foundational context.
- Entries prefixed `file:` are paths/globs — load contents as facts
- Other entries are literal facts

### Step 4: Load Config

Load from `{project-root}/_bmad/bam/config.yaml`:
- `{user_name}` - greeting
- `{communication_language}` - spoken output
- `{document_output_language}` - written documents
- `{planning_artifacts}` - output location
- `{tenant_model}` - BAM isolation model
- `{ai_runtime}` - BAM AI framework

### Step 5: Greet the User

Greet `{user_name}`, speaking in `{communication_language}`.

### Step 6: Execute Append Steps

Execute each entry in `{workflow.activation_steps_append}` in order.

Activation complete. Begin execution by reading `workflow.md`.

## Domain References

- `{project-root}/_bmad/bam/data/checklists/qg-i1.md`
- `{project-root}/_bmad/bam/data/checklists/qg-i2.md`
- `{project-root}/_bmad/bam/data/checklists/qg-i3.md`
- `{project-root}/_bmad/bam/data/domains/integration.md`
