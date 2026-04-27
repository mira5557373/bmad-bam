# BAM Testing Multi-Tenant Fixtures Guide

**When to load:** During test infrastructure design, tenant test data setup, fixture strategy planning, or when implementing test fixtures for multi-tenant SaaS platforms.

**Integrates with:** James (Dev), TEA (Test Engineering Agent), tea-bam extension.

---

## Core Concepts

### Test Tenant Categories

| Category | Purpose | Persistence |
|----------|---------|-------------|
| Ephemeral | Single test run | Deleted after test |
| Shared Dev | Development environment | Persistent |
| CI/CD | Automated testing | Reset per pipeline |
| Staging | Pre-production validation | Semi-persistent |
| Sandbox | Manual testing | User-managed |

### Fixture Hierarchy

```
┌─────────────────────────────────────────────────┐
│            Test Fixture Hierarchy                │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │         Tenant Fixture                    │   │
│  │  - Tenant ID, name, tier                  │   │
│  │  - Configuration, feature flags           │   │
│  └────────────────────┬─────────────────────┘   │
│                       │                          │
│  ┌────────────────────▼─────────────────────┐   │
│  │         User Fixtures                     │   │
│  │  - Admin, member, guest users             │   │
│  │  - Roles and permissions                  │   │
│  └────────────────────┬─────────────────────┘   │
│                       │                          │
│  ┌────────────────────▼─────────────────────┐   │
│  │         Data Fixtures                     │   │
│  │  - Domain objects                         │   │
│  │  - Relationships                          │   │
│  └────────────────────┬─────────────────────┘   │
│                       │                          │
│  ┌────────────────────▼─────────────────────┐   │
│  │         State Fixtures                    │   │
│  │  - Workflow states                        │   │
│  │  - Historical events                      │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

### Fixture Strategies

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Factory | Generate fixtures programmatically | Unit tests |
| Seed Data | Pre-loaded reference data | Integration tests |
| Snapshot | Copy of production (anonymized) | Realistic testing |
| Synthetic | AI-generated realistic data | Load testing |

### Multi-Tenant Test Scenarios

| Scenario | Description | Fixtures Needed |
|----------|-------------|-----------------|
| Tenant Isolation | Verify data doesn't leak | 2+ tenant fixtures |
| Tier Differentiation | Test tier-specific features | Fixtures per tier |
| Cross-Tenant Admin | Platform admin operations | Admin + multiple tenants |
| Tenant Lifecycle | Onboarding/offboarding | Tenant in various states |
| Noisy Neighbor | Resource contention | High-usage tenant fixture |

### Fixture Data Requirements

| Data Type | Anonymization | Generation Method |
|-----------|---------------|-------------------|
| User PII | Required | Faker libraries |
| Business Data | Recommended | Domain-aware generation |
| Configurations | Not needed | Copy from templates |
| Audit Logs | Required | Synthetic generation |
| Files/Media | Recommended | Sample files |

### Test Database Strategies

| Strategy | Isolation | Speed | Realism |
|----------|-----------|-------|---------|
| Separate Schema | High | Medium | High |
| Transaction Rollback | High | Fast | Medium |
| Container per Test | Highest | Slow | Highest |
| Shared with RLS | Medium | Fast | Highest |

---

## Application Guidelines

When implementing test fixtures in a multi-tenant context:

1. **Create fixtures for each tier** - Test tier-specific behavior
2. **Include multi-tenant scenarios** - Always test isolation
3. **Use factories for flexibility** - Avoid brittle seed data
4. **Anonymize production snapshots** - Never use real PII in tests
5. **Reset state between tests** - Ensure test independence
6. **Version fixtures with code** - Fixtures evolve with schema

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Persistent or ephemeral fixtures? | Ephemeral for unit, persistent for integration | Test isolation vs setup cost |
| How to handle fixture dependencies? | Factory with builder pattern | Flexible composition |
| Production data for testing? | Yes, but fully anonymized | Realistic scenarios |
| Fixture maintenance ownership? | Module team owns module fixtures | Distributed responsibility |
| CI/CD fixture strategy? | Container-based, reset per pipeline | Clean state guarantee |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Testing patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `testing-*`
- **Fixture patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `fixture-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant test fixtures patterns {date}"
- Search: "test data management SaaS {date}"
- Search: "database testing isolation strategies {date}"

---

## Related Workflows

- `bmad-bam-chaos-engineering-design` - Design test infrastructure
- `bmad-bam-convergence-verification` - Verify tenant isolation
- `bmad-bam-tenant-model-isolation` - Configure tenant isolation
