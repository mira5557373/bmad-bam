---
id: tier-design-principles
title: Tier Design Principles
category: tenant-tier-model
kind: fragment
qg_ref: QG-F1
last_reviewed: 2026-05-17
version: 1.0.0
status: active
author: atlas
references:
  - "https://www.priceintelligently.com/blog/saas-pricing-tiers"
  - "https://openviewpartners.com/blog/the-anatomy-of-saas-pricing-strategy/"
  - "https://review.firstround.com/the-saas-org-chart"
tested_against: []
---

# Tier Design Principles

A foundation fragment for `bmad-bam-design-tenant-tier-model` covering the **structural principles** that separate good tier designs from accidental ones. Tiers are not a packaging decision the marketing team makes after engineering ships — they are an architectural commitment that determines what queries are billable, what data must be physically isolated, and what UX states the codebase must support indefinitely. Get the principles right at design time; everything downstream is execution.

This fragment focuses on *what makes a tier set coherent*. Sibling fragments cover gating mechanics ([[feature-gating-patterns]]), limit policies ([[limit-and-quota-design]]), tier transitions ([[tier-transition-economics]]), and avoiding tier-cliffs ([[tier-cliff-avoidance]]).

---

## When to Use

Apply this framework when defining or restructuring a tier model that the platform will commit to in code, billing systems, and customer-facing pricing pages. Concrete triggers:

- **Greenfield product approaching first paid customer.** You have product-market-fit signal and need to ship a tier structure before the first commercial contract is signed. The structure committed here will shape your database schema (which limits to enforce), your auth model (which roles map to which features), and your billing integration (which usage to meter).

- **Tier restructuring after pricing experiment.** You ran a pricing experiment, learned that the current 3-tier ladder leaves money on the table at the high end OR loses customers at the low end, and need to redesign. This is the most common trigger; existing customers add migration constraints not present in greenfield.

- **Introducing a new persona-segment tier.** You sell to SMB on a self-serve plan and are now landing mid-market deals that require SSO, audit logs, and contractually-bound SLAs. This is a structural addition, not a price-point tweak — apply the framework's clustering analysis to confirm the new tier is real, not vanity.

- **Consolidating tiers (de-bundling or re-bundling).** You have 5+ tiers, your sales team cannot explain them on a call, and customer success spends time clarifying which tier a customer is on. Consolidation requires the same rigor as expansion; merging two tiers that genuinely cluster differently creates a downgrade-and-share workaround.

- **Annual pricing review.** Most maturing SaaS orgs run an annual pricing review. The output of this framework is the *defensible artifact* for that review — captures the clustering evidence and elasticity assumptions so next year's review has a diff target.

If you are *only* changing a price point on an existing tier (no feature or limit changes), this framework is overkill. Update the pricing config and run the elasticity check from §"Quality Checks".

---

## When NOT to Use

Skip the framework when:

- **Single-tier product.** Free + one paid plan is not a tier *model*; it is a freemium choice. Apply the freemium-design fragment (separate) instead.

- **Per-customer custom pricing.** If every enterprise deal has its own contract, custom limits, and bespoke feature set, tiers are decorative. The real model is "Enterprise sales: bespoke" and the contract is the source of truth.

- **Usage-only pricing (pure metered).** Twilio-style pure pay-per-use has no tiers in the structural sense. Apply the usage-metering fragment (separate) and the rate-card design fragment.

- **Pre-PMF.** With <50 customers and no pricing signal, tier design is speculation. Default to "free + paid" and revisit when you have 100+ customers and at least 6 months of usage data per cohort.

- **Tier change is a marketing rename only.** If "Pro" is becoming "Business" with no structural change, do not run the framework — update the labels and the docs.

---

## Decision Inputs

Gather before traversing:

| Input | Type | Required | Source | Notes |
|---|---|---|---|---|
| `current_tenant_population` | dataset | yes | Production telemetry | Usage histogram per dimension (seats, API calls, storage, sessions). Minimum 90 days; 12 months preferred. |
| `revenue_per_tenant_distribution` | dataset | yes | Billing system | ARR per tenant, sorted; the shape (long-tail, bimodal, normal) drives clustering strategy. |
| `target_personas` | list | yes | GTM | Named buyer personas (e.g., "solo developer", "growth-stage CTO", "VP of platform at F500"). Each persona is a *candidate* tier anchor. |
| `competitor_tier_structures` | table | recommended | Competitive analysis | What tier ladders your buyers compare against. Useful for naming and as falsifier. |
| `price_elasticity_estimates` | per-tier | recommended | Pricing research | Either A/B tested, surveyed (Van Westendorp / Gabor-Granger), or competitor-anchored. |
| `cost_to_serve_per_tier` | per-tier | yes | Finops model | From [[per-tenant-cost-attribution-with-hooks]]. If unknown, recommend defining tiers AFTER finops attribution is in place. |
| `support_load_per_tier` | per-tier | recommended | CS data | Tickets per tenant per month. Frequently bimodal — surfaces hidden tier boundaries. |

