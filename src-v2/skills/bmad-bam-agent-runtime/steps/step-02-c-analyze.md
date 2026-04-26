# Step 02: Analyze Runtime Options

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER analyze runtimes without loading Step 01 requirements first**
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ **CRITICAL: Compare ALL runtime options** against gathered requirements
- 📋 **Document scoring matrix** with clear rationale per runtime
- 💬 **Present analysis with A/P/C menu** for user confirmation
- 🌐 **Use web search** to verify current runtime capabilities and limitations

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Compare runtime options against Step 01 requirements
- 💾 Track: `stepsCompleted: [1, 2]` when complete
- 📖 Reference: `ai-runtimes.csv` for runtime characteristics
- 📖 Reference: `domains/ai-runtime.md` for selection criteria
- 🚫 Do NOT: Proceed without explicit user confirmation via A/P/C
- ⚠️ Gate: QG-M3 (Agent Runtime Gate) governs runtime selection
- 🔍 Use web search: Verify runtime-specific capabilities and recent updates

---

## CONTEXT BOUNDARIES

### Input Context

- **From Step 01:** Agent types, orchestration style, state management, tool access, tenant scoping
- **Domain file:** `{project-root}/_bmad/bam/data/domains/ai-runtime.md`
- **Pattern registry:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`

### Output

- Runtime comparison matrix with scores
- Recommended runtime with rationale
- Runtime selection confirmed via A/P/C

### Quality Gate

- QG-M3 requires documented runtime selection rationale

---

## YOUR TASK

Analyze each runtime option (LangGraph, CrewAI, AutoGen, DSPy, Instructor, Custom) against the requirements gathered in Step 01. Score each runtime on key dimensions, identify the best fit, and present the analysis via A/P/C menu for user confirmation.

---

## Main Sequence

### Action 1: Load Pattern Registry

**Read runtime characteristics from:**

```
{project-root}/_bmad/bam/data/ai-runtimes.csv
```

Extract for each runtime:
- Primary strengths
- Limitations
- Tenant isolation support
- State management approach
- Web queries for current information

### Action 2: Analyze LangGraph

**LangGraph Analysis:**

| Dimension | Score (1-5) | Assessment |
|-----------|-------------|------------|
| **Orchestration Fit** | | Match to {orchestration_style} from Step 01 |
| **State Management** | | Checkpointing, persistence capabilities |
| **Tenant Isolation** | | Graph instance per tenant viability |
| **Tool Integration** | | Tool node pattern, MCP compatibility |
| **Observability** | | LangSmith integration, tracing |
| **Complexity** | | Learning curve, implementation effort |

**Strengths for this project:**
- Native state machine support
- Built-in checkpointing via checkpointer
- Conditional edge routing
- Subgraph composition

**Limitations for this project:**
- Requires understanding graph programming model
- State schema must be defined upfront
- More boilerplate for simple use cases

**Tenant considerations:**
- Graph instances can be tenant-scoped
- Checkpointer can use tenant-prefixed keys
- Thread IDs can include tenant context

Search the web: "LangGraph production patterns {date}"
Search the web: "LangGraph checkpointing multi-tenant {date}"

_Source: [URL]_

### Action 3: Analyze CrewAI

**CrewAI Analysis:**

| Dimension | Score (1-5) | Assessment |
|-----------|-------------|------------|
| **Orchestration Fit** | | Match to {orchestration_style} from Step 01 |
| **State Management** | | Crew memory, task context |
| **Tenant Isolation** | | Crew instance per tenant viability |
| **Tool Integration** | | Tool decorator pattern |
| **Observability** | | Task callbacks, crew logs |
| **Complexity** | | Intuitive role-based model |

**Strengths for this project:**
- Natural agent-role metaphor
- Built-in task delegation
- Hierarchical crew support
- Process-based execution (sequential, parallel)

**Limitations for this project:**
- Less control over execution flow
- Memory less sophisticated than LangGraph
- Harder to implement complex conditionals

**Tenant considerations:**
- Crews can be instantiated per-tenant
- Agent memory requires explicit tenant scoping
- Tool credentials need tenant injection

Search the web: "CrewAI production deployment {date}"
Search the web: "CrewAI multi-tenant patterns {date}"

_Source: [URL]_

### Action 4: Analyze AutoGen

**AutoGen Analysis:**

| Dimension | Score (1-5) | Assessment |
|-----------|-------------|------------|
| **Orchestration Fit** | | Match to {orchestration_style} from Step 01 |
| **State Management** | | Conversation history, agent memory |
| **Tenant Isolation** | | Conversation scope per tenant |
| **Tool Integration** | | Function registration pattern |
| **Observability** | | Conversation logging |
| **Complexity** | | Conversation-centric model |

**Strengths for this project:**
- Natural multi-agent conversations
- Debate and consensus patterns
- Human-in-loop integration
- Flexible agent configurations

**Limitations for this project:**
- Less structured than state machines
- Conversation management complexity
- May generate excessive LLM calls

**Tenant considerations:**
- Conversations naturally scoped
- Agent configs can be tenant-specific
- Function tools need tenant context injection

Search the web: "AutoGen production best practices {date}"
Search the web: "AutoGen multi-agent patterns {date}"

_Source: [URL]_

### Action 5: Analyze DSPy

**DSPy Analysis:**

| Dimension | Score (1-5) | Assessment |
|-----------|-------------|------------|
| **Orchestration Fit** | | Match to {orchestration_style} from Step 01 |
| **State Management** | | Module state, pipeline context |
| **Tenant Isolation** | | Module instance per tenant |
| **Tool Integration** | | Retriever patterns |
| **Observability** | | Trace logging, optimization metrics |
| **Complexity** | | Declarative programming model |

**Strengths for this project:**
- Declarative prompt optimization
- Reproducible outputs
- Module composition
- Teleprompter optimization

**Limitations for this project:**
- More suited for pipelines than agents
- Less real-time interaction support
- Steeper learning curve for prompt optimization

**Tenant considerations:**
- Modules can have tenant-specific signatures
- Retriever configs per tenant
- Optimization can be tenant-scoped

Search the web: "DSPy production deployment {date}"
Search the web: "DSPy vs LangGraph comparison {date}"

_Source: [URL]_

### Action 6: Analyze Instructor

**Instructor Analysis:**

| Dimension | Score (1-5) | Assessment |
|-----------|-------------|------------|
| **Orchestration Fit** | | Match to {orchestration_style} from Step 01 |
| **State Management** | | Stateless by design |
| **Tenant Isolation** | | Client instance per tenant |
| **Tool Integration** | | Function calling via Pydantic |
| **Observability** | | Response validation logs |
| **Complexity** | | Minimal, type-safe |

**Strengths for this project:**
- Strong typing with Pydantic
- Validation and retry built-in
- Clean structured outputs
- Works with any LLM client

**Limitations for this project:**
- Not an orchestration framework
- No built-in state management
- Single-call focused, not workflows

**Tenant considerations:**
- Client can include tenant context
- Response models can have tenant fields
- Minimal tenant isolation needed

Search the web: "Instructor structured outputs {date}"
Search the web: "Instructor vs LangChain {date}"

_Source: [URL]_

### Action 7: Analyze Custom Framework

**Custom Framework Analysis:**

| Dimension | Score (1-5) | Assessment |
|-----------|-------------|------------|
| **Orchestration Fit** | | Full control, match any pattern |
| **State Management** | | Design as needed |
| **Tenant Isolation** | | Built-in from start |
| **Tool Integration** | | Native to your stack |
| **Observability** | | Design as needed |
| **Complexity** | | High - build everything |

**Strengths for this project:**
- Maximum flexibility
- Optimal for existing infrastructure
- No external dependencies
- Perfect tenant integration

**Limitations for this project:**
- Significant implementation effort
- Must build observability from scratch
- No community patterns to leverage
- Maintenance burden

**Tenant considerations:**
- Tenant isolation designed in from start
- All patterns custom to your needs
- Maximum control, maximum effort

### Action 8: Compile Comparison Matrix

**Runtime Comparison Matrix:**

| Dimension | LangGraph | CrewAI | AutoGen | DSPy | Instructor | Custom |
|-----------|-----------|--------|---------|------|------------|--------|
| Orchestration Fit | /5 | /5 | /5 | /5 | /5 | /5 |
| State Management | /5 | /5 | /5 | /5 | /5 | /5 |
| Tenant Isolation | /5 | /5 | /5 | /5 | /5 | /5 |
| Tool Integration | /5 | /5 | /5 | /5 | /5 | /5 |
| Observability | /5 | /5 | /5 | /5 | /5 | /5 |
| Complexity (inverse) | /5 | /5 | /5 | /5 | /5 | /5 |
| **TOTAL** | /30 | /30 | /30 | /30 | /30 | /30 |

**Weighted by Step 01 requirements:**

| Requirement | Weight | Best Fit Runtime |
|-------------|--------|------------------|
| {orchestration_style} | High | |
| {state_management_need} | {weight} | |
| {tenant_scoping} | High | |
| {tool_complexity} | {weight} | |

### Action 9: Generate Recommendation

**Runtime Recommendation:**

```markdown
## Recommended Runtime: {runtime_name}

