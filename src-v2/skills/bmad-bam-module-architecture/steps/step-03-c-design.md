# Step 3: Design Module Internals

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER design internals without completing Step 02 analysis first
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ✅ CRITICAL: Design ALL module layers (API, Service, Repository)
- 📋 Document internal domain model with tenant context integration
- 💬 Present internal design with A/P/C menu for user confirmation
- 🌐 Use web search to verify current module layering best practices

---

## EXECUTION PROTOCOLS

- 🎯 Design module internal architecture with clear layer boundaries
- 💾 Record design decisions in working document for Step 04
- 📖 Reference Step 02 responsibility analysis for entities and aggregates
- 📖 Reference `domains/integration.md` for tenant context propagation
- 🚫 DO NOT proceed without explicit user confirmation via A/P/C
- ⚠️ Flag designs that violate layer dependency rules
- 🔍 Use web search to verify module layering patterns against current best practices

---

## CONTEXT BOUNDARIES

This step operates within these boundaries:

- **Input context:** Responsibility analysis from Step 02 (entities, aggregates, facades)
- **Domain file:** `{project-root}/_bmad/bam/data/domains/integration.md`
- **Pattern file:** `{project-root}/_bmad/bam/data/patterns/facade.md`
- **Output:** Internal module architecture with layer design
- **Quality gate:** Design informs QG-M1 (Module Architecture) checklist

---

## YOUR TASK

Design the internal architecture of the module following clean architecture principles. Define the module layers (API, Service, Repository), internal domain model structure, tenant context integration points, and module-specific event design.

---

## Main Sequence

### 1. Design Module Layers

Define the layered architecture for the module:

```
┌─────────────────────────────────────────────────────────────┐
│                    {ModuleName} Module                       │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                   API Layer                            │  │
│  │  ┌───────────┐ ┌───────────┐ ┌───────────────────┐   │  │
│  │  │Controllers│ │  DTOs     │ │ Input Validation  │   │  │
│  │  └─────┬─────┘ └───────────┘ └───────────────────┘   │  │
│  └────────┼──────────────────────────────────────────────┘  │
│           │ TenantContext                                    │
│  ┌────────▼──────────────────────────────────────────────┐  │
│  │                  Service Layer                         │  │
│  │  ┌───────────┐ ┌───────────┐ ┌───────────────────┐   │  │
│  │  │ Services  │ │ Use Cases │ │ Domain Services   │   │  │
│  │  └─────┬─────┘ └───────────┘ └───────────────────┘   │  │
│  └────────┼──────────────────────────────────────────────┘  │
│           │ Aggregates                                       │
│  ┌────────▼──────────────────────────────────────────────┐  │
│  │                 Domain Layer                           │  │
│  │  ┌───────────┐ ┌───────────┐ ┌───────────────────┐   │  │
│  │  │ Entities  │ │Value Objs │ │ Domain Events     │   │  │
│  │  └───────────┘ └───────────┘ └───────────────────┘   │  │
│  └───────────────────────────────────────────────────────┘  │
│           │                                                  │
│  ┌────────▼──────────────────────────────────────────────┐  │
│  │               Repository Layer                         │  │
│  │  ┌───────────┐ ┌───────────┐ ┌───────────────────┐   │  │
│  │  │Repositories│ │ Queries  │ │ Tenant Filtering  │   │  │
│  │  └───────────┘ └───────────┘ └───────────────────┘   │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**Layer Responsibility Matrix:**

| Layer | Responsibility | Tenant Context | Dependencies |
|-------|----------------|----------------|--------------|
| API | Request handling, validation | Extracts from request | Service layer only |
| Service | Business logic, orchestration | Passes through | Domain + Repository |
| Domain | Business rules, invariants | Embedded in entities | None (pure) |
| Repository | Data access, persistence | Applies filtering | Database |

Search the web: "clean architecture module layers {date}"

---

### 2. Design Internal Domain Model

Define the domain model structure based on Step 02 analysis:

**Domain Model Template:**

```markdown
### Domain Model: {ModuleName}

#### Entities

