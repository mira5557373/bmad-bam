# bmad-bam-finalize — Workflow Router

MVP ships **Create mode only**. There is no Edit mode (the artifact is regenerated, not patched) and Validate mode is folded into the single Create step (verify-after-write).

## Create mode (default)

Single step; halt on failure.

1. `steps/step-01-c-run-finalize.md` — invoke `scripts/post-install.sh "$PROJECT_ROOT"` and verify the sentinel file exists.

If the step fails, report the script's stderr verbatim and exit. Do not retry; do not paper over the error.
