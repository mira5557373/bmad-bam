#!/usr/bin/env bash
# Empirically verify BMM customize-template overlay merge for bmad-qa-generate-e2e-tests.
# Note: This test REQUIRES a fully-installed BMAD + BAM environment where the
# overlay has been copied to {project-root}/_bmad/custom/. In a development tree
# (not yet installed), this test is informational and will report SKIP.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
RESOLVER="$REPO_ROOT/_bmad/scripts/resolve_customization.py"

if [ ! -f "$RESOLVER" ]; then
    echo ">>> p3-2-overlay-merge: SKIP (resolver not yet installed; only available post-bmad-install)"
    exit 0
fi

# Try to find an installed bmad-qa-generate-e2e-tests skill (multi-IDE fallback per ADR-008)
BMM_SKILL_DIR=""
for candidate in \
    "$REPO_ROOT/.claude/skills/bmad-qa-generate-e2e-tests" \
    "$REPO_ROOT/.cursor/skills/bmad-qa-generate-e2e-tests" \
    "$REPO_ROOT/_bmad/bmm/4-implementation/bmad-qa-generate-e2e-tests"; do
    [ -d "$candidate" ] && BMM_SKILL_DIR="$candidate" && break
done

if [ -z "$BMM_SKILL_DIR" ]; then
    echo ">>> p3-2-overlay-merge: SKIP (BMM bmad-qa-generate-e2e-tests not installed)"
    exit 0
fi

python3 "$RESOLVER" --skill "$BMM_SKILL_DIR" --key workflow > /tmp/resolved-workflow.json

python3 -c "
import json
data = json.load(open('/tmp/resolved-workflow.json'))
asa = data.get('activation_steps_append', [])
assert any('test-catalogue.json' in s for s in asa), f'FAIL: BAM context not merged. Got: {asa}'
pf = data.get('persistent_facts', [])
assert any('_bmad-output/bbp/project-context.md' in p for p in pf), f'FAIL: specific-path persistent_facts not merged. Got: {pf}'
print('>>> p3-2-overlay-merge: PASS (overlay empirically verified)')
"
