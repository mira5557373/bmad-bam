# P2.1 — bmad-bam-platform MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Promote `bmad-bam-platform` from Wave 0 skeleton to a usable MVP: realize §7.6 activation Path A (npm postinstall) end-to-end in a real BMAD install, promote Atlas from Wave-0 stub to full persona, deliver `design-tenancy-model` as the first invokable CEV workflow producing a real artifact, ratify Plan C (LLM-side activation) per Wave 0's deferred verification.

**Architecture:** Build on Wave 0's `src-v6/bmad-bam-platform/` skeleton. Add `package.json` with npm `postinstall` hook (per §7.6 Path A). Replace Atlas Wave-0 stub `customize.toml` with full persona definition. Build one complete workflow skill following BMAD v6.6.0's `[workflow]` namespace convention (per spec §7.1 v0.5 patch). Ship 5 supporting fragments + 3 patterns + 1 quality gate + 3 standards. Add real-install end-to-end test (`tests/p2/run-real-install-test.sh`) that exercises `bmad install bmad-bam-platform` from a fresh BMAD project and verifies the sentinel-replacement scheme reaches LLM context.

**Tech Stack:** bash, Python 3.11+, Markdown, YAML, TOML (same as Wave 0). Adds: npm + Node.js for the postinstall mechanism. Adds: a real BMAD-initialized fixture project under `tests/p2/fixtures/real-bmad-project/` for end-to-end test.

---

## File Structure

Files created or modified in this plan:

### Activation mechanism (Path A realization)

- Create: `src-v6/bmad-bam-platform/package.json` — npm wrapper declaring postinstall hook
- Modify: `src-v6/bmad-bam-platform/scripts/post-install.sh` — accept `cwd` invocation from npm context
- Create: `src-v6/bmad-bam-platform/INSTALL.md` — documents Path A + Path B fallback
- Create: `tests/p2/INVESTIGATION-NOTES.md` — Task 0 findings on how `bmad install` triggers npm

### Atlas full persona

- Modify: `src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/customize.toml` — keep current overlay; document it as smoke-test-only
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/customize.toml` — full Atlas overlay for the design-tenancy-model skill (`[workflow]` namespace)
- Modify: `src-v6/bmad-bam-platform/module.yaml` — expand `agents:` block with Atlas's full description; keep `x-bam-*` metadata

### design-tenancy-model workflow skill

- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/SKILL.md`
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/bmad-skill-manifest.yaml`
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/workflow.md`
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/steps/step-01-c-elicit-context.md`
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/steps/step-02-c-load-options.md`
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/steps/step-03-c-decision-matrix.md`
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/steps/step-04-c-recommendation.md`
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/steps/step-05-c-write-design.md`
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/steps/step-06-c-record-adr.md`
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/steps/step-07-v-verify-completeness.md`
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/templates/tenancy-model.md.template`
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/tests/smoke-test.sh`

### Supporting knowledge (Atlas's resources)

- Create: `src-v6/bmad-bam-platform/agents/atlas/resources/fragments/tenancy-decision-framework.md`
- Create: `src-v6/bmad-bam-platform/agents/atlas/resources/fragments/rls-deep-dive.md`
- Create: `src-v6/bmad-bam-platform/agents/atlas/resources/fragments/schema-per-tenant.md`
- Create: `src-v6/bmad-bam-platform/agents/atlas/resources/fragments/cell-based-architecture.md`
- Create: `src-v6/bmad-bam-platform/agents/atlas/resources/fragments/tenant-isolation-testing-patterns.md`
- Modify: `src-v6/bmad-bam-platform/agents/atlas/resources/platform-index.csv` — add 5 new fragment rows

### Patterns

- Create: `src-v6/bmad-bam-platform/data/patterns/rls-row-level-security.md`
- Create: `src-v6/bmad-bam-platform/data/patterns/schema-per-tenant-with-pgbouncer.md`
- Create: `src-v6/bmad-bam-platform/data/patterns/cell-based-with-routing.md`

### Quality gate + standards

- Create: `src-v6/bmad-bam-platform/data/checklists/QG-M2.md`
- Create: `src-v6/bmad-bam-platform/data/standards/std-frontmatter.md`
- Create: `src-v6/bmad-bam-platform/data/standards/std-validation.md`
- Create: `src-v6/bmad-bam-platform/data/standards/std-adr.md`

### Real-install end-to-end test (Plan C ratification)

- Create: `tests/p2/run-real-install-test.sh`
- Create: `tests/p2/fixtures/real-bmad-project/` (real BMAD-initialized fixture; not a fake)
- Create: `tests/p2/lib/probe-llm-context.sh` — helper that invokes a live Claude session to verify sentinel-equivalent reaches activation context

### Memory + ADRs

- Create: `_bmad/_memory/atlas/runtime-preferences.md` (template; populated by user)
- Create: `_bmad/_memory/atlas/integration-history.md` (template)
- Create: `_bmad/_memory/atlas/architecture-decisions/2026-05-12-002-activation-path-selected.md`
- Create: `_bmad/_memory/atlas/architecture-decisions/2026-05-12-003-p2-mvp-scope.md`
- Modify: `_bmad/_memory/atlas/architecture-decisions/INDEX.md`

### Documentation

- Modify: `src-v6/bmad-bam-platform/README.md` — reflect P2.1 scope
- Modify: `tests/wave-0/WAVE-0-OUTCOME.md` — annotate Plan C ratification status

---

## Task 0: Investigate how `bmad install bmad-bam-<module>` triggers npm (or doesn't)

**Why first:** §7.6 declared Path A (npm postinstall) the default activation mechanism, but this was a planning decision, not an empirical one. P2.1's success depends on `bmad install` actually invoking npm under the hood. If it doesn't, we fall back to Path B (manual finalize) and document the regression.

**Files:**
- Read: `external/bmad-method/tools/installer/core/installer.js` (deeper read than Wave 0)
- Read: `external/bmad-method/tools/installer/commands/install.js`
- Read: `external/bmad-method/docs/how-to/install-modules.md` (if exists)
- Search: any reference to `npm`, `package.json`, `postinstall`, `child_process`, `spawn` in installer code
- Create: `tests/p2/INVESTIGATION-NOTES.md` (records findings)

- [x] **Step 1: Search installer code for npm/package.json references**

Run:
```bash
grep -rn -E "npm|package\.json|postinstall|child_process|spawn|exec" \
  external/bmad-method/tools/installer/ | grep -v -E "node_modules|test" | head -40
```

Expected: lines showing how (or whether) the installer invokes npm. If no hits, BMAD doesn't use npm — Path A doesn't work and we need Path B.

- [x] **Step 2: Search for how modules get materialized into the target project**

Run:
```bash
grep -rn -E "_installModule|installModule|copyModule|materialize" \
  external/bmad-method/tools/installer/ | head -20
```

Expected: lines showing the function that takes a module source and copies/installs it into a project. Read that function.

- [x] **Step 3: Read the relevant install function**

Identify the function name from Step 2. Read it via:
```bash
cat external/bmad-method/tools/installer/core/installer.js | grep -A 50 "<function-name>" | head -80
```

Determine:
- Does it `exec`/`spawn` npm at any point?
- Does it just `cp -r` the source directory?
- Does it run any postinstall-like hook from any source (package.json scripts? module.yaml? a convention file?)?

- [x] **Step 4: Check if BMAD itself has a `postinstall`-equivalent mechanism**

Run:
```bash
grep -rn -E "post.?install|postInstall|after.?install|onInstall|hook" \
  external/bmad-method/tools/installer/ | head -30
```

If hits exist, read the context — BMAD may have its own hook mechanism we missed in Wave 0.

- [x] **Step 5: Determine viability of Path A vs need for Path B**

Decision tree:

- If BMAD invokes `npm install` on the module → **Path A viable.** Continue with package.json + postinstall.
- If BMAD doesn't use npm but has its own hook mechanism → **Path D (new)**: use BMAD's native hook. Document.
- If BMAD does neither → **Path A unviable**; fall back to Path B (manual `bmad-bam-finalize` workflow).

- [x] **Step 6: Write the investigation notes**

Create `tests/p2/INVESTIGATION-NOTES.md`:

```markdown
# P2.1 — BMAD Module Install Investigation

## BMAD version under test
- Version: <X.Y.Z> (from external/bmad-method/package.json)

## How `bmad install bmad-bam-<module>` materializes a module
- Mechanism: <copy | npm install | custom>
- Evidence: <file:line refs>

## Does BMAD honor npm postinstall hooks?
- Verdict: <yes | no | partial>
- Evidence: <file:line refs>

## Does BMAD have a native module-install hook mechanism?
- Verdict: <yes | no>
- If yes: <name + how to opt in>
- Evidence: <file:line refs>

## Activation path selected for P2.1
- Path: <A | B | D (custom)>
- Rationale: <why>

## Implications for P2.1 plan
- <if Path A: continue per plan>
- <if Path B: replace Task 1 with manual-finalize workflow build>
- <if Path D: redesign Task 1 around BMAD's native hook>
```

- [x] **Step 7: Commit**

```bash
git add tests/p2/INVESTIGATION-NOTES.md
git commit -m "$(cat <<'EOF'
chore(p2): document how bmad install materializes modules; select activation path

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 1: Add npm postinstall mechanism (if Task 0 confirms Path A)

_Path A invalidated by Task 0; this task was re-shaped to Path B. See `tests/p2/INVESTIGATION-NOTES.md` § "Implications for P2.1 plan". Original Step 1 (`package.json`) is OBSOLETE; the work below is what was actually done._

**Branch on Task 0:** if Path A is NOT viable, skip this task and jump to the Path-B variant (documented in Task 0's notes; you'll need to author it).

**Files:**
- Create: `src-v6/bmad-bam-platform/package.json`
- Modify: `src-v6/bmad-bam-platform/scripts/post-install.sh` — accept current-working-directory invocation

- [x] **Step 1: Write package.json**

Create `src-v6/bmad-bam-platform/package.json`:

```json
{
  "name": "bmad-bam-platform",
  "version": "0.2.0",
  "description": "BAM v6 Platform Module — multi-tenant SaaS foundation; activation hook via npm postinstall (per spec §7.6 Path A)",
  "private": true,
  "scripts": {
    "postinstall": "./scripts/post-install.sh \"${INIT_CWD:-$PWD}\"",
    "test": "tests/wave-0-style-smoke.sh"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

Notes on this file:
- `private: true` — never published to npm registry; we use npm only for the postinstall mechanism
- `INIT_CWD` is npm's standard environment variable identifying the directory where `npm install` was invoked; fallback to `$PWD` for non-npm invocations
- `version` bumps to 0.2.0 (Wave 0 was 0.1.0)

- [x] **Step 2: Modify post-install.sh to honor `INIT_CWD` invocation**

The current `post-install.sh` takes `<project-root>` as $1. When invoked via npm postinstall, $1 will be `${INIT_CWD:-$PWD}` (the directory where `bmad install` was run). Verify this is correct.

Read `src-v6/bmad-bam-platform/scripts/post-install.sh` and confirm the existing argument handling works for this case. If $1 is the directory containing `_bmad/config.toml`, the script already handles it correctly. No code changes likely needed.

If a discrepancy exists, fix by adjusting the path resolution.

- [x] **Step 3: Test npm postinstall locally**

Run:
```bash
WORK_DIR="$(mktemp -d)"
cp -r tests/wave-0/fixtures/test-bmad-project/. "$WORK_DIR/"
cp -r src-v6/bmad-bam-platform "$WORK_DIR/.bam-test-source"
cd "$WORK_DIR/.bam-test-source"
INIT_CWD="$WORK_DIR" npm install --no-package-lock 2>&1 | tail -10
ls -la "$WORK_DIR/_bmad/platform/" 2>&1
cd - >/dev/null
rm -rf "$WORK_DIR"
```

Expected: `npm install` triggers postinstall; postinstall script runs; `_bmad/platform/project-context.md` appears in WORK_DIR. If not, debug before committing.

- [x] **Step 4: Commit**

```bash
git add src-v6/bmad-bam-platform/package.json
# Only add post-install.sh if it actually changed
git diff --stat src-v6/bmad-bam-platform/scripts/post-install.sh
git add src-v6/bmad-bam-platform/scripts/post-install.sh 2>/dev/null || true
git commit -m "$(cat <<'EOF'
feat(p2): add npm postinstall activation per §7.6 Path A

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Promote Atlas to full persona via per-skill customize.toml

