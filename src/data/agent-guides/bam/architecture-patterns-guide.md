# BAM Architecture Patterns Guide

**When to load:** During foundation design, master architecture creation, module boundary definition, infrastructure planning, or when implementing CQRS, event-driven patterns, saga orchestration, or multi-tenant isolation at platform level.

**Integrates with:** Winston (Architect) with Atlas persona for platform architecture, Kai persona for integration patterns, DevOps agents for infrastructure decisions.

---

## Core Concepts

### Multi-Tenant Architecture Principles

Multi-tenant architecture requires careful consideration of isolation, scalability, and maintainability across all platform layers. Every architectural decision must account for tenant boundaries.

| Principle | Description | Impact |
|-----------|-------------|--------|
| Tenant Isolation | Every data store, cache, and process enforces tenant boundaries | Security, compliance |
| Design for Scale | Architecture for tenant #1 must work for tenant #1000 | Scalability |
| Module Extraction | Every module should be extractable to a microservice | Flexibility |
| Foundation First | Master architecture frozen before module implementation | Consistency |

### Tenant Model Hierarchy

```
Organization (Billing Entity)
├── Workspace (Collaboration Boundary)
│   ├── User (Individual Access)
│   │   └── API Key (Programmatic Access)
│   └── User
└── Workspace
```

### Isolation Strategy Selection

| Strategy | Use Case | Isolation Level | Complexity |
|----------|----------|-----------------|------------|
| Row-Level Security (RLS) | Most SaaS, <1000 tenants | Shared tables, filtered queries | Low |
| Schema-Per-Tenant | Regulated industries | Separate schemas, same DB | Medium |
| Database-Per-Tenant | Enterprise tier | Maximum isolation | High |

---

## BAM Conventions

> **CRITICAL:** BAM multi-tenant architecture conventions that must be followed

| Convention | Requirement | Rationale |
|------------|-------------|-----------|
| TenantContext First | All facade methods take TenantContext as first parameter | Consistent isolation enforcement |
| No Cross-Module DB Access | Modules communicate only via facades, never direct DB queries | Enables future extraction |
| Shared Kernel = No Business Logic | Shared code contains only infrastructure (DTOs, context, utilities) | Prevents coupling |
| Event Envelope Standard | All events include tenant_id, correlation_id, occurred_at | Async isolation |
| Foundation Gate | Master architecture frozen before module implementation (QG-F1) | Architectural consistency |

---

## Decision Framework

### Architecture Pattern Selection

| Situation | Pattern | Rationale |
|-----------|---------|-----------|
| New SaaS platform | Modular Monolith + RLS | Balance isolation with cost efficiency |
| Team size <50 | Modular Monolith | Simpler deployment and debugging |
| Unknown scale requirements | Modular Monolith with extraction plan | Defer distribution complexity |
| Enterprise compliance tenant | Database-per-tenant option | Maximum isolation for premium tier |
| Cross-module state changes | Saga Orchestration | Reliable distributed transactions |
| High read/write ratio | CQRS | Optimize reads separately |
| Async workflows | Event-Driven + Outbox | Reliable decoupled communication |

### Infrastructure Pattern Selection

| Workload Type | Infrastructure | Key Considerations |
|---------------|----------------|-------------------|
| Variable serverless | AWS Lambda/Functions | Cold start mitigation, per-tenant concurrency |
| Consistent container | Kubernetes | Namespace isolation, resource quotas |
| Mixed workloads | Hybrid | Serverless for burst, K8s for baseline |

---

## §platform-architecture

### Pattern: Platform Architecture Foundation

Platform architecture establishes the foundational decisions that all modules inherit. Changes after foundation gate require ADR and emergency change protocol.

#### Master Architecture Components

| Component | Contents | Tenant Impact |
|-----------|----------|---------------|
| Tenant Model | Hierarchy, billing entity, workspace model | Defines isolation boundaries |
| Isolation Strategy | RLS, schema, or database per tenant | Security posture |
| Module Structure | Standard directory layout, facade pattern | Consistency |
| Shared Kernel | TenantContext, common DTOs, utilities | Cross-module dependencies |
| Control Plane | Admin APIs, no tenant context | Platform operations |

#### Module Structure Standard

```
/src/modules/{module-name}/
├── api/              # HTTP handlers
├── domain/           # Business logic, entities
├── facade/           # Public interface for other modules
├── infrastructure/   # Database, external services
├── events/           # Published and consumed events
└── README.md         # Module documentation
```