| Entity | Attributes | Tenant Key | Invariants |
|--------|------------|------------|------------|
| {Entity1} | id, tenant_id, {attrs} | tenant_id | {rules} |
| {Entity2} | id, tenant_id, {attrs} | tenant_id | {rules} |

#### Value Objects

| Value Object | Attributes | Used By |
|--------------|------------|---------|
| {ValueObj1} | {attrs} | {Entity1} |
| {ValueObj2} | {attrs} | {Entity2} |

#### Domain Services

| Service | Purpose | Inputs | Outputs |
|---------|---------|--------|---------|
| {DomainService1} | {what it does} | {params} | {result} |

#### Aggregate Boundaries

| Aggregate | Root | Members | Invariants Enforced |
|-----------|------|---------|---------------------|
| {Agg1} | {Entity1} | {Child1, ValueObj1} | {rules} |
```

**Domain Model Diagram:**

```
┌─────────────────────────────────────────────────────────┐
│                  {AggregateName}                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │              {RootEntity}                          │  │
│  │  - id: UUID                                        │  │
│  │  - tenant_id: UUID  ← Tenant Isolation Key         │  │
│  │  - {attribute}: {type}                             │  │
│  │  + {method}(): {return}                            │  │
│  └───────────────────────┬───────────────────────────┘  │
│                          │                               │
│           ┌──────────────┼──────────────┐               │
│           ▼              ▼              ▼               │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│  │{ChildEntity}│ │{ValueObject}│ │{ValueObject}│       │
│  └─────────────┘ └─────────────┘ └─────────────┘       │
└─────────────────────────────────────────────────────────┘
```

Search the web: "DDD domain model design patterns {date}"

---

### 3. Design Tenant Context Integration

Define how tenant context flows through module layers:

**Tenant Context Flow:**

```
Request → API Layer → Service Layer → Repository Layer → Database
    │         │            │               │              │
    │    Extract ctx   Pass ctx       Apply filter    RLS/Schema
    │         │            │               │              │
    └─────────┴────────────┴───────────────┴──────────────┘
                    TenantContext Propagation
```

**Tenant Integration Points:**

| Layer | Integration Point | Implementation |
|-------|-------------------|----------------|
| API | Context extraction | Middleware extracts from JWT/header |
| Service | Context passing | All service methods accept TenantContext |
| Domain | Entity scoping | Entities contain tenant_id |
| Repository | Query filtering | All queries filter by tenant_id |

**Tenant Context Design Template:**

```markdown
### Tenant Context Integration

#### Context Extraction (API Layer)

```
{language}
// Middleware extracts tenant context
interface TenantContext {
  tenant_id: string;
  tier: 'free' | 'pro' | 'enterprise';
  permissions: string[];
}
```

#### Context Propagation (Service Layer)

All service methods signature pattern:
```
{operation}(ctx: TenantContext, params: Input): Result
```

#### Entity Scoping (Domain Layer)

All entities include tenant reference:
```
entity.tenant_id = ctx.tenant_id  // Set on create
```

#### Query Filtering (Repository Layer)

All queries include tenant filter:
```
WHERE tenant_id = ctx.tenant_id  // Applied automatically
```
```

Search the web: "tenant context propagation multi-tenant architecture {date}"

---

### 4. Plan Module-Specific Events

Define domain events published and consumed by this module:

**Events Published:**

| Event Name | Trigger | Payload | Tenant Context |
|------------|---------|---------|----------------|
| {ModuleName}{Action}Event | {when triggered} | {data included} | Included in envelope |
| {ModuleName}{Action}Event | {trigger} | {payload} | Included |

**Events Consumed:**

| Event Name | Source Module | Handler | Side Effects |
|------------|---------------|---------|--------------|
| {EventName} | {SourceModule} | {HandlerService} | {what happens} |

**Event Design Template:**

```markdown
### Event Design: {ModuleName}

#### Published Events

```
{ModuleName}CreatedEvent:
  tenant_id: string      # Always present
  entity_id: string
  created_at: timestamp
  {domain_data}: {type}

{ModuleName}UpdatedEvent:
  tenant_id: string
  entity_id: string
  updated_at: timestamp
  changes: {change_set}
```

#### Event Envelope Pattern

