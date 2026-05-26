---
id: tier-upgrade-without-billing-prorate
title: Tier Upgrade Without Billing Prorate
kind: anti-pattern
module: bmad-bam-platform
persona: atlas
category: lifecycle
qg_ref: QG-D1
last_reviewed: 2026-05-17
version: 1.0.0
status: active
severity: critical
applicability:
  - greenfield: must-avoid
  - brownfield: must-fix
references:
  - "src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/tenant-tier-upgrade-mechanics.md"
  - "src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/migration-rollback-and-abort.md"
  - "src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/anti-patterns/tier-cliff.md"
---

# Tier Upgrade Without Billing Prorate

## Summary

A tenant upgrades tier mid-billing-cycle (free → pro on the 15th of a 30-day cycle; business → enterprise on the 22nd of a 28-day cycle). The platform's billing engine charges **full-price-from-day-N** rather than **prorated-from-upgrade-timestamp**: the customer is charged the full new-tier monthly amount immediately, and the unused portion of the old-tier charge is neither refunded nor credited. The customer effectively pays twice during the cycle (full old-tier amount + full new-tier amount), with no offset for the timing overlap. The new tier's features become available immediately; the bill arrives with no annotation explaining the doubled charge.

The anti-pattern manifests as: tier-upgrade billing transactions in the billing-engine that lack a `proration_calculation` audit record; customer support tickets asking "why was I charged the full amount when I upgraded mid-cycle?"; refund requests from customers who notice the issue; or — worst case — regulatory inquiry following an auditor's review of billing accuracy under GDPR Art 5 (data accuracy principle) + applicable tax laws. The technical surface is a missing or short-circuited proration step in the upgrade pipeline; the regulatory + customer-trust surface is much larger.

## Symptoms

- Tier-upgrade billing transactions in the billing-engine lack a `proration_calculation` audit record OR have a record that records `full_price_from_upgrade_day: true`
- The migration-runbook for tier-axis has `cohorts[*].billing_prorate: false` (caught by `bmad-bam-design-tenant-migration-tooling` step-07-v invariant — but only if the runbook was generated correctly; an undesigned runbook is also a symptom)
- Customer support tickets recurring with subject lines like "double charge", "mid-cycle upgrade billing error", "why am I being charged the full amount?"
- Refund queue size is non-zero (more than a few per quarter — a few may be edge cases; recurring volume indicates structural issue)
- Customer-success team's customer churn dashboard shows churn-after-upgrade clusters (customer upgrades, sees the double charge, churns out of distrust)
- Annual audit (SOC 2; ISO 27001; PCI DSS for billing surfaces) flags billing-accuracy gap
- Tax-engine integration logs show tax calculated on the full new-tier amount rather than the prorated amount (or worse: tax calculated on no amount because the calculation never happened)
- Stripe/Chargebee/billing-provider dashboard shows pattern of "upgrade transactions" without corresponding "credit-back transactions" for the prorated old-tier
- Engineering team can't point to the proration formula or audit record location ("it's just whatever the billing provider does")
- Tier-upgrade tests in CI don't assert proration audit trail (BYP-* / billing-test coverage gap)

## Root causes

1. **"Stripe/Chargebee handles it" assumption.** Engineers assume the billing provider's tier-change API handles proration automatically. Some do (Stripe Billing's subscription-update with `proration_behavior: "create_prorations"`); some don't (raw Stripe-API calls; custom billing-stack). The assumption is wrong unless explicitly verified.

2. **Tier-upgrade as feature flip only.** The team treats tier-upgrade as a feature-flag flip (the customer-visible feature changes) and forgets the billing layer needs the same coordination. The feature flips immediately; the billing stays at the old amount until next cycle (under-bill) OR jumps to the full new amount mid-cycle (over-bill, this anti-pattern).

3. **Mid-cycle billing complexity underestimated.** Proration math is fiddly: leap years, monthly cycles vs. annual cycles, tax-jurisdiction snapshots, multi-tier jumps. Engineers ship the simple "charge full amount at next cycle" path and defer mid-cycle proration as "we'll fix it later" — which becomes never.

4. **No upgrade-time audit trail.** Without an audit record, the team can't see how often this happens. By the time customers complain, weeks-of-billing-cycles have produced incorrect bills.

5. **Refund process treats prorations as exceptions.** Customer complains; support team issues a refund; the refund treated as a one-off rather than a structural fix signal. Each refund is band-aid; the underlying bug persists.

6. **Tax-engine integration loose.** Tax-engine receives the upgrade charge as a flat amount; doesn't see proration context; calculates tax on the wrong base. Auditor flags this years later.

