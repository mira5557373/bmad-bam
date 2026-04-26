# Step 02: Design Event Schema Architecture

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Design tenant-aware event schema architecture
- 💾 Track: `stepsCompleted: [1, 2]` when complete
- 📖 Context: Event envelope, versioning, CloudEvents compliance
- 🚫 Do NOT: Design event routing (that's Step 03)
- 🔍 Use web search: Verify schema patterns against current best practices
- ⚠️ Gate: Event schemas feed into QG-M2 (Tenant Isolation)

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Designing event envelope with tenant_id and correlation_id
- Defining schema versioning strategy
- Ensuring CloudEvents compliance
- Creating event catalog structure

**OUT OF SCOPE:**
- Event routing and partitioning (Step 03)
- Event processing and consumers (Step 04)
- Compiling final architecture (Step 05)

---

## Purpose

Design the event schema architecture including tenant-aware event envelopes, schema versioning strategy, CloudEvents compliance, and event catalog structure. This ensures all events maintain proper tenant isolation and support backward compatibility.

---

## Prerequisites

- Step 01 completed: Context established
- Tenant model configuration loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: event-schema

---

## Inputs

- Event domain categorization from Step 01
- Tenant model constraints from Step 01
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Design event schemas with tenant awareness and versioning strategy.

---

## Main Sequence

### 1. Design Event Envelope Structure

Define the base event envelope with mandatory tenant context:

#### 1.1 CloudEvents Base Envelope

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| specversion | string | YES | CloudEvents spec version (1.0) |
| id | string | YES | Unique event identifier (UUID) |
| source | URI | YES | Event source (module/service identifier) |
| type | string | YES | Event type (reverse-DNS notation) |
| time | timestamp | YES | Event timestamp (RFC 3339) |
| datacontenttype | string | YES | Content type (application/json) |
| data | object | YES | Event payload |

#### 1.2 BAM Extension Attributes

Multi-tenant extensions to CloudEvents:

| Extension | Type | Required | Description |
|-----------|------|----------|-------------|
| tenantid | string | YES | Tenant identifier (CRITICAL for isolation) |
| correlationid | string | YES | Request correlation ID for tracing |
| causationid | string | CONDITIONAL | ID of event that caused this event |
| schemaversion | string | YES | Schema version (semantic versioning) |
| partitionkey | string | YES | Partitioning key (typically tenant_id) |
| sequencenumber | integer | CONDITIONAL | Ordering within partition |
| tier | string | CONDITIONAL | Tenant tier (free/pro/enterprise) |
| region | string | CONDITIONAL | Regional partition identifier |

#### 1.3 Event Envelope Template

```yaml
# Event Envelope Structure (CloudEvents 1.0 + BAM Extensions)
envelope:
  # CloudEvents Base
  specversion: "1.0"
  id: "{{uuid}}"
  source: "/modules/{{module_name}}/v{{version}}"
  type: "com.{{org}}.{{module}}.{{event_name}}.v{{major}}"
  time: "{{iso8601_timestamp}}"
  datacontenttype: "application/json"
  
  # BAM Multi-Tenant Extensions
  tenantid: "{{tenant_id}}"           # CRITICAL: Never omit
  correlationid: "{{correlation_id}}"
  causationid: "{{causing_event_id}}" # If event-triggered
  schemaversion: "{{major}}.{{minor}}.{{patch}}"
  partitionkey: "{{tenant_id}}"       # Default partition strategy
  
  # Event Payload
  data:
    # Event-specific fields
```

### 2. Define Schema Versioning Strategy

#### 2.1 Versioning Rules

| Change Type | Version Bump | Backward Compatible |
|-------------|--------------|---------------------|
| New optional field | PATCH | YES |
| New required field | MAJOR | NO |
| Remove field | MAJOR | NO |
| Rename field | MAJOR | NO |
| Change field type | MAJOR | NO |
| Add enum value | MINOR | YES |
| Remove enum value | MAJOR | NO |

#### 2.2 Schema Evolution Patterns

| Pattern | Description | Use When |
|---------|-------------|----------|
| **Additive Only** | Only add optional fields | Default approach |
| **Dual-Write** | Publish both old and new versions | Migration period |
| **Schema Registry** | Centralized schema validation | Complex schemas |
| **Tolerant Reader** | Consumers ignore unknown fields | High decoupling |

#### 2.3 Version Negotiation

| Approach | Description | Consumer Behavior |
|----------|-------------|-------------------|
| Type-based | Version in event type | Subscribe to specific version |
| Header-based | Version in extension | Check schemaversion header |
| Payload-based | Version in data | Parse and route internally |

**Recommended:** Type-based versioning with schemaversion extension for metadata.

### 3. Ensure CloudEvents Compliance

#### 3.1 Compliance Checklist

| Requirement | Status | Notes |
|-------------|--------|-------|
| specversion = "1.0" | Required | CloudEvents spec version |
| id is unique | Required | UUID v4 recommended |
| source is URI | Required | Module identifier |
| type is reverse-DNS | Required | com.org.module.event.v1 |
| time is RFC 3339 | Required | ISO 8601 with timezone |
| Extensions are lowercase | Required | No uppercase in extension names |
| Unknown extensions ignored | Required | Tolerant reader pattern |

#### 3.2 Transport Binding

| Transport | Binding | Content Mode |
|-----------|---------|--------------|
| Kafka | Protocol binding | Structured (JSON in value) |
| HTTP | Protocol binding | Binary or structured |
| AMQP | Protocol binding | Structured |
| Webhook | HTTP binding | Structured |

### 4. Create Event Catalog Structure

#### 4.1 Catalog Organization

```
events/
  domain/
    {{module}}/
      {{event-name}}.v1.schema.json
      {{event-name}}.v2.schema.json
  integration/
    {{cross-module-event}}.v1.schema.json
  system/
    {{system-event}}.v1.schema.json
  catalog.yaml                    # Master catalog index
```

#### 4.2 Catalog Entry Template

| Field | Description | Example |
|-------|-------------|---------|
| event_type | Fully qualified event type | com.acme.billing.InvoiceCreated.v1 |
| module | Owning module | billing |
| category | Event category | domain / integration / system |
| schema_path | Path to JSON schema | domain/billing/invoice-created.v1.schema.json |
| publishers | Publishing modules | [billing] |
| subscribers | Known subscribers | [notifications, analytics] |
| tenant_scoped | Tenant isolation | true / false |
| sla | Delivery guarantees | at-least-once / exactly-once |

#### 4.3 Sample Event Catalog

| Event Type | Category | Tenant Scoped | Publishers | Subscribers |
|------------|----------|---------------|------------|-------------|
| TenantCreated.v1 | domain | YES | tenant-mgmt | [billing, notifications, audit] |
| InvoiceGenerated.v1 | domain | YES | billing | [notifications, pdf-service] |
| PaymentReceived.v1 | integration | YES | payment-gateway | [billing, notifications] |
| AgentRunCompleted.v1 | system | YES | ai-runtime | [analytics, audit, billing] |

### 5. Verify Current Best Practices

**Verify current best practices with web search:**
Search the web: "CloudEvents specification multi-tenant extensions 2026"
Search the web: "event schema versioning best practices 2026"
Search the web: "JSON schema evolution patterns 2026"

Document any patterns that differ from design.

---

## COLLABORATION MENUS (A/P/C):

After completing the event schema design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific schema decisions
- **P (Party Mode)**: Bring architect perspectives for schema review
- **C (Continue)**: Accept schema design and proceed to event routing
- **[Specific schema]**: Describe schema to review further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: event envelope design, versioning strategy, catalog structure
- Process enhanced insights on schema patterns
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review event schema architecture for multi-tenant system: {summary}"
- Process Platform Architect (Atlas) and Integration Architect (Kai) perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document event schema design
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design.md`

---

## SUCCESS METRICS:

- [ ] Event envelope structure defined with tenant context
- [ ] Schema versioning strategy documented
- [ ] CloudEvents compliance verified
- [ ] Event catalog structure established
- [ ] Sample events documented

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Missing tenant_id in envelope | CRITICAL - Add tenant_id extension |
| Breaking schema change needed | Use dual-write migration pattern |
| CloudEvents non-compliance | Review against CloudEvents spec |
| Catalog structure unclear | Review with Integration Architect |

---

## Verification

- [ ] Envelope includes mandatory tenant context
- [ ] Versioning strategy supports backward compatibility
- [ ] CloudEvents compliance checklist passes
- [ ] Catalog structure is maintainable
- [ ] Patterns align with pattern registry

---

## Outputs

- Event envelope template
- Schema versioning strategy document
- CloudEvents compliance matrix
- Event catalog structure
- Sample event schemas

---

## NEXT STEP:

Proceed to `step-03-c-design.md` to design event routing with tenant awareness.
