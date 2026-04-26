# Caching - BAM Domain Context

**Loaded by:** ZCC, ZCM  
**Related Workflows:** bmad-bam-caching-strategy, bmad-bam-cache-invalidation

---

## Overview

Caching in multi-tenant systems requires tenant-aware key strategies to prevent data leakage.

## Core Concepts

### Cache Key Pattern

All cache keys MUST include tenant prefix:
```
tenant:{tenant_id}:{resource}:{id}
tenant:{tenant_id}:{resource}:list:{hash}
```

### Cache Tiers

| Tier | Storage | TTL | Use Case |
|------|---------|-----|----------|
| L1 | In-memory | Seconds | Hot data |
| L2 | Redis | Minutes | Session data |
| L3 | CDN | Hours | Static assets |

### Invalidation Patterns

| Pattern | Scope | Trigger |
|---------|-------|---------|
| Key-based | Single item | Write |
| Tag-based | Related items | Bulk update |
| Tenant-wide | All tenant data | Offboarding |

## Decision Matrix

| Data Type | Cache Tier | TTL | Invalidation |
|-----------|------------|-----|--------------|
| User sessions | L2 Redis | 30 min | On logout |
| Tenant config | L2 Redis | 5 min | On change |
| Static assets | L3 CDN | 24 hr | Deploy |
| AI responses | L1 Memory | 60 sec | None |

## Quality Checks

- [ ] Cache keys include tenant prefix
- [ ] TTL policies respect tenant tiers
- [ ] Invalidation scoped to tenant
- [ ] **CRITICAL:** No cross-tenant cache pollution

## Web Research Queries

- "multi-tenant caching patterns {date}"
- "Redis tenant isolation {date}"
