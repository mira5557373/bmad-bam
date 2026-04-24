---
name: bmad-bam-ai-batch-inference
displayName: AI Batch Inference
description: Design batch inference pipeline for high-volume processing. Use when the user requests to 'design batch inference' or 'create bulk AI processing'.
module: bam
tags: [ai-operations, batch]
---

# AI Batch Inference

## Overview

This workflow defines batch inference pipeline architecture for high-volume AI processing including job scheduling, parallel execution, and result aggregation.

## When to Use

- Processing large volumes of AI requests
- Implementing async batch jobs
- Optimizing cost through batch processing
- Handling bulk content generation

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new batch inference architecture | `step-01-c-*` to `step-03-c-*` |
| Edit | Modify existing batch pipeline | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against batch criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Previous workflow outputs available (if applicable)
- **Config required:** See `On Activation` section

## Workflow

### Step 1: Job Queue Design
- Queue architecture
- Priority levels
- Tenant isolation

### Step 2: Execution Engine Design
- Parallel execution
- Resource allocation
- Rate limiting

### Step 3: Result Handling Design
- Result aggregation
- Notification delivery
- Error handling

## Quality Gates

This workflow contributes to:
- **QG-M3** (Agent Runtime Gate) - Validates batch inference within agent runtime

- [ ] Job queue architecture defined
- [ ] Execution engine designed
- [ ] Result handling specified
- [ ] Per-tenant isolation verified

## Output

- `{output_folder}/planning-artifacts/architecture/ai-batch-inference-design.md`
