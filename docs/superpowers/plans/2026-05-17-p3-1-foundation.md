# Wave P3.1 Foundation Skills Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship 4 new BAM v6 platform workflow skills (modular-monolith, deployment-topology, finops-model, tenant-tier-model) completing the Foundation tier. Establish QG-F1 (blocking) + QG-M1 (partial). Migrate existing menu codes to Z-prefix per ADR-013.

**Architecture:** 4 workflow skills under `src-v6/bmad-bam-platform/2-modules/`, each producing structured JSON evidence (machine contract) + markdown narrative (human-readable). Tight inter-skill coupling via manifest-declared inputs (per Concern-5 tool-aware path fallback). New per-skill fragments hosted in Atlas's `resources/`. Customize-template overlay validates BAM→BMM-core overlay mechanism (spec §7.2). Reference: `docs/superpowers/specs/2026-05-17-p3-1-foundation-design.md`.

**Tech Stack:** bash, Python 3.11+, Markdown, YAML, TOML, JSON Schema. No new runtime dependencies. Build on the existing design-tenancy-model template (`src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/`).

**Spec reference:** `docs/superpowers/specs/2026-05-17-p3-1-foundation-design.md` (HEAD `5fec520`, brainstorm-locked).

**Implementation strategy:** **11 phases, ~26 tasks** with Tier-1 tests green at each commit. Atomic commits per task or per logical-coherence group. ADR-015 + roadmap §13 update + llms.txt regen are the final phase.

---

## File Structure

Files created or modified, grouped by phase. Each file is the responsibility of exactly one task; cross-task dependencies are sequential by phase.

### Phase 1 — design-tenancy-model retrofit (P2.1 skill modification)

- Modify: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/steps/step-05-c-write-design.md` — add `tenancy-decision.json` writer alongside the existing `tenancy-model.md` writer
- Modify: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/templates/tenancy-model.md.template` — add "Attribution affordances" subsection placeholder
- Modify: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/tests/smoke-test.sh` — verify new JSON output emerges

### Phase 2 — Skill scaffolding (4 skill dirs, minimal)

Create per skill (×4: modular-monolith, deployment-topology, finops-model, tenant-tier-model):

- Create: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-<name>/SKILL.md`
- Create: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-<name>/customize.toml`
- Create: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-<name>/workflow.md`
- Create: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-<name>/bmad-skill-manifest.yaml`
- Create: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-<name>/tests/smoke-test.sh`

### Phase 3 — Atlas resources (fragments + anti-patterns + glossary)

In `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/`:

- Create: `fragments/ddd-bounded-contexts.md`
- Create: `fragments/ports-and-adapters.md`
- Create: `fragments/module-decomposition-heuristics.md`
- Create: `fragments/anti-corruption-layer.md`
- Create: `fragments/evolutionary-architecture.md`
- Create: `fragments/rollout-strategies-comparison.md`
- Create: `fragments/tenant-cohort-design.md`
- Create: `fragments/rollback-strategies.md`
- Create: `fragments/zero-downtime-migrations.md`
- Create: `fragments/unit-economics-saas.md`
- Create: `fragments/per-tenant-cost-attribution-with-hooks.md`
- Create: `fragments/cost-allocation-shared-resources.md`
- Create: `fragments/budget-alerts-and-quotas.md`
- Create: `fragments/tier-design-principles.md`
- Create: `fragments/feature-gating-patterns.md`
- Create: `fragments/limit-and-quota-design.md`
- Create: `fragments/tier-transition-economics.md`
- Create: `fragments/tier-cliff-avoidance.md`
- Create: `anti-patterns/tenancy-as-afterthought.md`
- Create: `anti-patterns/deployment-without-cohorts.md`
- Create: `anti-patterns/price-without-cost-attribution.md`
- Create: `anti-patterns/tier-cliff.md`
- Create: `glossary-terms-introduced.csv`

### Phases 4-7 — Per-skill full implementation

For each of the 4 skills, the full step sequence (7 steps for 3 skills; 8 for finops):
- 7 step files in `steps/` (CEV pattern: 01-c-elicit-context → 07-v-verify-completeness)
- 1 template file in `templates/<name>.md.template`
- finops gets an 8th step: `steps/step-08-v-verify-coherence.md`

### Phase 8 — Quality gates

- Create: `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/checklists/QG-F1.md`
- Create: `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/checklists/QG-M1.md`

### Phase 9 — Customize-template overlay + audit + manifest

- Create: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-modular-monolith/customize-template/bmad-create-architecture/customize.toml`
- Modify: `tests/audit-marketplace.sh` — check (i) workflow allow-list adds 4 new entries
- Modify: `src-v6/bmad-bam-platform/module-help.csv` — 4 new rows + 4 menu-code migrations (_meta unchanged per G7 retraction)
- Modify: `.claude-plugin/marketplace.json` — 4 new skill entries

### Phase 10 — ADR + docs + llms.txt

- Create: `_bmad/_memory/atlas/architecture-decisions/2026-05-17-015-p3-1-foundation-decisions.md`
- Modify: `_bmad/_memory/atlas/architecture-decisions/INDEX.md` — ADR-015 row
- Modify: `docs/v6-detailed-roadmap.md` §13 — ADR-015 entry
- Regenerate: `_bmad/bam-platform/llms.txt` (via `tools/generate-llms-txt.sh bbp`)

### Phase 11 — Final verification + push + PR

No file modifications; runs Tier-1 sweep, commits any straggler updates, pushes branch, opens PR.

---

## Phase 1: design-tenancy-model retrofit

P2.1's design-tenancy-model produces `tenancy-model.md`. P3.1 needs ALSO `tenancy-decision.json` (machine contract for downstream skills) AND the template needs an "Attribution affordances" subsection rule. This is a minor additive change.

### Task 1: Add JSON output to design-tenancy-model step-05

**Files:**
- Modify: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/steps/step-05-c-write-design.md`

- [ ] **Step 1: Read existing step-05 to find the write-output section**

```bash
cd /home/ubuntu/Development/bmad-bam
grep -n "Write\|tenancy-model\.md\|output" src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/steps/step-05-c-write-design.md
```

Expected: finds the existing "Write the populated doc to `{project-root}/docs/architecture/tenancy-model.md`" line and the output schema.

- [ ] **Step 2: Append a new action step + write the JSON output**

Edit `step-05-c-write-design.md` to add — after the existing "Write the populated doc to ..." action — a new action:

```markdown
5. Write the structured decision contract to two locations (per spec §3.R1 of `docs/superpowers/specs/2026-05-17-p3-1-foundation-design.md`):
   - `{project-root}/docs/architecture/tenancy-decision.json` (human-readable copy)
   - `{project-root}/_bmad/bam/evidence/QG-F1/tenancy-decision.json` (gate-evidence pointer)

   Both files contain identical content with schema:

   ```json
   {
     "schema_version": "1.0",
     "decided_at": "<ISO-8601 UTC>",
     "tenancy_model": "rls | schema-per-tenant | cell-based | hybrid",
     "attribution_affordances": {
       "compute": "tenant_id_in_trace_span",
       "storage": "by_predicate | by_schema | by_cell_then_intra",
       "network": "tenant_context_header"
     },
     "rationale_ref": "docs/architecture/tenancy-model.md"
   }
   ```

   Populate `tenancy_model` with the chosen option's id from `recommendation.json`. Populate `attribution_affordances.storage` based on the tenancy choice:
   - rls → `"by_predicate"`
   - schema-per-tenant → `"by_schema"`
   - cell-based → `"by_cell_then_intra"`
   - hybrid → `"by_predicate"` (default; per-tier may override)

   `mkdir -p` the parent dirs before writing.
```

- [ ] **Step 3: Update the Output section to enumerate both new files**

In the same step-05 file, find the "## Output" section and add the two JSON files to its description.

Before:
```markdown
`{project-root}/docs/architecture/tenancy-model.md` — the design doc. Schema:
```

After:
```markdown
`{project-root}/docs/architecture/tenancy-model.md` — the design doc (human narrative). Schema:
```

Then after the existing Output content, append:

```markdown
`{project-root}/docs/architecture/tenancy-decision.json` + `{project-root}/_bmad/bam/evidence/QG-F1/tenancy-decision.json` — structured decision contract (machine-readable; consumed by P3.1 Foundation skills). Schema: see ADR-015 + spec §3.R1.
```

- [ ] **Step 4: Update the Gate section to reference QG-F1 evidence destination**

In the same file, find the "## Gate" section. Update it to mention QG-F1 evidence:

```markdown
## Gate

Machine-checkable: verify both `.md` and `.json` outputs exist + JSON validates against schema (has `schema_version`, `tenancy_model` in {rls, schema-per-tenant, cell-based, hybrid}, `attribution_affordances` block non-empty).

QG-F1 evidence: this skill's JSON output is the first of 5 evidence files at `_bmad/bam/evidence/QG-F1/`. See `QG-F1.md` checklist (P3.1 deliverable).
```

- [ ] **Step 5: Verify**

```bash
grep -A2 "tenancy-decision\.json" src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/steps/step-05-c-write-design.md | head -15
```

Expected: shows the new JSON-write action + Output section + Gate section references.

- [ ] **Step 6: Commit**

```bash
git add src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/steps/step-05-c-write-design.md
git commit -m "feat(p3-1): design-tenancy-model step-05 emits tenancy-decision.json (Task 1)

Adds the structured machine-readable JSON contract output alongside
the existing tenancy-model.md narrative output. Both files written to
docs/architecture/ (human-visible) AND _bmad/bam/evidence/QG-F1/
(gate-evidence pointer).

Schema per ADR-015 / spec §3.R1: tenancy_model + attribution_affordances
+ rationale_ref. Downstream P3.1 skills (deployment-topology, finops-
model, tenant-tier-model) consume this via manifest inputs.required
declaration.

Concurrent: template subsection rule + smoke-test verification land
in Tasks 2 + 3.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

### Task 2: Add "Attribution affordances" subsection rule to tenancy-model template

**Files:**
- Modify: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/templates/tenancy-model.md.template`

- [ ] **Step 1: Read current template structure**

```bash
grep -n "^## \|^### " src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/templates/tenancy-model.md.template
```

Identify the "## Architecture" section heading.

- [ ] **Step 2: Add "### Attribution affordances" subsection rule**

Edit the template. After the "## Architecture" heading (and any existing subsections), add:

```markdown
### Attribution affordances

For machine-readable downstream consumption (per ADR-015 / spec §3.R1), this section MUST enumerate the attribution mechanisms enabled by the chosen tenancy model:

- **Compute:** how tenant-id propagates to compute work (e.g., `tenant_id` in trace-span baggage)
- **Storage:** how per-tenant storage cost can be measured (`by_predicate` for RLS, `by_schema` for schema-per-tenant, `by_cell_then_intra` for cell-based)
- **Network:** how tenant-tagged network traffic is identified (e.g., `tenant_context` HTTP header at load balancer)
- **Third-party:** how external API calls are attributed (e.g., per-tenant API client wrapper logs requests)

The `tenancy-decision.json` companion file encodes these affordances in structured form for direct consumption by `design-finops-model` and `verify-coherence`.
```

- [ ] **Step 3: Verify the subsection was added**

```bash
grep -n "Attribution affordances\|by_predicate\|by_schema" src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/templates/tenancy-model.md.template
```

Expected: 1-2 hits for "Attribution affordances" heading + supporting text.

- [ ] **Step 4: Commit**

