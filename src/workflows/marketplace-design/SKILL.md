---
name: marketplace-design
displayName: Marketplace Design
description: Design marketplace for tenant add-ons and integrations. Use when the user requests to 'design marketplace' or 'create app store'.
module: bam
tags: [integration, platform, marketplace]
---

# Marketplace Design

## Overview

This workflow designs the complete marketplace architecture for tenant add-ons including app submission workflow, review process, installation management, and billing integration. It enables tenants to discover and install third-party integrations.

Act as an Integration Architect designing marketplace platforms for multi-tenant SaaS.

**Args:** Accepts marketplace category definitions. Accepts `--headless` / `-H`.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Building app marketplace/store
- Designing add-on discovery experience
- Planning app installation workflow
- Configuring marketplace billing

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new marketplace design from scratch |
| **Edit** | Load existing design and apply targeted modifications |
| **Validate** | Check existing design against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Design Marketplace Architecture

- Define app categories
- Design discovery experience
- Plan search and filtering
- Configure tenant visibility

### Step 2: Create App Lifecycle

- Design submission workflow
- Plan review process
- Configure installation flow
- Handle updates and versioning

### Step 3: Configure Billing Integration

- Design pricing models
- Plan tenant billing
- Configure revenue sharing
- Set up usage tracking

## Quality Gates

This workflow contributes to:
- **QG-I1** (Convergence) - Marketplace integration
- **QG-P1** (Production) - Marketplace readiness

## Output

- `{output_folder}/planning-artifacts/marketplace/marketplace-design.md` - Marketplace architecture
- `{output_folder}/planning-artifacts/marketplace/app-lifecycle.md` - App lifecycle spec
- Marketplace configuration

## References

- Template: `bam/templates/marketplace-template.md`
- Partner Framework: `bmad-bam-partner-integration-framework`
