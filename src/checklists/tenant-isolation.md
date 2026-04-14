# QG-M2: Tenant Isolation Verification Checklist

> Gate ID: QG-M2 (Tenant Isolation Complete)
> Validates tenant isolation design is complete before module development.
> Gate definition: verifies all tenant data boundaries are enforced at every layer.
> Workflow integration: this checklist is the final step of the `bam-tenant-model-isolation` workflow.
> Executing workflow: `bam-tenant-model-isolation` (final step)

## Database Level

- [ ] All tenant tables have tenant_id column
- [ ] RLS policies created for all tenant tables
- [ ] RLS policies enabled on all tenant tables
- [ ] Bypass policy for admin roles documented
- [ ] Cross-tenant query test fails appropriately

## Application Level

- [ ] Tenant context middleware implemented
- [ ] JWT tenant_id claim extraction working
- [ ] Database session tenant context set
- [ ] Async job context propagation verified
- [ ] API endpoints reject missing tenant context

## Vector Store Level

- [ ] Collection tenant strategy implemented
- [ ] Query filter injection verified
- [ ] Cross-tenant retrieval blocked

## Cache Level

- [ ] Cache keys include tenant prefix
- [ ] No cross-tenant cache pollution

## Memory Level

- [ ] Session memory isolated per conversation
- [ ] User memory isolated per user+tenant
- [ ] Tenant memory isolated per tenant
- [ ] Global memory access audited

## Background Jobs

- [ ] All jobs receive tenant context
- [ ] Job results scoped to tenant

## Audit

- [ ] Tenant actions logged
- [ ] Cross-tenant access attempts logged

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

| Category           | Classification | CONDITIONAL Threshold | FAIL Threshold |
| ------------------ | -------------- | --------------------- | -------------- |
| Database Level     | CRITICAL       | RLS partial coverage | Cross-tenant query succeeds |
| Application Level  | CRITICAL       | Middleware incomplete | Missing tenant context |
| Vector Store Level | CRITICAL       | Filter injection partial | Cross-tenant retrieval |
| Cache Level        | CRITICAL       | Key prefix inconsistent | Cache key collision |
| Memory Level       | CRITICAL       | Memory scope partial | Memory scope leak |
| Background Jobs    | Non-critical   | Context propagation partial | N/A |
| Audit              | Non-critical   | Audit logging incomplete | N/A |

## Required Templates

The following templates must be completed before this gate can pass:

| Template | Purpose | Location |
|----------|---------|----------|
| `tenant-model-template.md` | Tenant isolation design | `{output_folder}/planning-artifacts/` |
| `rls-policy-template.md` | RLS policy definitions | `{output_folder}/planning-artifacts/` |
| `tenant-context-template.md` | Tenant context middleware | `{output_folder}/planning-artifacts/` |
| `cache-isolation-template.md` | Cache isolation strategy | `{output_folder}/planning-artifacts/` |
| `memory-isolation-template.md` | Agent memory isolation | `{output_folder}/planning-artifacts/` |
| `audit-logging-template.md` | Tenant audit logging | `{output_folder}/operations/` |

## Web Research Verification

- [ ] Search the web: "PostgreSQL RLS multi-tenant best practices {date}" - Verify RLS patterns
- [ ] Search the web: "multi-tenant cache isolation Redis patterns {date}" - Confirm cache isolation is current
- [ ] Search the web: "vector store tenant isolation patterns {date}" - Verify vector DB isolation approaches
- [ ] _Source: [URL]_ citations documented for key isolation decisions

## Recovery Protocol

**If QG-M2 fails:**

1. **Attempt 1:** Immediate remediation (target: 1-2 days)
   - Identify failed CRITICAL categories (Database, Application, Vector Store, Cache, Memory)
   - Review RLS policy definitions against `rls-policy-template.md`
   - Verify tenant context middleware implementation
   - Execute cross-tenant isolation test suite to pinpoint leaks
   - Run `tenant-model-isolation` workflow for incomplete areas
   - Re-run QG-M2 validation after fixes
   - **Lock passed categories** — do not re-test locked items

2. **Attempt 2:** Deep investigation (target: 1-2 days)
   - Engage Security team and database specialists
   - Analyze cross-tenant query test failures in detail
   - Review JWT tenant_id claim extraction logic
   - Verify async job context propagation patterns
   - Check vector store collection isolation strategy
   - Validate cache key prefixing across all caching layers
   - Re-run QG-M2 validation after remediation
   - **Preserve locked categories** from Attempt 1

3. **Mandatory Course Correction:**
   - Escalate to Security Lead and Platform Architect
   - Document isolation gaps with evidence
   - Conduct security-focused architecture review
   - Consider tenant model change (e.g., RLS → schema-per-tenant)
   - Create remediation plan with security sign-off
   - Schedule penetration test for isolation validation
   - Follow-up validation within 1 week

**Category-Specific Recovery:**

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Database Level | Review RLS policies, enable FORCE RLS | Cross-tenant query succeeds |
| Application Level | Fix middleware, verify JWT extraction | Missing tenant context |
| Vector Store Level | Implement collection strategy, fix filters | Cross-tenant retrieval |
| Cache Level | Add tenant prefix to all keys | Cache key collision |
| Memory Level | Verify memory scope per conversation/user/tenant | Memory scope leak |
| Background Jobs | Propagate tenant context to all workers | Job without tenant |
| Audit | Enable access logging, audit trail | Missing audit events |

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Tenant isolation design
- `bmad-bam-validate-module` - Module validation (QG-M2)
- `bmad-bam-convergence-verification` - Integration validation (QG-I2)

**PASS CRITERIA:** All CRITICAL checkboxes completed, tenant isolation verified
**OWNER:** Platform Architect
**REVIEWERS:** Security, DEV Lead