```bash
git add src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/templates/tenancy-model.md.template
git commit -m "feat(p3-1): tenancy-model template adds Attribution affordances subsection (Task 2)

Human-readable companion to Task 1's tenancy-decision.json. The
subsection rule in the template ensures every produced tenancy-model.md
documents per-tenant attribution mechanisms (compute / storage / network
/ third-party). design-finops-model reads the JSON contract; humans
read this section for context.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

### Task 3: Update design-tenancy-model smoke-test to verify new outputs

**Files:**
- Modify: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/tests/smoke-test.sh`

- [ ] **Step 1: Read current smoke-test contents**

```bash
cat src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/tests/smoke-test.sh
```

- [ ] **Step 2: Add verification for the new step-05 JSON-write action**

Add a check in the smoke-test that step-05's content mentions the new JSON output:

```bash
# After existing "valid" checks, add:
if grep -q "tenancy-decision\.json" "$SKILL_DIR/steps/step-05-c-write-design.md"; then
    echo "    [valid] step-05 emits tenancy-decision.json (P3.1 contract per ADR-015)"
else
    echo "    [INVALID] step-05 missing tenancy-decision.json output"
    exit 1
fi

if grep -q "Attribution affordances" "$SKILL_DIR/templates/tenancy-model.md.template"; then
    echo "    [valid] template has Attribution affordances subsection rule"
else
    echo "    [INVALID] template missing Attribution affordances subsection"
    exit 1
fi
```

- [ ] **Step 3: Run the smoke-test**

```bash
src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/tests/smoke-test.sh
echo "exit=$?"
```

Expected: PASS (exit 0); both new valid lines printed.

- [ ] **Step 4: Commit**

```bash
git add src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/tests/smoke-test.sh
git commit -m "test(p3-1): design-tenancy-model smoke-test verifies new P3.1 outputs (Task 3)

Confirms step-05 has the tenancy-decision.json writer + template has
the Attribution affordances subsection rule. Tasks 1+2 verified;
existing skill smoke-test discipline preserved.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Phase 2: Skill scaffolding (4 dirs, minimal)

Create the 4 skill dirs with stub SKILL.md + manifest + workflow.md + customize.toml + smoke-test.sh. Steps + template + actual content come in Phases 4-7. Scaffolding gets the dir structure + frontmatter + smoke-test contract in place.

### Task 4: Scaffold `bmad-bam-design-modular-monolith`

**Files:**
- Create: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-modular-monolith/SKILL.md`
- Create: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-modular-monolith/customize.toml`
- Create: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-modular-monolith/workflow.md`
- Create: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-modular-monolith/bmad-skill-manifest.yaml`
- Create: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-modular-monolith/tests/smoke-test.sh`

- [ ] **Step 1: Create skill dir**

```bash
mkdir -p src-v6/bmad-bam-platform/2-modules/bmad-bam-design-modular-monolith/{steps,templates,tests}
```

- [ ] **Step 2: Write SKILL.md**

Content (per spec §6.1):

```markdown
---
name: bmad-bam-design-modular-monolith
description: "Decompose a multi-tenant SaaS codebase into bounded contexts with ports/adapters at each boundary. Default: hybrid DDD + hexagonal. Decision-matrix scores DDD-pure / ports-pure / hybrid / vertical-slice against tenant-count fit, team size, domain complexity, migration cost, test ergonomics, and AI-agent comprehensibility. Output: module-decomposition.md + module-decomposition.json (QG-F1 + QG-M1 evidence). Invoke via `/bmad-bam-design-modular-monolith`."
---

# bmad-bam-design-modular-monolith

## Purpose

Lock down the module map BEFORE writing code. A multi-tenant SaaS that gets module boundaries wrong leaks tenancy into infrastructure code and forces costly retrofits. This workflow elicits the project's domain, scores 4 decomposition options, recommends one (hybrid by default), and produces the artifact downstream architecture decisions depend on.

## When to invoke

- Greenfield SaaS — invoke before writing the first module-spanning code
- Brownfield retrofit — after `analyze-existing-tenancy` (P3.4) but before refactoring
- Whenever team size doubles or domain scope changes materially

## Inputs

- Soft: `tenancy-decision.json` (recommended; workflow runs without it but warns; affects bounded-context alignment)
- Elicited at runtime: domain summary, team size, current codebase size, brownfield-or-greenfield

## Output

- `docs/architecture/module-decomposition.md` — human-readable decision document
- `_bmad/bam/evidence/QG-F1/module-decomposition.json` — machine contract; schema per spec §3 + ADR-015

## Gate

QG-F1 (blocking) + QG-M1 (partial — full in P3.2).
```

- [ ] **Step 3: Write customize.toml**

```toml
# DO NOT EDIT -- overwritten on every update.
#
# Workflow customization surface for bmad-bam-design-modular-monolith. Mirrors
# the agent customization shape under the [workflow] namespace.

[workflow]

# --- Configurable below. Overrides merge per BMad structural rules: ---
#   scalars: override wins • arrays (persistent_facts, activation_steps_*): append
#   arrays-of-tables with `code`/`id`: replace matching items, append new ones.

activation_steps_prepend = []
activation_steps_append = []

# Persistent facts loaded at every activation of this skill. Per spec §3.Q7,
# cross-workflow data flows via bmad-skill-manifest.yaml inputs:; this list is
# only the universal-glob sentinel for project-context discovery.
persistent_facts = [
  "file:{project-root}/**/project-context.md",
]

# No menu items at workflow level; users invoke via /bmad-bam-design-modular-monolith
# directly. Workflow-internal navigation handled by workflow.md.
```

- [ ] **Step 4: Write workflow.md (mode router)**

```markdown
# Workflow router — bmad-bam-design-modular-monolith

This skill follows the CEV (Create/Edit/Validate) workflow pattern (per spec §6.X).

## Modes

### Create mode (default)

Greenfield decomposition. Runs steps 01-c through 06-c, then verify (07-v).

1. `steps/step-01-c-elicit-context.md` — gather domain, team size, codebase status
2. `steps/step-02-c-load-options.md` — load the 4 decomposition options + scoring axes
3. `steps/step-03-c-decision-matrix.md` — score each option, pick winner
4. `steps/step-04-c-recommendation.md` — write rationale + recommendation
5. `steps/step-05-c-write-design.md` — produce module-decomposition.md + .json
6. `steps/step-06-c-record-adr.md` — write decision ADR
7. `steps/step-07-v-verify-completeness.md` — verify all outputs present

### Edit mode

Re-runs steps 02-06 starting from existing inputs (e.g., user wants to revise decision).

### Validate mode

Runs only step 07 against existing outputs.

## Convention

All output artifacts go to `{project-root}/docs/architecture/` (markdown) and `{project-root}/_bmad/bam/evidence/QG-F1/` (JSON copy).
```

- [ ] **Step 5: Write bmad-skill-manifest.yaml**

Per ADR-014 (BAM-extended 10 fields):

```yaml
---
name: bmad-bam-design-modular-monolith
description: "Decompose a multi-tenant SaaS codebase into bounded contexts with ports/adapters."
module: bmad-bam-platform
persona: atlas
execution_mode: facilitated  # human-in-the-loop CEV workflow
inputs:
  - artifact: tenancy-decision.json
    required: false
    resolver: tool-aware-path-fallback
    paths_tried:
      - "{project-root}/docs/architecture/tenancy-decision.json"
      - "{project-root}/_bmad/bam/evidence/QG-F1/tenancy-decision.json"
outputs:
  - artifact: module-decomposition.md
    location: "{project-root}/docs/architecture/"
    required: true
  - artifact: module-decomposition.json
    location: "{project-root}/_bmad/bam/evidence/QG-F1/"
    required: true
gates:
  - QG-F1   # blocking; this skill produces 1 of 5 evidence files
  - QG-M1   # partial in P3.1; promoted to full in P3.2
```

- [ ] **Step 6: Write smoke-test.sh (scaffold version)**

```bash
#!/usr/bin/env bash
# smoke-test for bmad-bam-design-modular-monolith
# Scaffolding-phase version; full step + content checks added in Phase 4.

set -euo pipefail

SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
echo ">>> smoke-test: bmad-bam-design-modular-monolith"

# File presence
for f in SKILL.md customize.toml workflow.md bmad-skill-manifest.yaml; do
    if [ -f "$SKILL_DIR/$f" ]; then
        echo "    [present] $f"
    else
        echo "    [MISSING] $f"
        exit 1
    fi
done

# SKILL.md frontmatter has name + description (BMM-required per ADR-014)
if grep -q "^name: bmad-bam-design-modular-monolith$" "$SKILL_DIR/SKILL.md" && \
   grep -q "^description:" "$SKILL_DIR/SKILL.md"; then
    echo "    [valid] SKILL.md frontmatter (name + description)"
else
    echo "    [INVALID] SKILL.md missing required frontmatter"
    exit 1
fi

# customize.toml has [workflow] namespace + universal-glob in persistent_facts
if grep -q "^\[workflow\]" "$SKILL_DIR/customize.toml" && \
   grep -q "file:{project-root}/\*\*/project-context.md" "$SKILL_DIR/customize.toml"; then
    echo "    [valid] customize.toml: [workflow] namespace + universal-glob present"
else
    echo "    [INVALID] customize.toml missing namespace or glob"
    exit 1
fi

# bmad-skill-manifest.yaml has 10 BAM-extended fields per ADR-014
python3 - "$SKILL_DIR/bmad-skill-manifest.yaml" <<'PYEOF'
import sys, yaml
with open(sys.argv[1]) as f:
    m = yaml.safe_load(f)
required_keys = ["name", "description", "module", "persona", "execution_mode",
                 "inputs", "outputs", "gates"]
missing = [k for k in required_keys if k not in m]
if missing:
    print(f"    [INVALID] manifest missing keys: {missing}")
    sys.exit(1)
print(f"    [valid] bmad-skill-manifest.yaml ({len(m)} top-level keys)")
PYEOF

echo ">>> PASS: smoke test (scaffold)"
```

Make it executable:

```bash
chmod +x src-v6/bmad-bam-platform/2-modules/bmad-bam-design-modular-monolith/tests/smoke-test.sh
```

- [ ] **Step 7: Run the smoke-test**

```bash
src-v6/bmad-bam-platform/2-modules/bmad-bam-design-modular-monolith/tests/smoke-test.sh
echo "exit=$?"
```

Expected: PASS (exit 0).

- [ ] **Step 8: Commit**

```bash
git add src-v6/bmad-bam-platform/2-modules/bmad-bam-design-modular-monolith/
git commit -m "feat(p3-1): scaffold bmad-bam-design-modular-monolith (Task 4)

Scaffolding for skill 1 of 4 in P3.1. SKILL.md, customize.toml,
workflow.md, bmad-skill-manifest.yaml, tests/smoke-test.sh.

Per spec §6.1 + ADR-013 menu code ZMM + ADR-014 manifest fields.
Steps + template + actual content land in Phase 4.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

### Task 5: Scaffold `bmad-bam-design-deployment-topology`

**Files:** same shape as Task 4 but for deployment-topology.

- [ ] **Step 1: Create skill dir + 5 scaffold files following Task 4's pattern**

Use Task 4's SKILL.md / customize.toml / workflow.md / manifest / smoke-test as templates. Substitute:

- `name`: `bmad-bam-design-deployment-topology`
- `description`: per spec §6.2 (deployment-topology one-liner)
- Manifest `inputs.required`: `tenancy-decision.json` (yes — REQUIRED per Q3)
- Manifest `inputs.optional`: `tier-model.json`
- Manifest `outputs`: `deployment-topology.md` + `deployment-topology.json`
- workflow.md: mirror Task 4's structure but reference deployment-specific step content

Specifically, the manifest gets:

```yaml
inputs:
  - artifact: tenancy-decision.json
    required: true
    resolver: tool-aware-path-fallback
    paths_tried:
      - "{project-root}/docs/architecture/tenancy-decision.json"
      - "{project-root}/_bmad/bam/evidence/QG-F1/tenancy-decision.json"
  - artifact: tier-model.json
    required: false
    resolver: tool-aware-path-fallback
    paths_tried:
      - "{project-root}/docs/architecture/tier-model.json"
      - "{project-root}/_bmad/bam/evidence/QG-F1/tier-model.json"
