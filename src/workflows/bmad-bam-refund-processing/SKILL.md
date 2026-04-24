---
name: bmad-bam-refund-processing
displayName: Refund Processing
description: Design refund workflow with audit trail. Use when the user requests to 'design refund processing' or 'configure refund workflow'.
module: bam
tags: [billing, platform]
---

# Refund Processing

## Overview

This workflow designs the complete refund processing system from request initiation through approval to execution and reconciliation. It covers refund types, approval workflows, gateway integration, and accounting treatment. Run during foundation phase.

Act as a Platform Architect designing a production-grade refund processing system.

## When to Use

- Designing refund workflows
- Configuring approval processes
- Building refund reconciliation systems

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new artifact | `step-01-c-*` to `step-09-c-*` |
| Edit | Modify existing artifact | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Previous workflow outputs available (if applicable)
- **Config required:** See `On Activation` section

## Workflow

### Step 1: Define Refund Types

Configure refund categories:
- Full refunds
- Partial refunds
- Credit refunds (to account balance)
- Payment method refunds

### Step 2: Design Approval Workflow

Configure approval rules:
- Auto-approval thresholds
- Manual approval triggers
- Escalation paths
- Fraud prevention checks

### Step 3: Configure Gateway Integration

Design payment gateway refunds:
- Refund API integration
- Partial refund handling
- Cross-border refunds
- Failed refund recovery

### Step 4: Design Accounting Treatment

Configure financial handling:
- Revenue reversal
- Credit note generation
- GL journal entries
- Tax adjustment handling

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-F1** | Contributes | Foundation-level refund system |
| **QG-M2** | Contributes | Tenant-scoped refunds |
| **QG-P1** | Contributes | Production-ready processing |

## Output

- `{output_folder}/planning-artifacts/billing/refund-processing-design.md`
- Approval workflow specification
- Accounting treatment documentation
