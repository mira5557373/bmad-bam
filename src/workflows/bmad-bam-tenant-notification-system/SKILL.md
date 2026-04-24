---
name: bmad-bam-tenant-notification-system
displayName: Tenant Notification System
description: Design multi-tenant notification and communication system with channel management and tenant branding. Use when the user requests to 'design notification system' or 'plan tenant communications'.
module: bam
tags: [notification, communication, operations]
---

# Tenant Notification System

## Overview

This workflow designs a comprehensive notification and communication system for multi-tenant SaaS platforms. It covers channel design (email, SMS, push, in-app), template management, tenant preferences, delivery infrastructure, tracking and analytics, escalation rules, and tenant-specific branding. Run after tenant model isolation to ensure proper tenant context in all notifications.

Act as a Platform Architect specializing in multi-tenant communication systems and notification infrastructure.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing notification system for a new multi-tenant platform
- Adding new communication channels (email, SMS, push, in-app)
- Creating tenant-specific notification preferences
- Implementing notification tracking and analytics
- Designing escalation workflows for critical alerts
- Adding tenant branding to communications

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new notification system design | `step-01-c-*` to `step-09-c-*` |
| Edit | Modify existing notification design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against quality criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Previous workflow outputs available (if applicable)
- **Config required:** See `On Activation` section

## Workflow

### Step 1: Notification Requirements

- Define notification categories (transactional, marketing, system, security)
- Identify notification triggers and events
- Define urgency levels and SLA requirements
- Document regulatory requirements (CAN-SPAM, GDPR consent)

### Step 2: Channel Design (Email/SMS/Push/In-App)

- Design email delivery infrastructure (SendGrid, SES, Postmark)
- Design SMS delivery (Twilio, AWS SNS)
- Design push notification infrastructure (FCM, APNs)
- Design in-app notification system (WebSocket, SSE)

### Step 3: Template Management

- Design template versioning and storage
- Define template variables and personalization
- Design multi-language template support
- Create template testing and preview system

### Step 4: Tenant Preferences

- Design tenant notification settings schema
- Define user-level preference overrides
- Design channel opt-in/opt-out management
- Create preference inheritance model

**Soft Gate:** Steps 1-4 complete the core notification infrastructure design. Present a summary and ask for confirmation before proceeding to delivery, tracking, and branding.

### Step 5: Delivery Infrastructure

- Design notification queue and processing
- Define retry and failure handling policies
- Design rate limiting per tenant
- Create delivery scheduling system

### Step 6: Tracking and Analytics

- Design delivery tracking (sent, delivered, opened, clicked)
- Define tenant-scoped analytics dashboards
- Create notification performance metrics
- Design A/B testing for notification content

### Step 7: Escalation Rules

- Design escalation triggers and thresholds
- Define escalation paths per notification type
- Create on-call rotation integration
- Design acknowledgment and resolution tracking

### Step 8: Tenant Branding

- Design tenant-specific branding assets
- Create brand template customization
- Define branding inheritance and defaults
- Design brand preview and approval workflow

### Step 9: Documentation

- Create notification system architecture docs
- Document integration guides for each channel
- Create template authoring guidelines
- Document operational runbooks

## Quality Gates

This workflow contributes to:
- **QG-M2** (Tenant Isolation) - Tenant context in notifications
- **QG-I2** (Tenant Safety) - No cross-tenant notification leakage
- **QG-P1** (Production) - Notification system operational readiness

### Entry Gate
- QG-M2 (Tenant Isolation) must pass (tenant context propagation defined)

### Exit Gate
- Notification system checklist verified:
  - [ ] All channels designed with tenant isolation
  - [ ] Template management with tenant branding
  - [ ] Delivery infrastructure with rate limiting
  - [ ] Analytics tracking per tenant
  - [ ] Escalation rules documented

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Tenant context prerequisite
- `bmad-bam-tenant-onboarding-design` - Welcome notifications
- `bmad-bam-tenant-incident-response` - Incident notifications
- `bmad-bam-tenant-portal-design` - In-app notification UI

## Output

- `{output_folder}/planning-artifacts/notification-system-spec.md`

## References

- Template: `{project-root}/_bmad/bam/data/templates/notification-system-template.md`
- Patterns: `{project-root}/_bmad/bam/data/bam-patterns.csv` (filter: notification, event-driven)
- Checklist: `{project-root}/_bmad/bam/data/checklists/` (notification system validation)
