---
pattern_id: knowledge-graph
shortcode: ZKG
category: rag
qg_ref: QG-RAG1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Knowledge Graph - BAM Pattern

**Loaded by:** ZKG  
**Applies to:** Multi-tenant RAG systems  
**See also:** [rag-pipeline.md](rag-pipeline.md), [hybrid-search.md](hybrid-search.md)

---

## When to Use

- Complex entity relationships need traversal
- Multi-hop reasoning over knowledge
- Domain ontologies with hierarchical structures
- Knowledge that benefits from explicit relationships
- Combining structured facts with unstructured text

## When NOT to Use

- Simple document retrieval without relationships
- Rapidly changing knowledge bases
- Small datasets without clear entity structure
- When vector search alone provides sufficient accuracy

## Architecture

### Knowledge Graph RAG Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                  KNOWLEDGE GRAPH RAG                             │
│                                                                  │
│  Query: "What products does Acme Corp's CTO use?"               │
│                           │                                      │
│                           ▼                                      │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                   ENTITY EXTRACTION                          ││
│  │  Entities: [Acme Corp (ORG), CTO (ROLE), products (CONCEPT)]││
│  └────────────────────────────────────────────────────────────┘││
│                           │                                      │
│           ┌───────────────┴───────────────┐                      │
│           ▼                               ▼                      │
│  ┌──────────────────┐          ┌──────────────────┐             │
│  │  GRAPH TRAVERSAL │          │   VECTOR SEARCH  │             │
│  │                  │          │                  │             │
│  │ (Acme Corp)──────│          │  query_embedding │             │
│  │      │           │          │       ↓          │             │
│  │      ├──[employs]│          │  similar chunks  │             │
│  │      │           │          │                  │             │
│  │      ▼           │          │                  │             │
│  │ (John, CTO)──────│          │                  │             │
│  │      │           │          │                  │             │
│  │      ├──[uses]   │          │                  │             │
│  │      │           │          │                  │             │
│  │      ▼           │          │                  │             │
│  │ (Product A,B,C)  │          │                  │             │
│  └────────┬─────────┘          └────────┬─────────┘             │
│           │                             │                        │
│           └──────────┬──────────────────┘                        │
│                      ▼                                           │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                   CONTEXT FUSION                             ││
│  │  Graph facts + Vector chunks → Enriched context             ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### Tenant-Isolated Graph

```
┌──────────────────────────────────────────────────────────────┐
│              TENANT-ISOLATED KNOWLEDGE GRAPH                  │
│                                                               │
│  ┌───────────────────────────────────────────────────────┐   │
│  │                  Graph Database                        │   │
│  │                                                        │   │
│  │  Tenant A Subgraph         Tenant B Subgraph          │   │
│  │  ┌─────────────────┐       ┌─────────────────┐        │   │
│  │  │ (Company A)     │       │ (Company B)     │        │   │
│  │  │     │           │       │     │           │        │   │
│  │  │     ├──[has]    │       │     ├──[has]    │        │   │
│  │  │     │           │       │     │           │        │   │
│  │  │  (Dept A1)      │       │  (Dept B1)      │        │   │
│  │  │                 │       │                 │        │   │
│  │  │  tenant_id: A   │       │  tenant_id: B   │        │   │
│  │  └─────────────────┘       └─────────────────┘        │   │
│  │                                                        │   │
│  │  Isolation: Every node has tenant_id property         │   │
│  │  Queries: MATCH (n {tenant_id: $tenant_id})          │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                               │
│  Shared Ontology (read-only for tenants)                     │
│  ┌───────────────────────────────────────────────────────┐   │
│  │  (Person)──[type]──>(Role)──[type]──>(Organization)   │   │
│  └───────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

### Configuration Schema

```yaml
knowledge_graph:
  version: "1.0.0"
  bam_controlled: true
  
  graph_database:
    provider: "neo4j"  # neo4j, amazon-neptune, memgraph
    uri: "${NEO4J_URI}"
    database: "multi-tenant-kg"
    
  isolation:
    strategy: "property"  # property, subgraph, database
    tenant_property: "tenant_id"
    enforce_on_write: true
    enforce_on_read: true
    
  entity_extraction:
    model: "gpt-4"
    entity_types:
      - Person
      - Organization
      - Product
      - Concept
      - Location
    relation_types:
      - employs
      - uses
      - owns
      - related_to
      - part_of
      
  graph_retrieval:
    max_hops: 3
    max_nodes: 50
    scoring:
      path_length_weight: 0.3
      relation_relevance: 0.4
      node_importance: 0.3
      
  integration:
    with_vector_search: true
    fusion_strategy: "interleave"  # interleave, graph_first, vector_first
    graph_weight: 0.4
    
  indexing:
    full_text_index: true
    embedding_index: true
    node_label_index: true
    
  tenant_quotas:
    max_nodes: 100000
    max_edges: 500000
    max_query_hops: 5
```

### Graph Query Patterns

| Pattern | Query Type | Use Case |
|---------|------------|----------|
| Direct lookup | `MATCH (n {name: $name, tenant_id: $tid})` | Find specific entity |
| 1-hop neighbors | `MATCH (n)-[r]-(m) WHERE n.tenant_id = $tid` | Related entities |
| Path finding | `MATCH path = (a)-[*1..3]-(b)` | Multi-hop reasoning |
| Subgraph | `CALL gds.subgraph.filter(...)` | Contextual extraction |

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Property isolation | Simple, flexible | Query complexity | Small-medium graphs |
| Subgraph isolation | Better performance | Management overhead | Large tenants |
| Database isolation | Full separation | High cost | Enterprise compliance |
| Shared + filtered | Cost-effective | Leak risk if bugs | Low-risk data |

## Quality Checks

- [ ] **CRITICAL:** All nodes tagged with tenant_id
- [ ] **CRITICAL:** All queries filter by tenant_id
- [ ] Entity extraction accuracy monitored
- [ ] Graph traversal depth limited
- [ ] Shared ontology read-only for tenants
- [ ] Graph size quotas enforced per tenant

## Web Research Queries

- "knowledge graph RAG architecture {date}"
- "Neo4j multi-tenant graph patterns {date}"
- "GraphRAG Microsoft implementation {date}"
- "entity extraction for knowledge graphs {date}"
- "graph neural networks for RAG {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-RAG1 | Knowledge graph tenant isolation verified |

## Related Patterns

- [rag-pipeline.md](rag-pipeline.md) - End-to-end orchestration
- [hybrid-search.md](hybrid-search.md) - Vector + keyword fusion
- [context-compilation.md](context-compilation.md) - Context assembly
- [query-transformation.md](query-transformation.md) - Query rewriting
