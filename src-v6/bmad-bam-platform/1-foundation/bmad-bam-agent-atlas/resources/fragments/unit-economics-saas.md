---
id: unit-economics-saas
title: Unit Economics for Multi-Tenant SaaS
category: foundation
kind: fragment
qg_ref: QG-F1
last_reviewed: 2026-05-17
version: 1.0.0
status: active
author: atlas
tags: [finops, unit-economics, ltv, cac, gross-margin]
references:
  - "David Skok, For Entrepreneurs: SaaS Metrics 2.0"
  - "https://a16z.com/2015/08/21/16-metrics/"
  - "Lenny Rachitsky, Lenny's Newsletter — SaaS Benchmarks"
  - "https://www.bvp.com/atlas/state-of-the-cloud-2025"
---

# Unit Economics for Multi-Tenant SaaS

Unit economics is the **per-tenant profitability** of the platform. It answers: "If we acquire one more tenant of this kind, do we make money or lose it, and how long until breakeven?" In multi-tenant SaaS, the *unit* must be the tenant (not the user, not the seat) because tenant-level decisions — provisioning, isolation, support — drive the platform's largest costs. A platform that does not measure unit economics per-tier will subsidize loss-leader tiers with profitable ones until growth outpaces blended margin and the business stalls.

This fragment is consumed by `design-finops-model` (skill) as the framing layer (the metrics) before per-tenant attribution and budget design, and by `design-tenancy-model` because tenancy choices have first-order effects on gross margin.

---

## When to Use

Apply explicit unit-economics modeling when:

- **The platform has paying tenants and a growth plan.** Unit economics is the input to "should we invest more in growth?" — if LTV/CAC ≫ 3, accelerate; if < 1.5, fix the product before pouring fuel.

- **You operate multiple tiers.** A free + pro + enterprise structure makes unit economics non-trivial because the tiers have different LTV, different CAC, and different gross margins. Blended numbers hide the truth.

- **Investors or board members read your reports.** Unit economics is the *lingua franca* of SaaS finance. Without it, every fundraising or board conversation has an unproductive translation layer.

- **You're considering a pricing change.** Pricing decisions ripple through unit economics; modeling the impact before launch beats discovering it 6 months later.

- **You're considering a tenancy-model change.** Migrating from RLS to schema-per-tenant (or vice versa) has gross-margin implications because per-tenant infrastructure costs change. Cross-reference `[[tenancy-decision-framework]]`.

- **You're evaluating a major infrastructure decision.** Going multi-region, adopting a new database, choosing a managed-service provider — all affect gross margin. Model the unit economics delta before the decision.

---

## When NOT to Use

Skip explicit unit-economics modeling when:

- **Pre-revenue or pre-PMF.** Unit economics on hypothetical revenue is fiction. Reach product-market fit, get pricing signal, then model.

- **You charge a one-time fee (not subscription).** One-time pricing has different economics (CAC payback in a single transaction, no LTV beyond the first purchase). Unit-economics framing as-described does not fit; use gross-profit-per-deal instead.

- **The platform is single-tenant dedicated.** Dedicated instances are priced as projects, not products. Per-tenant economics is per-deal economics; the framework here applies loosely.

- **The team has no finance partner.** Building unit-economics dashboards without a finance/business stakeholder to interpret them is investment without return. Pair-up first.

- **The platform's pricing is so simple that gross margin is obvious.** Selling one tier at $99/mo with one server's worth of cost — gross margin is a back-of-envelope calculation. Don't build a unit-economics framework for a single-tier product.

---

## Architecture

### The four metrics

| Metric | Formula | Interpretation |
|---|---|---|
| **LTV** (Lifetime Value) | `ARPA × gross_margin_% / churn_rate` | The discounted profit a tenant generates over their lifetime |
| **CAC** (Customer Acquisition Cost) | `(sales_cost + marketing_cost) / new_tenants_won` | What it costs to win one tenant |
| **Payback period** | `CAC / (ARPA × gross_margin_%)` | Months until the tenant pays back their acquisition cost |
| **Gross margin per tenant** | `(revenue_t − COGS_t) / revenue_t` | The slice of revenue that is *not* spent serving the tenant |

Where:
- ARPA = Average Revenue Per Account (per month)
- COGS = Cost of Goods Sold (compute + storage + network + third-party + tenant-attributable support)

### Healthy benchmarks (industry consensus, 2025)

| Tier | Target LTV/CAC | Target payback | Target gross margin |
|---|---|---|---|
| **Free** | N/A (no LTV; conversion-to-paid drives value) | N/A | -∞ to break-even (acceptable to subsidize) |
| **Pro (PLG)** | ≥ 3 | ≤ 12 months | ≥ 70% |
| **Enterprise (sales-led)** | ≥ 5 | ≤ 24 months | ≥ 60% |
| **Dedicated** | varies by deal | ≤ 18 months | ≥ 50% |

