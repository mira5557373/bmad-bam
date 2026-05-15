---
step_id: 08-c-persist-result
auto_runnable: true
gate: machine-checkable
inputs: [plan-a-result.txt, plan-b-result.txt, plan-c-result.txt]
outputs: [family.json]
---

# Step 08 — Persist plan selection to family.json

## Purpose

Write `{project-root}/_bmad/bam/family.json` with the selected plan, installed modules state, smoke-test outcomes (including per-skill results per spec §7.3), and timestamps. P2 and all subsequent waves read this file to know how to activate.

## Schema

The canonical contract is `_bmad/bam/schemas/family.schema.json` (committed under this repo's `_bmad/bam/schemas/`). Producers MUST match it. Required top-level keys: `schema_version`, `bmad_version`, `plan`, `installed`, `smoke_test`, `shared_mode`, `context-budget`. Run the validator at the end of this step.

## Action

```bash
PROJECT_ROOT="${BMAD_PROJECT_ROOT:-$PWD}"
LOG_DIR="$PROJECT_ROOT/_bmad/bam/install-logs"
FAMILY_JSON="$PROJECT_ROOT/_bmad/bam/family.json"

# Determine selected plan from result files
PLAN="unknown"
if [ -f "$LOG_DIR/plan-a-result.txt" ] && grep -q "^result=pass" "$LOG_DIR/plan-a-result.txt"; then
    PLAN="A"
elif [ -f "$LOG_DIR/plan-b-result.txt" ] && grep -q "^result=pass" "$LOG_DIR/plan-b-result.txt"; then
    PLAN="B"
elif [ -f "$LOG_DIR/plan-c-result.txt" ] && grep -q "^result=pass" "$LOG_DIR/plan-c-result.txt"; then
    PLAN="C"
fi

if [ "$PLAN" = "unknown" ]; then
    echo "ERROR: no plan passed; cannot persist" >&2
    exit 1
fi

# Read BMAD version (robust against pre-release/build suffixes)
BMAD_VERSION=$(grep -oE 'bmad_version=\S+' "$LOG_DIR/bmad-version.txt" | cut -d= -f2)

# Per-target results from plan-a/b-result.txt: parse `target.<skill>=<pass|fail>` lines
build_target_json() {
    local result_file="$1"
    [ ! -f "$result_file" ] && { printf 'null'; return; }
    local first=1
    printf '['
    while IFS= read -r line; do
        case "$line" in
            target.*=*)
                skill="${line#target.}"
                result="${skill#*=}"
                skill="${skill%%=*}"
                if [ "$first" -eq 0 ]; then printf ', '; fi
                printf '{"skill": "%s", "result": "%s"}' "$skill" "$result"
                first=0
                ;;
        esac
    done < "$result_file"
    printf ']'
}

TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)
PLAN_A_TARGETS=$(build_target_json "$LOG_DIR/plan-a-result.txt")
PLAN_B_TARGETS=$(build_target_json "$LOG_DIR/plan-b-result.txt")

mkdir -p "$(dirname "$FAMILY_JSON")"
TMP="$(mktemp)"
cat > "$TMP" <<EOF
{
  "schema_version": "0.1.0",
  "bmad_version": "$BMAD_VERSION",
  "plan": "$PLAN",
  "installed": [
    {
      "module": "bmad-bam-platform",
      "version": "0.1.0",
      "installed_at": "$TIMESTAMP",
      "scope": "wave-0-skeleton"
    }
  ],
  "smoke_test": {
    "completed_at": "$TIMESTAMP",
    "plan_selected": "$PLAN",
    "log_directory": "_bmad/bam/install-logs/",
    "runner": "bmad-bam-smoke-test/workflow.md",
    "targets": {
      "plan_a": $PLAN_A_TARGETS,
      "plan_b": $PLAN_B_TARGETS
    }
  },
  "shared_mode": false,
  "context-budget": {
    "tier1-total-max-tokens": 40000,
    "tier1-per-module-max-tokens": {
      "platform": 5000,
      "data": 4000,
      "ai": 8000,
      "rag": 4000,
      "integration": 5000,
      "trust": 6000,
      "ops": 4000,
      "ux": 4000
    },
    "tier2-max-tokens": 20000,
    "warn-at-tier3-tokens": 30000,
    "fail-at-total-tokens": 150000
  }
}
EOF
mv -f "$TMP" "$FAMILY_JSON"

echo "Wrote $FAMILY_JSON (plan=$PLAN)"
```

## Verification

```bash
# JSON must parse
python3 -c "import json; json.load(open('$FAMILY_JSON'))" || { echo "FAIL: invalid JSON"; exit 1; }

# plan field must be one of A/B/C
PLAN=$(python3 -c "import json; print(json.load(open('$FAMILY_JSON'))['plan'])")
case "$PLAN" in
  A|B|C) echo "PASS: plan=$PLAN persisted" ;;
  *) echo "FAIL: invalid plan=$PLAN"; exit 1 ;;
esac

# Optional: validate against the canonical JSON Schema if jsonschema is installed.
# Family.json producers MUST pass this check.
SCHEMA="$PROJECT_ROOT/_bmad/bam/schemas/family.schema.json"
if [ -f "$SCHEMA" ] && python3 -c "import jsonschema" 2>/dev/null; then
    python3 - "$FAMILY_JSON" "$SCHEMA" <<'PY' && echo "PASS: schema validation"
import json, sys, jsonschema
inst = json.load(open(sys.argv[1]))
schema = json.load(open(sys.argv[2]))
jsonschema.validate(inst, schema)
PY
else
    echo "INFO: jsonschema not installed or schema missing; skipped strict validation"
fi
```
