---
step_id: 05-c-write-design
auto_runnable: true
gate: machine-checkable
inputs: [tier-model-context.json, decision-matrix.json, recommendation.json]
outputs: [tier-model.md, tier-model.json]
template_ref: tier-model.md.template
---

# Step 05 — Write the tier-model design doc

## Purpose

Produce a `tier-model.md` design doc (human-readable narrative) and a `tier-model.json` machine-readable contract. The JSON is QG-F1 evidence and is consumed by downstream P3.x skills (`design-deployment-topology` for rollout-cohort defaults; `design-finops-model` for cost-allocation hooks).

## Actions

1. Read inputs from `_bmad/bam/cache/tier-model-design/{date}/`:
   - `tier-model-context.json` — target tenant types, pricing strategy, business-model maturity, tenancy model
   - `decision-matrix.json` — per-tier axis scores
   - `recommendation.json` — final tier set, tier count, custom_tiers_mode, rationale

2. Read template at `../templates/tier-model.md.template` (skill-relative; BMM convention).

3. For each tier in `recommendation.json#final_tier_ids`, elicit per-tier details from the user. Pre-fill from the 5-default values below when applicable (per spec §3.Q3 + §3.Q5+R2); the user may override but the defaults are sound. Capture:

   - `id` — tier id from `final_tier_ids`
   - `price_per_month_usd` — number (USD), or the string `"custom"` for enterprise
   - `limits` — object with at minimum `{seats, api_calls_per_month, storage_gb, compute_hours}`. The user may add additional limit keys; downstream skills tolerate extras.
   - `features` — list of feature strings (kebab/snake case is fine; e.g. `["basic_dashboards", "sso", "audit_log"]`)
   - `rollout_tier_hint` — one of `aggressive_canary` / `canary` / `blue_green_synthetics` / `blue_green_pilot` (informs `design-deployment-topology`)
   - `cost_ceiling_usd_per_month_hint` — number (USD); the FinOps skill uses this to set per-tenant cost alarms
   - `upgrade_mode` — `self_service` | `sales_assisted`
   - `upgrade_path` — id of the next-higher tier, or `null` for the top tier

   **5-default tier values (per spec §3.Q3 + §3.Q5+R2)** — use as pre-fill when the tier id matches:

   | id | price | rollout_tier_hint | cost_ceiling_hint | upgrade_mode | upgrade_path |
   |---|---|---|---|---|---|
   | free | 0 | aggressive_canary | 0.50 | self_service | starter |
   | starter | 19 | canary | 5.00 | self_service | pro |
   | pro | 99 | canary | 25.00 | self_service | business |
   | business | 499 | blue_green_synthetics | 125.00 | sales_assisted | enterprise |
   | enterprise | "custom" | blue_green_pilot | 625.00 | sales_assisted | null |

   Default `limits` for the 5-default tiers (sized to a roughly 5× geometric progression per spec §3.Q3 — user should adjust to their workload):

   | id | seats | api_calls_per_month | storage_gb | compute_hours |
   |---|---|---|---|---|
   | free | 1 | 1000 | 1 | 5 |
   | starter | 5 | 10000 | 10 | 25 |
   | pro | 25 | 100000 | 100 | 125 |
   | business | 100 | 500000 | 500 | 625 |
   | enterprise | 1000 | 5000000 | 5000 | 3125 |

   Default `retention_window_days_hint` for the 5-default tiers (P3.2 schema 1.1; consumed by `bmad-bam-design-tenant-lifecycle-policies` to pre-fill grace/retention timers):

   | id | retention_window_days_hint |
   |---|---|
   | free | 7 |
   | starter | 30 |
   | pro | 30 |
   | business | 90 |
   | enterprise | 365 |

   **Custom-tier mode:** When `custom_tiers_mode: true`, `retention_window_days_hint` MUST be elicited from the user per tier — no defaults apply; step-07-v hard-fails if missing.

   For custom-N tiers, no defaults — elicit every field from the user.

4. Write the populated narrative to `{project-root}/docs/architecture/tier-model.md` (ensure parent dir via `mkdir -p`).

