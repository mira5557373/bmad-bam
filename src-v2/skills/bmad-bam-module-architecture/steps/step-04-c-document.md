# Step 4: Design Module Contracts

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER design contracts without completing Step 03 internal design first
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ✅ CRITICAL: Define public facade API with all operations
- 📋 Document all required dependencies and event contracts
- 💬 Present contract design with A/P/C menu for user confirmation
- 🌐 Use web search to verify current API contract best practices

---

## EXECUTION PROTOCOLS

- 🎯 Design module public contracts (facade, events, dependencies)
- 💾 Record contract specifications in working document for Step 05
- 📖 Reference Step 03 design for internal structure
- 📖 Reference `domains/integration.md` for contract patterns
- 🚫 DO NOT proceed without explicit user confirmation via A/P/C
- ⚠️ Flag contracts that expose internal implementation details
- 🔍 Use web search to verify contract design patterns against current best practices

---

## CONTEXT BOUNDARIES

This step operates within these boundaries:

- **Input context:** Internal design from Step 03 (layers, domain model, events)
- **Domain file:** `{project-root}/_bmad/bam/data/domains/integration.md`
- **Pattern file:** `{project-root}/_bmad/bam/data/patterns/facade.md`
- **Output:** Module contract specifications (facade API, events, dependencies)
- **Quality gate:** Contracts inform QG-M1 (Module Architecture) checklist

---

## YOUR TASK

Design the public contracts for the module. Define the facade API that other modules will consume, document required dependencies on other module facades, specify event contracts for asynchronous communication, and plan the testing strategy for contract verification.

---

## Main Sequence

### 1. Define Public Facade API

Design the facade interface that this module exposes to other modules:

**Facade Contract Template:**

```markdown
### {ModuleName}Facade - Public API

#### Contract Overview

| Attribute | Value |
|-----------|-------|
| Facade Name | {ModuleName}Facade |
| Version | 1.0.0 |
| Owner Module | {module_name} |
| Consumer Modules | {list of consuming modules} |

#### Operations

##### {Operation1}

| Attribute | Value |
|-----------|-------|
| Operation | {operation_name} |
| Purpose | {what it does} |
| Tenant Required | Yes |
| Idempotent | {yes/no} |

**Signature:**
```
{operation_name}(ctx: TenantContext, input: {InputType}): Result<{OutputType}>
```

**Input Contract:**
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| {field1} | {type} | {yes/no} | {rules} |
| {field2} | {type} | {yes/no} | {rules} |

**Output Contract:**
| Field | Type | Description |
|-------|------|-------------|
| {field1} | {type} | {description} |
| {field2} | {type} | {description} |

**Error Contracts:**
| Error Code | Condition | Recovery |
|------------|-----------|----------|
| NOT_FOUND | Entity doesn't exist for tenant | Return empty result |
| UNAUTHORIZED | Cross-tenant access attempt | Reject with 403 |
| VALIDATION_ERROR | Invalid input | Return field errors |
```

**Facade Diagram:**

```
┌─────────────────────────────────────────────────────────┐
│                  {ModuleName}Facade                      │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │                   Public API                        │ │
│  │                                                     │ │
│  │  {operation1}(ctx, input) → Result<Output>         │ │
│  │  {operation2}(ctx, input) → Result<Output>         │ │
│  │  {operation3}(ctx, input) → Result<Output>         │ │
│  │                                                     │ │
│  └────────────────────────────────────────────────────┘ │
│                          │                               │
│                    TenantContext                         │
│                    Required for ALL                      │
│                    Operations                            │
└─────────────────────────────────────────────────────────┘
```

Search the web: "facade API contract design multi-tenant {date}"

---

### 2. Document Required Dependencies

List all facades this module depends on:

**Dependency Contract Template:**

```markdown
### Required Dependencies

#### {DependencyModule}Facade

| Attribute | Value |
|-----------|-------|
| Facade | {DependencyModule}Facade |
| Version Required | >=1.0.0 |
| Criticality | {Critical/Important/Optional} |
| Fallback Behavior | {what happens if unavailable} |

**Operations Used:**

| Operation | Purpose | Failure Impact |
|-----------|---------|----------------|
| {operation1} | {why needed} | {impact if fails} |
| {operation2} | {why needed} | {impact if fails} |

**Circuit Breaker Configuration:**

| Setting | Value |
|---------|-------|
| Failure Threshold | {count} |
| Reset Timeout | {seconds} |
| Half-Open Requests | {count} |
```

