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

## Runtime Selection Guide

Quick reference for choosing AI agent runtime:

| Use Case | Primary | Alternative | Notes |
|----------|---------|-------------|-------|
| State machines | LangGraph | - | Native checkpointing |
| Role-based crews | CrewAI | LangGraph | Built-in delegation |
| Multi-agent conversations | AutoGen | CrewAI | Flexible termination |
| Long-running transactions | Saga | LangGraph | Compensation support |
| Rapid prototyping | LangGraph | CrewAI | Best tooling |

**Detailed Patterns:**
- `{project-root}/_bmad/bam/data/patterns/langgraph.md` - State machine runtime
- `{project-root}/_bmad/bam/data/patterns/agent-orchestration.md` - CrewAI, AutoGen, Saga

**Web Research:**
- Search: "AI agent runtime comparison {date}"
- Search: "LangGraph vs CrewAI vs AutoGen {date}"

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

## Related Patterns

**Core Runtime:**
- `{project-root}/_bmad/bam/data/patterns/langgraph.md` - State machine runtime
- `{project-root}/_bmad/bam/data/patterns/agent-orchestration.md` - CrewAI, AutoGen, Saga

**Verification & Safety:**
- `{project-root}/_bmad/bam/data/patterns/grounding-verifier.md` - RAG verification
- `{project-root}/_bmad/bam/data/patterns/decision-verification.md` - Pre-execution gates
- `{project-root}/_bmad/bam/data/patterns/action-contract.md` - 8-field action contracts

**Monitoring:**
- `{project-root}/_bmad/bam/data/patterns/output-drift-monitor.md` - Quality monitoring
- `{project-root}/_bmad/bam/data/patterns/invisible-failure-detector.md` - Silent failure detection
- `{project-root}/_bmad/bam/data/patterns/ai-observability.md` - AI telemetry

**Tool & Agent Management (NEXUS Phase 2):**
- `{project-root}/_bmad/bam/data/patterns/tool-schema-versioning.md` - Tool version control
- `{project-root}/_bmad/bam/data/patterns/agent-handoff-protocol.md` - Multi-agent handoff

## NEXUS Phase 3 Patterns

**Safety & Control:**
- `{project-root}/_bmad/bam/data/patterns/fanout-circuit-breaker.md` - Runaway prevention
- `{project-root}/_bmad/bam/data/patterns/streaming-output-decoder.md` - Real-time safety

### Web Research

- "agent fanout circuit breaker patterns {date}"
- "streaming LLM output safety filtering {date}"

## NEXUS Phase 4 Patterns - Agent Communication

**Multi-Agent Coordination:**
- `{project-root}/_bmad/bam/data/patterns/agent-negotiation.md` - Agreement protocols
- `{project-root}/_bmad/bam/data/patterns/cross-tenant-agent.md` - Federation patterns
- `{project-root}/_bmad/bam/data/patterns/event-driven-agents.md` - Event sourcing
- `{project-root}/_bmad/bam/data/patterns/agent-marketplace.md` - Registry and discovery

### Web Research

- "multi-agent negotiation consensus patterns {date}"
- "cross-tenant agent federation patterns {date}"
- "event sourcing AI agents patterns {date}"
- "AI agent marketplace architecture {date}"

## Related Web Research

- Search: "AI agent memory lifecycle management {date}"
- Search: "multi-tenant memory isolation patterns {date}"
- Search: "LLM context management best practices {date}"
- Search: "RAG grounding verification patterns {date}"
- Search: "ML model drift detection patterns {date}"