---
step_id: 07-v-verify-completeness
auto_runnable: true
gate: machine-checkable
inputs: [migration-runbook.md, migration-runbook.json, ADR]
outputs: [QG-D1-migration-evidence.md, QG-M2-migration-evidence-mirror.md]
gate_id: QG-D1
---

# Step 07-v — Verify completeness + emit evidence narratives

## Purpose

Schema-validate the migration-runbook.json output per spec §3.5 + enforce mandatory invariants:
- `migration_axes` non-empty + ⊆ `{"tier","region"}`
- `per_axis` keys exactly match `migration_axes`
- Each active axis has all 5 sub-fields (cohort_plan + dry_run_plan + rollback_gate + abort_criteria + observability_hooks)
- `zero_downtime_required: true` ⇒ no axis uses `rollback_method: cell_failback` (invariant 12)
- `cohorts: []` → ERROR
- `references_degraded` consistency with input availability
- QG-D1/ and QG-M2/ JSON files are byte-identical

Emit TWO evidence narratives:
- `_bmad/bam/evidence/QG-D1/QG-D1-migration-evidence.md` (primary; gate_id QG-D1)
- `_bmad/bam/evidence/QG-M2/QG-M2-migration-evidence-mirror.md` (mirror cross-link to QG-D1)

## Actions (Python 3.11+ stdlib)

