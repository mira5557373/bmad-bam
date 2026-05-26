---
step_id: 07-v-verify-completeness
auto_runnable: true
gate: machine-checkable
inputs: [tier-model.md, tier-model.json, ADR]
outputs: [QG-F1-tier-model-evidence.md]
---

# Step 07 — Verify completeness + emit QG-F1 tier-model evidence

## Purpose

Validate-mode step: verify all design-time outputs of this skill exist, satisfy schema, and pass the QG-F1 C5 auto-criterion (tier-model.json present + schema-valid + tier_count enforced). Emit QG-F1 partial evidence for the tier-model contribution to the gate.

## Actions

1. Verify `tier-model.md` exists:

```bash
MD_PATH="{project-root}/docs/architecture/tier-model.md"
[ -f "$MD_PATH" ] && echo "[PASS] tier-model.md present" || { echo "[FAIL] tier-model.md missing"; exit 1; }
```

2. Verify `tier-model.json` exists at BOTH paths:

```bash
JSON_PRIMARY="{project-root}/docs/architecture/tier-model.json"
JSON_EVIDENCE="{project-root}/_bmad/bam/evidence/QG-F1/tier-model.json"
for p in "$JSON_PRIMARY" "$JSON_EVIDENCE"; do
    [ -f "$p" ] && echo "[PASS] $p present" || { echo "[FAIL] $p missing"; exit 1; }
done
```

3. Validate JSON schema + content (Python; checks schema_version, tier_count enforcement, custom_tiers_mode coherence, per-tier required fields, upgrade-path chain integrity, transitions block):

```python
import json, sys
data = json.load(open("{project-root}/docs/architecture/tier-model.json"))
errors = []
if "schema_version" not in data:
    errors.append("missing schema_version")
else:
    # P3.2: accept both 1.0 (P3.1 backwards-compat) and 1.1 (adds retention_window_days_hint)
    allowed_schema_versions = {"1.0", "1.1"}
    if data["schema_version"] not in allowed_schema_versions:
        errors.append(
            f"schema_version {data['schema_version']!r} not in {allowed_schema_versions} "
            f"(P3.2 accepts 1.0 and 1.1)"
        )

tier_count = data.get("tier_count")
if not isinstance(tier_count, int) or tier_count not in {3, 4, 5, 6, 7}:
    errors.append(f"tier_count {tier_count!r} not an int in {{3,4,5,6,7}}")

ctm = data.get("custom_tiers_mode")
if not isinstance(ctm, bool):
    errors.append(f"custom_tiers_mode must be bool; got {type(ctm).__name__}")
elif isinstance(tier_count, int):
    # custom_tiers_mode == false iff tier_count == 5
    expected_ctm = (tier_count != 5)
    if ctm != expected_ctm:
        errors.append(
            f"custom_tiers_mode={ctm} inconsistent with tier_count={tier_count} "
            f"(expected custom_tiers_mode={expected_ctm})"
        )

tiers = data.get("tiers", [])
if not isinstance(tiers, list):
    errors.append("tiers must be a list")
elif isinstance(tier_count, int) and len(tiers) != tier_count:
    errors.append(f"tiers length {len(tiers)} != tier_count {tier_count}")

allowed_rollout = {"aggressive_canary", "canary", "blue_green_synthetics", "blue_green_pilot"}
allowed_upgrade_mode = {"self_service", "sales_assisted"}
required_tier_fields = ("id", "price_per_month_usd", "limits", "features",
                        "rollout_tier_hint", "cost_ceiling_usd_per_month_hint",
                        "upgrade_mode", "upgrade_path")
required_limits = ("seats", "api_calls_per_month", "storage_gb", "compute_hours")

for i, t in enumerate(tiers if isinstance(tiers, list) else []):
    for f in required_tier_fields:
        if f not in t:
            errors.append(f"tiers[{i}] missing '{f}'")
    if t.get("rollout_tier_hint") not in allowed_rollout:
        errors.append(f"tiers[{i}].rollout_tier_hint {t.get('rollout_tier_hint')!r} not in {allowed_rollout}")
    if t.get("upgrade_mode") not in allowed_upgrade_mode:
        errors.append(f"tiers[{i}].upgrade_mode {t.get('upgrade_mode')!r} not in {allowed_upgrade_mode}")
    if not isinstance(t.get("features"), list):
        errors.append(f"tiers[{i}].features must be list")
    limits = t.get("limits", {})
    if not isinstance(limits, dict):
        errors.append(f"tiers[{i}].limits must be object")
    else:
        for lk in required_limits:
            if lk not in limits:
                errors.append(f"tiers[{i}].limits missing '{lk}'")

# Upgrade-path chain integrity
if isinstance(tiers, list) and all(isinstance(t, dict) and "id" in t for t in tiers):
    for i, t in enumerate(tiers):
        up = t.get("upgrade_path")
        if i == len(tiers) - 1:
            if up is not None:
                errors.append(f"tiers[{i}] (top) upgrade_path must be null; got {up!r}")
        else:
            expected = tiers[i + 1]["id"]
            if up != expected:
                errors.append(f"tiers[{i}].upgrade_path={up!r} != next tier id {expected!r}")

transitions = data.get("transitions", {})
if not isinstance(transitions, dict):
    errors.append("transitions must be object")
elif transitions.get("any_downgrade") != "rate_arbitrage_check":
    errors.append(f"transitions.any_downgrade must == 'rate_arbitrage_check'; got {transitions.get('any_downgrade')!r}")

# P3.2 schema 1.1: retention_window_days_hint per tier
# - custom_tiers_mode: required per tier (no defaults possible)
# - 5-default mode: optional (consumers auto-fill from preset)
# - When present: integer in [0, 36500]
tm = data
for tier in tm.get("tiers", []) if isinstance(tm.get("tiers"), list) else []:
    if not isinstance(tier, dict):
        continue
    if tm.get('custom_tiers_mode', False):
        if 'retention_window_days_hint' not in tier:
            errors.append(
                f"custom-mode tier {tier.get('id')!r} missing retention_window_days_hint "
                f"— re-run bmad-bam-design-tenant-tier-model post-P3.2 to emit schema 1.1 "
                f"with explicit retention values per custom tier "
                f"(rule applies to both schema 1.0 and 1.1 custom-mode; C1-I1 fix)"
            )
    if 'retention_window_days_hint' in tier:
        v = tier['retention_window_days_hint']
        if not (isinstance(v, int) and not isinstance(v, bool) and 0 <= v <= 36500):
            errors.append(
                f"tier {tier.get('id')!r} retention_window_days_hint={v!r} "
                f"out of range [0, 36500] or not int"
            )

if errors:
    print("[FAIL] schema validation:")
    for e in errors:
        print(f"  - {e}")
    sys.exit(1)
print("[PASS] schema validation")
```

