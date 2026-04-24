---
name: bmad-bam-ai-guardrails-implementation
displayName: AI Guardrails Implementation
description: Design AI content filtering and output validation guardrails. Use when the user requests to 'implement AI guardrails' or 'design content filtering'.
module: bam
tags: [ai-safety, guardrails]
---

# AI Guardrails Implementation

## Overview

This workflow defines the content filtering, output validation, and safety guardrails for AI agent responses. It produces the guardrail architecture that governs all AI outputs in the platform. Run after agent-runtime-architecture, before production deployment.

Act as an AI Safety Architect specializing in content moderation and output validation systems for multi-tenant AI platforms.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Implementing content filtering for AI outputs
- Designing output validation pipelines
- Establishing safety guardrails for multi-tenant AI
- Configuring per-tenant safety policies

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new guardrails architecture | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing guardrails | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against safety criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Previous workflow outputs available (if applicable)
- **Config required:** See `On Activation` section

## Workflow

### Step 1: Input Filtering Design

Design input validation and prompt injection prevention:
- Input sanitization rules
- Prompt injection detection
- Content classification (PII, sensitive data)
- Per-tenant input policies

### Step 2: Output Validation Design

Design output validation pipeline:
- Content safety scoring
- Factual accuracy checks
- Brand safety filters
- Tenant-specific output rules

### Step 3: Guardrail Framework Selection

Select and configure guardrail frameworks:
- NeMo Guardrails integration
- LlamaGuard evaluation
- Custom rule engines
- Real-time vs batch validation

### Step 4: Policy Engine Design

Design tenant-configurable policy engine:
- Policy definition schema
- Severity levels and actions
- Override hierarchies
- Audit logging

### Quality Gates

- [ ] Input filtering rules defined
- [ ] Output validation pipeline documented
- [ ] Guardrail framework selected with justification
- [ ] Policy engine schema defined
- [ ] Per-tenant configuration supported

## Quality Gates

This workflow contributes to:
- **QG-M3** (Agent Runtime) - Validates agent safety guardrails
- **QG-I3** (Agent Safety) - Provides foundation for agent safety verification

### Entry Gate
- QG-F1 (Foundation) must pass before starting
- Agent runtime architecture must be complete

### Exit Gate
- QG-M3 checklist items from `qg-m3-agent-runtime.md` verified
- Guardrails architecture documented
- Policy engine designed

## Output

- `{output_folder}/planning-artifacts/architecture/ai-guardrails-design.md`
- `{output_folder}/planning-artifacts/architecture/content-policy-schema.md`

## References

- Template: `{project-root}/_bmad/bam/data/templates/ai-guardrails-template.md`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/agent-runtime-patterns.md`
- Checklist: `{project-root}/_bmad/bam/data/checklists/qg-m3-agent-runtime.md`

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
