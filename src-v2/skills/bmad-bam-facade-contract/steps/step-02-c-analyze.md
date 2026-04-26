# Step 2: Analyze Integration Requirements

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER analyze integration without loading Step 01 module selection first
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ✅ CRITICAL: Map all operations the target module requires from source
- 📋 Document all events that flow between modules with tenant context
- 💬 Present integration analysis with A/P/C menu for user confirmation
- 🌐 Use web search to verify current integration analysis best practices

---

## EXECUTION PROTOCOLS

- 🎯 Analyze specific integration requirements between modules
- 💾 Record integration analysis in working document for Step 03
- 📖 Reference `domains/integration.md` for contract patterns
- 📖 Reference `patterns/facade.md` for facade contract structure
- 🚫 DO NOT proceed without explicit user confirmation via A/P/C
- ⚠️ Flag integration patterns that violate module boundaries
- 🔍 Use web search to verify integration patterns against current best practices

---

## CONTEXT BOUNDARIES

This step operates within these boundaries:

- **Input context:** Source and target modules from Step 01
- **Domain file:** `{project-root}/_bmad/bam/data/domains/integration.md`
- **Pattern file:** `{project-root}/_bmad/bam/data/patterns/facade.md`
- **Output:** Integration requirements analysis with operation and event mapping
- **Quality gate:** Analysis informs QG-I1 (Convergence) checklist

---

## YOUR TASK

Analyze the specific integration requirements between the source (provider) and target (consumer) modules. Map all operations the target needs, identify event flows, define data contracts, and ensure tenant context propagation is designed correctly.

---

## Main Sequence

### 1. Analyze Required Operations

Examine the target module's dependencies and map to source operations:

| Target Dependency | Source Operation | Purpose | Required |
|-------------------|------------------|---------|----------|
| {dependency_1} | {operation_1} | {why needed} | {yes/no} |
| {dependency_2} | {operation_2} | {why needed} | {yes/no} |
| {dependency_3} | {operation_3} | {why needed} | {yes/no} |

**Operation Mapping Template:**

```markdown
### Operation Requirements Analysis

**Consumer Module:** {target_module}
**Provider Module:** {source_module}
**Facade:** {source_facade_name}

#### Required Operations

##### {Operation1}

| Attribute | Consumer Need | Provider Capability | Match |
|-----------|---------------|---------------------|-------|
| Operation Name | {expected_name} | {actual_name} | {yes/no/partial} |
| Input Schema | {expected_input} | {provided_input} | {yes/no/partial} |
| Output Schema | {expected_output} | {provided_output} | {yes/no/partial} |
| Tenant Context | Required | {present/absent} | {yes/no} |
| Idempotency | {required/optional} | {supported/not} | {yes/no} |

**Gap Analysis:**
- Input gaps: {list of missing input fields}
- Output gaps: {list of missing output fields}
- Contract gaps: {list of mismatches}
```

Search the web: "API contract consumer-driven analysis {date}"

---

### 2. Analyze Event Dependencies

Map events that flow from source to target:

| Event | Publisher | Subscriber | Payload | Tenant Scoped |
|-------|-----------|------------|---------|---------------|
| {event_1} | {source} | {target} | {schema} | {yes/no} |
| {event_2} | {source} | {target} | {schema} | {yes/no} |

**Event Flow Analysis Template:**

```markdown
### Event Flow Analysis

#### Source Module Publishes → Target Module Consumes

##### {EventName}

| Attribute | Publisher Definition | Consumer Expectation | Match |
|-----------|---------------------|---------------------|-------|
| Event Type | {type} | {expected_type} | {yes/no} |
| Payload Schema | {schema} | {expected_schema} | {yes/no} |
| Tenant Context | {present} | Required | {yes/no} |
| Ordering | {guaranteed/best-effort} | {requirement} | {yes/no} |
| Idempotency Key | {key_structure} | {expected} | {yes/no} |

**Event Contract:**
```
{
  "event_id": "uuid",
  "event_type": "{source_module}.{action}",
  "tenant_id": "uuid",           // REQUIRED
  "timestamp": "ISO8601",
  "version": "1.0.0",
  "payload": {
    "{field1}": "{type}",
    "{field2}": "{type}"
  }
}
```

**Consumer Handler Requirements:**
- Idempotency: Process same event_id only once
- Tenant isolation: Verify tenant_id before processing
- Error handling: Dead letter queue for failed events
```

