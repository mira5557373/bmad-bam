# How to Use the v6 Docs on RDP — Step-by-Step Walkthrough

**Audience:** You (the human) driving the BAM v6 transformation on RDP.

**Companion docs:**
- `docs/v6-information-package.md` — verified facts (for Claude to read)
- `docs/v6-rdp-implementation-guide.md` — Claude's operations manual

**This doc:** what YOU do, step by step, to drive Claude Code through v6 work.

---

## Phase 1 — One-time RDP setup (do this once, ~30 minutes)

### Step 1.1: Open terminal on RDP

Connect to RDP. Open a terminal (PowerShell, Bash, Windows Terminal, etc.)

### Step 1.2: Clone the repo (if not already cloned)

```bash
# Pick a working directory
cd ~/Projects                      # or wherever you keep code

# Clone with the correct SSH alias (so push works as mira5557373)
git clone git@github.com-mira5557373:mira5557373/bmad-bam.git
cd bmad-bam

# Check out the branch with v6 docs
git checkout feat/bam-v3-pure-kb
git pull origin feat/bam-v3-pure-kb

# Verify v6 docs are present
ls docs/v6-*.md docs/HOW-TO-USE-V6-DOCS.md
```

You should see:
```
docs/HOW-TO-USE-V6-DOCS.md           ← this file
docs/v6-information-package.md       ← facts
docs/v6-rdp-implementation-guide.md  ← Claude's manual
```

If SSH clone fails: your RDP needs the same SSH config that the desktop machine has. Either:
- Copy `~/.ssh/config` + `~/.ssh/id_ed25519_mira5557373` from the desktop machine to RDP, OR
- Use HTTPS clone: `git clone https://github.com/mira5557373/bmad-bam.git` (then handle auth via personal access token)

### Step 1.3: Install Node.js (≥ 20.0.0)

```bash
node --version    # check; need ≥ 20.0.0
```

If too old or missing: install Node.js 20+ from nodejs.org or via your package manager.

### Step 1.4: Install Python (≥ 3.11)

```bash
python3 --version    # check; need ≥ 3.11 (BMAD resolver requires it)
```

If too old: install Python 3.11+ (uses stdlib `tomllib`, no virtualenv needed).

### Step 1.5: Install Claude Code

```bash
# Follow Anthropic's Claude Code install docs
# https://docs.claude.com/en/docs/claude-code/setup

# On Linux/macOS:
curl -fsSL https://claude.ai/code/install.sh | sh

# OR via npm:
npm install -g @anthropic-ai/claude-code

# Verify
claude --version
```

### Step 1.6: Authenticate Claude Code

```bash
claude /login
```

Follow the prompts to authenticate with your Anthropic account.

### Step 1.7: Install repo dependencies

```bash
# Inside the bmad-bam repo directory
npm install
```

### Step 1.8: Verify everything works

```bash
# Test passes
npm test 2>&1 | tail -5

# Submodules healthy
git submodule status

# Branch is correct
git branch --show-current     # should show: feat/bam-v3-pure-kb
```

If `npm test` fails with errors: read the output. Some failures are known (per `TEST-MIGRATION-BACKLOG.md` — 7 deferred test suites). If failures are unexpected, fix before proceeding.

### Step 1.9: Update submodules (if first time on this RDP)

```bash
git submodule update --init --recursive
```

✅ **One-time setup complete.** From now on, you just open Claude Code in this repo.

---

## Phase 2 — Your first v6 session (start kb-canonicalize)

### Step 2.1: Open Claude Code in the repo

```bash
cd ~/Projects/bmad-bam    # or wherever you cloned it
claude
```

You'll see Claude Code start up. Wait for the prompt.

### Step 2.2: Paste the kickoff prompt

Open `docs/v6-rdp-implementation-guide.md` in a text editor. Scroll to **Part 11, Section 11.1 — kb-canonicalize**. It's a multi-line prompt that starts with:

```
I'm starting sub-project #1 of BAM v6: kb-canonicalize.
```

**Copy the entire prompt** (from `I'm starting...` down to `Start with pre-flight.`).

**Paste it into Claude Code** and press Enter.

### Step 2.3: What you'll see Claude do

Claude will:

