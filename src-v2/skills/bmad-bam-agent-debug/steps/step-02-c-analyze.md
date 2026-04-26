# Step 2: Analyze Agent Execution Traces

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

---

## Purpose

Analyze agent execution traces to reconstruct the timeline, identify decision points, and understand token usage patterns.

---

## Prerequisites

- Step 1 completed: Debug session initialized
- Execution traces loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `agent-tracing`

**Web Research (Required):**

Search the web: "LLM agent trace analysis techniques {date}"
Search the web: "LangSmith trace debugging multi-tenant {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Reconstruct Execution Timeline

Build the chronological sequence of agent actions:

| Time | Event Type | Description | Duration |
|------|------------|-------------|----------|
| T+0ms | User Input | {input_message} | - |
| T+50ms | Prompt Assembly | {context_construction} | 50ms |
| T+100ms | LLM Call | {model_invocation} | {duration} |
| T+{N}ms | Tool Decision | {tool_selection} | - |
| T+{N}ms | Tool Execution | {tool_name} | {duration} |
| T+{N}ms | Response | {output_generation} | - |

### 2. Analyze Token Usage

Document token consumption patterns:

| Metric | Value | Budget | Status |
|--------|-------|--------|--------|
| System Prompt | {tokens} | - | - |
| User Context | {tokens} | - | - |
| Tool Results | {tokens} | - | - |
| Memory Context | {tokens} | - | - |
| **Total Input** | {tokens} | {budget} | OK/WARNING/EXCEEDED |
| **Total Output** | {tokens} | {budget} | OK/WARNING/EXCEEDED |

### 3. Identify Decision Points

Map critical decision moments:

| Decision Point | Input State | Decision Made | Alternatives |
|----------------|-------------|---------------|--------------|
| Tool Selection | {state} | {chosen_tool} | {other_options} |
| Response Format | {state} | {format} | {other_formats} |
| Memory Retrieval | {state} | {retrieved} | {available} |
| Handoff Decision | {state} | {next_agent} | {alternatives} |

### 4. Document Tool Invocation Sequence

Trace tool execution flow:

| Order | Tool Name | Input | Output | Status | Duration |
|-------|-----------|-------|--------|--------|----------|
| 1 | {tool_1} | {input} | {output} | Success/Fail | {ms} |
| 2 | {tool_2} | {input} | {output} | Success/Fail | {ms} |
| 3 | {tool_3} | {input} | {output} | Success/Fail | {ms} |

### 5. Analyze State Transitions (Multi-Agent)

For multi-agent scenarios, document state flow:

| From Node | To Node | Condition | State Passed |
|-----------|---------|-----------|--------------|
| {node_a} | {node_b} | {condition} | {state_keys} |
| {node_b} | {node_c} | {condition} | {state_keys} |

---

## COLLABORATION MENUS (A/P/C):

After completing trace analysis, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific trace segments
- **P (Party Mode)**: Bring multi-persona perspectives on trace analysis
- **C (Continue)**: Proceed to failure mode identification
- **[Specific trace]**: Examine a particular execution segment

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: execution timeline, token analysis, decision points
- Process enhanced insights on trace patterns
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review agent execution traces for debugging insights"
- Present synthesized recommendations
- Return to A/P/C menu

#### If 'C' (Continue):
- Document trace analysis findings
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design.md`

---

## Verification

- [ ] Execution timeline reconstructed
- [ ] Token usage analyzed and documented
- [ ] Decision points identified
- [ ] Tool invocation sequence documented
- [ ] State transitions mapped (if multi-agent)
- [ ] Patterns align with pattern registry

---

## Outputs

- Execution timeline with timestamps and durations
- Token usage analysis with budget comparison
- Decision point mapping with alternatives
- Tool invocation sequence with status
- State transition diagram (multi-agent scenarios)

---

## Next Step

Proceed to `step-03-c-design.md` to identify failure modes.
