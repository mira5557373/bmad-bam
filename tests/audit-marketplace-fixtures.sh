#!/usr/bin/env bash
# tests/audit-marketplace-fixtures.sh
#
# Tier-1 fixture driver — verifies tests/audit-marketplace.sh emits the
# expected check tag for each fixture under tests/fixtures/marketplace-audit/.
#
# Contract:
#   - Good fixtures must exit 0.
#   - Bad fixtures must exit non-zero AND emit their named (check X) tag
#     on stderr. A bad fixture MAY trip other checks (documented in
#     tests/fixtures/marketplace-audit/README.md) — we only assert that
#     the primary check fires, not that it's the only error.
#
# Usage:
#   tests/audit-marketplace-fixtures.sh         # run all fixtures
#   tests/audit-marketplace-fixtures.sh -v      # verbose: show stderr per case

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
AUDIT="$REPO_ROOT/tests/audit-marketplace.sh"
F="$REPO_ROOT/tests/fixtures/marketplace-audit"
VERBOSE=0

if [ "${1:-}" = "-v" ]; then
    VERBOSE=1
fi

PASS=0
FAIL=0
FAILED_CASES=()

# Assert that running the audit against a fixture produces the expected
# exit code AND (for failing fixtures) the expected check tag in stderr.
#
# Args:
#   $1 = case name (for output)
#   $2 = expected_outcome: "pass" or "fail"
#   $3 = expected_tag: substring that MUST appear in stderr (empty for pass)
#   $4 = fixture marketplace.json path
#   $5 = --v6-root path
#   $6 = --skill-root path
assert_case() {
    local name="$1" outcome="$2" tag="$3" market="$4" v6r="$5" skr="$6"
    local stderr_out exit_code

    local skr_args=()
    [ -n "$skr" ] && skr_args=(--skill-root "$skr")
    stderr_out="$("$AUDIT" "$market" --v6-root "$v6r" "${skr_args[@]}" 2>&1 1>/dev/null || true)"
    # Re-run to capture exit code; `|| true` prevents `set -e` from killing us
    # on the expected non-zero exits from bad fixtures.
    "$AUDIT" "$market" --v6-root "$v6r" "${skr_args[@]}" >/dev/null 2>&1 && exit_code=0 || exit_code=$?

    local ok=1
    case "$outcome" in
        pass)
            if [ "$exit_code" -ne 0 ]; then ok=0; fi
            ;;
        fail)
            if [ "$exit_code" -eq 0 ]; then ok=0; fi
            if [ -n "$tag" ] && ! echo "$stderr_out" | grep -qF "$tag"; then ok=0; fi
            ;;
        *)
            echo "INTERNAL: bad outcome '$outcome'" >&2
            exit 1
            ;;
    esac

    if [ "$ok" -eq 1 ]; then
        PASS=$((PASS + 1))
        echo "  [PASS] $name (exit=$exit_code, outcome=$outcome${tag:+, tag=\"$tag\"})"
    else
        FAIL=$((FAIL + 1))
        FAILED_CASES+=("$name")
        echo "  [FAIL] $name (exit=$exit_code, outcome=$outcome${tag:+, tag=\"$tag\"})"
        if [ "$VERBOSE" -eq 1 ] || [ "$FAIL" -le 3 ]; then
            echo "    stderr:"
            echo "$stderr_out" | sed 's/^/      /'
        fi
    fi
}

echo "=== audit-marketplace fixture verification ==="
echo ""

# Good cases (expect exit 0, no tag)
assert_case "good-minimal" pass "" \
    "$F/marketplace-good-minimal.json" \
    "$F/fake-v6" \
    "$F/fake-source/skills"

assert_case "good-orphan-with-sentinel" pass "" \
    "$F/marketplace-bad-orphan-skill-with-sentinel.json" \
    "$F/fake-v6" \
    "$F/fake-source/skills"

# Phase-mode fixtures (Concern 5)
# Skill-root arg deliberately empty so audit auto-detects phase mode from the
# listed skill path. With --skill-root present, mode would force to flat and
# the bad-phase-orphan tag would be (check d) not (check d, phase mode).
assert_case "good-phase-numbered" pass "" \
    "$F/marketplace-good-phase-numbered.json" \
    "$F/fake-source" \
    ""

# Bad cases (expect non-zero exit, named tag must appear in stderr)
assert_case "bad-missing-skill (check a)" fail "(check a)" \
    "$F/marketplace-bad-missing-skill.json" \
    "$F/fake-v6" \
    "$F/fake-source/skills"

assert_case "bad-module-root (check b)" fail "(check b)" \
    "$F/marketplace-bad-module-root.json" \
    "$F/fake-v6" \
    "$F/fake-source/skills"

assert_case "bad-no-version (check c)" fail "(check c)" \
    "$F/marketplace-bad-no-version.json" \
    "$F/fake-v6" \
    "$F/fake-source/skills"

assert_case "bad-orphan-skill (check d)" fail "(check d)" \
    "$F/marketplace-bad-orphan-skill.json" \
    "$F/fake-v6" \
    "$F/fake-source/skills"

assert_case "bad-missing-module-entry (check e)" fail "(check e)" \
    "$F/marketplace-bad-missing-module-entry.json" \
    "$F/fake-v6" \
    "$F/fake-source/skills"

assert_case "bad-unknown-namespace (check f)" fail "(check f)" \
    "$F/marketplace-bad-unknown-namespace.json" \
    "$F/fake-v6-with-bad" \
    "$F/fake-v6-with-bad/bam-faux/skills"

# bad-phase-orphan needs the .no-marketplace sentinel removed for this run
# (the sentinel is restored after) — this exercises check (d) phase-mode orphan
SENTINEL_PATH="$F/fake-source/1-test-phase/skill-phased-orphan/.no-marketplace"
rm -f "$SENTINEL_PATH"
assert_case "bad-phase-orphan (check d phase)" fail "(check d, phase mode)" \
    "$F/marketplace-bad-phase-orphan.json" \
    "$F/fake-source" \
    ""
# Restore sentinel for other tests
touch "$SENTINEL_PATH"

# Check (g) fixture — stale pre-Phase-C path (bmad-bam-platform/data/...) in step file
assert_case "bad-stale-path (check g)" fail "(check g)" \
    "$F/marketplace-bad-stale-path.json" \
    "$F/fake-v6-with-stale-path" \
    ""

# Check (h) fixture — fictional bmad run X in SKILL.md
assert_case "bad-fictional-run (check h)" fail "(check h)" \
    "$F/marketplace-bad-fictional-run.json" \
    "$F/fake-v6-with-fictional-run" \
    ""

echo ""
echo "=== Results: $PASS pass, $FAIL fail ==="

if [ "$FAIL" -gt 0 ]; then
    echo "Failed cases:"
    for c in "${FAILED_CASES[@]}"; do echo "  - $c"; done
    exit 1
fi

echo "All fixture cases behave as documented."
exit 0
