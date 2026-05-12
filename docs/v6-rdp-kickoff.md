# V6 RDP Kickoff

This file is for the **human operator** (you) to paste into a fresh Claude Code session on the RDP machine when starting (or resuming) the active plan.

**How to use:**
- The "Active plan" section below points at whichever P-plan is currently being executed
- Updated each time a plan completes and the next one starts
- "Completed plans" history at the bottom for context

---

## Active plan

| Field | Value |
|---|---|
| **Plan** | P2.1 — `bmad-bam-platform` MVP |
| **Plan file** | `docs/superpowers/plans/2026-05-12-p2-1-platform-mvp.md` |
| **Base branch** | `feat/bam-v3-pure-kb` |
| **RDP branch** | `feat/v6-p2-1-platform-rdp` (already created) |
| **Estimated scope** | ~28 tasks, ~30-50h |
| **Goal** | Realize §7.6 activation Path A; promote Atlas to full persona; deliver `design-tenancy-model` end-to-end; ratify Plan C (LLM-side activation) |
| **PR target on completion** | `feat/bam-v3-pure-kb` |
| **Spec version in force** | v0.5 (`docs/v6-final-architecture.md`) |

---

## Pre-flight checklist (run once before first RDP session)

- [ ] RDP machine has SSH key configured with push access to remote
- [ ] `ssh -T github.com-mira5557373` from RDP authenticates as `mira5557373`
- [ ] Branch `feat/v6-p2-1-platform-rdp` checked out on RDP machine
- [ ] `external/bmad-method/` submodule initialized (`git submodule update --init --recursive`)
- [ ] Working directory on RDP is the repo root
- [ ] **For P2.1 specifically:** Node.js >= 18 and Python >= 3.11 installed (Task 1 needs npm; Task 0 onward needs Python 3.11+ for resolver)

---

## Kickoff prompt — copy/paste exactly

```
I'm continuing BAM v6 — implementing P2.1 (bmad-bam-platform MVP).

Architecture spec (LOCKED at v0.5, do NOT re-brainstorm):
  docs/v6-final-architecture.md

P2.1 implementation plan (this is what you execute):
  docs/superpowers/plans/2026-05-12-p2-1-platform-mvp.md

Predecessor context (already merged into base; reference only, don't re-do):
  tests/wave-0/WAVE-0-OUTCOME.md
  tests/wave-0/INVESTIGATION-NOTES.md
  _bmad/_memory/atlas/architecture-decisions/2026-05-11-001-wave-0-plan-selected.md

Approach: use the superpowers:subagent-driven-development skill to dispatch a
fresh subagent per task. Review between tasks. ~28 tasks total. P2.1 is the
MVP slice of the platform module — one usable workflow end-to-end.

Critical context:
- Spec is LOCKED at v0.5. v0.5 patched 3 defects revealed by Wave 0:
  (a) §3.4 module.yaml uses `x-bam-*` extensions (not `requires:`/`install:`/`hooks:`)
  (b) §7.1 BMAD splits skills across `[agent]` (6) and `[workflow]` (24) namespaces
  (c) §7.6 module activation requires npm postinstall (Path A — to be empirically verified in Task 0)
- Task 0 is investigation. If it reveals Path A doesn't work, branch to Path B
  per the plan's Task 1 branch-on-Task-0 note.
- Use git worktrees (superpowers:using-git-worktrees) if helpful for isolation.
- Commit after every task per the plan's commit steps.
- Plan checkbox discipline: mark `- [x]` as you finish each step (Wave 0 didn't
  do this; please do for P2.1).
- If you find spec ambiguity, surface it to me — don't decide unilaterally.

Start by invoking the subagent-driven-development skill, then begin with
Task 0 (investigate how `bmad install bmad-bam-<module>` triggers npm).

When all ~28 tasks complete:
1. Push the branch (feat/v6-p2-1-platform-rdp)
2. Open a PR targeting feat/bam-v3-pure-kb
3. PR title: "feat(v6): P2.1 — bmad-bam-platform MVP (activation + Atlas + design-tenancy-model)"
4. PR body: include
   - Task 0 outcome (Path A or B selected)
   - Plan C ratification status (PASS/FAIL)
   - Any plan divergences encountered
   - Reference to tests/p2/PLAN-C-RATIFICATION.md
```

---

## Mid-session resume prompt (if you restart Claude on RDP partway through)

