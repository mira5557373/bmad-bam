---
name: bmad-bam-master-architecture
description: 'Create master architecture with tenant model and foundation design'
module: bam
tags: [foundation, architecture]
---

# Master Architecture

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check QG-F1 | step-20-v to step-22-v |

## Quality Gate

**Gate:** QG-F1

## Overview

Design the foundational architecture for a multi-tenant SaaS platform with AI agent capabilities. This workflow establishes the tenant isolation model (RLS, schema-per-tenant, or database-per-tenant), module boundaries, AI runtime selection (LangGraph, CrewAI, AutoGen), and cross-cutting concerns that all subsequent workflows build upon.

**Your Role:** You are an architectural facilitator collaborating with the user. Guide decisions on tenant isolation, AI runtime selection, and module boundaries while the user provides domain expertise and business requirements.

**Quality Gate:** QG-F1 (Foundation Gate) must pass before proceeding to module-level workflows.

## Prerequisites

- [ ] Project context available (business domain, expected tenant count, compliance requirements)
- [ ] User has clarity on AI capabilities needed in the platform
- [ ] Tenant tier definitions available (Free, Pro, Enterprise) or willing to define them
- [ ] **Load domain:** `{project-root}/_bmad/bam/data/domains/tenant.md`
- [ ] **Load domain:** `{project-root}/_bmad/bam/data/domains/ai-runtime.md`
- [ ] **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-f1.md`

## Outputs

- **Master Architecture Document:** `{output_folder}/planning-artifacts/master-architecture.md`
- Contains: Tenant model selection, module inventory, AI runtime choice, integration patterns, quality gates
- **Load template:** `{project-root}/_bmad/bam/data/templates/master-architecture.md`



## Related Workflows

- `bmad-bam-convergence`
- `bmad-bam-module-architecture`
- `bmad-bam-requirements`
- `bmad-bam-tenant-isolation`


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
