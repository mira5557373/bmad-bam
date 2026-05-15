# bmad-bam-smoke-test — Workflow Router

Wave 0 only ships **Create mode**. Edit and Validate modes arrive in P2 if smoke-test becomes recurring.

## Create mode (Wave 0 default)

Sequential execution; halt on first failure unless step says otherwise.

1. `steps/step-01-c-verify-bmad-version.md` — confirm BMAD >= 6.4.0
2. `steps/step-02-c-detect-universal-glob.md` — confirm universal-glob present in BMAD customize.toml files
3. `steps/step-03-c-install-test-mode.md` — install bmad-bam-platform in test mode
4. `steps/step-04-c-emit-sentinel.md` — confirm post-install generated project-context.md with sentinel token
5. `steps/step-05-v-verify-plan-a.md` — try Plan A; if passes, jump to step 8
6. `steps/step-06-v-verify-plan-b.md` — try Plan B; if passes, jump to step 8
7. `steps/step-07-v-verify-plan-c.md` — try Plan C; if passes, continue
8. `steps/step-08-c-persist-result.md` — write `family.json` + log

If step 5 passes → final plan = A. If step 6 passes → B. If step 7 passes → C. If step 7 fails → escalate to user (BAM cannot activate).