**Dependency Diagram:**

```
┌─────────────────────────────────────────────────────────┐
│                    {ModuleName}                          │
│                                                          │
│  ┌─────────────────┐  ┌─────────────────┐              │
│  │ {Service}       │  │ {Service}       │              │
│  └────────┬────────┘  └────────┬────────┘              │
│           │                    │                        │
│           ▼                    ▼                        │
│  ┌─────────────────────────────────────────┐           │
│  │          Dependency Facades              │           │
│  │                                          │           │
│  │  {DepModule1}Facade  {DepModule2}Facade │           │
│  └─────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────┘
                    │                    │
                    ▼                    ▼
        ┌───────────────────┐  ┌───────────────────┐
        │  {DepModule1}     │  │  {DepModule2}     │
        └───────────────────┘  └───────────────────┘
```

Search the web: "module dependency contracts microservices {date}"

---

### 3. Specify Event Contracts

Define event contracts for asynchronous communication:

**Event Contract Template:**

```markdown
### Event Contracts

#### Published Events

##### {ModuleName}CreatedEvent

| Attribute | Value |
|-----------|-------|
| Event Type | {module_name}.created |
| Version | 1.0.0 |
| Trigger | {when event is emitted} |
| Ordering | {guaranteed/best-effort} |

**Schema:**
```
{
  "event_id": "uuid",
  "event_type": "{module_name}.created",
  "tenant_id": "uuid",           // REQUIRED: Tenant isolation
  "timestamp": "ISO8601",
  "payload": {
    "entity_id": "uuid",
    "{field1}": "{type}",
    "{field2}": "{type}"
  }
}
```

**Consumers:**
| Module | Handler | Purpose |
|--------|---------|---------|
| {ConsumerModule} | {HandlerName} | {why they consume} |

##### {ModuleName}UpdatedEvent

| Attribute | Value |
|-----------|-------|
| Event Type | {module_name}.updated |
| Version | 1.0.0 |
| Trigger | {trigger condition} |

**Schema:**
```
{
  "event_id": "uuid",
  "event_type": "{module_name}.updated",
  "tenant_id": "uuid",
  "timestamp": "ISO8601",
  "payload": {
    "entity_id": "uuid",
    "changes": {
      "{field}": {"old": "{value}", "new": "{value}"}
    }
  }
}
```

#### Consumed Events

| Event | Source | Handler | Idempotency |
|-------|--------|---------|-------------|
| {Event1} | {SourceModule} | {Handler} | event_id + tenant_id |
| {Event2} | {SourceModule} | {Handler} | event_id + tenant_id |
```

**Event Flow Diagram:**

```
Published Events:
{ModuleName} ──┬──► {module_name}.created ──► {ConsumerA}, {ConsumerB}
               │
               └──► {module_name}.updated ──► {ConsumerC}

Consumed Events:
{SourceModule}.event ──► {ModuleName}.{Handler}
```

Search the web: "event contract design multi-tenant SaaS {date}"

---

### 4. Plan Testing Strategy

Define testing strategy for contract verification:

**Testing Strategy Template:**

```markdown
### Testing Strategy

#### Contract Testing

| Test Type | Scope | Tools | Coverage |
|-----------|-------|-------|----------|
| Unit | Facade methods | Jest/pytest | All operations |
| Contract | API contracts | Pact/Contract tests | Consumer-producer |
| Integration | Cross-module | Test containers | Happy paths |
| Tenant | Isolation | Custom fixtures | All tenant scenarios |

#### Test Scenarios

##### Facade Tests

| Scenario | Input | Expected | Tenant Verification |
|----------|-------|----------|---------------------|
| {Operation} success | Valid input + tenant | Success result | Same tenant data |
| {Operation} not found | Valid tenant, bad ID | Not found | No cross-tenant leak |
| {Operation} unauthorized | Wrong tenant | 403 Unauthorized | Access blocked |
| {Operation} validation | Invalid input | Validation errors | No data access |

##### Event Tests

| Scenario | Event | Expected | Verification |
|----------|-------|----------|--------------|
| Create publishes | {Created}Event | Event emitted | tenant_id present |
| Consumer handles | {Event} consumed | Side effect | Idempotent |
| Invalid event | Malformed event | Rejected | No side effects |

#### Tenant Isolation Tests

| Test | Purpose | Method |
|------|---------|--------|
| Cross-tenant read | Verify tenant A cannot read B | Attempt with wrong tenant_id |
| Cross-tenant write | Verify tenant A cannot modify B | Attempt update with wrong tenant_id |
| Event isolation | Verify events scoped to tenant | Check event envelope tenant_id |
```