outputs:
  - artifact: deployment-topology.md
    location: "{project-root}/docs/architecture/"
    required: true
  - artifact: deployment-topology.json
    location: "{project-root}/_bmad/bam/evidence/QG-F1/"
    required: true
gates:
  - QG-F1
```

- [ ] **Step 2-4: Mirror Task 4's steps 6, 7, 8** — smoke-test, run, commit

Adjust the `bmad-bam-design-modular-monolith` strings to `bmad-bam-design-deployment-topology` in the smoke-test.

Commit message:
```
feat(p3-1): scaffold bmad-bam-design-deployment-topology (Task 5)

Skill 2 of 4. Same template as Task 4 with deployment-topology-specific
manifest inputs (REQUIRED: tenancy-decision.json per Q3 spec lock-in).

Menu code ZDP. Steps + template + content in Phase 6.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

### Task 6: Scaffold `bmad-bam-design-finops-model`

**Files:** same shape as Task 4 but for finops-model.

- [ ] **Step 1: Create dir + 5 files**

Substitutions:
- `name`: `bmad-bam-design-finops-model`
- `description`: per spec §6.3 (finops one-liner)
- Manifest `inputs.required`: 3 artifacts (tenancy-decision.json + tier-model.json + deployment-topology.json) — ALL three per Q4 spec lock-in
- Manifest `outputs`: `finops-baseline.md` + `finops-baseline.json` + `foundation-coherence.json` (the verify-coherence output)
- workflow.md references the 8-step pattern (extra step-08-v-verify-coherence)
- bmad-skill-manifest.yaml `gates`: `QG-F1` + a note `# also produces foundation-coherence.json for QG-F1 C3`

Manifest excerpt:

```yaml
inputs:
  - artifact: tenancy-decision.json
    required: true
    resolver: tool-aware-path-fallback
  - artifact: tier-model.json
    required: true
    resolver: tool-aware-path-fallback
  - artifact: deployment-topology.json
    required: true
    resolver: tool-aware-path-fallback
outputs:
  - artifact: finops-baseline.md
    location: "{project-root}/docs/architecture/"
    required: true
  - artifact: finops-baseline.json
    location: "{project-root}/_bmad/bam/evidence/QG-F1/"
    required: true
  - artifact: foundation-coherence.json
    location: "{project-root}/_bmad/bam/evidence/QG-F1/"
    required: true
gates:
  - QG-F1   # produces 2 evidence files (finops-baseline + foundation-coherence)
```

- [ ] **Step 2-4: Smoke-test, run, commit**

Commit message:
```
feat(p3-1): scaffold bmad-bam-design-finops-model (Task 6)

Skill 3 of 4. Manifest requires 3 upstream artifacts (tenancy + tier
+ deployment). This skill is last in the dependency chain; its 8th
step (verify-coherence) produces foundation-coherence.json as a
shared QG-F1 evidence file.

Menu code ZFM. Steps + template + content + verify-coherence in
Phase 7.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

### Task 7: Scaffold `bmad-bam-design-tenant-tier-model`

**Files:** same shape as Task 4 but for tenant-tier-model.

- [ ] **Step 1: Create dir + 5 files**

Substitutions:
- `name`: `bmad-bam-design-tenant-tier-model`
- `description`: per spec §6.4 (tier-model one-liner)
- Manifest `inputs.optional`: `tenancy-decision.json` (soft per coupling matrix)
- Manifest `outputs`: `tier-model.md` + `tier-model.json`
- Add a workflow flag: `--custom-tiers N` (3-7) — documented in workflow.md but actual implementation in step files

Manifest excerpt:

```yaml
inputs:
  - artifact: tenancy-decision.json
    required: false
    resolver: tool-aware-path-fallback
outputs:
  - artifact: tier-model.md
    location: "{project-root}/docs/architecture/"
    required: true
  - artifact: tier-model.json
    location: "{project-root}/_bmad/bam/evidence/QG-F1/"
    required: true
gates:
  - QG-F1
flags:
  - name: --custom-tiers
    type: integer
    range: [3, 7]
    default: 5
    description: "Number of tiers; default 5 (free/starter/pro/business/enterprise); 3-7 valid range for custom-tier projects"
```

- [ ] **Step 2-4: Smoke-test, run, commit**

Commit message:
```
feat(p3-1): scaffold bmad-bam-design-tenant-tier-model (Task 7)

Skill 4 of 4. Manifest declares --custom-tiers flag (3-7 range; default 5
per Q5 lock-in). Soft input on tenancy-decision.json; some tenancy
choices constrain tier shapes (e.g., cell-based naturally aligns with
per-cell pricing).

Menu code ZTT. Steps + template + content in Phase 5.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

---

## Phase 3: Atlas resources (fragments + anti-patterns + glossary)

Atlas hosts all P3.1 shared content per ADR-006. 18 fragments + 4 anti-patterns + 1 glossary CSV. Each fragment follows spec §6.3 body structure (8 sections). Each anti-pattern has `kind: anti-pattern` frontmatter per spec §6.5.

### Task 8: Write 5 modular-monolith fragments

**Files:**
- Create: `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/ddd-bounded-contexts.md`
- Create: `.../fragments/ports-and-adapters.md`
- Create: `.../fragments/module-decomposition-heuristics.md`
- Create: `.../fragments/anti-corruption-layer.md`
- Create: `.../fragments/evolutionary-architecture.md`

- [ ] **Step 1: Create the fragments dir if not present + write `ddd-bounded-contexts.md`**

Each fragment follows spec §6.3's 8-section body. Template structure with frontmatter:

```markdown
---
id: ddd-bounded-contexts
title: DDD Bounded Contexts
category: foundation
kind: fragment
qg_ref: QG-F1
last_reviewed: 2026-05-17
version: 1.0.0
status: active
author: atlas
tags: [ddd, modular-monolith, bounded-context]
references:
  - "https://martinfowler.com/bliki/BoundedContext.html"
  - "https://www.domainlanguage.com/ddd/reference/"
---

# DDD Bounded Contexts

## When to Use

- Designing a new multi-tenant SaaS where the domain has multiple distinct sub-domains (billing, auth, notifications, core domain, etc.)
- Refactoring a monolith where the team feels modules "leak" into each other
- Onboarding a team larger than ~5 engineers where shared mental models drift

## When NOT to Use

- Single-domain CRUD apps where the entire model fits in one ubiquitous language
- Throwaway prototypes
- Projects where the team has no DDD literacy and no time to learn

## Architecture

A bounded context is a boundary within which a single ubiquitous language applies. In a multi-tenant SaaS, common contexts include:

- **Identity**: tenants, users, auth, sessions
- **Commerce**: billing, payments, subscriptions, invoices
- **Core domain**: the product's unique value (e.g., document collaboration, scheduling, etc.)
- **Observability**: tracing, logging, metrics (cross-cutting; usually a thin adapter context)
- **Integration**: webhooks, third-party API clients, event bus

Each context owns its data + behavior + language. Cross-context communication uses anti-corruption layers (see `anti-corruption-layer` fragment).

## Trade-offs

| Pro | Con |
|---|---|
| Clear team ownership boundaries | Team must learn DDD lexicon |
| Schema isolation per context | More coordination cost across contexts |
| Easier to extract microservices later | Initial decomposition is hard |

## Implementation Patterns

(See `ports-and-adapters` fragment for the canonical implementation pattern. Bounded contexts answer "WHAT modules exist"; ports/adapters answer "HOW they talk".)

## Quality Checks

- **CRITICAL:** every bounded context has a written purpose statement + ubiquitous-language glossary (even 5 terms is enough). Without this the boundary erodes within a quarter.
- Each context's data model is independently inspectable (no shared tables across contexts).
- Tenant-awareness is a property of contexts (e.g., billing IS tenant-aware; observability is tenant-AGNOSTIC at the metric layer).

## Web Research Queries

- `domain-driven design bounded context multi-tenant {date}`
- `bounded context modular monolith {date}`
- `DDD vs microservices SaaS {date}`

## Cross-references

- `ports-and-adapters` — implementation pattern for context boundaries
- `module-decomposition-heuristics` — how to discover contexts in an existing codebase
- `anti-corruption-layer` — defending a context from external schema pollution
- Anti-pattern: `tenancy-as-afterthought` — adding multi-tenancy after contexts are baked in

---
```

- [ ] **Step 2-5: Write the other 4 modular-monolith fragments**

For each, follow the same template structure. Pin the topic and the cross-references appropriately. Key headers per fragment:

**`ports-and-adapters.md`** — hexagonal architecture, port = interface, adapter = implementation; tradeoffs vs pure layered architecture; CRITICAL: every port has at least one fake/in-memory adapter for testing.

**`module-decomposition-heuristics.md`** — practical signals for when to split a module: schema-level boundaries, team-level boundaries, change-frequency clustering; CRITICAL: split based on data-cohesion + change-frequency clustering, NOT layer-types.

**`anti-corruption-layer.md`** — when crossing a bounded context, never accept the other side's schema directly; introduce a translation layer; CRITICAL: anti-corruption-layer translates BOTH directions (read AND write) — partial implementations leak.

**`evolutionary-architecture.md`** — modules evolve; design for change; fitness functions; ADR-based evolution; CRITICAL: every module has at least one "fitness function" (automated test) protecting its boundary invariants.

Each fragment is ~150-200 lines fully fleshed out (representative content for the section headers; actual prose to be written at implementation time).

- [ ] **Step 6: Commit all 5 modular-monolith fragments together**

```bash
git add src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/{ddd-bounded-contexts,ports-and-adapters,module-decomposition-heuristics,anti-corruption-layer,evolutionary-architecture}.md
git commit -m "feat(p3-1): 5 modular-monolith fragments in Atlas resources (Task 8)

5 of 18 P3.1 fragments. Each follows spec §6.3 body structure (When to
Use, When NOT to Use, Architecture, Trade-offs, Implementation Patterns,
Quality Checks (with CRITICAL), Web Research Queries, Cross-references).

Fragments: ddd-bounded-contexts, ports-and-adapters,
module-decomposition-heuristics, anti-corruption-layer,
evolutionary-architecture.

QG-F1 + QG-M1 reference; tagged for design-modular-monolith.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

### Task 9: Write 4 deployment-topology fragments

**Files:**
- Create: `.../fragments/rollout-strategies-comparison.md` (merged blue-green + canary per R3)
- Create: `.../fragments/tenant-cohort-design.md`
- Create: `.../fragments/rollback-strategies.md`
- Create: `.../fragments/zero-downtime-migrations.md`

- [ ] **Step 1-4: Write each fragment**

Same template + 8-section structure as Task 8 fragments. Key headers:

**`rollout-strategies-comparison.md`** — blue-green vs canary vs rolling; trade-offs; tier-mapped defaults from Q3b; CRITICAL: every rollout strategy has a documented rollback budget (max time + cost).

**`tenant-cohort-design.md`** — by-tier vs by-region vs by-explicit-list vs by-tenant-hash; coordination with deployment-topology decision; CRITICAL: tenant cohort assignment is sticky — same tenant goes to same cohort across rollouts.

**`rollback-strategies.md`** — instant vs gradual; trigger conditions; coordination with synthetic-traffic monitoring; CRITICAL: rollback must be testable PRE-deploy — never deploy a rollback path that hasn't been exercised.

**`zero-downtime-migrations.md`** — expand-contract pattern; schema migrations in RLS vs schema-per-tenant; CRITICAL: every schema change has both expand AND contract migrations; never combine them in a single deploy.

- [ ] **Step 5: Commit**

```bash
git add src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/{rollout-strategies-comparison,tenant-cohort-design,rollback-strategies,zero-downtime-migrations}.md
git commit -m "feat(p3-1): 4 deployment-topology fragments (Task 9)

