---
step_id: 08-c-persist-result
auto-runnable: true
gate: machine-checkable
inputs: [plan-a-result.txt, plan-b-result.txt, plan-c-result.txt]
outputs: [family.json]
---

# Step 08 — Persist plan selection to family.json

## Purpose

Write `{project-root}/_bmad/bam/family.json` with the selected plan, installed modules state, smoke-test outcomes, and timestamps. P2 and all subsequent waves read this file to know how to activate.

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

# Get BMAD version
BMAD_VERSION=$(grep -oE 'bmad_version=[0-9.]+' "$LOG_DIR/bmad-version.txt" | cut -d= -f2)

TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)

# Write family.json atomically
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
    "log_directory": "_bmad/bam/install-logs/"
  },
  "shared_mode": false,
  "context-budget": {
    "tier1-total-max-tokens": 40000,
    "warn-at-tier3-tokens": 30000,
    "fail-at-total-tokens": 150000
  }
}
EOF

mkdir -p "$(dirname "$FAMILY_JSON")"
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
```
