---
name: sli-slo-definition
displayName: SLI/SLO Definition
description: Define Service Level Indicators and Objectives for multi-tenant platform. Use when the user requests to 'define SLIs/SLOs' or 'create service level objectives'.
module: bam
tags: [observability, sre]
---

# SLI/SLO Definition

## Overview

This workflow defines Service Level Indicators (SLIs) and Service Level Objectives (SLOs) for a multi-tenant platform. It covers SLI identification, SLO target setting, error budget design, and tenant-tier-specific SLAs. Run after observability infrastructure is designed to ensure metrics are available for SLI measurement.

Act as a Site Reliability Engineer (SRE) specializing in multi-tenant platform reliability.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Defining service level indicators for the platform
- Setting reliability targets per service
- Designing error budget policies
- Creating tenant-tier-specific SLAs

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new SLI/SLO definitions | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing SLI/SLO definitions | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against QG-P1 criteria | `step-20-v-*` to `step-22-v-*` |

## Workflow

### Step 1: SLI Identification

- Identify key reliability indicators for each service
- Define SLI specification (what to measure, how to measure)
- Map SLIs to user-facing journeys
- Establish SLI measurement methodology (ratio, histogram)

### Step 2: SLO Target Setting

- Set SLO targets per SLI (e.g., 99.9% availability)
- Define measurement windows (rolling, calendar)
- Establish burn rate thresholds
- Create alerting rules for SLO breaches

### Step 3: Error Budget Design

- Calculate error budgets from SLO targets
- Design error budget consumption policies
- Define error budget exhaustion procedures
- Create error budget reporting dashboards

**Soft Gate:** Steps 1-3 complete the SLI/SLO foundation. Present a summary of SLIs, SLO targets, and error budget policies. Ask for confirmation before proceeding to tenant-tier SLAs.

### Step 4: Tenant-Tier SLAs

- Define SLA commitments per tenant tier:
  - Enterprise: 99.99% availability, 100ms P99 latency
  - Pro: 99.9% availability, 200ms P99 latency
  - Free: 99% availability, best effort latency
- Map SLAs to SLOs
- Design SLA breach remediation procedures
- Create tier-specific monitoring dashboards

## Quality Gates

This workflow contributes to:
- **QG-P1** (Production Readiness) - Primary gate for SRE readiness
- **QG-I2** (Tenant Safety) - Tenant-tier SLA verification
- **QG-M2** (Tenant Isolation) - Tier-based monitoring isolation

### Entry Gate
- QG-F1 (Foundation) must pass (master architecture defined)
- Observability infrastructure designed (metrics available)

### Exit Gate
- QG-P1 checklist items from `production-readiness.md` verified:
  - [ ] SLIs defined for all critical services
  - [ ] SLO targets set with measurement windows
  - [ ] Error budget policies documented
  - [ ] Tenant-tier SLAs aligned with SLOs

## Related Workflows

- `bmad-bam-tenant-aware-observability` - Observability infrastructure prerequisite
- `bmad-bam-distributed-tracing-design` - Tracing for SLI correlation
- `bmad-bam-tenant-incident-response` - Incident response uses SLO breaches
- `bmad-bam-tenant-health-monitoring` - Health monitoring based on SLIs

## Output

- `{output_folder}/planning-artifacts/architecture/sli-slo-definition.md`
- SLI specification documents
- SLO target configurations
- Error budget dashboards
- Tenant-tier SLA matrix

## References

- Template: `{project-root}/_bmad/bam/data/templates/sli-slo-template.md`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/sre-patterns.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/observability-patterns.md`
- Checklist: `{project-root}/_bmad/bam/data/checklists/production-readiness.md`

## Web Research

Use web search to verify current best practices:
- Search: "SLI SLO best practices multi-tenant {date}"
- Search: "error budget policy design {date}"
- Search: "tenant-tier SLA patterns SaaS {date}"
