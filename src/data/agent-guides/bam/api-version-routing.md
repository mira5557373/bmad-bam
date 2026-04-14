# API Version Routing

**When to load:** When designing API versioning strategy, implementing version routing, or when user mentions breaking changes, API deprecation, or multi-version support.

**Integrates with:** Architect (Kai persona), Dev agent, Tech Writer agent

---

## Core Concepts

### What is API Version Routing?

API version routing manages multiple concurrent API versions in a multi-tenant SaaS platform, enabling gradual migrations, backward compatibility, and tenant-specific version pinning while maintaining a clean developer experience.

### Versioning Strategies

| Strategy | Format | Pros | Cons |
|----------|--------|------|------|
| URL path | `/api/v1/...` | Clear, cacheable | URL pollution |
| Header | `API-Version: 2024-01` | Clean URLs | Less visible |
| Query param | `?api-version=1` | Easy testing | Cache issues |
| Content-Type | `application/vnd.api.v1+json` | RESTful | Complex |

### Version Routing Architecture

```
Client Request
    │
    ├── Extract version from URL/header
    │
    ├── Lookup tenant version preferences
    │   ├── Pinned version (if set)
    │   ├── Tier default
    │   └── Platform default
    │
    ├── Validate version is supported
    │
    ├── Route to versioned handler
    │   ├── v1 handler
    │   ├── v2 handler
    │   └── v3 handler (preview)
    │
    └── Add deprecation headers if applicable
```

---

## Key Patterns

### Pattern 1: Semantic Versioning for APIs

| Version Component | Meaning | Tenant Impact |
|-------------------|---------|---------------|
| Major (v1 → v2) | Breaking changes | Requires migration |
| Minor (v1.1 → v1.2) | New features | Opt-in |
| Patch (v1.1.1 → v1.1.2) | Bug fixes | Automatic |

### Breaking vs Non-Breaking Changes

| Change Type | Breaking | Non-Breaking |
|-------------|----------|--------------|
| Remove endpoint | Yes | - |
| Remove field | Yes | - |
| Change field type | Yes | - |
| Add optional field | - | Yes |
| Add new endpoint | - | Yes |
| Add optional parameter | - | Yes |

### Pattern 2: Tenant Version Pinning

| Pin Type | Description | Use Case |
|----------|-------------|----------|
| Default | Platform-managed version | Most tenants |
| Pinned | Locked to specific version | Enterprise stability |
| Preview | Access to upcoming version | Beta testers |
| Legacy | Extended support | Migration window |

### Version Pinning Database Schema

| Field | Type | Description |
|-------|------|-------------|
| tenant_id | UUID | Tenant identifier |
| api_version | String | Pinned version (null = default) |
| pin_reason | String | Why pinned |
| pin_expiry | Timestamp | Auto-unpin date |
| preview_access | Boolean | Can access preview versions |

### Pattern 3: Version Sunset Timeline

| Phase | Duration | Actions |
|-------|----------|---------|
| Current | Active | Full support |
| Deprecated | 6 months | No new features, bug fixes only |
| Legacy | 6 months | Security fixes only |
| EOL | Final | Traffic redirected or 410 Gone |

---

## Decision Criteria

### Choosing a Versioning Strategy

| Factor | URL Path | Header | Query Param |
|--------|----------|--------|-------------|
| API discoverability | High | Low | Medium |
| CDN cacheability | Yes | With Vary header | No |
| Developer experience | Simple | Requires docs | Simple |
| Version visibility | Explicit | Hidden | Explicit |
| SDK complexity | Low | Medium | Low |

### When to Create a New Major Version

| Scenario | New Major | Minor/Patch |
|----------|-----------|-------------|
| Field removal | Yes | - |
| Behavior change | Yes | - |
| New required field | Yes | - |
| Security fix | - | Patch |
| New optional capability | - | Minor |
| Documentation update | - | Patch |

---

## Application Guidelines

- Planning breaking API changes
- Designing developer-friendly versioning
- Implementing gradual migration strategies
- Building API documentation versioning
- Managing long-term backward compatibility

---

## Version Routing Logic

| Priority | Check | Route To |
|----------|-------|----------|
| 1 | Tenant pinned version | Pinned version |
| 2 | Request header/path | Requested version |
| 3 | Tier default | Tier-specific default |
| 4 | Platform default | Current stable |

---

## Per-Tier Version Support

| Tier | Concurrent Versions | Sunset Extension | Custom Pinning |
|------|---------------------|------------------|----------------|
| Free | Current only | No | No |
| Pro | Current + 1 previous | 3 months | Request-based |
| Enterprise | All supported | 12 months | Yes |

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| No deprecation warnings | Surprise breakage | Deprecation headers + notices |
| Breaking changes without version bump | Consumer breakage | Semantic versioning discipline |
| Forever supporting old versions | Maintenance burden | Clear sunset policy |
| Version sprawl | Testing complexity | Limit concurrent versions |
| Silent behavior changes | Hidden bugs | Document all changes |
| No migration guides | Consumer frustration | Version migration documentation |

### Deprecation Communication

| Channel | Timing | Content |
|---------|--------|---------|
| API response headers | Immediate | Deprecation-Warning header |
| Documentation | 6 months before | Migration guide |
| Email notification | 3 months before | Impact and timeline |
| Dashboard alert | Ongoing | Usage of deprecated endpoints |

---

## Integration with BAM Patterns

| Pattern | Integration Point | Purpose |
|---------|-------------------|---------|
| API Gateway | Version extraction and routing | Entry point versioning |
| Module Facade | Internal version mapping | Module contracts |
| Feature Toggles | Preview version access | Gradual rollout |
| Tenant Customization | Version pinning settings | Tenant control |
| Observability | Per-version metrics | Usage tracking |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Which versioning strategy should I use for a multi-tenant SaaS API? | URL path versioning (`/api/v1/...`) | Most discoverable for developers, CDN-cacheable, and simplifies tenant-specific version pinning implementation |
| Should tenants be allowed to pin to specific API versions? | Yes, for Pro and Enterprise tiers with defined sunset windows | Enables enterprise customers to manage migration schedules while maintaining platform evolution velocity |
| How many concurrent API versions should be supported? | Maximum 3 (current, previous, legacy) with tier-based access | Balances maintenance burden with backward compatibility; prevents testing complexity explosion |
| When should I create a new major API version? | Only for breaking changes: field removal, type changes, required field additions | Avoids version proliferation; minor and patch versions should be additive and backward-compatible |
| How should API version deprecation be communicated to tenants? | Multi-channel approach: response headers, documentation, email, dashboard alerts | Different personas consume different channels; redundancy ensures no tenant is caught off-guard |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **API patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `facade-contracts`, `deployment`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "API versioning strategies SaaS {date}"
- Search: "multi-tenant API version management {date}"
- Search: "API deprecation best practices {date}"
- Search: "API backward compatibility patterns {date}"

## Related Workflows

- `bmad-bam-api-version-release` - Design comprehensive API versioning strategy
- `bmad-bam-internal-contract-design` - Define versioned facade contracts between modules
- `bmad-bam-convergence-verification` - Verify version compatibility across module boundaries
- `bmad-bam-tenant-tier-migration` - Handle version transitions during tenant tier changes
