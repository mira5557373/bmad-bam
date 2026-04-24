---
name: bmad-bam-etl-pipeline-design
displayName: ETL Pipeline Design
description: Design ETL pipelines for multi-tenant data processing. Use when the user requests to 'design ETL pipeline' or 'create data integration'.
module: bam
tags: [data, integration]
---

# ETL Pipeline Design

## Overview

This workflow designs ETL (Extract, Transform, Load) pipelines for multi-tenant data processing. It covers pipeline architecture, tenant isolation design, error handling, and monitoring strategies. This workflow ensures data flows maintain tenant boundaries and provide reliable data integration.

Act as a Data Architect designing production-grade multi-tenant ETL infrastructure.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing data ingestion pipelines for tenant data
- Creating data transformation workflows
- Building data export/integration pipelines
- Establishing cross-system data synchronization

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new ETL pipeline design | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing pipeline design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against QG-I2 criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Previous workflow outputs available (if applicable)
- **Config required:** See `On Activation` section

## Workflow

### Step 1: Pipeline Architecture

Design the overall ETL pipeline architecture:

- Pipeline orchestration strategy (Airflow, Dagster, Prefect)
- Extract sources (databases, APIs, files, streams)
- Transform processing (batch vs streaming)
- Load destinations (data warehouse, analytics, exports)
- Pipeline scheduling and triggers
- Resource allocation per tenant tier

### Step 2: Tenant Isolation Design

Ensure tenant data isolation throughout the pipeline:

- Tenant context injection at extraction
- Data partitioning strategies
- Isolated processing environments
- Tenant-scoped credentials management
- Cross-tenant data prevention
- Audit trail for data access

### Step 3: Error Handling

Define error handling and recovery strategies:

- Error classification (retryable vs fatal)
- Retry policies with exponential backoff
- Dead letter queues for failed records
- Partial failure handling
- Data reconciliation procedures
- Alerting and escalation

### Step 4: Monitoring

Establish pipeline observability:

- Pipeline health metrics
- Tenant-scoped performance tracking
- Data quality monitoring
- SLA compliance tracking
- Cost attribution per tenant
- Capacity planning metrics

## Quality Gates

This workflow contributes to:
- **QG-I2** (Tenant Safety) - Primary gate for tenant data safety in ETL

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-M2** | Contributes | Tenant isolation in data processing |
| **QG-I2** | Primary | Tenant safety validation |
| **QG-P1** | Contributes | Production-ready data pipelines |

### Entry Gate
- QG-M2 (Tenant Isolation) must pass (tenant isolation design complete)

### Exit Gate
- QG-I2 checklist items verified:
  - [ ] Tenant context propagated through pipeline
  - [ ] No cross-tenant data leakage possible
  - [ ] Error handling preserves tenant boundaries
  - [ ] Monitoring is tenant-scoped

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Tenant isolation prerequisite
- `bmad-bam-tenant-data-migration` - Uses ETL patterns for migration
- `bmad-bam-usage-metering-design` - Metering for data operations

## Output

- `{output_folder}/planning-artifacts/data/etl-pipeline-design.md`
- Pipeline architecture diagrams
- Error handling specifications
- Monitoring configuration

## References

- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`
- Checklist: `{project-root}/_bmad/bam/data/checklists/qg-i2-tenant-safety.md`
