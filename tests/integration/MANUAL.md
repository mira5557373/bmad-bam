# Tier-2 real-install procedure (manual + automated)

## TL;DR — for most contributors

**Automated** (recommended): `BAM_TIER2=1 tests/integration/run-real-install.sh` runs the full procedure documented below via the submoduled `external/bmad-method/tools/installer/bmad-cli.js`. ~2-3 minutes from clean state. Promoted from SKIP-only stub on 2026-05-16 (ADR 010).

**Manual** (this document): walk through each step interactively. Useful when:
- You want to inspect intermediate state at each step
- You're debugging an automated Tier-2 failure
- You want to ratify Plan C (Tier-3 LLM-side) in the same session

## What's the same in both?

The script and this manual procedure do exactly the same thing — install BAM from a local checkout, verify Strategy-1 outcome, run finalize, check the sentinel. The script just automates each step + cleans up via `trap`.

## The empirical truth about local installs

BMAD v6.6.0 has `bmad install --custom-source <path>` which accepts a local checkout path (`custom-module-manager.js:99-110` parses `/`, `./`, `../`, `~` prefixes as local). For local sources, `resolveSource` sets `repoPath = null` and skips git clone/fetch entirely (`:326-329`). The `git reset --hard origin/HEAD` in `community-manager.js:292` is on the cache-clone path and is **never** triggered for local sources.

So a local install runs end-to-end. The catch: PluginResolver runs 5 strategies (`plugin-resolver.js`); BAM falls into Strategy 5 (synthesized `module.yaml` stub) because its real `module.yaml` lives one level above the common parent of all listed skills. The install still copies skill content correctly, but the real `module.yaml` is bypassed. This is the partial-validation caveat called out in ADR 007.

## Procedure — local-source install

### 1. Verify your branch is clean

```bash
git status              # working tree clean
git log -1              # the SHA you'll verify against
SHA="$(git rev-parse HEAD)"
echo "Verifying against: $SHA"
```

### 2. Create a clean test project in a tmpdir

```bash
WORK_DIR="$(mktemp -d)"
echo "Test project: $WORK_DIR"
```

### 3. Install BAM into the test project from your local checkout

```bash
REPO_ROOT="$(git rev-parse --show-toplevel)"
bmad install \
  --directory "$WORK_DIR" \
  --custom-source "$REPO_ROOT" \
  --modules bmad-bam-platform \
  --tools claude-code \
  --yes
```

What this does (per source-reading, BMAD v6.6.0):