**Files:**
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/customize.toml`

**Note:** Atlas's persona is defined per-skill in BMAD v6.6.0 (each skill's customize.toml contains an `[agent]` or `[workflow]` block with persona overlays). We'll write the full Atlas overlay in the design-tenancy-model skill (Task 7 below); this task documents the convention and sets the foundation.

For this task, we'll just verify the existing `smoke-test/customize.toml` (from Wave 0 remediation) is consistent with the convention, and document the persona pattern in the standards file (Task 4).

- [x] **Step 1: Re-read the smoke-test customize.toml as reference**

Run: `cat src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/customize.toml`

Note its shape: `[agent]` block with `role`, `identity`, `communication_style`, `principles`, `persistent_facts`, `[[agent.menu]]` entries.

This is the template for Atlas's persona overlays in ALL his skills. Each skill gets its own customize.toml with persona overlay tuned to that skill's menu.

_Verified 2026-05-12: smoke-test customize.toml has all required keys (role, identity, communication_style, principles, persistent_facts with universal-glob, [[agent.menu]] entries ST + SI). Shape matches the template described above._

- [x] **Step 2: Note the namespace rule**

`smoke-test` uses `[agent]` (it's an agent menu skill). `design-tenancy-model` will use `[workflow]` (it's a CEV workflow skill). The `persistent_facts` line must appear in WHICHEVER block matches the skill type, per spec §7.1.

No code change in this task — proceeds to Task 4 (standards) then Task 7 (build the design-tenancy-model customize.toml).

- [x] **Step 3: Commit a marker file documenting the convention**

Append to `src-v6/bmad-bam-platform/agents/atlas/resources/platform-index.csv` (no change yet; we'll add fragment rows in Task 11). Skip git commit for this task.

---

## Task 3: Expand module.yaml `agents:` block with full Atlas description

**Files:**
- Modify: `src-v6/bmad-bam-platform/module.yaml`

- [x] **Step 1: Read current module.yaml `agents:` block**

Run: `awk '/^agents:/,/^[a-zA-Z]/' src-v6/bmad-bam-platform/module.yaml | head -20`

- [x] **Step 2: Replace with full Atlas registration**

Edit the `agents:` block in `src-v6/bmad-bam-platform/module.yaml`. Replace the current entry with:

```yaml
agents:
  - code: bmad-bam-agent-atlas
    name: Atlas
    title: Platform Architect
    icon: "🏛️"
    team: bam-platform
    description: "Multi-tenant SaaS platform architect. Holds up the platform sky — RLS strategy, modular monolith decomposition, tenant tier modeling, FinOps. Speaks like a structural engineer at a whiteboard: load-bearing decisions first, every gate explicit. Owns QG-F1 (Foundation), QG-M1 (Module Architecture), QG-M2 (Tenant Isolation), QG-DA1 (Data Architecture)."
```

- [x] **Step 3: Verify module.yaml still parses**

Run:
```bash
python3 -c "import yaml; m = yaml.safe_load(open('src-v6/bmad-bam-platform/module.yaml')); print('OK:', m['agents'][0]['name'])"
```

Expected: `OK: Atlas`

- [x] **Step 4: Commit**

```bash
git add src-v6/bmad-bam-platform/module.yaml
git commit -m "$(cat <<'EOF'
feat(p2): expand module.yaml agents block with full Atlas description

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Build standards files (std-frontmatter, std-validation, std-adr)

**Files:**
- Create: `src-v6/bmad-bam-platform/data/standards/std-frontmatter.md`
- Create: `src-v6/bmad-bam-platform/data/standards/std-validation.md`
- Create: `src-v6/bmad-bam-platform/data/standards/std-adr.md`

These three standards are family-wide (per spec §6.6). Live in platform's data/standards/ and synced to `_bmad/bam/standards/` on install (in a future task).

- [x] **Step 1: Write std-frontmatter.md**

Create `src-v6/bmad-bam-platform/data/standards/std-frontmatter.md`:

```markdown
---
id: std-frontmatter
title: BAM Fragment / Pattern Frontmatter Standard
category: standard
kind: fragment
qg_ref: null
last_reviewed: 2026-05-12
version: 1.0.0
status: active
author: atlas
references: ["docs/v6-final-architecture.md#62-fragment--pattern-frontmatter-schema"]
tested-against: []
---

# Frontmatter Standard

All BAM fragments and patterns MUST have YAML frontmatter with these 10 fields.

## Required fields

| Field | Type | Purpose |
|---|---|---|
| `id` | kebab-case string | Unique identifier; referenced from CSV index and cross-refs |
| `title` | string | Human-readable title for indexes and search |
| `category` | string | Grouping for navigation (e.g., `tenant-isolation`, `ai-runtime`) |
| `kind` | enum | `pattern` / `anti-pattern` / `fragment` |
| `qg_ref` | string or null | Quality gate the artifact informs (e.g., `QG-M2`) |
| `last_reviewed` | ISO date (YYYY-MM-DD) | When content was last reviewed; drives §6.8 staleness |
| `version` | semver | Major = breaking decision change; minor = additions; patch = wording |
| `status` | enum | `active` / `deprecated` / `experimental` |
| `author` | persona code or `community` | Who maintains this artifact |
| `references` | array of strings | External citations (URLs, doc paths) |
| `tested-against` | array of {platform, verified} objects | Platforms where the pattern was empirically verified, with verification dates |

## Validation

Every fragment/pattern file MUST be parseable by `python3 -c "import yaml; yaml.safe_load(open(f).read().split('---')[1])"`. CI enforces this.

## Updates

When a fragment's content changes:
- Bump `version` per the rules above
- Update `last_reviewed`
- Add entries to `tested-against` if newly verified against a platform
- Update `status` if deprecating or marking experimental
```

- [x] **Step 2: Write std-validation.md**

Create `src-v6/bmad-bam-platform/data/standards/std-validation.md`:

```markdown
---
id: std-validation
title: BAM verify-* Workflow Output Standard
category: standard
kind: fragment
qg_ref: null
last_reviewed: 2026-05-12
version: 1.0.0
status: active
author: atlas
references: ["docs/v6-final-architecture.md#8-quality-gates--release-gates"]
tested-against: []
---

# Validation Output Standard

All `verify-*` workflows MUST emit evidence in this format. Stored in `_bmad/bam/evidence/<gate-id>/YYYY-MM-DD-NNN/`.

## Required files per run

| File | Purpose | Schema |
|---|---|---|
| `criteria-met.md` | Per-criterion pass/fail/waived with evidence pointers | See §criteria-met schema |
| `decision.md` | Final outcome + signer (human or AI persona) | See §decision schema |

## Optional files

| File | When |
|---|---|
| `artifacts/` directory | If supporting docs (test reports, logs) need to live alongside |
| `retrospective.md` | Optional learnings; recommended after blocking-fail recovery |

## `criteria-met.md` schema

YAML frontmatter (required):
```yaml
gate_id: QG-M2
verified_at: <ISO-8601 UTC>
verified_by: <persona code or user>
auto_checkable_pct: <int 0-100>
human_review_pct: <int 0-100>
result: pass | fail | waived
```

Body (required sections):
- `## Criteria summary` — table of criteria with pass/fail/waived per item
- `## Evidence` — pointers to artifacts/, external logs, test runs

## `decision.md` schema

YAML frontmatter (required):
```yaml
gate_id: QG-M2
decided_at: <ISO-8601 UTC>
decided_by: <persona code or user>
outcome: pass | fail | waived
```

Body (required sections):
- `## Outcome rationale` — why this outcome
- `## Conditions` — any conditional pass; what must hold for the pass to remain valid
- `## Next gate` — what gate (if any) is unblocked by this decision
```

- [x] **Step 3: Write std-adr.md**

Create `src-v6/bmad-bam-platform/data/standards/std-adr.md`:

```markdown
---
id: std-adr
title: BAM Architecture Decision Record Standard
category: standard
kind: fragment
qg_ref: null
last_reviewed: 2026-05-12
version: 1.0.0
status: active
author: atlas
references: ["docs/v6-final-architecture.md#43-sidecar-memory--adr-directory-format"]
tested-against: []
---

# ADR Standard (MADR-lite)

All ADRs MUST follow this format. One ADR per file. Append-only. Files live at:

```
_bmad/_memory/<persona>/architecture-decisions/<YYYY-MM-DD>-<NNN>-<title-kebab-case>.md
```

## Frontmatter (required, 11 fields)

```yaml
---
id: 2026-05-12-002
title: Activation Path A (npm postinstall) selected for v6.0
status: accepted              # proposed | accepted | superseded | deprecated
date: 2026-05-12
persona: atlas
related-personas: []          # other personas materially involved
modules: [bmad-bam-platform]  # affected modules
supersedes: null              # ADR id that this supersedes
superseded-by: null           # ADR id that supersedes this
assumptions: []               # bullet list; explicit assumptions made
dependencies-on-other-decisions: []  # array of ADR ids this depends on
generated-by: claude-opus-4-7        # AI model that drafted; null if user-written
authored-by: user             # user | <persona> | collaborative
---
```

## Body sections (required, in order)

```markdown
## Context

What we're deciding and why now. 2-5 sentences. Cite triggering events.

## Decision

What we picked. Be concrete; reference specific options.

## Consequences

What this means downstream. Both positive and negative. Cite affected modules / workflows.

## Alternatives Considered

What we rejected and why. Each alternative gets 1-2 sentences.
```

## Supersession

To supersede an existing ADR:
1. Create a new ADR file with the next sequential NNN
2. In the new ADR's frontmatter, set `supersedes: <old-id>`
3. Edit the old ADR's frontmatter: `status: superseded`, `superseded-by: <new-id>`
4. Add a note in the old ADR's body: "Superseded — see <new-id>"

Never delete an ADR. Sidecar memory is append-only.

## INDEX.md

Each persona's `architecture-decisions/` directory has an `INDEX.md`:

```markdown
# <Persona> — Architecture Decisions Index

| ID | Title | Status | Date |
|---|---|---|---|
| 2026-05-11-001 | Wave 0 plan selected | accepted | 2026-05-11 |
| 2026-05-12-002 | Activation Path A selected | accepted | 2026-05-12 |
```

`record-decision` workflow maintains INDEX.md automatically.
```

- [x] **Step 4: Verify all three parse as YAML frontmatter**

Run:
```bash
for f in src-v6/bmad-bam-platform/data/standards/std-*.md; do
  python3 -c "import yaml,sys; yaml.safe_load(open(sys.argv[1]).read().split('---')[1]); print('OK:', sys.argv[1])" "$f"
done
```

Expected: 3 "OK:" lines.

- [x] **Step 5: Commit**

```bash
git add src-v6/bmad-bam-platform/data/standards/
git commit -m "$(cat <<'EOF'
feat(p2): add family-wide standards (std-frontmatter, std-validation, std-adr)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Build QG-M2 (Tenant Isolation) quality gate checklist

**Files:**
- Create: `src-v6/bmad-bam-platform/data/checklists/QG-M2.md`

Per spec §8.1, QG-M2 is criticality=blocking, depends-on=[QG-F1, QG-M1].

- [x] **Step 1: Write the gate checklist**

Create `src-v6/bmad-bam-platform/data/checklists/QG-M2.md`:

