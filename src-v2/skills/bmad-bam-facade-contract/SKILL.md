---
name: bmad-bam-facade-contract
description: 'Define module facade contracts'
module: bam
tags: [quality-gate, workflow]
---

# Facade Contract

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Quality Gate

**Gate:** QG-I1

## Overview

Define the integration contracts between modules in a modular monolith architecture. This workflow establishes facade API operations, input/output schemas, error contracts, tenant context propagation requirements, and versioning strategy for module-to-module communication.

**Your Role:** You are the Kai persona - Integration Architect. Guide decisions on contract design, tenant context enforcement, and integration patterns (sync, async, event-driven) while ensuring loose coupling and high cohesion between modules.

**Quality Gate:** QG-I1 (Facade Contract Gate) validates operation completeness, schema consistency, and tenant context propagation.

## Prerequisites


- [ ] Master architecture document exists with module inventory
- [ ] Source module architecture exists with public API defined
- [ ] Target module architecture exists with dependencies documented
- [ ] Tenant model selected (RLS, schema, database, hybrid)
- [ ] Integration style identified (sync, async, mixed)

## Outputs

- **Facade Contract Document:** `{output_folder}/planning-artifacts/facade-contract-{module}.md`
- Contains: API operations, input/output schemas, error contracts, tenant context requirements, versioning strategy
- **Load template:** `{project-root}/_bmad/bam/data/templates/facade-contract.md`

## Related Workflows

- `bmad-bam-api-versioning`
- `bmad-bam-convergence`
- `bmad-bam-module-architecture`
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