4 of 18 P3.1 fragments (post-R3 consolidation: blue-green +
canary merged into rollout-strategies-comparison).

Each per spec §6.3 8-section structure. Tagged for design-
deployment-topology; QG-F1 reference.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

### Task 10: Write 4 finops-model fragments

**Files:**
- Create: `.../fragments/unit-economics-saas.md`
- Create: `.../fragments/per-tenant-cost-attribution-with-hooks.md` (merged per R3)
- Create: `.../fragments/cost-allocation-shared-resources.md`
- Create: `.../fragments/budget-alerts-and-quotas.md`

- [ ] **Step 1-4: Write each fragment**

Key headers:

**`unit-economics-saas.md`** — LTV, CAC, gross margin per tenant, payback period; how tenant-tier affects each; CRITICAL: gross-margin-per-tenant must be measured per-tier, not aggregated (averaging hides loss-leaders).

**`per-tenant-cost-attribution-with-hooks.md`** — compute / storage / network / third-party attribution mechanisms; per-tenancy-model variants (RLS by_predicate, schema by_schema, cell-based by_cell_then_intra); instrumentation hooks for each; CRITICAL: cost-per-tenant must reconcile to cloud-bill total within 95% — unattributed waste is a red flag.

**`cost-allocation-shared-resources.md`** — overhead allocation models (proportional, fixed, tiered); how to handle infrastructure that doesn't trace cleanly to one tenant (e.g., shared compute pools); CRITICAL: shared-resource allocation must be deterministic — random allocation makes per-tenant cost noisy.

**`budget-alerts-and-quotas.md`** — when to alert, who to alert, escalation paths; per-tier ceilings; CRITICAL: alerts must include both early-warning (80% of ceiling) AND hard-stop (100%); single-threshold alerts cause surprises.

- [ ] **Step 5: Commit**

```bash
git add src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/{unit-economics-saas,per-tenant-cost-attribution-with-hooks,cost-allocation-shared-resources,budget-alerts-and-quotas}.md
git commit -m "feat(p3-1): 4 finops-model fragments (Task 10)

4 of 18 P3.1 fragments (post-R3 consolidation: per-tenant-attribution
+ instrumentation-hooks merged).

Each per spec §6.3. Tagged for design-finops-model; QG-F1 reference.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

### Task 11: Write 5 tier-model fragments

**Files:**
- Create: `.../fragments/tier-design-principles.md`
- Create: `.../fragments/feature-gating-patterns.md`
- Create: `.../fragments/limit-and-quota-design.md`
- Create: `.../fragments/tier-transition-economics.md`
- Create: `.../fragments/tier-cliff-avoidance.md`

- [ ] **Step 1-5: Write each fragment**

Key headers:

**`tier-design-principles.md`** — how to draw tier boundaries; usage-pattern clustering; price elasticity per tier; CRITICAL: tier boundaries align with usage-pattern clusters, NOT with arbitrary feature counts.

**`feature-gating-patterns.md`** — entitlement-based vs feature-flag-based vs tier-table-lookup; how to evolve gating without churn; CRITICAL: gating logic must be inspectable from outside the code path — a hidden gate is a CS surprise.

**`limit-and-quota-design.md`** — seats, API calls, storage, compute; rate limits vs absolute limits; daily/monthly vs lifetime; CRITICAL: every limit has a documented "what happens at the limit" (rate-limit / throttle / hard-stop / overage charge).

**`tier-transition-economics.md`** — upgrade paths (self-serve vs sales-assisted); downgrade economics; pro-rated billing; CRITICAL: downgrade flows must preserve data — never silently truncate at tier change.

**`tier-cliff-avoidance.md`** — what tier-cliffs are; how to smooth jumps; usage-based add-ons as a buffer; CRITICAL: tier-to-tier feature/price ratio should be ≤3× — larger cliffs incentivize tier abuse.

- [ ] **Step 6: Commit**

```bash
git add src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/{tier-design-principles,feature-gating-patterns,limit-and-quota-design,tier-transition-economics,tier-cliff-avoidance}.md
git commit -m "feat(p3-1): 5 tier-model fragments (Task 11)

5 of 18 P3.1 fragments. Total fragments after this commit: 18 (matches
hard cap per Q6/R3).

Each per spec §6.3. Tagged for design-tenant-tier-model; QG-F1 reference.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

### Task 12: Write 4 anti-patterns

**Files:**
- Create: `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/anti-patterns/tenancy-as-afterthought.md`
- Create: `.../anti-patterns/deployment-without-cohorts.md`
- Create: `.../anti-patterns/price-without-cost-attribution.md`
- Create: `.../anti-patterns/tier-cliff.md`

- [ ] **Step 1: Create the anti-patterns dir + first anti-pattern**

```bash
mkdir -p src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/anti-patterns
```

Per spec §6.5, each anti-pattern frontmatter MUST include `kind: anti-pattern`.

Template for `tenancy-as-afterthought.md`:

```markdown
---
id: tenancy-as-afterthought
title: Tenancy as Afterthought
kind: anti-pattern
category: foundation
qg_ref: QG-M2
last_reviewed: 2026-05-17
version: 1.0.0
status: active
severity: high
applicability:
  - greenfield: must-avoid
  - brownfield: must-fix
references:
  - "See ADR-008 + spec §6.1 for the BAM-prescribed remediation"
---

# Anti-pattern: Tenancy as Afterthought

## What it looks like

A SaaS codebase begins as single-tenant (or pre-product-market-fit). Multi-tenancy is added later, often as a sprint after the first sales call demanding "isolation guarantees". Schema gains a `tenant_id` column on tables that need it; the rest of the code path is updated piecemeal. Some queries forget the predicate. Some endpoints expose data without context.

## Why it's wrong

- Tenant context propagation becomes a manual discipline rather than a structural property. Every new feature must remember to add the predicate.
- The schema retrofit leaves "tenant-leaky" tables forever — joining them risks cross-tenant data exposure.
- Auth + session management was designed for single-tenant; adding tenancy on top breaks invariants (e.g., session-swap attacks).
- Tests written pre-tenancy don't verify isolation; the regression suite has a blind spot.

## What to do instead

- Decide tenancy BEFORE the first production tenant lands (per spec §5.1 #1 + ADR-006).
- Use `bmad-bam-design-tenancy-model` to lock in the model (RLS, schema-per-tenant, cell-based, or hybrid).
- Once decided, refactor INCREMENTALLY but ATOMICALLY per bounded context — never half-tenant a context.
- Add tenant-isolation tests as a blocking gate (QG-M2) — see `tenant-isolation-testing-patterns` fragment.

## Recovery path (brownfield)

Per `bmad-bam-plan-tenancy-retrofit` (P3.4):
1. Audit existing tables for missing `tenant_id`.
2. Backfill (migration: add column, populate from FK chain, set NOT NULL).
3. Enforce predicate via RLS or query-rewriting middleware.
4. Add isolation tests.

## Cross-references

- Fragment: `tenancy-decision-framework` (P2.1) — how to pick the tenancy model
- Fragment: `tenant-isolation-testing-patterns` — how to verify isolation
- Quality gate: QG-M2 (Tenant Isolation) — what evidence is needed
- ADR-008 — the BMM-canonical refactor that made tenancy-decision a first-class artifact
```

- [ ] **Step 2-4: Write the other 3 anti-patterns**

**`deployment-without-cohorts.md`** — deploying to all tenants at once; no canary; no rollback boundary; what to do instead (tenant-cohort-aware rollouts per `tenant-cohort-design` fragment).

**`price-without-cost-attribution.md`** — setting prices without per-tenant cost data; losing on power users; relying on aggregate margin; what to do instead (use `per-tenant-cost-attribution-with-hooks` + finops-baseline.json before pricing).

**`tier-cliff.md`** — huge feature/price jumps between tiers; tier-jumping abuse; downgrade-and-share workarounds; what to do instead (smooth pricing per `tier-cliff-avoidance` fragment; usage-based add-ons as buffer).

- [ ] **Step 5: Commit**

```bash
git add src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/anti-patterns/
git commit -m "feat(p3-1): 4 P3.1 anti-patterns (Task 12)

Per spec §6.5 + Q8 lock-in: tenancy-as-afterthought,
deployment-without-cohorts, price-without-cost-attribution, tier-cliff.

Each has kind: anti-pattern frontmatter, severity, applicability per
greenfield/brownfield. Cross-referenced to relevant fragments + gates.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

### Task 13: Write glossary CSV

**Files:**
- Create: `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/glossary-terms-introduced.csv`

- [ ] **Step 1: Write the 6-row CSV**

Content (per spec §3.Q9+R5):

```csv
term,one-sentence-definition,introduced-in-skill,status
bounded-context,"A cohesive boundary within a domain model where a single ubiquitous language applies (DDD).",bmad-bam-design-modular-monolith,provisional
tenant-cohort,"A deliberately-defined subset of tenants grouped for rollout, billing, or routing decisions.",bmad-bam-design-deployment-topology,provisional
per-tenant-cost-attribution,"Mechanism for assigning infrastructure cost (compute, storage, network) to specific tenant identities.",bmad-bam-design-finops-model,provisional
tier-cliff,"A discontinuity between tiers (price jump, feature jump) that incentivizes user workarounds rather than upgrades.",bmad-bam-design-tenant-tier-model,provisional
unit-economics,"The per-unit-of-business revenue, cost, and margin model; for SaaS the unit is typically a tenant or seat.",bmad-bam-design-finops-model,provisional
feature-gating,"The mechanism for enabling/disabling features based on a tenant's tier, role, or other attribute.",bmad-bam-design-tenant-tier-model,provisional
```

- [ ] **Step 2: Verify CSV parses + has 6 rows**

```bash
python3 -c "
import csv
with open('src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/glossary-terms-introduced.csv') as f:
    rows = list(csv.DictReader(f))
print(f'rows: {len(rows)}')
for r in rows: print(f'  {r[\"term\"]:<30} {r[\"introduced-in-skill\"]}')
"
```

Expected: 6 rows; each term + skill prints.

- [ ] **Step 3: Commit**

```bash
git add src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/glossary-terms-introduced.csv
git commit -m "feat(p3-1): glossary-terms-introduced.csv with 6 P3.1 terms (Task 13)

Per spec §3.Q9+R5: bounded-context, tenant-cohort, per-tenant-cost-
attribution, tier-cliff, unit-economics, feature-gating. All marked
provisional; PX-Glossary wave promotes to canonical .md files later.

rate-arbitrage deferred to P3.3 (design-tenant-rate-arbitrage skill
formalizes it).

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Phase 4: modular-monolith skill — full implementation (7 steps + template)

