# Marketplace audit fixtures

Fixtures used by `tests/audit-marketplace.sh` to verify each failure mode is caught.

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
- `fake-v6/bam-faux/skills/bad-namespace-skill/steps/step-bad.md` — exercises check (f); skill dir has `.no-marketplace` so it doesn't trip check (d) when unlisted

## Adding a new fixture

1. Add a new `marketplace-<good|bad>-<failure-mode>.json` file.
2. Create whatever on-disk shape under `fake-source/` or `fake-v6/` makes the fixture isolate that failure mode.
3. Add a row to the Fixtures table.
4. Add a test case in `tests/audit-marketplace.sh`'s fixture-verification block (the calling test, NOT the audit script itself).
