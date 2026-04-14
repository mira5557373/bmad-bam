---
name: Memory Tiers Template
description: Template for documenting AI agent memory architecture across multiple tiers
category: architecture
version: 1.0.0
type: "ai"
web_research_enabled: true
source_verification: true
---

## Purpose

Template for documenting AI agent memory architecture across multiple tiers

# AI Agent Memory Architecture Specification

> Project: {{project_name}}
> Version: {{version}}
> Date: {{date}}
> Author: {{author}}

## Memory Tier Architecture

### 1.1 Purpose

This document specifies the multi-tier memory architecture for {{project_name}}, defining how AI agents store, retrieve, and manage context across working, episodic, semantic, procedural, and collective memory layers while maintaining strict tenant isolation.

### 1.2 Scope

- Memory tier definitions and boundaries
- Retention policies per tier
- Tenant isolation mechanisms
- Caching strategies
- Memory lifecycle management
- Cross-tier promotion and demotion

### 1.3 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    Memory Tier Architecture                      │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              Tier 0: Working Memory                      │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │    │
│  │  │ Session  │ │ Context  │ │ Scratch  │ │ Active   │   │    │
│  │  │ State    │ │ Window   │ │ Pad      │ │ Goals    │   │    │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              Tier 1: Episodic Memory                     │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │    │
│  │  │ Recent   │ │ Conver-  │ │ Decision │ │ Inter-   │   │    │
│  │  │ Events   │ │ sations  │ │ History  │ │ actions  │   │    │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              Tier 2: Semantic Memory                     │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │    │
│  │  │ Domain   │ │ Entity   │ │ Relation │ │ Concept  │   │    │
│  │  │ Knowledge│ │ Facts    │ │ Graphs   │ │ Maps     │   │    │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              Tier 3: Procedural Memory                   │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │    │
│  │  │ Learned  │ │ Workflow │ │ Tool     │ │ Optimi-  │   │    │
│  │  │ Skills   │ │ Patterns │ │ Mastery  │ │ zations  │   │    │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              Tier 4: Collective Memory                   │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │    │
│  │  │ Shared   │ │ Cross-   │ │ Org-wide │ │ Best     │   │    │
│  │  │ Learnings│ │ Agent    │ │ Patterns │ │ Practices│   │    │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### 1.4 Tier Summary

| Tier | Name | Retention | Scope | Storage |
|------|------|-----------|-------|---------|
| 0 | Working Memory | Session | Agent instance | In-memory |
| 1 | Episodic Memory | {{episodic_retention}} | User/Session | {{episodic_storage}} |
| 2 | Semantic Memory | {{semantic_retention}} | Tenant | {{semantic_storage}} |
| 3 | Procedural Memory | {{procedural_retention}} | Tenant/Agent | {{procedural_storage}} |
| 4 | Collective Memory | {{collective_retention}} | Cross-tenant (opt-in) | {{collective_storage}} |

---

## Working Memory (Tier 0)

### 2.1 Purpose

Working memory maintains the immediate context required for ongoing agent operations within a single session.

### 2.2 Components

| Component | Description | Size Limit | TTL |
|-----------|-------------|------------|-----|
| Session State | Current conversation state | {{session_state_limit}} | Session |
| Context Window | LLM context buffer | {{context_window_tokens}} tokens | Request |
| Scratch Pad | Temporary calculations | {{scratch_pad_limit}} | Task |
| Active Goals | Current objectives stack | {{active_goals_limit}} | Session |

### 2.3 Memory Structure

```
working_memory:
  tenant_id: {{tenant_id}}
  session_id: {{session_id}}
  agent_id: {{agent_id}}
  
  context_window:
    max_tokens: {{context_window_tokens}}
    compression_strategy: {{compression_strategy}}
    overflow_action: {{overflow_action}}
  
  session_state:
    user_context: {}
    conversation_history: []
    active_tools: []
    pending_actions: []
  
  scratch_pad:
    calculations: []
    intermediate_results: []
    temporary_storage: {}
  
  active_goals:
    primary: null
    secondary: []
    constraints: []
```

### 2.4 Context Window Management

