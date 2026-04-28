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

---

## Memory Lifecycle Governance (P1-16)

Manage agent memory across its lifecycle:

### Memory Types

| Type | Scope | Persistence | Multi-Tenant |
|------|-------|-------------|--------------|
| Working | Single run | None | Isolated |
| Short-term | Session | Session duration | Isolated |
| Long-term | Cross-session | Persistent | Isolated + shared |
| Episodic | Event-based | Selective | Isolated |

### Lifecycle Stages

```
Create → Populate → Query → Update → Archive → Delete
```

| Stage | Trigger | Tenant Considerations |
|-------|---------|----------------------|
| Create | Agent start | Initialize with tenant context |
| Populate | Tool results, user input | Tag with tenant_id |
| Query | Context retrieval | RLS filtering |
| Update | Learning, correction | Audit logging |
| Archive | Retention policy | Tenant-specific rules |
| Delete | GDPR, offboarding | Cascade to all stores |

### Memory Governance Schema

```yaml
memory_governance:
  policies:
    - tier: "free"
      working_memory_limit: "10MB"
      long_term_retention_days: 30
      
    - tier: "pro"
      working_memory_limit: "100MB"
      long_term_retention_days: 365
      
    - tier: "enterprise"
      working_memory_limit: "1GB"
      long_term_retention_days: "custom"
      
  lifecycle:
    auto_archive_after_days: 90
    auto_delete_after_days: 365
    gdpr_delete_on_request: true
    
  isolation:
    method: "tenant_id_prefix"
    cross_tenant_sharing: false
    audit_all_access: true
```

### Memory Quality Management

| Check | Frequency | Action on Failure |
|-------|-----------|-------------------|
| Relevance decay | Daily | Archive stale memories |
| Contradiction detection | On update | Flag for review |
| Embedding drift | Weekly | Re-embed if threshold exceeded |
| Size monitoring | Hourly | Alert if approaching limit |

## Related Web Research

- Search: "AI agent memory lifecycle management {date}"
- Search: "multi-tenant memory isolation patterns {date}"
- Search: "LLM context management best practices {date}"