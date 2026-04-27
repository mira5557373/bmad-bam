# BAM AI Runtime Context

**When to load:** During AI agent design, tool governance, or memory architecture phases.

**Integrates with:** Nova (AI Runtime Architect), TEA agents

---

## Core Concepts for AI Runtime

### Agent Topology Patterns

| Pattern | Use When | Complexity |
|---------|----------|------------|
| Single Agent | Focused task, <5 tools | Low |
| Router Agent | Multi-domain queries | Medium |
| Sequential Pipeline | Ordered steps (research → draft → review) | Medium |
| Parallel Fan-out | Independent subtasks | Medium |
| Hierarchical | Complex multi-step with manager | High |

#### Single Agent Topology

Best for focused tasks with limited tool access:
- Direct LLM-to-tool invocation
- No orchestration overhead
- Suitable for chatbots, Q&A, simple automation
- Example: Customer support agent with FAQ lookup and ticket creation

#### Hierarchical Agent Topology

Manager agent delegates to specialized workers:
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

#### Mesh Agent Topology

Peer-to-peer communication for consensus-based decisions:
```
    ┌──────────┐     ┌──────────┐
    │ Agent A  │◄───►│ Agent B  │
    └────┬─────┘     └────┬─────┘
         │                │
         │   Messages     │
         │                │
    ┌────▼─────┐     ┌────▼─────┐
    │ Agent C  │◄───►│ Agent D  │
    └──────────┘     └──────────┘
```

Use mesh when: Multiple perspectives needed, debate/voting scenarios, creative brainstorming

### Memory Tier Architecture

| Tier | Scope | Storage | TTL |
|------|-------|---------|-----|
| Session | Single conversation | Redis | Request |
| User | User + tenant | Mem0 | 30-90 days |
| Tenant | All users in org | Mem0 | 90 days |
| Global | Platform-wide | Mem0 | Permanent |

#### Session Memory Implementation

- Stored in Redis with key pattern: `session:{tenant_id}:{session_id}`
- Cleared automatically at request/conversation end
- Contains: current context, tool outputs, intermediate states
- Max size: 100KB per session (configurable by tier)

#### User Memory Implementation

- Persists preferences, learned patterns, conversation summaries
- Key pattern: `user:{tenant_id}:{user_id}:memory`
- Automatic summarization for long-term retention
- Privacy controls: User can request deletion (GDPR compliant)

#### Tenant Memory Implementation

- Shared knowledge across all users in organization
- Contains: Company policies, domain knowledge, custom instructions
- Key pattern: `tenant:{tenant_id}:memory`
- Admin-managed with version history

#### Global Memory Implementation

- Platform-wide learnings (anonymized and aggregated)
- Contains: Best practices, common patterns, safety rules
- Read-only for agents, write-only for platform admins
- Used for model fine-tuning and safety improvements

### Run Contract Pattern

```typescript
interface RunContract {
  budget: {
    maxTokens: number;
    maxCost: number;
    maxDuration: number;
  };
  capabilities: string[];  // Allowed tools
  scope: 'session' | 'user' | 'tenant';
  approvalThreshold?: number;  // Cost requiring approval
}
```

### Tool Governance Framework

#### Tool Registry Structure

All tools must be registered in the central tool registry:

| Field | Description | Required |
|-------|-------------|----------|
| tool_id | Unique identifier | Yes |
| name | Human-readable name | Yes |
| description | What the tool does | Yes |
| category | Tool category (read, write, external) | Yes |
| risk_level | low, medium, high, critical | Yes |
| tier_access | Which tenant tiers can use | Yes |
| rate_limits | Calls per minute/hour/day | Yes |
| audit_level | none, basic, full | Yes |

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

#### Tool Categories

| Category | Examples | Default Audit |
|----------|----------|---------------|
| Read | Database query, file read, API fetch | Basic |
| Write | Database insert, file write, send email | Full |
| External | Third-party API, webhook call | Full |
| Admin | User management, config change | Full + Alert |

