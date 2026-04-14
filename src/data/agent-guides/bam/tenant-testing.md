# BAM Tenant Testing Context

**When to load:** During QA phase for tenant isolation testing, fixture design, or integration testing.

**Integrates with:** TEA (Test Architect), QA agents

---

## Core Concepts for Tenant Testing

### Test Isolation Requirements

| Test Type | Tenant Isolation | Data Fixture |
|-----------|------------------|--------------|
| Unit tests | Mocked context | In-memory |
| Integration | Real RLS | Per-test tenant |
| Contract | Real facades | Seeded tenant |
| E2E | Full stack | Dedicated tenant |

### Tenant Test Fixtures

```typescript
// Fixture factory with tenant context
const tenantFixture = await createTenantFixture({
  tier: 'pro',
  users: 3,
  workspaces: 2,
  seedData: true
});

// Tests run in isolated tenant
await withTenant(tenantFixture, async (ctx) => {
  // All operations scoped to test tenant
  await testUserCannotSeeOtherTenantData(ctx);
});

// Cleanup automatic after test
```

### Noisy Neighbor Test Patterns

Test that tenant A's load doesn't affect tenant B:

#### Basic Noisy Neighbor Test

1. Load tenant A with high traffic
2. Measure tenant B response times
3. Verify SLAs maintained
4. Check resource isolation

#### Comprehensive Noisy Neighbor Scenarios

| Scenario | Tenant A Load | Tenant B Metric | Pass Criteria |
|----------|---------------|-----------------|---------------|
| CPU spike | 100% CPU agent runs | Response latency | P99 < 200ms |
| Memory pressure | Large context windows | Memory availability | No OOM errors |
| Database contention | Bulk writes | Query latency | P99 < 50ms |
| Network saturation | Large file uploads | API throughput | > 90% baseline |
| Cache thrashing | Frequent cache misses | Cache hit rate | > 80% |

#### Resource Isolation Verification

Test each isolation dimension:
- Database: Verify RLS policies under load
- Cache: Confirm key prefix isolation
- Queue: Check message routing isolation
- Storage: Validate path prefix enforcement

### Performance Testing Multi-Tenant Scenarios

#### Tier-Specific Load Testing

| Tier | Concurrent Users | Agent Runs/min | Expected P99 |
|------|------------------|----------------|--------------|
| FREE | 10 | 5 | < 500ms |
| PRO | 100 | 50 | < 300ms |
| ENTERPRISE | 1000 | 500 | < 200ms |

#### Load Test Scenarios

1. **Baseline**: Single tenant, normal load
2. **Scale**: Single tenant, 10x normal load
3. **Multi-tenant**: 10 tenants, normal load each
4. **Stress**: 10 tenants, 10x normal load each
5. **Spike**: Sudden 100x traffic burst

#### Performance Metrics to Track

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| API Latency (P50) | < 50ms | > 100ms |
| API Latency (P99) | < 200ms | > 500ms |
| Agent Run Duration (P50) | < 5s | > 10s |
| Error Rate | < 0.1% | > 1% |
| Throughput | > baseline | < 80% baseline |

### Chaos Engineering for Tenant Isolation

#### Fault Injection Scenarios

| Fault | Target | Expected Behavior |
|-------|--------|-------------------|
| Database connection failure | Single tenant DB | Other tenants unaffected |
| Cache node failure | Redis cluster | Graceful degradation |
| Service crash | Module instance | Auto-restart, no data loss |
| Network partition | Between modules | Circuit breaker activation |
| Storage unavailable | Tenant S3 prefix | Queued uploads, retry |

#### Chaos Test Checklist

- [ ] Kill random service instance during peak load
- [ ] Simulate database failover
- [ ] Inject network latency between services
- [ ] Corrupt tenant cache entries
- [ ] Simulate cloud provider outage (region)
- [ ] Test with degraded AI model availability

### Security Penetration Testing Patterns

#### Cross-Tenant Access Tests

| Test | Method | Expected Result |
|------|--------|-----------------|
| Direct ID manipulation | Change tenant_id in request | 403 Forbidden |
| Session hijacking | Use tenant A session for B | 401 Unauthorized |
| SQL injection | Inject into tenant context | Query rejected |
| Path traversal | Access other tenant files | 404 Not Found |
| JWT tampering | Modify tenant claim | Token invalid |

#### Authentication Bypass Tests

- Test token expiration enforcement
- Verify refresh token rotation
- Check session invalidation on password change
- Test MFA bypass attempts
- Verify IdP assertion validation

#### Authorization Boundary Tests

- Test role escalation attempts
- Verify admin bypass audit logging
- Check cross-workspace access controls
- Test feature flag bypass attempts

### Load Testing Per Tier

#### FREE Tier Load Profile

```
Users: 10 concurrent
Duration: 30 minutes
Ramp: 2 minutes
Actions:
  - List items: 50%
  - Create item: 30%
  - Agent run: 20%
Rate limit: 10 req/min
```

#### PRO Tier Load Profile

```
Users: 100 concurrent
Duration: 60 minutes
Ramp: 5 minutes
Actions:
  - List items: 40%
  - Create item: 25%
  - Agent run: 30%
  - Bulk export: 5%
Rate limit: 100 req/min
```

#### ENTERPRISE Tier Load Profile

```
Users: 1000 concurrent
Duration: 120 minutes
Ramp: 10 minutes
Actions:
  - List items: 30%
  - Create item: 20%
  - Agent run: 40%
  - Bulk operations: 10%
Rate limit: 1000 req/min (burst: 2000)
```

---

## Application Guidelines

1. **One tenant per test suite** - Isolation guaranteed
2. **Fixture factories** - Consistent test data
3. **RLS verification** - Explicit cross-tenant tests
4. **Cleanup after tests** - No data leakage
5. **Noisy neighbor tests** - Verify resource isolation

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Testing patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `test-*`
- **Tenant models:** `{project-root}/_bmad/bam/data/tenant-models.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant testing isolation verification {date}"
- Search: "SaaS tenant boundary testing {date}"
- Search: "RLS security testing patterns {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|---------------|-----------|
| When to use real RLS vs mocked tenant context? | Real RLS for integration and E2E tests; mock only for unit tests | RLS behavior must be verified with actual policies; unit tests should be fast and isolated |
| How many concurrent tenants in load tests? | Start with 10 tenants at normal load; scale to 100+ for stress tests | Simulates realistic multi-tenant contention; reveals noisy neighbor issues at scale |
| When to run chaos engineering tests? | Every release for critical paths; weekly for full suite | Critical path validation prevents production incidents; regular full suite catches edge cases |
| What penetration test frequency is needed? | Cross-tenant tests with every security-relevant change; full pentest quarterly | Continuous validation of isolation; periodic comprehensive assessment |
| How to prioritize noisy neighbor scenarios? | CPU and database contention first; then cache and network saturation | Most common production issues involve compute and database resources |

---

## Integration with BAM Workflows

- TEA workflows with BAM extension
- `bmad-bam-validate-foundation` → Foundation tests
- `bmad-bam-convergence-verification` → Integration tests

## Related Workflows

- `bmad-bam-chaos-engineering-design` - Design multi-tenant integration tests
- `bmad-bam-performance-baseline` - Configure tier-specific load testing
- `bmad-bam-security-review` - Plan penetration testing for isolation
- `bmad-bam-tenant-model-isolation` - Define isolation to test
- `bmad-bam-validate-foundation` - Validate testing coverage requirements
