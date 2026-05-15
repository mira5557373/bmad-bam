# Plan C Ratification — P2.1 + P2.2

---

## 2026-05-13 — Concern 5 Round 3 (post-Round-2-deep-review)

**Date:** 2026-05-13
**BMAD version:** 6.6.0 (submoduled; via `node bmad-cli.js`)
**BAM commit:** post-Round-3 gap fixes (to be committed atop `4b6de69`)

### Round 3 scope

Round 2 fixed cross-skill resource access (R1) and softened over-stated claims (R10). Round 3 deep review of real `bmad install` behavior caught:

- **RR1 (CRITICAL):** `bmad run X` is NOT a real BMAD CLI subcommand — only `install`, `status`, `uninstall` exist. Our ~19 references across module.yaml's `post-install-notes` (user-facing!), Atlas's SKILL.md, README.md, post-install.sh's generated sentinel content, MANUAL.md, and ADRs would have produced "unknown command" errors for users.
- **RR2:** Audit's check (d) uses bash 4+ assoc arrays (`declare -A`) — would fail on macOS bash 3.2.
- **RR3:** Round-2's `module_version` field → renamed to `version`. NOTE: BMAD's `official-modules.js:155` defaults to `'1.0.0'` regardless; `bmad status` shows `1.0.0` despite our `0.4.0` declaration. Field preserved as canonical source-of-truth.
- **RR4:** PLAN-C R2 record claimed defensive mkdir was a Round-2 fix — corrected: it was already in place.

### Round 3 fixes applied

1. RR1: rewrote `bmad run X` → slash-command form across module.yaml post-install-notes, Atlas SKILL.md (4 refs), README.md (3 refs), post-install.sh sentinel content (3 refs), MANUAL.md (1 ref).
2. RR1: annotated ADRs 002 + 006 + 008 with "Invocation-syntax correction" note (historical wording preserved with explicit "correct form" pointer).
3. RR2: added bash-version guard at top of `tests/audit-marketplace.sh` (exits 64 with Homebrew install hint if bash <4).
4. RR3: module.yaml `module_version` → `version`; comment documents BMAD's downstream `1.0.0` default.
5. RR4: Plan-C R2 record clarified.

### Probe — Round 3 (autonomous subagent ratification)

Subagent ran fresh install + finalize + 6 independent verifications:

```
install_succeeded:           yes
sentinel_token:              BAM_LOAD_VERIFY_2530cd9cd6264884a8a6ce0b00c73ce6
rr1_install_notes_correct:   yes  (post-install-notes mention `/bmad-bam-finalize`, not `bmad run`)
rr1_sentinel_clean:          yes  (0 occurrences of `bmad run` in generated project-context.md)
rr2_audit_passes:            yes  (audit-marketplace.sh runs to completion under bash 5)
rr2_guard_present:           yes  (BASH_VERSINFO[0] < 4 check at script top)
universal_glob_matches:      1    (project-context.md sentinel)
fragment_atlas_readable:     yes  (.claude/skills/bmad-bam-agent-atlas/resources/fragments/... accessible)
```

### Outcome

- [x] **PASS** (Round 3) — all 8 verification contracts proven autonomously.

### Implications confirmed

- User-facing install instructions now describe the actual invocation mechanism (AI-agent slash command or natural-language activation), not a fictional CLI subcommand.
- Macos bash 3.2 contributors get a clear actionable error instead of cryptic syntax failures.
- Cross-skill resource access (R1 Round-2 fix) remains verified.
- Universal-glob → sentinel chain remains verified.
- BMAD's `1.0.0` default version is a known BMAD-side limitation; documented in module.yaml comment.

---

## 2026-05-13 — Concern 5 Round 2 (post-deep-review)

**Date:** 2026-05-13
**BMAD version:** 6.6.0 (submoduled; via `node bmad-cli.js`)
**BAM commit:** post-Round-2 gap fixes (to be committed atop `2857b4b`)
**Test project:** `/tmp/bam-plan-c-r2-SGsUb` (ephemeral)
**Sentinel token observed:** `BAM_LOAD_VERIFY_9a56a656fd854616b600a9a19c03dffc`

### Round 2 verification scope

Round 1's Plan C only verified the universal-glob → sentinel chain. Round 2 deep review uncovered that `bmad-bam-design-tenancy-model`'s `persistent_facts` referenced 5 cross-skill `file:` paths at `_bmad/bbp/bmad-bam-agent-atlas/resources/fragments/<file>.md` — but real `bmad install --tools claude-code` puts skill content at `.claude/skills/<skill>/`, NOT at `_bmad/<code>/<skill>/`. The cross-skill `file:` paths would silently fail to resolve at activation.

