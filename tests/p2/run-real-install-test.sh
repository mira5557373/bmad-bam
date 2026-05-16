#!/usr/bin/env bash
# Real-install end-to-end test for P2.1.
#
# Exercises Path B activation against a real BMAD-initialized fixture project:
# 1. Copy the fixture to a scratch directory
# 2. Simulate "bmad install bmad-bam-platform" by copying the module's installable
#    contents into _bmad/bbp/ (this is what BMAD's installFromResolution
#    does for community modules; see tests/p2/INVESTIGATION-NOTES.md).
# 3. Simulate the AI agent invoking /bmad-bam-finalize (slash command in
#    Claude Code/Cursor; `bmad run <skill>` is NOT a real CLI command —
#    see Concern 5 R3 / RR1) by invoking the bundled scripts/post-install.sh
#    directly with $PROJECT_ROOT=$WORK_DIR.
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
    # Simulate "bmad install bmad-bam-platform" per BMM-canonical (v0.9 §6.1) shape:
    # skills live under phase-numbered subdirs (1-foundation/, 2-modules/,
    # 9-infrastructure/) in source. Real installer flattens them into
    # _bmad/bbp/<skill-name>/. NO module-root agents/data/scripts/ dirs.
    mkdir -p "$WORK_DIR/_bmad/bbp"
    # Walk phase dirs + copy each skill dir into the install target
    for skill_dir in "$SOURCE"/[0-9]*-*/*; do
      [ -d "$skill_dir" ] || continue
      skill_name="$(basename "$skill_dir")"
      cp -a "$skill_dir" "$WORK_DIR/_bmad/bbp/$skill_name"
    done
    cp "$SOURCE/module.yaml" "$WORK_DIR/_bmad/bbp/" 2>/dev/null || true
    cp "$SOURCE/module-help.csv" "$WORK_DIR/_bmad/bbp/" 2>/dev/null || true
    echo ">>> module assets copied to _bmad/bbp/ (4 skills, no module-root content dirs)"

    # Simulate the AI agent invoking /bmad-bam-finalize (slash command in
    # Claude Code/Cursor; not a CLI subcommand) — invoke the underlying script
    # (skill-local at _bmad/bbp/bmad-bam-finalize/scripts/post-install.sh)
    bash "$WORK_DIR/_bmad/bbp/bmad-bam-finalize/scripts/post-install.sh" "$WORK_DIR"
    echo ">>> finalize script ran"
    ;;
  *)
    echo "ERROR: unknown P2_ACTIVATION_PATH=$PATH_SELECTED" >&2
    exit 1
    ;;
esac

# Verify the sentinel landed (BMM-aligned location per v0.7 §7.6:
# {output_folder}/bbp/project-context.md outside _bmad/<module-code>/)
OUTPUT_FOLDER_REL="$(grep -E '^[[:space:]]*output_folder[[:space:]]*=' "$WORK_DIR/_bmad/config.toml" 2>/dev/null | head -1 | sed -E 's/^[[:space:]]*output_folder[[:space:]]*=[[:space:]]*"?([^"#]+)"?.*/\1/' | sed -E 's/[[:space:]]+$//' || echo)"
OUTPUT_FOLDER_REL="${OUTPUT_FOLDER_REL:-_bmad-output}"
OUTPUT_FOLDER_REL="${OUTPUT_FOLDER_REL#\{project-root\}/}"
SENTINEL_FILE="$WORK_DIR/$OUTPUT_FOLDER_REL/bbp/project-context.md"

if [ ! -f "$SENTINEL_FILE" ]; then
    echo "FAIL: $SENTINEL_FILE not generated" >&2
    exit 1
fi

SENTINEL=$(grep -oE 'BAM_LOAD_VERIFY_[a-f0-9]{32}' "$SENTINEL_FILE" | head -1)
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
