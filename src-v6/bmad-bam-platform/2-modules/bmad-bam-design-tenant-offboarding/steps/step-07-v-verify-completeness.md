---
step_id: 07-v-verify-completeness
auto_runnable: true
gate: machine-checkable
inputs: [offboarding-policy.md, offboarding-policy.json, ADR]
outputs: [QG-M2-offboarding-evidence.md]
gate_id: QG-M2
---

# Step 07-v — Verify completeness + emit evidence narrative

## Purpose

Schema-validate JSON output + enforce mandatory invariants (Art 17 + Art 20 + retention-floor) + emit `QG-M2-offboarding-evidence.md` human evidence narrative.

## Actions (Python 3.11+ stdlib)

```python
import json
import re

j = json.load(open('{project-root}/_bmad/bam/evidence/QG-M2/offboarding-policy.json'))

# --- Schema version (E1: coerce non-string) ---
sv = j.get('schema_version')
if not isinstance(sv, str):
    print(f"WARN: schema_version was non-string ({type(sv).__name__}); coercing")
    sv = str(sv)
assert sv == "1.0", f"schema_version must be 1.0, got {sv!r}"

# --- decided_at RFC 3339 ---
assert re.match(r'^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$', j['decided_at']), "decided_at must match RFC 3339 UTC"

# --- regulatory_profile closed enum ---
PROFILES = {"gdpr_baseline", "hipaa", "sox_or_pci", "none"}
assert j['regulatory_profile'] in PROFILES, f"regulatory_profile must be in {PROFILES}"

# --- MANDATORY invariants (exit 70 if false) ---
assert j.get('data_export_required') is True, \
    "data_export_required MUST be true (GDPR Art 20 — export before deletion)"
assert j.get('subject_erasure_fast_path') is True, \
    "subject_erasure_fast_path MUST be true (GDPR Art 17 — erasure fast-path)"

# --- Regulatory retention floor ---
FLOORS = {"gdpr_baseline": 0, "hipaa": 2190, "sox_or_pci": 2555, "none": 0}
profile = j['regulatory_profile']
floor = FLOORS[profile]

# --- Per-tier policy validation ---
DELETION_MODES = {"hard_delete", "soft_delete", "anonymize"}
RETENTION_SOURCES = {"tier_hint", "overridden", "regulatory_floor", "legal_hold"}
POST_ACTIONS = {"hard_delete", "anonymize", "noop"}

seen_policy_ids = set()
for p in j['per_tier']:
    tid = p['tier_id']
    mode = p['deletion_mode']
    assert mode in DELETION_MODES, f"tier {tid}: deletion_mode {mode!r} invalid"
    # policy_id format + uniqueness
    pid = p['policy_id']
    assert re.match(r'^[a-z][a-z0-9_-]*:(hard_delete|soft_delete|anonymize)$', pid), \
        f"policy_id {pid!r} must match <tier_id>:<deletion_mode>"
    assert pid not in seen_policy_ids, f"duplicate policy_id {pid!r}"
    seen_policy_ids.add(pid)
    # tier_id matches policy_id prefix
    assert pid.split(':')[0] == tid, f"policy_id {pid!r} tier prefix != tier_id {tid!r}"
    # retention_window_days bounds
    rwd = p['retention_window_days']
    assert isinstance(rwd, int) and 0 <= rwd <= 36500, f"tier {tid}: retention_window_days out of range"
    # retention_window_source enum
    src = p['retention_window_source']
    assert src in RETENTION_SOURCES, f"tier {tid}: retention_window_source {src!r} invalid"
    # post_retention_action enum
    pra = p['post_retention_action']
    assert pra in POST_ACTIONS, f"tier {tid}: post_retention_action {pra!r} invalid"
    # Retention floor enforcement (legal_hold bypasses the floor check; infinite-until-release)
    if src != "legal_hold":
        assert rwd >= floor, \
            f"tier {tid}: retention_window_days {rwd} < regulatory_floor {floor} for profile {profile!r}"
    # If retention_window_source == legal_hold, MUST have matching entry in legal_holds[]
    if src == "legal_hold":
        matched = any(
            h.get('scope') == 'all_tenants' or
            h.get('scope') == f'tier:{tid}'
            for h in j.get('legal_holds', [])
        )
        assert matched, f"tier {tid}: retention_window_source=legal_hold but no matching legal_holds[] entry"

# --- tear_down_hooks global uniqueness ---
seen_hook_ids = set()
for h in j.get('tear_down_hooks', []):
    hid = h['id']
    assert hid not in seen_hook_ids, f"duplicate tear_down_hook id {hid!r}"
    seen_hook_ids.add(hid)
    assert re.match(r'^[a-z][a-z0-9_]*$', h['module']), f"tear_down_hook module {h['module']!r} invalid"
    for dm in h.get('deletion_modes', []):
        assert dm in DELETION_MODES, f"tear_down_hook {hid}: deletion_mode {dm!r} invalid"

# --- cross_module_handoffs ordering unique-and-dense (1..N) ---
orderings = [h['ordering'] for h in j.get('cross_module_handoffs', [])]
if orderings:
    assert sorted(orderings) == list(range(1, len(orderings) + 1)), \
        f"cross_module_handoffs.ordering must be unique-and-dense 1..N; got {sorted(orderings)}"

# --- onboarding_hooks_reversed cross-refs (when present) ---
if 'onboarding_hooks_reversed' in j:
    rev = j['onboarding_hooks_reversed']
    rmap = rev.get('reverse_map', [])
    # Each reverse_map[*].tear_down_hook_id must exist in local tear_down_hooks
    for r in rmap:
        assert r['tear_down_hook_id'] in seen_hook_ids, \
            f"reverse_map: tear_down_hook_id {r['tear_down_hook_id']!r} not in local tear_down_hooks[]"
    # If upstream onboarding-flow.json is reachable, cross-ref provisioning_hook_ids
    import os
    src_ref = rev.get('source_ref', '')
    if src_ref and os.path.exists(src_ref):
        upstream = json.load(open(src_ref))
        upstream_hook_ids = {h['id'] for f in upstream.get('flows', []) for h in f.get('provisioning_hooks', [])}
        for r in rmap:
            assert r['provisioning_hook_id'] in upstream_hook_ids, \
                f"reverse_map: provisioning_hook_id {r['provisioning_hook_id']!r} not in upstream onboarding-flow"

# --- WARN states (not exit 70) ---
if not j.get('cross_module_handoffs'):
    print("WARN: cross_module_handoffs is empty; offboarding will run without cross-module coordination")
if not j.get('tear_down_hooks'):
    print("WARN: tear_down_hooks is empty; offboarding has no mechanism-aware tear-down")

print(f"VALID: offboarding-policy.json schema 1.0 (profile: {profile}, tiers: {len(j['per_tier'])}, hooks: {len(seen_hook_ids)})")
```

