---
step_id: 01-c-elicit-context
auto_runnable: false
gate: machine-checkable
inputs: [tenancy-decision.json]
outputs: [deployment-topology-context.json]
---

# Step 01 — Elicit deployment-topology context (REQUIRES tenancy-decision.json)

## Purpose

Gather the empirical inputs that drive the rollout topology decision: which tenancy model is in force (REQUIRED upstream), target deployment environments, per-tier risk tolerance, rollback SLA, and CI/CD platform. Tenancy choice is load-bearing for rollout cohorting — per spec §2.3 (coupling matrix) + Q3 lock-in this skill REFUSES to run if `tenancy-decision.json` is missing.

## Required input precondition check

Per ADR-015 enforcement-mechanism note (G4 spec), this skill enforces the upstream contract at step-01 entry **before** any user elicitation. The check searches both BAM-canonical evidence path and the human-visible architecture path; if neither resolves, exit 64 (POSIX usage error) with explicit remediation:

```bash
TENANCY_JSON_PRIMARY="${PROJECT_ROOT:-$(pwd)}/_bmad/bam/evidence/QG-F1/tenancy-decision.json"
TENANCY_JSON_ALT="${PROJECT_ROOT:-$(pwd)}/docs/architecture/tenancy-decision.json"

if [ ! -f "$TENANCY_JSON_PRIMARY" ] && [ ! -f "$TENANCY_JSON_ALT" ]; then
    cat >&2 <<'EOF'
ERROR: tenancy-decision.json not found.
       bmad-bam-design-deployment-topology REQUIRES the tenancy decision as upstream input.
       Run /bmad-bam-design-tenancy-model first.

       Searched:
         {project-root}/_bmad/bam/evidence/QG-F1/tenancy-decision.json
         {project-root}/docs/architecture/tenancy-decision.json
EOF
    exit 64   # POSIX usage error
fi

if [ -f "$TENANCY_JSON_PRIMARY" ]; then
    TENANCY_JSON="$TENANCY_JSON_PRIMARY"
else
    TENANCY_JSON="$TENANCY_JSON_ALT"
fi
```

(Why exit 64: POSIX `EX_USAGE` from `sysexits.h` — signals "command was used incorrectly", which is what running deployment-topology without its required upstream is. Downstream automation can branch on this code.)

## Actions

1. **Run the precondition check above FIRST.** Do not proceed to user elicitation unless tenancy-decision.json resolved.

2. Read `tenancy_model` from the resolved tenancy decision (Read tool against `$TENANCY_JSON`):

```bash
TENANCY_MODEL=$(python3 -c "import json; print(json.load(open('$TENANCY_JSON'))['tenancy_model'])")
echo "[info] tenancy_model = $TENANCY_MODEL (from $TENANCY_JSON)"
```

3. Ask the user the following questions, one at a time. Wait for answers. Don't accept vague responses ("we'll figure out regions later" → pin down at least the initial launch posture).

   1. **Target environments** — `single-region` / `multi-region` / `global`. (Drives whether per-cell-blue-green is an option in step-02; single-region cannot use cell-based rollout primitives.)
   2. **Risk tolerance per tier** — for each known tier (free / starter / pro / business / enterprise, OR custom tier ids if tier-model.json is available), capture one of `aggressive` / `standard` / `conservative` / `white-glove`. (Per spec §3.Q3b: free=aggressive, starter+pro=standard, business=conservative, enterprise=white-glove are the defaults. User may override but defaults are sound.)
   3. **Rollback SLA** — target maximum time from "bad deploy detected" to "all tenants on prior version" (e.g., `5m`, `30m`, `2h`). Per the `rollback-strategies` fragment, every rollout strategy has a documented rollback budget; this is that budget.
   4. **CI/CD platform** — free-form string (e.g., `github-actions`, `gitlab-ci`, `argocd`, `harness`, `internal-jenkins`). Captured for ADR traceability; does not gate the decision.

4. Soft-check whether a tier model is available (recommended but not required at this step — if absent, step-02 will prompt inline for the tier list). Try both paths per Concern-5 tool-aware path fallback:

```bash
TIER_PRIMARY="${PROJECT_ROOT:-$(pwd)}/docs/architecture/tier-model.json"
TIER_ALT="${PROJECT_ROOT:-$(pwd)}/_bmad/bam/evidence/QG-F1/tier-model.json"
TIER_PATH=""
if [ -f "$TIER_PRIMARY" ]; then
    TIER_PATH="$TIER_PRIMARY"
elif [ -f "$TIER_ALT" ]; then
    TIER_PATH="$TIER_ALT"
fi
if [ -n "$TIER_PATH" ]; then
    echo "[info] tier-model.json loaded from $TIER_PATH (tier ids will pre-fill in step-02)"
else
    echo "[WARN] tier-model.json not found; step-02 will prompt for tier list inline."
fi
```

5. Write `{project-root}/_bmad/bam/cache/deployment-topology-design/{date}/deployment-topology-context.json` (ensure parent dir via `mkdir -p`).

## Output

```json
{
  "schema_version": "1.0",
  "elicited_at": "<ISO-8601 UTC>",
  "tenancy_model": "<rls | schema-per-tenant | cell-based | hybrid>",
  "tenancy_decision_path": "<absolute path of resolved tenancy-decision.json>",
  "target_environments": "single-region | multi-region | global",
  "risk_tolerance_per_tier": {
    "free": "aggressive | standard | conservative | white-glove",
    "starter": "...",
    "pro": "...",
    "business": "...",
    "enterprise": "..."
  },
  "rollback_sla": "<duration string, e.g. '5m', '30m', '2h'>",
  "cicd_platform": "<free-form string>",
  "tier_model_path": "<absolute path or empty string>"
}
```

Population rules:
- `tenancy_model` — required; pulled from resolved `$TENANCY_JSON` (never empty after precondition check).
- `tenancy_decision_path` — required; absolute path of whichever input was resolved.
- `risk_tolerance_per_tier` — keys are tier ids. If `tier-model.json` was found, use the tier ids from that file (and prompt the user for one entry per tier). Otherwise default to the 5-default ids: `free`, `starter`, `pro`, `business`, `enterprise`.
- `tier_model_path` — populated if the soft-input path resolved; empty string otherwise.

## Gate

Machine-checkable: file exists at expected path + `schema_version`, `tenancy_model`, `tenancy_decision_path`, `target_environments`, `risk_tolerance_per_tier` (non-empty object), `rollback_sla`, `cicd_platform` all populated. `tier_model_path` may be empty (soft input).

## Next step

`step-02-c-load-options.md`
