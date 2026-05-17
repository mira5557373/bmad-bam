---
step_id: 06-c-record-adr
auto_runnable: true
gate: machine-checkable
inputs: [recommendation.json, deployment-topology.md]
outputs: [<NNN>-deployment-topology-decision.md ADR]
---

# Step 06 — Record ADR in Atlas's sidecar

## Purpose

Per spec §4.3, every architectural decision is captured as a project-level ADR. This step writes the deployment-topology decision to Atlas's `architecture-decisions/` directory and appends a row to `INDEX.md`. The ADR records the rollout-primitive choice + per-tier mapping + cohort strategy + rollback strategy as a single, citable decision unit.

## Actions

1. Read `recommendation.json` + `deployment-topology-context.json` from the cache dir.

2. Determine the next ADR sequential number from the existing index:

```bash
ADR_DIR="{project-root}/_bmad/_memory/atlas/architecture-decisions"
LAST_NNN=$(ls -1 "$ADR_DIR" 2>/dev/null | grep -oE '^[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{3}' | sort | tail -1 | cut -d- -f4 | sed 's/^0*//')
NEXT_NNN=$(printf "%03d" $((${LAST_NNN:-0} + 1)))
TODAY=$(date -u +%Y-%m-%d)
ADR_FILE="$ADR_DIR/$TODAY-$NEXT_NNN-deployment-topology-decision.md"
```

3. Write the ADR per `std-adr` standard. Populate from `recommendation.json` + `deployment-topology-context.json` + `deployment-topology.md` frontmatter. Required sections: **Context, Decision, Consequences, Alternatives Considered, Revisit triggers**.

4. Update `architecture-decisions/INDEX.md` — append a row with the new ADR (id, title, status, date, persona, link).

## Output

`_bmad/_memory/atlas/architecture-decisions/YYYY-MM-DD-NNN-deployment-topology-decision.md` with frontmatter:

```yaml
---
id: YYYY-MM-DD-NNN
title: <rollout_primitive> rollout primitive with <tenant_cohort_strategy> cohorts
status: accepted
date: YYYY-MM-DD
persona: atlas
related-personas: []
modules: [bmad-bam-platform]
supersedes: null
superseded-by: null
assumptions:
  - <from deployment-topology-context.json: tenancy_model, target_environments, risk_tolerance_per_tier, rollback_sla, cicd_platform>
dependencies-on-other-decisions:
  - <NNN>-tenancy-model  # REQUIRED upstream; the tenancy decision constrains rollout primitive
  - <NNN>-tenant-tier-model  # SOFT; if present, drove the rollout_per_tier mapping
generated-by: <model id>
authored-by: collaborative
---
```

Body sections per std-adr:

- **Context** — paraphrased from `deployment-topology-context.json` (tenancy_model, target_environments, risk_tolerance_per_tier mix, rollback_sla, cicd_platform). Cite the REQUIRED upstream dependency on tenancy-decision.json.
- **Decision** — `rollout_primitive` + `tenant_cohort_strategy` + `rollback_strategy` + per-tier mapping table + confidence + 2-3 sentence rationale from `recommendation.json`. Note the downstream contract emitted in `deployment-topology.json` (`rollout_per_tier` covers all tier ids, satisfying the Phase 7 verify-coherence check).
- **Consequences** — positive (e.g., per-tier rollout aligns deploy risk with tier risk-tolerance; tenant cohorts are sticky so debugging cross-rollout regressions is tractable) + negative (e.g., `per-cell-blue-green` doubles infrastructure cost; `hybrid` adds operational surface area; `by-explicit-list` cohorting requires ongoing operator attention).
- **Alternatives Considered** — primitives in `decision-matrix.json#matrix` that were not chosen (one-sentence rejection each, referencing the axis where they fell short). Any primitives in `weak_primitives` MUST appear here even if not the top choice.
- **Revisit triggers** — explicit conditions that force re-evaluation (e.g., "if rollback SLA is breached on ≥ 1 deploy per quarter, revisit primitive choice"; "if tenant count exceeds 10× the level assumed at decision time, revisit cohort strategy"; "if tenancy model changes, this decision MUST be re-derived from scratch — tenancy is load-bearing").

## Gate

Machine-checkable: ADR file exists at expected path + has valid frontmatter (id, title, status, date, persona) + INDEX.md updated with new row.

## Next step

`step-07-v-verify-completeness.md`
