# BAM API Documentation Patterns Guide

**When to load:** During API design, documentation generation, developer experience planning, or when implementing API documentation for multi-tenant SaaS platforms.

**Integrates with:** Winston (Architect), James (Dev), tech-writer-bam extension.

---

## Core Concepts

### Documentation Layers

| Layer | Content | Audience |
|-------|---------|----------|
| Reference | Endpoint specs, parameters, responses | Developers |
| Guides | How-to tutorials, use cases | Developers |
| Concepts | Architecture, patterns, best practices | Architects |
| Changelog | Version history, breaking changes | All |
| Status | API health, deprecation notices | Operations |

### Multi-Tenant Documentation Considerations

| Aspect | Single-Tenant | Multi-Tenant |
|--------|---------------|--------------|
| Authentication | Single method | Multiple methods per tier |
| Rate Limits | Global limits | Per-tenant limits |
| Endpoints | Uniform access | Tier-gated endpoints |
| Examples | Generic examples | Tenant-contextualized |
| Errors | Standard errors | Tenant-specific error contexts |

### OpenAPI/Swagger Structure for Multi-Tenant

```yaml
openapi: 3.1.0
info:
  title: Multi-Tenant Platform API
  version: 2.0.0
  x-tenant-aware: true

paths:
  /tenants/{tenant_id}/resources:
    get:
      x-tier-required: pro
      x-rate-limit: "100/minute per tenant"
      parameters:
        - name: tenant_id
          in: path
          required: true
          x-tenant-context: true
```

### Documentation by Tier

| Tier | Documentation Access | Features Documented |
|------|---------------------|---------------------|
| Free | Public docs only | Basic endpoints |
| Pro | Full API reference | All standard endpoints |
| Enterprise | Full + private docs | Custom endpoints + SLAs |

### Documentation Generation Pipeline

```
┌─────────────────────────────────────────────────┐
│         Documentation Pipeline                   │
│                                                  │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │  Code    │───►│ OpenAPI  │───►│  Docs    │  │
│  │ Comments │    │  Spec    │    │Generator │  │
│  └──────────┘    └──────────┘    └────┬─────┘  │
│                                       │         │
│                              ┌────────▼────────┐│
│                              │ Per-Tier Docs   ││
│                              │ (Free/Pro/Ent)  ││
│                              └────────┬────────┘│
│                                       │         │
│                              ┌────────▼────────┐│
│                              │ Developer Portal││
│                              └─────────────────┘│
└─────────────────────────────────────────────────┘
```

### Interactive Documentation Features

| Feature | Description | Multi-Tenant Adaptation |
|---------|-------------|------------------------|
| Try It Out | Test API in browser | Use tenant sandbox |
| Code Samples | Language examples | Include tenant headers |
| Mock Server | Offline testing | Per-tenant mock data |
| API Console | Full API access | Tenant-scoped tokens |

---

## Application Guidelines

When implementing API documentation in a multi-tenant context:

1. **Generate from code** - Keep docs in sync with implementation
2. **Show tier-specific content** - Only show features available to tenant's tier
3. **Include tenant context examples** - All examples include tenant headers
4. **Version documentation alongside API** - Docs match API version
5. **Provide sandbox environments** - Safe testing per tenant
6. **Document rate limits clearly** - Per-tier limits prominently displayed

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Generate or hand-write docs? | Generate from OpenAPI | Keeps docs accurate |
| Public or authenticated docs? | Hybrid - public intro, auth for details | Balance discoverability with security |
| How to handle tier-gated content? | Show all, mark tier requirements | Transparency drives upgrades |
| Documentation versioning? | Match API version | Reduce confusion |
| Code sample languages? | cURL, Python, JavaScript, Go | Cover common use cases |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **API patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `api-*`
- **Documentation patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `docs-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "API documentation multi-tenant SaaS {date}"
- Search: "OpenAPI multi-tenant best practices {date}"
- Search: "developer documentation generation automation {date}"

---

## Related Workflows

- `bmad-bam-api-gateway-design` - Design API structure
- `bmad-bam-tenant-portal-design` - Build developer portal
- `bmad-bam-api-version-release` - Release API versions
