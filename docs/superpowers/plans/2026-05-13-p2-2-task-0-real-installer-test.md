# P2.2 Task 0 — 3-Tier Test Infrastructure Implementation Plan (v2)

> **Status:** COMPLETED — implemented on this same branch via commits `2f05b30` (Tier-1 audit) → `8edd5ce` (review polish) → `19f9c3a` (relative paths) → `05c7ba3` (Tier-2 stub) → `5cf6ab1` (tests/README) → `b759d92` (ADR 007) → `b2c779d` (empirical-reality corrections) → `d66d748` (self-review pass). Subsequently amended by Concern 5 (PR #3) and 3 review rounds. This file is preserved as the v2 design-of-record.
>
> **Pre-Concern-5 note (added 2026-05-13):** Path references in this plan (`src-v6/.../skills/<skill>/`, `bam-platform-project-context.md`, `_bmad/bam-platform/`, fixture count of 8) reflect the pre-Concern-5 module shape. Post-Concern-5: skills under phase dirs (`1-foundation/`, `2-modules/`, `9-infrastructure/`); module code `bbp`; sentinel at `{output_folder}/bbp/project-context.md`; 10 fixtures (8 original + 2 phase-mode). See ADR 008 for the layout migration.
>
> **Invocation-syntax correction (Round-3, 2026-05-13):** Body references to `bmad run <skill>` reflect aspirational wording at the time of writing. The correct invocation is `/<skill-name>` (Claude Code/Cursor slash command) or natural-language activation in the AI agent. `bmad run <skill>` is NOT a real BMAD CLI subcommand (verified against `bmad-cli.js` v6.6.0; only `install`, `status`, `uninstall` exist). The 3-tier test strategy decision stands; only the invocation form was misremembered.
>
> **ADR 007 title note:** This plan describes ADR 007's role as documenting "BMAD has no local-install API" — that title was empirically wrong (BMAD v6.6.0 does have `bmad install --custom-source <path>`). Concern 5 corrected the title to "BAM falls into PluginResolver Strategy 5" and marked revisit-trigger-#1 FIRED when Concern 5 resolved the Strategy-5 fallback.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the cp-simulation blind spot exposed by PR #2 (marketplace v3-paths + `_bmad/platform/` namespace collision both shipped past existing tests because cp bypasses BMAD's real install pipeline). Add expanded static auditing and a deferred-PASS Tier-2 stub so the next class-of-bug fails CI immediately AND the limitation of headless install testing is honest.

**Architecture:** Three tiers. **Tier-1 expanded** — `tests/audit-marketplace.sh` runs 6 checks (a–f) covering marketplace coherence with both itself AND the v6 source tree. The expanded checks (e + f) statically catch PR #2's two bug classes that the original 4 (a-d) wouldn't have. **Tier-2 deferred** — `tests/integration/run-real-install.sh` ships as a SKIP-by-default stub; BMAD v6.6.0 exposes no local-install API and all viable workarounds (cache symlink, bare copy) trigger destructive git operations (`git reset --hard origin/HEAD` against the cached repo per `community-manager.js:292`). The Tier-2 script SKIPs with exit 77 + points contributors at `tests/integration/MANUAL.md` for ad-hoc verification. PASS-mode revisits when BMAD ships a local-install API OR P2.x adds CI push-and-pin infrastructure. **Documentation** — `tests/README.md` captures the 3-tier model + the Tier-2 deferral rationale. Existing cp-based tests (`tests/wave-0/run-smoke-test.sh`, `tests/p2/run-real-install-test.sh`, design-tenancy-model skill smoke) are NOT rewritten.

**Tech Stack:** bash + Python 3.11+ (matching existing tests; used only for JSON/TOML parsing). No new runtime dependencies. `bmad` CLI is the only external and is detected at run time.

**v2 changes from v1:** validated that the original Tier-2 PASS-mode design (`bmad install --from <path>` / `BAM_LOCAL_SOURCE`) referenced flags that don't exist in BMAD v6.6.0 source. Reviewer's symlink workaround verified to fail too (BMAD runs `git reset --hard origin/HEAD` against the cache). Re-scoped around Option E (expand Tier-1, defer Tier-2 PASS-mode honestly).

---

## File Structure

Files created or modified in this plan:

### Tier-1 audit (expanded)
- Create: `tests/audit-marketplace.sh` — main script; 6 checks (a–f); exit 0 / 1 + diagnostic stderr
- Create: `tests/fixtures/marketplace-audit/marketplace-good-minimal.json` — known-good baseline (passes all 6)
- Create: `tests/fixtures/marketplace-audit/marketplace-bad-missing-skill.json` — check (a) failure
- Create: `tests/fixtures/marketplace-audit/marketplace-bad-module-root.json` — check (b) failure
- Create: `tests/fixtures/marketplace-audit/marketplace-bad-no-version.json` — check (c) failure
- Create: `tests/fixtures/marketplace-audit/marketplace-bad-orphan-skill.json` — check (d) failure
- Create: `tests/fixtures/marketplace-audit/marketplace-bad-orphan-skill-with-sentinel.json` — check (d) sentinel exclusion (must pass)
- Create: `tests/fixtures/marketplace-audit/marketplace-bad-missing-module-entry.json` — check (e) failure
- Create: `tests/fixtures/marketplace-audit/marketplace-bad-unknown-namespace.json` — check (f) failure (fixture also ships a fake-v6 tree with the bad step file)
- Create: `tests/fixtures/marketplace-audit/README.md` — fixture index + how to add new ones
- Create: `tests/fixtures/marketplace-audit/fake-source/skills/skill-alpha/.gitkeep` — listed skill (good fixture)
- Create: `tests/fixtures/marketplace-audit/fake-source/skills/skill-orphan/.gitkeep` — on-disk orphan (check d failure)
- Create: `tests/fixtures/marketplace-audit/fake-source/skills/skill-orphan-excluded/.gitkeep` — orphan-but-excluded (check d pass)
- Create: `tests/fixtures/marketplace-audit/fake-source/skills/skill-orphan-excluded/.no-marketplace` — sentinel file
- Create: `tests/fixtures/marketplace-audit/fake-source/agents/.gitkeep` — module-root dir (check b failure)
- Create: `tests/fixtures/marketplace-audit/fake-v6/bam-faux/module.yaml` — fixture v6 module-yaml (check e + f)
- Create: `tests/fixtures/marketplace-audit/fake-v6/bam-faux/skills/bad-namespace-skill/steps/step-bad.md` — step file with `_bmad/wrongns/` reference (check f failure)

### Tier-2 deferred stub
- Create: `tests/integration/run-real-install.sh` — always-SKIP stub with exit 77 + rationale message
- Create: `tests/integration/MANUAL.md` — runbook for contributors performing ad-hoc real-install verification

### Documentation
- Create: `tests/README.md` — 3-tier overview, deferral rationale, invocation matrix, exit-code conventions, CI integration caveats

### Atlas sidecar
- Create: `_bmad/_memory/atlas/architecture-decisions/2026-05-13-007-real-installer-test-infrastructure.md`
- Modify: `_bmad/_memory/atlas/architecture-decisions/INDEX.md` — add row 007

---

## Anti-patterns explicitly NOT done

