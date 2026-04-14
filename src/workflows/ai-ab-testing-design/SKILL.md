---
name: ai-ab-testing-design
displayName: AI A/B Testing Design
description: Design A/B testing framework for AI models and prompts. Use when the user requests to 'design AI A/B testing' or 'create prompt testing framework'.
module: bam
tags: [ai-testing, experimentation]
---

# AI A/B Testing Design

## Overview

This workflow defines the A/B testing framework for AI models, prompts, and agent configurations. It produces the experimentation architecture that enables data-driven optimization of AI features. Run after agent-runtime-architecture, enables continuous improvement.

Act as an AI Experimentation Architect specializing in controlled experiments for LLM-based systems with multi-tenant isolation requirements.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Designing AI model comparison experiments
- Implementing prompt A/B testing
- Establishing experiment analysis pipelines
- Configuring per-tenant experiment isolation

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new A/B testing architecture | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing testing framework | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against experimentation criteria | `step-20-v-*` to `step-22-v-*` |

## Workflow

### Step 1: Experiment Framework Design

Design core experimentation infrastructure:
- Experiment definition schema
- Variant assignment algorithms
- Traffic allocation strategies
- Tenant-scoped experiments

### Step 2: Model Variant Management

Design model variant system:
- Model versioning integration
- Prompt variant storage
- Configuration variant management
- Rollout percentage controls

### Step 3: Metrics Collection Design

Design experiment metrics pipeline:
- Primary and guardrail metrics
- Statistical significance calculation
- Real-time vs batch analysis
- Per-tenant metric isolation

### Step 4: Analysis and Decision Engine

Design experiment analysis system:
- Automated winner detection
- Early stopping rules
- Multi-armed bandit integration
- Decision documentation

### Quality Gates

This workflow contributes to:
- **QG-M3** (Agent Runtime Gate) - Validates AI experimentation within agent runtime

- [ ] Experiment schema defined
- [ ] Variant assignment documented
- [ ] Metrics pipeline designed
- [ ] Analysis engine specified
- [ ] Per-tenant isolation verified

## Output

- `{output_folder}/planning-artifacts/architecture/ai-ab-testing-design.md`
- `{output_folder}/planning-artifacts/architecture/experiment-schema.md`

## References

- Template: `bam/templates/ai-ab-testing-template.md`
- Knowledge: `bam/knowledge/agent-runtime-patterns.md`

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Source citations: `_Source: [URL]_`
