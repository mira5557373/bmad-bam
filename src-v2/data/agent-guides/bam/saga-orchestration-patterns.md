# Saga Orchestration Patterns

**When to load:** When designing distributed transactions, implementing compensating actions, or when user mentions saga pattern, rollback, or cross-module transactions.

**Integrates with:** Architect (Kai persona), Dev agent, DevOps agent

---

## Core Concepts

### What is Saga Orchestration?

Saga orchestration manages long-running business transactions that span multiple modules or services. Instead of distributed ACID transactions, sagas use a sequence of local transactions with compensating actions for rollback.

### Saga vs Traditional Transactions

| Aspect | ACID Transaction | Saga |
|--------|-----------------|------|
| Scope | Single database | Multiple modules |
| Isolation | Full | Eventual |
| Rollback | Automatic | Compensating actions |
| Duration | Short | Can be long-running |
| Complexity | Low | Higher |

### Saga Architecture Overview

```
Saga Orchestrator
    │
    ├── Start Saga (PENDING)
    │
    ├── Execute Step 1 (RUNNING)
    │   ├── Success → Next step
    │   └── Failure → Start compensation
    │
    ├── Execute Step 2
    │   ├── Success → Next step
    │   └── Failure → Compensate Step 1
    │
    ├── Execute Step N
    │   ├── Success → COMPLETED
    │   └── Failure → Compensate all prior steps
    │
    └── Final State
        ├── COMPLETED (all succeeded)
        ├── ROLLED_BACK (all compensated)
        └── FAILED (compensation failed)
```

---

## Key Patterns

### Pattern 1: Orchestration vs Choreography

| Approach | Coordination | Use Case |
|----------|--------------|----------|
| Orchestration | Central coordinator | Complex flows, visibility |
| Choreography | Event-driven | Simple flows, autonomy |
| Hybrid | Mixed | Complex systems |

### Orchestration vs Choreography Decision Matrix

| Factor | Orchestration | Choreography |
|--------|---------------|--------------|
| Visibility | Central view | Distributed |
| Coupling | To orchestrator | Event contracts |
| Adding steps | Modify orchestrator | Add listener |
| Debugging | Easier | Harder |
| Single point of failure | Orchestrator | None |

### Pattern 2: Saga Step Definition

| Component | Description | Example |
|-----------|-------------|---------|
| Action | Forward operation | Create order |
| Compensation | Undo operation | Cancel order |
| Condition | Success criteria | Payment confirmed |
| Timeout | Max wait time | 30 seconds |

### Step Retry Configuration

| Step Type | Retry Strategy | Max Attempts | Backoff |
|-----------|---------------|--------------|---------|
| Idempotent | Aggressive | 5 | Exponential |
| Non-idempotent | Conservative | 2 | Linear |
| External API | Moderate | 3 | Exponential |
| Compensation | Aggressive | 10 | Exponential |

### Pattern 3: Saga State Machine

| State | Description | Transitions |
|-------|-------------|-------------|
| PENDING | Saga started | → RUNNING |
| RUNNING | Executing steps | → COMPLETED, COMPENSATING |
| COMPENSATING | Rolling back | → ROLLED_BACK, FAILED |
| COMPLETED | All steps done | Terminal |
| ROLLED_BACK | Compensation done | Terminal |
| FAILED | Cannot proceed | Terminal |

---

## Decision Criteria

### When to Use Sagas

| Scenario | Use Saga | Alternative |
|----------|----------|-------------|
| Cross-module state changes | Yes | - |
| Long-running processes | Yes | - |
| External API integrations | Yes | - |
| Single module, single DB | No | ACID transaction |
| Eventual consistency acceptable | Yes | - |
| Strong consistency required | Careful | Distributed lock |

### Compensation Design Guidelines

| Principle | Description | Example |
|-----------|-------------|---------|
| Semantic undo | Business reversal, not technical | Refund, not delete |
| Idempotent | Safe to retry | Check before act |
| Complete | Handle partial state | Clean up all artifacts |
| Ordered | Reverse order of actions | LIFO compensation |

---

## Application Guidelines