### Input notes

- **`current_tenant_population`** is the single most important input. Without it, tier design becomes opinion-driven. If you do not have it, the first deliverable is *instrumentation*, not a tier structure.
- **`cost_to_serve_per_tier`** must be fully-loaded (infra + support amortization + license amortization). A tier that loses money at scale is a strategic mistake disguised as a pricing one.
- **`price_elasticity_estimates`** are noisy. Use them as direction, not as scalar inputs. If you only have one data point, treat the elasticity as "unknown" rather than fabricating.

---

## Principles

The five principles below are *structural*: violating any one of them is a tier design defect that compounds over years.

### 1. Tier boundaries align with usage-pattern clusters, not with feature counts.

Inspect `current_tenant_population` as a histogram on each primary usage dimension (seats, API calls, storage, sessions). Tier boundaries should sit in the **valleys** of that histogram — natural gaps where few tenants currently live — not at the round-number features-counts product managers want to bundle.

The clustering test: project tenants into the (seats, API calls, storage) 3-space and run k-means or DBSCAN with k=3, 4, 5. If clusters emerge that align with persona narratives, the tier boundaries are *real*. If clusters do not emerge OR they do not align with personas, your tier structure is decorative.

Counter-anti-pattern: marketing wants 3 tiers (Starter / Pro / Enterprise) because that is what the landing page template has. Engineering wants 5 tiers to slice every feature. Both are wrong; the *data* names the number of tiers.

### 2. Each tier serves a coherent persona, not a feature checklist.

A tier is a *coherent commitment* to a buyer: "if you are a solo developer, this tier has everything you need at a price you can self-justify". The features in the tier follow from the persona, not the other way around.

Persona-first test: write the tier description as "a [persona] who [problem] and is willing to pay [budget range]". If you cannot complete the sentence, the tier is a feature dump, not a tier.

### 3. Each tier has a defensible price elasticity.

Tier prices are not arbitrary. Each price point should have *some* basis in elasticity research: A/B tested conversion at different prices, competitor benchmarking, surveyed willingness-to-pay, or value-based pricing math (X% of the value the tier delivers). "We picked $99 because it ends in 9" is not a basis.

When elasticity is unknown, **start higher than instinct** — discounts are easier than increases, and pricing-down sends an anti-signal of weakness.

### 4. Each tier covers its cost-to-serve with margin.

For each tier, `(price - cost_to_serve) / price` should hit the company's target gross margin. A tier that subsidizes another tier is a strategic choice (e.g., loss-leader free tier funded by enterprise margin) and should be explicit in the rationale, not accidental.

The math anti-pattern: assuming low-tier customers will "expand" to high-tier and the average will work out. Expansion is not a guarantee; price the tier as if expansion is 0% to find the floor.

### 5. The tier ladder is monotonic on every dimension.

Higher tiers must include everything lower tiers include (no "Pro has X but Business does not"). Limits must monotonically increase (or be unlimited). Features must be additive.

Violating monotonicity creates the dreaded downgrade-and-share pattern: a customer on Business buys two Pro accounts because Pro has feature X that Business removed. This is always self-inflicted.

**CRITICAL:** tier boundaries align with usage-pattern clusters, NOT with arbitrary feature counts. A tier structure that places boundaries at round-number features (5 seats, 10 seats, 25 seats) without checking those numbers against the *current tenant usage histogram* will inevitably create a tier-cliff (see [[tier-cliff-avoidance]]) at the wrong point — pushing tenants who would have happily paid more into a downgrade-and-share workaround because the "right" tier price-jump is unjustifiable for their actual usage. Always overlay your proposed tier boundaries on the production usage histogram before committing.

---

## Output Specification

The `bmad-bam-design-tenant-tier-model` workflow uses this framework to produce `tier-model.md`, plus an Atlas ADR. Required sections:

1. **Tier ladder** — name, price, target persona, primary value proposition (one line each).
2. **Clustering evidence** — the usage histogram analysis showing tier boundaries land in valleys.
3. **Per-tier features and limits** — table; reference [[feature-gating-patterns]] and [[limit-and-quota-design]] for mechanics.
4. **Price elasticity rationale** — for each price point, how it was derived.
5. **Cost-to-serve and margin** — per tier; reference [[per-tenant-cost-attribution-with-hooks]].
6. **Transition paths** — upgrade and downgrade flows; reference [[tier-transition-economics]].
7. **Cliff analysis** — explicit check that no tier-to-tier ratio exceeds 3×; reference [[tier-cliff-avoidance]].
8. **Re-evaluation triggers** — events that force tier-model re-review.

