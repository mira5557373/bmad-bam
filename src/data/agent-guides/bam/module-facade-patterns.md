# Module Facade Patterns

**When to load:** When designing module public interfaces, implementing facade contracts, or when user mentions module API, cross-module calls, or interface versioning.

**Integrates with:** Architect (Kai persona), Dev agent, Tech Writer agent

---

## Core Concepts

### What is a Module Facade?

A module facade is the public interface through which other modules interact with a module. It encapsulates internal implementation, provides a stable contract, and enables module evolution without breaking consumers.

### Facade Responsibilities

| Responsibility | Description | Example |
|---------------|-------------|---------|
| Abstraction | Hide internal complexity | Service composition |
| Validation | Input validation | DTO validation |
| Authorization | Access control | Tenant + permission check |
| Translation | DTO <-> Domain | Map to internal models |
| Versioning | Contract stability | v1, v2 methods |

### Facade Architecture

```
External Module
    │
    ├── Calls Facade method
    │
    └── Facade Layer
        ├── Input validation
        ├── Authorization check
        ├── DTO → Domain translation
        │
        └── Domain Layer (internal)
            ├── Business logic
            ├── Repository calls
            │
            └── Event publication
                    │
                    └── Integration events (public)
```

---

## Key Patterns

### Pattern 1: Facade Interface Design

| Component | Purpose | Visibility |
|-----------|---------|------------|
| Query methods | Read operations | Public |
| Command methods | Write operations | Public |
| DTOs | Data transfer | Public |
| Events | State change notifications | Public types |
| Internal types | Domain models | Private |

### Facade Method Categories

| Category | Naming Convention | Return Type |
|----------|-------------------|-------------|
| Query single | `getXxx(id)` | `XxxDto | null` |
| Query list | `listXxx(filter)` | `XxxDto[]` with pagination |
| Command create | `createXxx(input)` | `XxxDto` |
| Command update | `updateXxx(id, input)` | `XxxDto` |
| Command delete | `deleteXxx(id)` | `void` |

### Pattern 2: Tenant Context in Facade

| Approach | Implementation | Trade-off |
|----------|----------------|-----------|
| Implicit | Middleware-injected | Cleaner API, less explicit |
| Explicit | First parameter | Clear, verbose |
| Context object | Bundled context | Flexible, extra type |

### Tenant Context Decision Matrix

| Scenario | Recommended Approach | Rationale |
|----------|---------------------|-----------|
| All operations tenant-scoped | Implicit | Less boilerplate |
| Mixed tenant/global operations | Explicit | Clarity |
| Background jobs | Context object | Serializable |
| Event handlers | Explicit in payload | Async safety |

### Pattern 3: Facade Versioning

| Strategy | Implementation | Migration |
|----------|----------------|-----------|
| Method versioning | `getUser_v2()` | Simple, cluttered |
| Namespace versioning | `v1.UserFacade`, `v2.UserFacade` | Clean, more code |
| Parameter versioning | `getUser({version: 2})` | Flexible, runtime checks |

### Version Lifecycle Management

| Phase | Consumer Actions | Provider Actions |
|-------|------------------|------------------|
| New version released | Migrate at convenience | Support both versions |
| Deprecation announced | Plan migration | Continue support, log warnings |
| End of support | Must have migrated | Remove old version |

---

## Decision Criteria

### When to Create a New Facade Method vs Extend Existing

| Scenario | New Method | Extend Existing |
|----------|------------|-----------------|
| Breaking change | Yes | No |
| New optional parameters | No | Yes |
| New return fields | No | Yes (additive) |
| Different behavior | Yes | No |

### Facade Size Guidelines

| Metric | Healthy Range | Action if Exceeded |
|--------|---------------|-------------------|
| Methods | 5-15 | Split by subdomain |
| Parameters per method | 1-5 | Create input DTO |
| DTO complexity | 3-10 fields | Nested DTOs |

---

## Application Guidelines

- Defining module boundaries
- Designing cross-module communication
- Planning for module evolution
- Creating testable module interfaces
- Documenting module contracts

---

## Facade Contract Checklist

- [ ] All public methods documented
- [ ] Input validation on all parameters
- [ ] Tenant context handled consistently
- [ ] Error types documented
- [ ] Events published for state changes
- [ ] Version strategy defined

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Alternative |
|--------------|---------|-------------|
| Pass-through facade | No value added | Add validation/auth |
| Leaky abstraction | Exposes internals | Return DTOs only |
| God facade | Too many methods | Split by subdomain |
| Missing events | Tight coupling | Publish integration events |
| Mutable DTOs | Unexpected side effects | Immutable DTOs |
| Direct entity return | Breaks encapsulation | DTO transformation |

### Facade Testing Strategy

| Test Type | Scope | Assertion Focus |
|-----------|-------|-----------------|
| Unit tests | Facade logic | Validation, transformation |
| Contract tests | Public interface | Schema compatibility |
| Integration tests | Full flow | Cross-module behavior |

### Common Error Handling

| Error Type | Facade Response | Consumer Action |
|------------|-----------------|-----------------|
| Validation error | Detailed field errors | Fix input |
| Not found | Null or 404 | Handle missing |
| Authorization | 403 with reason | Check permissions |
| Internal error | Generic error | Retry or escalate |

---

## Integration with BAM Patterns

| Pattern | Integration Point | Purpose |
|---------|-------------------|---------|
| Module Architecture | Facade as module boundary | Clean separation |
| Event-Driven | Event publication on state change | Loose coupling |
| Context Propagation | Tenant context in facade | Multi-tenant support |
| API Version Routing | External API to facade mapping | Version management |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Should tenant context be implicit or explicit in facade methods? | Implicit for tenant-scoped operations, explicit for cross-tenant admin | Implicit reduces boilerplate; explicit clarifies when operations span tenants |
| When to create a new facade version vs extend existing? | New version for breaking changes, extend for additive changes | Preserves backward compatibility while enabling evolution |
| How many methods before splitting a facade? | Split at 15+ methods or when subdomains emerge | Large facades become hard to understand and maintain |
| Should facades return domain entities or DTOs? | Always DTOs for external consumers | DTOs provide stable contracts and prevent leaking internal details |
| When to use synchronous calls vs events between modules? | Sync for queries and immediate commands, events for eventual consistency | Sync provides immediate feedback; events enable loose coupling |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Facade patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `facade-contracts`
- **module-boundaries:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `module-boundaries`
- **Related guides:** `event-driven-patterns`, `api-version-routing`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "module facade design pattern {date}"
- Search: "modular monolith interface design {date}"
- Search: "facade versioning strategies {date}"
- Search: "contract-first module design {date}"

## Related Workflows

- `bmad-bam-define-facade-contract` - Design and document facade contracts
- `bmad-bam-api-deprecation-strategy` - Plan facade version management and migration
- `bmad-bam-create-module-architecture` - Design module structure with facade boundaries
- `bmad-bam-convergence-verification` - Validate facade contract compliance across modules
