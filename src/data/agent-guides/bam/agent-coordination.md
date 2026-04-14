# Agent Coordination Patterns

**When to load:** When designing multi-agent systems, implementing agent collaboration, or when user mentions agent swarms, parallel agents, or hierarchical agent orchestration.

**Integrates with:** Architect (Nova persona), Dev agent, Platform architect

---

## Core Concepts

### What is Agent Coordination?

Agent coordination refers to the mechanisms and patterns that enable multiple AI agents to work together effectively in a multi-tenant SaaS context. This includes communication protocols, task delegation, synchronization, and conflict resolution between agents.

### Coordination Strategy Comparison

| Strategy | Description | Complexity | Tenant Isolation |
|----------|-------------|------------|------------------|
| Sequential | Agents execute in order | Low | Per-chain |
| Parallel | Agents execute simultaneously | Medium | Per-branch |
| Hierarchical | Manager agents delegate to workers | High | Per-hierarchy |
| Swarm | Emergent behavior from simple rules | Very High | Per-swarm |

---

## Key Patterns

### Pattern 1: Sequential Handoff

Agents process tasks in a linear chain, each passing context to the next.

| Component | Purpose | Tenant Consideration |
|-----------|---------|---------------------|
| Task Queue | Order execution | Tenant-scoped queues |
| Context Passing | State transfer | Include tenant_id |
| Completion Signal | Next agent trigger | Tenant event routing |
| Error Handling | Chain recovery | Per-tenant retry |

### Coordination Flow

```
Agent A ──> Agent B ──> Agent C ──> Result
    │           │           │
    └───────────┴───────────┴── Tenant Context Preserved
```

### Pattern 2: Parallel Execution

Multiple agents work simultaneously on independent subtasks.

| Component | Purpose | Tenant Consideration |
|-----------|---------|---------------------|
| Task Splitter | Decompose work | Tenant task limits |
| Worker Pool | Agent instances | Per-tier pool size |
| Result Aggregator | Combine outputs | Tenant-scoped merge |
| Timeout Handler | Deadline enforcement | Tier-based timeouts |

### Parallel Architecture

```
           ┌── Agent A ──┐
Task ──────┼── Agent B ──┼── Aggregator ──> Result
           └── Agent C ──┘
                │
         Tenant Resource Limits
```

### Pattern 3: Hierarchical Delegation

Manager agents decompose tasks and delegate to specialized workers.

| Component | Purpose | Tenant Consideration |
|-----------|---------|---------------------|
| Manager Agent | Task planning | Tenant strategy context |
| Worker Agents | Task execution | Tenant-scoped tools |
| Delegation Protocol | Task assignment | Tenant priority queue |
| Progress Tracking | Status monitoring | Per-tenant dashboard |

### Hierarchy Structure

```
                Manager
                   │
        ┌──────────┼──────────┐
        │          │          │
    Worker A   Worker B   Worker C
        │          │          │
        └──────────┴──────────┘
              Tenant Scope
```

### Pattern 4: Swarm Coordination

Emergent behavior from many simple agents following local rules.

| Component | Purpose | Tenant Consideration |
|-----------|---------|---------------------|
| Agent Population | Swarm size | Tier-limited count |
| Local Rules | Individual behavior | Shared rule set |
| Environment | Shared context | Tenant workspace |
| Emergence | Collective behavior | Tenant-specific outcomes |

---

## Application Guidelines

When implementing agent coordination:

1. **Start simple** - Begin with sequential patterns before advancing to parallel or hierarchical
2. **Define boundaries** - Clearly specify what each agent can and cannot access
3. **Propagate context** - Ensure tenant context flows through all coordination points
4. **Monitor costs** - Track token usage across all coordinating agents
5. **Set timeouts** - Prevent runaway coordination loops

---

## Per-Tier Coordination Limits

| Tier | Max Concurrent Agents | Coordination Depth | Swarm Size |
|------|----------------------|-------------------|------------|
| Free | 2 | 2 levels | N/A |
| Pro | 5 | 4 levels | 10 |
| Enterprise | 20 | Unlimited | 100 |

---

## Coordination Communication Patterns

| Pattern | Use Case | Message Format |
|---------|----------|----------------|
| Request-Response | Synchronous delegation | Task + Expected Result |
| Fire-and-Forget | Async notifications | Event only |
| Publish-Subscribe | Broadcast updates | Topic-based events |
| Streaming | Progressive results | Chunk sequences |

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Missing tenant context | Cross-tenant data leakage | Always propagate tenant_id |
| Unbounded parallelism | Resource exhaustion | Enforce tier limits |
| No timeout enforcement | Stuck coordination | Set deadline per tier |
| Tight coupling | Hard to scale | Use message-based communication |
| Missing observability | Can't debug failures | Log all coordination events |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| When to use sequential vs parallel? | Sequential for dependent tasks; parallel for independent subtasks | Sequential is simpler and preserves ordering; parallel improves throughput for independent work |
| How deep should hierarchies go? | Maximum 3-4 levels for most use cases | Deep hierarchies add latency and complexity; flatten where possible |
| When is swarm appropriate? | Only for emergent behavior needs like exploration or optimization | Swarm adds significant complexity; use simpler patterns when determinism is required |
| How to handle partial failures? | Implement compensation logic and partial result acceptance | Allow graceful degradation rather than all-or-nothing failures |

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Configure agent coordination framework
- `bmad-bam-ai-eval-safety-design` - Validate coordination safety
- `bmad-bam-create-master-architecture` - Integrate coordination into platform

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Coordination patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `agent-coordination`
- **Agent runtime:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `agent-runtime`
- **Agent negotiation:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `agent-negotiation`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-agent coordination patterns {date}"
- Search: "agent swarm orchestration {date}"
- Search: "hierarchical agent delegation {date}"
