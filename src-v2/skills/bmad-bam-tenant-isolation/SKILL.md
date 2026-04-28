---
name: bmad-bam-tenant-isolation
description: 'Design tenant isolation implementation'
module: bam
tags: [quality-gate, workflow]
---

# Tenant Isolation

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Quality Gate

**Gate:** QG-M2

## Overview

Design the tenant isolation implementation strategy for multi-tenant SaaS architecture. This workflow covers isolation model selection (RLS, schema-per-tenant, database-per-tenant), data boundary enforcement, cross-tenant protection mechanisms, and tier-based isolation levels.

**Your Role:** Guide decisions on tenant data isolation while balancing security requirements, compliance needs, and operational complexity. Ensure the selected model provides appropriate isolation guarantees for the platform's risk profile.

**Quality Gate:** QG-M2 (Tenant Isolation Gate) validates data boundary enforcement, cross-tenant protection, and compliance alignment.

## Prerequisites


- [ ] Master architecture document exists with tenant model selected
- [ ] User has access to compliance requirements
- [ ] Tenant tier definitions available (Free, Pro, Enterprise)

## Outputs


- Complete tenant isolation design document
- **Output to:** `{output_folder}/planning-artifacts/tenant-isolation.md`

## Related Workflows

- `bmad-bam-agent-runtime`
- `bmad-bam-convergence`
- `bmad-bam-master-architecture`
- `bmad-bam-module-architecture`


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
