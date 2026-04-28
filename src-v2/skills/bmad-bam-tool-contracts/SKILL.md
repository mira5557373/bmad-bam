---
name: bmad-bam-tool-contracts
description: 'Define agent tool contracts'
module: bam
tags: [workflow]
---

# Tool Contracts

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Overview

 Initialize tool contract design by loading the AI runtime configuration, agent definitions, and establishing the scope of tools to be defined. This step gathers all context required for designing tenant-aware tool contracts that integrate with the agent orchestration framework. 

## Prerequisites


- Module architecture complete (QG-M1 passed)
- AI runtime selected in master architecture
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tool-contract
- **Load patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv` → filter: `{ai_runtime}`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m3.md`

## Outputs


- **Primary:** `{output_folder}/planning-artifacts/tool-contracts-design.md`
- Verification checklist for QG-M3
- Tool catalog summary
- Permission matrix

## Related Workflows

- `bmad-bam-agent-runtime`
- `bmad-bam-convergence`
- `bmad-bam-facade-contract`
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
