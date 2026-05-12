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
#     a glob-matching path. Verified against TWO target skills per spec §7.3.
#   - Plan B (fallback): an explicit user-tier override placed at
#     `_bmad/custom/<skill-basename>.toml` puts the literal explicit path
#     `file:{project-root}/_bmad/platform/project-context.md` into the
#     resolved `agent.persistent_facts`.
#   - Plan C is *not* exercised here; it requires a live LLM session.
#
# Usage:
#   tests/wave-0/run-smoke-test.sh [--keep-workdir]
#
#   --keep-workdir   Disable the trap that rm -rf's WORK_DIR on exit. Useful
#                    when debugging a failed run.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

KEEP_WORKDIR=0
for arg in "$@"; do
    case "$arg" in
        --keep-workdir|--keep) KEEP_WORKDIR=1 ;;
        --help|-h)
            sed -n '/^# Usage:/,/^$/p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'
            exit 0
            ;;
        *) echo "ERROR: unknown arg: $arg" >&2; exit 64 ;;
    esac
done

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

# Spec §7.3 step 5 + 6: verify against bmad-create-architecture AND bmad-create-prd.
# The runner records per-skill results in family.json. Plan A requires ALL
# targets to pass; if any one fails, fall through to Plan B.
declare -a TARGET_SKILL_NAMES=(
    "bmad-create-architecture"
    "bmad-create-prd"
)
declare -A TARGET_SKILL_SRCS=(
    ["bmad-create-architecture"]="$REPO_ROOT/external/bmad-method/src/bmm-skills/3-solutioning/bmad-create-architecture"
    ["bmad-create-prd"]="$REPO_ROOT/external/bmad-method/src/bmm-skills/2-plan-workflows/bmad-create-prd"
)
for skill in "${TARGET_SKILL_NAMES[@]}"; do
    src="${TARGET_SKILL_SRCS[$skill]}"
    if [ ! -d "$src" ]; then
        echo "ERROR: target skill source missing at $src" >&2
        exit 70
    fi
    if [ ! -f "$src/customize.toml" ]; then
        echo "ERROR: $src has no customize.toml" >&2
        exit 70
    fi
done

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
# Setup ephemeral work directory + durable run log directory
# ---------------------------------------------------------------------------
WORK_DIR="$(mktemp -d)"
RUN_TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"
RUN_LOG_DIR="$REPO_ROOT/tests/wave-0/run-logs/$RUN_TIMESTAMP"
mkdir -p "$RUN_LOG_DIR"

if [ "$KEEP_WORKDIR" -eq 0 ]; then
    trap 'rm -rf "$WORK_DIR"' EXIT
else
    trap 'echo ">>> WORK_DIR preserved at $WORK_DIR (--keep-workdir)" >&2' EXIT
fi

echo ">>> WORK_DIR=$WORK_DIR"
echo ">>> durable run log dir=$RUN_LOG_DIR"

LOG_DIR_IN_WORK="$WORK_DIR/_bmad/bam/install-logs"
mkdir -p "$LOG_DIR_IN_WORK"

# Helper: emit a step's intermediate artifact in the format step-files document.
write_step_artifact() {
    local name="$1"; shift
    local body="$*"
    printf '%s\n' "$body" > "$LOG_DIR_IN_WORK/$name"
}

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
# Step 01-c-verify-bmad-version (workflow artifact: bmad-version.txt)
# ---------------------------------------------------------------------------
BMAD_VERSION="$(python3 -c "import json,sys; print(json.load(open(sys.argv[1]))['version'])" \
    "$REPO_ROOT/external/bmad-method/package.json")"
VERIFY_TS="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
write_step_artifact "bmad-version.txt" \
"bmad_version=$BMAD_VERSION
verified_at=$VERIFY_TS
status=ok"
echo ">>> step-01: BMAD version $BMAD_VERSION (OK)"

