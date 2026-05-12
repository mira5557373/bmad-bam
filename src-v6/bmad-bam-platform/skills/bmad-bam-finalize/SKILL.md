---
name: bmad-bam-finalize
description: "One-shot activation finalizer for the BAM v6 platform module. Generates _bmad/platform/project-context.md (the universal-glob sentinel). Run once after `bmad install bmad-bam-platform`."
---

# bmad-bam-finalize

## Purpose

BMAD's installer copies a module's skill directories into `{project-root}/_bmad/<module>/`
but provides no native code-execution hook on the host project. BAM v6 needs one extra
write — `_bmad/platform/project-context.md` — to opt the host project into the
universal-glob activation contract (Plan A, ratified Wave 0).

This skill is the BAM v6 activation **finalizer**. It invokes the module's
`scripts/post-install.sh` against the host project root so the sentinel file lands
where BMAD's core skills will auto-load it.

## When to use

- Immediately after `bmad install bmad-bam-platform` (BMAD's installer will prompt
  you to run this via `post-install-notes`).
- Whenever `{project-root}/_bmad/platform/project-context.md` is missing.
- Whenever the BAM platform module is upgraded (re-running refreshes the sentinel
  and the install log; safe and idempotent).

## Output

- Writes (or refreshes) `{project-root}/_bmad/platform/project-context.md`.
- Appends a line to `{project-root}/_bmad/bam/install-logs/platform-install.log`.

## Idempotence

`scripts/post-install.sh` writes the sentinel atomically via `mv`. Re-running
replaces the previous sentinel with a fresh one — no corruption, no stacking, no
manual cleanup required.

## Steps

See `workflow.md` for the mode router and `steps/` for the individual step file.
