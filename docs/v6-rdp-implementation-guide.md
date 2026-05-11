# BAM v6 — Claude Code Operations Manual (RDP Implementation Guide)

**Audience:** Claude Code running on RDP, completing the BAM v3 → v6 transformation across multiple sessions.

**Companion docs (READ FIRST in this order):**
1. `docs/v6-information-package.md` — verified BMAD/bmad-builder facts, current state, 6 sub-projects
2. `CLAUDE.md` — project conventions (out-of-date for v6, treat as v3 reference)
3. This file — operations manual

**Total expected effort:** ~28-40 hours across 6 sub-projects, in 4-10 sessions.

---

## Part 0 — How to use this manual

### When a fresh Claude session starts on RDP

1. Read `docs/v6-information-package.md` end-to-end (Parts 1-12)
2. Read this file end-to-end (Parts 1-12)
3. Run the pre-flight checklist (Part 3)
4. Determine which sub-project is next (Part 6 status table or `git log`)
5. Load the appropriate kickoff prompt (Part 11) and start

### Manual scope

This manual covers **execution** (after design is locked per sub-project) AND **per-sub-project brainstorming** (using `superpowers:brainstorming` skill). Each sub-project has both a brainstorm guide and an implementation guide.

### What this manual is NOT

- Not a v6 architectural design doc — that's `docs/v6-information-package.md`
- Not a step-by-step migration script — too dynamic; humans make decisions
- Not a substitute for `superpowers:brainstorming` — Claude uses that skill for each sub-project

---

## Part 1 — Quick start (5 minutes)

### First commands when a session opens

```bash
# 1. Confirm location and branch
pwd                                          # should be /mnt/b/2026/Aprial/bmad-bam
git status                                   # check working tree
git log --oneline -10                        # recent commits
git rev-parse --abbrev-ref HEAD              # current branch

# 2. Confirm submodules are healthy
git submodule status

# 3. Confirm tests pass on current state
npm test 2>&1 | tail -10

# 4. Identify next sub-project (check Part 6 status table or look for in-progress branches)
git branch -a | grep -E "feat/v6-" | head -10
```

### First Claude actions

1. **Always TaskCreate** for multi-step work (3+ steps); track progress
2. **Verify all BMAD/bmad-builder claims against disk** before relying on them — `external/bmad-method/` and `external/bmad-builder/` are the source of truth
3. **Invoke `superpowers:brainstorming` skill** when entering a new sub-project's design phase
4. **Invoke `superpowers:writing-plans` skill** after design lock, before implementation
5. **Invoke `superpowers:executing-plans` skill** when implementing per a written plan
6. **Invoke `superpowers:verification-before-completion`** before claiming any PR/task complete

---

## Part 2 — Architecture & decisions reference

This is a quick-reference dump. Authoritative source is `docs/v6-information-package.md`.

### v6 mental model in one sentence

> **BAM v6 is a canonical BMAD module (same shape as `bmad-tea`/`bmad-cis`/`bmad-wds`) authored using `bmad-builder` skills, where `kb/` is the only source of truth and BMAD's existing skills do everything else.**

### Locked architectural commitments (DO NOT re-litigate)

| # | Commitment | Why |
|---|---|---|
| 1 | `kb/` (frontmatter in `.md`) is single source of truth | Eliminates v3's 290-row-vs-113-disk CSV drift by construction |
| 2 | 3 personas (Atlas/Nova/Kai) — not 14 | Universal-glob injects tenant-awareness for free; specialists were noise |
| 3 | Skills authored with `bmad-builder` | Don't reinvent module scaffolding |
| 4 | One adapter (BMAD) — no Cursor/Claude/MCP/npm side-channels | BMAD's `--tools` flag reaches 47 platforms |
| 5 | Use `bmad-generate-project-context` skill — do NOT write custom generator | BMAD already does this |
| 6 | Universal-glob is the keystone — must have CI smoke test | Load-bearing mechanism |
| 7 | Scope: kb + agents + workflows + customize-templates only | No monitoring stack, billing UI, i18n, audit execution |

### Open for re-brainstorming per sub-project

Everything else. See Part 9 of `docs/v6-information-package.md` for prior leanings (treat as reference, not constraints).

---

## Part 3 — Pre-flight checklist

**Run every session before any work.**

### Environment

- [ ] `pwd` → `/mnt/b/2026/Aprial/bmad-bam` (or known correct location)
- [ ] `node --version` → ≥20.0.0
- [ ] `python3 --version` → ≥3.11 (for BMAD resolver and v6 tooling)
- [ ] `npm test` passes (or known failures documented)
- [ ] `git status` either clean or known-dirty (verify modified files are expected)

### Git identity & remotes

- [ ] `git config user.name` and `git config user.email` set correctly
- [ ] `git remote -v` shows `git@github.com-mira5557373:mira5557373/bmad-bam.git` (the correct SSH alias)
- [ ] If SSH fails: see Part 7 — Recovery — SSH config

