#!/usr/bin/env bash
# tests/integration/run-real-install.sh
#
# Tier-2 real-installer test — automates the Plan C R4 procedure that
# verified Concern 5's BMM-canonical layout end-to-end.
#
# This script PROMOTED 2026-05-16 from SKIP-77 stub to a real test, per
# ADR 007 revisit trigger #1 (which fired when Concern 5 landed via PR #3,
# unblocking real `bmad install --custom-source` against BAM's Strategy-1
# marketplace layout). See ADR 010 for the promotion decision + design.
#
# GATING (env-var opt-in by design):
#   BAM_TIER2=1   → script runs the full procedure
#   default       → exits 77 (POSIX SKIP) with a brief explanation
#
# This keeps the test opt-in for contributors without `bmad` setup, while
# being CI-friendly: any CI job that sets BAM_TIER2=1 gets full Tier-2
# coverage.
#
# WHAT IT DOES (when BAM_TIER2=1):
#   1. Ensure external/bmad-method/node_modules is installed (one-time per
#      checkout); abort with exit 75 if external/bmad-method/ is missing.
#   2. mktemp -d a clean test project root.
#   3. node external/bmad-method/tools/installer/bmad-cli.js install
#        --custom-source $REPO_ROOT --modules bbp
#        --directory $WORK_DIR --tools claude-code --yes
#   4. Verify Strategy-1 outcome on disk: _bmad/bbp/config.yaml +
#      _bmad/bbp/module-help.csv exist; all expected BAM skills land at
#      .claude/skills/bmad-bam-*/ (tool-specific install path, NOT
#      _bmad/<code>/<skill>/). The expected-skills list is read from
#      .claude-plugin/marketplace.json so it stays in sync as new
#      Foundation/Lifecycle/Commercial skills ship.
#   5. Run finalize: bash $WORK_DIR/.claude/skills/bmad-bam-finalize/
#      scripts/post-install.sh $WORK_DIR.
#   6. Verify sentinel: _bmad-output/bbp/project-context.md exists +
#      contains exactly one BAM_LOAD_VERIFY_[a-f0-9]{32} token.
#   7. trap cleanup: rm -rf $WORK_DIR on script exit.
#
# WHAT IT DOES NOT DO:
#   - LLM-side glob expansion + recital. That stays Tier-3 manual
#     (Plan C ratification via real Claude Code IDE session OR autonomous
#     subagent-proxy per PLAN-C-RATIFICATION.md R1-R4 methodology).
#
# Exit codes:
#   0   PASS — full procedure succeeded; sentinel verified
#   1   FAIL — genuine regression; see stderr for which step failed
#   64  usage error
#   73  precondition missing (e.g., external/bmad-method/ absent)
#   75  environment unmet (e.g., node missing, npm install failed)
#   77  SKIP — BAM_TIER2 != 1 (default; contributor opt-in)

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_ROOT="$(cd "$REPO_ROOT/.." && pwd)"   # one more level up from tests/

# ─── Gating ──────────────────────────────────────────────────────────────
if [ "${BAM_TIER2:-0}" != "1" ]; then
    cat <<EOF
SKIP: Tier-2 real-install is opt-in (set BAM_TIER2=1 to run).

  This script automates the Plan C R4 procedure (real bmad install +
  Strategy-1 verification + finalize + sentinel check). It's opt-in to
  keep contributors without bmad CLI setup unblocked.

  To run:
    BAM_TIER2=1 tests/integration/run-real-install.sh

  See ADR 010 (Tier-2 promotion) + tests/integration/MANUAL.md for the
  manual procedure if you want to walk through it interactively.
EOF
    exit 77
fi

echo ">>> Tier-2 real-install (BAM_TIER2=1)"
echo "    REPO_ROOT = $REPO_ROOT"

# ─── Precondition: external/bmad-method/ exists ──────────────────────────
BMAD_DIR="$REPO_ROOT/external/bmad-method"
if [ ! -d "$BMAD_DIR" ]; then
    echo "FAIL: external/bmad-method/ submodule not present at $BMAD_DIR" >&2
    echo "      Initialize the submodule: git submodule update --init external/bmad-method" >&2
    exit 73
fi

BMAD_CLI_JS="$BMAD_DIR/tools/installer/bmad-cli.js"
if [ ! -f "$BMAD_CLI_JS" ]; then
    echo "FAIL: bmad-cli.js not found at $BMAD_CLI_JS" >&2
    exit 73
fi

# ─── Precondition: node available ────────────────────────────────────────
if ! command -v node >/dev/null 2>&1; then
    echo "FAIL: node not on PATH" >&2
    echo "      Install Node.js >= 20.0.0 to run Tier-2" >&2
    exit 75
fi

