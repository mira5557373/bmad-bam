---
step_id: 05-c-write-design
auto_runnable: true
gate: machine-checkable
inputs: [offboarding-context.json, offboarding-options.json, decision-matrix.json, recommendation.json]
outputs: [offboarding-policy.md, offboarding-policy.json]
template_ref: offboarding-policy.md.template
---

# Step 05 — Write the design

## Purpose

Emit `offboarding-policy.md` (human narrative) + `offboarding-policy.json` (machine contract per spec §3.3) to 2 locations (docs + QG-M2/).

## Actions

1. Read 4 cache files.

2. Read template at `../templates/offboarding-policy.md.template`.

3. Populate markdown narrative + write to `{project-root}/docs/architecture/offboarding-policy.md` (ensure parent dir via `mkdir -p`).

4. Build the JSON object per spec §3.3 schema:

```json
{
  "schema_version": "1.0",
  "decided_at": "<ISO-8601 UTC: YYYY-MM-DDTHH:MM:SSZ>",
  "regulatory_profile": "<gdpr_baseline|hipaa|sox_or_pci|none>",
  "data_export_required": true,
  "subject_erasure_fast_path": true,
  "per_tier": [
    {
      "policy_id": "<tier_id>:<deletion_mode>",
      "tier_id": "<id>",
      "deletion_mode": "<hard_delete|soft_delete|anonymize>",
      "retention_window_days": <int 0..36500>,
      "retention_window_source": "<tier_hint|overridden|regulatory_floor|legal_hold>",
      "post_retention_action": "<hard_delete|anonymize|noop>"
    }
  ],
  "legal_holds": [
    { "scope": "<all_tenants|tier:<id>|tenant:<id>>", "reason": "<...>", "effective_until": "<RFC 3339 or 'indefinite'>", "released_by": "<role>" }
  ],
  "tear_down_hooks": [
    { "id": "<unique-id>", "module": "<lowercase pattern>", "blocking": <bool>, "deletion_modes": [<subset of {hard_delete, soft_delete, anonymize}>] }
  ],
  "cross_module_handoffs": [
    { "module": "<...>", "action": "<...>", "blocking": <bool>, "ordering": <int>=1; unique+dense> }
  ],
  "onboarding_hooks_reversed": {
    "source_ref": "_bmad/bam/evidence/QG-M2/onboarding-flow.json",
    "reverse_map": [
      { "provisioning_hook_id": "<from upstream>", "tear_down_hook_id": "<from local tear_down_hooks>" }
    ]
  }
}
```

5. **Write JSON to BOTH locations:**
   - `{project-root}/docs/architecture/offboarding-policy.json` (mkdir -p) — for downstream skill discovery via tool-aware-path-fallback
   - `{project-root}/_bmad/bam/evidence/QG-M2/offboarding-policy.json` (mkdir -p) — canonical evidence location

   Actually, JSON canonical lives only at `_bmad/bam/evidence/QG-M2/`; the docs/architecture/ location holds only the `.md` narrative.

   Therefore: **2-location write** =
   - `.md` → `docs/architecture/offboarding-policy.md`
   - `.json` → `_bmad/bam/evidence/QG-M2/offboarding-policy.json`

6. **Soft-input degraded mode:** if `offboarding-context.json#onboarding_flow_present == false`, OMIT the `onboarding_hooks_reversed` block entirely from the JSON output (do not emit empty object; key is absent).

## Gate

Machine-checkable:
- Both files exist at expected paths
- JSON parses + has `schema_version`, `data_export_required == true`, `subject_erasure_fast_path == true`
- Every `per_tier[*].policy_id` matches `^[a-z][a-z0-9_-]*:(hard_delete|soft_delete|anonymize)$`
- `tear_down_hooks[*].id` globally unique
- `cross_module_handoffs[*].ordering` unique-and-dense (set == {1..N})

## Next step

`step-06-c-record-adr.md`
