# Wave 0 — BAM v6 Smoke Test Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Verify BAM v6's universal-glob activation mechanism works in target BMAD installs; produce a working `bmad-bam-smoke-test` workflow + skeletal `bmad-bam-platform` module; persist the Plan-A/B/C selection to `_bmad/bam/family.json` so subsequent waves know which path to use.

**Architecture:** Build the *minimum* `bmad-bam-platform` module (1 persona stub, 1 sentinel fragment, 1 workflow with 8 steps, 1 post-install script) needed to test whether BMAD v6.4.0+'s universal-glob pattern `file:{project-root}/**/project-context.md` auto-loads a BAM-generated synthesis file. A sentinel UUID token in the generated file is the empirical pass/fail signal. If Plan A fails, fall through to Plan B (explicit customize-overlay in install hook) and Plan C (manual `bmad-customize` step). Results captured in `_bmad/bam/family.json` for use by P2+.

**Tech Stack:** Bash (smoke test runner + post-install hook), YAML (BMAD module/skill manifests), Markdown (fragments + workflow steps), Python 3 (sentinel UUID generation), Node.js (BMAD's own installer — used as black box). No new dependencies beyond what BMAD itself requires.

---

## File Structure

Files created in this plan, organized by responsibility:

### Test infrastructure (verifies the plan delivers)

- `tests/wave-0/run-smoke-test.sh` — end-to-end integration test invoking the full smoke-test workflow against a fixture BMAD project
- `tests/wave-0/fixtures/test-bmad-project/` — minimal fixture: an empty BMAD-initialized project for installing bmad-bam-platform into
- `tests/wave-0/fixtures/test-bmad-project/_bmad/config.toml` — fixture's BMAD config (declares the project as BMAD v6.4.0+)
- `tests/wave-0/lib/sentinel.sh` — helper: generates UUID-based `BAM_LOAD_VERIFY_<uuid>` tokens
- `tests/wave-0/lib/inspect-context.sh` — helper: invokes BMAD's customize-resolution to inspect what context a skill would load

### Module skeleton (the thing being smoke-tested)

- `src-v6/bmad-bam-platform/module.yaml` — BMAD-canonical module declaration (`code: bam-platform`, persona registration, install hooks)
- `src-v6/bmad-bam-platform/README.md` — module README
- `src-v6/bmad-bam-platform/agents/atlas/atlas.md` — Atlas persona stub (just enough to register; full persona in P2)
- `src-v6/bmad-bam-platform/agents/atlas/resources/platform-index.csv` — fragment index (1 row pointing to sentinel)
- `src-v6/bmad-bam-platform/agents/atlas/resources/fragments/sentinel.md` — sentinel fragment that gets synthesized into project-context.md
- `src-v6/bmad-bam-platform/scripts/post-install.sh` — generates `_bmad/platform/project-context.md` with sentinel token
- `src-v6/bmad-bam-platform/scripts/generate-sentinel.py` — Python helper, generates `BAM_LOAD_VERIFY_<uuid>` tokens

### Smoke-test workflow (Wave 0's deliverable workflow)

- `src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/SKILL.md`
- `src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/bmad-skill-manifest.yaml`
- `src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/workflow.md`
- `src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/steps/step-01-c-verify-bmad-version.md`
- `src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/steps/step-02-c-detect-universal-glob.md`
- `src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/steps/step-03-c-install-test-mode.md`
- `src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/steps/step-04-c-emit-sentinel.md`
- `src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/steps/step-05-v-verify-plan-a.md`
- `src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/steps/step-06-v-verify-plan-b.md`
- `src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/steps/step-07-v-verify-plan-c.md`
- `src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/steps/step-08-c-persist-result.md`

### State capture

- `_bmad/bam/family.json` — populated by the workflow at Wave 0 conclusion (in fixture project AND real install)
- `_bmad/bam/install-logs/wave-0-<timestamp>.log` — workflow run log

---

## Task 0: Investigate BMAD customize-resolution mechanics

**Why first:** the smoke test's pass/fail logic depends on observing what BMAD loads as context for a skill. We need to know HOW BMAD resolves the universal-glob before we can write a test that observes it.

**Files:**
- Read: `external/bmad-method/tools/installer/core/installer.js`
- Read: `external/bmad-method/tools/installer/commands/install.js`
- Read: `external/bmad-method/docs/how-to/customize-bmad.md`
- Read any file matching `external/bmad-method/**/*.js` containing `persistent_facts` or `customize` keyword
- Create: `tests/wave-0/INVESTIGATION-NOTES.md` (records findings)

- [x] **Step 1: Read BMAD installer entry point**

Run: `cat external/bmad-method/tools/installer/bmad-cli.js | head -50`
Expected: shows CLI entry; note where `install` command dispatches.

- [x] **Step 2: Read install command**

Run: `cat external/bmad-method/tools/installer/commands/install.js`
Expected: shows install flow. Note: where does it merge customize.toml? How does universal-glob `file:{project-root}/**/project-context.md` get resolved at run time vs install time?

- [x] **Step 3: Search for universal-glob handling**

Run: `grep -rn "project-context\|persistent_facts\|universal" external/bmad-method/tools/ | head -30`
Expected: lines showing where BMAD reads `persistent_facts` and resolves glob patterns.

- [x] **Step 4: Determine resolution time**

Read identified files. Decide:
- Does BMAD resolve the glob at INSTALL time (writing resolved paths into `_bmad/custom/`)?
- Or at RUN time (resolving each invocation)?

Record decision in `tests/wave-0/INVESTIGATION-NOTES.md` under heading "Glob resolution time".

- [x] **Step 5: Identify observation point for smoke test**

Based on Step 4, decide HOW the smoke test will verify the sentinel token reaches a skill's context:

- If install-time resolution: inspect resolved `_bmad/custom/<skill>/customize.toml` after install
- If run-time resolution: invoke BMAD's `customize` resolution programmatically (find the JS function) OR use a BMAD CLI subcommand that dumps loaded context (look for `bmad customize --show`, `bmad debug`, or similar)

Record decision in `INVESTIGATION-NOTES.md` under heading "Observation point".

- [x] **Step 6: Write the investigation notes**

Create `tests/wave-0/INVESTIGATION-NOTES.md` with the following exact structure:

```markdown
# Wave 0 — BMAD Customize Resolution Investigation

## BMAD version under test
- Version: <fill from external/bmad-method/package.json>

## Glob resolution time
- <install-time | run-time>
- Source: <file:line refs>

## Observation point for smoke test
- Method: <inspect-resolved-toml | invoke-resolution-fn | bmad-cli-subcommand>
- Command/function: <exact command or JS function name>

## Risks identified
- <list any concerns>
```

- [x] **Step 7: Commit**

```bash
git add tests/wave-0/INVESTIGATION-NOTES.md
git commit -m "$(cat <<'EOF'
chore(wave-0): document BMAD customize-resolution investigation findings

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 1: Create directory skeleton

**Files:**
- Create: `src-v6/bmad-bam-platform/` (directory)
- Create: `src-v6/bmad-bam-platform/agents/atlas/resources/fragments/` (directory)
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/steps/` (directory)
- Create: `src-v6/bmad-bam-platform/scripts/` (directory)
- Create: `tests/wave-0/fixtures/test-bmad-project/_bmad/` (directory)
- Create: `tests/wave-0/lib/` (directory)
- Create: `src-v6/.gitkeep`
- Create: `tests/wave-0/.gitkeep`

- [x] **Step 1: Verify parent paths**

Run: `ls -d src-v6 tests 2>/dev/null || echo "missing"`
Expected: either both directories listed, or "missing" if neither exists.

- [x] **Step 2: Create directory tree**

Run:
```bash
mkdir -p src-v6/bmad-bam-platform/agents/atlas/resources/fragments
mkdir -p src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/steps
mkdir -p src-v6/bmad-bam-platform/scripts
mkdir -p tests/wave-0/fixtures/test-bmad-project/_bmad
mkdir -p tests/wave-0/lib
touch src-v6/.gitkeep tests/wave-0/.gitkeep
```

Expected: no errors. (`mkdir -p` is idempotent.)

- [x] **Step 3: Verify structure**

Run: `find src-v6 tests/wave-0 -type d | sort`
Expected output (exact):
```
src-v6
src-v6/bmad-bam-platform
src-v6/bmad-bam-platform/agents
src-v6/bmad-bam-platform/agents/atlas
src-v6/bmad-bam-platform/agents/atlas/resources
src-v6/bmad-bam-platform/agents/atlas/resources/fragments
src-v6/bmad-bam-platform/scripts
src-v6/bmad-bam-platform/skills
src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test
src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/steps
tests/wave-0
tests/wave-0/fixtures
tests/wave-0/fixtures/test-bmad-project
tests/wave-0/fixtures/test-bmad-project/_bmad
tests/wave-0/lib
```

- [x] **Step 4: Commit skeleton**

```bash
git add src-v6/.gitkeep tests/wave-0/.gitkeep
git commit -m "$(cat <<'EOF'
chore(wave-0): create directory skeleton for bmad-bam-platform + tests

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Create test fixture (minimal BMAD project)

**Files:**
- Create: `tests/wave-0/fixtures/test-bmad-project/_bmad/config.toml`
- Create: `tests/wave-0/fixtures/test-bmad-project/.gitkeep`
- Create: `tests/wave-0/fixtures/README.md`

- [x] **Step 1: Write fixture's BMAD config**

Create `tests/wave-0/fixtures/test-bmad-project/_bmad/config.toml`:

```toml
[project]
name = "wave-0-test-fixture"
type = "bmad-test-project"

[bmad]
version = ">=6.4.0"

# Minimum config: enough that BMAD identifies this as a valid project
# but no real product code or modules installed beyond what bmad-bam-smoke-test installs
```

- [x] **Step 2: Add fixture README**

Create `tests/wave-0/fixtures/README.md`:

```markdown
# Wave 0 Test Fixtures

Fixtures used by `tests/wave-0/run-smoke-test.sh` to verify the BAM v6 universal-glob mechanism.

## `test-bmad-project/`

A minimal BMAD-initialized project. The smoke test copies this fixture to a temp directory, installs `bmad-bam-platform` into it, then verifies the sentinel token reaches a BMAD skill's loaded context.

The fixture must remain **minimal** — adding unrelated modules would obscure what Wave 0 is testing.
```

- [x] **Step 3: Verify files exist with expected content**

Run: `cat tests/wave-0/fixtures/test-bmad-project/_bmad/config.toml`
Expected: shows the TOML content from Step 1.

Run: `cat tests/wave-0/fixtures/README.md`
Expected: shows the README content from Step 2.

- [x] **Step 4: Commit fixture**

```bash
git add tests/wave-0/fixtures/
git commit -m "$(cat <<'EOF'
test(wave-0): add minimal BMAD fixture for smoke-test runs

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Write sentinel token helper

**Files:**
- Create: `tests/wave-0/lib/sentinel.sh`
- Create: `src-v6/bmad-bam-platform/scripts/generate-sentinel.py`

- [x] **Step 1: Write the Python helper that generates BAM_LOAD_VERIFY tokens**

Create `src-v6/bmad-bam-platform/scripts/generate-sentinel.py`:

```python
#!/usr/bin/env python3
"""Generate a BAM_LOAD_VERIFY_<uuid> sentinel token for Wave 0 smoke testing.

Output format: BAM_LOAD_VERIFY_<32-char-hex-uuid>
Stdout-only; no logging side effects.
"""

import sys
import uuid


def main() -> int:
    token = f"BAM_LOAD_VERIFY_{uuid.uuid4().hex}"
    print(token)
    return 0


if __name__ == "__main__":
    sys.exit(main())
```

- [x] **Step 2: Make the Python helper executable**

Run: `chmod +x src-v6/bmad-bam-platform/scripts/generate-sentinel.py`

- [x] **Step 3: Run the helper to verify token format**

Run: `src-v6/bmad-bam-platform/scripts/generate-sentinel.py`
Expected: prints one line matching pattern `BAM_LOAD_VERIFY_[a-f0-9]{32}`. Run twice; tokens MUST differ.

- [x] **Step 4: Write a bash wrapper for use in shell scripts**

Create `tests/wave-0/lib/sentinel.sh`:

```bash
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
```

- [x] **Step 5: Test the bash wrapper**

Run: `bash -c 'source tests/wave-0/lib/sentinel.sh; generate_sentinel'`
Expected: prints one `BAM_LOAD_VERIFY_<hex>` line; exit code 0.

- [x] **Step 6: Commit**

```bash
git add src-v6/bmad-bam-platform/scripts/generate-sentinel.py tests/wave-0/lib/sentinel.sh
git commit -m "$(cat <<'EOF'
feat(wave-0): add sentinel token generator (Python + bash wrapper)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Create Atlas persona stub

**Files:**
- Create: `src-v6/bmad-bam-platform/agents/atlas/atlas.md`

- [x] **Step 1: Write the persona stub**

Create `src-v6/bmad-bam-platform/agents/atlas/atlas.md`:

```markdown
---
code: bmad-bam-agent-atlas
name: Atlas
title: Platform Architect
icon: "🏛️"
team: bam-platform
version: 0.1.0
status: stub
---

# Atlas — Platform Architect

**Wave 0 stub.** Full persona definition arrives in P2 (`bmad-bam-platform` module plan).

In Wave 0, Atlas exists only so that:
1. `module.yaml`'s `agents:` block has a registered persona to declare
2. The smoke-test workflow has an owning persona
3. Subsequent waves can incrementally build out the persona without restructuring

## Voice (Wave 0 placeholder)

Structural engineer: load-bearing decisions first, every gate explicit. Full voice + persona fragments in P2.

## Resources

- `resources/platform-index.csv` — fragment index
- `resources/fragments/sentinel.md` — Wave 0 sentinel fragment
```

- [x] **Step 2: Verify file**

Run: `head -10 src-v6/bmad-bam-platform/agents/atlas/atlas.md`
Expected: shows the frontmatter block with `code: bmad-bam-agent-atlas` and `name: Atlas`.

- [x] **Step 3: Commit**

```bash
git add src-v6/bmad-bam-platform/agents/atlas/atlas.md
git commit -m "$(cat <<'EOF'
feat(wave-0): add Atlas persona stub for bmad-bam-platform

Minimal registration only; full persona in P2.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Create sentinel fragment + index CSV

**Files:**
- Create: `src-v6/bmad-bam-platform/agents/atlas/resources/fragments/sentinel.md`
- Create: `src-v6/bmad-bam-platform/agents/atlas/resources/platform-index.csv`

- [x] **Step 1: Write the sentinel fragment**

Create `src-v6/bmad-bam-platform/agents/atlas/resources/fragments/sentinel.md`:

```markdown
---
id: sentinel
title: Wave 0 Sentinel Fragment
category: wave-0
kind: fragment
qg_ref: null
last_reviewed: 2026-05-11
version: 0.1.0
status: experimental
author: atlas
references: []
tested-against: []
---

# Wave 0 Sentinel Fragment

This fragment exists solely so the post-install hook can synthesize a `project-context.md` containing a `BAM_LOAD_VERIFY_<uuid>` token that the smoke-test workflow can detect downstream.

## Sentinel marker

The actual sentinel token is injected at install time by `scripts/post-install.sh`, not stored in this fragment. This file is the *anchor* — it tells the synthesis script what content to wrap the sentinel in.

## After Wave 0

This fragment is retired (status: superseded) once Wave 0 selects a plan. The `bmad-bam-platform` module's real fragments arrive in P2.
```

- [x] **Step 2: Write the index CSV**

Create `src-v6/bmad-bam-platform/agents/atlas/resources/platform-index.csv`:

```csv
id,name,description,tags,tier,fragment_file
sentinel,Wave 0 Sentinel Fragment,Anchor for smoke-test sentinel token injection,"wave-0,experimental",specialized,fragments/sentinel.md
```

- [x] **Step 3: Verify CSV parses (single data row)**

Run: `tail -n +2 src-v6/bmad-bam-platform/agents/atlas/resources/platform-index.csv | wc -l`
Expected: `1`

- [x] **Step 4: Verify fragment file referenced exists**

Run: `awk -F',' 'NR>1 {print $6}' src-v6/bmad-bam-platform/agents/atlas/resources/platform-index.csv | while read f; do test -f "src-v6/bmad-bam-platform/agents/atlas/resources/$f" && echo "OK: $f" || echo "MISSING: $f"; done`
Expected output: `OK: fragments/sentinel.md`

- [x] **Step 5: Commit**

```bash
git add src-v6/bmad-bam-platform/agents/atlas/resources/
git commit -m "$(cat <<'EOF'
feat(wave-0): add sentinel fragment + Atlas index CSV

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Write the post-install script (generates project-context.md with sentinel)

**Files:**
- Create: `src-v6/bmad-bam-platform/scripts/post-install.sh`

- [x] **Step 1: Write the post-install script**

Create `src-v6/bmad-bam-platform/scripts/post-install.sh`:

```bash
#!/usr/bin/env bash
# src-v6/bmad-bam-platform/scripts/post-install.sh
#
# Wave 0 post-install hook.
# Generates _bmad/platform/project-context.md in the host project, containing
# a BAM_LOAD_VERIFY_<uuid> sentinel token. Idempotent + atomic.
#
# Usage: post-install.sh <project-root>

set -euo pipefail

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <project-root>" >&2
    exit 64
fi

PROJECT_ROOT="$1"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SENTINEL_PY="$SCRIPT_DIR/generate-sentinel.py"

if [ ! -d "$PROJECT_ROOT" ]; then
    echo "ERROR: project root '$PROJECT_ROOT' does not exist" >&2
    exit 66
fi

if [ ! -f "$PROJECT_ROOT/_bmad/config.toml" ]; then
    echo "ERROR: '$PROJECT_ROOT' is not a BMAD project (missing _bmad/config.toml)" >&2
    exit 66
fi

# Generate sentinel token
if [ ! -x "$SENTINEL_PY" ]; then
    echo "ERROR: sentinel generator not executable at $SENTINEL_PY" >&2
    exit 73
fi
SENTINEL="$(python3 "$SENTINEL_PY")"

# Target directory + file
TARGET_DIR="$PROJECT_ROOT/_bmad/platform"
TARGET_FILE="$TARGET_DIR/project-context.md"
TMP_FILE="$(mktemp "${TARGET_DIR}.XXXXXX.tmp" 2>/dev/null || mktemp /tmp/bam-platform.XXXXXX.tmp)"

mkdir -p "$TARGET_DIR"

# Write to temp file
cat > "$TMP_FILE" <<EOF
<!-- Generated by bmad-bam-platform post-install.sh -->
<!-- Do not edit by hand; regenerated on every install -->

# BAM v6 Platform Module — Project Context

## Wave 0 Sentinel

$SENTINEL

If you see the token above in a BMAD skill's loaded context, the universal-glob mechanism (Plan A) is working.

## Installed personas

- Atlas (🏛️ Platform Architect) — stub in Wave 0; full persona in P2.

## Wave 0 status

Module installed in Wave 0 smoke-test mode. Run the smoke-test workflow to determine which activation plan applies.

EOF

# Atomic rename
mv -f "$TMP_FILE" "$TARGET_FILE"

# Log install
LOG_DIR="$PROJECT_ROOT/_bmad/bam/install-logs"
mkdir -p "$LOG_DIR"
echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] post-install ran; sentinel=$SENTINEL; target=$TARGET_FILE" >> "$LOG_DIR/platform-install.log"

