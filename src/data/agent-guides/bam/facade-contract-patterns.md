# BAM Facade Contract Patterns Guide

**When to load:** During Phase 3 (Solutioning) when designing module boundaries,
or when user mentions facade contracts, module interfaces, or API versioning.

**Integrates with:** Winston (Architect), module-boundary-design, define-facade-contract

---

## Core Concepts

### What Is a Facade Contract?

A facade contract defines the public interface between modules in a modular monolith architecture. It specifies what operations a module exposes to other modules while hiding internal implementation details. The contract serves as a stability boundary that enables independent module evolution.

```
Module A                    Module B
┌─────────────────┐        ┌─────────────────┐
│   Internal      │        │   Internal      │
│   Services      │        │   Services      │
│        │        │        │        ▲        │
│        ▼        │        │        │        │
│ ┌─────────────┐ │        │ ┌─────────────┐ │
│ │   Facade    │─┼────────┼─│   Facade    │ │
│ │  Contract   │ │        │ │  Contract   │ │
│ └─────────────┘ │        │ └─────────────┘ │
└─────────────────┘        └─────────────────┘
```

### Contract Stability Levels

| Level | Definition | Breaking Change Policy |
|-------|------------|------------------------|
| **Frozen** | No changes allowed | Requires new major version |
| **Stable** | Additive changes only | New fields OK, removals forbidden |
| **Evolving** | Documented changes | 2-sprint deprecation notice required |
| **Experimental** | May change anytime | Not for production dependencies |

### Facade Pattern Types

| Pattern | Use Case | Tenant Awareness |
|---------|----------|------------------|
| **Synchronous Facade** | Request-response operations | Tenant context in headers |
| **Async Message Facade** | Event-driven communication | Tenant ID in message envelope |
| **Query Facade** | Read-only operations | Tenant filter in query context |
| **Command Facade** | Write operations | Tenant validation required |

## Application Guidelines

### 1. Design Facades for Tenant Isolation

Every facade contract must include tenant context handling. The tenant ID should be validated at the facade boundary before any internal processing occurs. This ensures that cross-tenant data access is impossible even if internal code has bugs.

**Required Tenant Fields:**
- `tenant_id` - Required in all requests
- `tenant_tier` - Optional, for feature gating
- `tenant_context` - Optional, for audit trail

### 2. Version Facades Independently

Each facade should have its own version independent of the module's internal version. Use semantic versioning (major.minor.patch) where major version changes indicate breaking changes that require consumer updates.

**Version Header Pattern:**
```
X-Facade-Version: 2.1.0
X-Min-Supported-Version: 1.5.0
```

### 3. Define Clear Error Contracts

Facade errors should be domain-specific and not leak internal implementation details. Define error codes that consumers can handle programmatically without needing to parse error messages.

| Error Category | Code Range | Example |
|----------------|------------|---------|
| Validation | 4000-4099 | 4001: Invalid tenant ID |
| Authorization | 4100-4199 | 4101: Tenant not allowed |
| Business Rules | 4200-4299 | 4201: Quota exceeded |
| Internal | 5000-5099 | 5001: Service unavailable |

### 4. Implement Backward Compatibility

When evolving facades, maintain backward compatibility within the same major version. Use the adapter pattern to translate between old and new contract formats when necessary.

### 5. Document Breaking Changes

Maintain a facade changelog that clearly identifies breaking changes, deprecation timelines, and migration paths. Breaking changes require:
- 2-sprint minimum notice for internal modules
- 1-quarter minimum notice for external integrations
- Migration guide with code examples

## Decision Framework

| Scenario | Recommended Pattern | Rationale |
|----------|---------------------|-----------|
| High-frequency reads | Query Facade with caching | Reduces load on internal services |
| Cross-module transactions | Saga with Async Facade | Maintains module autonomy |
| Real-time updates | Event-based Async Facade | Decouples producer from consumers |
| Tenant admin operations | Command Facade with approval | Audit trail and authorization |
| Bulk operations | Batch Command Facade | Efficiency with tenant isolation |

## Related Workflows

- `bmad-bam-define-facade-contract` - Create new facade contracts
- `bmad-bam-evolve-facade-contract` - Modify existing contracts
- `bmad-bam-facade-mismatch-recovery` - Resolve contract conflicts
- `bmad-bam-validate-tool-contract` - Validate contract compliance

## Related Patterns

Load from pattern registry:

- **Facade patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `facade-*`
- **Integration patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `integration-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "modular monolith facade patterns {date}"
- Search: "API contract versioning strategies {date}"
- Search: "backward compatible API evolution {date}"
