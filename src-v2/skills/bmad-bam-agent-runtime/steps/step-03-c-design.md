# Step 03: Design Agent Architecture

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER design architecture without runtime selection from Step 02**
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ✅ **CRITICAL: Design ALL architecture components** - graph, tools, memory, tenant
- 📋 **Document architecture decisions** with clear rationale
- 💬 **Present design with A/P/C menu** for user confirmation
- 🌐 **Use web search** to verify current architecture patterns for selected runtime

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Design agent architecture for selected runtime
- 💾 Track: `stepsCompleted: [1, 2, 3]` when complete
- 📖 Reference: Runtime-specific patterns from domain files
- 📖 Reference: `domains/ai-runtime.md` for architecture patterns
- 🚫 Do NOT: Proceed without explicit user confirmation via A/P/C
- ⚠️ Gate: QG-M3 (Agent Runtime Gate) requires documented architecture
- 🔍 Use web search: Verify runtime-specific architecture patterns

---

## CONTEXT BOUNDARIES

### Input Context

- **From Step 01:** Agent types, orchestration style, state management, tool access, tenant scoping
- **From Step 02:** Selected runtime, capabilities, tenant isolation approach
- **Domain file:** `{project-root}/_bmad/bam/data/domains/ai-runtime.md`

### Output

- Agent graph/workflow structure design
- Tool registry design with tenant scoping
- Memory tier strategy
- Tenant context injection patterns

### Quality Gate

- QG-M3 requires complete architecture documentation

---

## YOUR TASK

Design the agent architecture for the selected runtime. Create the agent graph/workflow structure, design the tenant-scoped tool registry, plan the memory tier strategy, and define tenant context injection patterns. Present the complete design via A/P/C menu for user confirmation.

---

## Main Sequence

### Action 1: Design Agent Graph Structure

Based on selected runtime `{runtime_name}` and orchestration style from Step 01:

#### For LangGraph

```markdown
## Agent Graph Design

### Graph Structure
```
                    ┌─────────────────────┐
                    │   Entry Node        │
                    │  (Router/Planner)   │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
       ┌──────────┐     ┌──────────┐     ┌──────────┐
       │ Agent A  │     │ Agent B  │     │ Agent C  │
       │  (Task)  │     │  (Task)  │     │  (Task)  │
       └────┬─────┘     └────┬─────┘     └────┬─────┘
              │                │                │
              └────────────────┼────────────────┘
                               ▼
                    ┌─────────────────────┐
                    │   Aggregator Node   │
                    │   (Synthesizer)     │
                    └──────────┬──────────┘
                               ▼
                    ┌─────────────────────┐
                    │     End Node        │
                    └─────────────────────┘
```

### State Schema
| Field | Type | Purpose |
|-------|------|---------|
| `tenant_id` | str | Tenant context propagation |
| `messages` | List[Message] | Conversation history |
| `current_agent` | str | Active agent identifier |
| `task_state` | dict | Task-specific state |
| `tool_results` | dict | Accumulated tool outputs |

### Edge Conditions
| From | To | Condition |
|------|----|-----------| 
| Entry | Agent A | {condition_a} |
| Entry | Agent B | {condition_b} |
| Agent * | Aggregator | Task complete |
| Aggregator | End | All tasks synthesized |
```

#### For CrewAI

```markdown
## Crew Structure Design

### Crew Definition
| Role | Agent | Goal | Backstory |
|------|-------|------|-----------|
| {role_1} | {agent_1} | {goal_1} | {context_1} |
| {role_2} | {agent_2} | {goal_2} | {context_2} |
| {role_3} | {agent_3} | {goal_3} | {context_3} |

### Task Flow
| Task | Agent | Expected Output | Dependencies |
|------|-------|-----------------|--------------|
| {task_1} | {agent} | {output_type} | None |
| {task_2} | {agent} | {output_type} | task_1 |
| {task_3} | {agent} | {output_type} | task_2 |

### Process Type
- [ ] Sequential: Tasks execute in order
- [ ] Hierarchical: Manager delegates to workers
- [ ] Parallel: Independent tasks run concurrently
```

