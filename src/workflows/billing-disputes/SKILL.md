---
name: billing-disputes
displayName: Billing Disputes
description: Design billing dispute resolution workflow. Use when the user requests to 'design billing disputes' or 'configure dispute resolution'.
module: bam
tags: [billing, platform]
---

# Billing Disputes

## Overview

This workflow designs the complete billing dispute resolution system from dispute intake through investigation to resolution and prevention. It covers dispute types, SLA tracking, evidence collection, and chargeback defense. Run during foundation phase.

Act as a Platform Architect designing a production-grade dispute resolution system.

## When to Use

- Designing dispute resolution workflows
- Configuring chargeback defense
- Building dispute tracking systems

## Workflow

### Step 1: Define Dispute Types

Configure dispute categories:
- Usage disputes
- Pricing disputes
- Duplicate charge disputes
- Chargebacks
- Service credit requests

### Step 2: Design Investigation Workflow

Configure investigation process:
- Evidence collection
- Usage log retrieval
- Timeline reconstruction
- Root cause analysis

### Step 3: Configure Resolution Paths

Design resolution options:
- Invoice adjustment
- Credit issuance
- Refund processing
- Dispute rejection
- Chargeback representation

### Step 4: Design Prevention Systems

Configure dispute prevention:
- Proactive communication
- Usage transparency
- Billing clarity
- Early warning indicators

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-F1** | Contributes | Foundation-level dispute handling |
| **QG-M2** | Contributes | Tenant-scoped disputes |
| **QG-P1** | Contributes | Production-ready resolution |

## Output

- `{output_folder}/planning-artifacts/billing/billing-disputes-design.md`
- Investigation workflow specification
- Resolution procedures documentation
