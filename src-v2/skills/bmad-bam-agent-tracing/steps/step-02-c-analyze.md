# Step 2: Design Trace Schema

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


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Gathering required inputs for this step
- Making design decisions within step scope
- Documenting decisions with rationale

**OUT OF SCOPE:**
- Decisions from other steps
- Implementation details
- Validation (separate mode)
## Purpose

Design the trace schema including span naming conventions, tenant attribution via trace attributes, token usage metrics, and cost tracking integration.

---

## Prerequisites

- Step 1 completed: Trace dimensions identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `llm-cost-tracking`, `token-budgeting`
- **Web research (if available):** Search for current OpenTelemetry semantic conventions

---

## Inputs

- Trace dimension definitions from Step 1
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- AI runtime configuration
- Tenant model requirements

---

## Actions

### 1. Define Span Naming Conventions

Establish consistent naming for agent operation spans:

| Span Category | Naming Pattern | Examples |
|---------------|----------------|----------|
| Agent execution | `agent.{agent_name}.execute` | `agent.researcher.execute` |
| Tool invocation | `tool.{tool_name}.invoke` | `tool.web_search.invoke` |
| LLM inference | `llm.{provider}.{model}.chat` | `llm.anthropic.claude-3.chat` |
| Memory operation | `memory.{operation}.{store}` | `memory.retrieve.vector_db` |
| State transition | `state.{from}.{to}` | `state.planning.executing` |
| Handoff | `handoff.{source}.{target}` | `handoff.planner.executor` |

Span Naming Rules:

| Rule | Description | Example |
|------|-------------|---------|
| Lowercase | All span names lowercase | `agent.planner.execute` |
| Dot-separated | Hierarchy via dots | `llm.openai.gpt4.completion` |
| Action suffix | End with action verb | `.execute`, `.invoke`, `.retrieve` |
| No tenant in name | Tenant in attributes only | Never `agent.tenant1.planner` |

### 2. Design Tenant Attribution via Trace Attributes

Define required and optional attributes for tenant isolation:

| Attribute | Type | Required | Scope | Description |
|-----------|------|----------|-------|-------------|
| `tenant.id` | string | CRITICAL | All spans | Tenant UUID |
| `tenant.tier` | string | YES | All spans | free/pro/enterprise |
| `tenant.region` | string | YES | All spans | Data residency region |
| `user.id` | string | YES | User spans | User within tenant |
| `session.id` | string | YES | Session spans | Conversation session |
| `request.id` | string | YES | All spans | Correlation ID |
| `agent.id` | string | YES | Agent spans | Agent instance ID |
| `agent.version` | string | YES | Agent spans | Agent code version |

Attribute Propagation:

| Context | Propagation Method | Verification |
|---------|-------------------|--------------|
| HTTP | W3C Trace Context headers | Header presence check |
| Async | Context propagation library | Context extraction test |
| Queue | Message attributes | Attribute validation |
| Internal | Thread-local / async context | Context preservation test |

### 3. Define Token Usage Metrics per Span

Track token consumption for cost attribution:

| Metric | Type | Unit | Scope | Description |
|--------|------|------|-------|-------------|
| `llm.tokens.input` | counter | tokens | LLM span | Input prompt tokens |
| `llm.tokens.output` | counter | tokens | LLM span | Generated response tokens |
| `llm.tokens.total` | counter | tokens | LLM span | Sum of input + output |
| `llm.tokens.cached` | counter | tokens | LLM span | Cache hit tokens |
| `agent.tokens.total` | counter | tokens | Agent span | Aggregate agent tokens |
| `session.tokens.total` | counter | tokens | Session span | Session-level total |

Token Attribute Schema:

| Attribute | Type | Description |
|-----------|------|-------------|
| `llm.model` | string | Model identifier |
| `llm.provider` | string | Provider name |
| `llm.temperature` | float | Sampling temperature |
| `llm.max_tokens` | int | Max output tokens requested |
| `llm.stop_reason` | string | Why generation stopped |
| `llm.latency_ms` | int | Inference latency |

### 4. Design Cost Tracking Integration

Link traces to cost attribution system:

| Cost Dimension | Source | Calculation | Attribution |
|----------------|--------|-------------|-------------|
| LLM inference | Token counters | tokens * price_per_token | Per-span |
| Tool execution | Span duration | time * resource_rate | Per-span |
| Memory storage | Storage metrics | size * storage_rate | Per-session |
| API calls | External span count | calls * call_cost | Per-span |

Cost Attribute Schema:

| Attribute | Type | Description |
|-----------|------|-------------|
| `cost.estimated_usd` | float | Estimated span cost |
| `cost.model_tier` | string | Pricing tier applied |
| `cost.budget_id` | string | Budget allocation |
| `cost.overage` | boolean | Budget exceeded flag |

Cost Aggregation Levels:

| Level | Aggregation | Use Case |
|-------|-------------|----------|
| Span | Individual operation | Debugging |
| Agent | Sum of agent spans | Agent efficiency |
| Session | Sum of session spans | User cost |
| Tenant | Sum of tenant spans | Billing |

**Verify current best practices with web search:**
Search the web: "OpenTelemetry semantic conventions AI {date}"
Search the web: "LLM token tracking observability {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the trace schema design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into semantic conventions and attribute design
- **P (Party Mode)**: Bring observability engineer and SRE perspectives
- **C (Continue)**: Accept trace schema and proceed to trace propagation design
- **[Specific refinements]**: Describe schema concerns to address

Select an option:
```

#### If 'C' (Continue):
- Save trace schema design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design.md`

---

## Verification

- [ ] Span naming conventions defined
- [ ] Tenant attribution attributes specified
- [ ] Token usage metrics designed
- [ ] Cost tracking integration mapped
- [ ] All CRITICAL attributes identified
- [ ] Patterns align with pattern registry

---

## Outputs

- Span naming convention guide
- Tenant attribution schema
- Token metrics specification
- Cost tracking integration design

---


---

## SUCCESS METRICS:

- [ ] All required inputs gathered from user
- [ ] Design decisions documented with rationale
- [ ] User confirmed choices via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing input:** Cannot proceed without required context - return to prerequisites
- **Unclear requirements:** Use Advanced Elicitation (A) to clarify
- **Conflicting constraints:** Use Party Mode (P) for multi-perspective analysis
- **User rejects output:** Iterate on design, do not force acceptance

## Next Step

Proceed to `step-03-c-design.md` to design trace propagation across agents.
