# Step 3: Design Facade API Contract

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER design facade contract without completing Step 02 analysis first
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ CRITICAL: Define ALL facade operations with complete signatures
- 📋 Document input/output schemas with tenant context requirements
- 💬 Present facade design with A/P/C menu for user confirmation
- 🌐 Use web search to verify current facade API design best practices

---

## EXECUTION PROTOCOLS

- 🎯 Design the facade API contract with all operation signatures
- 💾 Record facade design in working document for Step 04
- 📖 Reference Step 02 integration analysis for requirements
- 📖 Reference `patterns/facade.md` for contract structure patterns
- 🚫 DO NOT proceed without explicit user confirmation via A/P/C
- ⚠️ Flag operations that expose internal implementation details
- 🔍 Use web search to verify facade design patterns against current best practices

---

## CONTEXT BOUNDARIES

This step operates within these boundaries:

- **Input context:** Integration analysis from Step 02 (operations, events, DTOs)
- **Domain file:** `{project-root}/_bmad/bam/data/domains/integration.md`
- **Pattern file:** `{project-root}/_bmad/bam/data/patterns/facade.md`
- **Output:** Facade API contract with operation signatures and schemas
- **Quality gate:** Design informs QG-I1 (Convergence) checklist

---

## YOUR TASK

Design the formal facade API contract that the source module provides to the target module. Define all operation signatures, input/output schemas, error contracts, and tenant context requirements. This becomes the binding contract for QG-I1 verification.

---

## Main Sequence

### 1. Design Facade Contract Overview

Define the facade contract structure:

```markdown
### Facade Contract: {SourceModule}Facade

| Attribute | Value |
|-----------|-------|
| Contract Name | {SourceModule}Facade |
| Provider Module | {source_module} |
| Consumer Modules | {target_module}, {other_consumers} |
| Version | 1.0.0 |
| Contract Type | {Synchronous API / Asynchronous Events / Mixed} |
| Tenant Context | Required on all operations |
```

**Facade Contract Diagram:**

```
┌─────────────────────────────────────────────────────────────────────┐
│                    {SourceModule}Facade v1.0.0                       │
│                                                                      │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                        Operations                              │  │
│  │                                                                │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │ {operation1}(ctx: TenantContext, input) → Result<Output>│  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │ {operation2}(ctx: TenantContext, input) → Result<Output>│  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │ {operation3}(ctx: TenantContext, input) → Result<Output>│  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  │                                                                │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  Contract Version: 1.0.0                                            │
│  Tenant Context: REQUIRED                                           │
│  Breaking Change Policy: Major version increment                    │
└─────────────────────────────────────────────────────────────────────┘
```

Search the web: "facade pattern API design multi-tenant SaaS {date}"

---

### 2. Define Operation Signatures

Design each facade operation with complete contract:

**Operation Contract Template:**

```markdown
### Operation: {operationName}

| Attribute | Value |
|-----------|-------|
| Name | {operationName} |
| Purpose | {brief description of what it does} |
| Tenant Context | Required |
| Idempotent | {yes/no} |
| Cacheable | {yes/no/conditional} |
| SLA | {response_time_target} |

**Signature:**
```
{operationName}(
  ctx: TenantContext,
  input: {InputType}
): Result<{OutputType}, {ErrorType}>
```

**TenantContext:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| tenant_id | UUID | Yes | Tenant isolation key |
| tier | Enum | Yes | free/pro/enterprise |
| user_id | UUID | No | Acting user (if applicable) |
| permissions | string[] | No | Operation permissions |

**Input Schema ({InputType}):**
| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| {field1} | {type} | {yes/no} | {rules} | {description} |
| {field2} | {type} | {yes/no} | {rules} | {description} |

**Output Schema ({OutputType}):**
| Field | Type | Nullable | Description |
|-------|------|----------|-------------|
| {field1} | {type} | {yes/no} | {description} |
| {field2} | {type} | {yes/no} | {description} |

**Error Codes:**
| Code | Condition | HTTP Status | Recovery |
|------|-----------|-------------|----------|
| NOT_FOUND | Entity not found for tenant | 404 | Return empty or error |
| UNAUTHORIZED | Cross-tenant access attempt | 403 | Reject request |
| VALIDATION_ERROR | Invalid input fields | 400 | Return field errors |
| INTERNAL_ERROR | Unexpected failure | 500 | Retry with backoff |
```

