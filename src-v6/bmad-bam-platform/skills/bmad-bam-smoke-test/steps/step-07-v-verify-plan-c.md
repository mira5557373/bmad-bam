---
step_id: 07-v-verify-plan-c
auto-runnable: false      # human approval required — Plan C means manual step in install path
gate: human-approval
inputs: [sentinel.txt, plan-b-result.txt]
outputs: [plan-c-result.txt]
---

# Step 07 — Verify Plan C (manual LLM verification fallback)

## Purpose

If both Plans A and B failed in resolver-side checks, fall back to a **manual** end-to-end run: a live LLM (Claude Code, Cursor, etc.) is asked to recite the sentinel token. Success = the LLM echoes back the exact `BAM_LOAD_VERIFY_<uuid>` from `_bmad/platform/project-context.md`, proving it actually loaded the file at activation. Plan C is the worst-case operational fallback; selecting it means BAM has a real UX regression vs Plans A and B (the user is in the loop on every install).

## Mechanism (per Task 0 / INVESTIGATION-NOTES.md)

There is no BMAD `customize --show` or `debug` CLI subcommand in v6.6.0 (only `install`, `status`, `uninstall`). Headless verification of LLM-side `file:` expansion is impossible by spec. Plan C trades automation for end-to-end truth: it confirms the full chain by exercising it through a real agent.

## Action

This step requires human confirmation because it commits BAM to ongoing manual user action.

1. Prompt the user:

   > "Plans A and B failed resolver-side checks in your BMAD install. Plan C requires you to run an interactive LLM session (Claude Code, Cursor, or similar) after every BAM module install/upgrade and verify the sentinel echoes back. Do you want to proceed with Plan C? (yes/no)"

2. If user says NO → halt the entire smoke test. Report: BAM cannot activate in this BMAD install. Suggest upgrading BMAD or filing an issue against `external/bmad-method`.

3. If user says YES, perform the manual verification:

```bash
PROJECT_ROOT="${BMAD_PROJECT_ROOT:-$PWD}"
SENTINEL=$(cat "$PROJECT_ROOT/_bmad/bam/install-logs/sentinel.txt")

cat <<MANUAL_INSTRUCTIONS

>>> Manual Plan C verification — do this in a fresh agent session:
>>>   1. Open the host project in your IDE (Claude Code, Cursor, etc.) with BMAD configured.
>>>   2. Activate a BMAD core skill (e.g., 'bmad create architecture' or any skill that
>>>      lists 'file:{project-root}/**/project-context.md' in its agent.persistent_facts).
>>>   3. Ask the agent: "Please recite the BAM_LOAD_VERIFY token from your loaded context."
>>>   4. Expected response: $SENTINEL
>>>   5. Press Enter here once you've completed the manual check.

MANUAL_INSTRUCTIONS

read -r _

# 4. Ask the user to confirm what they observed
echo -n ">>> Did the agent recite the sentinel '$SENTINEL' exactly? (yes/no): "
read -r CONFIRMED

if [ "$CONFIRMED" = "yes" ]; then
    echo "PLAN_C_PASS: human-confirmed sentinel recitation"
    exit 0
else
    echo "PLAN_C_FAIL: human reported sentinel was not recited"
    exit 1
fi
```

## Verification

Exit 0 → Plan C works (with manual user action per install); control flows to step 08.
Exit 1 → BAM cannot activate in this BMAD install. Escalate to user with options:
  - Upgrade BMAD method to a newer version with stronger universal-glob support
  - File issue against `external/bmad-method` describing the v6.6.0 mechanism gap
  - Pause BAM v6 work pending mechanism fix

## Output

Write `{project-root}/_bmad/bam/install-logs/plan-c-result.txt`:

```
result=<pass|fail>
user_consent=<yes|no>
human_confirmed_sentinel=<yes|no>
verified_at=<ISO-8601 UTC>
```
