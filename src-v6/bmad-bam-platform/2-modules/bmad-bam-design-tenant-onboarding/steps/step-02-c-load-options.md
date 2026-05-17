---
step_id: 02-c-load-options
auto_runnable: true
gate: machine-checkable
inputs: [onboarding-context.json]
outputs: [onboarding-options.json]
---

# Step 02 — Load flow templates

## Purpose

Load 3 flow types and pre-fill per-tier assignment from upgrade_mode hints.

## Flow templates

| flow_type | When to use | provisioning_mode default |
|---|---|---|
| `self_serve` | Friction-free signup; Stripe Checkout; auto-provisioning | `auto` |
| `assisted_signup` | Self-service signup + AE follow-up within 24h | `scripted` |
| `sales_led` | AE gates the signup; procurement, DPA, security review | `manual` |

## Per-tier pre-fill (5-default)

| tier_id | upgrade_mode | flow_type pre-fill | live_traffic |
|---|---|---|---|
| free | self_service | self_serve | true |
| starter | self_service | self_serve | true |
| pro | self_service | self_serve | true |
| business | sales_assisted | assisted_signup | true |
| enterprise | sales_assisted | sales_led | true |

For **custom tier_ids**: no defaults; step-04 must elicit per tier.

## Hybrid handling (per I4)

If `hybrid_resolution` present, per tier identify the mechanism (RLS / schema / cell) and use mechanism-specific provisioning_hook templates:
- RLS: `db_create_row`, `apply_rls_policy`
- schema-per-tenant: `schema_create`, `migrations_apply_per_schema`
- cell-based: `cell_allocate`, `dns_assign`, `cert_issue`, `intra_cell_network_policy`

## Output

`_bmad/bam/cache/bmad-bam-design-tenant-onboarding/{date}/onboarding-options.json`:
```json
{
  "flow_templates": [...],
  "per_tier_prefill": {...},
  "hybrid_aware_hooks": {...} | null
}
```

## Gate

Machine-checkable — schema valid, all tier_ids covered.

## Next step

`step-03-c-decision-matrix.md`
