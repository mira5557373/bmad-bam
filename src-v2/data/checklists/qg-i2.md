---
name: qg-i2-tenant-safety
description: Integration tenant safety - cross-module isolation, tenant context verification, audit trail
module: bam
version: "2.0.0"
owner: TEA
tags: [integration, quality-gate, multi-tenant, tenant-safety, tea, cross-module]
---

# QG-I2: Tenant Safety Gate

| Attribute | Value |
|-----------|-------|
| **Gate ID** | QG-I2 |
| **Phase** | 4-implementation (Integration) |
| **Workflow** | `bmad-bam-convergence-verification` |
| **Prerequisites** | QG-I1 (Convergence Gate) |
| **Owner** | TEA (Test Engineering Agent) |
| **Reviewers** | Platform Architect, Security Lead |

---

## Purpose

The Tenant Safety Gate validates that tenant isolation is maintained across all module boundaries during system integration. This gate ensures:

1. **Cross-Module Data Isolation** - Tenant data remains isolated when flowing between modules via facades, events, and shared services
2. **Context Propagation Integrity** - Tenant context is correctly propagated through synchronous requests, asynchronous events, and background jobs
3. **Audit Trail Completeness** - All cross-module operations are properly attributed to tenants for compliance and debugging
4. **Negative Test Coverage** - Explicit tests verify that cross-tenant access attempts are blocked at every boundary
5. **Tier Enforcement Consistency** - Feature flags and quotas are enforced uniformly across all integrated modules
6. **Data Residency Compliance** - Cross-module data flows respect tenant-specific data residency requirements

This gate is **owned by TEA** and must pass before release candidate approval. Failure indicates potential data leakage or compliance violations.

---

## Checklist

### Cross-Module Data Isolation

Verify tenant isolation at module boundaries and shared infrastructure.

- [ ] **CRITICAL:** Database queries include tenant context in all cross-module calls
- [ ] **CRITICAL:** RLS policies active for all shared tables accessed by multiple modules
- [ ] **CRITICAL:** Cache keys include tenant identifier across all caching layers
- [ ] **CRITICAL:** Vector store queries scoped to tenant namespace
- [ ] **CRITICAL:** File storage paths include tenant partitioning
- [ ] Cross-module API calls propagate tenant headers correctly
- [ ] Shared message queues enforce tenant message isolation
- [ ] Search indices partitioned or filtered by tenant
- [ ] Temporary files and processing artifacts isolated per tenant
- [ ] Memory caches (Redis, Memcached) use tenant-prefixed keys

### Tenant Context Propagation

Verify tenant context flows correctly through all execution paths.

- [ ] **CRITICAL:** HTTP request context propagates tenant ID to all downstream services
- [ ] **CRITICAL:** Async event payloads include tenant context metadata
- [ ] **CRITICAL:** Background job execution includes tenant context injection
- [ ] **CRITICAL:** WebSocket connections maintain tenant session binding
- [ ] gRPC/internal service calls include tenant metadata in headers
- [ ] Batch processing jobs maintain tenant isolation between batches
- [ ] Scheduled tasks execute within correct tenant context
- [ ] Retry mechanisms preserve tenant context across retries
- [ ] Circuit breaker fallbacks maintain tenant context
- [ ] Distributed tracing spans include tenant ID attribute

### Audit Trail Verification

Verify compliance-ready audit logging across module boundaries.

- [ ] **CRITICAL:** All data mutations logged with tenant ID attribution
- [ ] **CRITICAL:** Cross-module API calls logged with request correlation
- [ ] **CRITICAL:** Authentication/authorization events logged per tenant
- [ ] **CRITICAL:** Audit logs tamper-evident (append-only, checksummed)
- [ ] Failed access attempts logged with full context
- [ ] Tenant admin actions logged separately from user actions
- [ ] PII access logged for GDPR/compliance reporting
- [ ] Log retention policies applied per tenant tier
- [ ] Audit log export functionality verified per tenant
- [ ] Compliance report generation tested for cross-module activities

### Cross-Tenant Prevention Tests

Negative tests that verify tenant boundaries cannot be bypassed.