Design each operation from Step 02 analysis:

| Operation | Input Type | Output Type | Tenant Required |
|-----------|------------|-------------|-----------------|
| {operation1} | {Input1} | {Output1} | Yes |
| {operation2} | {Input2} | {Output2} | Yes |
| {operation3} | {Input3} | {Output3} | Yes |

Search the web: "API operation contract design patterns {date}"

---

### 3. Design Input/Output Schemas

Define all DTOs used in operations:

**Input DTO Template:**

```markdown
### {InputTypeName}

**Used by:** {operation_names}
**Direction:** Input

| Field | Type | Required | Validation | Example |
|-------|------|----------|------------|---------|
| {field1} | string | Yes | max:255 | "value" |
| {field2} | UUID | Yes | valid UUID | "abc-123" |
| {field3} | number | No | min:0, max:100 | 50 |
| {field4} | {enum} | Yes | one of: [a,b,c] | "a" |

**Validation Rules:**
1. All required fields must be present
2. String lengths enforced at API boundary
3. Enum values validated against allowed list
4. Cross-field validation: {rules}

**Example:**
```json
{
  "{field1}": "example",
  "{field2}": "550e8400-e29b-41d4-a716-446655440000",
  "{field3}": 50,
  "{field4}": "a"
}
```
```

**Output DTO Template:**

```markdown
### {OutputTypeName}

**Used by:** {operation_names}
**Direction:** Output

| Field | Type | Nullable | Description |
|-------|------|----------|-------------|
| {field1} | string | No | {description} |
| {field2} | UUID | No | Entity identifier |
| {field3} | datetime | No | ISO8601 timestamp |
| {field4} | {nested_type} | Yes | Optional related data |

**Example:**
```json
{
  "{field1}": "example",
  "{field2}": "550e8400-e29b-41d4-a716-446655440000",
  "{field3}": "2026-04-26T10:30:00Z",
  "{field4}": null
}
```
```

Search the web: "API schema design best practices {date}"

---

### 4. Design Error Contracts

Define standardized error responses:

**Error Response Structure:**

```markdown
### Error Response Contract

All facade operations return errors in this format:

```json
{
  "error": {
    "code": "{ERROR_CODE}",
    "message": "{Human-readable message}",
    "details": {
      "field": "{field_name}",
      "reason": "{specific_reason}"
    },
    "request_id": "{tracking_id}",
    "timestamp": "{ISO8601}"
  }
}
```

### Standard Error Codes

| Code | HTTP Status | When Used | Consumer Action |
|------|-------------|-----------|-----------------|
| NOT_FOUND | 404 | Entity not found for tenant | Handle gracefully or retry |
| UNAUTHORIZED | 403 | Cross-tenant access attempt | Do not retry, log security event |
| FORBIDDEN | 403 | Permission denied | Check user permissions |
| VALIDATION_ERROR | 400 | Invalid input | Fix input and retry |
| CONFLICT | 409 | Resource state conflict | Refresh and retry |
| RATE_LIMITED | 429 | Too many requests | Back off and retry |
| INTERNAL_ERROR | 500 | Unexpected failure | Retry with exponential backoff |
| SERVICE_UNAVAILABLE | 503 | Dependency down | Use circuit breaker, retry later |

### Error Handling Guidelines

**Consumer Responsibilities:**
1. Check error code before processing response
2. Log UNAUTHORIZED errors as security events
3. Implement circuit breaker for SERVICE_UNAVAILABLE
4. Use exponential backoff for retryable errors
5. Never expose raw error messages to end users
```

Search the web: "API error handling patterns REST {date}"

---

### 5. Design Tenant Context Enforcement

Define how tenant context is validated at the facade boundary:

**Tenant Context Validation:**

```markdown
### Tenant Context Enforcement

#### Facade Entry Point

All facade operations MUST:

1. **Extract TenantContext** from caller
   - Validate tenant_id is present
   - Validate tier is valid enum value
   - Validate permissions if required

2. **Verify Tenant Access** before any data access
   - Tenant must be active
   - Tenant tier must allow operation
   - Rate limits per tier applied

3. **Propagate Context** to all downstream operations
   - Pass context to service layer
   - Include in repository queries
   - Embed in published events

#### Cross-Tenant Protection

| Check Point | Validation | Failure Response |
|-------------|------------|------------------|
| Facade entry | tenant_id present | 401 Unauthorized |
| Data access | tenant_id matches | 403 Forbidden |
| Entity return | Belongs to tenant | Filter/empty result |
| Event publish | tenant_id in envelope | Reject publish |

#### Tenant Context Flow

```
Consumer Request
    │
    ▼
