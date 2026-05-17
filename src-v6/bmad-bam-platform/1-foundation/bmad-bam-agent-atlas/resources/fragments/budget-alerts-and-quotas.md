---
id: budget-alerts-and-quotas
title: Budget Alerts and Per-Tier Quotas
category: foundation
kind: fragment
qg_ref: QG-F1
last_reviewed: 2026-05-17
version: 1.0.0
status: active
author: atlas
tags: [finops, budgets, alerts, quotas, multi-tenant]
references:
  - "FinOps Foundation, Anomaly Detection & Forecasting capability"
  - "Google SRE Workbook, Chapter 3 — Practical Alerting"
  - "AWS Budgets and AWS Cost Anomaly Detection documentation"
  - "https://learn.microsoft.com/azure/cost-management-billing/costs/cost-mgt-alerts-monitor-usage-spending"
---

# Budget Alerts and Per-Tier Quotas

A **budget alert** notifies humans before spend exceeds expectation. A **quota** is a programmatic ceiling that *prevents* spend from exceeding limits, by throttling or rejecting work. Together they form the **operational defense layer** that protects the gross margins designed in `[[unit-economics-saas]]` and measured by `[[per-tenant-cost-attribution-with-hooks]]` and `[[cost-allocation-shared-resources]]`. Without alerts, surprise bills land at end-of-month and recovery is bureaucratic. Without quotas, a runaway tenant (or a runaway internal bug) can burn a quarter's margin in a weekend.

This fragment is consumed by `design-finops-model` (skill) as the closing pillar (after metrics, attribution, and allocation), and by every operational skill (incident response, on-call) because alerts are the *interface* between cost and human action.

---

## When to Use

Apply explicit budget alerts and quotas when:

- **The platform has paying tenants.** Once revenue depends on margin, margin needs operational defense.

- **You operate a free tier.** Free-tier abuse is the #1 source of surprise bills. Quotas on free tier are non-negotiable; alerts catch creative bypass attempts.

- **You consume metered third-party services** (LLMs, payment APIs, email providers). Third-party costs are nearly always per-use; a runaway tenant can rack up thousands of dollars of LLM tokens in an hour. Quotas at the adapter layer are mandatory.

- **You have multiple tiers with different cost expectations.** Per-tier quotas codify the cost ceiling that pricing was based on. Cross-reference `[[unit-economics-saas]]` for the per-tier gross margin assumptions that quotas defend.

- **You operate at scale where manual review is impossible.** Below ~50 tenants, eyeballing the bill works. Above, alerts and quotas are the only sustainable mechanism.

- **Compliance / SOX-light controls require change-detection on cost.** Anomaly alerts are increasingly part of the SOC 2 control bundle.

---

## When NOT to Use

Skip explicit budget alerts and quotas when:

- **Pre-PMF / pre-revenue.** Pre-revenue, the spend signal is *velocity*, not *budget*. Don't impose budget discipline on a team building toward PMF; impose burn-rate discipline at the team level instead.

- **You have one tenant.** A single-tenant dedicated instance has a contract that *is* the budget. Layered alerts add overhead without insight.

- **Fixed-cost infrastructure dominates.** Sunk-capex datacenters do not surprise you with bills. Operational alerts focus on capacity, not budget.

- **Quotas would break legitimate behavior with no path to grace.** A platform with quota-but-no-override is one customer escalation away from churn. Either pair quotas with a fast override path or don't ship them yet.

- **The team has no on-call rotation.** Alerts that page no one are noise; quotas that block work with no human to grant exception are policy without operability.

---

## Architecture

### Two-threshold alerting model

A robust alert configuration uses **two thresholds**, not one:

| Threshold | Trigger | Audience | Action |
|---|---|---|---|
| **Early-warning** | 80% of ceiling | FinOps owner, tier owner | Investigate, plan response |
| **Hard-stop** | 100% of ceiling | On-call, exec | Quota enforces; emergency review |

Single-threshold alerts cause surprises because:

- Setting threshold at 100% gives no warning — by the time it fires, the bill is already over.
- Setting threshold at 80% with no follow-up at 100% trains operators to ignore alerts ("it's just the 80% warning").

Two thresholds make the gradient legible: "we're approaching the ceiling" vs "we have crossed the ceiling."

### Alert categories

| Category | Scope | Example | Trigger source |
|---|---|---|---|
| **Per-tenant** | One tenant's cost | `tenant_X spend > $500/mo` | Attribution stream |
| **Per-tier** | Aggregate by tier | `free_tier total > $30k/mo` | Attribution stream |
| **Per-resource** | One resource type | `LLM spend > $10k/day` | Third-party adapter |
| **Platform-wide** | Total cloud bill | `total > $150k/mo` | Cloud-billing API |
| **Anomaly** | Deviation from baseline | `spend > 2× rolling-30-day avg` | Anomaly detector |

A mature configuration runs **all five** with two thresholds each.

### Per-tier ceilings (default)

