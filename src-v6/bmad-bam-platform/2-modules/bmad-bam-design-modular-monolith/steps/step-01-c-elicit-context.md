---
step_id: 01-c-elicit-context
auto_runnable: false
gate: machine-checkable
inputs: []
outputs: [modular-monolith-context.json]
---

# Step 01 — Elicit context from user

## Purpose

Gather the empirical inputs that drive the modular-monolith decomposition decision: domain shape, team capacity, codebase maturity, and whether a tenancy decision is already in hand. These inputs feed every subsequent step.

## Actions

Ask the user the following questions, one at a time. Wait for answers. Don't accept vague responses ("medium team" → ask for a number).

1. **Domain summary** — 2-3 sentences describing the product domain. (Used by step-02 to ground the options discussion.)
2. **Team size** — `solo` / `2-5` / `5-20` / `20+`. (Drives module-count heuristics: small teams build fewer, larger modules.)
3. **Codebase status** — `greenfield` / `brownfield-monolith` / `brownfield-microservices`. (Migration cost penalty in step-03.)
4. **Tenancy decision available** — `yes` / `no`. If `yes`, we'll soft-read `tenancy-decision.json` so the decomposition can honor tenant-aware boundaries.

After eliciting, check whether a prior tenancy decision exists (soft input — does not block if missing):

```bash
TENANCY_PRIMARY="{project-root}/docs/architecture/tenancy-decision.json"
TENANCY_ALT="{project-root}/_bmad/bam/evidence/QG-F1/tenancy-decision.json"
TENANCY_PATH=""
TENANCY_MODEL=""
if [ -f "$TENANCY_PRIMARY" ]; then
    TENANCY_PATH="$TENANCY_PRIMARY"
elif [ -f "$TENANCY_ALT" ]; then
    TENANCY_PATH="$TENANCY_ALT"
fi
if [ -n "$TENANCY_PATH" ]; then
    TENANCY_MODEL=$(python3 -c "import json; print(json.load(open('$TENANCY_PATH')).get('tenancy_model',''))")
    echo "[info] tenancy-decision.json loaded ($TENANCY_MODEL) from $TENANCY_PATH"
else
    echo "[WARN] tenancy-decision.json not found at primary or alt path; proceeding with tenancy_model unset."
    echo "       Downstream bounded-context decisions will assume tenant-aware boundaries are TBD."
fi
```

Write `{project-root}/_bmad/bam/cache/modular-monolith-design/{date}/modular-monolith-context.json` (ensure parent dir via `mkdir -p`).

## Output

```json
{
  "schema_version": "1.0",
  "elicited_at": "<ISO-8601 UTC>",
  "domain_summary": "<2-3 sentences>",
  "team_size": "solo | 2-5 | 5-20 | 20+",
  "codebase_status": "greenfield | brownfield-monolith | brownfield-microservices",
  "tenancy_decision_path": "<absolute path or empty string>",
  "tenancy_model": "<rls | schema-per-tenant | cell-based | hybrid or empty string>"
}
```

Population rules:
- `tenancy_decision_path` — populated if either soft-input path resolved; empty string if both missing.
- `tenancy_model` — pulled from the soft-input JSON if available; empty string otherwise (downstream steps treat empty as "TBD").

## Gate

Machine-checkable: file exists at expected path + `schema_version`, `domain_summary`, `team_size`, `codebase_status` all populated. `tenancy_decision_path` and `tenancy_model` may be empty (soft input).

## Next step

`step-02-c-load-options.md`
