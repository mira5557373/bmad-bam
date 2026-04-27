# Step 03: Define Module Boundaries

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER define boundaries without referencing tenant model from Step 02
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ CRITICAL: Ensure all modules have clear ownership and facade contracts
- 📋 Document module responsibilities, dependencies, and tenant context flow
- 💬 Present module map for user confirmation before proceeding
- 🌐 Use web search to verify current modular monolith best practices

---

## EXECUTION PROTOCOLS

- 🎯 Present module map with clear boundaries before taking any action
- 💾 Record module definitions in master architecture document
- 📖 Reference `domains/integration.md` for facade contract patterns
- 📖 Reference `patterns/modular-monolith.md` for boundary design
- 🚫 DO NOT create circular dependencies between modules
- ⚠️ Flag modules with unclear ownership or cross-cutting responsibilities
- 🔍 Use web search to verify modular architecture patterns

---

## CONTEXT BOUNDARIES

This step operates within these boundaries:

- **Input context:** Selected tenant model from Step 02, project context from Step 01
- **Domain file:** `{project-root}/_bmad/bam/data/domains/integration.md`
- **Pattern file:** `{project-root}/_bmad/bam/data/patterns/facade.md`
- **Output:** Module boundary definitions with facade contracts for master architecture
- **Quality gate:** Module design feeds into QG-F1 (Foundation Gate) and QG-M1 (Module Architecture)

---

## YOUR TASK

Design module boundaries for the multi-tenant SaaS architecture following modular monolith principles. Define core bounded contexts, map module responsibilities, establish facade interfaces, and plan tenant context propagation across module boundaries.

---

## Main Sequence

### 1. Load Integration Domain Context

Read and internalize the BAM integration and facade pattern resources:

| Resource | Location | Purpose |
|----------|----------|---------|
| Integration domain | `{project-root}/_bmad/bam/data/domains/integration.md` | Facade contracts, integration boundaries |
| Facade pattern | `{project-root}/_bmad/bam/data/patterns/facade.md` | Module boundary design patterns |

**Action:** Confirm domain files loaded before designing boundaries.

---

### 2. Identify Core Bounded Contexts

Define the core modules for a multi-tenant SaaS platform:

| Module | Responsibility | Tenant Awareness |
|--------|---------------|------------------|
| **Tenant** | Tenant lifecycle, configuration, isolation | Owner - defines tenant context |
| **Identity** | Authentication, authorization, RBAC | High - tenant membership, roles |
| **Billing** | Metering, subscriptions, invoicing | High - per-tenant billing |
| **Core Domain** | Business logic modules (varies) | Variable - uses tenant context |
| **AI Runtime** | Agent orchestration, tool registry | High - tenant-isolated agents |
| **Platform** | Infrastructure, observability, events | Medium - shared with tenant tagging |

**Map each module's bounded context:**

```markdown
### Module: {module_name}

**Bounded Context:**
- Domain: {domain description}
- Ubiquitous Language: {key terms}
- Aggregate Roots: {primary entities}

**Tenant Context Relationship:**
- Creates tenant context: {yes/no}
- Consumes tenant context: {yes/no}
- Isolation level: {shared/partitioned/isolated}
```

**Present identified modules to user for confirmation.**

---

### 3. Map Module Responsibilities

For each identified module, define clear ownership boundaries:

#### Tenant Module

| Responsibility | Owns | Collaborates With |
|---------------|------|-------------------|
| Tenant CRUD | Data, events | Identity (membership) |
| Tenant configuration | Settings, features | All modules (config reads) |
| Tenant isolation | Context injection | All modules (context propagation) |
| Tenant lifecycle | Onboarding, offboarding | Billing, Identity |

#### Identity Module

| Responsibility | Owns | Collaborates With |
|---------------|------|-------------------|
| User authentication | Auth tokens, sessions | Tenant (membership) |
| User authorization | RBAC, permissions | All modules (permission checks) |
| Tenant membership | User-tenant mapping | Tenant (context) |
| API key management | Keys, scopes | AI Runtime (tool access) |

#### Billing Module

| Responsibility | Owns | Collaborates With |
|---------------|------|-------------------|
| Usage metering | Metrics, events | AI Runtime, Platform |
| Subscription management | Plans, tiers | Tenant (tier features) |
| Invoicing | Invoices, payments | External (payment gateway) |
| Quota enforcement | Limits, throttling | All modules (quota checks) |

#### AI Runtime Module

| Responsibility | Owns | Collaborates With |
|---------------|------|-------------------|
| Agent orchestration | Agent lifecycle | Identity (permissions) |
| Tool registry | MCP tools, schemas | Platform (observability) |
| Execution management | Runs, checkpoints | Billing (metering) |
| Model routing | LLM providers | Tenant (model config) |

