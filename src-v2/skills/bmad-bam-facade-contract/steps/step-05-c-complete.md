# Step 5: Compile Facade Contract Document

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER compile document without completing Steps 01-04 first
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: Load facade contract template before compiling
- ✅ CRITICAL: Include ALL sections from previous steps in final document
- 📋 Run QG-I1 soft gate checkpoint before finalizing
- 💬 Present compiled document with A/P/C menu for user confirmation
- 🌐 USE web search to verify document completeness against best practices

---

## EXECUTION PROTOCOLS

- 🎯 Compile all facade contract decisions into final document
- 💾 Save document to: `{output_folder}/planning-artifacts/facade-{source}-{target}-contract.md`
- 📖 Load template: `{project-root}/_bmad/bam/data/templates/facade-contract-template.md`
- 📖 Reference all previous steps for content
- 🚫 DO NOT proceed without QG-I1 checkpoint verification
- ⚠️ Flag any missing sections or incomplete decisions
- 🔍 Use web search to verify contract documentation best practices

---

## CONTEXT BOUNDARIES

This step operates within these boundaries:

- **Input context:** All outputs from Steps 01-04
- **Template:** `{project-root}/_bmad/bam/data/templates/facade-contract-template.md`
- **Output:** `{output_folder}/planning-artifacts/facade-{source}-{target}-contract.md`
- **Quality gate:** QG-I1 (Convergence) checkpoint required

---

## YOUR TASK

Compile all facade contract decisions from Steps 01-04 into the final facade contract document. Run QG-I1 soft gate checkpoint to verify integration readiness. Save the document to planning-artifacts.

---

## Main Sequence

### 1. Load Facade Contract Template

**Read template:**

```
{project-root}/_bmad/bam/data/templates/facade-contract-template.md
```

**Template sections to populate:**

| Section | Source Step | Required |
|---------|-------------|----------|
| Contract Overview | Step 01, 03 | Yes |
| Module Pairing | Step 01 | Yes |
| Operations | Step 03 | Yes |
| Input/Output Schemas | Step 03 | Yes |
| Error Contracts | Step 03 | Yes |
| Event Contracts | Step 04 | Yes |
| DLQ Strategy | Step 04 | Yes |
| Tenant Context | Step 02, 03 | Yes |
| Versioning | Step 04 | Yes |
| Testing Strategy | Step 02 | Yes |

### 2. Compile Document Sections

**Populate each section from previous steps:**

