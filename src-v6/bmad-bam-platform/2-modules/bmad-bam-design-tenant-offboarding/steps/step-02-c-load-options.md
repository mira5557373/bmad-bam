---
step_id: 02-c-load-options
auto_runnable: true
gate: machine-checkable
inputs: [offboarding-context.json]
outputs: [offboarding-options.json]
---

# Step 02 — Load deletion-mode templates

## Purpose

Load 3 deletion modes and pre-fill per-tier assignment from the `--regulatory-profile` preset table.

## Deletion modes

| deletion_mode | Semantics | post_retention_action default |
|---|---|---|
| `hard_delete` | Row + dependent storage permanently removed at end of retention window; no recovery path | `noop` (already deleted) |
| `soft_delete` | Logical tombstone (`deleted_at` set; rows hidden from RLS query path); reversible until `post_retention_action` fires | `hard_delete` |
| `anonymize` | PII columns replaced with deterministic-but-non-reversible hash; non-PII (aggregates, audit) retained; irreversible | `noop` |

## Per-tier pre-fill by regulatory profile

| profile          | free        | starter     | pro         | business    | enterprise  |
|---               |---          |---          |---          |---          |---          |
| `gdpr_baseline`  | soft_delete | soft_delete | soft_delete | soft_delete | soft_delete |
| `hipaa`          | soft_delete | soft_delete | soft_delete | anonymize   | anonymize   |
| `sox_or_pci`     | soft_delete | soft_delete | soft_delete | anonymize   | anonymize   |
| `none`           | hard_delete | hard_delete | hard_delete | hard_delete | hard_delete |

For **custom tier_ids**: no defaults; step-04 MUST hard-elicit per tier (no defaults).

## Retention-window pre-fill

Initial source ranking per tier (`retention_window_source` enum):

1. **`tier_hint`** — auto-fill from `tier_retention_hints[tier_id]` (from tier-model 1.1 or auto-filled 1.0).
2. **`overridden`** — user override in step-04 (when user changes default).
3. **`regulatory_floor`** — auto-bump in step-04 if `tier_hint < regulatory_floor[profile]` (HIPAA ≥ 2190d, SOX_or_PCI ≥ 2555d).
4. **`legal_hold`** — set in step-04 when a `legal_holds[]` entry has matching scope; effective retention is infinite until release.

## Tear-down hook templates (hybrid handling per I4)

By tenancy mechanism:

- **row-level-security:** `db_row_soft_delete` (deletion_modes: [soft_delete]) → `db_row_hard_delete` (deletion_modes: [hard_delete]) OR `db_row_anonymize` (deletion_modes: [anonymize]); `rls_policy_no_op` (always non-blocking; policy stays in place)
- **schema-per-tenant:** `schema_soft_archive` (deletion_modes: [soft_delete]) → `schema_drop_cascade` (deletion_modes: [hard_delete]) OR `schema_anonymize_pii_columns` (deletion_modes: [anonymize])
- **cell-based:** `cell_drain_traffic` (always blocking) → `cell_data_export_to_archive` (deletion_modes: [soft_delete]) → `cell_destroy` (deletion_modes: [hard_delete]) OR `cell_anonymize_then_retain` (deletion_modes: [anonymize])

Cross-module tear-down (tenancy-model-agnostic):

- **billing module** — `stripe_customer_close` (blocking: true; deletion_modes: all three)
- **AI runtime module** — `nova_memory_purge` (blocking: true on `hard_delete`/`anonymize`; non-blocking on `soft_delete` since memory can persist with tombstone)
- **observability module** — `obs_logs_scrub_pii` (blocking: only on `anonymize`/`hard_delete`)
- **CRM module** — `crm_record_close` (non-blocking; best-effort)

## Onboarding-flow reverse mapping (degraded mode when absent)

If `onboarding_flow_present == true`:
- For each `flows[*].provisioning_hooks[*].id`, propose a reverse `tear_down_hook_id` from the template catalog above. Step-04 finalizes the mapping.
- E.g., `db_create_row` → `db_row_hard_delete` (when deletion_mode == hard_delete) OR `db_row_soft_delete` (when soft_delete) OR `db_row_anonymize` (when anonymize).
- E.g., `cell_allocate` → `cell_destroy` (hard) / `cell_data_export_to_archive` (soft) / `cell_anonymize_then_retain` (anonymize).

If `onboarding_flow_present == false`: step-05 OMITS the `onboarding_hooks_reversed` block from output JSON (degraded mode flagged in step-07 report).

## Output

`_bmad/bam/cache/bmad-bam-design-tenant-offboarding/{date}/offboarding-options.json`:
```json
{
  "deletion_modes": ["hard_delete", "soft_delete", "anonymize"],
  "regulatory_profile": "gdpr_baseline",
  "regulatory_retention_floor_days": 0,
  "per_tier_prefill": {
    "free": {"deletion_mode": "soft_delete", "retention_window_days": 7, "retention_window_source": "tier_hint", "post_retention_action": "hard_delete"},
    "starter": {"deletion_mode": "soft_delete", "retention_window_days": 30, "retention_window_source": "tier_hint", "post_retention_action": "hard_delete"}
  },
  "tear_down_hook_templates": {...},
  "hybrid_aware_hooks": {...} | null,
  "reverse_map_proposal": [...] | null
}
```

## Gate

Machine-checkable — schema valid, all tier_ids covered, regulatory_retention_floor_days resolved, tear-down templates emitted for the chosen tenancy_model.

## Next step

`step-03-c-decision-matrix.md`