**Document responsibility matrix for each module.**

---

### 4. Define Facade Interfaces

Design facade contracts for module-to-module communication:

```markdown
## Facade Contract: {Provider Module} → {Consumer Module}

### Interface Definition

| Method | Input | Output | Tenant Context |
|--------|-------|--------|----------------|
| {method_name} | {input_type} | {output_type} | {propagation_method} |

### Contract Rules

1. **Input validation:** {validation_rules}
2. **Tenant scoping:** {how tenant context is applied}
3. **Error contract:** {error_types_exposed}
4. **Versioning:** {version_strategy}

### Example Facades

| Facade | Provider | Consumer | Purpose |
|--------|----------|----------|---------|
| ITenantService | Tenant | All | Tenant context lookup |
| IIdentityService | Identity | AI Runtime | Permission checks |
| IBillingService | Billing | AI Runtime | Quota enforcement |
| IAgentService | AI Runtime | Core Domain | Agent execution |
```

**Apply facade pattern from `patterns/facade.md`:**

```
┌─────────────────────────────────────┐
│            Consumer Module          │
│                 │                   │
│                 ▼                   │
│  ┌────────────────────────────────┐│
│  │      Facade Interface          ││
│  │  - Tenant-aware methods        ││
│  │  - Type-safe contracts         ││
│  │  - Error boundaries            ││
│  └────────────┬───────────────────┘│
│               │                     │
└───────────────┼─────────────────────┘
                │
┌───────────────┼─────────────────────┐
│               ▼                     │
│  ┌────────────────────────────────┐│
│  │    Provider Implementation     ││
│  │  - Internal domain logic       ││
│  │  - Data access                 ││
│  └────────────────────────────────┘│
│            Provider Module          │
└─────────────────────────────────────┘
```

---

### 5. Plan Cross-Module Tenant Context Flow

Design how tenant context propagates across module boundaries:

**Tenant Context Structure:**

```yaml
tenant_context:
  tenant_id: string       # Primary identifier
  tenant_slug: string     # URL-safe identifier
  tier: enum              # free, pro, enterprise
  isolation_level: enum   # Based on tenant model selection
  features: map           # Enabled features
  quotas: map             # Current limits
```

**Propagation Matrix:**

| From Module | To Module | Method | Context Passed |
|-------------|-----------|--------|----------------|
| Identity | Tenant | Auth validation | user_id, session |
| Tenant | All | Context injection | Full tenant_context |
| Tenant | Billing | Metering | tenant_id, tier |
| Identity | AI Runtime | Tool access | tenant_id, permissions |
| AI Runtime | Platform | Observability | tenant_id, agent_id |

**Context Flow Diagram:**

```
Request → Identity (Auth)
              │
              ▼
         Tenant Module
         (Context Resolution)
              │
         tenant_context
              │
    ┌─────────┼─────────┐
    ▼         ▼         ▼
 Billing   AI Runtime  Core
 (Metering) (Isolation) (Logic)
    │         │         │
    └─────────┼─────────┘
              ▼
         Platform
       (Observability)
```

---

### 6. Verify Boundary Alignment with Tenant Model

Cross-reference module boundaries against selected tenant model from Step 02:

| Tenant Model | Boundary Implications | Module Adjustments |
|--------------|----------------------|-------------------|
| RLS | Shared infrastructure, policy-based isolation | All modules share DB, RLS policies enforced |
| Schema-per-Tenant | Schema routing required | Tenant module owns schema selection |
| Database-per-Tenant | Connection routing required | Platform module manages connection pools |
| Hybrid | Tier-based routing | Tenant module determines routing strategy |

**Verify alignment checklist:**

- [ ] Module boundaries support selected isolation model
- [ ] Tenant context carries isolation level information
- [ ] Facade contracts include tenant scoping parameters
- [ ] No direct cross-module data access bypassing facades
- [ ] Event contracts include tenant envelope

---

### 7. Verify Current Best Practices

Search for current modular architecture guidance:

Search the web: "modular monolith bounded context patterns {date}"
Search the web: "multi-tenant module boundary design {date}"
Search the web: "facade pattern SaaS architecture {date}"

_Source: [URL]_

**Incorporate findings into module design.**

---

### 8. Present Module Map for Confirmation

Compile the module boundary design and present for user confirmation:

