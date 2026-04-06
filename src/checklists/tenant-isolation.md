# Tenant Isolation Verification Checklist

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

## Critical vs Non-Critical Classification

| Category           | Classification                                        |
| ------------------ | ----------------------------------------------------- |
| Database Level     | CRITICAL                                              |
| Application Level  | CRITICAL                                              |
| Vector Store Level | CRITICAL                                              |
| Cache Level        | CRITICAL                                              |
| Memory Level       | CRITICAL                                              |
| Background Jobs    | Non-critical (can proceed with documented exceptions) |
| Audit              | Non-critical                                          |

**PASS CRITERIA:** All checkboxes completed
**OWNER:** Platform Architect
**REVIEWERS:** Security, DEV Lead

## Recovery Protocol

If this gate fails, refer to the relevant recovery workflow or escalation procedure.
