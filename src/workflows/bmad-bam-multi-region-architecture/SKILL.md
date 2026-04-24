---
name: bmad-bam-multi-region-architecture
displayName: Multi-Region Architecture
description: Design multi-region deployment architecture for data residency and GDPR compliance. Use when the user requests to 'design multi-region' or 'plan data residency'.
module: bam
tags: [platform, compliance]
---

# Multi-Region Architecture

## Overview

This workflow designs multi-region deployment architecture to support data residency requirements and GDPR compliance. It covers regional data routing strategies, compliance mapping for different jurisdictions, cross-region synchronization patterns, and failover design for high availability.

Act as a Platform Architect designing globally distributed multi-tenant infrastructure.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing multi-region deployment architecture
- Creating data residency and sovereignty patterns
- Building cross-region failover systems

## Modes

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Prerequisites

- Previous workflow outputs available (if applicable)
- **Config required:** See `On Activation` section

## Workflow

### Step 1: Define Regional Topology

Define the regional deployment topology:

- Primary region selection criteria
- Secondary region placement
- Edge location strategy
- Region pairing for DR

### Step 2: Data Residency Mapping

Map data residency requirements to regions:

| Jurisdiction | Data Types | Region | Compliance |
|--------------|------------|--------|------------|
| EU (GDPR) | All PII | eu-west-1 | GDPR Art. 44-49 |
| US | All data | us-east-1 | SOC2, CCPA |
| APAC | Configurable | ap-southeast-1 | Local laws |

### Step 3: Cross-Region Sync Strategy

Design data synchronization between regions:
- What data syncs vs. stays local
- Sync patterns (eventual consistency vs. strong)
- Conflict resolution strategies
- Latency budget per data type

**Soft Gate:** Steps 1-3 complete the regional topology and data mapping. Present a summary of regions and data residency. Ask for confirmation before proceeding to failover design.

### Step 4: Regional Routing

Design tenant-to-region routing:
- Tenant region assignment at onboarding
- DNS-based routing (GeoDNS, Route53)
- CDN edge configuration
- API gateway regional endpoints

### Step 5: Failover Design

Design cross-region failover:
- Active-passive vs. active-active
- Failover triggers and thresholds
- RTO/RPO targets per region
- Data recovery procedures

## Quality Gates

This workflow contributes to:
- **QG-F1** (Foundation) - Multi-region architecture is a foundational platform decision
- **QG-M2** (Tenant Isolation) - Regional data residency affects tenant isolation boundaries
- **QG-P1** (Production) - Production readiness requires validated regional deployment

### Entry Gate
- QG-F1 (Foundation) must pass before finalizing regional architecture

### Exit Gate
- QG-F1 and QG-P1 checklist items from `qg-f1-foundation.md` and `qg-p1-production-readiness.md` verified:
  - [ ] Regional topology defined
  - [ ] Data residency requirements mapped
  - [ ] Cross-region sync strategy documented
  - [ ] Tenant routing configured
  - [ ] Failover procedures defined

## Related Workflows

- `create-master-architecture` - Regional decisions inform master architecture
- `bmad-bam-tenant-model-isolation` - Data residency affects tenant isolation
- `bmad-bam-disaster-recovery-design` - Failover design coordination

## Output

- `{output_folder}/planning-artifacts/architecture/multi-region-architecture.md`
- Regional topology diagram
- Data residency compliance matrix

## References

- Template: `{project-root}/_bmad/bam/data/templates/architecture-template.md`
- Compliance Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/compliance-patterns.md`
- Multi-Tenant Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`