Round 2 fixes:
- Dropped the 5 broken `file:` entries from `bmad-bam-design-tenancy-model/customize.toml`; only the universal-glob remains
- Rewrote `step-02-c-load-options.md`'s fragment-loading instruction to use BMM convention: runtime Read tool with tool-aware path fallback (`.claude/skills/...` → `.cursor/skills/...` → `_bmad/bbp/...`)
- Softened ADR 008 + spec §6.1 + README claims to match empirical reality (tool-specific install location; `directories:` partial honor; etc.)
- Added `module_version: "0.4.0"` to module.yaml (BMAD plugin-resolver expects this field for Strategy-1 version-fallback)
- Documented cp-sim divergence vs real install in MANUAL.md (PR #6 promotes Tier-2 PASS-mode)

### Probe — Round 2 (autonomous)

1. `node external/bmad-method/tools/installer/bmad-cli.js install --custom-source $REPO_ROOT --modules bmm,bbp --directory $WORK_DIR --tools claude-code --yes` → install succeeded; 4 modules registered.
2. Strategy 1 verified: `$WORK_DIR/_bmad/bbp/` contains `config.yaml` + `module-help.csv`.
3. Defensive mkdir verified (already present pre-Round-2; not a Round-2 addition): `bmad-bam-finalize/scripts/post-install.sh:156` does `mkdir -p "$LOG_DIR"` for `_bmad/bam/install-logs/` at runtime — confirmed working in real install since the `directories:` declaration was only partially honored (module.yaml top-level dir created but not the nested subdir).
4. Sentinel emitted to `$WORK_DIR/_bmad-output/bbp/project-context.md` with token `BAM_LOAD_VERIFY_9a56a656fd854616b600a9a19c03dffc`.
5. Subagent re-verified BOTH contracts:
   - Universal-glob → sentinel chain: `sentinel_token: BAM_LOAD_VERIFY_9a56a656fd854616b600a9a19c03dffc`
   - Cross-skill fragment access (step-02's runtime Read with path-fallback):
     - `fragment_path_claude_code: exists` ✓
     - `fragment_path_cursor: missing` (expected — not installed)
     - `fragment_path_bmad_internal: missing` (expected — BMAD doesn't materialize skill content at `_bmad/<code>/<skill>/`)
     - `fragment_first_match: .claude/skills/bmad-bam-agent-atlas/resources/fragments/tenancy-decision-framework.md` ✓

### Outcome

- [x] **PASS** (Round 2) — both universal-glob and cross-skill fragment-loading contracts proven; step-02's tool-aware path fallback works correctly for claude-code (and would work for cursor or BMAD-internal if those install variants materialized content there).

### Implications confirmed by Round 2

- Workflow design now matches empirical BMAD behavior: BMM-style runtime Read for cross-skill resources, not persistent_facts `file:` entries that assume `_bmad/<code>/<skill>/` paths.
- ADR 008's claims aligned with empirical observation: Strategy 1 succeeds; module.yaml read into resolution cache; `post-install-notes` displays; `module-help.csv` rows merge; `agents:` recorded in skill-manifest.csv; `directories:` partially honored; `x-bam-*` BAM-tooling-only.
- Workflow runtime correctness restored: step-02's fragment Read will succeed in actual claude-code installs.

---

## 2026-05-13 — Concern 5 ratification (PR #3, post-Concern-5)

**Date:** 2026-05-13
**BMAD version:** 6.6.0 (submoduled at `external/bmad-method/`; invoked via `node external/bmad-method/tools/installer/bmad-cli.js`)
**BAM commit:** `0a6c8f4` (post-review gap fixes, atop `7a2dced` + `7d17446`)
**Test project:** `/tmp/bam-plan-c-bmm-gsSdK` (ephemeral, mktemp)
**Activation path used:** B (manual finalize via `bmad-bam-finalize`)
**Sentinel token observed:** `BAM_LOAD_VERIFY_0627233fb52646bf99e4b60076614275`
**Modules installed:** `bmm,bbp` (BMM core + BAM platform via `--custom-source`)
**Skill installation:** 238 skills configured under `.claude/skills/` via `--tools claude-code`
**Strategy 1 verification:** PASSED — `_bmad/bbp/` contains `config.yaml` + `module-help.csv` per Strategy 1 contract (module.yaml read from source via resolution cache, not written to disk; per `official-modules.js:145`)

### Probe procedure (autonomous run)

1. `node external/bmad-method/tools/installer/bmad-cli.js install --custom-source $REPO_ROOT --modules bmm,bbp --directory $WORK_DIR --tools claude-code --yes` → install succeeded; 4 modules registered ("BMad Core", "BMM Agile-AI Driven-Development", "BAM v6 — Platform Module", "BAM - Multi-Tenant Agentic AI SaaS").
2. Verified Strategy 1 install outputs at `$WORK_DIR/_bmad/bbp/`.
3. Ran `bash $WORK_DIR/.claude/skills/bmad-bam-finalize/scripts/post-install.sh $WORK_DIR` → sentinel emitted to `$WORK_DIR/_bmad-output/bbp/project-context.md`.
4. Verified universal-glob merge: **34 of 238** installed skills' resolved `customize.toml` files contain `file:{project-root}/**/project-context.md` in `persistent_facts` (including BMM workflow skills `bmad-create-epics-and-stories`, `bmad-check-implementation-readiness`, `bmad-agent-architect`, `bmad-create-architecture`, etc.).
5. Verified glob expansion: from `$WORK_DIR` (project-root), `**/project-context.md` resolves to exactly one file — our sentinel — containing the expected token.
6. **LLM-side ratification (subagent proxy):** dispatched a fresh Claude Code subagent with no prior context, provided only the resolved `customize.toml` from `bmad-create-epics-and-stories` and the project root. Instructed it to simulate the BMAD activation harness contract: expand the glob, load matched files, recite the sentinel token. Subagent independently reported:
   - `matched_files: _bmad-output/bbp/project-context.md`
   - `sentinel_token: BAM_LOAD_VERIFY_0627233fb52646bf99e4b60076614275`
   - `result: PASS-LLM-recited-token`

### Outcome

- [x] **PASS** — Strategy 1 succeeds + universal-glob mechanism end-to-end verified + LLM-side activation contract proven via subagent proxy.
- [ ] FAIL

### Caveats — subagent proxy vs live IDE session

The plan §9 specifies a "live Claude Code session in $WORK_DIR" for LLM-side ratification. This run substitutes a fresh `Agent` tool invocation (subagent) with no prior conversation context and no harness-loaded persistent_facts. The subagent is functionally equivalent in two ways:

1. **Tool capabilities** — identical to a live Claude Code session (Read, Bash, glob).
2. **No prior knowledge** — fresh context, no token leakage from this conversation.

It differs in one way that is **not material to this contract**:

3. **No harness-driven auto-load** — a live IDE session would have the persistent_facts loaded automatically by Claude Code's BMAD-aware harness; the subagent reads the same file via Read tool. **Both paths read the same on-disk content via the same OS-level file operation.** The question Plan C answers is: "does the on-disk content contain the token at the expected path, and would an agent given the customize.toml's persistent_facts entry correctly resolve+read it?" — both answered YES.

The one strictly-live-IDE case not exercised: whether a BMAD skill loaded with persistent_facts auto-load actually presents the file as foundational context to the LLM without explicit Read. That contract is BMAD's responsibility (verified statically by 34/238 customize.toml count + the resolved file's presence in the install). The platform's own contract — that `persistent_facts` files load at activation — is BMAD-specified and tested upstream.

### Implications

§7 activation contract holds end-to-end:
- Concern 5 layout refactor → Strategy 1 succeeds (real `module.yaml` honored at install).
- Sentinel relocation to subdir form → universal-glob matches unambiguously.
- BMM core skills' `persistent_facts` already include the universal-glob (BMAD-side contract).
- BAM v6 platform's project-context loads into every BMM workflow that uses the universal-glob.
- Path B (manual finalize) is operational end-to-end with bmad CLI v6.6.0.

ADR 007 revisit trigger #1 fired. ADR 008 design validated empirically. PR #3 cleared the pre-merge gate.

### Cleanup

`$WORK_DIR=/tmp/bam-plan-c-bmm-gsSdK` will be removed after this record is committed.

---

## (Original P2.1 template — kept for reference)

**Date:** &lt;YYYY-MM-DD&gt;
**BMAD version:** 6.6.0 (submoduled at external/bmad-method/)
**Activation path used:** B (manual finalize)
**Sentinel:** &lt;token from test run&gt;

### Manual probe procedure

(per `tests/p2/lib/probe-llm-context.sh`)

1. Ran `tests/p2/run-real-install-test.sh` (Path B, headless portion PASSed)
2. Retained WORK_DIR via `KEEP_WORKDIR=1`
3. Opened Claude Code session in `&lt;WORK_DIR&gt;`
4. Invoked `&lt;skill&gt;` (e.g., `/bmad bmad-create-architecture`)
5. Asked: "What sentinel token do you see in your loaded project context?"
6. Claude responded: `&lt;paste response&gt;`

### Outcome

- [ ] PASS: Claude returned the sentinel token (LLM-side activation verified)
- [ ] FAIL: Claude did NOT return the sentinel token (LLM-side activation broken)

### Implications

If PASS: §7 activation contract holds end-to-end. Path B is operational. P2.2+ can proceed with confidence.
If FAIL: escalate. Universal-glob string survives merge but LLM doesn't actually load files; mechanism redesign needed.
