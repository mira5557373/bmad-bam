# Testing Multi-Tenant Fixtures

## Principle

Test fixtures for multi-tenant systems must create realistic tenant contexts
across all tiers (FREE/PRO/ENTERPRISE) with deterministic seed data that
exercises tier-specific behavior and isolation boundaries.

## Rationale

Multi-tenant bugs often manifest only under specific tier configurations or
when multiple tenants interact with shared resources. Fixtures must cover
tier differences, quota limits, and concurrent tenant operations.

## Standard Fixture Set

| Fixture             | Tenant                 | Tier            | Purpose                       |
| ------------------- | ---------------------- | --------------- | ----------------------------- |
| `tenant_free`       | Test Tenant Free       | FREE            | Baseline, lowest quotas       |
| `tenant_pro`        | Test Tenant Pro        | PRO             | Mid-tier, most common path    |
| `tenant_enterprise` | Test Tenant Enterprise | ENTERPRISE      | Full features, highest quotas |
| `tenant_suspended`  | Test Tenant Suspended  | PRO (suspended) | Lifecycle edge case           |
| `tenant_migrating`  | Test Tenant Migrating  | PRO→ENTERPRISE  | Tier change in progress       |

## Fixture Data Requirements

| Data Category   | Per Tenant                         | Purpose                     |
| --------------- | ---------------------------------- | --------------------------- |
| Users           | 3 (admin, member, viewer)          | Role-based access testing   |
| Domain entities | 10-50 per module                   | Query and isolation testing |
| Agent runs      | 5 (various states)                 | Runtime behavior testing    |
| Memory entries  | 20 (session + user + tenant scope) | Memory isolation testing    |
| Audit logs      | 50                                 | Audit trail verification    |

## Tier-Specific Fixture Configuration

| Config           | FREE            | PRO                 | ENTERPRISE       |
| ---------------- | --------------- | ------------------- | ---------------- |
| Token budget     | 10,000/month    | 100,000/month       | 1,000,000/month  |
| Max agents       | 1               | 5                   | Unlimited        |
| Memory retention | 7 days          | 30 days             | 90 days          |
| Tool access      | Basic (5 tools) | Standard (15 tools) | Full (all tools) |
| Rate limit       | 10 req/min      | 100 req/min         | 1000 req/min     |

## Fixture Lifecycle

| Phase     | Action                           | Scope                         |
| --------- | -------------------------------- | ----------------------------- |
| Setup     | Create tenants + seed data       | Per test suite (not per test) |
| Isolation | Each test gets fresh transaction | Per test (rollback after)     |
| Teardown  | Drop test tenants                | Per test suite                |

## Concurrent Tenant Testing

| Test Pattern        | Setup                                      | Assertion                       |
| ------------------- | ------------------------------------------ | ------------------------------- |
| Noisy neighbor      | tenant_free + tenant_enterprise concurrent | Enterprise not degraded by free |
| Rate limit fairness | All 3 tiers concurrent                     | Each tier gets its own limit    |
| Resource contention | Shared cache/queue operations              | No cross-tenant interference    |

## Anti-Patterns

| Anti-Pattern                       | Problem                          | Correct Approach                   |
| ---------------------------------- | -------------------------------- | ---------------------------------- |
| Single-tier fixtures               | Misses tier-specific bugs        | Always include FREE/PRO/ENTERPRISE |
| Shared mutable state between tests | Flaky tests, order-dependent     | Transaction rollback per test      |
| Hardcoded tenant IDs               | Collisions in parallel test runs | UUID-generated per suite           |
| No suspended/migrating tenant      | Misses lifecycle edge cases      | Include edge-case tenants          |

## Integration Points

- Section 25.7: Testing Strategy Per Complexity Tier
- Section 28.11: multi-tenant-patterns (tenant lifecycle)
- Section 28.16: local-development-setup (seed data patterns)

See also: testing-tenant-isolation.md, testing-agent-safety.md, multi-tenant-patterns.md, local-development-setup.md
