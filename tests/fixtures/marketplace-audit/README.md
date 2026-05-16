# Marketplace audit fixtures

Fixtures used by `tests/audit-marketplace.sh` to verify each failure mode is caught.

Each "bad" fixture is named for the *primary* failure mode it exercises. A given
bad fixture may also trip other checks — a bad fixture doesn't have to perfectly
satisfy the unrelated checks; it only needs to fail the named primary check.
Test assertions check for the *presence* of the named `(check X)` tag in the
audit's stderr output (via `grep -q`), not that it's the only error emitted.
This is intentional: each fixture is a minimal demonstration of one check
firing, not a fully-clean marketplace that exercises one check in isolation.

## Fixtures

| Fixture | Outcome | Check |
|---|---|---|
| `marketplace-good-minimal.json` | PASS | All 6 |
| `marketplace-bad-missing-skill.json` | FAIL | (a) skill path missing |
| `marketplace-bad-module-root.json` | FAIL | (b) entry not a /skills/<name>/ path |
| `marketplace-bad-no-version.json` | FAIL | (c) plugin missing version |
| `marketplace-bad-orphan-skill.json` | FAIL | (d) on-disk skill not listed |
| `marketplace-bad-orphan-skill-with-sentinel.json` | PASS | (d) sentinel correctly excludes |
| `marketplace-bad-missing-module-entry.json` | FAIL | (e) v6 module has no plugin |
| `marketplace-bad-unknown-namespace.json` | FAIL | (f) step file unknown namespace |
| `marketplace-good-phase-numbered.json` | PASS | (b) phase regex + (d) phase-mode scan |
| `marketplace-bad-phase-orphan.json` | FAIL | (d) phase-mode orphan detection |
| `marketplace-bad-stale-path.json` | FAIL | (g) stale pre-Phase-C path in step file |
| `marketplace-bad-fictional-run.json` | FAIL | (h) fictional `bmad run X` in SKILL.md |
| `marketplace-bad-unknown-workflow.json` | FAIL | (i) workflow name not in spec §5.X allow-list |

## Sentinel — `.no-marketplace`

A skill dir containing a file named `.no-marketplace` is **excluded** from the orphan check (d). Use cases:
- Skill is WIP and not yet marketplace-ready
- Skill is test-only or internal helper

Empty file is sufficient; the audit only checks for presence. Skills WITH the sentinel must still pass checks (a) (if listed), (b), and (f).

## On-disk fixture tree

- `fake-source/skills/skill-alpha` — listed by good fixture; passes
- `fake-source/skills/skill-orphan` — flagged by check (d) when not listed (e.g., bad-orphan-skill fixture)
- `fake-source/skills/skill-orphan-excluded` — not listed, but has `.no-marketplace`; check (d) skips it
- `fake-source/agents/` — module-root dir; references in fixture exercise check (b)
- `fake-v6/bam-faux/module.yaml` — fixture v6 module-yaml
- `fake-v6/bam-faux/skills/good-skill` — clean skill for the good fixture to satisfy check (e)
- `fake-v6-with-bad/bam-faux/skills/bad-namespace-skill/steps/step-bad.md` — exercises check (f). Note: this lives in a **separate** v6-root (`fake-v6-with-bad/`) so the clean fixtures using `fake-v6/` aren't tripped by it. The check-(f) fixture passes `--v6-root fake-v6-with-bad` explicitly. (The skill dir does not have a `.no-marketplace` sentinel — that's unrelated to check (f), which scans step files regardless of the orphan-check status.)
- `fake-source/1-test-phase/skill-phased` — listed in good-phase-numbered fixture; tests phase-mode scan
- `fake-source/1-test-phase/skill-phased-orphan` — has `.no-marketplace` (good fixture); driver toggles sentinel for bad-phase-orphan fixture run

## Running the fixtures

The driver script `tests/audit-marketplace-fixtures.sh` runs all fixtures and asserts each behaves as documented in the Fixtures table:

```bash
tests/audit-marketplace-fixtures.sh        # run all 10 cases
tests/audit-marketplace-fixtures.sh -v     # verbose: show stderr per case
```

Contract:
- Good fixtures must exit 0.
- Bad fixtures must exit non-zero AND emit their named `(check X)` tag on stderr. A bad fixture MAY also trip other checks (documented above) — the driver only asserts the primary check fires.

If any fixture's behavior drifts (e.g., a check is renamed or removed), the driver fails and prints the deviating case.

## Adding a new fixture

1. Add a new `marketplace-<good|bad>-<failure-mode>.json` file.
2. Create whatever on-disk shape under `fake-source/` or `fake-v6/` makes the fixture isolate that failure mode.
3. Add a row to the Fixtures table above.
4. Add an `assert_case` invocation to `tests/audit-marketplace-fixtures.sh` with the expected outcome (`pass` or `fail`) and tag (e.g., `"(check g)"`).
