#!/usr/bin/env bash
# tests/wave-0/run-smoke-test.sh
#
# Wave 0 end-to-end smoke-test runner (headless portion).
#
# Mechanism per Task 0 / tests/wave-0/INVESTIGATION-NOTES.md:
#   - The resolver is `external/bmad-method/src/scripts/resolve_customization.py`
#     (Python 3.11+, stdlib `tomllib`). It does a string-level three-layer TOML
#     merge and emits JSON; it does NOT expand `file:` prefixes or globs.
#   - BMAD's installer.js `_installSharedScripts` copies that resolver to
#     `<project-root>/_bmad/scripts/resolve_customization.py`.
#   - BMAD's `installVerbatimSkills` copies skill source directories byte-for-byte
#     to the IDE target (e.g. `.claude/skills/<id>/`) without modifying
#     `customize.toml`. We simulate that here.
#   - Plan A: literal glob string `file:{project-root}/**/project-context.md`
#     survives the three-layer merge into the target skill's resolved
#     `agent.persistent_facts`, AND a sentinel `project-context.md` exists at
#     a glob-matching path.
#   - Plan B (fallback): an explicit user-tier override placed at
#     `_bmad/custom/<skill-basename>.toml` puts the literal explicit path
#     `file:{project-root}/_bmad/platform/project-context.md` into the
#     resolved `agent.persistent_facts`.
#   - Plan C is *not* exercised here; it requires a live LLM session.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

echo ">>> BAM v6 Wave 0 smoke-test runner"
echo ">>> repo root: $REPO_ROOT"

# ---------------------------------------------------------------------------
# Pre-flight: Python 3.11+ (resolver uses stdlib tomllib)
# ---------------------------------------------------------------------------
if ! command -v python3 >/dev/null 2>&1; then
    echo "ERROR: python3 not found on PATH; resolver requires Python 3.11+" >&2
    exit 75
fi

PY_VER="$(python3 -c 'import sys; print("%d.%d" % sys.version_info[:2])')"
PY_MAJOR="$(python3 -c 'import sys; print(sys.version_info[0])')"
PY_MINOR="$(python3 -c 'import sys; print(sys.version_info[1])')"
if [ "$PY_MAJOR" -lt 3 ] || { [ "$PY_MAJOR" -eq 3 ] && [ "$PY_MINOR" -lt 11 ]; }; then
    echo "ERROR: python3 is $PY_VER; resolver requires >= 3.11 (stdlib tomllib)" >&2
    exit 75
fi
echo ">>> python3 version: $PY_VER (OK)"

# ---------------------------------------------------------------------------
# Pre-flight: external bmad-method submodule present
# ---------------------------------------------------------------------------
if [ ! -d "$REPO_ROOT/external/bmad-method/src" ]; then
    echo "ERROR: $REPO_ROOT/external/bmad-method/src missing" >&2
    echo "       Run: git submodule update --init --recursive" >&2
    exit 70
fi

RESOLVER_SRC="$REPO_ROOT/external/bmad-method/src/scripts/resolve_customization.py"
if [ ! -f "$RESOLVER_SRC" ]; then
    echo "ERROR: resolver script missing at $RESOLVER_SRC" >&2
    exit 70
fi

TARGET_SKILL_NAME="bmad-agent-analyst"
SKILL_SRC="$REPO_ROOT/external/bmad-method/src/bmm-skills/1-analysis/$TARGET_SKILL_NAME"
if [ ! -d "$SKILL_SRC" ]; then
    echo "ERROR: target skill source missing at $SKILL_SRC" >&2
    exit 70
fi

FIXTURE_DIR="$REPO_ROOT/tests/wave-0/fixtures/test-bmad-project"
if [ ! -d "$FIXTURE_DIR" ] || [ ! -f "$FIXTURE_DIR/_bmad/config.toml" ]; then
    echo "ERROR: BMAD test fixture missing at $FIXTURE_DIR" >&2
    exit 70
