# AI Runtime - BAM Domain Context

**Loaded by:** ZAR, ZAO  
**Related Workflows:** bmad-bam-agent-runtime-architecture, bmad-bam-ai-agent-debug

---

## Overview

AI runtime encompasses the orchestration frameworks and execution patterns for multi-agent systems in a multi-tenant environment.

## Core Concepts

### Runtime Selection Criteria

| Criterion | LangGraph | CrewAI | AutoGen | Custom |
|-----------|-----------|--------|---------|--------|
| State Management | Built-in | External | Conversation | Custom |
| Multi-agent | Hierarchical | Role-based | Conversational | Custom |
| Tenant Isolation | Scoped state | Custom | Conversation isolation | Custom |
| Complexity | Medium-High | Medium | Medium-High | High |

### Tenant-Scoped Execution

```
Request (X-Tenant-ID)
    │
    ▼
┌─────────────────┐
│ Agent Router    │ ← Tenant tier determines resources
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌───────┐ ┌───────┐
│Free   │ │Pro+   │
│Shared │ │Dedicated│
│Pool   │ │Workers │
└───────┘ └───────┘
```

## Decision Matrix

| Requirement | Recommended Runtime | Rationale |
|-------------|--------------------| ----------|
| Complex state machines | LangGraph | Native checkpointing |
| Role-based teams | CrewAI | Built-in delegation |
| Multi-agent debate | AutoGen | Conversation patterns |
| Existing infrastructure | Custom | Leverage investments |
| Rapid prototyping | LangGraph | Best tooling |

## Quality Checks

- [ ] Agent execution respects tenant boundaries
- [ ] Tool calls include tenant context
- [ ] **CRITICAL:** No cross-tenant data access via agents

## Web Research Queries

- "AI agent orchestration multi-tenant patterns {date}"
- "LangGraph CrewAI production patterns {date}"
