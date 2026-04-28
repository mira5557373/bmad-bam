#!/bin/bash
# Add SUCCESS METRICS and FAILURE MODES sections to step files

STEP_FILE="$1"
if [ -z "$STEP_FILE" ] || [ ! -f "$STEP_FILE" ]; then
  echo "Usage: $0 <step-file.md>"
  exit 1
fi

# Check if already has SUCCESS METRICS
if grep -q "## SUCCESS METRICS\|## Success Metrics" "$STEP_FILE"; then
  echo "Already has SUCCESS METRICS: $STEP_FILE"
  exit 0
fi

# Extract step info from filename
FILENAME=$(basename "$STEP_FILE")
STEP_NUM=$(echo "$FILENAME" | grep -o "step-[0-9]*" | grep -o "[0-9]*")
MODE=$(echo "$FILENAME" | grep -o "\-[cev]\-" | tr -d '-')

# Determine appropriate metrics based on mode
case "$MODE" in
  c)
    METRICS=$(cat << 'METRICS'

---

## SUCCESS METRICS:

- [ ] All required inputs gathered from user
- [ ] Design decisions documented with rationale
- [ ] User confirmed choices via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing input:** Cannot proceed without required context - return to prerequisites
- **Unclear requirements:** Use Advanced Elicitation (A) to clarify
- **Conflicting constraints:** Use Party Mode (P) for multi-perspective analysis
- **User rejects output:** Iterate on design, do not force acceptance
METRICS
)
    ;;
  e)
    METRICS=$(cat << 'METRICS'

---

## SUCCESS METRICS:

- [ ] Existing artifact loaded successfully
- [ ] User changes clearly understood
- [ ] Changes applied without breaking existing content
- [ ] Updated artifact saved to correct location

## FAILURE MODES:

- **Artifact not found:** Cannot edit - run Create mode first
- **Conflicting changes:** Present conflicts to user for resolution
- **Invalid modifications:** Reject changes that break document structure
METRICS
)
    ;;
  v)
    METRICS=$(cat << 'METRICS'

---

## SUCCESS METRICS:

- [ ] Artifact loaded for validation
- [ ] All checklist items evaluated
- [ ] Evidence documented for each check
- [ ] Gate decision determined (PASS/CONDITIONAL/FAIL)
- [ ] Validation report generated

## FAILURE MODES:

- **Artifact not found:** Cannot validate - run Create mode first
- **Missing checklist:** Use embedded criteria as fallback
- **Ambiguous evidence:** Mark as CONDITIONAL, document uncertainty
METRICS
)
    ;;
  *)
    echo "Unknown mode for $STEP_FILE"
    exit 1
    ;;
esac

# Find insertion point - before "## NEXT STEP" or at end
NEXT_STEP_LINE=$(grep -n "^## NEXT STEP\|^## Next Step" "$STEP_FILE" | head -1 | cut -d: -f1)

if [ -n "$NEXT_STEP_LINE" ]; then
  # Insert before NEXT STEP
  {
    head -n "$((NEXT_STEP_LINE - 1))" "$STEP_FILE"
    echo "$METRICS"
    echo ""
    tail -n "+$NEXT_STEP_LINE" "$STEP_FILE"
  } > "$STEP_FILE.tmp" && mv "$STEP_FILE.tmp" "$STEP_FILE"
else
  # Append at end
  echo "$METRICS" >> "$STEP_FILE"
fi

echo "Added sections to: $STEP_FILE"