```markdown
# Facade Contract: {SourceModule}Facade → {TargetModule}

**Project:** {{project_name}}
**Date:** {{date}}
**Version:** 1.0.0
**Author:** {{author}}
**Quality Gate:** QG-I1

---

## 1. Contract Overview

### Contract Identity

| Attribute | Value |
|-----------|-------|
| Contract Name | {SourceModule}Facade → {TargetModule} |
| Provider Module | {source_module} |
| Consumer Module | {target_module} |
| Contract Type | {sync/async/mixed} |
| Version | 1.0.0 |
| Status | Active |

### Purpose

{Brief description of what this contract enables}

### Scope

| In Scope | Out of Scope |
|----------|--------------|
| {covered_operations} | {not_covered} |
| {events_exchanged} | {not_part_of_contract} |

---

## 2. Module Pairing

### Source Module (Provider)

| Attribute | Value |
|-----------|-------|
| Module Name | {source_module} |
| Bounded Context | {context_description} |
| Facade | {FacadeName} |

### Target Module (Consumer)

| Attribute | Value |
|-----------|-------|
| Module Name | {target_module} |
| Bounded Context | {context_description} |
| Dependencies | {facade_dependencies} |

### Integration Diagram

```
┌────────────────────┐         ┌────────────────────┐
│   {TargetModule}   │         │   {SourceModule}   │
│    (Consumer)      │         │    (Provider)      │
│                    │         │                    │
│  ┌──────────────┐  │  API    │  ┌──────────────┐  │
│  │   Service    │──┼────────►│  │   Facade     │  │
│  └──────────────┘  │  calls  │  └──────────────┘  │
│                    │         │         │          │
│  ┌──────────────┐  │ Events  │         ▼          │
│  │   Handler    │◄─┼─────────┼──  Publisher       │
│  └──────────────┘  │         │                    │
└────────────────────┘         └────────────────────┘
```

---

## 3. Synchronous API Operations

### {Operation1}

| Attribute | Value |
|-----------|-------|
| Name | {operation_name} |
| Purpose | {description} |
| Idempotent | {yes/no} |
| Tenant Required | Yes |

**Signature:**
```
{operationName}(ctx: TenantContext, input: {InputType}): Result<{OutputType}>
```

**Input Schema:**
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| {field1} | {type} | {yes/no} | {rules} |

**Output Schema:**
| Field | Type | Description |
|-------|------|-------------|
| {field1} | {type} | {description} |

**Error Codes:**
| Code | Condition | Recovery |
|------|-----------|----------|
| NOT_FOUND | {condition} | {action} |
| VALIDATION_ERROR | {condition} | {action} |

### {Operation2}

{Repeat for each operation from Step 03}

---

## 4. Error Contracts

### Standard Error Response

```json
{
  "error": {
    "code": "{ERROR_CODE}",
    "message": "{message}",
    "details": {},
    "request_id": "{id}",
    "timestamp": "{ISO8601}"
  }
}
```

### Error Code Reference

| Code | HTTP Status | Retryable | Consumer Action |
|------|-------------|-----------|-----------------|
| NOT_FOUND | 404 | No | Handle gracefully |
| UNAUTHORIZED | 403 | No | Log security event |
| VALIDATION_ERROR | 400 | No | Fix input |
| INTERNAL_ERROR | 500 | Yes | Retry with backoff |

---

## 5. Event Contracts

### Event Envelope Standard

```json
{
  "event_id": "uuid",
  "event_type": "{module}.{entity}.{action}",
  "version": "1.0.0",
  "timestamp": "ISO8601",
  "tenant_id": "uuid",
  "payload": {}
}
```

### Published Events

#### {source_module}.{entity}.{action}

| Attribute | Value |
|-----------|-------|
| Type | {event_type} |
| Version | 1.0.0 |
| Trigger | {when emitted} |

**Payload:**
| Field | Type | Description |
|-------|------|-------------|
| {field1} | {type} | {description} |

### Consumed Events

| Event Type | Handler | Idempotency |
|------------|---------|-------------|
| {event1} | {handler1} | event_id + tenant_id |

---

## 6. Dead Letter Queue

### DLQ Configuration

| Setting | Value |
|---------|-------|
| Max Retries | 3 |
| Retry Backoff | Exponential |
| DLQ Topic | {dlq_topic_name} |
| Alert Threshold | 100 per tenant |

### Error Categories

| Category | Retry | Resolution |
|----------|-------|------------|
| TRANSIENT | Yes | Automatic |
| VALIDATION | No | Fix data |
| TENANT_INACTIVE | No | Await activation |

---

## 7. Tenant Context Requirements

### Context Structure

```json
{
  "tenant_id": "uuid",
  "tier": "free|pro|enterprise",
  "user_id": "uuid",
  "permissions": ["read", "write"]
}
```

### Enforcement Points

| Point | Validation | Failure |
|-------|------------|---------|
| Facade Entry | tenant_id present | 401 |
| Data Access | tenant_id matches | 403 |
| Event Publish | tenant_id in envelope | Reject |

---

## 8. Versioning Strategy

### Contract Versioning

| Change Type | Version Impact | Migration |
|-------------|----------------|-----------|
| Add optional field | Patch | None |
| Add required field | Minor | Consumer update |
| Breaking change | Major | Migration period |

### Compatibility Rules

- Backward compatible changes: Deploy provider first
- Breaking changes: Coordinate with all consumers
- Deprecation period: 30 days minimum

---

## 9. Testing Strategy

### Contract Tests

| Test Type | Scope | Owner |
|-----------|-------|-------|
| Consumer Contract | API expectations | Consumer |
| Provider Verification | API compliance | Provider |
| Integration | End-to-end flow | Both |

### Test Scenarios

| Scenario | Input | Expected | Tenant |
|----------|-------|----------|--------|
| Success | Valid | Success response | Same tenant |
| Not found | Invalid ID | 404 | Same tenant |
| Cross-tenant | Valid | 403 | Different tenant |

---

## 10. Architecture Decisions

| Decision | Rationale | Date |
|----------|-----------|------|
| {decision_1} | {rationale} | {{date}} |
| {decision_2} | {rationale} | {{date}} |

---

## 11. References

- Source Module: `{output_folder}/planning-artifacts/module-{source}-architecture.md`
- Target Module: `{output_folder}/planning-artifacts/module-{target}-architecture.md`
- Integration Domain: `{project-root}/_bmad/bam/data/domains/integration.md`
- Facade Pattern: `{project-root}/_bmad/bam/data/patterns/facade.md`

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | {{date}} | {{author}} | Initial facade contract |
```

