---
name: qg-m2-tenant-isolation
description: Tenant isolation validation - RLS policies, context propagation, cross-tenant prevention
module: bam
tags: [tenant, quality-gate, multi-tenant, isolation, rls]
version: 2.0.0
---

# QG-M2: Tenant Isolation Gate

**Gate ID:** QG-M2  
**Phase:** 3-solutioning (Module Architecture)  
**Workflow:** bmad-bam-tenant-model-isolation  
**Prerequisites:** QG-M1 (Module Architecture Gate)

---

## Purpose

This quality gate validates that tenant isolation is properly implemented at all layers of the application stack. The gate ensures:

1. **Data Isolation** - No tenant can access another tenant's data through any code path
2. **Context Integrity** - Tenant context propagates correctly through all service boundaries
3. **Security Enforcement** - RLS policies, middleware, and access controls are properly configured
4. **Resource Separation** - Caches, storage, queues, and other resources maintain tenant boundaries
5. **Compliance Readiness** - Isolation mechanisms meet regulatory requirements (SOC2, GDPR, HIPAA)
6. **Operational Safety** - Tenant lifecycle operations (onboarding, offboarding) maintain isolation

---

## Database-Level Isolation

### Row-Level Security (RLS) Policies

- [ ] **CRITICAL:** RLS policies enabled on ALL tenant-scoped tables
- [ ] **CRITICAL:** RLS policies use `current_setting('app.tenant_id')` or equivalent
- [ ] **CRITICAL:** RLS policies tested with penetration/boundary testing
- [ ] **CRITICAL:** Superuser/admin queries explicitly bypass RLS only when necessary
- [ ] Default RLS policy denies access (fail-closed)
- [ ] RLS policies cover SELECT, INSERT, UPDATE, DELETE operations
- [ ] RLS policies documented in schema migration files
- [ ] RLS policy performance impact measured (<5% overhead target)

### Schema Isolation (if schema-per-tenant)

- [ ] **CRITICAL:** Search path set correctly per tenant connection
- [ ] **CRITICAL:** No cross-schema references in application code
- [ ] Schema naming convention enforced (e.g., `tenant_{tenant_id}`)
- [ ] Schema creation automated in tenant onboarding
- [ ] Schema cleanup verified in tenant offboarding
- [ ] Shared tables (if any) properly isolated in public schema

### Database Connection Pooling

- [ ] **CRITICAL:** Connection pool sets tenant context on checkout
- [ ] **CRITICAL:** Connection pool clears tenant context on checkin
- [ ] Pool configuration prevents connection reuse without context reset
- [ ] Connection timeout configured to prevent context leakage
- [ ] Pool metrics include tenant distribution tracking

---

## Application-Level Isolation

### TenantContext Management

- [ ] **CRITICAL:** TenantContext class/struct immutable after creation
- [ ] **CRITICAL:** TenantContext required for all database operations
- [ ] **CRITICAL:** TenantContext validated against JWT/session claims
- [ ] TenantContext includes tenant tier information
- [ ] TenantContext propagates through async boundaries
- [ ] TenantContext serializable for distributed tracing

### Middleware and Request Scoping

- [ ] **CRITICAL:** Tenant extraction middleware runs on ALL routes
- [ ] **CRITICAL:** Missing tenant context returns 401/403, not 500
- [ ] **CRITICAL:** Tenant ID extracted from trusted source (JWT, session)
- [ ] Middleware logs tenant ID for every request
- [ ] Health/status endpoints excluded from tenant requirement
- [ ] Webhook endpoints validate tenant from payload signature

### Service-to-Service Communication

- [ ] **CRITICAL:** Internal service calls propagate tenant context in headers
- [ ] **CRITICAL:** Receiving services validate tenant context matches caller
- [ ] gRPC metadata includes tenant context
- [ ] HTTP headers use standard format (e.g., `X-Tenant-ID`)
- [ ] Service mesh policies enforce tenant header presence

---

## Cache Isolation

### Cache Key Strategy

- [ ] **CRITICAL:** All cache keys prefixed with tenant identifier
- [ ] **CRITICAL:** Cache key format documented and enforced
- [ ] **CRITICAL:** No shared cache keys across tenants (except explicit global data)
- [ ] Cache key generation centralized in utility function
- [ ] Cache key collisions impossible across tenants

