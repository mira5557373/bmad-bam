---
name: bmad-bam-pricing-tier-configuration
displayName: Pricing Tier Configuration
description: Design dynamic pricing tier configuration system. Use when the user requests to 'configure pricing tiers' or 'design tier management'.
module: bam
tags: [billing, platform]
---

# Pricing Tier Configuration

## Overview

This workflow designs the complete dynamic pricing tier configuration system from tier definition through feature gating to price versioning. It covers tier attributes, feature entitlements, usage limits, pricing models, and tier migration. Run during foundation phase.

Act as a Platform Architect designing a production-grade pricing tier system.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## When to Use

- Designing multi-tier pricing models
- Configuring feature-gated tiers
- Building dynamic pricing systems

## Workflow

### Step 1: Define Tier Structure

Define pricing tier hierarchy:

- Tier naming and positioning
- Feature entitlements per tier
- Usage limits and quotas
- Pricing model selection

### Step 2: Configure Feature Gating

Design feature entitlement system:

- Feature flag integration
- Entitlement checking
- Graceful degradation
- Upgrade prompts

### Step 3: Design Price Versioning

Configure pricing versioning:

- Price change management
- Grandfathering policies
- Migration automation
- Rollback procedures

### Step 4: Configure Tier Analytics

Design tier analytics:

- Tier distribution metrics
- Upgrade/downgrade tracking
- Feature adoption by tier
- Pricing optimization data

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-F1** | Contributes | Foundation-level pricing architecture |
| **QG-M2** | Contributes | Tenant-scoped tier management |
| **QG-P1** | Contributes | Production-ready pricing |

## Output

- `{output_folder}/planning-artifacts/billing/pricing-tier-design.md`
- Tier configuration specification
- Feature entitlement matrix
