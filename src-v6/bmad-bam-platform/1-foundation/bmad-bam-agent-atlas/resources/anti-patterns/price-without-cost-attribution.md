---
id: price-without-cost-attribution
title: Price Without Cost Attribution
kind: anti-pattern
category: foundation
qg_ref: QG-F1
last_reviewed: 2026-05-17
version: 1.0.0
status: active
severity: high
applicability:
  - greenfield: must-avoid
  - brownfield: must-fix
references:
  - "docs/v6-final-architecture.md §6.4"
  - "https://www.priceintelligently.com/blog/value-based-pricing"
  - "https://a16z.com/cost-of-cloud-paradox/"
---

# Price Without Cost Attribution

Setting prices, tiers, and contractual SLAs *before* knowing what each tenant costs to serve. Pricing is therefore based on competitor benchmarking, target customer willingness-to-pay, or pure gut feel — not on unit economics. The company eventually discovers that the heaviest 5% of tenants on the Pro plan cost 50× the median, or that an enterprise contract has a margin of -20%. By the time this is visible in financials, the contracts are signed and the pricing change requires a year of customer migration.

The anti-pattern is endemic in SaaS because cost attribution is hard, and pricing must ship before the product has scale enough to measure it. Many companies live with negative-margin power users for years before instrumentation catches up.

## What it looks like

The team is preparing to launch (or re-tier). Pricing is set via a mix of: what competitors charge for similar products, what target buyers say they would pay in surveys, what the CEO thinks is a defensible number, and what gives sales enough margin to discount in deals. The unit economics — *what does each tenant cost us* — is not computed because the data is not available, or it is a top-level number ("average AWS spend / total tenants") that does not surface per-tenant variation.

The result is uniform pricing applied to non-uniform cost structures. Tenants on the Pro plan all pay $99/month, but their actual cost ranges from $5/month (a light-touch tenant who uses 1% of available capacity) to $500/month (a power user running daily exports, complex queries, and AI inference at scale). The blended margin looks fine because the cheap tenants subsidize the expensive ones. But each new power-user signup *worsens* the margin, and each customer-success time spent supporting power users adds further cost.

Eventually finance produces a per-tenant cost attribution (often forced by a board ask: "what's our gross margin per cohort?"). The result is alarming. The top decile of tenants by cost is responsible for 60% of total infrastructure spend; the bottom decile is responsible for 0.5%. Pricing tiers are *inverse* to cost — the customers paying the most are usually the lighter users (predictability, support cost amortization); the heavy users are on lower tiers because they game the limits. The fix requires re-tiering existing customers, which generates churn signals and CS escalations.

The deepest version of this anti-pattern is enterprise contracts signed without cost analysis. A sales rep promised "unlimited usage" for a flat $100k/year; the customer ramped to 50× the originally-modeled usage; the contract is now -$200k/year for the platform and locked in for three more years.

## Why it's wrong

- **Pricing decisions become irreversible.** Once a contract is signed, the price is locked for the term. Discovering the contract loses money mid-term means the company eats the loss; renegotiation is a churn risk.

- **Cross-subsidy is invisible and unstable.** Light tenants subsidize heavy tenants. When competitors offer cheaper plans, the light tenants churn (they have no reason to overpay); the heavy tenants stay because they are still winning the cross-subsidy. The remaining cohort is increasingly money-losing.

- **Tier design is uninformed.** Without cost data, tier boundaries are placed at marketing-friendly numbers (3 seats, 10 seats, 50 seats) rather than at cost discontinuities (the seat number above which support cost becomes nonlinear). Tiers fail to capture the cost structure.

- **Operational decisions go wrong.** A team optimizing latency might invest in caching, not knowing that caching primarily benefits the most expensive tenants and worsens the margin gap. A team adding an AI feature might price it at $X/month not knowing it costs $5X/month for power users.

- **Strategic decisions go wrong.** "Should we offer a free tier?" is a question with no answer if you do not know what each free user costs. "Should we enter the enterprise segment?" similarly requires per-tenant cost data to inform.

