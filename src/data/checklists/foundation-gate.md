# QG-F1: Foundation Validation Gate Checklist

> Gate ID: QG-F1 (Foundation Gate)
> Foundation gate MUST pass before any module development begins.
> Covers master architecture approval, tenant isolation, and AI runtime readiness.
> Gate failure recovery: resolve blocking items before enabling module development.

## Artifacts

- [ ] master-architecture.md exists with all required sections (1-7)
- [ ] master-architecture.md status is 'approved'

## Shared Kernel Implementation

- [ ] TenantContext class implemented
- [ ] TenantContext middleware implemented
- [ ] BaseEntity class implemented with tenant_id
- [ ] EventBus interface implemented
- [ ] Audit logging implemented with tenant context

## Control Plane Implementation

- [ ] Tenant provisioning API functional
- [ ] Tenant lifecycle management working
- [ ] Billing integration connected (or stub for MVP)

## AI Runtime Implementation

- [ ] Agent registry implemented
- [ ] Tool registry implemented with policy checks
- [ ] Memory manager implemented with scope enforcement
- [ ] LLM gateway connected
- [ ] Safety guardrails active
- [ ] Run contract enforcement operational (run-contracts: enforces execution boundaries)
- [ ] Action gateway routing all write operations (action-gateway-patterns: mediates all mutations)
- [ ] Trust tier labeling configured for all data sources (context-compiler-patterns: data provenance)
- [ ] Context compiler functional with trust-tier priority (context-compiler-patterns: priority assembly)

## Tests Passing

- [ ] Tenant isolation test: data isolation verified
- [ ] Tenant isolation test: event isolation verified
- [ ] Tenant isolation test: cache isolation verified
- [ ] Module boundary test: no cross-module internals
- [ ] AI runtime test: policy enforcement verified

## Documentation

- [ ] Code patterns documented with examples
- [ ] Facade contract template documented
- [ ] Module creation guide exists
- [ ] All TSA technologies have version pins
- [ ] Technology decisions informed by web research ({date})

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

| Category                              | Classification | CONDITIONAL Threshold | FAIL Threshold |
| ------------------------------------- | -------------- | --------------------- | -------------- |
| Shared Kernel Implementation          | CRITICAL       | TenantContext partial | No TenantContext |
| Tests Passing (tenant isolation)      | CRITICAL       | <80% isolation tests pass | Cross-tenant test failure |
| Control Plane Implementation          | CRITICAL       | Provisioning partial | No provisioning API |
| Artifacts (status field)              | Non-critical   | Status not 'approved' | N/A |
| Documentation                         | Non-critical   | Incomplete guides | N/A |
| AI Runtime (partial proceed possible) | Non-critical   | Guardrails partial | No safety guardrails |

## Recovery Protocol

**If QG-F1 fails:**

1. **Attempt 1:** Immediate remediation (target: 2-3 days)
   - Identify failed CRITICAL categories from checklist
   - Review master architecture document for missing sections
   - Execute `create-master-architecture` workflow for incomplete areas
   - Verify tenant model decision is documented with rationale
   - Re-run QG-F1 validation after fixes
   - **Lock passed categories** — do not re-test locked items

2. **Attempt 2:** Deep investigation (target: 2-3 days)
   - Analyze root cause of continued failures
   - Engage Platform Architect and relevant domain experts
   - Review TSA technology decisions against current best practices
   - Validate shared kernel implementation patterns
   - Ensure run-contract enforcement is operational
   - Re-run QG-F1 validation after remediation
   - **Preserve locked categories** from Attempt 1

3. **Mandatory Course Correction:**
   - Escalate to project leadership and Master Architect
   - Document failure patterns and blocking issues
   - Conduct architecture review session with all stakeholders
   - Consider scope reduction or phased foundation approach
   - Create remediation plan with executive sign-off
   - Schedule follow-up validation within 1 week

**Category-Specific Recovery:**

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Shared Kernel Implementation | Review TenantContext, BaseEntity patterns | >2 failed attempts |
| Tests Passing | Run isolation test suite, fix gaps | Cross-tenant test failure |
| Control Plane | Verify tenant provisioning API | Lifecycle management broken |
| AI Runtime | Validate agent/tool registries | Safety guardrails inactive |
| Artifacts | Update master-architecture.md | Status not 'approved' |
| Documentation | Complete missing guides | Pattern docs incomplete |

## Related Workflows

- `create-master-architecture` - Foundation artifact creation
- `validate-foundation` - Foundation validation
- `bmad-bam-tenant-model-isolation` - Tenant isolation setup

---

## Web Research Verification

- [ ] Search the web: "quality gate best practices enterprise SaaS {date}" - Verify gate criteria
- [ ] Search the web: "multi-tenant platform validation patterns {date}" - Confirm validation approach
- [ ] _Source: [URL]_ citations documented for key decisions

**PASS CRITERIA:** All CRITICAL checkboxes completed, foundation ready for module development
**OWNER:** BAM
**REVIEWERS:** Platform Architect, Master Architect
