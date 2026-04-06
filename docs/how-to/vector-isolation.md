# How to Implement Vector DB Isolation

This guide covers tenant isolation for AI embedding stores (Pinecone, Weaviate, Qdrant, pgvector).

## Why Vector Isolation?

AI embeddings often contain sensitive information:
- Document content representations
- User behavior patterns
- Proprietary knowledge

Cross-tenant access to embeddings can leak this information through:
- Direct queries returning wrong tenant's data
- Similarity searches surfacing neighbor tenant content

## Strategy Options

| Strategy | Isolation | Cost | Complexity |
|----------|-----------|------|------------|
| Namespace per tenant | High | Low | Low |
| Metadata filtering | Medium | Low | Low |
| Index per tenant | Maximum | High | Medium |
| Database per tenant | Maximum | Highest | High |

**Recommended**: Namespace per tenant (or metadata filtering for pgvector)

## Implementation

### 1. Pinecone (Namespace)

```typescript
class TenantVectorStore {
  constructor(private pinecone: PineconeClient) {}

  private getNamespace(tenantId: string): string {
    return `tenant-${tenantId}`;
  }

  async upsert(
    vectors: Vector[],
    context: { tenantId: string }
  ): Promise<void> {
    const index = this.pinecone.Index('main');
    const namespace = this.getNamespace(context.tenantId);
    
    await index.namespace(namespace).upsert(vectors);
  }

  async query(
    params: QueryParams,
    context: { tenantId: string }
  ): Promise<QueryResult[]> {
    const index = this.pinecone.Index('main');
    const namespace = this.getNamespace(context.tenantId);
    
    return index.namespace(namespace).query(params);
  }

  async delete(
    ids: string[],
    context: { tenantId: string }
  ): Promise<void> {
    const index = this.pinecone.Index('main');
    const namespace = this.getNamespace(context.tenantId);
    
    await index.namespace(namespace).deleteMany(ids);
  }

  async deleteAllForTenant(tenantId: string): Promise<void> {
    const index = this.pinecone.Index('main');
    const namespace = this.getNamespace(tenantId);
    
    await index.namespace(namespace).deleteAll();
  }
}
```

### 2. pgvector (Metadata Filtering)

```sql
-- Table with tenant isolation
CREATE TABLE embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  content TEXT NOT NULL,
  embedding vector(1536) NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE embeddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE embeddings FORCE ROW LEVEL SECURITY;

-- Tenant isolation policy
CREATE POLICY tenant_isolation ON embeddings
  USING (tenant_id = current_setting('app.tenant_id')::uuid);

-- Vector search index
CREATE INDEX ON embeddings 
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);
```

```typescript
class PgVectorStore {
  async search(
    embedding: number[],
    limit: number,
    context: { tenantId: string }
  ): Promise<SearchResult[]> {
    // Set tenant context (RLS handles isolation)
    await this.db.query(
      `SET LOCAL app.tenant_id = $1`,
      [context.tenantId]
    );

    // Search with automatic tenant filtering via RLS
    const result = await this.db.query(`
      SELECT id, content, metadata,
             1 - (embedding <=> $1) as similarity
      FROM embeddings
      ORDER BY embedding <=> $1
      LIMIT $2
    `, [JSON.stringify(embedding), limit]);

    return result.rows;
  }
}
```

### 3. Weaviate (Multi-tenancy)

```typescript
class WeaviateVectorStore {
  constructor(private client: WeaviateClient) {}

  async upsert(
    objects: WeaviateObject[],
    context: { tenantId: string }
  ): Promise<void> {
    await this.client.batch
      .objectsBatcher()
      .withObjects(objects.map(obj => ({
        ...obj,
        tenant: context.tenantId,  // Native multi-tenancy
      })))
      .do();
  }

  async search(
    vector: number[],
    limit: number,
    context: { tenantId: string }
  ): Promise<SearchResult[]> {
    const result = await this.client.graphql
      .get()
      .withClassName('Document')
      .withTenant(context.tenantId)  // Tenant-scoped query
      .withNearVector({ vector })
      .withLimit(limit)
      .do();

    return result.data.Get.Document;
  }
}
```

### 4. LangChain Integration

```typescript
import { PineconeStore } from 'langchain/vectorstores/pinecone';

class TenantAwareLangChainStore {
  constructor(
    private pinecone: PineconeClient,
    private embeddings: Embeddings,
  ) {}

  getStore(tenantId: string): PineconeStore {
    return new PineconeStore(this.embeddings, {
      pineconeIndex: this.pinecone.Index('main'),
      namespace: `tenant-${tenantId}`,
    });
  }

  async similaritySearch(
    query: string,
    k: number,
    context: { tenantId: string }
  ): Promise<Document[]> {
    const store = this.getStore(context.tenantId);
    return store.similaritySearch(query, k);
  }
}
```

## Testing

```typescript
describe('Vector Store Isolation', () => {
  it('isolates embeddings by tenant', async () => {
    const store = new TenantVectorStore(pinecone);
    
    // Store embedding for tenant A
    await store.upsert([
      { id: '1', values: [0.1, 0.2, 0.3], metadata: { text: 'secret' } }
    ], { tenantId: 'tenant-a' });

    // Query as tenant B
    const results = await store.query({
      vector: [0.1, 0.2, 0.3],
      topK: 10,
    }, { tenantId: 'tenant-b' });

    expect(results).toHaveLength(0);
  });

  it('returns results for correct tenant', async () => {
    const store = new TenantVectorStore(pinecone);
    
    await store.upsert([
      { id: '1', values: [0.1, 0.2, 0.3], metadata: { text: 'doc' } }
    ], { tenantId: 'tenant-a' });

    const results = await store.query({
      vector: [0.1, 0.2, 0.3],
      topK: 10,
    }, { tenantId: 'tenant-a' });

    expect(results).toHaveLength(1);
  });
});
```

## Cleanup on Offboarding

```typescript
async function offboardTenantVectors(tenantId: string): Promise<void> {
  const store = new TenantVectorStore(pinecone);
  await store.deleteAllForTenant(tenantId);
}
```

## Related

- [Tenant Isolation Setup](../tutorials/tenant-isolation-setup.md) - Database isolation
- [Cache Isolation](cache-isolation.md) - Redis isolation
- [AI Agent Architecture](../explanation/ai-agent-architecture.md) - Memory tiers
