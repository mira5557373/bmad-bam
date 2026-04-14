---
name: sla-contract-design
displayName: SLA Contract Design
description: Design comprehensive SLA contracts for multi-tenant AI platforms including uptime guarantees, AI response latency, tenant isolation SLAs, and tiered service commitments. Use when the user requests to 'design SLA contracts', 'create SLA tiers', or 'define service level agreements'.
module: bam
tags: [operations, sla, contracts, compliance, phase-3-solutioning]
---

# SLA Contract Design

## Overview

This workflow designs comprehensive Service Level Agreements for multi-tenant AI platforms. It covers uptime guarantees, AI response latency commitments, tenant isolation SLAs, support tiers, penalty structures, monitoring requirements, and reporting obligations. The workflow produces production-ready SLA contract templates differentiated by tenant tier (Free/Starter/Pro/Enterprise/Premium).

Act as a Platform Architect specializing in SLA design and service reliability for multi-tenant AI systems.

**Phase:** 3 (Solutioning) - Addresses gap in Planning/Solutioning phases

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing SLA commitments for multi-tenant AI platforms
- Creating tier-specific uptime and latency targets
- Defining tenant isolation guarantees
- Building support tier and escalation structures
- Designing penalty/credit structures for SLA breaches
- Establishing SLA monitoring and reporting requirements
- Generating customer-facing SLA contract templates

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| **Create** | Generate new SLA contract from scratch | `01-*` through `10-*` |
| **Edit** | Modify existing SLA contract | `step-10-e-*` through `step-11-e-*` (future) |
| **Validate** | Check against SLA completeness criteria | `step-20-v-*` through `step-22-v-*` (future) |

## Prerequisites

- Master architecture document completed
- Tenant model and tier definitions established
- **Config required:** `{tenant_model}`
- **Recommended:** Disaster recovery plan, Infrastructure architecture documentation

## Workflow Steps (Create Mode)

### Step 1: Analyze SLA Requirements
- Identify all tenant tiers and service level characteristics
- Gather requirements across key SLA dimensions
- Document stakeholder-specific SLA needs
- Benchmark against industry standards

### Step 2: Define Uptime Guarantees
- Establish availability targets per tier (99.0% to 99.99%)
- Define downtime exclusions
- Specify availability measurement methodology
- Document regional availability guarantees

### Step 3: Design Latency SLAs
- Define Time-to-First-Token (TTFT) targets per tier
- Establish end-to-end completion time guarantees
- Define throughput and queue time SLAs
- Document model-specific latency targets

### Step 4: Establish Isolation Guarantees
- Define data isolation commitments per tier
- Establish compute and network isolation guarantees
- Document AI context isolation (embeddings, memory)
- Map compliance requirements to isolation levels

### Step 5: Create Support Tiers
- Define support priority levels (P1-P4)
- Establish response and resolution time targets
- Define support channels per tier
- Document escalation procedures

### Step 6: Define Penalty Clauses
- Establish service credit schedules
- Define credit calculation rules
- Document termination rights
- Establish liability limitations

**Soft Gate:** Steps 1-6 complete the core SLA design. Present summary for confirmation.

### Step 7: Design Monitoring Requirements
- Define SLA metrics collection requirements
- Establish alerting thresholds
- Specify dashboard requirements
- Design automated breach detection

### Step 8: Document Reporting Obligations
- Define report types and contents
- Establish delivery schedules
- Specify status page requirements
- Document communication obligations

### Step 9: Validate SLA Feasibility
- Validate infrastructure capacity
- Assess provider dependencies
- Verify team capacity
- Calculate financial exposure
- Obtain stakeholder sign-offs

### Step 10: Finalize Contract Templates
- Define contract document structure
- Create tier-specific templates
- Establish amendment process
- Define review and publication workflow

## Quality Gates

This workflow contributes to:
- **QG-SLA1** (SLA Contract Gate) - Complete SLA design
- **QG-P1** (Production Readiness) - SLA contracts required for production

### Entry Gate
- QG-I1 (Convergence Gate) should pass before SLA planning
- Master architecture and tenant tier definitions must be complete

### Exit Gate (QG-SLA1)
- [ ] SLA tiers defined for all customer segments
- [ ] Uptime guarantees with exclusions documented
- [ ] Latency SLAs including TTFT targets defined
- [ ] Tenant isolation guarantees documented
- [ ] Support tiers with response times established
- [ ] Penalty/credit structures defined
- [ ] Monitoring requirements specified
- [ ] Reporting obligations documented
- [ ] Feasibility validated with stakeholder approvals
- [ ] Contract templates generated

## Outputs

| Output | Location |
|--------|----------|
| SLA Requirements Matrix | `{bam_artifacts}/sla-contract/requirements-matrix.md` |
| Uptime Guarantees | `{bam_artifacts}/sla-contract/uptime-guarantees.md` |
| Latency SLAs | `{bam_artifacts}/sla-contract/latency-slas.md` |
| Isolation Guarantees | `{bam_artifacts}/sla-contract/isolation-guarantees.md` |
| Support Tiers | `{bam_artifacts}/sla-contract/support-tiers.md` |
| Penalty Clauses | `{bam_artifacts}/sla-contract/penalty-clauses.md` |
| Monitoring Requirements | `{bam_artifacts}/sla-contract/monitoring-requirements.md` |
| Reporting Obligations | `{bam_artifacts}/sla-contract/reporting-obligations.md` |
| Feasibility Report | `{bam_artifacts}/sla-contract/feasibility-report.md` |
| Contract Templates | `{bam_artifacts}/sla-contract/contracts/` |

## Related Workflows

| Workflow | Relationship | When to Use |
|----------|--------------|-------------|
| `bmad-bam-create-master-architecture` | Prerequisite | Master architecture defines infrastructure for SLA planning |
| `bmad-bam-sli-slo-definition` | Follow-up | Define SLIs/SLOs aligned with SLA commitments |
| `bmad-bam-tenant-sla-monitoring` | Follow-up | Implement SLA monitoring per these requirements |
| `bmad-bam-incident-response-operations` | Related | Align incident response with SLA obligations |
| `bmad-bam-disaster-recovery-design` | Related | DR RTO/RPO objectives inform SLA commitments |
| `bmad-bam-tenant-aware-observability` | Related | Observability enables SLA breach detection |

## References

- Template: `{project-root}/_bmad/bam/templates/sla-contract-template.md`
- Patterns: `{project-root}/_bmad/bam/data/bam-patterns.csv` (filter: sla-contract)
- Quality Gates: `{project-root}/_bmad/bam/data/quality-gates.csv` (filter: QG-SLA1, QG-P1)
- Checklist: `{project-root}/_bmad/bam/checklists/production-readiness.md`

## Headless Mode

Accepts `--headless` / `-H` for autonomous execution using defaults and available inputs.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.
