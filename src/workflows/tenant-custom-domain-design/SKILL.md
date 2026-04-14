---
name: tenant-custom-domain-design
displayName: Tenant Custom Domain Design
description: Design custom domain and subdomain routing per tenant. Use when the user requests to 'design custom domains' or 'configure tenant domains'.
module: bam
tags: [tenant, infrastructure]
---

# Tenant Custom Domain Design

## Overview

This workflow designs custom domain and subdomain routing for tenant-specific branding. It covers domain architecture, SSL/TLS certificate management, routing configuration, and DNS integration patterns for multi-tenant SaaS platforms.

Act as a Platform Architect designing tenant-aware domain routing infrastructure.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing tenant-specific custom domain support
- Configuring white-label domain routing
- Setting up SSL/TLS automation for tenant domains
- Integrating with external DNS providers

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Domain Architecture

Design the domain hierarchy and routing structure:

1. Primary platform domain (e.g., `app.platform.com`)
2. Tenant subdomain pattern (e.g., `{tenant}.platform.com`)
3. Custom domain support (e.g., `app.customer.com`)
4. Wildcard certificate strategy

### Step 2: SSL/TLS Management

Define certificate provisioning and renewal:

| Domain Type | Certificate Strategy | Provider |
|-------------|---------------------|----------|
| Platform | Managed certificate | AWS ACM / Let's Encrypt |
| Tenant Subdomain | Wildcard certificate | AWS ACM |
| Custom Domain | Auto-provisioned | Let's Encrypt / cert-manager |

### Step 3: Routing Configuration

Configure routing rules for tenant resolution:

- Host-header based tenant lookup
- Path-based tenant routing (fallback)
- API gateway integration
- CDN configuration for custom domains

**Soft Gate:** Steps 1-3 complete the domain architecture design. Present a summary of domain structure and routing rules. Ask for confirmation before proceeding to DNS integration.

### Step 4: DNS Integration

Define DNS configuration patterns:

- CNAME verification for custom domains
- Automatic DNS validation
- Domain ownership verification
- Propagation monitoring

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-M2** | Contributes | Tenant isolation in domain routing |

- **Entry Gate:** QG-F1 (Foundation) - Master architecture must be defined
- **Exit Gate:** QG-M2 (Tenant Isolation) - Domain routing must enforce tenant boundaries

### Verification Checklist

- [ ] Domain architecture documented
- [ ] SSL/TLS strategy defined
- [ ] Routing rules configured
- [ ] DNS integration patterns specified
- [ ] Custom domain verification process defined

## Output

- `{output_folder}/planning-artifacts/infrastructure/tenant-custom-domain-design.md`
- Domain architecture diagram
- SSL/TLS management runbook

## References

- Template: `bam/templates/infrastructure-template.md`
- Multi-Tenant Patterns: `bam/knowledge/multi-tenant-patterns.md`

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
