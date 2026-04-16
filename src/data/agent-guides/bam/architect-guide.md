# Architect Guide - BAM Extension

**When to load:** During Phase 3 (Solutioning) when designing modular monolith architecture, or when user mentions modules, facades, DDD, or bounded contexts.
**Integrates with:** Architect (bmad-agent-architect), system design, architecture decisions

This guide provides BAM-specific context for architects designing multi-tenant agentic AI platforms.

## Role Context

As an architect on a BAM project, you focus on:
- Designing modular monolith structures with clear module boundaries
- Applying DDD principles to multi-tenant contexts
- Creating facade contracts between modules
- Ensuring architectural decisions support tenant isolation

## Core Concepts

### Modular Monolith Architecture
A modular monolith combines the deployment simplicity of a monolith with the logical separation of microservices through well-defined module boundaries. In BAM, each module encapsulates a bounded context with its own data ownership while sharing a common deployment unit and tenant context propagation mechanism.

### Tenant Context Propagation
Every request in a multi-tenant system must carry tenant context from entry point through all layers. This context flows through middleware injection at API boundaries, is validated at each module facade, and enforces data isolation at the repository layer through RLS policies or schema routing.

### Facade Contract Design
Module facades serve as the public API for cross-module communication, exposing only what other modules need while hiding internal implementation. Well-designed facades enable independent module evolution, provide natural points for tenant context validation, and create clear boundaries for versioning and contract testing.

## Application Guidelines

When designing multi-tenant architecture:
1. Start with domain analysis to identify bounded contexts before defining module boundaries
2. Design facades as if they were service boundaries, enabling future extraction if needed
3. Include tenant context as a first-class concern in all contracts, not an afterthought
4. Establish data ownership rules early - each entity belongs to exactly one module
5. Use domain events for cross-module communication where eventual consistency is acceptable

## Architecture Decision Matrix

Use this decision matrix when evaluating architectural options for multi-tenant platforms:

| Decision Area | Option A | Option B | Option C | Selection Criteria |
|--------------|----------|----------|----------|-------------------|
| **Module Boundaries** | Feature-based | Domain-based | Capability-based | Choose domain-based for DDD alignment |
| **Communication Style** | Synchronous | Async events | Hybrid | Hybrid for flexibility with consistency |
| **Data Ownership** | Shared DB | Module DB | Polyglot persistence | Module DB with shared tenant context |
| **Facade Design** | Thin pass-through | Rich orchestration | CQRS-style | Rich orchestration for complex domains |
| **Tenant Context** | Request-scoped | Thread-local | Explicit parameter | Request-scoped with middleware injection |
| **Event Bus** | In-process | Message broker | Hybrid | In-process initially, broker for scale |

### When to Choose Each Pattern

**Monolith-First Approach:**
- Start with modular monolith when team size is small (under 20 developers)
- Use when bounded contexts are still being discovered
- Appropriate when deployment simplicity outweighs scaling concerns

**Module Extraction Readiness:**
- Design facades as if they were service boundaries
- Keep module data isolated even within shared database
- Use async events for cross-module communication where possible

## Actionable Guidance

### Designing Module Boundaries

1. **Identify Bounded Contexts** - Analyze the domain model to identify natural boundaries where ubiquitous language changes
2. **Map Tenant Impact** - Determine which modules require tenant awareness versus shared platform modules
3. **Define Public Contracts** - Design the facade interface that other modules will depend upon
4. **Establish Data Ownership** - Assign clear ownership of data entities to specific modules
5. **Plan Event Flows** - Document domain events that cross module boundaries
6. **Design for Isolation** - Ensure each module can enforce tenant isolation independently
7. **Version Strategy** - Establish semantic versioning for facade contracts from the start

### Creating Facade Contracts

1. **Start Minimal** - Begin with the smallest possible public interface
2. **Document Intent** - Each facade method should have clear purpose documentation
3. **Define DTOs** - Create data transfer objects that hide internal domain models
4. **Specify Errors** - Define explicit error types for contract failures
5. **Include Tenant Context** - All facade methods should accept or propagate tenant context
6. **Version Explicitly** - Include version information in facade contracts
7. **Plan Migration** - Document breaking changes and migration paths upfront