```yaml
quotas:
  free:
    monthly_spend_ceiling_per_tenant: $5
    early_warning_pct: 80
    hard_stop_action: rate_limit  # not reject; degrade gracefully
  pro:
    monthly_spend_ceiling_per_tenant: $200  # 100% of ARPA
    early_warning_pct: 80
    hard_stop_action: notify_and_meter
  enterprise:
    monthly_spend_ceiling_per_tenant: null  # contractual; case-by-case
    early_warning_pct: null
    hard_stop_action: page_account_owner
  dedicated:
    monthly_spend_ceiling_per_tenant: per_contract
    hard_stop_action: per_contract
```

The free-tier hard-stop is *rate-limiting*, not rejection — the goal is to protect cost without breaking conversion-to-paid funnels. Enterprise has no programmatic hard-stop because contracts override.

### Escalation paths

| Threshold | Notification | Acknowledgement SLA |
|---|---|---|
| Per-tenant 80% (pro/ent) | Account owner email | 24h |
| Per-tier 80% | FinOps owner Slack | 4h |
| Per-tier 100% | On-call page | 30 min |
| Platform 80% | FinOps + Eng leadership Slack | 1h |
| Platform 100% | On-call page + exec page | 15 min |
| Anomaly fired | FinOps + service owner Slack | 1h |

Escalations have **audit trails**: every page logs who acknowledged, who took action, what the resolution was.

### Diagram — alert and quota interplay

```
       ┌────────────────────────────────────┐
       │   Per-tenant cost stream           │
       │   (from attribution + allocation)  │
       └────────────────┬───────────────────┘
                        │
            ┌───────────┼───────────┐
            ▼           ▼           ▼
       ┌────────┐  ┌────────┐  ┌────────┐
       │ <80%   │  │ 80-99% │  │ 100%+  │
       │ green  │  │ yellow │  │  red   │
       └────────┘  └───┬────┘  └───┬────┘
                       │           │
                       ▼           ▼
                 early-warning  hard-stop
                       │           │
                       ▼           ▼
                 ┌─────────┐  ┌────────────────┐
                 │ Notify  │  │ Enforce quota: │
                 │ owner   │  │  - rate-limit  │
                 │ (Slack) │  │  - reject      │
                 └─────────┘  │  - meter only  │
                              │ + page on-call │
                              └────────────────┘
```

### Quotas are enforced where, exactly?

Three enforcement points, in increasing cost of bypass:

1. **Adapter layer** (third-party APIs): a `RateLimiter` wraps every external call; tenant-keyed bucket; cheap to enforce.
2. **Gateway layer** (request-handling): tenant token-bucket; protects compute.
3. **Storage layer** (writes, reads): hard, because storage cost lags behind write activity; usually enforced via async usage-cap that schedules suspension.

---

## Trade-offs

| Dimension | Pro (budget alerts + quotas) | Con (budget alerts + quotas) |
|---|---|---|
| **Margin protection** | Surprise bills become rare; gross-margin guarantees are operationally enforced. | Quota tuning is real work; bad tuning frustrates legitimate users. |
| **Customer experience** | Users hit graceful degradation, not bill-shock. | Tight quotas can mask product-market fit signals (heavy use = engagement!). |
| **Incident response** | Clear playbook when alerts fire. | Alert fatigue if thresholds are mis-tuned (cry-wolf erodes attention). |
| **Predictability** | Monthly cloud bill becomes forecastable within ±10%. | Forecast-vs-actual analysis is itself overhead. |
| **Free-tier sustainability** | Quota turns free-tier from open-ended risk to bounded CAC. | Some legitimate conversion drivers (e.g., a viral side-project) might hit the ceiling and bounce; tune carefully. |

---

## Implementation Patterns

### 1. Budget manifest

A versioned `budgets.yml`:

```yaml
budgets:
  - id: platform_monthly
    scope: platform
    ceiling_usd: 150000
    period: monthly
    thresholds:
      - pct: 80
        action: notify_slack_finops
      - pct: 100
        action: page_oncall_and_exec

  - id: free_tier_monthly
    scope: tier
    tier: free
    ceiling_usd: 30000
    period: monthly
    thresholds:
      - pct: 80
        action: notify_slack_growth
      - pct: 100
        action: rate_limit_top_consumers

  - id: per_tenant_pro
    scope: tenant
    applies_to: tier == 'pro'
    ceiling_usd: 200
    period: monthly
    thresholds:
      - pct: 80
        action: notify_account_owner
      - pct: 100
        action: rate_limit_meter_warn
```

### 2. Anomaly detection alongside thresholds

Static thresholds miss anomalies that stay below ceiling. Pair with anomaly detection:

```yaml
anomaly_detectors:
  - metric: hourly_spend_per_tenant
    method: rolling_zscore
    window: 168h  # 7 days
    threshold_sigma: 3
    action: notify_slack_finops

  - metric: third_party_provider_spend
    method: rolling_zscore
    window: 24h
    threshold_sigma: 4
    action: page_oncall  # tighter — third-party costs spike fast
```

Anomaly detection catches "spend doubled but didn't hit ceiling" — the most common surprise-bill precursor.

### 3. Quota enforcement at the adapter layer

