# Step 2: Analyze Module Responsibilities

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER analyze module without loading Step 01 requirements first
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ CRITICAL: Define single responsibility principle for the module
- 📋 Document all entities, aggregates, and value objects within bounded context
- 💬 Present responsibility analysis with A/P/C menu for user confirmation
- 🌐 Use web search to verify current DDD and module design best practices

---

## EXECUTION PROTOCOLS

- 🎯 Analyze module's single responsibility and domain model
- 💾 Record responsibility analysis in working document for Step 03
- 📖 Reference `domains/integration.md` for facade contract requirements
- 📖 Reference `patterns/facade.md` for module boundary patterns
- 🚫 DO NOT proceed without explicit user confirmation via A/P/C
- ⚠️ Flag responsibilities that violate single responsibility principle
- 🔍 Use web search to verify DDD patterns against current best practices

---

## CONTEXT BOUNDARIES

This step operates within these boundaries:

- **Input context:** Selected module and requirements from Step 01
- **Domain file:** `{project-root}/_bmad/bam/data/domains/integration.md`
- **Pattern file:** `{project-root}/_bmad/bam/data/patterns/facade.md`
- **Output:** Module responsibility analysis with domain model
- **Quality gate:** Analysis informs QG-M1 (Module Architecture) checklist

---

## YOUR TASK

Define the module's single responsibility and analyze its domain model. Identify all entities, aggregates, value objects, and domain services that belong within this bounded context. Map dependencies to other modules and identify required facade contracts.

---

## Main Sequence

### 1. Verify Single Responsibility

Analyze the module against the Single Responsibility Principle (SRP):

| Check | Question | Answer |
|-------|----------|--------|
| Core Purpose | What ONE thing does this module do? | {answer} |
| Change Reason | What single type of requirement change would modify this module? | {answer} |
| Cohesion Test | Do ALL entities in this module relate to the same business capability? | {yes/no} |
| Split Signal | Can this module be split without losing cohesion? | {yes/no} |

**SRP Analysis Template:**

```markdown
### Single Responsibility Analysis

**Module:** {module_name}

**Core Responsibility Statement:**
> This module is responsible for {ONE responsibility} and nothing else.

**Responsibility Boundaries:**
| In Scope | Out of Scope |
|----------|--------------|
| {responsibility} | {not_this_module's_job} |
| {responsibility} | {not_this_module's_job} |

**Cohesion Score:** {High/Medium/Low}
**Recommendation:** {Proceed as-is / Consider splitting / Merge with related module}
```

Search the web: "single responsibility principle module design {date}"

---

### 2. Identify Domain Entities

Map all entities within the module's bounded context:

| Entity | Description | Lifecycle | Tenant-Scoped |
|--------|-------------|-----------|---------------|
| {Entity1} | {what it represents} | {create/update/delete triggers} | {yes/no} |
| {Entity2} | {what it represents} | {lifecycle} | {yes/no} |

**Entity Analysis Template:**

```markdown
### Domain Entities

| Entity | Primary Key | Tenant Key | Relationships | Persistence |
|--------|-------------|------------|---------------|-------------|
| {entity} | {pk_type} | {tenant_id / none} | {related_entities} | {table_name} |

**Entity Invariants:**
- {entity1}: {business rule that must always be true}
- {entity2}: {invariant}

**Tenant Isolation Check:**
- [ ] All entities include tenant_id reference
- [ ] No entity allows cross-tenant access
- [ ] RLS policies will be required for: {entities}
```

Search the web: "DDD entity design bounded context {date}"

---

### 3. Define Aggregates and Roots

Identify aggregate boundaries and their roots:

| Aggregate | Root Entity | Contained Entities | Invariants |
|-----------|-------------|-------------------|------------|
| {Aggregate1} | {RootEntity} | {Child1, Child2} | {business rules} |
| {Aggregate2} | {RootEntity} | {Children} | {rules} |

**Aggregate Design Template:**

```markdown
### Aggregate Design

#### {AggregateName} Aggregate

**Root:** {RootEntity}

**Boundary:**
```
┌─────────────────────────────────────┐
│         {AggregateName}             │
│  ┌─────────────────────────────┐   │
│  │      {RootEntity}           │   │
│  │  (Aggregate Root)           │   │
│  └──────────┬──────────────────┘   │
│             │                       │
│  ┌──────────┼──────────────────┐   │
│  │          │                   │   │
│  ▼          ▼                   ▼   │
│ {Child1}  {Child2}          {Child3}│
│ (Value)   (Entity)          (Value) │
└─────────────────────────────────────┘
```

**Invariants:**
1. {Business rule enforced by aggregate}
2. {Consistency boundary rule}

**Access Pattern:** All modifications through root only
```

Search the web: "aggregate design patterns DDD {date}"

---

### 4. Map Module Dependencies

Analyze dependencies to and from other modules:

#### Outbound Dependencies (This Module Consumes)

| Target Module | Dependency Type | Facade Required | Sync/Async |
|---------------|-----------------|-----------------|------------|
| {module_name} | {data/service/event} | {facade_name} | {sync/async} |

#### Inbound Dependencies (Other Modules Consume This)

| Source Module | Dependency Type | Facade Provided | Sync/Async |
|---------------|-----------------|-----------------|------------|
| {module_name} | {data/service/event} | {facade_name} | {sync/async} |

