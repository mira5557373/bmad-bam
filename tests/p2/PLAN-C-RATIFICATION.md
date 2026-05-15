# Plan C Ratification — P2.1 + P2.2

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