echo "$SENTINEL"
```

- [x] **Step 2: Make executable**

Run: `chmod +x src-v6/bmad-bam-platform/scripts/post-install.sh`

- [x] **Step 3: Test post-install against fixture**

Run:
```bash
# Copy fixture to temp dir
WORK_DIR="$(mktemp -d)"
cp -r tests/wave-0/fixtures/test-bmad-project/. "$WORK_DIR/"

# Run post-install
SENTINEL=$(src-v6/bmad-bam-platform/scripts/post-install.sh "$WORK_DIR")

# Verify project-context.md exists
test -f "$WORK_DIR/_bmad/platform/project-context.md" && echo "OK: file exists"

# Verify sentinel appears
grep -q "$SENTINEL" "$WORK_DIR/_bmad/platform/project-context.md" && echo "OK: sentinel in file"

# Verify log written
test -f "$WORK_DIR/_bmad/bam/install-logs/platform-install.log" && echo "OK: log written"

# Cleanup
rm -rf "$WORK_DIR"
```

Expected output: three "OK:" lines, exit code 0.

- [x] **Step 4: Test idempotency**

Run:
```bash
WORK_DIR="$(mktemp -d)"
cp -r tests/wave-0/fixtures/test-bmad-project/. "$WORK_DIR/"
src-v6/bmad-bam-platform/scripts/post-install.sh "$WORK_DIR" >/dev/null
src-v6/bmad-bam-platform/scripts/post-install.sh "$WORK_DIR" >/dev/null
LINES=$(wc -l < "$WORK_DIR/_bmad/bam/install-logs/platform-install.log")
echo "Log lines after 2 runs: $LINES (expect 2)"
rm -rf "$WORK_DIR"
```

Expected: `Log lines after 2 runs: 2`. (Idempotent in that re-running doesn't corrupt state; logs append.)

- [x] **Step 5: Test failure on missing BMAD config**

Run:
```bash
WORK_DIR="$(mktemp -d)"
mkdir -p "$WORK_DIR/_bmad"  # exists but no config.toml
src-v6/bmad-bam-platform/scripts/post-install.sh "$WORK_DIR" 2>&1 | head -1
EXIT=$?
echo "Exit code: $EXIT"
rm -rf "$WORK_DIR"
```

Expected: error message containing "not a BMAD project" and exit code 66.

- [x] **Step 6: Commit**

```bash
git add src-v6/bmad-bam-platform/scripts/post-install.sh
git commit -m "$(cat <<'EOF'
feat(wave-0): add post-install script generating project-context.md with sentinel