### Applying DDD to Multi-Tenant Systems

1. **Tenant as Context** - Treat tenant as a cross-cutting context, not a domain entity
2. **Aggregate Boundaries** - Design aggregates to respect tenant isolation naturally
3. **Repository Pattern** - Implement repositories that automatically scope queries by tenant
4. **Domain Events** - Include tenant context in all domain event payloads
5. **Invariant Protection** - Ensure domain invariants prevent cross-tenant data access

## Key Considerations

### Module Design
- Each module should have a single public facade
- Internal components remain encapsulated
- Cross-module communication happens only through facades

### Domain-Driven Design
- Bounded contexts align with modules
- Shared kernel contains tenant-aware base types
- Anti-corruption layers protect module boundaries

### Facade Patterns
- Facades expose only what other modules need
- Version facades when contracts evolve
- Document facade contracts explicitly

## SaaS-Specific Considerations

### Multi-Tenancy Architecture Patterns

**Shared Everything (RLS-based):**
- Single database, single schema, tenant column on tables
- Pros: Cost-efficient, simple deployment, easy cross-tenant queries
- Cons: Noisy neighbor risk, complex RLS policies, limited customization
- Best for: High-volume, low-margin tenants (Free/Pro tiers)

**Schema Per Tenant:**
- Single database, separate schema per tenant
- Pros: Better isolation, easier backup/restore per tenant
- Cons: Schema migration complexity, connection management
- Best for: Mid-tier tenants with moderate isolation needs

**Database Per Tenant:**
- Dedicated database instance per tenant
- Pros: Maximum isolation, tenant-specific tuning, compliance-friendly
- Cons: Operational complexity, higher cost, cross-tenant analytics harder
- Best for: Enterprise tenants with strict compliance requirements

### Tier-Based Architecture Decisions

| Tier | Isolation Model | Resource Allocation | Customization Level |
|------|----------------|--------------------|--------------------|
| Free | RLS (shared tables) | Shared pools, rate limited | None |
| Pro | RLS or Schema | Dedicated queues, higher limits | Configuration |
| Enterprise | Schema or Database | Reserved capacity, SLA-backed | Code-level custom |

### Scaling Considerations

- Design modules to scale independently when extracted to services
- Use tenant-aware caching strategies with proper invalidation
- Plan for tenant-specific rate limiting at the facade level
- Consider data partitioning strategies for high-volume tenants

### Event-Driven Architecture for Multi-Tenancy

- Include tenant_id in all event payloads as a first-class property
- Use tenant-partitioned topics for high-volume events
- Implement tenant-aware dead letter handling
- Design event schemas to support tenant-specific routing

## Outputs

| Deliverable | Format | Template |
|-------------|--------|----------|
| Master Architecture Document | Markdown | `master-architecture-template.md` |
| Module Architecture Document | Markdown | `module-architecture-template.md` |
| Facade Contract Specification | Markdown | `facade-contract-template.md` |
| Architecture Decision Records | Markdown | `adr-template.md` |

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| Team size under 20 developers | Start with modular monolith | Deployment simplicity outweighs scaling concerns during early growth |
| Bounded contexts still being discovered | Delay service extraction | Module boundaries are easier to refactor than service boundaries |
| Enterprise tier requires dedicated resources | Database-per-tenant isolation | Maximum isolation meets compliance requirements |
| High volume of small tenants | RLS-based shared database | Cost efficiency with acceptable noisy neighbor management |
| Cross-module queries needed frequently | Maintain as monolith longer | Extract only when communication overhead justifies complexity |
| Module has fundamentally different scaling needs | Consider extraction | Independent scaling may justify operational complexity |

## Related Workflows

- `create-master-architecture` - Create the frozen master architecture document
- `create-module-architecture` - Design individual module architectures
- `bmad-bam-module-boundary-design` - Define clear boundaries between modules

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Architecture patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `architecture-*`
- **Tenant isolation:** `{project-root}/_bmad/bam/data/tenant-models.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "modular monolith architecture patterns {date}"
- Search: "multi-tenant SaaS architecture best practices {date}"
- Search: "domain-driven design bounded contexts {date}"
