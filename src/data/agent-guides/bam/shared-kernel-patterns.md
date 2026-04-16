# BAM Shared Kernel Patterns Guide

**When to load:** During modular monolith design, cross-module integration, shared code governance, or when implementing shared kernels for multi-tenant SaaS platforms.

**Integrates with:** Winston (Architect), James (Dev), architect-bam extension.

---

## Core Concepts

### Shared Kernel Definition

A shared kernel is code that multiple modules depend on and modify together. In multi-tenant systems, it includes tenant context, common domain types, and cross-cutting concerns.

### Shared Kernel Categories

| Category | Contents | Multi-Tenant Aspect |
|----------|----------|---------------------|
| Tenant Context | Tenant ID, tier, config | Required in all modules |
| Domain Types | Common value objects | Tenant-scoped variants |
| Cross-Cutting | Auth, logging, audit | Tenant-aware implementation |
| Events | Domain events, integration events | Tenant context in payload |
| Contracts | API/interface definitions | Versioned per tenant if needed |

### Shared Kernel Architecture

```
┌─────────────────────────────────────────────────┐
│             Shared Kernel Structure              │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │              Shared Kernel                │   │
│  │                                           │   │
│  │  ┌─────────────┐  ┌─────────────┐        │   │
│  │  │   Tenant    │  │   Domain    │        │   │
│  │  │   Context   │  │   Types     │        │   │
│  │  └─────────────┘  └─────────────┘        │   │
│  │                                           │   │
│  │  ┌─────────────┐  ┌─────────────┐        │   │
│  │  │   Events    │  │  Contracts  │        │   │
│  │  │             │  │             │        │   │
│  │  └─────────────┘  └─────────────┘        │   │
│  └────────────────────┬─────────────────────┘   │
│                       │                          │
│       ┌───────────────┼───────────────┐         │
│       │               │               │         │
│   ┌───▼───┐       ┌───▼───┐       ┌───▼───┐    │
│   │Module │       │Module │       │Module │    │
│   │   A   │       │   B   │       │   C   │    │
│   └───────┘       └───────┘       └───────┘    │
└─────────────────────────────────────────────────┘
```

### Tenant Context in Shared Kernel

| Component | Purpose | Propagation |
|-----------|---------|-------------|
| TenantId | Unique identifier | All requests |
| TenantTier | Feature/limit lookup | Authorization |
| TenantConfig | Runtime configuration | Feature flags |
| TenantRegion | Data residency | Routing |

### Change Governance

| Change Type | Approval | Risk |
|-------------|----------|------|
| New type (additive) | Module team | Low |
| Modify existing type | All dependent teams | Medium |
| Remove type | All dependent teams | High |
| Change contract | All consumers | High |

### Versioning Strategies

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Monolithic Version | All kernel changes bump version | Simple, coupled |
| Semantic Versioning | Major.Minor.Patch | Clear breaking changes |
| Consumer-Driven | Contracts define version | Decoupled evolution |
| Feature Flags | Toggle new implementations | Gradual rollout |

### Anti-Corruption Layer

| Pattern | Purpose | Implementation |
|---------|---------|----------------|
| Adapter | Translate external to internal | Per-module boundary |
| Facade | Simplify complex subsystem | Module API surface |
| Translator | Map between contexts | Cross-module calls |

---

## Application Guidelines

When implementing shared kernel in a multi-tenant context:

1. **Include tenant context** - Every shared type should be tenant-aware
2. **Minimize kernel size** - Only truly shared code belongs here
3. **Version carefully** - Breaking changes affect all modules
4. **Govern changes** - Require cross-team approval for modifications
5. **Test exhaustively** - Kernel changes impact entire platform
6. **Document contracts** - Clear interface documentation

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| What belongs in kernel? | Tenant context, domain events, contracts | Minimize coupling |
| How to version? | Semantic versioning with deprecation | Clear upgrade path |
| Who owns the kernel? | Platform team with contributor model | Central governance |
| How to test changes? | Integration tests across all modules | Prevent regressions |
| When to split kernel? | When modules diverge significantly | Reduce coupling |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Architecture patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `architecture-*`
- **Module patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `module-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "shared kernel domain driven design {date}"
- Search: "modular monolith shared code patterns {date}"
- Search: "bounded context integration patterns {date}"

---

## Related Workflows

- `bmad-bam-module-boundary-design` - Define module boundaries
- `create-module-architecture` - Design module architecture
- `define-facade-contract` - Define module contracts
