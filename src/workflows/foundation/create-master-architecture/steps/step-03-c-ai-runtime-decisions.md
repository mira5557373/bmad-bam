# Step 3: AI Runtime Decisions

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

Define the architecture for AI agent operations including agent management, tool access, memory systems, safety controls, and evaluation. These decisions establish how AI capabilities are integrated safely and effectively into the multi-tenant platform.

---

## Prerequisites

- Tenant model decisions complete (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: agent-runtime,memory-tiers,tool-execution,run-contracts
- **Load patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`

**Verify current best practices with web search:**
Search the web: "AI agent runtime best practices {date}"
Search the web: "AI agent runtime multi-tenant SaaS {date}"

Reference web research findings in your analysis.
_Source: [URL]_ for key findings.

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Design Agent Registry

- Define agent type taxonomy (task-specific, conversational, autonomous)
- Specify agent configuration schema (model, temperature, max tokens, tools)
- Document agent versioning strategy (semantic versioning, A/B testing)
- Define agent lifecycle states (draft, active, deprecated, disabled)
- Specify per-tenant agent customization boundaries

### 2. Design Tool Registry with Permission Policies

- Catalog available tools and their capabilities
- Define permission model (role-based, tenant-based, approval-required)
- Specify tool input/output validation requirements
- Document tool rate limiting and quota policies
- Define tool dependency declarations
- Establish tool audit logging requirements

### 3. Define Memory Tier Rules

Using memory tier patterns from `bam-patterns.csv`:

| Tier | Scope | TTL | Size Limits |
|------|-------|-----|-------------|
| Working | Conversation | Session | Per request |
| Episodic | User session | Hours | Per user |
| Semantic | Tenant knowledge | Days/Weeks | Per tenant |
| Procedural | Agent skills | Persistent | Per agent |
| Collective | Platform-wide | Persistent | Global |

### 4. Establish Safety Requirements

- Define guardrail types (input filtering, output filtering, action limits)
- Specify kill switch mechanisms (agent disable, tool disable, tenant block)
- Document fallback behavior requirements (graceful degradation paths)
- Establish content moderation policies
- Define escalation procedures for safety events

### 5. Define Evaluation Requirements

- Specify golden task format and coverage requirements
- Define evaluation metrics (accuracy, latency, cost, safety)
- Establish threshold requirements for production deployment
- Document regression testing requirements
- Define continuous evaluation monitoring

---

## COLLABORATION MENUS (A/P/C):

After completing the AI runtime analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into agent safety and evaluation requirements
- **P (Party Mode)**: Bring AI architect and security perspectives
- **C (Continue)**: Accept AI runtime decisions and proceed to module boundaries
- **[Specific refinements]**: Describe what you'd like to adjust

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: selected AI runtime, safety requirements, memory tier design
- Process enhanced insights on AI architecture decisions
- Ask user: "Accept these refined decisions? (y/n)"
- If yes, integrate into AI runtime specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review AI runtime architecture: {ai_runtime} with {safety requirements}"
- Process AI architect and security perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save AI runtime decisions to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-module-boundary-rules.md`

---

## Soft Gate Checkpoint

**Steps 1-3 complete the core platform design (discovery, tenant model, AI runtime).**

Present summary of:
- Agent registry and tool permission model
- Memory tier architecture
- Safety requirements and evaluation framework

Ask for confirmation before proceeding to module boundary rules.

---

## Verification

- [ ] All agent types have defined configurations
- [ ] Tool permissions cover all access scenarios
- [ ] Memory tiers have clear boundaries and retention rules
- [ ] Safety controls include kill switches at multiple levels
- [ ] Evaluation thresholds defined for all critical metrics
- [ ] Patterns align with pattern registry

---

## Outputs

- Agent registry specification
- Tool permission policy document
- Memory architecture design
- Safety requirements specification
- Evaluation framework documentation
- **Load template:** `{project-root}/_bmad/bam/data/templates/agent-runtime-architecture-template.md`

---

## Next Step

Proceed to `step-04-c-module-boundary-rules.md` to establish module encapsulation rules.