| Strategy | Trigger | Action |
|----------|---------|--------|
| Summarization | > {{summarization_threshold}}% full | Compress older messages |
| Promotion | Important context | Move to episodic memory |
| Eviction | Least relevant | Remove from context |
| Sliding Window | Max tokens reached | Drop oldest messages |

### 2.5 Working Memory Operations

| Operation | Description | Performance Target |
|-----------|-------------|-------------------|
| Read | Retrieve current state | < {{working_read_latency_ms}}ms |
| Write | Update state | < {{working_write_latency_ms}}ms |
| Flush | Clear session | < {{working_flush_latency_ms}}ms |
| Snapshot | Save to episodic | < {{working_snapshot_latency_ms}}ms |

---

## Episodic Memory (Tier 1)

### 3.1 Purpose

Episodic memory stores specific events, conversations, and interactions that occurred at particular times, enabling the agent to recall and reference past experiences.

### 3.2 Components

| Component | Description | Retention | Indexing |
|-----------|-------------|-----------|----------|
| Recent Events | Last N interactions | {{recent_events_retention}} | Timestamp |
| Conversations | Full conversation logs | {{conversation_retention}} | Session ID |
| Decision History | Choices and outcomes | {{decision_retention}} | Decision ID |
| Interaction Logs | Tool/API interactions | {{interaction_retention}} | Event type |

### 3.3 Memory Schema

```
episodic_memory:
  tenant_id: {{tenant_id}}
  user_id: {{user_id}}
  
  events:
    - event_id: string
      timestamp: datetime
      event_type: enum[conversation, decision, tool_use, error]
      content: object
      context: object
      importance_score: float
      
  conversations:
    - conversation_id: string
      session_id: string
      start_time: datetime
      end_time: datetime
      messages: []
      summary: string
      topics: []
      sentiment: float
      
  decisions:
    - decision_id: string
      timestamp: datetime
      context: object
      options: []
      chosen: string
      rationale: string
      outcome: object
      feedback: object
```

### 3.4 Retrieval Strategies

| Strategy | Use Case | Implementation |
|----------|----------|----------------|
| Temporal | Recent context | Timestamp-based query |
| Semantic | Similar situations | Vector similarity search |
| Keyword | Specific topics | Full-text search |
| Hybrid | General recall | Combined ranking |

### 3.5 Importance Scoring

| Factor | Weight | Description |
|--------|--------|-------------|
| Recency | {{recency_weight}} | How recent the memory is |
| Frequency | {{frequency_weight}} | How often referenced |
| Emotional Valence | {{emotion_weight}} | Significance of event |
| User Feedback | {{feedback_weight}} | Explicit relevance markers |
| Outcome Impact | {{outcome_weight}} | Effect on subsequent actions |

### 3.6 Memory Consolidation

```
┌─────────────────┐
│ Working Memory  │
│   (Session)     │
└────────┬────────┘
         │ Consolidation
         │ (End of Session)
         ▼
┌─────────────────┐
│ Short-term      │ ◄── Retention: {{short_term_retention}}
│ Episodic        │
└────────┬────────┘
         │ Consolidation
         │ (Importance > threshold)
         ▼
┌─────────────────┐
│ Long-term       │ ◄── Retention: {{long_term_retention}}
│ Episodic        │
└────────┬────────┘
         │ Extraction
         │ (Pattern detection)
         ▼
┌─────────────────┐
│ Semantic Memory │
└─────────────────┘
```

---

## Semantic Memory (Tier 2)

### 4.1 Purpose

Semantic memory stores factual knowledge, domain concepts, entity relationships, and general world knowledge that is not tied to specific events.

### 4.2 Components

| Component | Description | Storage Type | Update Frequency |
|-----------|-------------|--------------|------------------|
| Domain Knowledge | Industry/domain facts | Knowledge graph | {{domain_update_freq}} |
| Entity Facts | Information about entities | Document store | Real-time |
| Relation Graphs | Entity relationships | Graph database | {{relation_update_freq}} |
| Concept Maps | Conceptual hierarchies | Ontology store | {{concept_update_freq}} |

### 4.3 Knowledge Schema

