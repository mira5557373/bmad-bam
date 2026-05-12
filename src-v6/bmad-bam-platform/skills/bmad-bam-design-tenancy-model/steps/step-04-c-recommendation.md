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