- ❌ Do NOT modify `tests/wave-0/run-smoke-test.sh`, `tests/p2/run-real-install-test.sh`, or the design-tenancy-model `tests/smoke-test.sh`. They stay as Tier-1 mechanism checks.
- ❌ Do NOT make `bmad` CLI a hard prerequisite. Tier-2 SKIPs (exit 77) always in v2.
- ❌ Do NOT ship a Tier-2 that pretends to do real install. v1's `--from` and `BAM_LOCAL_SOURCE` invocations target BMAD APIs that don't exist; shipping that would fail honestly but waste the verification slot. The stub honestly defers.
- ❌ Do NOT change existing test invocation patterns; downstream workflows may depend on the current entry points.
- ❌ Do NOT introduce a CI manifest, package.json scripts entry, or any orchestration layer in this PR.

---

## Task 1: Expanded Tier-1 audit (6 checks)

**Why first:** Tier-1 is the foundation. With checks (e) and (f) added, this single audit catches both PR #2 bug classes statically. Tier-2 deferred is acceptable only because Tier-1 actually does the work.

**Files:** all 17 paths under "Tier-1 audit (expanded)" above.

### Step 1: Create the fixture-tree on-disk skeleton

The audit's checks (a) and (d) need real directories. Create the fake-source tree:

```bash
mkdir -p tests/fixtures/marketplace-audit/fake-source/skills/skill-alpha
mkdir -p tests/fixtures/marketplace-audit/fake-source/skills/skill-orphan
mkdir -p tests/fixtures/marketplace-audit/fake-source/skills/skill-orphan-excluded
mkdir -p tests/fixtures/marketplace-audit/fake-source/agents
echo "fixture" > tests/fixtures/marketplace-audit/fake-source/skills/skill-alpha/.gitkeep
echo "fixture" > tests/fixtures/marketplace-audit/fake-source/skills/skill-orphan/.gitkeep
echo "fixture" > tests/fixtures/marketplace-audit/fake-source/skills/skill-orphan-excluded/.gitkeep
echo "" > tests/fixtures/marketplace-audit/fake-source/skills/skill-orphan-excluded/.no-marketplace
echo "fixture" > tests/fixtures/marketplace-audit/fake-source/agents/.gitkeep
```

Create the fake-v6 tree for checks (e) and (f):

```bash
mkdir -p tests/fixtures/marketplace-audit/fake-v6/bam-faux/skills/bad-namespace-skill/steps
cat > tests/fixtures/marketplace-audit/fake-v6/bam-faux/module.yaml <<'EOF'
code: bam-faux
name: "Fake v6 module for audit fixtures"
description: "Used by check (e) and (f) fixtures. Not a real module."
EOF

cat > tests/fixtures/marketplace-audit/fake-v6/bam-faux/skills/bad-namespace-skill/steps/step-bad.md <<'EOF'
---
step_id: bad-step
auto_runnable: true
gate: machine-checkable
---

# Bad step — references a non-existent namespace

Load the fragment from `_bmad/wrongns/agents/atlas/resources/fragments/foo.md`. This step exists only to exercise check (f); it references `_bmad/wrongns/` which is not a known module code.
EOF
```

### Step 2: Write the good-minimal fixture (passes all 6 checks)

`tests/fixtures/marketplace-audit/marketplace-good-minimal.json`:

```json
{
  "name": "audit-fixture",
  "owner": { "name": "BAM Test Harness" },
  "description": "Known-good minimal marketplace.json for audit testing — passes all 6 checks.",
  "plugins": [
    {
      "name": "bmad-bam-platform",
      "source": "./",
      "description": "Test fixture plugin (good).",
      "version": "0.0.1",
      "author": { "name": "BAM Test Harness" },
      "skills": [
        "./tests/fixtures/marketplace-audit/fake-source/skills/skill-alpha"
      ]
    }
  ]
}
```

This fixture references `skill-alpha` only. `skill-orphan` is unlisted but flagged by check (d). For the GOOD fixture we want NO orphan, so the good fixture's `--skill-root` must point at a directory containing only `skill-alpha` and excluded skills. We achieve that via a per-fixture v6-root override (Step 7). For now, the fixture lists everything cleanly.

### Step 3: Write the 6 bad-fixture JSON files

Each bad fixture isolates one failure mode. Create them as separate JSON files:

