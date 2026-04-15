---
name: ai-eval-safety-design
displayName: AI Eval Safety Design
description: Design AI evaluation metrics and safety strategy. Use when the user requests to 'design AI eval strategy' or 'create safety cases'.
module: bam
tags: [ai-runtime]
---

# AI Eval Safety Design

## Overview

This workflow creates the evaluation strategy, golden task suite, safety cases, fallback rules, and refusal rules for the AI runtime. It ensures all agentic features have measurable quality thresholds, comprehensive safety testing, and graceful degradation paths. Run after runtime architecture is defined.

Act as an AI Runtime Architect designing evaluation and safety strategy.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing AI evaluation metrics and quality thresholds
- Creating golden task suites for agent testing
- Building safety cases for prompt injection and PII handling
- Defining fallback and refusal rules for agents

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Evaluation Strategy

Define metrics and methods:

- Accuracy, relevance, latency, cost per agent type
- Evaluation methods: automated (Ragas, DeepEval), LLM-as-judge, human review
- Pass thresholds per metric (absolute minimums + target levels)
- Regression detection rules

### Step 2: Golden Task Curation

Create diverse test cases per agent type:

- Happy path tasks (expected behavior)
- Edge cases (boundary conditions, unusual inputs)
- Multi-turn conversations (context retention)
- Tier-specific tasks (FREE vs PRO vs ENTERPRISE behavior)
- Expected outputs for each task

### Step 3: Safety Case Design

- Prompt injection tests (direct and indirect)
- PII handling tests (detection, anonymization, leakage prevention)
- Harmful content tests (generation and response to)
- Tenant isolation tests (agent A cannot access tenant B data/memory)
- Cross-tenant memory contamination tests
- NeMo Guardrails integration tests (input/output/action rails)

**Soft Gate:** Steps 1-3 complete the evaluation and safety design. Present a summary of eval strategy, golden tasks, and safety cases. Ask for confirmation before proceeding to fallback and refusal rules.

### Step 4: Fallback Rule Design

- Graceful degradation scenarios (LLM down, tool unavailable, memory unavailable)
- Retry logic with exponential backoff
- Human escalation triggers (confidence below threshold, high-risk action)
- Tier-specific fallback behavior (Enterprise gets priority)

### Step 5: Refusal Rule Design

- Explicit refusal scenarios (out-of-scope requests, dangerous actions)
- Refusal messages (tier-appropriate: generic for FREE, contextual for PRO, custom for ENTERPRISE)
- Logging requirements for refusals (audit trail)

### Quality Gates

- [ ] Eval metrics defined with thresholds per agent type
- [ ] Golden tasks cover happy/edge/safety cases
- [ ] Safety tests comprehensive (injection, PII, isolation)
- [ ] Fallback/refusal rules complete with tier awareness

## Quality Gates

This workflow contributes to:
- **QG-I3** (Agent Safety) - Defines evaluation strategy and safety test cases
- **QG-I2** (Tenant Safety) - Tenant isolation tests for agent memory/data

### Entry Gate
- QG-M3 (Agent Runtime) must pass before designing eval strategy
- Agent runtime architecture must be defined

### Exit Gate
- QG-I3 checklist items from `qg-i3-agent-safety.md` verified
- Evaluation metrics and golden tasks documented
- Safety cases cover injection, PII, and tenant isolation

## Output

- `{output_folder}/planning-artifacts/quality/eval-strategy.md`
- Golden task dataset
- Safety test cases

## References

- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/agent-runtime-patterns.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/agent-resilience-patterns.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/testing-agent-safety.md`
- AI Model Versioning: `{project-root}/_bmad/bam/data/agent-guides/bam/llm-versioning.md`

- Checklist: `{project-root}/_bmad/bam/data/checklists/qg-i3-agent-safety.md`
- AI Model Versioning: `{project-root}/_bmad/bam/data/agent-guides/bam/llm-versioning.md`
