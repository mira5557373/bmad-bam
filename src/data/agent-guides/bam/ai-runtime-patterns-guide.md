# BAM AI Runtime Patterns Guide

**When to load:** During AI agent design, orchestration framework selection, memory architecture, tool governance, or when user mentions LangGraph, CrewAI, AutoGen, DSPy, agent execution, memory tiers, run contracts.
**Integrates with:** Architect (Nova persona), Dev (James), TEA agents, Platform architects

---

## Core Concepts

Agent runtime refers to the execution environment and orchestration framework that governs how AI agents process requests, manage state, invoke tools, and coordinate multi-step workflows in a multi-tenant SaaS context.

### Key Principles

| Principle | Description |
|-----------|-------------|
| Tenant Isolation | All agent state, memory, and tool access scoped to tenant |
| Resource Bounded | Every agent run has explicit time, token, and cost limits |
| Observable | Full tracing and monitoring of agent execution |
| Fail-Safe | Kill switches and circuit breakers for all agent operations |

### Runtime Selection Criteria

| Factor | Consideration | Impact |
|--------|---------------|--------|
| State complexity | Simple vs branching | Framework choice |
| Multi-agent | Single vs hierarchical | Architecture pattern |
| Tool integration | Count and complexity | Middleware design |
| Tenant isolation | Shared vs dedicated | Resource allocation |
| Observability | Debug requirements | Tracing depth |

---

## §agent-topology

### Pattern: Agent Topology

**When to use:** Designing agent architecture for AI features
**Phase:** solutioning

#### Topology Comparison

| Pattern | Use When | Complexity | Tenant Consideration |
|---------|----------|------------|---------------------|
| Single Agent | Focused task, <5 tools | Low | Simplest isolation |
| Router Agent | Multi-domain queries | Medium | Domain routing |
| Sequential Pipeline | Ordered steps (research → draft → review) | Medium | Step checkpoints |
| Parallel Fan-out | Independent subtasks | Medium | Resource pooling |
| Hierarchical | Complex multi-step with manager | High | Role-based access |

#### Hierarchical Topology

```
         ┌─────────────────┐
         │  Manager Agent  │
         │   (Planner)     │
         └────────┬────────┘
                  │
    ┌─────────────┼─────────────┐
    │             │             │
┌───▼───┐   ┌─────▼─────┐   ┌───▼───┐
│Research│   │  Writer   │   │Review │
│ Agent  │   │  Agent    │   │ Agent │
└────────┘   └───────────┘   └───────┘
```

#### Mesh Topology

```
    ┌──────────┐     ┌──────────┐
    │ Agent A  │◄───►│ Agent B  │
    └────┬─────┘     └────┬─────┘
         │   Messages     │
    ┌────▼─────┐     ┌────▼─────┐
    │ Agent C  │◄───►│ Agent D  │
    └──────────┘     └──────────┘
```

Use mesh when: Multiple perspectives needed, debate/voting scenarios, creative brainstorming

---

## §agent-frameworks

### Pattern: Framework Selection

**When to use:** Choosing orchestration framework
**Phase:** foundation

#### Framework Comparison

| Framework | State Management | Multi-Agent | Learning Curve | Best For |
|-----------|------------------|-------------|----------------|----------|
| LangGraph | Excellent | Good | Medium | Complex state machines |
| CrewAI | Good | Excellent | Low | Role-based collaboration |
| AutoGen | Basic | Excellent | Medium | Debate/consensus |
| DSPy | Minimal | Limited | High | Prompt optimization |
| Instructor | N/A | N/A | Low | Structured outputs |

#### LangGraph Implementation

| Component | Purpose | Tenant Consideration |
|-----------|---------|---------------------|
| StateGraph | Workflow definition | Shared definition |
| Nodes | Processing steps | Tenant context injected |
| Edges | Transitions | Conditional on tenant state |
| Checkpointing | State persistence | Tenant-scoped storage |

#### CrewAI Implementation

| Component | Purpose | Tenant Consideration |
|-----------|---------|---------------------|
| Agents | Specialized roles | Role templates per tier |
| Tasks | Work units | Tenant task queues |
| Crews | Agent groups | Tenant crew instances |
| Process | Execution flow | Sequential/hierarchical |

#### Per-Tier Runtime Configuration

| Tier | Concurrency | State TTL | Checkpoint Frequency |
|------|-------------|-----------|---------------------|
| Free | 2 concurrent | 1 hour | On completion |
| Pro | 10 concurrent | 24 hours | Every 5 steps |
| Enterprise | Unlimited | 7 days | Real-time |

---

## §memory-tiers

### Pattern: Memory Tier Architecture

**When to use:** Designing agent memory systems
**Phase:** solutioning

#### Tier Overview

