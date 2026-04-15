---
name: bmad-bam-credit-management
displayName: Credit Management
description: Design credit and prepaid balance management system. Use when the user requests to 'design credit management' or 'configure prepaid billing'.
module: bam
tags: [billing, platform]
---

# Credit Management

## Overview

This workflow designs the complete credit and prepaid balance management system from credit types through application to expiration handling. It covers promotional credits, service credits, prepaid balances, and audit trails. Run during foundation phase.

Act as a Platform Architect designing a production-grade credit management system.

## When to Use

- Designing credit and prepaid systems
- Configuring promotional credit workflows
- Building balance management features

## Workflow

### Step 1: Define Credit Types

Configure credit categories:
- Promotional credits
- Service credits (SLA violations)
- Prepaid balances
- Referral credits

### Step 2: Configure Application Rules

Design credit application:
- Application priority order
- Partial application handling
- Multi-currency credits
- Proration rules

### Step 3: Design Expiration Handling

Configure credit lifecycle:
- Expiration policies
- Notification schedules
- Rollover rules
- Forfeiture handling

### Step 4: Configure Audit Trail

Design credit tracking:
- Credit issuance logging
- Application history
- Balance reconciliation
- Compliance reporting

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-F1** | Contributes | Foundation-level credit system |
| **QG-M2** | Contributes | Tenant-scoped credits |
| **QG-P1** | Contributes | Production-ready balance management |

## Output

- `{output_folder}/planning-artifacts/billing/credit-management-design.md`
- Credit type specification
- Application rules documentation