Search the web: "facade contract documentation best practices {date}"

### 3. QG-I1 Soft Gate Checkpoint

**Run Convergence Gate verification:**

```markdown
## QG-I1: Convergence Gate Checkpoint

### Core Requirements

| Check | Status | Evidence |
|-------|--------|----------|
| Source/target modules identified | {PASS/FAIL} | {modules} |
| All required operations defined | {PASS/FAIL} | {operation count} |
| Input/output schemas complete | {PASS/FAIL} | {schema count} |
| Error contracts specified | {PASS/FAIL} | {error codes} |
| Event contracts defined | {PASS/FAIL} | {event count} |
| Tenant context in all operations | {PASS/FAIL} | {verification} |
| Tenant context in all events | {PASS/FAIL} | {verification} |
| Versioning strategy defined | {PASS/FAIL} | {strategy} |
| Testing strategy planned | {PASS/FAIL} | {test types} |

### Critical Checks (Must Pass)

- [ ] **CRITICAL:** All facade operations require TenantContext
- [ ] **CRITICAL:** All events include tenant_id in envelope
- [ ] **CRITICAL:** Error contracts handle cross-tenant rejection
- [ ] **CRITICAL:** No circular dependencies introduced
- [ ] **CRITICAL:** Contract version specified

### Gate Outcome

| Outcome | Criteria |
|---------|----------|
| **PASS** | All checks pass, all critical checks pass |
| **CONDITIONAL** | Non-critical gaps, all critical pass |
| **FAIL** | Any critical check fails |

**Current Outcome:** {PASS/CONDITIONAL/FAIL}

**If CONDITIONAL:**
| Gap | Mitigation | Deadline |
|-----|------------|----------|
| {gap} | {plan} | {date} |

**If FAIL:**
Return to failed step and address critical issues before proceeding.
```

### 4. Save Document

**Save compiled document to planning-artifacts:**

```
{output_folder}/planning-artifacts/facade-{source}-{target}-contract.md
```

**Verify file saved successfully.**

### 5. Generate Implementation Guidance

**Create consumer integration guide:**

```markdown
## Consumer Integration Guide

### Getting Started

1. **Add Facade Dependency**
   - Import {SourceModule}Facade interface
   - Configure circuit breaker settings
   - Set up retry policies

2. **Implement Tenant Context Propagation**
   - Extract TenantContext from request
   - Pass to all facade calls
   - Include in event subscriptions

3. **Handle Errors**
   - Check error codes before processing
   - Implement retry for transient errors
   - Log UNAUTHORIZED as security events

4. **Subscribe to Events**
   - Implement idempotency checking
   - Set up dead letter queue handling
   - Monitor event processing latency

### Key Integration Notes

- All facade calls MUST include TenantContext
- All event handlers MUST verify tenant_id
- Use circuit breaker for facade calls
- Implement exponential backoff for retries
```

---

## COLLABORATION MENUS (A/P/C)