```
Continuing BAM v6 P2.1. Same context as the kickoff prompt above. See:
- docs/v6-final-architecture.md (spec v0.5; LOCKED)
- docs/superpowers/plans/2026-05-12-p2-1-platform-mvp.md (active plan)

Check the plan's task checkboxes (- [x] vs - [ ]) to see what's already done.
Resume from the first unchecked task. Use superpowers:subagent-driven-development.

Note: P2.1 has branch-on-Task-0 logic — if Task 0 selected Path B, Tasks 1 and 25
adapt accordingly. Read tests/p2/INVESTIGATION-NOTES.md to learn which path was
selected before continuing.
```

---

## What's in scope vs out of scope for P2.1

**In scope (this plan):**
- Activation mechanism realization (§7.6 Path A; or Path B if A unviable)
- Atlas full persona via per-skill customize.toml
- ONE complete workflow: `bmad-bam-design-tenancy-model` (7 CEV steps + template)
- 5 supporting fragments (tenancy domain)
- 3 patterns (tenancy domain)
- QG-M2 (Tenant Isolation) checklist
- 3 family-wide standards (std-frontmatter, std-validation, std-adr)
- Plan C ratification (manual LLM probe)
- Sidecar memory templates (runtime-preferences, integration-history)

**Out of scope (deferred to P2.2+):**
- 15 remaining platform workflows
- 11 cross-family workflows (start, backup, restore, etc.)
- Other 7 BAM modules (data, ai, rag, integration, trust, ops, ux)
- MCP server
- Customize-templates inventory for BMAD core skills
- Anti-patterns library
- Vertical add-on packs

---

## What's already in the tree (do NOT re-do)

These were delivered by Wave 0 (merged) and the v0.5 spec patch:

- `docs/v6-final-architecture.md` — spec v0.5
- `docs/superpowers/plans/2026-05-11-wave-0-smoke-test.md` — Wave 0 plan (completed)
- `src-v6/bmad-bam-platform/module.yaml` — module declaration (will be modified, not recreated)
- `src-v6/bmad-bam-platform/agents/atlas/resources/platform-index.csv` — Atlas index (will gain new rows in Task 14)
- `src-v6/bmad-bam-platform/agents/atlas/resources/fragments/sentinel.md` — Wave 0 sentinel anchor (kept)
- `src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/` — full Wave 0 smoke-test skill including customize.toml
- `src-v6/bmad-bam-platform/scripts/post-install.sh` + `generate-sentinel.py`
- `tests/wave-0/` — all Wave 0 test infrastructure + outcome docs
- `_bmad/_memory/atlas/architecture-decisions/2026-05-11-001-wave-0-plan-selected.md` — ADR
- `_bmad/_memory/atlas/architecture-decisions/INDEX.md` — ADR index
- `_bmad/bam/schemas/family.schema.json` — family.json schema
- `external/bmad-method` submodule (BMAD v6.6.0)

`src-v2/` is preserved (v3 still installed; valid until v6.2). **Don't touch `src-v2/` during P2.1.** v6 work happens in `src-v6/`.

---

## Completed plans (history)

| Plan | Status | Plan file | Branch | Merge commit | Outcome |
|---|---|---|---|---|---|
| **Wave 0** | ✅ MERGED 2026-05-12 | `docs/superpowers/plans/2026-05-11-wave-0-smoke-test.md` | `feat/v6-wave-0-rdp` | `66d41d5` | Plan A selected (universal-glob resolver-side verified); bonus discovery: `[agent]`/`[workflow]` namespace split; Plan C ratification deferred to P2.1 |

---

## Future plans (not yet written)

| Plan | Scope | Estimated effort | Triggers |
|---|---|---|---|
| **P2.2** | `design-modular-monolith` + `design-tenant-tier-model` workflows | ~30h | P2.1 merged |
| **P2.3** | Cross-family workflows (`bmad-bam-start`, `record-decision`, `mediate-conflict`, `refresh-knowledge`, etc.) | ~40h | P2.2 merged |
| **P2.4** | Brownfield + tenant-onboarding/offboarding workflows | ~40h | P2.3 merged |
| **P2.5** | FinOps cluster (billing, payment, tax, rate-limit, rate-arbitrage) | ~50h | P2.4 merged |
| **P3** | `bmad-bam-data` full module | ~250h | P2.5 merged |
| **P4** | `bmad-bam-ai` full module | ~600h | P3 partial |
| **P5** | `bmad-bam-ux` full module | ~250h | P2 partial |
| **P6** | `bmad-bam-rag` + `bmad-bam-integration` (v6.1) | ~700h | v6.0 ships |
| **P7** | `bmad-bam-trust` + `bmad-bam-ops` (v6.2) | ~1100h | v6.1 ships |

This file gets updated at the top of "Active plan" + "Completed plans" each time a P-plan finishes.
