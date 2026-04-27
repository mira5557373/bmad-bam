---
name: qg-tc1-unit-test-coverage
description: Unit test coverage gate - tenant context mocking, isolation verification, coverage thresholds
category: quality-gate
tags: [testing, quality-gate, multi-tenant, tea, unit-test, coverage]
version: 2.0.0
owner: TEA
---

# QG-TC1: Tenant Unit Coverage Gate

> **Gate ID:** QG-TC1 (Tenant Unit Coverage)
> **Workflow:** tea-trace (extended with coverage checks)
> **Prerequisites:** QG-M2 (Tenant Isolation)
> **Sequence:** tenant-model-isolation -> QG-TC1 -> QG-TC2 -> convergence-verification

Tenant-scoped code MUST exceed 90% unit test coverage. This gate verifies that all code handling tenant data has adequate unit test coverage with proper TenantContext mocking patterns.

---

## Purpose

QG-TC1 validates that tenant-scoped code meets unit test coverage requirements:

1. **TenantContext mocking patterns** are correctly implemented
2. **Per-module coverage thresholds** are met (>=90% target)
3. **Tenant boundary tests** verify isolation at unit level
4. **Per-tier test scenarios** cover Free, Pro, and Enterprise tenant behaviors

---

## TEA Handoff Protocol

BAM `tenant-model-isolation` workflow produces tenant-scoped code. TEA validates that all tenant-scoped code has >90% unit test coverage.

---

## Tenant Repository Coverage

- [ ] **CRITICAL:** Tenant repository classes have >=90% line coverage
- [ ] **CRITICAL:** Tenant query builders have >=90% branch coverage
- [ ] **CRITICAL:** Tenant data access layer has >=90% function coverage
- [ ] Tenant repository edge cases covered (null tenant, invalid tenant)
- [ ] Tenant repository error handling paths tested

---

## Tenant Service Coverage

- [ ] **CRITICAL:** Tenant service classes have >=90% line coverage
- [ ] **CRITICAL:** Tenant business logic has >=90% branch coverage
- [ ] Tenant service validation logic tested
- [ ] Tenant service error scenarios covered
- [ ] Tenant service transaction handling tested

---

## Tenant Context Coverage

- [ ] **CRITICAL:** Tenant context middleware has >=90% coverage
- [ ] **CRITICAL:** JWT tenant extraction logic has >=90% coverage
- [ ] **CRITICAL:** Tenant context propagation has >=90% coverage
- [ ] Missing tenant context scenarios tested
- [ ] Invalid tenant context scenarios tested

---

## TenantContext Mocking Patterns

### Mock Factory Implementation

- [ ] **CRITICAL:** TenantContext mock factory exists
- [ ] **CRITICAL:** Mock supports all tier types (Free, Pro, Enterprise)
- [ ] Mock includes tenant_id, tier, and permissions
- [ ] Mock supports feature flag overrides
- [ ] Mock supports custom tenant configuration

### Test Isolation

- [ ] **CRITICAL:** Each test uses isolated tenant context
- [ ] **CRITICAL:** Tests do not share tenant state
- [ ] Before/after hooks reset tenant context
- [ ] Parallel test execution maintains tenant isolation

---

## Tenant Model Coverage

- [ ] **CRITICAL:** Tenant model classes have >=90% coverage
- [ ] Tenant model validation rules tested
- [ ] Tenant model serialization/deserialization tested
- [ ] Tenant model relationships tested

---

## Tenant Event Coverage

- [ ] **CRITICAL:** Tenant event publishers have >=90% coverage
- [ ] **CRITICAL:** Tenant event handlers have >=90% coverage
- [ ] Tenant event payload validation tested
- [ ] Tenant event error handling tested

---

## Per-Tier Test Scenarios

### Free Tier Tests

- [ ] Free tier rate limit enforcement tested
- [ ] Free tier feature restrictions tested
- [ ] Free tier storage limits tested

### Pro Tier Tests

- [ ] Pro tier elevated limits tested
- [ ] Pro tier additional features tested
- [ ] Pro tier upgrade scenarios tested

### Enterprise Tier Tests

- [ ] **CRITICAL:** Enterprise tier custom configuration tested
- [ ] Enterprise tier unlimited scenarios tested
- [ ] Enterprise tier SSO integration tested

---

## Coverage Metrics Verification