#### For AutoGen

```markdown
## Conversation Design

### Agent Configuration
| Agent | Type | System Message | Functions |
|-------|------|----------------|-----------|
| {agent_1} | AssistantAgent | {system_prompt} | [{functions}] |
| {agent_2} | AssistantAgent | {system_prompt} | [{functions}] |
| {user_proxy} | UserProxyAgent | {system_prompt} | [{functions}] |

### Conversation Pattern
| Pattern | Agents | Termination |
|---------|--------|-------------|
| Two-agent | {agent_1}, {user_proxy} | max_turns or terminate_msg |
| Group | {agents} | speaker_selection |
| Nested | {outer} → {inner} | inner completion |
```

### Action 2: Design Tool Registry

**Tool Registry Architecture:**

```markdown
## Tool Registry Design

### Registry Structure
┌──────────────────────────────────────────────────────────────┐
│                    Tool Registry                              │
├──────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │ System Tools    │  │ Tenant Tools    │  │ Custom Tools │ │
│  │ (Shared)        │  │ (Scoped)        │  │ (Per-Tenant) │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
│           │                   │                    │         │
│           └───────────────────┼────────────────────┘         │
│                               ▼                              │
│                    ┌─────────────────────┐                   │
│                    │   Tool Executor     │                   │
│                    │ (Tenant Context)    │                   │
│                    └─────────────────────┘                   │
└──────────────────────────────────────────────────────────────┘

### Tool Categories

| Category | Scope | Tenant Context | Examples |
|----------|-------|----------------|----------|
| **System** | Shared | Read-only | DateTime, Calculator, WebSearch |
| **Data** | Tenant-scoped | Required | QueryDB, ReadFile, WriteFile |
| **External** | Tenant credentials | Required | SlackSend, GitHubPR, JiraCreate |
| **AI** | Tenant vector store | Required | RAGSearch, Embeddings |
| **Custom** | Tenant-defined | Required | BusinessLogic tools |

### Tool Registration Pattern

| Tool | Tenant Scoping | Credential Source | Rate Limit |
|------|----------------|-------------------|------------|
| {tool_1} | {scoping} | {source} | {limit} |
| {tool_2} | {scoping} | {source} | {limit} |
| {tool_3} | {scoping} | {source} | {limit} |

### MCP Server Integration (if applicable)

| MCP Server | Purpose | Tenant Isolation |
|------------|---------|------------------|
| {server_1} | {purpose} | {isolation_method} |
| {server_2} | {purpose} | {isolation_method} |
```

Search the web: "{runtime_name} tool integration patterns {date}"
Search the web: "MCP server multi-tenant {date}"

_Source: [URL]_

### Action 3: Design Memory Tier Strategy

**Memory Architecture:**

```markdown
## Memory Tier Design

### Memory Tiers

┌─────────────────────────────────────────────────────────────────┐
│                     Memory Architecture                          │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  Session Memory (L1)                     │   │
│  │  - Conversation context                                  │   │
│  │  - Working variables                                     │   │
│  │  - Scope: Request duration                               │   │
│  │  - Storage: In-memory / Redis                            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Short-term Memory (L2)                      │   │
│  │  - Task checkpoints                                      │   │
│  │  - Intermediate results                                  │   │
│  │  - Scope: Task duration (minutes to hours)               │   │
│  │  - Storage: Redis / PostgreSQL                           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │               Long-term Memory (L3)                      │   │
│  │  - User preferences                                      │   │
│  │  - Learned patterns                                      │   │
│  │  - Scope: Cross-session (days to permanent)              │   │
│  │  - Storage: PostgreSQL / Vector DB                       │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘

### Memory Tenant Isolation

| Tier | Isolation Method | Key Pattern | Cleanup Policy |
|------|------------------|-------------|----------------|
| Session (L1) | Key prefix | `tenant:{id}:session:{sid}:*` | TTL: request end |
| Short-term (L2) | Key prefix | `tenant:{id}:task:{tid}:*` | TTL: 24 hours |
| Long-term (L3) | RLS + tenant_id | DB column | Tenant deletion |

### Checkpointing Strategy (for LangGraph)

| Checkpoint Type | When | Storage | Retention |
|-----------------|------|---------|-----------|
| Node entry | Before each node | Redis | Task duration |
| Node exit | After each node | Redis | Task duration |
| User pause | Human-in-loop | PostgreSQL | 7 days |
| Task complete | Final state | PostgreSQL | Configurable |

### Vector Memory (if RAG required)

| Component | Tenant Isolation | Implementation |
|-----------|------------------|----------------|
| Embeddings | Tenant namespace | `tenant/{id}/embeddings` |
| Vector Store | Collection prefix | `{tenant_id}_collection` |
| Retrieval | Filter by tenant | `metadata.tenant_id == current_tenant` |
```

