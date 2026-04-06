# Testing Tenant Isolation Patterns

## Principle

Every data access path must be tested with multi-tenant fixtures to verify that
tenant A cannot see, modify, or infer tenant B's data — across all storage layers.

## Rationale

RLS policies, cache key prefixes, memory scoping, and vector namespace isolation
are the primary defense against tenant data leakage. A single missed path creates
a cross-tenant vulnerability. Testing must cover all storage layers systematically.

## Isolation Test Matrix

| Storage Layer     | Isolation Mechanism          | Test Strategy                              | Failure Severity |
| ----------------- | ---------------------------- | ------------------------------------------ | ---------------- |
| PostgreSQL        | RLS policies                 | Cross-tenant query assertions              | CRITICAL         |
| Redis/Valkey      | Key prefix `tenant:{id}:`    | Key enumeration with wrong tenant          | CRITICAL         |
| Qdrant            | Namespace per tenant         | Cross-namespace query attempt              | CRITICAL         |
| Mem0              | Tenant-scoped memory         | Memory retrieval with wrong tenant context | CRITICAL         |
| Kafka             | Topic + tenant header        | Consumer with wrong tenant filter          | HIGH             |
| Background jobs   | TenantContext in job payload | Job execution with mismatched context      | HIGH             |
| File storage (S3) | Prefix `tenants/{id}/`       | Path traversal attempt                     | CRITICAL         |

## Test Fixture Requirements

Each isolation test requires at minimum:

- 2 tenants (tenant_A, tenant_B) with different tiers
- Seed data in both tenants for the target storage layer
- Test executes operation as tenant_A
- Assertion verifies tenant_B data is invisible/inaccessible

## RLS Testing Pattern

| Test Case              | Setup                       | Action                      | Expected Result                     |
| ---------------------- | --------------------------- | --------------------------- | ----------------------------------- |
| Direct query isolation | Data in both tenants        | Query as tenant_A           | Only tenant_A rows returned         |
| Join isolation         | Related data across tenants | Join query as tenant_A      | No tenant_B rows in join            |
| Aggregate isolation    | Counts/sums across tenants  | Aggregate as tenant_A       | Only tenant_A data in aggregate     |
| Admin bypass           | Superuser context           | Query without tenant filter | All rows visible (admin only)       |
| Missing RLS            | New table without policy    | Any query                   | Test framework flags missing policy |

## Cache Isolation Testing

| Test Case              | Setup                          | Action                         | Expected Result              |
| ---------------------- | ------------------------------ | ------------------------------ | ---------------------------- |
| Key prefix enforcement | Cache entries for both tenants | Get with tenant_A context      | Only tenant_A cache hits     |
| Key enumeration        | Cache entries for both tenants | SCAN/KEYS with tenant_A prefix | No tenant_B keys visible     |
| TTL isolation          | Different TTLs per tier        | Check expiry                   | Tier-appropriate TTL applied |

## Quality Gate Integration

These tests are required for:

- QG-M2 (Tenant Isolation Complete) — all storage layers tested
- QG-I2 (Tenant Safety Verification) — cross-module isolation verified

## Anti-Patterns

| Anti-Pattern                    | Problem                           | Correct Approach                       |
| ------------------------------- | --------------------------------- | -------------------------------------- |
| Testing with single tenant only | Isolation bugs invisible          | Always test with 2+ tenants            |
| Skipping join/aggregate tests   | Leakage through complex queries   | Test all query patterns                |
| No negative assertions          | Only verify correct data returned | Also verify wrong-tenant data absent   |
| Testing RLS in unit tests only  | Misses application-level bypass   | Integration tests with real PostgreSQL |

## Integration Points

- Section 9.2: Tenant Isolation Matrix
- Section 13.1: Quality Gates (QG-M2, QG-I2)
- Section 28.8: rls-best-practices

See also: rls-best-practices.md, multi-tenant-patterns.md, testing-multi-tenant-fixtures.md