- Designing cross-module business workflows
- Implementing tenant onboarding/offboarding
- Building order processing pipelines
- Managing subscription lifecycle changes
- Coordinating AI agent multi-step tasks

---

## Tenant Context in Sagas

| Consideration | Implementation |
|---------------|----------------|
| Saga ownership | Include tenant_id in saga state |
| Step execution | Tenant context in each step |
| Compensation | Same tenant context |
| Audit trail | Per-tenant saga history |

---

## Common Saga Examples

| Saga | Steps | Compensations |
|------|-------|---------------|
| Tenant Onboarding | Create tenant → Provision resources → Send welcome | Delete resources → Delete tenant |
| Order Processing | Reserve inventory → Charge payment → Ship | Refund → Release inventory |
| Subscription Upgrade | Update plan → Adjust quotas → Bill prorated | Revert quotas → Revert plan |

### Detailed Saga Example: Tenant Onboarding

| Step | Action | Compensation | Timeout |
|------|--------|--------------|---------|
| 1 | Create tenant record | Delete tenant record | 5s |
| 2 | Provision database schema | Drop schema | 30s |
| 3 | Create storage bucket | Delete bucket | 10s |
| 4 | Initialize default config | N/A (no side effect) | 5s |
| 5 | Create admin user | Delete user | 5s |
| 6 | Send welcome email | N/A (informational) | 10s |

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Missing compensation | Orphaned state on failure | Always define compensation |
| Non-idempotent steps | Retry causes duplicates | Design for idempotency |
| Synchronous sagas | Blocking for long duration | Async with status polling |
| Ignoring timeouts | Stuck sagas | Timeout all external calls |
| Partial compensation | Inconsistent state | Complete all compensations |
| No audit trail | Can't debug failures | Log all state transitions |

### Saga Monitoring Checklist

- [ ] Track saga start/completion rates
- [ ] Monitor average saga duration
- [ ] Alert on stuck sagas (timeout exceeded)
- [ ] Track compensation frequency
- [ ] Monitor per-step failure rates
- [ ] Log full saga history for debugging

---

## Integration with BAM Patterns

| Pattern | Integration Point | Purpose |
|---------|-------------------|---------|
| Event-Driven | Step completion events | Async coordination |
| Tenant Onboarding | Provisioning saga | Reliable setup |
| Context Propagation | Tenant context in steps | Isolation |
| Observability | Saga tracing | Visibility |
| Agent Runtime | AI task orchestration | Multi-step agents |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Saga patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `event-driven`, `tenant-lifecycle`
- **Related guides:** `event-driven-patterns`
- **agent-negotiation:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `agent-negotiation`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "saga pattern multi-tenant {date}"
- Search: "orchestration saga implementation {date}"
- Search: "compensating transactions patterns {date}"
- Search: "saga state machine design {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| When should I use saga orchestration vs choreography? | Use orchestration for complex multi-step flows requiring visibility; use choreography for simple, autonomous flows | Orchestration provides central control and debugging; choreography offers autonomy but harder to trace |
| Should saga state include tenant context? | Yes, tenant_id must be in saga state and propagated to every step and compensation | Ensures all operations execute in correct tenant context; enables tenant-scoped saga monitoring |
| How should saga step timeouts be configured? | Step-specific timeouts based on expected duration (5s for DB, 30s for external APIs, 10s for notifications) | Prevents stuck sagas from blocking resources; timeout values should reflect realistic operation bounds |
| What retry strategy should saga steps use? | Exponential backoff with max attempts (5 for idempotent, 2 for non-idempotent, 10 for compensation) | Aggressive retry for safe operations; conservative for side-effect-prone steps; never give up on compensation |
| How should saga failures be monitored? | Track saga completion rates, duration distributions, and compensation frequency with tenant dimension | Enables identification of problematic tenants or flows; compensation frequency indicates design issues |

---

## Related Workflows

- `bmad-bam-tenant-onboarding-design` - Onboarding saga implementation
- `bmad-bam-tenant-offboarding-design` - Offboarding saga with data retention
- `bmad-bam-tenant-tier-migration` - Tier change saga orchestration
