---
name: llm-evaluation-pipeline
displayName: LLM Evaluation Pipeline
description: Design automated LLM evaluation for CI/CD including metrics, benchmarks, and regression testing. Use when the user requests to 'design LLM evaluation' or 'create AI testing pipeline'.
module: bam
tags: [ai-runtime, evaluation, testing]
---

# LLM Evaluation Pipeline

## Overview

This workflow defines the automated LLM evaluation pipeline including metric selection, benchmark suites, A/B testing setup, regression tests, and human evaluation integration for AI agents in multi-tenant environments. It produces the evaluation framework that ensures AI quality and safety in CI/CD. Run after agent runtime architecture is defined.

Act as an AI Evaluation Engineer specializing in LLM testing with multi-tenant quality requirements.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Establishing automated LLM evaluation in CI/CD
- Defining quality metrics for AI agents
- Creating benchmark suites for regression testing
- Integrating human evaluation workflows

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new evaluation pipeline | `step-01-c-*` to `step-05-c-*` |
| Edit | Modify existing evaluation | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against QG-I3 criteria | `step-20-v-*` to `step-22-v-*` |

## Workflow

### Step 1: Metric Selection

Define evaluation metrics:

- Task-specific metrics (accuracy, F1, BLEU, ROUGE)
- Safety metrics (toxicity, bias, hallucination)
- Performance metrics (latency, cost, throughput)
- User satisfaction metrics (ratings, feedback)
- Tenant-specific custom metrics

### Step 2: Benchmark Suite

Design benchmark infrastructure:

- Golden task dataset creation
- Domain-specific test cases
- Adversarial test cases
- Multi-tenant test scenarios
- Automated data refresh

### Step 3: A/B Testing Setup

Configure A/B testing:

- Experiment infrastructure
- Statistical analysis pipeline
- Feature flag integration
- Winner determination criteria
- Rollout automation

### Step 4: Regression Tests

Design regression testing:

- Baseline establishment
- Regression detection thresholds
- Automated alerts
- CI/CD integration points
- Test coverage requirements

### Step 5: Human Evaluation Integration

Integrate human evaluation:

- Evaluation workflow design
- Annotator guidelines
- Inter-rater reliability metrics
- Human-in-the-loop triggers
- Feedback incorporation pipeline

**Soft Gate:** Steps 1-5 complete the evaluation pipeline design. Present a summary and ask for confirmation.

### Quality Gates

- [ ] Core metrics defined
- [ ] Benchmark suite created
- [ ] A/B testing operational
- [ ] Regression tests in CI/CD
- [ ] Human evaluation integrated

## Quality Gates

This workflow contributes to:
- **QG-I3** (Agent Safety) - Validates agent evaluation and safety verification

### Entry Gate
- QG-M3 (Agent Runtime) should pass before starting
- Agent runtime architecture should be complete

### Exit Gate
- QG-I3 checklist items for evaluation verified
- Evaluation pipeline documented
- CI/CD integration complete

## Output

- `{output_folder}/planning-artifacts/architecture/llm-evaluation-pipeline.md`
- `{output_folder}/planning-artifacts/testing/benchmark-suite-design.md`

## References

- Template: `{project-root}/_bmad/bam/data/templates/ai-eval-report-template.md`
- Agent Runtime Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/agent-runtime-patterns.md`
- Checklist: `{project-root}/_bmad/bam/data/checklists/qg-i3-agent-safety.md`

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