```
semantic_memory:
  tenant_id: {{tenant_id}}
  
  entities:
    - entity_id: string
      entity_type: string
      name: string
      attributes: {}
      embeddings: vector
      created_at: datetime
      updated_at: datetime
      source: string
      confidence: float
      
  relations:
    - relation_id: string
      subject_id: string
      predicate: string
      object_id: string
      confidence: float
      source: string
      valid_from: datetime
      valid_to: datetime
      
  concepts:
    - concept_id: string
      name: string
      definition: string
      parent_concepts: []
      child_concepts: []
      related_concepts: []
      embeddings: vector
```

### 4.4 Knowledge Graph Structure

```
┌───────────────────────────────────────────────────────────────┐
│                    Tenant Knowledge Graph                      │
│                                                                │
│    ┌─────────┐         owns          ┌─────────┐              │
│    │ Company │ ──────────────────► │ Product │              │
│    └────┬────┘                       └────┬────┘              │
│         │                                 │                    │
│    employs                           has_feature               │
│         │                                 │                    │
│         ▼                                 ▼                    │
│    ┌─────────┐      works_on        ┌─────────┐              │
│    │ Person  │ ──────────────────► │ Feature │              │
│    └─────────┘                       └─────────┘              │
│                                                                │
└───────────────────────────────────────────────────────────────┘
```

### 4.5 Vector Embeddings

| Content Type | Embedding Model | Dimensions | Update Trigger |
|--------------|-----------------|------------|----------------|
| Entity descriptions | {{entity_embedding_model}} | {{entity_embedding_dims}} | On entity change |
| Concepts | {{concept_embedding_model}} | {{concept_embedding_dims}} | On concept change |
| Documents | {{document_embedding_model}} | {{document_embedding_dims}} | On document ingest |
| Queries | {{query_embedding_model}} | {{query_embedding_dims}} | Real-time |

### 4.6 Semantic Search Configuration

| Parameter | Value | Description |
|-----------|-------|-------------|
| Similarity metric | {{similarity_metric}} | cosine, euclidean, dot_product |
| Top-K results | {{semantic_top_k}} | Number of results to return |
| Similarity threshold | {{similarity_threshold}} | Minimum similarity score |
| Reranking enabled | {{reranking_enabled}} | Use cross-encoder reranking |

---

## Procedural Memory (Tier 3)

### 5.1 Purpose

Procedural memory stores learned skills, workflows, optimized patterns, and tool mastery that enable the agent to perform tasks more efficiently over time.

### 5.2 Components

| Component | Description | Learning Source | Adaptation Rate |
|-----------|-------------|-----------------|-----------------|
| Learned Skills | Task execution patterns | Reinforcement | {{skill_adaptation_rate}} |
| Workflow Patterns | Multi-step procedures | Observation | {{workflow_adaptation_rate}} |
| Tool Mastery | Optimal tool usage | Experience | {{tool_adaptation_rate}} |
| Optimizations | Performance shortcuts | Analysis | {{optimization_adaptation_rate}} |

### 5.3 Skill Schema

```
procedural_memory:
  tenant_id: {{tenant_id}}
  agent_type: {{agent_type}}
  
  skills:
    - skill_id: string
      name: string
      description: string
      trigger_conditions: []
      execution_steps: []
      success_criteria: []
      performance_metrics:
        avg_execution_time: float
        success_rate: float
        improvement_trend: float
      learned_from: [episode_ids]
      last_used: datetime
      use_count: int
      
  workflows:
    - workflow_id: string
      name: string
      steps: []
      decision_points: []
      fallback_strategies: []
      optimization_history: []
      
  tool_proficiency:
    - tool_id: string
      proficiency_level: float
      common_use_cases: []
      error_patterns: []
      optimization_tips: []
```

### 5.4 Skill Acquisition Pipeline

```
┌─────────────────┐
│ Task Execution  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Outcome         │
│ Observation     │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌───────┐ ┌───────┐
│Success│ │Failure│
└───┬───┘ └───┬───┘
    │         │
    ▼         ▼
┌─────────────────┐
│ Pattern         │
│ Extraction      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Skill Update    │
│ or Creation     │
└─────────────────┘
```

### 5.5 Proficiency Levels

