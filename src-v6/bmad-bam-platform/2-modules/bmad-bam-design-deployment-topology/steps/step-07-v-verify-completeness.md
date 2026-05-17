---
step_id: 07-v-verify-completeness
auto_runnable: true
gate: machine-checkable
inputs: [deployment-topology.md, deployment-topology.json, ADR]
outputs: [QG-F1-deployment-topology-evidence.md]
---

# Step 07 — Verify completeness + emit QG-F1 deployment-topology evidence

## Purpose

Validate-mode step: verify all design-time outputs of this skill exist, satisfy schema, and pass the QG-F1 auto-criterion for deployment-topology (deployment-topology.json present + schema-valid + `rollout_per_tier` covers all tier ids). Emit QG-F1 partial evidence for the deployment-topology contribution to the gate.

## Actions

1. Verify `deployment-topology.md` exists:

```bash
MD_PATH="{project-root}/docs/architecture/deployment-topology.md"
[ -f "$MD_PATH" ] && echo "[PASS] deployment-topology.md present" || { echo "[FAIL] deployment-topology.md missing"; exit 1; }
```

2. Verify `deployment-topology.json` exists at BOTH paths:

```bash
JSON_PRIMARY="{project-root}/docs/architecture/deployment-topology.json"
JSON_EVIDENCE="{project-root}/_bmad/bam/evidence/QG-F1/deployment-topology.json"
for p in "$JSON_PRIMARY" "$JSON_EVIDENCE"; do
    [ -f "$p" ] && echo "[PASS] $p present" || { echo "[FAIL] $p missing"; exit 1; }
done
```

3. Validate JSON schema + content (Python; checks schema_version, rollout_primitive enum, rollout_per_tier enum-of-values + per-tier coverage, tenant_cohort_strategy enum, rollback_strategy non-empty, tenancy_input_ref fixed value):

```python
import json, os, sys

PROJECT_ROOT = os.environ.get("PROJECT_ROOT", os.getcwd())
data = json.load(open(f"{PROJECT_ROOT}/docs/architecture/deployment-topology.json"))
errors = []

if "schema_version" not in data:
    errors.append("missing schema_version")

allowed_primitive = {"app-canary", "per-schema-rollout", "per-cell-blue-green", "hybrid"}
if data.get("rollout_primitive") not in allowed_primitive:
    errors.append(f"rollout_primitive {data.get('rollout_primitive')!r} not in {allowed_primitive}")

allowed_per_tier = {"aggressive_canary", "canary", "blue_green_synthetics", "blue_green_pilot"}
rpt = data.get("rollout_per_tier", {})
if not isinstance(rpt, dict) or not rpt:
    errors.append("rollout_per_tier must be a non-empty object")
else:
    for tid, strategy in rpt.items():
        if strategy not in allowed_per_tier:
            errors.append(f"rollout_per_tier[{tid!r}]={strategy!r} not in {allowed_per_tier}")

# Cross-skill coherence: rollout_per_tier keys must be a SUPERSET of tier-model.json tier ids
# (if tier-model.json is available). This is the same check the Phase 7 verify-coherence step runs.
tier_model_path_primary = f"{PROJECT_ROOT}/docs/architecture/tier-model.json"
tier_model_path_alt = f"{PROJECT_ROOT}/_bmad/bam/evidence/QG-F1/tier-model.json"
tier_model_path = ""
if os.path.exists(tier_model_path_primary):
    tier_model_path = tier_model_path_primary
elif os.path.exists(tier_model_path_alt):
    tier_model_path = tier_model_path_alt
if tier_model_path:
    tm = json.load(open(tier_model_path))
    tier_ids = {t.get("id") for t in tm.get("tiers", []) if isinstance(t, dict)}
    missing = tier_ids - set(rpt.keys())
    if missing:
        errors.append(f"rollout_per_tier missing tier ids declared in tier-model.json: {sorted(missing)}")
    else:
        print(f"[PASS] rollout_per_tier covers all {len(tier_ids)} tier ids from tier-model.json")
else:
    print("[WARN] tier-model.json not found; skipping rollout_per_tier × tier_ids coherence check")

allowed_cohort = {"by-tenant-id-hash", "by-region", "by-tier", "by-explicit-list"}
if data.get("tenant_cohort_strategy") not in allowed_cohort:
    errors.append(f"tenant_cohort_strategy {data.get('tenant_cohort_strategy')!r} not in {allowed_cohort}")

rs = data.get("rollback_strategy")
if not isinstance(rs, str) or not rs.strip():
    errors.append("rollback_strategy must be a non-empty string")

expected_ref = "_bmad/bam/evidence/QG-F1/tenancy-decision.json"
if data.get("tenancy_input_ref") != expected_ref:
    errors.append(f"tenancy_input_ref must == {expected_ref!r}; got {data.get('tenancy_input_ref')!r}")

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
ADR_MATCH=$(ls -1 "$ADR_DIR" 2>/dev/null | grep -E '^[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{3}-deployment-topology-decision\.md$' | tail -1)
[ -n "$ADR_MATCH" ] && echo "[PASS] ADR present: $ADR_MATCH" || { echo "[FAIL] deployment-topology ADR missing"; exit 1; }
```

5. Emit QG-F1 partial evidence noting the deployment-topology criterion is satisfied (QG-F1 needs 5 foundation artifacts; this skill contributes the deployment-topology one):

Write `{project-root}/_bmad/bam/evidence/QG-F1/YYYY-MM-DD-NNN/criteria-met-deployment-topology.md`:

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
| deployment-topology.json present + schema-valid | pass | docs/architecture/deployment-topology.json + _bmad/bam/evidence/QG-F1/deployment-topology.json |
| rollout_primitive in allowed enum | pass | step-07 schema check |
| rollout_per_tier values in allowed enum | pass | step-07 schema check |
| rollout_per_tier keys ⊇ tier-model.json tier ids | pass (or skipped if tier-model absent) | step-07 cross-skill coherence check |
| tenant_cohort_strategy in allowed enum | pass | step-07 schema check |
| tenancy_input_ref points to canonical evidence path | pass | step-07 schema check |

## Evidence

- docs/architecture/deployment-topology.md
- docs/architecture/deployment-topology.json
- _bmad/bam/evidence/QG-F1/deployment-topology.json
- _bmad/_memory/atlas/architecture-decisions/<id>-deployment-topology-decision.md
- _bmad/bam/cache/deployment-topology-design/<date>/* (intermediate cache)
```

## Output

Stdout: a sequence of `[PASS]` / `[WARN]` / `[FAIL]` lines, one per check. Non-zero exit code if any check fails.

Evidence file: `_bmad/bam/evidence/QG-F1/YYYY-MM-DD-NNN/criteria-met-deployment-topology.md` per std-validation.

## Gate

Machine-checkable: this step IS the gate verification for the skill's design-time portion. Exit-0 = pass; any FAIL halts.

## Workflow complete

`bmad-bam-design-deployment-topology` Create mode done.
