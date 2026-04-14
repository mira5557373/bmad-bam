# Step 1: Orchestration Model Selection

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

Select the appropriate agent orchestration topology based on complexity requirements, following BAM Principle 11: "Start Simple, Escalate Deliberately."

---

## Prerequisites

- Master architecture document loaded
- AI runtime configuration (`{ai_runtime}`) resolved
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: agent-runtime
- **Web research (if available):** Search for current AI orchestration best practices

---


## Inputs

- User requirements and constraints for agent runtime architecture
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Load Orchestration Patterns

Identify the five primary agent topology patterns:
- Single Agent
- Router + Specialists  
- Sequential Pipeline
- Parallel Fan-Out
- Hierarchical

### 2. Assess Complexity Factors

Evaluate escalation triggers against current requirements:

| Factor | Threshold | Your Assessment |
|--------|-----------|-----------------|
| Tool count | >15 suggests specialists | [ ] Exceeds / [ ] Below |
| Prompt conflicts | Different system prompts needed | [ ] Yes / [ ] No |
| Quality degradation | Multi-step accuracy loss | [ ] Yes / [ ] No |
| Approval requirements | Human-in-loop needed | [ ] Yes / [ ] No |
| Latency sensitivity | Parallel execution needed | [ ] Yes / [ ] No |

### 3. Select Base Topology

Apply decision tree:
- Default to SINGLE_AGENT unless escalation justified
- Document justification if selecting multi-agent topology
- Every multi-agent topology requires kill switch fallback

### 4. Document Escalation Decision

If escalating beyond single agent, create ADR documenting:
- Why simple topology is insufficient
- Selected topology with justification
- Kill switch fallback path
- Monitoring requirements

### 5. Define Kill Switch Fallback

Map degradation path for selected topology:

| Primary | Fallback | Trigger Condition |
|---------|----------|-------------------|
| Selected topology | Simpler alternative | Error threshold |

**Verify current best practices with web search:**
Search the web: "agent orchestration AI agent patterns {date}"
Search the web: "agent orchestration LLM orchestration {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the orchestration model analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into orchestration complexity factors
- **P (Party Mode)**: Bring AI architect and DevOps perspectives on topology selection
- **C (Continue)**: Accept orchestration model and proceed to tool registry
- **[Specific refinements]**: Describe topology concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: complexity factors, topology options, escalation triggers
- Process enhanced insights on orchestration trade-offs
- Ask user: "Accept these refined orchestration decisions? (y/n)"
- If yes, integrate into orchestration specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review agent orchestration topology selection for multi-tenant AI platform"
- Process AI architect and DevOps perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save orchestration model selection to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-tool-registry-design.md`

---

## Verification

- [ ] Complexity factors assessed
- [ ] Topology selection justified
- [ ] Kill switch fallback defined
- [ ] ADR created (if multi-agent)
- [ ] Patterns align with pattern registry

---

## Outputs

- Selected orchestration topology
- Escalation justification (if applicable)
- Kill switch specification
- ADR document (if applicable)
- **Load template:** `{project-root}/_bmad/bam/templates/model-card-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/llm-provider-comparison-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/agent-coordination-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/agent-runtime-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/ai-runtime-config-template.md`

---

## Next Step

Proceed to `step-02-c-tool-registry-design.md` to catalog AI tools.
