---
id: region-migration-playbook
title: Region Migration Playbook
category: lifecycle
kind: fragment
module: bmad-bam-platform
persona: atlas
qg_ref: QG-D1
last_reviewed: 2026-05-17
version: 1.0.0
status: active
tags: [region-migration, data-residency, dns-cutover, dual-write, cross-dc, blue-green, gdpr, schrems-ii, consent, multi-tenant]
references:
  - "GDPR Art 6 (lawful basis for processing) + Art 44-49 (transfers to third countries)"
  - "Schrems II — CJEU Case C-311/18; data transfers outside EEA require additional safeguards or invalidate Standard Contractual Clauses"
  - "DNS RFC 1034 + 1035 (TTL semantics)"
  - "src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/zero-downtime-migrations.md"
  - "src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/migration-cohort-selection.md"
  - "src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/migration-rollback-and-abort.md"
  - "src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/cell-based-architecture.md"
---

# Region Migration Playbook

Cross-region tenant migration is the highest-stakes operation a multi-tenant SaaS performs. Failure modes include: regulatory exposure (data crossed a residency boundary without lawful basis), customer-trust loss (data residency was a contractual commitment), revenue loss (tenant downtime during cutover), and operational complexity (cross-DC blue-green requires both regions live simultaneously). The patterns in this fragment are derived from post-incident write-ups of region migrations 2020-2025: every published failure traces back to one of four root causes — consent obtained AFTER data movement; DNS TTL set incorrectly; dual-write contract ambiguous; or rollback assumed but never rehearsed.

The CRITICAL contract: **region migration MUST obtain consent BEFORE any data movement crossing residency boundaries** (per GDPR Art 6 + Schrems II + most other PII regimes). Consent-then-move-then-finalize is the only legitimate pattern. Move-then-consent treats the migration as a fait accompli and exposes the platform to regulatory action — under GDPR, "consent" obtained after processing has occurred is no consent at all.

This fragment is the **design vocabulary** for the region-migration playbook within `migration-runbook.json#per_axis.region`. It enumerates the four mechanical concerns — residency consent, DNS cutover, dual-write, cross-DC blue-green — and the cross-cutting concerns of cohort scoping (by residency-zone), data replication, and rollback per the chosen mechanism. The migration runbook locks the playbook; this fragment is the rationale + pattern catalogue the runbook draws from.

---

## When to Use

- **Any cross-residency-boundary tenant movement.** EU customer's data moving from us-east-1 to eu-west-1; APAC customer's data moving from us-west-2 to ap-southeast-1; any time a tenant's data physically crosses a residency boundary that was disclosed (or implied) to the customer. The boundary is the trigger, not the distance.

- **Cell-relocation tied to tier-upgrade.** When tier-upgrade (e.g., free → enterprise) implicitly relocates the tenant to a dedicated cell in a different region, region-axis is co-activated. The migration runbook must run both axes (`migration_axes: ["tier", "region"]`).

- **Regulatory deadline.** GDPR-style regulation requires data residency to follow customer claims; deadlines for residency compliance trigger forced migrations. Schrems II created multiple such deadlines for EU-US transfers 2020-2024.

- **Capacity planning.** Source region is at capacity; new tenants land in target region; existing tenants follow on a rolling cohort schedule. This is the most common non-regulatory driver.

- **Cost optimization.** Moving tenants closer to their primary user base reduces latency + egress costs. The migration is voluntary from a regulatory standpoint but still requires consent if residency disclosure was part of the contract.

- **Region sunset.** Source region is being decommissioned (cloud provider deprecation; cost; consolidation). All tenants in source region migrate to a target; pre-migration timeline typically 6-18 months.

- **DR-event recovery.** Source region had a sustained outage; tenants are temporarily moved to a target region; permanent relocation may follow if the outage was severe. (The DR-event flow shares mechanics with planned migration but adds urgency; the runbook patterns still apply.)

---

## When NOT to Use

- **Single-region platforms.** Platforms with only one region don't have a region-migration axis to design. The fragment becomes relevant when the second region ships.

- **Tier-only upgrades within the same region.** Tier-upgrades that don't relocate cells stay within the tier-axis playbook (`tenant-tier-upgrade-mechanics.md`). Use this fragment only when residency boundary is crossed.

- **Pre-region-topology.** Before `deployment-topology.json` is committed, region-migration is aspirational. Defer until topology is locked.