```markdown
---
id: QG-M2
title: Tenant Isolation
module: bmad-bam-platform
phase: solutioning
criticality: blocking
depends-on: [QG-F1, QG-M1]
evidence-depends-on:
  - QG-F1/tenancy-decision.md
  - QG-M1/criteria-met.md
auto-checkable: 50
human-review: 50
last_reviewed: 2026-05-12
version: 1.0.0
status: active
---

# QG-M2 — Tenant Isolation

## Purpose

Verify that the chosen tenancy model (decided at QG-F1) is correctly implemented at the module-architecture level: tenant context propagates through all code paths, isolation tests exist and pass, and no cross-tenant leakage is possible by construction.

## Criteria

### Automatable (machine-checkable, 50%)

- **C1 — Tenant isolation tests exist** — Test suite has a dedicated tenant-isolation directory or tagged suite. Evidence: directory listing or test-tag query.
- **C2 — RLS policies present (if RLS chosen)** — All tenant-scoped tables have `ENABLE ROW LEVEL SECURITY` + policy. Evidence: schema introspection or migration grep.
- **C3 — Schema isolation present (if schema-per-tenant chosen)** — Connection pool routes by tenant; per-tenant schemas created on onboarding. Evidence: connection pool config + onboarding workflow inspection.
- **C4 — Cell-routing present (if cell-based chosen)** — Tenant → cell routing exists at gateway; intra-cell communication forbidden by network policy. Evidence: gateway config + network policy YAML.
- **C5 — Tenant-context-propagation linter passes** — Static analysis flags any DB query missing tenant context. Evidence: linter run output.

### Human-review (50%)

- **H1 — Tenant-isolation threat model exists** — Document enumerates attack vectors (SQL injection at tenant boundary, IDOR via session swap, cache-key collision, vector-DB cross-tenant retrieval, KV-cache cross-tenant residue). Each vector has a mitigation. Evidence: threat-model.md in design docs.
- **H2 — Onboarding/offboarding flow preserves isolation** — Reviewer confirms tenant lifecycle workflows don't introduce isolation gaps (e.g., shared resources during tenant creation). Evidence: design-tenant-onboarding output + reviewer sign-off.
- **H3 — Noisy-neighbor mitigation specified** — Quotas, rate limits, and fair-use enforcement defined per tenant tier. Evidence: design-rate-limit-per-tenant output.
- **H4 — Disaster recovery preserves isolation** — DR plan doesn't introduce isolation gaps (e.g., backup-restore-from-tenant-A-into-tenant-B). Evidence: design-disaster-recovery output (if QG-D1 ran).
- **H5 — Tenant onboarding has explicit "isolation-verified" step** — Onboarding workflow includes a check that newly-created tenant cannot see other tenants' data. Evidence: design-tenant-onboarding output step listing.

## **CRITICAL** — these must always pass for blocking-gate satisfaction

- C2/C3/C4 (whichever applies to the chosen tenancy model) MUST pass auto-check
- H1 (threat model) MUST exist and be reviewer-approved

## Pass conditions

- ALL criteria pass OR
- Some criteria waived via `waive-gate` workflow with compensating control documented

## Evidence destination

`_bmad/bam/evidence/QG-M2/YYYY-MM-DD-NNN/` with `criteria-met.md` + `decision.md` per `std-validation`.

## Web Research Queries (for refresh-knowledge)

- `multi-tenant SaaS isolation patterns {date}`
- `PostgreSQL RLS performance multi-tenant {date}`
- `cell-based architecture AWS {date}`
- `tenant isolation testing strategies {date}`
```

- [x] **Step 2: Commit**

```bash
git add src-v6/bmad-bam-platform/data/checklists/QG-M2.md
git commit -m "$(cat <<'EOF'
feat(p2): add QG-M2 (Tenant Isolation) quality gate checklist

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Tasks 6–10: Build 5 supporting fragments

Each fragment task follows the same pattern. Steps shown in detail for Task 6 (`tenancy-decision-framework`); subsequent fragment tasks (7–10) follow the same shape with content adapted per fragment.

### Task 6: Build `tenancy-decision-framework.md` fragment

**Files:**
- Create: `src-v6/bmad-bam-platform/agents/atlas/resources/fragments/tenancy-decision-framework.md`

- [x] **Step 1: Write the fragment**

Create the file with required frontmatter (per `std-frontmatter`) and required body sections (per spec §6.3). Target length: 400-500 lines.

Required sections (write substantive content for each):

- **Frontmatter** — id: `tenancy-decision-framework`; title: "Tenancy Model Decision Framework"; category: `tenant-isolation`; kind: `fragment`; qg_ref: `QG-M2`; last_reviewed: 2026-05-12; version: 1.0.0; status: active; author: atlas; references: [Stripe blog on multi-tenant, AWS Well-Architected SaaS lens]; tested-against: []
- **## When to Use** — at minimum 3 specific conditions where this framework applies (e.g., "user is choosing initial tenancy model for a greenfield SaaS")
- **## When NOT to Use** — at minimum 3 anti-conditions (e.g., "tenancy already chosen and >1000 tenants exist — migration is a different workflow")
- **## Decision Inputs** — table of inputs the framework consumes: tenant_count_projection_12mo, compliance_frameworks, scale_target_segment, blast_radius_tolerance, ops_team_size, cost_ceiling_per_tenant
- **## Decision Tree** — ASCII flowchart leading from inputs to recommendation (RLS / schema-per-tenant / cell-based / hybrid)
- **## Output Specification** — what artifact the design-tenancy-model workflow produces using this framework: tenancy-model.md design doc with sections (chosen model, rationale, migration-path-if-needed, isolation-tests-required, ops-runbook-implications)
- **## Trade-offs** — decision matrix table with rows = options, columns = tenant-count-fit, cost, isolation-strength, migration-cost-to-next, ops-complexity
- **## Quality Checks** — including at least one `**CRITICAL:**` item (e.g., `**CRITICAL:** verify no cross-tenant data path exists in the recommended option's threat model`)
- **## Web Research Queries** — with `{date}` placeholder: e.g., `multi-tenant SaaS tenancy model selection {date}`, `RLS vs schema vs cell benchmarks {date}`
- **## Cross-references** — to `rls-deep-dive`, `schema-per-tenant`, `cell-based-architecture`, `tenant-isolation-testing-patterns` fragments + `rls-row-level-security`, `schema-per-tenant-with-pgbouncer`, `cell-based-with-routing` patterns

Write substantive content (not stubs). Each section should be 30-100 lines.

- [x] **Step 2: Validate frontmatter**

Run:
```bash
python3 -c "import yaml,sys; yaml.safe_load(open(sys.argv[1]).read().split('---')[1])" \
  src-v6/bmad-bam-platform/agents/atlas/resources/fragments/tenancy-decision-framework.md && echo "OK"
```

Expected: `OK`.

- [x] **Step 3: Verify required sections present**

Run:
```bash
for section in "When to Use" "When NOT to Use" "Decision Inputs" "Decision Tree" \
               "Output Specification" "Trade-offs" "Quality Checks" \
               "Web Research Queries" "Cross-references"; do
  grep -q "^## $section" src-v6/bmad-bam-platform/agents/atlas/resources/fragments/tenancy-decision-framework.md \
    && echo "OK: $section" || echo "MISSING: $section"
done
```

Expected: 9 "OK:" lines.

- [x] **Step 4: Verify CRITICAL marker present**

Run:
```bash
grep -q "\*\*CRITICAL:\*\*" \
  src-v6/bmad-bam-platform/agents/atlas/resources/fragments/tenancy-decision-framework.md \
  && echo "OK: CRITICAL marker present" || echo "MISSING"
```

Expected: `OK: CRITICAL marker present`.

- [x] **Step 5: Commit**

```bash
git add src-v6/bmad-bam-platform/agents/atlas/resources/fragments/tenancy-decision-framework.md
git commit -m "$(cat <<'EOF'
feat(p2): add tenancy-decision-framework fragment

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

### Task 7: Build `rls-deep-dive.md` fragment

Same pattern as Task 6. Content focus:
- **Frontmatter:** id `rls-deep-dive`; category `tenant-isolation`; kind `fragment`; qg_ref `QG-M2`; author `atlas`
- **Topic:** PostgreSQL Row-Level Security as a tenancy mechanism — when it works (small/mid tenant count, single-DB cost ceiling), failure modes (RLS bypass via SECURITY DEFINER functions, missed policies on new tables, performance cliff at high tenant count), specific PostgreSQL features (FORCE ROW LEVEL SECURITY, current_setting() pattern for tenant context, pg_policies introspection)
- **Sections (per std-frontmatter rules):** Same 9 sections as Task 6
- **CRITICAL item:** `**CRITICAL:** every new table must have RLS enabled AND a policy defined; migration discipline must enforce this`
- **Web queries:** `PostgreSQL RLS performance at scale {date}`, `RLS bypass attacks {date}`, `pg_policies introspection patterns {date}`
- **Cross-refs:** to `tenancy-decision-framework`, `rls-row-level-security` pattern, `tenant-isolation-testing-patterns`

Steps mirror Task 6. Commit message: `feat(p2): add rls-deep-dive fragment`.

- [x] **Step 1: Write the fragment** (389 lines; 9 H2 sections; real SQL snippet for ENABLE/FORCE RLS + CREATE POLICY)
- [x] **Step 2: Validate frontmatter** (python3 yaml.safe_load → OK)
- [x] **Step 3: Verify 9 required sections present** (When to Use, When NOT to Use, How RLS Works, Failure Modes, Operational Patterns, Trade-offs, Quality Checks, Web Research Queries, Cross-references)
- [x] **Step 4: Verify CRITICAL marker present**
- [x] **Step 5: Commit**

### Task 8: Build `schema-per-tenant.md` fragment

Content focus:
- **Topic:** Schema-per-tenant — when it fits (mid tenant count 100-500, regulated industries, larger per-tenant data volumes), failure modes (migration explosion N×schemas, connection pool exhaustion, ALTER overhead), specific tools (pgbouncer for connection pooling, dynamic schema routing libraries)
- **CRITICAL item:** `**CRITICAL:** schema migrations must run per-schema with idempotency + rollback; missed schemas = partial rollout = silent inconsistency`
- **Web queries:** `schema-per-tenant PostgreSQL {date}`, `pgbouncer multi-tenant routing {date}`, `schema migration tooling per-tenant {date}`
- **Cross-refs:** to `tenancy-decision-framework`, `schema-per-tenant-with-pgbouncer` pattern, `tenant-isolation-testing-patterns`

Steps mirror Task 6. Commit message: `feat(p2): add schema-per-tenant fragment`.

- [x] **Step 1: Write the fragment** (460 lines; 9 H2 sections; real SQL snippet for CREATE SCHEMA / GRANT / SET LOCAL search_path; pgbouncer.ini transaction-pool config snippet; per-tenant migration runner pseudocode)
- [x] **Step 2: Validate frontmatter** (python3 yaml.safe_load → OK)
- [x] **Step 3: Verify 9 required sections present** (When to Use, When NOT to Use, How Schema-Per-Tenant Works, Failure Modes, Operational Patterns, Trade-offs, Quality Checks, Web Research Queries, Cross-references)
- [x] **Step 4: Verify CRITICAL marker present**
- [x] **Step 5: Commit**

### Task 9: Build `cell-based-architecture.md` fragment

Content focus:
- **Topic:** Cell-based architecture — when it fits (>1000 tenants, blast-radius concerns, multi-region requirements), failure modes (cell-routing complexity, intra-cell shared resources, capacity planning per cell, cross-cell migrations are hard)
- **CRITICAL item:** `**CRITICAL:** tenant-to-cell mapping must be deterministic and stable; tenant migration between cells = significant operational event requiring runbook`
- **Web queries:** `cell-based architecture multi-tenant SaaS {date}`, `AWS cell-based reference architecture {date}`, `tenant routing at gateway {date}`
- **Cross-refs:** to `tenancy-decision-framework`, `cell-based-with-routing` pattern, design-disaster-recovery workflow (when QG-D1 ships)

Steps mirror Task 6. Commit message: `feat(p2): add cell-based-architecture fragment`.

- [x] **Step 1: Write the fragment** (521 lines; 9 H2 sections; ASCII cell topology diagram; Envoy gateway routing config snippet + Kubernetes NetworkPolicy YAML + Prometheus relabel config)
- [x] **Step 2: Validate frontmatter** (python3 yaml.safe_load → OK)
- [x] **Step 3: Verify 9 required sections present** (When to Use, When NOT to Use, How Cell-Based Architecture Works, Failure Modes, Operational Patterns, Trade-offs, Quality Checks, Web Research Queries, Cross-references)
- [x] **Step 4: Verify CRITICAL marker present**
- [x] **Step 5: Commit**

### Task 10: Build `tenant-isolation-testing-patterns.md` fragment

Content focus:
- **Topic:** Testing patterns specific to tenant isolation — fixture-per-tenant test setup, cross-tenant assertion (attempt to read tenant B's data while authenticated as tenant A, must fail), noisy-neighbor simulation (one tenant generates load, verify others unaffected), RLS bypass tests (try common bypass techniques)
- **CRITICAL item:** `**CRITICAL:** every tenancy model has its own bypass attempts; test suite must enumerate the model-specific attacks and assert all fail`
- **Web queries:** `multi-tenant isolation test patterns {date}`, `chaos engineering tenant isolation {date}`, `SaaS noisy neighbor testing {date}`
- **Cross-refs:** to all three other fragments + QG-M2 checklist

Steps mirror Task 6. Commit message: `feat(p2): add tenant-isolation-testing-patterns fragment`.

- [x] **Step 1: Write the fragment** (565 lines; 9 H2 sections; 9 concrete pytest snippets covering per-tenant fixture, polluted-state fixture, cross-tenant FK fixture, parametrized cross-tenant SELECT, RLS INSERT violation, noisy-neighbor latency, RLS bypass family — SECURITY DEFINER / SET ROLE / search_path / BYPASSRLS port — tenant lifecycle, Hypothesis property-based state machine)
- [x] **Step 2: Validate frontmatter** (python3 yaml.safe_load → OK)
- [x] **Step 3: Verify 9 required sections present** (When to Use, When NOT to Use, Fixture Patterns, Test Types, Tooling, Anti-Patterns, Quality Checks, Web Research Queries, Cross-references)
- [x] **Step 4: Verify CRITICAL marker present**
- [x] **Step 5: Commit**

---

## Tasks 11–13: Build 3 patterns

Each pattern is concrete decision-ready guidance. Shorter than fragments (200-400 lines). Same frontmatter (std-frontmatter rules) but `kind: pattern`.

### Task 11: Build `rls-row-level-security.md` pattern

**Files:**
- Create: `src-v6/bmad-bam-platform/data/patterns/rls-row-level-security.md`

Required frontmatter (per std-frontmatter):
```yaml
---
id: rls-row-level-security
title: PostgreSQL Row-Level Security for Tenant Isolation
category: tenant-isolation
kind: pattern
qg_ref: QG-M2
last_reviewed: 2026-05-12
version: 1.0.0
status: active
author: atlas
references:
  - "https://www.postgresql.org/docs/current/ddl-rowsecurity.html"
