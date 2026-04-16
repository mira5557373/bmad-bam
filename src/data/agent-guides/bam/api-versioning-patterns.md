# BAM API Versioning Patterns Guide

**When to load:** During API design, version strategy planning, backward compatibility design, or when implementing API versioning for multi-tenant SaaS platforms.

**Integrates with:** Winston (Architect), James (Dev), dev-bam extension.

---

## Core Concepts

### Versioning Strategies

| Strategy | Format | Pros | Cons |
|----------|--------|------|------|
| URL Path | `/v1/resources` | Clear, cacheable | URL pollution |
| Header | `Accept: application/vnd.api+json;v=1` | Clean URLs | Hidden version |
| Query Param | `/resources?version=1` | Easy to test | Cache issues |
| Content-Type | `application/vnd.api.v1+json` | Semantic correctness | Complex |

### Multi-Tenant Version Complexity

| Aspect | Single-Tenant | Multi-Tenant |
|--------|---------------|--------------|
| Version Support | One version at a time | Multiple versions concurrently |
| Migration | Big-bang migration | Per-tenant migration timeline |
| Deprecation | Announce and remove | Negotiate per enterprise tenant |
| Feature Flags | Global flags | Per-tenant version + flags |

### Version Lifecycle

```
┌────────┐    ┌────────┐    ┌────────┐    ┌────────┐
│ Alpha  │───►│  Beta  │───►│   GA   │───►│Deprecated│
│ (Dev)  │    │(Test)  │    │(Stable)│    │(Sunset)  │
└────────┘    └────────┘    └────────┘    └────────┘
    │              │             │              │
 Internal      Select        All Tenants   Grace Period
  Only        Tenants                       (6-12 mo)
```

### Version Support Matrix by Tier

| Tier | Supported Versions | Migration Support |
|------|-------------------|-------------------|
| Free | Latest only | Self-service |
| Pro | Latest + 1 prior | Documentation + guides |
| Enterprise | Latest + 2 prior | Dedicated support + timeline |

### Breaking vs Non-Breaking Changes

| Change Type | Breaking? | Handling |
|-------------|-----------|----------|
| Add field to response | No | Additive - safe |
| Remove field from response | Yes | Deprecate first |
| Add required parameter | Yes | New version |
| Add optional parameter | No | Backward compatible |
| Change field type | Yes | New version |
| Rename endpoint | Yes | Alias + deprecate |

### Backward Compatibility Patterns

| Pattern | Description | Use Case |
|---------|-------------|----------|
| Field Aliasing | Support old and new field names | Rename without break |
| Response Versioning | Different response per version | Schema evolution |
| Adapter Layer | Transform old to new | Legacy support |
| Feature Detection | Client queries capabilities | Graceful degradation |

---

## Application Guidelines

When implementing API versioning in a multi-tenant context:

1. **Use URL path versioning** - Clearest for multi-tenant environments
2. **Support N-2 versions minimum** - Enterprise tenants need migration time
3. **Communicate deprecation early** - 12-month notice for enterprise
4. **Provide migration guides** - Per-version upgrade documentation
5. **Track version usage per tenant** - Know who needs migration support
6. **Allow tenant version pinning** - Enterprise can lock to specific version

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Which versioning strategy? | URL path (`/v1/`) | Clear, cache-friendly, tenant-aware |
| How long to support old versions? | 12-18 months after deprecation | Enterprise migration cycles |
| When is a new version required? | Breaking changes only | Minimize version proliferation |
| How to handle emergency deprecation? | Security exemption with 30-day notice | Balance security with stability |
| Version per tenant or global? | Global versions, per-tenant migration | Simplifies maintenance |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **API patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `api-*`
- **Versioning patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `versioning-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "API versioning multi-tenant SaaS {date}"
- Search: "backward compatibility API design patterns {date}"
- Search: "API deprecation best practices {date}"

---

## Related Workflows

- `bmad-bam-api-version-release` - Release new API versions
- `bmad-bam-api-gateway-design` - Design API structure
- `bmad-bam-change-management-process` - Manage version transitions