- **Investor and board reporting is wrong.** "Our gross margin is 80%" averaged across tenants hides that 10% of tenants are at -200% margin. The board has the wrong information.

## What to do instead

- **Apply [[per-tenant-cost-attribution-with-hooks]] before launching any tier model.** The hooks let you instrument cost from day one. Even a rough attribution (P50 vs P90 vs P99) per tenant is enormously informative.

- **Apply [[unit-economics-saas]] to model per-tier unit economics.** Each tier should hit target gross margin at P90 usage, not at the mean. Margin-on-mean is a lie when costs are long-tailed.

- **Tie pricing decisions to cost attribution.** Every pricing review uses cost data as an input. "We charge $X" is justified by "P90 cost is $Y and target margin is $Z". This is the rationale section of the pricing ADR.

- **Apply [[budget-alerts-and-quotas]] to catch runaway tenants early.** A tenant whose cost is climbing toward unit-economics breakeven should trigger an alert; CS can have a proactive upgrade conversation before the contract becomes a loss.

- **Apply [[limit-and-quota-design]] to bound runaway tenants by default.** Hard limits or overage pricing prevent the unbounded-loss scenario.

- **Apply [[cost-allocation-shared-resources]] for shared-cost services (LLMs, vector DBs).** Some costs (a shared inference cluster) cannot be directly attributed; cost-allocation rules approximate.

- **Pass QG-F1 with unit economics math shown.** The gate requires per-tier margin analysis at P90 usage. "We don't have data" is not a pass.

## Recovery path (brownfield)

If you have already shipped pricing without cost attribution, here is a graduated recovery:

1. **Instrument first, decide later.** Apply [[per-tenant-cost-attribution-with-hooks]] retroactively to start collecting per-tenant cost data. Wait 30–90 days for stable data.

2. **Produce the unit-economics report.** P50, P90, P99 cost per tier; gross margin per tier at each percentile; outlier tenants flagged. Share with finance, sales, product, engineering leadership.

3. **Identify the worst contracts.** Enterprise deals that are losing money in steady-state. List them. Quantify the loss.

4. **Triage by lever:**
   - Contract renewal — re-price at renewal; track the funnel of "at-renewal price changes" carefully.
   - Engagement model — heavy-cost tenants who are willing to upgrade to a higher tier with better value (SLAs, support) can be moved up; rare but happens.
   - Architectural — invest in cost-reduction work for the segment (better caching, smarter inference routing).
   - Sunset — some tenant cohorts cannot be made profitable; sunset gracefully (annual notice, migration help).

5. **Fix the pricing model going forward.** Re-tier based on cost data. Adjust price points. Add overage pricing on metered dimensions. Apply [[tier-cliff-avoidance]] to check ratios.

6. **Build the cost-data muscle.** Cost attribution becomes a permanent operational discipline, not a one-time exercise. Monthly review with finance and CS becomes the cadence.

7. **Communicate to customers honestly when prices change.** "Our pricing has been updated to better reflect platform costs" is acceptable; "we are raising prices for no stated reason" generates churn. Honesty (within reason) builds trust.

8. **Plan 6–12 engineer-months plus 6 months of customer transition.** Pricing recovery is slow because it lives in the contract lifecycle. Be patient.

## Cross-references

- Fragment: [[per-tenant-cost-attribution-with-hooks]] — the attribution mechanism.
- Fragment: [[unit-economics-saas]] — the analytic framework.
- Fragment: [[budget-alerts-and-quotas]] — early-warning system.
- Fragment: [[cost-allocation-shared-resources]] — for shared-cost services.
- Fragment: [[limit-and-quota-design]] — bounding runaway tenants.
- Fragment: [[tier-design-principles]] — tier model informed by cost.
- Fragment: [[tier-cliff-avoidance]] — ratio checks once tiers are cost-informed.
- Gate: `QG-F1` — foundation gate including unit economics.
- Spec: `docs/v6-final-architecture.md` §6.4.