Search the web: "event contract analysis multi-tenant {date}"

---

### 3. Define Shared Data Contracts

Identify DTOs and shared types that cross module boundaries:

| DTO Name | Used By Operation | Fields | Tenant Fields |
|----------|-------------------|--------|---------------|
| {DTO1} | {operation} | {field_list} | tenant_id |
| {DTO2} | {operation} | {field_list} | tenant_id |

**Data Contract Template:**

```markdown
### Shared Data Contracts

#### {DTOName}

**Used by:** {operation_name}
**Direction:** {Input/Output/Both}

| Field | Type | Required | Validation | Tenant Scope |
|-------|------|----------|------------|--------------|
| tenant_id | UUID | Yes | Must match context | Isolation key |
| {field1} | {type} | {yes/no} | {rules} | Scoped |
| {field2} | {type} | {yes/no} | {rules} | Scoped |

**Serialization:**
- Format: JSON
- Null handling: Omit null fields
- Date format: ISO8601

**Versioning:**
- Current: v1.0.0
- Evolution: Additive only (no breaking changes)
```

Search the web: "DTO contract design API versioning {date}"

---

### 4. Analyze Tenant Context Requirements

Define how tenant context must flow through the integration:

| Integration Point | Tenant Context | Propagation | Verification |
|-------------------|----------------|-------------|--------------|
| API Call | Required in header | Extracted by middleware | Validated at facade |
| Event Envelope | Required in payload | Included by publisher | Checked by consumer |
| DTO Fields | Entity references | Scoped to tenant | Filtered at repository |

**Tenant Context Flow Diagram:**

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Cross-Module Tenant Flow                         │
│                                                                      │
│  ┌──────────────────┐         ┌──────────────────┐                 │
│  │  Target Module   │         │  Source Module   │                 │
│  │  (Consumer)      │         │  (Provider)      │                 │
│  │                  │         │                  │                 │
│  │  ┌────────────┐  │   API   │  ┌────────────┐  │                 │
│  │  │  Service   │──┼────────►│  │   Facade   │  │                 │
│  │  └────────────┘  │  ctx    │  └────────────┘  │                 │
│  │       │          │         │       │          │                 │
│  │       │          │         │       │          │                 │
│  │       ▼          │         │       ▼          │                 │
│  │  ┌────────────┐  │  Event  │  ┌────────────┐  │                 │
│  │  │  Handler   │◄─┼─────────┼──│  Publisher │  │                 │
│  │  └────────────┘  │  ctx    │  └────────────┘  │                 │
│  └──────────────────┘         └──────────────────┘                 │
│                                                                      │
│  Legend: ctx = TenantContext { tenant_id, tier, permissions }       │
└─────────────────────────────────────────────────────────────────────┘
```

**Tenant Context Verification Points:**

| Point | Verification | Failure Action |
|-------|--------------|----------------|
| Facade Entry | Validate tenant_id matches caller | Reject 403 |
| Event Receipt | Validate tenant_id in envelope | Dead letter |
| Data Access | Filter by tenant_id | Empty result |

Search the web: "tenant context propagation microservices {date}"

---

### 5. Identify Integration Risks

Assess risks in the integration design:

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Schema mismatch | Contract failure | Medium | Contract tests |
| Missing tenant context | Data leak | High | Mandatory validation |
| Version drift | Integration break | Medium | Semantic versioning |
| Event loss | Data inconsistency | Low | Dead letter queue |
| Circular dependency | Architecture violation | Low | Dependency analysis |

**Risk Assessment Template:**

```markdown
### Integration Risk Assessment