Search the web: "{runtime_name} memory management {date}"
Search the web: "multi-tenant vector database patterns {date}"

_Source: [URL]_

### Action 4: Design Tenant Context Injection

**Tenant Context Flow:**

```markdown
## Tenant Context Injection Design

### Context Propagation Chain

```
Request → API Gateway → Agent Runtime → Tool Execution → Database
    │          │              │               │             │
    │          │              │               │             │
    └──────────┴──────────────┴───────────────┴─────────────┘
                    Tenant Context Propagated
```

### Context Injection Points

| Layer | Injection Method | Context Format |
|-------|------------------|----------------|
| API Gateway | JWT claim extraction | `{"tenant_id": "uuid"}` |
| Agent Runtime | State field | `state.tenant_id` |
| Tool Execution | Context parameter | `tool.execute(ctx=tenant_ctx)` |
| Database | Session variable | `SET app.current_tenant = 'uuid'` |
| Cache | Key prefix | `tenant:{id}:key` |
| Events | Message envelope | `{"tenant_id": "uuid", "payload": {...}}` |

### Runtime-Specific Injection

#### For LangGraph
```
State Schema:
  tenant_id: str  # Injected at graph invocation
  
Graph Invocation:
  graph.invoke({"tenant_id": tenant_id, ...}, config={"thread_id": f"{tenant_id}:{thread_id}"})
```

#### For CrewAI
```
Crew Instantiation:
  crew = Crew(agents=[...], tasks=[...])
  crew.kickoff(inputs={"tenant_id": tenant_id, ...})
  
Tool Context:
  @tool
  def my_tool(input: str, tenant_id: str = None):
      # tenant_id injected from crew inputs
```

#### For AutoGen
```
Agent Config:
  agent.system_message = f"You are operating for tenant {tenant_id}..."
  
Function Context:
  def function(params, tenant_id: str):
      # tenant_id from conversation context
```

### Security Boundaries

| Boundary | Enforcement | Violation Response |
|----------|-------------|-------------------|
| Tool execution | Tenant ID verification | Reject + audit log |
| Memory access | Key prefix validation | Access denied |
| External API | Credential scoping | Auth failure |
| Database | RLS policy | Empty result set |
```

### Action 5: Compile Architecture Summary

**Architecture Summary:**

```markdown
## Agent Runtime Architecture Summary

### Selected Runtime: {runtime_name}

### Architecture Components

| Component | Design | Tenant Isolation |
|-----------|--------|------------------|
| Agent Graph | {graph_type} | {isolation_method} |
| Tool Registry | {registry_design} | {tool_scoping} |
| Memory Tiers | {tier_design} | {memory_isolation} |
| Context Flow | {injection_pattern} | {propagation_chain} |

### Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Graph structure | {choice} | {rationale} |
| State management | {choice} | {rationale} |
| Tool scoping | {choice} | {rationale} |
| Memory tiers | {choice} | {rationale} |
| Checkpoint strategy | {choice} | {rationale} |

### Trade-offs

| Trade-off | Accepted Impact | Mitigation |
|-----------|-----------------|------------|
| {tradeoff_1} | {impact} | {mitigation} |
| {tradeoff_2} | {impact} | {mitigation} |
```

---

