# Step 1: Initialize Agent Tracing Design

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- :memo: Maintain append-only document building
- :white_check_mark: Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- :paperclip: Reference pattern registry `web_queries` for search topics

---

## Purpose

Initialize the agent tracing design workflow by loading AI runtime configuration and identifying trace dimensions for comprehensive agent observability.

---

## Prerequisites

- Master architecture document exists
- Agent runtime architecture defined
- **Load guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/agent-execution-tracing.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `distributed-tracing`, `llm-observability`, `observability`

---

## Inputs

- Agent runtime architecture document
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- AI runtime configuration: `{ai_runtime}`
- Tenant model: `{tenant_model}`

---

## Actions

### 1. Load AI Runtime Configuration

Review the configured AI runtime and identify tracing requirements:

| Runtime | Tracing Approach | Native Support | Integration |
|---------|------------------|----------------|-------------|
| LangGraph | State-based spans | LangSmith | OpenTelemetry |
| CrewAI | Task-based spans | Limited | Custom |
| AutoGen | Conversation spans | Limited | Custom |
| DSPy | Module spans | Limited | Custom |
| Instructor | Validation spans | Limited | Custom |

Document runtime: **{ai_runtime}**

### 2. Reference Tracing Patterns

Load relevant patterns from registry:

| Pattern | Decision Criteria | Web Query |
|---------|-------------------|-----------|
| distributed-tracing | Cross-service tracing needs | `distributed tracing multi-tenant {date}` |
| llm-observability | LLM-specific metrics | `LLM observability platforms {date}` |
| observability | Tenant-aware telemetry | `tenant-aware observability {date}` |
| tenant-context-propagation | Context in spans | `tenant context propagation {date}` |

### 3. Identify Trace Dimensions

Define the three core trace dimensions for agent observability:

| Dimension | Definition | Examples |
|-----------|------------|----------|
| **Spans** | Discrete units of work with start/end | Agent execution, tool call, LLM inference |
| **Events** | Point-in-time occurrences within spans | State transition, decision point, error |
| **Attributes** | Key-value metadata on spans/events | tenant_id, model, tokens, cost |

Trace Dimension Requirements:

| Requirement | Description | Priority |
|-------------|-------------|----------|
| Tenant attribution | Every span includes tenant_id | CRITICAL |
| Token tracking | LLM calls track input/output tokens | HIGH |
| Cost correlation | Traces link to cost attribution | HIGH |
| Error context | Failures include debug context | CRITICAL |
| Performance timing | Latency metrics on all operations | HIGH |

**Verify current best practices with web search:**
Search the web: "AI agent tracing best practices {date}"
Search the web: "LLM observability patterns {date}"

_Source: [URL]_

---

## Verification

- [ ] AI runtime configuration loaded
- [ ] Tracing patterns referenced from registry
- [ ] Trace dimensions (spans, events, attributes) identified
- [ ] Tenant attribution requirements documented
- [ ] Patterns align with pattern registry

---

## Outputs

- AI runtime tracing requirements
- Trace dimension definitions
- Initial tracing scope

---

## Next Step

Proceed to `step-02-c-analyze.md` to design the trace schema.