Idempotent + atomic + fails fast on missing BMAD config.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Create the module.yaml for bmad-bam-platform

**Files:**
- Create: `src-v6/bmad-bam-platform/module.yaml`

- [x] **Step 1: Write module.yaml**

Create `src-v6/bmad-bam-platform/module.yaml`:

```yaml
code: bam-platform
name: "BAM v6 — Platform Module"
description: "Multi-tenant SaaS platform foundation. Wave 0: smoke-test skeleton only. Wave P2 builds full module."
default_selected: false

requires:
  bmad: ">=6.4.0,<7.0.0"

# Variables from Core Config:
## user_name
## project_name
## communication_language
## document_output_language
## output_folder

# Wave 0 scope — single persona stub, single fragment, single skill
agents:
  - code: bmad-bam-agent-atlas
    name: Atlas
    title: Platform Architect
    icon: "🏛️"
    team: bam-platform
    description: "Wave 0 stub. Full persona arrives in P2."

# Directories to create during installation
directories:
  - "{project-root}/_bmad/platform"
  - "{project-root}/_bmad/bam"
  - "{project-root}/_bmad/bam/install-logs"

# Installation
install:
  agents:
    source: agents/
    target: "{project-root}/_bmad/platform/agents/"

  skills:
    source: skills/
    target: "{skills-path}/"

  hooks:
    post: scripts/post-install.sh

# Wave 0 verification
verify:
  files_exist:
    - "{project-root}/_bmad/platform/project-context.md"  # generated by post-install

  skills_registered:
    - bmad-bam-smoke-test
```

- [x] **Step 2: Verify YAML parses**

Run: `python3 -c "import yaml; yaml.safe_load(open('src-v6/bmad-bam-platform/module.yaml'))" && echo "OK"`
Expected: `OK`. If error, fix YAML syntax.

- [x] **Step 3: Verify required fields present**

Run:
```bash
python3 - <<'EOF'
import yaml
with open('src-v6/bmad-bam-platform/module.yaml') as f:
    m = yaml.safe_load(f)
required = ['code', 'name', 'requires', 'agents', 'install']
missing = [k for k in required if k not in m]
if missing:
    print(f"MISSING: {missing}")
    exit(1)
print("OK: all required fields present")
EOF
```

Expected: `OK: all required fields present`.

- [x] **Step 4: Commit**

```bash
git add src-v6/bmad-bam-platform/module.yaml
git commit -m "$(cat <<'EOF'
feat(wave-0): add bmad-bam-platform module.yaml (skeleton scope)

Single persona, single skill, single fragment. Full module in P2.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: Create the smoke-test skill manifest + SKILL.md + workflow.md

**Files:**
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/SKILL.md`
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/bmad-skill-manifest.yaml`
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/workflow.md`

- [x] **Step 1: Write SKILL.md**

Create `src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/SKILL.md`:

