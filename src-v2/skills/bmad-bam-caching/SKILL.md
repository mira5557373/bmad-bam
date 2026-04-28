---
name: bmad-bam-caching
description: 'Design multi-tenant caching strategy'
module: bam
tags: [workflow]
---

# Caching

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Overview

Design tenant-aware caching strategy that ensures data isolation while maximizing performance. This workflow covers cache key namespacing with tenant prefixes, tier-based cache quotas, invalidation patterns, multi-layer caching (L1 local, L2 distributed), and shared vs. tenant-specific cache policies.

**Your Role:** Guide decisions on cache architecture, isolation enforcement, and tier-based resource allocation. Ensure caching improves performance without compromising tenant data isolation.

**Key Pattern:** All cache keys follow `tenant:{tenant_id}:{resource}:{id}` namespace convention.

## Prerequisites


- [ ] Master architecture document exists with tenant model selected
- [ ] User has access to performance requirements
- [ ] Tenant tier definitions available (Free, Pro, Enterprise)

## Outputs


- **Caching Design Document:** `{output_folder}/planning-artifacts/caching-design.md`
- Workflow completion status
- Next step recommendations

## Related Workflows

- `bmad-bam-convergence`
- `bmad-bam-observability`
- `bmad-bam-scaling`
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