#### Forbidden Dependencies

| Violation | Why Forbidden | Alternative |
|-----------|---------------|-------------|
| Direct cross-module DB access | Hidden coupling, breaks extraction | Use facade methods |
| Importing domain entities across modules | Tight coupling | Define DTOs in facade |
| Calling internal services directly | Bypasses contracts | Call via facade |
| Tenant ID in URL path | Security risk | Use headers/JWT |
| Tenant-specific code paths | Maintenance nightmare | Use configuration |

---

## §modular-monolith

### Pattern: Modular Monolith Architecture

A modular monolith is a single deployable unit organized into well-defined modules with clear boundaries, explicit interfaces, and minimal coupling. It provides microservices-like modularity without distributed system complexity.

#### Modular Monolith vs Alternatives

| Aspect | Traditional Monolith | Modular Monolith | Microservices |
|--------|---------------------|------------------|---------------|
| Deployment | Single | Single | Multiple |
| Module coupling | High | Low | Very low |
| Data sharing | Shared DB, any table | Shared DB, owned tables | Separate DBs |
| Communication | Direct calls | Facade interfaces | Network calls |
| Complexity | Low | Medium | High |

#### Architecture Diagram

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

#### Module Extraction Readiness

| Indicator | Ready to Extract | Not Ready |
|-----------|------------------|-----------|
| Team ownership | Dedicated team | Shared ownership |
| Deployment cadence | Different from others | Same as others |
| Scale requirements | Different from others | Same as others |
| Data isolation | Already schema-separated | Shared tables |

---

## §module-boundaries

### Pattern: Module Boundary Design

Module boundaries define the separation of concerns within a modular monolith. Each module represents a bounded context with clear interfaces.

#### Boundary Strategy Comparison

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Vertical Slice | Feature-complete modules | Product teams |
| Feature Module | Grouped by feature | Feature teams |
| Domain Module | DDD bounded contexts | Domain complexity |

#### Dependency Rules

| Rule | Description | Enforcement |
|------|-------------|-------------|
| No cycles | Acyclic dependencies | Build tooling |
| Direction | Higher to lower only | Architecture tests |
| Interface only | No internal access | Compile-time |
| Event over call | Prefer async | Code review |

#### Dependency Layers

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

#### Shared Kernel Contents

| Category | Contents | Multi-Tenant Aspect |
|----------|----------|---------------------|
| Tenant Context | Tenant ID, tier, config | Required in all modules |
| Domain Types | Common value objects | Tenant-scoped variants |
| Cross-Cutting | Auth, logging, audit | Tenant-aware implementation |
| Events | Domain events, integration events | Tenant context in payload |

---

## §facade-contracts

### Pattern: Facade Contract Design

Facade contracts define the public interface of a module, establishing the stable API surface that other modules depend on.

#### Contract Types

| Type | Transport | Use Case | Schema |
|------|-----------|----------|--------|
| REST | HTTP/JSON | External APIs | OpenAPI 3.x |
| GraphQL | HTTP/GraphQL | Flexible queries | SDL |
| gRPC | HTTP/2+Protobuf | Internal services | Proto3 |
| Event | Message broker | Async integration | AsyncAPI |

#### Facade Responsibilities

| Responsibility | Implementation |
|----------------|----------------|
| Request validation | Schema validation at boundary |
| Authentication | Token/API key verification |
| Tenant context | Extract and propagate tenant_id |
| Rate limiting | Per-tenant request throttling |
| Response mapping | Internal to external DTO |

#### API Versioning Strategy Selection

| Strategy | Visibility | Caching | Recommended |
|----------|------------|---------|-------------|
| URL path | High | Easy | External APIs |
| Header | Low | Complex | Internal services |
| Query param | Medium | Moderate | Legacy compat |

#### Breaking Change Management

| Change Type | Breaking? | Mitigation |
|-------------|-----------|------------|
| Add optional field | No | None needed |
| Add required field | Yes | Default value or new version |
| Remove field | Yes | Deprecate first, then remove |
| Rename field | Yes | Alias support or new version |
| Change field type | Yes | New version required |

---

## §cqrs

### Pattern: CQRS Implementation

Command Query Responsibility Segregation separates read and write operations, enabling tenant-specific optimizations for each.

#### CQRS Architecture