- [ ] **CRITICAL:** Direct database access with wrong tenant ID returns empty/error
- [ ] **CRITICAL:** API calls with mismatched tenant token rejected (401/403)
- [ ] **CRITICAL:** Cache access with manipulated tenant key returns null
- [ ] **CRITICAL:** Event consumption with wrong tenant filtered/rejected
- [ ] Parameter tampering with tenant ID detected and blocked
- [ ] SQL injection attempts targeting tenant isolation blocked
- [ ] Path traversal attacks targeting tenant storage blocked
- [ ] Horizontal privilege escalation attempts logged and blocked
- [ ] Tenant ID guessing/enumeration attempts rate-limited
- [ ] Mass assignment attacks targeting tenant fields blocked

### Tenant Tier Enforcement

Verify feature gates and quotas apply consistently across modules.

- [ ] **CRITICAL:** Feature flags checked at each module entry point
- [ ] **CRITICAL:** Quota enforcement consistent across all modules
- [ ] **CRITICAL:** Rate limiting applied per-tenant across all endpoints
- [ ] Tier upgrade/downgrade propagates to all modules within SLA
- [ ] Trial period enforcement consistent across modules
- [ ] Overage handling (soft/hard limits) consistent across modules
- [ ] Tier-specific SLAs enforced (response times, availability)
- [ ] Usage metering accurate across module boundaries
- [ ] Billing events captured for cross-module resource usage
- [ ] Tier-specific data retention policies enforced

---

## Gate Decision

| Result | Criteria | Action |
|--------|----------|--------|
| **PASS** | All CRITICAL checks pass AND >= 80% standard checks pass | Proceed to QG-I3 (Agent Safety) |
| **CONDITIONAL** | All CRITICAL checks pass AND < 80% standard checks pass | Proceed with mitigation plan + deadline |
| **FAIL** | Any CRITICAL check fails | Enter Recovery Protocol |
| **WAIVED** | Non-critical items waived by stakeholder | Proceed with documented justification |

---

## Critical vs Non-Critical Classification

| Category | Critical Threshold | Non-Critical Threshold | Rationale |
|----------|-------------------|------------------------|-----------|
| Cross-Module Data Isolation | 5/5 (100%) | 3/5 (60%) | Data leakage is unacceptable |
| Tenant Context Propagation | 4/4 (100%) | 4/6 (67%) | Core isolation depends on context |
| Audit Trail Verification | 4/4 (100%) | 4/6 (67%) | Compliance requires complete audit |
| Cross-Tenant Prevention | 4/4 (100%) | 4/6 (67%) | Security boundary must hold |
| Tenant Tier Enforcement | 3/3 (100%) | 4/7 (57%) | Revenue/feature integrity |

**Overall Threshold:** 100% critical checks + 80% non-critical checks = PASS

---

## Waiver Process

Non-critical items may be waived following this process:

1. **Document Gap** - Create detailed ticket describing the non-critical item that cannot be met
2. **Risk Assessment** - TEA assesses risk level (low/medium) with Security Lead review
3. **Mitigation Plan** - Define compensating controls and remediation timeline
4. **Stakeholder Approval** - Product Owner + Platform Architect sign-off required
5. **Time-Bound** - Waiver expires after 30 days or next release, whichever is sooner

**Note:** CRITICAL items cannot be waived under any circumstances.

---

## Recovery Protocol

When QG-I2 fails, follow this structured recovery process:

```
FAIL
  |
  +-- Attempt 1: Fix identified issues, re-run TEA validation suite
  |       |
  |       +-- FAIL again?
  |               |
  |               +-- Attempt 2: Root cause analysis, targeted fixes, re-run
  |               |       |
  |               |       +-- FAIL again?
  |               |               |
  |               |               +-- MANDATORY COURSE CORRECTION
  |               |                   Escalate to Platform Architect + Security Lead
  |               |                   Architecture review required
  |               |
  |               +-- PASS -> Proceed to QG-I3
  |
  +-- PASS -> Proceed to QG-I3
```

**Locked Categories:** When a category passes, it is "locked" and does not require re-validation in subsequent attempts. Only failed categories are re-tested.

---

## Category-Specific Recovery

