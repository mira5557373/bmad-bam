# BAM Module Architecture Context

**When to load:** During Phase 3 (Solutioning) when designing system architecture, module boundaries, or DDD patterns.

**Integrates with:** Winston (Architect), Atlas (Platform Architect)

---

## Core Concepts for Module Architecture

### Modular Monolith Principles

1. **Modules are deployment units** - Can be extracted to services later
2. **Module boundaries = bounded contexts** - DDD alignment
3. **Facade contracts only** - No direct internal dependencies
4. **Independent development** - Teams work in parallel
5. **Shared kernel is minimal** - Only true cross-cutting concerns

### Module Structure Pattern

```
modules/
├── {module-name}/
│   ├── facade/           # Public contract (interface + DTOs)
│   │   ├── {Module}Facade.ts
│   │   └── dto/
│   ├── domain/           # Business logic (private)
│   │   ├── entities/
│   │   ├── services/
│   │   └── repositories/
│   ├── infrastructure/   # Technical implementation (private)
│   │   ├── persistence/
│   │   └── external/
│   └── tests/
│       ├── unit/
│       ├── integration/
│       └── contract/     # Facade contract tests
```

### Forbidden Dependencies

| From | To | Allowed |
|------|-----|---------|
| Module A domain | Module B domain | NO - use facade |
| Module A domain | Module B facade | YES |
| Module A | Shared Kernel | YES |
| Module A infrastructure | Module B | NO |

### Module Communication Matrix

| Communication Type | Sync/Async | Coupling | Use Case |
|-------------------|------------|----------|----------|
| Facade method call | Sync | Moderate | Query operations, immediate response needed |
| Domain event | Async | Loose | State change notifications |
| Integration event | Async | Very loose | Cross-module workflows |
| Shared kernel type | Compile | Tight | Common value objects only |

---

## Tenant Context in Modules

Every module operation must:
1. Accept `TenantContext` as first parameter
2. Propagate context to all internal operations
3. Apply RLS through repository layer
4. Log with tenant context

```typescript
interface TenantContext {
  tenantId: string;
  workspaceId?: string;
  userId: string;
  tier: 'free' | 'pro' | 'enterprise';
  permissions: string[];
}
```

### Tenant Context Flow Example

```
HTTP Request
    │
    ├── Gateway extracts tenant from JWT/header
    │
    ├── Middleware creates TenantContext
    │
    ├── Controller receives TenantContext
    │
    ├── Facade method accepts TenantContext as first param
    │
    ├── Domain service propagates context
    │
    └── Repository applies RLS with tenant_id
```

---

## Decision Criteria for Module Boundaries

### When to Create a New Module

| Criterion | Create New Module | Extend Existing |
|-----------|-------------------|-----------------|
| Domain ownership | Different business domain | Same domain, new feature |
| Team ownership | Different team responsible | Same team |
| Deployment cadence | Different release schedules | Same release cycle |
| Data ownership | Owns distinct entities | Shares existing entities |
| External integration | Unique external dependencies | Uses shared integrations |

### Module Size Guidelines

| Metric | Ideal Range | Warning Signs |
|--------|-------------|---------------|
| Facade methods | 5-20 | >30 indicates split needed |
| Domain entities | 3-10 | >15 suggests multiple contexts |
| Lines of code | 2K-10K | >20K needs decomposition |
| Team members | 2-5 | >7 often conflicts |

---

## Application Guidelines

When Winston designs module architecture:

1. **Start with bounded context mapping** - Identify domain boundaries
2. **Define facades first** - Contract before implementation
3. **Verify tenant context flow** - Context must propagate everywhere
4. **Plan extraction seams** - Design for future microservice extraction
5. **Document ownership** - One team owns each module

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Chatty facades | Too many cross-module calls | Batch operations, aggregate queries |
| Shared database access | Modules query each other's tables | Strict table ownership, use facades |
| Circular dependencies | Module A needs B needs A | Extract shared concept to third module |
| Anemic facades | Pass-through without logic | Add validation, authorization |
| Missing events | Tight coupling via sync calls | Publish domain events for state changes |
| Context forgetting | Tenant context not propagated | Middleware enforcement, linting rules |

### Dependency Violation Detection

Configure build-time checks to prevent forbidden dependencies:

| Tool | Configuration | Enforcement |
|------|---------------|-------------|
| ESLint | Import restrictions | Block cross-domain imports |
| ArchUnit (JVM) | Architecture tests | Fail build on violation |
| Dependency cruiser | Rule configuration | CI pipeline check |

---

## Integration with BAM Patterns

### Related Pattern Integration

| Pattern | Integration Point | Purpose |
|---------|-------------------|---------|
| Facade Contracts | Module public interface | Stable cross-module API |
| Event-Driven | Domain event publishing | Loose coupling |
| Context Propagation | TenantContext flow | Multi-tenant isolation |
| DDD Module Patterns | Bounded context mapping | Domain alignment |

### Workflow Integration

- `create-module-architecture` → Per-module design
- `bmad-bam-module-boundary-design` → Boundary rules
- `define-facade-contract` → Contract definition

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Module patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `module-*`
- **Architecture patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `architecture-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "modular monolith module boundaries {date}"
- Search: "domain-driven design module architecture {date}"
- Search: "multi-tenant module isolation patterns {date}"
- Search: "module dependency management patterns {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|---------------|-----------|
| When to create a new module vs extend existing? | New module when different domain owner, deployment cadence, or data ownership | Clear boundaries prevent coupling; shared ownership leads to coordination overhead |
| How to handle cross-module data queries? | Always through facade; never direct database joins across module tables | Maintains module autonomy; enables future extraction to microservices |
| When to use sync facade call vs domain event? | Sync for queries and immediate consistency needs; events for state change notifications | Appropriate coupling level for use case; events enable loose coupling |
| What module size triggers decomposition? | >30 facade methods, >15 entities, or >20K lines of code | Complexity indicators suggest multiple bounded contexts; smaller modules are easier to maintain |
| How to resolve circular module dependencies? | Extract shared concept to third module or convert to event-based communication | Breaks dependency cycle; events provide natural decoupling point |

## Related Workflows

- `create-module-architecture` - Design module boundaries and internal structure
- `define-facade-contract` - Define stable facade contracts for modules
- `bmad-bam-tenant-model-isolation` - Apply tenant isolation within modules
- `bmad-bam-convergence-verification` - Validate cross-module integration
- `create-master-architecture` - Establish overall architecture for module design