### Submodules

- [ ] `git submodule status` shows healthy modes (no `+` prefix unless intentionally updated)
- [ ] Submodule versions match expected (bmad-method ≥v6.6.0, bmad-builder ≥v1.7.0)

### Branch state

- [ ] `git branch --show-current` matches expected sub-project work branch (e.g. `feat/v6-kb-pr1-relocate-cleanup`) OR is on `feat/bam-v3-pure-kb` if starting fresh
- [ ] `git log --oneline -5` shows expected recent commits
- [ ] `git diff origin/<branch>...HEAD --stat` shows expected ahead-count

### Task state

- [ ] If resuming a prior session: `TaskList` should show in-progress tasks from where we left off
- [ ] If no tasks: this is a fresh session, may need to TaskCreate

---

## Part 4 — Session protocol

### Starting a session

1. Run pre-flight checklist (Part 3)
2. Read TaskList; resume any `in_progress` work, OR
3. Identify next sub-project from Part 6 status table
4. Use the matching kickoff prompt from Part 11

### Ending a session cleanly

When user wants to stop:

1. **Commit work-in-progress** with `wip:` prefix if not at a natural checkpoint
2. **Push branch** so RDP session resumption can pull fresh
3. **Update TaskList** — mark completed tasks `completed`, leave in-progress as `in_progress`
4. **Summarize state** to user in 3-5 bullets:
   - What was completed this session
   - What's left in current sub-project
   - Where to resume
   - Any blockers
5. **Do NOT** leave dangling commits or unpushed branches

### Resuming a session

1. Pre-flight checklist
2. `git pull` on current branch
3. Read TaskList from prior session
4. Read last few commits' messages for context
5. Continue from the in-progress task

### When to spawn subagents (`Agent` tool)

