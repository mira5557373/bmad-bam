---
name: tenant-portal-design
displayName: Tenant Portal Design
description: Design tenant self-service portal with admin features and billing integration. Use when the user requests to 'design tenant portal' or 'plan self-service capabilities'.
module: bam
tags: [tenant, ux]
---

# Tenant Portal Design

## Overview

This workflow designs the tenant self-service portal, covering self-service capabilities for end users, admin features for tenant administrators, configuration options available per tier, and billing integration with Stripe/Orb. The portal enables tenants to manage their account, users, billing, and platform settings without requiring platform support intervention.

Act as a Platform Architect designing intuitive self-service tenant management.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing tenant self-service portal
- Creating tenant admin dashboards
- Building tenant configuration interfaces

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Define Self-Service Capabilities

Define the self-service capabilities available to all tenant users:

- Profile management
- Team/workspace management
- API key management
- Notification preferences
- Usage dashboard

### Step 2: Design Tenant Admin Features

Design features available to tenant administrators:

- User management (invite, roles, deactivate)
- Billing management
- Security settings (SSO, MFA policies)
- Audit logs access
- Integration management

### Step 3: Configure Tier-Specific Options

Map configuration options to tenant tiers:

| Feature | FREE | PRO | ENTERPRISE |
|---------|------|-----|------------|
| User Management | Basic | Full | Full + SSO |
| API Keys | 2 | 10 | Unlimited |
| Audit Logs | None | 30 days | 1 year |
| Custom Branding | No | Limited | Full |

**Soft Gate:** Steps 1-3 complete the portal feature set. Present a summary of capabilities. Ask for confirmation before proceeding to billing integration.

### Step 4: Design Billing Integration

Design billing portal integration:
- Usage display (Orb metrics)
- Invoice history (Stripe)
- Payment method management
- Plan upgrade/downgrade
- Billing alerts configuration

### Step 5: Create Portal Wireframes

Create information architecture and key wireframes:
- Navigation structure
- Dashboard layout
- Settings organization
- Mobile responsiveness requirements

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-M2** | Contributes | Tenant-scoped portal access and data |
| **QG-I2** | Contributes | Tenant safety in self-service operations |
| **QG-P1** | Contributes | Production-ready portal functionality |

- **Entry Gate:** QG-M2 (Tenant Isolation) - Tenant model must support portal isolation
- **Exit Gate:** QG-I2 (Tenant Safety) - Portal must enforce tenant boundaries

### Verification Checklist

- [ ] Self-service capabilities defined
- [ ] Admin features documented
- [ ] Tier-specific options mapped
- [ ] Billing integration designed
- [ ] Information architecture created

## Output

- `{output_folder}/planning-artifacts/ux/tenant-portal-design.md`
- Portal feature matrix
- Information architecture diagram

## References

- Template: `bam/templates/ux-design-template.md`
- Multi-Tenant Patterns: `bam/knowledge/multi-tenant-patterns.md`
- Tier UX Patterns: `bam/knowledge/tier-ux-patterns.md`