- Reads `$REPO_ROOT/.claude-plugin/marketplace.json` directly (no clone, no cache).
- Resolves the 4 listed skills via PluginResolver. **Post-Concern-5** (ADR 008, PR #3 commit `7d17446`) BAM's marketplace layout succeeds at **Strategy 1**: the common parent of the 4 listed skills (phase-grouped under `1-foundation/`, `2-modules/`, `9-infrastructure/`) is the module dir itself, where the real `module.yaml` + `module-help.csv` both live. Strategy 1 reads the real `module.yaml`; `agents:`, `directories:`, `x-bam-*` extensions are no longer inert.
- Copies the 4 skill directories into `$WORK_DIR/_bmad/bbp/<skill-name>/` (flat — install path uses module code from module.yaml, which is `bbp` post-Concern-5).
- Writes the project manifest tracking your local source path.

Expected output: install succeeds; no errors about missing skills or path traversal.

### 4. Verify skill content landed

```bash
ls "$WORK_DIR/_bmad/bbp/" | sort
# Expect:
#   bmad-bam-agent-atlas/
#   bmad-bam-design-tenancy-model/
#   bmad-bam-finalize/
#   bmad-bam-smoke-test/
#   module-help.csv
```

(No `module.yaml` on disk — Strategy 1 reads it from source via the resolution cache; only `module-help.csv` lands on disk. See ADR 008 for the empirical chain.)

If any expected directory is missing, the install pipeline failed — `marketplace.json` or skill paths drifted (the class of bug PR #2 originally shipped).

### 5. Run finalize (Path B activation)

```bash
cd "$WORK_DIR"
bash "$WORK_DIR/.claude/skills/bmad-bam-finalize/scripts/post-install.sh" "$WORK_DIR"  # direct invocation; or `/bmad-bam-finalize` in a Claude Code session opened to $WORK_DIR
```

### 6. Verify the sentinel landed at the BMM-canonical location

```bash
OUTPUT_FOLDER="$(python3 -c "
import tomllib, sys
try:
    c = tomllib.load(open('_bmad/config.toml', 'rb'))
    v = c.get('bmad', {}).get('output_folder', '_bmad-output')
except Exception:
    v = '_bmad-output'
print(v.replace('{project-root}/', '').lstrip('/') or '_bmad-output')
")"

SENTINEL_FILE="$WORK_DIR/$OUTPUT_FOLDER/bbp/project-context.md"
ls "$SENTINEL_FILE"
grep -oE 'BAM_LOAD_VERIFY_[a-f0-9]{32}' "$SENTINEL_FILE"
```

Expected: file exists at `{output_folder}/bbp/project-context.md`, contains a 32-hex `BAM_LOAD_VERIFY` token.

### 7. Optional — exercise Tier-3 LLM-side probe

If you want to ratify Plan C in the same session:

```bash
# Open the WORK_DIR in your IDE (Claude Code / Cursor) with BMAD configured.
# Activate any BMAD core skill that has the universal-glob in its
# persistent_facts (e.g., bmad-create-architecture, bmad-create-prd).
# Ask the agent: "What sentinel token do you see in your loaded context?"
# Agent should recite the BAM_LOAD_VERIFY_<token> from step 6.
```

Record outcome in `tests/p2/PLAN-C-RATIFICATION.md`.

### 8. Record the outcome

Add a comment to the PR with:
- BMAD version (`bmad --version`)
- Local source SHA verified
- Sentinel token observed
- Plan C ratification result (if exercised)
- Any anomalies (e.g., Strategy-1 module.yaml parsing edge cases — Concern 5 has resolved Strategy-5 fallback per ADR 008)

### 9. Clean up

```bash
rm -rf "$WORK_DIR"
```

## When to run this

- Before merging an activation-touching PR (changes to `bmad-bam-finalize`, `post-install.sh`, `module.yaml`, or marketplace.json)
- Before tagging a release
- After a BMAD upgrade (verify the activation chain still works)
- Whenever Tier-1 surfaces a result you want to confirm against the real pipeline

## Limitations of this manual procedure

**Structural divergence between cp-sim tests and real `bmad install`:** the `tests/p2/run-real-install-test.sh` cp-simulator copies skill content into `_bmad/bbp/<skill-name>/` (its model of "Path B install"), but real BMAD installs skill content into the **tool-specific dir** — `.claude/skills/<skill-name>/` for claude-code, `.cursor/skills/<skill-name>/` for cursor, etc. `_bmad/<code>/` only holds the resolved `config.yaml` + `module-help.csv` after real install (verified empirically against bmad CLI v6.6.0). The cp-sim is approximate: it validates Strategy 1 module-level invariants (module.yaml + module-help.csv at common parent, sentinel writes correctly) but NOT the actual skill-content install LOCATION. The Plan C ratification (`tests/p2/PLAN-C-RATIFICATION.md`) is the gate for cross-tool-dir behavior; PR #6's Tier-2 PASS-mode promotion automates that.

Post-Concern-5 (ADR 008), BAM's marketplace layout succeeds at PluginResolver Strategy 1:

- The real `src-v6/bmad-bam-platform/module.yaml` IS honored at install time (read from source via resolution cache; not written to disk per BMAD's design — see `official-modules.js:145`). `agents:`, `directories:`, `x-bam-*` extensions, and `post-install-notes` are no longer inert.
- Skill content + `marketplace.json` correctness ARE validated. Path B (manual finalize) activation chain works.
- Tier-3 (Plan C LLM-side ratification) remains the gate for verifying that BMAD core skills actually load the sentinel at activation — see `tests/p2/PLAN-C-RATIFICATION.md`.

## Future state

When CI infrastructure for ephemeral tmpdir (`bmad install --directory <tmpdir>`) lands, `tests/integration/run-real-install.sh` upgrades from SKIP to a real script that automates this exact procedure inside `$(mktemp -d)`. PR #6 owns that promotion per ADR 007 trigger #1 (marked FIRED by Concern 5).
