# Step 4: Design Event Contracts

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER design event contracts without completing Step 03 facade design first
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ✅ CRITICAL: Define ALL event contracts with tenant context in envelope
- 📋 Document event schemas, ordering guarantees, and idempotency
- 💬 Present event design with A/P/C menu for user confirmation
- 🌐 Use web search to verify current event-driven design best practices

---

## EXECUTION PROTOCOLS

- 🎯 Design event contracts for asynchronous integration
- 💾 Record event design in working document for Step 05
- 📖 Reference Step 02 integration analysis for event requirements
- 📖 Reference Step 03 facade design for synchronous contracts
- 🚫 DO NOT proceed without explicit user confirmation via A/P/C
- ⚠️ Flag events that don't include tenant context
- 🔍 Use web search to verify event contract patterns against current best practices

---

## CONTEXT BOUNDARIES

This step operates within these boundaries:

- **Input context:** Facade API design from Step 03, event list from Step 02
- **Domain file:** `{project-root}/_bmad/bam/data/domains/integration.md`
- **Pattern file:** `{project-root}/_bmad/bam/data/patterns/event-driven.md`
- **Output:** Event contract specifications with schemas and guarantees
- **Quality gate:** Design informs QG-I1 (Convergence) checklist

---

## YOUR TASK

Design the event contracts for asynchronous communication between modules. Define event envelope structure, payload schemas, ordering guarantees, idempotency requirements, and dead letter handling. All events must include tenant context for isolation.

---

## Main Sequence

### 1. Design Event Envelope Standard

Define the standard event envelope structure:

```markdown
### Event Envelope Contract

All events between modules MUST use this envelope structure:

```json
{
  "event_id": "uuid",
  "event_type": "{source_module}.{action}",
  "version": "1.0.0",
  "timestamp": "ISO8601",
  "tenant_id": "uuid",          // REQUIRED: Tenant isolation
  "correlation_id": "uuid",     // Optional: Request tracing
  "causation_id": "uuid",       // Optional: Causal chain
  "metadata": {
    "source_module": "{module_name}",
    "producer_version": "{semver}"
  },
  "payload": {
    // Event-specific data
  }
}
```

### Envelope Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| event_id | UUID | Yes | Unique event identifier for idempotency |
| event_type | string | Yes | Format: {module}.{entity}.{action} |
| version | semver | Yes | Event schema version |
| timestamp | ISO8601 | Yes | When event was produced |
| tenant_id | UUID | Yes | Tenant isolation key |
| correlation_id | UUID | No | Request correlation for tracing |
| causation_id | UUID | No | ID of event that caused this one |
| metadata | object | No | Additional context |
| payload | object | Yes | Event-specific data |

### Event Type Naming Convention

```
{source_module}.{entity}.{action}

Examples:
- billing.subscription.created
- identity.user.activated
- notification.email.sent
```
```

Search the web: "event envelope design patterns distributed systems {date}"

---

### 2. Define Published Events

Design each event the source module publishes:

**Published Event Template:**

```markdown
### Event: {source_module}.{entity}.{action}

| Attribute | Value |
|-----------|-------|
| Event Type | {source_module}.{entity}.{action} |
| Version | 1.0.0 |
| Publisher | {source_module} |
| Subscribers | {target_module}, {other_modules} |
| Trigger | {when this event is emitted} |
| Ordering | {strict/best-effort} |

**Schema:**
```json
{
  "event_id": "uuid",
  "event_type": "{source_module}.{entity}.{action}",
  "version": "1.0.0",
  "timestamp": "2026-04-26T10:30:00Z",
  "tenant_id": "uuid",
  "payload": {
    "{entity}_id": "uuid",
    "{field1}": "{type}",
    "{field2}": "{type}",
    "changed_by": "uuid"   // Optional: actor ID
  }
}
```

**Payload Fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| {entity}_id | UUID | Yes | Primary entity identifier |
| {field1} | {type} | Yes | {description} |
| {field2} | {type} | No | {description} |

**Publishing Conditions:**
1. Published after: {transaction committed / operation completed}
2. Ordering guarantee: {same tenant_id events in order / no guarantee}
3. Delivery: {at-least-once}

**Consumer Expectations:**
| Consumer | Handler | Purpose |
|----------|---------|---------|
| {target_module} | {HandlerName} | {what they do with it} |
```

**Events Published Summary:**

