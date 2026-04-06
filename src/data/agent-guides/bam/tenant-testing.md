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

### Noisy Neighbor Tests

Test that tenant A's load doesn't affect tenant B:
1. Load tenant A with high traffic
2. Measure tenant B response times
3. Verify SLAs maintained
4. Check resource isolation

---

## Application Guidelines

1. **One tenant per test suite** - Isolation guaranteed
2. **Fixture factories** - Consistent test data
3. **RLS verification** - Explicit cross-tenant tests
4. **Cleanup after tests** - No data leakage
5. **Noisy neighbor tests** - Verify resource isolation

---

## Integration with BAM Workflows

- TEA workflows with BAM extension
- `bmad-bam-validate-foundation` → Foundation tests
- `bmad-bam-convergence-verification` → Integration tests