4. Verify the project-level ADR exists:

```bash
ADR_DIR="{project-root}/_bmad/_memory/atlas/architecture-decisions"
ADR_MATCH=$(ls -1 "$ADR_DIR" 2>/dev/null | grep -E '^[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{3}-tenant-tier-model-decision\.md$' | tail -1)
[ -n "$ADR_MATCH" ] && echo "[PASS] ADR present: $ADR_MATCH" || { echo "[FAIL] tier-model ADR missing"; exit 1; }
```

5. Emit QG-F1 partial evidence noting the tier-model C5 criterion is satisfied (QG-F1 needs 5 foundation artifacts; this skill contributes the tier-model one):

Write `{project-root}/_bmad/bam/evidence/QG-F1/YYYY-MM-DD-NNN/criteria-met-tier-model.md`:

```markdown
---
gate_id: QG-F1
verified_at: <ISO>
verified_by: atlas
auto_checkable_pct: 20
human_review_pct: 0
result: pass-partial
---

## Criteria summary

| Criterion | Status | Evidence |
|---|---|---|
| C5: tier-model.json present + schema-valid | pass | docs/architecture/tier-model.json + _bmad/bam/evidence/QG-F1/tier-model.json |
| tier_count in {3,4,5,6,7} | pass | step-07 schema check |
| custom_tiers_mode coherent (false iff tier_count==5) | pass | step-07 schema check |
| upgrade-path chain integrity | pass | step-07 schema check |
| transitions.any_downgrade == rate_arbitrage_check | pass | step-07 schema check |

## Evidence

- docs/architecture/tier-model.md
- docs/architecture/tier-model.json
- _bmad/bam/evidence/QG-F1/tier-model.json
- _bmad/_memory/atlas/architecture-decisions/<id>-tenant-tier-model-decision.md
- _bmad/bam/cache/tier-model-design/<date>/* (intermediate cache)
```

## Output

Stdout: a sequence of `[PASS]` / `[FAIL]` lines, one per check. Non-zero exit code if any check fails.

Evidence file: `_bmad/bam/evidence/QG-F1/YYYY-MM-DD-NNN/criteria-met-tier-model.md` per std-validation.

## Gate

Machine-checkable: this step IS the gate verification for the skill's design-time portion. Exit-0 = pass; any FAIL halts.

## Workflow complete

`bmad-bam-design-tenant-tier-model` Create mode done.