After presenting compiled document and QG-I1 checkpoint:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific document sections
- **P (Party Mode)**: Bring architect, security, and consumer perspectives
- **C (Continue)**: Accept document and complete workflow

Select an option:
```

### If 'A' (Advanced Elicitation)

Invoke `bmad-advanced-elicitation` skill to explore:

- **Document completeness:** Are there missing sections or decisions?
- **QG-I1 gaps:** How can conditional items be addressed?
- **Consumer concerns:** Are there unclear integration details?
- **Contract evolution:** How will this contract change over time?
- **Testing gaps:** Are there scenarios not covered?

Pass context: Compiled document, QG-I1 results, specific concerns.

**After processing enhanced insights, return to A/P/C menu.**

### If 'P' (Party Mode)

Invoke `bmad-party-mode` skill with context:

```
Review compiled facade contract:
Source: {source_module}
Target: {target_module}
QG-I1 status: {PASS/CONDITIONAL/FAIL}
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| Integration Architect | Completeness | Is the contract fully specified? |
| Security | Tenant isolation | Are all isolation requirements documented? |
| Consumer Developer | Usability | Can this be implemented as documented? |
| QA Engineer | Testability | Are all test scenarios covered? |

Process multi-perspective review and identify any gaps.

**After processing perspectives, return to A/P/C menu.**

### If 'C' (Continue)

1. Verify document saved:

```bash
# Confirm file exists
ls {output_folder}/planning-artifacts/facade-{source}-{target}-contract.md
```

2. Update workflow state:

```yaml
stepsCompleted:
  - step-01-c-start
  - step-02-c-analyze
  - step-03-c-design
  - step-04-c-document
  - step-05-c-complete  # Add this
workflowStatus: complete
qg_i1_status: {PASS/CONDITIONAL/FAIL}
```

3. Generate completion summary.

---

## SUCCESS METRICS

- ✅ Facade contract template loaded
- ✅ All sections populated from Steps 01-04
- ✅ QG-I1 checkpoint completed
- ✅ All critical checks pass
- ✅ Document saved to planning-artifacts
- ✅ Consumer integration guide generated
- ✅ Web search performed for documentation best practices
- ✅ User confirmed document via A/P/C menu
- ✅ Workflow marked complete

---

## FAILURE MODES

- ❌ Missing template - cannot compile without structure
- ❌ Incomplete sections - previous steps not completed
- ❌ QG-I1 critical failure - must address before completing
- ❌ Save failure - document not persisted
- ❌ Missing tenant context - critical isolation gap
- ❌ Proceeding without A/P/C confirmation - user not engaged
- ❌ Skipping web search - may miss documentation best practices

---

## WORKFLOW COMPLETE

**Facade contract workflow completed successfully.**

### Summary

| Item | Status |
|------|--------|
| Source Module | {source_module} |
| Target Module | {target_module} |
| Document | `{output_folder}/planning-artifacts/facade-{source}-{target}-contract.md` |
| QG-I1 | {PASS/CONDITIONAL/FAIL} |
| Operations | {count} |
| Events | {published_count} published, {consumed_count} consumed |

### Next Steps

1. **If QG-I1 PASS:**
   - Share contract with consumer team
   - Begin implementation on both sides
   - Set up contract tests

2. **If QG-I1 CONDITIONAL:**
   - Address gaps per mitigation plan
   - Schedule re-validation before implementation

3. **Related Workflows:**
   - `bmad-bam-convergence-verification` - Full QG-I1 verification
   - `bmad-bam-evolve-facade-contract` - Contract evolution
   - `bmad-bam-facade-mismatch-recovery` - Resolve contract issues

### Validation Workflow

To validate this facade contract later, run:
```
bmad-bam-facade-contract (Validate mode)
```

This will verify the contract against QG-I1 criteria.

---

## NEXT STEP

Workflow complete. Based on gate decision:

| Decision | Next Steps |
|----------|------------|
| **PASS** | Proceed to implementation, share with consumer |
| **CONDITIONAL** | Address documented gaps before implementation |
| **FAIL** | Return to failed step, fix critical issues |
