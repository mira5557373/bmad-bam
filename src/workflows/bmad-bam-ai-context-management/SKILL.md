---
name: bmad-bam-ai-context-management
displayName: AI Context Management
description: Design context window optimization. Use when the user requests to 'optimize context' or 'design context management'.
module: bam
tags: [ai-operations, performance]
---

# AI Context Management

## Overview

This workflow defines context window optimization strategies for managing token limits, context compression, and efficient context utilization.

## When to Use

- Optimizing context window utilization
- Designing context compression strategies
- Implementing context caching
- Managing long conversations

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new context management architecture | `step-01-c-*` to `step-03-c-*` |
| Edit | Modify existing context system | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against performance criteria | `step-20-v-*` to `step-22-v-*` |

## Workflow

### Step 1: Context Strategy Design
- Token budget allocation
- Context prioritization
- Truncation strategies

### Step 2: Compression Techniques
- Summarization approaches
- Semantic compression
- Reference extraction

### Step 3: Caching and Retrieval
- Context caching strategies
- RAG integration
- Conversation state management

## Quality Gates

This workflow contributes to:
- **QG-M3** (Agent Runtime Gate) - Validates context management within agent runtime

- [ ] Context strategy defined
- [ ] Compression techniques designed
- [ ] Caching and retrieval specified
- [ ] Per-tenant context isolation verified

## Output

- `{output_folder}/planning-artifacts/architecture/ai-context-management-design.md`
