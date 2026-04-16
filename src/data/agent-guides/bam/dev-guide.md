# Developer Guide - BAM Extension

**When to load:** During Phase 4 (Implementation) when implementing tenant isolation or event-driven patterns, or when user mentions RLS, context propagation, or event-driven architecture.
**Integrates with:** Developer (bmad-agent-dev), implementation, code quality

This guide provides BAM-specific context for developers implementing multi-tenant agentic AI platforms.

## Core Concepts

### Tenant-Aware Coding

Tenant-aware coding ensures every line of code respects tenant isolation boundaries. This means tenant context must flow through all code paths, database queries must be scoped by tenant, cache keys must include tenant identifiers, and error messages must not leak cross-tenant information. Tenant awareness is not optional - it is a fundamental requirement of multi-tenant development.

### RLS Implementation

RLS (Row-Level Security) implementation enforces tenant isolation at the database level as the last line of defense. Even if application code has bugs, properly configured RLS policies prevent cross-tenant data access. RLS should be enabled by default on all tenant-scoped tables and tested with multi-tenant fixtures to verify correct behavior.

### Context Propagation

Context propagation ensures tenant information flows correctly through the entire request lifecycle. This includes extracting tenant from authentication tokens, attaching to request context, passing through service calls, including in events, and setting in database sessions. Broken propagation creates isolation vulnerabilities.

---

## Role Context

As a developer on a BAM project, you focus on:
- Implementing Row-Level Security (RLS) correctly
- Propagating tenant context through all layers
- Building event-driven integrations between modules
- Writing tenant-aware code with proper isolation

## Tenant-Aware Coding Guidelines

Follow these guidelines to ensure your code properly handles multi-tenancy across all layers of the application.

### Golden Rules of Tenant-Aware Development

1. **Never Trust Client-Provided Tenant ID** - Always derive tenant context from authenticated session
2. **Fail Closed on Missing Context** - If tenant context is unavailable, fail the request
3. **Include Tenant in All Queries** - Every database query must scope by tenant
4. **Propagate Context Explicitly** - Pass tenant context through all function calls
5. **Log with Tenant Context** - Every log entry should include tenant identifier
6. **Test Cross-Tenant Access** - Write tests that verify isolation

### Code Review Checklist for Tenant Safety

- [ ] All database queries include tenant_id filter
- [ ] No raw SQL that bypasses ORM tenant scoping
- [ ] Tenant context passed to all service method calls
- [ ] Events include tenant_id in payload
- [ ] Cache keys include tenant_id
- [ ] File paths include tenant isolation
- [ ] External API calls include tenant context headers
- [ ] Error messages do not leak cross-tenant data

## Decision Framework

| Scenario | Recommended Approach | Anti-Pattern to Avoid |
|----------|---------------------|----------------------|
| Database access | Use tenant-scoped repository | Direct SQL without tenant filter |
| Caching | Prefix keys with tenant_id | Global cache without tenant namespace |
| File storage | Tenant-prefixed paths | Shared directories across tenants |
| Background jobs | Include tenant context in job payload | Assume context from caller |
| External APIs | Include tenant header for correlation | Silent failures on tenant mismatch |
| Logging | Structured logs with tenant field | Logs without tenant attribution |
| Error handling | Tenant-specific error codes | Generic errors that could leak data |

## Actionable Guidance

### Implementing Row-Level Security

1. **Add Tenant Column** - Ensure every tenant-scoped table has a tenant_id column
2. **Create RLS Policy** - Define PostgreSQL RLS policy that filters by session tenant
3. **Set Session Variable** - Configure middleware to set tenant in database session
4. **Enable RLS on Table** - Turn on RLS for each tenant-scoped table
5. **Test with Multiple Tenants** - Verify queries only return correct tenant data
6. **Audit Policy Coverage** - Ensure all CRUD operations respect RLS
7. **Document Exceptions** - If any table bypasses RLS, document why

### Propagating Tenant Context

1. **Extract from Auth Token** - Parse tenant from JWT or session after authentication
2. **Create Context Object** - Instantiate TenantContext with tenant_id, tier, and permissions
3. **Attach to Request** - Store context in request-scoped container (AsyncLocalStorage, etc.)
4. **Inject into Services** - Pass context explicitly or retrieve from request scope
5. **Include in Events** - Add tenant context to all published domain events
6. **Propagate to External Calls** - Include tenant header in outbound HTTP requests
7. **Log Context** - Ensure logging middleware includes tenant in all log entries

### Building Event-Driven Integrations