5. Write the machine-readable contract `tier-model.json` to BOTH locations (ensure parent dirs):
   - `{project-root}/docs/architecture/tier-model.json` (human-visible copy alongside narrative)
   - `{project-root}/_bmad/bam/evidence/QG-F1/tier-model.json` (gate-evidence pointer for QG-F1)

   JSON schema (exact, per spec §3.Q5+R2; **schema_version 1.1** per P3.2 §3.1 — adds optional `retention_window_days_hint` per tier; backwards-compatible with 1.0):

   ```json
   {
     "schema_version": "1.1",
     "decided_at": "<ISO-8601 UTC>",
     "tier_count": 5,
     "custom_tiers_mode": false,
     "tiers": [
       {
         "id": "free",
         "price_per_month_usd": 0,
         "limits": {
           "seats": 1,
           "api_calls_per_month": 1000,
           "storage_gb": 1,
           "compute_hours": 5
         },
         "features": ["basic_dashboards", "community_support"],
         "rollout_tier_hint": "aggressive_canary",
         "cost_ceiling_usd_per_month_hint": 0.50,
         "retention_window_days_hint": 7,
         "upgrade_mode": "self_service",
         "upgrade_path": "starter"
       }
     ],
     "transitions": {
       "any_downgrade": "rate_arbitrage_check"
     }
   }
   ```

   Population rules:
   - `tier_count` and `custom_tiers_mode` carry forward from `recommendation.json`.
   - `tiers[*].id` order matches `final_tier_ids` (low → high).
   - `tiers[len-1].upgrade_path == null` (top tier has no path up).
   - `tiers[i].upgrade_path == tiers[i+1].id` for `i < len-1` (chain integrity).
   - `transitions.any_downgrade` is fixed to `rate_arbitrage_check` — every downgrade must be screened against rate-arbitrage abuse before processing.

## Output

1. `{project-root}/docs/architecture/tier-model.md` — design doc. Sections (mirrors template):
   - Frontmatter (yaml): id, title, status (`draft`), date, persona (`atlas`), workflow_run_id
   - ## Decision: `tier_count` + `custom_tiers_mode`
   - ## Context: from `tier-model-context.json`
   - ## Rationale: from `recommendation.json`
   - ## Tier matrix (table: id, price, limits, features, rollout_tier_hint, cost_ceiling_hint, upgrade_mode, upgrade_path)
   - ## Limits per tier (detail table)
   - ## Features per tier (detail table)
   - ## Transitions (upgrade paths + downgrade policy)
   - ## Quality gate references (QG-F1)
   - ## Next steps (design-deployment-topology, design-finops-model)

2. `{project-root}/docs/architecture/tier-model.json` — machine-readable contract (schema above).

3. `{project-root}/_bmad/bam/evidence/QG-F1/tier-model.json` — identical content written as QG-F1 gate evidence.

## Gate

Machine-checkable:

- `tier-model.md` exists at expected path + all required sections present.
- `tier-model.json` exists at BOTH destinations as required QG-F1 evidence.
- JSON content validates:
  - `schema_version` present
  - `tier_count` is an integer in `{3, 4, 5, 6, 7}`
  - `custom_tiers_mode` is a boolean; `custom_tiers_mode == false` iff `tier_count == 5`
  - `tiers` is an array with exactly `tier_count` entries
  - Each tier has `id`, `price_per_month_usd`, `limits`, `features`, `rollout_tier_hint`, `cost_ceiling_usd_per_month_hint`, `upgrade_mode`, `upgrade_path`
  - `rollout_tier_hint` ∈ {`aggressive_canary`, `canary`, `blue_green_synthetics`, `blue_green_pilot`}
  - `upgrade_mode` ∈ {`self_service`, `sales_assisted`}
  - `upgrade_path` chain is consistent (each non-top tier points to the next; top tier is `null`)
  - `transitions.any_downgrade == "rate_arbitrage_check"`
  - `retention_window_days_hint` (P3.2 schema 1.1, optional in 5-default mode / required in custom-tier mode): integer in `[0, 36500]` per tier

## Next step

`step-06-c-record-adr.md`
