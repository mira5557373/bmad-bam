#!/usr/bin/env bash
# Real-install end-to-end test for P2.1.
#
# Exercises Path B activation against a real BMAD-initialized fixture project:
# 1. Copy the fixture to a scratch directory
# 2. Simulate "bmad install bmad-bam-platform" by copying the module's installable
#    contents into _bmad/bam-platform/ (this is what BMAD's installFromResolution
#    does for community modules; see tests/p2/INVESTIGATION-NOTES.md).
# 3. Simulate "bmad run bmad-bam-finalize" by invoking the bundled
#    scripts/post-install.sh with $PROJECT_ROOT=$WORK_DIR.
# 4. Verify the universal-glob sentinel is in place.
# 5. Invoke probe-llm-context.sh to print manual Plan C verification instructions.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
FIXTURE="$REPO_ROOT/tests/p2/fixtures/real-bmad-project"
SOURCE="$REPO_ROOT/src-v6/bmad-bam-platform"

if [ ! -d "$FIXTURE" ]; then
    echo "FAIL: fixture not found at $FIXTURE" >&2
    exit 1
fi

WORK_DIR="$(mktemp -d)"
echo ">>> WORK_DIR=$WORK_DIR"
trap 'if [ "${KEEP_WORKDIR:-0}" = "0" ]; then rm -rf "$WORK_DIR"; else echo ">>> WORK_DIR retained at $WORK_DIR (KEEP_WORKDIR=1)"; fi' EXIT

# Copy the fixture (real BMAD-initialized project shape)
cp -a "$FIXTURE/." "$WORK_DIR/"
echo ">>> fixture copied to $WORK_DIR"

# Activation path selection (defaults to B per Task 0 findings)
PATH_SELECTED="${P2_ACTIVATION_PATH:-B}"
echo ">>> activation path: $PATH_SELECTED"

case "$PATH_SELECTED" in
  A)
    echo "ERROR: Path A not implemented in P2.1 — Task 0 invalidated it." >&2
    echo "  npm postinstall runs in BMAD's cache dir, not the host project." >&2
    echo "  See tests/p2/INVESTIGATION-NOTES.md for evidence." >&2
    exit 1
    ;;
  B)
    # Simulate "bmad install bmad-bam-platform" — copy module assets into _bmad/bam-platform/
    # (matches BMAD's installFromResolution behavior per Task 0 findings)
    mkdir -p "$WORK_DIR/_bmad/bam-platform"
    cp -a "$SOURCE/scripts" "$WORK_DIR/_bmad/bam-platform/"
    cp -a "$SOURCE/skills" "$WORK_DIR/_bmad/bam-platform/"
    cp -a "$SOURCE/agents" "$WORK_DIR/_bmad/bam-platform/" 2>/dev/null || true
    cp -a "$SOURCE/data" "$WORK_DIR/_bmad/bam-platform/" 2>/dev/null || true
    cp "$SOURCE/module.yaml" "$WORK_DIR/_bmad/bam-platform/" 2>/dev/null || true
    echo ">>> module assets copied to _bmad/bam-platform/"

    # Simulate "bmad run bmad-bam-finalize" — invoke the underlying script
    bash "$WORK_DIR/_bmad/bam-platform/scripts/post-install.sh" "$WORK_DIR"
    echo ">>> finalize script ran"
    ;;
  *)
    echo "ERROR: unknown P2_ACTIVATION_PATH=$PATH_SELECTED" >&2
    exit 1
    ;;
esac

# Verify the sentinel landed
if [ ! -f "$WORK_DIR/_bmad/bam-activation/platform/project-context.md" ]; then
    echo "FAIL: _bmad/bam-activation/platform/project-context.md not generated" >&2
    exit 1
fi

SENTINEL=$(grep -oE 'BAM_LOAD_VERIFY_[a-f0-9]{32}' \
    "$WORK_DIR/_bmad/bam-activation/platform/project-context.md" | head -1)
if [ -z "$SENTINEL" ]; then
    echo "FAIL: no sentinel token found in project-context.md" >&2
    exit 1
fi
echo ">>> sentinel: $SENTINEL"

# Verify Atlas's sidecar ADR INDEX was seeded (downstream workflows assume it exists)
INDEX="$WORK_DIR/_bmad/_memory/atlas/architecture-decisions/INDEX.md"
if [ ! -f "$INDEX" ]; then
    echo "FAIL: Atlas ADR INDEX.md not seeded by finalize" >&2
    exit 1
fi
if ! grep -q '^# Atlas — Architecture Decisions Index' "$INDEX"; then
    echo "FAIL: ADR INDEX.md missing canonical header" >&2
    exit 1
fi
echo ">>> ADR INDEX seeded: $INDEX"

# Headless portion done — print manual probe instructions
echo
bash "$REPO_ROOT/tests/p2/lib/probe-llm-context.sh" "$WORK_DIR" "$SENTINEL"

echo
echo ">>> HEADLESS PORTION PASS (Path $PATH_SELECTED)"
echo ">>> Run KEEP_WORKDIR=1 $0 to retain $WORK_DIR for manual Plan C probe."
echo ">>> Record outcome in tests/p2/PLAN-C-RATIFICATION.md when done."
