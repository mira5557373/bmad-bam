#!/bin/bash
# Enhance SKILL.md files with 6-step activation sequence

SKILL_DIR="$1"
if [ -z "$SKILL_DIR" ]; then
  echo "Usage: $0 <skill-directory>"
  exit 1
fi

SKILL_FILE="$SKILL_DIR/SKILL.md"
if [ ! -f "$SKILL_FILE" ]; then
  echo "SKILL.md not found in $SKILL_DIR"
  exit 1
fi

# Extract skill name from directory
SKILL_NAME=$(basename "$SKILL_DIR")

# Check if already has On Activation
if grep -q "## On Activation" "$SKILL_FILE"; then
  echo "Already has activation sequence: $SKILL_FILE"
  exit 0
fi

# Find the line after "## Domain References" or end of file
INSERTION_POINT=$(grep -n "^## Domain References" "$SKILL_FILE" | head -1 | cut -d: -f1)

if [ -z "$INSERTION_POINT" ]; then
  # No Domain References, append at end
  INSERTION_POINT=$(wc -l < "$SKILL_FILE")
fi

# Create the activation section
ACTIVATION_SECTION=$(cat << 'ACTIVATION'

## On Activation

### Step 1: Resolve the Workflow Block

Run: `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key workflow`

**If the script fails**, resolve the `workflow` block yourself by reading these files in base → team → user order:

1. `{skill-root}/customize.toml` — defaults
2. `{project-root}/_bmad/custom/{skill-name}.toml` — team overrides
3. `{project-root}/_bmad/custom/{skill-name}.user.toml` — personal overrides

Apply merge rules: scalars override, tables deep-merge, arrays of tables keyed by `code`/`id` replace matching and append new, other arrays append.

### Step 2: Execute Prepend Steps

Execute each entry in `{workflow.activation_steps_prepend}` in order.

### Step 3: Load Persistent Facts

Treat every entry in `{workflow.persistent_facts}` as foundational context.
- Entries prefixed `file:` are paths/globs — load contents as facts
- Other entries are literal facts

### Step 4: Load Config

Load from `{project-root}/_bmad/bam/config.yaml`:
- `{user_name}` - greeting
- `{communication_language}` - spoken output
- `{document_output_language}` - written documents
- `{planning_artifacts}` - output location
- `{tenant_model}` - BAM isolation model
- `{ai_runtime}` - BAM AI framework

### Step 5: Greet the User

Greet `{user_name}`, speaking in `{communication_language}`.

### Step 6: Execute Append Steps

Execute each entry in `{workflow.activation_steps_append}` in order.

Activation complete. Begin execution by reading `workflow.md`.
ACTIVATION
)

# Insert before Domain References (or at end)
{
  head -n "$((INSERTION_POINT - 1))" "$SKILL_FILE"
  echo "$ACTIVATION_SECTION"
  echo ""
  tail -n "+$INSERTION_POINT" "$SKILL_FILE"
} > "$SKILL_FILE.tmp" && mv "$SKILL_FILE.tmp" "$SKILL_FILE"

echo "Enhanced: $SKILL_FILE"