tested-against:
  - platform: "PostgreSQL 16"
    verified: 2026-05-12
---
```

Required body sections (per spec §6.3):
- **## When to Use** — tenant count <~1000, single-DB cost ceiling, blast-radius tolerant of shared schema
- **## When NOT to Use** — high tenant count (RLS performance cliff), strict per-tenant compliance isolation, large per-tenant data volumes requiring schema isolation
- **## Architecture** — YAML schema showing table structure with `tenant_id` + RLS policy; ASCII diagram showing query flow
- **## Trade-offs** — table: cost vs isolation strength vs migration complexity vs ops simplicity
- **## Implementation Patterns** — `SET LOCAL app.tenant_id = '<id>'` per-request; policy template; migration template
- **## Quality Checks** — including `**CRITICAL:** every tenant-scoped table MUST have RLS enabled AND a policy defined; CI MUST fail otherwise`
- **## Web Research Queries** — `{date}` placeholders for PostgreSQL RLS performance, RLS bypass, supabase/neon multi-tenant
- **## Cross-references** — to `rls-deep-dive` fragment, `tenancy-decision-framework` fragment, QG-M2 checklist, `tenant-isolation-testing-patterns` fragment

Target length: 250-350 lines.

- [x] **Step 1: Write the pattern** (360 lines; 8 H2 sections; ASCII query-flow diagram + YAML data-model schema + real SQL CREATE TABLE/POLICY snippet + migration template + linter bash + pgbouncer.ini snippet + BYPASSRLS / SECURITY DEFINER audit queries)
- [x] **Step 2: Validate frontmatter + sections** (python3 yaml.safe_load → OK; 8 H2 sections present; CRITICAL marker present)
- [x] **Step 3: Commit**

```bash
git add src-v6/bmad-bam-platform/data/patterns/rls-row-level-security.md
git commit -m "$(cat <<'EOF'
feat(p2): add rls-row-level-security pattern

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

### Task 12: Build `schema-per-tenant-with-pgbouncer.md` pattern

Same shape as Task 11. Topic: schema-per-tenant with pgbouncer for connection pooling. Specific implementation patterns:
- pgbouncer config with per-tenant pool
- Dynamic schema selection via `SET search_path`
- Migration runner that iterates over tenant schemas

CRITICAL: `**CRITICAL:** schema migrations must be transactionally per-schema; partial failures must rollback that schema, not the whole batch`.

Commit message: `feat(p2): add schema-per-tenant-with-pgbouncer pattern`.

- [x] **Step 1: Write the pattern** (376 lines; 8 H2 sections; connection-flow ASCII + 2-tenant namespace SQL example + real pgbouncer.ini with prepared-statement/LISTEN/advisory-lock caveats + onboarding SQL with template clone + per-request middleware + parallel migration runner pseudocode + offboarding SQL with backup-retention warning)
- [x] **Step 2: Validate frontmatter + sections** (8 H2 sections present; CRITICAL marker present in Quality Checks; frontmatter matches spec)
- [x] **Step 3: Commit**

### Task 13: Build `cell-based-with-routing.md` pattern

Same shape. Topic: cell-based architecture with tenant→cell routing at gateway. Specific patterns:
- Gateway-level tenant lookup (Redis lookup or JWT claim)
- Cell-isolation network policy (no intra-cell to other-cell traffic)
- Per-cell observability namespace

CRITICAL: `**CRITICAL:** cell migration tooling MUST be implemented before any second cell is provisioned; otherwise tenant relocation requires manual ops`.

Commit message: `feat(p2): add cell-based-with-routing pattern`.

- [x] **Step 1: Write the pattern** (446 lines; 8 H2 sections; ASCII routing-flow diagram + cell-control-plane vs data-plane explanation + Envoy Lua `lookup_cell` Redis-cache-with-catalog-DB-fallback + Envoy YAML with JWT-authn filter + Kubernetes default-deny NetworkPolicy + capacity-aware tenant-onboarding Python pseudocode + cell-split runbook summary)
- [x] **Step 2: Validate frontmatter + sections** (python3 yaml.safe_load → OK; 8 H2 sections present; CRITICAL marker present; 5 `{date}` placeholders in Web Research Queries)
- [x] **Step 3: Commit**

---

## Task 14: Update Atlas index CSV with all new fragments + patterns

**Files:**
- Modify: `src-v6/bmad-bam-platform/agents/atlas/resources/platform-index.csv`

- [x] **Step 1: Append new rows**

Open `src-v6/bmad-bam-platform/agents/atlas/resources/platform-index.csv`. Verify the header is:

```csv
id,name,description,tags,tier,fragment_file
```

If header differs, fix to match.

Append these rows (one per fragment/pattern):

```csv
tenancy-decision-framework,Tenancy Model Decision Framework,Inputs + decision tree to select RLS / schema-per-tenant / cell-based,"tenancy,decision,foundational",core,fragments/tenancy-decision-framework.md
rls-deep-dive,RLS Deep Dive,PostgreSQL Row-Level Security as tenancy mechanism; failure modes; tooling,"tenancy,rls,postgres",extended,fragments/rls-deep-dive.md
schema-per-tenant,Schema-Per-Tenant Deep Dive,Per-tenant schema isolation; pgbouncer routing; migration discipline,"tenancy,schema,postgres",extended,fragments/schema-per-tenant.md
cell-based-architecture,Cell-Based Architecture Deep Dive,Per-cell isolation; tenant-to-cell routing; cross-cell migration constraints,"tenancy,cell-based,scale",extended,fragments/cell-based-architecture.md
tenant-isolation-testing-patterns,Tenant-Isolation Testing Patterns,Fixture patterns; cross-tenant assertions; bypass attempts; noisy-neighbor simulation,"tenancy,testing,quality",core,fragments/tenant-isolation-testing-patterns.md
```

Patterns also get rows. Spec §6.4 says the CSV is for fragments primarily; patterns get auto-indexed via `_bmad/bam/docs/PATTERNS.md` (auto-generated). For now we'll keep fragment-only in `platform-index.csv`. Patterns will appear in family-wide docs in a future task.

- [x] **Step 2: Validate CSV parses**

Run:
```bash
python3 -c "
import csv
with open('src-v6/bmad-bam-platform/agents/atlas/resources/platform-index.csv') as f:
    rows = list(csv.DictReader(f))
print(f'OK: {len(rows)} fragments indexed')
for r in rows:
    print(f'  {r[\"id\"]} -> {r[\"fragment_file\"]}')"
```

Expected: 6 rows (sentinel + 5 new fragments).

- [x] **Step 3: Verify all referenced fragment files exist**

Run:
```bash
python3 -c "
import csv, os
base = 'src-v6/bmad-bam-platform/agents/atlas/resources/'
with open(base + 'platform-index.csv') as f:
    for r in csv.DictReader(f):
        p = base + r['fragment_file']
        print('OK' if os.path.isfile(p) else 'MISSING', '->', p)"
```

Expected: 6 "OK ->" lines.

- [x] **Step 4: Commit**

```bash
git add src-v6/bmad-bam-platform/agents/atlas/resources/platform-index.csv
git commit -m "$(cat <<'EOF'
feat(p2): index 5 new tenancy fragments in Atlas resources

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Tasks 15–22: Build `design-tenancy-model` workflow skill

This is the centerpiece deliverable of P2.1 — the first invokable BAM workflow that produces a real design artifact.

### Task 15: Build skill scaffolding (SKILL.md, manifest, workflow.md, customize.toml)

**Files:**
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/SKILL.md`
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/bmad-skill-manifest.yaml`
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/workflow.md`
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/customize.toml`

- [x] **Step 1: Write SKILL.md**

```markdown
---
name: bmad-bam-design-tenancy-model
description: "Facilitates the user picking a tenancy isolation model (RLS / schema-per-tenant / cell-based / hybrid) based on tenant count, compliance requirements, scale targets, and cost tolerance. Produces a tenancy-model.md design doc + an ADR. Owns gate QG-M2 (Tenant Isolation) — partial."
---

# bmad-bam-design-tenancy-model

## Purpose

Choose THE foundational tenancy isolation strategy for a multi-tenant SaaS product. Get this wrong and everything else compounds the cost. This workflow facilitates that choice.

## When to use

- Greenfield SaaS project; tenancy not yet chosen
- Brownfield product preparing to migrate tenancy model (use `analyze-existing-tenancy` first)
- Product expanding scale (e.g., from 100 tenants to 10,000) requiring re-evaluation

