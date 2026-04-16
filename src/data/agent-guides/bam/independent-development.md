# BAM Independent Development Patterns Guide

**When to load:** During team structure design, module ownership planning, development workflow design, or when implementing independent development practices for multi-tenant modular monolith platforms.

**Integrates with:** Winston (Architect), James (Dev), Chad (PM), dev-bam extension.

---

## Core Concepts

### Independent Development Principles

| Principle | Description | Multi-Tenant Aspect |
|-----------|-------------|---------------------|
| Module Ownership | Single team owns module | Tenant context flows through |
| Interface Contracts | Stable module boundaries | Tenant-aware contracts |
| Independent Deploy | Module deploys independently | Tenant-safe deployments |
| Local Testing | Test without dependencies | Tenant test fixtures |
| Autonomous Decisions | Team decides implementation | Tenant isolation maintained |

### Team Module Mapping

```
┌─────────────────────────────────────────────────┐
│          Team → Module Ownership                 │
│                                                  │
│  ┌──────────┐     ┌──────────────────────┐     │
│  │ Team A   │────►│ Billing Module       │     │
│  │          │     │ - Metering           │     │
│  │          │     │ - Invoicing          │     │
│  └──────────┘     └──────────────────────┘     │
│                                                  │
│  ┌──────────┐     ┌──────────────────────┐     │
│  │ Team B   │────►│ AI Runtime Module    │     │
│  │          │     │ - Agent execution    │     │
│  │          │     │ - Tool management    │     │
│  └──────────┘     └──────────────────────┘     │
│                                                  │
│  ┌──────────┐     ┌──────────────────────┐     │
│  │Platform  │────►│ Shared Kernel        │     │
│  │Team      │     │ - Tenant context     │     │
│  │          │     │ - Common types       │     │
│  └──────────┘     └──────────────────────┘     │
└─────────────────────────────────────────────────┘
```

### Development Workflow Patterns

| Pattern | Description | Benefit |
|---------|-------------|---------|
| Trunk-Based | Short-lived branches, frequent merge | Fast integration |
| Feature Flags | Deploy disabled, enable separately | Safe rollouts |
| Contract Testing | Verify interface compatibility | Catch breaks early |
| Stub Dependencies | Mock other modules locally | Fast feedback |

### Module Interface Requirements

| Requirement | Description | Enforcement |
|-------------|-------------|-------------|
| Versioned APIs | Semantic versioning | CI/CD checks |
| Tenant Context | All calls include tenant | Compile-time |
| Async Events | Use events for cross-module | Architecture review |
| No Direct DB | Access via module API only | Database permissions |

### Local Development Setup

| Component | Local Approach | Tenant Handling |
|-----------|----------------|-----------------|
| Own Module | Full local environment | Test tenant fixtures |
| Dependencies | Stubs or containers | Stub tenant responses |
| Database | Local instance or shared dev | RLS policies active |
| Message Queue | Local or shared dev | Tenant headers propagated |

### Test Pyramid for Modules

| Level | Scope | Tenant Testing |
|-------|-------|----------------|
| Unit | Single function/class | Mock tenant context |
| Integration | Module boundaries | Test tenant fixtures |
| Contract | Cross-module interfaces | Tenant in all contracts |
| E2E | Full system | Multiple test tenants |

---

## Application Guidelines

When implementing independent development in a multi-tenant context:

1. **Define clear module boundaries** - Use facade contracts
2. **Ensure tenant context propagation** - All interfaces include tenant
3. **Implement contract testing** - Verify cross-module compatibility
4. **Provide local development setup** - Teams can work independently
5. **Use feature flags for integration** - Safe cross-module changes
6. **Document ownership clearly** - Single responsible team per module

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| How many teams per module? | One team per module | Clear ownership |
| Who owns shared kernel? | Platform team | Central governance |
| How to coordinate cross-module changes? | ADR process + contract tests | Minimal coordination |
| When to split a module? | When team can't move fast | Conway's Law alignment |
| Local dev complexity? | Stubs for dependencies | Fast developer feedback |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Development patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `development-*`
- **Module patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `module-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "modular monolith independent teams {date}"
- Search: "domain team ownership patterns {date}"
- Search: "contract testing microservices {date}"

---

## Related Workflows

- `bmad-bam-module-boundary-design` - Define module boundaries
- `define-facade-contract` - Define module interfaces
- `bmad-bam-dev-trigger` - Set up local dev environment