Emit `_bmad/bam/evidence/QG-M2/QG-M2-offboarding-evidence.md` (human narrative) with:
- Decision summary (regulatory_profile + tier count + handoff count)
- Per-tier policy table (tier / mode / retention / source / post-action)
- Tear-down hooks catalog
- Cross-module handoffs (ordered)
- Legal-holds (if any)
- Onboarding reverse-map (when present) — or degraded-mode note if absent
- Schema validation summary (mandatory-invariant checks all passed; regulatory-floor enforcement applied)
- Cross-ref to QG-M2 H2 + waiver path

Then verify the project-level sidecar ADR exists (C2-I1 fix — mirrors P3.1 tier-model pattern):

```bash
ADR_DIR="{project-root}/_bmad/_memory/atlas/architecture-decisions"
ADR_MATCH=$(ls -1 "$ADR_DIR" 2>/dev/null | grep -E '^[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{3}-tenant-offboarding-decision\.md$' | tail -1)
[ -n "$ADR_MATCH" ] && echo "[PASS] ADR present: $ADR_MATCH" || { echo "[FAIL] tenant-offboarding ADR missing — re-run step-06"; exit 1; }
```

## Gate

Machine-checkable.

## On failure

Exit 70 with detailed diagnostic; user re-runs step-04 to fix.
