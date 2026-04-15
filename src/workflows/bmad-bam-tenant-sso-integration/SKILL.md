---
name: bmad-bam-tenant-sso-integration
displayName: Tenant SSO Integration
description: Design tenant SSO integration supporting SAML 2.0, OIDC, and enterprise IdP provisioning with session management and JIT user creation.
module: bam
tags: [security, tenant]
---

# Tenant SSO Integration

## Overview

This workflow designs enterprise SSO integration for multi-tenant SaaS platforms, covering SAML 2.0 and OIDC protocol support, identity provider (IdP) integration, Just-In-Time (JIT) user provisioning, SCIM-based directory sync, and tenant-scoped session management.

Act as a Platform Architect designing secure, scalable tenant authentication systems.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing tenant SSO authentication
- Integrating enterprise IdPs (Okta, Azure AD, Google Workspace)
- Implementing SAML 2.0 or OIDC flows
- Planning JIT user provisioning
- Designing tenant session management

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Analyze SSO Requirements

Analyze enterprise SSO requirements including:
- Protocol requirements (SAML 2.0, OIDC, both)
- IdP landscape (Okta, Azure AD, Google Workspace, custom)
- Authentication flow requirements
- Compliance requirements (SOC 2, ISO 27001)

### Step 2: Design IdP Integration

Design identity provider integration architecture:
- Connection management per tenant
- Metadata exchange procedures
- Certificate management
- Multi-IdP support strategies

### Step 3: Configure SAML/OIDC

Design protocol-specific configurations:
- SAML assertion handling
- OIDC token validation
- Attribute mapping strategies
- Error handling flows

**Soft Gate:** Steps 1-3 complete the SSO protocol design. Present a summary of IdP integration and protocol configuration. Ask for confirmation before proceeding to provisioning.

### Step 4: Design User Provisioning

Design JIT and SCIM provisioning:
- Just-In-Time user creation
- SCIM 2.0 directory sync
- Attribute-to-role mapping
- Deprovisioning procedures

### Step 5: Design Session Management

Design tenant-scoped session management:
- Session creation and validation
- Token lifecycle management
- Cross-tenant session isolation
- Session revocation procedures

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-S5** | Contributes | Security quality gate for authentication |
| **QG-M2** | Contributes | Tenant isolation during SSO flows |
| **QG-I2** | Contributes | Tenant safety with IdP integration |

- **Entry Gate:** QG-S5 (Security) - Security architecture must be defined
- **Exit Gate:** QG-M2 (Tenant Isolation) - SSO must preserve tenant boundaries

### Verification Checklist

- [ ] SSO protocols defined (SAML/OIDC)
- [ ] IdP integration architecture complete
- [ ] User provisioning flow documented
- [ ] Session management designed
- [ ] Security compliance verified

## Output

- `{output_folder}/planning-artifacts/security/tenant-sso-integration.md`
- IdP integration architecture diagram
- Protocol configuration templates

## References

- Pattern: `compliance` (sso-integration-patterns)
- Pattern: `tenant-isolation`
- Multi-Tenant Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`
- Security Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/security-patterns.md`
