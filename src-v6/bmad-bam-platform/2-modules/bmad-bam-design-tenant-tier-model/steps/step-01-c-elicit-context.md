---
step_id: 01-c-elicit-context
auto_runnable: false
gate: machine-checkable
inputs: []
outputs: [tier-model-context.json]
---

# Step 01 — Elicit context from user

## Purpose

Gather the empirical inputs that drive the tenant tier-matrix decision: who the tiers are sold to, what pricing model the business has chosen, how mature the revenue model is, and whether a tenancy decision is already in hand. These inputs feed every subsequent step. Also: validate the `--custom-tiers N` flag (if supplied) so a bad value surfaces early.

## Actions

Ask the user the following questions, one at a time. Wait for answers. Don't accept vague responses ("mostly small businesses" → ask whether SMB is the dominant segment or one of several).

1. **Target tenant types** — `consumer` / `smb` / `enterprise` / `mixed`. Drives feature-gate density and limit ranges (consumer tiers tolerate aggressive limits + self-service; enterprise tiers need named-account SLAs).
2. **Pricing strategy** — `freemium` / `paid-only` / `hybrid`. Freemium implies a `free` tier with hard limits; paid-only skips it; hybrid offers paid-only commercial tiers but a free trial mechanism.
3. **Business-model maturity** — `pre-mmr` (pre-monthly-recurring-revenue) / `early-growth` / `established`. Pre-MMR projects should keep the tier matrix simple (3-4 tiers); established projects can support the 5+ default split.
4. **Tenancy decision available** — `yes` / `no`. If `yes`, we'll soft-read `tenancy-decision.json` so the tier matrix can honor tenancy-aligned cohorting (cell-based tenancy naturally aligns with per-cell pricing tiers).

After eliciting, validate the `--custom-tiers N` flag if supplied. If unset, default to 5 tiers (free/starter/pro/business/enterprise per spec §3.Q3):

```bash
# CUSTOM_TIERS is set from the workflow invocation flag --custom-tiers N (if any).
CUSTOM_TIERS="${CUSTOM_TIERS:-}"
if [ -n "$CUSTOM_TIERS" ]; then
    if ! [[ "$CUSTOM_TIERS" =~ ^[0-9]+$ ]] || [ "$CUSTOM_TIERS" -lt 3 ] || [ "$CUSTOM_TIERS" -gt 7 ]; then
        echo "[FAIL] --custom-tiers must be an integer in [3, 7]; got '$CUSTOM_TIERS'"
        exit 1
    fi
    TIER_COUNT_TARGET="$CUSTOM_TIERS"
    CUSTOM_TIERS_MODE="true"
    echo "[info] custom tier count = $TIER_COUNT_TARGET (custom_tiers_mode = true)"
else
    TIER_COUNT_TARGET=5
    CUSTOM_TIERS_MODE="false"
    echo "[info] default tier count = 5 (custom_tiers_mode = false)"
fi
```

Then check whether a prior tenancy decision exists (soft input — does not block if missing):

```bash
TENANCY_PRIMARY="{project-root}/docs/architecture/tenancy-decision.json"
TENANCY_ALT="{project-root}/_bmad/bam/evidence/QG-F1/tenancy-decision.json"
TENANCY_PATH=""
TENANCY_MODEL=""
if [ -f "$TENANCY_PRIMARY" ]; then
    TENANCY_PATH="$TENANCY_PRIMARY"
elif [ -f "$TENANCY_ALT" ]; then
    TENANCY_PATH="$TENANCY_ALT"
fi
if [ -n "$TENANCY_PATH" ]; then
    TENANCY_MODEL=$(python3 -c "import json; print(json.load(open('$TENANCY_PATH')).get('tenancy_model',''))")
    echo "[info] tenancy-decision.json loaded ($TENANCY_MODEL) from $TENANCY_PATH"
    if [ "$TENANCY_MODEL" = "cell-based" ]; then
        echo "       hint: cell-based tenancy naturally aligns with per-cell pricing tiers."
    fi
else
    echo "[WARN] tenancy-decision.json not found at primary or alt path; proceeding with tenancy_model unset."
    echo "       Downstream tier-cohort decisions will assume tenant-aware cohorting is TBD."
fi
```

Write `{project-root}/_bmad/bam/cache/tier-model-design/{date}/tier-model-context.json` (ensure parent dir via `mkdir -p`).

## Output

```json
{
  "schema_version": "1.0",
  "elicited_at": "<ISO-8601 UTC>",
  "tier_count_target": 5,
  "custom_tiers_mode": false,
  "target_tenant_types": "consumer | smb | enterprise | mixed",
  "pricing_strategy": "freemium | paid-only | hybrid",
  "business_model_maturity": "pre-mmr | early-growth | established",
  "tenancy_decision_path": "<absolute path or empty string>",
  "tenancy_model": "<rls | schema-per-tenant | cell-based | hybrid or empty string>"
}
```

Population rules:
- `tier_count_target` — 5 if `--custom-tiers` unset; otherwise the validated `N` (3-7).
- `custom_tiers_mode` — `true` iff `--custom-tiers` was supplied; `false` otherwise.
- `tenancy_decision_path` — populated if either soft-input path resolved; empty string if both missing.
- `tenancy_model` — pulled from the soft-input JSON if available; empty string otherwise (downstream steps treat empty as "TBD").

## Gate

Machine-checkable: file exists at expected path + `schema_version`, `tier_count_target`, `custom_tiers_mode`, `target_tenant_types`, `pricing_strategy`, `business_model_maturity` all populated. `tier_count_target` is an integer in `[3, 7]`. `custom_tiers_mode` is a boolean and is consistent with `tier_count_target` (`false` iff `tier_count_target == 5`; `true` otherwise). `tenancy_decision_path` and `tenancy_model` may be empty (soft input).

## Next step

`step-02-c-load-options.md`