- **Use `Explore`** for codebase searches spanning multiple directories
- **Use `Plan`** for designing implementation strategy on complex sub-tasks
- **Use `general-purpose`** for multi-step research that doesn't fit other agent types
- **Never use** subagents for: brainstorming (do it in main thread; it's user-facing), git operations, destructive actions

---

## Part 5 — Safety protocols

### Pre-destructive operation checklist

Before any `git rm`, `rm -rf`, `git reset --hard`, `git push --force`:

- [ ] `git status` shows expected state
- [ ] Working tree is committed (or stash)
- [ ] Annotated git tag created if dropping >1 file: `git tag -a <name>-snapshot -m "..."`
- [ ] If on a shared branch: explicit user approval per change
- [ ] Have a `git reflog` mental note for last-resort recovery

### When to ask the user (always pause)

- Any push to `main` (NEVER push to main without explicit "yes push main")
- Any force-push to any branch
- Any submodule URL change
- Any change to git config
- Any change to remote URL
- Any `--no-verify` bypass of hooks
- Any operation that affects >50 files at once
- Any operation that deletes files outside the v6-cleanup scope

### When to commit (commit often)

- After every logical unit of work (don't batch unrelated changes)
- Before every destructive operation (commit the safe state first)
- Before invoking validators/tests (so failures are bisectable)
- At natural pause points (end of step, end of brainstorm section)

### Push policy

- Push branch after every commit on a feature branch (so RDP resumes can pull)
- Use `-u origin <branch>` first time
- Never push `--force` without explicit user approval
- Never push to `main` without explicit user approval

### Test policy

- `npm test` before opening any PR
- BMAD validator (`node external/bmad-method/tools/validate-skills.js <skill-path>`) before any skill change merges
- kb integrity evals after every PR in kb-canonicalize sub-project
- All evals before claiming any sub-project complete

---

## Part 6 — The 6 sub-projects (status table + per-project guides)

### Status table

| # | Sub-project | Branch | Status | Hours | Notes |
|---|---|---|---|---:|---|
| 1 | **kb-canonicalize** | `feat/v6-kb-*` (4 PRs) | not started | 10-14 | foundation; brainstorm in `docs/superpowers/specs/` |
| 2 | **module-scaffolding** | `feat/v6-module-*` | not started | 5-7 | depends on #1 |
| 3 | **production-gates** | `feat/v6-prodgates-*` | not started | 4-6 | depends on #2 |
| 4 | **lifecycle-and-discovery** | `feat/v6-lifecycle-*` | not started | 3-5 | depends on #2 |
| 5 | **evolution-and-migration** | `feat/v6-evolution-*` | not started | 4-5 | depends on #1, #2 |
| 6 | **release-and-distribution** | `feat/v6-release-*` | not started | 2-3 | depends on all |

**Brainstorm order:** 1 → 2 → 3 → 5 → 4 → 6 (foundation, scaffolding, production safety, evolution mechanisms, polish, release).

**To update status:** edit this table when a sub-project changes state (or use `git log --oneline | grep v6` to derive status).

---

### Sub-project #1: kb-canonicalize

**Goal:** Migrate `src-v2/data/*` → `src/data/*` under v6 conventions: rich frontmatter, tier classification, indices, aggressive cleanup.

**Brainstorm scope:**
- Cleanup posture (aggressive / surgical / conservative)
- Frontmatter schema (full v6 / tiered / minimal)
- Tier classification mechanism (hybrid / pure heuristic / manual / deferred)
- Persona ownership location (inverted-in-agent / pattern-frontmatter / primary+related)
- Execution approach (big-bang PR / sequenced 4 PRs / branch+worktree)
- Then 7 design sections (architecture / frontmatter schema / cleanup scope / indices / tier classification / verification / acceptance + PR sequence)

**Prior leanings** (reference only, re-brainstorm freely): aggressive cleanup, full schema, hybrid tiering, inverted ownership, sequenced PRs.

**Implementation phases:**

| PR | Branch | Scope | Hours |
|---|---|---|---:|
| 1 | `feat/v6-kb-pr1-relocate-cleanup` | Relocate `src-v2/data/` → `src/data/`, drop CSV / orphan checklists / v1 src/ / broken marketplace.json / dead scripts. Tag `pre-v6-cleanup-snapshot` first. Write `migration-disposition.csv`. | 3-4 |
| 2 | `feat/v6-kb-pr2-frontmatter` | Apply full v6 frontmatter to 112 patterns + runbooks/decisions/checklists/personas/templates/domains. 4 batches of 30 patterns each. | 3-4 |
| 3 | `feat/v6-kb-pr3-indices-evals` | Add `tools/generate-indices.py`, generate `src/data/_generated/*`, add 5 kb integrity evals, set up CI drift guard. | 2-3 |
| 4 | `feat/v6-kb-pr4-tier-and-ownership` | Heuristic tier classification + manual review for tier-1, scaffold `src/agents/{atlas,nova,kai}/resources/pattern-ownership.md`, regenerate indices. | 2-3 |

**Acceptance criteria:**
- All 112 patterns have full v6 frontmatter
- All shortcodes unique
- All cross-refs resolve
- 8 quality-gate checklists present, 29 orphans dropped/mined
- 5 runbooks present (1 existing + 4 extracted)
- 3 decision frameworks present (extracted from patterns)
- `tools/generate-indices.py` produces expected `_generated/*`
- Tier-1 count in [15, 30]
- `migration-disposition.csv` accounts for every source file
- All 5 kb integrity evals pass
- Pre-cleanup snapshot tag exists

**Kickoff prompt:** Part 11 — Section 11.1

---

### Sub-project #2: module-scaffolding

**Goal:** Use `bmad-builder` skills to scaffold the canonical BMAD module structure on top of `src/data/` from sub-project #1.

**Brainstorm scope:**
- Which workflows to ship as actual workflow skills vs runbook data
- Sentinel skill design (`bmad-bam` as launcher menu — or none?)
- Customize-templates inventory (which BMAD skills get BAM enrichment templates)
- module.yaml content (config vars, install hooks, agent roster declaration)

**Implementation steps:**

1. **Install bmad-builder** in the repo if not present:
   ```bash
   npx bmad-method install --modules bmm,bmb --tools claude-code --directory .
   bmad-bmb-setup
   ```
2. **Plan module** with `bmad-module-builder` → Ideate Module (IM) mode
3. **Author 3 agents** with `bmad-agent-builder` (one per persona)
4. **Author 4 workflows** with `bmad-workflow-builder` (tenant-onboarding, tenant-offboarding, mcp-server-config, rag-pipeline-design — adjust per brainstorm)
5. **Create customize-templates** at `src/data/customize-templates/*.toml.example`
6. **Scaffold setup skill** with `bmad-module-builder` → Create Module (CM) mode → generates `src/bmad-bam-setup/`
7. **Validate** with `bmad-module-builder` → Validate Module (VM) mode

**Acceptance criteria:**
- `src/module.yaml` declares 3 agents + 0-4 workflows + setup skill
- `src/module-help.csv` lists module's skills and customize-templates
- `src/agents/{atlas,nova,kai}/` each has SKILL.md + customize.toml + resources/
- Each agent's customize.toml loads tier-1 patterns + universal glob
- Each agent's resources/pattern-ownership.md is populated (from sub-project #1)
- 0-4 workflow skills present with proper SKILL.md + customize.toml + steps/
- `src/bmad-bam-setup/` auto-generated by bmad-module-builder CM
- All skills pass `validate-skills.js` (0 findings)
- `npm test` passes

**Kickoff prompt:** Part 11 — Section 11.2

---

### Sub-project #3: production-gates

**Goal:** Make the v6 keystone (universal glob) testable in CI. Add persona handoff schema. Add kb integrity evals (extending what was added in #1).

**Brainstorm scope:**
- Universal-glob smoke test mechanism (token-grep / sample-skill invocation / both)
- Persona handoff state schema (what does Atlas write that Nova reads?)
- Eval taxonomy (kb integrity vs skill behavior vs migration safety vs production smoke)

**Implementation steps:**

1. **Create `src/workflows/bmad-bam-smoke-test/`** workflow skill
2. **Write `scripts/verify-universal-glob.py`** as part of `src/bmad-bam-setup/scripts/`
3. **Insert smoke-test token** into the test fixture for universal-glob validation
4. **Author `src/agents/<name>/resources/handoff-schema.md`** for each architect
5. **Author skill behavior evals** in `evals/skill-behavior/` (atlas-activation, nova-activation, kai-activation, handoff-state)
6. **Wire up CI workflow** to run all evals on PR

**Acceptance criteria:**
- `bmad-bam-smoke-test` skill exists and passes its own eval
- Each agent's `handoff-schema.md` defines what they write to/read from `_bmad/_memory/bam-architect/`
- 5 skill behavior evals exist
- CI workflow runs all kb integrity + skill behavior evals
- Smoke test catches: missing project-context.md, glob not resolving, BAM token absent

**Kickoff prompt:** Part 11 — Section 11.3

---

### Sub-project #4: lifecycle-and-discovery

**Goal:** First-time UX + pattern discoverability.

**Brainstorm scope:**
- Quick-start UX (banner in setup skill / standalone tutorial / opt-in flow)
- Pattern catalog format (auto-generated markdown / web site / sentinel-skill menu)
- Customize-templates discoverability (auto-suggest in setup / list in module-help / batch-apply helper)

**Implementation steps:**

1. **Enhance `src/bmad-bam-setup/SKILL.md`** with quick-start banner that runs after install
2. **Write `docs/QUICK-START.md`** (200-line user-facing guide)
3. **Enhance `tools/generate-indices.py`** to produce `docs/PATTERN-CATALOG.md` (browsable markdown)
4. **Author `src/bmad-bam-setup/scripts/apply-customize-templates.py`** batch helper
5. **Register customize-templates in `src/module-help.csv`** so `bmad-help` surfaces them
6. **Add tier-1 pattern preview** to setup banner

**Acceptance criteria:**
- New user post-install sees: quick-start banner, smoke-test result, customize-template offer
- `docs/PATTERN-CATALOG.md` auto-generated, browsable, organized by category × criticality
- `bmad-help` lists BAM customize-templates as recommendations
- Batch apply helper works for "apply all 6 customize-templates"

**Kickoff prompt:** Part 11 — Section 11.4

---

### Sub-project #5: evolution-and-migration

**Goal:** v3 → v6 migration, contribute-back loop, context-conflict handling.

**Brainstorm scope:**
- Migration skill scope (auto-detect prior version / manual user invocation only)
- Contribute skill scope (full pattern authoring / just template generation)
- Context-conflict policy (warn-only / fail-fast / auto-resolve)

**Implementation steps:**

1. **Author `src/workflows/bmad-bam-migrate/`** workflow skill with steps for v3→v6
2. **Author `src/workflows/bmad-bam-contribute/`** workflow skill (incident → kb pattern)
3. **Author `src/bmad-bam-setup/scripts/detect-context-conflicts.py`**
4. **Write `docs/MIGRATION.md`** — user-facing guide for v3→v6 upgrade
5. **Write `docs/COMPATIBILITY.md`** — context-conflict policy + multi-module coexistence

**Acceptance criteria:**
- `bmad-bam-migrate` correctly detects v3 installation, walks user through upgrade
- `bmad-bam-contribute` produces a PR-ready new kb pattern
- Context conflict detector identifies multi-module `project-context.md` collisions
- All migration paths covered: v3→v6.0, future v6.x→v6.x+1

**Kickoff prompt:** Part 11 — Section 11.5

---

### Sub-project #6: release-and-distribution

**Goal:** v6.0 release engineering.

**Brainstorm scope:**
- Release versioning (semver — v6.0.0 directly, or rc cycles)
- Distribution channels (BMad Marketplace only / GitHub Releases / npm)
- Documentation site (mkdocs/astro/none)

**Implementation steps:**

1. **Update `CHANGELOG.md`** with v6.0 entry
2. **Update `bmb-registry-entry.yaml`** for v6.0
3. **Submit PR to `bmad-plugins-marketplace`** with v6 registry entry
4. **Tag release** `v6.0.0-rc1` → `v6.0.0` after smoke test
5. **Optionally build docs site** with mkdocs/astro
6. **Final v6 architecture spec** consolidating all sub-project specs

**Acceptance criteria:**
- `CHANGELOG.md` v6.0 entry comprehensive
- All sub-project specs committed to `docs/superpowers/specs/`
- BMB registry PR open and approved
- `v6.0.0` tag exists
- Release notes mention v3→v6 migration guide

**Kickoff prompt:** Part 11 — Section 11.6

---

## Part 7 — Recovery procedures

### Lost work recovery

```bash
# 1. Check reflog
git reflog | head -30

# 2. Check pre-cleanup snapshot tag
git tag | grep snapshot

# 3. Restore specific file from snapshot
git checkout pre-v6-cleanup-snapshot -- <path>

# 4. Restore entire commit
git cherry-pick <reflog-sha>
```

### Bad commit recovery

```bash
# If commit is local-only (not pushed)
git reset HEAD~1                    # soft — keeps changes staged
git reset --soft HEAD~1             # keeps changes unstaged

# If commit is pushed
# DO NOT force-push without user approval
# Instead, revert
git revert <bad-sha>
git push origin <branch>
```

### Submodule conflicts

```bash
# If submodule state is broken
git submodule sync --recursive
git submodule update --init --recursive

# If submodule pointer wrong
git submodule update --remote --recursive   # NOT for casual use
# or
cd external/<module> && git checkout <known-good-sha>
```

### SSH push fails

Symptom: `ERROR: Permission to mira5557373/bmad-bam.git denied to atdev000.`

Fix:
```bash
# Verify remote uses the mira5557373 alias
git remote -v
# Should show: git@github.com-mira5557373:mira5557373/bmad-bam.git

# If not, fix:
git remote set-url origin git@github.com-mira5557373:mira5557373/bmad-bam.git

# Verify auth
ssh -T -o ConnectTimeout=8 git@github.com-mira5557373
# Should respond: "Hi mira5557373! You've successfully authenticated..."
```

### Validator regression

Symptom: `validate-skills.js` was passing, now failing.

```bash
# 1. Identify which skill
node external/bmad-method/tools/validate-skills.js src/<skill-path>

# 2. Read the rule's name; lookup in external/bmad-method/tools/skill-validator.md
grep -A5 "<RULE-NAME>" external/bmad-method/tools/skill-validator.md

# 3. Fix the violation; re-run validator
```

### npm test failures

```bash
# Run specific test suite to isolate
npm test -- test/v2/<file>

# Watch mode for debugging
npm test -- --watch

# Skip deferred tests (per TEST-MIGRATION-BACKLOG.md)
npm test  # already skips them via jest.config.js
```

---

## Part 8 — Quality gates

### Per-PR gates (must pass before merge)

- [ ] `npm test` passes (or known-skipped tests documented)
- [ ] `validate-skills.js` on any new/modified skill: 0 findings
- [ ] Pre-commit hook (if installed) passes
- [ ] CI workflow green
- [ ] User approval (for PRs touching shared state)

### Per-sub-project completion gates

- [ ] All PRs in sub-project merged
- [ ] All acceptance criteria from sub-project guide met
- [ ] CHANGELOG.md entry for sub-project added
- [ ] Sub-project spec committed to `docs/superpowers/specs/`
- [ ] Status table in Part 6 updated

### v6.0 release gates (after all 6 sub-projects)

- [ ] All sub-project gates met
- [ ] Universal-glob smoke test passes
- [ ] All kb integrity evals pass (0 findings)
- [ ] All skill behavior evals pass
- [ ] Full install smoke test: `npx bmad-method install --modules bmm,bam --tools claude-code` on a fresh test project, BAM context auto-loads
- [ ] Migration smoke test: v3 → v6 upgrade path verified
- [ ] BMB registry entry submitted
- [ ] `v6.0.0` tag created and pushed

---

## Part 9 — Anti-patterns specific to v6 work

These are patterns to AVOID. Each has been a temptation in v3 history.

### Anti-pattern 1: Reinventing BMAD primitives

**Symptom:** Claude writes a custom `post-install.sh` or pattern indexer.
**Why bad:** BMAD ships `bmad-generate-project-context`, `bmad-distillator`, `bmad-shard-doc`, `bmad-index-docs`. Use them.
**Fix:** Before writing tooling, grep `external/bmad-method/src/core-skills/` and `external/bmad-method/src/bmm-skills/` for existing skill that does the thing.

### Anti-pattern 2: Hand-rolling module.yaml

**Symptom:** Claude carefully drafts module.yaml with all agent declarations, install hooks, etc.
**Why bad:** `bmad-module-builder` CM mode generates this from the agents/workflows present on disk.
**Fix:** Run `bmad-module-builder` after authoring skills; let it generate module.yaml.

### Anti-pattern 3: 14-persona thinking

**Symptom:** Considering adding Vega, Quinn, Rune, Cipher, etc.
**Why bad:** v3 had 11 specialists that were all "BMAD agent + tenant-awareness overlay." The universal glob does this for free now.
**Fix:** Stick to Atlas/Nova/Kai. If a specialist genuinely needs a separate identity, prove that the universal glob can't satisfy the use case.

### Anti-pattern 4: CSV-as-registry

**Symptom:** Claude considers maintaining `bam-patterns.csv` alongside frontmatter.
**Why bad:** v3 has 290-row CSV vs 113 disk files. CSV is a v2-era idiom; v6 uses frontmatter-as-registry.
**Fix:** Generate CSV (if needed for external consumers) from frontmatter at build time. Hand-maintained CSV is a drift trap.

### Anti-pattern 5: Multi-channel adapters (Cursor, Claude Code, MCP, npm)

**Symptom:** Claude considers building a `adapters/cursor/` or `adapters/mcp/`.
**Why bad:** BMAD's `--tools` flag handles 47 platforms. Adapters reinvent BMAD's tool layer.
**Fix:** Ship as a BMAD module. BMAD's installer fans out.

### Anti-pattern 6: Scope creep into customer infrastructure

**Symptom:** Patterns include Datadog integration code, Stripe billing code, Grafana dashboards.
**Why bad:** BAM provides patterns (architectural guidance). Implementation code is per-customer.
**Fix:** Patterns describe WHAT to do; not HOW in the customer's specific stack. Reference implementations live in customer repos.

### Anti-pattern 7: Premature v6.0 release

**Symptom:** Claude considers tagging v6.0.0 after just kb-canonicalize.
**Why bad:** v6.0 needs all 6 sub-projects (or honest version like v6.0-alpha) for the design to be coherent.
**Fix:** Tag v6.0.0-alpha after each completed sub-project; v6.0.0 only after all gates pass.

### Anti-pattern 8: Brainstorming twice

**Symptom:** Claude re-asks questions that have been decided.
**Why bad:** Wastes user's time; ignores prior brainstorm.
**Fix:** Check `docs/superpowers/specs/` for prior decisions before brainstorming. The `superpowers:brainstorming` skill works within prior context.

### Anti-pattern 9: Skipping pre-flight

**Symptom:** Claude starts work immediately on session start.
**Why bad:** Pre-flight catches submodule state issues, branch mismatch, etc. early.
**Fix:** Always run pre-flight (Part 3) first thing.

### Anti-pattern 10: Bypassing safety protocols

**Symptom:** `git push --force`, `--no-verify`, `rm -rf` without snapshot.
**Why bad:** Reversible operations are cheap; recovery from destructive ones is expensive.
**Fix:** Snapshot first. Always.

---

## Part 10 — Communication style

### Progress reports

When user asks "where are we?":
- One sentence: current sub-project, current PR, current step
- Bullet list: what's done, what's next
- Any blockers

### Decision logs

For every meaningful decision in brainstorming:
- What was decided
- Why (1-2 sentences)
- What alternatives were considered
- Where the decision is committed (file path, commit sha)

### Error reports

When something fails:
- What was attempted
- Exact error message (verbatim)
- What was tried to fix
- What's blocking next steps
- Recommended user action

### End-of-session summary

- 3-5 bullets of what was accomplished
- Current branch + uncommitted state
- Where to resume
- Any open questions for user
- Next session's first action

---

## Part 11 — Kickoff prompts (one per sub-project)

### 11.1 — kb-canonicalize

```
I'm starting sub-project #1 of BAM v6: kb-canonicalize.

Goal: Migrate src-v2/data/* → src/data/* under v6 conventions. Rich
frontmatter (~13 fields per pattern), tier classification (hybrid
heuristic + manual review), aggressive cleanup of v3 cruft (CSV, orphan
checklists, frozen src/ v1, broken marketplace.json, dead scripts).

Context already loaded:
- docs/v6-information-package.md (verified facts)
- docs/v6-rdp-implementation-guide.md (this manual)

Use superpowers:brainstorming to:
1. Run pre-flight checklist (Part 3 of guide)
2. Read prior brainstorm leanings (Part 9 of info package) as reference
3. Re-brainstorm freely — don't lock decisions just because they're in
   prior leanings
4. Walk through clarifying questions (cleanup posture, frontmatter scope,
   tier classification, persona ownership, execution approach) one at
   a time
5. Present 2-3 approaches with trade-offs
6. Present design in sections (7 sections recommended: tree / frontmatter
   schema / cleanup scope / indices / tier classification / verification /
   acceptance + PR sequence)
7. Get approval after each section
8. Write spec to docs/superpowers/specs/<date>-kb-canonicalize-design.md
9. Commit and push spec
10. Transition to superpowers:writing-plans

Then implement per the plan, one PR at a time:
- PR 1: feat/v6-kb-pr1-relocate-cleanup
- PR 2: feat/v6-kb-pr2-frontmatter
- PR 3: feat/v6-kb-pr3-indices-evals
- PR 4: feat/v6-kb-pr4-tier-and-ownership

Acceptance criteria from Part 6 of guide must all pass.

Constraints:
- Never push to main
- Always commit before destructive operations
- Tag pre-v6-cleanup-snapshot before PR 1 deletions
- Verify every BMAD claim against external/bmad-method/ before relying
- npm test before every PR

Start with pre-flight.
```

### 11.2 — module-scaffolding

```
I'm starting sub-project #2 of BAM v6: module-scaffolding.

Prerequisites: sub-project #1 (kb-canonicalize) merged.

Goal: Use bmad-builder skills to scaffold the canonical BMAD module on
top of src/data/. Author 3 agent skills (Atlas, Nova, Kai) and 0-4
workflow skills. Generate module.yaml, module-help.csv, and the setup
skill via bmad-module-builder CM mode.

Context already loaded:
- docs/v6-information-package.md
- docs/v6-rdp-implementation-guide.md

Use superpowers:brainstorming to:
1. Pre-flight checklist
2. Verify sub-project #1 acceptance criteria are met
3. Decide which workflows ship as workflow skills (default: 4 — tenant-
   onboarding, tenant-offboarding, mcp-server-config, rag-pipeline-design)
4. Decide customize-templates inventory (default: 6 — for bmad-create-prd,
   bmad-create-architecture, bmad-generate-project-context, bmad-validate-
   prd, bmad-correct-course, bmad-investigate)
5. Design sentinel skill (if any) — default: none for v6 (rely on agent
   skills for Direct mode discovery)
6. Write spec to docs/superpowers/specs/<date>-module-scaffolding-design.md
7. Implement per spec using bmad-builder skills

Implementation order:
1. Install bmad-builder if not present
2. bmad-module-builder Ideate Module → plan doc
3. bmad-agent-builder × 3 (atlas, nova, kai)
4. bmad-workflow-builder × N
5. Author customize-templates
6. bmad-module-builder Create Module → scaffold setup skill + module.yaml +
   module-help.csv
7. bmad-module-builder Validate Module
8. Run validate-skills.js on all skills

Acceptance criteria from Part 6 of guide.

Same constraints as sub-project #1.
```

### 11.3 — production-gates

```
I'm starting sub-project #3 of BAM v6: production-gates.

Prerequisites: sub-projects #1 and #2 merged.

Goal: Make the universal-glob keystone testable in CI. Persona handoff
schema. Skill behavior evals.

Use superpowers:brainstorming for:
1. Pre-flight
2. Universal-glob smoke test mechanism design (token-grep / sample skill
   invocation / both)
3. Persona handoff state schema design
4. Skill behavior eval taxonomy

Implementation:
1. Author src/workflows/bmad-bam-smoke-test/
2. Author scripts/verify-universal-glob.py
3. Author agent handoff-schema.md per persona
4. Author 5 skill behavior evals (atlas, nova, kai, handoff, glob)
5. Wire CI workflow

Acceptance criteria from Part 6.
```

### 11.4 — lifecycle-and-discovery

```
I'm starting sub-project #4 of BAM v6: lifecycle-and-discovery.

Prerequisites: sub-projects #1 and #2 merged.

Goal: First-time UX + pattern discoverability.

Use superpowers:brainstorming for:
1. Pre-flight
2. Quick-start UX design (banner / standalone / opt-in)
3. Pattern catalog format
4. Customize-template discoverability mechanism

Implementation:
1. Enhance src/bmad-bam-setup/SKILL.md with banner
2. Write docs/QUICK-START.md
3. Enhance tools/generate-indices.py to produce docs/PATTERN-CATALOG.md
4. Author src/bmad-bam-setup/scripts/apply-customize-templates.py
5. Register customize-templates in module-help.csv

Acceptance criteria from Part 6.
```

### 11.5 — evolution-and-migration

```
I'm starting sub-project #5 of BAM v6: evolution-and-migration.

Prerequisites: sub-projects #1 and #2 merged.

Goal: v3→v6 migration + contribute-back loop + context-conflict handling.

Use superpowers:brainstorming for:
1. Pre-flight
2. Migration skill scope
3. Contribute skill scope
4. Context-conflict policy

Implementation:
1. Author src/workflows/bmad-bam-migrate/
2. Author src/workflows/bmad-bam-contribute/
3. Author src/bmad-bam-setup/scripts/detect-context-conflicts.py
4. Write docs/MIGRATION.md
5. Write docs/COMPATIBILITY.md

Acceptance criteria from Part 6.
```

### 11.6 — release-and-distribution

```
I'm starting sub-project #6 of BAM v6: release-and-distribution.

Prerequisites: all prior sub-projects merged. All quality gates passing.

Goal: v6.0 release engineering.

Use superpowers:brainstorming for:
1. Pre-flight
2. Release versioning strategy (semver / rc cycles)
3. Documentation site decision
4. BMB registry submission

Implementation:
1. CHANGELOG.md v6.0 entry
2. bmb-registry-entry.yaml for v6.0
3. PR to bmad-plugins-marketplace
4. Tag v6.0.0-rc1
5. Validate end-to-end with fresh install smoke test
6. Tag v6.0.0
7. Optional: docs site

Acceptance criteria from Part 6 v6.0 release gates.
```

---

## Part 12 — Reference card

### Common commands

```bash
# Validate a skill
node external/bmad-method/tools/validate-skills.js <skill-path>

# Validate all v6 skills
for s in src/skills/* src/agents/* src/workflows/* src/bmad-bam-setup; do
  [ -d "$s" ] && node external/bmad-method/tools/validate-skills.js "$s"
done

# Run kb integrity evals (after sub-project #1)
# (exact command depends on bmad-eval-runner integration)

# Run pre-commit checks
npm test
node external/bmad-method/tools/validate-skills.js src/...
python3 tools/generate-indices.py
git diff --exit-code src/data/_generated/

# Check submodule status
git submodule status

# Test SSH push works
ssh -T -o ConnectTimeout=8 git@github.com-mira5557373
```

### File paths to remember

| Path | Purpose |
|---|---|
| `docs/v6-information-package.md` | Verified facts |
| `docs/v6-rdp-implementation-guide.md` | This manual |
| `docs/superpowers/specs/` | Sub-project design specs (one per sub-project) |
| `external/bmad-method/src/core-skills/` | BMAD core skill source — verify claims here |
| `external/bmad-method/src/bmm-skills/` | BMAD lifecycle skill source |
| `external/bmad-builder/skills/` | bmad-builder skill source |
| `external/bmad-builder/samples/sample-module-setup/` | Canonical module setup pattern |
| `external/bmad-tea/src/` | Reference: simplest real BMAD module |
| `external/bmad-wds/src/` | Reference: most elaborate real BMAD module |
| `src-v2/data/` | v3 source (to be migrated in sub-project #1) |
| `src/` | v6 target |

### Skills to invoke (Claude side)

| Skill | When |
|---|---|
| `superpowers:brainstorming` | Start of each sub-project — explore design |
| `superpowers:writing-plans` | After design lock — write implementation plan |
| `superpowers:executing-plans` | During implementation — follow the plan |
| `superpowers:verification-before-completion` | Before claiming any PR or task done |
| `superpowers:systematic-debugging` | When stuck on a bug/test failure |
| `superpowers:dispatching-parallel-agents` | When 2+ independent tasks can parallelize |
| `superpowers:using-git-worktrees` | If working on multiple sub-projects in parallel |
| `superpowers:finishing-a-development-branch` | After sub-project work complete, before opening PR |

### When to ask the user (always pause)

- Push to main
- Force push (any branch)
- Submodule URL change
- Git config change
- Remote URL change
- Bypass hooks (`--no-verify`)
- Operations on >50 files at once
- Operations outside v6-cleanup scope

### When NOT to ask the user (just do it)

- Run pre-flight checklist
- TaskCreate / TaskUpdate
- Commit work-in-progress
- Push feature branch (not main)
- Run tests
- Run validators
- Read files
- Search codebase

---

## Part 13 — Session log template

Use this at the start of each session to document state and intent.

```markdown
## Session: <date> <time>

**Sub-project:** <name>
**PR/branch:** <name>
**Status entering session:** <what was done in last session>

**This session's goal:** <1-2 sentences>

**Tasks:** <bullet list>

**Risks/blockers:** <if any>

**End-of-session state:** <updated at end>
```

Commit session logs to `docs/v6-sessions/<date>.md` for posterity. Optional but useful for multi-day projects.

---

## Part 14 — When the user says something specific

Common user inputs and recommended Claude responses.

| User says | Claude should |
|---|---|
| "ultrathink" | Take maximum reasoning time; consider edge cases; verify assumptions |
| "push" / "commit and push" | Commit with proper message + push (not to main without explicit approval) |
| "stop" / "wait" | Pause immediately; report current state; ask what to change |
| "what's next?" | Read TaskList; report current sub-project; list next steps |
| "where are we?" | Brief: sub-project, PR, step, % complete |
| "skip this" | Confirm what's being skipped; document why; mark task complete or deleted |
| "redo" | Identify what to redo; reset state; offer to take different approach |
| "let me think" | Stop; commit any work-in-progress; wait for direction |

---

## Part 15 — Final principles

1. **BMAD is the platform.** BAM rides on it. When in doubt, check what BMAD ships.
2. **Frontmatter is the registry.** Anything that drifts from frontmatter is wrong.
3. **3 personas, not 14.** Atlas, Nova, Kai.
4. **bmad-builder authors. We don't hand-roll.**
5. **kb is content; everything else is mechanism.**
6. **Verify against disk.** Read source code; don't trust documentation alone.
7. **Commit often. Snapshot before destruction. Never push to main without approval.**
8. **Brainstorm per sub-project. Don't pre-commit to design before brainstorming.**
9. **Use BMAD's existing skills. If you're writing a script, search first.**
10. **Honor scope. BAM is multi-tenant agentic AI SaaS expertise. Not infra. Not UI. Not billing.**

---

*This manual is the single source of truth for v6 implementation on RDP. Update it as decisions land.*

*Last updated: 2026-05-11.*
