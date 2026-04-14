# Testing Tenant Isolation Patterns

**When to load:** When designing isolation tests, security testing, or when user mentions tenant separation testing, cross-tenant tests, or isolation verification.

**Integrates with:** Architect (Atlas persona), QA agent, Security architect

---

## Core Concepts

### What is Testing Isolation?

Testing isolation ensures that tenant data and operations are properly separated. This includes verifying that no cross-tenant data access is possible and that isolation mechanisms work correctly under various conditions.

### Test Type Comparison

| Type | Scope | Purpose | When to Run |
|------|-------|---------|-------------|
| Unit | Component | Verify isolation logic | Development |
| Integration | System | Cross-tenant attempts | CI/CD |
| Chaos | Production-like | Failure modes | Staging |
| Penetration | Security | Attack simulation | Quarterly |

---

## Key Patterns

### Pattern 1: Cross-Tenant Access Tests

Verify tenant cannot access another tenant's data.

| Test Case | Description | Expected Result |
|-----------|-------------|-----------------|
| Direct query | Query with wrong tenant | Empty result or error |
| ID enumeration | Try sequential IDs | Only own tenant's data |
| API parameter | Tamper tenant_id | Rejected or own data |
| Session tampering | Modify session tenant | Invalidated |

### Cross-Tenant Test Flow

```
Test Setup
    │
    ├── Create Tenant A with data
    ├── Create Tenant B with data
    │
    └── Test Cases
         │
         ├── As Tenant A, query Tenant B data
         │   └── Expected: Empty/Forbidden
         │
         ├── As Tenant A, enumerate IDs
         │   └── Expected: Only A's records
         │
         └── As Tenant A, tamper tenant_id
             └── Expected: Rejected
```

### Pattern 2: RLS Policy Testing

Verify Row-Level Security works correctly.

| Test Scenario | Setup | Assertion |
|---------------|-------|-----------|
| Policy active | Create data | Only tenant's rows visible |
| Policy bypass | Direct query | RLS still enforces |
| Superuser | Admin access | Explicit allowlist only |
| No tenant set | Missing context | Query fails or empty |

### RLS Test Matrix

```
┌─────────────────────────────────────────┐
│         RLS Test Matrix                  │
│                                          │
│  Scenario           │ Expected          │
│  ───────────────────┼───────────────────│
│  Normal query       │ Filtered to tenant │
│  Join across tenant │ No cross data     │
│  Function call      │ Respects RLS      │
│  View access        │ Inherits policy   │
│  Direct table       │ Policy enforced   │
└─────────────────────────────────────────┘
```

### Pattern 3: Chaos Testing for Isolation

Test isolation under failure conditions.

| Chaos Scenario | Purpose | Verification |
|----------------|---------|--------------|
| Connection pool exhaust | Resource pressure | Isolation maintained |
| Cache failure | Fallback behavior | No cross-tenant cache |
| Network partition | Split brain | Tenant context preserved |
| High load | Stress testing | Isolation under load |

### Chaos Test Categories

```
Chaos Test Suite
       │
       ├── Resource Exhaustion
       │   ├── Connection pool full
       │   ├── Memory pressure
       │   └── CPU saturation
       │
       ├── Infrastructure Failures
       │   ├── Database failover
       │   ├── Cache unavailable
       │   └── Message queue delay
       │
       └── Concurrent Access
           ├── Parallel tenant requests
           ├── Race conditions
           └── Deadlock scenarios
```

### Pattern 4: Penetration Testing

Security-focused isolation testing.

| Test Category | Attack Vector | Verification |
|---------------|---------------|--------------|
| Authentication | Token manipulation | Tenant binding |
| Authorization | Privilege escalation | Tenant scope |
| Injection | SQL/NoSQL injection | RLS enforced |
| API | Parameter tampering | Tenant validation |

---

## Application Guidelines

When implementing isolation tests:

1. **Test all boundaries** - API, DB, cache, queues
2. **Use real tenant context** - Not mocked isolation
3. **Automate in CI/CD** - Run on every change
4. **Include negative tests** - Verify rejection works
5. **Document failures** - Clear failure messages

---

## Test Data Strategy

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Isolated fixtures | Per-tenant test data | Unit tests |
| Seeded tenants | Pre-created test tenants | Integration |
| Production clone | Anonymized prod data | Realistic testing |
| Generated data | Fake but representative | Load testing |

---

## Test Environment Configuration

| Environment | Isolation | Data | Purpose |
|-------------|-----------|------|---------|
| Development | Full | Fixtures | Dev testing |
| CI/CD | Full | Seeded | Automated tests |
| Staging | Full | Clone | Pre-production |
| Production | Full | Real | Monitoring only |

---

## Automated Test Categories

| Category | Frequency | Owner |
|----------|-----------|-------|
| Unit (isolation) | Every commit | Developer |
| Integration (cross-tenant) | Every PR | QA |
| Chaos (failure modes) | Weekly | SRE |
| Penetration (security) | Quarterly | Security |

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Mock isolation | Doesn't test real behavior | Test actual RLS |
| Shared test data | Tests interfere | Isolated fixtures |
| Happy path only | Misses edge cases | Include negative tests |
| No CI integration | Regressions slip through | Automate all tests |
| Ignored failures | False sense of security | Fix or acknowledge |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| How often to run isolation tests? | On every PR at minimum | Catch regressions early |
| Real database or mocked? | Real for isolation tests | Mocks don't test RLS |
| Penetration testing frequency? | Quarterly or on major changes | Balance cost vs risk |
| Chaos testing in production? | Staging first, then careful prod | Controlled risk |

---

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Define isolation requirements
- `bmad-bam-convergence-verification` - Verify isolation in integration
- `bmad-bam-security-review` - Security testing scope

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Testing isolation:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `testing-isolation`
- **Tenant isolation:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **Testing agent safety:** `{project-root}/_bmad/bam/data/agent-guides/bam/testing-agent-safety.md`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant testing patterns {date}"
- Search: "tenant isolation testing {date}"
- Search: "chaos engineering multi-tenant {date}"
