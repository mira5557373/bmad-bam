---
id: feature-gating-patterns
title: Feature Gating Patterns
category: tenant-tier-model
kind: fragment
qg_ref: QG-F1
last_reviewed: 2026-05-17
version: 1.0.0
status: active
author: atlas
references:
  - "https://launchdarkly.com/blog/feature-flags-vs-entitlements"
  - "https://stripe.com/docs/billing/subscriptions/entitlements"
  - "https://martinfowler.com/articles/feature-toggles.html"
tested_against: []
---

# Feature Gating Patterns

A foundation fragment for `bmad-bam-design-tenant-tier-model` covering the **mechanics** by which a platform enforces "which tenants can use which features". Gating is the implementation surface where tier design becomes code. Get the gating mechanism right and tier changes are a config update; get it wrong and tier evolution requires PRs in dozens of services.

This fragment focuses on *how* gating is implemented and evolved. Tier *design* (boundaries, prices, personas) lives in [[tier-design-principles]]. Limit enforcement (seats, API calls) lives in [[limit-and-quota-design]].

---

## When to Use

Apply when designing or restructuring how a feature becomes available to a tenant. Concrete triggers:

- **First multi-tier release.** You have committed to a 3+ tier structure and need a gating mechanism before shipping. The choice you make here ships for years.

- **Gating sprawl crisis.** Every service has its own `if tenant.tier == 'pro'` checks. Adding a new tier requires PRs across N services. This is the signal that gating is implementation-leaked and needs centralization.

- **Custom-deal contractual features.** Sales is negotiating custom feature sets per enterprise contract. The current tier-name string is no longer sufficient; gating needs to evolve toward an entitlement model.

- **Feature-flag and entitlement collision.** Engineering uses feature flags for release rollout; product uses tier-checks for commercial gating. The two systems overlap and confuse — which `if` runs first? A unified gating design clarifies the responsibility split.

- **Compliance audit on gating logic.** An auditor or large customer asks "show me, for tenant X, every feature that is enabled and why". If you cannot produce that list in <1 hour, your gating is opaque and needs redesign.

---

## When NOT to Use

- **Single-tier product.** No gating needed.
- **Feature only differs in *quantity*, not *availability*.** That is a limit, not a gate. See [[limit-and-quota-design]].
- **Pre-PMF experimental features.** Use raw feature flags. Premature entitlement modeling burns runway.
- **Gating logic is centralized and working.** If you already have a clean entitlement service and the only issue is adding one more entitlement, do not refactor.

---

## Decision Inputs

| Input | Type | Required | Source | Notes |
|---|---|---|---|---|
| `tier_count` | integer | yes | tier model | From [[tier-design-principles]] output. |
| `gated_feature_count` | integer | yes | product backlog | Features that vary by tier. Excludes features available to everyone. |
| `custom_deal_frequency` | enum | yes | sales | `{never, occasional, frequent}`. Frequent custom deals force entitlement-based. |
| `services_consuming_tier` | integer | yes | architecture | How many services need to know tier/entitlement state. >5 forces a centralized service. |
| `change_frequency_features_per_quarter` | integer | recommended | product velocity | If features churn fast, the gating mechanism must be hot-reload friendly. |
| `audit_requirement` | enum | recommended | compliance | `{none, light, strict}`. Strict (SOC2 with controls citing gating, HIPAA) forces inspectable gates. |

---

## Patterns

Three primary gating patterns. Most production systems use a mix.

### Pattern A: Tier-string check (lookup-by-tier)

```python
if tenant.tier == "pro":
    enable_feature_x()
```

A column on the tenant table holds the tier name; every service checks the string directly.

**Pros:** trivial to implement; obvious to read.

**Cons:** every code path with a gate knows about every tier name; adding a tier requires PRs everywhere; custom deals are impossible without polluting the tier vocabulary ("pro-with-sso-and-audit-logs"); audits cannot answer "what does Pro include" without grepping code.

**When fit:** ≤2 tiers, ≤1 service, no custom deals, single-team ownership.