| Level | Score Range | Description | Autonomy |
|-------|-------------|-------------|----------|
| Novice | 0.0 - 0.2 | New skill, requires guidance | Low |
| Beginner | 0.2 - 0.4 | Basic understanding | Medium-Low |
| Intermediate | 0.4 - 0.6 | Competent execution | Medium |
| Advanced | 0.6 - 0.8 | Optimized patterns | Medium-High |
| Expert | 0.8 - 1.0 | Mastery, teaches others | High |

### 5.6 Skill Decay and Reinforcement

| Factor | Effect | Mitigation |
|--------|--------|------------|
| Time since use | Gradual decay | Periodic refresh |
| Error accumulation | Rapid decay | Pattern relearning |
| Success streak | Reinforcement | Skill promotion |
| Context shift | Partial decay | Adaptation |

---

## Collective Memory (Tier 4)

### 6.1 Purpose

Collective memory enables knowledge sharing across agents and optionally across tenants (with explicit consent), capturing organizational learnings and best practices.

### 6.2 Components

| Component | Scope | Sharing Model | Privacy Level |
|-----------|-------|---------------|---------------|
| Shared Learnings | Multi-agent | Tenant-internal | Private |
| Cross-Agent Knowledge | Agent pool | Tenant-internal | Private |
| Org-wide Patterns | Organization | Tenant-internal | Private |
| Best Practices | Opt-in cross-tenant | Anonymized | {{collective_privacy_level}} |

### 6.3 Sharing Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Tenant A Boundary                            │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                         │
│  │ Agent 1 │  │ Agent 2 │  │ Agent 3 │                         │
│  └────┬────┘  └────┬────┘  └────┬────┘                         │
│       │            │            │                               │
│       └────────────┼────────────┘                               │
│                    │                                            │
│              ┌─────▼─────┐                                      │
│              │ Tenant A  │                                      │
│              │ Collective│                                      │
│              └─────┬─────┘                                      │
└────────────────────┼────────────────────────────────────────────┘
                     │
                     │ Opt-in, Anonymized
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│              Cross-Tenant Knowledge Pool (Optional)              │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐       │
│  │ Best Practice │  │ Best Practice │  │ Best Practice │       │
│  │ Pattern A     │  │ Pattern B     │  │ Pattern C     │       │
│  └───────────────┘  └───────────────┘  └───────────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

### 6.4 Collective Memory Schema

```
collective_memory:
  tenant_id: {{tenant_id}}  # null for cross-tenant
  
  shared_learnings:
    - learning_id: string
      source_agents: [agent_ids]
      pattern_type: string
      description: string
      applicability: []
      confidence: float
      validation_count: int
      
  organizational_patterns:
    - pattern_id: string
      name: string
      description: string
      domain: string
      usage_count: int
      success_rate: float
      
  best_practices:
    - practice_id: string
      category: string
      description: string
      anonymized_source: hash
      adoption_rate: float
      effectiveness_score: float
```

### 6.5 Knowledge Aggregation Rules

| Rule | Description | Privacy Guarantee |
|------|-------------|-------------------|
| Minimum Contribution | N agents must contribute | k-anonymity (k={{k_anonymity_threshold}}) |
| Differential Privacy | Noise injection | epsilon={{differential_privacy_epsilon}} |
| Aggregation Threshold | Min samples for pattern | {{aggregation_threshold}} samples |
| PII Scrubbing | Remove identifying info | Automated + manual review |

### 6.6 Cross-Tenant Sharing Consent

| Consent Level | Description | Data Shared |
|---------------|-------------|-------------|
| None | No sharing | Nothing |
| Anonymized Stats | Aggregate metrics only | Usage patterns |
| Anonymized Patterns | Patterns without context | Skill patterns |
| Full Participation | Complete sharing | All collective learnings |

---

## Tenant Isolation

### 7.1 Isolation Model

**Selected Model:** {{tenant_model}}

### 7.2 Memory Isolation Matrix

| Memory Tier | Isolation Boundary | Access Control | Encryption |
|-------------|-------------------|----------------|------------|
| Working | Session | Agent instance | In-transit |
| Episodic | User/Tenant | User + Tenant | At-rest |
| Semantic | Tenant | Tenant RBAC | At-rest |
| Procedural | Tenant/Agent | Tenant RBAC | At-rest |
| Collective | Tenant (default) | Explicit consent | At-rest |

### 7.3 Row-Level Security Configuration

