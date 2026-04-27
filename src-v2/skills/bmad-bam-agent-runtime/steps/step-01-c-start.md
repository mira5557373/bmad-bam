# Step 01: Gather AI Agent Requirements

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate runtime design without gathering agent requirements first**
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ **CRITICAL: Capture ALL requirement dimensions** before proceeding
- 📋 **Document all gathered requirements** in structured format for later steps
- 💬 **Engage user to fill gaps** in agent requirements understanding
- 🌐 **Use web search** to verify current AI agent orchestration best practices

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Gather AI agent requirements across 6 dimensions
- 💾 Track: `stepsCompleted: [1]` when complete
- 📖 Context: Load AI runtime domain knowledge first
- 🚫 Do NOT: Make runtime selection decisions in this step - requirements only
- ⚠️ Gate: QG-M3 (Agent Runtime Gate) governs this workflow
- 🔍 Use web search: Verify patterns against current best practices

---

## CONTEXT BOUNDARIES

### Primary Domain

- **AI Runtime Domain:** `{project-root}/_bmad/bam/data/domains/ai-runtime.md`
- Contains: Runtime comparison, selection criteria, orchestration patterns

### Required Artifacts

- **Master Architecture:** `{output_folder}/planning-artifacts/master-architecture.md`
- Contains: Selected tenant model, AI runtime configuration variable

### Pattern Registry

- **AI Runtimes:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`
- Contains: Runtime characteristics, strengths, use cases, web queries

---

## YOUR TASK

Gather comprehensive AI agent requirements across 6 dimensions: agent types, orchestration style, state management, tool access, tenant scoping, and LLM strategy. These requirements inform runtime selection in Step 02 and architecture design in Steps 03-05.

---

## Prerequisites

- [ ] Master architecture document exists with tenant model selected
- [ ] User has clarity on AI capabilities needed in the platform
- [ ] Understanding of agent-to-user interaction patterns

---

## Main Sequence

### Action 1: Load AI Runtime Domain Context

**Read and internalize:**

```
{project-root}/_bmad/bam/data/domains/ai-runtime.md
```

Key concepts to understand:
- Runtime comparison matrix (LangGraph vs CrewAI vs AutoGen vs DSPy vs Instructor)
- State management tiers (session, short-term, long-term)
- Tool registry patterns for multi-tenant
- Agent observability requirements

### Action 2: Load Master Architecture

**Read and extract AI-related context:**

```
{output_folder}/planning-artifacts/master-architecture.md
```

Document the foundation context:

| Setting | Value |
|---------|-------|
| Tenant Model | (RLS / Schema / Database / Hybrid) |
| AI Runtime Config | (langgraph / crewai / autogen / dspy / instructor / custom) |
| Expected Agent Count | (from architecture) |
| Primary Use Cases | (from architecture) |

### Action 3: Load AI Runtimes Pattern Registry

**Read and understand available options:**

```
{project-root}/_bmad/bam/data/ai-runtimes.csv
```

Extract runtime characteristics:
- Strengths and weaknesses
- Tenant isolation support
- State management capabilities
- Web queries for current best practices

### Action 4: Gather Agent Types Requirements

Collect information about what types of AI agents are needed:

#### Agent Types Discovery Template

| Dimension | Question | Examples |
|-----------|----------|----------|
| Agent Purpose | What tasks will agents perform? | Analysis, code generation, research, customer support |
| Agent Specializations | What distinct agent roles needed? | Analyst, Writer, Reviewer, Coordinator |
| Agent Count | How many distinct agent types? | 1-3 (simple), 4-8 (moderate), 9+ (complex) |
| Agent Interactions | Do agents work independently or together? | Solo, sequential handoff, parallel collaboration |
| User-Facing | Are agents directly visible to users? | Chatbot, background processor, hybrid |

**Capture agent types:**

```yaml
agent_types:
  - name: {agent_name}
    purpose: {what_it_does}
    user_facing: {yes/no}
    interactions: {solo/sequential/parallel}
