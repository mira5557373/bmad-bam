---
name: bmad-bam-prompt-versioning-management
displayName: Prompt Versioning Management
description: Design prompt versioning, A/B testing, and rollback strategies for AI agents. Use when the user requests to 'design prompt versioning' or 'manage prompt lifecycle'.
module: bam
tags: [ai-runtime, prompt-management]
---

# Prompt Versioning Management

## Overview

This workflow defines the prompt versioning schema, A/B testing framework, rollback procedures, and deployment pipeline for AI prompts across multi-tenant environments. It produces the architectural decisions that govern all prompt lifecycle management in the platform. Run after master PRD and agent runtime architecture are defined.

Act as an AI Runtime Architect specializing in LLM prompt engineering with multi-tenant versioning requirements.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Establishing prompt versioning strategy for AI agents
- Implementing A/B testing for prompt improvements
- Designing rollback mechanisms for prompt failures
- Creating prompt deployment pipelines

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new prompt versioning architecture | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing prompt versioning | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against QG-M3 criteria | `step-20-v-*` to `step-22-v-*` |

## Workflow

### Step 1: Version Schema Design

Define prompt versioning schema:

- Semantic versioning for prompts (major.minor.patch)
- Prompt metadata structure (model compatibility, context window, temperature)
- Version history and diff tracking
- Tenant-specific prompt overrides
- Multi-language prompt variants

### Step 2: A/B Testing Framework

Design A/B testing infrastructure:

- Traffic splitting configuration (per tenant, per feature)
- Metric collection and comparison
- Statistical significance thresholds
- Winner declaration criteria
- Gradual rollout strategy

### Step 3: Rollback Procedures

Define rollback mechanisms:

- Automatic rollback triggers (error rate, latency degradation)
- Manual rollback workflow
- Version pinning for critical tenants
- Rollback verification tests
- Communication and notification procedures

### Step 4: Deployment Pipeline

Create prompt deployment pipeline:

- CI/CD integration for prompts
- Environment promotion (dev -> staging -> prod)
- Approval gates for production
- Canary deployment strategy
- Feature flag integration

**Soft Gate:** Steps 1-4 complete the prompt versioning design. Present a summary and ask for confirmation.

### Quality Gates

- [ ] Version schema supports tenant overrides
- [ ] A/B testing metrics defined
- [ ] Rollback triggers documented
- [ ] Deployment pipeline with approval gates
- [ ] Kill switch mechanism defined

## Quality Gates

This workflow contributes to:
- **QG-M3** (Agent Runtime) - Validates prompt management within agent runtime

### Entry Gate
- QG-F1 (Foundation) must pass before starting
- Agent runtime architecture should be complete

### Exit Gate
- QG-M3 checklist items for prompt management verified
- Prompt versioning architecture documented with ADRs
- Rollback and A/B testing mechanisms defined

## Output

- `{output_folder}/planning-artifacts/architecture/prompt-versioning-architecture.md`
- `{output_folder}/planning-artifacts/architecture/prompt-ab-testing-design.md`

## References

- Template: `{project-root}/_bmad/bam/data/templates/prompt-version-template.md`
- AI Model Versioning: `{project-root}/_bmad/bam/data/agent-guides/bam/llm-versioning.md`
- Agent Runtime Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/agent-runtime-patterns.md`
- Checklist: `{project-root}/_bmad/bam/data/checklists/qg-m3-agent-runtime.md`

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