1. **Define Event Schema** - Include tenant_id as required field in event schema
2. **Validate on Publish** - Reject events without valid tenant context
3. **Route by Tenant** - Use tenant-aware routing for high-volume events
4. **Validate on Consume** - Verify consumer has access to event's tenant
5. **Handle Failures Per-Tenant** - Implement tenant-specific dead letter handling
6. **Monitor by Tenant** - Track event processing metrics per tenant
7. **Test Cross-Tenant Isolation** - Verify events don't leak across tenant boundaries

## Key Considerations

### Row-Level Security
- Apply RLS policies at the database level
- Never bypass RLS in application code
- Test RLS policies with multiple tenant contexts

### Context Propagation
- Tenant context must flow through entire request lifecycle
- Use middleware to establish context early
- Validate context at module boundaries

### Event-Driven Patterns
- Events carry tenant context explicitly
- Subscribers validate tenant access before processing
- Use tenant-partitioned event streams where appropriate

## SaaS-Specific Considerations

### Tier-Based Feature Implementation

When implementing features that vary by tier:

| Implementation Aspect | Free Tier | Pro Tier | Enterprise Tier |
|----------------------|-----------|----------|-----------------|
| Rate Limits | Strict (100/hour) | Moderate (1000/hour) | Custom (negotiated) |
| Batch Sizes | Small (10 items) | Medium (100 items) | Large (1000+ items) |
| Async Processing | Queued (low priority) | Priority queue | Dedicated workers |
| Data Retention | 30 days | 1 year | Unlimited/custom |
| API Versions | Current only | Current + 1 prior | All supported |

### Multi-Tenant Performance Patterns

**Connection Pooling:**
- Use tenant-aware connection pools for schema/database-per-tenant
- Implement connection limits per tenant to prevent resource hogging
- Monitor connection usage by tenant for capacity planning

**Query Optimization:**
- Always include tenant_id in composite indexes
- Use tenant-specific query plans where beneficial
- Implement tenant-aware query caching

**Background Processing:**
- Prioritize jobs by tenant tier
- Implement fair-share scheduling across tenants
- Monitor queue depth per tenant

### Error Handling for Multi-Tenancy

**Safe Error Messages:**
- Never include tenant_id of other tenants in error messages
- Use correlation IDs instead of internal identifiers
- Log full details server-side, return sanitized messages

**Tenant-Specific Error Codes:**
- TENANT_NOT_FOUND - Invalid or inactive tenant
- TENANT_SUSPENDED - Tenant temporarily disabled
- TIER_LIMIT_EXCEEDED - Feature not available in tier
- CROSS_TENANT_VIOLATION - Attempted cross-tenant access

### Testing Multi-Tenant Code

**Unit Testing:**
- Mock tenant context for isolated unit tests
- Test with multiple tenant contexts in same test
- Verify context propagation through call chains

**Integration Testing:**
- Create test fixtures with multiple tenants
- Verify RLS policies with actual database queries
- Test cross-tenant access attempts (should fail)

## Application Guidelines

When implementing tenant-aware code:
1. Never trust client-provided tenant ID - always derive from authenticated session
2. Fail closed if tenant context is unavailable - do not default or guess
3. Include tenant_id in every database query without exception
4. Propagate tenant context explicitly through all function calls
5. Log with tenant context in every log entry for debugging

When reviewing multi-tenant code:
1. Verify all database queries include tenant_id filter
2. Check that no raw SQL bypasses ORM tenant scoping
3. Confirm events include tenant_id in payload
4. Validate cache keys include tenant isolation
5. Ensure error messages do not leak cross-tenant data

---

**Load Testing:**
- Simulate realistic tenant distribution
- Test noisy neighbor scenarios
- Verify fair resource allocation under load

---

## Debugging Tenant Isolation Issues

### Isolation Issue Symptoms

| Symptom | Likely Cause | Investigation Steps |
|---------|--------------|---------------------|
| Data from wrong tenant | RLS bypass or missing filter | Check query, verify RLS enabled |
| Cross-tenant error details | Error message leaking tenant info | Audit error handlers |
| Cache returning wrong data | Missing tenant prefix in key | Inspect cache key generation |
| Events routed incorrectly | Tenant context not propagated | Trace event flow |
| Background job sees wrong data | Job missing tenant context | Verify job payload |

### Debugging Workflow

```
Isolation Issue Reported
    │
    ├── 1. Identify Affected Tenants
    │   ├── Which tenant reported?
    │   ├── Which tenant's data was seen?
    │   └── Get request/trace IDs
    │
    ├── 2. Trace Request Flow
    │   ├── Entry point (API, webhook, job)
    │   ├── Tenant context extraction
    │   ├── Context propagation through layers
    │   └── Database query execution
    │
    ├── 3. Verify RLS Configuration
    │   ├── Is RLS enabled on affected tables?
    │   ├── Is session variable set correctly?
    │   └── Test RLS policy with both tenants
    │
    ├── 4. Check Application Code
    │   ├── Find the query that leaked
    │   ├── Verify tenant filter present
    │   └── Check for raw SQL bypassing ORM
    │
    └── 5. Document and Fix
        ├── Add regression test
        ├── Apply fix
        └── Audit similar patterns
```

