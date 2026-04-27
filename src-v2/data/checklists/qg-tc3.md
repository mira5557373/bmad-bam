---
name: qg-tc3-e2e-test-coverage
description: E2E test coverage gate - cross-tenant boundary tests, full flow verification, tenant switching scenarios
category: quality-gate
tags: [testing, quality-gate, multi-tenant, tea, e2e-test, cross-tenant, coverage]
version: 2.0.0
owner: TEA
---

# QG-TC3: Cross-Tenant Test Coverage Gate

> **Gate ID:** QG-TC3 (Cross-Tenant Test Coverage)
> **Workflow:** tea-trace (extended with cross-tenant boundary checks)
> **Prerequisites:** QG-TC2 (Integration Test Coverage)
> **Sequence:** QG-TC2 -> QG-TC3 -> production-readiness

All data access paths MUST have cross-tenant blocking tests. This gate verifies that every data access path has end-to-end tests proving cross-tenant access is blocked, including full user flows, API boundary tests, and tenant switching scenarios.

---

## Purpose

QG-TC3 validates that cross-tenant boundaries are enforced across all data access paths:

1. **Full user flows** respect tenant boundaries from UI to database
2. **API boundary tests** verify 403/404 responses for cross-tenant attempts
3. **Tenant switching scenarios** ensure clean context transitions
4. **All data access paths** (API, cache, queue, storage, background jobs) have blocking tests

---

## TEA Handoff Protocol

BAM `convergence-verification` workflow validates integration. TEA validates that all data access paths have cross-tenant blocking tests before production deployment.

---

## API Endpoint Coverage

- [ ] **CRITICAL:** All tenant-scoped GET endpoints have cross-tenant blocking tests
- [ ] **CRITICAL:** All tenant-scoped POST endpoints have cross-tenant blocking tests
- [ ] **CRITICAL:** All tenant-scoped PUT/PATCH endpoints have cross-tenant blocking tests
- [ ] **CRITICAL:** All tenant-scoped DELETE endpoints have cross-tenant blocking tests
- [ ] API endpoints return 403/404 for cross-tenant access attempts
- [ ] API endpoint inventory matches cross-tenant test inventory

---

## Database Access Path Coverage

- [ ] **CRITICAL:** All repository methods have cross-tenant blocking tests
- [ ] **CRITICAL:** Direct SQL queries include tenant filter verification
- [ ] **CRITICAL:** ORM queries include tenant scope verification
- [ ] **CRITICAL:** Stored procedures include tenant context verification
- [ ] Database connection tenant context verified before query execution

---

## Cache Access Path Coverage

- [ ] **CRITICAL:** Cache reads scoped to tenant key prefix
- [ ] **CRITICAL:** Cache writes include tenant key prefix
- [ ] **CRITICAL:** Cross-tenant cache access blocked
- [ ] Cache invalidation scoped to tenant
- [ ] Cache key collision tests for different tenants

---

## Vector Store Access Coverage

- [ ] **CRITICAL:** Vector queries filtered by tenant
- [ ] **CRITICAL:** Cross-tenant vector retrieval blocked
- [ ] Vector store collection isolation verified
- [ ] Embedding storage tenant-scoped
- [ ] Similarity search tenant-isolated

---

## Message Queue Coverage

- [ ] **CRITICAL:** Queue messages include tenant context
- [ ] **CRITICAL:** Message handlers verify tenant context
- [ ] **CRITICAL:** Cross-tenant message processing blocked
- [ ] Queue routing includes tenant isolation
- [ ] Dead letter queue maintains tenant context

---

## File Storage Coverage

- [ ] **CRITICAL:** File paths include tenant prefix
- [ ] **CRITICAL:** Cross-tenant file access blocked
- [ ] File listing scoped to tenant
- [ ] File deletion scoped to tenant
- [ ] Signed URLs scoped to tenant

---

## Background Job Coverage

- [ ] **CRITICAL:** Jobs execute within tenant context
- [ ] **CRITICAL:** Job results scoped to tenant
- [ ] Cross-tenant job interference blocked
- [ ] Job scheduling includes tenant isolation
- [ ] Job failure handling maintains tenant context

---

## External Service Coverage

- [ ] **CRITICAL:** External API calls include tenant context
- [ ] **CRITICAL:** Webhook payloads scoped to tenant
- [ ] Third-party integrations tenant-isolated
- [ ] OAuth tokens scoped to tenant

---

## Full User Flow Tests

### Authentication Flow

- [ ] **CRITICAL:** Login establishes correct tenant context
- [ ] **CRITICAL:** Token contains valid tenant claim
- [ ] Session maintains tenant isolation
- [ ] Logout clears tenant context properly

### Tenant Switching Scenarios

- [ ] **CRITICAL:** User switching tenants gets clean context
- [ ] **CRITICAL:** Previous tenant data not accessible after switch
- [ ] **CRITICAL:** Concurrent sessions with different tenants isolated
- [ ] Browser tabs with different tenants do not cross-contaminate

### Multi-Tenant User Flows

- [ ] **CRITICAL:** Users with access to multiple tenants see only authorized data
- [ ] Admin users cannot accidentally access wrong tenant
- [ ] Super-admin actions properly scoped and audited

---

## E2E Test Scenarios

### Happy Path Flows

- [ ] Complete user journey (signup to feature usage) tested
- [ ] Cross-tenant blocking verified at each step
- [ ] Tenant data visible only to authorized users

### Error Path Flows

- [ ] Expired tenant context handled gracefully
- [ ] Invalid tenant ID returns appropriate error
- [ ] Missing tenant context prevents data access

### Concurrent User Flows

