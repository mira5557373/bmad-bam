# Modular Monolith Patterns

**When to load:** When designing modular architecture, defining module boundaries, or when user mentions modular monolith, vertical slices, or avoiding microservices prematurely.

**Integrates with:** Architect (Atlas persona), Dev agent, PM agent

---

## Core Concepts

### What is a Modular Monolith?

A modular monolith is a single deployable unit organized into well-defined modules with clear boundaries, explicit interfaces, and minimal coupling. It provides microservices-like modularity without distributed system complexity.

### Modular Monolith vs Alternatives

| Aspect | Traditional Monolith | Modular Monolith | Microservices |
|--------|---------------------|------------------|---------------|
| Deployment | Single | Single | Multiple |
| Module coupling | High | Low | Very low |
| Data sharing | Shared DB, any table | Shared DB, owned tables | Separate DBs |
| Communication | Direct calls | Facade interfaces | Network calls |
| Complexity | Low | Medium | High |

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Modular Monolith                         │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐     │
│  │   Module A    │ │   Module B    │ │   Module C    │     │
│  │  ┌─────────┐  │ │  ┌─────────┐  │ │  ┌─────────┐  │     │
│  │  │ Facade  │◄─┼─┼──│ Facade  │◄─┼─┼──│ Facade  │  │     │
│  │  └────┬────┘  │ │  └────┬────┘  │ │  └────┬────┘  │     │
│  │  ┌────▼────┐  │ │  ┌────▼────┐  │ │  ┌────▼────┐  │     │
│  │  │ Domain  │  │ │  │ Domain  │  │ │  │ Domain  │  │     │
│  │  └────┬────┘  │ │  └────┬────┘  │ │  └────┬────┘  │     │
│  │  ┌────▼────┐  │ │  ┌────▼────┐  │ │  ┌────▼────┐  │     │
│  │  │  Infra  │  │ │  │  Infra  │  │ │  │  Infra  │  │     │
│  │  └─────────┘  │ │  └─────────┘  │ │  └─────────┘  │     │
│  └───────────────┘ └───────────────┘ └───────────────┘     │
│                         │                                   │
│                   ┌─────▼─────┐                             │
│                   │ Shared DB │                             │
│                   │ (owned    │                             │
│                   │  tables)  │                             │
│                   └───────────┘                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Patterns

### Pattern 1: Module Structure

| Component | Purpose | Visibility |
|-----------|---------|------------|
| Facade | Public API | Exported |
| Domain | Business logic | Internal |
| Infrastructure | Persistence, external | Internal |
| Events | Integration events | Exported types |

### Pattern 2: Module Communication

| Pattern | When to Use | Coupling Level |
|---------|-------------|----------------|
| Direct facade call | Synchronous, same process | Tight |
| In-process event | Async, decoupled | Loose |
| Outbox + queue | Reliable delivery | Very loose |

### Communication Pattern Selection

| Scenario | Recommended Pattern | Rationale |
|----------|---------------------|-----------|
| Query data from another module | Facade call | Immediate response needed |
| Notify about state change | In-process event | Loose coupling |
| Trigger workflow across modules | Outbox + queue | Reliability required |
| Batch data sync | Event + eventual consistency | Performance |

### Pattern 3: Database Ownership

| Strategy | Description | Isolation |
|----------|-------------|-----------|
| Shared schema | Tables prefixed by module | Low |
| Separate schema | Schema per module | Medium |
| Logical ownership | Convention-based | Depends |

### Database Strategy by Module Type

| Module Type | Recommended Strategy | Reasoning |
|-------------|---------------------|-----------|
| Core domain | Separate schema | Maximum isolation |
| Supporting | Shared schema with prefix | Balance |
| Generic | Shared schema | Simple |
| Future microservice | Separate schema | Easy extraction |

---

## Decision Criteria

### When to Choose Modular Monolith

