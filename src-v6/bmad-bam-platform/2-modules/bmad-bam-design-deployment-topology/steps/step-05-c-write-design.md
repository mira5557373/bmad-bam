---
step_id: 05-c-write-design
auto_runnable: false
gate: machine-checkable
inputs: [deployment-topology-context.json, decision-matrix.json, recommendation.json]
outputs: [deployment-topology.md, deployment-topology.json]
template_ref: deployment-topology.md.template
---

# Step 05 — Write the deployment-topology design doc

## Purpose

Produce a `deployment-topology.md` design doc (human-readable narrative) and a `deployment-topology.json` machine-readable contract. The JSON is QG-F1 evidence and is consumed by `design-finops-model` (per-tenant attribution must align with the cohort strategy) and the Phase 7 `verify-coherence` step (cross-skill consistency — `rollout_per_tier` keys must cover all tier ids declared in tier-model.json).

## Actions

1. Read inputs from `_bmad/bam/cache/deployment-topology-design/{date}/`:
   - `deployment-topology-context.json` — tenancy_model, target envs, risk_tolerance_per_tier, rollback_sla, cicd_platform
   - `decision-matrix.json` — per-primitive scores
   - `recommendation.json` — chosen rollout_primitive + rollout_per_tier mapping + confidence + rationale

2. Read template at `../templates/deployment-topology.md.template` (skill-relative; BMM convention).

3. **Elicit `tenant_cohort_strategy` from the user.** Anchored by the `tenant-cohort-design` fragment. Allowed values:

   - `by-tenant-id-hash` — deterministic hash on `tenant_id` partitions tenants into rollout waves. Good default for `app-canary` on `rls`. Sticky across rollouts (per fragment CRITICAL).
   - `by-region` — tenants grouped by data residency region. Good fit for multi-region + global. Required when residency contracts pin tenants to a region.
   - `by-tier` — cohort = tier. Natural fit when `rollout_primitive == "hybrid"` (each tier already has its own per-tier strategy).
   - `by-explicit-list` — operator-managed cohort assignment. Reserved for white-glove enterprise tenants with named-account contracts.

   Coherence hint: present the option that best matches the context up-front, but accept user override.

4. **Elicit `rollback_strategy` details** as a free-text description capturing how the team will execute a rollback under the chosen primitive within the `rollback_sla` from context. The `rollback-strategies` fragment supplies a template (action steps + ownership + rollback budget); the user fills in the specifics for their CI/CD platform.

5. For each tier id in `recommendation.json#rollout_per_tier`, verify the value is in `{aggressive_canary, canary, blue_green_synthetics, blue_green_pilot}`. If a tier-model.json was discovered in step-01 (`tier_model_path` non-empty), verify that the keys of `rollout_per_tier` are a SUPERSET of the tier ids declared in `tier-model.json#tiers[*].id`. If a tier id from tier-model.json is missing in `rollout_per_tier`, return to step-04 and elicit a strategy for it before proceeding (this is the cross-skill coherence check the Phase 7 verify-coherence step also enforces).

6. Substitute template placeholders with values from the inputs + elicited tenant_cohort_strategy + elicited rollback_strategy. Write the populated narrative to `{project-root}/docs/architecture/deployment-topology.md` (ensure parent dir via `mkdir -p`).

7. Write the machine-readable contract `deployment-topology.json` to BOTH locations (ensure parent dirs):
   - `{project-root}/docs/architecture/deployment-topology.json` (human-visible copy alongside narrative)
   - `{project-root}/_bmad/bam/evidence/QG-F1/deployment-topology.json` (gate-evidence pointer for QG-F1)

   JSON schema (exact, per spec §3):

   ```json
   {
     "schema_version": "1.0",
     "decided_at": "<ISO-8601 UTC>",
     "rollout_primitive": "app-canary | per-schema-rollout | per-cell-blue-green | hybrid",
     "rollout_per_tier": {
       "free": "aggressive_canary",
       "starter": "canary",
       "pro": "canary",
       "business": "blue_green_synthetics",
       "enterprise": "blue_green_pilot"
     },
     "tenant_cohort_strategy": "by-tenant-id-hash | by-region | by-tier | by-explicit-list",
     "rollback_strategy": "<description>",
     "tenancy_input_ref": "_bmad/bam/evidence/QG-F1/tenancy-decision.json"
   }
   ```

   Population rules:
   - `rollout_primitive` carries forward from `recommendation.json`.
   - `rollout_per_tier` carries forward from `recommendation.json`.
   - `tenant_cohort_strategy` from step-3 elicitation (above).
   - `rollback_strategy` from step-4 elicitation (above).
   - `tenancy_input_ref` is fixed to `_bmad/bam/evidence/QG-F1/tenancy-decision.json` (the canonical evidence path; the resolver in step-01 may have read either path but downstream skills reference the evidence canonical).

## Output

1. `{project-root}/docs/architecture/deployment-topology.md` — design doc. Sections (mirrors template):
   - Frontmatter (yaml): id, title, status (`draft`), date, persona (`atlas`), workflow_run_id
   - ## Decision: `rollout_primitive` + confidence
   - ## Tenancy alignment: how the primitive maps to the chosen `tenancy_model`
   - ## Per-tier rollout matrix (table from `rollout_per_tier`)
   - ## Tenant cohort strategy: `tenant_cohort_strategy` + rationale + sticky-cohort note
   - ## Rollback strategy: `rollback_strategy` + `rollback_sla` from context
   - ## Quality gate references (QG-F1)
   - ## Next steps (link to design-finops-model)

2. `{project-root}/docs/architecture/deployment-topology.json` — machine-readable contract (schema above).

3. `{project-root}/_bmad/bam/evidence/QG-F1/deployment-topology.json` — identical content written as QG-F1 gate evidence.

## Gate

Machine-checkable:

- `deployment-topology.md` exists at expected path + all required sections present.
- `deployment-topology.json` exists at BOTH destinations as required QG-F1 evidence.
- JSON content validates:
  - `schema_version` present
  - `rollout_primitive` ∈ {`app-canary`, `per-schema-rollout`, `per-cell-blue-green`, `hybrid`}
  - `rollout_per_tier` is an object with ≥ 1 entry; each value ∈ {`aggressive_canary`, `canary`, `blue_green_synthetics`, `blue_green_pilot`}
  - **`rollout_per_tier` keys are a SUPERSET of tier ids in `tier-model.json#tiers[*].id`** (when tier-model.json is available; if absent, this check is skipped with a `[WARN]`)
  - `tenant_cohort_strategy` ∈ {`by-tenant-id-hash`, `by-region`, `by-tier`, `by-explicit-list`}
  - `rollback_strategy` is a non-empty string
  - `tenancy_input_ref` is the fixed string `_bmad/bam/evidence/QG-F1/tenancy-decision.json`

## Next step

`step-06-c-record-adr.md`