┌─────────────────────────────────────────┐
│ Facade: Extract & Validate TenantContext│
│   - Validate tenant_id                   │
│   - Check tenant active                  │
│   - Verify tier permissions              │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│ Service: Business Logic with Context    │
│   - Pass context to all operations       │
│   - Enforce business rules per tenant    │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│ Repository: Tenant-Filtered Data Access │
│   - WHERE tenant_id = ctx.tenant_id     │
│   - RLS policy enforcement              │
└─────────────────────────────────────────┘
```
```

Search the web: "tenant isolation API design patterns {date}"

---

## COLLABORATION MENUS (A/P/C)

After presenting complete facade API design:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific operation design
- **P (Party Mode)**: Bring API designer, security, and consumer perspectives
- **C (Continue)**: Accept design and proceed to event contract step

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):

Invoke `bmad-advanced-elicitation` skill to explore:

- **Operation completeness:** Are all consumer needs addressed?
- **Schema design:** Are DTOs well-structured and versioned?
- **Error handling:** Are all failure scenarios covered?
- **Tenant enforcement:** Is isolation guaranteed at all points?
- **Performance:** Are there optimization opportunities?

Pass context: Step 02 analysis, current facade design, specific concerns.

**After processing enhanced insights, return to A/P/C menu.**

#### If 'P' (Party Mode):

Invoke `bmad-party-mode` skill with context:

```
Review facade API design for {SourceModule}Facade
Operations: {count} defined
Consumer: {target_module}
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| API Designer | Contract quality | Are operations intuitive and consistent? |
| Security | Tenant isolation | Is tenant context enforced everywhere? |
| Consumer Dev | Usability | Can this be consumed correctly and easily? |
| Platform Eng | Operability | Can this API be monitored and debugged? |

Process multi-perspective analysis and synthesize into refined design.

**After processing perspectives, return to A/P/C menu.**

#### If 'C' (Continue):

1. Record the facade API design in working document:

```yaml
# Add to facade-design.md
facade_name: {SourceModule}Facade
version: 1.0.0
provider: {source_module}
consumers: [{target_module}]
operations:
  - name: {operation1}
    input: {InputType1}
    output: {OutputType1}
    errors: [{error_codes}]
  - name: {operation2}
    input: {InputType2}
    output: {OutputType2}
    errors: [{error_codes}]
schemas:
  inputs: [{InputType1}, {InputType2}]
  outputs: [{OutputType1}, {OutputType2}]
tenant_context:
  required: true
  enforcement: facade_entry
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

- ✅ Facade contract overview defined with versioning
- ✅ All operations have complete signatures
- ✅ Input/output schemas documented with validation rules
- ✅ Error contracts defined with standard codes
- ✅ Tenant context enforcement designed
- ✅ Web search performed for API design patterns
- ✅ Step 02 analysis referenced in design
- ✅ User confirmed design via A/P/C menu
- ✅ Design recorded in working document

---

## FAILURE MODES

- ❌ Skipping operations - incomplete facade contract
- ❌ Designing without Step 02 context - design doesn't match requirements
- ❌ Missing tenant context - isolation not enforced
- ❌ Undefined error contracts - consumers can't handle failures
- ❌ Incomplete schemas - contract ambiguity
- ❌ Proceeding without A/P/C confirmation - user not engaged
- ❌ Skipping web search - may miss current best practices

---

## NEXT STEP

After user confirms facade API design with 'C':

1. Record the design in working document
2. Proceed to `step-04-c-document.md` to design event contracts
3. The facade API design informs:
   - Contract documentation structure
   - Consumer integration guide
   - QG-I1 verification criteria

**Transition to Step 04 with:**
- Facade: `{name, version, operations}`
- Schemas: `{inputs, outputs}`
- Errors: `{error_contracts}`
- Tenant: `{enforcement_design}`

---

## Outputs

- Design decisions recorded
- Architecture patterns selected
- Implementation approach defined

