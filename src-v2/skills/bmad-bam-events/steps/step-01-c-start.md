# Step 01: Initialize Event-Driven Architecture Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Initialize event architecture design context
- 💾 Track: `stepsCompleted: [1]` when complete
- 📖 Context: Load tenant model, AI runtime, and event patterns
- 🚫 Do NOT: Design event schemas (that's Step 02)
- 🔍 Use web search: Verify event patterns against current best practices
- ⚠️ Gate: Event architecture feeds into QG-M2 (Tenant Isolation)

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading tenant model and AI runtime configuration
- Identifying event domains (domain events, integration events, system events)
- Establishing event architecture design context
- Loading event patterns from pattern registry

**OUT OF SCOPE:**
- Designing event schemas (Step 02)
- Designing event routing (Step 03)
- Designing event processing (Step 04)

---

## Purpose

Initialize the event-driven architecture design workflow by loading tenant model configuration, AI runtime settings, and event patterns from the pattern registry. This step establishes the context for designing tenant-aware event systems.

---

## Prerequisites

- Master architecture document exists with tenant model selection
- AI runtime configuration defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: event-driven
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`
- **Load patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`

---

## Inputs

- Master architecture: `{output_folder}/planning-artifacts/architecture/master-architecture.md`
- Module architectures: `{output_folder}/planning-artifacts/modules/*/architecture.md`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Load configuration and establish the event architecture design context.

---

## Main Sequence

### 1. Load Tenant Model Configuration

Load the master architecture and extract tenant model selection:

```
{output_folder}/planning-artifacts/architecture/master-architecture.md
```

Extract:

| Configuration | Value |
|---------------|-------|
| Tenant Model | {{tenant_model}} (row-level-security / schema-per-tenant / database-per-tenant) |
| Tenant ID Strategy | {{strategy}} (UUID / composite / hierarchical) |
| Cross-Tenant Access | {{access}} (forbidden / controlled / none) |

If master architecture does not exist, inform user and halt workflow.

### 2. Load AI Runtime Configuration

Extract AI runtime settings relevant to event processing:

| Configuration | Value |
|---------------|-------|
| AI Runtime | {{ai_runtime}} (langgraph / crewai / autogen / dspy / instructor) |
| Agent Communication | {{comm}} (event-driven / direct / hybrid) |
| State Persistence | {{persistence}} (event-sourced / snapshot / hybrid) |

### 3. Load Event Patterns from Registry

Load event-driven patterns from pattern registry:

**Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: category = `event-driven`

| Pattern ID | Name | Decision Criteria |
|------------|------|-------------------|
| event-sourcing | Event Sourcing | Full audit trail, temporal queries, replay capability |
| cqrs | CQRS | Read/write optimization, separate scaling |
| saga-orchestration | Saga Orchestration | Long-running transactions, compensation |
| event-notification | Event Notification | Loose coupling, fire-and-forget |
| event-carried-state | Event-Carried State Transfer | Consumer autonomy, reduced coupling |

### 4. Identify Event Domains

Categorize events into three domains:

#### 4.1 Domain Events

Events that represent business state changes within a bounded context:

| Event Type | Description | Example |
|------------|-------------|---------|
| Entity Lifecycle | Create, update, delete operations | `TenantCreated`, `UserUpdated` |
| Business Process | Business rule outcomes | `OrderFulfilled`, `PaymentProcessed` |
| Aggregate Changes | Domain model state changes | `InvoiceApproved`, `SubscriptionRenewed` |

#### 4.2 Integration Events

Events that cross bounded context or module boundaries:

| Event Type | Description | Example |
|------------|-------------|---------|
| Cross-Module | Events consumed by other modules | `TenantOnboarded`, `BillingCycleCompleted` |
| External System | Events to/from external systems | `PaymentGatewayConfirmed`, `WebhookReceived` |
| Saga Coordination | Multi-module transaction coordination | `OrderSagaStep2Completed` |

#### 4.3 System Events

Infrastructure and operational events:

| Event Type | Description | Example |
|------------|-------------|---------|
| Infrastructure | Platform health and metrics | `DatabaseConnectionPoolExhausted` |
| Security | Authentication and authorization | `SuspiciousAccessDetected` |
| AI Runtime | Agent execution events | `AgentRunStarted`, `ToolExecutionCompleted` |

### 5. Establish Event Architecture Constraints

Based on tenant model, define event constraints:

| Tenant Model | Event Partitioning | Isolation Level | Replay Scope |
|--------------|-------------------|-----------------|--------------|
| Row-Level Security | Partition by tenant_id | Logical | Per-tenant replay |
| Schema-Per-Tenant | Separate event stores per schema | Schema-level | Schema replay |
| Database-Per-Tenant | Dedicated event stores | Physical | Full database replay |

### 6. Verify Current Best Practices

**Verify current best practices with web search:**
Search the web: "event-driven architecture multi-tenant patterns 2026"
Search the web: "CloudEvents specification best practices 2026"
Search the web: "Kafka multi-tenant partitioning strategies 2026"

Document any patterns that differ from pattern registry.

---

## SUCCESS METRICS:

- [ ] Tenant model configuration loaded
- [ ] AI runtime configuration extracted
- [ ] Event patterns loaded from registry
- [ ] Event domains identified (domain, integration, system)
- [ ] Event architecture constraints established
- [ ] Web search verification completed

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Master architecture missing | Create master architecture first |
| Tenant model undefined | Run tenant-model-isolation workflow |
| Pattern registry unavailable | Check BAM installation |
| Conflicting constraints | Review with architect |

---

## Verification

- [ ] Tenant model loaded correctly
- [ ] AI runtime configuration documented
- [ ] Event domains categorized
- [ ] Constraints align with tenant model
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant model configuration summary
- AI runtime event settings
- Event domain categorization
- Architecture constraints matrix
- Web search findings

---

## NEXT STEP:

Proceed to `step-02-c-analyze.md` to design event schemas with tenant awareness.
