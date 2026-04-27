# BAM Facade Contracts Guide

**When to load:** During Phase 3 (Solutioning) when designing module public interfaces, or when implementing API versioning, contract evolution, or breaking change strategies.

**Integrates with:** Architect (Kai persona), Dev agent, Tech Writer agent

---

## Core Concepts

### What is a Facade Contract?

A facade contract defines the public interface of a module in a modular monolith architecture. It establishes the stable API surface that other modules depend on, isolating internal implementation details from external consumers.

### Contract Types

| Type | Transport | Use Case | Schema |
|------|-----------|----------|--------|
| REST | HTTP/JSON | External APIs | OpenAPI 3.x |
| GraphQL | HTTP/GraphQL | Flexible queries | SDL |
| gRPC | HTTP/2+Protobuf | Internal services | Proto3 |
| Event | Message broker | Async integration | AsyncAPI |

---

## Application Guidelines

When implementing facade contracts in multi-tenant systems:

1. **Define contracts before implementation**: Schema-first design prevents integration issues
2. **Version all contracts**: Support multiple versions for backward compatibility
3. **Isolate facade from implementation**: Internal changes should not break external consumers
4. **Include tenant context validation**: Facades must extract and propagate tenant_id consistently
5. **Document breaking change procedures**: Clear processes for evolving contracts without disruption

---

## Implementation Patterns

### Pattern 1: Module Facade Structure

```
┌─────────────────────────────────────────────────────────┐
│                  Module Architecture                     │
│                                                          │
│   ┌─────────────────────────────────────────────┐       │
│   │              Public Facade                   │       │
│   │   ┌──────┐  ┌───────┐  ┌──────┐            │       │
│   │   │ REST │  │GraphQL│  │ gRPC │            │       │
│   │   └──┬───┘  └───┬───┘  └──┬───┘            │       │
│   └──────┼──────────┼─────────┼─────────────────┘       │
│          │          │         │                          │
│   ┌──────▼──────────▼─────────▼─────────────────┐       │
│   │           Internal Services                  │       │
│   │                                              │       │
│   │   ┌────────┐  ┌────────┐  ┌────────┐       │       │
│   │   │Service │  │Service │  │Service │       │       │
│   │   │   A    │  │   B    │  │   C    │       │       │
│   │   └────────┘  └────────┘  └────────┘       │       │
│   └─────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────┘
```

**Facade Responsibilities:**

| Responsibility | Implementation |
|----------------|----------------|
| Request validation | Schema validation at boundary |
| Authentication | Token/API key verification |
| Tenant context | Extract and propagate tenant_id |
| Rate limiting | Per-tenant request throttling |
| Response mapping | Internal to external DTO |

### Pattern 2: API Versioning Strategies

```
┌─────────────────────────────────────────────────────────┐
│              Versioning Strategy Comparison              │
│                                                          │
│   URL Path Versioning                                    │
│   /api/v1/tenants ──► Handler v1                        │
│   /api/v2/tenants ──► Handler v2                        │
│                                                          │
│   Header Versioning                                      │
│   Accept: application/vnd.api+json;version=1            │
│   Accept: application/vnd.api+json;version=2            │
│                                                          │
│   Query Parameter Versioning                             │
│   /api/tenants?version=1                                │
│   /api/tenants?version=2                                │
└─────────────────────────────────────────────────────────┘
```

**Strategy Selection:**

| Strategy | Visibility | Caching | Recommended |
|----------|------------|---------|-------------|
| URL path | High | Easy | External APIs |
| Header | Low | Complex | Internal services |
| Query param | Medium | Moderate | Legacy compat |

### Pattern 3: Contract Evolution