Length target: 200–350 lines for the artifact.

---

## Trade-offs

Tier designs vary along several axes; choose deliberately.

| Axis | Few tiers (2–3) | Many tiers (5–7) |
|---|---|---|
| **Sales clarity** | High — easy to explain. | Low — every conversation needs a quiz to find the right tier. |
| **Pricing efficiency** | Lower — coarse-grained, leaves WTP on the table. | Higher — finer-grained capture of willingness-to-pay. |
| **Engineering surface** | Smaller — fewer gating decisions. | Larger — every feature requires gating logic per tier. |
| **Cliff risk** | Higher — bigger jumps between tiers. | Lower — gentler steps between tiers. |
| **Churn signal clarity** | Higher — moving down is a clear signal. | Lower — small moves are noise. |

| Axis | Usage-anchored | Feature-anchored |
|---|---|---|
| **Predictability** | Lower — customer cost varies with their use. | Higher — flat per-month. |
| **Value alignment** | Higher — pay for what you get. | Lower — heavy users subsidize light users in their tier. |
| **Sales conversation** | Harder — explain the meter. | Easier — line-item the features. |

The conventional B2B SaaS sweet spot is **3–4 tiers, feature-anchored with usage caps** (rate limits and seat caps), with **usage-based add-ons** to soften cliffs.

---

## Quality Checks

- **CRITICAL:** every tier boundary has been validated against the production usage histogram. Show the histogram in the Output. If you cannot produce one, the tier boundaries are speculation.
- **Persona narrative completes the sentence.** "[Persona] who [problem] and pays [price]" for each tier. If not, that tier is not a tier.
- **Monotonicity proven.** Every higher tier strictly includes the lower tier's features and limits. Auto-generate a feature matrix and check.
- **Margin per tier is positive at 0% expansion.** Each tier must independently make money.
- **No tier-to-tier ratio exceeds 3×.** Both feature-count ratio and price ratio. See [[tier-cliff-avoidance]].
- **Competitor benchmarking documented.** What your buyers compare to. Not for copying, for sanity-checking.
- **Tier names are recognizable to buyers.** "Pro / Business / Enterprise" works because buyers know the ladder. Invented names ("Voyager / Pioneer / Vanguard") force buyers to memorize. Pay the cost intentionally.
- **Existing-customer migration plan exists.** If brownfield, what happens to current tenants? Grandfather? Migrate? Sunset? Decide now.
- **Re-evaluation trigger committed.** Concrete event ("after 6 months of new structure" OR "at 1000 tenants" OR "at next pricing review"). Decisions without triggers calcify.

---

## Web Research Queries

- `SaaS pricing tier design principles {date}` — surfaces vendor guidance and pricing-consultant posts.
- `B2B SaaS willingness to pay research {date}` — Van Westendorp, Gabor-Granger, conjoint analysis methodologies.
- `SaaS pricing tier cluster analysis {date}` — empirical posts from pricing teams who have actually run the clustering.
- `OpenView SaaS benchmark report {date}` — annual pricing report with tier-structure benchmarks.
- `feature gating vs entitlement SaaS {date}` — bleeds into [[feature-gating-patterns]] but useful for tier design.
- `tier ratio 3x SaaS rule {date}` — the heuristic on tier-cliff ratios; sanity-check current sources.
- `pricing experiment design SaaS {date}` — methodologies for testing tier changes without alienating existing customers.

When sources are older than 18 months, treat the *thresholds* as orientation only — the SaaS pricing space moves with cloud-cost economics and competitor pressure.

---

## Cross-references

**Companion fragments:**

- [[feature-gating-patterns]] — entitlement vs feature-flag vs tier-table-lookup mechanics.
- [[limit-and-quota-design]] — seat, API-call, storage, compute limits and what-happens-at-limit policies.
- [[tier-transition-economics]] — upgrade and downgrade flows; pro-rated billing.
- [[tier-cliff-avoidance]] — keeping tier-to-tier ratios under 3×; usage-based add-ons as buffer.
- [[unit-economics-saas]] — the cost-side companion; every tier needs unit-economics math.
- [[per-tenant-cost-attribution-with-hooks]] — attribution mechanics to support per-tier margin calc.

**Anti-patterns:**

- [[tier-cliff]] — what happens when this framework is skipped.
- [[price-without-cost-attribution]] — pricing tiers without knowing what they cost.

**Quality gate:**

- `QG-F1` — foundation-level gate covering tier-model coherence.

**Upstream specs:**

- `docs/v6-final-architecture.md` §6.3 (fragment schema), §6.5 (anti-pattern schema).

**Downstream consumers:**

- `bmad-bam-design-tenant-tier-model` skill — primary consumer.
- Atlas memory — every tier-model decision produces an ADR.
