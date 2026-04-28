#!/bin/bash
# Enhance workflow.md files with full mode sections

SKILL_DIR="$1"
if [ -z "$SKILL_DIR" ]; then
  echo "Usage: $0 <skill-directory>"
  exit 1
fi

WORKFLOW_FILE="$SKILL_DIR/workflow.md"
if [ ! -f "$WORKFLOW_FILE" ]; then
  echo "workflow.md not found in $SKILL_DIR"
  exit 1
fi

# Check if already has full mode sections
if grep -q "## Create Mode" "$WORKFLOW_FILE" && grep -q "## Recovery Protocol" "$WORKFLOW_FILE"; then
  echo "Already enhanced: $WORKFLOW_FILE"
  exit 0
fi

# Extract skill info
SKILL_NAME=$(basename "$SKILL_DIR")
DISPLAY_NAME=$(cat "$SKILL_DIR/SKILL.md" | grep -A1 "^# " | head -1 | sed 's/^# //')

# Get quality gate from SKILL.md
QG=$(grep -o "QG-[A-Z][0-9]*" "$SKILL_DIR/SKILL.md" | head -1)
if [ -z "$QG" ]; then
  QG="QG-F1"
fi

# Get step names
STEP_01=$(ls "$SKILL_DIR/steps/step-01-c-"*.md 2>/dev/null | head -1 | xargs basename 2>/dev/null | sed 's/\.md$//')
STEP_02=$(ls "$SKILL_DIR/steps/step-02-c-"*.md 2>/dev/null | head -1 | xargs basename 2>/dev/null | sed 's/\.md$//')
STEP_03=$(ls "$SKILL_DIR/steps/step-03-c-"*.md 2>/dev/null | head -1 | xargs basename 2>/dev/null | sed 's/\.md$//')
STEP_04=$(ls "$SKILL_DIR/steps/step-04-c-"*.md 2>/dev/null | head -1 | xargs basename 2>/dev/null | sed 's/\.md$//')
STEP_05=$(ls "$SKILL_DIR/steps/step-05-c-"*.md 2>/dev/null | head -1 | xargs basename 2>/dev/null | sed 's/\.md$//')

# Create enhanced workflow.md
cat > "$WORKFLOW_FILE" << EOF
# $DISPLAY_NAME

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Generate new artifact | \`step-01-c-*\` through \`step-05-c-*\` |
| **Edit** | Modify existing artifact | \`step-10-e-*\` through \`step-11-e-*\` |
| **Validate** | Check against $QG criteria | \`step-20-v-*\` through \`step-22-v-*\` |

Default: **Create** mode unless artifact exists.

## Create Mode

Generate the artifact by following steps sequentially:

1. **$STEP_01** - Initialize and gather requirements
2. **$STEP_02** - Analyze options and patterns
3. **$STEP_03** - Design core solution
4. **$STEP_04** - Document decisions
5. **$STEP_05** - Compile final artifact

## Edit Mode

Modify an existing artifact:

1. **step-10-e-load** - Load existing artifact
2. **step-11-e-apply** - Apply user changes

## Validate Mode

Validate against quality gate criteria:

1. **step-20-v-load** - Load artifact and $QG checklist
2. **step-21-v-validate** - Execute validation checks
3. **step-22-v-report** - Generate validation report

## Quality Gate Outcomes

| Outcome | Description | Next Step |
|---------|-------------|-----------|
| PASS | All gates pass | Proceed to next workflow |
| CONDITIONAL | Critical pass, standard gaps | Document mitigations, proceed |
| FAIL | Critical check fails | Enter recovery protocol |

## Recovery Protocol

On FAIL outcome:
1. **Attempt 1:** Fix identified issues, re-run validation
2. **Attempt 2:** Deep review with stakeholders
3. **Mandatory Course Correction:** Escalate to leadership
EOF

echo "Enhanced: $WORKFLOW_FILE"
