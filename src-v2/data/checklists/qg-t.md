# QG-T: Testing Foundation Gate

**Shortcode:** ZTF  
**Workflow:** bmad-bam-testing  
**Prerequisites:** QG-F1 (Foundation)

## Critical Checks (All Must Pass)

- [ ] **CRITICAL:** Test framework configured and operational
- [ ] **CRITICAL:** TenantContext mocking infrastructure in place
- [ ] **CRITICAL:** Test isolation between tenants verified
- [ ] **CRITICAL:** CI/CD pipeline executes all test suites

## Standard Checks

### Test Infrastructure
- [ ] Unit test framework configured
- [ ] Integration test database available
- [ ] E2E test environment provisioned
- [ ] Test data factories implemented

### Tenant Testing
- [ ] Multi-tenant test fixtures available
- [ ] Cross-tenant isolation tests defined
- [ ] RLS policy test patterns documented
- [ ] Tenant hierarchy test scenarios covered

### Coverage Tracking
- [ ] Code coverage thresholds defined
- [ ] Coverage reporting in CI/CD
- [ ] Uncovered critical paths identified
- [ ] Coverage trends monitored

### Test Quality
- [ ] Test naming conventions followed
- [ ] Test documentation standards met
- [ ] Flaky test detection enabled
- [ ] Test execution time monitored

## Recovery Protocol

| Attempt | Action |
|---------|--------|
| 1 | Fix failing tests, improve coverage |
| 2 | Review test architecture, refactor problematic tests |
| 3 | MANDATORY: Test strategy review with tech lead |

## Outcome

| Result | Criteria |
|--------|----------|
| PASS | All critical + 80% standard checks |
| CONDITIONAL | All critical, <80% standard + test improvement plan |
| FAIL | Any critical check fails |

## Web Research Queries

- Search: "multi-tenant testing patterns {date}"
- Search: "TenantContext unit testing best practices {date}"
- Search: "RLS policy testing strategies {date}"
