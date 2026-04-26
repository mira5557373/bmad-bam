# Step 04: Design Event Processing Architecture

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Design tenant-aware event processing architecture
- 💾 Track: `stepsCompleted: [1, 2, 3, 4]` when complete
- 📖 Context: Consumer groups, idempotency, ordering, saga orchestration
- 🚫 Do NOT: Compile final document (that's Step 05)
- 🔍 Use web search: Verify processing patterns against current best practices
- ⚠️ Gate: Event processing feeds into QG-M2 (Tenant Isolation) and QG-M3 (Agent Runtime)

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Configuring consumer group patterns
- Designing idempotency guarantees
- Establishing event ordering within tenant
- Defining saga orchestration patterns

**OUT OF SCOPE:**
- Topic naming and routing (Step 03)
- Compiling final architecture document (Step 05)

---

## Purpose

Design the event processing architecture including consumer group configuration for multi-tenant workloads, idempotency guarantees to prevent duplicate processing, event ordering within tenant boundaries, and saga orchestration patterns for distributed transactions.

---

## Prerequisites

- Step 03 completed: Event routing designed
- Topic naming and partitioning strategy defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: event-processing

---

## Inputs

- Topic naming convention from Step 03
- Partition strategy from Step 03
- Event catalog from Step 02
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Design event processing with consumer groups, idempotency, and saga orchestration.

---

## Main Sequence

### 1. Configure Consumer Group Patterns

#### 1.1 Consumer Group Naming Convention

```
{application}.{module}.{purpose}.{version}
```

| Segment | Description | Example |
|---------|-------------|---------|
| application | Application name | myapp |
| module | Consuming module | billing |
| purpose | Processing purpose | invoice-generator |
| version | Consumer version | v1 |

#### 1.2 Consumer Group Strategies

| Strategy | Description | Use Case |
|----------|-------------|----------|
| **Per-Module** | One group per consuming module | Default pattern |
| **Per-Feature** | Separate groups for different features | Feature isolation |
| **Per-Tenant-Tier** | Different groups by tenant tier | Tiered SLA |
| **Per-Region** | Regional consumer groups | Geo-distributed |

#### 1.3 Multi-Tenant Consumer Configuration

| Configuration | Value | Rationale |
|---------------|-------|-----------|
| Group ID | Include module identifier | Clear ownership |
| Auto-commit | DISABLED | Manual commit after processing |
| Max poll records | 100-500 | Balance throughput vs latency |
| Session timeout | 30s | Allow for processing time |
| Heartbeat interval | 10s | Early failure detection |

#### 1.4 Tenant-Aware Processing

| Concern | Implementation | Verification |
|---------|----------------|--------------|
| Tenant context extraction | Parse from event envelope | Unit test |
| Tenant context propagation | Thread-local or async context | Integration test |
| Tenant-scoped transactions | Set tenant before DB operations | E2E test |
| Tenant logging | Include tenant_id in all logs | Log audit |

### 2. Design Idempotency Guarantees

#### 2.1 Idempotency Key Strategy

| Strategy | Key Composition | Deduplication Window |
|----------|-----------------|----------------------|
| **Event ID** | event.id | Recommended (unique per event) |
| **Composite** | tenant_id + entity_id + event_type | For business operations |
| **Hash-based** | Hash of event payload | Content-based dedup |

**Recommended:** Use CloudEvents `id` field as primary idempotency key.

#### 2.2 Idempotency Store

| Approach | Storage | TTL | Use Case |
|----------|---------|-----|----------|
| In-memory cache | Redis/Memcached | 24 hours | High throughput |
| Database table | PostgreSQL | 7 days | Audit requirement |
| Event log | Event store | Infinite | Event sourcing |

#### 2.3 Idempotency Check Flow

```
Event Received
      │
      ▼
┌──────────────┐
│ Check Idemp. │
│    Store     │
└──────┬───────┘
       │
  Already   ◄── YES ── Return success (no-op)
 Processed?
       │
      NO
       │
       ▼
┌──────────────┐
│ Process Event│
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Mark as      │
│ Processed    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Commit Offset│
└──────────────┘
```

#### 2.4 Idempotency Table Schema

| Column | Type | Description |
|--------|------|-------------|
| idempotency_key | VARCHAR(255) PK | Event ID or composite key |
| tenant_id | VARCHAR(100) | Tenant identifier |
| event_type | VARCHAR(255) | Event type processed |
| processed_at | TIMESTAMP | When processed |
| response_hash | VARCHAR(64) | Hash of processing result |
| expires_at | TIMESTAMP | When record can be purged |

### 3. Establish Event Ordering Guarantees

#### 3.1 Ordering Requirements Matrix

| Event Type | Ordering Required | Scope | Strategy |
|------------|-------------------|-------|----------|
| Entity lifecycle | YES | Entity | Partition by entity_id |
| Business processes | YES | Saga | Sequence numbers |
| Notifications | NO | N/A | Any partition |
| Metrics/logs | NO | N/A | Any partition |

#### 3.2 Ordering Within Tenant

| Guarantee Level | Implementation | Trade-off |
|-----------------|----------------|-----------|
| **Tenant-ordered** | Partition by tenant_id | Scalability |
| **Entity-ordered** | Partition by tenant_id:entity_id | Complexity |
| **Saga-ordered** | Sequence numbers in saga | Coordination |
| **No ordering** | Any partition | Best throughput |

#### 3.3 Out-of-Order Handling

| Scenario | Detection | Resolution |
|----------|-----------|------------|
| Late arrival | Sequence gap detected | Buffer and wait (timeout) |
| Duplicate | Idempotency check fails | Skip processing |
| Missing event | Timeout waiting for sequence | Request replay or compensate |

#### 3.4 Sequence Number Management

| Field | Description | Example |
|-------|-------------|---------|
| sequence_number | Monotonic within partition | 12345 |
| expected_sequence | Next expected sequence | 12346 |
| saga_sequence | Position in saga | 3 of 5 |

### 4. Define Saga Orchestration Patterns

#### 4.1 Saga Pattern Selection

| Pattern | Description | Use When |
|---------|-------------|----------|
| **Choreography** | Events trigger next steps | Simple flows, loose coupling |
| **Orchestration** | Central coordinator | Complex flows, explicit control |
| **Hybrid** | Orchestration with event outputs | Complex with event notification |

#### 4.2 Saga State Machine

| State | Description | Transitions |
|-------|-------------|-------------|
| INITIATED | Saga started | STEP_1_PENDING |
| STEP_N_PENDING | Waiting for step completion | STEP_N_COMPLETED / STEP_N_FAILED |
| STEP_N_COMPLETED | Step succeeded | STEP_N+1_PENDING / COMPLETED |
| STEP_N_FAILED | Step failed | COMPENSATING |
| COMPENSATING | Running compensations | COMPENSATED |
| COMPLETED | Saga succeeded | Terminal |
| COMPENSATED | Saga rolled back | Terminal |
| FAILED | Compensation failed | Terminal (manual intervention) |

#### 4.3 Saga Configuration

| Configuration | Value | Rationale |
|---------------|-------|-----------|
| Step timeout | 30 seconds | Prevent stuck sagas |
| Saga timeout | 5 minutes | Overall saga limit |
| Retry per step | 3 attempts | Transient failure recovery |
| Compensation order | Reverse | Undo in reverse order |

#### 4.4 Tenant-Aware Saga

| Requirement | Implementation | Verification |
|-------------|----------------|--------------|
| Saga scoped to tenant | tenant_id in saga state | Unit test |
| Cross-tenant saga forbidden | Validate all steps same tenant | Integration test |
| Saga visibility | Filter by tenant_id | API test |
| Compensation isolation | Tenant context in compensations | E2E test |

#### 4.5 Saga Event Flow

```
Start Saga (tenant_id=ABC)
      │
      ▼
Step 1: Reserve Inventory
      │ emit: InventoryReserved
      ▼
Step 2: Process Payment
      │ emit: PaymentProcessed
      ▼
Step 3: Ship Order
      │ emit: OrderShipped
      ▼
Complete: OrderFulfilled

--- On Failure at Step 2 ---

Step 2 Failed: PaymentFailed
      │
      ▼
Compensate Step 1: Release Inventory
      │ emit: InventoryReleased
      ▼
Saga Compensated: OrderCancelled
```

### 5. AI Runtime Event Integration

#### 5.1 Agent Event Patterns

| Event | Trigger | Consumer |
|-------|---------|----------|
| AgentRunRequested | User/system request | AI Runtime |
| AgentRunStarted | Runtime accepted | Audit, analytics |
| ToolExecutionRequested | Agent needs tool | Tool executor |
| ToolExecutionCompleted | Tool returned | Agent runtime |
| AgentRunCompleted | Agent finished | Audit, billing, notifications |
| AgentRunFailed | Agent errored | Error handler, retry logic |

#### 5.2 Agent Saga Pattern

For complex agent workflows with tenant isolation:

| Step | Event | Compensation |
|------|-------|--------------|
| 1. Validate tenant quota | QuotaChecked | N/A |
| 2. Reserve tokens | TokensReserved | ReleaseTokens |
| 3. Execute agent | AgentExecuted | LogPartialResult |
| 4. Charge usage | UsageCharged | RefundUsage |
| 5. Notify completion | NotificationSent | N/A |

### 6. Verify Current Best Practices

**Verify current best practices with web search:**
Search the web: "event processing idempotency patterns 2026"
Search the web: "saga orchestration multi-tenant best practices 2026"
Search the web: "Kafka consumer group configuration patterns 2026"

Document any patterns that differ from design.

---

## COLLABORATION MENUS (A/P/C):

After completing the event processing design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific processing decisions
- **P (Party Mode)**: Bring architect perspectives for processing review
- **C (Continue)**: Accept processing design and proceed to compile architecture
- **[Specific pattern]**: Describe pattern to review further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: consumer groups, idempotency, ordering, saga patterns
- Process enhanced insights on processing patterns
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review event processing architecture for multi-tenant system: {summary}"
- Process Platform Architect (Atlas), AI Runtime Architect (Nova), and Integration Architect (Kai) perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document event processing design
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-complete.md`

---

## SUCCESS METRICS:

- [ ] Consumer group configuration documented
- [ ] Idempotency guarantees established
- [ ] Event ordering strategy defined
- [ ] Saga orchestration patterns designed
- [ ] AI runtime event integration documented
- [ ] Web search verification completed

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Duplicate processing detected | Strengthen idempotency checks |
| Out-of-order events | Implement buffering/reordering |
| Saga stuck in pending | Add timeout and compensation |
| Cross-tenant saga | Add tenant validation at each step |

---

## Verification

- [ ] Consumer groups preserve tenant isolation
- [ ] Idempotency prevents duplicate processing
- [ ] Ordering maintained within tenant scope
- [ ] Sagas are tenant-scoped
- [ ] Patterns align with pattern registry

---

## Outputs

- Consumer group configuration document
- Idempotency strategy specification
- Event ordering matrix
- Saga pattern catalog
- AI runtime event integration guide

---

## NEXT STEP:

Proceed to `step-05-c-complete.md` to compile the event architecture document.