```
-- Memory access policy
CREATE POLICY tenant_memory_isolation ON memory_store
  USING (tenant_id = current_setting('app.tenant_id'));

-- Episodic memory policy
CREATE POLICY episodic_user_isolation ON episodic_memory
  USING (
    tenant_id = current_setting('app.tenant_id')
    AND (
      user_id = current_setting('app.user_id')
      OR current_setting('app.role') = 'admin'
    )
  );
```

### 7.4 Tenant Context Propagation

```
┌─────────────────┐
│ Request with    │
│ Tenant Context  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Context         │
│ Extraction      │
└────────┬────────┘
         │
    ┌────┴────────────────────┐
    │                         │
    ▼                         ▼
┌─────────────────┐   ┌─────────────────┐
│ Memory Service  │   │ Memory Service  │
│ (Working)       │   │ (Persistent)    │
└────────┬────────┘   └────────┬────────┘
         │                     │
         └─────────┬───────────┘
                   │
                   ▼
         ┌─────────────────┐
         │ Tenant-scoped   │
         │ Memory Access   │
         └─────────────────┘
```

### 7.5 Cross-Tenant Prevention

| Attack Vector | Prevention | Verification |
|---------------|------------|--------------|
| Direct query manipulation | Parameterized queries | Query analysis |
| Context injection | Input validation | Input fuzzing |
| Cache poisoning | Tenant-prefixed keys | Cache audit |
| Memory sharing exploit | Strict isolation | Penetration testing |

---

## Caching Strategy

### 8.1 Cache Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                       Cache Hierarchy                            │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    L1: In-Memory Cache                   │    │
│  │  ┌──────────────────────────────────────────────────┐   │    │
│  │  │ Agent-local cache (Working Memory optimization)   │   │    │
│  │  │ TTL: {{l1_cache_ttl}} | Size: {{l1_cache_size}}   │   │    │
│  │  └──────────────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    L2: Distributed Cache                 │    │
│  │  ┌──────────────────────────────────────────────────┐   │    │
│  │  │ Redis/Memcached (Episodic + Semantic hot data)    │   │    │
│  │  │ TTL: {{l2_cache_ttl}} | Size: {{l2_cache_size}}   │   │    │
│  │  └──────────────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    L3: Persistent Store                  │    │
│  │  ┌──────────────────────────────────────────────────┐   │    │
│  │  │ Database (All tiers - source of truth)            │   │    │
│  │  │ Retention: Per tier policy                        │   │    │
│  │  └──────────────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### 8.2 Cache Key Strategy

```
{cache_prefix}:{tenant_id}:{memory_tier}:{entity_type}:{entity_id}
```

**Examples:**
- `mem:tenant_123:working:session:abc123`
- `mem:tenant_123:episodic:conversation:conv_456`
- `mem:tenant_123:semantic:entity:ent_789`
- `mem:tenant_123:procedural:skill:skill_101`

### 8.3 Cache Configuration by Tier

| Tier | Cache Level | TTL | Eviction Policy | Warm Strategy |
|------|-------------|-----|-----------------|---------------|
| Working | L1 only | Session | LRU | On session start |
| Episodic | L1 + L2 | {{episodic_cache_ttl}} | LFU | On user activity |
| Semantic | L2 | {{semantic_cache_ttl}} | TTL-based | Background refresh |
| Procedural | L2 | {{procedural_cache_ttl}} | LRU | On agent activation |
| Collective | L2 | {{collective_cache_ttl}} | TTL-based | Scheduled |

### 8.4 Cache Invalidation

| Trigger | Scope | Strategy |
|---------|-------|----------|
| Memory update | Single key | Immediate delete |
| Entity change | Related keys | Pattern-based delete |
| Tenant config change | All tenant keys | Prefix scan + delete |
| Schema migration | Global | Full flush |

### 8.5 Cache Metrics

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Hit Rate | > {{cache_hit_rate_target}}% | < {{cache_hit_rate_alert}}% |
| Latency (L1) | < {{l1_latency_target_ms}}ms | > {{l1_latency_alert_ms}}ms |
| Latency (L2) | < {{l2_latency_target_ms}}ms | > {{l2_latency_alert_ms}}ms |
| Memory Usage | < {{cache_memory_target}}% | > {{cache_memory_alert}}% |