Skill 1 of 4 to fully implement. Independent of other P3.1 skills (no required inputs). Follows the design-tenancy-model template.

### Task 14: Write modular-monolith steps 01-04 (Create-mode)

**Files:**
- Create: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-modular-monolith/steps/step-01-c-elicit-context.md`
- Create: `.../steps/step-02-c-load-options.md`
- Create: `.../steps/step-03-c-decision-matrix.md`
- Create: `.../steps/step-04-c-recommendation.md`

- [ ] **Step 1: Write step-01 (elicit context)**

Each step file has frontmatter:

```markdown
---
step_id: 01-c-elicit-context
auto_runnable: false   # requires user input
gate: machine-checkable
inputs: []
outputs: [modular-monolith-context.json]
---

# Step 01 — Elicit modular-monolith context

## Purpose

Gather the inputs needed for module decomposition: domain summary, team size, codebase status (greenfield vs brownfield), and tenancy decision (if available).

## Actions

1. Ask the user:
   - **Domain summary** — describe the SaaS in 2-3 sentences. What's the core value? What sub-domains exist (billing, auth, integrations, etc.)?
   - **Team size** — solo / 2-5 / 5-20 / 20+ ?
   - **Codebase status** — greenfield / brownfield (existing monolith) / brownfield (migrating from microservices)
   - **Tenancy decision available?** If yes, confirm path to `tenancy-decision.json`; if no, warn that recommendations will be ungrounded for tenant-aware contexts.

2. Soft-input check (per spec §2.3 coupling matrix):
   ```bash
   TENANCY_JSON_PRIMARY="{project-root}/_bmad/bam/evidence/QG-F1/tenancy-decision.json"
   TENANCY_JSON_ALT="{project-root}/docs/architecture/tenancy-decision.json"
   if [ -f "$TENANCY_JSON_PRIMARY" ]; then TENANCY_JSON="$TENANCY_JSON_PRIMARY"
   elif [ -f "$TENANCY_JSON_ALT" ]; then TENANCY_JSON="$TENANCY_JSON_ALT"
   else TENANCY_JSON=""
        echo "WARN: tenancy-decision.json not found. Run bmad-bam-design-tenancy-model first for tenancy-aware recommendations."
   fi
   ```

3. Write `{project-root}/_bmad/bam/cache/modular-monolith-design/{date}/modular-monolith-context.json`:

```json
{
  "schema_version": "1.0",
  "elicited_at": "<ISO-8601>",
  "domain_summary": "<user input>",
  "team_size": "solo | 2-5 | 5-20 | 20+",
  "codebase_status": "greenfield | brownfield-monolith | brownfield-microservices",
  "tenancy_decision_path": "<path or empty>",
  "tenancy_model": "<if loaded, the model id; else unset>"
}
```

## Output

`modular-monolith-context.json` at the cache path above.

## Gate

Machine-checkable: file exists + required fields present.

## Next step

`step-02-c-load-options.md`
```

- [ ] **Step 2-4: Write step-02, step-03, step-04**

Following the design-tenancy-model pattern:

- **step-02-c-load-options.md** — load 4 options (DDD-pure / ports-pure / hybrid / vertical-slice) from Atlas's fragments via runtime Read with tool-aware path fallback (`.claude/skills/bmad-bam-agent-atlas/resources/fragments/ddd-bounded-contexts.md` etc.); present each with a 1-paragraph summary.

- **step-03-c-decision-matrix.md** — score each option against 6 axes (tenant-count fit, team size, domain complexity, migration cost, test ergonomics, AI-agent comprehensibility) on a 1-5 scale; weighted sum picks winner; default weighting: tenant-count 0.2, team 0.2, complexity 0.2, migration 0.15, test 0.15, AI-agent 0.1; output `decision-matrix.json` with scores.

- **step-04-c-recommendation.md** — read decision-matrix.json; pick the highest-scoring option (default hybrid if tied); write `recommendation.json` with reasoning paragraph + selected option + confidence level.

- [ ] **Step 5: Commit all 4 step files together**

```bash
git add src-v6/bmad-bam-platform/2-modules/bmad-bam-design-modular-monolith/steps/step-0[1-4]*
git commit -m "feat(p3-1): modular-monolith steps 01-04 — Create-mode elicit→recommend (Task 14)

Steps 01-04 of 07. Follows design-tenancy-model template:
  01-c-elicit-context (domain + team + codebase + tenancy soft-input)
  02-c-load-options (4 decomposition options from Atlas fragments)
  03-c-decision-matrix (6-axis scoring; weighted sum picks winner)
  04-c-recommendation (rationale + selected option)

Soft tenancy-decision.json input per spec §2.3 coupling matrix; warns
if missing, doesn't block.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

### Task 15: Write modular-monolith steps 05-07 + template

**Files:**
- Create: `.../steps/step-05-c-write-design.md`
- Create: `.../steps/step-06-c-record-adr.md`
- Create: `.../steps/step-07-v-verify-completeness.md`
- Create: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-modular-monolith/templates/module-decomposition.md.template`

- [ ] **Step 1: Write step-05 (write the design doc + JSON)**

Step-05 reads inputs (modular-monolith-context.json + decision-matrix.json + recommendation.json), populates the template, writes BOTH outputs:

```markdown
---
step_id: 05-c-write-design
auto_runnable: true
gate: machine-checkable
inputs: [modular-monolith-context.json, decision-matrix.json, recommendation.json]
outputs: [module-decomposition.md, module-decomposition.json]
template_ref: module-decomposition.md.template
---

# Step 05 — Write the module-decomposition design doc

## Purpose

Produce the human-readable module-decomposition.md (using the template) AND the machine-readable module-decomposition.json (the QG-F1 + QG-M1 evidence contract).

## Actions

1. Read template at `../templates/module-decomposition.md.template` (skill-relative; BMM convention).

2. Substitute placeholders from inputs (context + decision + recommendation).

3. Elicit bounded-context list from user — for each context: id, purpose (1 sentence), adapter_ports (list of port names), depends_on (list of other context ids), tenant_aware (bool).

4. Write the populated doc to `{project-root}/docs/architecture/module-decomposition.md`.

5. Write the structured JSON contract to TWO locations (per spec §3 + ADR-015):
   - `{project-root}/docs/architecture/module-decomposition.json`
   - `{project-root}/_bmad/bam/evidence/QG-F1/module-decomposition.json`

   Schema (per spec §3):

   ```json
   {
     "schema_version": "1.0",
     "decided_at": "<ISO-8601>",
     "decision": "ddd-pure | ports-pure | hybrid | vertical-slice",
     "bounded_contexts": [
       {
         "id": "<kebab-case-name>",
         "purpose": "<one-sentence>",
         "adapter_ports": ["<port-name>", "..."],
         "depends_on": ["<other-context-id>", "..."],
         "tenant_aware": true
       }
     ],
     "decision_matrix_ref": "_bmad/bam/cache/modular-monolith-design/<date>/decision-matrix.json"
   }
   ```

   `mkdir -p` parent dirs before writing.

## Output

`module-decomposition.md` + `module-decomposition.json` at locations above.

## Gate

Machine-checkable: both files exist + JSON validates against schema (bounded_contexts ≥2, each has adapter_ports + depends_on + tenant_aware).

## Next step

`step-06-c-record-adr.md`
```

- [ ] **Step 2: Write step-06 (record ADR)**

Step-06 writes a project-level ADR documenting the module decomposition decision (separate from ADR-015 which is the BAM module's design ADR). Saved to `_bmad/_memory/atlas/architecture-decisions/<date>-modular-monolith-decision.md` (project-level path; not the BAM-platform-module's _memory/).

Body covers: Context (what was elicited), Decision (chosen option + bounded contexts), Consequences, Alternatives, Revisit triggers.

- [ ] **Step 3: Write step-07 (verify completeness)**

Step-07 is the validate-mode step (gate: machine-checkable). It runs:

```bash
# Pseudocode for verify-completeness:
# 1. Check module-decomposition.md exists
# 2. Check module-decomposition.json exists at both paths
# 3. Validate JSON schema (schema_version, decision in [ddd-pure, ports-pure, hybrid, vertical-slice], bounded_contexts ≥2, each has adapter_ports + depends_on + tenant_aware)
# 4. Check no circular dependencies in bounded_contexts[*].depends_on (topo-sort)
# 5. Check project-level ADR exists at _bmad/_memory/atlas/architecture-decisions/
# 6. Emit success or list of missing/invalid criteria
```

- [ ] **Step 4: Write template (`module-decomposition.md.template`)**

Template with placeholders for:
- Frontmatter: id, title, status, date, persona, workflow_run_id
- ## Decision: <chosen-option> with confidence
- ## Context: domain + team + codebase summary
- ## Rationale: from recommendation.json
- ## Bounded contexts: table or list with id, purpose, adapter_ports, depends_on, tenant_aware
- ## Adapter port catalog (if ports-pure or hybrid)
- ## Decision matrix scores
- ## Quality gate references (QG-F1, QG-M1)
- ## Next steps (link to design-deployment-topology, design-finops-model)

- [ ] **Step 5: Run smoke-test to verify all step files + template are valid**

Update modular-monolith smoke-test.sh to verify 7 step files + 1 template present, then run:

```bash
src-v6/bmad-bam-platform/2-modules/bmad-bam-design-modular-monolith/tests/smoke-test.sh
```

Expected: PASS.

- [ ] **Step 6: Commit steps 05-07 + template + smoke-test update**

```bash
git add src-v6/bmad-bam-platform/2-modules/bmad-bam-design-modular-monolith/{steps/step-0[5-7]*,templates/,tests/smoke-test.sh}
git commit -m "feat(p3-1): modular-monolith steps 05-07 + template (Task 15)

Steps 05-07 complete the Create-mode workflow. Plus module-decomposition.md.template.

Step-05 writes BOTH outputs (md + json) per spec §3 / ADR-015. Step-07
verifies QG-M1 auto-criteria (schema_version, decision-enum, bounded_contexts
≥2, no circular deps).

Skill bmad-bam-design-modular-monolith now functionally complete; smoke
test verifies all 7 steps + template + manifest.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Phase 5: tier-model skill — full implementation (7 steps + template)

Skill 2 of 4. Independent of deployment-topology (soft input on tenancy-decision.json).

### Task 16: Write tier-model steps 01-04

**Files:**
- Create: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenant-tier-model/steps/step-01-c-elicit-context.md`
- Create: `.../steps/step-02-c-load-options.md`
- Create: `.../steps/step-03-c-decision-matrix.md`
- Create: `.../steps/step-04-c-recommendation.md`

- [ ] **Step 1: Write step-01 (elicit tier-design context)**

Asks user: target tenant types (consumer / SMB / enterprise / mixed), pricing strategy (freemium / paid-only / hybrid), business-model maturity (pre-MMR / early-growth / established), `--custom-tiers N` flag if used.

Soft-input check for `tenancy-decision.json` (some tenancy models naturally align with certain tier shapes).

- [ ] **Step 2: Write step-02 (load tier options)**

Loads the 5 default tiers (free/starter/pro/business/enterprise) from `tier-design-principles` fragment via Read with tool-aware path fallback. If `--custom-tiers N` set, presents the N-tier template instead.

- [ ] **Step 3: Write step-03 (tier-design decision matrix)**

For each tier, scores: target-segment-fit, price-point-alignment, feature-cliff-risk, upgrade-path-clarity. Outputs `decision-matrix.json` with per-tier scores.

- [ ] **Step 4: Write step-04 (recommendation)**

Picks the recommended tier-structure (default 5; or `N-tier` if flagged); writes `recommendation.json` with reasoning.

- [ ] **Step 5: Commit**

```bash
git add src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenant-tier-model/steps/step-0[1-4]*
git commit -m "feat(p3-1): tier-model steps 01-04 (Task 16)