### Pattern B: Feature-flag lookup (per-feature flag, evaluated per tenant)

```python
if feature_flag("enable_x", tenant=tenant).is_on():
    enable_feature_x()
```

A feature-flag service (LaunchDarkly, Unleash, internal) holds per-feature, per-tenant evaluation logic. Tier is *one input* to that logic; custom deals are simply per-tenant flag overrides.

**Pros:** decouples gating from code; same infrastructure as release rollout; custom deals work without changing schemas; per-tenant overrides for support cases trivial.

**Cons:** runtime dependency on the flag service (must be highly available); evaluation overhead (cache aggressively); flag-soup if many features are gated this way without naming conventions; "who set this flag and why" is an audit question the flag service must answer.

**When fit:** 3+ tiers, frequent custom deals, multiple services, willingness to operate (or pay for) a flag service.

### Pattern C: Entitlement table (per-tenant explicit entitlement list)

```python
if "feature_x" in tenant.entitlements:
    enable_feature_x()
```

A table or service holds, per tenant, the *explicit* set of entitlements granted. Tier-membership populates entitlements via a tier→entitlement mapping table; custom deals add entitlements directly to a tenant.

**Pros:** the entitlement set IS the answer to "what does this tenant get"; trivially inspectable from outside the code; auditors love it; custom deals are first-class; tier changes are entitlement-set changes.

**Cons:** more upfront design; the tier→entitlement mapping is a source of truth that must be kept current; entitlement-set bloat over time (hundreds of entitlements is hard to reason about); migrations are still needed when entitlements change schema.

**When fit:** 4+ tiers, strict audit, frequent custom deals, enterprise sales motion, ≥5 services need gating.

### Hybrid (most common production design)

Most maturing platforms end up with: **entitlement table for commercial features, feature flags for release rollout**. The entitlement service answers "what is this tenant allowed to use commercially"; the flag service answers "is this code path rolled out yet". A feature is *gated open* when BOTH say yes.

---

## Mechanism Comparison

| Dimension | Tier-string | Feature-flag | Entitlement |
|---|---|---|---|
| **Initial cost** | Minutes | Days (integrate flag service) | Weeks (build entitlement service) |
| **Adding a tier** | PRs to N services | Update flag rules | Add row to tier→entitlement mapping |
| **Custom deals** | Painful (forks tier names) | Per-tenant flag override | Add entitlement rows to tenant |
| **Audit answer** | "grep code" | Flag service report | Query entitlements table |
| **Latency** | Negligible | Cache-dependent (usually <1 ms) | Single table read or cache |
| **Failure mode** | Stale code | Flag service unavailability | Entitlement service unavailability |
| **Scales to N services** | Poorly | Well (one client lib) | Well (one client lib + cache) |

---

## Evolving Gating Without Churn

Tier structures evolve. A gating mechanism must support *changes* without rewriting hundreds of `if` statements. Concrete patterns:

- **Stable entitlement names.** Entitlement names should describe the *capability*, not the tier ("feature.audit_logs", not "pro_audit_logs"). Tier renames do not touch entitlement names.

- **Gradual migration when changing mechanism.** When moving from tier-string to entitlement-based, add the entitlement check *alongside* the tier check (`if entitlement OR tier_string`). Migrate readers tenant-by-tenant. Remove the tier-string check after a quarter of dual operation.

- **Per-tenant overrides as a first-class concept.** Whatever the mechanism, support a per-tenant override path. Sales needs it; support needs it; an outage might need it. Designing without overrides creates back-channel workarounds (production database writes by support engineers).

- **Tier-set versioning.** The mapping "Pro includes [X, Y, Z]" changes over time. Existing customers may have an older mapping (grandfathered). Either version the tier-set explicitly or migrate everyone forward on a schedule. Implicit "everyone-on-current" is a churn-and-surprise source.