- [ ] **CRITICAL:** Overall tenant-scoped code coverage >=90%
- [ ] **CRITICAL:** No tenant-scoped files below 80% coverage
- [ ] Coverage report generated and archived
- [ ] Coverage trends tracked against baseline

---

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All CRITICAL items pass, overall coverage >=90% |
| **CONDITIONAL** | All CRITICAL items pass, overall coverage 85-90% with remediation plan |
| **FAIL** | Any CRITICAL item fails OR overall coverage <85% |
| **WAIVED** | Coverage waived for legacy code with documented justification |

---

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Tenant Repository Coverage | CRITICAL | 85-90% coverage | <85% coverage |
| Tenant Service Coverage | CRITICAL | 85-90% coverage | <85% coverage |
| Tenant Context Coverage | CRITICAL | 85-90% coverage | <85% coverage |
| TenantContext Mocking Patterns | CRITICAL | Mock factory exists | No mock factory |
| Tenant Model Coverage | CRITICAL | 85-90% line coverage | <85% line coverage |
| Tenant Event Coverage | CRITICAL | 85-90% coverage | <85% coverage |
| Per-Tier Test Scenarios (Enterprise) | CRITICAL | Partial tier coverage | No Enterprise tests |
| Coverage Metrics Verification | CRITICAL | Overall 85-90% | Overall <85% |

---

## Waiver Process

For non-critical coverage items that cannot be addressed:

1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain TEA team sign-off (required for coverage-related waivers)
4. Obtain stakeholder sign-off (Dev Lead or QA Lead)
5. Record waiver in gate report with expiration date (if applicable)
6. Create follow-up ticket for future remediation

**Note:** CRITICAL coverage items cannot be waived. TEA approval is mandatory for all coverage waivers.

---

## Recovery Protocol

**If QG-TC1 fails:**

### Attempt 1: Immediate Coverage Improvement (target: 1-2 days)

- Run coverage report to identify files below 90% threshold
- Prioritize CRITICAL categories with lowest coverage
- Write unit tests for uncovered tenant repository methods
- Write unit tests for uncovered tenant service logic
- Implement TenantContext mock factory if missing
- Re-run coverage analysis and QG-TC1 validation
- **Lock passed categories** - do not re-test locked items

### Attempt 2: Deep Coverage Investigation (target: 2-3 days)

- Engage TEA team for coverage strategy review
- Identify complex code paths requiring additional test cases
- Review tenant context propagation test scenarios
- Add integration-level unit tests for tenant boundaries
- Implement coverage for edge cases and error paths
- Add per-tier test scenarios for all tenant types
- Re-run coverage analysis and QG-TC1 validation
- **Preserve locked categories** from Attempt 1

### Attempt 3: Mandatory Course Correction

- Escalate to Tech Lead and QA Lead
- Document coverage gaps with technical rationale
- Conduct test strategy review session
- Consider refactoring complex untestable code
- Create remediation plan with coverage milestones
- Schedule follow-up validation within 1 week

---

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Tenant isolation design
- `bmad-bam-convergence-verification` - Integration validation
- `tea-trace` - Formal coverage verification

---

## Related Templates

- `regression-test-plan-template.md` - Tenant isolation regression suite
- `tenant-context-mock-template.md` - TenantContext mock factory

---

## Automated Validation Script

```bash
# Run as part of QG-TC1 gate
./scripts/validate-tenant-unit-coverage.sh

# Validates:
# - Overall tenant-scoped code coverage
# - Per-file coverage thresholds
# - TenantContext mock factory presence
# - Per-tier test scenario coverage
```

---

## Web Research Verification

- [ ] Search the web: "unit test coverage best practices multi-tenant {date}" - Verify coverage patterns
- [ ] Search the web: "tenant isolation unit testing strategies {date}" - Confirm isolation test approaches
- [ ] Search the web: "code coverage thresholds enterprise SaaS {date}" - Validate coverage targets
- [ ] Search the web: "TenantContext mocking patterns {date}" - Verify mock factory approaches
- [ ] _Source: [URL]_ citations documented for key coverage decisions

---

**PASS CRITERIA:** All CRITICAL checkboxes completed, overall coverage >=90%
**OWNER:** TEA
**REVIEWERS:** Dev Lead, QA Lead

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-04-27 | BAM | Converted from V1 qg-tc1-tenant-unit-coverage.md; added YAML frontmatter; enhanced TenantContext mocking section; added per-tier test scenarios |
| 1.0.0 | - | BAM | Initial V1 version |
