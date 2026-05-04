# Test Migration Backlog (v3.1)

**Status:** v3.0.0-rc1 deferred — re-enable in v3.1 after rewrite

The following 7 test files reference v2 skill structure (the 38 skills) that was dissolved in v3. They are currently excluded from `npm test` via `jest.config.js > testPathIgnorePatterns` to keep the v3 build green.

---

## Excluded Tests

| Test File | Why Excluded | v3.1 Action |
|---|---|---|
| `test/v2/workflow-cev.test.js` | Iterates 38 v2 skills checking `name:` matches directory name | Rewrite for the 5 retained v3 skills |
| `test/v2/pattern-standards.test.js` | Asserts exactly 112 patterns and Web Research section in each | Update count assertion (or make dynamic), update section name |
| `test/v2/file-counts.test.js` | Asserts file counts under v2 skill directories | Rewrite for v3 KB structure |
| `test/integration/cross-module-agents.test.js` | Tests v2 cross-module agent behavior | Rewrite using v3 module.yaml agents block + central config |
| `test/integration/customize-loading.test.js` | Tests v2 customize TOML loading from `_bmad/custom/` | Rewrite for `_bmad/bam/customize-templates/` opt-in mechanism |
| `test/integration/post-install-verification.test.js` | Verifies v2 post-install artifacts | Rewrite for v3 KB structure + project-context.md generation |
| `test/integration/runtime-simulation.test.js` | Simulates v2 skill activation | Rewrite to verify BMAD-skill auto-loading of project-context.md |

---

## Total Test Status

| Status | Count |
|---|---:|
| Passing tests | 689 |
| Skipped tests (pre-existing) | 21 |
| Excluded test files | 7 (52 tests) |
| New tests needed for v3 | TBD |

---

## v3.1 Test Migration Plan

### Replacement tests to write:

1. **`test/v3/module-yaml-schema.test.js`** — Validate `src-v2/module.yaml` agents block, config vars, directories, install hooks
2. **`test/v3/native-injection.test.js`** — Verify `_bmad/bam/project-context.md` generated correctly by post-install
3. **`test/v3/pattern-index.test.js`** — Verify `_index.md` contains all CSV patterns with valid links
4. **`test/v3/customize-templates.test.js`** — Validate the 3 `*.toml.example` files have correct `[workflow]` schema
5. **`test/v3/retained-skills.test.js`** — Run BMAD validator on the 5 retained skills, assert zero findings
6. **`test/v3/dissolution-coverage.test.js`** — Verify every dissolved skill's knowledge has a documented home (cross-check against BAM-V3-DISSOLUTION-MAP.md)

### Effort estimate: ~3-4 hours for v3.1

---

## How to Run BMAD-Native Validation Today

While the jest tests are partially deferred, the **most important v3 validator** runs cleanly:

```bash
for skill in src-v2/skills/*/; do
  node external/bmad-method/tools/validate-skills.js "$skill"
done
```

Expected output:
```
✅ All skills passed validation!
   Skills with findings: 0
   Total findings: 0
```

This is the canonical BMAD compliance check, not the BAM-specific jest tests.

---

*Tracked in v3.1 milestone. Re-enable each test file as it's migrated.*