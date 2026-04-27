---
name: bmad-bam-master-architecture
description: 'Create master architecture with tenant model and foundation design'
module: bam
tags: [foundation, architecture]
---

# Master Architecture

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check QG-F1 | step-20-v to step-22-v |

## Quality Gate

**Gate:** QG-F1

## Overview

Design the foundational architecture for a multi-tenant SaaS platform with AI agent capabilities. This workflow establishes the tenant isolation model (RLS, schema-per-tenant, or database-per-tenant), module boundaries, AI runtime selection (LangGraph, CrewAI, AutoGen), and cross-cutting concerns that all subsequent workflows build upon.

**Your Role:** You are an architectural facilitator collaborating with the user. Guide decisions on tenant isolation, AI runtime selection, and module boundaries while the user provides domain expertise and business requirements.

**Quality Gate:** QG-F1 (Foundation Gate) must pass before proceeding to module-level workflows.

## Prerequisites

- [ ] Project context available (business domain, expected tenant count, compliance requirements)
- [ ] User has clarity on AI capabilities needed in the platform
- [ ] Tenant tier definitions available (Free, Pro, Enterprise) or willing to define them
- [ ] **Load domain:** `{project-root}/_bmad/bam/data/domains/tenant.md`
- [ ] **Load domain:** `{project-root}/_bmad/bam/data/domains/ai-runtime.md`
- [ ] **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-f1.md`

## Outputs

- **Master Architecture Document:** `{output_folder}/planning-artifacts/master-architecture.md`
- Contains: Tenant model selection, module inventory, AI runtime choice, integration patterns, quality gates
- **Load template:** `{project-root}/_bmad/bam/data/templates/master-architecture.md`



## Related Workflows

- `bmad-bam-convergence`
- `bmad-bam-module-architecture`
- `bmad-bam-requirements`
- `bmad-bam-tenant-isolation`

## Domain References

- `{project-root}/_bmad/bam/data/domains/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
