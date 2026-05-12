---
step_id: 06-c-record-adr
auto_runnable: true
gate: machine-checkable
inputs: [recommendation.json, tenancy-model.md]
outputs: [<NNN>-tenancy-model.md ADR]
---

# Step 06 — Record ADR in Atlas's sidecar

## Purpose

Per spec §4.3, capture every architectural decision as an ADR. This step appends to Atlas's `architecture-decisions/` directory.

## Actions

1. Determine the next ADR sequential number:

```bash
ADR_DIR="{project-root}/_bmad/_memory/atlas/architecture-decisions"
LAST_NNN=$(ls -1 "$ADR_DIR" 2>/dev/null | grep -oE '^[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{3}' | sort | tail -1 | cut -d- -f4 | sed 's/^0*//')
NEXT_NNN=$(printf "%03d" $((${LAST_NNN:-0} + 1)))
TODAY=$(date -u +%Y-%m-%d)
ADR_FILE="$ADR_DIR/$TODAY-$NEXT_NNN-tenancy-model.md"
```

2. Write the ADR per `std-adr` standard. Populate from `recommendation.json` + `tenancy-model.md` frontmatter.

3. Update `architecture-decisions/INDEX.md` — append a row with new ADR.

## Output

`_bmad/_memory/atlas/architecture-decisions/YYYY-MM-DD-NNN-tenancy-model.md` with frontmatter:

```yaml
---
id: YYYY-MM-DD-NNN
title: <Chosen option> for tenant isolation
status: accepted
date: YYYY-MM-DD
persona: atlas
related-personas: []
modules: [bmad-bam-platform]
supersedes: null
superseded-by: null
assumptions:
  - <from tenancy-context.json: tenant_count_12mo etc>
dependencies-on-other-decisions: []
generated-by: <model id>
authored-by: collaborative
---
```

Body per std-adr: Context, Decision, Consequences, Alternatives Considered.

## Gate

Machine-checkable: ADR file exists, has valid frontmatter, INDEX.md updated.

## Next step

`step-07-v-verify-completeness.md`
