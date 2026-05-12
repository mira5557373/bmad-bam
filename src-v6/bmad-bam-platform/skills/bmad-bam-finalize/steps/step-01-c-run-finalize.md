---
step_id: 01-c-run-finalize
auto-runnable: true
gate: machine-checkable
inputs: [_bmad/config.toml]
outputs: [_bmad/bam-activation/platform/project-context.md, _bmad/bam/install-logs/platform-install.log, _bmad/_memory/atlas/architecture-decisions/INDEX.md]
---

# Step 01 — Run the platform finalize script

## Purpose

Generate (or refresh) `{project-root}/_bmad/bam-activation/platform/project-context.md` — the
universal-glob sentinel that opts the host project into BAM v6's Plan A
activation contract (Wave 0, ratified 2026-05-12).

This step is a thin wrapper around `scripts/post-install.sh`. The script does
the real work (sentinel generation, atomic write, install log append, Python
3.11+ pre-flight). This step's job is to invoke it with the correct
`{project-root}` argument and verify the resulting file exists.

## Action

1. **Resolve `{project-root}`.** When this skill runs in an installed BMAD
   project, the LLM's working directory is the host project root. Confirm by
   checking that `_bmad/config.toml` exists relative to CWD:

   ```bash
   PROJECT_ROOT="$(pwd)"
   if [ ! -f "$PROJECT_ROOT/_bmad/config.toml" ]; then
       echo "ERROR: CWD '$PROJECT_ROOT' is not a BMAD project (missing _bmad/config.toml)." >&2
       echo "       Run this skill from your project's root directory." >&2
       exit 66
   fi
   ```

   If `_bmad/config.toml` is missing, halt and tell the user to `cd` into their
   BMAD project root and re-invoke.

2. **Locate `scripts/post-install.sh`.** It ships alongside this skill in the
   installed `bmad-bam-platform` module:

   ```bash
   SCRIPT="$PROJECT_ROOT/_bmad/bam-platform/scripts/post-install.sh"
   if [ ! -x "$SCRIPT" ]; then
       # Source-tree fallback for development checkouts:
       SCRIPT="$PROJECT_ROOT/src-v6/bmad-bam-platform/scripts/post-install.sh"
   fi
   if [ ! -x "$SCRIPT" ]; then
       echo "ERROR: post-install.sh not found or not executable." >&2
       echo "       Expected: _bmad/bam-platform/scripts/post-install.sh (installed)" >&2
       echo "       Or:       src-v6/bmad-bam-platform/scripts/post-install.sh (dev checkout)" >&2
       exit 73
   fi
   ```

3. **Invoke the script.** Pass `$PROJECT_ROOT` as the single argument; capture
   its sentinel-token output on stdout:

   ```bash
   SENTINEL="$("$SCRIPT" "$PROJECT_ROOT")"
   echo "Wrote sentinel: $SENTINEL"
   ```

   The script handles: directory creation, sentinel UUID generation, atomic
   write via `mv`, install-log append, and Python 3.11+ pre-flight. Do not
   re-implement any of that here.

4. **Seed Atlas's sidecar memory directories (idempotent).** Downstream BAM
   workflows (e.g., `bmad-bam-design-tenancy-model` step-06) append ADRs to
   `_bmad/_memory/atlas/architecture-decisions/INDEX.md`. In a fresh project
   that directory and index don't exist yet — append-only semantics on a
   missing file are undefined. Create them with the canonical header if absent:

   ```bash
   ADR_DIR="$PROJECT_ROOT/_bmad/_memory/atlas/architecture-decisions"
   INDEX="$ADR_DIR/INDEX.md"
   mkdir -p "$ADR_DIR"
   if [ ! -f "$INDEX" ]; then
       cat > "$INDEX" <<'INDEX_EOF'
   # Atlas — Architecture Decisions Index

   | ID | Title | Status | Date |
   |---|---|---|---|
   INDEX_EOF
       echo "Seeded $INDEX (empty index with header)"
   fi
   ```

   The `_bmad/_memory/atlas/` namespace lives outside BMAD's install target
   (`_bmad/bam-platform/`), so it survives re-installs. Existing ADRs are
   never overwritten — only the header gets written, and only if INDEX.md
   is absent. Safe to re-run.

## Verification (machine-checkable)

After the invocation, all three output paths must exist:

```bash
test -f "$PROJECT_ROOT/_bmad/bam-activation/platform/project-context.md" \
    || { echo "FAIL: project-context.md not created" >&2; exit 1; }

test -s "$PROJECT_ROOT/_bmad/bam/install-logs/platform-install.log" \
    || { echo "FAIL: install log not appended" >&2; exit 1; }

test -f "$PROJECT_ROOT/_bmad/_memory/atlas/architecture-decisions/INDEX.md" \
    || { echo "FAIL: Atlas ADR INDEX.md not seeded" >&2; exit 1; }

# Sentinel token round-trip: the value the script printed on stdout must
# appear inside the generated file.
grep -qF "$SENTINEL" "$PROJECT_ROOT/_bmad/bam-activation/platform/project-context.md" \
    || { echo "FAIL: sentinel token not found in generated file" >&2; exit 1; }

echo "OK: BAM v6 platform activation finalized."
```

Exit 0 → success; report the sentinel and the file path to the user.
Exit non-zero → surface `post-install.sh`'s stderr verbatim and halt.

## Idempotence

Re-running this step is safe:
- `post-install.sh` writes via `mv` (atomic replace), so a previous sentinel
  is overwritten with a fresh one.
- The install log is append-only — each finalize run leaves an audit trail.
- The Atlas ADR INDEX.md is created only if absent; pre-existing ADRs are
  never overwritten.
