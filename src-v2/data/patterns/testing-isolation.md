---
pattern_id: testing-isolation
shortcode: ZTIS
category: testing
qg_ref: QG-TC4
version: 1.0.0
last_reviewed: 2026-05-01
---

# Testing Isolation - BAM Pattern

**Loaded by:** ZTIS  
**Applies to:** Multi-tenant systems requiring tenant boundary verification

---

## When to Use

- Verifying tenant data cannot leak across boundaries
- Testing RLS policies actually work
- Validating API authorization per tenant
- Ensuring cache isolation between tenants
- Pre-production tenant isolation verification
- Compliance audits requiring isolation proof

## When NOT to Use

- Single-tenant applications
- Unit tests (use mocks instead)
- Performance testing (use dedicated pattern)
- Chaos testing (see tenant-chaos-injector.md)

## Architecture

### Isolation Test Categories

```
┌─────────────────────────────────────────────────────────────────┐
│                    Isolation Test Pyramid                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                        ┌─────────┐                              │
│                        │ E2E     │  Cross-tenant API tests      │
│                        │ Tests   │  (slowest, most realistic)   │
│                       ┌┴─────────┴┐                             │
│                       │Integration│  RLS policy tests           │
│                       │  Tests    │  Cache isolation tests      │
│                      ┌┴───────────┴┐                            │
│                      │   Unit      │  TenantContext mocking     │
│                      │   Tests     │  (fastest, most isolated)  │
│                      └─────────────┘                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Test Tenant Setup

```yaml
test_isolation:
  tenant_id: uuid
  bam_controlled: true
  
  test_tenants:
    - id: "test-tenant-alpha"
      purpose: "Primary test tenant"
      data_seed: "standard"
      
    - id: "test-tenant-beta"
      purpose: "Cross-tenant verification"
      data_seed: "minimal"
      
    - id: "test-tenant-gamma"
      purpose: "Edge case testing"
      data_seed: "edge_cases"
      
  isolation_tests:
    database:
      rls_verification: true
      cross_schema_access: true
      connection_pool_isolation: true
      
    api:
      auth_boundary_tests: true
      tenant_header_validation: true
      cross_tenant_resource_access: true
      
    cache:
      key_isolation: true
      invalidation_scope: true
      
    storage:
      bucket_isolation: true
      path_traversal_prevention: true
```

### Cross-Tenant Access Test Pattern

```
Test: Tenant A cannot access Tenant B's data

┌──────────────────────────────────────────────────────────────┐
│  Setup                                                        │
│  ├── Create Tenant A with data record ID=100                 │
│  └── Create Tenant B with data record ID=200                 │
├──────────────────────────────────────────────────────────────┤
│  Test Steps                                                   │
│  1. Authenticate as Tenant A                                  │
│  2. Attempt to fetch record ID=200 (Tenant B's data)         │
│  3. Assert: 404 Not Found OR 403 Forbidden                   │
│  4. Assert: No data leakage in error message                 │
├──────────────────────────────────────────────────────────────┤
│  Verify                                                       │
│  ├── RLS policy blocked access at DB level                   │
│  ├── API layer returned safe error                           │
│  └── Audit log recorded attempted cross-tenant access        │
└──────────────────────────────────────────────────────────────┘
```

### RLS Policy Test Suite

```
RLS Tests:
│
├── Direct Query Tests
│   ├── SELECT without tenant context → Should fail
│   ├── SELECT with wrong tenant_id → Should return empty
│   └── SELECT with correct tenant_id → Should return data
│
├── Join Leak Tests
│   ├── JOIN across tenant boundaries → Should fail
│   └── Subquery with different tenant → Should return empty
│
├── Write Tests
│   ├── INSERT with wrong tenant_id → Should fail
│   ├── UPDATE across tenant boundary → Should affect 0 rows
│   └── DELETE across tenant boundary → Should affect 0 rows
│
└── Bypass Attempt Tests
    ├── SQL injection tenant_id manipulation → Should fail
    ├── Direct table access (no RLS) → Should not exist
    └── Superuser context leak → Should be prevented
```

### API Boundary Tests

| Test Case | Method | Expected Result |
|-----------|--------|-----------------|
| Missing X-Tenant-ID header | GET /api/resource | 401 Unauthorized |
| Invalid tenant ID format | GET /api/resource | 400 Bad Request |
| Non-existent tenant | GET /api/resource | 403 Forbidden |
| Cross-tenant resource | GET /api/resource/123 | 404 Not Found |
| Tenant ID mismatch in body | POST /api/resource | 403 Forbidden |

### Cache Isolation Tests

```
Test: Cache keys are tenant-scoped

Setup:
  Tenant A caches: key="user:1" value="Alice"
  Tenant B caches: key="user:1" value="Bob"

Verification:
  ├── Tenant A reads key="user:1" → Returns "Alice"
  ├── Tenant B reads key="user:1" → Returns "Bob"
  ├── Keys are actually: "tenant_a:user:1", "tenant_b:user:1"
  └── No key collision possible
```

### CI/CD Integration

```yaml
isolation_test_pipeline:
  stages:
    - name: unit_isolation
      run: "npm run test:isolation:unit"
      required: true
      
    - name: integration_isolation
      run: "npm run test:isolation:integration"
      required: true
      needs_database: true
      
    - name: e2e_isolation
      run: "npm run test:isolation:e2e"
      required: true
      needs_full_stack: true
      
  gates:
    - all_isolation_tests_pass
    - no_cross_tenant_access_detected
    - rls_coverage_100_percent
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Unit mocks | Fast, isolated | May miss real issues | Development |
| Integration tests | Realistic DB tests | Slower, needs setup | Pre-commit |
| E2E multi-tenant | Full verification | Slowest, complex | Pre-release |
| Continuous verification | Always running | Resource overhead | Production |

## Quality Checks

- [ ] Test tenants created and seeded
- [ ] RLS policy tests cover all tables
- [ ] API boundary tests for all endpoints
- [ ] Cache isolation verified
- [ ] CI/CD pipeline includes isolation tests
- [ ] **CRITICAL:** 100% RLS coverage verified

## Web Research Queries

- "multi-tenant isolation testing patterns {date}"
- "RLS policy testing PostgreSQL {date}"
- "cross-tenant security testing {date}"
- "tenant isolation verification automation {date}"
- "API boundary testing multi-tenant {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-TC4 | Testing isolation pattern implementation verified |

## Related Patterns

- [tenant-isolation.md](tenant-isolation.md) - Isolation models
- [tenant-chaos-injector.md](tenant-chaos-injector.md) - Chaos testing
- [disaster-recovery.md](disaster-recovery.md) - DR patterns
