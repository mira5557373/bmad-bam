# How to Test Tenant Isolation

This guide covers comprehensive testing strategies to verify tenant data isolation.

## Why Test Isolation?

Tenant isolation bugs can lead to:
- Data breaches between customers
- Compliance violations
- Loss of customer trust

Testing must verify isolation at every layer.

## Test Categories

### 1. Database RLS Tests

```typescript
describe('RLS Isolation', () => {
  let tenantA: TenantFixture;
  let tenantB: TenantFixture;

  beforeEach(async () => {
    tenantA = await createTenantFixture();
    tenantB = await createTenantFixture();
  });

  describe('SELECT isolation', () => {
    it('cannot read other tenant data', async () => {
      // Create data as A
      tenantA.setContext();
      await db.query(
        'INSERT INTO projects (tenant_id, name) VALUES ($1, $2)',
        [tenantA.id, 'Secret Project']
      );

      // Try to read as B
      tenantB.setContext();
      const result = await db.query('SELECT * FROM projects');
      
      expect(result.rows).toHaveLength(0);
    });
  });

  describe('INSERT isolation', () => {
    it('cannot insert with wrong tenant_id', async () => {
      tenantA.setContext();
      
      await expect(
        db.query(
          'INSERT INTO projects (tenant_id, name) VALUES ($1, $2)',
          [tenantB.id, 'Malicious']  // Wrong tenant
        )
      ).rejects.toThrow();
    });
  });

  describe('UPDATE isolation', () => {
    it('cannot update other tenant data', async () => {
      // Create as A
      tenantA.setContext();
      const { rows } = await db.query(
        'INSERT INTO projects (tenant_id, name) VALUES ($1, $2) RETURNING id',
        [tenantA.id, 'Original']
      );
      const projectId = rows[0].id;

      // Try to update as B
      tenantB.setContext();
      const result = await db.query(
        'UPDATE projects SET name = $1 WHERE id = $2',
        ['Hacked', projectId]
      );
      
      expect(result.rowCount).toBe(0);
    });
  });
});
```

### 2. Cache Isolation Tests

```typescript
describe('Cache Isolation', () => {
  it('uses tenant-prefixed keys', async () => {
    const cache = new TenantCache(redis);
    
    await cache.set('key', 'value-a', { tenantId: 'tenant-a' });
    await cache.set('key', 'value-b', { tenantId: 'tenant-b' });
    
    expect(await cache.get('key', { tenantId: 'tenant-a' })).toBe('value-a');
    expect(await cache.get('key', { tenantId: 'tenant-b' })).toBe('value-b');
  });

  it('cannot access other tenant cache', async () => {
    const cache = new TenantCache(redis);
    
    await cache.set('secret', 'data', { tenantId: 'tenant-a' });
    
    const result = await cache.get('secret', { tenantId: 'tenant-b' });
    expect(result).toBeNull();
  });
});
```

### 3. API Isolation Tests

```typescript
describe('API Isolation', () => {
  it('rejects requests without tenant context', async () => {
    const response = await request(app)
      .get('/api/projects')
      // No Authorization header
      
    expect(response.status).toBe(401);
  });

  it('filters results by tenant', async () => {
    // Create projects for both tenants
    await createProject('Project A', tokenA);
    await createProject('Project B', tokenB);

    // Request as tenant A
    const response = await request(app)
      .get('/api/projects')
      .set('Authorization', `Bearer ${tokenA}`);

    expect(response.body.projects).toHaveLength(1);
    expect(response.body.projects[0].name).toBe('Project A');
  });
});
```

### 4. Background Job Isolation Tests

```typescript
describe('Job Isolation', () => {
  it('preserves tenant context in async jobs', async () => {
    const results: string[] = [];
    
    // Queue job as tenant A
    await queue.add('process', { data: 'test' }, {
      tenantId: 'tenant-a'
    });

    // Job handler
    worker.on('process', async (job) => {
      const tenantId = job.data.tenantId;
      // Verify context is preserved
      results.push(tenantId);
    });

    await waitForJob();
    expect(results[0]).toBe('tenant-a');
  });
});
```

### 5. Vector DB Isolation Tests

```typescript
describe('Vector Store Isolation', () => {
  it('uses tenant namespaces', async () => {
    const store = new TenantVectorStore(pinecone);
    
    await store.upsert([
      { id: '1', values: [0.1, 0.2], metadata: { text: 'secret' } }
    ], { tenantId: 'tenant-a' });

    // Query as different tenant
    const results = await store.query({
      values: [0.1, 0.2],
      topK: 10,
    }, { tenantId: 'tenant-b' });

    expect(results).toHaveLength(0);
  });
});
```

## Running Isolation Tests

```bash
# Run all isolation tests
npm test -- --grep "Isolation"

# Run with TEA
/tea
> bam-tea-context
> tenant-test-strategy
```

## Quality Gates

Tests must pass for:
- **QG-M2**: Tenant isolation implemented
- **QG-I2**: Tenant safety verified

## Checklist

Use `src/checklists/tenant-isolation.md` to verify all layers.

## Related

- [Tenant Isolation Setup](../tutorials/tenant-isolation-setup.md) - Implementation
- [Integrate with TEA](integrate-with-tea.md) - Test framework
