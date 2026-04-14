---
name: payment-processing
displayName: Payment Processing
description: Design payment gateway integration with Stripe/Braintree. Use when the user requests to 'design payment processing' or 'integrate payment gateway'.
module: bam
tags: [billing, platform]
---

# Payment Processing

## Overview

This workflow designs the complete payment processing pipeline from gateway integration through transaction handling to reconciliation. It covers payment method management, transaction processing, webhook handling, dunning workflows, and PCI compliance. Run during foundation phase.

Act as a Platform Architect designing a production-grade payment processing system.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Integrating payment gateway (Stripe, Braintree)
- Designing transaction processing pipelines
- Building subscription billing systems

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Gateway Selection

Select and configure payment gateway:

- Gateway comparison (Stripe, Braintree, Adyen)
- Feature requirements mapping
- Regional availability
- Pricing structure analysis
- Integration complexity assessment

### Step 2: Payment Method Configuration

Configure supported payment methods:

- Card payments (Visa, MC, Amex)
- ACH/SEPA bank transfers
- Digital wallets (Apple Pay, Google Pay)
- Invoice/wire for enterprise
- Method validation and storage

### Step 3: Transaction Processing

Design transaction handling:

- Authorization and capture flows
- Subscription payment scheduling
- Retry logic for failures
- Idempotency handling
- Currency conversion

**Soft Gate:** Steps 1-3 complete the payment foundation design from gateway selection through transaction processing. Present a summary of gateway choice, payment methods, and transaction flows. Ask for confirmation before proceeding to webhooks, dunning, and reconciliation.

### Step 4: Webhook Integration

Configure webhook handling:

- Event subscription setup
- Webhook signature verification
- Event processing and routing
- Failure handling and retry
- Event deduplication

### Step 5: Dunning Workflow

Design failed payment recovery:

- Retry schedule configuration
- Customer notification sequence
- Grace period handling
- Account suspension triggers
- Recovery analytics

### Step 6: Reconciliation

Configure payment reconciliation:

- Daily settlement reconciliation
- Dispute/chargeback handling
- Refund processing
- Revenue recognition integration
- Audit trail maintenance

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-F1** | Contributes | Foundation-level payment architecture |
| **QG-M2** | Contributes | Tenant-scoped payment processing |
| **QG-I2** | Contributes | Tenant safety in payment data |
| **QG-P1** | Contributes | Production-ready payment pipeline |

- **Entry Gate:** QG-F1 (Foundation) - Master architecture must define payment approach
- **Exit Gate:** QG-M2 (Tenant Isolation) - Payments must be tenant-scoped

### Verification Checklist

- [ ] Payment gateway integrated with proper error handling
- [ ] Payment methods configured with validation
- [ ] Transaction processing handles all scenarios
- [ ] Webhook handling with signature verification
- [ ] Dunning workflow prevents involuntary churn

## Output

- `{output_folder}/planning-artifacts/billing/payment-processing-design.md`
- Gateway integration specification
- PCI compliance requirements

## References

- Knowledge: `bam/knowledge/multi-tenant-patterns.md`, `bam/knowledge/saga-orchestration-patterns.md`
