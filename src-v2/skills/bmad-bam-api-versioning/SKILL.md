---
name: bmad-bam-api-versioning
description: 'Design API versioning strategy'
module: bam
tags: [workflow]
---

# API Versioning

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Overview

Design the API versioning strategy for multi-tenant SaaS with tenant-aware routing and tier-based rate limiting. This workflow covers versioning approach selection (URL path, header, query param), tenant-specific version pinning, deprecation policies, and migration strategies that maintain backward compatibility while enabling platform evolution.

**Your Role:** Guide decisions on API versioning approach, compatibility policies, and tenant-aware rate limiting. Ensure the strategy supports the multi-tenant architecture and respects tier-based quotas.

**Integration:** API versioning integrates with facade contracts (QG-I1) and production readiness (QG-P1).

## Prerequisites


- [ ] Master architecture document exists with module inventory
- [ ] At least one facade contract exists with API operations
- [ ] Tenant model selected (RLS, schema, database, hybrid)
- [ ] API client ecosystem understood (web, mobile, third-party)

## Outputs


- **API Versioning Design:** `{output_folder}/planning-artifacts/api-versioning-design.md`
- Comprehensive design covering strategy, lifecycle, compatibility, migration
- Ready for QG-I1 validation

## Related Workflows

- `bmad-bam-convergence`
- `bmad-bam-facade-contract`
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