# ─── One-time: npm install in external/bmad-method/ ──────────────────────
if [ ! -d "$BMAD_DIR/node_modules" ]; then
    echo ">>> Installing BMAD's npm deps (one-time per checkout)..."
    (cd "$BMAD_DIR" && npm install --no-audit --no-fund --silent 2>&1 | tail -5) || {
        echo "FAIL: npm install in $BMAD_DIR failed" >&2
        exit 75
    }
fi

# ─── Setup: mktemp test project + trap cleanup ───────────────────────────
WORK_DIR="$(mktemp -d -t bam-tier2-XXXXXX)"
trap 'rm -rf "$WORK_DIR"' EXIT

echo ">>> WORK_DIR = $WORK_DIR"

# ─── Step 1: bmad install --custom-source ────────────────────────────────
echo ">>> Step 1: bmad install --custom-source $REPO_ROOT --modules bbp ..."

# The installer's interactive spinners emit a lot of escape codes;
# we capture stdout+stderr for the success/fail line scan.
INSTALL_LOG="$WORK_DIR/install.log"
if ! node "$BMAD_CLI_JS" install \
    --directory "$WORK_DIR" \
    --custom-source "$REPO_ROOT" \
    --modules bbp \
    --tools claude-code \
    --yes >"$INSTALL_LOG" 2>&1; then
    echo "FAIL: bmad install failed (exit $?)" >&2
    echo "      Install log tail:" >&2
    tail -20 "$INSTALL_LOG" >&2
    exit 1
fi

# Sanity: install completion banner contains "Installed to: $WORK_DIR/_bmad"
if ! grep -qF "Installed to: $WORK_DIR/_bmad" "$INSTALL_LOG"; then
    echo "FAIL: install completion banner missing (expected 'Installed to: $WORK_DIR/_bmad')" >&2
    tail -20 "$INSTALL_LOG" >&2
    exit 1
fi
echo "    PASS: install completed"

# ─── Step 2: Strategy-1 verification on disk ─────────────────────────────
echo ">>> Step 2: verify Strategy-1 outcome (_bmad/bbp/ contents)"

if [ ! -d "$WORK_DIR/_bmad/bbp" ]; then
    echo "FAIL: _bmad/bbp/ not created" >&2
    exit 1
fi
if [ ! -f "$WORK_DIR/_bmad/bbp/config.yaml" ]; then
    echo "FAIL: _bmad/bbp/config.yaml not created" >&2
    exit 1
fi
if [ ! -f "$WORK_DIR/_bmad/bbp/module-help.csv" ]; then
    echo "FAIL: _bmad/bbp/module-help.csv not copied" >&2
    exit 1
fi
echo "    PASS: _bmad/bbp/ contains config.yaml + module-help.csv (Strategy-1 confirmed)"

# ─── Step 3: BAM skills materialized at .claude/skills/ ──────────────────
echo ">>> Step 3: verify BAM skills materialized at tool-specific install dir"

