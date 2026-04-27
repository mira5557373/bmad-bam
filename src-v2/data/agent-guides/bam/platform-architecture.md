# BAM Platform Architecture Guide

**When to load:** During foundation design, master architecture creation, tenant model design, or module boundary definition. Load via `bam-platform-context` menu item.

**Integrates with:** Winston (Architect) when BAM extension is active.

---

## Overview

This guide provides comprehensive context for platform architecture decisions in multi-tenant SaaS systems. It consolidates knowledge previously held by the Atlas (Platform Architect) persona.

## Core Concepts

### 1. Foundation Before Features

The master architecture must be created and frozen before any module implementation begins. Changes after the foundation gate require an Architecture Decision Record (ADR) and emergency change protocol.

### 2. Tenant Isolation is Non-Negotiable

Every data store, cache, memory system, and background process must enforce tenant isolation. There are no exceptions. Cross-tenant data leakage is a critical security vulnerability.

### 3. Design for the 1000th Tenant

Architecture decisions made for tenant #1 must scale to tenant #1000. Avoid patterns that work for single-tenant but break at scale:
- Dedicated infrastructure per tenant (cost prohibitive)
- Tenant-specific code paths (maintenance nightmare)
- Manual provisioning steps (operational burden)

### 4. Module Boundaries Enable Future Extraction

Every module should be extractable to a microservice. This requires:
- Clear facade contracts
- No shared database tables
- Event-driven communication for async operations
- Explicit dependency declarations

---

## Master Architecture Components

### Tenant Model

```
Organization (Billing Entity)
├── Workspace (Collaboration Boundary)
│   ├── User (Individual Access)
│   │   └── API Key (Programmatic Access)
│   └── User
└── Workspace
```

**Key Decisions:**
- Which level is the billing owner? (Usually Organization)
- Can resources be shared across workspaces? (Usually No)
- What data is truly global vs tenant-scoped?

### Isolation Strategies

| Strategy | Use Case | Isolation Level | Complexity |
|----------|----------|-----------------|------------|
| Row-Level Security (RLS) | Most SaaS, <1000 tenants | Shared tables, filtered queries | Low |
| Schema-Per-Tenant | Regulated industries | Separate schemas, same DB | Medium |
| Database-Per-Tenant | Enterprise tier | Maximum isolation | High |

**Recommendation:** Start with RLS, offer schema/database isolation for enterprise tier.

### Module Structure

```
/src/modules/{module-name}/
├── api/              # HTTP handlers
├── domain/           # Business logic, entities
├── facade/           # Public interface for other modules
├── infrastructure/   # Database, external services
├── events/           # Published and consumed events
└── README.md         # Module documentation
```

**Forbidden Dependencies:**
- Direct database access across modules
- Importing domain entities from other modules
- Calling internal services (only facades)

### Shared Kernel

The shared kernel contains:
- TenantContext (always first parameter)
- Common DTOs (pagination, errors)
- Base entities (timestamps, soft delete)
- Utility functions

**Rule:** Shared kernel has NO business logic. It's infrastructure only.

---

## Foundation Gate (QG-F1)

Before proceeding to module implementation, verify:

### Master Architecture
- [ ] Tenant model documented with hierarchy
- [ ] Isolation strategy selected and justified
- [ ] Module boundaries identified
- [ ] Shared kernel defined
- [ ] Control plane vs tenant plane separated

### Tenant Isolation
- [ ] RLS policies designed for all tables
- [ ] Cache isolation strategy defined
- [ ] Memory isolation strategy defined
- [ ] Background job isolation defined

### Technical Foundation
- [ ] Database schema with tenant_id columns
- [ ] Middleware for tenant context extraction
- [ ] Audit logging with tenant context
- [ ] Error handling with tenant isolation

### Documentation
- [ ] Master architecture document complete
- [ ] ADR template established
- [ ] Dependency graph documented

---

## Module Architecture (Post-Foundation)

Each module inherits from master architecture and defines:

### Bounded Context
- Domain entities and value objects
- Aggregates and aggregate roots
- Domain events

### Facade Contract
```typescript
interface {Module}Facade {
  // TenantContext ALWAYS first parameter
  method(ctx: TenantContext, input: InputDTO): Promise<OutputDTO>;
}
```

### Event Contract
```typescript
interface {Module}Events {
  '{module}.entity.created': EntityCreatedEvent;
  '{module}.entity.updated': EntityUpdatedEvent;
}
```