### Cache Operations

- [ ] **CRITICAL:** Cache flush operations scoped to single tenant
- [ ] **CRITICAL:** Cache warmup operations respect tenant boundaries
- [ ] TTL policies consistent across tenants (or tier-based)
- [ ] Cache eviction does not cause cross-tenant data exposure
- [ ] Cache metrics segmented by tenant

### Multi-Level Cache (if applicable)

- [ ] L1 (in-memory) cache tenant-aware
- [ ] L2 (distributed) cache tenant-prefixed
- [ ] Cache invalidation propagates through all levels
- [ ] CDN cache keys include tenant identifier (if applicable)

---

## Event and Message Isolation

### Event Headers and Routing

- [ ] **CRITICAL:** All events include tenant_id in headers/metadata
- [ ] **CRITICAL:** Event consumers validate tenant_id before processing
- [ ] **CRITICAL:** Event routing keys include tenant identifier
- [ ] Dead letter queues segregated by tenant (or tagged)
- [ ] Event replay scoped to single tenant

### Queue Separation

- [ ] **CRITICAL:** Tenant data never mixed in shared queues (or properly tagged)
- [ ] Queue naming convention includes tenant (if dedicated queues)
- [ ] Consumer groups respect tenant boundaries
- [ ] Queue depth monitoring per tenant
- [ ] Backpressure handling tenant-aware

### Event Sourcing (if applicable)

- [ ] **CRITICAL:** Event streams partitioned by tenant
- [ ] Aggregate IDs include tenant context
- [ ] Projections maintain tenant isolation
- [ ] Snapshot storage tenant-segregated

---

## File and Storage Isolation

### Storage Path Strategy

- [ ] **CRITICAL:** All storage paths include tenant segment
- [ ] **CRITICAL:** Path traversal attacks prevented (e.g., `../`)
- [ ] **CRITICAL:** Storage bucket policies enforce tenant boundaries
- [ ] Path format: `/{tenant_id}/{resource_type}/{resource_id}`
- [ ] No direct tenant ID exposure in public URLs

### Access Control

- [ ] **CRITICAL:** Pre-signed URLs scoped to tenant
- [ ] **CRITICAL:** Storage IAM policies prevent cross-tenant access
- [ ] File metadata includes tenant ownership
- [ ] Directory listing restricted to tenant scope
- [ ] Temporary file cleanup respects tenant isolation

### Backup and Recovery

- [ ] Backup strategy supports single-tenant restore
- [ ] Backup encryption keys per tenant (if required)
- [ ] Point-in-time recovery scoped to tenant
- [ ] Backup retention policies tenant-configurable

---

## API-Level Isolation

### Request Validation

- [ ] **CRITICAL:** Tenant ID validated on every API request
- [ ] **CRITICAL:** Resource IDs validated to belong to requesting tenant
- [ ] **CRITICAL:** Bulk operations respect tenant boundaries
- [ ] API versioning does not affect tenant isolation
- [ ] GraphQL queries filtered by tenant context

### Rate Limiting

- [ ] **CRITICAL:** Rate limits applied per tenant
- [ ] Rate limit configuration per tier
- [ ] Rate limit headers include tenant context
- [ ] Burst handling respects tenant fairness
- [ ] Rate limit bypass for internal services documented

### API Response Security

- [ ] **CRITICAL:** Error messages do not leak cross-tenant information
- [ ] **CRITICAL:** 404 returned for resources belonging to other tenants
- [ ] Pagination cursors tenant-scoped
- [ ] Response filtering applied server-side (not client-filtered)

---

## Gate Decision

| Result | Criteria |
|--------|----------|
| **PASS** | All CRITICAL checks pass AND >= 80% of standard checks pass |
| **CONDITIONAL** | All CRITICAL checks pass AND < 80% standard checks pass with documented mitigation plan and deadline |
| **FAIL** | Any CRITICAL check fails |
| **WAIVED** | Non-critical items waived by stakeholder with documented business justification |

---

## Critical vs Non-Critical Classification

