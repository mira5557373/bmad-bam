---
id: tenant-tier-upgrade-mechanics
title: Tenant Tier Upgrade Mechanics
category: lifecycle
kind: fragment
module: bmad-bam-platform
persona: atlas
qg_ref: QG-D1
last_reviewed: 2026-05-17
version: 1.0.0
status: active
tags: [tier, upgrade, billing, prorate, feature-flip, schema-migration, cohort, lifecycle, multi-tenant]
references:
  - "GDPR Art 5 (data accuracy) — tier change must keep billing records accurate"
  - "Schrems II — cross-border data processing implications (when tier-upgrade implies cell-relocation)"
  - "src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/zero-downtime-migrations.md"
  - "src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/migration-cohort-selection.md"
  - "src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/migration-rollback-and-abort.md"
---

# Tenant Tier Upgrade Mechanics

Tier upgrades sit in an awkward middle ground between "billing change" and "migration." From a customer-trust perspective, the customer expects an instant flip — they paid, they want the feature. From an engineering perspective, the flip involves billing proration (usually a regulated obligation), feature-flag flip ordering (so the customer doesn't see the new feature before billing is committed), and sometimes schema or per-tenant resource changes (when a higher tier ships additional tables, larger quotas, or dedicated infrastructure). When tier upgrades break, the failure modes are quiet and slow-to-discover: customers are billed at the wrong rate (regulatory + trust hit), or they see partially-flipped feature state (broken UX), or the underlying resource isn't created in time and they hit a feature that 500's on first use.

This fragment is the **design vocabulary** for tier-upgrade playbooks within `migration-runbook.json#per_axis.tier`. It enumerates the four mechanical concerns — cohort selection, billing proration, feature-flip ordering, schema/data migration — and the cross-cutting concern of mechanism-aware execution per `tenancy_model`. The migration runbook locks the playbook; this fragment is the rationale + pattern catalogue the runbook draws from.

The CRITICAL contract that drives everything else: **billing MUST be prorated at upgrade timestamp**. Full-price-from-day-N is the anti-pattern (see `tier-upgrade-without-billing-prorate.md`) and the fastest path to customer-trust loss + regulatory exposure. Proration is the precondition for every other tier-upgrade pattern in this fragment.

---

## When to Use

- **Every tier upgrade in a multi-tenant SaaS pricing model.** The moment your platform has two tiers and a path between them, the patterns in this fragment apply. Even a free → paid conversion needs proration if the upgrade happens mid-billing-cycle.

- **When a new tier ships.** Before the first customer upgrades to or from the new tier, the runbook must cover: how cohorts are scoped to the new tier; what billing-proration logic computes (often new because the tier's pricing structure is new); which feature flags flip in what order; what schema or per-tenant resources are provisioned at upgrade.

- **When `tenancy_model` changes** (rare but consequential). RLS → schema-per-tenant migration alters how per-tier schemas materialize; tier-upgrade mechanics shift correspondingly (per-tenant tables become per-tenant schemas; cohort scope expands).

- **Quarterly review.** Tier-upgrade behavior drifts as features ship + pricing evolves. Quarterly review surfaces drift between what the runbook says and what the implementation does.

- **After a billing-engine change.** A pricing-page redesign, a billing-provider swap (Stripe → Chargebee), or a tax-engine update can silently break proration. Re-run this fragment's checks after any billing-stack change.

- **After a regulatory change.** GDPR's data-accuracy principle + tax laws in major customer geographies treat mis-billing as a regulatory matter, not just a customer-trust matter. New regulation in tax/PII space triggers re-review.

---

## When NOT to Use

- **No tiers in the pricing model.** Flat-rate SaaS with no upgrade path doesn't need this fragment. (Note: even "flat rate" platforms usually have an enterprise plan with custom pricing — at which point this fragment applies again.)

- **Tier changes are admin-only, not customer-initiated.** If only internal admins move tenants between tiers (e.g., legacy customers being migrated to a new pricing model), billing-proration is still required, but the cohort + feature-flip concerns may simplify because admin batches are predictable. Use the fragment's billing-proration section + skim the others.

- **Pre-launch / pre-pricing-model.** Before tiers are locked, this fragment is aspirational. Defer until tier-model.json schema 1.1 ships with full upgrade-semantics fields.

- **Downgrades.** This fragment is upgrade-focused; downgrade mechanics (refund vs. credit; feature-flag flip-back; data-retention as tier shrinks) are related but distinct. A separate fragment (deferred to PX-Pricing or P9 Trust) will cover downgrades.

---

## Architecture: the four mechanical concerns

### Concern 1: Cohort selection for tier upgrade

Tier-upgrade cohorts answer "which tenants migrate together?" Most operations want some grouping to amortize sign-off overhead + dry-run cost. The `cohort_selection_method` enum in the migration-runbook schema offers three approaches:

**rollout_tier_hint_driven (most common).** The tier-model's `upgrade_mode` field per tier informs cohort size:
- `self_serve` tiers (typically free, starter) — cohorts of 50+ tenants. Self-serve tenants are upgraded by their own action; the cohort is whoever-clicked-upgrade-in-the-batch-window.
- `assisted` tiers (typically pro, business) — cohorts of 10 tenants. Success-team-driven upgrades; the cohort is the batch the success team prepared for the upgrade window.
- `white_glove` tiers (typically enterprise) — cohorts of 1 tenant. Custom contracts; each tenant is its own migration window.

This method is the natural default when tier-model 1.1 has populated `upgrade_mode`. The runbook's cohort plan inherits the taxonomy directly.

**risk_stratified.** Used when a new feature or schema change makes the tier-upgrade risky — first cohort is a 1-tenant canary (per `migration-cohort-selection.md` CRITICAL); subsequent cohorts ≥10 tenants once the canary is green. Risk-stratified cohorts are slower but provide the strongest blast-radius control.

**explicit.** User names cohorts directly; usually because the cohorts are residency-scoped or contract-scoped in ways the other methods can't infer. Each cohort has a hand-asserted size + composition.

The runbook MUST emit `cohorts[]` non-empty. Each cohort has `name` (unique within the axis), `size_estimate` (int ≥ 1), and for tier-axis the `billing_prorate: true` invariant (per Concern 2 below).

### Concern 2: Billing proration at upgrade timestamp

**CRITICAL contract.** When a tenant upgrades mid-billing-cycle, the platform MUST charge prorated:
- Refund or credit the unused portion of the lower-tier charge
- Charge the new tier from the upgrade timestamp through the cycle end
- Calculate at the upgrade timestamp (not day-end, not month-end, not "next billing run")

Why timestamp-precision matters: tax-engine integration in many jurisdictions ties tax-liability to the moment of charge. A proration calculated at day-end vs. the actual upgrade timestamp produces different tax amounts. The auditor will flag this.

**Proration formula (per the most common SaaS pattern):**

```
charge_for_new_tier = (new_tier_monthly_price / days_in_cycle) * days_remaining_in_cycle_at_upgrade_timestamp
credit_for_old_tier = (old_tier_monthly_price / days_in_cycle) * days_remaining_in_cycle_at_upgrade_timestamp
net_charge = charge_for_new_tier - credit_for_old_tier
```

**Edge cases:**

- **Annual billing.** If the customer is on annual billing, the proration spans days-in-year (typically 365). Use the actual days-in-cycle from the customer's billing record, not a hardcoded constant.
- **Multi-tier jump.** Free → enterprise in one upgrade. Proration is still per-tier-pair: credit-for-free is 0 (free was free); charge-for-enterprise is full prorated from upgrade timestamp. No interpolation through intermediate tiers.
- **Downgrades within a billing cycle.** Out-of-scope for this fragment, but the inverse formula applies; refund_for_old_tier minus charge_for_new_tier; credit on next bill OR immediate refund per policy.
- **Tax timing.** If the customer's tax jurisdiction changed between the cycle start and the upgrade timestamp (rare but possible — VAT registration; state-tax-nexus change), the proration MAY need to split into pre-change + post-change tax buckets. Consult the tax-engine.
- **Trial periods.** If the customer is in trial of the higher tier when proration triggers, treat trial-end as the proration timestamp (no charge during trial; full new-tier charge from trial-end through cycle-end).

**Audit trail.** EVERY proration calculation captured in `billing_prorate_audit` observability hook (mandatory in the migration runbook's `observability_hooks` for tier-axis). Audit record contains: tenant_id, upgrade_timestamp (RFC 3339), old_tier_id, new_tier_id, days_in_cycle, days_remaining, charge_calculated, credit_calculated, net, tax_jurisdiction_at_calculation, tax_engine_version, proration_formula_version.

**Rollback semantics.** If the migration is rolled back (canary fails; cohort aborts), the proration MUST also be rolled back: charge is reversed, customer's net balance is restored. Without proration-rollback, customers double-pay (once for the failed upgrade, once for the subsequent successful one).

### Concern 3: Feature-flip ordering

The customer sees the new feature only AFTER billing is committed. Reverse order = bug. The runbook locks the ordering:

1. **Billing-engine commits the upgrade-charge transaction** (proration calculated; charge attempted; success returned; transaction-id captured).
2. **Customer's tier_id flips in the platform's tenant-state-store** (the source of truth for `tenant_a.tier_id = "enterprise"`).
3. **Per-tier feature flags re-evaluate** (cache invalidation triggered; downstream services re-fetch tier state).
4. **Customer is notified** (email, in-app banner, etc.) — only after the feature is actually flipped, not before.

**Ordering edge cases:**

- **Billing fails mid-upgrade.** Billing-engine returns failure (card declined, fraud-check trigger, tax-calculation error). The tenant_state_store MUST NOT flip. Customer remains on old tier; UX shows "upgrade failed; payment method update needed."
- **Feature flag cache propagation.** Caches at edge nodes, CDN, in-process, in-cluster — each has a propagation delay. The runbook's `dry_run_plan` must verify cache propagation completes within an acceptable window (typically <30s). Stale cache reads = customer sees old features after paying for new ones = trust loss.
- **Asynchronous feature-readiness.** Some features ship per-tenant resources asynchronously (e.g., dedicated cell allocation; tenant-specific ML model warmup). The feature flag flips to "available" only after the resource is ready, not at billing commit. The runbook's `observability_hooks` track per-tenant feature-readiness state.

### Concern 4: Schema/data migration per tier

Higher tiers may ship additional per-tenant resources. The runbook enumerates:

- **Per-tenant tables.** Example: enterprise tier ships `tenant_enterprise_audit_log`, `tenant_enterprise_export_history`. Migration adds these tables; rollback drops them.
- **Per-tenant quotas / limits.** Example: business tier raises per-tenant connection pool cap from 10 to 50. Migration adjusts the cap in the tenant-quota-store; rollback restores the prior cap.
- **Per-tenant dedicated resources.** Example: enterprise tier ships dedicated database (database-per-tenant). Migration provisions the database + replicates baseline data; rollback drops the database after verifying no transactions occurred.
- **Per-tenant feature-specific config.** Example: white-glove enterprise tier ships custom-domain support; migration provisions DNS + TLS cert + load-balancer rule for the customer's domain; rollback un-provisions.

**Mechanism-aware execution per `tenancy_model`:**

- **RLS (row-level-security):** Tier-upgrade adds NEW RLS policies on the new per-tenant tables (where applicable). Most upgrades within RLS are policy-additions, not table-additions. Rollback drops the new policies.
- **schema-per-tenant:** Tier-upgrade adds tables to the per-tenant schema. Atomic per-tenant migration (the BYP-104 pattern from the test catalogue: migration runner MUST apply ALL tenant schemas atomically; partial state across cohort is impossible). Rollback drops the tables — but ONLY if no writes have occurred (preserves data); if writes have occurred, rollback escalates to manual.
- **cell-based:** Tier-upgrade may require cell-relocation (free → enterprise moves tenant from shared cell to dedicated cell). This is the most-coupled case — tier-upgrade implicitly becomes region-axis (if the dedicated cell is in a different region). The runbook MUST be designed with both axes active in this case; the migration runbook schema allows `migration_axes: ["tier", "region"]` for exactly this reason.
- **hybrid:** Tier-upgrade mechanics resolve per the `hybrid_resolution` entry for the source-tier + target-tier pair. Example: free → enterprise where free is RLS and enterprise is cell-based → upgrade involves both an RLS-policy drop (source tenant exits RLS) AND a cell-allocate (target tenant joins dedicated cell).

---

## Trade-offs

| Pattern choice | Pro | Con |
|---|---|---|
| Proration at exact upgrade timestamp vs. day-end | Tax accuracy; regulatory defensibility | Billing-engine must compute mid-day rates; slightly more complex |
| `rollout_tier_hint_driven` cohort vs. `risk_stratified` | Faster rollout; lower op-overhead; tier-driven scope is natural | Higher blast radius if new feature has bugs; risk_stratified is safer |
| Billing commit FIRST then feature flip vs. parallel | Avoids customer seeing feature without paying | Customer experiences brief delay between payment confirmation + feature availability |
| Synchronous feature flip vs. asynchronous resource provision | Customer gets immediate experience | Hides per-tenant resource readiness; runbook MUST observe per-tenant readiness state |
| Per-tier-schema additions atomically vs. per-tenant rolling | Migration runner ensures consistent state across cohort | Atomic migration blocks the whole cohort until success; one tenant's failure halts |
| Cohort scope tier-driven vs. residency-driven | Tier-driven cohorts are simpler ops-wise | Residency requirements (EU customer on US-cell needing EU-cell for enterprise tier) require explicit cohort selection |
| Capture proration audit at billing-engine vs. platform | Source of truth at billing-engine | Platform may need its own audit copy for ADR / regulatory inquiry response |

---

## Implementation Patterns

### Pattern: idempotent upgrade

Tier-upgrade requests MAY arrive twice (network retry; webhook duplicate from payment provider). The upgrade MUST be idempotent: second call detects the upgrade-already-applied state + returns success without re-charging.

```
function upgrade_tier(tenant_id, target_tier_id, request_id):
  if has_processed_request(request_id):
    return cached_response(request_id)

  current_tier = get_tier(tenant_id)
  if current_tier == target_tier_id:
    record_idempotent_no_op(request_id)
    return {status: "already_at_tier"}

  if has_in_flight_upgrade(tenant_id):
    return {status: "in_flight", retry_after: 30s}

  charge_id = billing.charge_prorated(tenant_id, current_tier, target_tier_id)
  flip_tier(tenant_id, target_tier_id, charge_id)
  store_request(request_id, response)
  return response
```

Idempotency key (`request_id`) typically derives from the payment-provider webhook's idempotency token + a hash of the request body. Stored with TTL ≥ payment-provider's retry window (typically 24-72 hours).

### Pattern: feature-flip with cache propagation barrier

After tier-flip, the runbook ensures cache propagation completes before declaring upgrade success:

```
function flip_tier(tenant_id, target_tier_id, charge_id):
  with transaction:
    update_tenant_tier(tenant_id, target_tier_id, charge_id, timestamp)
    bump_feature_flag_version()

  // Cache propagation barrier
  wait_for_caches_to_propagate(target_version, timeout=30s)

  // Per-tenant resource provisioning (asynchronous; observable)
  if requires_per_tenant_resources(target_tier_id):
    enqueue_provisioning_job(tenant_id, target_tier_id)

  emit_event("tier_upgraded", {tenant_id, target_tier_id, charge_id, timestamp})
```

`wait_for_caches_to_propagate` is mechanism-specific: cache pub-sub, version-poll, or sentinel-read. The runbook's `dry_run_plan` exercises this barrier against the chosen `dry_run_environment`.

### Pattern: rollback with proration reversal

On rollback (canary fails; abort fires), the runbook reverses every committed step:

```
function rollback_tier_upgrade(tenant_id, target_tier_id):
  in_reverse_order:
    un_provision_per_tenant_resources(tenant_id, target_tier_id)  // step 4 reverse
    bump_feature_flag_version()                                    // step 3 reverse (cache flush)
    revert_tenant_tier(tenant_id, prior_tier_id)                   // step 2 reverse
    billing.refund_prorated(tenant_id, charge_id)                  // step 1 reverse — proration unwound

  emit_event("tier_upgrade_rolled_back", {tenant_id, charge_id, refund_id, timestamp})
```

The refund leg is the most-likely-to-be-forgotten step. Without it, the customer is left charged for an upgrade they didn't receive. The migration runbook's `observability_hooks` MUST include a per-tenant audit that surfaces every charge without a matching tier-flip (signal: refund-orphan).

### Pattern: cohort dry-run replays

For `cadence: each_cohort`, the dry-run for cohort N+1 replays the cohort-N runbook against the chosen `dry_run_environment`. The replay verifies:
- Proration formula produces expected values for the cohort's tenant tier distribution
- Feature flip propagates within the cache barrier
- Per-tenant resources provision within SLA
- Rollback (executed for the dry-run; never in production unless triggered) restores prior state

`canary_tenant` dry-runs replay on a production-environment canary tenant + observe for hours-to-days; production tenants follow only after canary green. The migration runbook's `observability_hooks` covers the canary observation window.

---

## Quality Checks

- **CRITICAL:** Billing MUST be prorated at upgrade timestamp; full-price-from-day-N is the anti-pattern (`tier-upgrade-without-billing-prorate.md`).

- **Audit every proration.** `billing_prorate_audit` observability hook captures every calculation with full inputs + outputs. No proration is "trust the engine"; every calculation is auditable post-hoc.

- **Idempotency keys with TTL ≥ payment-provider retry window.** Without TTL alignment, repeated webhooks succeed-then-fail mid-retry-window, causing double-charge.

- **Cache propagation barrier mandatory between feature-flip + customer notification.** Without the barrier, customers see stale feature state, breaking the perception of payment-immediacy.

- **Rollback reverses proration.** Failed-upgrade-without-refund is a regulatory + trust failure; the runbook's rollback gate MUST trigger refund as the first reverse step.

- **Feature-flip ordering inviolate.** Billing-first, then state, then flag, then notify. Any reordering creates a class of customer-trust bugs.

- **Per-tenant resource provisioning observed.** When tier-upgrade ships per-tenant resources (dedicated cell, custom domain, etc.), the provisioning is asynchronous + the runbook tracks readiness. Customer notification waits for readiness, not for the synchronous flip.

- **Cohort size respects `upgrade_mode`.** Self-serve cohort sizes ≥50 are operationally normal; enterprise cohorts >1 violate the white-glove model. The runbook's cohort_plan inherits `upgrade_mode` directly.

- **Schema additions atomic per cohort.** Schema-per-tenant deployments MUST apply tier-upgrade schema changes atomically across the whole cohort; partial state (some tenants migrated, others not) is impossible by construction. The BYP-104 test pattern enforces this.

- **Mechanism-aware execution.** RLS / schema-per-tenant / cell-based / hybrid each have distinct tier-upgrade execution paths. The runbook resolves the path via `tenancy_model` (+ `hybrid_resolution` if hybrid).

- **Quarterly drift check.** The runbook + implementation drift; quarterly review catches drift before incident.

- **Tax-jurisdiction snapshot at proration timestamp.** Tax engines + customer jurisdictions evolve; snapshot the jurisdiction state with the proration audit record to enable auditor inquiry years later.

---

## Web Research Queries

Refresh empirical inputs annually. Replace `{date}` with current year.

- `SaaS tier upgrade billing proration {date}` — surfaces patterns + post-incident write-ups on proration failures.
- `Stripe Chargebee proration {date}` — billing-engine specific implementations + edge cases.
- `feature flag tier upgrade {date}` — LaunchDarkly / Optimizely / Statsig + tier-coupled feature systems.
- `tax engine SaaS proration {date}` — Avalara / TaxJar / Stripe Tax + tier-change tax implications.
- `idempotent webhook upgrade {date}` — payment-provider webhook semantics; idempotency key TTL norms.
- `multi-tenant tier upgrade schema migration {date}` — community patterns for adding per-tier tables.
- `GDPR Art 5 billing accuracy {date}` — regulatory framing for billing-accuracy obligations.
- `cohort rollout tier upgrade {date}` — operational patterns for cohort scoping.

---

## Cross-references

**Companion fragments:**
- [[migration-cohort-selection]] — cohort scoping mechanics; this fragment cites cohort-selection patterns for tier-axis
- [[migration-rollback-and-abort]] — rollback semantics; this fragment's "rollback with proration reversal" pattern lives within the broader rollback framework
- [[zero-downtime-migrations]] — zero-downtime patterns; tier-upgrade rollback method eligibility (cell_failback excluded) sources here
- [[region-migration-playbook]] — sibling axis; when tier-upgrade implies cell-relocation, region-axis is co-activated
- [[tier-design-principles]] — upstream context; the tier-model decisions this fragment implements upgrades against
- [[feature-gating-patterns]] — feature-flag patterns; tier-upgrade feature-flip ordering depends on the underlying flag system

**Glossary:**
- `billing-prorate` (P3.2 derived from tier-upgrade discussion; defined in this fragment's audit table semantics)
- `feature-flip` (introduced in `feature-gating-patterns.md`)

**Quality gate:**
- `QG-D1` v0.1.0 — primary consumer; `migration-runbook.json#per_axis.tier` validation sources from this fragment
- `QG-M2` v1.1.0 — mirror consumer (H4 partial proxy)

**Anti-pattern:**
- [[tier-upgrade-without-billing-prorate]] — the primary failure mode this fragment prevents
- [[tier-cliff]] (P3.1) — adjacent pricing-structure failure; same family of regulatory/trust risk per cross-reference E3

**Schemas:**
- `migration-runbook.json` schema (spec §3.5) — `per_axis.tier` populates from this fragment's enumeration
- `tier-model.json` schema (spec §3.1) — `upgrade_mode` per tier informs cohort selection

**Downstream consumers:**
- `bmad-bam-design-tenant-migration-tooling` step-02 — loads tier-axis playbook templates from this fragment
- `bmad-bam-design-tenant-migration-tooling` step-04 — locks tier-axis recommendation; cohort + billing + flip + schema-migration choices grounded here

**Upstream specs:**
- `docs/superpowers/specs/2026-05-17-p3-2-lifecycle-design.md` §2.4 (skill purpose), §3.5 (migration-runbook schema), §5.1.1 (fragment registration)
