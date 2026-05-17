---
step_id: 06-c-record-adr
auto_runnable: true
gate: machine-checkable
inputs: [recommendation.json, module-decomposition.md]
outputs: [<NNN>-modular-monolith-decision.md ADR]
---

# Step 06 — Record ADR in Atlas's sidecar

## Purpose

Per spec §4.3, every architectural decision is captured as a project-level ADR. This step writes the decomposition decision to Atlas's `architecture-decisions/` directory and appends a row to `INDEX.md`.

## Actions

1. Read `recommendation.json` from the cache dir.

2. Determine the next ADR sequential number from the existing index:

```bash
ADR_DIR="{project-root}/_bmad/_memory/atlas/architecture-decisions"
LAST_NNN=$(ls -1 "$ADR_DIR" 2>/dev/null | grep -oE '^[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{3}' | sort | tail -1 | cut -d- -f4 | sed 's/^0*//')
NEXT_NNN=$(printf "%03d" $((${LAST_NNN:-0} + 1)))
TODAY=$(date -u +%Y-%m-%d)
ADR_FILE="$ADR_DIR/$TODAY-$NEXT_NNN-modular-monolith-decision.md"
```

3. Write the ADR per `std-adr` standard. Populate from `recommendation.json` + `module-decomposition.md` frontmatter. Required sections: **Context, Decision, Consequences, Alternatives Considered, Revisit triggers**.

4. Update `architecture-decisions/INDEX.md` — append a row with the new ADR (id, title, status, date, persona, link).

## Output

`_bmad/_memory/atlas/architecture-decisions/YYYY-MM-DD-NNN-modular-monolith-decision.md` with frontmatter:

```yaml
---
id: YYYY-MM-DD-NNN
title: <chosen-option> decomposition for modular monolith
status: accepted
date: YYYY-MM-DD
persona: atlas
related-personas: []
modules: [bmad-bam-platform]
supersedes: null
superseded-by: null
assumptions:
  - <from modular-monolith-context.json: team_size, codebase_status, tenancy_model>
dependencies-on-other-decisions:
  - <NNN>-tenancy-model  # if tenancy-decision.json was present at step-01
generated-by: <model id>
authored-by: collaborative
---
```

Body sections per std-adr:

- **Context** — paraphrased from `modular-monolith-context.json` (domain, team, codebase, tenancy).
- **Decision** — chosen option + confidence + 2-3 sentence rationale from `recommendation.json`.
- **Consequences** — positive (e.g., clearer ownership boundaries) + negative (e.g., adapter-port discipline overhead for hybrid).
- **Alternatives Considered** — the 3 unchosen options with one-sentence rejection reason each.
- **Revisit triggers** — explicit conditions that should force re-evaluation (e.g., "if domain complexity grows past 8 bounded contexts, evaluate splitting into separate deployable services").

## Gate

Machine-checkable: ADR file exists at expected path + has valid frontmatter (id, title, status, date, persona) + INDEX.md updated with new row.

## Next step

`step-07-v-verify-completeness.md`
