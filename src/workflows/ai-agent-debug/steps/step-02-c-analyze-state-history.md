# Step 2: Analyze State History

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

Review the agent's state transitions and decision points to understand execution flow.

---

## Prerequisites

- Execution context gathered (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: agent-runtime,memory-tiers

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Parse Execution Trace

Review the agent's state transitions and decision points:
- Parse the execution trace to identify each state transition
- Map tool calls and their results in sequence
- Identify any memory reads/writes that occurred

### 2. Check Context Window

- Check for context window truncation or token limit issues
- Review any approval workflow interactions
- Identify loops or repeated patterns in execution

### 3. Analysis Checklist

| Check | Status | Notes |
|-------|--------|-------|
| State transitions follow expected flow | ✅/❌ | |
| Tool calls returned expected results | ✅/❌ | |
| Memory operations completed successfully | ✅/❌ | |
| No unexpected context truncation | ✅/❌ | |
| Approval workflows resolved correctly | ✅/❌ | |

### 4. Document Anomalies

Document any anomalies or unexpected state transitions for further investigation.

**Verify current best practices with web search:**
Search the web: "agent state management AI agent patterns {date}"
Search the web: "agent state management LLM orchestration {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-2 complete the context gathering phase.**

Present summary of:
- Execution context collected (agent config, trace, memory state)
- State transitions analyzed with anomalies identified

Ask for confirmation before proceeding to failure point identification.

---

## COLLABORATION MENUS (A/P/C):

After analyzing state history, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific state transitions or anomalies
- **P (Party Mode)**: Bring AI engineer and QA perspectives on state analysis
- **C (Continue)**: Accept state analysis and proceed to failure identification
- **[Specific refinements]**: Describe specific transitions to investigate

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: state transitions, tool calls, memory operations, anomalies
- Process enhanced insights on execution flow issues
- Ask user: "Accept this detailed state analysis? (y/n)"
- If yes, integrate into state analysis document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review AI agent state history analysis for debugging"
- Process AI engineer and QA perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save state analysis to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-identify-failure-point.md`

---

## Verification

- [ ] All state transitions analyzed
- [ ] Tool calls mapped in sequence
- [ ] Memory operations reviewed
- [ ] Context limits checked
- [ ] Approval workflows reviewed
- [ ] Patterns align with pattern registry

---

## Outputs

- State transition analysis document
- Anomaly list with evidence

---

## Next Step

Proceed to `step-03-c-identify-failure-point.md` to pinpoint the failure.
