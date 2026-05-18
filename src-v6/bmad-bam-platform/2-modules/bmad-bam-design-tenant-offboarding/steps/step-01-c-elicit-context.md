---
step_id: 01-c-elicit-context
auto_runnable: false
gate: human-approval
inputs: []
outputs: [offboarding-context.json]
---

# Step 01 — Elicit context

## Purpose

Read 2 required inputs (tier-model + tenancy-decision) + 2 soft inputs (finops-baseline + onboarding-flow); honor `--regulatory-profile` flag; elicit legal holds + cross-module handoffs from the user; confirm extracted context.

## Actions

1. **Resolve `--regulatory-profile` flag.** Default `gdpr_baseline` when absent. Enum check: `{gdpr_baseline, hipaa, sox_or_pci, none}` — exit 64 with diagnostic listing valid values on unknown.

2. **Read tier-model.json** with tool-aware-path-fallback:
   - Try `{project-root}/docs/architecture/tier-model.json` then `{project-root}/_bmad/bam/evidence/QG-F1/tier-model.json`
   - On absent: emit diagnostic + exit 64 (`Run bmad-bam-design-tenant-tier-model before this skill`)
   - On parse failure: exit 65
   - On empty: exit 66
   - Validate schema_version (warn if missing; assume "1.0"); apply auto-fill per Section 1.4 spec rules
   - schema 1.0 + default tier_id → auto-fill `retention_window_days_hint` from canonical preset (free: 7, starter: 30, pro: 30, business: 90, enterprise: 365) — MUST match `bmad-bam-design-tenant-tier-model/steps/step-05-c-write-design.md` defaults table per spec §3.1 (B1 fix; values were drift-bug starter:14/business:30/enterprise:90 pre-polish)
   - schema 1.0 + custom tier_id → exit 70 (must re-run tier-model to schema 1.1 with explicit hint)
   - schema 1.1 → trust explicit `retention_window_days_hint` field

3. **Read tenancy-decision.json** with same fallback pattern.

4. **Read finops-baseline.json** (soft); on absent → warn + skip "billing must close" handoff hint use; flag in step-07 report.

5. **Read onboarding-flow.json** (soft); on absent → warn + use degraded-mode tear-down generation (emit generic tear-down hooks; omit `onboarding_hooks_reversed` block in step-05 output).
   - When present, extract `flows[*].tier_id`, `flows[*].provisioning_hooks[]`, `flows[*].isolation_verification_step`.

6. **Hybrid resolution:** if `tenancy-decision.json#tenancy_model == "hybrid"`, read `hybrid_resolution` map. Each tier_id MUST be present (validated against tier-model tier_ids). step-02 will emit per-tier mechanism-aware `tear_down_hooks[]`.

7. **Elicit legal-holds (zero-or-more):** Prompt user — "Any legal holds active for tenants under this offboarding policy? (litigation, tax audit, security incident, subpoena)". Capture per-hold: `scope` (`all_tenants` | `tier:<id>` | `tenant:<id>`), `reason`, `effective_until` (RFC 3339 or `indefinite`), `released_by` (role).

8. **Elicit cross-module handoffs (zero-or-more):** Prompt user — "Which modules need to be notified before tenant deletion proceeds? (billing close, AI memory purge, observability scrubs, CRM close)". Default suggestions when `finops-baseline.json` present: billing close (`ordering: 1`). Capture per-handoff: `module`, `action`, `blocking` (bool), `ordering` (int ≥ 1).

9. **Confirm with user:** present extracted context (regulatory_profile, tier count, isolation_model, soft-input availability, elicited legal-holds count, elicited handoffs count). Pause for human-approval.

## Output

Write cache to `_bmad/bam/cache/bmad-bam-design-tenant-offboarding/{date}/offboarding-context.json`:

```json
{
  "regulatory_profile": "gdpr_baseline",
  "tier_ids": ["free", "starter", "pro", "business", "enterprise"],
  "tier_retention_hints": {"free": 7, "starter": 14, "pro": 30, "business": 30, "enterprise": 90},
  "tier_model_schema_version": "1.0",
  "tenancy_model": "row-level-security",
  "hybrid_resolution": null,
  "finops_baseline_present": true,
  "onboarding_flow_present": true,
  "onboarding_provisioning_hooks_by_tier": {"free": ["db_create_row", "apply_rls_policy"], "...": "..."},
  "legal_holds": [],
  "cross_module_handoffs": [],
  "user_confirmed": true
}
```

## Gate

Human approval — user confirms the elicited context (regulatory_profile, legal-holds, handoffs) before step-02 loads deletion modes.

## Next step

`step-02-c-load-options.md`