| Category | Critical Threshold | Non-Critical Threshold | Rationale |
|----------|-------------------|------------------------|-----------|
| Database-Level | RLS on all tables, context propagation | Performance metrics, documentation | Data breach prevention |
| Application-Level | Context management, middleware | Logging, metadata | Request integrity |
| Cache | Key prefixing, flush isolation | Metrics, TTL policies | Data leakage prevention |
| Event/Message | Headers, consumer validation | Dead letter, monitoring | Event integrity |
| File/Storage | Path isolation, access control | Backup granularity | Data separation |
| API-Level | Validation, rate limiting | Response headers, pagination | Access control |

---

## Waiver Process

Non-critical items may be waived following this process:

1. **Request Documentation** - Document the specific check being waived and business justification
2. **Risk Assessment** - Security team evaluates the risk of waiving the check
3. **Stakeholder Approval** - Product owner or security lead approves in writing
4. **Mitigation Plan** - Document compensating controls or future remediation timeline
5. **Record Keeping** - Waiver recorded in gate execution log with expiration date

---

## Recovery Protocol

On FAIL outcome, execute the following recovery protocol:

### Attempt 1
1. Identify all failing critical checks
2. Fix issues in the identified areas
3. Re-run validation for failed categories only
4. Categories that passed remain LOCKED (no re-validation needed)

### Attempt 2
1. If Attempt 1 fails, conduct root cause analysis
2. Review tenant isolation architecture decisions
3. Implement fixes with additional test coverage
4. Re-run full validation

### Attempt 3 (Final)
1. If Attempt 2 fails, MANDATORY COURSE CORRECTION
2. Escalate to project leadership and security team
3. Consider architecture review workshop
4. Document systemic issues for future prevention

---

## Category-Specific Recovery

| Category | Common Failures | Recovery Actions |
|----------|-----------------|------------------|
| Database-Level | Missing RLS policies | Generate policy templates, audit all tables |
| Application-Level | Context not propagating | Add middleware tests, trace context flow |
| Cache | Keys missing prefix | Refactor cache utility, add unit tests |
| Event/Message | Headers missing | Update event schema, add producer tests |
| File/Storage | Path traversal risk | Implement path sanitization, security review |
| API-Level | Rate limits shared | Implement tenant-aware rate limiter |

---

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Primary workflow producing this gate's artifacts
- `bmad-bam-create-module-architecture` - Prerequisite workflow (QG-M1)
- `bmad-bam-tenant-onboarding-design` - Validates onboarding maintains isolation
- `bmad-bam-tenant-offboarding-design` - Validates offboarding maintains isolation
- `bmad-bam-convergence-verification` - Next gate in sequence (QG-I1)

---

## Related Templates

- `tenant-isolation-template.md` - Documents isolation decisions
- `tenant-context-template.md` - TenantContext implementation spec
- `rls-policy-template.md` - RLS policy generation template
- `tenant-onboarding-template.md` - Onboarding checklist template

---

## Related Patterns

Load decision criteria and verification patterns from pattern registry:

- **Tenant Models:** `{project-root}/_bmad/bam/data/tenant-models.csv` - RLS, schema, database isolation patterns
- **Core Patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter by category: `tenant-*`
- **Quality Gates:** `{project-root}/_bmad/bam/data/quality-gates.csv` - QG-M2 requirements

---

## Web Research Verification

Before finalizing gate assessment, verify current best practices:

**Database Isolation:**
- Search: "PostgreSQL RLS multi-tenant best practices {date}"
- Search: "row level security performance optimization {date}"
- Search: "schema per tenant vs RLS comparison {date}"

**Application Isolation:**
- Search: "tenant context propagation microservices {date}"
- Search: "multi-tenant middleware patterns {date}"

**Cache Isolation:**
- Search: "Redis multi-tenant cache isolation patterns {date}"
- Search: "distributed cache tenant separation {date}"

**Security Compliance:**
- Search: "SOC2 multi-tenant isolation requirements {date}"
- Search: "GDPR data isolation compliance {date}"

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-04-27 | BAM V2 Migration | Complete rewrite with comprehensive checklist sections |
| 1.0.0 | - | Platform Architect | Initial V1 tenant isolation gate |

---

**PASS CRITERIA:** All CRITICAL checks pass AND >= 80% standard checks pass  
**OWNER:** Platform Architect (Atlas persona)  
**REVIEWERS:** Security Lead, Module Architects
