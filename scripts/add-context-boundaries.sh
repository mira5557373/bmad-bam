#!/bin/bash
# Add CONTEXT BOUNDARIES section to step files missing it

STEP_FILE="$1"
if [ -z "$STEP_FILE" ] || [ ! -f "$STEP_FILE" ]; then
  echo "Usage: $0 <step-file.md>"
  exit 1
fi

# Check if already has CONTEXT BOUNDARIES
if grep -q "## CONTEXT BOUNDARIES" "$STEP_FILE"; then
  echo "Already has CONTEXT BOUNDARIES: $STEP_FILE"
  exit 0
fi

# Extract step info
FILENAME=$(basename "$STEP_FILE")
STEP_NUM=$(echo "$FILENAME" | grep -o "step-[0-9]*" | grep -o "[0-9]*")
MODE=$(echo "$FILENAME" | grep -o "\-[cev]\-" | tr -d '-')

# Get step title from file
STEP_TITLE=$(head -1 "$STEP_FILE" | sed 's/^# //' | sed 's/^Step [0-9]*: //')

# Create context based on mode
case "$MODE" in
  c)
    CONTEXT=$(cat << 'CTX'

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Gathering required inputs for this step
- Making design decisions within step scope
- Documenting decisions with rationale

**OUT OF SCOPE:**
- Decisions from other steps
- Implementation details
- Validation (separate mode)

CTX
)
    ;;
  e)
    CONTEXT=$(cat << 'CTX'

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading existing artifact
- Applying user-requested changes
- Preserving existing content

**OUT OF SCOPE:**
- Creating new artifacts (use Create mode)
- Validation (use Validate mode)

CTX
)
    ;;
  v)
    CONTEXT=$(cat << 'CTX'

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading artifact and checklist
- Evaluating against criteria
- Documenting evidence

**OUT OF SCOPE:**
- Modifying the artifact
- Creating new content

CTX
)
    ;;
  *)
    echo "Unknown mode: $STEP_FILE"
    exit 1
    ;;
esac

# Find insertion point - after EXECUTION PROTOCOLS or after MANDATORY RULES
INSERT_LINE=$(grep -n "^## EXECUTION PROTOCOLS" "$STEP_FILE" | tail -1 | cut -d: -f1)
if [ -z "$INSERT_LINE" ]; then
  INSERT_LINE=$(grep -n "^## MANDATORY EXECUTION RULES" "$STEP_FILE" | head -1 | cut -d: -f1)
fi

if [ -z "$INSERT_LINE" ]; then
  echo "No insertion point found: $STEP_FILE"
  exit 1
fi

# Find the next section after EXECUTION PROTOCOLS
NEXT_SECTION=$(tail -n +$((INSERT_LINE + 1)) "$STEP_FILE" | grep -n "^## " | head -1 | cut -d: -f1)
if [ -n "$NEXT_SECTION" ]; then
  INSERT_LINE=$((INSERT_LINE + NEXT_SECTION - 1))
fi

# Insert CONTEXT BOUNDARIES
{
  head -n "$INSERT_LINE" "$STEP_FILE"
  echo "$CONTEXT"
  tail -n "+$((INSERT_LINE + 1))" "$STEP_FILE"
} > "$STEP_FILE.tmp" && mv "$STEP_FILE.tmp" "$STEP_FILE"

echo "Added CONTEXT BOUNDARIES: $STEP_FILE"
