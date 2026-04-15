# Step 4: Setup Isolation Boundaries

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Define the isolation boundaries that must be established during tenant provisioning.

---

## Prerequisites

- Tier defaults configured (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: testing-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: compliance`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Define the isolation boundaries that must be established during tenant provisioning:

---

## Database Isolation

- Apply Row-Level Security (RLS) policies to all tenant-aware tables
- Create tenant-specific database roles (if schema-per-tenant model)
- Configure connection pooling with tenant context injection
- Verify no cross-tenant query paths exist

---

## Cache Isolation

- Create tenant-prefixed key namespace: `tenant:{tenant_id}:*`
- Configure Redis ACLs for tenant namespace (if dedicated Redis)
- Set TTL policies based on tier configuration
- Initialize cache warming for critical data

---

## Storage Isolation

- Create tenant storage prefix: `tenants/{tenant_id}/`
- Apply bucket policies restricting access to tenant prefix
- Configure CORS rules for tenant domain using patterns from `cors-configuration-patterns.md`:
  - Register tenant origins (subdomains and custom domains)
  - Configure tenant-specific CORS middleware
  - Enable preflight caching with appropriate max-age
  - Set up cache invalidation for domain configuration changes
- Initialize folder structure (uploads/, exports/, backups/)

---

## Search Index Isolation

- Create tenant filter in search indices
- Apply index-level access controls
- Configure indexing quotas based on tier

---

## Vector Store Isolation

- Create tenant namespace/collection in vector database
- Apply namespace-level quotas
- Configure similarity search filters to include tenant_id

---

## Network Isolation (Enterprise)

- Configure tenant-specific VPC peering (if applicable)
- Setup private endpoints for tenant
- Configure WAF rules for tenant domain

---

## Isolation Verification

After all boundaries are established, run isolation verification:
1. Attempt cross-tenant data access (should fail)
2. Verify RLS policies are active
3. Verify cache namespace isolation
4. Verify storage prefix restrictions

Document isolation verification results in provisioning audit log.

**Verify current best practices with web search:**
Search the web: "tenant isolation boundaries tenant lifecycle {date}"
Search the web: "data isolation multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the isolation boundaries above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into isolation strategies and verification
- **P (Party Mode)**: Bring analyst and architect perspectives for isolation review
- **C (Continue)**: Accept isolation boundaries and proceed to runbook creation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass isolation context: database, cache, storage, vector boundaries
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into isolation boundaries
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review isolation boundaries: {summary of boundaries and verification}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save isolation boundaries to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-create-runbook.md`

---

## Soft Gate Checkpoint

**Steps 1-4 complete the onboarding isolation design.**

Present summary of:
- Database, cache, and storage isolation boundaries
- Search index and vector store isolation configurations
- Network isolation plans and verification test results

Ask for confirmation before proceeding to runbook creation.

---

## Verification

- [ ] Database isolation configured
- [ ] Cache isolation established
- [ ] Storage isolation configured
- [ ] Search index isolation verified
- [ ] Vector store isolation configured
- [ ] Network isolation (Enterprise) planned
- [ ] Isolation verification tests pass
- [ ] Patterns align with pattern registry

---

## Outputs

- Isolation boundary configuration
- Verification test results

---

## Next Step

Proceed to `step-05-c-create-runbook.md` to generate operational runbook.