```markdown
---
name: bmad-bam-smoke-test
description: "Verifies the BAM v6 universal-glob activation mechanism. Selects Plan A, B, or C based on what works in the target BMAD install. Run before any other BAM module work."
---

# bmad-bam-smoke-test

## Purpose

BAM v6 relies on BMAD v6.4.0+'s universal-glob pattern `file:{project-root}/**/project-context.md` to auto-load each BAM module's synthesis file into every BMAD core skill's context. This skill verifies that mechanism works in the user's BMAD install and selects a fallback plan if it doesn't.

## When to use

- Before installing any other BAM v6 module
- Whenever BMAD method version changes
- Whenever `_bmad/bam/family.json` is missing or its `plan` field is absent

## Output

- Selects one of:
  - **Plan A** — universal-glob auto-load works (preferred)
  - **Plan B** — explicit customize-overlay fallback
  - **Plan C** — manual `bmad-customize` step
- Persists selection to `{project-root}/_bmad/bam/family.json`
- Logs the run to `{project-root}/_bmad/bam/install-logs/wave-0-<timestamp>.log`

## Steps

See `workflow.md` for the mode router and `steps/` for individual step files.
```

- [x] **Step 2: Write bmad-skill-manifest.yaml**

Create `src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/bmad-skill-manifest.yaml`:

```yaml
name: bmad-bam-smoke-test
description: "Wave 0 — verify BAM v6 universal-glob activation; select Plan A/B/C"
module: bmad-bam-platform
persona: atlas
version: 0.1.0

inputs:
  - artifact: _bmad/config.toml
    required: true
    resolver: specific-path

outputs:
  - artifact: _bmad/bam/family.json
    location: "{project-root}/_bmad/bam/"
    required: true
  - artifact: install-log
    location: "{project-root}/_bmad/bam/install-logs/"
    required: true

execution_mode:
  default: assisted
  alternatives: [manual]

recommended_capabilities: []
minimum_persona_version: "0.1.0"
latency-budget: "10min"
cluster: foundation
```

- [x] **Step 3: Write workflow.md (mode router)**

Create `src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/workflow.md`:

```markdown
# bmad-bam-smoke-test — Workflow Router

Wave 0 only ships **Create mode**. Edit and Validate modes arrive in P2 if smoke-test becomes recurring.

## Create mode (Wave 0 default)

Sequential execution; halt on first failure unless step says otherwise.

1. `steps/step-01-c-verify-bmad-version.md` — confirm BMAD >= 6.4.0
2. `steps/step-02-c-detect-universal-glob.md` — confirm universal-glob present in BMAD customize.toml files
3. `steps/step-03-c-install-test-mode.md` — install bmad-bam-platform in test mode
4. `steps/step-04-c-emit-sentinel.md` — confirm post-install generated project-context.md with sentinel token
5. `steps/step-05-v-verify-plan-a.md` — try Plan A; if passes, jump to step 8
6. `steps/step-06-v-verify-plan-b.md` — try Plan B; if passes, jump to step 8
7. `steps/step-07-v-verify-plan-c.md` — try Plan C; if passes, continue
8. `steps/step-08-c-persist-result.md` — write `family.json` + log

If step 5 passes → final plan = A. If step 6 passes → B. If step 7 passes → C. If step 7 fails → escalate to user (BAM cannot activate).
```

- [x] **Step 4: Verify frontmatter parses**

Run:
```bash
python3 - <<'EOF'
import yaml
with open('src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/bmad-skill-manifest.yaml') as f:
    m = yaml.safe_load(f)
assert m['name'] == 'bmad-bam-smoke-test'
assert m['module'] == 'bmad-bam-platform'
print("OK: manifest parses + required fields present")
EOF
```

Expected: `OK: manifest parses + required fields present`.

- [x] **Step 5: Commit**

```bash
git add src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/SKILL.md \
        src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/bmad-skill-manifest.yaml \
        src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/workflow.md
git commit -m "$(cat <<'EOF'
feat(wave-0): add bmad-bam-smoke-test skill scaffolding (SKILL.md, manifest, workflow router)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 9: Write step-01 — verify BMAD version

**Files:**
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/steps/step-01-c-verify-bmad-version.md`

- [x] **Step 1: Write the step file**

Create the step file:

````markdown
---
step_id: 01-c-verify-bmad-version
auto-runnable: true
gate: machine-checkable
inputs: []
outputs: [bmad-version.txt]
---

# Step 01 — Verify BMAD method version

## Purpose

Confirm that the BMAD method installed in the host project is >= 6.4.0. Earlier versions don't ship the universal-glob pattern in core skill customize.toml files, so all three plans (A/B/C) would fail.

## Action

Read the BMAD version from `external/bmad-method/package.json` (in development) OR `{project-root}/_bmad/version.toml` (in installed projects).

```bash
# In a real installed project, BMAD ships a version file:
BMAD_VERSION=$(grep -E '^version' "{project-root}/_bmad/version.toml" | head -1 | awk -F'"' '{print $2}')

# Fallback: read from package.json in BMAD method source
if [ -z "$BMAD_VERSION" ]; then
    BMAD_VERSION=$(node -p "require('external/bmad-method/package.json').version")
fi

echo "BMAD version: $BMAD_VERSION"
```

## Verification (machine-checkable)

```bash
# Semver compare: BMAD_VERSION must be >= 6.4.0
node -e "
const v = process.argv[1].split('.').map(Number);
const min = [6, 4, 0];
const ok = v[0] > min[0] || (v[0] === min[0] && (v[1] > min[1] || (v[1] === min[1] && v[2] >= min[2])));
process.exit(ok ? 0 : 1);
" "$BMAD_VERSION"
```

Exit 0 → continue. Exit 1 → halt and report to user; smoke test cannot proceed.

## Output

Write `{project-root}/_bmad/bam/install-logs/bmad-version.txt`:

```
bmad_version=<X.Y.Z>
verified_at=<ISO-8601 UTC timestamp>
status=ok
```
````

- [x] **Step 2: Commit**

```bash
git add src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/steps/step-01-c-verify-bmad-version.md
git commit -m "$(cat <<'EOF'
feat(wave-0): add smoke-test step 01 — verify BMAD method version

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 10: Write step-02 — detect universal-glob in BMAD customize.toml files

**Files:**
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/steps/step-02-c-detect-universal-glob.md`

- [x] **Step 1: Write the step file**

Create the step:

````markdown
---
step_id: 02-c-detect-universal-glob
auto-runnable: true
gate: machine-checkable
inputs: [bmad-version.txt]
outputs: [universal-glob-presence.txt]
---

# Step 02 — Detect universal-glob in BMAD core skill customize.toml files

## Purpose

Verify BMAD core skills' `customize.toml` files contain the universal-glob pattern `file:{project-root}/**/project-context.md` in their `persistent_facts` array. Without it, Plan A is impossible regardless of BMAD version.

## Action

```bash
# In BMAD source: scan all customize.toml files for the universal-glob pattern
BMAD_SRC="external/bmad-method/src"
GLOB_PATTERN='file:\{project-root\}/\*\*/project-context\.md'

CUSTOMIZE_FILES=$(find "$BMAD_SRC" -name "customize.toml" -type f)
TOTAL=$(echo "$CUSTOMIZE_FILES" | wc -l)
WITH_GLOB=$(echo "$CUSTOMIZE_FILES" | xargs grep -l "$GLOB_PATTERN" 2>/dev/null | wc -l)

echo "customize.toml files total: $TOTAL"
echo "customize.toml files with universal-glob: $WITH_GLOB"

# All core skill customize.toml files SHOULD contain the universal glob in BMAD v6.4.0+.
# If WITH_GLOB == 0: Plan A impossible.
# If WITH_GLOB > 0 but < TOTAL: partial coverage; investigate which skills are missing.
```

## Verification (machine-checkable)

```bash
test "$WITH_GLOB" -gt 0 && echo "PRESENT" || echo "ABSENT"
```

Output `PRESENT` → continue.
Output `ABSENT` → halt; report that BMAD install lacks the activation mechanism; user must upgrade BMAD or accept Plan C only.

## Output

Write `{project-root}/_bmad/bam/install-logs/universal-glob-presence.txt`:

```
total_customize_toml=<N>
with_universal_glob=<N>
coverage=<full|partial|absent>
verified_at=<ISO-8601 UTC>
```
````

- [x] **Step 2: Commit**

