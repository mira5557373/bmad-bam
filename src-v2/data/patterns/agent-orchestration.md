---
pattern_id: agent-orchestration
shortcode: ZAO
category: ai-runtime
qg_ref: QG-M3
version: 1.0.0
last_reviewed: 2026-04-29
---

# Agent Orchestration Patterns - BAM Pattern

**Loaded by:** ZAO
**Category:** ai-runtime
**Quality Gate:** QG-M3

---

## When to Use

- Multi-agent coordination is needed
- Complex workflow with multiple AI participants
- Role-based task delegation required
- State machine workflows with conditional branching
- Long-running transactions requiring compensation logic

## When NOT to Use

- Simple single-agent interactions
- Stateless request/response patterns
- When team lacks orchestration framework expertise
- Minimal AI workflow complexity

## Decision Framework

**Choose framework based on:**
- Workflow type (state machine → LangGraph, role-based → CrewAI, conversation → AutoGen)
- Control requirements (high → LangGraph, medium → CrewAI, flexible → AutoGen)
- Long-running transactions (Saga pattern)
- Team expertise

## Architectural Principle

Agent orchestration requires **clear boundaries** between coordination, isolation, and execution:

```
┌─────────────────────────────────────────────────────────────┐
│                Agent Orchestration Layers                    │
├─────────────────────────────────────────────────────────────┤
│  Coordination: Framework manages agent interactions          │
│  ─────────────────────────────────────────────────────────  │
│  Isolation: Each agent respects tenant boundaries            │
│  ─────────────────────────────────────────────────────────  │
│  Execution: Tools scoped to tenant context                   │
└─────────────────────────────────────────────────────────────┘
```

## Decision Matrix

| Factor | LangGraph | CrewAI | AutoGen | Saga |
|--------|-----------|--------|---------|------|
| Best for | State machines | Role-based crews | Conversations | Transactions |
| Control level | High | Medium | Low | High |
| Learning curve | Steep | Moderate | Easy | Moderate |
| State management | Built-in | External | Message history | Saga log |
| Tenant isolation | Graph-level | Crew-level | Conversation-level | Transaction-level |
| Determinism | High | Medium | Low | High |
| Checkpointing | Native | Custom | None | Native |
| Multi-agent | Hierarchical | Role-based | Conversational | Sequential |

## BAM Schema Contracts

### CrewAI Integration Contract

> **Schema Version:** 1.0.0
> **BAM Controlled:** Yes

```yaml
crewai_integration:
  version: "1.0.0"
  bam_controlled: true
  
  tenant_isolation:
    scope: enum[crew, agent, none]
    context_injection: required
  
  crew_definition:
    max_agents: int
    manager_llm: string
    tool_access: scoped_to_tenant
    
  execution:
    max_iterations: int
    timeout_seconds: int
    budget_limit_tokens: int
```

### AutoGen Integration Contract

> **Schema Version:** 1.0.0
> **BAM Controlled:** Yes

```yaml
autogen_integration:
  version: "1.0.0"
  bam_controlled: true
  
  conversation_manager:
    max_turns: int
    termination_condition: string
    human_input_mode: enum[ALWAYS, NEVER, TERMINATE]
  
  tenant_isolation:
    conversation_scope: per_tenant
    memory_isolation: required
    
  agents:
    max_agents: int
    llm_config_per_tier: bool
```

### Saga Pattern Contract

> **Schema Version:** 1.0.0
> **BAM Controlled:** Yes

```yaml
saga_contract:
  version: "1.0.0"
  bam_controlled: true
  
  transaction:
    steps: list[SagaStep]
    compensations: list[CompensationAction]
    timeout_seconds: int
  
  tenant_scoping:
    saga_id_includes_tenant: true
    rollback_scoped: true
    audit_all_steps: true
    
  recovery:
    retry_policy: enum[immediate, exponential, none]
    max_retries: int
    dead_letter_queue: bool
```

## Architecture Diagrams

### CrewAI Structure

```
┌────────────────────────────────────┐
│            Crew Manager            │
│  ┌──────────┐  ┌──────────┐       │
│  │ Agent 1  │  │ Agent 2  │       │
│  │(Analyst) │  │(Writer)  │       │
│  └────┬─────┘  └────┬─────┘       │
│       │             │             │
│       └──────┬──────┘             │
│              │                    │
│       ┌──────▼──────┐             │
│       │ Task Queue  │             │
└────────────────────────────────────┘
```