```python
import json
import re
import os
import hashlib

primary_path = '{project-root}/_bmad/bam/evidence/QG-D1/migration-runbook.json'
mirror_path  = '{project-root}/_bmad/bam/evidence/QG-M2/migration-runbook.json'

j = json.load(open(primary_path))

# --- Schema version (E1: coerce non-string) ---
sv = j.get('schema_version')
if not isinstance(sv, str):
    print(f"WARN: schema_version was non-string ({type(sv).__name__}); coercing")
    sv = str(sv)
assert sv == "1.0", f"schema_version must be 1.0, got {sv!r}"

# --- decided_at RFC 3339 ---
assert re.match(r'^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$', j['decided_at']), \
    "decided_at must match RFC 3339 UTC"

# --- migration_axes: non-empty subset of {"tier","region"} ---
AXES_ALL = {"tier", "region"}
axes = j.get('migration_axes', [])
assert isinstance(axes, list), "migration_axes must be a list"
assert len(axes) > 0, "migration_axes: [] is ERROR per spec §3.5"
axes_set = set(axes)
assert axes_set.issubset(AXES_ALL), \
    f"migration_axes must be subset of {AXES_ALL}; got {axes_set}"
assert len(axes) == len(axes_set), \
    f"migration_axes contains duplicates; got {axes}"

# --- per_axis keys EXACTLY match migration_axes (order-insensitive) ---
per_axis = j.get('per_axis', {})
assert isinstance(per_axis, dict), "per_axis must be a dict"
per_axis_keys = set(per_axis.keys())
assert per_axis_keys == axes_set, \
    f"per_axis keys {per_axis_keys} != migration_axes {axes_set}"

# --- Closed enums ---
COHORT_METHODS = {"rollout_tier_hint_driven", "risk_stratified", "explicit"}
DRY_RUN_ENVS = {"staging", "canary_tenant", "shadow"}
CADENCES = {"each_cohort", "once_pre_rollout"}
ROLLBACK_METHODS = {"blue_green_flip", "canary_revert", "cell_failback", "dual_write_revert"}

# --- zero_downtime_required: boolean ---
zdr = j.get('zero_downtime_required')
assert isinstance(zdr, bool), f"zero_downtime_required must be boolean; got {type(zdr).__name__}"

# --- references_degraded: boolean (always present) ---
ref_deg = j.get('references_degraded')
assert isinstance(ref_deg, bool), f"references_degraded must be boolean; got {type(ref_deg).__name__}"

# --- Per-axis 5-sub-field validation ---
warns = []
for axis in axes:
    body = per_axis[axis]
    assert isinstance(body, dict), f"per_axis[{axis!r}] must be dict"

    # 5 required sub-fields
    REQUIRED_SUB = {"cohort_plan", "dry_run_plan", "rollback_gate", "abort_criteria", "observability_hooks"}
    missing = REQUIRED_SUB - set(body.keys())
    assert not missing, \
        f"per_axis[{axis!r}] missing sub-fields: {missing} (all 5 required per spec §3.5)"

    # cohort_plan
    cp = body['cohort_plan']
    csm = cp.get('cohort_selection_method')
    assert csm in COHORT_METHODS, \
        f"per_axis[{axis!r}].cohort_plan.cohort_selection_method {csm!r} not in {COHORT_METHODS}"
    cohorts = cp.get('cohorts', [])
    assert isinstance(cohorts, list), f"per_axis[{axis!r}].cohort_plan.cohorts must be list"
    assert len(cohorts) > 0, \
        f"per_axis[{axis!r}].cohort_plan.cohorts: [] is ERROR per spec §3.5"
    for i, c in enumerate(cohorts):
        assert 'name' in c, f"per_axis[{axis!r}].cohort_plan.cohorts[{i}] missing name"
        assert 'size_estimate' in c, f"per_axis[{axis!r}].cohort_plan.cohorts[{i}] missing size_estimate"
        assert isinstance(c['size_estimate'], int) and c['size_estimate'] >= 1, \
            f"per_axis[{axis!r}].cohort_plan.cohorts[{i}].size_estimate must be int ≥ 1"
        # tier-axis: billing_prorate boolean
        if axis == "tier":
            assert 'billing_prorate' in c, \
                f"per_axis['tier'].cohort_plan.cohorts[{i}] missing billing_prorate (per spec §3.5)"
            assert isinstance(c['billing_prorate'], bool), \
                f"per_axis['tier'].cohort_plan.cohorts[{i}].billing_prorate must be bool"
        # region-axis: residency_change boolean
        if axis == "region":
            assert 'residency_change' in c, \
                f"per_axis['region'].cohort_plan.cohorts[{i}] missing residency_change (per spec §3.5)"
            assert isinstance(c['residency_change'], bool), \
                f"per_axis['region'].cohort_plan.cohorts[{i}].residency_change must be bool"

    # risk_stratified: first cohort must be 1-tenant canary
    if csm == "risk_stratified":
        first_size = cohorts[0].get('size_estimate', 0)
        assert first_size == 1, \
            f"per_axis[{axis!r}].cohort_plan: risk_stratified MUST start with 1-tenant canary; got first cohort size_estimate={first_size}"

    # dry_run_plan
    drp = body['dry_run_plan']
    dre = drp.get('dry_run_environment')
    assert dre in DRY_RUN_ENVS, \
        f"per_axis[{axis!r}].dry_run_plan.dry_run_environment {dre!r} not in {DRY_RUN_ENVS}"
    cad = drp.get('cadence')
    assert cad in CADENCES, \
        f"per_axis[{axis!r}].dry_run_plan.cadence {cad!r} not in {CADENCES}"

    # rollback_gate
    rg = body['rollback_gate']
    rt = rg.get('rollback_trigger', [])
    assert isinstance(rt, list) and len(rt) > 0, \
        f"per_axis[{axis!r}].rollback_gate.rollback_trigger must be non-empty list"
    rm = rg.get('rollback_method')
    assert rm in ROLLBACK_METHODS, \
        f"per_axis[{axis!r}].rollback_gate.rollback_method {rm!r} not in {ROLLBACK_METHODS}"

    # INVARIANT 12: zero_downtime_required: true ⇒ no axis uses cell_failback
    if zdr is True and rm == "cell_failback":
        raise AssertionError(
            f"INVARIANT 12 violation: per_axis[{axis!r}].rollback_gate.rollback_method = 'cell_failback' "
            f"BUT zero_downtime_required: true (cell_failback requires brief downtime)"
        )

    # abort_criteria
    ac = body['abort_criteria']
    assert isinstance(ac, list), f"per_axis[{axis!r}].abort_criteria must be list"
    if len(ac) == 0:
        warns.append(f"per_axis[{axis!r}].abort_criteria is empty (WARN)")

    # observability_hooks
    oh = body['observability_hooks']
    assert isinstance(oh, list), f"per_axis[{axis!r}].observability_hooks must be list"
    if len(oh) == 0:
        warns.append(f"per_axis[{axis!r}].observability_hooks is empty (WARN)")

# --- references block + references_degraded consistency ---
# Read soft-input state from upstream (best-effort)
def soft_input_state(paths):
    """Returns 'present' | 'absent' | 'malformed' based on parse-ability."""
    for p in paths:
        if os.path.exists(p):
            try:
                json.load(open(p))
                return ('present', p)
            except json.JSONDecodeError:
                return ('malformed', p)
    return ('absent', None)

onb_state, _ = soft_input_state([
    '{project-root}/_bmad/bam/evidence/QG-M2/onboarding-flow.json',
    '{project-root}/docs/architecture/onboarding-flow.json',
])
off_state, _ = soft_input_state([
    '{project-root}/_bmad/bam/evidence/QG-M2/offboarding-policy.json',
    '{project-root}/docs/architecture/offboarding-policy.json',
])

# references_degraded must be true iff at least one soft input is malformed
expected_degraded = (onb_state == 'malformed' or off_state == 'malformed')
if ref_deg != expected_degraded:
    raise AssertionError(
        f"references_degraded={ref_deg} but actual soft-input state is "
        f"onboarding={onb_state}, offboarding={off_state} (expected_degraded={expected_degraded})"
    )

# references block presence consistency
refs = j.get('references')
if onb_state == 'absent' and off_state == 'absent':
    assert refs is None or refs == {}, \
        f"both soft inputs absent ⇒ references block MUST be absent or empty; got {refs!r}"
else:
    # At least one soft input present (or malformed-but-was-present); references block should exist
    # (Malformed input still records that it was attempted — but downstream IDs cannot be extracted.)
    if onb_state == 'present':
        assert refs and 'onboarding_hook_ids' in refs, \
            "onboarding-flow.json present ⇒ references.onboarding_hook_ids must be populated"
        assert isinstance(refs['onboarding_hook_ids'], list), \
            "references.onboarding_hook_ids must be list"
    if off_state == 'present':
        assert refs and 'offboarding_policy_ids' in refs, \
            "offboarding-policy.json present ⇒ references.offboarding_policy_ids must be populated"
        assert isinstance(refs['offboarding_policy_ids'], list), \
            "references.offboarding_policy_ids must be list"

# --- QG-D1 and QG-M2 JSON files MUST be byte-identical (mirror semantics) ---
assert os.path.exists(primary_path), f"primary JSON missing: {primary_path}"
assert os.path.exists(mirror_path), f"mirror JSON missing: {mirror_path}"
h_primary = hashlib.sha256(open(primary_path, 'rb').read()).hexdigest()
h_mirror = hashlib.sha256(open(mirror_path, 'rb').read()).hexdigest()
assert h_primary == h_mirror, \
    f"QG-D1 and QG-M2 JSON files are NOT byte-identical (sha256: {h_primary[:12]} vs {h_mirror[:12]})"

# --- Emit WARNs (not exit 70) ---
for w in warns:
    print(f"WARN: {w}")

print(f"VALID: migration-runbook.json schema 1.0 (axes: {axes}, zero_downtime: {zdr}, "
      f"references_degraded: {ref_deg}, mirror sha256-match: yes)")
```