All events wrapped with tenant context:
```
EventEnvelope:
  event_id: UUID
  event_type: string
  tenant_id: string      # Isolation boundary
  timestamp: ISO8601
  payload: Event         # Domain event data
```

#### Consumed Events

| Event | Handler | Idempotency Key |
|-------|---------|-----------------|
| {EventName} | {Handler} | {event_id + tenant_id} |
```

Search the web: "domain events multi-tenant SaaS {date}"

---

## COLLABORATION MENUS (A/P/C)

After presenting complete internal design:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific layer design questions
- **P (Party Mode)**: Bring architect, security, and performance perspectives
- **C (Continue)**: Accept design and proceed to contract step

Select an option:
```

### If 'A' (Advanced Elicitation)

Invoke `bmad-advanced-elicitation` skill to explore:

- **Layer boundaries:** Are layer responsibilities clearly separated?
- **Domain purity:** Is the domain layer free of infrastructure concerns?
- **Tenant context:** Does context flow correctly through all layers?
- **Event design:** Are events properly scoped to tenant boundaries?
- **Performance:** Are there potential bottlenecks in the design?

Pass context: Step 02 analysis, current layer design, specific concerns.

**After processing enhanced insights, return to A/P/C menu.**

### If 'P' (Party Mode)

Invoke `bmad-party-mode` skill with context:

```
Review internal module design for {module_name}
with layers: API, Service, Domain, Repository
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| Architect | Structural soundness | Do layers follow dependency rules? |
| Security | Tenant isolation | Is tenant context enforced at every layer? |
| Performance | Efficiency | Are there unnecessary layers or overhead? |
| Developer | Maintainability | Is the design easy to understand and modify? |

Process multi-perspective analysis and synthesize into refined design.

**After processing perspectives, return to A/P/C menu.**

### If 'C' (Continue)

1. Record the internal design in working document:

```yaml
# Add to module-design.md
module_name: {name}
layers:
  api:
    controllers: [{list}]
    dtos: [{list}]
  service:
    services: [{list}]
    use_cases: [{list}]
  domain:
    entities: [{list}]
    value_objects: [{list}]
    domain_services: [{list}]
  repository:
    repositories: [{list}]
tenant_integration:
  extraction: middleware
  propagation: context_param
  filtering: query_decorator
events:
  publishes: [{event_list}]
  consumes: [{event_list}]
design_completed_at: {timestamp}
```

2. Update workflow state:

```yaml
stepsCompleted:
  - step-01-c-start
  - step-02-c-analyze
  - step-03-c-design  # Add this
currentStep: step-04-c-document
```

3. Proceed to NEXT STEP.

---

## SUCCESS METRICS

- ✅ All module layers designed (API, Service, Domain, Repository)
- ✅ Internal domain model defined with entities and value objects
- ✅ Tenant context integration designed for all layers
- ✅ Module events planned (published and consumed)
- ✅ Layer dependency rules followed (no upward dependencies)
- ✅ Web search performed for architecture patterns
- ✅ Step 02 analysis referenced in design
- ✅ User confirmed design via A/P/C menu
- ✅ Design recorded in working document

---

## FAILURE MODES

- ❌ Skipping layers - incomplete architecture
- ❌ Designing without Step 02 context - design not grounded in analysis
- ❌ Missing tenant context - isolation broken at layer boundaries
- ❌ Domain layer with dependencies - violates clean architecture
- ❌ Events without tenant_id - cross-tenant event leaks possible
- ❌ Proceeding without A/P/C confirmation - user not engaged in decisions
- ❌ Skipping web search - may miss current architecture best practices

---

## NEXT STEP

After user confirms internal design with 'C':

1. Record the design in working document
2. Proceed to `step-04-c-document.md` to design module contracts
3. The internal design informs:
   - Public facade API design
   - Required dependency contracts
   - Event contract specifications
   - Testing strategy

**Transition to Step 04 with:**
- Layers: `{api, service, domain, repository}`
- Domain model: `{entities, value_objects, aggregates}`
- Tenant integration: `{extraction, propagation, filtering}`
- Events: `{publishes: [...], consumes: [...]}`