## COLLABORATION MENUS (A/P/C)

After presenting architecture design:

```
================================================================================
AGENT ARCHITECTURE DESIGN COMPLETE
================================================================================

RUNTIME: {runtime_name}
GRAPH TYPE: {graph_type}
TOOL REGISTRY: {tool_count} tools across {categories} categories
MEMORY TIERS: {tier_count} tiers with tenant isolation
CONTEXT INJECTION: {injection_points} injection points

================================================================================
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific architecture components
- **P (Party Mode)**: Gather security and architect perspectives on design
- **C (Continue)**: Accept architecture and proceed to observability design

Select an option:
================================================================================
```

### If 'A' (Advanced Elicitation)

Invoke `bmad-advanced-elicitation` skill to explore:

| Topic | Questions to Explore |
|-------|---------------------|
| **Scaling** | How does architecture scale with agent count? |
| **Failure Modes** | What happens when agents fail mid-task? |
| **Recovery** | How do checkpoints enable recovery? |
| **Tool Conflicts** | What if multiple agents need same tool? |
| **Memory Pressure** | How to handle memory limits per tenant? |
| **Latency** | Where are the latency bottlenecks? |

Pass context: Architecture summary, specific concerns, Step 01 requirements.

**After processing enhanced insights, return to A/P/C menu.**

### If 'P' (Party Mode)

Invoke `bmad-party-mode` skill with context:

```
Review agent architecture for {runtime_name}:
- Graph: {graph_type}
- Tools: {tool_count} with tenant scoping
- Memory: {tier_count} tiers
- Context: {injection_pattern}
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| **Architect** | Structural integrity | Is the architecture sound and maintainable? |
| **Security** | Tenant isolation | Are there isolation gaps in the design? |
| **DevOps** | Operability | Can this be monitored and debugged? |
| **Performance** | Efficiency | Where are the performance risks? |

Process multi-perspective analysis and synthesize into refined design.

**After processing perspectives, return to A/P/C menu.**

### If 'C' (Continue)

1. Record the architecture design in working document:

```yaml
# Add to agent-runtime-architecture.md
architecture:
  runtime: {runtime_name}
  graph_type: {graph_type}
  tools:
    system: [{list}]
    tenant_scoped: [{list}]
    custom: [{list}]
  memory_tiers:
    session: {config}
    short_term: {config}
    long_term: {config}
  tenant_context:
    injection_points: [{list}]
    propagation_chain: {description}
design_completed_at: {timestamp}
```

2. Update workflow state:

```yaml
stepsCompleted:
  - step-01-c-start
  - step-02-c-analyze
  - step-03-c-design  # Add this
currentStep: step-04-c-document
```

3. Proceed to NEXT STEP.

---

## SUCCESS METRICS

- ✅ Agent graph/workflow structure designed for selected runtime
- ✅ Tool registry designed with tenant scoping
- ✅ Memory tier strategy defined with isolation
- ✅ Tenant context injection patterns documented
- ✅ Architecture summary compiled
- ✅ Web research performed for runtime-specific patterns
- ✅ User confirmed design via A/P/C menu

---

## FAILURE MODES

- ❌ **Designing without runtime selection:** Architecture must match runtime capabilities
- ❌ **Missing tenant context:** Multi-tenant isolation requires explicit design
- ❌ **Incomplete tool registry:** All tools need scoping decisions
- ❌ **No memory strategy:** State management requires tier design
- ❌ **Skipping web research:** May miss current architecture patterns
- ❌ **Proceeding without A/P/C:** User not engaged in architecture decisions

---

## NEXT STEP

After user confirms architecture design with 'C':

1. Record the architecture in working document
2. Proceed to `step-04-c-document.md` to design observability and versioning
3. The architecture design informs:
   - Observability instrumentation points
   - LLM versioning strategy
   - Error handling patterns
   - Recovery procedures

**Transition to Step 04 with:**
- Architecture summary: `{components_designed}`
- Observability hooks: `{injection_points_for_tracing}`
- Error boundaries: `{failure_modes_identified}`