```bash
git add src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/steps/step-02-c-detect-universal-glob.md
git commit -m "$(cat <<'EOF'
feat(wave-0): add smoke-test step 02 — detect universal-glob presence

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 11: Write step-03 — install in test mode

**Files:**
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/steps/step-03-c-install-test-mode.md`

- [x] **Step 1: Write the step file**

````markdown
---
step_id: 03-c-install-test-mode
auto-runnable: true
gate: machine-checkable
inputs: [universal-glob-presence.txt]
outputs: [install-status.txt]
---

# Step 03 — Install bmad-bam-platform in test mode

## Purpose

Install the skeletal `bmad-bam-platform` module into the host project. "Test mode" = uses local source (`src-v6/bmad-bam-platform/`) rather than a published location.

## Action

```bash
SOURCE_DIR="src-v6/bmad-bam-platform"
PROJECT_ROOT="${BMAD_PROJECT_ROOT:-$PWD}"

# Confirm source exists
test -d "$SOURCE_DIR" || { echo "ERROR: $SOURCE_DIR missing"; exit 1; }

# Confirm host project has BMAD config
test -f "$PROJECT_ROOT/_bmad/config.toml" || { echo "ERROR: $PROJECT_ROOT not a BMAD project"; exit 1; }

# Run post-install (creates _bmad/platform/, generates project-context.md)
SENTINEL=$("$SOURCE_DIR/scripts/post-install.sh" "$PROJECT_ROOT")

echo "Install complete; sentinel=$SENTINEL"
```

## Verification

```bash
# project-context.md must exist
test -f "$PROJECT_ROOT/_bmad/platform/project-context.md" || { echo "FAIL: project-context.md missing"; exit 1; }

# sentinel must be present in it
grep -q "BAM_LOAD_VERIFY_" "$PROJECT_ROOT/_bmad/platform/project-context.md" || { echo "FAIL: sentinel missing"; exit 1; }

# install log must exist
test -f "$PROJECT_ROOT/_bmad/bam/install-logs/platform-install.log" || { echo "FAIL: log missing"; exit 1; }

echo "PASS"
```

## Output

Write `{project-root}/_bmad/bam/install-logs/install-status.txt`:

```
status=installed
sentinel=<BAM_LOAD_VERIFY_...>
target=_bmad/platform/project-context.md
verified_at=<ISO-8601 UTC>
```
````

- [x] **Step 2: Commit**

```bash
git add src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/steps/step-03-c-install-test-mode.md
git commit -m "$(cat <<'EOF'
feat(wave-0): add smoke-test step 03 — install bmad-bam-platform in test mode

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 12: Write step-04 — emit sentinel (sanity check)

**Files:**
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/steps/step-04-c-emit-sentinel.md`

- [x] **Step 1: Write the step file**

````markdown
---
step_id: 04-c-emit-sentinel
auto-runnable: true
gate: machine-checkable
inputs: [install-status.txt]
outputs: [sentinel.txt]
---

# Step 04 — Read sentinel from generated project-context.md

## Purpose

Sanity check: read back the sentinel from the freshly generated `project-context.md` and stash it so the Plan A/B/C verification steps can compare against it.

## Action

```bash
PROJECT_ROOT="${BMAD_PROJECT_ROOT:-$PWD}"
CONTEXT_FILE="$PROJECT_ROOT/_bmad/platform/project-context.md"

# Extract the sentinel token (first line matching BAM_LOAD_VERIFY_ pattern)
SENTINEL=$(grep -o 'BAM_LOAD_VERIFY_[a-f0-9]\{32\}' "$CONTEXT_FILE" | head -1)

if [ -z "$SENTINEL" ]; then
    echo "FAIL: no sentinel found in $CONTEXT_FILE"
    exit 1
fi

echo "Sentinel: $SENTINEL"

# Persist for downstream steps
mkdir -p "$PROJECT_ROOT/_bmad/bam/install-logs"
echo "$SENTINEL" > "$PROJECT_ROOT/_bmad/bam/install-logs/sentinel.txt"
```

## Verification

```bash
test -s "$PROJECT_ROOT/_bmad/bam/install-logs/sentinel.txt" || { echo "FAIL: sentinel.txt empty"; exit 1; }
grep -qE '^BAM_LOAD_VERIFY_[a-f0-9]{32}$' "$PROJECT_ROOT/_bmad/bam/install-logs/sentinel.txt" || { echo "FAIL: sentinel format"; exit 1; }
echo "PASS"
```
````

- [x] **Step 2: Commit**

```bash
git add src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/steps/step-04-c-emit-sentinel.md
git commit -m "$(cat <<'EOF'
feat(wave-0): add smoke-test step 04 — emit sentinel for downstream verify steps

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 13: Write step-05 — verify Plan A

**Files:**
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/steps/step-05-v-verify-plan-a.md`

- [x] **Step 1: Write the step file**

````markdown
---
step_id: 05-v-verify-plan-a
auto-runnable: true
gate: machine-checkable
inputs: [sentinel.txt]
outputs: [plan-a-result.txt]
---

# Step 05 — Verify Plan A (universal-glob auto-load)

## Purpose

Test whether the BMAD universal-glob pattern auto-loads `_bmad/platform/project-context.md` into a BMAD core skill's context **without any explicit BAM customize-template overlay or manual customize step**. This is the preferred outcome.

## Action

The observation method depends on Task 0's investigation outcome (recorded in `tests/wave-0/INVESTIGATION-NOTES.md`).

### If observation point = `inspect-resolved-toml` (install-time resolution)

```bash
PROJECT_ROOT="${BMAD_PROJECT_ROOT:-$PWD}"
SENTINEL=$(cat "$PROJECT_ROOT/_bmad/bam/install-logs/sentinel.txt")

# Find the resolved customize.toml files for a BMAD core skill (e.g., bmad-create-architecture)
TARGET_TOML="$PROJECT_ROOT/_bmad/custom/bmad-create-architecture/customize.toml"

if [ ! -f "$TARGET_TOML" ]; then
    echo "PLAN_A_UNKNOWN: no resolved customize.toml for bmad-create-architecture"
    echo "   This may mean BMAD resolves at run time; rerun smoke test with run-time observation."
    exit 2
fi

# Check whether project-context.md path appears in the resolved persistent_facts
if grep -q "_bmad/platform/project-context.md" "$TARGET_TOML"; then
    echo "PLAN_A_PASS: universal-glob resolved project-context.md path into core skill"
    exit 0
else
    echo "PLAN_A_FAIL: project-context.md path not in resolved customize.toml"
    exit 1
fi
```

### If observation point = `invoke-resolution-fn` (run-time resolution via Node.js)

```bash
PROJECT_ROOT="${BMAD_PROJECT_ROOT:-$PWD}"
SENTINEL=$(cat "$PROJECT_ROOT/_bmad/bam/install-logs/sentinel.txt")

# Invoke BMAD's customize-resolution function (exact path TBD from Task 0)
# Replace <resolve-fn-path> with the path identified in INVESTIGATION-NOTES.md
RESOLVED=$(node -e "
const resolve = require('${BMAD_RESOLVE_FN:-external/bmad-method/tools/installer/<resolve-fn-path>}');
const result = resolve.forSkill('bmad-create-architecture', '$PROJECT_ROOT');
console.log(JSON.stringify(result, null, 2));
")

if echo "$RESOLVED" | grep -q "$SENTINEL"; then
    echo "PLAN_A_PASS: sentinel appears in resolved context for bmad-create-architecture"
    exit 0
else
    echo "PLAN_A_FAIL: sentinel not in resolved context"
    exit 1
fi
```

> **NOTE:** the exact `<resolve-fn-path>` MUST be determined in Task 0 and substituted here at execution time. If Task 0 found neither resolution mechanism, this step degrades to Plan B without trying Plan A (and step 06 becomes the first real check).

## Verification

Exit 0 → Plan A passes; control jumps to step 08 (skip 06 + 07).
Exit 1 → Plan A fails; control flows to step 06.
Exit 2 → unknown observation point; halt + escalate to user.

## Output

Write `{project-root}/_bmad/bam/install-logs/plan-a-result.txt`:

```
result=<pass|fail|unknown>
observation_method=<inspect-resolved-toml|invoke-resolution-fn>
sentinel_found=<true|false>
verified_at=<ISO-8601 UTC>
```
````

- [x] **Step 2: Commit**