## Inputs

- Product brief or PRD documenting target customer segment
- Compliance framework selection (if known) — affects RLS eligibility for some controls
- 12-month tenant count projection
- Scale segment (SMB / mid-market / enterprise / consumer-via-tenants)

## Output

- `tenancy-model.md` — design doc placed under `{project-root}/docs/architecture/`
- ADR appended to `_bmad/_memory/atlas/architecture-decisions/`
- Evidence artifact for QG-M2 (partial; full QG-M2 requires module-architecture work)

## Steps

See `workflow.md` for the mode router and `steps/` for individual step files.
```

- [x] **Step 2: Write bmad-skill-manifest.yaml**

```yaml
name: bmad-bam-design-tenancy-model
description: "Facilitate tenancy-model decision; produce tenancy-model.md + ADR"
module: bmad-bam-platform
persona: atlas
version: 0.1.0

inputs:
  - artifact: product-brief.md
    required: false
    resolver: latest-in-docs
  - artifact: prd.md
    required: false
    resolver: latest-in-docs

outputs:
  - artifact: tenancy-model.md
    location: "{project-root}/docs/architecture/"
    required: true
  - sidecar: architecture-decisions/{date}-NNN-tenancy-model.md
    persona: atlas
    required: true
  - gate-evidence: QG-M2/tenancy-decision.md
    conditional: pass-only

execution_mode:
  default: assisted
  alternatives: [manual]

recommended_capabilities:
  - extended-thinking

minimum_persona_version: "0.1.0"
latency-budget: "45min"
cluster: foundation
```

- [x] **Step 3: Write workflow.md (mode router)**

```markdown
# bmad-bam-design-tenancy-model — Workflow Router

Create mode is the only mode in v0.1.0. Edit + Validate modes arrive in P2.2.

## Create mode

Sequential execution; assisted mode (default). Human-approval gates at decision points.

1. `steps/step-01-c-elicit-context.md` — gather inputs from user
2. `steps/step-02-c-load-options.md` — present options with trade-offs from fragments
3. `steps/step-03-c-decision-matrix.md` — score options against user's context
4. `steps/step-04-c-recommendation.md` — Atlas recommends + reasons
5. `steps/step-05-c-write-design.md` — produce tenancy-model.md
6. `steps/step-06-c-record-adr.md` — append ADR to Atlas's sidecar
7. `steps/step-07-v-verify-completeness.md` — gate evidence for QG-M2 (partial)
```

- [x] **Step 4: Write customize.toml (full Atlas overlay; [workflow] namespace per spec §7.1)**

```toml
# Full Atlas persona overlay for design-tenancy-model.
# Uses [workflow] namespace because this is a CEV workflow skill (not an
# agent menu skill). See docs/v6-final-architecture.md §7.1 v0.5 patch for
# the namespace rule.

[workflow]

activation_steps_append = [
  "Greet as Atlas — Platform Architect. Voice: structural engineer at a whiteboard.",
  "Confirm the user's product context before loading options. Don't generate content without input.",
]

# Universal-glob opt-in (per spec §7.1 + Task 0 risk #2 from Wave 0).
# Required for this skill to receive _bmad/<module>/project-context.md at activation.
persistent_facts = [
  "file:{project-root}/**/project-context.md",
]

role = "Facilitate the foundational tenancy-model decision: present options grounded in fragments, score against user's context, recommend with explicit trade-off reasoning, produce a design doc the rest of the architecture stack can build on."

identity = "Structural engineer's discipline: load-bearing decisions first, every trade-off explicit, no recommendation without empirical grounding in the user's specific context."

communication_style = "Concrete about inputs (tenant count, compliance, scale). Explicit about trade-offs (cost vs isolation vs migration debt). Honest about uncertainty (when fragments are stale or the situation is novel)."

principles = [
  "Decisions inform architecture — never reverse",
  "Trade-offs are explicit; no option is universally correct",
  "Migration cost between models is real; design for the model you can grow into",
  "Empirical inputs (real tenant projections) beat aspirational ones",
  "Threat-model the chosen option BEFORE writing the design doc",
]

# Atlas has access to all platform fragments + patterns via universal-glob.
# Specific fragments most relevant to this workflow:
foundational_fragments = [
  "tenancy-decision-framework",
  "rls-deep-dive",
  "schema-per-tenant",
  "cell-based-architecture",
  "tenant-isolation-testing-patterns",
]
```

- [x] **Step 5: Validate all 4 files parse correctly**

Run:
```bash
python3 -c "import yaml; m=yaml.safe_load(open('src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/bmad-skill-manifest.yaml')); print('manifest OK:', m['name'])"

# TOML check
python3 -c "
import tomllib
with open('src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/customize.toml','rb') as f:
    c = tomllib.load(f)
print('customize.toml OK: namespace =', list(c.keys()))
"
```

Expected:
- `manifest OK: bmad-bam-design-tenancy-model`
- `customize.toml OK: namespace = ['workflow']`

- [x] **Step 6: Commit**

```bash
git add src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/
git commit -m "$(cat <<'EOF'
feat(p2): scaffold design-tenancy-model skill (SKILL.md, manifest, workflow.md, customize.toml)

customize.toml uses [workflow] namespace per spec §7.1 v0.5 patch.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

### Task 16: Build step-01-c-elicit-context

**Files:**
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/steps/step-01-c-elicit-context.md`

- [x] **Step 1: Write the step file**

````markdown
---
step_id: 01-c-elicit-context
auto-runnable: false
gate: human-approval
inputs: []
outputs: [tenancy-context.json]
---

# Step 01 — Elicit context from user

## Purpose

Gather the empirical inputs that drive the tenancy-model decision. Without these, the recommendation is guesswork.

## Actions

Ask the user the following questions, one at a time. Wait for answers. Don't accept vague responses ("a lot" → ask for an order-of-magnitude estimate).

1. **Tenant count (12-month projection)** — how many separate customer organizations will you serve in the first 12 months?
   - <100 → enterprise segment indicator
   - 100-1000 → mid-market segment
   - 1000-100k → SMB segment
   - >100k → consumer-via-tenants
2. **Compliance frameworks** — list all that apply (GDPR, HIPAA, SOC2, PCI-DSS, ISO27001, EU AI Act, FedRAMP, FERPA, others)
3. **Per-tenant data volume estimate** — GB per tenant per year, order of magnitude
4. **Blast-radius tolerance** — if one tenant's data corrupts, how many other tenants are acceptable to also be affected? (0 = strict isolation; >0 = shared infra OK)
5. **Cost ceiling per tenant per month** — USD; sets the upper bound on per-tenant infra
6. **Ops team size** — how many people will operate this? (1 = solo, <5 = small team, >5 = team-of-teams)
7. **Multi-region requirement** — do tenants in different regions need data residency? (yes / no / future)
8. **Existing system?** — greenfield (no existing) or brownfield (existing system that needs migration)?

## Output

Write `{project-root}/_bmad/bam/cache/tenancy-design/{date}/tenancy-context.json`:

```json
{
  "elicited_at": "<ISO-8601 UTC>",
  "tenant_count_12mo": <int>,
  "tenant_segment": "enterprise|mid-market|smb|consumer",
  "compliance_frameworks": ["GDPR", "..."],
  "data_volume_per_tenant_gb_year": <int>,
  "blast_radius_tolerance": <int>,
  "cost_ceiling_per_tenant_usd_month": <int>,
  "ops_team_size": <int>,
  "multi_region": "yes|no|future",
  "greenfield_or_brownfield": "greenfield|brownfield"
}
```

## Gate

Human-approval gate. After eliciting, summarize the captured context back to the user. Confirm. If any input feels unstable, ask for refinement before advancing.

## Next step

`step-02-c-load-options.md`
````

- [x] **Step 2: Commit**

```bash
git add src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/steps/step-01-c-elicit-context.md
git commit -m "$(cat <<'EOF'
feat(p2): add design-tenancy-model step 01 — elicit context

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

### Task 17: Build step-02-c-load-options

**Files:**
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/steps/step-02-c-load-options.md`

- [x] **Step 1: Write the step file**

````markdown
---
step_id: 02-c-load-options
auto-runnable: true
gate: machine-checkable
inputs: [tenancy-context.json]
outputs: [options-loaded.json]
fragment_ref: tenancy-decision-framework
---

# Step 02 — Load and present options

## Purpose

Load the 4 tenancy-model options (RLS, schema-per-tenant, cell-based, hybrid) from fragments. Present each with its trade-offs to the user.

## Actions

1. Read the elicited context from `_bmad/bam/cache/tenancy-design/{date}/tenancy-context.json`.

2. Load the `tenancy-decision-framework` fragment from `_bmad/platform/agents/atlas/resources/fragments/tenancy-decision-framework.md` (via the universal-glob).

3. For each option, summarize:
   - **RLS** — Reference `rls-deep-dive` fragment + `rls-row-level-security` pattern. Note: lowest cost, weakest isolation, performance ceiling around 1000 tenants.
   - **Schema-per-tenant** — Reference `schema-per-tenant` fragment + `schema-per-tenant-with-pgbouncer` pattern. Note: stronger isolation, schema migration discipline overhead.
   - **Cell-based** — Reference `cell-based-architecture` fragment + `cell-based-with-routing` pattern. Note: scales to millions; intra-cell still shared; cell-migration is expensive.
   - **Hybrid** — Mix tiers (e.g., enterprise tier = dedicated DB; SMB tier = RLS). Note: highest complexity; only when tier model justifies it.

4. Present the 4 options to the user in a table with columns: option, best-fit-tenant-count, isolation-strength, cost-per-tenant-relative, migration-cost-to-next-option.

5. Ask user: "Any options to remove from consideration before the decision matrix?"

## Output

Write `{project-root}/_bmad/bam/cache/tenancy-design/{date}/options-loaded.json`:

```json
{
  "loaded_at": "<ISO-8601 UTC>",
  "options_considered": ["rls", "schema-per-tenant", "cell-based", "hybrid"],
  "options_eliminated_by_user": [],
  "fragment_loaded": "tenancy-decision-framework"
}
```

## Gate

Machine-checkable: verify file exists + options_considered has 1-4 entries + fragment_loaded matches.

## Next step

`step-03-c-decision-matrix.md`
````

- [x] **Step 2: Commit**

```bash
git add src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/steps/step-02-c-load-options.md
git commit -m "$(cat <<'EOF'
feat(p2): add design-tenancy-model step 02 — load options

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

### Task 18: Build step-03-c-decision-matrix

**Files:**
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/steps/step-03-c-decision-matrix.md`

- [x] **Step 1: Write the step file**

````markdown
---
step_id: 03-c-decision-matrix
auto-runnable: true
gate: machine-checkable
inputs: [tenancy-context.json, options-loaded.json]
outputs: [decision-matrix.json]
---

# Step 03 — Score options against context

## Purpose

Quantitative scoring: each option scored 1-5 on each dimension (tenant-count-fit, cost-fit, isolation-strength, migration-cost-fit, ops-complexity-fit). Highest total wins... usually. Final recommendation is Atlas's call (step 04), not the matrix's.

## Actions

For each remaining option, score on these 5 dimensions:

| Dimension | Score 1-5 source |
|---|---|
| **Tenant-count fit** | Compare elicited tenant_count_12mo to option's sweet-spot per fragment |
| **Cost fit** | Compare cost_ceiling_per_tenant to option's typical per-tenant cost |
| **Isolation strength** | Compare blast_radius_tolerance to option's isolation guarantees |
| **Migration cost from current** | If brownfield: penalize options requiring large migration. If greenfield: all = 5 |
| **Ops complexity fit** | Compare ops_team_size to option's ops overhead |

Compute total + identify any tie-breaker dimensions.

## Output

Write `{project-root}/_bmad/bam/cache/tenancy-design/{date}/decision-matrix.json`:

```json
{
  "scored_at": "<ISO-8601 UTC>",
  "matrix": {
    "rls": {
      "tenant-count-fit": <1-5>,
      "cost-fit": <1-5>,
      "isolation-strength": <1-5>,
      "migration-cost-fit": <1-5>,
      "ops-complexity-fit": <1-5>,
      "total": <sum>
    },
    "schema-per-tenant": { ... },
    "cell-based": { ... },
    "hybrid": { ... }
  },
  "ranked": ["rls", "cell-based", "schema-per-tenant", "hybrid"]
}
```

## Gate

Machine-checkable: each scored option has 5 dimensions + total = sum.

## Next step

`step-04-c-recommendation.md`
````

- [x] **Step 2: Commit**

```bash
git add src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/steps/step-03-c-decision-matrix.md
git commit -m "$(cat <<'EOF'
feat(p2): add design-tenancy-model step 03 — decision matrix

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

