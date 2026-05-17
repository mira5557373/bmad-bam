---
step_id: 02-c-load-options
auto_runnable: true
gate: machine-checkable
inputs: [finops-context.json]
outputs: [options-loaded.json]
---

# Step 02 — Load attribution-affordance options filtered by tenancy_model

## Purpose

Load Atlas's finops fragments + present the cost-attribution mechanisms that are compatible with the tenancy model in force. Different tenancy models constrain which storage-attribution affordance is even possible — per `per-tenant-cost-attribution-with-hooks` fragment + spec §3.R1:

- **rls** → `by_predicate` (RLS predicate column is the natural per-tenant row counter).
- **schema-per-tenant** → `by_schema` (per-schema row-counts via `information_schema`).
- **cell-based** → `by_cell_then_intra` (cell as billing unit + intra-cell by_predicate or by_schema).
- **hybrid** → `mixed` (per-tier mechanism: some tenants RLS, some schema, some cell).

Filtering at this step prevents step-03 from scoring attribution mechanisms that don't apply.

## Actions

1. Read the elicited context from `_bmad/bam/cache/finops-model-design/{date}/finops-context.json`. Extract `tenancy_model`.

2. Load the following Atlas fragments via Read tool. Resolve each path by trying these in order (first hit wins, per BMAD tool-specific install convention; this mirrors step-02 of design-tenancy-model + design-deployment-topology):
   - `{project-root}/.claude/skills/bmad-bam-agent-atlas/resources/fragments/<name>.md` (claude-code)
   - `{project-root}/.cursor/skills/bmad-bam-agent-atlas/resources/fragments/<name>.md` (cursor)
   - `{project-root}/_bmad/bbp/bmad-bam-agent-atlas/resources/fragments/<name>.md` (BMAD-internal manifest path)

   Required fragments (drive the attribution + budgeting choice):
   - `unit-economics-saas` — LTV / CAC / gross-margin frame; per-tenant unit cost reconciles to cloud bill
   - `per-tenant-cost-attribution-with-hooks` — compute / storage / network / third-party attribution per tenancy_model; instrumentation hooks
   - `cost-allocation-shared-resources` — shared-resource amortization (NAT, control plane, RDS proxy); proration rules
   - `budget-alerts-and-quotas` — per-tier alert thresholds; channel choice; quota-enforcement vs alert-only

   (Path notes: BMAD installs the bmad-bam-platform module's config at `_bmad/bbp/` but the persona-skill content lives at the tool-specific `<tool>/skills/<skill>/` per BMAD installer behavior. Workflow steps reference Atlas's fragments by Read-at-runtime rather than via persistent_facts `file:` entries — BMM convention — because explicit cross-skill `file:` paths do not resolve uniformly across tool dirs.)

3. **Filter storage-attribution affordances by `tenancy_model`** per the coupling table above. Build the candidate list:

   | tenancy_model | Storage-attribution candidates |
   |---|---|
   | `rls` | `by_predicate` |
   | `schema-per-tenant` | `by_schema` |
   | `cell-based` | `by_cell_then_intra` |
   | `hybrid` | `mixed` (per-tier: caller chooses per-tier mechanism) |

   Compute / network / third-party attribution mechanisms are NOT tenancy-coupled (they apply uniformly across tenancy models — per-request tagging at the gateway works the same regardless of where storage lives). Step-03 will score the full set including these.

   Build `primitives_considered` = 4 attribution mechanisms × the tenancy-filtered storage option. In practice the 4 options to score are:
   - `compute: tenant_id_in_trace_span` (always)
   - `storage: <filtered per tenancy_model>`
   - `network: tenant_context_header` (always)
   - `third_party: tenant_aware_client_logging` (always)

   Plus the budgeting strategy choice (loaded for step-03):
   - `alert-only` — emit on threshold breach; do not enforce.
   - `quota-soft` — alert + grace period (24h) before enforcement.
   - `quota-hard` — block requests on threshold breach.
   - `mixed-per-tier` — different strategies per tier (e.g., free=hard, enterprise=alert).

4. Present each attribution mechanism + budgeting strategy to the user, one paragraph each, drawn from the loaded fragments:

   - **compute attribution (`tenant_id_in_trace_span`)** — every request span / log line carries `tenant_id`; rollups aggregate per-tenant compute cost from APM spans + cloud-bill compute lines. Works on every tenancy model. CRITICAL: cost-per-tenant rollup must reconcile to cloud-bill total within 95% — unattributed compute is a red flag (per `per-tenant-cost-attribution-with-hooks` fragment).
   - **storage attribution (filtered)** — `by_predicate` (RLS-row-count), `by_schema` (per-schema sizes), or `by_cell_then_intra` (cell as coarse unit, intra-cell RLS/schema). Tenancy-coupled.
   - **network attribution (`tenant_context_header`)** — egress / data-transfer charges attributed via `X-Tenant-Id` header at the gateway; egress logs aggregated per tenant. Works on every tenancy model.
   - **third-party attribution (`tenant_aware_client_logging`)** — wrapped clients (OpenAI, Stripe, S3 cross-region) log per-call cost + `tenant_id`; nightly job aggregates. CRITICAL for AI workloads: token cost is often the largest variable cost.

5. Present a comparison table: mechanism, instrumentation cost (1=cheap, 5=expensive), accuracy (% of bill attributable), blast radius if instrumentation fails (1=isolated, 5=systemic).

6. Ask user: "Any attribution mechanisms or budgeting strategies to remove from consideration before the decision matrix?"

7. Write `{project-root}/_bmad/bam/cache/finops-model-design/{date}/options-loaded.json`.

## Output

```json
{
  "schema_version": "1.0",
  "loaded_at": "<ISO-8601 UTC>",
  "tenancy_model": "<rls | schema-per-tenant | cell-based | hybrid>",
  "attribution_mechanisms": {
    "compute": "tenant_id_in_trace_span",
    "storage": "by_predicate | by_schema | by_cell_then_intra | mixed",
    "network": "tenant_context_header",
    "third_party": "tenant_aware_client_logging"
  },
  "budgeting_strategies_considered": ["alert-only", "quota-soft", "quota-hard", "mixed-per-tier"],
  "budgeting_strategies_eliminated_by_user": [],
  "fragments_loaded": [
    "unit-economics-saas",
    "per-tenant-cost-attribution-with-hooks",
    "cost-allocation-shared-resources",
    "budget-alerts-and-quotas"
  ]
}
```

Population rules:
- `attribution_mechanisms.storage` — set from the tenancy-filter table above (one of `by_predicate` / `by_schema` / `by_cell_then_intra` / `mixed`).
- `attribution_mechanisms.compute` / `network` / `third_party` — fixed defaults; user may override in step-04.
- `budgeting_strategies_considered` — post-user-elimination set (the survivors going into the matrix).
- `fragments_loaded` is non-empty; covers all 4 fragments above.

## Gate

Machine-checkable: file exists + `tenancy_model` non-empty + `attribution_mechanisms.storage` matches the tenancy_model filter + `budgeting_strategies_considered` has between 1 and 4 entries + `fragments_loaded` non-empty.

## Next step

`step-03-c-decision-matrix.md`