```
┌─────────────────────────────────────────────────┐
│              CQRS Architecture                   │
│  ┌──────────────────┐  ┌──────────────────┐    │
│  │   Command Side   │  │   Query Side     │    │
│  │  ┌────────────┐  │  │  ┌────────────┐  │    │
│  │  │ Commands   │  │  │  │ Queries    │  │    │
│  │  │ (+ tenant) │  │  │  │ (+ tenant) │  │    │
│  │  └─────┬──────┘  │  │  └─────┬──────┘  │    │
│  │        ▼         │  │        ▼         │    │
│  │  ┌────────────┐  │  │  ┌────────────┐  │    │
│  │  │ Write DB   │──┼──┼─►│ Read Model │  │    │
│  │  │ (tenant    │  │  │  │ (tenant    │  │    │
│  │  │  scoped)   │  │  │  │  scoped)   │  │    │
│  │  └────────────┘  │  │  └────────────┘  │    │
│  └──────────────────┘  └──────────────────┘    │
└─────────────────────────────────────────────────┘
```

#### Query Optimization by Tier

| Tier | Read Model | Caching | Freshness |
|------|------------|---------|-----------|
| Free | Shared, filtered | Aggressive | 5 min |
| Pro | Dedicated tables | Moderate | 1 min |
| Enterprise | Custom models | Minimal | Real-time |

#### Synchronization Strategies

| Pattern | Latency | Complexity | Reliability |
|---------|---------|------------|-------------|
| Direct event handler | Milliseconds | Low | Medium |
| Message queue | Seconds | Medium | High |
| Event store | Milliseconds | High | Very high |
| Change Data Capture | Seconds | Medium | High |

---

## §event-driven

### Pattern: Event-Driven Architecture

Event-driven architecture enables loose coupling between modules through asynchronous event publishing and consumption.

#### Event Types

| Type | Scope | Purpose | Tenant Context |
|------|-------|---------|----------------|
| Domain event | Within module | State changes | Implicit |
| Integration event | Cross-module | Module coordination | Explicit in payload |
| System event | Platform-wide | Operational signals | Platform-level |

#### Event Envelope Standard

| Field | Description | Required |
|-------|-------------|----------|
| event_id | Unique identifier | Yes |
| event_type | Event classification | Yes |
| tenant_id | Tenant context | Yes |
| occurred_at | ISO timestamp | Yes |
| correlation_id | Request tracing | Yes |
| payload | Event-specific data | Yes |
| version | Schema version | Yes |

#### Event Routing Strategies

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Topic per type | `events.tenant.created` | High throughput |
| Topic per tenant | `events.tenant_abc` | Isolation |
| Fanout | Broadcast to all | System events |
| Content-based | Route by payload | Complex routing |

#### Outbox Pattern

| Step | Description | Failure Handling |
|------|-------------|------------------|
| 1 | Write to outbox table | Same transaction as state |
| 2 | Relay reads outbox | Polling or CDC |
| 3 | Publish to broker | Retry on failure |
| 4 | Mark as published | Idempotent operation |

---

## §saga-orchestration

### Pattern: Saga Orchestration

Saga orchestration manages long-running business transactions that span multiple modules or services using compensating actions for rollback.

#### Orchestration vs Choreography

| Factor | Orchestration | Choreography |
|--------|---------------|--------------|
| Visibility | Central view | Distributed |
| Coupling | To orchestrator | Event contracts |
| Adding steps | Modify orchestrator | Add listener |
| Debugging | Easier | Harder |
| Single point of failure | Orchestrator | None |

#### Saga State Machine

| State | Description | Transitions |
|-------|-------------|-------------|
| PENDING | Saga started | RUNNING |
| RUNNING | Executing steps | COMPLETED, COMPENSATING |
| COMPENSATING | Rolling back | ROLLED_BACK, FAILED |
| COMPLETED | All steps done | Terminal |
| ROLLED_BACK | Compensation done | Terminal |
| FAILED | Cannot proceed | Terminal |

#### Common Saga: Tenant Onboarding

| Step | Action | Compensation | Timeout |
|------|--------|--------------|---------|
| 1 | Create tenant record | Delete tenant record | 5s |
| 2 | Provision database schema | Drop schema | 30s |
| 3 | Create storage bucket | Delete bucket | 10s |
| 4 | Initialize default config | N/A (no side effect) | 5s |
| 5 | Create admin user | Delete user | 5s |
| 6 | Send welcome email | N/A (informational) | 10s |

---

## §infrastructure

### Pattern: Multi-Tenant Infrastructure

Infrastructure patterns for implementing tenant isolation on Kubernetes and serverless platforms.