**Dependency Analysis Template:**

```markdown
### Dependency Analysis

**Coupling Score:** {Low/Medium/High}

**Outbound Facades Required:**
| Facade | Purpose | Contract Status |
|--------|---------|-----------------|
| {BillingFacade} | Get tenant billing status | Undefined |
| {IdentityFacade} | Validate user permissions | Undefined |

**Inbound Facades to Provide:**
| Facade | Purpose | Consumers |
|--------|---------|-----------|
| {ModuleFacade} | {what it provides} | {consuming modules} |

**Event Dependencies:**
| Direction | Event | Producer/Consumer |
|-----------|-------|-------------------|
| Publish | {EventName} | {this module} |
| Subscribe | {EventName} | {this module} |
```

Search the web: "module dependency management modular monolith {date}"

---

### 5. Identify Facade Contract Needs

Based on dependencies, identify required facade contracts:

**Facade Contracts Summary:**

| Facade Name | Direction | Operations | Tenant Context |
|-------------|-----------|------------|----------------|
| {ModuleFacade} | Provide | {list of ops} | Required |
| {DependencyFacade} | Consume | {list of ops} | Required |

**Contract Definition Preview:**

```markdown
### {ModuleFacade} Contract (Provided)

**Operations:**
1. `{operation1}(ctx: TenantContext, params): Result`
2. `{operation2}(ctx: TenantContext, params): Result`

**Tenant Context Requirements:**
- All operations require valid TenantContext
- Tenant isolation enforced at facade boundary

**Error Contracts:**
| Error | Condition | Recovery |
|-------|-----------|----------|
| NotFound | Entity doesn't exist | Return empty |
| Unauthorized | Cross-tenant access | Reject request |
```

Search the web: "facade contract design multi-tenant {date}"

---

## COLLABORATION MENUS (A/P/C)

After presenting complete responsibility analysis:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific domain model questions
- **P (Party Mode)**: Bring domain expert, architect, and security perspectives
- **C (Continue)**: Accept analysis and proceed to design step

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):

Invoke `bmad-advanced-elicitation` skill to explore:

- **Aggregate boundaries:** Should any entities be moved to different aggregates?
- **Responsibility scope:** Is the module taking on too much or too little?
- **Dependency direction:** Are dependencies pointing the right way?
- **Event modeling:** What domain events should this module publish?
- **Tenant isolation:** How does tenant context flow through aggregates?

Pass context: Module requirements from Step 01, current responsibility analysis.

**After processing enhanced insights, return to A/P/C menu.**

#### If 'P' (Party Mode):

Invoke `bmad-party-mode` skill with context:

```
Review module responsibility analysis for {module_name}
with bounded context: {context_description}
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| Domain Expert | Business alignment | Does the domain model match business reality? |
| Architect | Technical soundness | Are aggregate boundaries technically correct? |
| Security | Tenant isolation | Is tenant context properly enforced at all boundaries? |
| DevOps | Operational concerns | Can this module be deployed and scaled independently? |

Process multi-perspective analysis and synthesize into refined recommendations.

**After processing perspectives, return to A/P/C menu.**

#### If 'C' (Continue):

1. Record the responsibility analysis in working document:

```yaml
# Add to module-analysis.md
module_name: {name}
single_responsibility: "{statement}"
entities:
  - name: {entity1}
    tenant_scoped: true
aggregates:
  - root: {aggregate_root}
    children: [{child1}, {child2}]
facades:
  provides:
    - {facade_name}
  consumes:
    - {facade_name}
analysis_completed_at: {timestamp}
```

2. Update workflow state:

```yaml
stepsCompleted:
  - step-01-c-start
  - step-02-c-analyze  # Add this
currentStep: step-03-c-design
```

3. Proceed to NEXT STEP.

---

## SUCCESS METRICS

- ✅ Single responsibility defined and validated
- ✅ All domain entities identified with tenant scoping
- ✅ Aggregates defined with clear boundaries
- ✅ Module dependencies mapped (inbound and outbound)
- ✅ Facade contract needs identified
- ✅ Web search performed for DDD and module design patterns
- ✅ Step 01 requirements referenced in analysis
- ✅ User confirmed analysis via A/P/C menu
- ✅ Analysis recorded in working document

---

## FAILURE MODES

- ❌ Skipping SRP validation - module may be doing too much
- ❌ Analyzing without Step 01 context - recommendations not grounded in requirements
- ❌ Missing tenant scoping - entities without tenant_id break isolation
- ❌ Undefined aggregates - no clear consistency boundaries
- ❌ Circular dependencies - modules depending on each other directly
- ❌ Proceeding without A/P/C confirmation - user not engaged in decisions
- ❌ Skipping web search - may miss current DDD best practices

---

## NEXT STEP

After user confirms responsibility analysis with 'C':

1. Record the analysis in working document
2. Proceed to `step-03-c-design.md` to design module internals
3. The analysis informs:
   - Module layer design (API, Service, Repository)
   - Internal domain model structure
   - Tenant context integration points
   - Event contracts

**Transition to Step 03 with:**
- Single responsibility: `{responsibility_statement}`
- Entities: `{entity_list}`
- Aggregates: `{aggregate_list}`
- Facades: `{provides: [...], consumes: [...]}`

---

## Outputs

- Analysis findings documented
- Options comparison completed
- Recommendation prepared