```

### Action 5: Gather Orchestration Requirements

Determine how agents should be coordinated:

#### Orchestration Style Matrix

| Style | Description | Use When |
|-------|-------------|----------|
| **Single Agent** | One agent handles all tasks | Simple workflows, chatbots |
| **Sequential Chain** | Agents pass work in order | Document processing pipelines |
| **Parallel Fan-Out** | Multiple agents work simultaneously | Analysis requiring multiple perspectives |
| **Hierarchical** | Manager agent delegates to workers | Complex projects with delegation |
| **Debate/Consensus** | Agents discuss to reach agreement | Decision-making, content review |
| **Human-in-Loop** | Agents pause for human input | High-stakes decisions, approval flows |

**Gather orchestration needs:**

| Question | Response |
|----------|----------|
| Primary orchestration style? | |
| Need conditional branching? | yes/no |
| Need loops/retries? | yes/no |
| Need human approval steps? | yes/no |
| Maximum execution time? | seconds/minutes/hours |

### Action 6: Gather State Management Requirements

Determine state persistence needs:

#### State Management Tiers

| Tier | Scope | Persistence | Examples |
|------|-------|-------------|----------|
| **Session** | Single conversation | Request duration | Chat context, working memory |
| **Short-term** | Task duration | Minutes to hours | Checkpoint state, intermediate results |
| **Long-term** | Cross-session | Days to permanent | User preferences, learned patterns |

**Gather state requirements:**

| Question | Response |
|----------|----------|
| Need conversation memory? | yes/no |
| Need task checkpointing? | yes/no |
| Need cross-session memory? | yes/no |
| Need tenant-specific memory? | yes/no |
| Memory size constraints? | small/medium/large |

### Action 7: Gather Tool Access Requirements

Determine what external systems agents need:

#### Tool Categories

| Category | Examples | Tenant Scoping |
|----------|----------|----------------|
| **Data Access** | Database queries, file storage | Must scope to tenant |
| **External APIs** | Slack, GitHub, Jira | Tenant credentials |
| **System Tools** | Code execution, shell access | Sandboxed per tenant |
| **LLM Tools** | RAG retrieval, embeddings | Tenant vector stores |
| **Custom Tools** | Business-specific operations | Tenant-aware by design |

**Gather tool requirements:**

```yaml
tools_required:
  - category: {category}
    tools: [{tool_names}]
    tenant_scoping: {required/optional/shared}
    credentials: {per_tenant/shared/none}
```

### Action 8: Gather Tenant Scoping Requirements

Determine how agents relate to tenants:

#### Tenant Scoping Questions

| Question | Options | Impact |
|----------|---------|--------|
| Agent instances | Shared pool vs tenant-dedicated | Resource cost, isolation |
| Agent memory | Shared vs tenant-isolated | Privacy, personalization |
| Agent tools | Shared vs tenant-configured | Flexibility, complexity |
| Agent limits | Global vs per-tenant | Fair usage, abuse prevention |
| Agent models | Shared vs BYOK (Bring Your Own Key) | Cost, customization |

**Document tenant scoping:**

| Dimension | Scoping | Rationale |
|-----------|---------|-----------|
| Agent instances | | |
| Agent memory | | |
| Agent tools | | |
| Agent limits | | |
| LLM credentials | | |

### Action 9: Web Research Verification

**Verify current best practices with web search:**

Search the web: "AI agent orchestration patterns production {date}"
Search the web: "LangGraph vs CrewAI comparison {date}"
Search the web: "multi-tenant AI agent architecture {date}"
Search the web: "LLM agent state management best practices {date}"

Use `web_queries` column from `ai-runtimes.csv` for runtime-specific searches.

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-9 complete the AI agent requirements gathering.**

Present the gathered requirements summary and ask for confirmation:

```
================================================================================
AI AGENT REQUIREMENTS SUMMARY
================================================================================

AGENT TYPES:
- Primary agents: {list}
- User-facing: {yes/no}
- Agent count: {count}

ORCHESTRATION:
- Style: {single/sequential/parallel/hierarchical}
- Conditional branching: {yes/no}
- Human-in-loop: {yes/no}

STATE MANAGEMENT:
- Session memory: {yes/no}
- Checkpointing: {yes/no}
- Long-term memory: {yes/no}

TOOL ACCESS:
- Tool categories: {list}
- Tenant-scoped tools: {count}

TENANT SCOPING:
- Agent instances: {shared/dedicated}
- Memory isolation: {shared/isolated}
- LLM credentials: {shared/BYOK}

================================================================================
Ready to proceed to runtime analysis? (y/n)
================================================================================
```

---

## SUCCESS METRICS

- ✅ AI runtime domain context loaded and understood
- ✅ Master architecture reviewed, tenant model and AI config extracted
- ✅ Agent types and purposes documented
- ✅ Orchestration style determined
- ✅ State management requirements captured
- ✅ Tool access needs identified with tenant scoping
- ✅ Tenant scoping decisions documented
- ✅ Web research performed for current patterns
- ✅ User confirmed requirements summary

---

## FAILURE MODES

- ❌ **No master architecture:** Cannot proceed without tenant model context
- ❌ **Vague agent purposes:** Each agent needs clear responsibility
- ❌ **Missing orchestration style:** Cannot select runtime without interaction pattern
- ❌ **Undefined state needs:** Memory tier selection requires explicit needs
- ❌ **No tool inventory:** Cannot design tool registry without requirements
- ❌ **Tenant scoping unclear:** Multi-tenant isolation requires explicit decisions

---

## Outputs

- Populated agent types inventory
- Orchestration style selection
- State management requirements
- Tool access requirements with tenant scoping
- Tenant scoping decisions
- Requirements confirmation

**Note:** Full runtime design document created in later steps using:
`{project-root}/_bmad/bam/data/templates/agent-runtime.md`

---

## NEXT STEP

Proceed to `step-02-c-analyze.md` with:
- Agent types and orchestration requirements
- State management needs
- Tool access requirements
- Tenant scoping decisions

The analysis step will evaluate runtime options against these requirements and recommend the optimal runtime selection.

**Note:** Step 01 does NOT have A/P/C menu - this is a requirements gathering step. Proceed directly to Step 02 once requirements are confirmed.
