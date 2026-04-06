# How to Implement Cache Isolation

This guide covers implementing tenant-isolated caching in Redis.

## Why Cache Isolation?

Without isolation, tenants can:
- Read cached data from other tenants
- Poison cache entries
- Cause cache key collisions

## Implementation

### 1. Tenant-Prefixed Keys

```typescript
class TenantCache {
  constructor(private redis: Redis) {}

  private getKey(key: string, tenantId: string): string {
    return `tenant:${tenantId}:${key}`;
  }

  async get<T>(key: string, context: { tenantId: string }): Promise<T | null> {
    const prefixedKey = this.getKey(key, context.tenantId);
    const value = await this.redis.get(prefixedKey);
    return value ? JSON.parse(value) : null;
  }

  async set<T>(
    key: string, 
    value: T, 
    context: { tenantId: string },
    ttl?: number
  ): Promise<void> {
    const prefixedKey = this.getKey(key, context.tenantId);
    const serialized = JSON.stringify(value);
    
    if (ttl) {
      await this.redis.setex(prefixedKey, ttl, serialized);
    } else {
      await this.redis.set(prefixedKey, serialized);
    }
  }

  async delete(key: string, context: { tenantId: string }): Promise<void> {
    const prefixedKey = this.getKey(key, context.tenantId);
    await this.redis.del(prefixedKey);
  }

  async deleteAllForTenant(tenantId: string): Promise<void> {
    const pattern = `tenant:${tenantId}:*`;
    const keys = await this.redis.keys(pattern);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }
}
```

### 2. NestJS Integration

```typescript
@Injectable()
export class CacheService {
  constructor(
    private readonly redis: Redis,
    private readonly tenantContext: TenantContext,
  ) {}

  private getKey(key: string): string {
    const tenantId = this.tenantContext.tenantId;
    if (!tenantId) {
      throw new Error('Tenant context required for cache operations');
    }
    return `tenant:${tenantId}:${key}`;
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.redis.get(this.getKey(key));
    return value ? JSON.parse(value) : null;
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    const prefixedKey = this.getKey(key);
    if (ttl) {
      await this.redis.setex(prefixedKey, ttl, JSON.stringify(value));
    } else {
      await this.redis.set(prefixedKey, JSON.stringify(value));
    }
  }
}
```

### 3. Decorator Pattern

```typescript
// Cache decorator with automatic tenant isolation
function TenantCached(ttl: number = 300) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const cache = this.cache as TenantCache;
      const context = this.tenantContext as TenantContext;
      
      const cacheKey = `${propertyKey}:${JSON.stringify(args)}`;
      
      // Try cache first
      const cached = await cache.get(cacheKey, { tenantId: context.tenantId });
      if (cached) return cached;

      // Execute and cache
      const result = await originalMethod.apply(this, args);
      await cache.set(cacheKey, result, { tenantId: context.tenantId }, ttl);
      
      return result;
    };
  };
}

// Usage
class ProjectService {
  @TenantCached(300)
  async getProject(id: string): Promise<Project> {
    return this.repo.findById(id);
  }
}
```

### 4. Cache Invalidation

```typescript
class CacheInvalidator {
  constructor(private cache: TenantCache) {}

  // Invalidate specific key
  async invalidate(key: string, tenantId: string): Promise<void> {
    await this.cache.delete(key, { tenantId });
  }

  // Invalidate by pattern
  async invalidatePattern(pattern: string, tenantId: string): Promise<void> {
    const fullPattern = `tenant:${tenantId}:${pattern}`;
    const keys = await this.cache.redis.keys(fullPattern);
    if (keys.length > 0) {
      await this.cache.redis.del(...keys);
    }
  }

  // Invalidate all for entity
  async invalidateEntity(entity: string, id: string, tenantId: string): Promise<void> {
    await this.invalidatePattern(`${entity}:${id}:*`, tenantId);
    await this.invalidatePattern(`${entity}:list:*`, tenantId);
  }
}
```

## Testing

```typescript
describe('Cache Isolation', () => {
  it('isolates cache by tenant', async () => {
    const cache = new TenantCache(redis);
    
    await cache.set('project:123', { name: 'A' }, { tenantId: 'tenant-a' });
    await cache.set('project:123', { name: 'B' }, { tenantId: 'tenant-b' });
    
    const a = await cache.get('project:123', { tenantId: 'tenant-a' });
    const b = await cache.get('project:123', { tenantId: 'tenant-b' });
    
    expect(a.name).toBe('A');
    expect(b.name).toBe('B');
  });
});
```

## Cleanup on Offboarding

When tenant is offboarded:

```typescript
async function offboardTenant(tenantId: string): Promise<void> {
  // Delete all cache entries
  const cache = new TenantCache(redis);
  await cache.deleteAllForTenant(tenantId);
}
```

## Related

- [Tenant Isolation Setup](../tutorials/tenant-isolation-setup.md) - Database isolation
- [Test Tenant Isolation](test-tenant-isolation.md) - Testing patterns
- [Vector Isolation](vector-isolation.md) - AI embedding isolation
