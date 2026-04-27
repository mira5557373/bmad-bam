# BAM API Documentation Guide

**When to load:** During Phase 3-4 (Solutioning/Implementation) when designing API documentation,
or when user mentions API docs, OpenAPI, Swagger, developer portal, SDK generation.

**Integrates with:** Tech Writer agent, Architect (Atlas persona), Dev agent

---

## Core Concepts

### Multi-Tenant API Documentation

API documentation for multi-tenant platforms must address tenant-specific concerns:

| Aspect | Single-Tenant | Multi-Tenant |
|--------|---------------|--------------|
| Authentication | Single method | Per-tenant configuration |
| Rate limits | Global limits | Tier-based limits |
| Endpoints | Fixed set | Tier-gated features |
| Examples | Generic | Tenant-contextualized |
| SDKs | Single variant | Multi-tenant aware |

### Documentation Layers

| Layer | Audience | Content |
|-------|----------|---------|
| Public API Reference | All developers | Endpoints, parameters, responses |
| Getting Started | New integrators | Quick start, authentication |
| Tier Guides | Customers by tier | Available features, limits |
| Integration Guides | Implementation teams | Patterns, best practices |
| Admin API | Tenant admins | Management endpoints |

### API Documentation Standards

| Standard | Use Case | Benefits |
|----------|----------|----------|
| OpenAPI 3.x | REST API specification | Tool ecosystem, SDK generation |
| AsyncAPI | Event-driven APIs | Webhook, streaming documentation |
| GraphQL SDL | GraphQL APIs | Schema-first documentation |
| gRPC protobuf | Internal services | Strong typing, code generation |

## Application Guidelines

When implementing API documentation for multi-tenant systems:

1. **Document tenant context requirements**: Explain how tenant_id flows through requests
2. **Show tier-specific rate limits**: Different tiers have different quotas
3. **Provide tier-appropriate examples**: Show features available at each tier
4. **Automate from source**: Generate docs from code annotations
5. **Version documentation with API**: Each API version has matching docs

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| New API endpoint | OpenAPI-first with generated code | Single source of truth, consistent docs |
| Webhook documentation | AsyncAPI specification | Purpose-built for event-driven patterns |
| Multi-language SDKs | OpenAPI Generator with customization | Consistent SDKs from single spec |
| Internal service docs | gRPC protobuf with grpc-gateway | Type-safe with REST compatibility |
| Real-time API | AsyncAPI + WebSocket specification | Document streaming behavior |
| Developer portal | Redoc or Stoplight for rendering | Interactive, customizable |

## Implementation Patterns

### Pattern 1: Documentation Pipeline

| Stage | Tool | Output |
|-------|------|--------|
| Source | Code annotations | OpenAPI comments |
| Extract | swagger-jsdoc, springdoc | OpenAPI YAML |
| Validate | spectral, openapi-lint | Validation report |
| Enhance | Redocly CLI | Extended spec |
| Publish | Redoc, Stoplight | Developer portal |
| SDKs | openapi-generator | Language SDKs |

### Pattern 2: Tenant-Aware Documentation

| Element | Standard | Tenant Enhancement |
|---------|----------|-------------------|
| Base URL | `https://api.platform.com` | `https://api.platform.com/tenants/{tenant_id}` |
| Authentication | Bearer token | Tenant-scoped API key |
| Headers | Standard headers | `X-Tenant-ID` requirement |
| Errors | HTTP status codes | Tenant context in error responses |
| Examples | Generic data | Tenant-specific sample data |

### Pattern 3: Tier-Gated Feature Documentation

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Basic CRUD | Documented | Documented | Documented |
| Bulk operations | Hidden | Documented | Documented |
| Webhooks | Hidden | Documented | Documented |
| Custom fields | Hidden | Hidden | Documented |
| Admin API | Hidden | Hidden | Documented |

## Multi-Tenant Documentation Automation

### OpenAPI Extensions for Multi-Tenant

| Extension | Purpose | Example |
|-----------|---------|---------|
| `x-tenant-required` | Mark tenant-scoped endpoints | `true/false` |
| `x-tier-availability` | Feature tier gating | `["pro", "enterprise"]` |
| `x-rate-limit` | Tier-specific rate limits | `{"free": 100, "pro": 1000}` |
| `x-quota-impact` | Resource consumption | `{"tokens": 10, "storage": "1MB"}` |

### SDK Generation Strategy

| Language | Generator | Multi-Tenant Support |
|----------|-----------|---------------------|
| TypeScript | openapi-typescript | Tenant context in client config |
| Python | openapi-python-client | Tenant ID parameter |
| Go | oapi-codegen | Context-aware client |
| Java | openapi-generator | Tenant interceptor |

### Documentation Versioning

| Version Strategy | API Change | Doc Update |
|------------------|------------|------------|
| Major version | Breaking changes | New doc version |
| Minor version | New features | Section additions |
| Patch version | Bug fixes | Inline updates |
| Deprecation | Planned removal | Deprecation notices |

## Developer Portal Features

### Portal Components

| Component | Purpose | Tenant Context |
|-----------|---------|----------------|
| API Reference | Interactive docs | Tenant sandbox |
| Playground | Live API testing | Tenant test environment |
| SDK Downloads | Language clients | Pre-configured for tenant |
| Changelog | Version history | Tier-relevant changes |
| Status Page | Service health | Tenant-specific status |

### Self-Service Features

| Feature | Tier Availability | Implementation |
|---------|-------------------|----------------|
| API key management | All tiers | Portal + Admin API |
| Usage dashboard | All tiers | Real-time metrics |
| Webhook configuration | Pro+ | Portal UI |
| Rate limit monitoring | All tiers | Dashboard widget |
| Support tickets | Pro+ | Integrated ticketing |

## Quality Standards

### Documentation Requirements

| Requirement | Validation | Automation |
|-------------|------------|------------|
| All endpoints documented | OpenAPI coverage check | CI gate |
| Examples provided | Schema example validation | Linting |
| Error codes documented | Response schema check | Spectral rules |
| Rate limits specified | Extension validation | Custom rule |
| Authentication documented | Security scheme check | OpenAPI validator |

### Accuracy Verification

| Verification | Method | Frequency |
|--------------|--------|-----------|
| Schema accuracy | Contract testing | Every PR |
| Example validity | Example execution | Daily |
| Link integrity | Link checker | Weekly |
| SDK compatibility | SDK test suite | Every release |

## Related Workflows

- `bmad-bam-api-version-release` - API versioning documentation
- `define-facade-contract` - Contract-first API design
- `evolve-facade-contract` - API evolution documentation

## Related Patterns

Load decision criteria from pattern registry:
- **Patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `api`, `documentation`

### Web Research

Use `web_queries` from pattern registry:
- Search: "OpenAPI multi-tenant documentation patterns {date}"
- Search: "API developer portal best practices {date}"
- Search: "SDK generation multi-tenant SaaS {date}"