Steps 01-04 of 07. --custom-tiers N flag handled in step-01 + step-02.
Soft tenancy-decision.json input.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

### Task 17: Write tier-model steps 05-07 + template

**Files:**
- Create: `.../steps/step-05-c-write-design.md`
- Create: `.../steps/step-06-c-record-adr.md`
- Create: `.../steps/step-07-v-verify-completeness.md`
- Create: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenant-tier-model/templates/tier-model.md.template`

- [ ] **Step 1: Write step-05 (write tier-model.md + tier-model.json)**

Step-05 writes both outputs. The JSON schema (per spec §3.Q5+R2):

```json
{
  "schema_version": "1.0",
  "tier_count": 5,
  "custom_tiers_mode": false,
  "tiers": [
    {
      "id": "free",
      "price_per_month_usd": 0,
      "limits": { "seats": 1, "api_calls_per_month": 1000, "storage_gb": 1, "compute_hours": 5 },
      "features": ["basic_dashboards", "community_support"],
      "rollout_tier_hint": "aggressive_canary",
      "cost_ceiling_usd_per_month_hint": 0.50,
      "upgrade_mode": "self_service",
      "upgrade_path": "starter"
    }
    // ... starter, pro, business, enterprise
  ],
  "transitions": {
    "any_downgrade": "rate_arbitrage_check"
  }
}
```

Elicits values from user; uses defaults for hints (per Q3b lock-in).

- [ ] **Step 2-4: Write steps 06, 07 + template**

Step-06 writes project-level ADR.
Step-07 verifies QG-F1 C5 (tier_count is 5 OR 3-7 with custom_tiers_mode: true).
Template covers: frontmatter + Decision + Context + Tier matrix table + Limits per tier + Features per tier + Transitions + QG-F1 reference.

- [ ] **Step 5: Run smoke-test + commit**

```bash
git add src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenant-tier-model/{steps/step-0[5-7]*,templates/,tests/smoke-test.sh}
git commit -m "feat(p3-1): tier-model steps 05-07 + template (Task 17)

Tier-model skill functionally complete. Step-05 enforces Q5 schema
(tier_count 5 default; 3-7 with custom_tiers_mode flag). Hint fields
(rollout_tier_hint, cost_ceiling_usd_per_month_hint, upgrade_mode)
populated per Q3b defaults; downstream skills may override.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Phase 6: deployment-topology skill — full implementation (7 steps + template)

Skill 3 of 4. REQUIRED input: tenancy-decision.json (per Q3 spec lock-in).

### Task 18: Write deployment-topology step-01 with required-input enforcement

**Files:**
- Create: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-deployment-topology/steps/step-01-c-elicit-context.md`

- [ ] **Step 1: Write step-01 with G4-spec enforcement**

```markdown
---
step_id: 01-c-elicit-context
auto_runnable: false
gate: machine-checkable
inputs: [tenancy-decision.json]
outputs: [deployment-topology-context.json]
---

# Step 01 — Elicit deployment-topology context (REQUIRES tenancy-decision.json)

## Required input precondition check

Per spec §2.3 (coupling matrix) + Q3 lock-in + ADR-015 enforcement-mechanism note:

```bash
TENANCY_JSON_PRIMARY="${PROJECT_ROOT:-$(pwd)}/_bmad/bam/evidence/QG-F1/tenancy-decision.json"
TENANCY_JSON_ALT="${PROJECT_ROOT:-$(pwd)}/docs/architecture/tenancy-decision.json"

if [ ! -f "$TENANCY_JSON_PRIMARY" ] && [ ! -f "$TENANCY_JSON_ALT" ]; then
    cat >&2 <<'EOF'
ERROR: tenancy-decision.json not found.
       bmad-bam-design-deployment-topology REQUIRES the tenancy decision as upstream input.
       Run /bmad-bam-design-tenancy-model first.

       Searched:
         {project-root}/_bmad/bam/evidence/QG-F1/tenancy-decision.json
         {project-root}/docs/architecture/tenancy-decision.json
EOF
    exit 64   # POSIX usage error
fi

if [ -f "$TENANCY_JSON_PRIMARY" ]; then
    TENANCY_JSON="$TENANCY_JSON_PRIMARY"
else
    TENANCY_JSON="$TENANCY_JSON_ALT"
fi
```

## Actions

1. Read tenancy decision: `cat "$TENANCY_JSON"` — extract `tenancy_model` field.
2. Ask user: target environments (single-region / multi-region / global); risk-tolerance per tier; rollback SLA; existing CI/CD platform.
3. Soft-check: try loading `tier-model.json` (per coupling matrix); if absent, will prompt for tier list inline in step-02.
4. Write `deployment-topology-context.json` to cache.

## Output

`deployment-topology-context.json`.

## Gate

Machine-checkable: file exists + tenancy_model field captured + envs/risk inputs present.

## Next step

`step-02-c-load-options.md`
```

- [ ] **Step 2: Commit**

```bash
git add src-v6/bmad-bam-platform/2-modules/bmad-bam-design-deployment-topology/steps/step-01-c-elicit-context.md
git commit -m "feat(p3-1): deployment-topology step-01 with required-input enforcement (Task 18)

step-01 implements explicit required-input check for tenancy-decision.json
per ADR-015 enforcement-mechanism note (G4 spec). exits 64 (POSIX usage)
with diagnostic if absent. Uses Concern-5 tool-aware path fallback.

Per spec §2.3 Q3 lock-in (REQUIRED).

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

### Task 19: Write deployment-topology steps 02-04

Similar pattern to modular-monolith steps 02-04 but adapted for deployment.

- [ ] **Step 1-4: Write steps 02-04**

- step-02 loads rollout-strategy options (blue-green / canary / per-cell-blue-green / hybrid) — choose primary primitive based on `tenancy_model` (per Q3 coupling table); load fragments via tool-aware path fallback.

- step-03 builds a decision matrix scoring each rollout option against: blast radius, rollback complexity, tier-tolerance fit, infrastructure cost; produces `decision-matrix.json`.

- step-04 picks the rollout primitive + per-tier strategy from Q3b defaults (free=aggressive-canary, starter=canary, pro=canary, business=blue-green-synthetics, enterprise=blue-green-pilot); user may override per tier.

- [ ] **Step 5: Commit**

```bash
git add src-v6/bmad-bam-platform/2-modules/bmad-bam-design-deployment-topology/steps/step-0[2-4]*
git commit -m "feat(p3-1): deployment-topology steps 02-04 (Task 19)

Step-02 filters rollout options by tenancy_model (per coupling matrix).
Step-04 applies Q3b per-tier defaults; user can override.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

### Task 20: Write deployment-topology steps 05-07 + template

**Files:**
- Create: `.../steps/step-05-c-write-design.md`
- Create: `.../steps/step-06-c-record-adr.md`
- Create: `.../steps/step-07-v-verify-completeness.md`
- Create: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-deployment-topology/templates/deployment-topology.md.template`

- [ ] **Step 1: Write step-05 (produces both outputs)**

JSON schema per spec §3 (deployment-topology.json):

```json
{
  "schema_version": "1.0",
  "decided_at": "<ISO-8601>",
  "rollout_primitive": "app-canary | per-schema-rollout | per-cell-blue-green | hybrid",
  "rollout_per_tier": {
    "free": "aggressive_canary",
    "starter": "canary",
    "pro": "canary",
    "business": "blue_green_synthetics",
    "enterprise": "blue_green_pilot"
  },
  "tenant_cohort_strategy": "by-tenant-id-hash | by-region | by-tier | by-explicit-list",
  "rollback_strategy": "<description>",
  "tenancy_input_ref": "_bmad/bam/evidence/QG-F1/tenancy-decision.json"
}
```

- [ ] **Step 2-4: Write step-06, step-07, template**

- step-06: write project-level ADR.
- step-07: verify outputs + schema (rollout_per_tier has entries for ALL tier ids).
- template: covers Decision + Tenancy alignment + Per-tier rollout matrix + Tenant cohort strategy + Rollback strategy + QG-F1 reference.

- [ ] **Step 5: Run smoke-test + commit**

```bash
git add src-v6/bmad-bam-platform/2-modules/bmad-bam-design-deployment-topology/{steps/step-0[5-7]*,templates/,tests/smoke-test.sh}
git commit -m "feat(p3-1): deployment-topology steps 05-07 + template (Task 20)

Deployment-topology skill functionally complete. Schema enforces
rollout_per_tier coverage of all tier ids (cross-skill coherence check
for verify-coherence in Phase 7).

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Phase 7: finops-model skill — full implementation (8 steps + template + verify-coherence)

Skill 4 of 4. REQUIRED inputs: 3 upstream artifacts. Adds the 8th step `verify-coherence` per R2 spec.

### Task 21: Write finops-model step-01 with 3 required-input enforcement

**Files:**
- Create: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-finops-model/steps/step-01-c-elicit-context.md`

- [ ] **Step 1: Write step-01 with 3-input check**

Mirror Task 18 but check ALL 3 required inputs (tenancy-decision.json + tier-model.json + deployment-topology.json). Each missing → ERROR with explicit guidance ("Run /bmad-bam-design-X first"). Exit 64 if any missing.

- [ ] **Step 2: Commit**

```bash
git add src-v6/bmad-bam-platform/2-modules/bmad-bam-design-finops-model/steps/step-01-c-elicit-context.md
git commit -m "feat(p3-1): finops step-01 with 3 required-input enforcement (Task 21)

Tightest-coupled skill in P3.1; requires all 3 upstream Foundation
artifacts. Diagnostic enumerates which input is missing + which skill
to run.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

### Task 22: Write finops-model steps 02-07

- [ ] **Step 1-6: Write steps 02-07** following the design-tenancy-model pattern. Adapted for finops:

- step-02: load 4 attribution-affordance options from `per-tenant-cost-attribution-with-hooks` fragment (filtered by `tenancy_model` from input).
- step-03: decision matrix — score attribution mechanisms per axes (accuracy, instrumentation cost, blast radius).
- step-04: recommendation (picks attribution + budgeting strategy).
- step-05: write `finops-baseline.md` + `finops-baseline.json` per spec §3 schema (unit_economics, per_tenant_attribution, cost_ceiling_per_tier, budget_alert_thresholds).
- step-06: project-level ADR.
- step-07: verify finops outputs (3 files) + verify schema.

- [ ] **Step 7: Commit**

```bash
git add src-v6/bmad-bam-platform/2-modules/bmad-bam-design-finops-model/steps/step-0[2-7]*
git commit -m "feat(p3-1): finops steps 02-07 + template (Task 22)

Steps 02-07 implement attribution-affordance selection, unit-economics
matrix, cost-ceiling assignment, and budget-alert thresholds.

Step-05 writes the QG-F1 keystone artifact finops-baseline.json
consumed by all downstream gates.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

### Task 23: Write finops-model step-08 (verify-coherence)

**Files:**
- Create: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-finops-model/steps/step-08-v-verify-coherence.md`

This is the 8th step unique to finops-model. Implements the algorithm spec'd in §3.R2.

- [ ] **Step 1: Write step-08**

```markdown
---
step_id: 08-v-verify-coherence
auto_runnable: true
gate: machine-checkable
inputs: [tenancy-decision.json, tier-model.json, deployment-topology.json, finops-baseline.json]
outputs: [foundation-coherence.json]
---

