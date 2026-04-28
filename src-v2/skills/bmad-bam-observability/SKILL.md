---
name: bmad-bam-observability
description: 'Design tenant-aware observability'
module: bam
tags: [workflow]
---

# Observability

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Overview

 Initialize tenant-aware observability design by loading context, understanding tenant isolation requirements, and identifying the three observability pillars (metrics, logs, traces) that will form the foundation of the design. 

## Prerequisites


- Tenant model defined (RLS, schema-per-tenant, or database-per-tenant)
- Master architecture document exists (recommended)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `observability`
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

## Outputs


- Complete observability design document
- Dashboard specifications
- Alert rules configuration
- SLO definitions
- **Output to:** `{output_folder}/planning-artifacts/observability-design.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/observability-design.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/runbook.md`

## Related Workflows

- `bmad-bam-agent-tracing`
- `bmad-bam-billing`
- `bmad-bam-production-readiness`


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