```python
class OpenAIAdapter:
    def call(self, prompt, tenant_id):
        if not self.quota.try_acquire(tenant_id, units=estimate_tokens(prompt)):
            raise QuotaExceeded(tenant_id, "openai_tokens_daily")
        response = openai.chat.completions.create(...)
        self.quota.record_actual(tenant_id, response.usage.total_tokens)
        return response
```

Quota counters are per-tenant token-buckets, persisted to Redis or similar; refill rates configured per-tier.

### 4. Override path

Every quota has a documented override path. Enterprise tenants have a "lift quota for next 24h" runbook; pro tenants have a "raise ceiling" support-flow. The override is **logged with reason and expiry** — silent permanent lifts defeat the system.

### 5. Quarterly tuning

Quarterly review of:

- Alert fire-rate per category (high = noisy / too-tight; zero = useless / too-loose).
- Quota hit-rate per tier (high free-tier hits = expected; high pro-tier hits = pricing mismatch).
- Anomaly false-positive rate (high = retune sigma threshold).

### 6. Coordination with growth/product teams

Aggressive free-tier quotas can throttle conversion drivers. Growth/product review of free-tier limits each quarter ensures conversion funnels remain healthy while cost is bounded.

---

## Quality Checks

- **CRITICAL:** alerts must include **both early-warning (80% of ceiling) AND hard-stop (100% of ceiling)** thresholds. Single-threshold alerts cause surprises — a 100%-only alert fires *after* the budget is breached, eliminating the window for human response; an 80%-only alert lacks a hard ceiling and trains operators to treat the alert as informational. The two-threshold pattern produces a gradient: at 80% the FinOps owner investigates; at 100% on-call enforces. Both thresholds must have distinct audiences and distinct actions — collapsing them into one notification is equivalent to single-threshold and defeats the discipline. The most expensive surprise-bill incidents in the industry trace to single-threshold configurations; double-thresholding is the cheapest known mitigation.

- **Every budget has an explicit owner.** "Who responds when this fires?" must be answerable from the manifest. Orphan budgets are decorative.

- **Free-tier hard-stop degrades, not rejects, by default.** Rejection breaks conversion-to-paid funnels; rate-limiting preserves them while bounding cost.

- **Enterprise budgets are contractual, not automated.** Programmatic hard-stop of an enterprise tenant violates contracts; budgets become "alert the account owner" with manual decision.

- **Anomaly detection complements thresholds.** Static thresholds miss anomalies below ceiling; anomaly detection catches them. Run both.

- **Overrides are logged with reason and expiry.** A permanent silent override is a budget that doesn't exist.

- **Quarterly tuning is scheduled.** Alert fatigue and quota-drift are inevitable without it.

- **Quota counters survive process restart.** In-memory token-buckets that reset on deploy are gameable; persist to a shared store.

- **Quotas are testable.** Unit tests verify rate-limiter behavior at threshold; integration tests verify alert pipeline end-to-end.

- **Audit trail for every alert.** Who acknowledged, who acted, what the outcome was — required for both incident-learning and compliance evidence.

---

## Web Research Queries

Use these queries (with `{date}` replaced by the current year) to refresh budget-alert practice:

- `cloud cost anomaly detection multi-tenant {date}` — surfaces AWS/GCP/Azure native tools plus third-party (Vantage, CloudHealth).
- `budget alert threshold best practice SaaS {date}` — practitioner write-ups on threshold-tuning.
- `LLM cost runaway quota enforcement {date}` — recent (post-2023) third-party cost-protection patterns.
- `free tier abuse rate limiting SaaS {date}` — finds the conversion-vs-cost tradeoff write-ups.
- `FinOps alert fatigue tuning {date}` — addresses the operational reality of alert proliferation.
- `tenant quota override runbook {date}` — surfaces the override-discipline pattern.

Treat content older than 18 months as orientation; cost-anomaly tooling and LLM-pricing dynamics shift this quickly.

---

## Cross-references

**Companion fragments (Task 10):**

- [[unit-economics-saas]] — the gross-margin targets that alerts and quotas defend.
- [[per-tenant-cost-attribution-with-hooks]] — the cost stream alerts and quotas consume.
- [[cost-allocation-shared-resources]] — allocated cost can also trigger alerts.

**Atlas existing fragments:**

- [[tenancy-decision-framework]] — tenancy shape affects where quotas enforce.
- [[cell-based-architecture]] — cell-level budgets are a natural alert scope.
- [[evolutionary-architecture]] — alerts and quotas are themselves fitness functions on cost.

**Anti-patterns:**

- [[single-threshold-alerts]] (forthcoming, Task 12) — the failure mode this fragment prevents.
- [[silent-quota-override]] (forthcoming) — unaudited override drift.
- [[free-tier-hard-reject]] (forthcoming) — rejecting free-tier breaks conversion.

**Quality gate:**

- `QG-F1` (foundation) — a foundation design without budgets and quotas fails QG-F1.

**Upstream specs:**

- `docs/v6-final-architecture.md` §3.Q3 (per-tier ceilings), §6.3 (fragment schema).
- FinOps Foundation, Anomaly Detection capability.

**Downstream consumers:**

- `design-finops-model` skill (P3.1) — primary consumer.
- All operational skills inherit alert/quota integration from this fragment.