### Task 19: Build step-04-c-recommendation

**Files:**
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/steps/step-04-c-recommendation.md`

- [x] **Step 1: Write the step file**

````markdown
---
step_id: 04-c-recommendation
auto-runnable: false
gate: human-approval
inputs: [decision-matrix.json]
outputs: [recommendation.json]
---

# Step 04 — Atlas recommends + reasons

## Purpose

The matrix is a tool, not the decision. Atlas reads the matrix + context + applies judgment. The matrix top-ranked option is the default recommendation but Atlas may override when:

- A dimension carries disproportionate weight in context (e.g., HIPAA + healthcare → isolation-strength dominates)
- A specific failure mode of the top-ranked option is severe for this user (e.g., RLS performance ceiling vs aggressive growth projection)
- Migration path to a stronger option later is cheap, justifying picking the simpler option now

## Actions

1. Read decision-matrix.json + tenancy-context.json + load any relevant compliance fragments (Cipher's territory; reference if installed).

2. Construct a recommendation with:
   - **Recommended option** — name
   - **Confidence** — high / medium / low
   - **Primary reasoning** — 3-5 sentences citing specific context inputs
   - **Risks** — 2-3 specific risks of the recommendation
   - **Migration trigger** — what would force re-evaluation (e.g., "if tenant count exceeds 800, evaluate cell-based")
   - **Alternative considered** — 1-2 alternatives we explicitly rejected and why

3. Present to user for approval. If user disagrees, capture their reasoning + revise. **Atlas does not generate a recommendation the user has not approved**.

## Output

Write `{project-root}/_bmad/bam/cache/tenancy-design/{date}/recommendation.json`:

```json
{
  "recommended_at": "<ISO-8601 UTC>",
  "recommended_option": "<rls|schema-per-tenant|cell-based|hybrid>",
  "confidence": "<high|medium|low>",
  "primary_reasoning": "<3-5 sentences>",
  "risks": ["<risk 1>", "<risk 2>", "<risk 3>"],
  "migration_trigger": "<when to revisit this>",
  "alternatives_rejected": [
    {"option": "<name>", "reason": "<why rejected>"}
  ],
  "user_approved": true
}
```

## Gate

Human-approval. Never auto-runs; user must approve the recommendation explicitly.

## Next step

`step-05-c-write-design.md`
````

- [x] **Step 2: Commit**

```bash
git add src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/steps/step-04-c-recommendation.md
git commit -m "$(cat <<'EOF'
feat(p2): add design-tenancy-model step 04 — Atlas recommendation

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

### Task 20: Build step-05-c-write-design

**Files:**
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/steps/step-05-c-write-design.md`

- [x] **Step 1: Write the step file**

````markdown
---
step_id: 05-c-write-design
auto-runnable: true
gate: machine-checkable
inputs: [tenancy-context.json, recommendation.json]
outputs: [tenancy-model.md]
template_ref: tenancy-model.md.template
---

# Step 05 — Write the tenancy-model design doc

## Purpose

Produce a tenancy-model.md design doc using the template + inputs from prior steps. This is the artifact downstream architecture work depends on.

## Actions

1. Read template at `skills/bmad-bam-design-tenancy-model/templates/tenancy-model.md.template`.
2. Substitute placeholders with values from `tenancy-context.json` + `recommendation.json` + relevant fragments.
3. Write the populated doc to `{project-root}/docs/architecture/tenancy-model.md`.
4. Validate sections present per template.

## Output

`{project-root}/docs/architecture/tenancy-model.md` — the design doc. Schema:

- Frontmatter (yaml): id, title, status (`draft`), date, persona (`atlas`), workflow_run_id
- ## Decision: <chosen option> with confidence
- ## Context: paraphrase from tenancy-context.json
- ## Rationale: from recommendation.json primary_reasoning
- ## Architecture: per-option-specific section pulled from fragments (RLS schema, schema-per-tenant pgbouncer config, etc.)
- ## Risks + Mitigations
- ## Migration trigger
- ## Alternatives considered
- ## Quality gate references (links to QG-M2)
- ## Next steps (link to design-modular-monolith workflow + design-tenant-tier-model workflow)

## Gate

Machine-checkable: file exists at expected path + all 9 required sections present.

## Next step

`step-06-c-record-adr.md`
````

- [x] **Step 2: Commit**

```bash
git add src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/steps/step-05-c-write-design.md
git commit -m "$(cat <<'EOF'
feat(p2): add design-tenancy-model step 05 — write design doc

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

### Task 21: Build step-06-c-record-adr

**Files:**
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/steps/step-06-c-record-adr.md`

- [ ] **Step 1: Write the step file**

````markdown
---
step_id: 06-c-record-adr
auto-runnable: true
gate: machine-checkable
inputs: [recommendation.json, tenancy-model.md]
outputs: [<NNN>-tenancy-model.md ADR]
---

# Step 06 — Record ADR in Atlas's sidecar

## Purpose

Per spec §4.3, capture every architectural decision as an ADR. This step appends to Atlas's `architecture-decisions/` directory.

## Actions

1. Determine the next ADR sequential number:

```bash
ADR_DIR="{project-root}/_bmad/_memory/atlas/architecture-decisions"
LAST_NNN=$(ls -1 "$ADR_DIR" 2>/dev/null | grep -oE '^[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{3}' | sort | tail -1 | cut -d- -f4 | sed 's/^0*//')
NEXT_NNN=$(printf "%03d" $((${LAST_NNN:-0} + 1)))
TODAY=$(date -u +%Y-%m-%d)
ADR_FILE="$ADR_DIR/$TODAY-$NEXT_NNN-tenancy-model.md"
```

2. Write the ADR per `std-adr` standard. Populate from `recommendation.json` + `tenancy-model.md` frontmatter.

3. Update `architecture-decisions/INDEX.md` — append a row with new ADR.

## Output

`_bmad/_memory/atlas/architecture-decisions/YYYY-MM-DD-NNN-tenancy-model.md` with frontmatter:

```yaml
---
id: YYYY-MM-DD-NNN
title: <Chosen option> for tenant isolation
status: accepted
date: YYYY-MM-DD
persona: atlas
related-personas: []
modules: [bmad-bam-platform]
supersedes: null
superseded-by: null
assumptions:
  - <from tenancy-context.json: tenant_count_12mo etc>
dependencies-on-other-decisions: []
generated-by: <model id>
authored-by: collaborative
---
```

Body per std-adr: Context, Decision, Consequences, Alternatives Considered.

## Gate

Machine-checkable: ADR file exists, has valid frontmatter, INDEX.md updated.

## Next step

`step-07-v-verify-completeness.md`
````

- [ ] **Step 2: Commit**

```bash
git add src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/steps/step-06-c-record-adr.md
git commit -m "$(cat <<'EOF'
feat(p2): add design-tenancy-model step 06 — record ADR

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

### Task 22: Build step-07-v-verify-completeness + template

**Files:**
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/steps/step-07-v-verify-completeness.md`
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/templates/tenancy-model.md.template`

- [ ] **Step 1: Write step-07**

````markdown
---
step_id: 07-v-verify-completeness
auto-runnable: true
gate: machine-checkable
inputs: [tenancy-model.md, ADR]
outputs: [QG-M2-partial-evidence.md]
---

# Step 07 — Verify completeness + emit QG-M2 partial evidence

## Purpose

Emit partial evidence for QG-M2 (Tenant Isolation gate). This step verifies the design-time portion. QG-M2 also requires runtime verification which comes from later workflows (`design-multi-tenant-testing`).

## Actions

1. Verify `tenancy-model.md` has all required sections (per Task 20 schema).
2. Verify ADR file exists with valid frontmatter.
3. Verify INDEX.md was updated.
4. Emit partial QG-M2 evidence file noting which criteria are now satisfied (H1 threat model from tenancy-model.md content; H5 onboarding implications outlined).
5. Emit retrospective note: which assumptions in the design depend on inputs that should be re-verified at QG-P1 (Production Readiness).

## Output

Write `{project-root}/_bmad/bam/evidence/QG-M2/YYYY-MM-DD-NNN/criteria-met-partial.md` per std-validation:

```markdown
---
gate_id: QG-M2
verified_at: <ISO>
verified_by: atlas
auto_checkable_pct: 0
human_review_pct: 30
result: pass-partial
---

## Criteria summary

| Criterion | Status | Evidence |
|---|---|---|
| H1 threat model | pass | docs/architecture/tenancy-model.md ## Risks |
| H5 onboarding implications | pass | docs/architecture/tenancy-model.md ## Migration trigger |
| C1-C5 + H2-H4 | deferred | Requires design-multi-tenant-testing, design-modular-monolith, design-tenant-onboarding workflows |

## Evidence

- docs/architecture/tenancy-model.md
- _bmad/_memory/atlas/architecture-decisions/<id>-tenancy-model.md
- _bmad/bam/cache/tenancy-design/<date>/* (intermediate cache)
```

## Gate

Machine-checkable: evidence file exists + frontmatter parses + auto_checkable_pct + human_review_pct sum reasonable.

## Workflow complete

`bmad-bam-design-tenancy-model` Create mode done.
````

- [ ] **Step 2: Write the template**

Create `src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/templates/tenancy-model.md.template`:

```markdown
---
id: tenancy-model
title: "{{project_name}} — Tenancy Model"
status: draft
date: "{{today}}"
persona: atlas
workflow_run_id: "{{run_id}}"
---

# Tenancy Model — {{project_name}}

## Decision

**Chosen model:** {{recommended_option}}
**Confidence:** {{confidence}}

## Context

Tenant count projection (12mo): {{tenant_count_12mo}} ({{tenant_segment}} segment)
Compliance frameworks: {{compliance_frameworks}}
Per-tenant data volume: ~{{data_volume_per_tenant_gb_year}} GB/year
Blast-radius tolerance: {{blast_radius_tolerance}}
Cost ceiling per tenant: ${{cost_ceiling_per_tenant_usd_month}}/month
Ops team size: {{ops_team_size}}
Multi-region: {{multi_region}}
Greenfield/brownfield: {{greenfield_or_brownfield}}

## Rationale

{{primary_reasoning}}

## Architecture

{{architecture_section_for_chosen_option}}

(Pulled from the matching fragment: rls-deep-dive / schema-per-tenant / cell-based-architecture.)

## Risks + Mitigations

{{risks}}

| Risk | Mitigation |
|---|---|
| {{risk_1}} | {{mitigation_1}} |
| {{risk_2}} | {{mitigation_2}} |
| {{risk_3}} | {{mitigation_3}} |

## Migration trigger

{{migration_trigger}}

## Alternatives considered

{{alternatives_rejected_table}}

## Quality gate references

- [QG-M2 — Tenant Isolation](../../_bmad/platform/data/checklists/QG-M2.md) — partial evidence emitted by this workflow; full satisfaction requires design-multi-tenant-testing + design-modular-monolith + design-tenant-onboarding

## Next steps

After this design is approved:

1. Run `bmad-bam-design-modular-monolith` to decompose the product into bounded contexts (input to QG-M1)
2. Run `bmad-bam-design-tenant-tier-model` to define tier structure (drives subsequent isolation refinement)
3. Run `bmad-bam-design-multi-tenant-testing` to define the isolation test suite (drives full QG-M2)
```

