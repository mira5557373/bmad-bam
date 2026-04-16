# Module Boundaries Guide

**When to load:** When defining bounded contexts, module separation, or when user mentions modular monolith, DDD, or cross-module communication.

**Integrates with:** Architect (Atlas persona), Dev agent, Tech lead

---

## Core Concepts

### What are Module Boundaries?

Module boundaries define the separation of concerns within a modular monolith architecture. Each module represents a bounded context with clear interfaces, enabling team autonomy while maintaining a single deployable unit.

### Boundary Strategy Comparison

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Vertical Slice | Feature-complete modules | Product teams |
| Feature Module | Grouped by feature | Feature teams |
| Domain Module | DDD bounded contexts | Domain complexity |

---

## Key Patterns

### Pattern 1: Bounded Context Alignment

Align modules with business domains.

| Component | Purpose | Tenant Consideration |
|-----------|---------|---------------------|
| Context Map | Domain relationships | Shared across tenants |
| Ubiquitous Language | Domain terminology | Tenant-agnostic |
| Module Interface | Public API | Tenant-scoped calls |
| Anti-Corruption Layer | External integration | Tenant context passing |

### Bounded Context Structure

```
┌─────────────────────────────────────────┐
│            System Boundary               │
│                                          │
│  ┌──────────────┐  ┌──────────────┐     │
│  │  Billing     │  │   Users      │     │
│  │  Context     │  │   Context    │     │
│  │  ┌────────┐  │  │  ┌────────┐  │     │
│  │  │Entities│  │  │  │Entities│  │     │
│  │  │Services│  │  │  │Services│  │     │
│  │  │Repos   │  │  │  │Repos   │  │     │
│  │  └────────┘  │  │  └────────┘  │     │
│  └──────────────┘  └──────────────┘     │
│         │                  │             │
│         └───── Events ─────┘             │
└─────────────────────────────────────────┘
```

### Pattern 2: Module Interface Design

Define clear public contracts.

| Interface Type | Description | Tenant Consideration |
|----------------|-------------|---------------------|
| Facade API | Public methods | Tenant parameter |
| Events | Async notifications | Tenant in payload |
| Shared Kernel | Common types | Tenant-agnostic |
| DTOs | Data transfer | Tenant-scoped |

### Module Structure

```
Module/
├── public/           # Public interface
│   ├── facade.ts     # Entry point
│   ├── events.ts     # Published events
│   └── types.ts      # Public DTOs
├── internal/         # Implementation
│   ├── domain/       # Domain logic
│   ├── services/     # Business services
│   └── repository/   # Data access
└── tests/
```

### Pattern 3: Cross-Module Communication

Patterns for module interaction.

| Pattern | Coupling | Use Case |
|---------|----------|----------|
| Synchronous Call | Higher | Query data |
| Domain Events | Lower | State notifications |
| Integration Events | Lowest | Cross-module workflows |

### Communication Flow

```
Module A                      Module B
    │                             │
    ├── Query (sync) ────────────>│
    │<── Response ────────────────│
    │                             │
    ├── Event (async) ───────────>│
    │   (fire and forget)         │
    │                             │
```

### Pattern 4: Dependency Rules

Control module dependencies.

| Rule | Description | Enforcement |
|------|-------------|-------------|
| No cycles | Acyclic dependencies | Build tooling |
| Direction | Higher -> lower only | Architecture tests |
| Interface only | No internal access | Compile-time |
| Event over call | Prefer async | Code review |

### Dependency Layers

```
┌─────────────────────────────────────────┐
│              Presentation               │
│  (Can depend on any lower layer)        │
├─────────────────────────────────────────┤
│              Application                │
│  (Can depend on Domain, Infra)          │
├─────────────────────────────────────────┤
│               Domain                    │
│  (Can depend on Shared Kernel only)     │
├─────────────────────────────────────────┤
│            Infrastructure               │
│  (Can depend on Domain)                 │
├─────────────────────────────────────────┤
│            Shared Kernel                │
│  (No dependencies)                      │
└─────────────────────────────────────────┘
```

---

## Application Guidelines

When defining module boundaries:

1. **Start with domains** - Align with business capabilities
2. **Define interfaces first** - Contract-driven design
3. **Minimize dependencies** - Loose coupling
4. **Use events** - Async over sync when possible
5. **Test boundaries** - Architecture fitness functions

---

## Module Ownership Model

| Model | Description | Best For |
|-------|-------------|----------|
| Single Team | One team owns module | Small teams |
| Shared Ownership | Multiple teams | Cross-functional |
| Inner Source | Open contribution | Platform modules |

---

## Boundary Indicators

Signs you need a boundary:

| Indicator | Signal | Action |
|-----------|--------|--------|
| Different pace | Change frequency varies | Separate modules |
| Different owners | Team boundaries | Align modules |
| Different data | Separate aggregates | Module per aggregate |
| Different lifecycle | Deploy independently | Module boundary |

---

## Anti-Corruption Layer

Protect domain from external concerns.

| Component | Purpose | Implementation |
|-----------|---------|----------------|
| Adapter | External system interface | Translate calls |
| Translator | Data mapping | Convert formats |
| Facade | Simplified interface | Hide complexity |

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Distributed monolith | Coupled modules | Clear interfaces |
| Big ball of mud | No boundaries | Identify contexts |
| Circular dependencies | Tight coupling | Layered architecture |
| Shared database | Hidden coupling | Module databases |
| Internal access | Broken encapsulation | Interface only |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| How to identify boundaries? | Start with business domains | Align with organization |
| Sync vs async communication? | Prefer async for loose coupling | Reduces dependencies |
| Shared database? | Avoid; use module-owned data | Prevents hidden coupling |
| How to enforce boundaries? | Architecture tests and build tooling | Automated enforcement |

---

## Related Workflows

- `bmad-bam-module-boundary-design` - Design module boundaries
- `define-facade-contract` - Define module interfaces
- `create-module-architecture` - Module architecture design

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Module patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `module-boundaries`
- **Modular monolith:** `{project-root}/_bmad/bam/data/agent-guides/bam/modular-monolith-patterns.md`
- **DDD patterns:** `{project-root}/_bmad/bam/data/agent-guides/bam/ddd-module-patterns.md`
- **Module facades:** `{project-root}/_bmad/bam/data/agent-guides/bam/module-facade-patterns.md`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "modular monolith patterns {date}"
- Search: "bounded context design {date}"
- Search: "DDD module boundaries {date}"