**`marketplace-bad-missing-skill.json`** (check a — skill path doesn't exist):
```json
{
  "name": "audit-fixture",
  "owner": { "name": "BAM Test Harness" },
  "description": "BAD — check (a): skill path listed but missing on disk.",
  "plugins": [{
    "name": "bmad-bam-platform", "source": "./", "version": "0.0.1",
    "description": "Bad fixture (missing skill).",
    "author": { "name": "BAM Test Harness" },
    "skills": [
      "./tests/fixtures/marketplace-audit/fake-source/skills/skill-alpha",
      "./tests/fixtures/marketplace-audit/fake-source/skills/skill-does-not-exist"
    ]
  }]
}
```

**`marketplace-bad-module-root.json`** (check b — entry not a `/skills/<name>` path):
```json
{
  "name": "audit-fixture", "owner": { "name": "BAM Test Harness" },
  "description": "BAD — check (b): entry is module-root (./agents/), not /skills/<name>/.",
  "plugins": [{
    "name": "bmad-bam-platform", "source": "./", "version": "0.0.1",
    "description": "Bad fixture (module-root entry).",
    "author": { "name": "BAM Test Harness" },
    "skills": [
      "./tests/fixtures/marketplace-audit/fake-source/skills/skill-alpha",
      "./tests/fixtures/marketplace-audit/fake-source/agents"
    ]
  }]
}
```

**`marketplace-bad-no-version.json`** (check c — missing version field):
```json
{
  "name": "audit-fixture", "owner": { "name": "BAM Test Harness" },
  "description": "BAD — check (c): plugin missing version field.",
  "plugins": [{
    "name": "bmad-bam-platform", "source": "./",
    "description": "Bad fixture (no version).",
    "author": { "name": "BAM Test Harness" },
    "skills": [
      "./tests/fixtures/marketplace-audit/fake-source/skills/skill-alpha"
    ]
  }]
}
```

**`marketplace-bad-orphan-skill.json`** (check d — on-disk skill not listed):
```json
{
  "name": "audit-fixture", "owner": { "name": "BAM Test Harness" },
  "description": "BAD — check (d): skill-orphan exists on disk but not listed.",
  "plugins": [{
    "name": "bmad-bam-platform", "source": "./", "version": "0.0.1",
    "description": "Bad fixture (orphan on disk).",
    "author": { "name": "BAM Test Harness" },
    "skills": [
      "./tests/fixtures/marketplace-audit/fake-source/skills/skill-alpha"
    ]
  }]
}
```

(`skill-orphan` exists in fake-source/skills/ but is not listed. `skill-orphan-excluded` also exists but has a `.no-marketplace` sentinel — should NOT be flagged.)

**`marketplace-bad-orphan-skill-with-sentinel.json`** (check d — sentinel correctly suppresses):

```json
{
  "name": "audit-fixture", "owner": { "name": "BAM Test Harness" },
  "description": "GOOD-with-sentinel — check (d): orphans with .no-marketplace are excluded; this fixture should PASS.",
  "plugins": [{
    "name": "bmad-bam-platform", "source": "./", "version": "0.0.1",
    "description": "Good fixture with sentinel-suppressed orphan.",
    "author": { "name": "BAM Test Harness" },
    "skills": [
      "./tests/fixtures/marketplace-audit/fake-source/skills/skill-alpha",
      "./tests/fixtures/marketplace-audit/fake-source/skills/skill-orphan"
    ]
  }]
}
```

This lists `skill-alpha` and `skill-orphan` (so the only unlisted dir is `skill-orphan-excluded`, which has `.no-marketplace` and should be excluded from the orphan check → fixture passes).

**`marketplace-bad-missing-module-entry.json`** (check e — v6 module has no plugin):
```json
{
  "name": "audit-fixture", "owner": { "name": "BAM Test Harness" },
  "description": "BAD — check (e): fake-v6/bam-faux/module.yaml exists but no plugin entry.",
  "plugins": [{
    "name": "unrelated-plugin", "source": "./", "version": "0.0.1",
    "description": "Plugin doesn't list skills from bam-faux.",
    "author": { "name": "BAM Test Harness" },
    "skills": [
      "./tests/fixtures/marketplace-audit/fake-source/skills/skill-alpha"
    ]
  }]
}
```

**`marketplace-bad-unknown-namespace.json`** (check f — step file references unknown namespace):

```json
{
  "name": "audit-fixture", "owner": { "name": "BAM Test Harness" },
  "description": "BAD — check (f): step file in fake-v6 references _bmad/wrongns/.",
  "plugins": [{
    "name": "bmad-bam-faux", "source": "./", "version": "0.0.1",
    "description": "Bad fixture (unknown namespace in step file).",
    "author": { "name": "BAM Test Harness" },
    "skills": [
      "./tests/fixtures/marketplace-audit/fake-v6/bam-faux/skills/bad-namespace-skill"
    ]
  }]
}
```

(The bad step file already exists from Step 1.)

### Step 4: Write fixtures README

`tests/fixtures/marketplace-audit/README.md`:

```markdown
# Marketplace audit fixtures

Fixtures used by `tests/audit-marketplace.sh` to verify each failure mode is caught.

## Fixtures

| Fixture | Outcome | Check |
|---|---|---|
| `marketplace-good-minimal.json` | PASS | All 6 |
| `marketplace-bad-missing-skill.json` | FAIL | (a) skill path missing |
| `marketplace-bad-module-root.json` | FAIL | (b) entry not a /skills/<name>/ path |
| `marketplace-bad-no-version.json` | FAIL | (c) plugin missing version |
| `marketplace-bad-orphan-skill.json` | FAIL | (d) on-disk skill not listed |
| `marketplace-bad-orphan-skill-with-sentinel.json` | PASS | (d) sentinel correctly excludes |
| `marketplace-bad-missing-module-entry.json` | FAIL | (e) v6 module has no plugin |
| `marketplace-bad-unknown-namespace.json` | FAIL | (f) step file unknown namespace |

## Sentinel — `.no-marketplace`

A skill dir containing a file named `.no-marketplace` is **excluded** from the orphan check (d). Use cases:
- Skill is WIP and not yet marketplace-ready
- Skill is test-only or internal helper

Empty file is sufficient; the audit only checks for presence. Skills WITH the sentinel must still pass checks (a) (if listed), (b), and (f).

## On-disk fixture tree

- `fake-source/skills/skill-alpha` — listed by good fixture; passes
- `fake-source/skills/skill-orphan` — not listed by good fixture; flagged by check (d)
- `fake-source/skills/skill-orphan-excluded` — not listed, but has `.no-marketplace`; check (d) skips it
- `fake-source/agents/` — module-root dir; references in fixture exercise check (b)
- `fake-v6/bam-faux/module.yaml` — fixture v6 module-yaml
- `fake-v6/bam-faux/skills/bad-namespace-skill/steps/step-bad.md` — exercises check (f)

## Adding a new fixture

1. Add a new `marketplace-<good|bad>-<failure-mode>.json` file.
2. Create whatever on-disk shape under `fake-source/` or `fake-v6/` makes the fixture isolate that failure mode.
3. Add a row to the Fixtures table.
4. Add a test case in `tests/audit-marketplace.sh`'s fixture-verification block (the calling test, NOT the audit script itself).
```

### Step 5: Write the audit script — header + helpers

Create `tests/audit-marketplace.sh`:

```bash
#!/usr/bin/env bash
# tests/audit-marketplace.sh
#
# Tier-1 static audit of marketplace.json + v6 source tree. Always runs;
# no external dependencies beyond bash + Python 3 (JSON/TOML parsing).
#
# Checks:
#   (a) every listed skill path exists on disk
#   (b) every listed skill ends in /skills/<name> (no module-root entries)
#   (c) every plugin has a `version` field
#   (d) no orphans — every skill under <plugin-derived-skill-root>/ is listed,
#       UNLESS the skill dir contains a `.no-marketplace` sentinel file
#   (e) every v6 module under <v6-root>/ (each src-v6/*/module.yaml) has at
#       least one corresponding plugin entry in marketplace.json
#   (f) step files in v6 skills don't reference unknown `_bmad/<ns>/` paths.
#       Known prefixes: _bmad/<code>/ from any module.yaml, _bmad/_memory/,
#       _bmad/bam/, _bmad-output/, _bmad/config.toml.
#
# Usage:
#   tests/audit-marketplace.sh                       # default: real marketplace + src-v6
#   tests/audit-marketplace.sh <marketplace.json>    # alt marketplace
#   tests/audit-marketplace.sh <marketplace.json> --v6-root <path>  # alt v6 tree
#   tests/audit-marketplace.sh <marketplace.json> --skill-root <path>  # override (d) scan root

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MARKETPLACE="${1:-$REPO_ROOT/.claude-plugin/marketplace.json}"

# Optional --v6-root and --skill-root flags (mainly for fixture testing)
V6_ROOT="$REPO_ROOT/src-v6"
SKILL_ROOT_OVERRIDE=""
shift || true
while [ "$#" -gt 0 ]; do
    case "$1" in
        --v6-root) V6_ROOT="$2"; shift 2 ;;
        --skill-root) SKILL_ROOT_OVERRIDE="$2"; shift 2 ;;
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

ERRORS=0
emit() { echo "FAIL: $1" >&2; ERRORS=$((ERRORS + 1)); }

# Resolve a relative skill path against the marketplace's directory parent
# (matching BMAD installer's source-relative resolution).
resolve_skill() {
    local rel="$1"
    (cd "$(dirname "$MARKETPLACE")/.." 2>/dev/null && pwd)/"${rel#./}"
}
```

### Step 6: Add checks (a), (b), (c) to the audit script

Append to `tests/audit-marketplace.sh`:

```bash
# ─── Check (c): every plugin has `version` ────────────────────────────────
python3 -c "
import json, sys
m = json.load(open(sys.argv[1]))
for p in m.get('plugins', []):
    if 'version' not in p:
        print(p.get('name', '<unnamed>'))
" "$MARKETPLACE" | while IFS= read -r name; do
    [ -z "$name" ] || emit "plugin '$name' is missing the 'version' field (check c)"
done

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
    if [[ ! "$skill" =~ /skills/[^/]+$ ]]; then
        emit "skill entry is not a /skills/<name> path: $skill (check b)"
    fi
done <<<"$LISTED_SKILLS"
```

### Step 7: Add check (d) with sentinel + per-plugin skill-root inference

Append to `tests/audit-marketplace.sh`:

```bash
# ─── Check (d): orphans (with .no-marketplace sentinel exclusion) ─────────
# Per-plugin skill-root inference: derive the skills/ parent from each
# plugin's listed skills, so multiple plugins (multiple modules) work.

if [ -n "$SKILL_ROOT_OVERRIDE" ]; then
    SKILL_ROOTS=("$SKILL_ROOT_OVERRIDE")
else
    # Derive: for each listed skill of form .../skills/<name>, the skills root
    # is its parent dir. Deduplicate.
    SKILL_ROOTS=()
    while IFS= read -r r; do
        if [[ "$r" == */skills/* ]]; then
            root="${r%/skills/*}/skills"
            already=0
            for s in "${SKILL_ROOTS[@]:-}"; do
                [ "$s" = "$root" ] && already=1 && break
            done
            [ "$already" -eq 0 ] && SKILL_ROOTS+=("$root")
        fi
    done < <(printf '%s\n' "${LISTED_RESOLVED[@]}")
fi

for skill_root in "${SKILL_ROOTS[@]:-}"; do
    [ -d "$skill_root" ] || continue
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
            emit "skill exists on disk but not listed in marketplace.json: $relative (check d) — add to plugins[*].skills, or create a .no-marketplace sentinel file to exclude"
        fi
    done < <(find "$skill_root" -mindepth 1 -maxdepth 1 -type d 2>/dev/null)
done
```

### Step 8: Add check (e) — v6 modules have plugin entries

Append:

```bash
# ─── Check (e): every v6 module-yaml has a matching plugin entry ──────────
if [ -d "$V6_ROOT" ]; then
    while IFS= read -r mod_yaml; do
        mod_dir="$(dirname "$mod_yaml")"
        mod_code="$(python3 -c "
import sys
import re
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
            [[ "$r" == "$mod_abs"/* ]] && found=1 && break
        done
        if [ "$found" -eq 0 ]; then
            emit "v6 module '$mod_code' at ${mod_dir#$REPO_ROOT/} has no matching plugin entry in marketplace.json (check e)"
        fi
    done < <(find "$V6_ROOT" -maxdepth 2 -name module.yaml -type f 2>/dev/null)
fi
```

### Step 9: Add check (f) — step files don't reference unknown `_bmad/<ns>/` paths

Append:

```bash
# ─── Check (f): step files don't reference unknown _bmad/<ns>/ paths ──────
# Build the set of known module codes from all module.yaml files under V6_ROOT.
KNOWN_CODES="$(python3 -c "
import os, re, sys
v6 = sys.argv[1]
if not os.path.isdir(v6):
    sys.exit(0)
for d in os.listdir(v6):
    p = os.path.join(v6, d, 'module.yaml')
    if os.path.isfile(p):
        content = open(p).read()
        m = re.search(r'^code:\s*(\S+)', content, re.MULTILINE)
        if m:
            print(m.group(1).strip('\"\\''))
" "$V6_ROOT")"

# Allowed _bmad/<ns>/ prefixes: known module codes + _memory + bam + config.toml.
# _bmad-output/ is also valid but doesn't share the _bmad/<ns>/ shape.
KNOWN_NS_LIST=""
for c in $KNOWN_CODES; do
    KNOWN_NS_LIST="$KNOWN_NS_LIST $c"
done
KNOWN_NS_LIST="$KNOWN_NS_LIST _memory bam"

is_known_ns() {
    local ns="$1"
    for n in $KNOWN_NS_LIST; do
        [ "$ns" = "$n" ] && return 0
    done
    return 1
}

if [ -d "$V6_ROOT" ]; then
    # Scan all step files + templates under v6 skills
    while IFS= read -r md; do
        # Extract _bmad/<ns>/ tokens (where <ns> is a path component). Match
        # only what looks like a namespace token, not the bare file marker.
        while IFS=':' read -r line; do
            # Each match: extract <ns> after _bmad/
            while [[ "$line" =~ _bmad/([a-zA-Z0-9_-]+)/ ]]; do
                ns="${BASH_REMATCH[1]}"
                if ! is_known_ns "$ns"; then
                    # Allow config.toml as a special case (it's a file, not a ns)
                    if [ "$ns" != "config.toml" ]; then
                        relative="${md#$REPO_ROOT/}"
                        emit "step/template $relative references unknown namespace _bmad/$ns/ (check f). Known: _bmad/<code>/ for codes [$KNOWN_CODES], plus _bmad/_memory/, _bmad/bam/, _bmad-output/, _bmad/config.toml"
                    fi
                fi
                line="${line/_bmad\/$ns\//}"  # consume to find next
            done
        done < <(grep -nE "_bmad/[a-zA-Z0-9_-]+/" "$md" 2>/dev/null || true)
    done < <(find "$V6_ROOT" -path '*/skills/*/steps/*.md' -o -path '*/skills/*/templates/*' -type f 2>/dev/null)
fi

# ─── Summary ──────────────────────────────────────────────────────────────
if [ "$ERRORS" -gt 0 ]; then
    echo "" >&2
    echo "audit-marketplace: $ERRORS error(s)" >&2
    exit 1
fi

echo "audit-marketplace: OK (marketplace=$MARKETPLACE, v6-root=$V6_ROOT)"
```

Make the script executable: `chmod +x tests/audit-marketplace.sh`.

### Step 10: Run against every fixture and assert expected outcomes

```bash
# Helper functions for fixture verification
assert_pass() {
    local fixture="$1"
    local args="${2:-}"
    if ! eval "tests/audit-marketplace.sh $fixture $args" >/tmp/audit.out 2>&1; then
        echo "FAIL: expected $fixture to PASS; it failed:" >&2
        cat /tmp/audit.out >&2
        return 1
    fi
    echo "OK: $fixture passes"
}

assert_fails_with() {
    local fixture="$1" substr="$2"
    local args="${3:-}"
    if eval "tests/audit-marketplace.sh $fixture $args" >/tmp/audit.out 2>&1; then
        echo "FAIL: expected $fixture to FAIL; it passed" >&2
        return 1
    fi
    if ! grep -qF "$substr" /tmp/audit.out; then
        echo "FAIL: $fixture did not mention '$substr':" >&2
        cat /tmp/audit.out >&2
        return 1
    fi
    echo "OK: $fixture fails with '$substr'"
}

FIX="tests/fixtures/marketplace-audit"
FAKEV6="--v6-root $FIX/fake-v6"

assert_pass $FIX/marketplace-good-minimal.json "$FAKEV6"
assert_pass $FIX/marketplace-bad-orphan-skill-with-sentinel.json "$FAKEV6"
assert_fails_with $FIX/marketplace-bad-missing-skill.json "(check a)" "$FAKEV6"
assert_fails_with $FIX/marketplace-bad-module-root.json "(check b)" "$FAKEV6"
assert_fails_with $FIX/marketplace-bad-no-version.json "(check c)" "$FAKEV6"
assert_fails_with $FIX/marketplace-bad-orphan-skill.json "(check d)" "$FAKEV6"
assert_fails_with $FIX/marketplace-bad-missing-module-entry.json "(check e)" "$FAKEV6"
assert_fails_with $FIX/marketplace-bad-unknown-namespace.json "(check f)" "$FAKEV6"
```

Expected: 8 "OK:" lines. If any FAIL, debug the audit before continuing.

### Step 11: Run against the real marketplace.json + src-v6/

```bash
tests/audit-marketplace.sh
```

Expected: `audit-marketplace: OK (marketplace=...marketplace.json, v6-root=...src-v6)`. If it fails, **the audit caught a real regression in the current branch** — investigate. (Likely candidates: a step file we missed updating in the F3 namespace rename; a leftover from the alignment refactor.)

### Step 12: Commit

```bash
git add tests/audit-marketplace.sh tests/fixtures/marketplace-audit/
git commit -m "$(cat <<'EOF'
feat(p2-2): Tier-1 audit-marketplace.sh (6 checks) — Concern 4

Closes the cp-simulation blind spot for PR #2's two bug classes:
- marketplace.json drift (v3-only paths): check (a) + (e)
- _bmad/<ns>/ namespace collision in step files: check (f)

Checks:
  (a) every listed skill path exists on disk
  (b) every listed skill ends in /skills/<name>
  (c) every plugin has a `version` field
  (d) no orphans — every skill under derived skill-root is listed, unless
      a `.no-marketplace` sentinel file is present in the skill dir
  (e) every v6 module under src-v6/ has at least one matching plugin entry
  (f) v6 step files / templates don't reference unknown `_bmad/<ns>/` paths

Per-plugin skill-root inference makes the audit multi-module-ready
without CLI flags (P2.3+ modules just add themselves to marketplace.json
and the audit walks each plugin's derived skills root independently).

8 fixtures verify each failure mode + the sentinel exclusion + the
multi-failure good case. Audit passes against current marketplace.json
and src-v6/ tree.

Concern 4 / Task 1 of P2.2 Task 0.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Tier-2 deferred stub + MANUAL.md

**Why deferred:** BMAD v6.6.0 exposes no local-install API. Verified empirically:
- No `--from <path>` flag in `external/bmad-method/tools/installer/commands/install.js`
- No `BAM_LOCAL_SOURCE` env override anywhere in installer source
- Cache symlink would trigger `git reset --hard origin/HEAD` per `community-manager.js:292` — destroys local commits
- Bare copy hits the same `git reset --hard` issue — defeats local-changes testing

Tier-2 ships as a SKIP-by-default stub that documents the limitation honestly and points contributors at a manual procedure. PASS-mode revisits when BMAD ships a local-install API or P2.x adds CI infrastructure for push-and-pin.

**Files:**
- Create: `tests/integration/run-real-install.sh`
- Create: `tests/integration/MANUAL.md`

### Step 1: Write the SKIP-by-default stub

`tests/integration/run-real-install.sh`:

```bash
#!/usr/bin/env bash
# tests/integration/run-real-install.sh
#
# Tier-2 real-installer test — DEFERRED in v6.0.
#
# This script always exits 77 (POSIX autotest SKIP) because BMAD v6.6.0
# exposes no API to install from a local checkout:
#   - No `--from <path>` flag in `bmad install`
#   - No `BAM_LOCAL_SOURCE` env override
#   - Symlinking the cache dir triggers `git reset --hard origin/HEAD` against
#     the symlinked target, destroying local commits
#   - Bare-copying the source to the cache dir hits the same git-reset issue
#
# Verified against external/bmad-method/tools/installer/modules/community-manager.js
# (specifically line 292 in BMAD v6.6.0).
#
# A real bmad install end-to-end probe requires one of:
#   - BMAD ships a local-install API (--from-local or equivalent)
#   - CI infrastructure for push-and-pin: push branch → bmad install --pin <sha>
#   - Manual procedure in tests/integration/MANUAL.md
#
# Tier-1 (tests/audit-marketplace.sh) is the static substitute that catches
# the PR #2 bug classes Tier-2 was originally meant to catch.

set -euo pipefail

cat <<EOF
SKIP: Tier-2 real-install PASS-mode is deferred in v6.0.

  BMAD v6.6.0 has no API to install from a local checkout (verified;
  see this script's header for evidence). Automated end-to-end testing
  of the real install pipeline requires either an upstream BMAD change
  or CI infrastructure not yet built.

  For ad-hoc verification (e.g., before a release), see:
    tests/integration/MANUAL.md

  Tier-1 (tests/audit-marketplace.sh) catches the regression classes
  this Tier-2 was originally meant to catch:
    - marketplace.json drift (PR #2 Bug 1) → checks (a) + (e)
    - _bmad/<ns>/ namespace collision in step files (PR #2 Bug 2) → check (f)

  Tier-3 (Plan-C manual LLM probe) covers the LLM-side activation
  contract; see tests/p2/PLAN-C-RATIFICATION.md.
EOF

exit 77
```

`chmod +x tests/integration/run-real-install.sh`.

### Step 2: Write the manual procedure

`tests/integration/MANUAL.md`:

```markdown
# Tier-2 manual real-install procedure

Use this when you want to verify `bmad install bmad-bam-platform` against your local changes before merging. Required: `bmad` CLI on PATH, push access to a fork or branch, BMAD 6.6.0+ installed.

## Why this is manual

BMAD v6.6.0 has no API to install from a local checkout. The viable manual procedure is push-and-pin: push your branch to a fork, configure BMAD to install from your fork at a specific SHA, verify the result.

A future BMAD release may add a local-install flag (e.g., `bmad install --from <path>`); when that lands, this procedure folds into automated Tier-2 PASS-mode.

## Procedure

### 1. Push your branch to a fork

```bash
git remote add fork git@github.com:<your-user>/bmad-bam.git  # one-time
git push fork feat/v6-p2-X-<your-branch>
SHA="$(git rev-parse HEAD)"
echo "SHA to install: $SHA"
```

### 2. Create a clean test project

```bash
WORK_DIR="$(mktemp -d)"
cd "$WORK_DIR"
bmad init  # interactive; accept defaults
cd -
```

### 3. Configure BMAD to install your fork at your SHA

Edit `~/.bmad/config.toml` (or the documented location for your BMAD release) to point at your fork. Exact mechanism varies by BMAD release; see BMAD's installation docs.

### 4. Install

```bash
cd "$WORK_DIR"
bmad install bmad-bam-platform --pin "$SHA"   # exact flag may vary
```

### 5. Run finalize

```bash
bmad run bmad-bam-finalize
```

### 6. Verify the sentinel landed

```bash
OUTPUT_FOLDER="$(python3 -c "
import tomllib
c = tomllib.load(open('_bmad/config.toml', 'rb'))
v = c.get('bmad', {}).get('output_folder', '_bmad-output')
print(v.replace('{project-root}/', '').lstrip('/') or '_bmad-output')
")"

ls "$WORK_DIR/$OUTPUT_FOLDER/bam-platform-project-context.md"
grep -oE 'BAM_LOAD_VERIFY_[a-f0-9]{32}' "$WORK_DIR/$OUTPUT_FOLDER/bam-platform-project-context.md"
```

Expected: file exists, contains a 32-hex BAM_LOAD_VERIFY token.

### 7. Record the outcome

Add a comment to the PR with:
- BMAD version (`bmad --version`)
- Pinned SHA
- Sentinel token observed
- Any anomalies

Optionally update `tests/p2/PLAN-C-RATIFICATION.md` if you also exercised the LLM-side probe (Tier 3).

### 8. Clean up

```bash
rm -rf "$WORK_DIR"
```

## When to run this

- Before merging an activation-touching PR (changes to `bmad-bam-finalize`, `post-install.sh`, `module.yaml`, or marketplace.json)
- Before tagging a release
- After a BMAD upgrade (verify the activation chain still works)
- Whenever Tier-1 surfaces a result you want to confirm against the real pipeline
```

### Step 3: Smoke the SKIP

```bash
tests/integration/run-real-install.sh
echo "exit=$?"
```

Expected output (exit code line shown last): `exit=77` plus the SKIP message above on stdout.

### Step 4: Commit

```bash
git add tests/integration/
git commit -m "$(cat <<'EOF'
feat(p2-2): Tier-2 deferred stub + manual procedure (Concern 4)

BMAD v6.6.0 has no API to install from a local checkout. Verified
empirically against installer source:
  - No --from <path> flag (commands/install.js)
  - No BAM_LOCAL_SOURCE env override (any installer file)
  - Cache symlink triggers `git reset --hard origin/HEAD` against the
    symlinked target (community-manager.js:292), destroying local
    commits
  - Bare copy hits the same git-reset issue

Tier-2 ships as a SKIP-by-default stub (exit 77, POSIX autotest
convention) with a documented manual procedure in MANUAL.md for
contributors performing ad-hoc real-install verification.

PASS-mode revisits when either:
  - BMAD ships a local-install API
  - P2.x CI infrastructure adds push-and-pin automation

Tier-1 (audit-marketplace.sh) catches the regression classes this
Tier-2 was originally meant to catch — see ADR 007.

Concern 4 / Task 2 of P2.2 Task 0.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: `tests/README.md`

**Files:**
- Create: `tests/README.md`

### Step 1: Write the README

```markdown
# BAM v6 test infrastructure

Three tiers of regression coverage. Each tier catches a different class of bug; no single tier covers what the others do.

## Tier overview

| Tier | When | Scripts | What it catches |
|---|---|---|---|
| **1 — always run** | Every commit; CI | `tests/audit-marketplace.sh` (6 checks)<br>`tests/wave-0/run-smoke-test.sh`<br>`tests/p2/run-real-install-test.sh`<br>`src-v6/bmad-bam-platform/skills/*/tests/smoke-test.sh` | Static marketplace consistency (incl. v6 module presence + step file namespace coherence); resolver-side string merge; cp-based Path B simulation; skill machinery |
| **2 — deferred** | Manual only in v6.0 | `tests/integration/run-real-install.sh` (always SKIPs) + `tests/integration/MANUAL.md` (runbook) | Real `bmad install` + finalize + sentinel emission — PASS-mode deferred until BMAD ships local-install API or P2.x adds CI infrastructure |
| **3 — manual** | Pre-release / per BMAD upgrade | `tests/p2/lib/probe-llm-context.sh` (instructions; the probe is human-driven) | Plan C — LLM-side activation contract |

## Why three tiers

**Tier 1 alone is insufficient** for catching install-pipeline regressions in BMAD itself, but expanded checks (a)–(f) catch the two regression classes that PR #2 shipped past the original Tier-1 (marketplace drift + namespace collision in step files).

**Tier 2 PASS-mode is deferred** because BMAD v6.6.0 has no API to install from a local checkout (verified against `external/bmad-method/tools/installer/`). The viable workarounds — cache symlink, bare copy — both trigger destructive `git reset --hard origin/HEAD` against the symlinked/copied target (community-manager.js:292). Until BMAD ships a local-install flag, automated Tier-2 isn't tractable. The manual procedure in `tests/integration/MANUAL.md` covers ad-hoc verification.

**Tier 3 alone is insufficient** because it requires a live LLM and a human; cadence is per-release, not per-commit. Spec §7.3 acknowledges this is by-design untestable headlessly.

Together: Tier 1 closes the static gap (every commit), Tier 2 (manual via MANUAL.md) closes the simulator-vs-reality gap when needed, Tier 3 closes the LLM-side activation gap (manual, pre-release).

## Invocation matrix

```bash
# Tier 1 — always
tests/audit-marketplace.sh
tests/wave-0/run-smoke-test.sh
tests/p2/run-real-install-test.sh
src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/tests/smoke-test.sh

# Tier 2 — always SKIPs in v6.0 (exit 77); manual procedure documented
tests/integration/run-real-install.sh                    # prints SKIP message; exit 77
cat tests/integration/MANUAL.md                          # ad-hoc verification procedure

# Tier 3 — manual (follow the instructions the script prints)
tests/p2/lib/probe-llm-context.sh <project-root> <sentinel-token>
```

## Adding a new test

Decide which tier first:

- **Catches a regression detectable from source alone** (e.g., schema drift, missing field, inconsistent path, marketplace drift, step-file namespace error): **Tier 1**. Add a check to `audit-marketplace.sh` with a corresponding fixture.
- **Catches a regression that requires running the real installer**: **Tier 2** — but PASS-mode is deferred. Document the verification procedure in `MANUAL.md`; the automated script remains SKIP. When BMAD adds a local-install flag, the stub upgrades to a real script.
- **Requires a live LLM**: **Tier 3**. Document the manual probe in a runbook-style file under `tests/p2/lib/` or `tests/integration/lib/`; do not pretend to automate it.

When in doubt, prefer Tier 1 — broader coverage, lower cost.

## `.no-marketplace` sentinel

A skill dir under `src-v6/*/skills/<name>/` containing a file named `.no-marketplace` is excluded from the orphan check `audit-marketplace.sh` (d). Use cases:
- WIP skill not yet marketplace-ready
- Test-only or internal-helper skill that should never be installed

The sentinel only suppresses check (d). Other checks (a, b, e, f) still apply to the skill's content.

## Plan-C ratification cadence

Tier 3's Plan-C probe is **not** run continuously. It runs:
- Once per BMAD version upgrade (BMAD's customize resolver or installer changes could break LLM-side loading silently).
- Once per BAM v6.x release tag.
- Whenever a Tier-1 or Tier-2 result suggests the LLM-side contract may have drifted (rare).

Outcome is recorded in `tests/p2/PLAN-C-RATIFICATION.md`.

## Exit code conventions

All test scripts follow POSIX autotest conventions:

| Code | Meaning |
|---|---|
| 0 | PASS |
| 1 | FAIL — genuine regression |
| 64 | usage error (bad CLI arg) |
| 73 | precondition missing (e.g., script not found) |
| 75 | environment unmet (e.g., Python < 3.11) |
| 77 | SKIP — test not applicable in this environment (e.g., Tier-2 in v6.0; always SKIPs) |

**CI integration caveat:** Some CI runners treat any non-zero exit as FAILURE by default. For Tier-2 (which always SKIPs with exit 77), CI configuration must explicitly treat exit 77 as SKIP, not FAIL, OR exclude `tests/integration/run-real-install.sh` from CI gates. See the runner's docs for autotest convention support.

## Future state

When BMAD ships a local-install API (or P2.x adds CI push-and-pin), Tier-2 PASS-mode lands. The transition is local to `tests/integration/run-real-install.sh` — invocation pattern stays the same, the script just stops SKIPping.
```

### Step 2: Commit

```bash
git add tests/README.md
git commit -m "$(cat <<'EOF'
docs(p2-2): BAM v6 3-tier test infrastructure README (Concern 4)

Documents the tier model, why each tier exists, when to run which, and
the v6.0 Tier-2 PASS-mode deferral rationale. Includes invocation
matrix, exit-code conventions with CI-integration caveat for autotest
exit 77 (some CI runners treat as FAIL by default), and the
`.no-marketplace` sentinel mechanism.

Concern 4 / Task 3 of P2.2 Task 0.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: ADR 007 + INDEX update

**Files:**
- Create: `_bmad/_memory/atlas/architecture-decisions/2026-05-13-007-real-installer-test-infrastructure.md`
- Modify: `_bmad/_memory/atlas/architecture-decisions/INDEX.md`

### Step 1: Write ADR 007

```markdown
---
id: 2026-05-13-007
title: Adopt 3-tier test strategy with Tier-2 PASS-mode deferred (BMAD has no local-install API)
status: accepted
date: 2026-05-13
persona: atlas
related-personas: []
modules: [bmad-bam-platform]
supersedes: null
superseded-by: null
assumptions:
  - The cp-based simulators (Wave 0, P2.1) are kept as Tier-1 mechanism checks; not deleted.
  - The `bmad` CLI is not universally available on contributor machines; a hard requirement would block contributions.
  - LLM-side activation cannot be reliably automated in CI (spec §7.3); a manual ritual is acceptable for release cadence.
  - BMAD v6.6.0's installer offers no API to install from a local checkout (verified against `external/bmad-method/tools/installer/`).
dependencies-on-other-decisions:
  - 2026-05-12-002
  - 2026-05-13-005
  - 2026-05-13-006
generated-by: claude-opus-4-7
authored-by: collaborative
---

## Context

PR #2 shipped two bugs that the existing tests did not catch:
- marketplace.json had only v3 paths, so a real `bmad install bmad-bam-platform` would have copied v3 content rather than P2.1.
- The sentinel namespace (`_bmad/platform/`) collided with BMAD's install target (`_bmad/bam-platform/`), so workflow step files referenced the wrong namespace.

Both bugs were caught post-execution by a manual audit, not by tests. The shared cause: the existing tests (`tests/wave-0/run-smoke-test.sh`, `tests/p2/run-real-install-test.sh`) simulate `bmad install` via `cp -a`. cp does not check marketplace.json. cp copies wherever told, not where real BMAD does.

P2.2 is about to add two more workflows. Without closing this blind spot, the same class of bug can ship again.

The original kickoff proposed a 3-tier strategy: Tier 1 (always-run static + simulated), Tier 2 (opt-in real-install), Tier 3 (manual LLM probe). During plan drafting, an external review surfaced — and direct source-reading confirmed — that BMAD v6.6.0's installer has no API to install from a local checkout:
- No `--from <path>` flag in `commands/install.js` (grep returns 0)
- No `BAM_LOCAL_SOURCE` env override anywhere in installer source
- Cache-directory symlink workaround triggers `git reset --hard origin/HEAD` against the symlink target per `community-manager.js:292` — destroys local commits
- Bare-copy workaround hits the same destructive git operation

Automated Tier-2 PASS-mode is therefore not tractable without upstream BMAD changes or CI infrastructure not yet built.

## Decision

Adopt a 3-tier strategy with Tier-2 PASS-mode deferred:

- **Tier 1 (always) — expanded.** `tests/audit-marketplace.sh` adds 6 checks (a–f). Beyond the original 4 (a–d) checking marketplace internal coherence, two new checks ground Tier-1 in PR #2's specific regression classes:
  - **(e)** every v6 module under `src-v6/` has at least one matching plugin entry in `marketplace.json` (catches Bug 1: marketplace drift)
  - **(f)** step files / templates in v6 skills don't reference unknown `_bmad/<namespace>/` paths (catches Bug 2: namespace collision)
  - The orphan check (d) accepts a `.no-marketplace` sentinel file in any skill dir to suppress the orphan error — needed for WIP skills.
  - Per-plugin skill-root inference: the audit derives the orphan-scan root from each plugin's listed skill paths, so the script scales to future BAM modules without CLI flags.
- **Tier 2 (deferred) — SKIP-by-default stub.** `tests/integration/run-real-install.sh` always exits 77 with a message explaining the BMAD-side constraint. `tests/integration/MANUAL.md` documents a push-and-pin procedure contributors can run manually before release.
- **Tier 3 (manual) — unchanged.** Existing `tests/p2/lib/probe-llm-context.sh` instructions; outcome recorded in `tests/p2/PLAN-C-RATIFICATION.md`.

The existing cp-based tests are NOT rewritten; they remain Tier-1 mechanism checks alongside the new audit.

## Consequences

- Every commit runs the expanded audit. PR #2's two bug classes — and the broader marketplace-drift + namespace-collision classes — fail CI immediately.
- Tier-2 PASS-mode revisits when one of: BMAD ships a local-install API (`--from <path>` or equivalent); OR P2.x ships CI infrastructure for push-and-pin against a tagged SHA.
- Manual real-install verification remains available for release candidates via the MANUAL.md procedure.
- The `.no-marketplace` sentinel introduces a small mechanism developers must know about. Documented in `tests/README.md` and the fixture README.
- The audit's per-plugin skill-root inference scales to future BAM modules (bmad-bam-data, bmad-bam-ai, etc.) without script changes — each new module appears in marketplace.json with its own skill paths, and the audit walks each plugin independently.

## Alternatives Considered

- **Original 3-tier with automated Tier-2 PASS-mode.** Rejected: empirically depends on BMAD APIs that don't exist in v6.6.0 (`--from`, `BAM_LOCAL_SOURCE`); workarounds (symlink, bare copy) trigger destructive git operations. Shipping a script that pretends to work would create false confidence.
- **Tier-2 via Node-bypass** (call `installFromResolution` directly via a Node wrapper). Rejected: only tests file-copy semantics; doesn't exercise the `bmad install` CLI chain or `community-manager` git/npm operations. Added complexity (Node wrapper, BMAD module imports) for partial coverage that Tier-1's expanded checks largely subsume.
- **Tier-2 via CI push-and-pin** (push branch to fork; install with `--pin <sha>`). Rejected for v6.0: requires CI infrastructure not yet built (GitHub Actions runner with `bmad` CLI, fork-push credentials, marketplace fork management). P2.x scope.
- **Drop Tier-2 entirely.** Rejected: the deferred stub is honest documentation of what would be tested if it could be; deleting it loses that signal. Future BAM developers seeing the stub know "this is something we'd test if we could."
- **Hard-require `bmad` CLI for all tests.** Rejected: contributors without `bmad` would be blocked; BMAD's installer has network/cache state that doesn't belong in unit-level tests.

## Revisit triggers

This ADR is reconsidered when ANY of these happen:
1. BMAD ships a local-install API (`bmad install --from <path>` or equivalent) — Tier-2 stub becomes a real script.
2. P2.x adds CI infrastructure for push-and-pin against a tagged SHA — Tier-2 PASS-mode lands in CI, stays SKIP locally.
3. A regression class slips past Tier-1 expanded checks — the gap motivates either more Tier-1 checks or a different Tier-2 design.
```

### Step 2: Append to INDEX.md

```markdown
| 2026-05-13-007 | Adopt 3-tier test strategy with Tier-2 PASS-mode deferred (BMAD has no local-install API) | accepted | 2026-05-13 |
```

### Step 3: Validate frontmatter parses

```bash
python3 -c "
import yaml
f = '_bmad/_memory/atlas/architecture-decisions/2026-05-13-007-real-installer-test-infrastructure.md'
fm = yaml.safe_load(open(f).read().split('---')[1])
assert fm['id'] == '2026-05-13-007'
print('OK:', fm['title'][:60], '...')
"
```

### Step 4: Commit

```bash
git add _bmad/_memory/atlas/architecture-decisions/
git commit -m "$(cat <<'EOF'
docs(p2-2): ADR 007 — 3-tier test strategy with Tier-2 deferred (Concern 4)

Records the empirical finding that BMAD v6.6.0 has no local-install API
(verified against installer source) and the resulting decision to:
  - Expand Tier-1 (6 checks; new e + f close PR #2's regression classes)
  - Defer Tier-2 PASS-mode (SKIP-by-default stub + MANUAL.md runbook)
  - Keep Tier-3 unchanged (manual Plan-C probe)

Lists revisit triggers (BMAD local-install API; CI push-and-pin infra;
regression class slipping past Tier-1).

Concern 4 / Task 4 of P2.2 Task 0.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Final verification + push + PR

**Files:** none new; runs everything and ships.

### Step 1: Re-run all Tier-1 tests

```bash
tests/audit-marketplace.sh
tests/wave-0/run-smoke-test.sh
tests/p2/run-real-install-test.sh
src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/tests/smoke-test.sh
```

Each must exit 0. If any fails, investigate before pushing. (If the new audit fails, it's catching a real regression in the merged refactor — fix that issue, then re-run.)

### Step 2: Verify Tier-2 SKIPs cleanly

```bash
tests/integration/run-real-install.sh
echo "exit=$?"
```

Expected: `exit=77` plus the SKIP message.

### Step 3: Push the branch

```bash
git push origin feat/v6-p2-2-task-0-concern-4
```

### Step 4: Open the PR

```bash
gh pr create --base feat/bam-v3-pure-kb --head feat/v6-p2-2-task-0-concern-4 \
    --title "feat(p2): Concern 4 — 3-tier real-installer test infrastructure" \
    --body "$(cat <<'EOF'
## Summary

Closes the cp-simulation blind spot exposed by PR #2 (marketplace v3-paths + `_bmad/platform/` namespace bugs caught only by post-hoc manual audit). Ships expanded Tier-1 auditing that catches both bug classes statically. Tier-2 PASS-mode is deferred and documented honestly — BMAD v6.6.0 has no local-install API (verified against installer source); all viable workarounds trigger destructive git operations.

## What changed

| File | Tier | Role |
|---|---|---|
| `tests/audit-marketplace.sh` | 1 (always) | Static validation; 6 checks (a–f) |
| `tests/fixtures/marketplace-audit/*` | 1 | 8 fixtures — one per failure mode + sentinel pass case |
| `tests/integration/run-real-install.sh` | 2 (deferred) | SKIP-by-default stub (exit 77) with rationale |
| `tests/integration/MANUAL.md` | 2 | Manual push-and-pin procedure for ad-hoc verification |
| `tests/README.md` | docs | 3-tier overview + deferral rationale + invocation matrix |
| `_bmad/_memory/atlas/architecture-decisions/2026-05-13-007-*.md` | adr | Decision record with empirical evidence + revisit triggers |

## Design rationale

cp-based simulators pass when real `bmad install` would fail. PR #2's two bugs (marketplace v3-only listings + namespace mismatch) shipped because the simulator's blind spot mapped exactly onto the bugs. Closing the blind spot needs (a) static checks that don't depend on running the installer, and (b) honest acknowledgment of where the static checks can't reach.

Originally Tier-2 was scoped as automated real-install testing. Empirical investigation showed BMAD v6.6.0 has no API for this, and all viable workarounds (cache symlink, bare copy) trigger `git reset --hard origin/HEAD` against the cached repo (community-manager.js:292) — destroying local commits. Tier-2 ships as a deferred stub with a manual procedure; PASS-mode revisits when BMAD adds local-install support or P2.x adds CI push-and-pin.

Tier-1 picks up the slack: 6 checks (a–f) ground the audit in both marketplace.json internal consistency AND v6 source tree coherence. New checks (e) and (f) specifically target the two PR #2 bug classes.

## Tier table

| Tier | When | Catches |
|---|---|---|
| 1 — always | Every commit; CI | Static marketplace consistency (a–d); v6 module presence (e); step-file namespace coherence (f); resolver string merge; cp-based Path B; skill machinery |
| 2 — deferred | Manual via MANUAL.md (script always SKIPs) | Real `bmad install` + finalize + sentinel emit (when BMAD adds local-install API or CI lands) |
| 3 — manual | Pre-release / per BMAD upgrade | Plan C — LLM-side activation contract |

## Test plan

- [x] Tier-1: all 4 scripts pass (audit + wave-0 + p2 + skill smoke)
- [x] Tier-1 fixtures: 2 good pass (good-minimal + sentinel-excluded-orphan), 6 bad fail with check-letter diagnostics
- [x] Audit passes against current marketplace.json + src-v6/ tree (caught nothing → tree is consistent; or, if it caught something, the issue was fixed pre-merge)
- [x] Tier-2 SKIP mode: exits 77 with rationale message
- [ ] Tier-2 PASS mode: deferred per ADR 007; revisit triggers documented
- [ ] Tier-3 Plan C: pending future release ratification

## ADR

`_bmad/_memory/atlas/architecture-decisions/2026-05-13-007-real-installer-test-infrastructure.md` captures the empirical evidence (BMAD source citations), the chosen design (Option E), 5 alternatives considered with rejection rationale, and 3 revisit triggers.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

### Step 5: Return PR URL to user

After `gh pr create` completes, the returned URL goes back to the user.

---

## Self-Review

Spec coverage check against the kickoff:

- 3 deliverables listed (`audit-marketplace.sh`, `integration/run-real-install.sh` + `MANUAL.md`, `README.md`) — covered by Tasks 1, 2, 3
- Each deliverable has explicit file path — yes
- Atomic steps per task — Task 1 has 12 steps (large but each is one mechanical action), Task 2 has 4, Tasks 3/4/5 are short by nature
- Anti-patterns from kickoff observed — yes (don't rewrite existing tests, SKIP not FAIL, no hard CLI dep, no CI orchestration)
- Verification of all 3 tiers — Task 5
- ADR 007 — Task 4
- Commit message draft per task — yes

Placeholder scan: zero TODO / TBD / "implement later" — all code blocks and JSON fixtures are complete. Each fixture has its concrete content inline.

Type consistency:
- Skill-path shape `./src-v6/bmad-bam-platform/skills/<name>` and `./tests/fixtures/.../skills/<name>` used consistently
- Exit codes (0/1/64/73/75/77) match conventions across all files
- `.no-marketplace` sentinel filename consistent across script, README, ADR
- Check-letter tagging `(check a)` / `(check b)` / etc. consistent in audit error messages + fixture assertions

Branch-on-runtime: Tier-2 PASS-mode is deferred; the SKIP stub never actually exercises the install. This is intentional per Option E (the design the user chose after the v1 plan revealed the BMAD-side constraint).

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-13-p2-2-task-0-real-installer-test.md`. Two execution options:

**1. Subagent-Driven (recommended)** — Dispatch a fresh subagent per task, review between tasks. Same approach used for Wave 0 and P2.1.

**2. Inline Execution** — Execute in this session using executing-plans, batch with checkpoints.

Which approach?
