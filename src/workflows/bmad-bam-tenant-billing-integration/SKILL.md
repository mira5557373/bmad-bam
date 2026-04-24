---
name: bmad-bam-tenant-billing-integration
displayName: Tenant Billing Integration
description: Design billing system integration for multi-tenant SaaS platforms. Use when the user requests to design billing integration, configure payment processing, or implement subscription management.
module: bam
tags: [billing, payment, subscription, pricing, revenue]
---

# Tenant Billing Integration

## Overview

This workflow designs the complete billing system integration for multi-tenant SaaS platforms, covering billing requirements analysis, pricing model design, usage tracking integration, invoice generation, payment processing, subscription management, tier upgrades/downgrades, billing notifications, and reconciliation processes.

Act as a Platform Architect designing a production-grade billing system integration for multi-tenant environments.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing billing and payment integration for multi-tenant platforms
- Implementing subscription management with tier-based pricing
- Integrating usage-based billing with payment processors
- Setting up invoice generation and payment workflows
- Designing tier upgrade/downgrade processes

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

### Step 1: Billing Requirements

Define billing requirements including payment methods, currencies, and compliance needs.

### Step 2: Pricing Models

Design pricing models for each tenant tier including flat rates, usage-based, and hybrid pricing.

### Step 3: Usage Tracking Integration

Integrate with usage metering to capture billable events and consumption data.

### Step 4: Invoice Generation

Design invoice generation workflows including line items, taxes, and formatting.

### Step 5: Payment Processing

Configure payment processor integration including card handling, retry logic, and security.

### Step 6: Subscription Management

Design subscription lifecycle including creation, renewal, pausing, and cancellation.

### Step 7: Tier Upgrades/Downgrades

Design tier migration workflows with proration and immediate vs. end-of-period changes.

### Step 8: Billing Notifications

Configure billing notifications including payment confirmations, failures, and reminders.

### Step 9: Reconciliation

Design reconciliation processes between usage metering, billing, and payment providers.

**Soft Gate:** Steps 1-9 complete the billing integration design. Present a summary and ask for confirmation.

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-F1** | Contributes | Foundation-level billing architecture |
| **QG-M2** | Contributes | Tenant-scoped billing and subscriptions |
| **QG-I2** | Contributes | Tenant safety in payment processing |
| **QG-P1** | Contributes | Production-ready billing integration |

- **Entry Gate:** QG-F1 (Foundation) - Master architecture must define billing approach
- **Exit Gate:** QG-M2 (Tenant Isolation) - Billing must be tenant-scoped

### Verification Checklist

- [ ] Billing requirements documented with compliance needs
- [ ] Pricing models defined for all tiers
- [ ] Usage tracking integration configured
- [ ] Invoice generation workflow designed
- [ ] Payment processing with retry logic configured
- [ ] Subscription lifecycle fully defined
- [ ] Tier migration with proration designed
- [ ] Billing notifications configured
- [ ] Reconciliation process documented

## Output

- `{output_folder}/planning-artifacts/billing-integration-spec.md`
- Payment processor configuration
- Subscription management spec

## References

- Pattern: `billing-integration` in `bam-patterns.csv`
- Template: `billing-integration-template.md`
- Related: `bmad-bam-usage-metering-design`