- **Feature ramp-up vs commercial gate split.** Release rollout (10% of tenants get the new code path) is a *release engineering* concern; commercial entitlement (only Pro+ can use it) is a *product* concern. Keeping them in separate systems avoids confusion when a customer asks "why don't I have feature X" — answer is either "it's not rolled out yet" or "your tier doesn't include it".

**CRITICAL:** gating logic must be inspectable from outside the code path — a hidden gate is a CS (customer success) surprise. If a customer support engineer cannot answer "why does tenant X have feature Y enabled" by looking at a UI or running a query (without reading source code), the gating is opaque and will cause support escalations, audit findings, and contractual disputes. Every gate must be addressable by a *name* that appears in operational dashboards and support tools — not buried as an inline `if` whose existence is invisible until it fires.

---

## Trade-offs

| Goal | Choose |
|---|---|
| Ship fast, single tier might become 2 | Tier-string. Plan migration when 3rd tier arrives. |
| Multi-service, multi-tier, no custom deals | Feature-flag (LaunchDarkly / Unleash / internal). |
| Multi-tier with custom enterprise deals | Entitlement table. Don't fight it. |
| Mature SaaS with release engineering already using flags | Hybrid: entitlement for commercial, flags for release. |
| Strict audit (HIPAA + SOC2 controls citing gating) | Entitlement table with audit log of changes. |
| Open-source product that ships to customers' clouds | Entitlement table (cannot phone-home for flag eval). |

---

## Quality Checks

- **CRITICAL:** gating logic must be inspectable from outside the code path. The check: can a non-engineer (CS, support, sales) answer "what features does tenant X have" in <5 minutes? If no, the gating mechanism fails this check regardless of how clean its code is.
- **Single source of truth.** Every gated feature should be evaluated by exactly one mechanism. Hybrid is fine *if* each feature is in exactly one bucket; the failure mode is two checks disagreeing.
- **Per-tenant override path documented.** What is the runbook for "sales sold this customer feature X without an entitlement"? If undocumented, expect database writes by support engineers.
- **Tier-rename does not touch entitlement names.** Test by simulating a rename. If 500 lines of code change, your entitlement names are coupled to tier names.
- **Migration plan for legacy tier-string checks exists.** Brownfield systems almost always have legacy `if tier ==` checks. Catalog them; have a plan to retire each. "We'll clean up later" never happens.
- **Audit log on entitlement changes.** Who granted entitlement X to tenant Y, when, why. SOC2 expects it.
- **Cache invalidation strategy.** When entitlements change, downstream caches must invalidate within an SLO. If a customer pays for an upgrade and waits 24 hours for it to take effect, your invalidation strategy is broken.
- **Failure-mode handling explicit.** What happens when the entitlement service is unavailable? Fail-closed (deny features) is safer; fail-open (allow features) is operationally friendlier. Pick one and document.
- **Gate name appears in dashboards.** Every entitlement should show up in operational dashboards (which tenants have it, how often is it consulted). If no, the gate is opaque.

---

## Web Research Queries

- `feature flag vs entitlement {date}` — clarifies the two-system pattern.
- `Stripe entitlements API {date}` — Stripe's entitlement product; useful for vocabulary.
- `LaunchDarkly multi-tenant gating {date}` — vendor patterns.
- `feature gating SaaS architecture {date}` — broader pattern surveys.
- `entitlement service design pattern {date}` — implementation references.
- `audit log feature flag changes SOC2 {date}` — compliance angle.
- `gating logic refactor strategy {date}` — migration playbooks.

---

## Cross-references

**Companion fragments:**

- [[tier-design-principles]] — what tiers exist and why.
- [[limit-and-quota-design]] — quantitative gating (how much of feature X).
- [[tier-transition-economics]] — when entitlements change due to tier transitions.

**Anti-patterns:**

- [[tier-cliff]] — gating cliffs that incentivize tier abuse.

**Implementation patterns** (downstream):

- Entitlement-service skill (P3+) will implement the entitlement table pattern.

**Quality gate:**

- `QG-F1` — foundation gate including gating inspectability.

**Upstream specs:**

- `docs/v6-final-architecture.md` §6.3.