| Event Type | Trigger | Subscribers | Ordering |
|------------|---------|-------------|----------|
| {module}.{entity}.created | Entity created | {list} | Strict per tenant |
| {module}.{entity}.updated | Entity modified | {list} | Best effort |
| {module}.{entity}.deleted | Entity removed | {list} | Strict per tenant |

Search the web: "domain event design patterns {date}"

---

### 3. Define Consumed Events

Design handler contracts for events consumed from source:

**Consumed Event Template:**

```markdown
### Handler: {TargetModule}.{HandlerName}

| Attribute | Value |
|-----------|-------|
| Event Type | {source_module}.{entity}.{action} |
| Handler | {target_module}.{handler_name} |
| Idempotency | Required |
| Timeout | {processing_timeout} |

**Handling Contract:**

1. **Idempotency Check**
   - Key: `event_id + tenant_id`
   - Store: Processed events table
   - TTL: 7 days (or configurable)

2. **Tenant Validation**
   - Verify tenant_id exists and is active
   - Reject if tenant suspended/deleted
   - Log security event if tenant_id mismatch

3. **Processing Logic**
   - {describe what handler does}
   - {side effects}
   - {downstream events published}

4. **Error Handling**
   - Transient errors: Retry with backoff
   - Permanent errors: Dead letter queue
   - Max retries: 3 (configurable)

**Handler Implementation Notes:**
```
async function handle{EventName}(event: {EventType}): Promise<void> {
  // 1. Idempotency check
  if (await alreadyProcessed(event.event_id, event.tenant_id)) {
    return; // Skip duplicate
  }

  // 2. Validate tenant
  const tenant = await validateTenant(event.tenant_id);
  if (!tenant.active) {
    throw new TenantInactiveError(event.tenant_id);
  }

  // 3. Process event
  await processEventLogic(event.payload);

  // 4. Mark processed
  await markProcessed(event.event_id, event.tenant_id);
}
```
```

**Events Consumed Summary:**

| Event Type | Handler | Idempotency | DLQ |
|------------|---------|-------------|-----|
| {source}.{entity}.created | Create{Handler} | event_id + tenant_id | Yes |
| {source}.{entity}.updated | Update{Handler} | event_id + tenant_id | Yes |

Search the web: "event consumer idempotency patterns {date}"

---

### 4. Design Dead Letter Queue Handling

Define DLQ strategy for failed events:

```markdown
### Dead Letter Queue (DLQ) Contract

**DLQ Structure:**
```json
{
  "dlq_entry_id": "uuid",
  "original_event": {
    // Complete original event envelope
  },
  "failure_info": {
    "error_type": "{error_category}",
    "error_message": "{description}",
    "stack_trace": "{if available}",
    "failed_at": "ISO8601",
    "retry_count": 3,
    "last_handler": "{handler_name}"
  },
  "tenant_id": "uuid",
  "created_at": "ISO8601"
}
```

### DLQ Categories

| Error Category | Retry Strategy | Resolution |
|----------------|----------------|------------|
| TRANSIENT | Automatic retry 3x | Usually self-heals |
| VALIDATION | No retry | Fix event or handler |
| TENANT_INACTIVE | No retry | Wait for tenant activation |
| SCHEMA_MISMATCH | No retry | Version compatibility issue |
| HANDLER_ERROR | Manual review | Code bug or edge case |

### DLQ Processing Workflow

```
Failed Event
    │
    ▼
┌─────────────────────────────────────┐
│ Categorize Error                     │
│   - Transient? Retry                 │
│   - Permanent? DLQ                   │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│ Dead Letter Queue                    │
│   - Store with failure context       │
│   - Alert on threshold               │
│   - Manual review dashboard          │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│ Resolution                           │
│   - Fix and replay                   │
│   - Skip with documentation          │
│   - Escalate to dev team             │
└─────────────────────────────────────┘
```

### DLQ Monitoring

| Metric | Threshold | Alert |
|--------|-----------|-------|
| DLQ depth | > 100 per tenant | Warning |
| DLQ growth rate | > 10/minute | Critical |
| Age of oldest entry | > 24 hours | Warning |
| Same event type failures | > 50 | Critical |
```

Search the web: "dead letter queue patterns event-driven {date}"

---

### 5. Define Event Versioning Strategy

Plan for event schema evolution:

