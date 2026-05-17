---
step_id: 04-c-recommendation
auto_runnable: false
gate: human-approval
inputs: [decision-matrix.json]
outputs: [recommendation.json]
---

# Step 04 — Atlas recommends + reasons

## Purpose

The matrix is a tool, not the decision. Atlas reads the matrix + context + applies judgment. The matrix winner is the default recommendation but Atlas may override when:

- A specific axis carries disproportionate weight for this user (e.g., regulated domain + multi-tenant audit → AI-agent comprehensibility dominates because every change needs auditor review)
- A specific failure mode of the matrix winner is severe in this context (e.g., DDD-pure with a solo team is a long-term hazard regardless of score)
- The migration path between options is asymmetric (cheaper to start ports-pure and adopt DDD later than the reverse, given domain emergence)

## Actions

1. Read `decision-matrix.json` + `modular-monolith-context.json`.

2. Construct a 2-3 sentence rationale citing the highest-scoring axes from the matrix. The rationale MUST reference at least two axes by name (e.g., "domain_complexity and team_size_fit favored hybrid because...").

3. Determine confidence:
   - `high` — winner's weighted_sum exceeds runner-up by ≥0.5
   - `medium` — gap is 0.2-0.5
   - `low` — gap < 0.2 (and consider noting alternative)

4. Present the recommendation to the user for approval. If the user disagrees, capture their reasoning + revise. **Atlas does not finalize a recommendation the user has not approved.**

5. Write `recommendation.json` to the cache dir.

## Output

Write `{project-root}/_bmad/bam/cache/modular-monolith-design/{date}/recommendation.json`:

```json
{
  "schema_version": "1.0",
  "recommended_at": "<ISO-8601 UTC>",
  "option": "ddd-pure | ports-pure | hybrid | vertical-slice",
  "confidence": "high | medium | low",
  "rationale_text": "<2-3 sentences citing ≥2 axes by name>",
  "user_approved": true
}
```

## Gate

Human-approval. Never auto-runs; the user must explicitly approve the recommended option (or substitute one) before step-05 executes.

## Next step

`step-05-c-write-design.md`
