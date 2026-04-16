# QG-I2: Tenant Safety Verification Checklist

> Gate ID: QG-I2 (Tenant Safety Verification)
> Tenant safety MUST pass before release candidate.
> Gate definition: verifies tenant data boundaries and entitlement enforcement for release readiness.
> Workflow integration: BAM `convergence-verification` feeds into this gate; TEA `tea-trace` executes formal sign-off.
> Executing workflow: `tea-trace` (extended with tenant checks)
>
> **TEA Handoff:** BAM `convergence-verification` workflow (Steps 2-3) performs
> the cross-module integration checks that feed into this gate. Once convergence
> passes, TEA `tea-trace` executes this checklist for formal gate sign-off.
> Sequence: convergence-verification → tea-trace (QG-I2) → release decision.

## Isolation Tests

- [ ] Cross-tenant data access blocked (database)
- [ ] Cross-tenant cache access blocked
- [ ] Cross-tenant vector retrieval blocked
- [ ] Cross-tenant memory access blocked
- [ ] Cross-tenant job interference blocked

## Entitlement Tests

- [ ] Feature access respects plan/tier
- [ ] Usage limits enforced
- [ ] AI token budgets enforced

## Audit Coverage

- [ ] All sensitive actions logged
- [ ] Logs include tenant context
- [ ] Audit trail queryable by tenant

## Shared Resource Isolation

- [ ] Rate limits per tenant work
- [ ] Queue fairness verified
- [ ] No noisy-neighbor degradation

## Gate Decision

| Classification | Criteria |
|---------------|----------|
| **PASS** | All CRITICAL items pass, ≥80% of non-critical items pass |
| **CONDITIONAL** | All CRITICAL items pass, <80% of non-critical items pass — remediation plan required |
| **FAIL** | Any CRITICAL item fails — block until resolved |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

## Waiver Process

For non-critical items that cannot be addressed:
1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (Product Owner or Technical Lead)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

## Critical vs Non-Critical Classification

| Category                  | Classification | CONDITIONAL Threshold | FAIL Threshold |
| ------------------------- | -------------- | --------------------- | -------------- |
| Isolation Tests           | CRITICAL       | Partial isolation verified | Cross-tenant access detected |
| Entitlement Tests         | CRITICAL       | Limits partial | Entitlements unenforced |
| Audit Coverage            | Non-critical   | Audit logging incomplete | N/A |
| Shared Resource Isolation | Non-critical   | Rate limiting partial | N/A |

## Recovery Protocol

**If gate triggers CONDITIONAL or FAIL status:**

1. **Attempt 1:** Address identified isolation gaps (target: 1-2 days)
   - Review failed checks and identify root cause (RLS policy gap, cache key collision, missing tenant context)
   - Run `bmad-bam-tenant-model-isolation` workflow to audit isolation implementation
   - Execute targeted tenant isolation tests for failed categories
   - Re-run QG-I2 validation
   - **Lock passed categories**

2. **Attempt 2:** Deeper tenant safety investigation (target: 1 week)
   - Engage Security team and AI Quality & Safety specialist
   - Review tenant context propagation through all service layers
   - Audit database connection pooling and RLS policy enforcement
   - Test cross-tenant attack scenarios with penetration testing
   - Apply corrective measures and re-run validation
   - **Preserve locked categories**

3. **Mandatory Course Correction:**
   - Escalate to project leadership and CISO
   - Document tenant safety blockers in ADR (Architecture Decision Record)
   - Reassess tenant model if isolation repeatedly fails (consider schema-per-tenant upgrade)
   - Implement additional isolation layers (separate caches, dedicated queues) if needed

**Category-Specific Recovery:**

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Isolation Tests | Review RLS policies; verify tenant context propagation; audit cache key prefixes | Cross-tenant data access detected in any layer |
| Entitlement Tests | Verify plan/tier enforcement; audit token budget configurations | Feature access bypasses tier restrictions |
| Audit Coverage | Enable audit logging for all sensitive actions; ensure tenant context in logs | Audit trail gaps for compliance-critical actions |
| Shared Resource Isolation | Configure per-tenant rate limits; implement queue fairness algorithms | Noisy-neighbor degradation affects other tenants |

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Isolation pattern audit
- `validate-module` - Module-level tenant checks (QG-M2)
- `tea-trace` - Formal tenant safety verification

## Required Templates

- `{project-root}/_bmad/bam/data/templates/performance-test-plan-template.md` - Tenant performance isolation testing
- `{project-root}/_bmad/bam/data/templates/isolation-test-plan-template.md` - Tenant isolation test planning
- `{project-root}/_bmad/bam/data/templates/cross-tenant-test-plan-template.md` - Cross-tenant security testing
- `{project-root}/_bmad/bam/data/templates/regression-test-plan-template.md` - Tenant isolation regression suite

## Web Research Verification

- [ ] Search the web: "multi-tenant data isolation security best practices {date}" - Verify isolation patterns
- [ ] Search the web: "tenant entitlement enforcement SaaS patterns {date}" - Confirm entitlement patterns are current
- [ ] _Source: [URL]_ citations documented for key tenant safety decisions

**PASS CRITERIA:** All checkboxes completed
**OWNER:** TEA (+ AI Quality & Safety)
**REVIEWERS:** Platform Architect, Security
