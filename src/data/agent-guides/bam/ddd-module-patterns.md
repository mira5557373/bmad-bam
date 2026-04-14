# DDD Module Patterns

**When to load:** When designing bounded contexts, defining module boundaries using Domain-Driven Design, or when user mentions aggregates, domain events, or ubiquitous language.

**Integrates with:** Architect (Atlas persona), Dev agent, Analyst agent

---

## Core Concepts

### What is DDD for Modules?

Domain-Driven Design (DDD) provides strategic patterns for defining module boundaries in a modular monolith. Each module represents a bounded context with its own ubiquitous language, domain model, and clear interfaces to other modules.

### DDD Strategic Patterns

| Pattern | Description | Multi-Tenant Consideration |
|---------|-------------|---------------------------|
| Bounded Context | Logical boundary | May span multiple tenants |
| Ubiquitous Language | Shared vocabulary | Per-context, tenant-agnostic |
| Context Map | Inter-context relationships | Cross-module contracts |
| Anti-Corruption Layer | Translation boundary | Tenant context handling |

### Context Map Visualization

```
┌─────────────────────────────────────────────────────────────┐
│                     Context Map                             │
│                                                             │
│  ┌─────────────┐    Partnership    ┌─────────────┐         │
│  │   Billing   │◄─────────────────►│   Usage     │         │
│  │   Context   │                   │   Context   │         │
│  └──────┬──────┘                   └──────┬──────┘         │
│         │                                 │                 │
│         │ Customer-Supplier               │ Conformist      │
│         │                                 │                 │
│         ▼                                 ▼                 │
│  ┌─────────────┐                   ┌─────────────┐         │
│  │   Tenant    │                   │   External  │         │
│  │   Context   │                   │   Analytics │         │
│  └─────────────┘                   │     (ACL)   │         │
│                                    └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Patterns

### Pattern 1: Aggregate Design

| Principle | Description | Example |
|-----------|-------------|---------|
| Single aggregate root | One entry point | `Tenant` aggregate |
| Transactional boundary | ACID within aggregate | Tenant + settings |
| Reference by ID | Cross-aggregate | `tenant_id` reference |
| Invariant enforcement | Business rules | Quota limits |

### Aggregate Design Guidelines

| Guideline | Good Practice | Anti-Pattern |
|-----------|---------------|--------------|
| Size | Small, focused | Large, many entities |
| References | By ID only | Direct object references |
| Transactions | Within one aggregate | Spanning aggregates |
| Events | Published on state change | Internal state only |

### Pattern 2: Domain Events

| Event Type | Scope | Tenant Handling |
|------------|-------|-----------------|
| Internal | Within module | Implicit tenant |
| Integration | Cross-module | Explicit tenant in payload |
| External | Outside system | Tenant context in headers |

### Domain Event Design

| Event Field | Required | Purpose |
|-------------|----------|---------|
| event_id | Yes | Idempotency |
| event_type | Yes | Routing |
| occurred_at | Yes | Ordering, audit |
| aggregate_id | Yes | Source tracking |
| tenant_id | Yes (integration) | Isolation |
| payload | Yes | Event data |

### Pattern 3: Context Mapping Relationships

| Relationship | Description | Use Case |
|--------------|-------------|----------|
| Partnership | Mutual dependency | Billing <-> Usage |
| Customer-Supplier | One-way dependency | Tenant → Agents |
| Conformist | Accept upstream model | Third-party integration |
| ACL | Translate models | Legacy integration |

### Relationship Implementation

| Relationship | Communication | Contract Owner |
|--------------|---------------|----------------|
| Partnership | Bidirectional events | Joint ownership |
| Customer-Supplier | Facade calls | Supplier |
| Conformist | Adapt to external | External party |
| ACL | Translation layer | Consumer |

---

## Decision Criteria

### Identifying Bounded Contexts

| Signal | New Context | Same Context |
|--------|-------------|--------------|
| Different domain experts | Yes | No |
| Different ubiquitous language | Yes | No |
| Different lifecycle | Yes | No |
| Separate team ownership | Yes | No |
| Independent deployment need | Yes | No |

### Aggregate Boundary Decisions

| Factor | Smaller Aggregate | Larger Aggregate |
|--------|-------------------|------------------|
| Consistency needs | Eventual | Strong |
| Concurrent updates | High | Low |
| Transaction complexity | Simple | Complex |
| Performance | Better | Trade-off |

---

## Application Guidelines

- Defining module boundaries in a modular monolith
- Designing domain models for SaaS features
- Establishing cross-module communication patterns
- Migrating from monolith to microservices
- Creating module interfaces (facades)

---

## Module Boundary Checklist

- [ ] Clear ubiquitous language defined
- [ ] Aggregate roots identified
- [ ] Domain events documented
- [ ] Facade contract established
- [ ] Context map relationships defined
- [ ] Tenant context flow specified

---

## DDD + Multi-Tenant Intersection

| DDD Concept | Tenant Implication |
|-------------|-------------------|
| Entity identity | Include tenant_id in composite ID |
| Value object | Tenant-agnostic (no tenant_id) |
| Repository | Tenant-scoped queries |
| Domain service | Tenant context parameter |
| Factory | Inject tenant on creation |

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Anemic domain model | Logic in services, not entities | Move behavior to entities |
| CRUD-driven design | No domain concepts | Model real business processes |
| Shared kernel abuse | Tight coupling | Minimize shared kernel |
| Missing context map | Implicit dependencies | Document all relationships |
| Aggregate spanning tenants | Isolation violation | Tenant_id in aggregate root |
| Synchronous context calls | Tight coupling | Use integration events |

### DDD Implementation Checklist

- [ ] Domain experts involved in modeling
- [ ] Ubiquitous language documented in glossary
- [ ] Aggregate invariants explicitly coded
- [ ] Events published for all state changes
- [ ] Context boundaries enforced by module structure
- [ ] ACL implemented for external integrations

---

## Integration with BAM Patterns

| Pattern | Integration Point | Purpose |
|---------|-------------------|---------|
| Module Architecture | Bounded context = module | Alignment |
| Module Facade | Context interface | Contract definition |
| Event-Driven | Integration events | Cross-context communication |
| Context Propagation | Tenant in events | Multi-tenant isolation |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Should each module be a separate bounded context? | Yes, align module boundaries with bounded contexts | Ensures clear ownership, ubiquitous language, and minimizes cross-module coupling in multi-tenant systems |
| How should tenant context flow across bounded contexts? | Include tenant_id explicitly in integration events and use context propagation middleware | Prevents cross-tenant data leakage and enables consistent isolation across module boundaries |
| When should I use an Anti-Corruption Layer (ACL)? | When integrating with external systems or legacy modules that don't follow your domain model | Protects your domain model purity and provides translation layer for tenant context handling |
| Should aggregates span multiple tenants? | Never - each aggregate root should include tenant_id as part of its identity | Maintains strict tenant isolation and simplifies RLS policy implementation at the data layer |
| How should I handle cross-module transactions? | Use saga pattern with tenant-scoped compensation actions | ACID transactions cannot span modules; sagas provide eventual consistency while preserving tenant isolation |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Module patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `module-boundaries`, `event-driven`, `facade-contracts`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "DDD bounded context modular monolith {date}"
- Search: "domain events multi-tenant {date}"
- Search: "aggregate design patterns {date}"
- Search: "context mapping strategic patterns {date}"

## Related Workflows

- `bmad-bam-create-module-architecture` - Design module boundaries using DDD strategic patterns
- `bmad-bam-define-facade-contract` - Define bounded context interfaces as facade contracts
- `bmad-bam-convergence-verification` - Verify context map relationships between modules
- `bmad-bam-create-master-architecture` - Establish domain boundaries at platform level
- `bmad-bam-tenant-model-isolation` - Include tenant_id in aggregate root identities