#### Kubernetes Namespace Isolation

| Pattern | Example | Use Case |
|---------|---------|----------|
| Tenant-based | `tenant-{tenant_id}` | Simple tenant isolation |
| Environment-scoped | `tenant-{tenant_id}-{env}` | Multi-environment per tenant |
| Module-scoped | `tenant-{tenant_id}-{module}` | Microservice isolation |

#### Kubernetes Resource Quotas by Tier

| Resource | FREE Tier | PRO Tier | ENTERPRISE Tier |
|----------|-----------|----------|-----------------|
| CPU Requests | 2 cores | 8 cores | 32+ cores |
| Memory Requests | 4Gi | 16Gi | 64Gi+ |
| Pods | 20 | 100 | 500+ |
| PVCs | 5 | 20 | 100+ |

#### Serverless Tenancy Models

| Model | Description | Isolation Level | Cost Efficiency |
|-------|-------------|-----------------|-----------------|
| Shared function | All tenants use same function | Low | Highest |
| Function per tenant | Dedicated function per tenant | High | Low |
| Account per tenant | Separate cloud account | Maximum | Lowest |
| Hybrid | Shared by default, dedicated for enterprise | Medium-High | Medium |

#### Cold Start Mitigation by Tier

| Tier | Acceptable Latency | Mitigation |
|------|-------------------|------------|
| Free | < 5s | Shared warming |
| Pro | < 1s | Provisioned concurrency |
| Enterprise | < 200ms | Dedicated provisioning |

#### Context Propagation Methods

| Layer | Mechanism | Implementation |
|-------|-----------|----------------|
| HTTP | Headers | `X-Tenant-ID`, `X-Request-ID` |
| gRPC | Metadata | `tenant_id` key |
| Database | Session variable | `SET app.tenant_id` |
| Cache | Key prefix | `{tenant_id}:cache_key` |
| Queue | Message headers | Envelope field |

---

## Quality Gates

| Gate | Focus | Key Checks |
|------|-------|------------|
| QG-F1 | Foundation | Master arch + tenant model + shared kernel frozen |
| QG-M1 | Module Architecture | Bounded context + facade + events defined |
| QG-M2 | Tenant Isolation | RLS + context propagation + cache isolation |
| QG-M3 | Module Readiness | Tests + docs + dependencies verified |
| QG-I1 | Convergence | Facade compatibility across modules |

### Foundation Gate Checklist (QG-F1)

- [ ] Tenant model documented with hierarchy
- [ ] Isolation strategy selected and justified
- [ ] Module boundaries identified
- [ ] Shared kernel defined (no business logic)
- [ ] Control plane vs tenant plane separated
- [ ] Database schema with tenant_id columns
- [ ] Middleware for tenant context extraction

---

## Web Research

| Topic | Query |
|-------|-------|
| Multi-tenant platform architecture | "multi-tenant platform architecture patterns {date}" |
| Modular monolith patterns | "modular monolith architecture best practices {date}" |
| CQRS multi-tenant | "CQRS multi-tenant implementation {date}" |
| Event-driven SaaS | "event-driven architecture multi-tenant SaaS {date}" |
| Saga patterns | "saga orchestration patterns distributed transactions {date}" |
| Kubernetes multi-tenancy | "Kubernetes multi-tenant isolation patterns {date}" |
| Serverless multi-tenant | "serverless multi-tenant isolation AWS Lambda {date}" |
| Module boundaries | "bounded context design DDD patterns {date}" |

---

## Related Patterns

> **Note:** Use the `web_queries` column from pattern registry CSVs for current best practices searches.

- `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter: `platform-*`, `module-*`, `cqrs-*`, `event-driven`
- `{project-root}/_bmad/bam/data/tenant-models.csv` - Tenant isolation patterns
- `{project-root}/_bmad/bam/data/quality-gates.csv` - Gate requirements

---

## Related Workflows

- `create-master-architecture` - Create frozen master architecture document
- `bmad-bam-module-boundary-design` - Define clear boundaries between modules
- `define-facade-contract` - Design stable cross-module interfaces
- `bmad-bam-tenant-model-isolation` - Select and implement tenant isolation strategy
- `bmad-bam-event-streaming-design` - Design event-driven workflows
- `validate-foundation` - Validate foundation against QG-F1
- `validate-module` - Validate module against QG-M1/M2/M3
- `bmad-bam-convergence-verification` - Verify module integration

---

## Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | {date} | Initial consolidated guide from 23 source files |
