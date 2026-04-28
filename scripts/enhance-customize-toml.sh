#!/bin/bash
# Enhance customize.toml files with activation hooks

SKILL_DIR="$1"
if [ -z "$SKILL_DIR" ]; then
  echo "Usage: $0 <skill-directory>"
  exit 1
fi

TOML_FILE="$SKILL_DIR/customize.toml"
if [ ! -f "$TOML_FILE" ]; then
  echo "customize.toml not found in $SKILL_DIR"
  exit 1
fi

# Extract skill name
SKILL_NAME=$(basename "$SKILL_DIR")
DISPLAY_NAME=$(echo "$SKILL_NAME" | sed 's/bmad-bam-//' | sed 's/-/ /g' | sed 's/\b\(.\)/\u\1/g')

# Check if already has activation_steps_prepend
if grep -q "activation_steps_prepend" "$TOML_FILE"; then
  echo "Already enhanced: $TOML_FILE"
  exit 0
fi

# Get the quality gate from SKILL.md
QG=$(grep -o "QG-[A-Z][0-9]*" "$SKILL_DIR/SKILL.md" | head -1)
if [ -z "$QG" ]; then
  QG="QG-F1"
fi

# Create enhanced TOML
cat > "$TOML_FILE" << TOML
# Workflow customization for $SKILL_NAME
#
# Merge Order (base → team → user):
#   1. {skill-root}/customize.toml (this file)
#   2. {project-root}/_bmad/custom/$SKILL_NAME.toml (team)
#   3. {project-root}/_bmad/custom/$SKILL_NAME.user.toml (personal)
#
# Merge Rules:
#   - Scalars: override wins
#   - Tables: deep-merge
#   - Arrays of tables with code/id: replace matching, append new
#   - Other arrays: append

[workflow]

# Pre-activation steps (before config load)
activation_steps_prepend = [
  "Loading $DISPLAY_NAME workflow context.",
]

# Post-greeting steps (before workflow begins)
activation_steps_append = [
  "Verify {tenant_model} and {ai_runtime} are configured in config.yaml",
  "Check for existing artifact at {output_folder}/planning-artifacts/",
]

# Persistent facts loaded for entire workflow
persistent_facts = [
  "file:{project-root}/_bmad/bam/data/context/bam-core.md",
  "file:{project-root}/_bmad/bam/data/checklists/${QG,,}.md",
]

# On workflow completion
on_complete = """
$DISPLAY_NAME workflow complete.

**Quality Gate:** $QG
Run validation mode to verify compliance.

**Next Workflows:**
See Related Workflows in SKILL.md for recommendations.
"""
TOML

echo "Enhanced: $TOML_FILE"
