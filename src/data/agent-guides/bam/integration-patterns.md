# BAM Integration Patterns Context

**When to load:** During cross-module integration, facade contract design, or convergence verification.

**Integrates with:** Kai (Integration Architect), Winston (Architect)

---

## Core Concepts for Integration

### Facade Contract Structure

```typescript
// Every facade method signature
interface ModuleFacade {
  methodName(
    ctx: TenantContext,    // Always first parameter
    input: InputDTO        // DTOs, not domain entities
  ): Promise<OutputDTO>;   // DTOs, not domain entities
}

// Contract versioning
@FacadeVersion('1.2.0')
class BillingFacade implements IBillingFacade {
  // Semantic versioning: MAJOR.MINOR.PATCH
  // MAJOR: Breaking changes
  // MINOR: New methods/fields (backward compatible)
  // PATCH: Bug fixes only
}
```

### Event Contract Pattern

```typescript
interface DomainEvent {
  eventId: string;
  eventType: string;
  timestamp: Date;
  tenantId: string;      // Always include
  aggregateId: string;
  version: number;       // For ordering
  payload: object;       // Event-specific data
}

// Backward compatibility rules:
// - Add new optional fields only
// - Never remove or rename fields
// - Never change field types
```

### Convergence Verification

Pre-release checklist:
1. All facade contracts have passing tests
2. No circular dependencies detected
3. All cross-module stories decomposed
4. Contract versions aligned across consumers
5. Event schemas backward compatible

---

## Application Guidelines

1. **Contracts before code** - Define facade interface first
2. **DTOs at boundaries** - Never expose domain entities
3. **TenantContext always** - First parameter of every method
4. **Version explicitly** - Semantic versioning required
5. **Test contracts** - Contract tests for every facade

---

## Integration with BAM Workflows

- `bmad-bam-define-facade-contract` → New contract
- `bmad-bam-evolve-facade-contract` → Breaking changes
- `bmad-bam-convergence-verification` → Pre-release check
