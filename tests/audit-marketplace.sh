#!/usr/bin/env bash
# tests/audit-marketplace.sh
#
# Tier-1 static audit of marketplace.json + v6 source tree. Always runs;
# no external dependencies beyond bash + Python 3 (JSON/TOML parsing).
#
# Checks:
#   (a) every listed skill path exists on disk
#   (b) every listed skill is under /<N>-<phase>/<name>/ (BMM-canonical),
#       /skills/<name>/ (legacy v6 pre-Concern-5), or /workflows/[<cat>/]<name>/
#       (v3); no module-root entries
#   (c) every plugin has a `version` field
#   (d) no orphans — every skill under <plugin-derived-scan-root>/ is listed
#       (phase mode walks <module>/<N-phase>/<skill>/; flat mode walks .../skills/<skill>/),
#       UNLESS the skill dir contains a `.no-marketplace` sentinel file
#   (e) every v6 module under <v6-root>/ (each src-v6/*/module.yaml) has at
#       least one corresponding plugin entry in marketplace.json
#   (f) step files in v6 skills don't reference unknown `_bmad/<ns>/` paths.
#       Known prefixes: _bmad/<code>/ from any module.yaml, _bmad/_memory/,
#       _bmad/bam/, _bmad-output/, _bmad/config.toml. ENH-0 fixed the file
#       glob 2026-05-16 to match phase-grouped layout.
#   (g) active source doesn't reference pre-Phase-C / pre-Concern-5 paths
#       (bmad-bam-platform/{data,agents,scripts,skills}/). Lines with
#       explanatory markers ("pre-Phase-C", "stale", "ADR 009", etc.) are
#       carved out so the audit itself + tracking docs remain clean.
#   (h) active source doesn't reference fictional `bmad run <skill>` CLI
#       (bmad-cli.js exposes only install/status/uninstall). Lines explaining
#       the command is fictional (carving markers: "fictional", "NOT a real",
#       "doesn't exist", "RR1") are carved out.
#
# Usage:
#   tests/audit-marketplace.sh                       # default: real marketplace + src-v6
#   tests/audit-marketplace.sh <marketplace.json>    # alt marketplace
#   tests/audit-marketplace.sh <marketplace.json> --v6-root <path>  # alt v6 tree
#   tests/audit-marketplace.sh <marketplace.json> --skill-root <path>  # override (d) scan root

set -euo pipefail

# Bash 4+ required: check (d) uses associative arrays (declare -A).
# macOS ships bash 3.2 by default; this script requires bash >= 4.0 (e.g.,
# via `brew install bash` on macOS, or system bash on most Linux distros).
if (( BASH_VERSINFO[0] < 4 )); then
    echo "ERROR: bash >= 4.0 required (you have bash ${BASH_VERSION})." >&2
    echo "  On macOS, install via Homebrew:  brew install bash" >&2
    echo "  Then re-run with the newer bash:  /usr/local/bin/bash tests/audit-marketplace.sh" >&2
    exit 64
fi

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MARKETPLACE="${1:-$REPO_ROOT/.claude-plugin/marketplace.json}"

# Optional --v6-root and --skill-root flags (mainly for fixture testing).
# Both are resolved to absolute paths so downstream comparisons against
# LISTED_RESOLVED (which always contains absolute paths) work regardless of
# whether the caller passed a relative or absolute path.
V6_ROOT="$REPO_ROOT/src-v6"
SKILL_ROOT_OVERRIDE=""
shift || true
while [ "$#" -gt 0 ]; do
    case "$1" in
        --v6-root|--skill-root)
            flag="$1"
            if [ "$#" -lt 2 ]; then
                echo "FAIL: $flag requires a path argument" >&2
                exit 64
            fi
            if [ ! -d "$2" ]; then
                echo "FAIL: $flag path does not exist: $2" >&2
                exit 64
            fi
            resolved="$(cd "$2" && pwd)"
            if [ "$flag" = "--v6-root" ]; then
                V6_ROOT="$resolved"
            else
                SKILL_ROOT_OVERRIDE="$resolved"
            fi
            shift 2
            ;;
        *) echo "Unknown arg: $1" >&2; exit 64 ;;
    esac
done

if [ ! -f "$MARKETPLACE" ]; then
    echo "FAIL: marketplace.json not found at $MARKETPLACE" >&2
    exit 1
fi

