---
name: bmad-bam-module-architecture
description: 'Design individual module architecture'
module: bam
tags: [quality-gate, workflow]
---

# Module Architecture

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Quality Gate

**Gate:** QG-M1

## Overview

Design the internal architecture for an individual module within the modular monolith. This workflow covers domain model design, aggregate boundaries, repository patterns, service layer structure, and tenant context enforcement at the module level.

**Your Role:** Guide decisions on module internal structure while ensuring the design respects bounded context boundaries, supports tenant isolation, and enables independent development and testing.

**Quality Gate:** QG-M1 (Module Architecture Gate) validates module boundaries, API contracts, dependencies, and tenant context implementation.

## Prerequisites


- [ ] Master architecture document exists with module inventory
- [ ] Bounded contexts defined for each module
- [ ] Tenant model selected (RLS, schema, database, hybrid)
- [ ] Integration patterns identified at master architecture level

## Outputs

- **Module Architecture Document:** `{output_folder}/planning-artifacts/module-architecture-{module}.md`
- Contains: Domain model, aggregate boundaries, repository patterns, service layer, tenant context integration
- **Load template:** `{project-root}/_bmad/bam/data/templates/module-architecture.md`

## Related Workflows

- `bmad-bam-convergence`
- `bmad-bam-facade-contract`
- `bmad-bam-module-epics`


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
