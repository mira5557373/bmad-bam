---
step_id: 02-c-load-options
auto_runnable: true
gate: machine-checkable
inputs: [modular-monolith-context.json]
outputs: [options-loaded.json]
---

# Step 02 — Load and present decomposition options

## Purpose

Load the 4 modular-monolith decomposition options from Atlas's fragments + reference patterns. Present each with one-paragraph summary so the user can eliminate clearly-bad-fit options before the matrix.

## Actions

1. Read the elicited context from `_bmad/bam/cache/modular-monolith-design/{date}/modular-monolith-context.json`.

2. Load the following Atlas fragments via Read tool. Resolve each path by trying these in order (first hit wins, per BMAD tool-specific install convention; this mirrors step-02 of design-tenancy-model):
   - `{project-root}/.claude/skills/bmad-bam-agent-atlas/resources/fragments/<name>.md` (claude-code)
   - `{project-root}/.cursor/skills/bmad-bam-agent-atlas/resources/fragments/<name>.md` (cursor)
   - `{project-root}/_bmad/bbp/bmad-bam-agent-atlas/resources/fragments/<name>.md` (BMAD-internal manifest path)

   Primary fragments (drive the 4 options):
   - `ddd-bounded-contexts` — DDD-pure decomposition
   - `ports-and-adapters` — hexagonal/ports-pure decomposition
   - `module-decomposition-heuristics` — sizing + coupling guidance applied to either or both

   Reference fragments (consult if relevant):
   - `anti-corruption-layer` — for brownfield boundary defense
   - `evolutionary-architecture` — for greenfield rollout cadence

   (Path notes: BMAD installs the bmad-bam-platform module's config at `_bmad/bbp/` but the persona-skill content lives at the tool-specific `<tool>/skills/<skill>/` per BMAD installer behavior. Workflow steps reference Atlas's fragments by Read-at-runtime rather than via persistent_facts `file:` entries — BMM convention — because explicit cross-skill `file:` paths do not resolve uniformly across tool dirs.)

3. Present the 4 options to the user, one paragraph each:
   - **DDD-pure** — Carve the domain into bounded contexts driven by ubiquitous-language seams. Best for complex domains with stable expert vocabulary. Risk: over-abstraction when the domain is shallow.
   - **Ports-pure** — Carve modules by external adapter (HTTP, DB, queue, third-party). Best for IO-heavy apps with simple core. Risk: under-decomposing the domain core, becoming a "ports salad".
   - **Hybrid (recommended default)** — Use DDD bounded contexts for the core, ports/adapters at module edges. Best for most multi-tenant SaaS where domain is non-trivial AND IO is non-trivial. Risk: requires team discipline to keep the two patterns from blurring.
   - **Vertical-slice** — Slice by feature/use-case rather than by domain or adapter. Mentioned for completeness; unlikely fit for multi-tenant SaaS where shared tenant context cross-cuts every slice.

4. Present a comparison table: option, best-fit-team-size, best-fit-domain-complexity, brownfield-migration-cost, AI-agent-comprehensibility.

5. Ask user: "Any options to remove from consideration before the decision matrix?"

Write `{project-root}/_bmad/bam/cache/modular-monolith-design/{date}/options-loaded.json`.

## Output

```json
{
  "schema_version": "1.0",
  "loaded_at": "<ISO-8601 UTC>",
  "options_considered": ["ddd-pure", "ports-pure", "hybrid", "vertical-slice"],
  "options_eliminated_by_user": [],
  "fragments_loaded": [
    "ddd-bounded-contexts",
    "ports-and-adapters",
    "module-decomposition-heuristics"
  ],
  "fragments_referenced": ["anti-corruption-layer", "evolutionary-architecture"]
}
```

## Gate

Machine-checkable: file exists + `options_considered` has 1-4 entries + `fragments_loaded` non-empty.

## Next step

`step-03-c-decision-matrix.md`