7. **`upgrade_mode` taxonomy not used to inform billing.** Tier-model.json schema 1.1 ships `upgrade_mode` per tier — `self_serve` tiers should have automated mid-cycle proration; `assisted` tiers should have success-team-driven proration with approval; `white_glove` tiers should have contract-amendment-driven proration. The taxonomy isn't wired into the billing pipeline.

8. **Migration-runbook for tier-axis not generated.** The `bmad-bam-design-tenant-migration-tooling` skill's tier-axis runbook explicitly designs the proration audit + audit trail; without the runbook, the team improvises and the structural failure persists.

## Why harmful

- **Customer-trust loss.** A customer who notices the double-charge feels cheated. Even if a refund is issued promptly, the trust is damaged. Trust-based metrics (NPS, retention, expansion) degrade.

- **Regulatory exposure.** GDPR Art 5(1)(d) (data accuracy) treats inaccurate billing data as a regulatory matter. Auditors increasingly include billing-accuracy in SOC 2 + ISO 27001 controls testing. Tax authorities in many jurisdictions investigate billing-accuracy independently.

- **Revenue distortion.** From the platform's side, full-price-from-day-N looks like revenue gain. But the gain is washed out by refunds + churn + customer-acquisition-cost spent re-acquiring lost customers. The metric "tier-upgrade revenue per customer" is inflated by the bug.

- **Tax-engine misalignment.** Tax calculations based on the wrong amount carry downstream consequences: under-paid tax to authorities (audit risk) OR over-paid tax (customer over-charged with tax baked in).

- **Refund-queue toil.** Customer support time spent processing one-off refunds is operational waste. The hours add up to FTE-equivalents.

- **Auditor inquiry cost.** When the auditor surfaces this, remediation requires: review of every tier-upgrade transaction during the audit window; per-customer refund or credit; retroactive tax-recalculation; updated audit trail; engineering rebuild of the proration pipeline. Cost is 6-figures to 7-figures for mid-sized platforms.

- **Brand reputation in public.** Customer-trust loss surfaces as social-media complaints, app-store reviews, and review-site (G2, Capterra) negative reviews. Once posted, these persist; future customers see them.

- **Cousin anti-pattern compounds.** `tier-cliff.md` (P3.1; pricing structure with steep jumps) compounds this: customers upgrading across a tier-cliff with full-price-from-day-N see an even larger double-charge surprise. Same family of pricing-structure failures (E3 cross-reference).

- **Rollback-completeness gap.** If the migration is rolled back (per `migration-rollback-and-abort.md`), the proration charge must be reversed. Without proration audit, the rollback can't compute what to refund. Result: customer is charged for a tier-upgrade they didn't receive AND the platform can't reverse it without manual investigation.

## Remediation

Treat billing proration as a runbook invariant + a CI-enforced test:

1. **Schema invariant.** `migration-runbook.json#per_axis.tier.cohort_plan.cohorts[*].billing_prorate == true` is enforced by `bmad-bam-design-tenant-migration-tooling` step-07-v. The runbook will refuse to emit with `billing_prorate: false`; the only way to deploy without proration is to skip the runbook entirely (which is its own anti-pattern).

2. **Implement proration formula.** From `tenant-tier-upgrade-mechanics.md` Concern 2:
   ```
   charge_new = (new_tier_price / days_in_cycle) * days_remaining
   credit_old = (old_tier_price / days_in_cycle) * days_remaining
   net = charge_new - credit_old
   ```
   Use the customer's actual cycle (not a hardcoded month length) + the upgrade timestamp (RFC 3339, not day-end).

3. **Wire `billing_prorate_audit` observability hook.** Every proration captured with full inputs + outputs in an audit record. Mandatory in tier-axis migration runbook. Audit retention ≥ regulatory window (typically 7 years for SOX / 6 years for HIPAA).

4. **Tax-engine integration with proration context.** Pass `proration_amount`, `proration_days`, `tax_jurisdiction_at_calculation` to the tax engine. Many tax engines have a `prorated: true` flag that produces correct tax math.

5. **Idempotency for proration.** Webhook retries from billing provider may double-fire upgrades; the idempotency key prevents double-charges (see `tenant-tier-upgrade-mechanics.md` Pattern: idempotent upgrade).

6. **Rollback reverses proration.** Migration rollback (per `migration-rollback-and-abort.md`) MUST reverse the proration charge as the first reverse step. Without it, refund-orphans pile up.

7. **CI test for proration.** Test suite asserts: tier-upgrade billing transaction has `proration_calculation` audit record; calculation matches formula; tax-engine sees the proration. Test fails if any check fails. This is the migration-axis equivalent of `BYP-005` (RLS WITH CHECK INSERT smuggling test).

