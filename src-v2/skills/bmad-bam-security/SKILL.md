---
name: bmad-bam-security
description: 'Design security architecture'
module: bam
tags: [workflow]
---

# Security

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Overview

 Initialize the security architecture design process by loading compliance requirements, threat model baseline, and identifying security domains for multi-tenant SaaS. 

## Prerequisites


- Master architecture document available (QG-F1 passed)
- Tenant model selected (`{tenant_model}` configured)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: security-*
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

## Outputs


- **Primary:** `{output_folder}/planning-artifacts/security-design.md`
- Security architecture diagram
- Threat mitigation matrix
- Penetration test requirements

## Related Workflows

- `bmad-bam-compliance`
- `bmad-bam-convergence`
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
