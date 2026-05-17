---
step_id: 08-v-verify-coherence
auto_runnable: true
gate: machine-checkable
inputs: [tenancy-decision.json, tier-model.json, deployment-topology.json, finops-baseline.json]
outputs: [foundation-coherence.json]
---

# Step 08 — Verify Foundation coherence (writes foundation-coherence.json)

## Purpose

The 5 Foundation skills are designed with hint-vs-override semantics (per spec §3.R2): tier-model.json declares tentative hints (`rollout_tier_hint`, `cost_ceiling_usd_per_month_hint`) that downstream skills may override. This step reads all 4 Foundation artifacts post-decision and produces `foundation-coherence.json` — the cross-artifact coherence report consumed by QG-F1 auto-criterion C3.

As the 8th and final step of the finops-model skill, this step exists ONLY in finops-model (not in the other Foundation skills) because finops-model is the last skill in the dependency chain and is the only point at which all 4 Foundation artifacts are guaranteed to exist.

## Algorithm

(Pseudocode in §3.R2 of spec; concrete Python implementation here.)

```python
import json
import os
from datetime import datetime, timezone

project_root = os.environ.get("PROJECT_ROOT", os.getcwd())
evidence_dir = os.path.join(project_root, "_bmad/bam/evidence/QG-F1")

tier = json.load(open(os.path.join(evidence_dir, "tier-model.json")))
deployment = json.load(open(os.path.join(evidence_dir, "deployment-topology.json")))
finops = json.load(open(os.path.join(evidence_dir, "finops-baseline.json")))

mismatches = []

for t in tier["tiers"]:
    tier_id = t["id"]

    # Rollout-tier hint vs deployment actual
    hinted = t.get("rollout_tier_hint")
    actual = deployment["rollout_per_tier"].get(tier_id)
    if hinted and actual and hinted != actual:
        mismatches.append({
            "field": "rollout_tier",
            "tier_id": tier_id,
            "hinted_in_tier_model": hinted,
            "actual_in_deployment": actual,
            "severity": "warn"
        })

    # Cost-ceiling hint vs finops actual (20% drift threshold)
    hinted_cost = t.get("cost_ceiling_usd_per_month_hint")
    actual_cost = finops["cost_ceiling_per_tier"].get(tier_id)
    if hinted_cost is not None and actual_cost is not None and hinted_cost > 0:
        drift_pct = (actual_cost - hinted_cost) / hinted_cost * 100
        if abs(drift_pct) > 20:
            mismatches.append({
                "field": "cost_ceiling",
                "tier_id": tier_id,
                "hinted": hinted_cost,
                "actual": actual_cost,
                "drift_pct": round(drift_pct, 1),
                "severity": "warn"
            })

result = {
    "schema_version": "1.0",
    "verified_at": datetime.now(timezone.utc).isoformat(),
    "coherent": len([m for m in mismatches if m["severity"] == "error"]) == 0,
    "mismatches": mismatches
}

out_path = os.path.join(evidence_dir, "foundation-coherence.json")
os.makedirs(os.path.dirname(out_path), exist_ok=True)
with open(out_path, "w") as f:
    json.dump(result, f, indent=2)

print(f"verify-coherence: coherent={result['coherent']} mismatches={len(mismatches)}")
```

## Output

`{project-root}/_bmad/bam/evidence/QG-F1/foundation-coherence.json`.

Schema:

```json
{
  "schema_version": "1.0",
  "verified_at": "<ISO-8601 UTC>",
  "coherent": true,
  "mismatches": [
    {
      "field": "rollout_tier | cost_ceiling",
      "tier_id": "<tier id>",
      "hinted_in_tier_model": "<hint value>",
      "actual_in_deployment": "<actual value>",
      "severity": "warn | error"
    }
  ]
}
```

## Gate

Machine-checkable: file exists at expected path + `schema_version` present + `coherent` is a bool + `mismatches` is a list. QG-F1 C3 verifies `coherent: true` — warn-level mismatches don't fail the gate; only `severity: error` mismatches do.

In v6.0 there are zero error-level rules (all hint-vs-actual mismatches are warn). Future revisions may promote certain mismatches to error severity (e.g., if the team decides cost-ceiling drift > 50% is gate-blocking).

## Failure semantics

`coherent: false` (only on error-severity mismatch) → QG-F1 C3 auto-criterion fails. User reconciles by re-running upstream skill OR documenting explicit override in `decision.md`.

In v6.0, this step effectively never produces `coherent: false` because no rule emits `severity: error`. The mechanism exists for forward-compatibility: the v6.0 output is always `coherent: true` with a (possibly non-empty) `mismatches` list of warnings.

## Workflow complete

`bmad-bam-design-finops-model` Create mode done. With this step's output, all 5 QG-F1 evidence files exist:

1. `tenancy-decision.json`
2. `tier-model.json`
3. `deployment-topology.json`
4. `finops-baseline.json`
5. `foundation-coherence.json` (this step)

Plus the foundation auto-criteria evidence emitted by step-07 of each Foundation skill. QG-F1 (blocking) can now be evaluated.
