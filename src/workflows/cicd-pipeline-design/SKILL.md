---
name: cicd-pipeline-design
displayName: CI/CD Pipeline Design
description: Design CI/CD pipeline for multi-tenant AI platform deployments. Use when the user requests to 'design CI/CD' or 'implement deployment pipeline'.
module: bam
tags: [devops, deployment]
---

# CI/CD Pipeline Design

## Overview

This workflow defines the continuous integration and continuous deployment pipeline for multi-tenant AI platforms. It produces the deployment architecture that governs all releases across tenant environments. Run after module architecture, before production deployment.

Act as a DevOps Architect specializing in CI/CD pipelines and deployment strategies for multi-tenant AI platforms.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing CI/CD pipeline for multi-tenant deployments
- Implementing tenant-aware release strategies
- Establishing deployment quality gates
- Configuring per-tenant rollout policies

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new CI/CD pipeline architecture | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing pipeline design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against production readiness criteria | `step-20-v-*` to `step-22-v-*` |

## Workflow

### Step 1: Pipeline Architecture

Design the CI/CD pipeline architecture:
- Pipeline stages and triggers
- Build and artifact management
- Environment promotion flow
- Infrastructure as Code integration

### Step 2: Testing Stages

Design comprehensive testing stages:
- Unit and integration testing
- Tenant isolation testing
- Performance and load testing
- Security scanning

### Step 3: Deployment Strategies

Design deployment approaches:
- Blue-green deployments
- Canary releases
- Rolling updates
- Rollback procedures

### Step 4: Tenant-Aware Releases

Design tenant-specific release management:
- Tenant release rings
- Feature flag integration
- Tenant-scoped rollbacks
- Release communication

### Quality Gates

- [ ] Pipeline architecture defined
- [ ] Testing stages documented
- [ ] Deployment strategies specified
- [ ] Tenant-aware releases designed
- [ ] Rollback procedures verified

## Quality Gates

This workflow contributes to:
- **QG-P1** (Production Readiness) - Validates deployment pipeline readiness

### Entry Gate
- QG-F1 (Foundation) must pass before starting
- Module architecture must be complete

### Exit Gate
- QG-P1 checklist items verified
- CI/CD pipeline documented
- Deployment strategies validated

## Output

- `{output_folder}/planning-artifacts/architecture/cicd-pipeline-design.md`
- `{output_folder}/planning-artifacts/architecture/deployment-strategy.md`

## References

- Template: `{project-root}/_bmad/bam/data/templates/cicd-pipeline-template.md`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/deployment-patterns.md`
- Checklist: `{project-root}/_bmad/bam/data/checklists/production-readiness.md`

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
