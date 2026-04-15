---
name: invoice-generation
displayName: Invoice Generation
description: Design automated invoice generation pipeline. Use when the user requests to 'design invoice generation' or 'configure billing automation'.
module: bam
tags: [billing, platform]
---

# Invoice Generation

## Overview

This workflow designs the complete automated invoice generation pipeline from usage aggregation through PDF generation to delivery. It covers invoice scheduling, line item calculation, tax handling, PDF templating, and multi-channel delivery. Run during foundation phase.

Act as a Platform Architect designing a production-grade invoice generation system.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing automated invoice generation
- Creating billing document pipelines
- Building tenant invoice delivery systems

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Invoice Schema Definition

Define invoice data structure and line items:

- Invoice header fields (number, dates, tenant info)
- Line item structure (description, quantity, unit price, amount)
- Tax calculation fields
- Payment terms and due date logic
- Currency and localization requirements

### Step 2: Usage Aggregation Integration

Configure usage data collection:

- Usage metering data sources
- Billing period boundaries
- Usage-to-line-item mapping
- Proration handling for mid-cycle changes
- Credit and adjustment application

### Step 3: Invoice Scheduling

Design invoice generation scheduling:

- Billing cycle configuration (monthly, quarterly, annual)
- Grace period handling
- Retry logic for failed generations
- Manual invoice triggering

### Step 4: PDF Generation Pipeline

Configure document generation:

- PDF template design and branding
- Dynamic content rendering
- Multi-language support
- Attachment handling
- Archive storage strategy

**Soft Gate:** Steps 1-4 complete the invoice generation design from schema through PDF creation. Present a summary of invoice schema, usage integration, scheduling, and PDF pipeline. Ask for confirmation before proceeding to delivery and audit.

### Step 5: Delivery Configuration

Design multi-channel delivery:

- Email delivery with attachments
- Portal download availability
- Webhook notifications
- API access for programmatic retrieval

### Step 6: Audit and Compliance

Configure audit trail:

- Invoice immutability after finalization
- Amendment and credit note handling
- Regulatory compliance (tax retention)
- Reconciliation with payment records

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-F1** | Contributes | Foundation-level billing architecture |
| **QG-M2** | Contributes | Tenant-scoped invoice generation |
| **QG-I2** | Contributes | Tenant safety in invoice data |
| **QG-P1** | Contributes | Production-ready billing pipeline |

- **Entry Gate:** QG-F1 (Foundation) - Master architecture must define billing approach
- **Exit Gate:** QG-M2 (Tenant Isolation) - Invoices must be tenant-scoped

### Verification Checklist

- [ ] Invoice schema supports all line item types
- [ ] Usage aggregation correctly maps to line items
- [ ] PDF generation handles multi-language and branding
- [ ] Delivery channels configured with retry logic
- [ ] Audit trail maintains invoice immutability

## Output

- `{output_folder}/planning-artifacts/billing/invoice-generation-design.md`
- Invoice schema specification
- PDF template requirements

## References

- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/saga-orchestration-patterns.md`
