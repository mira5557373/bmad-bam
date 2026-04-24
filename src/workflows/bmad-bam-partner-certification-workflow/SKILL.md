---
name: bmad-bam-partner-certification-workflow
displayName: Partner Certification Workflow
description: Design ISV/partner certification program for multi-tenant platform ecosystem. Use when the user requests to 'create partner program' or 'design certification tiers'.
module: bam
tags: [solutioning, partners, certification, ecosystem]
---

# Partner Certification Workflow

## Overview

This workflow designs a comprehensive ISV/partner certification program for a multi-tenant SaaS platform ecosystem. It defines certification tiers (Registered, Certified, Premier), technical and business requirements per tier, assessment processes, and renewal procedures. Run during the Solutioning phase to establish partner ecosystem governance and quality standards.

Act as a Partner Ecosystem Architect specializing in ISV certification programs and platform ecosystems.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing partner/ISV certification programs for the platform
- Creating tiered partner benefits and requirements
- Establishing partner assessment and onboarding processes

## Modes

| Mode | Purpose | Step Prefix |
|------|---------|-------------|
| **Create** | Generate new certification program from scratch | `steps/step-01-c-*` through `step-04-c-*` |
| **Edit** | Modify existing certification program | `steps/step-10-e-*` through `step-11-e-*` |
| **Validate** | Check against certification completeness criteria | `steps/step-20-v-*` through `step-22-v-*` |

## Prerequisites

- Master architecture document completed
- API documentation and integration patterns defined
- **Config required:** `{tenant_model}`, `{ai_runtime}`

## Workflow

### Step 1: Define Certification Tiers

- Define certification tier structure (Registered, Certified, Premier)
- Establish tier benefits and privileges
- Map tier progression requirements
- Document tier branding and badges

### Step 2: Design Requirements Per Tier

- Design technical requirements per tier
- Design business requirements per tier
- Establish training and documentation requirements
- Define support and SLA requirements

### Step 3: Configure Assessment Process

- Configure technical assessment criteria
- Design business assessment process
- Establish scoring methodology
- Define pass/fail thresholds

**Soft Gate:** Steps 1-3 complete the core certification design. Present a summary of tiers, requirements, and assessment process. Ask for confirmation before proceeding to renewal design.

### Step 4: Design Renewal and Maintenance

- Design renewal requirements and timeline
- Establish maintenance requirements
- Define tier downgrade/upgrade procedures
- Create recertification assessment process

### Quality Gates

- [ ] Certification tiers defined with clear differentiation
- [ ] Technical and business requirements documented
- [ ] Assessment process with scoring criteria established
- [ ] Renewal procedures documented

## Quality Gates

This workflow contributes to:
- **QG-F1** (Foundation) - Partner ecosystem supports platform growth
- **QG-P1** (Production) - Partner certification required for marketplace

### Entry Gate
- QG-F1 (Foundation) must pass before partner program design
- Master architecture and API documentation must be complete

### Exit Gate
- Certification program document complete with all tiers defined
- Assessment process documented with scoring criteria
- Renewal procedures established

## Outputs

- `{output_folder}/planning-artifacts/partner-certification-program.md`

## Related Workflows

| Workflow | Relationship | When to Use |
|----------|--------------|-------------|
| `create-master-architecture` | Context | Master architecture defines APIs for partner integration |
| `bmad-bam-api-gateway-design` | Related | API design informs partner integration requirements |
| `bmad-bam-tenant-onboarding-design` | Related | Partner onboarding follows similar patterns |

## References

- Template: `{project-root}/_bmad/bam/data/templates/partner-certification-template.md`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/partner-ecosystem-patterns.md`
- Checklist: `{project-root}/_bmad/bam/data/checklists/qg-p1-production-readiness.md`

## Headless Mode

Accepts `--headless` / `-H` for autonomous execution using defaults and available inputs.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.