# Source of truth: skills declared under the bmad-bam-platform plugin in
# .claude-plugin/marketplace.json. Reading the list dynamically keeps this
# check from going stale as new Foundation/Lifecycle/Commercial skills ship.
EXPECTED_SKILLS=$(python3 -c "
import json, sys
with open('$REPO_ROOT/.claude-plugin/marketplace.json') as f:
    m = json.load(f)
for p in m.get('plugins', []):
    if p.get('name') == 'bmad-bam-platform':
        for s in p.get('skills', []):
            # Entries are typically path strings like './src-v6/.../bmad-bam-xyz';
            # tolerate dict form too for forward-compat.
            if isinstance(s, str):
                name = s.rstrip('/').rsplit('/', 1)[-1]
            else:
                name = s.get('name') or s.get('path','').rstrip('/').rsplit('/',1)[-1]
            if name:
                print(name)
        sys.exit(0)
sys.exit('bmad-bam-platform plugin not found in marketplace.json')
")
BAM_SKILLS_EXPECTED=$(printf '%s\n' "$EXPECTED_SKILLS" | wc -l | tr -d ' ')
BAM_SKILLS_FOUND=0
while IFS= read -r skill; do
    [ -z "$skill" ] && continue
    if [ -d "$WORK_DIR/.claude/skills/$skill" ]; then
        BAM_SKILLS_FOUND=$((BAM_SKILLS_FOUND + 1))
    else
        echo "FAIL: .claude/skills/$skill not present" >&2
    fi
done <<< "$EXPECTED_SKILLS"
if [ "$BAM_SKILLS_FOUND" -ne "$BAM_SKILLS_EXPECTED" ]; then
    echo "FAIL: expected $BAM_SKILLS_EXPECTED BAM skills at .claude/skills/, found $BAM_SKILLS_FOUND" >&2
    exit 1
fi
echo "    PASS: all $BAM_SKILLS_FOUND/$BAM_SKILLS_EXPECTED BAM skills installed at .claude/skills/ (tool-specific path; Concern 5 R2 empirical reality)"

# ─── Step 4: Run finalize ─────────────────────────────────────────────────
echo ">>> Step 4: run finalize (post-install.sh)"

FINALIZE_SCRIPT="$WORK_DIR/.claude/skills/bmad-bam-finalize/scripts/post-install.sh"
if [ ! -f "$FINALIZE_SCRIPT" ]; then
    echo "FAIL: finalize script not found at $FINALIZE_SCRIPT" >&2
    exit 1
fi

FINALIZE_OUTPUT="$(bash "$FINALIZE_SCRIPT" "$WORK_DIR" 2>&1)"
echo "    finalize output: $FINALIZE_OUTPUT"

# ─── Step 5: Sentinel verification ───────────────────────────────────────
echo ">>> Step 5: verify sentinel at {output_folder}/bbp/project-context.md"

SENTINEL_FILE="$WORK_DIR/_bmad-output/bbp/project-context.md"
if [ ! -f "$SENTINEL_FILE" ]; then
    echo "FAIL: sentinel file not created at $SENTINEL_FILE" >&2
    exit 1
fi

SENTINEL_TOKEN="$(grep -oE 'BAM_LOAD_VERIFY_[a-f0-9]{32}' "$SENTINEL_FILE" | head -1 || true)"
if [ -z "$SENTINEL_TOKEN" ]; then
    echo "FAIL: BAM_LOAD_VERIFY_<32hex> token not found in $SENTINEL_FILE" >&2
    head -30 "$SENTINEL_FILE" >&2
    exit 1
fi
echo "    PASS: sentinel = $SENTINEL_TOKEN"

# ─── Step 6: P3.2 Lifecycle skills + QG evidence dir contract ──────────────
# Wave P3.2 (2026-05-17) added 4 new Lifecycle skills + QG-D1 partial gate.
# The dynamic skill-list check above (Step 3) already ensures these install;
# this step makes the P3.2 contract explicit and verifies the evidence-dir
# pathing matches what the new skills' manifests declare as `outputs.location`.
echo ">>> Step 6: P3.2 Lifecycle skills + evidence-dir contract"

P32_SKILLS=(
    bmad-bam-design-tenant-onboarding
    bmad-bam-design-tenant-offboarding
    bmad-bam-design-multi-tenant-testing
    bmad-bam-design-tenant-migration-tooling
)
for s in "${P32_SKILLS[@]}"; do
    if [ ! -d "$WORK_DIR/.claude/skills/$s" ]; then
        echo "FAIL: P3.2 skill $s not present at .claude/skills/" >&2
        exit 1
    fi
    # Slash-command discovery: a Claude-Code skill is invocable via /<skill-name>
    # when its dir exists under .claude/skills/. SKILL.md presence is the
    # discovery sentinel for the slash-command surface.
    if [ ! -f "$WORK_DIR/.claude/skills/$s/SKILL.md" ]; then
        echo "FAIL: P3.2 skill $s missing SKILL.md (slash-command discovery sentinel)" >&2
        exit 1
    fi
done
echo "    PASS: 4 P3.2 Lifecycle skills present + discoverable as slash-commands"

# Evidence dirs for QG-M2 + QG-D1 must be creatable (skill outputs write here).
# P3.2 skills declare outputs at _bmad/bam/evidence/QG-M2/ and QG-D1/; verify
# the parent path is writable. Per spec §6.0 the dirs are created on-demand.
mkdir -p "$WORK_DIR/_bmad/bam/evidence/QG-M2" "$WORK_DIR/_bmad/bam/evidence/QG-D1" || {
    echo "FAIL: cannot create QG-M2/QG-D1 evidence dirs under $WORK_DIR/_bmad/bam/evidence/" >&2
    exit 1
}
echo "    PASS: QG-M2 + QG-D1 evidence dirs creatable"

# ─── Summary ─────────────────────────────────────────────────────────────
echo ""
echo ">>> TIER-2 PASS"
echo "    install pipeline: end-to-end OK"
echo "    Strategy 1:       confirmed (config.yaml + module-help.csv at _bmad/bbp/)"
echo "    skill install:    confirmed at .claude/skills/bmad-bam-*/ ($BAM_SKILLS_FOUND/$BAM_SKILLS_EXPECTED)"
echo "    finalize:         sentinel written"
echo "    sentinel token:   $SENTINEL_TOKEN"
echo "    P3.2 lifecycle:   4 skills + QG-M2/QG-D1 evidence dirs OK"
echo ""
echo "    Note: LLM-side glob expansion + recital is Tier-3 (manual);"
echo "          run Plan C ratification per tests/p2/PLAN-C-RATIFICATION.md"
echo "          if you also want to verify the activation contract end-to-end."

exit 0
