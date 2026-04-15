---
name: usage-metering-design
displayName: Usage Metering Design
description: Design usage metering pipeline for billing. Use when the user requests to 'design usage metering' or 'configure billing pipeline'.
module: bam
tags: [platform]
---

# Usage Metering Design

## Overview

This workflow designs the complete usage metering pipeline from event sources through Kafka aggregation to Orb/Stripe invoicing. It covers metering dimensions, event producers, pipeline design, billing integration, quota enforcement, and reconciliation. Run during foundation phase.

Act as a Platform Architect designing a production-grade usage-based billing pipeline.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing usage metering and tracking
- Creating billing integration patterns
- Building quota management systems

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Metering Dimensions

Define what to meter and map to tenant tier quotas:

- LLM tokens (input/output, per model)
- API calls (per endpoint category)
- Storage (GB, per asset type)
- Compute hours (agent execution time)
- Define overage pricing per dimension per tier

### Step 2: Event Producers

Configure event sources:

- Langfuse → LLM token usage events
- LiteLLM → API call events
- Application → storage and compute events
- Each event carries: tenant_id, dimension, quantity, timestamp

### Step 3: Kafka Pipeline

- Topic: `metering.events` partitioned by tenant_id
- Kafka Streams aggregation (5-minute tumbling windows)
- Dead letter queue for malformed events
- Schema registry for event contracts

### Step 4: Orb Integration

- Ingest API configuration (batch ingestion from Kafka consumer)
- Pricing plan mapping per tenant tier
- Billable metric definitions matching metering dimensions
- Plan versioning for tier changes

**Soft Gate:** Steps 1-4 complete the metering pipeline design from event sources through Orb integration. Present a summary of metering dimensions, event producers, Kafka pipeline, and Orb configuration. Ask for confirmation before proceeding to Stripe integration, quota enforcement, and reconciliation.

### Step 5: Stripe Integration

- Invoice generation from Orb
- Payment processing and webhook handling
- Dunning workflow for failed payments
- Credit/refund handling

### Step 6: Quota Enforcement

- Real-time quota checks BEFORE expensive operations (LLM calls, storage writes)
- Graceful denial when budget exceeded (informative error, not crash)
- Cost alerting thresholds per tenant (80%, 90%, 100% of quota)
- Admin override for temporary quota increases

### Step 7: Reconciliation

- Daily reconciliation between metering events and Orb invoices
- Discrepancy alerting (>5% variance triggers investigation)
- Monthly audit report

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-F1** | Contributes | Foundation-level billing architecture |
| **QG-M2** | Contributes | Tenant-scoped metering and quotas |
| **QG-I2** | Contributes | Tenant safety in usage tracking |
| **QG-P1** | Contributes | Production-ready billing pipeline |

- **Entry Gate:** QG-F1 (Foundation) - Master architecture must define billing approach
- **Exit Gate:** QG-M2 (Tenant Isolation) - Metering must be tenant-scoped

### Verification Checklist

- [ ] All metering dimensions mapped to Kafka events
- [ ] Orb pricing plans configured per tenant tier
- [ ] Quota enforcement prevents overspend before LLM calls
- [ ] Cost alerting thresholds defined
- [ ] Reconciliation process documented

## Output

- `{output_folder}/planning-artifacts/architecture/usage-metering-design.md`
- Kafka topic schemas
- Orb configuration spec

## References

- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/saga-orchestration-patterns.md`