1. **Run pre-flight checklist** — verify environment, git state, branch, submodules
2. **Read the two v6 docs** — `v6-information-package.md` + `v6-rdp-implementation-guide.md`
3. **Invoke `superpowers:brainstorming` skill** — formally start the brainstorming flow
4. **Create tasks** — `TaskCreate` to track the brainstorm steps
5. **Ask first clarifying question** — usually about cleanup posture (aggressive / surgical / conservative)

**Answer the question.** Claude will keep asking one question at a time. Take your time.

### Step 2.4: Brainstorming flow — what to expect

Claude will walk through:

1. **5-7 clarifying questions** — one at a time, multiple-choice format
2. **2-3 proposed approaches** with trade-offs — Claude recommends one
3. **7 design sections**, presented one at a time:
   - Tree structure
   - Frontmatter schema
   - Cleanup scope
   - Indices generation
   - Tier classification
   - Migration verification
   - Acceptance criteria + PR sequence
4. **After each section**: you approve / request changes
5. **Spec gets written** to `docs/superpowers/specs/<date>-kb-canonicalize-design.md`
6. **Spec gets committed** and pushed
7. **Claude asks you to review the spec** before transitioning to implementation
8. **You review**, then approve
9. **Claude invokes `superpowers:writing-plans`** to create an implementation plan
10. **Plan gets written** to `plans/<branch>/plan.md` or similar
11. **You approve the plan**
12. **Claude invokes `superpowers:executing-plans`** to start implementation

**Total time for this phase: 1-2 hours.**

### Step 2.5: When to approve, when to push back

| Claude shows you... | You should... |
|---|---|
| A clarifying question with 4 multiple-choice options | Pick the one closest to your intent. If none fit, type "Other" and explain. |
| 2-3 approaches with trade-offs | Pick the recommended one unless you have a strong reason to deviate |
| A design section (tree, schema, etc.) | Read carefully; approve if it looks right, or push back on specific concerns |
| A written spec file | Open `docs/superpowers/specs/<date>-kb-canonicalize-design.md`, read it, approve or request edits |
| An implementation plan | Read it; approve if the steps look right |
| A destructive operation (delete files, force push) | Verify the operation matches what was approved; approve only if so |

### Step 2.6: First commits will land

Claude will commit incrementally. You'll see commits like:
```
chore(v6): tag pre-v6-cleanup-snapshot before destructive operations
docs(v6): commit kb-canonicalize design spec
feat(v6): relocate src-v2/data → src/data (no content changes)
feat(v6): centralize per-skill templates → src/data/templates/
...
```

Claude pushes after each commit so you can pull on another machine if needed.

✅ **First session complete** when first PR of kb-canonicalize is open (or merged).

---

## Phase 3 — Driving implementation (multiple sessions, 1-2 weeks)

After the design is locked, Claude is in implementation mode. Each session looks like this:

### Step 3.1: Start a fresh session

```bash
cd ~/Projects/bmad-bam
git pull
claude
```

### Step 3.2: First prompt of a resuming session

Type into Claude:

```
Resuming BAM v6 work. Run pre-flight checklist from
docs/v6-rdp-implementation-guide.md Part 3, then check TaskList to find
where we left off, then continue with the next task.
```

### Step 3.3: Claude resumes

Claude will:
1. Run pre-flight
2. Read TaskList → identify in-progress task
3. Read recent commits → understand state
4. Report: "We were working on X. Next step is Y. Should I proceed?"

**Type "yes"** (or "ultrathink and proceed" for more careful work).

### Step 3.4: The PR rhythm

For each PR within a sub-project, Claude will:

1. Create branch (e.g. `feat/v6-kb-pr1-relocate-cleanup`)
2. Make commits
3. Push branch
4. Run validators (`npm test`, `validate-skills.js`)
5. Ask you to review the PR
6. After approval, either:
   - Merge to `feat/bam-v3-pure-kb` (rebase or merge commit), OR
   - Open GitHub PR for human review first
7. Move to next PR

### Step 3.5: Sub-project completion

After all 4 PRs of kb-canonicalize merge:

1. Claude updates the status table in `docs/v6-rdp-implementation-guide.md` Part 6
2. Claude tags `v6.0-alpha.1-kb-canonicalize-done` or similar
3. Claude asks: "kb-canonicalize complete. Ready to move to sub-project #2 (module-scaffolding)?"

**Type "yes"** and Claude loads the next kickoff prompt (11.2).

### Step 3.6: Repeat for sub-projects 2–6

Sub-projects in brainstorm order: **1 → 2 → 3 → 5 → 4 → 6**