- [ ] Multiple tenants active simultaneously tested
- [ ] No data leakage under concurrent load
- [ ] Performance acceptable with multi-tenant traffic

---

## Coverage Metrics

- [ ] **CRITICAL:** 100% of data access paths have cross-tenant tests
- [ ] **CRITICAL:** All cross-tenant blocking tests passing
- [ ] **CRITICAL:** No data access paths without tenant verification
- [ ] Test matrix documented (access path vs tenant scenario)
- [ ] Coverage report archived with release artifacts

---

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All CRITICAL items pass, 100% cross-tenant coverage |
| **CONDITIONAL** | All CRITICAL items pass, >95% coverage with remediation plan for edge cases |
| **FAIL** | Any CRITICAL item fails OR <95% cross-tenant coverage |
| **WAIVED** | Public endpoints waived with documented justification |

---

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| API Endpoint Coverage | CRITICAL | 95-99% blocking tests | <95% blocking tests |
| Database Access Path Coverage | CRITICAL | 95-99% coverage | <95% coverage |
| Cache Access Path Coverage | CRITICAL | 95-99% coverage | <95% coverage |
| Vector Store Access Coverage | CRITICAL | 95-99% coverage | <95% coverage |
| Message Queue Coverage | CRITICAL | 95-99% coverage | <95% coverage |
| File Storage Coverage | CRITICAL | 95-99% coverage | <95% coverage |
| Background Job Coverage | CRITICAL | 95-99% coverage | <95% coverage |
| External Service Coverage | CRITICAL | 95-99% API/webhook coverage | <95% coverage |
| Full User Flow Tests | CRITICAL | 95-99% flow coverage | <95% flow coverage |
| E2E Test Scenarios | CRITICAL | 95-99% scenario coverage | <95% scenario coverage |
| Coverage Metrics | CRITICAL | 95-99% overall coverage | <95% overall coverage |

---

## Waiver Process

For non-critical cross-tenant coverage items that cannot be addressed:

1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain TEA team sign-off (required for cross-tenant coverage-related waivers)
4. Obtain stakeholder sign-off (Security Lead or Platform Architect)
5. Record waiver in gate report with expiration date (if applicable)
6. Create follow-up ticket for future remediation

**Note:** CRITICAL cross-tenant blocking test coverage items cannot be waived. TEA approval is mandatory for all coverage waivers.

---

## Recovery Protocol

**If QG-TC3 fails:**

### Attempt 1: Immediate Cross-Tenant Test Gaps (target: 2-3 days)

- Audit data access path inventory against cross-tenant test inventory
- Identify access paths missing blocking tests
- Write cross-tenant blocking tests for uncovered API endpoints
- Write cross-tenant blocking tests for uncovered database methods
- Verify cache/vector/queue access paths have blocking tests
- Add full user flow tests for critical paths
- Re-run cross-tenant coverage analysis and QG-TC3 validation
- **Lock passed categories** - do not re-test locked items

### Attempt 2: Deep Cross-Tenant Investigation (target: 2-3 days)

- Engage Security team and Platform Architect for access path audit
- Review all data access patterns for potential tenant leakage
- Add edge case tests (tenant context missing, invalid tenant)
- Test cross-tenant scenarios under concurrent operations
- Verify external service calls maintain tenant isolation
- Test tenant switching scenarios comprehensively
- Run penetration tests for cross-tenant access attempts
- Re-run cross-tenant coverage analysis and QG-TC3 validation
- **Preserve locked categories** from Attempt 1

### Attempt 3: Mandatory Course Correction

- Escalate to Security Lead and Platform Architect
- Document cross-tenant coverage gaps with security implications
- Conduct security-focused architecture review
- Engage external penetration testing for tenant boundary validation
- Create remediation plan with mandatory security sign-off
- Consider architectural changes if isolation gaps persist
- Schedule follow-up validation within 1 week

---

## Related Workflows

- `bmad-bam-convergence-verification` - Integration validation
- `bmad-bam-production-readiness` - Production gate
- `tea-trace` - Formal cross-tenant verification

---

## Related Templates

- `regression-test-plan-template.md` - Tenant isolation regression suite
- `cross-tenant-test-plan-template.md` - Cross-tenant security testing
- `e2e-test-scenario-template.md` - E2E test scenario documentation

---

## Automated Validation Script

```bash
# Run as part of QG-TC3 gate
./scripts/validate-cross-tenant-coverage.sh

# Validates:
# - Data access path inventory completeness
# - Cross-tenant blocking test presence for each path
# - Full user flow test coverage
# - Tenant switching scenario coverage
# - E2E test scenario execution
```

---

## Web Research Verification

- [ ] Search the web: "cross-tenant security testing patterns {date}" - Verify testing patterns
- [ ] Search the web: "multi-tenant boundary testing best practices {date}" - Confirm boundary test approaches
- [ ] Search the web: "tenant isolation penetration testing {date}" - Validate security test scenarios
- [ ] Search the web: "data access path security testing SaaS {date}" - Verify access path coverage patterns
- [ ] Search the web: "E2E testing multi-tenant applications {date}" - Confirm E2E test patterns
- [ ] _Source: [URL]_ citations documented for key cross-tenant testing decisions

---

**PASS CRITERIA:** All CRITICAL checkboxes completed, 100% cross-tenant coverage
**OWNER:** TEA
**REVIEWERS:** Security Lead, Platform Architect

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-04-27 | BAM | Converted from V1 qg-tc3-cross-tenant-coverage.md; added YAML frontmatter; enhanced full user flow section; added tenant switching scenarios; added E2E test scenarios |
| 1.0.0 | - | BAM | Initial V1 version |