**Risk Level:** {Low/Medium/High}

#### High-Impact Risks

1. **{Risk Name}**
   - Impact: {description}
   - Likelihood: {probability}
   - Mitigation: {strategy}
   - Monitoring: {how to detect}

#### Tenant Isolation Risks

| Risk | Scenario | Prevention |
|------|----------|------------|
| Cross-tenant read | Consumer accesses wrong tenant data | Facade validates tenant_id |
| Cross-tenant event | Event delivered to wrong tenant | Envelope tenant_id check |
| Tenant ID spoofing | Caller provides fake tenant_id | JWT validation at API gateway |
```

Search the web: "integration risk analysis multi-tenant SaaS {date}"

---

## COLLABORATION MENUS (A/P/C)

After presenting complete integration analysis:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific integration questions
- **P (Party Mode)**: Bring integration architect, security, and ops perspectives
- **C (Continue)**: Accept analysis and proceed to design step

Select an option:
```

### If 'A' (Advanced Elicitation)

Invoke `bmad-advanced-elicitation` skill to explore:

- **Operation completeness:** Are all required operations mapped?
- **Event contracts:** Do event schemas meet consumer needs?
- **Tenant propagation:** Is context passed correctly everywhere?
- **Error handling:** How do failures propagate across modules?
- **Performance:** Are there latency or throughput concerns?

Pass context: Module selection from Step 01, current integration analysis.

**After processing enhanced insights, return to A/P/C menu.**

### If 'P' (Party Mode)

Invoke `bmad-party-mode` skill with context:

```
Review integration analysis for:
Source: {source_module} → Target: {target_module}
Operations: {count} mapped
Events: {count} identified
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| Integration Architect | Contract completeness | Are all integration needs addressed? |
| Security Engineer | Tenant isolation | Is tenant context enforced everywhere? |
| Platform Engineer | Operability | Can this integration be monitored? |
| Developer | Implementability | Is the contract clear and usable? |

Process multi-perspective analysis and synthesize into refined requirements.

**After processing perspectives, return to A/P/C menu.**

### If 'C' (Continue)

1. Record the integration analysis in working document:

```yaml
# Add to facade-analysis.md
source_module: {source_name}
target_module: {target_name}
operations:
  required:
    - name: {operation1}
      match: {yes/partial/no}
    - name: {operation2}
      match: {yes/partial/no}
events:
  consumed:
    - type: {event_type}
      tenant_scoped: true
shared_types:
  - name: {DTO1}
    fields: [{field_list}]
tenant_context:
  propagation: verified
  verification_points: [{points}]
risks:
  high: [{risks}]
  medium: [{risks}]
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

- ✅ All required operations mapped with match analysis
- ✅ Event flows documented with schemas
- ✅ Shared data contracts defined
- ✅ Tenant context requirements specified
- ✅ Integration risks identified with mitigations
- ✅ Web search performed for integration patterns
- ✅ Step 01 module selection referenced
- ✅ User confirmed analysis via A/P/C menu
- ✅ Analysis recorded in working document

---

## FAILURE MODES

- ❌ Skipping operation mapping - incomplete contract
- ❌ Analyzing without Step 01 context - no module context
- ❌ Missing tenant context - isolation violations possible
- ❌ Unidentified events - async integration gaps
- ❌ No risk assessment - surprises in production
- ❌ Proceeding without A/P/C confirmation - user not engaged
- ❌ Skipping web search - may miss current best practices

---

## NEXT STEP

After user confirms integration analysis with 'C':

1. Record the analysis in working document
2. Proceed to `step-03-c-design.md` to design the facade API contract
3. The analysis informs:
   - Facade operation signatures
   - Event contract specifications
   - DTO definitions
   - Tenant context enforcement

**Transition to Step 03 with:**
- Operations: `{operation_mapping}`
- Events: `{event_list}`
- DTOs: `{shared_types}`
- Tenant: `{context_requirements}`
- Risks: `{risk_assessment}`
