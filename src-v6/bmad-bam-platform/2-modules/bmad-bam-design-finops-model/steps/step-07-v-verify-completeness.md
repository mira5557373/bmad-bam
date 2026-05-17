---
step_id: 07-v-verify-completeness
auto_runnable: true
gate: machine-checkable
inputs: [finops-baseline.md, finops-baseline.json, ADR]
outputs: [QG-F1-finops-baseline-evidence.md]
---

# Step 07 — Verify completeness + emit QG-F1 finops-baseline evidence

## Purpose

Validate-mode step: verify all design-time outputs of this skill exist, satisfy schema, and pass the QG-F1 auto-criterion for finops-baseline. Critically, verify `per_tenant_attribution.storage` matches the tenancy_model from tenancy-decision.json (cross-skill coupling check). Emit QG-F1 partial evidence for the finops-baseline contribution to the gate. (Note: this step does NOT emit foundation-coherence.json — that is step-08's job.)

## Actions

1. Verify `finops-baseline.md` exists:

```bash
MD_PATH="{project-root}/docs/architecture/finops-baseline.md"
[ -f "$MD_PATH" ] && echo "[PASS] finops-baseline.md present" || { echo "[FAIL] finops-baseline.md missing"; exit 1; }
```

2. Verify `finops-baseline.json` exists at BOTH paths:

```bash
JSON_PRIMARY="{project-root}/docs/architecture/finops-baseline.json"
JSON_EVIDENCE="{project-root}/_bmad/bam/evidence/QG-F1/finops-baseline.json"
for p in "$JSON_PRIMARY" "$JSON_EVIDENCE"; do
    [ -f "$p" ] && echo "[PASS] $p present" || { echo "[FAIL] $p missing"; exit 1; }
done
```

3. Validate JSON schema + content (Python; checks schema_version, unit_economics, per_tenant_attribution enum + tenancy_model coupling, cost_ceiling_per_tier, budget_alert_thresholds, all three *_input_ref fixed values):

```python
import json, os, sys

PROJECT_ROOT = os.environ.get("PROJECT_ROOT", os.getcwd())
data = json.load(open(f"{PROJECT_ROOT}/docs/architecture/finops-baseline.json"))
errors = []

if "schema_version" not in data:
    errors.append("missing schema_version")

ue = data.get("unit_economics", {})
if not isinstance(ue, dict):
    errors.append("unit_economics must be an object")
else:
    gm = ue.get("gross_margin_target_pct")
    if not isinstance(gm, (int, float)) or gm < 0 or gm > 100:
        errors.append(f"unit_economics.gross_margin_target_pct must be in [0,100]; got {gm!r}")
    for k in ("ltv_estimate_usd", "cac_estimate_usd"):
        v = ue.get(k)
        if not isinstance(v, (int, float)) or v < 0:
            errors.append(f"unit_economics.{k} must be a non-negative number; got {v!r}")

allowed_storage = {"by_predicate", "by_schema", "by_cell_then_intra", "mixed"}
pta = data.get("per_tenant_attribution", {})
if not isinstance(pta, dict):
    errors.append("per_tenant_attribution must be an object")
else:
    if pta.get("storage") not in allowed_storage:
        errors.append(f"per_tenant_attribution.storage {pta.get('storage')!r} not in {allowed_storage}")
    for k in ("compute", "network", "third_party"):
        if not isinstance(pta.get(k), str) or not pta.get(k).strip():
            errors.append(f"per_tenant_attribution.{k} must be a non-empty string")

# Cross-skill coupling: per_tenant_attribution.storage must match tenancy_model
# from tenancy-decision.json (the tenancy is load-bearing for storage attribution
# per spec §3.R1 + per-tenant-cost-attribution-with-hooks fragment).
tenancy_path_primary = f"{PROJECT_ROOT}/_bmad/bam/evidence/QG-F1/tenancy-decision.json"
tenancy_path_alt = f"{PROJECT_ROOT}/docs/architecture/tenancy-decision.json"
tenancy_path = ""
if os.path.exists(tenancy_path_primary):
    tenancy_path = tenancy_path_primary
elif os.path.exists(tenancy_path_alt):
    tenancy_path = tenancy_path_alt
if tenancy_path:
    td = json.load(open(tenancy_path))
    tenancy_model = td.get("tenancy_model")
    expected_storage = {
        "rls": "by_predicate",
        "schema-per-tenant": "by_schema",
        "cell-based": "by_cell_then_intra",
        "hybrid": "mixed"
    }.get(tenancy_model)
    actual_storage = pta.get("storage")
    if expected_storage and actual_storage != expected_storage:
        errors.append(
            f"per_tenant_attribution.storage={actual_storage!r} does not match "
            f"tenancy_model={tenancy_model!r} (expected {expected_storage!r}); "
            f"see spec §3.R1 coupling table"
        )
    else:
        print(f"[PASS] per_tenant_attribution.storage={actual_storage!r} matches tenancy_model={tenancy_model!r}")
else:
    print("[WARN] tenancy-decision.json not found; skipping storage × tenancy_model coupling check")

cct = data.get("cost_ceiling_per_tier", {})
if not isinstance(cct, dict) or not cct:
    errors.append("cost_ceiling_per_tier must be a non-empty object")
else:
    for tid, ceiling in cct.items():
        if not isinstance(ceiling, (int, float)) or ceiling < 0:
            errors.append(f"cost_ceiling_per_tier[{tid!r}]={ceiling!r} must be a non-negative number")

allowed_channel = {"slack", "email", "pagerduty"}
bat = data.get("budget_alert_thresholds", [])
if not isinstance(bat, list) or not bat:
    errors.append("budget_alert_thresholds must be a non-empty array")
else:
    for i, item in enumerate(bat):
        if not isinstance(item, dict):
            errors.append(f"budget_alert_thresholds[{i}] must be an object")
            continue
        if not isinstance(item.get("tier"), str) or not item["tier"].strip():
            errors.append(f"budget_alert_thresholds[{i}].tier must be a non-empty string")
        pct = item.get("alert_at_pct_of_ceiling")
        if not isinstance(pct, (int, float)) or pct < 50 or pct > 100:
            errors.append(f"budget_alert_thresholds[{i}].alert_at_pct_of_ceiling must be in [50,100]; got {pct!r}")
        if item.get("channel") not in allowed_channel:
            errors.append(f"budget_alert_thresholds[{i}].channel must be in {allowed_channel}")

expected_refs = {
    "tenancy_input_ref": "_bmad/bam/evidence/QG-F1/tenancy-decision.json",
    "tier_input_ref": "_bmad/bam/evidence/QG-F1/tier-model.json",
    "deployment_input_ref": "_bmad/bam/evidence/QG-F1/deployment-topology.json"
}
for k, expected in expected_refs.items():
    if data.get(k) != expected:
        errors.append(f"{k} must == {expected!r}; got {data.get(k)!r}")

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
ADR_MATCH=$(ls -1 "$ADR_DIR" 2>/dev/null | grep -E '^[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{3}-finops-model-decision\.md$' | tail -1)
[ -n "$ADR_MATCH" ] && echo "[PASS] ADR present: $ADR_MATCH" || { echo "[FAIL] finops-model ADR missing"; exit 1; }
```

5. Emit QG-F1 partial evidence noting the finops-baseline criterion is satisfied (QG-F1 needs 5 foundation artifacts; this skill contributes the finops-baseline one + step-08 contributes foundation-coherence):

Write `{project-root}/_bmad/bam/evidence/QG-F1/YYYY-MM-DD-NNN/criteria-met-finops-baseline.md`:

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
| finops-baseline.json present + schema-valid | pass | docs/architecture/finops-baseline.json + _bmad/bam/evidence/QG-F1/finops-baseline.json |
| unit_economics fields populated | pass | step-07 schema check |
| per_tenant_attribution.storage matches tenancy_model | pass (or skipped if tenancy-decision absent) | step-07 cross-skill coupling check |
| cost_ceiling_per_tier non-empty + non-negative | pass | step-07 schema check |
| budget_alert_thresholds valid (channel enum, pct ∈ [50,100]) | pass | step-07 schema check |
| upstream input refs all canonical evidence paths | pass | step-07 schema check |

## Evidence

- docs/architecture/finops-baseline.md
- docs/architecture/finops-baseline.json
- _bmad/bam/evidence/QG-F1/finops-baseline.json
- _bmad/_memory/atlas/architecture-decisions/<id>-finops-model-decision.md
- _bmad/bam/cache/finops-model-design/<date>/* (intermediate cache)
```

## Output

Stdout: a sequence of `[PASS]` / `[WARN]` / `[FAIL]` lines, one per check. Non-zero exit code if any check fails.

Evidence file: `_bmad/bam/evidence/QG-F1/YYYY-MM-DD-NNN/criteria-met-finops-baseline.md` per std-validation.

## Gate

Machine-checkable: this step verifies the finops-baseline portion of QG-F1. Exit-0 = pass; any FAIL halts. (The remaining QG-F1 cross-artifact coherence verification happens in step-08.)

## Next step

`step-08-v-verify-coherence.md`
