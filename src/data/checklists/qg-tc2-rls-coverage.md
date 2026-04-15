# QG-TC2: RLS Policy Coverage Checklist

> Gate ID: QG-TC2 (RLS Policy Coverage)
> All RLS policies MUST have corresponding test coverage.
> Gate definition: verifies that every Row-Level Security policy has dedicated tests proving correct enforcement.
> Workflow integration: this checklist feeds into `convergence-verification` after `QG-TC1`.
> Executing workflow: `tea-trace` (extended with RLS coverage checks)
>
> **TEA Handoff:** BAM `tenant-model-isolation` workflow defines RLS policies.
> TEA validates that all RLS policies have corresponding tests.
> Sequence: QG-TC1 -> QG-TC2 -> QG-TC3 -> convergence-verification.

## RLS Policy Inventory

- [ ] **CRITICAL:** All tenant tables with RLS policies inventoried
- [ ] **CRITICAL:** RLS policy-to-test mapping documented
- [ ] **CRITICAL:** No RLS policies without corresponding tests
- [ ] Policy inventory matches database schema audit
- [ ] Policy naming convention consistent and traceable

## RLS SELECT Policy Tests

- [ ] **CRITICAL:** SELECT policy blocks cross-tenant reads
- [ ] **CRITICAL:** SELECT policy allows same-tenant reads
- [ ] **CRITICAL:** SELECT policy handles NULL tenant_id correctly
- [ ] SELECT policy tested with multiple concurrent tenants
- [ ] SELECT policy tested with tenant context switching

## RLS INSERT Policy Tests

- [ ] **CRITICAL:** INSERT policy blocks cross-tenant inserts
- [ ] **CRITICAL:** INSERT policy enforces tenant_id assignment
- [ ] **CRITICAL:** INSERT policy rejects mismatched tenant_id
- [ ] INSERT policy tested with batch operations
- [ ] INSERT policy tested with transaction rollback scenarios

## RLS UPDATE Policy Tests

- [ ] **CRITICAL:** UPDATE policy blocks cross-tenant updates
- [ ] **CRITICAL:** UPDATE policy prevents tenant_id modification
- [ ] **CRITICAL:** UPDATE policy allows same-tenant updates
- [ ] UPDATE policy tested with partial updates
- [ ] UPDATE policy tested with bulk update operations

## RLS DELETE Policy Tests

- [ ] **CRITICAL:** DELETE policy blocks cross-tenant deletes
- [ ] **CRITICAL:** DELETE policy allows same-tenant deletes
- [ ] DELETE policy tested with cascade deletes
- [ ] DELETE policy tested with soft-delete patterns

## RLS Bypass and Admin Tests

- [ ] **CRITICAL:** Admin bypass tested and documented
- [ ] **CRITICAL:** Bypass audit logging verified
- [ ] Service account bypass policies tested
- [ ] Bypass scope limitations tested (table-specific)

## RLS Performance Tests

- [ ] RLS query performance baseline established
- [ ] RLS index utilization verified
- [ ] RLS policy not causing full table scans
- [ ] RLS performance acceptable under tenant load

## Coverage Metrics

- [ ] **CRITICAL:** 100% of RLS policies have tests
- [ ] **CRITICAL:** All CRITICAL policy tests passing
- [ ] Coverage report for RLS-related code generated
- [ ] Test execution time within acceptable bounds

## Gate Decision

| Classification | Criteria |
|---------------|----------|
| **PASS** | All CRITICAL items pass, 100% RLS policy coverage |
| **CONDITIONAL** | All CRITICAL items pass, >95% coverage with remediation plan |
| **FAIL** | Any CRITICAL item fails OR <95% RLS policy coverage |
| **WAIVED** | Non-tenant tables waived with documented justification |

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| RLS Policy Inventory | CRITICAL | 95-99% policies mapped | <95% policies mapped |
| RLS SELECT Policy Tests | CRITICAL | 95-99% coverage | <95% coverage |
| RLS INSERT Policy Tests | CRITICAL | 95-99% coverage | <95% coverage |
| RLS UPDATE Policy Tests | CRITICAL | 95-99% coverage | <95% coverage |
| RLS DELETE Policy Tests | CRITICAL | 95-99% coverage | <95% coverage |
| RLS Bypass and Admin Tests | CRITICAL | Partial audit coverage | No bypass testing |
| RLS Performance Tests | Non-critical | Baseline not established | N/A |
| Coverage Metrics | CRITICAL | 95-99% policy coverage | <95% policy coverage |

## Waiver Process

For non-critical RLS coverage items that cannot be addressed:
1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain TEA team sign-off (required for RLS coverage-related waivers)
4. Obtain stakeholder sign-off (DBA Lead or Security Lead)
5. Record waiver in gate report with expiration date (if applicable)
6. Create follow-up ticket for future remediation

**Note:** CRITICAL RLS policy coverage items cannot be waived. TEA approval is mandatory for all coverage waivers.

## Recovery Protocol

**If QG-TC2 fails:**

1. **Attempt 1:** Immediate RLS test gaps (target: 1-2 days)
   - Audit RLS policy inventory against test inventory
   - Identify policies missing corresponding tests
   - Write tests for uncovered SELECT/INSERT/UPDATE/DELETE policies
   - Verify cross-tenant blocking tests exist for each policy
   - Re-run RLS coverage analysis and QG-TC2 validation
   - **Lock passed categories** - do not re-test locked items

2. **Attempt 2:** Deep RLS investigation (target: 2-3 days)
   - Engage Database team and Security for RLS review
   - Review RLS policy definitions for completeness
   - Add edge case tests (NULL tenant, context switching)
   - Test RLS behavior under concurrent tenant operations
   - Verify admin bypass is properly tested and audited
   - Re-run RLS coverage analysis and QG-TC2 validation
   - **Preserve locked categories** from Attempt 1

3. **Mandatory Course Correction:**
   - Escalate to Security Lead and DBA Lead
   - Document RLS coverage gaps with security implications
   - Conduct RLS policy audit with penetration testing
   - Consider schema-level isolation if RLS gaps persist
   - Create remediation plan with security sign-off
   - Schedule follow-up validation within 1 week

## Related Workflows

- `bmad-bam-tenant-model-isolation` - RLS policy design
- `bmad-bam-convergence-verification` - Integration validation
- `tea-trace` - Formal RLS coverage verification

## Required Templates

- `{project-root}/_bmad/bam/data/templates/regression-test-plan-template.md` - Tenant isolation regression suite

## Web Research Verification

- [ ] Search the web: "PostgreSQL RLS testing best practices {date}" - Verify RLS test patterns
- [ ] Search the web: "row level security policy test coverage {date}" - Confirm coverage approaches
- [ ] Search the web: "multi-tenant RLS security testing {date}" - Validate security test scenarios
- [ ] _Source: [URL]_ citations documented for key RLS testing decisions

**PASS CRITERIA:** All CRITICAL checkboxes completed, 100% RLS policy coverage
**OWNER:** TEA
**REVIEWERS:** DBA Lead, Security Lead