| Category | Common Failures | Recovery Actions |
|----------|-----------------|------------------|
| Cross-Module Data Isolation | Missing tenant filter in query | Add tenant predicate to repository layer, verify with integration test |
| Tenant Context Propagation | Context lost in async handler | Inject TenantContextProvider in event consumer, add correlation test |
| Audit Trail Verification | Missing audit log for operation | Add AuditLogInterceptor to facade, verify log entry in test |
| Cross-Tenant Prevention | Negative test missing | Add boundary test with wrong tenant ID, verify 403/empty result |
| Tenant Tier Enforcement | Quota not checked in module | Add tier enforcement middleware, verify quota exceeded response |

---

## TEA Handoff

TEA (Test Engineering Agent) owns verification responsibility for QG-I2:

### TEA Responsibilities

1. **Execute Test Suite** - Run `tea-trace` workflow for tenant safety verification
2. **Generate Evidence** - Produce test execution report with pass/fail metrics
3. **Classify Results** - Categorize failures as critical or non-critical
4. **Report to Gate** - Provide structured gate assessment with recommendations
5. **Support Recovery** - Assist with test fixes during recovery attempts

### Handoff Protocol

```
BAM Workflow                    TEA Workflow
    |                               |
    +-- convergence-verification    |
    |       |                       |
    |       +-- Produces checklists |
    |       |   and criteria        |
    |       |                       |
    |       +------ HANDOFF ------> +-- tea-trace
    |                               |       |
    |                               |       +-- Executes tests
    |                               |       +-- Generates report
    |                               |       |
    |       <------ REPORT -------- +-- Returns verification status
    |                               |
    +-- Gate decision made          |
```

### TEA Test Coverage Requirements

| Test Type | Minimum Coverage | Verification Method |
|-----------|------------------|---------------------|
| Cross-tenant access tests | 100% of facades | Negative test per facade endpoint |
| Context propagation tests | 100% of async flows | Trace validation tests |
| Audit log tests | 100% of mutations | Log assertion tests |
| Tier enforcement tests | 100% of quota points | Limit exceeded tests |

---

## Related Workflows

| Workflow | Relationship |
|----------|--------------|
| `bmad-bam-convergence-verification` | Parent workflow that triggers QG-I2 |
| `bmad-bam-tenant-model-isolation` | Defines isolation patterns verified here |
| `bmad-bam-tenant-aware-observability` | Provides audit logging patterns |
| `bmad-bam-tenant-requirements-analysis` | Source of tenant isolation requirements |
| `bmad-bam-facade-mismatch-recovery` | Recovery workflow for integration issues |

---

## Related Templates

| Template | Purpose |
|----------|---------|
| `tenant-isolation-test-template.md` | Test case template for cross-tenant tests |
| `audit-trail-verification-template.md` | Checklist template for audit verification |
| `convergence-verification-report-template.md` | Gate assessment report format |
| `tenant-context-flow-template.md` | Context propagation documentation |

---

## Related Patterns

Load decision criteria and verification approaches from pattern registry:

- **Tenant isolation patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`
- **Quality gate patterns:** `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-I2`
- **Compliance patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

### Key Patterns for QG-I2

| Pattern ID | Name | Application |
|------------|------|-------------|
| `tenant-rls` | Row-Level Security | Verify RLS policies active in all queries |
| `tenant-context-propagation` | Context Propagation | Verify async context injection |
| `audit-logging` | Audit Logging | Verify compliance-ready logging |
| `negative-testing` | Boundary Testing | Verify cross-tenant blocked |

---

## Web Research Verification

Before finalizing QG-I2 assessment, verify current best practices:

Search the web: "multi-tenant isolation testing patterns {date}"
Search the web: "cross-tenant data leakage prevention {date}"
Search the web: "GDPR audit trail requirements SaaS {date}"
Search the web: "tenant context propagation microservices {date}"

Incorporate findings into test coverage decisions. Cite sources for any new patterns adopted:

```
_Source: [URL]_
```

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-04-27 | BAM Module | Expanded to full BMAD format with all sections |
| 1.0.0 | 2026-04-01 | BAM Module | Initial stub with basic checks |

---

**PASS CRITERIA:** All CRITICAL checks pass AND >= 80% standard checks pass

**OWNER:** TEA (Test Engineering Agent)

**REVIEWERS:** Platform Architect, Security Lead