```
┌─────────────────────────────────────────────────────────┐
│             Contract Lifecycle States                    │
│                                                          │
│   ┌────────┐    ┌────────┐    ┌────────────┐            │
│   │ Draft  │───►│ Active │───►│ Deprecated │            │
│   └────────┘    └────┬───┘    └─────┬──────┘            │
│                      │              │                    │
│                      │              ▼                    │
│                      │         ┌─────────┐              │
│                      └────────►│ Retired │              │
│                                └─────────┘              │
│                                                          │
│   Sunset Timeline:                                       │
│   Active ─► Deprecated (6 months) ─► Retired            │
└─────────────────────────────────────────────────────────┘
```

**Version Support Matrix:**

| Version | Status | Support Until | Migration Path |
|---------|--------|---------------|----------------|
| v3 | Active | Current | N/A |
| v2 | Deprecated | +6 months | v2 to v3 guide |
| v1 | Retired | N/A | Blocked |

### Pattern 4: Breaking Change Management

```
┌─────────────────────────────────────────────────────────┐
│           Breaking Change Decision Tree                  │
│                                                          │
│   Is change required?                                    │
│        │                                                 │
│        ├── NO ──► Defer change                          │
│        │                                                 │
│        └── YES ──► Can it be additive?                  │
│                         │                                │
│                         ├── YES ──► Add new field/endpoint│
│                         │          (no version bump)     │
│                         │                                │
│                         └── NO ──► Requires new version  │
│                                         │                │
│                                         ▼                │
│                              ┌─────────────────────┐    │
│                              │ Breaking Change     │    │
│                              │ Protocol Activated  │    │
│                              └─────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

**Breaking Changes:**

| Change Type | Breaking? | Mitigation |
|-------------|-----------|------------|
| Add optional field | No | None needed |
| Add required field | Yes | Default value or new version |
| Remove field | Yes | Deprecate first, then remove |
| Rename field | Yes | Alias support or new version |
| Change field type | Yes | New version required |

---

## Contract Documentation

### OpenAPI Template Structure

| Section | Required | Content |
|---------|----------|---------|
| info | Yes | Title, version, description |
| servers | Yes | Base URLs per environment |
| paths | Yes | Endpoint definitions |
| components/schemas | Yes | Request/response models |
| security | Yes | Authentication schemes |
| x-tenant-scoped | Yes | Custom tenant context field |

### Contract Testing

| Test Type | Tool | Purpose |
|-----------|------|---------|
| Schema validation | Spectral | OpenAPI lint |
| Contract testing | Pact | Consumer-driven |
| Backward compat | oasdiff | Breaking change detection |
| Integration | Postman/Newman | End-to-end |

---

## Multi-Tenant Considerations

### Tenant Context in Contracts

| Transport | Context Location |
|-----------|------------------|
| REST | X-Tenant-ID header |
| GraphQL | Context variable |
| gRPC | Metadata header |
| Event | Message envelope |

### Response Isolation

- Never leak tenant_id in error details
- Sanitize stack traces in responses
- Filter tenant-scoped data in responses

---

## Decision Framework

| Question | Recommendation |
|----------|----------------|
| External consumers? | URL versioning + OpenAPI |
| High query flexibility? | GraphQL facade |
| Internal high-performance? | gRPC facade |
| Async workflows? | Event-based facade |
| Multiple consumers? | Contract-first design |

---

## Related Patterns

- `module-boundary-design` workflow for module definition
- `define-facade-contract` workflow for contract creation
- `facade-contract` pattern in `bam-patterns.csv`
- `integration-patterns` guide for inter-module communication

### Web Research

For current best practices, use the `web_queries` column from the pattern registry:

| Pattern | Web Search Query |
|---------|------------------|
| `facade-contracts` | `API versioning patterns multi-tenant SaaS {date}` |
| `facade-contracts` | `facade design patterns multi-tenant SaaS {date}` |

**Note:** Replace `{date}` with the current year for up-to-date results.

## Related Workflows

- `define-facade-contract` - Define module public interfaces and contracts
- `bmad-bam-convergence-verification` - Verify contract compatibility across modules
- `bmad-bam-api-version-release` - Manage API versioning and deprecation
