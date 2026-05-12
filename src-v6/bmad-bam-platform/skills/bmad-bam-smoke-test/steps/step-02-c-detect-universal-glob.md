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
