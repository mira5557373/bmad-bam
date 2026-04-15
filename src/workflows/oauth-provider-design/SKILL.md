---
name: oauth-provider-design
displayName: OAuth Provider Design
description: Design OAuth2 provider implementation for third-party authorization. Use when the user requests to 'implement OAuth provider' or 'design authorization server'.
module: bam
tags: [security, platform, integration]
---

# OAuth Provider Design

## Overview

This workflow designs the complete OAuth2 provider implementation including authorization flows, token management, scope definitions, and tenant-aware authorization. It enables third-party applications to securely access platform APIs on behalf of users.

Act as a Platform Architect designing OAuth2 infrastructure for multi-tenant platforms.

**Args:** Accepts OAuth flow types and scope definitions. Accepts `--headless` / `-H`.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Implementing OAuth2 authorization server
- Designing third-party API access
- Planning token management strategy
- Configuring tenant-aware authorization

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new OAuth provider design from scratch |
| **Edit** | Load existing design and apply targeted modifications |
| **Validate** | Check existing design against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Design Authorization Flows

- Configure OAuth2 grant types
- Design consent experience
- Plan redirect handling
- Set up PKCE support

### Step 2: Configure Token Management

- Design token lifecycle
- Plan refresh strategy
- Configure token storage
- Set up revocation

### Step 3: Define Scopes and Permissions

- Create scope taxonomy
- Map scopes to APIs
- Plan tenant-specific scopes
- Design consent prompts

## Quality Gates

This workflow contributes to:
- **QG-I2** (Tenant Safety) - OAuth tenant isolation
- **QG-P1** (Production) - OAuth security compliance

## Output

- `{output_folder}/planning-artifacts/security/oauth-provider-design.md` - OAuth provider architecture
- `{output_folder}/planning-artifacts/security/scope-definitions.md` - Scope taxonomy
- OAuth configuration

## References

- Template: `{project-root}/_bmad/bam/data/templates/oauth-provider-template.md`
- SSO Integration: `bmad-bam-tenant-sso-integration`
