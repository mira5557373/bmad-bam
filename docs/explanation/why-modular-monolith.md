# Why Modular Monolith?

BAM advocates for a **modular monolith** architecture over microservices for multi-tenant SaaS platforms. This document explains why.

## The Architecture Spectrum

```
Monolith ←──────────────────────────────────→ Microservices
    │                                              │
    │    ┌──────────────────────┐                  │
    │    │  Modular Monolith    │                  │
    │    │  (BAM's sweet spot)  │                  │
    │    └──────────────────────┘                  │
    │                                              │
  Simple                                       Complex
  Coupled                                      Distributed
  Fast                                         Network-bound
```

## Why Not Microservices?

### 1. Operational Complexity
```
Microservices require:
- Service discovery
- Distributed tracing
- Network fault tolerance
- Config management per service
- CI/CD per service
- Monitoring per service
```

For a startup or small team, this is overwhelming.

### 2. Distributed Transactions
```
Cross-service operations become:
- Saga patterns
- Eventual consistency
- Compensation logic
- Idempotency keys
```

Multi-tenant data consistency is hard enough without distribution.

### 3. Network Latency
```
Monolith: function call = nanoseconds
Microservice: network call = milliseconds

10 chained calls:
- Monolith: ~100ns
- Microservices: ~100ms (1000x slower)
```

### 4. Tenant Context Propagation
```
Microservices require:
- Context in every request header
- Validation at every service boundary
- Potential for context loss in async flows
```

## Why Modular Monolith?

### 1. Module Boundaries Without Network
```typescript
// Still strongly bounded
@Module({
  imports: [SharedKernelModule],
  exports: [ProjectFacade], // Only facade exported
})
class ProjectModule {
  // Internal services hidden
}
```

### 2. Transaction Simplicity
```typescript
// Single database transaction
@Transactional()
async createProjectWithTasks(cmd: CreateProjectCommand) {
  const project = await this.projectService.create(cmd);
  await this.taskService.createDefault(project.id);
  // Either both succeed or both fail
}
```

### 3. Refactoring Safety
```typescript
// Can extract to microservice later if needed
// Module boundaries already defined
// Facade contracts already versioned
```

### 4. Single Tenant Context
```typescript
// Set once, available everywhere
await db.query(`SET LOCAL app.tenant_id = $1`, [tenantId]);
// All modules automatically tenant-scoped
```

## BAM's Module Pattern

### Bounded Context = Module
```
┌─────────────────────────────────────────────┐
│                 Application                  │
├──────────┬──────────┬──────────┬────────────┤
│ Identity │ Billing  │ Projects │ AI Runtime │
│  Module  │  Module  │  Module  │   Module   │
├──────────┴──────────┴──────────┴────────────┤
│              Shared Kernel                   │
│    (TenantContext, ValueObjects, Events)     │
└─────────────────────────────────────────────┘
```

### Facade-Protected Communication
```typescript
// Modules ONLY communicate through facades
class BillingModule {
  constructor(
    private projectFacade: ProjectFacade, // Injected facade
  ) {}
  
  async calculateUsage(tenantId: TenantId) {
    // Cannot access ProjectService directly
    const projects = await this.projectFacade.listProjects(tenantId);
    return this.calculateFromProjects(projects);
  }
}
```

### Independent Development
```typescript
// Teams can work independently
// As long as facade contracts are stable

// Team A: Projects Module
await this.projectFacade.createProject(cmd);

// Team B: Billing Module (different team)
const usage = await this.billingFacade.getUsage(tenantId);
```

## When to Extract to Microservice

BAM's modular monolith is designed for eventual extraction:

| Signal | Action |
|--------|--------|
| Module needs different scaling | Extract to service |
| Module needs different runtime | Extract to service |
| Module owned by separate org | Extract to service |
| Team > 50 engineers | Consider extraction |

### Extraction is Safe Because:
1. **Boundaries already defined** - Module interfaces are facades
2. **Contracts already versioned** - API contracts documented
3. **Data already isolated** - Schema/RLS already separates
4. **Tests already exist** - Facade contract tests become API tests

## Summary

| Aspect | Microservices | Modular Monolith |
|--------|---------------|------------------|
| Operational cost | High | Low |
| Network latency | Present | Absent |
| Transaction complexity | High | Low |
| Tenant context | Propagate everywhere | Set once |
| Team independence | High | Medium |
| Extraction path | N/A | Built-in |

**BAM's position**: Start with modular monolith, extract when you have proof you need it.
