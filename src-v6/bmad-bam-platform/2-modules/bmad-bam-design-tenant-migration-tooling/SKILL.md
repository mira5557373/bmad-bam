---
name: bmad-bam-design-tenant-migration-tooling
description: "Design tenant migration playbooks across two axes — tier upgrades (cohort, billing-prorate, feature-flip, schema/data migration) and region migrations (DNS cutover, dual-write, cross-DC blue-green, residency-aware cohorts). Single skill, axis selected via --migration-axis flag (tier|region|both; default both). Outputs migration-runbook.md + .json with 3-location write (docs + QG-D1 primary + QG-M2 mirror as H4 partial proxy) + QG-D1-migration-evidence.md + QG-M2-migration-evidence-mirror.md. Invoke via /bmad-bam-design-tenant-migration-tooling."
---

# bmad-bam-design-tenant-migration-tooling

## Purpose

Tenant migrations come in two structurally-different flavors that nonetheless share the same runbook spine — cohort + dry-run + rollback + abort + observability. **Tier upgrades** move a tenant within the same region but across a pricing-and-feature boundary (free → pro, business → enterprise); the hard parts are billing proration at the upgrade timestamp, feature-flag flip ordering, and schema/data migrations when higher tiers ship additional tables or per-tenant resources. **Region migrations** move a tenant's data across data-center / cloud-region boundaries; the hard parts are residency consent (GDPR / Schrems II — consent BEFORE any boundary crossing), dual-write strategies during the cutover window, DNS / routing cutover, and cross-DC blue-green deployment of the tenant's runtime.

This skill is a single workflow with a `--migration-axis` flag. The flag accepts `tier`, `region`, or `both` (default). `both` resolves at step-01 to `["tier", "region"]` and the workflow produces per-axis playbooks in one runbook. This consolidation reflects empirical reality: most production multi-tenant platforms eventually need both axes, the artifacts share evidence consumers (QG-D1 disaster recovery + QG-M2 H4 partial proxy), and splitting into two skills would duplicate ~70% of the surface (cohort + rollback + abort + observability are nearly identical).

The runbook is consumed primarily by `QG-D1 — Disaster Recovery (partial; v0.1.0)`. Until P10 ships full DR with RPO/RTO drills, the migration-runbook acts as the partial proxy for QG-M2 H4 (migration-safety review) — the runbook's mirror copy to `_bmad/bam/evidence/QG-M2/` exists for exactly this temporal-contract purpose. The QG-M2 mirror evidence narrative cross-links back to the QG-D1 primary; both evidence files exist, the primary holds detail, the mirror cites the primary.

## When to invoke

- After tier-model is decided (required; tier-model.json provides tier list + `upgrade_mode` per tier)
- After deployment-topology is decided (required; provides region list + cell topology + DC count)
- After tenancy is decided (required; tenancy-decision.json provides isolation_model + hybrid_resolution for per-tier mechanism awareness during cohort migrations)
- Soft-after onboarding-flow (optional; onboarding-flow.json provides provisioning_hook IDs that the migration runbook re-invokes at the target region for re-provisioning)
- Soft-after offboarding-policy (optional; offboarding-policy.json provides tear_down_hook IDs that the migration runbook invokes at the source region post-cutover)
- Before first tier upgrade for a real tenant (must-have; cohort + billing + rollback rehearsed in dry-run before live tenants move)
- Before first cross-region tenant move (must-have; residency consent + DNS cutover + dual-write contract locked in)
- Quarterly cadence (Validate mode; runbook drift surfaces vs. shipped infra)

## Inputs

- **Required:** `tier-model.json` (schema 1.0 or 1.1) — tier list + `upgrade_mode` per tier; auto-fill semantics applied when 1.0
- **Required:** `deployment-topology.json` — region list + cell topology + per-region DC count + residency tagging
- **Required:** `tenancy-decision.json` — `isolation_model` + (when hybrid) `hybrid_resolution` per-tier mechanism map
- **Soft:** `onboarding-flow.json` — provisioning_hook IDs that the runbook re-invokes at the target region; degraded gracefully — generic provisioning at target when absent
- **Soft:** `offboarding-policy.json` — tear_down_hook IDs that the runbook invokes at the source region post-cutover; degraded gracefully — generic tear-down at source when absent

When a soft input is **present but malformed** (parse-failed or known-required field missing), step-01 records `references_degraded: true` in cache; step-05 emits the flag in the output JSON; step-07-v re-validates the flag matches input availability state.

When a soft input is **absent entirely**, step-05 OMITS the entire `references` block from output JSON (no empty object; key absent); `references_degraded` remains `false`.

## Output

- `docs/architecture/migration-runbook.md` — human-readable narrative
- `_bmad/bam/evidence/QG-D1/migration-runbook.json` — machine contract (primary; per spec §3.5)
- `_bmad/bam/evidence/QG-M2/migration-runbook.json` — same JSON, byte-identical mirror (H4 partial-proxy temporal contract until P10 ships full DR)
- `_bmad/bam/evidence/QG-D1/QG-D1-migration-evidence.md` — primary evidence narrative
- `_bmad/bam/evidence/QG-M2/QG-M2-migration-evidence-mirror.md` — mirror evidence narrative; cross-links to QG-D1 primary

## Gate

QG-D1 (primary; v0.1.0 partial) + QG-M2 (mirror for H4 partial proxy; v1.1.0). The migration-runbook.json drives QG-D1's C0-C5 (file presence; schema validity; per-axis rollback_gate + abort_criteria; zero_downtime semantics; references consistency). It also acts as the temporary proxy for QG-M2 H4 (migration-safety review) until P10 ops ships full DR runbooks.

## Flags

- `--migration-axis {tier | region | both}` (default: `both`).
  - `tier`: design only tier-upgrade playbook
  - `region`: design only region-migration playbook
  - `both`: design both (resolved at step-01 to `migration_axes: ["tier", "region"]`)