# Step 08 — Verify Foundation coherence (writes foundation-coherence.json)

## Purpose

The 5 Foundation skills are designed with hint-vs-override semantics (per spec §3.R2): tier-model.json declares tentative hints (`rollout_tier_hint`, `cost_ceiling_usd_per_month_hint`) that downstream skills may override. This step reads all 4 artifacts post-decision and produces `foundation-coherence.json` — the cross-artifact coherence report consumed by QG-F1 auto-criterion C3.

## Algorithm

(Pseudocode in §3.R2 of spec; concrete Python implementation here.)

```python
import json
import os
from datetime import datetime, timezone

project_root = os.environ.get("PROJECT_ROOT", os.getcwd())
evidence_dir = os.path.join(project_root, "_bmad/bam/evidence/QG-F1")

tier = json.load(open(os.path.join(evidence_dir, "tier-model.json")))
deployment = json.load(open(os.path.join(evidence_dir, "deployment-topology.json")))
finops = json.load(open(os.path.join(evidence_dir, "finops-baseline.json")))

mismatches = []

for t in tier["tiers"]:
    tier_id = t["id"]

    # Rollout-tier hint vs deployment actual
    hinted = t.get("rollout_tier_hint")
    actual = deployment["rollout_per_tier"].get(tier_id)
    if hinted and actual and hinted != actual:
        mismatches.append({
            "field": "rollout_tier",
            "tier_id": tier_id,
            "hinted_in_tier_model": hinted,
            "actual_in_deployment": actual,
            "severity": "warn"
        })

    # Cost-ceiling hint vs finops actual (20% drift threshold)
    hinted_cost = t.get("cost_ceiling_usd_per_month_hint")
    actual_cost = finops["cost_ceiling_per_tier"].get(tier_id)
    if hinted_cost is not None and actual_cost is not None and hinted_cost > 0:
        drift_pct = (actual_cost - hinted_cost) / hinted_cost * 100
        if abs(drift_pct) > 20:
            mismatches.append({
                "field": "cost_ceiling",
                "tier_id": tier_id,
                "hinted": hinted_cost,
                "actual": actual_cost,
                "drift_pct": round(drift_pct, 1),
                "severity": "warn"
            })

result = {
    "schema_version": "1.0",
    "verified_at": datetime.now(timezone.utc).isoformat(),
    "coherent": len([m for m in mismatches if m["severity"] == "error"]) == 0,
    "mismatches": mismatches
}

out_path = os.path.join(evidence_dir, "foundation-coherence.json")
os.makedirs(os.path.dirname(out_path), exist_ok=True)
with open(out_path, "w") as f:
    json.dump(result, f, indent=2)

print(f"verify-coherence: coherent={result['coherent']} mismatches={len(mismatches)}")
```

## Output

`{project-root}/_bmad/bam/evidence/QG-F1/foundation-coherence.json`.

## Gate