fi

POST_INSTALL="$REPO_ROOT/src-v6/bmad-bam-platform/scripts/post-install.sh"
if [ ! -x "$POST_INSTALL" ]; then
    echo "ERROR: post-install hook not executable at $POST_INSTALL" >&2
    exit 70
fi

# ---------------------------------------------------------------------------
# Setup ephemeral work directory
# ---------------------------------------------------------------------------
WORK_DIR="$(mktemp -d)"
trap 'rm -rf "$WORK_DIR"' EXIT
echo ">>> WORK_DIR=$WORK_DIR"

# ---------------------------------------------------------------------------
# Step 1: drop the fixture into WORK_DIR (gives us _bmad/config.toml)
# ---------------------------------------------------------------------------
echo ">>> copying fixture into WORK_DIR"
cp -r "$FIXTURE_DIR/." "$WORK_DIR/"
if [ ! -f "$WORK_DIR/_bmad/config.toml" ]; then
    echo "ERROR: fixture copy failed; $WORK_DIR/_bmad/config.toml missing" >&2
    exit 1
fi

# ---------------------------------------------------------------------------
# Step 2: simulate BMAD installer.js _installSharedScripts
# ---------------------------------------------------------------------------
echo ">>> simulating _installSharedScripts (copying resolver to _bmad/scripts/)"
mkdir -p "$WORK_DIR/_bmad/scripts"
cp "$RESOLVER_SRC" "$WORK_DIR/_bmad/scripts/"
if [ ! -f "$WORK_DIR/_bmad/scripts/resolve_customization.py" ]; then
    echo "ERROR: resolver copy failed" >&2
    exit 1
fi

# ---------------------------------------------------------------------------
# Step 3: simulate BMAD installer.js installVerbatimSkills for ONE target skill
# ---------------------------------------------------------------------------
echo ">>> simulating installVerbatimSkills for $TARGET_SKILL_NAME"
TARGET_SKILL_DIR="$WORK_DIR/.claude/skills/$TARGET_SKILL_NAME"
mkdir -p "$(dirname "$TARGET_SKILL_DIR")"
cp -r "$SKILL_SRC" "$TARGET_SKILL_DIR"
if [ ! -f "$TARGET_SKILL_DIR/customize.toml" ]; then
    echo "ERROR: skill copy failed; $TARGET_SKILL_DIR/customize.toml missing" >&2
    exit 1
fi

# ---------------------------------------------------------------------------
# Step 4: run BAM post-install (drops _bmad/platform/project-context.md + sentinel)
# ---------------------------------------------------------------------------
echo ">>> running BAM post-install hook"
SENTINEL="$("$POST_INSTALL" "$WORK_DIR")"
if [ -z "$SENTINEL" ]; then
    echo "ERROR: post-install returned empty sentinel" >&2
    exit 1
fi
echo ">>> sentinel=$SENTINEL"

if [ ! -f "$WORK_DIR/_bmad/platform/project-context.md" ]; then
    echo "ERROR: project-context.md not present at $WORK_DIR/_bmad/platform/project-context.md" >&2
    exit 1
fi
if ! grep -qF "$SENTINEL" "$WORK_DIR/_bmad/platform/project-context.md"; then
    echo "ERROR: sentinel token not found inside project-context.md" >&2
    exit 1
fi

# ---------------------------------------------------------------------------
# Source helpers
# ---------------------------------------------------------------------------
# shellcheck source=lib/sentinel.sh
source "$REPO_ROOT/tests/wave-0/lib/sentinel.sh"
# shellcheck source=lib/inspect-context.sh
source "$REPO_ROOT/tests/wave-0/lib/inspect-context.sh"

PLAN="unknown"

# ---------------------------------------------------------------------------
# Plan A: universal-glob string survived merge + sentinel file present
# ---------------------------------------------------------------------------
echo ">>> Plan A check"
RESOLVED_A="$(inspect_context_for_skill "$TARGET_SKILL_DIR" "$WORK_DIR" || true)"

