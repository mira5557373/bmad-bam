# Step 1: Initialize Agent Debug Session

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🔍 Use web search to verify current best practices when making technology decisions

---

## Purpose

Initialize the AI agent debug session by loading runtime configuration, execution traces, and identifying debug scope.

---

## Prerequisites

- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `agent-runtime`
- **Load patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`

---

## Actions

### 1. Identify Debug Scope

Determine the scope of investigation:

| Scope | Description | Artifacts Needed |
|-------|-------------|------------------|
| Single Agent | One agent misbehaving | Agent config, run traces |
| Multi-Agent | Orchestration failure | Graph state, handoff logs |
| Tool Chain | Tool execution issues | Tool configs, call logs |
| Memory | Context or memory issues | Memory snapshots, state |
| Tenant Context | Isolation or context leak | Tenant configs, RLS logs |

### 2. Load Agent Runtime Configuration

Gather agent configuration details:

| Setting | Value | Notes |
|---------|-------|-------|
| Agent ID | {agent_id} | Unique identifier |
| Agent Type | {type} | LangGraph/CrewAI/AutoGen/Custom |
| Model | {model_name} | LLM model in use |
| Temperature | {temperature} | Sampling temperature |
| Max Tokens | {max_tokens} | Token limit |
| Tools Enabled | {tools_list} | Available tools |

### 3. Collect Execution Traces

Identify available trace data:

| Trace Type | Source | Status |
|------------|--------|--------|
| LangSmith Traces | LangSmith API | Available/Unavailable |
| Application Logs | Logging system | Available/Unavailable |
| Tool Execution Logs | Tool registry | Available/Unavailable |
| Memory State Snapshots | Memory system | Available/Unavailable |
| Conversation History | Message store | Available/Unavailable |

### 4. Establish Debug Context

Document the issue context:

| Field | Value |
|-------|-------|
| Issue Description | {user_provided_description} |
| First Observed | {timestamp} |
| Frequency | Sporadic/Consistent/Always |
| Affected Tenants | {tenant_ids_or_all} |
| Severity | P1/P2/P3/P4 |

**Verify current best practices with web search:**
Search the web: "AI agent debugging methodology best practices {date}"
Search the web: "LangGraph LangSmith tracing troubleshooting {date}"

_Source: [URL]_

---

## Verification

- [ ] Debug scope identified (single/multi-agent/tool chain/memory/tenant)
- [ ] Agent runtime configuration loaded
- [ ] Available execution traces cataloged
- [ ] Issue context documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Debug scope determination with required artifacts
- Agent runtime configuration summary
- Trace availability inventory
- Issue context documentation
- **Load template:** `{project-root}/_bmad/bam/data/templates/agent-debug-report.md`

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

Proceed to `step-02-c-analyze.md` to analyze execution traces.
