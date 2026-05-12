#!/usr/bin/env bash
# tests/wave-0/lib/sentinel.sh
#
# Bash wrapper around scripts/generate-sentinel.py for use in smoke-test scripts.
#
# Usage:
#   source tests/wave-0/lib/sentinel.sh
#   token="$(generate_sentinel)"

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
SENTINEL_PY="$REPO_ROOT/src-v6/bmad-bam-platform/scripts/generate-sentinel.py"

generate_sentinel() {
    if [ ! -x "$SENTINEL_PY" ]; then
        echo "ERROR: $SENTINEL_PY not executable" >&2
        return 1
    fi
    python3 "$SENTINEL_PY"
}