8. **Customer-facing transparency.** In-app upgrade flow shows the prorated amount before confirmation: "You'll be charged $X today (prorated to remaining {{days}} days in your billing cycle). Your full $Y monthly amount begins {{next_cycle_date}}." Trust signal + reduces support volume.

9. **Quarterly audit of tier-upgrade transactions.** Each quarter, sample N tier-upgrade transactions; verify each has a proration audit record matching formula. Surfaces regressions before customers notice.

10. **Coordinate with `tier-cliff.md` remediation (P3.1).** A tier-design with cliff jumps + missing proration is the worst combo. Address both together: cliff-avoidance pricing + correct proration math.

11. **Apply `tenant-tier-upgrade-mechanics.md` + `migration-rollback-and-abort.md` patterns.** These fragments provide the design vocabulary + execution patterns; this anti-pattern is the failure mode they prevent.

12. **Tax-jurisdiction snapshot.** When the customer's tax jurisdiction may have changed mid-cycle (rare; VAT-registration; state-tax-nexus change), snapshot jurisdiction state at proration timestamp.

## When acceptable

There is essentially never a case where this anti-pattern is acceptable for a production multi-tenant SaaS with a tiered pricing model. Narrow exceptions:

- **Free → free transitions.** No money changes hands; proration doesn't apply. (Including free-trial-to-free conversion at trial-end.)

- **Same-day upgrade-then-downgrade test.** Customer explicitly testing pricing experience within their trial period or on a no-fee plan; no money changes hands. The audit trail still records the calculations, even if the net is zero.

- **Custom contract with explicit waiver.** Enterprise customer with bespoke billing arrangement that contractually waives mid-cycle proration in favor of annualized true-up. The waiver is in the contract (auditor reviewable); the billing-engine respects the waiver via a per-customer feature flag. Common in white-glove enterprise tiers. Even here, the audit trail records the waiver invocation.

- **Pre-launch / pre-production.** Before any real customer data flows, the proration formula may be aspirational. Defer until first customer transaction. The migration-runbook can record the deferral with a re-evaluation trigger.

- **Annual upgrades only (no mid-cycle upgrade path).** Some platforms structurally disallow mid-cycle upgrades; customers can only upgrade at renewal. In this case, mid-cycle proration is structurally impossible — but the platform MUST disable the upgrade UI mid-cycle to prevent the bug from sneaking in via a future feature shipping.

- **Same-tier price-change driven by usage.** Usage-based pricing within a tier (e.g., "you used 1.5x your tier's quota; we'll charge $X over the cycle") is overage-billing, not tier-upgrade; this anti-pattern doesn't apply (a separate pattern catalog covers overage billing).

## Cross-references

- Fragment: [tenant-tier-upgrade-mechanics.md](../fragments/tenant-tier-upgrade-mechanics.md) — the tier-upgrade mechanics this anti-pattern violates; canonical remediation reference (Concern 2: Billing proration)
- Fragment: [migration-rollback-and-abort.md](../fragments/migration-rollback-and-abort.md) — rollback semantics including proration reversal; this anti-pattern's reversal step lives here
- Cousin anti-pattern: [tier-cliff.md](../anti-patterns/tier-cliff.md) (P3.1 family) — adjacent pricing-structure failure; same family of E3 cross-reference (pricing-structure failures); often co-occurs with this anti-pattern (cliff + no proration = worst customer experience)
- Sibling anti-pattern: [tenancy-as-afterthought.md](../anti-patterns/tenancy-as-afterthought.md) (P3.1) — teams that delivered tenancy late typically also ship billing late; same operational-immaturity cluster
- Fragment: [zero-downtime-migrations.md](../fragments/zero-downtime-migrations.md) — zero-downtime patterns; tier-upgrade with proration must be zero-downtime for in-flight customer billing
- Fragment: [feature-gating-patterns.md](../fragments/feature-gating-patterns.md) — feature flips coordinated with billing flips; the feature-flip-first / billing-flip-second ordering is the inverse anti-pattern
- Glossary: `billing-prorate` (P3.2 derived from tier-upgrade discussion)
- Schema: `migration-runbook.json` (spec §3.5) — `per_axis.tier.cohort_plan.cohorts[*].billing_prorate` field; the runbook validation surface for this anti-pattern
- Gate: `QG-D1` v0.1.0 — primary; `migration-runbook.json` evidence; C2 (per-axis cohort_plan validity) sources from this anti-pattern's required fields
- Gate: `QG-M2` v1.1.0 — mirror (H4 partial proxy until P10 ships full DR)
- Skill: `bmad-bam-design-tenant-migration-tooling` — the workflow whose step-07-v invariant catches this anti-pattern at runbook-design time
