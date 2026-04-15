---
name: webhook-management-design
displayName: Webhook Management Design
description: Design tenant webhook delivery with at-least-once guarantees, retry queues, HMAC signing, and dead letter handling.
module: bam
tags: [integration, tenant]
---

# Webhook Management Design

## Overview

This workflow designs the tenant webhook delivery system, covering event definition, delivery mechanisms, retry logic, security (HMAC signing), and dead letter handling. It ensures reliable webhook delivery with at-least-once guarantees while maintaining tenant isolation and security.

Act as a Platform Architect designing reliable tenant webhook infrastructure.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing webhook delivery infrastructure
- Creating tenant notification systems
- Building event-driven integrations
- Implementing reliable message delivery

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Define Webhook Events

Define the events that trigger webhooks:

| Event Category | Events | Payload |
|----------------|--------|---------|
| Tenant Lifecycle | tenant.created, tenant.suspended, tenant.reactivated | Tenant ID, status, timestamp |
| Agent Execution | agent.run.started, agent.run.completed, agent.run.failed | Run ID, agent ID, status, result |
| Billing | invoice.created, payment.succeeded, payment.failed | Invoice ID, amount, status |
| Security | api_key.rotated, suspicious_activity.detected | Event details, severity |

### Step 2: Design Delivery System

Design the webhook delivery mechanism:

- Queue-based delivery for reliability
- Tenant-specific endpoint configuration
- Batching options for high-volume events
- Delivery status tracking and logging

### Step 3: Configure Retry Logic

Design retry and failure handling:

- Exponential backoff with jitter
- Maximum retry attempts (configurable per tenant/tier)
- Dead letter queue for failed deliveries
- Manual retry interface

**Soft Gate:** Steps 1-3 complete the core delivery design. Present a summary of events, delivery, and retry logic. Ask for confirmation before proceeding to security design.

### Step 4: Design Security

Design webhook security measures:

- HMAC signature generation and verification
- Timestamp inclusion for replay protection
- Secret rotation procedures
- IP allowlisting (enterprise tier)

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-I1** | Primary | Integration convergence for webhook delivery |
| **QG-M2** | Contributes | Tenant isolation in webhook routing |
| **QG-P1** | Contributes | Production-ready webhook infrastructure |

- **Entry Gate:** QG-M2 (Tenant Isolation) - Tenant model must be defined
- **Exit Gate:** QG-I1 (Convergence) - Webhook delivery must be reliable and secure

### Verification Checklist

- [ ] Webhook events fully defined
- [ ] Delivery system architecture complete
- [ ] Retry logic with dead letter handling
- [ ] HMAC security implemented
- [ ] Tenant isolation maintained

## Output

- `{output_folder}/planning-artifacts/integration/webhook-management-spec.md`
- Event catalog with payload schemas
- Security configuration guide

## References

- Template: `{project-root}/_bmad/bam/data/templates/webhook-delivery-template.md`
- Multi-Tenant Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`
- Event-Driven Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/event-driven-patterns.md`