PLAN_A_GLOB='file:{project-root}/**/project-context.md'
if [ -n "$RESOLVED_A" ] \
    && printf '%s' "$RESOLVED_A" | grep -qF "$PLAN_A_GLOB" \
    && [ -f "$WORK_DIR/_bmad/platform/project-context.md" ] \
    && grep -qF "$SENTINEL" "$WORK_DIR/_bmad/platform/project-context.md"; then
    PLAN="A"
    echo ">>> Plan A PASS"
else
    echo ">>> Plan A FAIL"
fi

# ---------------------------------------------------------------------------
# Plan B (only if Plan A failed): explicit user-tier override survives merge
# ---------------------------------------------------------------------------
if [ "$PLAN" = "unknown" ]; then
    echo ">>> Plan B check"
    OVERRIDE_DIR="$WORK_DIR/_bmad/custom"
    OVERRIDE_TOML="$OVERRIDE_DIR/$TARGET_SKILL_NAME.toml"
    mkdir -p "$OVERRIDE_DIR"
    cat > "$OVERRIDE_TOML" <<'EOF'
# Plan B explicit overlay — generated by run-smoke-test.sh
[agent]
persistent_facts = [
  "file:{project-root}/_bmad/platform/project-context.md",
]
EOF

    RESOLVED_B="$(inspect_context_for_skill "$TARGET_SKILL_DIR" "$WORK_DIR" || true)"
    PLAN_B_PATH='file:{project-root}/_bmad/platform/project-context.md'
    if [ -n "$RESOLVED_B" ] && printf '%s' "$RESOLVED_B" | grep -qF "$PLAN_B_PATH"; then
        PLAN="B"
        echo ">>> Plan B PASS"
    else
        echo ">>> Plan B FAIL"
    fi
fi

# ---------------------------------------------------------------------------
# Plan C is manual (live LLM); not exercised by the headless runner.
# ---------------------------------------------------------------------------
echo ">>> Plan C requires manual verification (see step-07)."

# ---------------------------------------------------------------------------
# Persist family.json
# ---------------------------------------------------------------------------
BMAD_VERSION="$(python3 -c "import json,sys; print(json.load(open(sys.argv[1]))['version'])" \
    "$REPO_ROOT/external/bmad-method/package.json")"
TIMESTAMP="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
FAMILY_JSON="$WORK_DIR/_bmad/bam/family.json"
mkdir -p "$(dirname "$FAMILY_JSON")"

if [ "$PLAN" = "unknown" ]; then
    PLAN_FIELD="null"
else
    PLAN_FIELD="\"$PLAN\""
fi

cat > "$FAMILY_JSON" <<EOF
{
  "schema_version": "0.1.0",
  "bmad_version": "$BMAD_VERSION",
  "plan": $PLAN_FIELD,
  "installed": [
    {
      "module": "bmad-bam-platform",
      "version": "0.1.0",
      "installed_at": "$TIMESTAMP",
      "scope": "wave-0-skeleton"
    }
  ],
  "smoke_test": {
    "completed_at": "$TIMESTAMP",
    "plan_selected": $PLAN_FIELD,
    "target_skill": "$TARGET_SKILL_NAME",
    "runner": "tests/wave-0/run-smoke-test.sh"
  },
  "shared_mode": false,
  "context-budget": {
    "tier1-total-max-tokens": 40000,
    "warn-at-tier3-tokens": 30000,
    "fail-at-total-tokens": 150000
  }
}
EOF

echo ">>> final family.json:"
cat "$FAMILY_JSON"

if [ "$PLAN" = "A" ] || [ "$PLAN" = "B" ]; then
    echo ">>> SMOKE TEST PASS (plan=$PLAN)"
    exit 0
fi

echo ">>> SMOKE TEST FAIL (plan=unknown; neither A nor B passed)" >&2
exit 2
