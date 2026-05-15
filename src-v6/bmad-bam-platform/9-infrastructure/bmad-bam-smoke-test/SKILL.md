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
