# TEA Guide - BAM Extension

**When to load:** During Phase 5 (Quality) when automating tenant isolation tests or CI/CD pipelines, or when user mentions test automation, RLS verification, or tenant isolation gates.
**Integrates with:** TEA (bmad-tea), test architecture, tenant isolation testing

This guide provides BAM-specific context for TEA (Test Engineering Automation) specialists working on multi-tenant agentic AI platforms.

## Role Context

As a TEA specialist on a BAM project, you focus on:
- Building automated tenant isolation tests
- Creating reusable multi-tenant test fixtures
- Implementing test automation for tenant scenarios
- Ensuring consistent testing across tenant tiers

## Core Concepts

### Isolation Test Automation
Automated tests that verify tenant A cannot access tenant B data are the foundation of multi-tenant test strategy. These tests must run on every PR, cover all data access paths, and include both positive (can access own data) and negative (cannot access other tenant data) cases.

### Multi-Tenant Test Fixtures
Reusable test fixtures representing each tier archetype enable consistent, repeatable testing. Fixtures include tenant configurations, seeded data, and user contexts that can be programmatically created, customized, and cleaned up.

### CI/CD Tenant Isolation Gates
Pipeline gates ensure tenant isolation tests pass before deployment. Critical isolation tests run early and fast, with comprehensive tests running in parallel. No deployment proceeds if any isolation test fails.

## Application Guidelines

When building multi-tenant test automation:
1. Create test tenant factory methods for programmatic tenant creation/destruction
2. Build isolation assertion helpers that verify cross-tenant access fails
3. Design fixtures for each tier with realistic data volumes
4. Integrate isolation tests into CI/CD with clear failure reporting
5. Track and immediately fix flaky isolation tests - they may hide real failures

## Test Architecture Decision Framework

Use this framework to make decisions about test automation architecture in multi-tenant contexts:

### Test Type Selection Matrix

| Test Goal | Test Type | Tenant Consideration | Automation Priority |
|-----------|-----------|---------------------|---------------------|
| Verify tenant data isolation | Integration | Multi-tenant fixtures required | Critical |
| Verify RLS policies | Database | Direct DB access with tenant switching | Critical |
| Verify API tenant context | API/E2E | Auth token per tenant | High |
| Verify tier limits | Integration | Tier-specific fixtures | High |
| Verify cross-module isolation | E2E | Full system deployment | Medium |
| Performance by tenant | Load test | Isolated tenant environments | Medium |
| UI tenant context display | E2E/Visual | Screenshot comparison | Low |

### Test Infrastructure Decisions

| Decision | Option A | Option B | Recommendation |
|----------|----------|----------|----------------|
| Test database | Shared with isolation | Database per test run | Shared for speed, per-run for isolation |
| Tenant fixtures | Seeded once | Created per test | Per test for isolation, seeded for speed |
| Parallel execution | Shared tenant | Tenant per worker | Tenant per worker prevents interference |
| Test data cleanup | After each test | After test suite | After each for isolation |
| CI/CD tenant tests | All tests always | Risk-based selection | Risk-based for speed |

## Actionable Guidance

### Building Tenant Isolation Test Automation

1. **Create Test Tenant Factory** - Build utilities to create/destroy test tenants programmatically
2. **Implement Context Switching** - Enable tests to execute as different tenants
3. **Build Isolation Assertions** - Create helpers to verify cross-tenant access fails
4. **Add RLS Test Utilities** - Direct database testing for RLS policy verification
5. **Create Negative Test Suite** - Automated tests that attempt cross-tenant access
6. **Integrate with CI/CD** - Run isolation tests on every pull request
7. **Add Monitoring for Flakes** - Track and fix unstable isolation tests

### Creating Reusable Multi-Tenant Fixtures

1. **Design Fixture Schema** - Define structure for tenant test data
2. **Build Tier Variants** - Create fixtures for each tier (Free, Pro, Enterprise)
3. **Include Relationships** - Seed related data across modules
4. **Support Customization** - Allow tests to override fixture defaults
5. **Implement Lazy Loading** - Load fixture data only when needed
6. **Add Cleanup Hooks** - Ensure fixtures clean up after tests
7. **Version Fixtures** - Update fixtures when schema changes

### Implementing CI/CD Test Gates

1. **Define Gate Criteria** - Specify what must pass for deployment
2. **Prioritize Test Suites** - Fast critical tests first, slow tests in parallel
3. **Configure Tenant Test Stage** - Dedicated stage for tenant isolation tests
4. **Add Failure Reporting** - Clear reporting when tenant tests fail
5. **Implement Retry Logic** - Handle transient failures gracefully
6. **Set Up Notifications** - Alert on tenant test failures
7. **Create Bypass Policy** - Document when gates can be bypassed (emergencies only)

## Key Considerations

