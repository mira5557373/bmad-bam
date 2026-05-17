---
step_id: 05-c-write-design
auto_runnable: false
gate: machine-checkable
inputs: [finops-context.json, decision-matrix.json, recommendation.json]
outputs: [finops-baseline.md, finops-baseline.json]
template_ref: finops-baseline.md.template
---

# Step 05 — Write the finops-baseline design doc

## Purpose

Produce a `finops-baseline.md` design doc (human-readable narrative) and a `finops-baseline.json` machine-readable contract per spec §3.R1. The JSON is QG-F1 keystone evidence — consumed by every downstream gate that audits COGS / unit-economics, and by step-08's verify-coherence to cross-check tier-model.json hints against finops actuals.

## Actions

1. Read inputs from `_bmad/bam/cache/finops-model-design/{date}/`:
   - `finops-context.json` — tenancy_model, tier_count, rollout_primitive, gross_margin_target_pct, pricing_maturity, cloud_provider, instrumentation_maturity
   - `decision-matrix.json` — per-option scores
   - `recommendation.json` — chosen attribution + budgeting strategy + cost_ceiling_per_tier + budget_alert_thresholds + confidence + rationale

2. Read template at `../templates/finops-baseline.md.template` (skill-relative; BMM convention).

3. **Elicit unit-economics inputs from the user** (final values for the JSON contract). Anchored by the `unit-economics-saas` fragment:

   - `ltv_estimate_usd` — best estimate of lifetime value per tenant; integer USD. Pre-revenue → use comparable-company benchmark; established → use actual cohort LTV.
   - `cac_estimate_usd` — customer acquisition cost; integer USD. Includes paid + organic + sales + onboarding.
   - `gross_margin_target_pct` — carried forward from `finops-context.json` (already elicited in step-01); user may revise.

   Coherence hint: `ltv_estimate_usd / cac_estimate_usd ≥ 3` is the SaaS rule of thumb; if user inputs violate this, emit `[WARN]` and ask whether to proceed.

4. Substitute template placeholders with values from the inputs + elicited unit-economics. Write the populated narrative to `{project-root}/docs/architecture/finops-baseline.md` (ensure parent dir via `mkdir -p`).

5. Write the machine-readable contract `finops-baseline.json` to BOTH locations (ensure parent dirs):
   - `{project-root}/docs/architecture/finops-baseline.json` (human-visible copy alongside narrative)
   - `{project-root}/_bmad/bam/evidence/QG-F1/finops-baseline.json` (gate-evidence pointer for QG-F1)

   JSON schema (exact, per spec §3.R1):

   ```json
   {
     "schema_version": "1.0",
     "decided_at": "<ISO-8601 UTC>",
     "unit_economics": {
       "ltv_estimate_usd": 0,
       "cac_estimate_usd": 0,
       "gross_margin_target_pct": 0
     },
     "per_tenant_attribution": {
       "compute": "tenant_id_in_trace_span",
       "storage": "by_predicate | by_schema | by_cell_then_intra",
       "network": "tenant_context_header",
       "third_party": "tenant_aware_client_logging"
     },
     "cost_ceiling_per_tier": {
       "free": 0.50,
       "starter": 5.00,
       "pro": 25.00,
       "business": 125.00,
       "enterprise": 625.00
     },
     "budget_alert_thresholds": [
       { "tier": "<id>", "alert_at_pct_of_ceiling": 80, "channel": "slack | email | pagerduty" }
     ],
     "tenancy_input_ref": "_bmad/bam/evidence/QG-F1/tenancy-decision.json",
     "tier_input_ref": "_bmad/bam/evidence/QG-F1/tier-model.json",
     "deployment_input_ref": "_bmad/bam/evidence/QG-F1/deployment-topology.json"
   }
   ```

   Population rules:
   - `unit_economics.{ltv_estimate_usd, cac_estimate_usd, gross_margin_target_pct}` from step-3 elicitation above.
   - `per_tenant_attribution.*` carries forward from `recommendation.json`.
   - `cost_ceiling_per_tier` carries forward from `recommendation.json`.
   - `budget_alert_thresholds` carries forward from `recommendation.json`.
   - `tenancy_input_ref` is fixed to `_bmad/bam/evidence/QG-F1/tenancy-decision.json` (canonical evidence path).
   - `tier_input_ref` is fixed to `_bmad/bam/evidence/QG-F1/tier-model.json` (canonical evidence path).
   - `deployment_input_ref` is fixed to `_bmad/bam/evidence/QG-F1/deployment-topology.json` (canonical evidence path).

## Output

1. `{project-root}/docs/architecture/finops-baseline.md` — design doc. Sections (mirrors template):
   - Frontmatter (yaml): id, title, status (`draft`), date, persona (`atlas`), workflow_run_id
   - ## Decision: attribution + budgeting + confidence
   - ## Unit economics: LTV / CAC / gross-margin
   - ## Per-tenant attribution table (compute / storage / network / third-party)
   - ## Cost ceilings per tier (table)
   - ## Budget alerts (table)
   - ## Cross-references (upstream artifacts)
   - ## Quality gate references (QG-F1)
   - ## Next steps

2. `{project-root}/docs/architecture/finops-baseline.json` — machine-readable contract (schema above).

3. `{project-root}/_bmad/bam/evidence/QG-F1/finops-baseline.json` — identical content written as QG-F1 gate evidence.

## Gate

Machine-checkable:

- `finops-baseline.md` exists at expected path + all required sections present.
- `finops-baseline.json` exists at BOTH destinations as required QG-F1 evidence.
- JSON content validates:
  - `schema_version` present
  - `unit_economics.gross_margin_target_pct` ∈ [0, 100]
  - `per_tenant_attribution.storage` ∈ {`by_predicate`, `by_schema`, `by_cell_then_intra`, `mixed`}
  - `cost_ceiling_per_tier` is an object with ≥ 1 entry; each value is a non-negative number
  - `budget_alert_thresholds` is an array of objects with `tier`, `alert_at_pct_of_ceiling` ∈ [50, 100], `channel` ∈ {`slack`, `email`, `pagerduty`}
  - `tenancy_input_ref` is the fixed string `_bmad/bam/evidence/QG-F1/tenancy-decision.json`
  - `tier_input_ref` is the fixed string `_bmad/bam/evidence/QG-F1/tier-model.json`
  - `deployment_input_ref` is the fixed string `_bmad/bam/evidence/QG-F1/deployment-topology.json`

## Next step

`step-06-c-record-adr.md`
