# Step 2: Verify Tenant Data Isolation

## Purpose

Verify tenant data isolation controls across all data stores and processing layers.

## Prerequisites

- Step 1 complete
- Tenant architecture documented
- **Load templates:**
  - `{project-root}/_bmad/bam/data/templates/rls-policy-template.md`
  - `{project-root}/_bmad/bam/data/templates/cache-isolation-template.md`
  - `{project-root}/_bmad/bam/data/templates/memory-isolation-template.md`

## Actions

### 1. Database Isolation Audit

| Isolation Type | Implementation | Test Method | Status |
|----------------|----------------|-------------|--------|
| Row-Level Security | PostgreSQL RLS | Cross-tenant query | |
| Schema isolation | Tenant schemas | Direct access | |
| Connection isolation | Connection pools | Pool overflow | |
| Query filtering | Mandatory WHERE | Query analysis | |

### 2. Cache Isolation Audit

| Cache Type | Isolation Method | Key Prefix | Status |
|------------|------------------|------------|--------|
| Redis session | Tenant prefix | tenant:{id}: | |
| Redis data | Namespace | data:{tenant}: | |
| CDN cache | Vary header | Tenant context | |
| Application cache | Scoped keys | {tenant}:cache: | |

### 3. AI Memory Isolation Audit

| Memory Type | Isolation Method | Test | Status |
|-------------|------------------|------|--------|
| Conversation | Tenant-scoped | Cross-tenant access | |
| Vector store | Namespace | Cross-tenant retrieval | |
| Agent memory | Context isolation | Memory leakage | |
| Fine-tuning data | Isolated training | Model influence | |

### 4. File Storage Isolation

| Storage | Isolation Method | Access Control | Status |
|---------|------------------|----------------|--------|
| Object storage | Bucket/prefix | IAM policies | |
| Uploads | Tenant folders | Signed URLs | |
| Exports | Scoped access | Tenant validation | |
| Temp files | Isolated paths | Cleanup verified | |

**Verify tenant isolation patterns with web search:**
Search the web: "tenant data isolation verification {date}"
Search the web: "PostgreSQL RLS testing patterns {date}"

## Verification

- [ ] Database isolation verified
- [ ] Cache isolation verified
- [ ] AI memory isolation verified
- [ ] File storage isolation verified

## Outputs

- Tenant isolation audit findings

## Next Step

Proceed to `step-03-c-test-pii-protection.md`
