---
step_id: 01-c-verify-bmad-version
auto_runnable: true
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
