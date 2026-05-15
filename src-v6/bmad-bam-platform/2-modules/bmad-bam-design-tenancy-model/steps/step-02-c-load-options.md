---
step_id: 02-c-load-options
auto_runnable: true
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

2. Load Atlas's `tenancy-decision-framework` fragment via Read tool. The fragment lives in Atlas's persona-skill resources; resolve the path by trying these in order (first hit wins, per BMAD tool-specific install convention):
   - `{project-root}/.claude/skills/bmad-bam-agent-atlas/resources/fragments/tenancy-decision-framework.md` (claude-code)
   - `{project-root}/.cursor/skills/bmad-bam-agent-atlas/resources/fragments/tenancy-decision-framework.md` (cursor)
   - `{project-root}/_bmad/bbp/bmad-bam-agent-atlas/resources/fragments/tenancy-decision-framework.md` (BMAD-internal manifest path; may not exist in all tool installs — BMAD records this logical path in skill-manifest.csv but materializes file content at the tool-specific dir above)

   (Path notes: BMAD installs the bmad-bam-platform module's config at `_bmad/bbp/` but the skills' content lives at the tool-specific `<tool>/skills/<skill>/` per BMAD installer behavior, verified empirically against bmad CLI v6.6.0. Workflow steps reference Atlas's fragments by Read-at-runtime rather than via persistent_facts `file:` entries — BMM convention — because explicit file: paths in cross-skill resource loads do not resolve uniformly across tool dirs. Activation auto-loaded context is just the universal-glob `**/project-context.md` sentinel at `{output_folder}/bbp/project-context.md`.)

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
