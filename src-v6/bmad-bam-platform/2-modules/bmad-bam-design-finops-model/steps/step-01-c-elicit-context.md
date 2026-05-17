---
step_id: 01-c-elicit-context
auto_runnable: false
gate: machine-checkable
inputs: [tenancy-decision.json, tier-model.json, deployment-topology.json]
outputs: [finops-context.json]
---

# Step 01 — Elicit finops-model context (REQUIRES 3 upstream artifacts)

## Purpose

Gather the empirical inputs that drive the cost-attribution + budgeting decisions: which tenancy model is in force (drives the storage-attribution affordance), which tiers exist (drive the cost-ceiling table), which rollout primitive is in play (drives infra-cost cohort mapping), plus the business inputs (gross-margin target, pricing maturity, cloud provider, instrumentation maturity). All three upstream Foundation artifacts are REQUIRED — finops-model is the tightest-coupled skill in P3.1 and refuses to run if any input is missing.

## Required input precondition check

Per ADR-015 enforcement-mechanism note (G4 spec), this skill enforces ALL THREE upstream contracts at step-01 entry **before** any user elicitation. The check searches both BAM-canonical evidence path and the human-visible architecture path for each input; if any of the three does not resolve, exit 64 (POSIX usage error) with explicit remediation per missing input:

```bash
INPUTS_MISSING=()
for INPUT in tenancy-decision tier-model deployment-topology; do
    PRIMARY="${PROJECT_ROOT:-$(pwd)}/_bmad/bam/evidence/QG-F1/${INPUT}.json"
    ALT="${PROJECT_ROOT:-$(pwd)}/docs/architecture/${INPUT}.json"
    if [ ! -f "$PRIMARY" ] && [ ! -f "$ALT" ]; then
        INPUTS_MISSING+=("$INPUT")
    fi
done

if [ ${#INPUTS_MISSING[@]} -gt 0 ]; then
    echo "ERROR: bmad-bam-design-finops-model requires 3 upstream Foundation artifacts." >&2
    echo "       Missing inputs:" >&2
    for m in "${INPUTS_MISSING[@]}"; do
        case "$m" in
            tenancy-decision)
                echo "         - tenancy-decision.json (run /bmad-bam-design-tenancy-model first)" >&2
                ;;
            tier-model)
                echo "         - tier-model.json (run /bmad-bam-design-tenant-tier-model first)" >&2
                ;;
            deployment-topology)
                echo "         - deployment-topology.json (run /bmad-bam-design-deployment-topology first)" >&2
                ;;
        esac
    done
    echo "" >&2
    echo "       Searched for each input:" >&2
    echo "         {project-root}/_bmad/bam/evidence/QG-F1/<input>.json" >&2
    echo "         {project-root}/docs/architecture/<input>.json" >&2
    exit 64   # POSIX EX_USAGE
fi
```

(Why exit 64: POSIX `EX_USAGE` from `sysexits.h` — signals "command was used incorrectly", which is what running finops-model without all 3 required upstream artifacts is. Downstream automation can branch on this code.)

After the check passes, resolve each input path (prefer canonical evidence over alt):

```bash
for INPUT in tenancy-decision tier-model deployment-topology; do
    PRIMARY="${PROJECT_ROOT:-$(pwd)}/_bmad/bam/evidence/QG-F1/${INPUT}.json"
    ALT="${PROJECT_ROOT:-$(pwd)}/docs/architecture/${INPUT}.json"
    if [ -f "$PRIMARY" ]; then
        eval "${INPUT//-/_}_JSON=\"$PRIMARY\""
    else
        eval "${INPUT//-/_}_JSON=\"$ALT\""
    fi
done
echo "[info] tenancy-decision.json    = $tenancy_decision_JSON"
echo "[info] tier-model.json          = $tier_model_JSON"
echo "[info] deployment-topology.json = $deployment_topology_JSON"
```

## Actions

1. **Run the precondition check above FIRST.** Do not proceed to elicitation unless all 3 inputs resolved.

2. Read upstream fields used by downstream steps:

```bash
TENANCY_MODEL=$(python3 -c "import json; print(json.load(open('$tenancy_decision_JSON'))['tenancy_model'])")
TIER_COUNT=$(python3 -c "import json; print(len(json.load(open('$tier_model_JSON'))['tiers']))")
ROLLOUT_PRIMITIVE=$(python3 -c "import json; print(json.load(open('$deployment_topology_JSON'))['rollout_primitive'])")
echo "[info] tenancy_model     = $TENANCY_MODEL"
echo "[info] tier_count        = $TIER_COUNT"
echo "[info] rollout_primitive = $ROLLOUT_PRIMITIVE"
```

3. Ask the user the following questions, one at a time. Wait for answers. Don't accept vague responses ("we'll figure out margin later" → pin down at least a target band).

   1. **Gross-margin target (%)** — integer percent the team is targeting on a per-tenant basis once at scale (e.g., `60` / `70` / `80`). SaaS norms: 60-70% early, 75-85% mature. The cost-ceiling table in step-04 calibrates against this.
   2. **Pricing maturity** — `pre-revenue` / `early` / `established`. Drives confidence in the per-tier cost ceilings (pre-revenue → wider drift bands; established → tight ceilings).
   3. **Cloud provider** — `aws` / `gcp` / `azure` / `multi`. Drives which cost-attribution APIs / cost-allocation-tag conventions appear in the recommendation.
   4. **Instrumentation maturity** — `greenfield` / `partial` / `mature`. Greenfield = no per-tenant cost telemetry yet (will be built); partial = some compute attribution but no storage/network; mature = end-to-end per-tenant attribution already in place. Drives the realism of step-04's cost-ceiling assignments.

4. Write `{project-root}/_bmad/bam/cache/finops-model-design/{date}/finops-context.json` (ensure parent dir via `mkdir -p`).

## Output

```json
{
  "schema_version": "1.0",
  "elicited_at": "<ISO-8601 UTC>",
  "tenancy_model": "<rls | schema-per-tenant | cell-based | hybrid>",
  "tenancy_decision_path": "<absolute path of resolved tenancy-decision.json>",
  "tier_count": <int>,
  "tier_model_path": "<absolute path of resolved tier-model.json>",
  "rollout_primitive": "<app-canary | per-schema-rollout | per-cell-blue-green | hybrid>",
  "deployment_topology_path": "<absolute path of resolved deployment-topology.json>",
  "gross_margin_target_pct": <int>,
  "pricing_maturity": "pre-revenue | early | established",
  "cloud_provider": "aws | gcp | azure | multi",
  "instrumentation_maturity": "greenfield | partial | mature"
}
```

Population rules:
- `tenancy_model` / `tier_count` / `rollout_primitive` — derived from the 3 resolved input JSONs (never empty after precondition check).
- `tenancy_decision_path` / `tier_model_path` / `deployment_topology_path` — absolute paths of whichever variants were resolved.
- `gross_margin_target_pct` — integer in `[0, 100]`; typical range `60-85`.
- `pricing_maturity`, `cloud_provider`, `instrumentation_maturity` — enums above.

## Gate

Machine-checkable: file exists at expected path + `schema_version`, `tenancy_model`, `tenancy_decision_path`, `tier_count`, `tier_model_path`, `rollout_primitive`, `deployment_topology_path`, `gross_margin_target_pct`, `pricing_maturity`, `cloud_provider`, `instrumentation_maturity` all populated.

## Next step

`step-02-c-load-options.md`