if ! command -v python3 >/dev/null 2>&1; then
    echo "ERROR: python3 not found on PATH; audit requires Python 3 as a JSON/TOML parser" >&2
    exit 1
fi

# Pre-check: marketplace.json must be valid JSON. Without this, downstream
# `python3 -c "json.load(...)"` calls below dump a confusing Python traceback
# on malformed JSON; surface a friendly error instead.
if ! python3 -c "import json,sys; json.load(open(sys.argv[1]))" "$MARKETPLACE" 2>/dev/null; then
    echo "FAIL: marketplace.json is not valid JSON: $MARKETPLACE" >&2
    exit 1
fi

ERRORS=0
emit() { echo "FAIL: $1" >&2; ERRORS=$((ERRORS + 1)); }

# Resolve a relative skill path. marketplace.json entries are repo-root-
# relative `./...` paths (matching BMAD installer convention: paths are
# relative to the plugin source root, which is REPO_ROOT for in-tree
# marketplace.json files).
resolve_skill() {
    local rel="$1"
    echo "$REPO_ROOT/${rel#./}"
}

# ─── Check (c): every plugin has `version` ────────────────────────────────
while IFS= read -r name; do
    [ -z "$name" ] || emit "plugin '$name' is missing the 'version' field (check c)"
done < <(python3 -c "
import json, sys
m = json.load(open(sys.argv[1]))
for p in m.get('plugins', []):
    if 'version' not in p:
        print(p.get('name', '<unnamed>'))
" "$MARKETPLACE")

# ─── Checks (a) + (b): every listed skill exists AND ends in /skills/<name> ─
LISTED_SKILLS="$(python3 -c "
import json, sys
m = json.load(open(sys.argv[1]))
for p in m.get('plugins', []):
    for s in p.get('skills', []):
        print(s)
" "$MARKETPLACE")"

LISTED_RESOLVED=()
while IFS= read -r skill; do
    [ -z "$skill" ] && continue
    resolved="$(resolve_skill "$skill")"
    LISTED_RESOLVED+=("$resolved")

    if [ ! -d "$resolved" ]; then
        emit "skill path does not exist: $skill (check a)"
        continue
    fi
    # Check (b): path must be a leaf-skill entry — must contain a phase-numbered
    # segment (N-<name>/, BMM-canonical, e.g. /1-foundation/, /2-plan-workflows/),
    # OR a /skills/ segment (legacy v6 pre-Concern-5 layout, retained for
    # backward fixture-compat), OR a /workflows/ segment (v3 BAM, optionally with
    # nested categories like /workflows/foundation/<name>).
    # The phase regex [0-9]+-[a-z][a-z0-9-]* supports multi-word phase names
    # like BMM's 2-plan-workflows. This catches module-root entries (e.g.,
    # ./agents). Exempts two v3-legacy bundled-content entries (./src/data and
    # ./src/_config) that ship as part of the v3 plugin's data/config bundle —
    # these are stable, well-known entries.
    if [[ "$skill" == "./src/data" || "$skill" == "./src/_config" ]]; then
        :  # v3 legacy bundled-content carve-out
    elif [[ ! "$skill" =~ /([0-9]+-[a-z][a-z0-9-]*|skills|workflows)/ ]]; then
        emit "skill entry is not under a phase dir (N-<name>/), /skills/, or /workflows/ segment: $skill (check b)"
    fi
done <<<"$LISTED_SKILLS"

# ─── Check (d): orphans (with .no-marketplace sentinel exclusion) ─────────
# Per-plugin scan-mode inference: each listed skill path determines a scan
# root + mode (phase | flat). Then walk scan roots looking for sibling skill
# dirs not listed in marketplace.json.
#   - Phase mode (paths matching /<N>-<word>/): scan root = module dir
#     (grandparent of skill leaf); walk all <N>-<word>/ children, then each
#     child's direct subdirs are potential skills.
#   - Flat mode (paths matching /skills/): scan root = .../skills/; walk
#     direct subdirs.
# v3 /workflows/ paths silently skip (legacy, not in scope for orphan check).

declare -A SCAN_MODE_OF  # key=scan_root abs path, value="phase" or "flat"

if [ -n "$SKILL_ROOT_OVERRIDE" ]; then
    SCAN_MODE_OF["$SKILL_ROOT_OVERRIDE"]="flat"
else
    for r in "${LISTED_RESOLVED[@]:-}"; do
        [ -z "$r" ] && continue
        if [[ "$r" =~ /[0-9]+-[a-z][a-z0-9-]*/ ]]; then
            # Phase mode: scan root = module dir (grandparent of skill leaf)
            phase_dir="$(dirname "$r")"
            module_dir="$(dirname "$phase_dir")"
            SCAN_MODE_OF["$module_dir"]="phase"
        elif [[ "$r" == */skills/* ]]; then
            # Flat mode: scan root = .../skills/
            scan_root="${r%/skills/*}/skills"
            SCAN_MODE_OF["$scan_root"]="flat"
        fi
        # v3 /workflows/ paths: no entry; silently skip
    done
fi

# Iterate scan roots by mode
for scan_root in "${!SCAN_MODE_OF[@]}"; do
    [ -d "$scan_root" ] || continue
    mode="${SCAN_MODE_OF[$scan_root]}"

    if [ "$mode" = "phase" ]; then
        # Walk each phase-numbered subdir, then each phase dir's direct skill children
        while IFS= read -r phase_dir; do
            [ -z "$phase_dir" ] && continue
            while IFS= read -r ondisk; do
                # Sentinel exclusion
                if [ -f "$ondisk/.no-marketplace" ]; then
                    continue
                fi
                listed=0
                for r in "${LISTED_RESOLVED[@]:-}"; do
                    [ "$r" = "$ondisk" ] && listed=1 && break
                done
                if [ "$listed" -eq 0 ]; then
                    relative="${ondisk#$REPO_ROOT/}"
                    emit "skill exists on disk but not listed in marketplace.json: $relative (check d, phase mode) — add to plugins[*].skills, or create a .no-marketplace sentinel file to exclude"
                fi
            done < <(find "$phase_dir" -mindepth 1 -maxdepth 1 -type d 2>/dev/null)
        done < <(find "$scan_root" -mindepth 1 -maxdepth 1 -type d -regextype posix-extended -regex '.*/[0-9]+-[a-z][a-z0-9-]*' 2>/dev/null)
    else
        # Flat mode: scan direct children of scan root
        while IFS= read -r ondisk; do
            if [ -f "$ondisk/.no-marketplace" ]; then
                continue
            fi
            listed=0
            for r in "${LISTED_RESOLVED[@]:-}"; do
                [ "$r" = "$ondisk" ] && listed=1 && break
            done
            if [ "$listed" -eq 0 ]; then
                relative="${ondisk#$REPO_ROOT/}"
                emit "skill exists on disk but not listed in marketplace.json: $relative (check d) — add to plugins[*].skills, or create a .no-marketplace sentinel file to exclude"
            fi
        done < <(find "$scan_root" -mindepth 1 -maxdepth 1 -type d 2>/dev/null)
    fi
done

# ─── Check (e): every v6 module-yaml has a matching plugin entry ──────────
if [ -d "$V6_ROOT" ]; then
    while IFS= read -r mod_yaml; do
        [ -z "$mod_yaml" ] && continue
        mod_dir="$(dirname "$mod_yaml")"
        mod_code="$(python3 -c "
import sys, re
content = open(sys.argv[1]).read()
m = re.search(r'^code:\s*(\S+)', content, re.MULTILINE)
print(m.group(1).strip('\"\\'') if m else '')
" "$mod_yaml")"
        if [ -z "$mod_code" ]; then
            emit "module.yaml at $mod_yaml has no 'code:' field (check e precondition)"
            continue
        fi
        # Does any plugin entry list skills under this module dir?
        found=0
        mod_abs="$(cd "$mod_dir" && pwd)"
        for r in "${LISTED_RESOLVED[@]:-}"; do
            [ -z "$r" ] && continue
            [[ "$r" == "$mod_abs"/* ]] && found=1 && break
        done
        if [ "$found" -eq 0 ]; then
            emit "v6 module '$mod_code' at ${mod_dir#$REPO_ROOT/} has no matching plugin entry in marketplace.json (check e)"
        fi
    done < <(find "$V6_ROOT" -maxdepth 2 -name module.yaml -type f 2>/dev/null)
fi

# ─── Check (f): step files don't reference unknown _bmad/<ns>/ paths ──────
# Build the set of known module codes from all module.yaml files under V6_ROOT.
KNOWN_CODES="$(python3 -c "
import os, re, sys
v6 = sys.argv[1]
if not os.path.isdir(v6):
    sys.exit(0)
for d in sorted(os.listdir(v6)):
    p = os.path.join(v6, d, 'module.yaml')
    if os.path.isfile(p):
        content = open(p).read()
        m = re.search(r'^code:\s*(\S+)', content, re.MULTILINE)
        if m:
            print(m.group(1).strip('\"\\''))
" "$V6_ROOT")"

# Allowed _bmad/<ns>/ prefixes: known module codes + BAM-specific namespaces
# (_memory, bam) + BMAD-installer infrastructure (scripts, custom, teams, _cfg)
# which is universally created by BMAD's installer and is not a module
# namespace. _bmad/config.toml is a file (handled below as special-case).
# _bmad-output/ is also valid but doesn't share the _bmad/<ns>/ shape.
KNOWN_NS_LIST=""
for c in $KNOWN_CODES; do
    KNOWN_NS_LIST="$KNOWN_NS_LIST $c"
done
KNOWN_NS_LIST="$KNOWN_NS_LIST _memory bam scripts custom teams _cfg"

is_known_ns() {
    local ns="$1"
    for n in $KNOWN_NS_LIST; do
        [ "$ns" = "$n" ] && return 0
    done
    return 1
}

if [ -d "$V6_ROOT" ]; then
    # Dedup per (file, namespace) so a single bad file referencing the same
    # unknown ns on multiple lines (or multiple times on one line) only emits
    # once. Reviewers see one FAIL per actual problem, not N copies.
    declare -A F_SEEN
    # Scan all step files + templates under v6 skills
    while IFS= read -r md; do
        [ -z "$md" ] && continue
        # Extract _bmad/<ns>/ tokens (where <ns> is a path component).
        while IFS= read -r line; do
            # Each match: extract <ns> after _bmad/
            while [[ "$line" =~ _bmad/([a-zA-Z0-9_-]+)/ ]]; do
                ns="${BASH_REMATCH[1]}"
                if ! is_known_ns "$ns"; then
                    # Allow config.toml as a special case (it's a file, not a ns)
                    if [ "$ns" != "config.toml" ]; then
                        key="$md|$ns"
                        if [ -z "${F_SEEN[$key]:-}" ]; then
                            F_SEEN[$key]=1
                            relative="${md#$REPO_ROOT/}"
                            emit "step/template $relative references unknown namespace _bmad/$ns/ (check f). Known: _bmad/<code>/ for codes [$KNOWN_CODES], plus _bmad/_memory/, _bmad/bam/, _bmad-output/, _bmad/config.toml"
                        fi
                    fi
                fi
                line="${line/_bmad\/$ns\//}"  # consume to find next
            done
        done < <(grep -nE "_bmad/[a-zA-Z0-9_-]+/" "$md" 2>/dev/null || true)
    done < <(find "$V6_ROOT" -type f \( -path '*/steps/*.md' -o -path '*/templates/*' \) 2>/dev/null)
    #                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    # ENH-0 fix (2026-05-16): the prior glob `*/skills/*/steps/*.md` matched
    # pre-Concern-5 layout only (skills/ wrapper). Post-Concern-5 the layout is
    # phase-grouped (1-foundation/, 2-modules/, 9-infrastructure/, etc.); the
    # old glob returned 0 files and check (f) silently scanned nothing.
    # The new glob matches step files + templates at any depth under V6_ROOT,
    # which works for both layouts (legacy /skills/ paths still under V6_ROOT;
    # phase-grouped paths also captured).
fi

# ─── Check (g): stale pre-Phase-C / pre-Concern-5 paths in active source ──
# Catches references to dirs that were removed in prior refactors and shouldn't
# reappear (regression guard for the classes of bug PR #3 polish manually fixed).
# Pre-Phase-C (Concern 2 dropped these from module root):
#   bmad-bam-platform/data/        — moved to <persona-skill>/resources/
#   bmad-bam-platform/agents/      — Atlas became a skill in <persona-skill>/
#   bmad-bam-platform/scripts/     — moved to <finalize-skill>/scripts/
# Pre-Concern-5 (Concern 5 dropped):
#   bmad-bam-platform/skills/<x>/  — phase-grouped now (1-foundation/, etc.)
#
# Scope: src-v6/ + marketplace.json. Excludes design docs / tracking notes /
# historical ADRs / src-v2 — those preserve historical references intentionally.
#
# Allowed via line-level carve-out: lines that EXPLAIN the path is stale
# (containing the marker "pre-Phase-C", "pre-Concern-5", "stale", or
# "ADR 009" — i.e., documentation about the deprecation itself).
declare -A G_SEEN

# Glob construction: all runtime-critical file types under V6_ROOT + marketplace.json
scan_g_files() {
    find "$V6_ROOT" -type f \
        \( -name '*.md' -o -name '*.toml' -o -name '*.yaml' \
           -o -name '*.csv' -o -name '*.sh' -o -name '*.py' \) 2>/dev/null
    echo "$MARKETPLACE"
}

if [ -d "$V6_ROOT" ]; then
    while IFS= read -r f; do
        [ -z "$f" ] && continue
        [ -f "$f" ] || continue
        while IFS= read -r line; do
            # Carve-out: lines explaining the deprecation
            if echo "$line" | grep -qE "pre-Phase-C|pre-Concern-5|stale|ADR 009|empirically wrong|silently SKIPPED"; then
                continue
            fi
            if [[ "$line" =~ bmad-bam-platform/(data|agents|scripts|skills)/ ]]; then
                segment="${BASH_REMATCH[1]}"
                key="$f|$segment"
                if [ -z "${G_SEEN[$key]:-}" ]; then
                    G_SEEN[$key]=1
                    relative="${f#$REPO_ROOT/}"
                    emit "stale pre-refactor path in $relative: references 'bmad-bam-platform/$segment/' (check g). Phase C dropped data/agents/scripts/ at module root; Concern 5 dropped the skills/ wrapper. Use the phase-grouped path: bmad-bam-platform/<N-phase>/<skill>/ (or <persona-skill>/resources/<subdir>/ for content)."
                fi
            fi
        done < <(grep -nE "bmad-bam-platform/(data|agents|scripts|skills)/" "$f" 2>/dev/null || true)
    done < <(scan_g_files)
fi

# ─── Check (h): fictional `bmad run <skill>` CLI references ──────────────
# Catches references to the empirically fictional `bmad run` subcommand
# (BMAD's bmad-cli.js only exposes install/status/uninstall; skills are
# invoked via AI-agent slash command like /bmad-bam-finalize, not via
# a bmad run CLI). Per Concern 5 R3 / RR1.
#
# Scope: same as check (g).
#
# Allowed via line-level carve-out: lines that EXPLAIN the command is
# fictional (containing markers "NOT a real", "not a real", "fictional",
# "doesn't exist", "is wrong", "RR1", "empirically wrong", "is fictional",
# "is NOT a real").
declare -A H_SEEN

if [ -d "$V6_ROOT" ]; then
    while IFS= read -r f; do
        [ -z "$f" ] && continue
        [ -f "$f" ] || continue
        while IFS= read -r line; do
            # Carve-out: lines explaining the command is fictional.
            # Use specific markers (not just "fictional") to avoid matching
            # skill names like "skill-fictional" or words like "fictitious".
            # All markers are case-sensitive multi-word phrases that only
            # appear in deprecation-explanation contexts.
            if echo "$line" | grep -qE "NOT a real|not a real|is fictional|are fictional|was fictional|were fictional|fictional CLI|fictional command|fictional subcommand|fictional sub-command|fictional bmad-run|fictional 'bmad run|fictional bmad run|doesn't exist|does not exist|RR1|empirically wrong|is wrong|is NOT a"; then
                continue
            fi
            if [[ "$line" =~ bmad\ run\ [a-zA-Z][a-zA-Z0-9_-]* ]]; then
                match="${BASH_REMATCH[0]}"
                key="$f|$match"
                if [ -z "${H_SEEN[$key]:-}" ]; then
                    H_SEEN[$key]=1
                    relative="${f#$REPO_ROOT/}"
                    emit "fictional CLI ref in $relative: '$match' (check h). 'bmad run <skill>' is NOT a real CLI command — only install/status/uninstall exist in bmad-cli.js (BMAD v6.6.0). Skills are invoked via the AI agent's slash command (e.g., /bmad-bam-finalize in Claude Code/Cursor) or natural-language activation. Per Concern 5 R3 / RR1."
                fi
            fi
        done < <(grep -nE "bmad run [a-zA-Z]" "$f" 2>/dev/null || true)
    done < <(scan_g_files)
fi

# ─── Summary ──────────────────────────────────────────────────────────────
if [ "$ERRORS" -gt 0 ]; then
    echo "" >&2
    echo "audit-marketplace: $ERRORS error(s)" >&2
    exit 1
fi

echo "audit-marketplace: OK (marketplace=$MARKETPLACE, v6-root=$V6_ROOT)"
