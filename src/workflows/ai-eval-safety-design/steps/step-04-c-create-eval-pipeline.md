# Step 4: Create Eval Pipeline

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

Design the automated evaluation pipeline for continuous safety assessment.

## Prerequisites

- Guardrails configured (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: testing-agent-safety
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: observability
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: llmops
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: testing-isolation


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Design the automated evaluation pipeline for continuous safety assessment:

## Pipeline Components

**Test Runner:**
- Golden task execution engine
- Parallel execution support
- Tenant context simulation
- Result collection and aggregation

**Evaluators:**
- Automated scoring functions
- LLM-as-judge configurations
- Human review integration points
- Regression detection logic

**Reporters:**
- Test result summaries
- Trend analysis and dashboards
- Failure investigation reports
- Compliance documentation

## Evaluation Metrics

Define metrics for each safety dimension:
- **Safety Score**: Percentage of safety tests passed
- **Rejection Rate**: False positive rate for valid requests
- **Detection Rate**: True positive rate for attacks
- **Latency Impact**: Guardrail overhead measurement
- **Coverage**: Percentage of code paths tested

## Pipeline Stages

1. **Pre-deployment**: Full golden task suite
2. **Canary**: Subset with real traffic shadow
3. **Production**: Continuous sampling evaluation
4. **Regression**: Triggered on model/prompt changes

## Integration Points

- CI/CD pipeline hooks
- Model deployment gates
- Prompt update validation
- Incident response triggers

Output: Eval pipeline architecture with implementation specifications.

**Verify current best practices with web search:**
Search the web: "AI evaluation pipeline AI agent patterns {date}"
Search the web: "AI evaluation pipeline LLM orchestration {date}"

_Source: [URL]_

## Soft Gate Checkpoint

**Steps 1-4 complete the safety evaluation infrastructure.**

Present summary of:
- Safety criteria and golden task library
- Guardrail configuration (input, output, execution)
- Eval pipeline architecture with metrics and integration points

Ask for confirmation before proceeding to production monitoring setup.

---

## COLLABORATION MENUS (A/P/C):

After completing the eval pipeline design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into pipeline stages, metrics, and integration points
- **P (Party Mode)**: Bring MLOps Engineer, DevOps Architect, and Quality Assurance Lead perspectives
- **C (Continue)**: Accept eval pipeline architecture and proceed to Step 5: Setup Monitoring
- **Refine metrics**: Describe specific metric or threshold concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: pipeline components, evaluation metrics, stage definitions, CI/CD integration
- Process enhanced insights
- Ask user: "Accept these refined pipeline specifications? (y/n)"
- If yes, integrate into eval pipeline document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review eval pipeline architecture for continuous safety assessment"
- Process MLOps Engineer, DevOps Architect, Quality Assurance Lead perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save eval pipeline architecture to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-setup-monitoring.md`

---

## Verification

- [ ] Pipeline components designed
- [ ] Evaluation metrics defined
- [ ] Pipeline stages specified
- [ ] Integration points identified
- [ ] CI/CD hooks configured
- [ ] Patterns align with pattern registry

## Outputs

- Eval pipeline architecture
- Implementation specifications
- **Load template:** `{project-root}/_bmad/bam/data/templates/benchmark-results-template.md`

## Next Step

Proceed to `step-05-c-setup-monitoring.md` to configure production monitoring.