---

## Observability

### 9.1 Metrics

| Metric | Type | Labels |
|--------|------|--------|
| `memory_operation_duration_ms` | Histogram | tenant_id, tier, operation |
| `memory_size_bytes` | Gauge | tenant_id, tier |
| `memory_items_count` | Gauge | tenant_id, tier |
| `cache_hit_ratio` | Gauge | tenant_id, tier, cache_level |
| `consolidation_events_total` | Counter | tenant_id, source_tier, target_tier |
| `memory_errors_total` | Counter | tenant_id, tier, error_type |

### 9.2 Tracing

**Span Attributes:**
- `memory.tenant_id`
- `memory.tier`
- `memory.operation`
- `memory.cache_hit`
- `memory.item_count`
- `memory.duration_ms`

### 9.3 Logging

| Event | Log Level | Fields |
|-------|-----------|--------|
| Memory access | DEBUG | tenant_id, tier, operation, duration |
| Consolidation | INFO | source_tier, target_tier, items_count |
| Cache miss | DEBUG | tenant_id, tier, key |
| Isolation violation attempt | WARN | tenant_id, attempted_target |
| Memory quota exceeded | WARN | tenant_id, tier, current, limit |

---

## Configuration

### 10.1 Memory Tier Configuration

```yaml
memory_architecture:
  project: {{project_name}}
  ai_runtime: {{ai_runtime}}
  tenant_model: {{tenant_model}}
  
  working_memory:
    context_window_tokens: {{context_window_tokens}}
    compression_strategy: {{compression_strategy}}
    session_state_limit: {{session_state_limit}}
  
  episodic_memory:
    retention_days: {{episodic_retention_days}}
    storage_backend: {{episodic_storage}}
    consolidation_threshold: {{consolidation_threshold}}
  
  semantic_memory:
    storage_backend: {{semantic_storage}}
    embedding_model: {{entity_embedding_model}}
    embedding_dimensions: {{entity_embedding_dims}}
  
  procedural_memory:
    storage_backend: {{procedural_storage}}
    skill_decay_rate: {{skill_decay_rate}}
    learning_rate: {{skill_learning_rate}}
  
  collective_memory:
    enabled: {{collective_enabled}}
    cross_tenant_sharing: {{cross_tenant_sharing}}
    anonymization_level: {{anonymization_level}}
  
  caching:
    l1_enabled: true
    l1_size_mb: {{l1_cache_size}}
    l2_backend: {{l2_cache_backend}}
    l2_size_mb: {{l2_cache_size}}
```

---

## Appendix A: Related Documents

- Pattern: `memory-architecture` in `bam-patterns.csv`
- AI Runtime: `agent-runtime-patterns.md`
- Tenant Model: `tenant-model-template.md`

---

## Appendix B: Glossary

| Term | Definition |
|------|------------|
| Working Memory | Short-term, session-scoped memory for immediate context |
| Episodic Memory | Event-based memory storing specific experiences |
| Semantic Memory | Factual knowledge and entity relationships |
| Procedural Memory | Learned skills and execution patterns |
| Collective Memory | Shared knowledge across agents or tenants |
| Consolidation | Process of moving memories between tiers |
| Memory Decay | Gradual reduction in memory strength over time |

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "AI agent memory architecture patterns {date}"
- "multi-tier memory systems LLM {date}"
- "tenant-isolated AI memory best practices {date}"
- "vector memory caching strategies {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Verification Checklist

- [ ] All five memory tiers defined (Working, Episodic, Semantic, Procedural, Collective)
- [ ] Retention policies specified for each tier
- [ ] Context window management strategies documented (summarization, promotion, eviction)
- [ ] Episodic memory retrieval strategies defined (temporal, semantic, hybrid)
- [ ] Semantic memory knowledge graph structure documented
- [ ] Vector embedding models and dimensions specified per content type
- [ ] Procedural memory skill acquisition pipeline defined
- [ ] Collective memory sharing architecture with privacy guarantees documented
- [ ] Multi-tenant isolation matrix complete for all memory tiers
- [ ] RLS policies defined for memory access control
- [ ] Cache hierarchy configured with TTL and eviction policies
- [ ] Observability metrics and logging defined for memory operations

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial specification |