- [ ] **Step 3: Commit**

```bash
git add src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/steps/step-07-v-verify-completeness.md \
        src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/templates/tenancy-model.md.template
git commit -m "$(cat <<'EOF'
feat(p2): add design-tenancy-model step 07 + design template

Workflow complete: 7 steps + template.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 23: Workflow smoke test

**Files:**
- Create: `src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/tests/smoke-test.sh`

This is a non-LLM smoke test verifying the workflow's machinery (step files exist, templates parse, manifests validate). LLM-dependent behavior is verified in the real-install end-to-end test (Task 25).

- [ ] **Step 1: Write the test**

```bash
#!/usr/bin/env bash
# Smoke test for bmad-bam-design-tenancy-model workflow.
# Verifies the skill's machinery: file presence, manifest validity, template parses.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../../.." && pwd)"
SKILL_DIR="$REPO_ROOT/src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model"

echo ">>> smoke-test: bmad-bam-design-tenancy-model"

# 1. Required files present
REQUIRED=(
    "SKILL.md"
    "bmad-skill-manifest.yaml"
    "customize.toml"
    "workflow.md"
    "templates/tenancy-model.md.template"
)
for f in "${REQUIRED[@]}"; do
    [ -f "$SKILL_DIR/$f" ] || { echo "FAIL: missing $f"; exit 1; }
    echo "    [present] $f"
done

# 2. Step files present
for n in 01 02 03 04 05 06 07; do
    matches=$(ls "$SKILL_DIR/steps/step-$n-"* 2>/dev/null | wc -l)
    [ "$matches" -ge 1 ] || { echo "FAIL: missing step-$n-*"; exit 1; }
    echo "    [present] steps/step-$n-*"
done

# 3. Manifest parses + has correct module
python3 -c "
import yaml, sys
m = yaml.safe_load(open('$SKILL_DIR/bmad-skill-manifest.yaml'))
assert m['module'] == 'bmad-bam-platform', f'module mismatch: {m[\"module\"]}'
assert m['persona'] == 'atlas', f'persona mismatch: {m[\"persona\"]}'
print(f'    [valid] manifest: {m[\"name\"]}')
"

# 4. customize.toml parses + uses [workflow] namespace + has universal-glob
python3 -c "
import tomllib
with open('$SKILL_DIR/customize.toml','rb') as f:
    c = tomllib.load(f)
assert 'workflow' in c, '[workflow] block missing'
pf = c['workflow'].get('persistent_facts', [])
assert any('project-context.md' in p for p in pf), 'universal-glob missing from persistent_facts'
print('    [valid] customize.toml: [workflow] namespace + universal-glob present')
"

# 5. Each step file has frontmatter that parses
for step in "$SKILL_DIR"/steps/step-*.md; do
    python3 -c "
import yaml, sys
content = open(sys.argv[1]).read()
parts = content.split('---', 2)
assert len(parts) >= 3, f'no frontmatter in {sys.argv[1]}'
fm = yaml.safe_load(parts[1])
required = ['step_id', 'auto-runnable', 'gate']
missing = [k for k in required if k not in fm]
assert not missing, f'missing frontmatter keys {missing} in {sys.argv[1]}'
" "$step"
done
echo "    [valid] all 7 step files have required frontmatter"

# 6. Template has Handlebars-style placeholders
grep -q "{{.*}}" "$SKILL_DIR/templates/tenancy-model.md.template" \
    || { echo "FAIL: template missing placeholders"; exit 1; }
echo "    [valid] template has placeholders"

echo ">>> PASS: smoke test"
```

- [ ] **Step 2: Make executable**

```bash
chmod +x src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/tests/smoke-test.sh
```

- [ ] **Step 3: Run the smoke test**

```bash
src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/tests/smoke-test.sh
```

Expected output: many `[present]` / `[valid]` lines + `>>> PASS: smoke test`. If any FAIL, fix the underlying issue (likely a missed required field in frontmatter or a template without placeholders) before committing.

- [ ] **Step 4: Commit**

```bash
git add src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/tests/smoke-test.sh
git commit -m "$(cat <<'EOF'
test(p2): add design-tenancy-model workflow smoke test

Verifies skill machinery; LLM-dependent behavior tested in real-install E2E (Task 25).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 24: Sidecar memory templates

**Files:**
- Create: `_bmad/_memory/atlas/runtime-preferences.md`
- Create: `_bmad/_memory/atlas/integration-history.md`

These are templates that get populated as the project evolves. Empty templates with section structure committed now.

- [ ] **Step 1: Write runtime-preferences.md template**

```markdown
# Atlas — Runtime Preferences

Project-specific defaults and preferences that override fragment-level recommendations. Persona refers to this whenever a workflow's default would conflict.

## Database

- Primary RDBMS: <postgres | mysql | other>
- Version: <e.g. 16>
- Pooler: <pgbouncer | rds proxy | none>

## Infrastructure

- Primary cloud: <aws | gcp | azure | hybrid | self-host>
- IaC: <terraform | pulumi | cdk | other>
- Deployment: <kubernetes | ecs | fargate | other>

## Observability stack

- Traces: <otel + jaeger | otel + tempo | datadog | honeycomb | other>
- Logs: <loki | elastic | cloudwatch | other>
- Metrics: <prometheus | datadog | other>

## Notes

Atlas reads this file at session start and adjusts recommendations accordingly. If unset, Atlas asks the user before making infra-specific suggestions.
```

- [ ] **Step 2: Write integration-history.md template**

```markdown
# Atlas — Integration History

Convergence outcomes from cross-module integration design (Kai's territory). Atlas references this when revising platform decisions that touch integration boundaries.

## Entries

(No entries yet. Integration history populates as `verify-convergence` workflow runs.)

| Date | Source ADR | Outcome | Notes |
|---|---|---|---|
```

- [ ] **Step 3: Commit**

```bash
git add _bmad/_memory/atlas/runtime-preferences.md \
        _bmad/_memory/atlas/integration-history.md
git commit -m "$(cat <<'EOF'
feat(p2): seed Atlas sidecar memory templates (runtime-preferences, integration-history)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 25: Real-install end-to-end test (Plan C ratification)

**Files:**
- Create: `tests/p2/run-real-install-test.sh`
- Create: `tests/p2/fixtures/real-bmad-project/` directory (a real BMAD-initialized project)
- Create: `tests/p2/lib/probe-llm-context.sh` (helper to verify sentinel-equivalent reaches LLM)

This test runs `bmad install bmad-bam-platform` against a real BMAD project (not just a fixture with config.toml). If Task 0 confirmed Path A (npm postinstall), the post-install runs automatically; if Path B (manual finalize), the test exercises the manual step.

The test then probes whether the LLM at activation actually loads project-context.md — the Plan C ratification ask from Wave 0.

- [ ] **Step 1: Create a real BMAD-initialized fixture**

Run (on a developer machine):

```bash
mkdir -p tests/p2/fixtures
cd tests/p2/fixtures
# Use BMAD's actual setup workflow if available
# Otherwise mimic by copying the bare minimum a real BMAD install creates
# This step requires running `bmad-bmb-setup` or equivalent — document the exact command used
```

Document the exact steps you took in `tests/p2/fixtures/real-bmad-project/SETUP-NOTES.md`.

- [ ] **Step 2: Write probe-llm-context.sh**

Create `tests/p2/lib/probe-llm-context.sh`:

```bash
#!/usr/bin/env bash
# Probes whether a live Claude session loads the project-context.md sentinel.
#
# This is the manual portion of the Plan C ratification ask from Wave 0.
# Cannot fully automate without a live LLM invocation; this script orchestrates
# a manual user step.

set -euo pipefail

PROJECT_ROOT="$1"
SENTINEL="$2"

cat <<EOF

═══════════════════════════════════════════════════════════════════════
PLAN C — MANUAL LLM-SIDE VERIFICATION

The headless tests prove:
  1. project-context.md exists at $PROJECT_ROOT/_bmad/platform/
  2. universal-glob string survives merge into target skills
  3. file contains sentinel: $SENTINEL

We still need to verify the LLM at activation actually loads it.

DO THIS NOW (on your workstation):
  1. cd $PROJECT_ROOT
  2. Open a Claude Code session (claude or claude code)
  3. Invoke any BMAD core skill that should have the universal-glob, e.g.:
       /bmad bmad-create-architecture
  4. After the skill activates, ask Claude:
       "What sentinel token do you see in your loaded project context?"
  5. Claude should respond with the sentinel: $SENTINEL

If Claude returns the sentinel → PASS (Plan C verified).
If Claude does NOT return the sentinel → FAIL — universal-glob doesn't
  actually load files at activation in your setup; escalate.

After completing the manual verification, record outcome in
WAVE-0-OUTCOME.md and tests/p2/PLAN-C-RATIFICATION.md.

═══════════════════════════════════════════════════════════════════════
EOF
```

- [ ] **Step 3: Write run-real-install-test.sh**

Create `tests/p2/run-real-install-test.sh`:

```bash
#!/usr/bin/env bash
# Real-install end-to-end test for P2.1.
# Exercises `bmad install bmad-bam-platform` against a real BMAD-initialized
# fixture project; then invokes manual probe for Plan C ratification.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
FIXTURE="$REPO_ROOT/tests/p2/fixtures/real-bmad-project"
SOURCE="$REPO_ROOT/src-v6/bmad-bam-platform"

WORK_DIR="$(mktemp -d)"
trap 'echo ">>> WORK_DIR retained at $WORK_DIR for inspection (rm -rf to clean)"' EXIT

cp -r "$FIXTURE/." "$WORK_DIR/"
echo ">>> WORK_DIR=$WORK_DIR"

# Install per Task 0's selected path (A: npm postinstall; B: manual finalize)
case "${P2_ACTIVATION_PATH:-A}" in
  A)
    echo ">>> Path A: copying module + running npm install"
    cp -r "$SOURCE" "$WORK_DIR/.bam-source"
    cd "$WORK_DIR/.bam-source"
    INIT_CWD="$WORK_DIR" npm install --no-package-lock 2>&1 | tail -5
    cd - >/dev/null
    ;;
  B)
    echo ">>> Path B: copying module + running manual finalize"
    cp -r "$SOURCE/." "$WORK_DIR/_bmad/platform-source/"
    bash "$WORK_DIR/_bmad/platform-source/scripts/post-install.sh" "$WORK_DIR"
    ;;
  *)
    echo "ERROR: unknown P2_ACTIVATION_PATH=$P2_ACTIVATION_PATH" >&2
    exit 1
    ;;
esac

# Verify post-install ran
if [ ! -f "$WORK_DIR/_bmad/platform/project-context.md" ]; then
    echo "FAIL: project-context.md not generated" >&2
    exit 1
fi

SENTINEL=$(grep -oE 'BAM_LOAD_VERIFY_[a-f0-9]{32}' "$WORK_DIR/_bmad/platform/project-context.md" | head -1)
echo ">>> Sentinel: $SENTINEL"

# Prompt manual LLM probe (Plan C ratification)
bash "$REPO_ROOT/tests/p2/lib/probe-llm-context.sh" "$WORK_DIR" "$SENTINEL"

echo ">>> Headless portion PASS. Manual LLM probe pending."
echo ">>> Record outcome in tests/p2/PLAN-C-RATIFICATION.md when done."
```

- [ ] **Step 4: Make executable + run headless portion**

```bash
chmod +x tests/p2/run-real-install-test.sh tests/p2/lib/probe-llm-context.sh
tests/p2/run-real-install-test.sh
```

Expected: headless portion completes; manual probe instructions printed; WORK_DIR retained for inspection.

- [ ] **Step 5: Perform manual LLM probe**

Follow the instructions printed by probe-llm-context.sh. Record the outcome (sentinel returned by LLM or not) in a new file:

Create `tests/p2/PLAN-C-RATIFICATION.md`:

```markdown
# Plan C Ratification — P2.1

