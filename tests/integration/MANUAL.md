# Tier-2 manual real-install procedure

Use this when you want to verify `bmad install bmad-bam-platform` against your local changes before merging. Required: `bmad` CLI on PATH, BMAD 6.6.0+ installed.

## Why this is manual

Tier-2 PASS-mode is automatically deferred (`run-real-install.sh` always exits 77 SKIP) for the reasons documented in ADR 007:

1. BAM's marketplace layout currently resolves via PluginResolver **Strategy 5** (synthesized fallback) — partial validation only.
2. Hard dependency on `bmad` CLI for every dev/CI machine.
3. CI scaffolding for ephemeral test-project tmpdir not yet built.

The procedure below works for manual ad-hoc verification by a contributor who has `bmad` installed locally.

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
- Resolves the 4 listed skills via PluginResolver. For BAM's current layout, this falls into **Strategy 5** (synthesized fallback). The synthesized `module.yaml` lives only in `CustomModuleManager._resolutionCache` (in-memory) — it is NEVER written to disk. A `module-help.csv` IS synthesized from each skill's SKILL.md frontmatter and written to the installed module root.
- Copies the 4 skill directories into `$WORK_DIR/_bmad/bmad-bam-platform/<skill-name>/`.
- Writes the project manifest tracking your local source path.

Expected output: install succeeds; no errors about missing skills or path traversal.

### 4. Verify skill content landed

```bash
ls "$WORK_DIR/_bmad/bmad-bam-platform/" | sort
# Expect:
#   bmad-bam-agent-atlas/
#   bmad-bam-design-tenancy-model/
#   bmad-bam-finalize/
#   bmad-bam-smoke-test/
#   module-help.csv
```

If any expected directory is missing, the install pipeline failed — `marketplace.json` or skill paths drifted (the class of bug PR #2 originally shipped).

### 5. Run finalize (Path B activation)

```bash
cd "$WORK_DIR"
bmad run bmad-bam-finalize
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
- Any anomalies (especially around Strategy-5 synthesized module.yaml — see Concern 5 backlog)

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

Because BAM currently resolves via Strategy 5 (synthesized fallback):

- The real `src-v6/bmad-bam-platform/module.yaml` is NOT installed (NOT replaced with a stub — there is no `module.yaml` at all in `$WORK_DIR/_bmad/bmad-bam-platform/`). Its `agents:` block, `directories:`, `x-bam-*` extensions, and `post-install-notes` are silently inert post-install.
- Skill content + `marketplace.json` correctness ARE validated. The Path B (manual finalize) activation chain works because `bmad run` walks installed skill dirs by SKILL.md, not module.yaml.
- For full module.yaml validation, Concern 5 must land first (layout fix → Strategy 1 succeeds), after which this procedure exercises the full install.

## Future state

When Concern 5 (marketplace layout fix) + CI infrastructure land, `tests/integration/run-real-install.sh` upgrades from SKIP to a real script that automates this exact procedure inside `$(mktemp -d)`.
