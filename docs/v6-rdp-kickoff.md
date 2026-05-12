# V6 RDP Kickoff Prompt

This file is for the **human operator** (you) to paste into a fresh Claude Code session on the RDP machine when starting (or resuming) Wave 0 work.

---

## Pre-flight checklist (run once before first RDP session)

- [ ] RDP machine has SSH key configured with push access to this remote
- [ ] Run `ssh -T github.com-mira5557373` from RDP — should authenticate as `mira5557373`
- [ ] Branch `feat/v6-wave-0-rdp` pulled on RDP machine
- [ ] `external/bmad-method/` submodule checked out (needed for Task 0 investigation)
- [ ] Working directory on RDP is the repo root (`/mnt/b/2026/Aprial/bmad-bam` or equivalent)

---

## Kickoff prompt — copy/paste exactly

```
I'm continuing work on BAM v6 — a private BMAD module family.

Architecture spec (LOCKED at v0.4, do NOT re-brainstorm):
  docs/v6-final-architecture.md

Wave 0 implementation plan (this is what you execute):
  docs/superpowers/plans/2026-05-11-wave-0-smoke-test.md

Approach: use the superpowers:subagent-driven-development skill to dispatch a
fresh subagent per task. Review between tasks. 22 tasks total. Wave 0 is the
foundational smoke test for the entire v6 family.

Critical context:
- CLAUDE.md describes v3 (prior version, still installed at src-v2/). v6 lives
  in src-v6/. Don't follow v3 conventions when building v6 — follow the spec.
- The spec is LOCKED per §0.1 exit criteria. If you find ambiguity, surface it
  to me — don't decide unilaterally or fall back to brainstorming.
- Wave 0's deliverable: select Plan A/B/C for BAM activation. This outcome
  gates all subsequent waves.
- Commit after every task per the plan's commit steps.
- Use git worktrees (superpowers:using-git-worktrees) if helpful for isolation.

Start by invoking the subagent-driven-development skill, then begin with
Task 0 (BMAD customize-resolution investigation).

When all 22 tasks complete:
1. Push the branch
2. Open a PR targeting feat/bam-v3-pure-kb (NOT main)
3. PR title: "feat(v6): Wave 0 smoke test — selects Plan {A|B|C}"
4. PR body: summary of plan selection + tests/wave-0/WAVE-0-OUTCOME.md contents
```

---

## Mid-session resume prompt (if you have to restart Claude on RDP partway through)

```
Continuing BAM v6 Wave 0. See:
- docs/v6-final-architecture.md (spec; LOCKED)
- docs/superpowers/plans/2026-05-11-wave-0-smoke-test.md (plan)

Check the plan's task checkboxes to see what's already done. Resume from the
first unchecked task. Use superpowers:subagent-driven-development.
```

---

## What NOT to read on RDP

Don't waste context loading these — they were deliberately removed from the
`feat/v6-wave-0-rdp` branch precisely so RDP Claude wouldn't be misled:

- ~~Old v3 reports, audits, gap analyses at repo root~~ (removed)
- ~~Old v3 Diataxis docs in `docs/`~~ (removed)
- ~~Old v3 plans and specs in `docs/superpowers/`~~ (removed)
- ~~`docs/v6-information-package.md`, `docs/v6-rdp-implementation-guide.md`, `docs/HOW-TO-USE-V6-DOCS.md`~~ (brainstorming-era, superseded)

The only docs left in `docs/` are:
- `v6-final-architecture.md` (THE spec)
- `v6-rdp-kickoff.md` (this file)
- `superpowers/plans/2026-05-11-wave-0-smoke-test.md` (THE plan)

`src-v2/` is preserved because v3 is still installed and valid until v6.2
ships. Don't touch `src-v2/` during Wave 0. v6 lives in `src-v6/` (which Wave 0
creates).