### Primary Rationale
- {Key reason 1 matching Step 01 requirements}
- {Key reason 2 matching Step 01 requirements}
- {Key reason 3 matching Step 01 requirements}

### Tenant Isolation Approach
- {How tenant isolation will be implemented}
- {Tenant context propagation pattern}

### Trade-offs Accepted
| Limitation | Mitigation |
|------------|------------|
| {limitation_1} | {mitigation_1} |
| {limitation_2} | {mitigation_2} |

### Alternative Consideration
If {condition}, consider {alternative_runtime} because {reason}.
```

---

## COLLABORATION MENUS (A/P/C)

After presenting runtime analysis and recommendation:

```
================================================================================
RUNTIME ANALYSIS COMPLETE
================================================================================

RECOMMENDED RUNTIME: {runtime_name}
SCORE: {score}/30

TOP ALTERNATIVES:
1. {alternative_1}: {score}/30
2. {alternative_2}: {score}/30

================================================================================
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific runtime capabilities
- **P (Party Mode)**: Gather architect and DevOps perspectives on runtime choice
- **C (Continue)**: Accept recommendation and proceed to design step

Select an option:
================================================================================
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):

Invoke `bmad-advanced-elicitation` skill to explore:

| Topic | Questions to Explore |
|-------|---------------------|
| **Scalability** | How does each runtime scale with tenant count? |
| **Migration Path** | Can we switch runtimes later if needed? |
| **Team Skills** | Does team have experience with recommended runtime? |
| **Production Cases** | What production deployments exist for each? |
| **Cost Implications** | What are the infrastructure costs per runtime? |
| **Vendor Lock-in** | How dependent are we on the runtime vendor? |

