---
name: bmad-bam-model-deployment-pipeline
displayName: Model Deployment Pipeline
description: Design model deployment and release pipeline for multi-tenant AI platforms. Use when the user requests to 'design model deployment' or 'create model release pipeline'.
module: bam
tags: [deployment, model, release, rollout, ai]
---

# Model Deployment Pipeline

## Overview

This workflow designs the model deployment and release pipeline for multi-tenant AI platforms. It covers deployment strategies, tenant-specific rollout procedures, canary deployments, model validation gates, rollback procedures, A/B testing frameworks, monitoring integration, tenant notifications, and comprehensive documentation. The output enables safe, controlled model releases across tenant tiers with proper isolation and rollback capabilities.

Act as an MLOps Architect specializing in multi-tenant model deployment with safety-first release practices.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing model deployment pipelines for AI platforms
- Creating tenant-aware model rollout procedures
- Establishing canary deployment and A/B testing frameworks
- Defining model validation gates and rollback procedures
- Setting up monitoring and alerting for model releases

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new model deployment pipeline | `step-01-c-*` to `step-09-c-*` |
| Edit | Modify existing deployment pipeline | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against quality criteria | `step-20-v-*` to `step-22-v-*` |

## Workflow

### Step 1: Deployment Strategy

Define the core deployment strategy:

- Blue-green vs canary vs rolling deployment
- Model versioning and artifact management
- Container/serverless deployment targets
- Infrastructure requirements per tenant tier

### Step 2: Tenant Rollout

Design tenant-specific rollout procedures:

- Tier-based rollout sequencing (Enterprise first vs Free first)
- Tenant opt-in/opt-out mechanisms
- Rollout scheduling and windows
- Tenant communication triggers

### Step 3: Canary Deployment

Configure canary release process:

- Traffic percentage progression (1% -> 5% -> 25% -> 100%)
- Metrics collection during canary phase
- Automatic rollback triggers
- Manual promotion gates

**Soft Gate:** Steps 1-3 complete the core deployment design. Present a summary of deployment strategy, tenant rollout, and canary configuration. Ask for confirmation before proceeding to validation and safety procedures.

### Step 4: Model Validation

Establish model validation gates:

- Pre-deployment validation checks
- Performance benchmarking requirements
- Safety evaluation criteria
- Regression testing thresholds

### Step 5: Rollback Procedures

Define rollback mechanisms:

- Automatic rollback triggers
- Manual rollback procedures
- Data consistency during rollback
- Tenant notification during rollback

### Step 6: A/B Testing

Design A/B testing framework:

- Experiment configuration
- Tenant assignment to variants
- Metrics collection and analysis
- Statistical significance requirements

**Soft Gate:** Steps 4-6 complete the safety and testing design. Present a summary of validation gates, rollback procedures, and A/B testing framework. Ask for confirmation before proceeding to monitoring and documentation.

### Step 7: Monitoring Integration

Configure monitoring and alerting:

- Model performance metrics
- Tenant-scoped dashboards
- Alerting thresholds and escalation
- SLO tracking per model version

### Step 8: Tenant Notifications

Design tenant communication:

- Pre-deployment notifications
- Rollout progress updates
- Rollback notifications
- Change log distribution

### Step 9: Documentation

Create deployment documentation:

- Runbook for operators
- Release notes template
- Incident response procedures
- Post-deployment verification checklist

## Quality Gates

This workflow contributes to:
- **QG-M3** (Agent Runtime) - Validates model deployment within agent architecture
- **QG-I1** (Convergence) - Ensures model releases integrate across modules
- **QG-P1** (Production Readiness) - Verifies deployment pipeline production-ready

### Entry Gate
- QG-F1 (Foundation) must pass before starting
- Agent runtime architecture should be defined

### Exit Gate
- Model deployment pipeline documented
- Rollback procedures tested
- Monitoring and alerting configured
- Tenant notification system designed

### Verification Checklist

- [ ] Deployment strategy selected and documented
- [ ] Tenant rollout procedures defined per tier
- [ ] Canary deployment configuration complete
- [ ] Model validation gates established
- [ ] Rollback procedures documented and tested
- [ ] A/B testing framework designed
- [ ] Monitoring dashboards and alerts configured
- [ ] Tenant notification workflow defined
- [ ] Deployment runbook created

## Output

- `{output_folder}/planning-artifacts/model-deployment-spec.md`
- Model deployment runbook
- Rollback procedures document
- A/B testing configuration

## References

- Template: `{project-root}/_bmad/bam/data/templates/model-deployment-template.md`
- Agent Runtime Architecture: `{project-root}/_bmad/bam/data/agent-guides/bam/agent-runtime-patterns.md`
- AI Model Versioning: `{project-root}/_bmad/bam/data/agent-guides/bam/llm-versioning.md`
- Canary Deployment Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/deployment-patterns.md`
- Tenant Lifecycle Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`

- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/agent-runtime-patterns.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/llm-versioning.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`
- Checklist: `{project-root}/_bmad/bam/data/checklists/qg-m3-agent-runtime.md`
- Agent Runtime Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/agent-runtime-patterns.md`
- AI Model Versioning: `{project-root}/_bmad/bam/data/agent-guides/bam/llm-versioning.md`
- Multi-Tenant Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
