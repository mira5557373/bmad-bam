---
step_id: 06-c-record-adr
auto_runnable: true
gate: machine-checkable
inputs: [recommendation.json, finops-baseline.md]
outputs: [<NNN>-finops-model-decision.md ADR]
---

# Step 06 — Record ADR in Atlas's sidecar

## Purpose

Per spec §4.3, every architectural decision is captured as a project-level ADR. This step writes the finops-model decision to Atlas's `architecture-decisions/` directory and appends a row to `INDEX.md`. The ADR records the attribution mechanism set + budgeting strategy + per-tier cost ceilings + unit-economics frame as a single, citable decision unit.

## Actions

1. Read `recommendation.json` + `finops-context.json` from the cache dir.

2. Determine the next ADR sequential number from the existing index:

```bash
ADR_DIR="{project-root}/_bmad/_memory/atlas/architecture-decisions"
LAST_NNN=$(ls -1 "$ADR_DIR" 2>/dev/null | grep -oE '^[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{3}' | sort | tail -1 | cut -d- -f4 | sed 's/^0*//')
NEXT_NNN=$(printf "%03d" $((${LAST_NNN:-0} + 1)))
TODAY=$(date -u +%Y-%m-%d)
ADR_FILE="$ADR_DIR/$TODAY-$NEXT_NNN-finops-model-decision.md"
```

3. Write the ADR per `std-adr` standard. Populate from `recommendation.json` + `finops-context.json` + `finops-baseline.md` frontmatter. Required sections: **Context, Decision, Consequences, Alternatives Considered, Revisit triggers**.

4. Update `architecture-decisions/INDEX.md` — append a row with the new ADR (id, title, status, date, persona, link).

## Output

`_bmad/_memory/atlas/architecture-decisions/YYYY-MM-DD-NNN-finops-model-decision.md` with frontmatter:

```yaml
---
id: YYYY-MM-DD-NNN
title: <storage-attribution> attribution with <budgeting_strategy> budgeting
status: accepted
date: YYYY-MM-DD
persona: atlas
related-personas: []
modules: [bmad-bam-platform]
supersedes: null
superseded-by: null
assumptions:
  - <from finops-context.json: tenancy_model, tier_count, rollout_primitive, gross_margin_target_pct, pricing_maturity, cloud_provider, instrumentation_maturity>
dependencies-on-other-decisions:
  - <NNN>-tenancy-model       # REQUIRED upstream; tenancy filters storage attribution mechanism
  - <NNN>-tenant-tier-model   # REQUIRED upstream; tiers drive cost_ceiling_per_tier
  - <NNN>-deployment-topology # REQUIRED upstream; rollout primitive informs infra-cost cohorting
generated-by: <model id>
authored-by: collaborative
---
```

Body sections per std-adr:

- **Context** — paraphrased from `finops-context.json` (tenancy_model, tier_count, rollout_primitive, gross_margin_target_pct, pricing_maturity, cloud_provider, instrumentation_maturity). Cite the 3 REQUIRED upstream dependencies (tenancy-decision.json + tier-model.json + deployment-topology.json).
- **Decision** — `per_tenant_attribution` set + `budgeting_strategy` + cost_ceiling_per_tier table + budget_alert_thresholds table + unit_economics frame + confidence + 2-3 sentence rationale from `recommendation.json`. Note that finops-baseline.json is QG-F1 keystone evidence consumed by every downstream COGS / unit-economics audit.
- **Consequences** — positive (e.g., per-tenant cost visibility enables data-driven pricing; budget alerts catch runaway tenants before they erode gross margin; cost-ceiling-per-tier aligns infra cost to billed price) + negative (e.g., `tenant_id_in_trace_span` requires instrumentation discipline; `by_cell_then_intra` adds intra-cell joining overhead; `quota-hard` on `greenfield` instrumentation risks false positives blocking paying tenants).
- **Alternatives Considered** — mechanisms/strategies in `decision-matrix.json` not chosen (one-sentence rejection each, referencing the axis where they fell short). Any options in `weak_options` MUST appear here even if not the top choice.
- **Revisit triggers** — explicit conditions that force re-evaluation (e.g., "if gross margin slips below `gross_margin_target_pct - 10%` for two consecutive quarters, revisit cost-ceiling-per-tier"; "if instrumentation_maturity advances from `greenfield` to `partial`, revisit budgeting strategy"; "if tenancy model or tier model changes, this decision MUST be re-derived from scratch — both are load-bearing").

## Gate

Machine-checkable: ADR file exists at expected path + has valid frontmatter (id, title, status, date, persona) + INDEX.md updated with new row.

## Next step

`step-07-v-verify-completeness.md`