```markdown
### Event Versioning Strategy

**Version Format:** Semantic Versioning (semver)

| Change Type | Version Impact | Consumer Action |
|-------------|----------------|-----------------|
| Add optional field | Patch (1.0.0 → 1.0.1) | No action |
| Add required field | Minor (1.0.0 → 1.1.0) | Update handler |
| Remove field | Major (1.0.0 → 2.0.0) | Immediate update |
| Change field type | Major (1.0.0 → 2.0.0) | Immediate update |

### Backward Compatibility Rules

1. **NEVER remove required fields** without major version
2. **NEVER change field types** without major version
3. **ALWAYS add new fields as optional** first
4. **ALWAYS provide migration period** for breaking changes

### Multiple Version Support

```
Publisher supports: v1.0.0, v1.1.0, v2.0.0
Consumer declares: v1.1.0+

Event routing:
- v2.0.0 events → v2.0.0 handler
- v1.x.x events → v1.x.x handler (legacy)
```

### Version Negotiation

| Publisher Version | Consumer Version | Compatibility |
|-------------------|------------------|---------------|
| 2.0.0 | 2.0.0 | Full |
| 2.0.0 | 1.x.x | Requires adapter |
| 1.1.0 | 1.0.0 | Partial (new fields ignored) |
| 1.0.0 | 1.1.0 | Full (optional fields null) |
```

Search the web: "event schema versioning backwards compatibility {date}"

---

## COLLABORATION MENUS (A/P/C)

After presenting complete event contract design:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific event design questions
- **P (Party Mode)**: Bring event architect, reliability, and ops perspectives
- **C (Continue)**: Accept design and proceed to compile step

Select an option:
```

### If 'A' (Advanced Elicitation)

Invoke `bmad-advanced-elicitation` skill to explore:

- **Event completeness:** Are all integration events defined?
- **Ordering guarantees:** Do events need strict ordering?
- **Idempotency:** Is deduplication handled correctly?
- **DLQ strategy:** Is error handling comprehensive?
- **Versioning:** Is schema evolution planned?

Pass context: Step 03 facade design, current event design, specific concerns.

**After processing enhanced insights, return to A/P/C menu.**

### If 'P' (Party Mode)

Invoke `bmad-party-mode` skill with context:

```
Review event contract design for:
Source: {source_module} → Target: {target_module}
Published events: {count}
Consumed events: {count}
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| Event Architect | Contract quality | Are events well-designed and evolvable? |
| Reliability Eng | Fault tolerance | Is DLQ handling comprehensive? |
| Security | Tenant isolation | Is tenant_id enforced in all events? |
| Platform Eng | Operations | Can events be monitored and debugged? |

Process multi-perspective analysis and synthesize into refined design.

**After processing perspectives, return to A/P/C menu.**

### If 'C' (Continue)

1. Record the event contract design in working document:

```yaml
# Add to facade-events.md
source_module: {source_name}
target_module: {target_name}
events:
  published:
    - type: {source}.{entity}.created
      version: 1.0.0
      payload_schema: {schema_ref}
    - type: {source}.{entity}.updated
      version: 1.0.0
      payload_schema: {schema_ref}
  consumed:
    - type: {source}.{entity}.created
      handler: {handler_name}
      idempotency_key: event_id + tenant_id
envelope:
  tenant_context: required
  ordering: per_tenant_strict
dlq:
  enabled: true
  max_retries: 3
versioning:
  strategy: semver
  backwards_compatible: required
events_completed_at: {timestamp}
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

- ✅ Event envelope standard defined with tenant context
- ✅ All published events documented with schemas
- ✅ All consumed events have handler contracts
- ✅ DLQ strategy defined with categories
- ✅ Event versioning strategy documented
- ✅ Web search performed for event design patterns
- ✅ Step 03 facade design referenced
- ✅ User confirmed design via A/P/C menu
- ✅ Design recorded in working document

---

## FAILURE MODES

- ❌ Skipping event envelope - no standard structure
- ❌ Designing without Step 03 context - inconsistent with sync API
- ❌ Missing tenant_id in events - isolation broken
- ❌ No idempotency design - duplicate processing risk
- ❌ Undefined DLQ strategy - lost events
- ❌ No versioning plan - schema evolution breaks consumers
- ❌ Proceeding without A/P/C confirmation - user not engaged
- ❌ Skipping web search - may miss current best practices

---

## NEXT STEP

After user confirms event contract design with 'C':

1. Record the design in working document
2. Proceed to `step-05-c-complete.md` to compile facade contract document
3. The event contracts inform:
   - Integration documentation
   - Consumer implementation guide
   - QG-I1 verification criteria

**Transition to Step 05 with:**
- Facade API: `{from Step 03}`
- Events: `{published, consumed}`
- Envelope: `{standard structure}`
- DLQ: `{strategy}`
- Versioning: `{policy}`
