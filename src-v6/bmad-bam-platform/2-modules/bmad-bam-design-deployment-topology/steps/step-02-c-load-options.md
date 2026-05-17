---
step_id: 02-c-load-options
auto_runnable: true
gate: machine-checkable
inputs: [deployment-topology-context.json]
outputs: [options-loaded.json]
---

# Step 02 — Load rollout-strategy options filtered by tenancy_model

## Purpose

Load Atlas's rollout fragments + present the rollout primitives that are compatible with the tenancy model in force. Different tenancy models constrain which rollout primitives even make sense — per spec §3.Q3 coupling table:

- **rls** → `app-canary` primary; per-app-tier strategies viable; per-cell-blue-green NOT applicable (no cells).
- **schema-per-tenant** → `app-canary` viable + per-schema DB rollout adds tenant-level granularity; per-cell-blue-green NOT applicable.
- **cell-based** → `per-cell-blue-green` primary; cells are natural rollout boundaries; app-canary still possible inside a cell but the cell is the safer unit.
- **hybrid** → mix per tier (e.g., free/starter on RLS app-canary; enterprise on cell-based blue-green).

Filtering at this step prevents step-03 from scoring nonsensical combinations.

## Actions

1. Read the elicited context from `_bmad/bam/cache/deployment-topology-design/{date}/deployment-topology-context.json`. Extract `tenancy_model`.

2. Load the following Atlas fragments via Read tool. Resolve each path by trying these in order (first hit wins, per BMAD tool-specific install convention; this mirrors step-02 of design-tenancy-model):
   - `{project-root}/.claude/skills/bmad-bam-agent-atlas/resources/fragments/<name>.md` (claude-code)
   - `{project-root}/.cursor/skills/bmad-bam-agent-atlas/resources/fragments/<name>.md` (cursor)
   - `{project-root}/_bmad/bbp/bmad-bam-agent-atlas/resources/fragments/<name>.md` (BMAD-internal manifest path)

   Required fragments (drive the rollout primitive choice + cohorting):
   - `rollout-strategies-comparison` — blue-green vs canary vs rolling; trade-offs; tier-mapped defaults from spec §3.Q3b
   - `tenant-cohort-design` — by-tier vs by-region vs by-explicit-list vs by-tenant-hash; sticky-cohort principle
   - `rollback-strategies` — rollback budget per strategy; data-migration rollback constraints
   - `zero-downtime-migrations` — expand-contract migration discipline that protects every rollout strategy

   (Path notes: BMAD installs the bmad-bam-platform module's config at `_bmad/bbp/` but the persona-skill content lives at the tool-specific `<tool>/skills/<skill>/` per BMAD installer behavior. Workflow steps reference Atlas's fragments by Read-at-runtime rather than via persistent_facts `file:` entries — BMM convention — because explicit cross-skill `file:` paths do not resolve uniformly across tool dirs.)

3. **Filter rollout primitives by `tenancy_model`** per the coupling table above. Build the candidate list:

   | tenancy_model | Candidates considered |
   |---|---|
   | `rls` | `app-canary`, `hybrid` |
   | `schema-per-tenant` | `app-canary`, `per-schema-rollout`, `hybrid` |
   | `cell-based` | `per-cell-blue-green`, `app-canary` (intra-cell), `hybrid` |
   | `hybrid` | `app-canary`, `per-schema-rollout`, `per-cell-blue-green`, `hybrid` |

   If the user's `target_environments == "single-region"` AND the filtered list contains `per-cell-blue-green`, emit a `[WARN]` noting that per-cell-blue-green requires ≥ 2 environments to be meaningful (a one-cell deployment IS the prod environment). Keep the option in the candidate list but flag it for low scoring in step-03.

4. Present each candidate to the user, one paragraph each, drawn from the loaded fragments:

   - **app-canary** — Route a small fraction of traffic to the new version per region/cluster; promote in waves. Works on every tenancy model. Blast radius is request-percentage rather than tenant-set; rollback is fast (flip the router) but data-migration rollback is the chokepoint.
   - **per-schema-rollout** — Migrate + deploy one tenant schema at a time, in waves grouped by tier or risk. Only available for `schema-per-tenant` or `hybrid`. Blast radius is per-tenant; rollback is per-schema (slow if mass-rollback needed).
   - **per-cell-blue-green** — Stand up a parallel cell, drain tenants from blue → green by cohort, retire blue. Only available for `cell-based` or `hybrid` with multi-region+. Blast radius is per-cell; rollback is "stop draining" (fast). Highest infrastructure cost.
   - **hybrid** — Different primitives per tier (e.g., free/starter on app-canary; enterprise on per-cell-blue-green). Available for every tenancy model when the user wants tier-differentiated risk posture.

5. Present a comparison table: primitive, blast-radius, rollback-speed, infra-cost-multiplier, tier-tolerance-fit-bias.

6. Ask user: "Any primitives to remove from consideration before the decision matrix?"

7. Write `{project-root}/_bmad/bam/cache/deployment-topology-design/{date}/options-loaded.json`.

## Output

```json
{
  "schema_version": "1.0",
  "loaded_at": "<ISO-8601 UTC>",
  "tenancy_model": "<rls | schema-per-tenant | cell-based | hybrid>",
  "primitives_considered": ["app-canary", "per-schema-rollout", "per-cell-blue-green", "hybrid"],
  "primitives_eliminated_by_filter": ["<primitives filtered out by tenancy_model>"],
  "primitives_eliminated_by_user": [],
  "fragments_loaded": [
    "rollout-strategies-comparison",
    "tenant-cohort-design",
    "rollback-strategies",
    "zero-downtime-migrations"
  ]
}
```

Population rules:
- `primitives_considered` — the post-filter, post-user-elimination set (the survivors going into the matrix).
- `primitives_eliminated_by_filter` — primitives excluded by `tenancy_model` (e.g., `per-cell-blue-green` is removed for `rls`).
- `primitives_eliminated_by_user` — any primitives the user explicitly removed in step 6.
- `fragments_loaded` is non-empty; covers all 4 fragments above.

## Gate

Machine-checkable: file exists + `tenancy_model` non-empty + `primitives_considered` has between 1 and 4 entries + `fragments_loaded` non-empty.

## Next step

`step-03-c-decision-matrix.md`
