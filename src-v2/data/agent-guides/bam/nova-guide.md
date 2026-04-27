# Nova Guide - BAM Extension

**When to load:** During Phase 3 (Solutioning) when designing agent runtime or memory systems, or when user mentions agent execution, memory tiers, action gateway, or run contracts.
**Integrates with:** Architect+Nova (architect-bam.yaml), AI runtime architecture

This guide provides BAM-specific context for Nova (AI runtime specialist) working on multi-tenant agentic AI platforms.

## Role Context

As Nova on a BAM project, you focus on:
- Designing agent runtime architectures
- Implementing run contracts for agent execution
- Managing memory tiers for agent state
- Building action gateways for tool execution

## Core Concepts

### Tenant-Isolated Agent Execution
Every agent run operates within strict tenant boundaries. No shared state exists between tenant agent runs, execution contexts are fully isolated, and all resources (memory, tokens, tools) are tracked and limited per tenant according to their tier.

### Memory Tier Architecture
Agent memory spans five tiers from ephemeral working memory to persistent semantic stores. Each tier has different isolation requirements, storage strategies, and retention policies. Working memory lives only for run duration while semantic memory persists across sessions with quota management.

### Run Contract Specification
Run contracts define the complete execution agreement for agent runs including inputs, outputs, resource limits, timeout policies, and cancellation semantics. Contracts ensure predictable behavior and enable tenant-specific SLAs with clear guarantees and failure modes.

## Application Guidelines

When designing agent runtime:
1. Select runtime framework based on primary use case - LangGraph for state machines, CrewAI for role-based crews
2. Design resource limits per tier before implementation to prevent scope creep
3. Include tenant_id in all telemetry, logs, and traces from the start
4. Build cancellation support into all long-running agent operations
5. Plan memory eviction strategies before quotas become production issues

## AI Runtime Selection Criteria

Use this framework to select the appropriate AI runtime for your multi-tenant platform:

### Runtime Comparison Matrix

| Criteria | LangGraph | CrewAI | AutoGen | Custom |
|----------|-----------|--------|---------|--------|
| **State Management** | Excellent (built-in) | Good | Moderate | You build |
| **Multi-Agent Support** | Good | Excellent | Excellent | You build |
| **Tenant Isolation** | Requires custom | Requires custom | Requires custom | Full control |
| **Debugging** | Good (LangSmith) | Moderate | Moderate | You build |
| **Learning Curve** | Moderate | Low | Moderate | High |
| **Production Readiness** | High | Moderate | Moderate | You decide |
| **Community/Support** | Strong | Growing | Strong | None |

### Runtime Decision Tree

| Scenario | Recommended Runtime | Rationale |
|----------|-------------------|-----------|
| Complex state machines | LangGraph | Built-in state management, conditional branching |
| Role-based agent crews | CrewAI | Natural role/task abstraction |
| Multi-agent debates | AutoGen | Conversation-centric design |
| Maximum isolation control | Custom | Full control over tenant boundaries |
| Rapid prototyping | CrewAI | Quick to get started |
| Production workloads | LangGraph | Most battle-tested |

### Tenant Resource Allocation by Tier

| Resource | Free Tier | Pro Tier | Enterprise Tier |
|----------|-----------|----------|-----------------|
| Concurrent Agents | 1 | 5 | Unlimited (configurable) |
| Context Window | 8K tokens | 32K tokens | 128K+ tokens |
| Memory Storage | 10MB | 1GB | Unlimited |
| Execution Timeout | 30 seconds | 5 minutes | 30 minutes |
| Tool Invocations/Run | 10 | 100 | 1000 |
| Monthly Run Quota | 100 | 10,000 | Unlimited |

## Actionable Guidance

### Designing Agent Runtime Architecture

1. **Select Runtime Framework** - Choose based on use case using criteria matrix above
2. **Define Isolation Boundaries** - Determine where tenant isolation is enforced
3. **Design State Management** - Plan how agent state is stored and isolated
4. **Implement Resource Limits** - Configure per-tenant resource quotas
5. **Build Execution Monitoring** - Add telemetry for agent runs
6. **Plan Failure Handling** - Define behavior for timeouts, errors, resource exhaustion
7. **Document Runtime Contracts** - Specify guarantees for agent execution

### Implementing Run Contracts

1. **Define Run Schema** - Specify inputs, outputs, and metadata for agent runs
2. **Include Tenant Context** - Ensure tenant_id is part of every run
3. **Specify Resource Limits** - Document timeout, memory, and tool limits
4. **Design Status Model** - Define run states (pending, running, completed, failed)
5. **Implement Cancellation** - Allow tenant to cancel running agents
6. **Add Progress Tracking** - Provide visibility into long-running agents
7. **Build Retry Logic** - Define automatic and manual retry policies

### Managing Memory Tiers

