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
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-p1.md`

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

- `{project-root}/_bmad/bam/data/domains/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
