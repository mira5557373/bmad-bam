---
name: bmad-bam-ai-model-registry
displayName: AI Model Registry
description: Design centralized model registry with versioning. Use when the user requests to 'create model registry' or 'design model versioning'.
module: bam
tags: [ai-operations, mlops]
---

# AI Model Registry

## Overview

This workflow defines the centralized model registry architecture for managing AI models, prompts, and configurations with versioning, lineage tracking, and deployment management.

Act as an MLOps Architect specializing in model lifecycle management for multi-tenant AI platforms.

## When to Use

- Creating a centralized model registry
- Implementing model versioning and lineage
- Designing model deployment pipelines
- Establishing per-tenant model access controls

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new model registry architecture | `step-01-c-*` to `step-03-c-*` |
| Edit | Modify existing registry | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against MLOps criteria | `step-20-v-*` to `step-22-v-*` |

## Workflow

### Step 1: Registry Schema Design
- Model metadata schema
- Version control strategy
- Lineage tracking

### Step 2: Access Control Design
- Per-tenant model permissions
- Model sharing controls
- Audit logging

### Step 3: Deployment Integration
- Model deployment pipelines
- Rollback mechanisms
- A/B testing integration

## Quality Gates

This workflow contributes to:
- **QG-M3** (Agent Runtime Gate) - Validates model registry within agent runtime

- [ ] Registry schema designed
- [ ] Access control defined
- [ ] Deployment integration specified
- [ ] Per-tenant model isolation verified

## Output

- `{output_folder}/planning-artifacts/architecture/ai-model-registry-design.md`

## Web Research

This workflow uses web search to verify current best practices:
- `Search the web:` directives for pattern verification
- Source citations: `_Source: [URL]_`