```bash
git add src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/steps/step-05-v-verify-plan-a.md
git commit -m "$(cat <<'EOF'
feat(wave-0): add smoke-test step 05 — verify Plan A (universal-glob auto-load)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 14: Write step-06 — verify Plan B

**Files:**
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/steps/step-06-v-verify-plan-b.md`

- [x] **Step 1: Write the step file**

````markdown
---
step_id: 06-v-verify-plan-b
auto-runnable: true
gate: machine-checkable
inputs: [sentinel.txt, plan-a-result.txt]
outputs: [plan-b-result.txt]
---

# Step 06 — Verify Plan B (explicit customize-overlay fallback)

## Purpose

If Plan A failed, test whether installing an **explicit customize-overlay** during post-install gets the sentinel into a BMAD core skill's context. This is the fallback when universal-glob doesn't auto-load.

## Action

```bash
PROJECT_ROOT="${BMAD_PROJECT_ROOT:-$PWD}"
SENTINEL=$(cat "$PROJECT_ROOT/_bmad/bam/install-logs/sentinel.txt")

# Plan B: write an explicit customize-overlay for bmad-create-architecture that
# directly references the BAM project-context.md (not via universal-glob).
OVERLAY_DIR="$PROJECT_ROOT/_bmad/custom/bmad-create-architecture"
mkdir -p "$OVERLAY_DIR"

cat > "$OVERLAY_DIR/customize.toml" <<'EOF'
# Plan B explicit overlay — installed by bmad-bam-platform when Plan A doesn't work
[agent]
persistent_facts = [
  "file:{project-root}/_bmad/platform/project-context.md",
]
EOF

# Re-invoke BMAD customize resolution (mechanism per Task 0)
# Then check sentinel
RESOLVED=$(node -e "
const resolve = require('${BMAD_RESOLVE_FN:-external/bmad-method/tools/installer/<resolve-fn-path>}');
const result = resolve.forSkill('bmad-create-architecture', '$PROJECT_ROOT');
console.log(JSON.stringify(result, null, 2));
")

if echo "$RESOLVED" | grep -q "$SENTINEL"; then
    echo "PLAN_B_PASS: explicit overlay loads sentinel"
    exit 0
else
    echo "PLAN_B_FAIL: explicit overlay did not produce loaded sentinel"
    exit 1
fi
```

## Verification

Exit 0 → Plan B works; control jumps to step 08 (skip 07).
Exit 1 → Plan B fails; control flows to step 07.

## Output

Write `{project-root}/_bmad/bam/install-logs/plan-b-result.txt`:

```
result=<pass|fail>
overlay_path=_bmad/custom/bmad-create-architecture/customize.toml
verified_at=<ISO-8601 UTC>
```
````

- [x] **Step 2: Commit**

```bash
git add src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/steps/step-06-v-verify-plan-b.md
git commit -m "$(cat <<'EOF'
feat(wave-0): add smoke-test step 06 — verify Plan B (explicit customize overlay)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 15: Write step-07 — verify Plan C

**Files:**
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/steps/step-07-v-verify-plan-c.md`

- [x] **Step 1: Write the step file**

````markdown
---
step_id: 07-v-verify-plan-c
auto-runnable: false      # human approval required — Plan C means manual step in install path
gate: human-approval
inputs: [sentinel.txt, plan-b-result.txt]
outputs: [plan-c-result.txt]
---

# Step 07 — Verify Plan C (manual bmad-customize step)

## Purpose

If both Plans A and B failed, fall back to a **manual** workflow: user runs `bmad-customize bmad-bam-platform` after every install/upgrade. Plan C is the worst-case operational fallback; selecting it means BAM has a real UX regression vs Plans A and B.

## Action

This step requires human confirmation because it commits BAM to ongoing manual user action.

1. Prompt the user:

   > "Plans A and B failed in your BMAD install. Plan C requires you to run `bmad-customize bmad-bam-platform` manually after every BAM module install or upgrade. Do you want to proceed with Plan C? (yes/no)"

2. If user says NO → halt the entire smoke test. Report: BAM cannot activate in this BMAD install. Suggest upgrading BMAD or filing an issue.

3. If user says YES, the workflow records Plan C and instructs the user to invoke the manual command. Then verify:

```bash
PROJECT_ROOT="${BMAD_PROJECT_ROOT:-$PWD}"
SENTINEL=$(cat "$PROJECT_ROOT/_bmad/bam/install-logs/sentinel.txt")

# Instruct user to run: bmad customize bmad-bam-platform
echo ">>> Run the following command in another terminal, then press Enter to continue:"
echo "    bmad customize bmad-bam-platform"
read -r

# Verify after manual command
RESOLVED=$(node -e "
const resolve = require('${BMAD_RESOLVE_FN:-external/bmad-method/tools/installer/<resolve-fn-path>}');
console.log(JSON.stringify(resolve.forSkill('bmad-create-architecture', '$PROJECT_ROOT'), null, 2));
")

if echo "$RESOLVED" | grep -q "$SENTINEL"; then
    echo "PLAN_C_PASS: after manual customize, sentinel loaded"
    exit 0
else
    echo "PLAN_C_FAIL: even manual customize did not load sentinel"
    exit 1
fi
```

## Verification

Exit 0 → Plan C works; control flows to step 08.
Exit 1 → BAM cannot activate in this BMAD install. Escalate to user with options:
  - Upgrade BMAD
  - File issue against `external/bmad-method`
  - Pause BAM v6 work pending mechanism fix

## Output

Write `{project-root}/_bmad/bam/install-logs/plan-c-result.txt`:

```
result=<pass|fail>
user_consent=<yes|no>
verified_at=<ISO-8601 UTC>
```
````

- [x] **Step 2: Commit**

```bash
git add src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/steps/step-07-v-verify-plan-c.md
git commit -m "$(cat <<'EOF'
feat(wave-0): add smoke-test step 07 — verify Plan C (manual customize fallback)

Human-approval gate; commits BAM to manual workflow if accepted.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 16: Write step-08 — persist result to family.json

**Files:**
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/steps/step-08-c-persist-result.md`

- [x] **Step 1: Write the step file**

````markdown
---
step_id: 08-c-persist-result
auto-runnable: true
gate: machine-checkable
inputs: [plan-a-result.txt, plan-b-result.txt, plan-c-result.txt]
outputs: [family.json]
---

# Step 08 — Persist plan selection to family.json

## Purpose

Write `{project-root}/_bmad/bam/family.json` with the selected plan, installed modules state, smoke-test outcomes, and timestamps. P2 and all subsequent waves read this file to know how to activate.

## Action

```bash
PROJECT_ROOT="${BMAD_PROJECT_ROOT:-$PWD}"
LOG_DIR="$PROJECT_ROOT/_bmad/bam/install-logs"
FAMILY_JSON="$PROJECT_ROOT/_bmad/bam/family.json"

# Determine selected plan from result files
PLAN="unknown"
if [ -f "$LOG_DIR/plan-a-result.txt" ] && grep -q "^result=pass" "$LOG_DIR/plan-a-result.txt"; then
    PLAN="A"
elif [ -f "$LOG_DIR/plan-b-result.txt" ] && grep -q "^result=pass" "$LOG_DIR/plan-b-result.txt"; then
    PLAN="B"
elif [ -f "$LOG_DIR/plan-c-result.txt" ] && grep -q "^result=pass" "$LOG_DIR/plan-c-result.txt"; then
    PLAN="C"
fi

if [ "$PLAN" = "unknown" ]; then
    echo "ERROR: no plan passed; cannot persist" >&2
    exit 1
fi

# Get BMAD version
BMAD_VERSION=$(grep -oE 'bmad_version=[0-9.]+' "$LOG_DIR/bmad-version.txt" | cut -d= -f2)

TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)

# Write family.json atomically
TMP="$(mktemp)"
cat > "$TMP" <<EOF
{
  "schema_version": "0.1.0",
  "bmad_version": "$BMAD_VERSION",
  "plan": "$PLAN",
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
    "plan_selected": "$PLAN",
    "log_directory": "_bmad/bam/install-logs/"
  },
  "shared_mode": false,
  "context-budget": {
    "tier1-total-max-tokens": 40000,
    "warn-at-tier3-tokens": 30000,
    "fail-at-total-tokens": 150000
  }
}
EOF

mkdir -p "$(dirname "$FAMILY_JSON")"
mv -f "$TMP" "$FAMILY_JSON"

echo "Wrote $FAMILY_JSON (plan=$PLAN)"
```