## Evidence narrative emission

### Primary: `_bmad/bam/evidence/QG-D1/QG-D1-migration-evidence.md`

Frontmatter (C2-I3 — mirrors P3.1 tier-model evidence shape):

```yaml
---
gate_id: QG-D1
verified_at: <ISO 8601 UTC>
verified_by: atlas
auto_checkable_pct: 100
human_review_pct: 0
result: pass | pass-partial | fail
---
```


Human narrative with:
- Decision summary (active migration_axes; zero_downtime_required; per-axis combinations)
- Per-axis playbook detail (cohort_plan + dry_run_plan + rollback_gate + abort_criteria + observability_hooks)
- Cohort table (per axis; name × size_estimate × billing_prorate or residency_change)
- Rollback methods chosen + trigger conditions
- Abort criteria enumerated
- Observability hooks enumerated
- References state (onboarding_hook_ids + offboarding_policy_ids if present; degraded flag if true)
- Schema validation summary (per-axis 5-sub-field check + invariant 12 check + mirror byte-identical check all passed)
- Cross-ref to QG-D1 C0-C5 criteria + waiver path (no waivers in v0.1.0)

### Mirror: `_bmad/bam/evidence/QG-M2/QG-M2-migration-evidence-mirror.md`

Short cross-link narrative (~30-60 lines) with:
- Note: this is the **mirror** evidence for QG-M2 H4 partial proxy (until P10 ships full DR)
- Decision summary (one-paragraph; cross-link to QG-D1 primary for detail)
- Cross-reference: "See `_bmad/bam/evidence/QG-D1/QG-D1-migration-evidence.md` for the canonical evidence narrative. This mirror exists because QG-M2 H4 (migration-safety review) requires evidence pending P10 full-DR; the migration-runbook.json byte-identical mirror at `QG-M2/migration-runbook.json` serves that temporal contract."
- Removal trigger: "P10 ops ships full DR → this mirror copy + this narrative can be removed; QG-D1 becomes the sole evidence consumer."
- Schema validation summary (cross-reference to primary)

Then verify the project-level sidecar ADR exists (C2-I1 fix — mirrors P3.1 tier-model pattern):

```bash
ADR_DIR="{project-root}/_bmad/_memory/atlas/architecture-decisions"
ADR_MATCH=$(ls -1 "$ADR_DIR" 2>/dev/null | grep -E '^[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{3}-tenant-migration-tooling-decision\.md$' | tail -1)
[ -n "$ADR_MATCH" ] && echo "[PASS] ADR present: $ADR_MATCH" || { echo "[FAIL] tenant-migration-tooling ADR missing — re-run step-06"; exit 1; }
```

## Gate

Machine-checkable.

## On failure

Exit 70 with detailed diagnostic; user re-runs step-04 to fix (or step-01 if soft-input state is inconsistent).