### Internal vs External
- **Internal:** Domain services, repositories, entities
- **External:** Facade methods, published events, API endpoints

---

## Quality Gate Mapping

| Gate | Focus | Checklist |
|------|-------|-----------|
| QG-F1 | Foundation | Master arch + tenant model + shared kernel |
| QG-M1 | Module Architecture | Bounded context + facade + events |
| QG-M2 | Tenant Isolation | RLS + context propagation + cache |
| QG-M3 | Module Readiness | Tests + docs + dependencies |

---

## Common Patterns

### Tenant Context Propagation

```typescript
// HTTP Middleware
app.use((req, res, next) => {
  const tenantId = extractFromJWT(req.headers.authorization);
  req.tenantContext = new TenantContext(tenantId);
  next();
});

// Database (SET LOCAL for connection pooling)
await db.query(`SET LOCAL app.current_tenant = '${tenantId}'`);

// Background Jobs
queue.add('job-name', { 
  tenantId: ctx.tenantId,
  payload: data 
});

// Events
event.headers['tenant_id'] = ctx.tenantId;
```

### Control Plane Separation

```
/admin/*     → Control Plane (no tenant context)
/internal/*  → Internal APIs (service-to-service)
/api/v1/*    → Tenant Plane (tenant context required)
```

### Provisioning Saga

```
START → Create Tenant Record
      → Create Database Schema/RLS
      → Create Storage Bucket
      → Initialize Config
      → Create Admin User
      → Send Welcome Email
      → COMPLETE

On Failure: Compensate in reverse order
```

---

## Anti-Patterns to Avoid

1. **Tenant ID in URL Path:** Use headers/JWT instead
2. **Tenant-Specific Code:** Use configuration, not branches
3. **Shared State Without Isolation:** All caches, queues, etc. need tenant prefix
4. **Missing Context Propagation:** Every code path needs tenant context
5. **Direct Cross-Module DB Access:** Use facades only
6. **Monolithic Master Architecture:** Keep it high-level, details in modules

---

## Integration with Other Domains

### AI Runtime (Nova Domain)
- AI agents operate within tenant context
- Memory tiers respect tenant isolation
- Tool execution requires tenant context

### Integration (Kai Domain)
- Facade contracts include TenantContext
- Events include tenant_id header
- Convergence verification checks tenant isolation

### Development (Amelia + BAM Extension)
- RLS implementation follows platform patterns
- Tenant context propagation in code
- Testing with multi-tenant fixtures

---

## Application Guidelines

When designing platform architecture:
1. Create and freeze master architecture before any module implementation begins
2. Enforce tenant isolation at every layer without exception
3. Design for the 1000th tenant from the start to avoid architectural rework
4. Define module boundaries that enable future microservice extraction
5. Document all foundation decisions in Architecture Decision Records

When implementing isolation patterns:
1. Apply RLS policies as the database-level last line of defense
2. Use middleware to establish tenant context at API boundary
3. Include tenant_id in all cache keys and queue job payloads
4. Never trust client-provided tenant identifiers
5. Test isolation with multi-tenant fixtures that verify cross-tenant access fails

---

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| Starting new platform | Use RLS with plan for schema/DB option later | RLS balances isolation with cost efficiency for most SaaS |
| Enterprise tenant requires maximum isolation | Offer database-per-tenant as Enterprise tier option | Compliance and security requirements justify added complexity |
| Module needs to call another module | Use facade contracts only, never direct DB access | Facades enable future extraction and enforce boundaries |
| Shared functionality across modules | Place in shared kernel with no business logic | Shared kernel is infrastructure only |
| Background job processes tenant data | Include tenant_id in job payload, validate on processing | Jobs must not assume context from caller |
| Admin needs cross-tenant view | Implement in control plane with explicit authorization | Control plane separates admin from tenant operations |

---

## Related Workflows

- `create-master-architecture` - Create the frozen master architecture document
- `bmad-bam-module-boundary-design` - Define clear boundaries between modules
- `bmad-bam-disaster-recovery-design` - Design disaster recovery for the platform

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Platform patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `platform-*`
- **Tenant models:** `{project-root}/_bmad/bam/data/tenant-models.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant platform architecture patterns {date}"
- Search: "modular monolith platform engineering {date}"
- Search: "SaaS platform scalability patterns {date}"
