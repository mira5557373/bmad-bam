---
name: bmad-bam-stakeholder-discovery
displayName: Stakeholder Discovery
description: Discover and document key stakeholders for multi-tenant SaaS platform initiatives. Use when the user requests to 'identify stakeholders' or 'create stakeholder map'.
module: bam
tags: [discovery, stakeholders, governance]
---

# Stakeholder Discovery

## Overview

This workflow discovers and documents key stakeholders for a multi-tenant SaaS platform initiative. It identifies internal and external stakeholders (engineering, product, customers, partners), maps their interests and influence levels, defines communication plans, and creates a RACI matrix for platform decisions. Run during the Discovery phase to ensure all relevant parties are identified before planning begins.

Act as a Business Analyst specializing in stakeholder management and governance for multi-tenant platforms.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Starting a new multi-tenant SaaS platform initiative
- Defining governance and decision-making structures
- Creating communication plans for platform stakeholders

## Modes

| Mode | Purpose | Step Prefix |
|------|---------|-------------|
| **Create** | Generate new stakeholder map from scratch | `steps/step-01-c-*` through `step-04-c-*` |
| **Edit** | Modify existing stakeholder documentation | `steps/step-10-e-*` through `step-11-e-*` |
| **Validate** | Check against stakeholder completeness criteria | `steps/step-20-v-*` through `step-22-v-*` |

## Prerequisites

- Project context or initiative brief available
- Access to organizational structure information
- **Config required:** `{tenant_model}`

## Workflow

### Step 1: Identify Stakeholders

- Identify internal stakeholders (engineering, product, operations)
- Identify external stakeholders (customers, partners, vendors)
- Categorize by role and department
- Document contact information and availability

### Step 2: Map Interests and Influence

- Map stakeholder interests and concerns
- Assess influence levels (high, medium, low)
- Identify potential conflicts of interest
- Document stakeholder dependencies

### Step 3: Define Communication Plan

- Define communication cadence per stakeholder group
- Establish communication channels and preferences
- Create notification templates
- Schedule regular touchpoints

**Soft Gate:** Steps 1-3 complete the core stakeholder analysis. Present a summary of identified stakeholders, interest mapping, and communication plan. Ask for confirmation before proceeding to RACI matrix creation.

### Step 4: Create RACI Matrix

- Define key platform decisions requiring RACI
- Assign Responsible, Accountable, Consulted, Informed roles
- Document escalation paths
- Create decision approval workflows

### Quality Gates

- [ ] All key stakeholder groups identified
- [ ] Interest and influence mapping complete
- [ ] Communication plan documented
- [ ] RACI matrix covers critical decisions

## Quality Gates

This workflow contributes to:
- **QG-F1** (Foundation) - Stakeholder alignment required for architecture decisions
- **QG-P1** (Production) - Communication plan required for production readiness

### Entry Gate
- Project initiative or context must be defined
- Organizational access for stakeholder identification

### Exit Gate
- Stakeholder map complete with all groups identified
- RACI matrix covers platform architecture decisions
- Communication plan established with scheduled touchpoints

## Outputs

- `{output_folder}/planning-artifacts/stakeholder-map.md`

## Related Workflows

| Workflow | Relationship | When to Use |
|----------|--------------|-------------|
| `create-master-architecture` | Successor | Master architecture requires stakeholder alignment |
| `bmad-bam-tenant-model-isolation` | Related | Tenant decisions require stakeholder input |
| `bmad-bam-compliance-design` | Related | Compliance stakeholders must be identified |

## References

- Template: `{project-root}/_bmad/bam/data/templates/stakeholder-map-template.md`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/governance-patterns.md`
- Checklist: `{project-root}/_bmad/bam/data/checklists/qg-f1-foundation.md`

## Headless Mode

Accepts `--headless` / `-H` for autonomous execution using defaults and available inputs.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.
