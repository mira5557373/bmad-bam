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
