# Step 4: Cleanup Isolation

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

Define the cleanup procedures for each isolation boundary.

---

## Prerequisites

- Active resources handled (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: testing-isolation`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Define the cleanup procedures for each isolation boundary:

---

## Database Cleanup

| Asset | Cleanup Action | Verification |
|-------|---------------|--------------|
| Tenant record | Hard delete from tenants table | Query returns empty |
| User records | Cascade delete | No orphan users |
| Agent configs | Cascade delete | No orphan agents |
| Conversation data | Batch delete with tenant_id | Count = 0 |
| RLS policies | Remove tenant-specific policies | Policy list empty |

**Load template:** `{project-root}/_bmad/bam/templates/tenant-cleanup-verification-template.md`

Refer to the template for cleanup verification patterns. Use web research for current best practices.

---

## Cache Cleanup

```yaml
cache_cleanup:
  pattern: "tenant:{tenant_id}:*"
  method: SCAN + DEL (batched)
  batch_size: 1000
  verification: KEYS pattern returns empty
```

---

## Storage Cleanup

| Storage Type | Cleanup Action | Verification |
|--------------|---------------|--------------|
| S3 Objects | Delete all objects under prefix | ListObjects empty |
| S3 Prefix | Remove prefix marker | Prefix not found |
| CDN Cache | Invalidate tenant paths | Cache miss on access |

```bash
# S3 cleanup command pattern
aws s3 rm s3://{bucket}/tenants/{tenant_id}/ --recursive
```

---

## Search Index Cleanup

```yaml
search_cleanup:
  action: Delete documents with tenant_id filter
  verification: Search query returns 0 results
  index_optimization: Trigger after bulk delete
```

---

## Vector Store Cleanup

```yaml
vector_cleanup:
  action: Delete tenant namespace/collection
  verification: Namespace not found
  storage_reclaim: Trigger compaction
```

---

## Analytics Data Cleanup

| Analytics Store | Cleanup Action | Verification |
|-----------------|----------------|--------------|
| ClickHouse | Drop tenant partition | Partition not found |
| Time-series DB | Delete tenant metrics | No metrics for tenant_id |

**Load template:** `{project-root}/_bmad/bam/templates/analytics-cleanup-template.md`

Refer to the template for analytics cleanup patterns. Use web research for current best practices.

---

## Cleanup Verification Checklist

- [ ] Database: No records with tenant_id exist in any table
- [ ] Cache: No keys with tenant prefix exist
- [ ] Storage: Tenant prefix is empty and removed
- [ ] Search: No documents with tenant filter match
- [ ] Vector: Namespace/collection deleted
- [ ] Analytics: Partition dropped
- [ ] Logs: Tenant-specific logs archived (not deleted for audit)

---

## Cleanup Audit Log

Generate cleanup certificate:
```json
{
  "tenant_id": "{tenant_id}",
  "cleanup_timestamp": "ISO8601",
  "resources_deleted": {
    "database_records": 12345,
    "cache_keys": 5678,
    "storage_objects": 890,
    "vector_embeddings": 100000,
    "search_documents": 456
  },
  "verification_status": "PASSED",
  "operator": "system|admin_email"
}
```

**Verify current best practices with web search:**
Search the web: "tenant isolation cleanup tenant lifecycle {date}"
Search the web: "tenant data deletion multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the cleanup isolation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into cleanup procedures and verification
- **P (Party Mode)**: Bring analyst and architect perspectives for cleanup review
- **C (Continue)**: Accept cleanup isolation and proceed to runbook creation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass cleanup context: database, cache, storage, vector procedures
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into cleanup isolation
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review cleanup isolation: {summary of procedures and verification}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save cleanup isolation to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-create-offboarding-runbook.md`

---

## Soft Gate Checkpoint

**Steps 1-4 complete the offboarding cleanup design.**

Present summary of:
- Database, cache, and storage cleanup procedures
- Search index and vector store cleanup specifications
- Cleanup verification checklist and audit log structure

Ask for confirmation before proceeding to runbook creation.

---

## Verification

- [ ] Database cleanup procedures defined
- [ ] Cache cleanup configured
- [ ] Storage cleanup specified
- [ ] Search index cleanup planned
- [ ] Vector store cleanup defined
- [ ] Analytics cleanup configured
- [ ] Cleanup verification checklist complete
- [ ] Patterns align with pattern registry

---

## Outputs

- Cleanup procedures document
- Verification checklist
- Audit log certificate template

---

## Next Step

Proceed to `step-05-c-create-offboarding-runbook.md` to generate operational runbook.