### State Management Patterns

#### Conversation State

```
┌─────────────────────────────────────┐
│          State Machine              │
│  ┌─────────┐     ┌─────────┐       │
│  │ START   │────►│ GATHER  │       │
│  └─────────┘     └────┬────┘       │
│                       │            │
│                 ┌─────▼─────┐      │
│                 │ VALIDATE  │      │
│                 └─────┬─────┘      │
│                       │            │
│         ┌─────────────┼─────────┐  │
│         ▼             ▼         ▼  │
│    ┌────────┐   ┌─────────┐ ┌─────┐│
│    │EXECUTE │   │CLARIFY  │ │ERROR││
│    └────┬───┘   └────┬────┘ └──┬──┘│
│         │            │         │   │
│         ▼            ▼         ▼   │
│    ┌─────────────────────────────┐ │
│    │          COMPLETE           │ │
│    └─────────────────────────────┘ │
└─────────────────────────────────────┘
```

#### State Serialization

- All state must be JSON-serializable
- Include tenant_id and user_id in every state object
- State changes are immutable (append-only log)
- State size limits enforced per tier

### Checkpoint/Resume Patterns

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

1. **User Interrupt**: Save checkpoint, resume on user return
2. **Timeout**: Save checkpoint, resume with extended budget
3. **Error Recovery**: Save checkpoint, retry failed step
4. **Human-in-Loop**: Save checkpoint, wait for approval

#### Checkpoint Storage

- Short-term (< 1 hour): Redis with TTL
- Medium-term (< 24 hours): PostgreSQL
- Long-term (> 24 hours): S3 with lifecycle policy

### Kill Switch Implementation

Every agent run must implement:

1. **Feature Flag**: Disable agent at runtime
2. **Circuit Breaker**: Auto-disable on error threshold
3. **Budget Exhaustion**: Stop when limits reached
4. **Admin Override**: Manual kill by operator

---

## Application Guidelines

1. **Start simple** - Single agent, escalate to multi-agent only when needed
2. **Define run contracts** - Every agent run has budget and scope
3. **Memory scope is explicit** - Declare read/write scope
4. **Kill switches required** - Feature flag + circuit breaker
5. **Tenant isolation applies** - Memory, tools, model access

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **AI runtime patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `agent-runtime-*`
- **AI runtimes:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`

For detailed implementation patterns, see:
- `nova-guide.md` - Nova AI Runtime Architect detailed guide

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "LangGraph agent orchestration {date}"
- Search: "multi-tenant AI agent memory patterns {date}"
- Search: "AI agent tool governance frameworks {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Which agent topology should I start with for a new AI feature? | Single agent with focused tools; escalate to multi-agent only when complexity demands | Simplest topology that works; multi-agent adds orchestration overhead and debugging complexity |
| How should memory be scoped in a multi-tenant AI platform? | Use explicit memory tiers: session (request), user (30-90 days), tenant (90 days), global (permanent) | Clear scoping prevents cross-tenant memory leakage; tiered TTLs balance utility with storage costs |
| Should tool access be gated by tenant tier? | Yes, register all tools with tier_access and enforce via permission middleware | Enables feature differentiation across tiers; prevents free-tier abuse of expensive capabilities |
| How should AI agent costs be controlled per tenant? | Implement run contracts with maxTokens, maxCost, and maxDuration budgets | Prevents runaway agent costs; enables tier-appropriate budget allocation and overage handling |
| What kill switches are mandatory for AI agent safety? | Feature flag, circuit breaker, budget exhaustion, and admin override | Multiple independent controls ensure agents can be stopped for any failure mode; defense in depth |

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Full runtime design for agent topology and memory tiers
- `bmad-bam-internal-contract-design` - Define and validate tool governance contracts
- `bmad-bam-ai-eval-safety-design` - Review runtime safety controls and kill switches
- `bmad-bam-tenant-model-isolation` - Ensure memory tier isolation per tenant
