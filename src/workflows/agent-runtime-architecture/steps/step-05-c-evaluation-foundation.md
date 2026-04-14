# Step 5: Evaluation Foundation

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

Establish a systematic evaluation framework to measure agent performance, detect regressions, and ensure quality across deployments.

---

## Prerequisites

- Approval workflow design complete (Step 4)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: agent-runtime,llmops
- **Web research (if available):** Search for current AI evaluation best practices

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Create Golden Task Templates

- Diverse test cases per agent type (simple, complex, edge cases)
- Expected outputs and acceptable variations
- Coverage across all supported tool combinations
- Tenant-specific evaluation scenarios

### 2. Define Metric Specifications

| Metric | Description | Target |
|--------|-------------|--------|
| Accuracy | Task completion correctness | {threshold} |
| Relevance | Response quality and context appropriateness | {threshold} |
| Latency | End-to-end response time (p50, p95, p99) | {thresholds} |
| Cost | Token usage and tool invocation costs | {budget} |
| Safety | Guardrail violation rate, harmful output detection | {threshold} |

### 3. Configure Thresholds and Alerts

- Per-metric pass/fail thresholds
- Degradation alerts (percentage drop from baseline)
- Tenant tier-specific quality targets

### 4. Establish Regression Baselines

- Capture baseline metrics before each deployment
- Automated comparison against historical performance
- Rollback triggers when thresholds exceeded

### 5. Implement LLM-as-Judge Evaluation

- Judge prompt templates for subjective quality
- Multi-judge consensus for reliability
- Human calibration of judge accuracy

**Verify current best practices with web search:**
Search the web: "AI agent evaluation AI agent patterns {date}"
Search the web: "AI agent evaluation LLM orchestration {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-5 complete the full runtime architecture design.**

Present summary of:
- Orchestration model and tool registry
- Memory tier and approval workflow design
- Evaluation framework with golden tasks and metrics

Ask for confirmation before proceeding to kill switch design.

---

## COLLABORATION MENUS (A/P/C):

After completing the evaluation foundation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into metric specifications or golden task design
- **P (Party Mode)**: Bring QA and ML engineer perspectives on evaluation strategy
- **C (Continue)**: Accept evaluation foundation and proceed to kill switch design
- **[Specific refinements]**: Describe evaluation concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: golden tasks, metrics, thresholds, baselines
- Process enhanced insights on evaluation effectiveness
- Ask user: "Accept these refined evaluation decisions? (y/n)"
- If yes, integrate into evaluation specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review AI agent evaluation framework for multi-tenant platform"
- Process QA and ML engineer perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save evaluation foundation to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Proceed to next step: `step-06-c-kill-switch-design.md`

---

## Verification

- [ ] Golden task templates created
- [ ] Metric specifications complete
- [ ] Thresholds and alerts configured
- [ ] Regression baselines established
- [ ] LLM-as-judge evaluation configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Golden task dataset per agent type
- Metric definition document with thresholds
- Evaluation pipeline configuration
- Baseline snapshot storage schema

---

## Next Step

Proceed to `step-06-c-kill-switch-design.md` to design safety controls.
