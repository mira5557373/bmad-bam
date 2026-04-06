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

---

## Application Guidelines

When Winston designs module architecture:

1. **Start with bounded context mapping** - Identify domain boundaries
2. **Define facades first** - Contract before implementation
3. **Verify tenant context flow** - Context must propagate everywhere
4. **Plan extraction seams** - Design for future microservice extraction
5. **Document ownership** - One team owns each module

---

## Integration with BAM Workflows

- `bmad-bam-create-module-architecture` → Per-module design
- `bmad-bam-module-boundary-design` → Boundary rules
- `bmad-bam-define-facade-contract` → Contract definition