| # | Sub-project | Expected sessions |
|---|---|---|
| 1 | kb-canonicalize | 3-5 sessions |
| 2 | module-scaffolding | 2-3 |
| 3 | production-gates | 2 |
| 5 | evolution-and-migration | 2 |
| 4 | lifecycle-and-discovery | 1-2 |
| 6 | release-and-distribution | 1 |

**Total: ~11-15 sessions over ~2-3 weeks of part-time work.**

---

## Phase 4 — Pausing between sessions

### Step 4.1: When you want to stop

Type to Claude:

```
I need to stop. Please clean up state, push everything, and tell me
where to resume.
```

### Step 4.2: Claude's cleanup

Claude will:

1. Commit any work-in-progress with `wip:` prefix
2. Push current branch to origin
3. Update TaskList (mark completed tasks, leave in-progress as-is)
4. Give you a summary:
   ```
   ✓ Pushed feat/v6-kb-pr2-frontmatter at sha abc123
   ✓ TaskList: 5 completed, 1 in-progress (frontmatter batch 3 of 4)
   ✓ Next session: continue PR 2 from batch 3
   ```

### Step 4.3: Resume later

Just open Claude Code again and use the resuming-session prompt from Step 3.2. Claude reads TaskList and continues.

---

## Phase 5 — When to step in

These are situations where you (human) need to act.

### Step 5.1: Claude asks for approval

Claude will pause and ask before:
- Pushing to `main` (always ask)
- Force-pushing any branch (always ask)
- Deleting files outside the approved cleanup scope (always ask)
- Running operations on >50 files (always ask)
- Bypassing hooks with `--no-verify` (always ask)
- Changing git config or remote URLs (always ask)

**Always read carefully and approve only if it matches intent.**

### Step 5.2: Tests fail

If `npm test` fails:

1. Claude will report the failure
2. Claude will try to fix it
3. If can't fix in 2-3 attempts, Claude escalates to you
4. You decide: fix manually / skip / defer

### Step 5.3: Something looks wrong

If Claude does something unexpected:

1. Type: **"stop. revert the last commit and tell me what happened."**
2. Claude will revert and explain
3. Discuss and adjust direction

### Step 5.4: You change your mind on a decision

```
Going back: I want to change the decision about <X>. Re-brainstorm just
that decision and update affected files.
```

Claude will use `superpowers:brainstorming` skill in a focused mode.

### Step 5.5: GitHub PR review

Some PRs (especially big ones) benefit from GitHub PR review:

1. After Claude opens the PR, visit the GitHub URL
2. Review the diff
3. Comment on specifics
4. Approve or request changes
5. Tell Claude: "merge if green" or "address comments first"

---

## Phase 6 — Final v6.0 release

After all 6 sub-projects complete, in sub-project #6:

### Step 6.1: Final verification

Claude will run:
- All kb integrity evals
- All skill behavior evals
- Full install smoke test
- Migration smoke test (v3 → v6 upgrade)
- npm test

### Step 6.2: Tag v6.0.0

```bash
# Claude will do this; you just approve
git tag -a v6.0.0 -m "BAM v6.0.0 — canonical BMAD module"
git push origin v6.0.0
```

### Step 6.3: Submit to BMad Marketplace

Claude opens a PR to `bmad-code-org/bmad-plugins-marketplace` with the v6 entry. You review and merge.

### Step 6.4: Release notes

Claude drafts release notes. You review. Publish on GitHub Releases.

✅ **v6.0 shipped.**

---

## Common scenarios — quick reference

### "I want to use ultrathink for the next decision"

Just type `ultrathink` (or include the word) in your message. Claude takes more time and reasons deeper.

### "I want to skip this sub-project for now"

```
Skip sub-project #X. Mark it as deferred to v6.1. Move to next sub-project.
```

### "I want to redo the design"

```
The current design for sub-project #X doesn't work. Use
superpowers:brainstorming to re-brainstorm from scratch. Throw out the
prior spec.
```

### "Show me what was decided so far"

```
Read all design specs in docs/superpowers/specs/ and give me a summary
table of every locked decision across all sub-projects.
```

### "Where are we?"

```
Where are we? Show: current sub-project, current PR, % complete, what's
next.
```

### "I'm worried about X"

```
I'm worried about <specific concern>. Analyze the design decisions made
so far and tell me if this concern is addressed. If not, propose a fix.
```

