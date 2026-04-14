# Step 2: State Sharing

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Design state management for multi-agent systems including shared state patterns, serialization, versioning, conflict resolution, and tenant isolation.

---

## Prerequisites

- Step 1 completed: Handoff protocol designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: state-management
- **Web research (if available):** Search for current distributed state patterns

---

## Inputs

- Handoff protocol from Step 1
- Agent topology
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Consistency requirements

---

## Actions

### 1. Select State Sharing Pattern

Choose state management approach:

| Pattern | Consistency | Use Case | Complexity |
|---------|-------------|----------|------------|
| Pass State | Strong | Sequential handoff | Low |
| Shared Store | Eventual | Parallel agents | Medium |
| Event Sourcing | Strong | Audit requirements | High |
| CRDT | Eventual | Concurrent updates | High |
| Blackboard | Configurable | Collaborative | Medium |

### 2. Design State Structure

Define state schema:

| State Component | Scope | Persistence | Size Limit |
|-----------------|-------|-------------|------------|
| Conversation History | Session | Temporary | 100KB |
| Task Context | Task | Temporary | 50KB |
| Agent Memory | Agent | Persistent | 10KB |
| User Preferences | User | Persistent | 5KB |
| Tenant Config | Tenant | Persistent | 1KB |
| Global Config | Platform | Persistent | 1KB |

State Schema:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| state_id | string | YES | Unique state ID |
| version | int | YES | State version |
| tenant_id | string | YES | Tenant isolation |
| agent_id | string | YES | Current owner |
| conversation | array | YES | Message history |
| task | object | YES | Current task |
| context | object | NO | Additional context |
| checkpoints | array | NO | Recovery points |
| created_at | timestamp | YES | Creation time |
| updated_at | timestamp | YES | Last update |

### 3. Define Serialization Format

Choose serialization approach:

| Format | Speed | Size | Human Readable | Use Case |
|--------|-------|------|----------------|----------|
| JSON | Medium | Large | YES | General |
| MessagePack | Fast | Small | NO | Performance |
| Protobuf | Fast | Smallest | NO | High volume |
| CBOR | Fast | Small | NO | Binary data |

Serialization Configuration:

| Data Type | Format | Compression | Encryption |
|-----------|--------|-------------|------------|
| Messages | JSON | gzip | Optional |
| State Transfer | MessagePack | lz4 | Required |
| Persistence | Protobuf | zstd | Required |
| Debugging | JSON | None | Redacted |

### 4. Design State Versioning

Define version management:

| Version Type | Trigger | Conflict Handling |
|--------------|---------|-------------------|
| Optimistic | On write | Retry with merge |
| Pessimistic | On lock acquire | Wait/timeout |
| Timestamp | On write | Last-write-wins |
| Vector Clock | On write | Causal ordering |

Version Schema:

| Field | Type | Purpose |
|-------|------|---------|
| version_id | int | Sequence number |
| vector_clock | map | Causality tracking |
| parent_version | int | For merging |
| branch_id | string | Parallel versions |
| merged_from | array | Merge history |

### 5. Define Conflict Resolution

Specify conflict handling:

| Conflict Type | Detection | Resolution |
|---------------|-----------|------------|
| Concurrent Update | Version mismatch | Auto-merge or manual |
| Write-Write | Both wrote | LWW or domain logic |
| State Divergence | Checksum mismatch | Reconcile |
| Missing State | Reference not found | Reconstruct or fail |

Merge Strategies:

| Strategy | When to Use | Implementation |
|----------|-------------|----------------|
| Last Write Wins | Simple data | Timestamp comparison |
| First Write Wins | Immutable data | Version check |
| Application Merge | Domain-specific | Custom logic |
| Human Resolution | Critical conflicts | Alert and queue |

### 6. Implement Tenant State Isolation

Ensure tenant separation:

| Isolation Level | Implementation | Verification |
|-----------------|----------------|--------------|
| Logical | Tenant ID filter | Query validation |
| Physical | Separate storage | Namespace check |
| Encryption | Per-tenant keys | Key validation |

Isolation Checks:

| Check | When | Failure Action |
|-------|------|----------------|
| Tenant ID match | All reads/writes | Reject |
| Cross-tenant reference | State load | Reject |
| Data leakage scan | On serialize | Sanitize |

**Verify current best practices with web search:**
Search the web: "distributed state management AI agents {date}"
Search the web: "multi-agent state sharing patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the state sharing design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into state patterns and consistency
- **P (Party Mode)**: Bring distributed systems and data engineer perspectives
- **C (Continue)**: Accept state sharing and proceed to circuit breaker
- **[Specific refinements]**: Describe state management concerns to address

Select an option:
```

#### If 'C' (Continue):
- Save state sharing design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-circuit-breaker.md`

---

## Verification

- [ ] State sharing pattern selected
- [ ] State structure defined
- [ ] Serialization format chosen
- [ ] State versioning designed
- [ ] Conflict resolution specified
- [ ] Tenant isolation implemented
- [ ] Patterns align with pattern registry

---

## Outputs

- State management specification
- State schema
- Serialization configuration
- Conflict resolution rules
- Tenant isolation design

---

## Next Step

Proceed to `step-03-c-circuit-breaker.md` to implement resilience patterns.