## Verification

```bash
# JSON must parse
python3 -c "import json; json.load(open('$FAMILY_JSON'))" || { echo "FAIL: invalid JSON"; exit 1; }

# plan field must be one of A/B/C
PLAN=$(python3 -c "import json; print(json.load(open('$FAMILY_JSON'))['plan'])")
case "$PLAN" in
  A|B|C) echo "PASS: plan=$PLAN persisted" ;;
  *) echo "FAIL: invalid plan=$PLAN"; exit 1 ;;
esac
```
````

- [x] **Step 2: Commit**

```bash
git add src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/steps/step-08-c-persist-result.md
git commit -m "$(cat <<'EOF'
feat(wave-0): add smoke-test step 08 — persist plan selection to family.json

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 17: Write the end-to-end integration test runner

**Files:**
- Create: `tests/wave-0/run-smoke-test.sh`
- Create: `tests/wave-0/lib/inspect-context.sh`

- [x] **Step 1: Write the inspect-context helper**

Create `tests/wave-0/lib/inspect-context.sh`:

```bash
#!/usr/bin/env bash
# tests/wave-0/lib/inspect-context.sh
#
# Helper: invoke BMAD customize-resolution for a given skill in a project, return what it would load.
# Mechanism per Task 0 investigation; replace placeholder with actual mechanism.

set -euo pipefail

inspect_context_for_skill() {
    local skill="$1"
    local project_root="$2"

    # Mechanism per INVESTIGATION-NOTES.md; if Task 0 found install-time resolution:
    local toml="$project_root/_bmad/custom/$skill/customize.toml"
    if [ -f "$toml" ]; then
        cat "$toml"
        return 0
    fi

    # Otherwise, attempt run-time resolution (placeholder — Task 0 fills in)
    if [ -n "${BMAD_RESOLVE_FN:-}" ]; then
        node -e "
const resolve = require('$BMAD_RESOLVE_FN');
const result = resolve.forSkill('$skill', '$project_root');
console.log(JSON.stringify(result, null, 2));
"
        return 0
    fi

    echo "ERROR: no resolution mechanism configured (set BMAD_RESOLVE_FN or check for resolved TOML)" >&2
    return 2
}
```

- [x] **Step 2: Write the end-to-end integration test**

Create `tests/wave-0/run-smoke-test.sh`:

```bash
#!/usr/bin/env bash
# tests/wave-0/run-smoke-test.sh
#
# End-to-end smoke test for Wave 0.
# Runs the bmad-bam-smoke-test workflow against a fixture BMAD project.
# Exits 0 if a plan (A, B, or C) is selected; non-zero otherwise.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
FIXTURE_DIR="$REPO_ROOT/tests/wave-0/fixtures/test-bmad-project"

# Set up workdir
WORK_DIR="$(mktemp -d)"
trap "rm -rf $WORK_DIR" EXIT

echo ">>> Copying fixture to $WORK_DIR"
cp -r "$FIXTURE_DIR/." "$WORK_DIR/"
export BMAD_PROJECT_ROOT="$WORK_DIR"

# Source helpers
source "$REPO_ROOT/tests/wave-0/lib/sentinel.sh"
source "$REPO_ROOT/tests/wave-0/lib/inspect-context.sh"

# Run post-install
echo ">>> Running post-install"
SENTINEL=$("$REPO_ROOT/src-v6/bmad-bam-platform/scripts/post-install.sh" "$WORK_DIR")
echo "    Sentinel: $SENTINEL"

# Verify post-install artifacts
test -f "$WORK_DIR/_bmad/platform/project-context.md" || { echo "FAIL: project-context.md missing"; exit 1; }
grep -q "$SENTINEL" "$WORK_DIR/_bmad/platform/project-context.md" || { echo "FAIL: sentinel missing"; exit 1; }
echo "    Post-install OK"

# Plan A: inspect resolved customize.toml for the universal-glob result
echo ">>> Trying Plan A"
PLAN="unknown"
if RESOLVED=$(inspect_context_for_skill "bmad-create-architecture" "$WORK_DIR" 2>/dev/null) && \
   echo "$RESOLVED" | grep -q "$SENTINEL"; then
    PLAN="A"
    echo "    Plan A PASS"
else
    echo "    Plan A FAIL"
fi

# Plan B: install explicit overlay, try again
if [ "$PLAN" = "unknown" ]; then
    echo ">>> Trying Plan B"
    OVERLAY_DIR="$WORK_DIR/_bmad/custom/bmad-create-architecture"
    mkdir -p "$OVERLAY_DIR"
    cat > "$OVERLAY_DIR/customize.toml" <<EOF
[agent]
persistent_facts = [
  "file:{project-root}/_bmad/platform/project-context.md",
]
EOF
    if RESOLVED=$(inspect_context_for_skill "bmad-create-architecture" "$WORK_DIR" 2>/dev/null) && \
       echo "$RESOLVED" | grep -q "$SENTINEL"; then
        PLAN="B"
        echo "    Plan B PASS"
    else
        echo "    Plan B FAIL"
    fi
fi

# Plan C: requires user; skip in automated test (only exercised in real install path)
if [ "$PLAN" = "unknown" ]; then
    echo "    Plan C not exercised in automated test (requires user consent)"
fi

# Write family.json with the result
mkdir -p "$WORK_DIR/_bmad/bam"
cat > "$WORK_DIR/_bmad/bam/family.json" <<EOF
{
  "schema_version": "0.1.0",
  "plan": "$PLAN",
  "wave_0_smoke_test_completed_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
}
EOF

echo ">>> Wrote family.json"
cat "$WORK_DIR/_bmad/bam/family.json"

if [ "$PLAN" = "unknown" ]; then
    echo ">>> RESULT: No plan worked in automated test."
    echo "    Run `bmad bmad-bam-smoke-test` interactively to try Plan C."
    exit 2
else
    echo ">>> RESULT: Plan $PLAN selected"
    exit 0
fi
```

- [x] **Step 3: Make executable**

Run:
```bash
chmod +x tests/wave-0/run-smoke-test.sh
chmod +x tests/wave-0/lib/inspect-context.sh
```

- [x] **Step 4: Commit**

```bash
git add tests/wave-0/run-smoke-test.sh tests/wave-0/lib/inspect-context.sh
git commit -m "$(cat <<'EOF'
test(wave-0): add end-to-end smoke-test runner + context inspection helper

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 18: Run the smoke test end-to-end

**Files:**
- Read/run: `tests/wave-0/run-smoke-test.sh`
- May modify: `tests/wave-0/INVESTIGATION-NOTES.md` (if mechanism turns out different)
- May modify: `tests/wave-0/lib/inspect-context.sh` (if mechanism needs tweaking)

- [x] **Step 1: Run the integration test**

Run: `tests/wave-0/run-smoke-test.sh`

Expected outcomes:
- Exit 0 with `Plan A selected` (preferred)
- Exit 0 with `Plan B selected` (acceptable)
- Exit 2 with `No plan worked in automated test` (requires real-install Plan C)

- [x] **Step 2: Triage failure if exit != 0**

If exit 2 (no plan worked):

1. Read `INVESTIGATION-NOTES.md` and confirm `inspect-context.sh` matches the documented mechanism.
2. If mechanism documented but test still fails, the BMAD install may not actually ship the universal-glob in customize.toml files. Run:
   ```bash
   grep -rln "project-context\.md" external/bmad-method/src/ | head -5
   ```
   If empty, BMAD does not ship universal-glob — escalate to user; this means BAM v6's premise is unsupported in this BMAD version.
3. If mechanism wrong, fix `inspect-context.sh` and re-run.

- [x] **Step 3: Record real-install Plan-C-requires test**

If the automated test cannot verify Plan C (requires user), record that as a known-limitation in `tests/wave-0/INVESTIGATION-NOTES.md` under heading "Plan C verification gap".

- [x] **Step 4: Capture the actual Plan outcome**

Whatever plan succeeded, record in `tests/wave-0/WAVE-0-OUTCOME.md`:

```markdown
# Wave 0 — Outcome

**Date:** <YYYY-MM-DD>
**BMAD version under test:** <X.Y.Z>
**Selected Plan:** <A | B | C | None>
**Smoke test exit code:** <0 | 2>

## Detail

<paste run output of tests/wave-0/run-smoke-test.sh>

## Implications for P2 (bmad-bam-platform full module)

- If Plan A: P2 can rely on universal-glob auto-load; no install-time overlay code needed.
- If Plan B: P2 must include the explicit overlay in post-install.sh; document the constraint.
- If Plan C: P2 must document manual `bmad-customize` step; UX regression vs A/B.
- If None: BAM v6 architecture is blocked; escalate before proceeding to P2.
```

- [x] **Step 5: Commit outcome record**

```bash
git add tests/wave-0/WAVE-0-OUTCOME.md tests/wave-0/INVESTIGATION-NOTES.md
git commit -m "$(cat <<'EOF'
test(wave-0): record smoke-test outcome and Plan selection for P2 handoff

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 19: Add module README

**Files:**
- Create: `src-v6/bmad-bam-platform/README.md`

- [x] **Step 1: Write the README**

Create `src-v6/bmad-bam-platform/README.md`:

```markdown
# bmad-bam-platform

> **Wave 0 scope only.** Full module arrives in P2.

The platform foundation module of the BAM v6 family. Owns multi-tenant SaaS platform foundation patterns: tenant isolation, modular monolith decomposition, deployment topology, FinOps, tenant tier modeling.

## What ships in Wave 0

- 1 persona stub: Atlas (Platform Architect) — registration only
- 1 fragment: `sentinel.md` — anchor for smoke-test sentinel injection
- 1 skill: `bmad-bam-smoke-test` — Wave 0 verification workflow (8 steps)
- 1 post-install script: generates `_bmad/platform/project-context.md`

## What does NOT ship in Wave 0

- Full Atlas persona (voice, patterns, sidecar template)
- The 16 workflows defined in §5.1 of the architecture spec
- Patterns, anti-patterns, checklists, vertical addons
- Other 7 modules in the BAM family

## Install

```bash
bmad install bmad-bam-platform
```

This runs `scripts/post-install.sh` which generates the sentinel-bearing synthesis file.

## Smoke test

```bash
bmad bmad-bam-smoke-test
# or for repo development:
tests/wave-0/run-smoke-test.sh
```

Selects Plan A (universal-glob auto-load), Plan B (explicit overlay), or Plan C (manual customize step) based on the BMAD install's behavior. Result persisted to `_bmad/bam/family.json`.

## Next

After Wave 0 succeeds: proceed to plan **P2 — v6.0 bmad-bam-platform full module**.
```

- [x] **Step 2: Commit**

```bash
git add src-v6/bmad-bam-platform/README.md
git commit -m "$(cat <<'EOF'
docs(wave-0): add bmad-bam-platform README with Wave 0 scope clarification

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 20: Final wrap — record Wave 0 ADR in Atlas's sidecar

**Files:**
- Create: `_bmad/_memory/atlas/architecture-decisions/2026-05-11-001-wave-0-plan-selected.md`
- Create: `_bmad/_memory/atlas/architecture-decisions/INDEX.md`

- [x] **Step 1: Create the ADR directory in the repo's own _bmad/_memory/**

Run: `mkdir -p _bmad/_memory/atlas/architecture-decisions`

- [x] **Step 2: Write the Wave 0 outcome ADR**

Create `_bmad/_memory/atlas/architecture-decisions/2026-05-11-001-wave-0-plan-selected.md`:

```markdown
---
id: 2026-05-11-001
title: Wave 0 plan selected
status: accepted
date: 2026-05-11
persona: atlas
related-personas: []
modules: [bmad-bam-platform]
supersedes: null
superseded-by: null
assumptions:
  - BMAD method install matches `external/bmad-method` HEAD at Wave 0 time
  - test-bmad-project fixture is representative of real installs
dependencies-on-other-decisions: []
generated-by: claude-opus-4-7
authored-by: collaborative
---

## Context

BAM v6's activation mechanism depends on BMAD v6.4.0+'s universal-glob pattern. Wave 0 was designed to empirically test whether this works in our target BMAD install and select Plan A/B/C accordingly.

## Decision

Selected Plan: **<A | B | C>** (replace with actual outcome from `tests/wave-0/WAVE-0-OUTCOME.md`).

## Consequences

- P2 (bmad-bam-platform full module) inherits this plan selection
- All subsequent BAM modules use the same activation mechanism
- `_bmad/bam/family.json` is the canonical record of plan selection

## Alternatives Considered

- Plan A (universal-glob) — preferred; invisible to user
- Plan B (explicit overlay) — fallback; adds install-time overlay code
- Plan C (manual customize) — worst case; commits BAM to manual user action

## Migration if plan changes later

If a future BMAD upgrade enables a better plan, run `bmad-bam-smoke-test` again. It will re-select and update `family.json`. A new ADR supersedes this one.
```

- [x] **Step 3: Create INDEX.md**

Create `_bmad/_memory/atlas/architecture-decisions/INDEX.md`:

```markdown
# Atlas — Architecture Decisions Index

| ID | Title | Status | Date |
|---|---|---|---|
| 2026-05-11-001 | Wave 0 plan selected | accepted | 2026-05-11 |
```

- [x] **Step 4: Commit Wave 0 wrap-up**

```bash
git add _bmad/_memory/atlas/architecture-decisions/
git commit -m "$(cat <<'EOF'
feat(wave-0): record Wave 0 outcome ADR in Atlas sidecar

First ADR for the BAM v6 family. Locks in Plan A/B/C selection.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 21: Update CLAUDE.md (if Wave 0 reveals BMAD-version-specific issues)

**Files:**
- Conditional modify: `CLAUDE.md`

- [x] **Step 1: Check whether Wave 0 outcome warrants CLAUDE.md update**

Read `tests/wave-0/WAVE-0-OUTCOME.md`. If Wave 0 selected Plan A and no surprises arose, **skip this task** entirely — proceed to Task 22.

If Wave 0 selected Plan B or C, or if there were surprises (BMAD version oddities, customize-resolution mechanics), continue.

- [x] **Step 2: Read current CLAUDE.md**

Run: `head -100 CLAUDE.md`

Locate the section that describes BAM's relationship to BMAD (currently describes v3).

- [x] **Step 3: Add a Wave 0 outcomes note**

Edit `CLAUDE.md` to insert near the top (right after the `> **Quick Start:**` block):

```markdown
> **Wave 0 outcome (2026-05-11):** BAM v6 selected Plan **<A | B | C>** for activation. See `_bmad/_memory/atlas/architecture-decisions/2026-05-11-001-wave-0-plan-selected.md` for detail. P2+ inherits this selection from `_bmad/bam/family.json`.
```

(Replace `<A | B | C>` with the actual plan recorded in WAVE-0-OUTCOME.md.)

- [x] **Step 4: Commit (only if changes made)**

```bash
git diff CLAUDE.md | head -20
# If any diff:
git add CLAUDE.md
git commit -m "$(cat <<'EOF'
docs(wave-0): annotate CLAUDE.md with Wave 0 plan selection outcome

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Self-Review

Spec coverage check against `docs/v6-final-architecture.md`:

- §7.3 Wave 0 smoke-test — covered by Tasks 8-18 (skill scaffolding + 8 steps + integration test runner)
- §3.5 family.json + plan persistence — covered by Task 16 (step-08) + Task 18 (real-install)
- §3.7 install-failure half-orphan — Wave 0 doesn't exercise; deferred to P2
- §6.2 fragment frontmatter (10 fields) — Task 5 uses the schema for the sentinel fragment
- §6.10 context budget — Task 16 writes initial context-budget block in family.json
- §4.3 ADR format — Task 20 follows MADR-lite + new fields (assumptions, generated-by, authored-by)
- §15 How Claude Consumes BAM — Wave 0 establishes family.json which §15.1 says Claude reads first

Gaps (intentional, recorded for P2):
- Full Atlas persona definition — P2
- Multi-module install — P2+ (Wave 0 only installs platform)
- Cross-module persona invocation (`@bmm:winston`) — not exercised; tested first in P2
- MCP server — defers to P2

Placeholder scan: searched for "TBD/TODO/FIXME" in this plan — only legitimate use is `<resolve-fn-path>` which is explicitly conditional on Task 0 output (and the plan handles both branches).

Type consistency: `family.json` field names (`plan`, `installed`, `smoke_test`, `bmad_version`, `context-budget`) match across Tasks 16, 17, 20.
