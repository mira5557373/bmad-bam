# Step 03: Design Event Routing Architecture

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Design tenant-aware event routing architecture
- 💾 Track: `stepsCompleted: [1, 2, 3]` when complete
- 📖 Context: Topic naming, partitioning, DLQ, replay capabilities
- 🚫 Do NOT: Design event processing (that's Step 04)
- 🔍 Use web search: Verify routing patterns against current best practices
- ⚠️ Gate: Event routing feeds into QG-M2 (Tenant Isolation)

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Designing topic naming conventions with tenant awareness
- Defining partition strategy by tenant_id
- Configuring dead letter queue (DLQ) handling
- Establishing event replay capabilities

**OUT OF SCOPE:**
- Consumer group configuration (Step 04)
- Idempotency guarantees (Step 04)
- Saga orchestration patterns (Step 04)

---

## Purpose

Design the event routing architecture including tenant-aware topic naming conventions, partition strategies that preserve tenant isolation, dead letter queue handling for failed events, and event replay capabilities for recovery scenarios.

---

## Prerequisites

- Step 02 completed: Event schemas designed
- Event envelope with tenant_id defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: event-routing

---

## Inputs

- Event envelope structure from Step 02
- Event catalog from Step 02
- Tenant model constraints from Step 01
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Design event routing with tenant-aware partitioning and replay capabilities.

---

## Main Sequence

### 1. Design Topic Naming Convention

#### 1.1 Topic Naming Pattern

Define a consistent topic naming convention with tenant awareness:

```
{environment}.{domain}.{module}.{event-type}.{version}
```

| Segment | Description | Example |
|---------|-------------|---------|
| environment | Deployment environment | prod, staging, dev |
| domain | Business domain | orders, billing, users |
| module | Source module | order-service, billing-engine |
| event-type | Event category | commands, events, notifications |
| version | Major version | v1, v2 |

#### 1.2 Topic Examples by Category

| Category | Topic Pattern | Example |
|----------|---------------|---------|
| Domain Events | `{env}.{domain}.events.v{n}` | prod.billing.events.v1 |
| Integration Events | `{env}.integration.{source}-to-{target}.v{n}` | prod.integration.billing-to-notifications.v1 |
| Commands | `{env}.{domain}.commands.v{n}` | prod.orders.commands.v1 |
| Notifications | `{env}.notifications.{channel}.v{n}` | prod.notifications.email.v1 |
| System Events | `{env}.system.{category}.v{n}` | prod.system.metrics.v1 |
| DLQ | `{env}.dlq.{original-topic}` | prod.dlq.billing.events.v1 |

#### 1.3 Tenant-Aware Topic Strategy

| Tenant Model | Topic Strategy | Isolation Level |
|--------------|----------------|-----------------|
| Row-Level Security | Single topic, partition by tenant_id | Partition |
| Schema-Per-Tenant | Separate topic per schema | Topic |
| Database-Per-Tenant | Dedicated topic namespace | Namespace |

**Decision Matrix:**

| Factor | Single Topic | Topic-Per-Tenant |
|--------|--------------|------------------|
| Tenant count < 100 | Recommended | Overhead |
| Tenant count > 1000 | Partition-based | Consider |
| Strict isolation required | Not suitable | Required |
| Operational simplicity | Higher | Lower |

### 2. Design Partition Strategy

#### 2.1 Partition Key Selection

| Strategy | Partition Key | Use Case |
|----------|---------------|----------|
| **Tenant-First** | tenant_id | Default - tenant isolation |
| **Entity-First** | entity_id | Ordering within entity |
| **Composite** | tenant_id:entity_id | Tenant isolation + entity ordering |
| **Time-Based** | date:tenant_id | Time-series events |

**Recommended Default:** `tenant_id` as partition key for multi-tenant systems.

#### 2.2 Partition Count Planning

| Factor | Consideration |
|--------|---------------|
| Tenant count | Minimum partitions >= active tenant count / 10 |
| Consumer parallelism | Partitions >= max consumer instances |
| Throughput | Higher partitions = higher throughput |
| Ordering guarantees | Ordering only within partition |

#### 2.3 Partition Isolation Matrix

| Tenant Model | Partition Strategy | Cross-Tenant Data Risk |
|--------------|-------------------|------------------------|
| RLS | Hash by tenant_id | LOW - Logical isolation |
| Schema | Dedicated partition range | MEDIUM - Configuration risk |
| Database | Separate topic | NONE - Physical isolation |

#### 2.4 Hot Partition Mitigation

| Symptom | Mitigation | Trade-off |
|---------|------------|-----------|
| Single tenant dominates | Composite key with sub-partitioning | Ordering complexity |
| Burst traffic from tenant | Tenant-aware rate limiting | Latency |
| Uneven distribution | Consistent hashing | Rebalancing |

### 3. Configure Dead Letter Queue (DLQ) Handling

#### 3.1 DLQ Architecture

```
Main Topic ──► Consumer Group ──► (Failure) ──► DLQ Topic
     │                                              │
     │                                              ▼
     │                                        DLQ Handler
     │                                        (per-tenant
     │                                         access)
     └─────────────────────────────────────────────┘
                    Replay (manual)
```

#### 3.2 DLQ Configuration

| Configuration | Value | Rationale |
|---------------|-------|-----------|
| Retry attempts | 3 | Balance between recovery and latency |
| Retry backoff | Exponential (1s, 5s, 30s) | Prevent thundering herd |
| DLQ retention | 7 days | Allow investigation time |
| DLQ partitioning | Same as source topic | Maintain tenant isolation |
| Alert threshold | 10 messages / hour | Early warning |

#### 3.3 DLQ Metadata

Preserve additional metadata for debugging:

| Field | Description | Example |
|-------|-------------|---------|
| original_topic | Source topic name | prod.billing.events.v1 |
| original_partition | Source partition | 5 |
| original_offset | Source offset | 12345 |
| failure_reason | Error message | "Schema validation failed" |
| failure_timestamp | When it failed | 2026-04-26T10:30:00Z |
| retry_count | Attempts made | 3 |
| tenant_id | Tenant identifier | tenant_abc123 |

#### 3.4 DLQ Access Control

| Role | Access Level | Operations |
|------|--------------|------------|
| Tenant Admin | Read own tenant's DLQ | View, replay to tenant |
| Platform Ops | Read all DLQ | View, replay, purge |
| System | Write only | Route failed events |

### 4. Establish Event Replay Capabilities

#### 4.1 Replay Scenarios

| Scenario | Replay Scope | Trigger |
|----------|--------------|---------|
| Consumer bug fix | Time range | Manual |
| Data correction | Specific events | Manual |
| Disaster recovery | Full replay | Automated |
| New consumer bootstrap | Full history | On deploy |
| Tenant migration | Tenant-specific | Migration workflow |

#### 4.2 Replay Architecture

```
Event Store (Long-term) ──► Replay Service ──► Replay Topic ──► Consumer
      │                     (tenant-aware)      (temporary)
      │
      └── Compacted topics for state
```

#### 4.3 Replay Configuration

| Configuration | Value | Rationale |
|---------------|-------|-----------|
| Retention period | 30 days (events) | Balance storage vs recovery |
| Compaction | Enabled for state topics | Latest state always available |
| Replay rate limit | 10,000 events/sec/tenant | Prevent consumer overload |
| Replay isolation | Separate consumer group | Don't affect live processing |

#### 4.4 Tenant-Scoped Replay

| Constraint | Enforcement | Rationale |
|------------|-------------|-----------|
| Tenant can only replay own events | Filter by tenant_id | Data isolation |
| Replay audit logged | Audit event emitted | Compliance |
| Rate limited per tenant | Tenant-aware throttling | Fair resource usage |
| Replay window limited | Max 30 days | Storage constraints |

### 5. Verify Current Best Practices

**Verify current best practices with web search:**
Search the web: "Kafka multi-tenant topic design patterns 2026"
Search the web: "event replay architecture patterns 2026"
Search the web: "dead letter queue best practices event-driven 2026"

Document any patterns that differ from design.

---

## COLLABORATION MENUS (A/P/C):

After completing the event routing design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific routing decisions
- **P (Party Mode)**: Bring architect perspectives for routing review
- **C (Continue)**: Accept routing design and proceed to event processing
- **[Specific pattern]**: Describe pattern to review further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: topic naming, partitioning strategy, DLQ design, replay capabilities
- Process enhanced insights on routing patterns
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review event routing architecture for multi-tenant system: {summary}"
- Process Platform Architect (Atlas) and Integration Architect (Kai) perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document event routing design
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-document.md`

---

## SUCCESS METRICS:

- [ ] Topic naming convention defined with tenant awareness
- [ ] Partition strategy documented with isolation guarantees
- [ ] DLQ configuration established with tenant isolation
- [ ] Replay capabilities designed with tenant scoping
- [ ] Web search verification completed

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Cross-tenant data leakage risk | Add partition-level isolation |
| Hot partition detected | Implement sub-partitioning |
| DLQ access not tenant-scoped | Add tenant-id filtering |
| Replay lacks tenant isolation | Add mandatory tenant filter |

---

## Verification

- [ ] Topic naming supports tenant identification
- [ ] Partitioning preserves tenant isolation
- [ ] DLQ maintains tenant context
- [ ] Replay is tenant-scoped
- [ ] Patterns align with pattern registry

---

## Outputs

- Topic naming convention document
- Partition strategy specification
- DLQ configuration template
- Replay architecture document
- Routing decision matrix

---

## NEXT STEP:

Proceed to `step-04-c-document.md` to design event processing architecture.
