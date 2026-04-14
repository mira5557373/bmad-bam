# Agent Runtime Patterns

**When to load:** When designing AI agent orchestration, selecting agent frameworks, or when user mentions LangGraph, CrewAI, AutoGen, DSPy, or agent execution.

**Integrates with:** Architect (Nova persona), Dev agent, Platform architect

---

## Core Concepts

### What is Agent Runtime?

Agent runtime refers to the execution environment and orchestration framework that governs how AI agents process requests, manage state, invoke tools, and coordinate multi-step workflows in a multi-tenant SaaS context.

### Runtime Selection Criteria

| Factor | Consideration | Impact |
|--------|---------------|--------|
| State complexity | Simple vs branching | Framework choice |
| Multi-agent | Single vs hierarchical | Architecture pattern |
| Tool integration | Count and complexity | Middleware design |
| Tenant isolation | Shared vs dedicated | Resource allocation |
| Observability | Debug requirements | Tracing depth |

---

## Key Patterns

### Pattern 1: LangGraph State Machine

Best for complex workflows with conditional branching:

| Component | Purpose | Tenant Consideration |
|-----------|---------|---------------------|
| StateGraph | Workflow definition | Shared definition |
| Nodes | Processing steps | Tenant context injected |
| Edges | Transitions | Conditional on tenant state |
| Checkpointing | State persistence | Tenant-scoped storage |

### Pattern 2: CrewAI Role-Based

Best for multi-agent collaboration:

| Component | Purpose | Tenant Consideration |
|-----------|---------|---------------------|
| Agents | Specialized roles | Role templates per tier |
| Tasks | Work units | Tenant task queues |
| Crews | Agent groups | Tenant crew instances |
| Process | Execution flow | Sequential/hierarchical |

### Pattern 3: AutoGen Conversation

Best for debate and consensus patterns:

| Component | Purpose | Tenant Consideration |
|-----------|---------|---------------------|
| AssistantAgent | Task performer | Tenant-scoped |
| UserProxyAgent | Human interface | User binding |
| GroupChat | Multi-agent chat | Tenant channel |
| Manager | Conversation control | Rate limiting |

---

## Application Guidelines

- Selecting an agent orchestration framework
- Designing multi-step agent workflows
- Implementing human-in-the-loop patterns
- Building tenant-aware agent infrastructure
- Creating agent observability systems

---

## Framework Comparison

| Framework | State Management | Multi-Agent | Learning Curve |
|-----------|------------------|-------------|----------------|
| LangGraph | Excellent | Good | Medium |
| CrewAI | Good | Excellent | Low |
| AutoGen | Basic | Excellent | Medium |
| DSPy | Minimal | Limited | High |
| Instructor | N/A | N/A | Low |

---

## Per-Tier Runtime Configuration

| Tier | Concurrency | State TTL | Checkpoint Frequency |
|------|-------------|-----------|---------------------|
| Free | 2 concurrent | 1 hour | On completion |
| Pro | 10 concurrent | 24 hours | Every 5 steps |
| Enterprise | Unlimited | 7 days | Real-time |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Which framework for complex state machines? | LangGraph for conditional branching, checkpointing needs | LangGraph excels at stateful workflows with persistence |
| When to use multi-agent vs single agent? | Multi-agent for distinct role specialization, single for focused tasks | Multi-agent adds coordination overhead; justified when roles have clear boundaries |
| How to isolate agent state between tenants? | Tenant-scoped checkpointing with separate storage namespaces | Prevents cross-tenant state leakage and enables per-tenant debugging |
| Should agents share tools across tenants? | Shared tool definitions, tenant-scoped execution context | Reduces duplication while maintaining isolation during execution |
| When to use human-in-the-loop? | High-stakes decisions, confidence below threshold, or regulatory requirement | Balances automation benefits with accountability needs |

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Design and configure agent orchestration framework
- `bmad-bam-ai-eval-safety-design` - Evaluate AI agent safety and runtime constraints
- `bmad-bam-create-master-architecture` - Integrate agent runtime into platform architecture

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Agent patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `agent-runtime`, `memory-tiers`, `run-contracts`
- **mcp-server-isolation:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `mcp-server-isolation`
- **mcp-client-patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `mcp-client-patterns`
- **agent-coordination:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `agent-coordination`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "LangGraph agent orchestration patterns {date}"
- Search: "CrewAI multi-agent architecture {date}"
- Search: "AI agent runtime comparison {date}"