1. **Define Memory Types** - Classify memories (working, episodic, semantic, etc.)
2. **Implement Tenant Isolation** - Ensure memories never leak between tenants
3. **Set Quota Policies** - Define memory limits per tier
4. **Design Eviction Strategy** - Plan memory cleanup for quota management
5. **Enable Memory Search** - Implement semantic search within tenant boundary
6. **Add Memory Versioning** - Track memory changes for auditability
7. **Plan Backup/Restore** - Strategy for tenant memory portability

## Key Considerations

### Agent Runtime
- Tenant isolation in agent execution
- Resource limits per tenant tier
- Agent orchestration patterns

### Run Contracts
- Define clear agent execution contracts
- Handle timeouts and cancellations per tenant
- Track run state with tenant context

### Memory Tiers
- Short-term, long-term, and episodic memory
- Memory isolation between tenants
- Memory quotas per tier

### Action Gateway
- Tool execution with tenant permissions
- Rate limiting per tenant
- Audit logging of agent actions

## SaaS-Specific Considerations

### Multi-Tenant Agent Isolation

**Execution Isolation:**
- Each agent run operates within tenant boundary
- No shared state between tenant agent runs
- Separate execution contexts per tenant
- Tenant-specific environment variables

**Memory Isolation:**
- Vector stores partitioned by tenant
- Conversation history scoped to tenant
- Knowledge bases isolated per tenant
- No cross-tenant memory queries

**Tool Isolation:**
- Tool permissions verified per tenant
- Tool outputs filtered by tenant context
- Tenant-specific tool configurations
- Rate limits per tenant per tool

### Memory Architecture for Multi-Tenancy

| Memory Type | Isolation Level | Storage Strategy | Retention Policy |
|------------|-----------------|------------------|------------------|
| Working Memory | Per-run | In-memory | Run duration |
| Conversation History | Per-tenant | Database | Tier-based |
| Episodic Memory | Per-tenant | Vector store | Quota-based |
| Semantic Memory | Per-tenant | Vector store | Tier-based |
| Platform Knowledge | Shared (read-only) | CDN/Cache | Version-based |

### Agent Safety in Multi-Tenant Context

**Guardrails by Tier:**

| Safety Measure | Free Tier | Pro Tier | Enterprise Tier |
|---------------|-----------|----------|-----------------|
| Output filtering | Strict | Configurable | Admin-controlled |
| PII detection | Always on | Always on | Configurable |
| Prompt injection protection | Always on | Always on | Always on |
| Content moderation | Platform-defined | Platform-defined | Custom policies |
| Execution sandboxing | Maximum | High | Configurable |

**Run Termination Triggers:**
- Timeout exceeded (per tier)
- Token limit reached (per tier)
- Tool invocation limit hit
- Cost threshold exceeded
- Safety violation detected
- Tenant manual cancellation

### Action Gateway Design

**Gateway Responsibilities:**
- Authenticate tool requests against tenant context
- Authorize based on tier and permissions
- Rate limit tool invocations per tenant
- Log all tool calls with full context
- Transform tool responses as needed
- Handle tool failures gracefully

**Tool Categories:**

| Category | Example Tools | Tenant Considerations |
|----------|--------------|----------------------|
| Read-only | Web search, calculations | Low risk, standard limits |
| Data access | Database queries | Tenant-scoped queries only |
| External APIs | Email, calendar | Per-tenant credentials |
| Code execution | Python, JavaScript | Heavy sandboxing required |
| File operations | Read, write, upload | Tenant-scoped storage only |

### Observability for Agent Runs

**Metrics to Track:**
- Run duration by tenant and tier
- Token consumption per run
- Tool invocation counts
- Error rates by error type
- Memory usage per tenant
- Queue depth per tier

**Tracing Requirements:**
- End-to-end trace ID across agent runs
- LLM call tracing with prompts/responses
- Tool execution timing
- Memory read/write operations
- All traces tagged with tenant_id

## Outputs

| Deliverable | Format | Template |
|-------------|--------|----------|
| Agent Runtime Architecture | Markdown | `agent-runtime-template.md` |
| Run Contract Specification | Markdown | `run-contract-template.md` |
| Memory Tier Design | Markdown | `memory-tier-template.md` |
| Action Gateway Design | Markdown | `action-gateway-template.md` |

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| Complex workflow with branching logic | Use LangGraph | Built-in state management and conditional routing |
| Multiple specialized agents collaborating | Use CrewAI | Natural role and task abstraction |
| Maximum control over tenant isolation | Build custom runtime | Full control over isolation boundaries |
| Agent needs to execute code | Heavy sandboxing with strict limits | Code execution is highest risk tool category |
| Free tier agent runs | Aggressive timeouts and token limits | Prevent resource abuse while showing value |
| Enterprise tier needs custom models | Per-tenant model configuration | Enterprise expects customization flexibility |

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Design AI agent runtime architectures
- `bmad-bam-ai-eval-safety-design` - Design AI evaluation and safety mechanisms
- `validate-tool-contract` - Validate tool contracts for agent actions

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **AI runtime patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`
- **Agent patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `agent-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "LangGraph agent orchestration patterns {date}"
- Search: "multi-tenant AI agent memory isolation {date}"
- Search: "AI agent tool governance frameworks {date}"