### Tenant Isolation Automation
- Automated cross-tenant access tests
- RLS policy verification in CI/CD
- Regression testing for isolation

### Test Fixture Automation
- Programmatic tenant context setup
- Data seeding for multi-tenant scenarios
- Cleanup automation between tests

### CI/CD Integration
- Tenant isolation gates in pipelines
- Parallel test execution per tenant
- Test reporting with tenant context

## SaaS-Specific Considerations

### Test Pyramid for Multi-Tenant

| Layer | Tenant Coverage | Execution Time | Run Frequency |
|-------|-----------------|----------------|---------------|
| Unit | Mock tenant context | < 10s total | Every commit |
| Integration | 2-3 tenant fixtures | < 5 min | Every PR |
| API | All tiers | < 15 min | Every PR |
| E2E | Critical paths per tier | < 30 min | Pre-deploy |
| Load | Production-like tenants | 1+ hour | Weekly |

### Automated RLS Verification

**Test Categories:**
1. **Policy Existence** - Verify RLS enabled on all tenant tables
2. **Policy Correctness** - Verify policies filter by correct tenant column
3. **Policy Coverage** - Verify all CRUD operations covered
4. **Bypass Prevention** - Verify no code paths bypass RLS

**Automation Approach:**
```
For each tenant-scoped table:
  1. Set session to Tenant A
  2. Insert test record for Tenant A
  3. Verify Tenant A can read record
  4. Set session to Tenant B
  5. Verify Tenant B cannot read record
  6. Set session to Tenant A
  7. Clean up test record
```

### Tier-Specific Test Automation

**Free Tier Tests:**
- Verify rate limits enforced
- Verify feature gates block access
- Verify upgrade prompts displayed
- Verify data limits enforced

**Pro Tier Tests:**
- Verify all Pro features accessible
- Verify soft limit warnings
- Verify overage tracking
- Verify downgrade handling

**Enterprise Tier Tests:**
- Verify custom limits respected
- Verify SSO flows work
- Verify dedicated resource allocation
- Verify compliance controls

### CI/CD Pipeline Design

**Recommended Pipeline Stages:**

| Stage | Duration | Tenant Tests Included |
|-------|----------|----------------------|
| Lint/Static | 1 min | None |
| Unit Tests | 2 min | Mocked tenant context |
| Build | 3 min | None |
| Integration | 5 min | Multi-tenant isolation |
| Deploy Staging | 2 min | None |
| E2E Staging | 15 min | Critical tenant paths |
| Security Scan | 5 min | Tenant boundary scan |
| Deploy Canary | 2 min | None |
| Smoke Test | 5 min | Tenant isolation verify |
| Full Rollout | 5 min | None |

### Test Data Management

**Tenant Test Data Strategy:**

| Environment | Tenant Data Source | Refresh Frequency |
|-------------|-------------------|-------------------|
| Local Dev | Seeded fixtures | On demand |
| CI/CD | Generated per run | Each run |
| Staging | Sanitized production clone | Weekly |
| Production | Real (read-only tests) | Never modified |

### Parallel Test Execution

**Tenant Isolation in Parallel Tests:**
- Assign unique tenant per test worker
- Use tenant ID in test identifiers
- Prevent shared state between workers
- Clean up worker tenants on completion

### Flaky Test Management

**Common Tenant Test Flakes:**
| Flake Pattern | Cause | Solution |
|--------------|-------|----------|
| Race condition | Shared tenant state | Isolate per test |
| Timing issue | Async tenant context | Add proper waits |
| Order dependency | Fixture not reset | Reset between tests |
| Resource conflict | Parallel access | Unique resources per test |

### Test Reporting

**Tenant-Aware Reporting:**
- Group test results by tenant tier
- Flag cross-tenant test failures as critical
- Track isolation test trends over time
- Report coverage per tenant scenario

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| New data access path added | Add isolation test before merge | Prevent regression at source |
| Test execution taking too long | Use risk-based selection in CI | Fast feedback on critical paths |
| Parallel tests interfering | Assign unique tenant per worker | Eliminate shared state issues |
| Flaky isolation test detected | Fix immediately, never skip | Flaky tests hide real failures |
| Schema migration pending | Update fixtures and revalidate | Migrations can break RLS policies |
| Performance testing needed | Use dedicated tenant environments | Avoid impacting real tenant data |

## Related Workflows

- `validate-foundation` - Validate foundation against QG-F1 quality gate
- `validate-module` - Validate module against QG-M1/M2/M3 quality gates
- `bmad-bam-ai-eval-safety-design` - Design AI evaluation and safety test automation

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Testing patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `test-*`
- **Tenant models:** `{project-root}/_bmad/bam/data/tenant-models.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant testing automation {date}"
- Search: "tenant isolation verification patterns {date}"
- Search: "SaaS E2E testing strategies {date}"