Search the web: "contract testing multi-tenant applications {date}"

---

## COLLABORATION MENUS (A/P/C)

After presenting complete contract design:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific contract questions
- **P (Party Mode)**: Bring API designer, security, and QA perspectives
- **C (Continue)**: Accept contracts and proceed to compile step

Select an option:
```

### If 'A' (Advanced Elicitation)

Invoke `bmad-advanced-elicitation` skill to explore:

- **API versioning:** How will contracts evolve over time?
- **Error handling:** Are error contracts comprehensive enough?
- **Event ordering:** Do any events require strict ordering?
- **Contract evolution:** What backward compatibility rules apply?
- **Testing gaps:** Are there scenarios not covered by test strategy?

Pass context: Step 03 design, current contract specifications, specific concerns.

**After processing enhanced insights, return to A/P/C menu.**

### If 'P' (Party Mode)

Invoke `bmad-party-mode` skill with context:

```
Review module contracts for {module_name}
with facade: {facade_operations_count} operations
events: {published_count} published, {consumed_count} consumed
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| API Designer | Contract quality | Are contracts intuitive and consistent? |
| Security | Tenant isolation | Do all contracts enforce tenant boundaries? |
| QA Engineer | Testability | Can all contracts be tested effectively? |
| Consumer Dev | Usability | Are contracts easy to consume correctly? |

Process multi-perspective analysis and synthesize into refined contracts.

**After processing perspectives, return to A/P/C menu.**

### If 'C' (Continue)

1. Record the contract specifications in working document:

```yaml
# Add to module-contracts.md
module_name: {name}
facade:
  name: {ModuleName}Facade
  version: 1.0.0
  operations:
    - name: {operation1}
      input: {InputType}
      output: {OutputType}
dependencies:
  - facade: {DepModule}Facade
    operations: [{op1}, {op2}]
events:
  publishes:
    - type: {module_name}.created
      payload: {schema}
  consumes:
    - type: {source_module}.event
      handler: {HandlerName}
testing:
  contract_tests: true
  tenant_isolation_tests: true
contracts_completed_at: {timestamp}
```

2. Update workflow state:

```yaml
stepsCompleted:
  - step-01-c-start
  - step-02-c-analyze
  - step-03-c-design
  - step-04-c-document  # Add this
currentStep: step-05-c-complete
```

3. Proceed to NEXT STEP.

---

## SUCCESS METRICS

- ✅ Public facade API defined with all operations
- ✅ Input/output contracts documented for each operation
- ✅ Error contracts specified
- ✅ Required dependencies documented with fallback behavior
- ✅ Event contracts defined (published and consumed)
- ✅ Testing strategy planned with tenant isolation tests
- ✅ Web search performed for contract design patterns
- ✅ Step 03 design referenced in contracts
- ✅ User confirmed contracts via A/P/C menu
- ✅ Contracts recorded in working document

---

## FAILURE MODES

- ❌ Skipping facade operations - incomplete public API
- ❌ Designing without Step 03 context - contracts don't match internal design
- ❌ Missing tenant context in contracts - isolation not enforced
- ❌ Events without tenant_id - cross-tenant leaks possible
- ❌ No error contracts - consumers can't handle failures
- ❌ Missing testing strategy - contracts unverified
- ❌ Proceeding without A/P/C confirmation - user not engaged in decisions
- ❌ Skipping web search - may miss current contract best practices

---

## NEXT STEP

After user confirms contract design with 'C':

1. Record the contracts in working document
2. Proceed to `step-05-c-complete.md` to compile module architecture document
3. The contracts inform:
   - Module architecture template sections
   - QG-M1 checklist items
   - Implementation guidance

**Transition to Step 05 with:**
- Facade: `{name, version, operations}`
- Dependencies: `{[facade_list]}`
- Events: `{publishes: [...], consumes: [...]}`
- Testing: `{strategy_summary}`