- **Data-replication-only migrations.** Read-replica creation in a new region (without primary tenancy moving) is not a region migration in this fragment's sense — no residency-boundary crossing of primary data. The fragment may apply for failover planning, deferred to P10 DR.

---

## Architecture: the four mechanical concerns

### Concern 1: Residency consent (CRITICAL — must precede data movement)

**The contract.** Before any tenant's data crosses a residency boundary, the platform MUST:

1. **Notify the tenant** of the impending migration: source region; target region; data-residency-zone change (US → EU; EU → US; etc.); reason; planned migration window; rollback policy.
2. **Obtain explicit consent** (affirmative action by the tenant — not implied; not opt-out). Consent record persisted with: tenant_id, consent_timestamp (RFC 3339), consent_method (email-confirm, in-app-confirm, contract-amendment, etc.), consent_text (the exact disclosure shown), source_region, target_region, source_residency_zone, target_residency_zone.
3. **Verify consent BEFORE initiating data movement.** The migration orchestrator checks the consent record; if absent or stale (typically: consent older than 90 days at migration time is considered stale per GDPR working-party guidance), the migration MUST NOT start.

**Legal basis (GDPR Art 6).** Consent is one lawful basis. The platform may use others:
- **Contractual necessity (Art 6(1)(b))** — if the contract with the customer explicitly authorizes residency moves under specified conditions (rare; most contracts don't pre-authorize).
- **Legitimate interest (Art 6(1)(f))** — has to pass the legitimate-interest test (purpose + necessity + balancing); rarely sufficient for cross-residency PII transfer.
- **Compliance with legal obligation (Art 6(1)(c))** — regulator requires the move (e.g., data localization law).

For all legal bases other than consent, the platform's privacy / legal team MUST document the basis BEFORE migration. The runbook MUST reference the documented basis. Without documentation, the operation is treated as consent-required.

**Schrems II implications (US ↔ EEA transfers).** Standard Contractual Clauses (SCCs) alone are insufficient for EU-to-US transfers since the 2020 CJEU ruling; the platform MUST implement additional safeguards: encryption-in-transit + at-rest with keys held in the EEA; pseudonymization; transfer-impact-assessment (TIA) on file. The runbook MUST cite the TIA in the consent text + audit trail.

**Per-cohort consent.** Consent is per-tenant, not per-cohort. The cohort plan in the migration runbook MAY group tenants by consent timing (those who consented + are eligible for the next cohort); tenants without consent are NOT migrated until consent arrives.

**Consent withdrawal.** GDPR allows consent withdrawal at any time. If a tenant withdraws consent mid-migration (consent given; data movement in flight; consent withdrawn before completion), the migration MUST roll back for that tenant. The runbook's abort_criteria includes consent_audit failure.

### Concern 2: DNS cutover

**TTL discipline.** Before the cutover window, the DNS TTL for the tenant-routing record is reduced (typically from 3600s normal → 60s pre-cutover). The reduction propagates over the prior TTL window (~1 hour). At cutover, the record is updated to point to the target region; the 60s TTL means most resolvers pick up the new value within 60s. After cutover stability (typically 24h post-cutover), the TTL is restored to normal.

**Pre-cutover TTL adjustment timeline:**
- T-24h: Set TTL to 60s. The prior 3600s TTL means resolvers pick up the new 60s TTL within 1 hour after this change. T-23h onward: most resolvers cache the new 60s TTL.
- T-cutover: Update record value to target region. 60s TTL means cutover propagates in 60s for compliant resolvers; some non-compliant resolvers may take longer (see "non-compliant resolvers" below).
- T+24h: Restore TTL to 3600s normal value (after cutover stability is confirmed).

**Non-compliant resolvers.** Some recursive resolvers (ISP-level; corporate firewalls; legacy clients) ignore TTL and cache for longer-than-advertised durations. Empirically, ~1-5% of traffic continues to hit the source region for 1-6 hours after cutover. The dual-write contract (Concern 3) MUST cover this tail: writes that arrive at the source region post-cutover are forwarded to the target region (with replication-lag-aware semantics).

**Per-tenant DNS routing.** When tenants are routed via per-tenant DNS records (e.g., `tenant_a.platform.example` vs. `tenant_b.platform.example`), the cutover is per-tenant; cohort cutovers can be staged. When tenants share a single DNS record (e.g., `app.platform.example` with header-based routing), the cutover is platform-wide; cohort cutovers are not supported by the routing layer + the runbook must address platform-wide cutover (typically: tier-by-tier within a region first, then full DNS cutover after).

**TLS / certificate considerations.** Cross-region migration must address certificate validity at target region: the certificate covering tenant DNS records must be valid + trust-chain-rooted at the target's load balancer. Pre-cutover, the target region must serve the certificate (typically via shared cert manager or per-region cert with identical SAN list).

**HSTS preload caveats.** If `tenant_a.platform.example` is HSTS-preloaded (in the browser's HSTS preload list), the cutover must preserve HTTPS + the certificate must be valid at target before cutover. Failure to do so locks tenants out via HSTS.

### Concern 3: Dual-write strategies

**The window.** Between cutover-prep (pre-T-cutover) and cutover-finalization (typically T+1h to T+24h depending on traffic patterns), writes may arrive at EITHER region. The platform's dual-write contract specifies how those writes propagate.

**Pattern 1 — source-wins-until-promotion:**
- During cutover window: writes to source region replicate asynchronously to target region; writes to target region replicate back to source region (bidirectional, conflict-resolution favors source).
- Promotion: at T+stability, source region is marked read-only; writes go to target only.
- Conflict resolution: source-wins means any conflicting target-write loses; rare but possible if two clients hit different regions during the window.

**Pattern 2 — target-wins-post-promotion:**
- Pre-cutover: writes to source region only.
- During cutover window: writes to source replicate to target; writes to target are deferred (queued) until promotion.
- Promotion: target promotes to primary; queued writes from target are processed; source becomes read-only.

**Pattern 3 — vector-clock reconciliation:**
- Both regions accept writes; conflicts surface at read time via vector clocks; application layer resolves.
- Highest complexity; lowest operational risk for short cutover windows; deferred to specialized DBs (Cassandra-style; Riak-style).

**Pattern 4 — short-window-no-dual-write:**
- DNS TTL set to 60s pre-cutover; cutover window is 60-300s (60s for TTL propagation; brief operator-attention window).
- Source region marked read-only at cutover-start; writes are temporarily 503-with-retry; target region serves reads + writes once cutover completes.
- Customer-visible: brief write-failure window during cutover. Acceptable for cohort cutovers when zero-downtime is not a hard requirement.

**Pattern selection per `zero_downtime_required`:**
- `zero_downtime_required: true` → Pattern 1, 2, or 3 (dual-write required to avoid downtime).
- `zero_downtime_required: false` → Pattern 4 acceptable (brief downtime during cutover).

The runbook's `rollback_method` interacts with the dual-write pattern: `dual_write_revert` requires Pattern 1/2/3 (because reverting needs the dual-write infrastructure already in place); `blue_green_flip` is compatible with any pattern.

**Replication lag observation.** All patterns require monitoring of source→target replication lag. The abort_criteria's `replication_lag_threshold` (typically 30min on reconcile) triggers abort if replication can't keep up. The observability_hooks's `replication_lag_metric` exposes the lag to dashboards.

### Concern 4: Cross-DC blue-green

**Same-DC blue-green vs. cross-DC.** Same-DC blue-green is the well-known pattern: deploy new version to green; flip traffic; monitor; rollback by flipping back to blue. Cross-DC blue-green adds two complications:

1. **Replication lag.** Green region's data is a replica of blue region's data; replication lag means the green region may not have the most recent writes when traffic flips. The runbook MUST verify replication-caught-up signal before flip.
2. **Cross-DC latency.** Traffic from the customer's primary geography to the target region adds cross-DC latency; if the target region is geographically farther from the customer, latency degrades during the cutover window. Customer-experience metrics (p99 latency observed via `tenant_id_error_log` + dashboards) catch this.

**Replication-caught-up signal:**
- Snapshot-based: take snapshot at source; restore at target; mark target ready when restore completes. Acceptable for low-write platforms.
- Continuous-replication: replication-stream tail near zero-lag (typically <10s). Production platforms.
- Consensus-based: distributed consensus (Raft, Paxos) across regions. Highest-availability but introduces cross-region latency on every write.

**Flip mechanism.** DNS cutover (Concern 2) is the primary mechanism; service mesh / API gateway routing rules can be a secondary mechanism for finer-grained control. Both must be coordinated; if DNS flips but the gateway routing still points at source, requests fail at target with no upstream.

**Per-tenant cell-based cross-DC.** When tenancy_model is cell-based + cells map to regions, cross-DC blue-green simplifies to cell-relocation: spin up new cell at target; replicate cell-local state; flip DNS to target cell; tear down source cell. Cell-based + region-axis is the most natural fit (per `cell-based-architecture.md`).

**Per-tenant schema-per-tenant cross-DC.** Schema-per-tenant requires per-schema replication. Postgres logical replication, MySQL binlog-based replication, or DB-native cross-region replication (RDS Multi-AZ + cross-region read replicas; Aurora Global Database) provide the mechanism. Per-tenant cutover is feasible but requires per-schema coordination — complex.

**Per-tenant RLS cross-DC.** RLS deployments replicate the whole RLS-scoped database. Cross-region cutover is per-database (all tenants in the database migrate together). Per-tenant cohort cutover is not supported by RLS-deployed cross-region replication out of the box; the runbook MUST address platform-wide cutover or partition by database.

---

## Trade-offs

| Pattern choice | Pro | Con |
|---|---|---|
| Pattern 1 (source-wins) vs Pattern 4 (short-window) for dual-write | Zero-downtime; bidirectional writes during window | High complexity; conflict resolution required; double-cost during window |
| `blue_green_flip` rollback vs `dual_write_revert` | Instant flip-back; no state-loss | Doubles capacity during cutover; cost |
| `each_cohort` cadence vs `once_pre_rollout` for cross-region | Rehearsed per cohort; safest | Operationally expensive; cross-region rehearsal cost is high |
| 1-tenant canary first vs full-cohort | Lowest blast radius; aligns with risk_stratified CRITICAL | Slowest rollout; staffing-intensive observation window |
| Per-tenant DNS records vs platform-wide DNS | Per-tenant cohort cutover; finer control | More DNS records to manage; per-tenant cert provisioning |
| Snapshot-based vs continuous replication for caught-up signal | Snapshot is simpler operationally; deterministic | Snapshot can't satisfy zero-downtime; continuous replication is required for zero-downtime |
| TLS via shared cert vs per-region cert | Shared cert simplifies cutover | Per-region cert isolates cert-validity issues to that region; better blast-radius control |
| Consent via email vs in-app vs contract amendment | Email is fastest; in-app has highest engagement; contract is most legally robust | Each has different audit-trail strength; choose per regulatory posture |

---

## Implementation Patterns

### Pattern: consent-first orchestration

The migration orchestrator gates every step on consent verification:

```
function migrate_tenant_to_target_region(tenant_id, target_region):
  consent = get_consent_record(tenant_id, target_region)
  if not consent or consent_stale(consent, max_age_days=90):
    return {status: "consent_required", reason: "no_active_consent"}

  if consent.consent_method not in approved_consent_methods:
    return {status: "consent_invalid", reason: f"method {consent.consent_method} not approved"}

  // Log consent verification for audit
  emit_audit_event("consent_verified_for_migration", {
    tenant_id, target_region, consent_timestamp: consent.timestamp,
    consent_method: consent.method, source_residency: get_residency(tenant_id),
    target_residency: get_residency_for_region(target_region)
  })

  // Proceed with migration
  initiate_data_replication(tenant_id, target_region)
  // ... rest of migration steps
```

The consent_verified_for_migration audit event is the auditor's primary artifact during regulatory inquiry. Captured fields enable post-hoc verification that consent existed AT the moment of migration (not retroactively constructed).

### Pattern: DNS cutover with TTL discipline

```
// T-24h: pre-cutover TTL reduction
update_dns_record(tenant_dns_record, value=source_region_lb, ttl=60s)

// (wait 24h for caches to learn new TTL)

// T-cutover: update record value
update_dns_record(tenant_dns_record, value=target_region_lb, ttl=60s)

// Monitor traffic split for 60s+ until target region serves majority
wait_for_traffic_split(target_region, threshold=0.95, timeout=300s)

// T+24h: restore normal TTL after stability
update_dns_record(tenant_dns_record, value=target_region_lb, ttl=3600s)
```

The traffic-split observation window is the cutover-success signal. If majority of traffic doesn't reach target region within timeout, the cutover is treated as failed → rollback_gate triggers (DNS reverts to source; investigation begins).

### Pattern: dual-write with source-wins

```
// Writes during cutover window
function write_during_cutover(tenant_id, write_request):
  if get_cutover_phase() == "pre_cutover":
    primary_write(source_region, tenant_id, write_request)
    async_replicate_to(target_region, tenant_id, write_request)
    return success

  elif get_cutover_phase() == "cutover_window":
    primary_write(receiving_region, tenant_id, write_request)
    bidirectional_replicate(receiving_region, tenant_id, write_request)
    return success

  elif get_cutover_phase() == "post_promotion":
    primary_write(target_region, tenant_id, write_request)
    return success
```

Source-wins conflict resolution at the database layer (logical-replication conflict handler) resolves conflicting writes during cutover_window in favor of source. Post-promotion, target is canonical.

### Pattern: cross-DC blue-green with replication-caught-up gate

```
function initiate_cross_dc_blue_green(cohort):
  // Pre-flip: replicate cohort data to target
  for tenant_id in cohort.tenant_ids:
    replicate_tenant_data(tenant_id, source_region, target_region)

  // Wait for replication caught-up signal
  for tenant_id in cohort.tenant_ids:
    wait_for_replication_lag_below_threshold(tenant_id, target_region, threshold_seconds=10)

  // Flip DNS (per pattern above)
  for tenant_id in cohort.tenant_ids:
    flip_dns(tenant_id, target_region)

  // Monitor for cohort stability
  observe_cohort_stability(cohort, duration=stability_window)

  // Promote: source becomes read-only
  mark_source_read_only(cohort.tenant_ids)

  // Tear down source data (delayed; per offboarding-policy if integrated)
  schedule_source_teardown(cohort.tenant_ids, delay=retention_window)
```

The `wait_for_replication_lag_below_threshold` is the caught-up gate; without it, flipping DNS exposes target to read traffic before data is fully replicated → 404s + customer-visible errors.

### Pattern: rollback via DNS revert

```
function rollback_cohort(cohort, reason):
  // Trigger event
  emit_event("rollback_triggered", {cohort_id: cohort.id, reason: reason, timestamp})

  // Flip DNS back to source
  for tenant_id in cohort.tenant_ids:
    update_dns_record(tenant_id, value=source_region_lb, ttl=60s)

  // Wait for traffic to drain from target
  wait_for_traffic_drain(target_region, timeout=300s)

  // If dual-write was active, halt target writes + reconcile
  if active_dual_write_pattern == "pattern_1_source_wins":
    halt_writes_to(target_region, cohort.tenant_ids)
    reconcile_drift(source_region, target_region, cohort.tenant_ids)

  // Restore TTL after stability
  for tenant_id in cohort.tenant_ids:
    update_dns_record(tenant_id, value=source_region_lb, ttl=3600s, delay=24h)

  // Log final rollback state
  emit_audit_event("rollback_completed", {cohort_id, tenants_reverted: cohort.tenant_ids, drift_reconciled: True})
```

The `reconcile_drift` step is the cleanup for any writes that landed at target during the cutover window before rollback. Without it, target retains stale data that may conflict with future migrations.

---

## Quality Checks

- **CRITICAL:** Region migration MUST obtain consent BEFORE any data movement crossing residency boundaries (GDPR Art 6 + Schrems II).

- **Consent freshness.** Consent older than 90 days at migration time is stale per common regulatory guidance; re-confirm before proceeding. Configure stale-threshold per regulatory regime.

- **Audit trail comprehensive.** consent_verified_for_migration event captured with full inputs; the auditor's primary artifact.

- **DNS TTL discipline rehearsed.** The 24h pre-cutover TTL reduction is rehearsed in `staging` dry-run; verify resolvers learn the new TTL within the prior TTL window.

- **TLS / cert validity at target before cutover.** Pre-cutover check: SSL handshake against target succeeds for tenant DNS records. Failure aborts cutover.

- **Replication-caught-up gate mandatory before DNS flip.** Flipping DNS before target is caught-up exposes target to read traffic on stale or missing data; customer-visible 404s + error rates spike.

- **Dual-write conflict resolution rule documented.** The chosen pattern (source-wins, target-wins, vector-clock) is recorded in the runbook + the migration team's runbook; ambiguity at incident time costs hours.

- **Cross-DC latency observed.** p99 latency to target region observed pre-cutover; if degraded vs. source, customer-experience degradation may abort cutover.

- **Rollback DNS revert TTL-aware.** Rollback flips DNS back; TTL discipline reapplies (60s during revert window; 3600s after stability).

- **Drift reconciliation post-rollback.** Writes that landed at target during cutover-before-rollback must be reconciled with source; unreconciled drift causes conflicts in future migration attempts.

- **Cohort first-canary mandatory.** Per `migration-cohort-selection.md` CRITICAL, region-axis cohorts use risk_stratified by default + first cohort is a 1-tenant canary.

- **HSTS-preload preserved.** Tenant DNS records that are HSTS-preloaded require valid certs at target before cutover; otherwise tenants are locked out.

- **Consent withdrawal mid-migration.** If consent is withdrawn after migration starts but before completion, abort + rollback for that tenant.

- **Per-tenant residency tag captured.** Each tenant has a `residency_zone` tag (US/EU/APAC/...) that reflects their residency obligation. Mismatched tag vs. actual region triggers compliance alert.

- **TIA (Transfer Impact Assessment) on file for EU-US.** Schrems II requires TIA documentation; the migration runbook MUST cite the TIA reference for any EU-US transfer.

---

## Web Research Queries

Refresh empirical inputs annually. Replace `{date}` with current year.

- `region migration SaaS post-incident {date}` — published incidents + root causes.
- `GDPR data transfer Schrems II {date}` — current regulatory state on EEA transfers.
- `Standard Contractual Clauses 2021 {date}` — updated SCC text + interpretive guidance.
- `DNS cutover blue green production {date}` — practitioner patterns + TTL recommendations.
- `dual-write replication conflict resolution {date}` — patterns + database-specific implementations.
- `cross-region replication lag postgres mysql {date}` — replication-lag observability + alerting.
- `Aurora Global Database failover {date}` (or `RDS cross-region replica`) — AWS-specific cross-region patterns.
- `Schrems II Transfer Impact Assessment {date}` — TIA templates + regulatory guidance.
- `HSTS preload cross-region migration {date}` — preserving HSTS during region cutover.
- `data residency disclosure customer trust {date}` — customer-trust + contractual implications.

---

## Cross-references

**Companion fragments:**
- [[migration-cohort-selection]] — cohort scoping for region migration; risk_stratified canary first
- [[migration-rollback-and-abort]] — rollback semantics; DNS revert + drift reconciliation lives within rollback framework
- [[zero-downtime-migrations]] — zero-downtime patterns; dual-write pattern choice depends on zero_downtime_required
- [[tenant-tier-upgrade-mechanics]] — sibling axis; tier-upgrade that triggers cell-relocation co-activates region-axis
- [[cell-based-architecture]] — cell-based + region-axis is the most natural fit; cells map directly to regions
- [[anti-corruption-layer]] — cross-region API surface boundaries (during cutover, target region speaks "current state" while source still serves "post-flip writes" temporarily)

**Glossary:**
- `data-residency` (P3.2 glossary; implied; defined in this fragment's residency-zone semantics)
- `dns-cutover` (introduced here)
- `dual-write` (introduced here)

**Quality gate:**
- `QG-D1` v0.1.0 — primary consumer; `migration-runbook.json#per_axis.region` validation sources from this fragment
- `QG-M2` v1.1.0 — mirror consumer (H4 partial proxy)

**Anti-pattern:**
- (no dedicated anti-pattern in P3.2; the consent-after-move pattern is treated as regulatory-territory + covered via runbook validation)
- [[tier-upgrade-without-billing-prorate]] — sibling-axis anti-pattern; both axes share regulatory-exposure family

**Schemas:**
- `migration-runbook.json` schema (spec §3.5) — `per_axis.region` populates from this fragment's enumeration
- `deployment-topology.json` (P3.1) — region list + residency zones + cell topology
- `tenancy-decision.json` (P3.1) — tenancy_model + hybrid_resolution informs per-tenant region-migration mechanism

**Downstream consumers:**
- `bmad-bam-design-tenant-migration-tooling` step-02 — loads region-axis playbook templates from this fragment
- `bmad-bam-design-tenant-migration-tooling` step-04 — locks region-axis recommendation; DNS + dual-write + cross-DC blue-green choices grounded here

**Upstream specs:**
- `docs/superpowers/specs/2026-05-17-p3-2-lifecycle-design.md` §2.4 (skill purpose), §3.5 (migration-runbook schema), §5.1.1 (fragment registration)
