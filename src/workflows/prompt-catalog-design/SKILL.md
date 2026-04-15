---
name: prompt-catalog-design
displayName: Prompt Catalog Design
description: Design prompt library and catalog management for multi-tenant AI platforms. Use when the user requests to 'design prompt catalog' or 'manage prompt library'.
module: bam
tags: [ai-runtime, prompt-management, catalog]
---

# Prompt Catalog Design

## Overview

This workflow defines the prompt library architecture, catalog management system, tenant isolation for prompts, versioning strategy, testing framework, A/B testing configuration, performance tracking, access control, and documentation standards for AI prompts across multi-tenant environments. It produces the architectural decisions that govern all prompt catalog management in the platform. Run after master PRD and agent runtime architecture are defined.

Act as an AI Runtime Architect specializing in LLM prompt engineering with multi-tenant catalog management requirements.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Establishing prompt library architecture for AI agents
- Designing catalog management with tenant isolation
- Creating prompt testing and validation frameworks
- Implementing A/B testing for prompt improvements
- Designing performance tracking for prompt effectiveness

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new prompt catalog architecture | `step-01-c-*` to `step-09-c-*` |
| Edit | Modify existing prompt catalog | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against QG-M3 criteria | `step-20-v-*` to `step-22-v-*` |

## Workflow

### Step 1: Catalog Requirements

Define prompt catalog requirements:

- Prompt library organizational structure
- Tenant-specific catalog requirements
- Search and discovery capabilities
- Metadata and tagging standards
- Integration points with AI runtime

### Step 2: Prompt Taxonomy

Design prompt classification system:

- Category hierarchy (system, user, few-shot, chain-of-thought)
- Use case classification
- Model compatibility tagging
- Risk and compliance classification
- Language and locale support

### Step 3: Tenant Isolation

Design tenant isolation for prompts:

- Multi-tenant prompt ownership model
- Shared vs tenant-specific prompts
- Permission inheritance hierarchy
- Cross-tenant prompt sharing controls
- Audit trail for prompt access

### Step 4: Versioning Strategy

Define catalog versioning approach:

- Semantic versioning for catalog entries
- Deprecation and sunset policies
- Breaking change management
- Migration path documentation
- Backward compatibility guarantees

### Step 5: Prompt Testing Framework

Design prompt testing infrastructure:

- Unit testing for individual prompts
- Integration testing with AI runtime
- Regression testing automation
- Golden dataset management
- Test coverage metrics

### Step 6: A/B Testing

Design A/B testing for catalog prompts:

- Experiment configuration
- Traffic splitting per tenant
- Metric collection and comparison
- Statistical significance thresholds
- Winner promotion workflow

### Step 7: Performance Tracking

Define performance monitoring:

- Prompt effectiveness metrics
- Latency and token usage tracking
- Cost attribution per prompt
- Quality score aggregation
- Alerting thresholds

### Step 8: Access Control

Design access control model:

- Role-based prompt permissions
- Tenant admin capabilities
- Platform admin overrides
- API key scoping
- Audit logging requirements

### Step 9: Documentation

Create documentation standards:

- Prompt documentation templates
- Usage guidelines and examples
- Best practices library
- Change log requirements
- Training materials

**Soft Gate:** Steps 1-9 complete the prompt catalog design. Present a summary and ask for confirmation.

### Quality Gates

- [ ] Catalog structure supports tenant isolation
- [ ] Taxonomy enables effective discovery
- [ ] Versioning strategy defined
- [ ] Testing framework documented
- [ ] Access control model complete

## Quality Gates

This workflow contributes to:
- **QG-M3** (Agent Runtime) - Validates prompt management within agent runtime

### Entry Gate
- QG-F1 (Foundation) must pass before starting
- Agent runtime architecture should be complete

### Exit Gate
- QG-M3 checklist items for prompt management verified
- Prompt catalog architecture documented with ADRs
- Testing and access control mechanisms defined

## Output

- `{output_folder}/planning-artifacts/prompt-catalog-spec.md`

## References

- Template: `{project-root}/_bmad/bam/data/templates/prompt-catalog-template.md`
- Prompt Versioning: `bmad-bam-prompt-versioning-management`
- Agent Runtime Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/agent-runtime-patterns.md`
- Checklist: `{project-root}/_bmad/bam/data/checklists/qg-m3-agent-runtime.md`

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
