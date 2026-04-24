---
name: bmad-bam-ai-streaming-design
displayName: AI Streaming Design
description: Design real-time streaming response architecture. Use when the user requests to 'design streaming' or 'create real-time responses'.
module: bam
tags: [ai-operations, real-time]
---

# AI Streaming Design

## Overview

This workflow defines real-time streaming response architecture for LLM outputs including SSE/WebSocket integration, chunking strategies, and error handling.

## When to Use

- Implementing streaming AI responses
- Designing real-time token delivery
- Configuring per-tenant streaming settings
- Handling streaming errors gracefully

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new streaming architecture | `step-01-c-*` to `step-03-c-*` |
| Edit | Modify existing streaming | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against real-time criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Previous workflow outputs available (if applicable)
- **Config required:** See `On Activation` section

## Workflow

### Step 1: Transport Layer Design
- SSE vs WebSocket selection
- Connection management
- Backpressure handling

### Step 2: Chunking Strategy Design
- Token-level vs sentence-level
- Buffer management
- Rate limiting

### Step 3: Error Handling Design
- Partial response handling
- Reconnection strategies
- Graceful degradation

## Quality Gates

This workflow contributes to:
- **QG-M3** (Agent Runtime Gate) - Validates streaming within agent runtime

- [ ] Transport layer designed
- [ ] Chunking strategy defined
- [ ] Error handling specified
- [ ] Per-tenant streaming isolation verified

## Output

- `{output_folder}/planning-artifacts/architecture/ai-streaming-design.md`