These are *floors*. Best-in-class SaaS exceeds LTV/CAC of 5 across all tiers.

### Per-tier breakdown — why blended numbers lie

Suppose a platform has:

| Tier | Tenants | ARPA | Gross margin | Contribution |
|---|---|---|---|---|
| Free | 10,000 | $0 | -100% | -$50,000/mo |
| Pro | 500 | $200/mo | 75% | +$75,000/mo |
| Enterprise | 20 | $5,000/mo | 60% | +$60,000/mo |

Blended gross margin: $85k profit / $200k revenue = **42%**.

This number is *misleading* because it suggests the business has a problem (42% is bad for SaaS). The real story:
- Pro is healthy (75%).
- Enterprise is borderline (60% — acceptable for enterprise, but watch).
- Free is a customer-acquisition cost, not a "tier" in the gross-margin sense.

Reporting blended margin hides the fact that **Pro is healthy and Free is a CAC line item**, leading to the wrong corrective action (e.g., raising Pro prices when the real problem is Free conversion rate).

### Diagram — the unit-economics flywheel

```
                 ┌─────────────────────┐
                 │  Marketing/Sales    │
                 │      spend          │
                 └──────────┬──────────┘
                            │
                            ▼
                    ┌──────────────┐
                    │  New tenants │
                    │  (per tier)  │
                    └──────┬───────┘
                           │
                           ▼
            ┌──────────────────────────────┐
            │  Per-tier ARPA  ×  retention │
            └──────────┬───────────────────┘
                       │
              ┌────────┴─────────┐
              ▼                  ▼
        ┌──────────┐       ┌───────────┐
        │   LTV    │       │   COGS    │
        │ (per tier)│       │ (per tier)│
        └─────┬────┘       └─────┬─────┘
              │                  │
              └────────┬─────────┘
                       ▼
              ┌────────────────┐
              │ Gross margin   │
              │ (PER TIER)     │
              └────────┬───────┘
                       │
                       ▼
              ┌────────────────┐
              │ Payback period │
              │ LTV/CAC ratio  │
              └────────────────┘
```

---

## Trade-offs

| Dimension | Pro (rigorous unit economics) | Con (rigorous unit economics) |
|---|---|---|
| **Decision quality** | Pricing, tier design, marketing spend become evidence-based. | Building per-tier dashboards is non-trivial engineering and accounting work. |
| **Investor confidence** | Mature unit-economics reporting accelerates fundraising. | A poor early-stage number, prominently reported, can spook investors who don't read the per-tier breakdown. |
| **Cross-team alignment** | Marketing, sales, product, eng all index on the same numbers. | Definitions matter — disputes about CAC scope (does it include CSM cost?) can derail meetings. |
| **Tenancy-model evidence** | Quantifies whether RLS-vs-schema-per-tenant is paying off. | The data takes 6–12 months to be reliable; tenancy decisions in year 1 are still partially blind. |
| **Detecting loss-leaders** | Per-tier margin makes loss-leader subsidization visible. | The visibility can drive premature tier-cuts; remember that a loss-leader tier may be the conversion engine. |

---

## Implementation Patterns

### 1. The per-tier P&L

Every month, compute and publish the per-tier P&L:

```yaml
month: 2026-04
tiers:
  free:
    tenants_active: 10247
    revenue: $0
    cogs: $47,200  # compute + storage + support + free-tier abuse
    contribution: -$47,200
    cac_attributed: $32,500  # marketing share allocated to free
    note: "CAC line item; tracked conversion-to-paid 4.2%"
  pro:
    tenants_active: 512
    revenue: $103,400  # $200 ARPA × 512
    cogs: $25,420     # 24.6% of revenue
    gross_margin_pct: 75.4%
    cac_attributed: $18,200
    ltv_estimate: $5,200 / tenant  # using current churn
    ltv_cac_ratio: 4.3
    payback_months: 8.1
  enterprise:
    tenants_active: 21
    revenue: $108,500
    cogs: $44,300     # 40.8% of revenue
    gross_margin_pct: 59.2%
    cac_attributed: $46,000  # high — sales cycle long
    ltv_estimate: $245,000 / tenant
    ltv_cac_ratio: 5.3
    payback_months: 21
```

### 2. COGS attribution

COGS per tenant requires per-tenant cost attribution; cross-reference `[[per-tenant-cost-attribution-with-hooks]]` for the mechanism. Without it, COGS is allocated by proxy (e.g., proportional to revenue), which distorts the picture.

### 3. CAC attribution

CAC is the harder number because marketing spend is rarely attributable to a single tenant. Use **time-weighted multi-touch attribution** at minimum:

```python
def cac_per_tier(period):
    total_spend = sum(channel.spend for channel in marketing_channels)
    new_tenants = count_new_tenants(period, by_tier=True)
    # weight each channel's spend by the tier it predominantly produces
    return {tier: total_spend * tier_weight[tier] / new_tenants[tier]
            for tier in tiers}
```