Pass context: Step 01 requirements, current comparison matrix, specific concerns.

**After processing enhanced insights, return to A/P/C menu.**

#### If 'P' (Party Mode):

Invoke `bmad-party-mode` skill with context:

```
Review AI runtime selection for multi-tenant SaaS:
- Requirements: {orchestration_style}, {state_management}, {tenant_scoping}
- Recommended: {runtime_name}
- Alternatives: {alternatives}
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| **Architect** | Technical fit | Does runtime match architectural patterns? |
| **DevOps** | Operational complexity | Can team operate and monitor this runtime? |
| **Security** | Tenant isolation | Does runtime support required isolation? |
| **Product** | Feature velocity | Will runtime accelerate or slow delivery? |

Process multi-perspective analysis and synthesize into refined recommendation.

**After processing perspectives, return to A/P/C menu.**

#### If 'C' (Continue):

1. Record the runtime analysis in working document:

```yaml
# Add to agent-runtime-analysis.md
runtime_selection:
  recommended: {runtime_name}
  score: {score}
  alternatives:
    - name: {alt_1}
      score: {score}
    - name: {alt_2}
      score: {score}
  rationale: {primary_rationale}
  tenant_approach: {tenant_isolation_approach}
analysis_completed_at: {timestamp}
```

2. Update workflow state:

```yaml
stepsCompleted:
  - step-01-c-start
  - step-02-c-analyze  # Add this
currentStep: step-03-c-design
```

3. Proceed to NEXT STEP.

---

## SUCCESS METRICS

- ✅ All 6 runtime options analyzed (LangGraph, CrewAI, AutoGen, DSPy, Instructor, Custom)
- ✅ Each runtime scored on 6 dimensions
- ✅ Comparison matrix completed with totals
- ✅ Requirements from Step 01 mapped to runtime strengths
- ✅ Web research performed for each runtime
- ✅ Clear recommendation with rationale documented
- ✅ Trade-offs explicitly acknowledged
- ✅ User confirmed selection via A/P/C menu

---

## FAILURE MODES

- ❌ **Analyzing without Step 01 requirements:** Recommendations not grounded in needs
- ❌ **Skipping runtime options:** Incomplete comparison, may miss better fit
- ❌ **Ignoring tenant isolation:** Multi-tenant requirements not addressed
- ❌ **No web research:** May miss recent runtime updates or issues
- ❌ **Unclear recommendation:** User cannot make informed decision
- ❌ **Proceeding without A/P/C:** User not engaged in runtime selection

---

## NEXT STEP

After user confirms runtime selection with 'C':

1. Record the runtime selection in working document
2. Proceed to `step-03-c-design.md` to design agent architecture
3. The runtime selection informs:
   - Agent graph/workflow structure
   - State management patterns
   - Tool registry design
   - Tenant context injection

**Transition to Step 03 with:**
- Selected runtime: `{runtime_name}`
- Key capabilities: `{runtime_strengths}`
- Tenant approach: `{tenant_isolation_pattern}`
- Trade-offs accepted: `{acknowledged_limitations}`
