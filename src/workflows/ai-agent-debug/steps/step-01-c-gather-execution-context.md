# Step 1: Gather Execution Context

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

## Purpose

Collect all relevant information about the AI agent execution environment to establish a complete picture of the system state at the time of the issue.

---

## Prerequisites

- Access to agent runtime logs
- Tenant context for the affected execution
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: agent-runtime,observability
- **Web research (if available):** Search for current AI debugging best practices

---


## Inputs

- User requirements and constraints for ai agent debug
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Collect Required Inputs

Gather the following information:

| Input | Description | Source |
|-------|-------------|--------|
| Agent ID | Identifier of the agent | Agent registry |
| Execution ID | Trace/run ID | LangSmith/logs |
| Tenant ID | Tenant context | Request headers |
| Time Window | When issue occurred | User report |
| Error Message | If any | Logs/response |

### 2. Retrieve Agent Configuration

Document:
- Agent type (single, router, specialist)
- Orchestration framework (LangGraph, CrewAI, AutoGen)
- System prompt version
- Enabled tools list
- Tier-specific configuration overrides

### 3. Load Execution Trace

From observability patterns:
- Retrieve trace from LangSmith or equivalent
- Extract: total tokens, cost, duration, steps executed
- List all tool calls made during execution
- Identify any errors in the trace

### 4. Check Memory State

For each memory tier:

| Tier | Contents Retrieved | Relevant to Issue |
|------|-------------------|-------------------|
| Session | Messages, temp state | [ ] Yes / [ ] No |
| User | User preferences, history | [ ] Yes / [ ] No |
| Tenant | Shared tenant knowledge | [ ] Yes / [ ] No |
| Global | Platform knowledge | [ ] Yes / [ ] No |

### 5. Verify Tenant Context

Check context propagation:
- Was tenant_id present?
- Was tier correctly resolved?
- Were permissions loaded?
- Was RLS context set for database operations?

### 6. Document Expected vs Actual

| Aspect | Expected | Actual | Gap Analysis |
|--------|----------|--------|--------------|
| Response | | | |
| Tools called | | | |
| Token usage | | | |
| Duration | | | |

**Verify current best practices with web search:**
Search the web: "AI agent debugging AI agent patterns {date}"
Search the web: "AI agent debugging LLM orchestration {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After gathering execution context, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific execution details or logs
- **P (Party Mode)**: Bring SRE and AI engineer perspectives on context analysis
- **C (Continue)**: Accept execution context and proceed to state history analysis
- **[Specific refinements]**: Describe additional context to gather

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: execution trace, memory state, tenant context verification
- Process enhanced insights on execution anomalies
- Ask user: "Accept this detailed execution context analysis? (y/n)"
- If yes, integrate into context report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review AI agent execution context for debugging"
- Process SRE and AI engineer perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save execution context report to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-analyze-state-history.md`

---

## Verification

- [ ] All required inputs collected
- [ ] Agent configuration documented
- [ ] Execution trace retrieved and analyzed
- [ ] Memory state for all tiers checked
- [ ] Tenant context verification complete
- [ ] Expected vs actual comparison documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Execution context report
- Agent configuration snapshot
- Trace analysis summary
- Memory state snapshot
- **Load template:** `{project-root}/_bmad/bam/templates/execution-context-report-template.md`

---

## Next Step

Proceed to `step-02-c-analyze-state-history.md` with the execution context.