| Tier | Scope | Storage | TTL | Primary Use |
|------|-------|---------|-----|-------------|
| Working | Single request | RAM | Request duration | Active reasoning |
| Episodic | Session | Redis | Hours-days | Conversation continuity |
| Semantic | Tenant | Vector DB | Permanent | Domain knowledge |
| Procedural | User/Tenant | Mem0 | 90 days | Learned behaviors |
| Collective | Platform | Analytics | Permanent | Platform intelligence |

#### Working Memory

| Component | Description | Size Budget |
|-----------|-------------|-------------|
| System prompt | Agent instructions | 10-20% |
| User input | Current request | 5-10% |
| Retrieved context | RAG results | 30-40% |
| Tool results | Function outputs | 20-30% |
| Reasoning trace | Chain-of-thought | 10-20% |

#### Context Window Management

| Strategy | When to Use | Trade-off |
|----------|-------------|-----------|
| Truncation | Simple overflow | May lose important context |
| Summarization | Long conversations | Compute cost |
| Sliding window | Streaming input | Recent bias |
| Importance scoring | Quality-critical | Complexity |

#### Per-Tier Episodic Memory

| Tier | Max Sessions | History Depth | Storage Quota |
|------|--------------|---------------|---------------|
| Free | 10 active | 50 turns | 10MB |
| Pro | 100 active | 200 turns | 100MB |
| Enterprise | Unlimited | Unlimited | 1GB+ |

#### Per-Tier Semantic Memory

| Tier | Vector Limit | Document Limit | Embedding Model |
|------|--------------|----------------|-----------------|
| Free | 10K vectors | 100 docs | text-embedding-3-small |
| Pro | 500K vectors | 5K docs | text-embedding-3-large |
| Enterprise | 10M vectors | 100K docs | Custom fine-tuned |

#### Memory Isolation Matrix

| Memory Tier | Isolation Mechanism | Cross-Tenant Risk |
|-------------|---------------------|-------------------|
| Working | Request scope | None |
| Episodic | Session + tenant_id | Low |
| Semantic | Collection/namespace | Medium |
| Procedural | Tenant_id scope | Low |
| Collective | Anonymization | Low |

---

## §run-contracts

### Pattern: Run Contracts

**When to use:** Defining agent execution limits
**Phase:** solutioning

#### Contract Components

| Component | Purpose | Example |
|-----------|---------|---------|
| Time Limit | Maximum execution duration | 300 seconds |
| Token Limit | Maximum LLM tokens consumed | 50,000 tokens |
| Cost Budget | Maximum monetary spend | $0.50 per run |
| Action Limit | Maximum tool invocations | 25 actions |
| Circuit Breaker | Failure threshold trigger | 3 consecutive errors |

#### Tiered Run Contracts

| Tier | Time | Tokens | Cost | Actions |
|------|------|--------|------|---------|
| Free | 60s | 10K | $0.10 | 10 |
| Pro | 300s | 50K | $1.00 | 50 |
| Enterprise | 600s | 100K | $5.00 | 100 |

#### Resource Monitor

```
┌─────────────────────────────────────────────┐
│            Contract Monitor                  │
│                                              │
│   Time:    [=====>        ] 45%             │
│   Tokens:  [======>       ] 52%             │
│   Cost:    [===>          ] 28%             │
│   Actions: [========>     ] 64%             │
└─────────────────────────────────────────────┘
        │
        ├── 80% threshold ──► Warning
        ├── 95% threshold ──► Graceful shutdown
        └── 100% limit ────► Forced termination
```

#### Circuit Breaker States

```
┌────────┐     errors >= 3    ┌────────┐
│ Closed │────────────────────►│  Open  │
│(normal)│                     │(blocked)│
└────┬───┘                     └────┬───┘
     │     success              timeout
     │        │                    │
     │        ▼                    ▼
     │   ┌─────────────────────────┐
     └───│     Half-Open          │
         │   (test single req)    │
         └─────────────────────────┘
```

#### Circuit Breaker Config

| Parameter | Default | Description |
|-----------|---------|-------------|
| failure_threshold | 3 | Errors before open |
| recovery_timeout | 30s | Time before half-open |
| success_threshold | 1 | Successes to close |
| monitored_errors | timeout, rate_limit | Error types to track |

---

## §tool-governance

### Pattern: Tool Governance

**When to use:** Managing agent tool access
**Phase:** foundation

#### Tool Registry Structure

| Field | Description | Required |
|-------|-------------|----------|
| tool_id | Unique identifier | Yes |
| name | Human-readable name | Yes |
| category | read, write, external, admin | Yes |
| risk_level | low, medium, high, critical | Yes |
| tier_access | Which tenant tiers can use | Yes |
| rate_limits | Calls per minute/hour/day | Yes |
| audit_level | none, basic, full | Yes |

#### Tool Categories

| Category | Examples | Default Audit |
|----------|----------|---------------|
| Read | Database query, file read | Basic |
| Write | Database insert, send email | Full |
| External | Third-party API, webhook | Full |
| Admin | User management, config | Full + Alert |

#### Two-Stage Middleware

