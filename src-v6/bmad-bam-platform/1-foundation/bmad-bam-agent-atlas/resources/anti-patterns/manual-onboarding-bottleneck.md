---
id: manual-onboarding-bottleneck
title: Manual Onboarding Bottleneck
kind: anti-pattern
module: bmad-bam-platform
persona: atlas
category: lifecycle
qg_ref: QG-M2
last_reviewed: 2026-05-17
version: 1.0.0
status: active
severity: high
applicability:
  - greenfield: must-avoid
  - brownfield: must-fix
references:
  - "docs/v6-final-architecture.md §6.2"
  - "src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/tenant-provisioning-patterns.md"
---

# Manual Onboarding Bottleneck

## Summary

Onboarding flow that REQUIRES human-in-loop (ops/sales/security/CS) for tiers that should self-serve. Examples: free signups gated by manual approval; starter tier requiring ops ticket to provision; pro requiring sales meeting before access.

## Symptoms

- Free/starter signups take > 5min (target: < 1min for self_serve flow_type)
- Ops/CS team has growing onboarding ticket queue
- Tenant churn rate at "trial activation" step > 30%
- Sales pipeline gates conversion at procurement intake when not legally required

## Root causes

1. **Risk aversion** — fear of unverified isolation; mitigated by isolation-verification-step (see fragment) not gating
2. **Compliance over-application** — applying enterprise-tier DPA review to free-tier signups
3. **Operational laziness** — automating provisioning has upfront cost; cheaper to onboard manually until volume forces action
4. **Tier-mis-classification** — treating a self_serve-eligible tier as sales_led

## Why harmful

- Throttles growth (every signup must clear human queue)
- Increases customer acquisition cost (CAC)
- Hides product-market-fit signals (manual filter biases who signs up)
- Burns ops/sales capacity on routine work

## Remediation

Use `tenant-provisioning-patterns.md` + `first-touch-isolation-verification.md` fragments to automate flows for self_serve tiers. Reserve sales_led flow for tiers that LEGITIMATELY require AE involvement (procurement, DPA, custom contract). Use `assisted_signup` flow for the middle ground (auto-provision + AE follow-up).

## When acceptable

- Closed-beta phase (early validation; manual is fine before automation pays off)
- Highly-regulated verticals (HIPAA-BAA-required pre-provisioning; legitimate sales-led gating)
- Geographic constraints (region-not-yet-launched; manual provisioning bridges the gap)

## Cross-references

- Fragment: [tenant-provisioning-patterns.md](../fragments/tenant-provisioning-patterns.md)
- Fragment: [first-touch-isolation-verification.md](../fragments/first-touch-isolation-verification.md)
- Cousin anti-pattern: `tenancy-as-afterthought.md` (P3.1 family — similar root cause of operational shortcuts)
