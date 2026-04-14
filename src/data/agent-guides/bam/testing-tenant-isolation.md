# Testing Tenant Isolation

**When to load:** When designing isolation tests, implementing security testing, or when user mentions cross-tenant testing, isolation verification, or penetration testing.

**Integrates with:** TEA agent, Security agent, Dev agent

---

## Core Concepts

### What is Tenant Isolation Testing?

Tenant isolation testing verifies that tenant boundaries are enforced correctly, preventing data leakage, unauthorized access, and cross-tenant interference. It's critical for security, compliance, and customer trust.

### Testing Categories

| Category | Focus | Frequency |
|----------|-------|-----------|
| Unit tests | Code-level isolation | Every commit |
| Integration tests | System-level isolation | Every deploy |
| Security tests | Attack simulation | Weekly/release |
| Chaos tests | Failure scenarios | Monthly |

---

## Key Patterns

### Pattern 1: Cross-Tenant Access Tests

| Test Case | Method | Expected Result |
|-----------|--------|-----------------|
| Direct query | Query with wrong tenant_id | Empty/error |
| API access | Request other tenant's resource | 403 Forbidden |
| Enumeration | Guess tenant IDs | No information leak |
| Join leakage | Cross-table join | RLS enforced |

### Pattern 2: Context Isolation Tests

| Test Case | Method | Expected Result |
|-----------|--------|-----------------|
| Missing context | Request without tenant_id | Rejected |
| Context switch | Change tenant mid-request | Rejected |
| Context inheritance | Async job tenant | Same as original |
| Connection reuse | Pool connection reuse | Context reset |

### Pattern 3: Data Boundary Tests

| Test Case | Method | Expected Result |
|-----------|--------|-----------------|
| Search isolation | Search returns other data | Only tenant data |
| Cache isolation | Cache key collision | Tenant-prefixed keys |
| File isolation | Access other's files | Access denied |
| Memory isolation | AI memory cross-tenant | Isolated per tenant |

---

## Application Guidelines

- Before production deployment
- After security-related changes
- During compliance audits
- When adding new data access patterns
- Periodically as regression tests

---

## Test Environment Setup

| Component | Test Tenant A | Test Tenant B |
|-----------|---------------|---------------|
| Database | Seeded data | Seeded data |
| Users | `user_a@test` | `user_b@test` |
| Tier | Pro | Enterprise |
| Data | Known dataset | Known dataset |

---

## Isolation Verification Checklist

- [ ] Tenant A cannot query Tenant B data
- [ ] API returns 403 for cross-tenant requests
- [ ] Search results only include tenant data
- [ ] Cache keys are tenant-prefixed
- [ ] Async jobs maintain tenant context
- [ ] AI agent memories are isolated
- [ ] Error messages don't leak tenant info
- [ ] Audit logs separate by tenant

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|---------------|-----------|
| When to run full isolation test suite? | Before every production deployment and after security-related changes | Isolation failures can cause severe compliance violations and customer trust issues |
| How frequently for penetration testing? | Weekly automated scans, quarterly manual pen tests | Automated catches regressions; manual testing finds complex attack vectors |
| Should test tenants share data patterns? | No, use distinct datasets with known boundaries | Distinct data makes cross-tenant leakage immediately detectable in test results |
| When to implement chaos testing? | After passing basic isolation tests, monthly thereafter | Chaos testing validates isolation under failure conditions but requires baseline stability |
| How to handle test environment isolation? | Dedicated test database with production-like RLS/schema policies | Test environment must mirror production isolation mechanisms to provide valid results |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Testing patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `testing-isolation`, `tenant-isolation`
- **Related guides:** `rls-best-practices`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant isolation testing {date}"
- Search: "cross-tenant security testing {date}"
- Search: "tenant boundary penetration testing {date}"

---

## Related Workflows

- `bmad-bam-convergence-verification` - Verify tenant isolation in production-like environment
- `bmad-bam-tenant-model-isolation` - Design isolation model being tested
- `bmad-bam-security-review` - Security audit including isolation testing
