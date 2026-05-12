---
step_id: 01-c-elicit-context
auto-runnable: false
gate: human-approval
inputs: []
outputs: [tenancy-context.json]
---

# Step 01 — Elicit context from user

## Purpose

Gather the empirical inputs that drive the tenancy-model decision. Without these, the recommendation is guesswork.

## Actions

Ask the user the following questions, one at a time. Wait for answers. Don't accept vague responses ("a lot" → ask for an order-of-magnitude estimate).

1. **Tenant count (12-month projection)** — how many separate customer organizations will you serve in the first 12 months?
   - <100 → enterprise segment indicator
   - 100-1000 → mid-market segment
   - 1000-100k → SMB segment
   - >100k → consumer-via-tenants
2. **Compliance frameworks** — list all that apply (GDPR, HIPAA, SOC2, PCI-DSS, ISO27001, EU AI Act, FedRAMP, FERPA, others)
3. **Per-tenant data volume estimate** — GB per tenant per year, order of magnitude
4. **Blast-radius tolerance** — if one tenant's data corrupts, how many other tenants are acceptable to also be affected? (0 = strict isolation; >0 = shared infra OK)
5. **Cost ceiling per tenant per month** — USD; sets the upper bound on per-tenant infra
6. **Ops team size** — how many people will operate this? (1 = solo, <5 = small team, >5 = team-of-teams)
7. **Multi-region requirement** — do tenants in different regions need data residency? (yes / no / future)
8. **Existing system?** — greenfield (no existing) or brownfield (existing system that needs migration)?

## Output

Write `{project-root}/_bmad/bam/cache/tenancy-design/{date}/tenancy-context.json`:

```json
{
  "elicited_at": "<ISO-8601 UTC>",
  "tenant_count_12mo": <int>,
  "tenant_segment": "enterprise|mid-market|smb|consumer",
  "compliance_frameworks": ["GDPR", "..."],
  "data_volume_per_tenant_gb_year": <int>,
  "blast_radius_tolerance": <int>,
  "cost_ceiling_per_tenant_usd_month": <int>,
  "ops_team_size": <int>,
  "multi_region": "yes|no|future",
  "greenfield_or_brownfield": "greenfield|brownfield"
}
```

## Gate

Human-approval gate. After eliciting, summarize the captured context back to the user. Confirm. If any input feels unstable, ask for refinement before advancing.

## Next step

`step-02-c-load-options.md`
