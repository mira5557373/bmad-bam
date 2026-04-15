---
name: bmad-bam-usage-alerts-design
displayName: Usage Alerts Design
description: Design usage threshold alerts and notification system. Use when the user requests to 'design usage alerts' or 'configure billing notifications'.
module: bam
tags: [billing, platform]
---

# Usage Alerts Design

## Overview

This workflow designs the complete usage threshold alerting system from threshold configuration through notification delivery to action triggers. It covers alert rules, multi-channel notifications, escalation paths, and self-service controls. Run during foundation phase.

Act as a Platform Architect designing a production-grade usage alerting system.

## When to Use

- Designing usage threshold notifications
- Configuring cost alerting systems
- Building proactive billing communications

## Workflow

### Step 1: Define Alert Thresholds

Configure usage thresholds:
- Percentage-based thresholds (50%, 75%, 90%, 100%)
- Absolute value thresholds
- Rate-of-change alerts
- Forecasted overage alerts

### Step 2: Configure Notification Channels

Design notification delivery:
- Email notifications
- In-app notifications
- Webhook integrations
- SMS for critical alerts

### Step 3: Design Escalation Paths

Configure escalation rules:
- Self-service resolution paths
- Admin notification escalation
- Automatic action triggers
- Account management alerts

### Step 4: Configure Self-Service Controls

Design tenant controls:
- Custom threshold configuration
- Notification preferences
- Alert suppression windows
- Budget caps

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-F1** | Contributes | Foundation-level alerting |
| **QG-M2** | Contributes | Tenant-scoped alerts |
| **QG-P1** | Contributes | Production-ready notifications |

## Output

- `{output_folder}/planning-artifacts/billing/usage-alerts-design.md`
- Alert configuration specification
- Notification templates