**Date:** <YYYY-MM-DD>
**BMAD version:** <X.Y.Z>
**Activation path used:** <A | B>
**Sentinel:** <token>

## Manual probe procedure

(per `tests/p2/lib/probe-llm-context.sh`)

1. Opened Claude Code session in `<WORK_DIR>`
2. Invoked `<skill>`
3. Asked: "What sentinel token do you see in your loaded project context?"
4. Claude responded: `<paste response>`

## Outcome

- [ ] PASS: Claude returned the sentinel token (LLM-side activation verified)
- [ ] FAIL: Claude did NOT return the sentinel token (LLM-side activation broken)

## Implications

If PASS: §7 activation contract holds end-to-end. P2.2+ can proceed with confidence.
If FAIL: escalate. Universal-glob string survives merge but LLM doesn't actually load files; mechanism redesign needed.
```

- [ ] **Step 6: Commit**

```bash
git add tests/p2/
git commit -m "$(cat <<'EOF'
test(p2): real-install end-to-end + manual Plan C ratification

Headless portion automated; LLM-side probe is manual per Plan C design
(spec §7.3 acknowledges this is by-design untestable headlessly).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 26: Annotate Wave 0 outcome with Plan C status

**Files:**
- Modify: `tests/wave-0/WAVE-0-OUTCOME.md`

- [ ] **Step 1: Append a P2.1 ratification section**

Add a new section at the end of `tests/wave-0/WAVE-0-OUTCOME.md`:

```markdown
---

## P2.1 Update — Plan C Ratification (YYYY-MM-DD)

Plan C (LLM-side activation contract verification) was performed during P2.1 implementation. Outcome recorded in `tests/p2/PLAN-C-RATIFICATION.md`.

- Outcome: <PASS | FAIL>
- Implications for P2.2+: <referenced from ratification doc>
```

- [ ] **Step 2: Commit**

```bash
git add tests/wave-0/WAVE-0-OUTCOME.md
git commit -m "$(cat <<'EOF'
docs(p2): annotate WAVE-0-OUTCOME with Plan C ratification result

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 27: Update module README for P2.1 scope

**Files:**
- Modify: `src-v6/bmad-bam-platform/README.md`

- [ ] **Step 1: Rewrite the README**

Update `src-v6/bmad-bam-platform/README.md`:

```markdown
# bmad-bam-platform

> **Status:** P2.1 MVP (post-Wave-0). One usable workflow + activation mechanism realized.

The platform foundation module of the BAM v6 family. Owns multi-tenant SaaS platform foundation: tenancy isolation, modular monolith decomposition, deployment topology, FinOps, tenant tier modeling, billing/tax/rate-limiting.

## What ships in P2.1

- **Activation mechanism (§7.6 Path A)** — npm postinstall hook. `bmad install bmad-bam-platform` (or `npm install`) automatically runs `scripts/post-install.sh` to generate `_bmad/platform/project-context.md` for universal-glob auto-load.
- **Atlas full persona** — voice, role, identity, principles, menu. Lives in each skill's customize.toml (per BMAD convention).
- **One complete workflow** — `bmad-bam-design-tenancy-model` (7 steps + template). Produces tenancy-model.md design doc + ADR + partial QG-M2 evidence.
- **5 supporting fragments** — tenancy-decision-framework, rls-deep-dive, schema-per-tenant, cell-based-architecture, tenant-isolation-testing-patterns.
- **3 patterns** — rls-row-level-security, schema-per-tenant-with-pgbouncer, cell-based-with-routing.
- **1 quality gate checklist** — QG-M2 Tenant Isolation.
- **3 family-wide standards** — std-frontmatter, std-validation, std-adr.
- **Sidecar memory templates** — runtime-preferences.md, integration-history.md (in `_bmad/_memory/atlas/`).
- **End-to-end real-install test** — `tests/p2/run-real-install-test.sh` + manual Plan C ratification.

## What does NOT ship in P2.1

- 15 of 16 platform workflows (deferred to P2.2, P2.3, ...)
- 11 cross-family workflows (deferred to P2.3)
- Other 7 BAM modules (data, ai, rag, integration, trust, ops, ux — separate plans)
- MCP server (deferred to P2.x)
- Customize-templates for BMAD core skills (deferred to P2.x)
- Anti-patterns library (deferred to P2.x)

## Install

```bash
bmad install bmad-bam-platform
# OR
cd src-v6/bmad-bam-platform && npm install
```

Either triggers `scripts/post-install.sh` (per §7.6 Path A).

## Use

```bash
@Atlas
# OR
bmad bmad-bam-design-tenancy-model
```

Runs the design-tenancy-model workflow; produces tenancy-model.md.

## Smoke test

```bash
src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/tests/smoke-test.sh
```

Verifies machinery; doesn't invoke LLM.

## Next

P2.2: 2 more tenancy workflows (modular-monolith + tier-model) + cross-family record-decision workflow.
```

- [ ] **Step 2: Commit**

```bash
git add src-v6/bmad-bam-platform/README.md
git commit -m "$(cat <<'EOF'
docs(p2): update bmad-bam-platform README for P2.1 MVP scope

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 28: Record P2.1 outcome ADRs in Atlas's sidecar

**Files:**
- Create: `_bmad/_memory/atlas/architecture-decisions/<YYYY-MM-DD>-002-activation-path-selected.md`
- Create: `_bmad/_memory/atlas/architecture-decisions/<YYYY-MM-DD>-003-p2-mvp-scope.md`
- Modify: `_bmad/_memory/atlas/architecture-decisions/INDEX.md`

- [ ] **Step 1: Write ADR 002 — activation path selected**

Create `_bmad/_memory/atlas/architecture-decisions/<TODAY>-002-activation-path-selected.md`:

```markdown
---
id: <YYYY-MM-DD>-002
title: Activation Path <A|B> selected for v6.0
status: accepted
date: <YYYY-MM-DD>
persona: atlas
related-personas: []
modules: [bmad-bam-platform, bmad-bam-data, bmad-bam-ai, bmad-bam-ux]
supersedes: null
superseded-by: null
assumptions:
  - <from Task 0 INVESTIGATION-NOTES: how BMAD materializes modules>
  - Plan C ratification PASSed (or specify if FAILed)
dependencies-on-other-decisions:
  - <previous-date>-001-wave-0-plan-selected
generated-by: claude-opus-4-7
authored-by: collaborative
---

## Context

§7.6 of the spec listed three viable activation paths (A: npm postinstall, B: manual finalize, D: upstream BMAD hook). P2.1 Task 0 empirically determined which one is viable.

## Decision

Path <A|B> selected. <Reasoning from Task 0 findings>.

## Consequences

All v6.0+ BAM modules use this same activation mechanism. <List specific implications>.

## Alternatives Considered

(Per spec §7.6, paths A/B/D were considered. <Why the others were rejected>.)
```

- [ ] **Step 2: Write ADR 003 — P2.1 scope**

Create `_bmad/_memory/atlas/architecture-decisions/<TODAY>-003-p2-mvp-scope.md`:

```markdown
---
id: <YYYY-MM-DD>-003
title: P2.1 MVP scope — activation + Atlas + 1 workflow
status: accepted
date: <YYYY-MM-DD>
persona: atlas
related-personas: []
modules: [bmad-bam-platform]
supersedes: null
superseded-by: null
assumptions:
  - P2.2-P2.5 will deliver remaining platform workflows incrementally
dependencies-on-other-decisions:
  - <YYYY-MM-DD>-002
generated-by: claude-opus-4-7
authored-by: collaborative
---

## Context

The bmad-bam-platform module has 16 workflows + 11 cross-family workflows + extensive knowledge architecture. P2 as a whole is too large for one plan; needs decomposition into MVP slices.

## Decision

P2.1 scope = activation + Atlas full persona + design-tenancy-model workflow (with supporting fragments/patterns/gate) + Plan C ratification. ~28 tasks, ~30-50h.

## Consequences

P2.2-P2.5 add platform workflows incrementally. v6.0 ships when all of P2.x complete.

## Alternatives Considered

- One large P2 plan covering all 16 workflows — rejected, too large for one plan per writing-plans skill guidance
- Split by capability area (foundation / lifecycle / FinOps / migration) — rejected, would leave activation unverified for too long
```

- [ ] **Step 3: Update INDEX.md**

Edit `_bmad/_memory/atlas/architecture-decisions/INDEX.md` to add 2 new rows:

```markdown
| <YYYY-MM-DD>-002 | Activation Path <A|B> selected for v6.0 | accepted | <YYYY-MM-DD> |
| <YYYY-MM-DD>-003 | P2.1 MVP scope — activation + Atlas + 1 workflow | accepted | <YYYY-MM-DD> |
```

- [ ] **Step 4: Commit**

```bash
git add _bmad/_memory/atlas/architecture-decisions/
git commit -m "$(cat <<'EOF'
feat(p2): record activation-path + P2.1-scope ADRs in Atlas sidecar

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Self-Review

Spec coverage check against `docs/v6-final-architecture.md` v0.5:

- §7.6 Path A realization — covered by Tasks 0, 1, 25 (investigation + npm postinstall + real-install test)
- §7.1 `[workflow]` namespace usage — covered by Task 15 (design-tenancy-model customize.toml uses `[workflow]`)
- §6.1 per-module directory shape — covered by Tasks 4 (standards), 6-10 (fragments), 11-13 (patterns), 15-22 (skill)
- §6.2 frontmatter (10 fields) — codified in Task 4 (std-frontmatter), enforced in Tasks 6-13
- §4.3 ADR format — codified in Task 4 (std-adr), used in Tasks 21, 28
- §5.1 platform workflow #1 (design-tenancy-model) — covered by Tasks 15-22
- §8.1 QG-M2 gate — covered by Task 5
- §4.1 Atlas voice — applied in Task 15's customize.toml

Gaps (intentional, recorded for P2.2+):
- Other 15 platform workflows — P2.2-P2.4
- Cross-family workflows — P2.3
- MCP server — P2.x
- Customize-templates inventory — P2.x
- Anti-patterns library — P2.x
- Other 7 BAM modules — separate plans (P3-P7)

Placeholder scan: searched for "TBD/TODO/FIXME" — only legitimate use is per-task content where the task explicitly says "write substantive content" (the agent fills in body content following the outline). Fragment/pattern body content is intentionally outlined rather than written verbatim because 5 fragments × 400-500 lines = 2000+ lines of content beyond what the plan should embed.

Type consistency:
- `tenancy-context.json` schema consistent across Tasks 16, 17, 18, 19
- `recommendation.json` schema consistent across Tasks 19, 20, 21
- ADR frontmatter consistent with std-adr (Task 4) usage in Tasks 21, 28
- Customize.toml namespace correctly `[workflow]` for design-tenancy-model (Task 15) vs `[agent]` for smoke-test (Wave 0)

Branch-on-Task-0:
- Tasks 1, 25 explicitly branch on Task 0's Path A/B/D selection
- If Path B selected, Task 1 needs replacement with manual-finalize workflow build (subagent will adapt)

Real-install test gap:
- Plan C ratification is manual; cannot fully automate. Documented in Task 25. Acceptable per spec §7.3.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-12-p2-1-platform-mvp.md`. Two execution options:

**1. Subagent-Driven (recommended)** — Dispatch a fresh subagent per task, review between tasks, fast iteration. Same approach used for Wave 0.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

For RDP execution (which the user prefers): same kickoff pattern as Wave 0. Update `docs/v6-rdp-kickoff.md` to reference this new plan path.

Which approach?
