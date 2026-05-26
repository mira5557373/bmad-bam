---
step_id: 04-c-recommendation
auto_runnable: false
gate: human-approval
inputs: [decision-matrix.json, offboarding-context.json, offboarding-options.json]
outputs: [recommendation.json]
---

# Step 04 — Recommendation

## Purpose

Lock final per-tier deletion-mode + retention window + erasure fast-path + tear-down hooks + cross-module handoffs + legal-holds + onboarding-reverse map.

## Actions

1. For each tier from decision-matrix, finalize:
   - `policy_id` (formed as `<tier_id>:<deletion_mode>`; MUST be unique within file)
   - `tier_id`
   - `deletion_mode` (locked from step-03; closed enum `{hard_delete, soft_delete, anonymize}`)
   - `retention_window_days` (int in `[0, 36500]`)
   - `retention_window_source` (closed enum `{tier_hint, overridden, regulatory_floor, legal_hold}`)
   - `post_retention_action` (closed enum `{hard_delete, anonymize, noop}`)

2. **Apply regulatory-floor bumping (per profile):**
   - `gdpr_baseline`: no floor (≥ 0)
   - `hipaa`: bump retention_window_days to max(current, 2190) and set `retention_window_source: regulatory_floor` when bumped
   - `sox_or_pci`: bump retention_window_days to max(current, 2555) and set `retention_window_source: regulatory_floor` when bumped
   - `none`: no floor

3. **Apply legal_hold override:** if a `legal_holds[]` entry matches the tier (`scope == "all_tenants"` OR `scope == "tier:<id>"`), set `retention_window_source: legal_hold` and treat retention as infinite-until-release. Step-07-v will cross-check this state.

4. **Mandatory invariants (per spec §3.3):**
   - `data_export_required: true` (MANDATORY; GDPR Art 20 — exported BEFORE any deletion / anonymization)
   - `subject_erasure_fast_path: true` (MANDATORY; GDPR Art 17 — erasure-request honoring without waiting for natural retention expiry)

5. **Tear-down hooks (mechanism-aware):** for each tier's deletion_mode, select tear_down_hook templates from step-02 (per tenancy_model + hybrid_resolution if applicable). Verify global uniqueness of `tear_down_hooks[*].id` across the whole file.

6. **Cross-module handoffs:** Finalize ordering (int ≥ 1; unique AND dense — 1..N with no gaps). Confirm blocking flags.

7. **Onboarding reverse-map (when `onboarding_flow_present`):** For each `provisioning_hook_id` from upstream onboarding-flow, lock the reverse `tear_down_hook_id` mapping. Verify each `tear_down_hook_id` exists in local `tear_down_hooks[*].id`.

8. **Custom tier_ids:** Hard-elicit `deletion_mode` (no defaults). If absent → exit 70 with diagnostic.

## Output

`_bmad/bam/cache/.../{date}/recommendation.json` — full per-tier lockdown plus `tear_down_hooks[]`, `cross_module_handoffs[]`, `legal_holds[]`, `onboarding_hooks_reversed` (when applicable).

## Gate

Human approval — user signs off.

## Next step

`step-05-c-write-design.md`
