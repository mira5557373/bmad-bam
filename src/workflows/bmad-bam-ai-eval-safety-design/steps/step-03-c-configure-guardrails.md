# Step 3: Configure Guardrails

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

Design and configure the guardrail system for runtime safety.

## Prerequisites

- Golden tasks designed (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: testing-agent-safety
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: agent-runtime
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: testing-agent-safety


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Design and configure the guardrail system for runtime safety:

## Input Guardrails

Configure pre-execution checks:
- Input content filtering (toxicity, PII detection)
- Prompt injection detection patterns
- Input length and complexity limits
- Schema validation for structured inputs

## Output Guardrails

Configure post-execution checks:
- Output content filtering
- PII redaction rules
- Hallucination detection thresholds
- Response format validation

## Execution Guardrails

Configure runtime controls:
- Tool permission enforcement
- Memory access controls
- Cost and token budgets
- Execution time limits
- Concurrency limits

## Guardrail Configuration

For each guardrail, specify:
- Trigger conditions
- Action on trigger (block, warn, log, escalate)
- Bypass conditions (if any)
- Tenant tier overrides
- Monitoring and alerting rules

## Guardrail Hierarchy

Define the evaluation order:
1. System-level guardrails (non-negotiable)
2. Tenant-level guardrails (configurable per tier)
3. Agent-level guardrails (specific to agent type)
4. Task-level guardrails (context-specific)

Output: Guardrail configuration document with all rules and thresholds.

**Verify current best practices with web search:**
Search the web: "AI guardrails configuration AI agent patterns {date}"
Search the web: "AI guardrails configuration LLM orchestration {date}"

_Source: [URL]_

## COLLABORATION MENUS (A/P/C):

After completing the guardrail configuration above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into guardrail triggers, thresholds, and bypass conditions
- **P (Party Mode)**: Bring Security Engineer, Platform Architect, and Compliance Auditor perspectives
- **C (Continue)**: Accept guardrail configuration and proceed to Step 4: Create Eval Pipeline
- **Adjust hierarchy**: Describe specific guardrail ordering or tier concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: guardrail types, hierarchy, tier overrides, bypass conditions
- Process enhanced insights
- Ask user: "Accept these refined guardrail configurations? (y/n)"
- If yes, integrate into guardrail document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review guardrail configuration for runtime safety covering input, output, and execution controls"
- Process Security Engineer, Platform Architect, Compliance Auditor perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save guardrail configuration to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-create-eval-pipeline.md`

---

## Verification

- [ ] Input guardrails configured
- [ ] Output guardrails configured
- [ ] Execution guardrails configured
- [ ] Guardrail hierarchy defined
- [ ] Tier overrides specified
- [ ] Patterns align with pattern registry

## Outputs

- Guardrail configuration document
- Rules and thresholds specification
- **Load template:** `{project-root}/_bmad/bam/data/templates/guardrail-config-template.md`

## Next Step

Proceed to `step-04-c-create-eval-pipeline.md` to build the evaluation pipeline.