### AutoGen Structure

```
┌────────────────────────────────────┐
│        Conversation Manager        │
│  ┌──────────┐  ┌──────────┐       │
│  │ Agent A  │◄─┤ Agent B  │       │
│  └────┬─────┘  └────┬─────┘       │
│       │             │             │
│       │  Messages   │             │
│       └──────►◄─────┘             │
└────────────────────────────────────┘
```

### Saga Transaction Flow

```
┌─────────────────────────────────────────────────────────┐
│                    Saga Transaction                      │
│                                                          │
│  Step 1        Step 2        Step 3        Complete     │
│    │             │             │              │          │
│    ▼             ▼             ▼              ▼          │
│ ┌─────┐      ┌─────┐      ┌─────┐       ┌─────────┐     │
│ │ T1  │─────▶│ T2  │─────▶│ T3  │──────▶│ Commit  │     │
│ └─────┘      └─────┘      └─────┘       └─────────┘     │
│    │             │             │                         │
│    ▼             ▼             ▼                         │
│ ┌─────┐      ┌─────┐      ┌─────┐                       │
│ │ C1  │◄─────│ C2  │◄─────│ C3  │  (Compensations)      │
│ └─────┘      └─────┘      └─────┘                       │
│                                                          │
└─────────────────────────────────────────────────────────┘
```


## Quality Checks

- [ ] Agent execution respects tenant boundaries
- [ ] State management includes tenant context
- [ ] Checkpointing configured for long-running workflows
- [ ] Timeout and retry policies defined
- [ ] **CRITICAL:** No cross-tenant state leakage

## Web Research (Implementation)

> **CRITICAL:** This file contains NO implementation code.
> Use web search for current implementation patterns.

**CrewAI Implementation:**
- Search: "CrewAI production deployment patterns {date}"
- Search: "CrewAI multi-tenant isolation {date}"
- Search: "CrewAI hierarchical crew patterns {date}"

**AutoGen Implementation:**
- Search: "AutoGen agent configuration {date}"
- Search: "AutoGen multi-agent patterns {date}"
- Search: "AutoGen conversation termination {date}"

**Saga Implementation:**
- Search: "saga orchestration patterns {date}"
- Search: "distributed transaction compensation {date}"
- Search: "saga pattern microservices {date}"

## Agent Registry Pattern (P3-01)

Centralized registry for all deployed agents with capability discovery and lifecycle management.

### Registry Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Agent Registry                          │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                 Registry Storage                      │   │
│  │   Persistent store + cache layer                     │   │
│  └──────────────────────────────────────────────────────┘   │
│                           │                                  │
│         ┌─────────────────┼─────────────────┐               │
│         ▼                 ▼                 ▼               │
│  ┌────────────┐   ┌────────────┐   ┌────────────┐          │
│  │  Register  │   │  Discover  │   │  Lifecycle │          │
│  │   Agent    │   │   Agents   │   │   Manage   │          │
│  └────────────┘   └────────────┘   └────────────┘          │
│         │                 │                 │               │
│         ▼                 ▼                 ▼               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Tenant-Scoped Views                      │   │
│  │   Global agents | Tenant agents | User agents        │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Registry Schema

```yaml
agent_registry:
  version: "1.0.0"
  bam_controlled: true
  
  agent_definition:
    id: string
    name: string
    version: semver
    tenant_scope: enum[global, tenant, user]
    
  capabilities:
    tools: list[tool_id]
    permissions: list[permission]
    resource_limits:
      max_tokens_per_request: int
      max_concurrent_executions: int
      
  lifecycle:
    status: enum[active, suspended, deprecated, retired]
    created_at: timestamp
    updated_at: timestamp
    
  discovery:
    tags: list[string]
    searchable: bool
    public_to_tenant: bool
```

### Registry Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Centralized registry | Single source of truth | Single point of failure | Small-medium deployments |
| Federated registry | Resilient, scalable | Consistency challenges | Large distributed systems |
| Sidecar discovery | Low latency | Complex deployment | Microservices |

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-M3 | Agent runtime properly configured |
| QG-I3 | Agent safety boundaries verified |

## Related Patterns

- [langgraph.md](langgraph.md) - Primary runtime with state machines
- [tool-resilience.md](tool-resilience.md) - Tool execution resilience
- [state-management.md](state-management.md) - Checkpoint persistence

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-29 | Consolidated from autogen.md, crewai.md, saga.md |
