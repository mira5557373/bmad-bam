# Step 1: Audit Data Isolation

## Purpose

Audit data isolation mechanisms ensuring complete separation of tenant data across all storage layers.

## Prerequisites

- Tenant architecture documented
- Isolation configuration available
- **Load templates:**
  - `{project-root}/_bmad/bam/templates/rls-policy-template.md`
  - `{project-root}/_bmad/bam/templates/tenant-context-template.md`

## Actions

### 1. Database Isolation Audit

| Isolation Layer | Implementation | Test Query | Result | Status |
|-----------------|----------------|------------|--------|--------|
| Row-Level Security | PostgreSQL RLS | SELECT * FROM tenant_b | Denied | |
| Schema isolation | Separate schemas | Cross-schema access | Denied | |
| Connection pooling | Tenant-aware | Pool overflow test | Isolated | |
| Query injection | Parameterized | SQL injection | Blocked | |

### 2. Object Storage Isolation

| Isolation Method | Implementation | Test | Result | Status |
|------------------|----------------|------|--------|--------|
| Bucket per tenant | Separate buckets | Cross-bucket access | Denied | |
| Path prefix | /tenant/{id}/ | Path traversal | Blocked | |
| IAM policies | Per-tenant | Policy bypass | Denied | |
| Signed URLs | Tenant-scoped | URL manipulation | Blocked | |

### 3. Cache Isolation Audit

| Cache Layer | Isolation Method | Test | Result | Status |
|-------------|------------------|------|--------|--------|
| Session cache | tenant:{id}:session: | Key guessing | Denied | |
| Data cache | tenant:{id}:data: | Cross-tenant read | Denied | |
| Rate limit cache | tenant:{id}:rate: | Limit bypass | Blocked | |
| CDN cache | Vary: X-Tenant-ID | Cache poisoning | Blocked | |

### 4. Search/Index Isolation

| Index Type | Isolation | Test | Result | Status |
|------------|-----------|------|--------|--------|
| Full-text search | Filtered | Cross-tenant search | No results | |
| Vector store | Namespaced | Cross-tenant retrieval | Denied | |
| Analytics | Partitioned | Cross-tenant query | Denied | |

**Verify isolation patterns with web search:**
Search the web: "multi-tenant data isolation patterns {date}"
Search the web: "PostgreSQL RLS multi-tenant security {date}"

## Verification

- [ ] Database isolation verified
- [ ] Object storage isolation verified
- [ ] Cache isolation verified
- [ ] Search isolation verified

## Outputs

- Data isolation audit findings

## Next Step

Proceed to `step-02-c-test-resource-boundaries.md`
