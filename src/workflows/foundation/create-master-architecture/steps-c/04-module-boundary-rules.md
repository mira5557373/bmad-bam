# Step 4: Module Boundary Rules

## Purpose
Establish strict module boundary rules that enforce encapsulation, prevent coupling, and enable independent module evolution.

## Actions

- Define facade requirements:
  - All public interfaces via facade pattern only
  - Every facade method must accept TenantContext
  - Facade methods return DTOs, never internal entities
  - Version facade interfaces for backward compatibility

- Document forbidden dependency patterns:
  - No circular dependencies between modules
  - No direct imports of internal module classes
  - No shared mutable state between modules
  - No database joins across module boundaries

- Establish event ownership rules:
  - One publisher per event type (single source of truth)
  - Event schemas versioned and documented
  - Publishers responsible for event schema evolution
  - Consumers must handle unknown fields gracefully

- Define database ownership rules:
  - Each table owned by exactly one module
  - Foreign keys only within module boundaries
  - Cross-module references via ID only (no joins)
  - Shared lookup tables owned by shared-kernel

## Outputs
- Module boundary enforcement checklist
- Dependency validation script/linter rules
- Event ownership registry
- Database ownership matrix

## Questions to Consider
- How do you handle legitimate cross-module queries?
- What is the process for transferring table ownership?
- How do you enforce boundaries in code review?
- What exceptions, if any, are permitted?