# ---------------------------------------------------------------------------
# Step 02-c-detect-universal-glob (workflow artifact: universal-glob-presence.txt)
# ---------------------------------------------------------------------------
GLOB_LITERAL='file:{project-root}/**/project-context.md'
mapfile -t CUSTOMIZE_FILES < <(find "$REPO_ROOT/external/bmad-method/src" -name customize.toml -type f)
TOTAL=${#CUSTOMIZE_FILES[@]}
WITH_GLOB=0
for f in "${CUSTOMIZE_FILES[@]}"; do
    if grep -qF "$GLOB_LITERAL" "$f"; then
        WITH_GLOB=$((WITH_GLOB+1))
    fi
done
if [ "$WITH_GLOB" -eq 0 ]; then
    COVERAGE="absent"
elif [ "$WITH_GLOB" -eq "$TOTAL" ]; then
    COVERAGE="full"
else
    COVERAGE="partial"
fi
write_step_artifact "universal-glob-presence.txt" \
"total_customize_toml=$TOTAL
with_universal_glob=$WITH_GLOB
coverage=$COVERAGE
verified_at=$(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo ">>> step-02: universal-glob coverage = $COVERAGE ($WITH_GLOB/$TOTAL)"

# ---------------------------------------------------------------------------
# Step 03-c-install-test-mode: simulate BMAD installer + run BAM post-install
# (workflow artifact: install-status.txt)
# ---------------------------------------------------------------------------
echo ">>> step-03: simulating _installSharedScripts (resolver to _bmad/scripts/)"
mkdir -p "$WORK_DIR/_bmad/scripts"
cp "$RESOLVER_SRC" "$WORK_DIR/_bmad/scripts/"

echo ">>> step-03: simulating installVerbatimSkills for ${#TARGET_SKILL_NAMES[@]} target skills"
declare -A TARGET_SKILL_DIRS=()
for skill in "${TARGET_SKILL_NAMES[@]}"; do
    TARGET_SKILL_DIRS[$skill]="$WORK_DIR/.claude/skills/$skill"
    mkdir -p "$(dirname "${TARGET_SKILL_DIRS[$skill]}")"
    cp -r "${TARGET_SKILL_SRCS[$skill]}" "${TARGET_SKILL_DIRS[$skill]}"
done

echo ">>> step-03: running BAM post-install hook"
SENTINEL="$("$POST_INSTALL" "$WORK_DIR")"
if [ -z "$SENTINEL" ]; then
    echo "ERROR: post-install returned empty sentinel" >&2
    exit 1
fi
echo ">>> step-03: sentinel=$SENTINEL"

if [ ! -f "$WORK_DIR/_bmad/platform/project-context.md" ]; then
    echo "ERROR: project-context.md not present at $WORK_DIR/_bmad/platform/project-context.md" >&2
    exit 1
fi
if ! grep -qF "$SENTINEL" "$WORK_DIR/_bmad/platform/project-context.md"; then
    echo "ERROR: sentinel token not found inside project-context.md" >&2
    exit 1
fi
write_step_artifact "install-status.txt" \
"status=installed
sentinel=$SENTINEL
target=_bmad/platform/project-context.md
verified_at=$(date -u +%Y-%m-%dT%H:%M:%SZ)"

# ---------------------------------------------------------------------------
# Step 04-c-emit-sentinel (workflow artifact: sentinel.txt)
# ---------------------------------------------------------------------------
printf '%s\n' "$SENTINEL" > "$LOG_DIR_IN_WORK/sentinel.txt"
echo ">>> step-04: sentinel.txt persisted"

# Source helpers
# shellcheck source=lib/sentinel.sh
source "$REPO_ROOT/tests/wave-0/lib/sentinel.sh"
# shellcheck source=lib/inspect-context.sh
source "$REPO_ROOT/tests/wave-0/lib/inspect-context.sh"

PLAN="unknown"

# ---------------------------------------------------------------------------
# Step 05-v-verify-plan-a (workflow artifact: plan-a-result.txt)
#
# Plan A passes iff for EVERY target skill: literal glob string survives merge
# into resolved persistent_facts AND sentinel file present at glob-matching path.
# ---------------------------------------------------------------------------
echo ">>> step-05: Plan A check (multi-skill, per spec §7.3 steps 5+6)"
PLAN_A_ALL_PASS=1
declare -A PLAN_A_PER_SKILL=()

for skill in "${TARGET_SKILL_NAMES[@]}"; do
    skill_dir="${TARGET_SKILL_DIRS[$skill]}"
    resolved="$(inspect_context_for_skill "$skill_dir" "$WORK_DIR" 2>/dev/null || true)"

    if [ -n "$resolved" ] \
        && printf '%s' "$resolved" | grep -qF "$GLOB_LITERAL" \
        && [ -f "$WORK_DIR/_bmad/platform/project-context.md" ] \
        && grep -qF "$SENTINEL" "$WORK_DIR/_bmad/platform/project-context.md"; then
        PLAN_A_PER_SKILL[$skill]="pass"
        echo "    [$skill] pass"
    else
        PLAN_A_PER_SKILL[$skill]="fail"
        PLAN_A_ALL_PASS=0
        echo "    [$skill] fail"
    fi
done

if [ "$PLAN_A_ALL_PASS" -eq 1 ]; then
    PLAN="A"
    echo ">>> step-05: Plan A PASS (all ${#TARGET_SKILL_NAMES[@]} target skills)"
else
    echo ">>> step-05: Plan A FAIL (one or more target skills failed)"
fi

{
    echo "result=$([ "$PLAN_A_ALL_PASS" -eq 1 ] && echo pass || echo fail)"
    echo "observation_method=invoke-resolution-fn-python"
    echo "targets_checked=${#TARGET_SKILL_NAMES[@]}"
    for skill in "${TARGET_SKILL_NAMES[@]}"; do
        echo "target.$skill=${PLAN_A_PER_SKILL[$skill]}"
    done
    echo "verified_at=$(date -u +%Y-%m-%dT%H:%M:%SZ)"
} > "$LOG_DIR_IN_WORK/plan-a-result.txt"

# ---------------------------------------------------------------------------
# Step 06-v-verify-plan-b (workflow artifact: plan-b-result.txt)
#
# Plan B passes iff after planting explicit user-tier overrides for each
# target skill, the explicit path survives merge into resolved persistent_facts.
# ---------------------------------------------------------------------------
declare -A PLAN_B_PER_SKILL=()
PLAN_B_PATH='file:{project-root}/_bmad/platform/project-context.md'

if [ "$PLAN" = "unknown" ]; then
    echo ">>> step-06: Plan B check (multi-skill)"
    PLAN_B_ALL_PASS=1
    OVERRIDE_DIR="$WORK_DIR/_bmad/custom"
    mkdir -p "$OVERRIDE_DIR"

    for skill in "${TARGET_SKILL_NAMES[@]}"; do
        cat > "$OVERRIDE_DIR/$skill.toml" <<EOF
# Plan B explicit overlay — generated by run-smoke-test.sh
[agent]
persistent_facts = [
  "$PLAN_B_PATH",
]
EOF
        skill_dir="${TARGET_SKILL_DIRS[$skill]}"
        resolved="$(inspect_context_for_skill "$skill_dir" "$WORK_DIR" 2>/dev/null || true)"
        if [ -n "$resolved" ] && printf '%s' "$resolved" | grep -qF "$PLAN_B_PATH"; then
            PLAN_B_PER_SKILL[$skill]="pass"
            echo "    [$skill] pass"
        else
            PLAN_B_PER_SKILL[$skill]="fail"
            PLAN_B_ALL_PASS=0
            echo "    [$skill] fail"
        fi
    done

    if [ "$PLAN_B_ALL_PASS" -eq 1 ]; then
        PLAN="B"
        echo ">>> step-06: Plan B PASS (all ${#TARGET_SKILL_NAMES[@]} target skills)"
    else
        echo ">>> step-06: Plan B FAIL"
    fi

    {
        echo "result=$([ "$PLAN_B_ALL_PASS" -eq 1 ] && echo pass || echo fail)"
        echo "overlay_dir=_bmad/custom/"
        for skill in "${TARGET_SKILL_NAMES[@]}"; do
            echo "target.$skill=${PLAN_B_PER_SKILL[$skill]}"
        done
        echo "verified_at=$(date -u +%Y-%m-%dT%H:%M:%SZ)"
    } > "$LOG_DIR_IN_WORK/plan-b-result.txt"
else
    echo ">>> step-06: Plan B skipped (Plan A passed)"
fi

# ---------------------------------------------------------------------------
# Step 07-v-verify-plan-c: not exercised by headless runner.
# ---------------------------------------------------------------------------
echo ">>> step-07: Plan C requires manual verification (see step-07-v-verify-plan-c.md)"

# ---------------------------------------------------------------------------
# Step 08-c-persist-result: write family.json
# ---------------------------------------------------------------------------
TIMESTAMP="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
FAMILY_JSON="$WORK_DIR/_bmad/bam/family.json"
mkdir -p "$(dirname "$FAMILY_JSON")"

# Build per-target JSON
build_targets_json() {
    local -n results_ref=$1
    local first=1
    printf '['
    for skill in "${TARGET_SKILL_NAMES[@]}"; do
        if [ "$first" -eq 0 ]; then printf ', '; fi
        printf '{"skill": "%s", "result": "%s"}' "$skill" "${results_ref[$skill]:-unknown}"
        first=0
    done
    printf ']'
}
PLAN_A_TARGETS_JSON="$(build_targets_json PLAN_A_PER_SKILL)"
if [ "${#PLAN_B_PER_SKILL[@]}" -gt 0 ]; then
    PLAN_B_TARGETS_JSON="$(build_targets_json PLAN_B_PER_SKILL)"
else
    PLAN_B_TARGETS_JSON="null"
fi

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
    "log_directory": "_bmad/bam/install-logs/",
    "runner": "tests/wave-0/run-smoke-test.sh",
    "targets": {
      "plan_a": $PLAN_A_TARGETS_JSON,
      "plan_b": $PLAN_B_TARGETS_JSON
    }
  },
  "shared_mode": false,
  "context-budget": {
    "tier1-total-max-tokens": 40000,
    "tier1-per-module-max-tokens": {
      "platform": 5000,
      "data": 4000,
      "ai": 8000,
      "rag": 4000,
      "integration": 5000,
      "trust": 6000,
      "ops": 4000,
      "ux": 4000
    },
    "tier2-max-tokens": 20000,
    "warn-at-tier3-tokens": 30000,
    "fail-at-total-tokens": 150000
  }
}
EOF

echo ">>> step-08: family.json written"
echo ">>> final family.json:"
cat "$FAMILY_JSON"

# ---------------------------------------------------------------------------
# Durable run log: copy intermediate artifacts + family.json to run-logs/<ts>/
# ---------------------------------------------------------------------------
cp -r "$LOG_DIR_IN_WORK/." "$RUN_LOG_DIR/"
cp "$FAMILY_JSON" "$RUN_LOG_DIR/family.json"

{
    echo "run_timestamp=$RUN_TIMESTAMP"
    echo "plan=$PLAN"
    echo "bmad_version=$BMAD_VERSION"
    echo "python_version=$PY_VER"
    echo "work_dir_kept=$([ "$KEEP_WORKDIR" -eq 1 ] && echo true || echo false)"
} > "$RUN_LOG_DIR/run-meta.txt"

echo ">>> durable run log: $RUN_LOG_DIR"

if [ "$PLAN" = "A" ] || [ "$PLAN" = "B" ]; then
    echo ">>> SMOKE TEST PASS (plan=$PLAN)"
    exit 0
fi

echo ">>> SMOKE TEST FAIL (plan=unknown; neither A nor B passed)" >&2
exit 2