| Factor | Favors Modular Monolith | Favors Microservices |
|--------|-------------------------|----------------------|
| Team size | 5-50 developers | 50+ with autonomous teams |
| Domain clarity | Still discovering | Well-understood |
| Scale requirements | Unknown or moderate | Known high scale |
| Deployment frequency | Weekly-daily | Multiple per day per service |
| Operational maturity | Growing | Mature DevOps |

### Module Extraction Readiness

| Indicator | Ready to Extract | Not Ready |
|-----------|------------------|-----------|
| Team ownership | Dedicated team | Shared ownership |
| Deployment cadence | Different from others | Same as others |
| Scale requirements | Different from others | Same as others |
| External dependencies | Unique integrations | Shared integrations |
| Data isolation | Already schema-separated | Shared tables |

---

## Application Guidelines

- Starting a new SaaS platform
- Refactoring legacy monolith
- Team size 5-50 developers
- Unknown future scale requirements
- Need deployment simplicity

---

## Module Boundary Checklist

- [ ] Single responsibility (one bounded context)
- [ ] Clear facade contract
- [ ] No direct database access from other modules
- [ ] Events for cross-module notification
- [ ] Independent testability
- [ ] Documented dependencies

---

## Multi-Tenant Module Considerations

| Aspect | Implementation |
|--------|----------------|
| Tenant context | Passed via facade parameter |
| Data isolation | RLS or schema within module |
| Tenant events | Include tenant_id in payload |
| Cross-module queries | Join via facade, not SQL |

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Distributed monolith | Tight coupling with network overhead | True modular boundaries first |
| Shared database abuse | Modules query each other's tables | Strict table ownership |
| God module | One module does everything | Split by bounded context |
| Premature extraction | Microservices without need | Start modular, extract later |
| Circular dependencies | Module A needs B needs A | Introduce third module or events |
| Synchronous everything | Tight coupling, cascade failures | Use events for non-critical paths |

### Architecture Evolution Path

```
Traditional Monolith
    │
    ├── Identify bounded contexts
    │
    └── Modular Monolith
            │
            ├── Stabilize module boundaries
            │
            └── Extract to Microservices (when needed)
                    │
                    └── Only for modules with:
                        - Independent scaling needs
                        - Different deployment cadence
                        - Dedicated team ownership
```

---

## Integration with BAM Patterns

| Pattern | Integration Point | Purpose |
|---------|-------------------|---------|
| DDD Module Patterns | Bounded context alignment | Domain-driven boundaries |
| Module Facade | Cross-module interface | Stable contracts |
| Event-Driven | Module decoupling | Async communication |
| Context Propagation | Tenant flow | Multi-tenant support |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Module patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `module-boundaries`
- **Related guides:** `ddd-module-patterns`, `module-facade-patterns`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "modular monolith architecture {date}"
- Search: "modular monolith vs microservices {date}"
- Search: "module boundaries design patterns {date}"
- Search: "modular monolith to microservices migration {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|---------------|-----------|
| When to choose modular monolith vs microservices? | Modular monolith when team size <50, domain boundaries unclear, or operational maturity growing | Simpler deployment and debugging; defer distribution complexity until truly needed |
| How to structure database ownership between modules? | Separate schema per module for future microservice candidates; shared schema with prefix for supporting modules | Enables clean extraction; balances isolation with simplicity |
| When is a module ready for microservice extraction? | Dedicated team, different deployment cadence, unique scaling needs, and already schema-separated | All indicators must align; premature extraction adds complexity without benefit |
| How to communicate between modules? | Direct facade call for queries; in-process events for notifications; outbox pattern for reliability | Match coupling level to use case; reliability needs dictate async patterns |
| How to handle circular module dependencies? | Extract shared concept to third module or refactor to event-based communication | Circular deps indicate missing abstraction or incorrect boundary placement |

## Related Workflows

- `create-master-architecture` - Design overall modular monolith structure
- `create-module-architecture` - Define individual module boundaries and structure
- `define-facade-contract` - Design stable cross-module interfaces
- `bmad-bam-convergence-verification` - Verify module integration and dependencies
- `validate-foundation` - Validate modular architecture foundation
