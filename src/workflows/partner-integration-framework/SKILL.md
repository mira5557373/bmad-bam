---
name: partner-integration-framework
displayName: Partner Integration Framework
description: Design partner and ISV integration framework with sandbox environments. Use when the user requests to 'integrate partners' or 'design ISV program'.
module: bam
tags: [integration, platform, partners]
---

# Partner Integration Framework

## Overview

This workflow designs the complete partner and ISV integration framework including partner tiers, certification programs, sandbox environments, co-selling arrangements, and revenue sharing models. It enables third-party developers to build on the platform.

Act as an Integration Architect designing partner ecosystems for multi-tenant platforms.

**Args:** Accepts partner tier definitions. Accepts `--headless` / `-H`.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Building partner/ISV ecosystems
- Designing developer programs
- Creating certification frameworks
- Planning revenue sharing models

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new partner framework from scratch |
| **Edit** | Load existing framework and apply targeted modifications |
| **Validate** | Check existing framework against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Define Partner Tiers

- Catalog partner types
- Define tier benefits
- Plan access levels
- Design certification paths

### Step 2: Design Sandbox Environment

- Configure sandbox provisioning
- Set up data isolation
- Plan resource limits
- Design testing capabilities

### Step 3: Create Certification Program

- Define certification levels
- Design testing criteria
- Plan review process
- Create badge system

### Step 4: Plan Revenue Model

- Design revenue sharing
- Configure billing integration
- Plan co-selling arrangements
- Create reporting dashboards

## Quality Gates

This workflow contributes to:
- **QG-I1** (Convergence) - Partner API integration
- **QG-P1** (Production) - Partner portal readiness

## Output

- `{output_folder}/planning-artifacts/partners/partner-framework.md` - Framework document
- `{output_folder}/planning-artifacts/partners/certification-program.md` - Certification spec
- Partner portal configuration

## References

- Template: `{project-root}/_bmad/bam/data/templates/partner-framework-template.md`