### "Pause everything, I need to think"

```
Pause. Commit work-in-progress, push, and give me 3 bullets on current
state. I'll be back later.
```

### "Something broke and I don't know what"

```
Something is broken. Run pre-flight (Part 3 of implementation guide).
Show me everything that's not in expected state. Don't try to fix
anything yet.
```

---

## Files Claude reads at the start of every session

Memorize these — if Claude isn't reading them, remind it:

| File | Why |
|---|---|
| `docs/v6-information-package.md` | Facts about BMAD/bmad-builder/v3 state |
| `docs/v6-rdp-implementation-guide.md` | Operations manual + kickoff prompts |
| `docs/HOW-TO-USE-V6-DOCS.md` | This file (your guide) — Claude may also reference it |
| Recent commits on current branch | What was done recently |
| Active design specs in `docs/superpowers/specs/` | What's been decided |
| `external/bmad-method/` and `external/bmad-builder/` | Verify claims against source |

---

## Estimated total effort (your time, not Claude's)

| Phase | Your time | Claude's time |
|---|---|---|
| Phase 1: RDP setup | 30 min | — |
| Phase 2: First session (kb-canonicalize brainstorm + design) | 1-2 hours | 1-2 hours |
| Phase 3: kb-canonicalize implementation (3-5 sessions) | 3-6 hours | 6-10 hours |
| Phase 3: sub-projects 2-6 (8-10 sessions) | 6-8 hours | 16-25 hours |
| Phase 4: Pauses + resumes | — | — |
| Phase 5: Stepping in | scattered | — |
| Phase 6: Release engineering | 1 hour | 1-2 hours |
| **Total** | **~12-18 hours over 2-3 weeks** | **~25-40 hours** |

**Your involvement is mostly:**
- Approving decisions in brainstorming (1-2 hours)
- Reviewing design specs (~30 min each = 3 hours total)
- Reviewing PRs at key moments (4-6 hours total)
- Resolving the few escalations Claude can't handle (1-2 hours total)

Most of the heavy lifting is Claude's; your job is steering + approval gates.

---

## Things to remember

1. **Pre-flight every session** — even if you think it's fine
2. **Read what Claude writes** — especially when it asks for approval
3. **Push back when something feels wrong** — Claude will adapt
4. **Use the word "ultrathink"** when a decision needs deep reasoning
5. **Don't approve destructive ops without reading what's being deleted**
6. **`npm test` should always pass before merging a PR**
7. **`main` is sacred** — never push to main without explicit "yes push main"
8. **The 3 personas are Atlas, Nova, Kai — not 14 like v3**
9. **`kb/` is the source of truth — frontmatter is the registry**
10. **When in doubt, ask Claude to read `docs/v6-information-package.md` and verify**

---

## When you finish v6

After `v6.0.0` is tagged and the BMB registry PR is merged:

1. **Update CLAUDE.md** at the repo root to describe v6 architecture (replaces v2 description)
2. **Archive old v3 docs** to `docs/archive/v3-history/`
3. **Write a blog post / announcement** if you want public visibility
4. **Plan v6.1 milestone** for any deferred work (TEST-MIGRATION-BACKLOG, etc.)

---

## Help — if Claude is being weird

| Symptom | What to type |
|---|---|
| Claude isn't reading the v6 docs | "Read docs/v6-information-package.md and docs/v6-rdp-implementation-guide.md before continuing" |
| Claude is reinventing something BMAD already ships | "Check external/bmad-method/src/core-skills/ and bmm-skills/ first. Does any existing BMAD skill do this?" |
| Claude wants to add a 4th persona | "Stick to 3 personas: Atlas/Nova/Kai. The 11 specialists were noise in v3. Don't repeat." |
| Claude is maintaining a CSV | "kb is the source of truth via frontmatter. CSVs are generated, not authored." |
| Claude is building tool adapters (Cursor, Claude Code, MCP, npm) | "BMAD's --tools flag handles 47 platforms. We ship one BMAD module. No side-channel adapters." |
| Claude is force-pushing | "Stop. Force-push requires my explicit approval." |
| Claude pushed to main without approval | "Stop. Revert. Never push to main without my explicit 'yes push main'." |
| Claude is going off-script | "Stop. Read docs/v6-rdp-implementation-guide.md. We're following that manual." |

---

*Last updated: 2026-05-11. Update as v6 work proceeds.*
