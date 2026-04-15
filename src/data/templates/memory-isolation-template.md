---
name: memory-isolation-template
description: Template for documenting memory isolation strategy for AI agents in multi-tenant environments
category: tenant-isolation
version: "1.0.0"
---

# Memory Isolation Design Template

## Document Information

| Field | Value |
|-------|-------|
| **Project** | {{project_name}} |
| **Module** | {{module_name}} |
| **Version** | {{version}} |
| **Last Updated** | {{date}} |
| **Author** | {{author}} |
| **Status** | Draft |

## Purpose

This template documents the memory isolation strategy for AI agents, ensuring strict separation of conversation history, user context, and learned information across tenants and users.

## Memory Architecture

### Memory Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                      Agent Memory System                         │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   Session Memory                         │   │
│  │        (Conversation context, current run)               │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    User Memory                           │   │
│  │      (User preferences, history, personalization)        │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   Tenant Memory                          │   │
│  │    (Shared knowledge, policies, organizational data)     │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   System Memory                          │   │
│  │         (Global knowledge, shared across all)            │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Isolation Levels

### Memory Scope Definitions

| Scope | Isolation | Visibility | Persistence |
|-------|-----------|------------|-------------|
| Session | Run-level | Single conversation | Ephemeral |
| User | User-level | Single user only | Persistent |
| Tenant | Tenant-level | All tenant users | Persistent |
| System | Global | All tenants | Persistent |

### Isolation Matrix

| Reader \ Writer | Session | User | Tenant | System |
|-----------------|---------|------|--------|--------|
| Same Session | ✓ | ✓ | ✓ | ✓ |
| Same User | ✗ | ✓ | ✓ | ✓ |
| Same Tenant | ✗ | ✗ | ✓ | ✓ |
| Other Tenant | ✗ | ✗ | ✗ | ✓ |

## Memory Schema

### Memory Entry Structure

```json
{
  "memory_id": "{{uuid}}",
  "created_at": "{{iso8601}}",
  "updated_at": "{{iso8601}}",
  
  "scope": {
    "level": "session|user|tenant|system",
    "tenant_id": "{{tenant_id}}",
    "user_id": "{{user_id}}",
    "session_id": "{{session_id}}"
  },
  
  "content": {
    "type": "fact|preference|context|knowledge",
    "key": "{{memory_key}}",
    "value": "{{memory_value}}",
    "embedding": [{{vector}}],
    "confidence": {{confidence_score}}
  },
  
  "metadata": {
    "source": "{{source}}",
    "agent_id": "{{agent_id}}",
    "ttl_seconds": {{ttl}},
    "access_count": {{access_count}}
  }
}
```

## Storage Design

### Per-Scope Storage

| Scope | Primary Store | Vector Store | TTL |
|-------|---------------|--------------|-----|
| Session | Redis | In-memory | 24h |
| User | PostgreSQL | Pinecone | 90d |
| Tenant | PostgreSQL | Pinecone | 365d |
| System | PostgreSQL | Pinecone | ∞ |

### Key Naming Convention

```
Format: mem:{scope}:{tenant_id}:{user_id}:{session_id}:{key}

Examples:
- mem:session:t123:u456:s789:context
- mem:user:t123:u456::preferences
- mem:tenant:t123:::policies
- mem:system::::global_facts
```

## Access Control

### Memory Access Rules

```yaml
memory_access:
  session:
    read: [owner_session]
    write: [owner_session]
    delete: [owner_session, admin]
    
  user:
    read: [owner_user, tenant_admin]
    write: [owner_user]
    delete: [owner_user, tenant_admin]
    
  tenant:
    read: [tenant_users, tenant_admin]
    write: [tenant_admin]
    delete: [tenant_admin]
    
  system:
    read: [all]
    write: [platform_admin]
    delete: [platform_admin]
```

### Permission Enforcement

```typescript
interface MemoryAccessRequest {
  requester: {
    tenant_id: string;
    user_id: string;
    session_id: string;
    roles: string[];
  };
  target: {
    scope: MemoryScope;
    tenant_id?: string;
    user_id?: string;
    session_id?: string;
  };
  operation: 'read' | 'write' | 'delete';
}
```

## Retrieval Strategy

### Memory Retrieval Pipeline

```
Query → Scope Filter → Permission Check → Vector Search → Rerank → Return
                                              │
                              ┌───────────────┼───────────────┐
                              ▼               ▼               ▼
                          Session          User           Tenant
                          Memories        Memories       Memories
```

### Retrieval Configuration

```yaml
retrieval:
  max_results: 10
  
  scope_weights:
    session: 1.0    # Highest relevance
    user: 0.8
    tenant: 0.6
    system: 0.4
    
  filters:
    min_confidence: 0.7
    max_age_days: 30
    
  reranking:
    enabled: true
    model: cross-encoder
```

## Cross-Tenant Protection

### Isolation Verification Tests

| Test ID | Description | Expected |
|---------|-------------|----------|
| MI-001 | User A reads User B memory | Denied |
| MI-002 | Tenant A reads Tenant B memory | Denied |
| MI-003 | Session A reads Session B memory | Denied |
| MI-004 | Query returns cross-tenant data | Empty |

### Leakage Prevention

```yaml
leakage_prevention:
  embedding_isolation:
    separate_namespaces: true
    namespace_pattern: "tenant_{tenant_id}"
    
  query_filtering:
    mandatory_tenant_filter: true
    strip_cross_tenant_results: true
    
  output_validation:
    verify_tenant_match: true
    log_violations: true
```

## Memory Lifecycle

### Retention Policies

| Memory Type | Default TTL | Max TTL | Deletion |
|-------------|-------------|---------|----------|
| Session context | 24 hours | 7 days | Auto |
| User facts | 90 days | 365 days | Auto/Manual |
| Tenant knowledge | 365 days | ∞ | Manual |
| System knowledge | ∞ | ∞ | Manual |

### Cleanup Triggers

| Trigger | Action | Scope |
|---------|--------|-------|
| User offboarded | Delete all | User memories |
| Tenant offboarded | Delete all | Tenant + user memories |
| Session ended | Delete | Session memories |
| TTL expired | Delete | Specific memory |

## Monitoring

### Memory Metrics

| Metric | Description | Alert |
|--------|-------------|-------|
| `memory_write_count` | Writes per scope | - |
| `memory_read_count` | Reads per scope | - |
| `memory_isolation_violation` | Cross-tenant access attempts | > 0 |
| `memory_storage_size` | Storage per tenant | > 80% quota |

## Verification Checklist

- [ ] Session memory isolated per conversation
- [ ] User memory isolated per user
- [ ] Tenant memory isolated per tenant
- [ ] Cross-tenant queries return empty
- [ ] Permission checks enforced
- [ ] Vector namespaces separated
- [ ] Retention policies configured
- [ ] Cleanup automation working
- [ ] Audit logging enabled

## Web Research Queries

- Search: "AI agent memory isolation patterns {date}"
- Search: "multi-tenant vector database isolation {date}"
- Search: "LLM conversation memory architecture {date}"

## Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | {{date}} | Initial template | Platform Team |