### Common Root Causes

| Category | Root Cause | Prevention |
|----------|------------|------------|
| RLS | Policy not enabled on new table | Automated RLS audit in CI |
| RLS | Superuser connection bypassing RLS | Never use superuser in app |
| Application | Raw SQL without tenant filter | Linting rules for raw SQL |
| Application | ORM query missing tenant scope | Base repository pattern |
| Cache | Shared cache key across tenants | Key prefix validation |
| Events | Tenant ID missing from payload | Schema validation |
| Jobs | Context not serialized with job | Job context wrapper |

### Tenant-Aware Debugging Tools

| Tool | Usage | Tenant Filtering |
|------|-------|------------------|
| Log viewer | Search logs for tenant | `tenant_id:xyz` filter |
| Trace viewer | View request traces | Filter by tenant tag |
| Query analyzer | Review slow queries | Filter by tenant |
| Cache inspector | View cached data | Prefix filter |
| Event debugger | Trace event flow | Tenant ID in payload |

---

## Multi-Tenant Database Migrations

### Migration Safety Checklist

| Check | Verification | Risk if Skipped |
|-------|--------------|-----------------|
| RLS policy added for new tables | Migration includes RLS setup | Data leak |
| Tenant_id column added | All new tenant-scoped tables | Query failures |
| Index includes tenant_id | Composite indexes start with tenant | Performance |
| Backwards compatible | Old code works during rollout | Downtime |
| Tested with multiple tenants | Migration tested with real data | Data corruption |

### Migration Patterns

**Adding Tenant-Scoped Table:**
```
1. Create table with tenant_id column
2. Add foreign key to tenants table
3. Create composite primary key or unique constraint with tenant_id
4. Create index starting with tenant_id
5. Enable RLS on table
6. Create RLS policy for tenant isolation
7. Grant appropriate permissions
```

**Adding Column to Existing Table:**
```
1. Add column with DEFAULT for existing rows
2. For tenant-specific defaults, use tenant context
3. Update indexes if needed for queries
4. Update RLS policies if column affects access
```

**Data Backfill with Tenant Context:**
```
1. Run backfill per-tenant in batches
2. Set tenant context before each batch
3. Verify RLS respects tenant during backfill
4. Log progress per tenant for monitoring
```

---

## Performance Profiling with Tenant Context

### Tenant-Aware Performance Metrics

| Metric | Collection Method | Tenant Attribution |
|--------|-------------------|-------------------|
| API latency | Request middleware | Tag with tenant_id |
| Query time | Database instrumentation | Include tenant in labels |
| Cache hit rate | Cache wrapper | Prefix metrics with tenant |
| Memory usage | Runtime sampling | Per-tenant context |
| AI token usage | LLM wrapper | Tenant-scoped counters |

### Identifying Tenant-Specific Performance Issues

| Issue Type | Investigation | Resolution |
|------------|---------------|------------|
| One tenant slow | Compare with other tenants | Tenant-specific data issue |
| One query slow | Check data distribution | Optimize or add index |
| Resource contention | Check noisy neighbor | Apply rate limiting |
| AI latency spikes | Check prompt complexity | Token optimization |

### Performance Testing Multi-Tenant

**Test Scenarios:**
- Single tenant at scale (stress test)
- Many tenants with normal load (capacity)
- Mixed tenants with one heavy (noisy neighbor)
- Tier limit boundary behavior

**Metrics to Capture:**
- p50, p95, p99 latency per tenant
- Resource utilization per tenant
- Fair share verification across tenants
- Degradation pattern as load increases

## Outputs

| Deliverable | Format | Template |
|-------------|--------|----------|
| RLS Implementation | SQL/Code | `rls-policy-template.md` |
| Tenant Context Module | Code | N/A |
| Event Schema Definitions | Code | `event-schema-template.md` |
| Integration Tests | Code | N/A |

## Related Workflows

- `define-facade-contract` - Define public facade contracts between modules
- `bmad-bam-internal-contract-design` - Design internal contracts within modules
- `bmad-bam-convergence-verification` - Verify convergence across module boundaries

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Development patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `dev-*`
- **Testing patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `test-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant application development patterns {date}"
- Search: "tenant isolation testing strategies {date}"
- Search: "row-level security implementation patterns {date}"
