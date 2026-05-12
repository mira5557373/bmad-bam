# Plan C Ratification — P2.1

**Date:** <YYYY-MM-DD>
**BMAD version:** 6.6.0 (submoduled at external/bmad-method/)
**Activation path used:** B (manual finalize)
**Sentinel:** <token from test run>

## Manual probe procedure

(per `tests/p2/lib/probe-llm-context.sh`)

1. Ran `tests/p2/run-real-install-test.sh` (Path B, headless portion PASSed)
2. Retained WORK_DIR via `KEEP_WORKDIR=1`
3. Opened Claude Code session in `<WORK_DIR>`
4. Invoked `<skill>` (e.g., `/bmad bmad-create-architecture`)
5. Asked: "What sentinel token do you see in your loaded project context?"
6. Claude responded: `<paste response>`

## Outcome

- [ ] PASS: Claude returned the sentinel token (LLM-side activation verified)
- [ ] FAIL: Claude did NOT return the sentinel token (LLM-side activation broken)

## Implications

If PASS: §7 activation contract holds end-to-end. Path B is operational. P2.2+ can proceed with confidence.
If FAIL: escalate. Universal-glob string survives merge but LLM doesn't actually load files; mechanism redesign needed.