### 4. LTV with cohort retention

LTV should use **cohort retention curves**, not a single churn number, because retention varies by cohort age:

```python
def ltv(tier, cohort_curves):
    arpa = avg_revenue_per_account(tier)
    margin = gross_margin(tier)
    # integrate retention curve to get expected lifetime
    expected_months = sum(survival[month] for month in range(60))
    return arpa * margin * expected_months
```

A naive `ARPA × margin / monthly_churn` formula overestimates LTV for any product with non-constant churn.

### 5. Quarterly review with finance partner

Unit economics dashboards must be reviewed quarterly with a finance partner (CFO, head of FP&A, or fractional equivalent) to ensure definitions match accounting and to interpret movement. A self-serve unit-economics dashboard that engineering reads alone tends to drift from GAAP-reality.

---

## Quality Checks

- **CRITICAL:** gross margin must be measured **per-tier**, never aggregated across tiers. Reporting a single blended gross margin hides loss-leader tiers (typically free, sometimes a low-cost entry tier) and creates pressure to "fix" healthy tiers when the real issue is elsewhere. The blended number is also vulnerable to mix-shift — a quarter with more enterprise tenants will show a *lower* blended margin (because enterprise has lower per-revenue margin) and prompt incorrect alarm. Atlas's rule: every gross-margin report includes a per-tier table; any single-number gross-margin reference is rejected in review. This single discipline catches the most common SaaS-finance mistake: averaging hides loss-leaders.

- **LTV uses cohort retention curves, not constant churn.** The `ARPA/churn` shortcut systematically overestimates LTV when retention is non-constant (which it almost always is).

- **CAC includes all customer-facing spend.** Marketing alone is incomplete; sales (commissions, AE/SDR salaries, sales tooling), customer success (CSM allocation for onboarding), and partner channels all belong. Excluding any of these inflates LTV/CAC.

- **Payback period is monitored, not just LTV/CAC.** A LTV/CAC of 5 with a 36-month payback is a cash-flow disaster; a LTV/CAC of 3 with a 6-month payback is a money printer. Always report both.

- **Free-tier costs appear as CAC, not COGS.** Free tier exists for conversion; categorizing it as gross-margin drag mismodels the business. Track free-tier-cost-per-converted-tenant as a CAC metric.

- **Margins are gross, not net.** Operating expenses (engineering salaries, G&A, R&D) belong in operating margin, not gross margin. Polluting gross margin with opex is the second most common SaaS-finance mistake.

- **Definitions are documented and versioned.** A `metrics-glossary.md` co-located with the dashboards prevents the team from arguing about whether "active tenant" includes trialists. Version it; review changes with finance.

- **Cross-team review.** Marketing, sales, product, eng, finance review the same numbers monthly. Divergent definitions across teams is the silent killer of unit-economics programs.

---

## Web Research Queries

Use these queries (with `{date}` replaced by the current year) to keep unit-economics framing current:

- `SaaS unit economics LTV CAC benchmarks {date}` — Bessemer, OpenView, Lenny's, a16z benchmarks update annually.
- `gross margin SaaS COGS definition {date}` — for the recurring debate about what belongs in COGS.
- `cohort retention curves LTV calculation {date}` — finds the cohort-aware LTV methodology.
- `multi-tier SaaS pricing economics {date}` — surfaces per-tier economic patterns.
- `customer acquisition cost attribution multi-touch {date}` — CAC attribution methodologies.
- `free tier conversion economics SaaS {date}` — the free-tier-as-CAC framing.

Treat content older than 18 months as orientation; benchmarks and capital-market expectations shift quickly.

---

## Cross-references

**Companion fragments (Task 10):**

- [[per-tenant-cost-attribution-with-hooks]] — the COGS mechanism this framework depends on.
- [[cost-allocation-shared-resources]] — how to attribute shared infrastructure into per-tier COGS.
- [[budget-alerts-and-quotas]] — operational defense of the gross margins this fragment defines.

**Atlas existing fragments:**

- [[tenancy-decision-framework]] — tenancy choice has first-order gross-margin impact.
- [[cell-based-architecture]] — cell density is a gross-margin lever.
- [[rls-deep-dive]] — RLS optimizes for low per-tenant overhead; quantify it here.

**Anti-patterns:**

- [[blended-gross-margin-reporting]] (forthcoming, Task 12) — the failure mode this fragment prevents.
- [[ltv-from-constant-churn]] (forthcoming) — naive LTV calculation.

**Quality gate:**

- `QG-F1` (foundation) — a foundation design without per-tier unit economics fails QG-F1.

**Upstream specs:**

- `docs/v6-final-architecture.md` §3.Q3 (tier-mapped economics), §6.3 (fragment schema).
- David Skok's SaaS metrics canon.

**Downstream consumers:**

- `design-finops-model` skill (P3.1) — primary consumer.
- `design-tenancy-model` skill — tenancy choices evaluated against unit-economics impact.
