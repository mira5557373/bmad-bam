# Step 2: Isolation Matrix Creation

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

Create a comprehensive isolation matrix that classifies ALL asset types by their isolation strategy. This matrix becomes the authoritative reference for implementing tenant boundaries.

---

## Prerequisites

- Tenant model selected (Step 1)
- Master architecture document available
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: performance-isolation`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Load Isolation Patterns

Read isolation strategies from knowledge fragments:
- RLS patterns for database isolation
- Key prefix patterns for cache isolation
- Metadata filter patterns for vector stores
- Context propagation patterns for runtime

### 2. Inventory All Asset Types

For each module, identify all assets that could contain tenant data:

| Category | Asset Types to Identify |
|----------|------------------------|
| Data Storage | Database tables, cache keys, file paths |
| Runtime State | Background jobs, WebSocket connections, in-memory state |
| AI Assets | Memory tiers, tool permissions, vector collections |
| Observability | Logs, metrics, traces |

### 3. Classify Each Asset

Complete the isolation matrix:

| Asset Type | Isolation Strategy | Implementation | Verification Test |
|------------|-------------------|----------------|-------------------|
| Database rows | RLS with tenant_id | See rls-best-practices.md | Query as wrong tenant |
| Cache entries | Key prefix | `tenant:{id}:key` pattern | GET wrong tenant key |
| Log entries | Structured field | `tenant_id` in JSON | Filter query |
| Agent memory | Tenant-scoped tier | Mem0 tenant filter | Memory isolation test |
| AI tools | Permission filter | Tool registry filter | Tool list by tenant |
| Background jobs | Payload context | `tenant_id` in metadata | Job processor check |
| Vector embeddings | Collection filter | Namespace/metadata | Search isolation |
| File storage | Path prefix | `/{tenant}/` pattern | List objects test |

### 4. Define Verification Tests

For each asset type, specify how to verify isolation:

| Asset | Test Method | Expected Result |
|-------|-------------|-----------------|
| Database | Query as Tenant B for A's data | 0 rows returned |
| Cache | GET tenant:B:key | Cache miss |
| Memory | Read Tenant A memory as B | Empty/forbidden |
| Vectors | Search with wrong tenant filter | No results |

### 5. Create Audit Checklist

For each asset type in matrix:
- [ ] Isolation strategy documented
- [ ] Implementation follows knowledge patterns
- [ ] Verification test defined
- [ ] Test case written
- [ ] Penetration test scheduled

---

## Error Handling

### RLS Policy Validation Failures
If RLS policy validation fails:
1. **STOP** - Do not proceed with deployment
2. Check policy syntax against `rls-best-practices.md` patterns
3. Verify tenant_id column exists on target table
4. Test policy with explicit tenant context: `SET app.current_tenant_id = 'test-tenant'`
5. If policy still fails, escalate to security review

### Common RLS Errors and Fixes
| Error | Cause | Fix |
|-------|-------|-----|
| "infinite recursion" | Policy references itself | Use security definer function |
| "permission denied" | Missing GRANT | Add `GRANT SELECT ON table TO app_user` |
| "column does not exist" | Wrong tenant column | Verify tenant_id column name |
| "policy already exists" | Duplicate policy name | Drop existing policy first or use unique name |
| "relation does not exist" | Table not created yet | Ensure table migration runs before RLS |

### Isolation Strategy Failures
| Asset Type | Failure Mode | Recovery |
|------------|--------------|----------|
| Cache keys | Missing tenant prefix | Flush cache, redeploy with correct key pattern |
| Vector store | Missing tenant filter | Rebuild index with tenant metadata |
| Background jobs | Lost tenant context | Add context to job payload, requeue failed jobs |
| File storage | Wrong path structure | Migrate files to tenant-prefixed paths |

### Rollback Procedure
If RLS configuration corrupts data access:
1. Immediately disable RLS: `ALTER TABLE {table} DISABLE ROW LEVEL SECURITY`
2. Verify data access restored
3. Drop faulty policy: `DROP POLICY IF EXISTS {policy_name} ON {table}`
4. Return to step 01 and re-analyze requirements
5. Document the failure in incident log for post-mortem

### Escalation Path
If isolation issues cannot be resolved within 2 attempts:
1. Document exact error messages and attempted fixes
2. Escalate to security architect for review
3. Consider temporary mitigation (application-level filtering)
4. Schedule security review meeting before proceeding

**Verify current best practices with web search:**
Search the web: "isolation matrix creation best practices {date}"
Search the web: "isolation matrix creation enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the isolation matrix above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into isolation strategies and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for matrix review
- **C (Continue)**: Accept isolation matrix and proceed to context propagation design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass matrix context: asset types, strategies, verification tests
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into isolation matrix
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review isolation matrix: {summary of assets and strategies}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save isolation matrix to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-context-propagation-design.md`

---

## Soft Gate Checkpoint

**Steps 1-2 complete the isolation foundation design.**

Present summary of:
- Tenant model selection and rationale
- Complete isolation matrix with asset-to-strategy mappings
- Verification test coverage for each isolated asset

Ask for confirmation before proceeding to context propagation design.

---

## Verification

- [ ] All asset types from all modules inventoried
- [ ] Each asset has isolation strategy assigned
- [ ] All strategies reference knowledge patterns
- [ ] Verification tests defined for each asset
- [ ] No undocumented assets remain
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete isolation matrix document
- Per-asset verification test specifications
- Audit checklist with all assets covered
- **Load template:** `{project-root}/_bmad/bam/templates/tenant-isolation-matrix.md`
- **Load template:** `{project-root}/_bmad/bam/templates/database-schema-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/tenant-boundary-audit-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/tenant-isolation-design-template.md`

---

## Critical Warning

**NO EXCEPTIONS:** Every asset that could contain tenant data MUST appear in this matrix. Undocumented assets are security vulnerabilities.

---

## Next Step

Proceed to `step-03-c-context-propagation-design.md` to ensure tenant context flows through all code paths.