Machine-checkable: file exists + `coherent` field is bool + `mismatches` is list. QG-F1 C3 verifies `coherent: true` (warn-level mismatches don't fail; only `severity: error` mismatches do — v6.0 has zero error-level rules).

## Failure semantics

`coherent: false` (only on error-severity mismatch) → QG-F1 C3 auto-criterion fails. User reconciles by re-running upstream skill OR documenting explicit override in `decision.md`.
```

- [ ] **Step 2: Commit**

```bash
git add src-v6/bmad-bam-platform/2-modules/bmad-bam-design-finops-model/steps/step-08-v-verify-coherence.md
git commit -m "feat(p3-1): finops step-08 verify-coherence (Task 23)

Implements R2 algorithm: per-tier compare tier-model hints vs
deployment/finops actuals. Outputs foundation-coherence.json
consumed by QG-F1 C3.

20% drift threshold for cost_ceiling. All v6.0 mismatches are warn-
severity (don't fail gate); errors reserved for future revisions.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

### Task 24: Write finops-model template + run smoke-test

**Files:**
- Create: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-finops-model/templates/finops-baseline.md.template`

- [ ] **Step 1: Write template**

Template covers: frontmatter + Decision summary + Unit economics block + Per-tenant attribution mechanism table + Cost-ceiling per tier table + Budget alert thresholds + Cross-references to upstream artifacts + QG-F1 reference.

- [ ] **Step 2: Run smoke-test (verifies 8 steps now)**

```bash
src-v6/bmad-bam-platform/2-modules/bmad-bam-design-finops-model/tests/smoke-test.sh
echo "exit=$?"
```

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src-v6/bmad-bam-platform/2-modules/bmad-bam-design-finops-model/{templates/,tests/smoke-test.sh}
git commit -m "feat(p3-1): finops template + smoke-test verifies 8 steps (Task 24)

Skill functionally complete. Smoke-test now checks all 8 steps present
(7 standard + 1 verify-coherence).

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Phase 8: Quality gates (QG-F1 + QG-M1)

### Task 25: Write QG-F1 checklist

**Files:**
- Create: `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/checklists/QG-F1.md`

- [ ] **Step 1: Write QG-F1.md**

Per spec §5 outline + R8 prerequisite + G9 C0 pre-criterion. Full content per spec §5 QG-F1 outline (with the 6 auto-criteria + 4 human-review + CRITICAL + evidence destination + web queries).

- [ ] **Step 2: Commit**

```bash
git add src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/checklists/QG-F1.md
git commit -m "feat(p3-1): QG-F1 (Foundation, blocking) checklist (Task 25)

Per spec §5 outline + G9 C0 prerequisite + R8 wording. depends-on: [];
evidence-depends-on: 6 JSON files. Auto-checkable 60%, human-review 40%.
CRITICAL: C1, C2, C3, H1.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

### Task 26: Write QG-M1 (partial) checklist

**Files:**
- Create: `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/checklists/QG-M1.md`

- [ ] **Step 1: Write QG-M1.md**

Per spec §5's QG-M1 outline (G5 fix). criticality: partial; status: partial; auto-checkable 100, human-review 0. 5 auto-criteria. Frontmatter notes promotion to blocking in P3.2.

- [ ] **Step 2: Commit**

```bash
git add src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/checklists/QG-M1.md
git commit -m "feat(p3-1): QG-M1 (Module Architecture, partial) checklist (Task 26)

v0.1.0 partial. 5 auto-criteria (G5 spec) on module-decomposition.json
schema + topological-sort check. H-criteria deferred to P3.2 (lifecycle
skills provide module-evolution evidence).

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Phase 9: Customize-template overlay + audit + manifest

### Task 27: Write customize-template overlay

**Files:**
- Create: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-modular-monolith/customize-template/bmad-create-architecture/customize.toml`

- [ ] **Step 1: Write the overlay (minimal per Q10/R6)**

```toml
# Customize-template overlay for BMM's bmad-create-architecture skill.
# Loaded via BMAD's three-layer merge when both BAM platform module and
# BMM are installed. Spec §7.2 + ADR-015 G6 path convention.

[workflow]

activation_steps_append = [
  "If this project is a multi-tenant SaaS, consult BAM's Foundation skills (`/bmad-bam-design-tenancy-model` + `/bmad-bam-design-modular-monolith`) before architecture decisions — tenancy choice and bounded-context decomposition are load-bearing."
]

persistent_facts = [
  "file:{project-root}/_bmad-output/bbp/project-context.md"
]
```

- [ ] **Step 2: Commit**

```bash
git add src-v6/bmad-bam-platform/2-modules/bmad-bam-design-modular-monolith/customize-template/
git commit -m "feat(p3-1): customize-template overlay for bmad-create-architecture (Task 27)

Per Q10/R6 + G6 path-convention assumption: minimal overlay at
<bam-skill-dir>/customize-template/<bmm-skill-name>/customize.toml.

1 activation_steps_append entry (BAM Foundation reminder) + 1
persistent_facts entry (BAM v6 sentinel path). Validates §7.2 BAM→BMM-
core overlay mechanism with smallest possible footprint.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

### Task 28: Update audit check (i) workflow allow-list

**Files:**
- Modify: `tests/audit-marketplace.sh`

- [ ] **Step 1: Locate check (i)**

```bash
grep -n "Check (i)\|workflow.*allow-list\|known workflow\|workflow_names" tests/audit-marketplace.sh
```

Identify where the workflow allow-list is defined.

- [ ] **Step 2: Add 4 new entries**

Edit the allow-list to include:
- `bmad-bam-design-modular-monolith`
- `bmad-bam-design-deployment-topology`
- `bmad-bam-design-finops-model`
- `bmad-bam-design-tenant-tier-model`

- [ ] **Step 3: Run audit**

```bash
tests/audit-marketplace.sh
echo "exit=$?"
```

Expected: PASS (exit 0).

- [ ] **Step 4: Commit**

```bash
git add tests/audit-marketplace.sh
git commit -m "test(p3-1): audit check (i) recognizes 4 new P3.1 workflows (Task 28)

Adds bmad-bam-design-{modular-monolith,deployment-topology,finops-model,
tenant-tier-model} to the workflow allow-list. Real marketplace.json
will fail (i) until Task 29 adds the marketplace entries.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

### Task 29: Update module-help.csv + marketplace.json

**Files:**
- Modify: `src-v6/bmad-bam-platform/module-help.csv`
- Modify: `.claude-plugin/marketplace.json`

- [ ] **Step 1: Update module-help.csv (4 new rows + 4 migrations)**

Insert 4 new rows per §13.1 of spec. Migrate the 4 existing menu codes (A→ZAT, S→ZST, F→ZFI, D→ZTN) via edit on the existing rows (only the `menu-code` column changes).

`_meta` row UNCHANGED per G7 retraction.

- [ ] **Step 2: Update marketplace.json**

Add 4 new skill paths to the bmad-bam-platform plugin's skills array:

```
"./src-v6/bmad-bam-platform/2-modules/bmad-bam-design-modular-monolith",
"./src-v6/bmad-bam-platform/2-modules/bmad-bam-design-deployment-topology",
"./src-v6/bmad-bam-platform/2-modules/bmad-bam-design-finops-model",
"./src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenant-tier-model"
```

Bump plugin version from current → next minor (e.g., 0.4.0 → 0.5.0).

- [ ] **Step 3: Verify both files**

```bash
python3 -c "
import json, csv
m = json.load(open('.claude-plugin/marketplace.json'))
for p in m['plugins']:
    if p['name'] == 'bmad-bam-platform':
        print('version:', p['version'], 'skills:', len(p['skills']))
        for s in p['skills']: print(' ', s)

print()
with open('src-v6/bmad-bam-platform/module-help.csv') as f:
    rows = list(csv.DictReader(f))
print(f'CSV rows: {len(rows)} (expect: 1 _meta + 4 existing + 4 new = 9)')
print('  menu-codes:', sorted({r['menu-code'] for r in rows if r['menu-code']}))
"
```

Expected: marketplace has 8 skills (4 existing + 4 new); CSV has 9 rows; menu codes show 8 Z-prefix codes.

- [ ] **Step 4: Run full Tier-1 audit**

```bash
tests/audit-marketplace.sh
tests/audit-marketplace-fixtures.sh
echo "exit=$?"
```

Expected: both PASS.

- [ ] **Step 5: Commit**

```bash
git add src-v6/bmad-bam-platform/module-help.csv .claude-plugin/marketplace.json
git commit -m "feat(p3-1): module-help.csv + marketplace.json — 4 new skills + Z-prefix migration (Task 29)

module-help.csv: 4 new rows (ZMM/ZDP/ZFM/ZTT); 4 existing rows migrated
to Z-prefix (A→ZAT, S→ZST, F→ZFI, D→ZTN per ADR-013). _meta row
UNCHANGED per G7 retraction (intentional _bmad/bam-platform/llms.txt
naming).

marketplace.json: 4 new skill paths; plugin version bumped.

Tier-1 audit + fixtures green.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Phase 10: ADR + docs + llms.txt

### Task 30: Write ADR-015

**Files:**
- Create: `_bmad/_memory/atlas/architecture-decisions/2026-05-17-015-p3-1-foundation-decisions.md`

- [ ] **Step 1: Write the ADR**

Per spec §4 (frontmatter) + the body draft in spec §4. Full document includes frontmatter (id, title, status: accepted, date: 2026-05-17, persona: atlas, related-personas: [], modules: [bmad-bam-platform], assumptions × 4, dependencies-on-other-decisions × 8, generated-by, authored-by) + Context + Decision + Consequences + Alternatives + Revisit triggers.

- [ ] **Step 2: Commit**

```bash
git add _bmad/_memory/atlas/architecture-decisions/2026-05-17-015-p3-1-foundation-decisions.md
git commit -m "feat(p3-1): ADR-015 — P3.1 Foundation Skills design decisions (Task 30)

Full body per spec §4 draft. Documents Q1-Q10 + R1-R12 + G1-G10 self-
review revisions. Dependencies: 006, 008, 009, 010, 011, 012, 013, 014.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

### Task 31: Update INDEX.md + roadmap §13 + regen llms.txt

**Files:**
- Modify: `_bmad/_memory/atlas/architecture-decisions/INDEX.md`
- Modify: `docs/v6-detailed-roadmap.md`
- Modify: `_bmad/bam-platform/llms.txt` (regenerated)

- [ ] **Step 1: Add ADR-015 row to INDEX.md**

Edit `_bmad/_memory/atlas/architecture-decisions/INDEX.md`:

```
| 2026-05-17-015 | Wave P3.1 Foundation Skills design decisions (4 skills + QG-F1 + QG-M1 partial) | accepted | 2026-05-17 |
```

- [ ] **Step 2: Add ADR-015 row to roadmap §13**

```bash
grep -n "^## 13\|^### 13\." docs/v6-detailed-roadmap.md
```

Locate §13 (ADR ledger) and add row.

- [ ] **Step 3: Regenerate llms.txt**

```bash
tools/generate-llms-txt.sh bbp
```

Verify the output at `_bmad/bam-platform/llms.txt` reflects the new skill catalog (8 total skills with Z-prefix codes).

- [ ] **Step 4: Commit**

```bash
git add _bmad/_memory/atlas/architecture-decisions/INDEX.md docs/v6-detailed-roadmap.md _bmad/bam-platform/llms.txt
git commit -m "docs(p3-1): INDEX + roadmap §13 + llms.txt regenerated (Task 31)

ADR-015 row added to INDEX.md + roadmap §13 ADR ledger.
llms.txt regenerated post-Task-29 to reflect 8-skill catalog with
Z-prefix codes.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Phase 11: Final verification + push + PR

### Task 32: Full Tier-1 sweep + Tier-2 dry-run

- [ ] **Step 1: Run all Tier-1 tests**

```bash
echo "=== Tier-1 sweep ==="
tests/audit-marketplace.sh >/dev/null 2>&1 && echo "[PASS] audit" || echo "[FAIL] audit"
tests/audit-marketplace-fixtures.sh >/dev/null 2>&1 && echo "[PASS] fixtures" || echo "[FAIL] fixtures"
tests/wave-0/run-smoke-test.sh >/dev/null 2>&1 && echo "[PASS] wave-0" || echo "[FAIL] wave-0"
tests/p2/run-real-install-test.sh >/dev/null 2>&1 && echo "[PASS] p2 real-install" || echo "[FAIL] p2 real-install"

# Smoke-tests for 5 platform skills (4 new + 1 existing)
for skill in design-tenancy-model design-modular-monolith design-deployment-topology design-finops-model design-tenant-tier-model; do
    if src-v6/bmad-bam-platform/2-modules/bmad-bam-$skill/tests/smoke-test.sh >/dev/null 2>&1; then
        echo "[PASS] $skill smoke"
    else
        echo "[FAIL] $skill smoke"
    fi
done
```

Expected: all PASS.

- [ ] **Step 2: Tier-2 dry-run (BAM_TIER2=1)**

```bash
BAM_TIER2=1 tests/integration/run-real-install.sh
echo "exit=$?"
```

Expected: install + finalize + sentinel emit; exit 0. Verifies the new skills land at `.claude/skills/` + manifest registers them.

- [ ] **Step 3: Verify Foundation coherence E2E**

Run all 5 Foundation skills against a test project (using subagent or manually); verify QG-F1 evidence files appear + foundation-coherence.json reports coherent. Document the test command sequence.

```bash
# Manual or subagent-driven exercise:
# 1. mktemp -d → install bmm,bbp via bmad-cli.js
# 2. Invoke /bmad-bam-design-tenancy-model → produces tenancy-decision.json
# 3. Invoke /bmad-bam-design-modular-monolith → produces module-decomposition.json
# 4. Invoke /bmad-bam-design-tenant-tier-model → produces tier-model.json
# 5. Invoke /bmad-bam-design-deployment-topology → produces deployment-topology.json
# 6. Invoke /bmad-bam-design-finops-model → produces finops-baseline.json + foundation-coherence.json
# 7. Verify all 6 files exist at _bmad/bam/evidence/QG-F1/
# 8. cat foundation-coherence.json → coherent: true
```

This is documented but not enforced as a hard test step (manual; Plan C R6 optional).

### Task 33: Push branch + open PR

- [ ] **Step 1: Push**

```bash
git push origin feat/v6-p3-1-foundation
```

Expected: clean push.

- [ ] **Step 2: Open PR**

```bash
gh pr create --base feat/bam-v3-pure-kb --head feat/v6-p3-1-foundation \
  --title "feat(p3-1): Foundation Skills (4 skills + QG-F1 + QG-M1 partial)" \
  --body "$(cat <<'EOF'
## Summary

Wave P3.1 ships 4 new BAM v6 platform workflow skills + 2 quality gates. Foundation tier of `bmad-bam-platform` now complete (1 from P2.1 + 4 from P3.1 = 5/5).

**Skills shipped:** ZMM modular-monolith, ZDP deployment-topology, ZFM finops-model, ZTT tier-model.
**Gates:** QG-F1 (blocking, full) + QG-M1 (partial; full in P3.2).
**Menu code migration (ADR-013):** A/S/F/D → ZAT/ZST/ZFI/ZTN.

**Spec:** `docs/superpowers/specs/2026-05-17-p3-1-foundation-design.md` (896 lines, brainstorm-locked).
**ADR:** ADR-015 (depends on 006, 008, 009, 010, 011, 012, 013, 014).

## What's in the PR

| Component | Count | Files |
|---|---|---|
| New skills | 4 | `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-*` |
| New fragments | 18 | `1-foundation/.../resources/fragments/*` (hard cap 5/skill) |
| New anti-patterns | 4 | `1-foundation/.../resources/anti-patterns/*` |
| Glossary CSV | 1 (6 terms) | `1-foundation/.../resources/glossary-terms-introduced.csv` |
| Quality gates | 2 | `QG-F1.md`, `QG-M1.md` |
| Customize-template overlay | 1 | `.../bmad-bam-design-modular-monolith/customize-template/bmad-create-architecture/customize.toml` |
| ADR | 1 | ADR-015 |
| Modified | — | module-help.csv, marketplace.json, audit check (i), INDEX, roadmap §13, llms.txt |

## Cross-validation checklist (Roadmap §4 universal + §3 P3.1)

- [ ] Tier-1 audit checks (a)-(i) all green
- [ ] Tier-2 (BAM_TIER2=1) passes
- [ ] All 5 Foundation skills' smoke-tests pass
- [ ] No regression on design-tenancy-model smoke
- [ ] QG-F1 + QG-M1 frontmatter per spec §8.1
- [ ] Each fragment follows spec §6.3 body structure
- [ ] Web queries use {date} placeholder
- [ ] Each fragment has CRITICAL quality check
- [ ] Anti-patterns have kind: anti-pattern frontmatter
- [ ] llms.txt regenerated
- [ ] Plan C R6 manual ratification (optional per Roadmap §3 P3.1)

## Plan deviations from spec (recorded for future bisect)

- G7 retracted after R3 self-review: `_meta` row's `_bmad/bam-platform/llms.txt` is intentional per `tools/generate-llms-txt.sh:16` (not a Concern-5 stray); no `_meta` change.
- Menu codes use ADR-013 3-char Z-prefix (corrected from initial 2-char proposal Q9).
- Modular-monolith customize-template overlay uses BAM-internal convention `<bam-skill-dir>/customize-template/<bmm-skill-name>/customize.toml` (spec §7.2 doesn't specify; assumption documented in ADR-015).

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Expected: PR URL returned.

---

## Self-Review

Run this checklist against the spec before claiming the plan complete.

**1. Spec coverage:**
- ✓ Q1 evidence schema → Tasks 1, 25 (QG-F1)
- ✓ Q2 modular-monolith → Tasks 4, 14, 15
- ✓ Q3 deployment-topology coupling + tier defaults → Tasks 5, 18, 19, 20
- ✓ Q4 finops inputs → Tasks 6, 21, 22, 23, 24
- ✓ Q5 tier-model shape → Tasks 7, 16, 17
- ✓ Q6 fragment density → Tasks 8, 9, 10, 11 (18 total)
- ✓ Q7 stand-alone fragments → enforced by Task 14 step-02 (cite only own fragments)
- ✓ Q8 anti-patterns → Task 12
- ✓ Q9 glossary → Task 13
- ✓ Q10 overlay → Task 27
- ✓ R1 JSON contracts → Tasks 1, 15, 17, 20, 22
- ✓ R2 verify-coherence → Task 23
- ✓ R3 fragment consolidation → Tasks 8-11 distribution
- ✓ R4 anti-pattern rename → Task 12 uses correct name
- ✓ R5 6 glossary terms → Task 13 has 6
- ✓ R6 activation_steps_append → Task 27
- ✓ R7 coupling matrix → enforced in manifests + step-01 checks
- ✓ R8 QG-M1 partial → Task 26
- ✓ R9 Z-prefix menu codes → Task 29
- ✓ R10 smoke-test contract → built into each scaffolding task (4, 5, 6, 7) + each completion (15, 17, 20, 24)
- ✓ R11 R3.1.4/R3.1.5 risks → mitigations baked into Tasks 27 (smoke-test overlay) and 23 (coherence step)
- ✓ R12 ADR dependency chain → Task 30

**2. Placeholder scan:** zero TODO/TBD/FIXME in the plan.

**3. Type consistency:** all skill names use `bmad-bam-design-<kebab-case>`; all JSON schemas reference field names consistent with spec §3 schema drafts; verify-coherence algorithm's field refs match deployment-topology.json + finops-baseline.json schemas defined in spec §3.

---

**Plan complete and saved to `docs/superpowers/plans/2026-05-17-p3-1-foundation.md`. Two execution options:**

**1. Subagent-Driven (recommended)** — Dispatch a fresh subagent per task, review between tasks, fast iteration. (Same approach used for Concern 5; proven workflow.)

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?