```markdown
## Module Boundary Summary

### Modules Defined: {count}

| Module | Responsibility | Dependencies | Facade Methods |
|--------|---------------|--------------|----------------|
| Tenant | Lifecycle, config, isolation | None (root) | 5 |
| Identity | Auth, RBAC, membership | Tenant | 8 |
| Billing | Metering, subscriptions | Tenant, Identity | 6 |
| AI Runtime | Agent orchestration | Tenant, Identity, Billing | 10 |
| Core Domain | Business logic | Tenant, Identity | {varies} |
| Platform | Infrastructure | Tenant | 4 |

### Dependency Graph

Tenant ← Identity ← Billing
   ↑         ↑
   └─────────┼───── AI Runtime
             │
        Core Domain

### Tenant Context Flow

{Summary of context propagation strategy}

### Alignment with Tenant Model: {model_name}

{Summary of how boundaries support selected isolation model}
```

**Present summary to user for confirmation before proceeding.**

---

## COLLABORATION MENUS (A/P/C):

After presenting module boundary design:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific module boundaries
- **P (Party Mode)**: Bring architect, analyst, and domain expert perspectives
- **C (Continue)**: Accept boundaries and proceed to next step

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):

Invoke `bmad-advanced-elicitation` skill to explore:

- **Boundary clarity:** Are module responsibilities clearly separated?
- **Coupling concerns:** Are there hidden dependencies between modules?
- **Domain alignment:** Do boundaries match business domain boundaries?
- **Scalability:** Can modules scale independently if needed?
- **Team ownership:** Can teams own modules independently?

Pass context: module definitions, dependency graph, specific concerns.

**After processing enhanced insights, return to A/P/C menu.**

#### If 'P' (Party Mode):

Invoke `bmad-party-mode` skill with context:

```
Review module boundary design: {module_count} modules for {tenant_model} architecture
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| Architect | Structure | Are boundaries clean and consistent? |
| Analyst | Requirements | Do modules cover all required capabilities? |
| Domain Expert | Business | Do boundaries match business domains? |
| DevOps | Operations | Can modules be deployed/scaled independently? |

Process multi-perspective analysis and synthesize into refined design.

**After processing perspectives, return to A/P/C menu.**

#### If 'C' (Continue):

1. Record the module boundary design in output document:

```yaml
# Add to master-architecture.md
modules:
  - name: tenant
    responsibility: Tenant lifecycle, configuration, isolation
    dependencies: []
    facade_methods: [getTenant, createTenant, updateTenant, deleteTenant, getTenantContext]
    tenant_awareness: owner
  - name: identity
    responsibility: Authentication, authorization, RBAC
    dependencies: [tenant]
    facade_methods: [authenticate, authorize, getMemberships, ...]
    tenant_awareness: high
  # ... additional modules
  
tenant_context_flow:
  root: tenant
  propagation: context_injection
  carriers: [request_context, event_envelope, async_headers]
```

2. Update workflow state:

```yaml
stepsCompleted:
  - step-01-c-context
  - step-02-c-model
  - step-03-c-boundaries  # Add this
currentStep: step-04-c-patterns
```

3. Proceed to NEXT STEP.

---

## SUCCESS METRICS

- ✅ Core modules identified with clear bounded contexts
- ✅ Module responsibilities mapped with ownership clarity
- ✅ Facade interfaces defined for all module boundaries
- ✅ Tenant context propagation flow designed
- ✅ Boundaries verified against selected tenant model
- ✅ Web search performed for current modular patterns
- ✅ No circular dependencies in module graph
- ✅ User confirmed module design via A/P/C menu

---

## FAILURE MODES

- ❌ Defining boundaries without referencing tenant model - isolation not enforced
- ❌ Unclear module ownership - leads to coupling and data leaks
- ❌ Missing facade contracts - direct coupling bypasses isolation
- ❌ Circular dependencies - creates deployment and testing complexity
- ❌ No tenant context flow - context lost across boundaries
- ❌ Boundaries don't match business domains - DDD violations
- ❌ Skipping web search - may miss current modular monolith patterns
- ❌ Proceeding without A/P/C confirmation - user not engaged in design

---

## NEXT STEP

After user confirms module boundary design with 'C':

1. Record module definitions and facade contracts in master architecture document
2. Proceed to `step-04-c-patterns.md` to select architecture patterns
3. The module boundary design informs:
   - Pattern selection (event patterns for module communication)
   - Cross-cutting concerns (security, caching, observability per module)
   - Quality gate QG-M1 checklist (module architecture criteria)

**Transition to Step 04 with:**
- Module definitions: `{module_list}`
- Facade contracts: `{facade_summary}`
- Tenant context flow: `{propagation_strategy}`
- Dependency graph: `{dependency_summary}`

---

## Outputs

- Design decisions recorded
- Architecture patterns selected
- Implementation approach defined

