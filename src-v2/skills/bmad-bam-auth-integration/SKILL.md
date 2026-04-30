---
name: bmad-bam-auth-integration
description: 'Design enterprise authentication including SSO, OAuth, and identity provider integration'
module: bam
tags: [workflow, security, authentication, sso, oauth, enterprise]
---

# Authentication Integration

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-06-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Overview

Design enterprise authentication architecture for multi-tenant SaaS platforms. This workflow consolidates SSO integration (SAML 2.0, OIDC), OAuth provider design, identity provider management, session management, and API key authentication patterns.

## Sub-Workflows

| Code | Focus Area | Steps | Description |
|------|------------|-------|-------------|
| **ZAS** | SSO Integration | step-02-c, step-03-c | SAML 2.0, OIDC, enterprise IdP integration |
| **ZAO** | OAuth Provider | step-04-c | OAuth 2.0 flows, token management |
| **ZAK** | API Key Auth | step-05-c | Tenant-scoped API keys, rotation policies |
| **ZAM** | Session Management | step-06-c | Tenant-isolated sessions, token lifecycle |

## Prerequisites

- Master architecture defined (QG-F1 passed)
- Tenant model selected: `{tenant_model}`
- **Load patterns:** `{project-root}/_bmad/bam/data/patterns/sso-auth.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `auth`
- **Load domain:** `{project-root}/_bmad/bam/data/domains/security.md`

**Web Research (Required):**

Search the web: "SAML 2.0 multi-tenant SaaS best practices {date}"
Search the web: "OIDC enterprise identity provider integration {date}"
Search the web: "OAuth 2.0 multi-tenant patterns {date}"
Search the web: "tenant-scoped session management {date}"

## Quality Gates

| Gate | Purpose | When Applied |
|------|---------|--------------|
| **QG-S4** | Authentication Security | SSO/OAuth configuration |
| **QG-S5** | Session Security | Session management design |
| **QG-M2** | Tenant Isolation | Auth respects tenant boundaries |

## Outputs

- Complete authentication architecture at `{output_folder}/planning-artifacts/auth-integration.md`
- SSO integration design with IdP configuration
- OAuth provider specification
- Session management architecture
- API key management policies

## Related Workflows

- `bmad-bam-security`
- `bmad-bam-security-operations`
- `bmad-bam-tenant-onboarding`
- `bmad-bam-compliance`

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

- `{project-root}/_bmad/bam/data/domains/security.md`
- `{project-root}/_bmad/bam/data/patterns/sso-auth.md`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
