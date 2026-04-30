---
pattern_id: vector-store-multi-tenant
shortcode: ZVS
category: rag
qg_ref: QG-RAG1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Vector Store Multi-tenant - BAM Pattern

**Loaded by:** ZVS  
**Applies to:** Multi-tenant RAG systems  
**See also:** [rag-pipeline.md](rag-pipeline.md), [tenant-isolation.md](tenant-isolation.md)

---

## When to Use

- Multi-tenant RAG applications requiring data isolation
- Enterprise deployments with compliance requirements
- Tenant-specific embedding models or configurations
- Cost attribution per tenant for vector operations
- Regulatory requirements for data residency

## When NOT to Use

- Single-tenant applications
- Public knowledge bases without isolation needs
- Prototype/demo environments
- Shared knowledge across all tenants (use separate shared index)

## Architecture

### Isolation Models Comparison

```
┌─────────────────────────────────────────────────────────────────┐
│              VECTOR STORE ISOLATION MODELS                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  INDEX-PER-TENANT                    NAMESPACE ISOLATION         │
│  ┌──────────┐ ┌──────────┐          ┌──────────────────────┐    │
│  │ Index A  │ │ Index B  │          │    Single Index       │    │
│  │ (Tenant  │ │ (Tenant  │          │  ┌────────────────┐   │    │
│  │   A)     │ │   B)     │          │  │ NS: tenant-a   │   │    │
│  │ xxxxxxx  │ │ xxxxxxx  │          │  │ xxxxxxx        │   │    │
│  │ xxxxxxx  │ │ xxxxxxx  │          │  ├────────────────┤   │    │
│  └──────────┘ └──────────┘          │  │ NS: tenant-b   │   │    │
│       │            │                │  │ xxxxxxx        │   │    │
│       └────────────┘                │  └────────────────┘   │    │
│    Full isolation                   └──────────────────────┘    │
│                                         Logical isolation        │
│                                                                  │
│  METADATA FILTER                     HYBRID APPROACH             │
│  ┌──────────────────────┐           ┌──────────────────────┐    │
│  │    Single Index      │           │  Enterprise: Index   │    │
│  │  ┌────────────────┐  │           │  ┌──────────┐        │    │
│  │  │ {tenant_id: A} │  │           │  │ Dedicated│        │    │
│  │  │ {tenant_id: B} │  │           │  └──────────┘        │    │
│  │  │ {tenant_id: C} │  │           │  Free/Pro: Namespace │    │
│  │  └────────────────┘  │           │  ┌──────────────┐    │    │
│  └──────────────────────┘           │  │ Shared Index │    │    │
│    Runtime filtering                 │  └──────────────┘    │    │
│                                     └──────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### Isolation Model Selection

| Isolation Model | Index Structure | Query Pattern | Cost | Isolation Level |
|-----------------|-----------------|---------------|------|-----------------|
| Index-per-tenant | Separate physical index | No filter needed | High | Full |
| Namespace | Single index, namespaces | Namespace parameter | Medium | Logical |
| Metadata filter | Single index, metadata | Filter expression | Low | Query-time |
| Hybrid | Mix per tier | Varies by tenant | Variable | Configurable |

### Configuration Schema

```yaml
vector_store_multi_tenant:
  version: "1.0.0"
  bam_controlled: true
  
  provider: "pinecone"  # pinecone, weaviate, qdrant, pgvector
  
  isolation_strategy:
    default: "namespace"
    tier_overrides:
      enterprise:
        strategy: "index-per-tenant"
        dedicated_resources: true
      pro:
        strategy: "namespace"
        shared_resources: true
      free:
        strategy: "metadata"
        shared_resources: true
        
  index_config:
    dimensions: 1536
    metric: "cosine"  # cosine, euclidean, dotproduct
    pod_type: "p1.x1"
    replicas: 1
    
  tenant_index_naming:
    pattern: "{env}-{tenant_id}-vectors"
    max_length: 45
    
  namespace_config:
    pattern: "tenant-{tenant_id}"
    
  metadata_config:
    tenant_field: "tenant_id"
    required_fields: ["tenant_id", "doc_id", "chunk_id"]
    
  security:
    api_key_per_tenant: false  # true for index-per-tenant
    query_validation: true
    cross_tenant_check: true
```

### Query Flow with Isolation

```
┌──────────────────────────────────────────────────────────────┐
│                     QUERY FLOW                                │
│                                                               │
│  Request                                                      │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ query: "How do I configure SSO?"                        │ │
│  │ tenant_id: "acme-corp"                                  │ │
│  │ tier: "pro"                                             │ │
│  └─────────────────────────────────────────────────────────┘ │
│                           │                                   │
│                           ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              Isolation Strategy Router                   │ │
│  │                                                          │ │
│  │   tier == "enterprise" → Index: acme-corp-vectors       │ │
│  │   tier == "pro"        → Namespace: tenant-acme-corp    │ │
│  │   tier == "free"       → Filter: tenant_id="acme-corp"  │ │
│  └─────────────────────────────────────────────────────────┘ │
│                           │                                   │
│                           ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              Vector Store Query                          │ │
│  │   vectors = query(embedding, namespace="tenant-acme")   │ │
│  └─────────────────────────────────────────────────────────┘ │
│                           │                                   │
│                           ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              Cross-Tenant Validation                     │ │
│  │   assert all(v.tenant_id == "acme-corp" for v in vecs)  │ │
│  └─────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Index-per-tenant | Full isolation, easy deletion | High cost, index sprawl | Enterprise, compliance |
| Namespace | Good isolation, cost-effective | Shared infrastructure | Pro tier tenants |
| Metadata filter | Lowest cost, simple | Query overhead, risk of bypass | Free tier, low data |
| Hybrid | Optimized per tier | Complex routing | Multi-tier SaaS |

## Quality Checks

- [ ] **CRITICAL:** Cross-tenant query returns zero results verified
- [ ] **CRITICAL:** Tenant deletion removes all vectors
- [ ] Query routing matches tenant tier
- [ ] Metadata always includes tenant_id
- [ ] API keys rotated per schedule
- [ ] Cost attribution by tenant tracked

## Web Research Queries

- "Pinecone multi-tenant architecture patterns {date}"
- "Weaviate tenant isolation strategies {date}"
- "vector database security multi-tenant {date}"
- "pgvector row level security {date}"
- "Qdrant namespace isolation {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-RAG1 | Vector store tenant isolation verified |

## Related Patterns

- [rag-pipeline.md](rag-pipeline.md) - End-to-end orchestration
- [tenant-isolation.md](tenant-isolation.md) - Database isolation patterns
- [index-management.md](index-management.md) - Index lifecycle
- [embedding-lifecycle.md](embedding-lifecycle.md) - Embedding versioning
