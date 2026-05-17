---
step_id: 06-c-record-adr
auto_runnable: true
gate: machine-checkable
inputs: [recommendation.json, tier-model.md]
outputs: [<NNN>-tenant-tier-model-decision.md ADR]
---

# Step 06 — Record ADR in Atlas's sidecar

## Purpose

Per spec §4.3, every architectural decision is captured as a project-level ADR. This step writes the tier-model decision to Atlas's `architecture-decisions/` directory and appends a row to `INDEX.md`.

## Actions

1. Read `recommendation.json` from the cache dir.

2. Determine the next ADR sequential number from the existing index:

```bash
ADR_DIR="{project-root}/_bmad/_memory/atlas/architecture-decisions"
LAST_NNN=$(ls -1 "$ADR_DIR" 2>/dev/null | grep -oE '^[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{3}' | sort | tail -1 | cut -d- -f4 | sed 's/^0*//')
NEXT_NNN=$(printf "%03d" $((${LAST_NNN:-0} + 1)))
TODAY=$(date -u +%Y-%m-%d)
ADR_FILE="$ADR_DIR/$TODAY-$NEXT_NNN-tenant-tier-model-decision.md"
```

3. Write the ADR per `std-adr` standard. Populate from `recommendation.json` + `tier-model.md` frontmatter. Required sections: **Context, Decision, Consequences, Alternatives Considered, Revisit triggers**.

4. Update `architecture-decisions/INDEX.md` — append a row with the new ADR (id, title, status, date, persona, link).

## Output

`_bmad/_memory/atlas/architecture-decisions/YYYY-MM-DD-NNN-tenant-tier-model-decision.md` with frontmatter:

```yaml
---
id: YYYY-MM-DD-NNN
title: <tier_count>-tier model (custom_tiers_mode=<true|false>) for tenant tier matrix
status: accepted
date: YYYY-MM-DD
persona: atlas
related-personas: []
modules: [bmad-bam-platform]
supersedes: null
superseded-by: null
assumptions:
  - <from tier-model-context.json: target_tenant_types, pricing_strategy, business_model_maturity, tenancy_model>
dependencies-on-other-decisions:
  - <NNN>-tenancy-model  # if tenancy-decision.json was present at step-01
generated-by: <model id>
authored-by: collaborative
---
```

Body sections per std-adr:

- **Context** — paraphrased from `tier-model-context.json` (target tenant types, pricing strategy, business-model maturity, tenancy_model if known).
- **Decision** — `tier_count` + `custom_tiers_mode` + final tier ids + confidence + 2-3 sentence rationale from `recommendation.json`. Note the downstream-contract hints emitted in `tier-model.json` (`rollout_tier_hint`, `cost_ceiling_usd_per_month_hint`, `upgrade_mode`) — these are defaults for `design-deployment-topology` and `design-finops-model` and may be overridden downstream.
- **Consequences** — positive (e.g., clear upgrade path; finops + deployment skills pre-fillable) + negative (e.g., tier matrix is hard to change after first paid customers; each tier added is a permanent UX surface).
- **Alternatives Considered** — collapsed tiers from `recommendation.collapsed_tiers` (one-sentence rejection each); the 5-default scaffold (if not chosen); a 3-tier minimalist scaffold (if not chosen).
- **Revisit triggers** — explicit conditions that should force re-evaluation (e.g., "if a tier's churn exceeds 15% monthly, evaluate collapsing into the next-lower tier"; "if `cost_ceiling_usd_per_month_hint` is exceeded for ≥ 10% of tenants in a tier for ≥ 2 quarters, revisit the limit set").

## Gate

Machine-checkable: ADR file exists at expected path + has valid frontmatter (id, title, status, date, persona) + INDEX.md updated with new row.

## Next step

`step-07-v-verify-completeness.md`
