#!/usr/bin/env bash
# Probes whether a live Claude session loads the project-context.md sentinel.
#
# This is the manual portion of the Plan C ratification ask from Wave 0.
# Cannot fully automate without a live LLM invocation; this script orchestrates
# a manual user step.

set -euo pipefail

PROJECT_ROOT="$1"
SENTINEL="$2"

cat <<EOF

═══════════════════════════════════════════════════════════════════════
PLAN C — MANUAL LLM-SIDE VERIFICATION

The headless tests prove:
  1. project-context.md exists at $PROJECT_ROOT/_bmad/platform/
  2. universal-glob string survives merge into target skills
  3. file contains sentinel: $SENTINEL

We still need to verify the LLM at activation actually loads it.

DO THIS NOW (on your workstation):
  1. cd $PROJECT_ROOT
  2. Open a Claude Code session (claude or claude code)
  3. Invoke any BMAD core skill that should have the universal-glob, e.g.:
       /bmad bmad-create-architecture
  4. After the skill activates, ask Claude:
       "What sentinel token do you see in your loaded project context?"
  5. Claude should respond with the sentinel: $SENTINEL

If Claude returns the sentinel → PASS (Plan C verified).
If Claude does NOT return the sentinel → FAIL — universal-glob doesn't
  actually load files at activation in your setup; escalate.

After completing the manual verification, record outcome in
WAVE-0-OUTCOME.md and tests/p2/PLAN-C-RATIFICATION.md.

═══════════════════════════════════════════════════════════════════════
EOF
