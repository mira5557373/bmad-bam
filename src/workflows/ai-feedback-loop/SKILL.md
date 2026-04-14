---
name: ai-feedback-loop
displayName: AI Feedback Loop
description: Design user feedback collection and model improvement. Use when the user requests to 'design feedback loop' or 'create user feedback system'.
module: bam
tags: [ai-operations, rlhf]
---

# AI Feedback Loop

## Overview

This workflow defines the user feedback collection and model improvement architecture for continuous AI quality enhancement through RLHF and human feedback integration.

## When to Use

- Implementing user feedback collection for AI responses
- Designing RLHF pipelines
- Establishing feedback-driven model improvement
- Configuring per-tenant feedback settings

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new feedback loop architecture | `step-01-c-*` to `step-03-c-*` |
| Edit | Modify existing feedback system | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against feedback criteria | `step-20-v-*` to `step-22-v-*` |

## Workflow

### Step 1: Feedback Collection Design
- Thumbs up/down, ratings, corrections
- Feedback UI integration
- Per-tenant feedback settings

### Step 2: Feedback Analysis Pipeline
- Sentiment analysis
- Quality correlation
- Trend detection

### Step 3: Model Improvement Integration
- RLHF pipeline integration
- Fine-tuning triggers
- A/B testing of improvements

## Quality Gates

This workflow contributes to:
- **QG-M3** (Agent Runtime Gate) - Validates feedback loop within agent runtime

- [ ] Feedback collection designed
- [ ] Feedback analysis pipeline defined
- [ ] Model improvement integration specified
- [ ] Per-tenant feedback isolation verified

## Output

- `{output_folder}/planning-artifacts/architecture/ai-feedback-loop-design.md`

## Web Research

- `Search the web:` directives for pattern verification