1. **Semantic Filter**: Analyzes intent before tool selection
   - Blocks requests that don't match tool purpose
   - Prevents prompt injection attacks
   - Logs suspicious patterns

2. **Permission Check**: Validates access rights
   - Tenant tier verification
   - User role verification
   - Budget remaining check
   - Rate limit check

---

## §checkpoint-resume

### Pattern: Checkpoint/Resume

**When to use:** Long-running agent workflows
**Phase:** solutioning

#### Checkpoint Structure

| Field | Description |
|-------|-------------|
| checkpoint_id | Unique identifier |
| run_id | Parent run identifier |
| tenant_id | Tenant context |
| state | Serialized agent state |
| step_index | Current step in workflow |
| tool_outputs | Results from completed tools |
| created_at | Timestamp |
| expires_at | TTL for cleanup |

#### Resume Scenarios

| Scenario | Action |
|----------|--------|
| User Interrupt | Save checkpoint, resume on user return |
| Timeout | Save checkpoint, resume with extended budget |
| Error Recovery | Save checkpoint, retry failed step |
| Human-in-Loop | Save checkpoint, wait for approval |

#### Checkpoint Storage

| Duration | Storage | Strategy |
|----------|---------|----------|
| < 1 hour | Redis | TTL expiration |
| < 24 hours | PostgreSQL | Job scheduler |
| > 24 hours | S3 | Lifecycle policy |

---

## §kill-switch

### Pattern: Kill Switch

**When to use:** All AI agent implementations
**Phase:** foundation

#### Required Kill Switches

| Switch | Mechanism | Trigger |
|--------|-----------|---------|
| Feature Flag | Runtime toggle | Admin disable |
| Circuit Breaker | Auto-disable on errors | Error threshold |
| Budget Exhaustion | Stop on limit | Resource depletion |
| Admin Override | Manual intervention | Operator action |

#### Implementation

```
Agent Run Start
       │
       ├── Check feature flag ──► Disabled? Stop
       │
       ├── Check circuit breaker ──► Open? Stop
       │
       ├── Check budget ──► Exhausted? Stop
       │
       └── Process request
              │
              ├── Monitor for admin kill signal
              │
              └── Graceful shutdown on any trigger
```

---

## §cost-attribution

### Pattern: Cost Attribution

**When to use:** Billing and usage tracking
**Phase:** integration

#### Cost Model

| Component | Cost Basis |
|-----------|------------|
| LLM Inference | $0.002/1K tokens |
| Tool Execution | $0.001/call |
| Vector Search | $0.0001/query |
| External API | Pass-through |
| Overhead | +10% |

#### Attribution Flow

```
Agent Run
   │
   ├── LLM Inference ─► Track tokens
   │
   ├── Tool Execution ─► Track calls
   │
   ├── Vector Search ─► Track queries
   │
   └── Total = Sum(components) + 10% overhead
```

---

## Quality Gates

| Gate | Key Checks | Related Patterns |
|------|------------|------------------|
| QG-M3 | Agent topology selected, memory tiers designed | §agent-topology, §memory-tiers |
| QG-I3 | Agent safety verified, kill switches implemented | §kill-switch, §run-contracts |
| QG-P1 | Agent observability in place | §cost-attribution |

### Gate Verification Checklist

- [ ] Agent topology documented with tenant isolation
- [ ] Memory tiers scoped to tenant
- [ ] **CRITICAL:** Kill switches implemented for all agents
- [ ] Run contracts defined per tier
- [ ] Circuit breakers configured
- [ ] Tool governance enforced
- [ ] Cost attribution in place

---

## Web Research

| Topic | Query |
|-------|-------|
| Framework selection | "LangGraph vs CrewAI comparison {date}" |
| Memory architecture | "AI agent memory tiers architecture {date}" |
| Run contracts | "AI agent budget enforcement {date}" |
| Kill switches | "AI agent safety kill switch patterns {date}" |

---

## Related Patterns

Cross-references to other domain guides:

- `mcp-patterns-guide.md` §mcp-server-isolation - MCP tool isolation
- `tenant-patterns-guide.md` §tenant-rls - Memory isolation
- `cost-patterns-guide.md` §usage-metering - Agent usage billing
- `observability-patterns-guide.md` §agent-tracing - Execution tracing

Load from pattern registry:
- `bam-patterns.csv` → filter: `agent-*`, `ai-runtime-*`
- `ai-runtimes.csv` → all frameworks

Use the `web_queries` column from pattern registry for current best practices.

---

## Related Workflows

| Workflow | When to Use |
|----------|-------------|
| `bmad-bam-agent-runtime-architecture` | Design agent orchestration |
| `bmad-bam-ai-eval-safety-design` | Evaluate agent safety |
| `bmad-bam-internal-contract-design` | Define tool contracts |
| `validate-module` | Verify QG-M3 (agent runtime) |

---

## Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-24 | Initial consolidated guide from 15 source files |
