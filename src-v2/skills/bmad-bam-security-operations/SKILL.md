---
name: bmad-bam-security-operations
description: 'Design security operations for secrets management, threat modeling, and incident response'
module: bam
tags: [workflow, security, secrets, threat-model, incident-response, multi-tenant]
---

# Security Operations

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-07-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Overview

Design comprehensive security operations including secrets management, threat modeling (STRIDE), and incident response procedures for multi-tenant SaaS platforms.

## Sub-Workflows

| Code | Focus Area | Steps | Description |
|------|------------|-------|-------------|
| **ZSR** | Secrets Management | step-02-c, step-03-c | Secrets rotation, tenant-scoped credentials, vault integration |
| **ZST** | Threat Modeling | step-04-c, step-05-c | STRIDE analysis, attack trees, threat mitigations |
| **ZIR** | Incident Response | step-06-c, step-07-c | Incident classification, runbooks, tenant notification |

## Prerequisites

- Master architecture defined (QG-F1 passed)
- Tenant model selected: `{tenant_model}`
- **Load patterns:** `{project-root}/_bmad/bam/data/patterns/secrets-management.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/patterns/incident-response.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `security`

**Web Research (Required):**

Search the web: "secrets management multi-tenant SaaS {date}"
Search the web: "STRIDE threat modeling cloud applications {date}"
Search the web: "incident response SaaS best practices {date}"

## Quality Gates

| Gate | Purpose | When Applied |
|------|---------|--------------|
| **QG-S3** | Security Baseline | Secrets, encryption, access control |
| **QG-IR** | Incident Response | Response procedures, escalation, notification |

## Outputs

- Complete security operations document at `{output_folder}/planning-artifacts/security-operations.md`
- Secrets management design with rotation policies
- Threat model with STRIDE analysis
- Incident response runbooks
- Tenant notification procedures

## Related Workflows

- `bmad-bam-compliance`
- `bmad-bam-tenant-isolation`
- `bmad-bam-observability`
- `bmad-bam-privacy-compliance`

## On Activation

### Step 1: Resolve the Workflow Block

Run: `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow`

**If the script fails**, resolve the `workflow` block yourself by reading these files in base -> team -> user order:

1. `{skill-root}/customize.toml` - defaults
2. `{project-root}/_bmad/custom/{skill-name}.toml` - team overrides
3. `{project-root}/_bmad/custom/{skill-name}.user.toml` - personal overrides

Apply merge rules: scalars override, tables deep-merge, arrays of tables keyed by `code`/`id` replace matching and append new, other arrays append.

### Step 2: Execute Prepend Steps

Execute each entry in `{workflow.activation_steps_prepend}` in order.

### Step 3: Load Persistent Facts

Treat every entry in `{workflow.persistent_facts}` as foundational context.
- Entries prefixed `file:` are paths/globs - load contents as facts
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

- `{project-root}/_bmad/bam/data/domains/security.md`
- `{project-root}/_bmad/bam/data/patterns/secrets-management.md`
- `{project-root}/_bmad/bam/data/patterns/incident-response.md`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
